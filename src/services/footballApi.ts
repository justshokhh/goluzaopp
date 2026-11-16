import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type {
  Match,
  MatchStats,
  StandingRow,
  NewsItem,
  MatchStatus,
  MatchEvent,
  EventType,
  FormResult,
  MatchLineups,
  PlayerLineup,
  ScoreBoard,
  TournamentTheme,
} from '../types/football';
import {
  mockMatches,
  mockMatchStats,
  mockStandings,
  mockNews,
} from './mockData';
import { getTeamLogo, getTournamentLogo } from './teamLogos';

// ============================================================================
// 1. KESHLASH TIZIMI (LOCALSTORAGE CACHE MANAGER)
// ============================================================================

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // millisekundlarda
}

const CACHE_PREFIX = 'uzscore_cache_';
const memoryCache = new Map<string, CacheItem<any>>();

export const CacheTTL = {
  LIVE_MATCHES: 30 * 1000, // 30 soniya
  FIXTURES: 5 * 60 * 1000, // 5 daqiqa
  MATCH_DETAILS: 2 * 60 * 1000, // 2 daqiqa
  STANDINGS: 30 * 60 * 1000, // 30 daqiqa
};

/**
 * Ma'lumotni keshga saqlash
 */
function setCache<T>(key: string, data: T, ttl: number): void {
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };

  // 1. Xotira keshiga yozish
  memoryCache.set(key, item);

  // 2. localStorage ga yozish (agar mavjud bo'lsa)
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(item));
    }
  } catch {
    // LocalStorage quota yoki cheklov bo'lsa xotira keshi yetarli
  }
}

/**
 * Keshdan ma'lumotni olish (muddati o'tmagan bo'lsa)
 */
function getCache<T>(key: string): T | null {
  const now = Date.now();

  // 1. Avval xotira keshini tekshirish
  const memItem = memoryCache.get(key);
  if (memItem && now - memItem.timestamp < memItem.ttl) {
    return memItem.data as T;
  }

  // 2. LocalStorage dan tekshirish
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (stored) {
        const item: CacheItem<T> = JSON.parse(stored);
        if (now - item.timestamp < item.ttl) {
          memoryCache.set(key, item); // Xotiraga ham sinxronlash
          return item.data;
        } else {
          window.localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        }
      }
    }
  } catch {
    // JSON parse yoki storage xatoligida null qaytarish
  }

  return null;
}

/**
 * Barcha keshni tozalash
 */
export function clearFootballCache(): void {
  memoryCache.clear();
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(CACHE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => window.localStorage.removeItem(k));
    }
  } catch {
    // E'tiborsiz qoldirish
  }
}

// ============================================================================
// 2. API-SPORTS VA RAPIDAPI SOZLAMALARI
// ============================================================================

export const getApiKey = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = window.localStorage.getItem('uzscore_api_key');
    if (saved && saved.trim()) return saved.trim();
  }
  return (
    (import.meta.env.VITE_FOOTBALL_API_KEY as string | undefined) ||
    (import.meta.env.VITE_RAPIDAPI_KEY as string | undefined) ||
    'd8064a415c475419d22fb56cb83df26d'
  );
};

const RAPIDAPI_HOST =
  (import.meta.env.VITE_FOOTBALL_API_HOST as string | undefined) ||
  'v3.football.api-sports.io';

const isRapidApiHost = RAPIDAPI_HOST.includes('rapidapi.com');
const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const BASE_URL = isRapidApiHost
  ? `https://${RAPIDAPI_HOST}/v3`
  : isLocalhost
  ? '/api-sports'
  : 'https://v3.football.api-sports.io';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const key = getApiKey();
  if (key) {
    if (isRapidApiHost) {
      config.headers['x-rapidapi-key'] = key;
      config.headers['x-rapidapi-host'] = RAPIDAPI_HOST;
    } else {
      config.headers['x-apisports-key'] = key;
    }
  }
  return config;
});

/**
 * API kaliti mavjudligini aniqlash
 */
export const isApiConfigured = (): boolean => {
  const key = getApiKey();
  return Boolean(key && key.trim().length > 0);
};

// ============================================================================
// 3. MA'LUMOTLARNI MOSLASHTIRUVCHI FUNKSIYALAR (MAPPERS)
// ============================================================================

function parseMatchStatus(shortStatus?: string): MatchStatus {
  if (!shortStatus) return 'SCHEDULED';
  const liveStatuses = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'LIVE', 'INT'];
  const htStatuses = ['HT'];
  const finishedStatuses = ['FT', 'AET', 'PEN'];

  if (htStatuses.includes(shortStatus)) return 'HT';
  if (liveStatuses.includes(shortStatus)) return 'LIVE';
  if (finishedStatuses.includes(shortStatus)) return 'FT';
  return 'SCHEDULED';
}

function detectTournamentTheme(leagueId?: number | string, leagueName?: string): TournamentTheme {
  const idStr = String(leagueId || '').toLowerCase();
  const nameStr = String(leagueName || '').toLowerCase();

  if (idStr === '2' || nameStr.includes('champions')) return 'ucl';
  if (idStr === '3' || nameStr.includes('europa league')) return 'uel';
  if (idStr === '848' || nameStr.includes('conference')) return 'uel_conf';
  if (idStr === '39' || nameStr.includes('premier')) return 'premier_league';
  if (idStr === '140' || nameStr.includes('la liga') || nameStr.includes('laliga')) return 'laliga';
  if (idStr === '135' || nameStr.includes('serie a')) return 'serie_a';
  if (idStr === '353' || nameStr.includes('superliga')) return 'uz_superliga';

  return 'uz_superliga';
}

function mapApiEvent(eventItem: any, homeTeamId: number | string): MatchEvent {
  const apiType = String(eventItem.type || '').toLowerCase();
  const detail = String(eventItem.detail || '').toLowerCase();

  let type: EventType = 'GOAL';
  if (apiType === 'goal') {
    if (detail.includes('own')) type = 'OWN_GOAL';
    else if (detail.includes('penalty')) type = 'PENALTY';
    else type = 'GOAL';
  } else if (apiType === 'card') {
    type = detail.includes('red') ? 'RED' : 'YELLOW';
  } else if (apiType === 'subst') {
    type = 'SUB';
  } else if (apiType === 'var') {
    type = 'VAR';
  }

  const isHome = eventItem.team?.id
    ? String(eventItem.team.id) === String(homeTeamId)
    : true;

  return {
    id: `ev-${eventItem.time?.elapsed || 0}-${Math.random().toString(36).substring(2, 7)}`,
    minute: eventItem.time?.elapsed ?? 0,
    extraMinute: eventItem.time?.extra || undefined,
    type,
    team: isHome ? 'home' : 'away',
    player: eventItem.player?.name || "Noma'lum o'yinchi",
    assistPlayer: eventItem.assist?.name || undefined,
    assist: eventItem.assist?.name || undefined,
    detail: eventItem.detail || undefined,
  };
}

function mapApiFixtureToMatch(item: any): Match {
  const fixture = item.fixture || {};
  const league = item.league || {};
  const teams = item.teams || {};
  const goals = item.goals || {};
  const score = item.score || {};
  const events = item.events || [];

  const homeScore = typeof goals.home === 'number' ? goals.home : 0;
  const awayScore = typeof goals.away === 'number' ? goals.away : 0;
  const status = parseMatchStatus(fixture.status?.short);
  const homeTeamId = teams.home?.id || 'home';
  const awayTeamId = teams.away?.id || 'away';

  const mappedEvents: MatchEvent[] = Array.isArray(events)
    ? events.map((ev: any) => mapApiEvent(ev, homeTeamId))
    : [];

  const theme = detectTournamentTheme(league.id, league.name);

  const htHome = score.halftime?.home ?? null;
  const htAway = score.halftime?.away ?? null;
  const htScore: ScoreBoard | undefined =
    htHome !== null && htAway !== null ? { home: htHome, away: htAway } : undefined;

  return {
    id: String(fixture.id || `fixture-${Math.random().toString(36).substring(2, 8)}`),
    tournamentId: league.id || theme,
    tournamentName: league.name || 'Turnir',
    tournamentTheme: theme,
    round: league.round,
    status,
    minute: fixture.status?.elapsed ?? (status === 'FT' ? 90 : 0),
    startTime: fixture.date
      ? new Date(fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '18:00',
    league: {
      id: league.id || 'league',
      name: league.name || "Noma'lum liga",
      country: league.country || 'Xalqaro',
      logo: league.logo || getTournamentLogo(league.id || theme),
      round: league.round,
      season: league.season,
      theme,
    },
    homeTeam: {
      id: homeTeamId,
      name: teams.home?.name || 'Mezbon jamoa',
      logo: teams.home?.logo || getTeamLogo(homeTeamId, teams.home?.name),
      score: homeScore,
    },
    awayTeam: {
      id: awayTeamId,
      name: teams.away?.name || 'Mehmon jamoa',
      logo: teams.away?.logo || getTeamLogo(awayTeamId, teams.away?.name),
      score: awayScore,
    },
    score: { home: homeScore, away: awayScore },
    htScore,
    referee: fixture.referee || undefined,
    stadium: fixture.venue?.name
      ? `${fixture.venue.name}, ${fixture.venue.city || ''}`
      : undefined,
    events: mappedEvents,
  };
}

function mapApiStatistics(rawStats: any[]): MatchStats {
  const homeStats = rawStats[0]?.statistics || [];
  const awayStats = rawStats[1]?.statistics || [];

  const getStatVal = (list: any[], typeName: string): number => {
    const item = list.find(
      (s: any) => String(s.type || '').toLowerCase() === typeName.toLowerCase()
    );
    if (!item || item.value === null || item.value === undefined) return 0;
    const str = String(item.value).replace('%', '').trim();
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  };

  const ballPossession = {
    home: getStatVal(homeStats, 'Ball Possession') || 50,
    away: getStatVal(awayStats, 'Ball Possession') || 50,
  };

  const expectedGoals = {
    home: getStatVal(homeStats, 'expected_goals') || getStatVal(homeStats, 'xG') || 0,
    away: getStatVal(awayStats, 'expected_goals') || getStatVal(awayStats, 'xG') || 0,
  };

  const shotsOnTarget = {
    home: getStatVal(homeStats, 'Shots on Goal'),
    away: getStatVal(awayStats, 'Shots on Goal'),
  };

  const totalShots = {
    home: getStatVal(homeStats, 'Total Shots'),
    away: getStatVal(awayStats, 'Total Shots'),
  };

  const cornerKicks = {
    home: getStatVal(homeStats, 'Corner Kicks'),
    away: getStatVal(awayStats, 'Corner Kicks'),
  };

  const passesAccurate = {
    home: getStatVal(homeStats, 'Passes accurate'),
    away: getStatVal(awayStats, 'Passes accurate'),
  };

  const passAccuracyPct = {
    home: getStatVal(homeStats, 'Passes %'),
    away: getStatVal(awayStats, 'Passes %'),
  };

  return {
    ballPossession,
    possession: ballPossession,
    expectedGoals: expectedGoals.home || expectedGoals.away ? expectedGoals : undefined,
    totalShots,
    shotsOnTarget,
    blockedShots: {
      home: getStatVal(homeStats, 'Blocked Shots'),
      away: getStatVal(awayStats, 'Blocked Shots'),
    },
    cornerKicks,
    corners: cornerKicks,
    fouls: {
      home: getStatVal(homeStats, 'Fouls'),
      away: getStatVal(awayStats, 'Fouls'),
    },
    yellowCards: {
      home: getStatVal(homeStats, 'Yellow Cards'),
      away: getStatVal(awayStats, 'Yellow Cards'),
    },
    redCards: {
      home: getStatVal(homeStats, 'Red Cards'),
      away: getStatVal(awayStats, 'Red Cards'),
    },
    offsides: {
      home: getStatVal(homeStats, 'Offsides'),
      away: getStatVal(awayStats, 'Offsides'),
    },
    passesAccurate,
    passes: passesAccurate,
    passAccuracyPct,
    passAccuracy: passAccuracyPct,
  };
}

function mapApiStandings(apiStandings: any[]): StandingRow[] {
  const list = apiStandings?.[0]?.league?.standings?.[0] || apiStandings || [];

  return list.map((item: any) => {
    const rawForm = String(item.form || 'WDLWW').toUpperCase();
    const formArr: FormResult[] = rawForm
      .split('')
      .slice(-5)
      .map((char) => (char === 'W' || char === 'D' || char === 'L' ? char : 'D'));

    const rank = item.rank || 1;
    let zone: StandingRow['zone'] = 'none';
    if (rank <= 2) zone = 'ucl';
    else if (rank === 3) zone = 'uel';
    else if (rank >= 15) zone = 'relegation';

    const gf = item.all?.goals?.for ?? 0;
    const ga = item.all?.goals?.against ?? 0;
    const gd = item.goalsDiff ?? gf - ga;

    return {
      position: rank,
      team: {
        id: item.team?.id || `team-${rank}`,
        name: item.team?.name || "Noma'lum jamoa",
        logo: getTeamLogo(item.team?.id, item.team?.name),
      },
      played: item.all?.played ?? 0,
      won: item.all?.win ?? 0,
      drawn: item.all?.draw ?? 0,
      lost: item.all?.lose ?? 0,
      gf,
      ga,
      gd,
      goalsFor: gf,
      goalsAgainst: ga,
      goalDifference: gd,
      points: item.points ?? 0,
      form: formArr,
      zone,
    };
  });
}

function mapApiLineups(rawLineups: any[]): MatchLineups | undefined {
  if (!Array.isArray(rawLineups) || rawLineups.length < 2) return undefined;

  const mapTeamLineup = (teamData: any) => {
    const formation = teamData.formation || '4-3-3';
    const coach = teamData.coach?.name || 'Bosh murabbiy';
    const startXI: PlayerLineup[] = (teamData.startXI || []).map((p: any) => ({
      number: p.player?.number || 1,
      name: p.player?.name || "O'yinchi",
      pos: p.player?.pos || 'MF',
      grid: p.player?.grid || undefined,
      rating: 7.0,
    }));
    const substitutes: PlayerLineup[] = (teamData.substitutes || []).map((p: any) => ({
      number: p.player?.number || 12,
      name: p.player?.name || "O'yinchi",
      pos: p.player?.pos || 'MF',
    }));

    return { formation, coach, startXI, substitutes };
  };

  return {
    home: mapTeamLineup(rawLineups[0]),
    away: mapTeamLineup(rawLineups[1]),
  };
}

// ============================================================================
// 4. ASOSIY FOOTBALL API SERVISI (KESHLASH VA FALLBACK BILAN)
// ============================================================================

export const footballApi = {
  /**
   * Barcha o'yinlarni olish (jonli, yakunlangan va rejalashtirilgan)
   */
  async getAllMatches(dateStr?: string, forceRefresh?: boolean): Promise<Match[]> {
    const targetDate = dateStr || new Date().toISOString().split('T')[0];
    const cacheKey = `matches_${targetDate}`;

    // 1. Keshdan tekshirish (majburiy yangilanish bo'lmasa)
    if (!forceRefresh) {
      const cached = getCache<Match[]>(cacheKey);
      if (cached) return cached;
    }

    // 2. Agar API sozlanmagan bo'lsa -> boyitilgan mock ma'lumotlar
    if (!isApiConfigured()) {
      setCache(cacheKey, mockMatches, CacheTTL.FIXTURES);
      return mockMatches;
    }

    // 3. API-Sports dan so'rov
    try {
      const response = await apiClient.get('/fixtures', {
        params: { date: targetDate },
      });

      if (response.data?.response && response.data.response.length > 0) {
        const apiMatches = response.data.response.map(mapApiFixtureToMatch);
        // O'zbekiston Superligasi o'yinlari bugun yo'q bo'lsa, Superliga o'yinlarini ham saqlab qo'shish
        const hasSuperliga = apiMatches.some(
          (m: Match) => String(m.league?.id) === '353' || m.tournamentTheme === 'uz_superliga'
        );
        const finalMatches = hasSuperliga
          ? apiMatches
          : [...mockMatches.filter((m) => m.tournamentTheme === 'uz_superliga'), ...apiMatches];

        setCache(cacheKey, finalMatches, CacheTTL.FIXTURES);
        return finalMatches;
      }

      setCache(cacheKey, mockMatches, CacheTTL.FIXTURES);
      return mockMatches;
    } catch (error) {
      console.warn("API-Football so'rovi xatoligi, mockMatches qaytarildi:", error);
      return mockMatches;
    }
  },

  /**
   * Jonli (LIVE) o'yinlarni olish
   */
  async getLiveMatches(forceRefresh?: boolean): Promise<Match[]> {
    const cacheKey = 'matches_live';
    if (!forceRefresh) {
      const cached = getCache<Match[]>(cacheKey);
      if (cached) return cached;
    }

    if (!isApiConfigured()) {
      const live = mockMatches.filter((m) => m.status === 'LIVE' || m.status === 'HT');
      setCache(cacheKey, live, CacheTTL.LIVE_MATCHES);
      return live;
    }

    try {
      const response = await apiClient.get('/fixtures', {
        params: { live: 'all' },
      });

      if (response.data?.response && response.data.response.length > 0) {
        const liveMatches = response.data.response.map(mapApiFixtureToMatch);
        setCache(cacheKey, liveMatches, CacheTTL.LIVE_MATCHES);
        return liveMatches;
      }

      const fallbackLive = mockMatches.filter((m) => m.status === 'LIVE' || m.status === 'HT');
      setCache(cacheKey, fallbackLive, CacheTTL.LIVE_MATCHES);
      return fallbackLive;
    } catch (error) {
      console.warn("LIVE o'yinlar so'rovida xatolik, mockData ishlatildi:", error);
      return mockMatches.filter((m) => m.status === 'LIVE' || m.status === 'HT');
    }
  },

  /**
   * O'yinni ID bo'yicha olish
   */
  async getMatchById(id: string | number): Promise<Match | undefined> {
    const cacheKey = `match_${id}`;
    const cached = getCache<Match>(cacheKey);
    if (cached) return cached;

    if (!isApiConfigured()) {
      const found = mockMatches.find((m) => String(m.id) === String(id));
      if (found) setCache(cacheKey, found, CacheTTL.MATCH_DETAILS);
      return found;
    }

    try {
      const response = await apiClient.get('/fixtures', {
        params: { id },
      });

      if (response.data?.response && response.data.response.length > 0) {
        const match = mapApiFixtureToMatch(response.data.response[0]);
        setCache(cacheKey, match, CacheTTL.MATCH_DETAILS);
        return match;
      }

      return mockMatches.find((m) => String(m.id) === String(id));
    } catch (error) {
      console.warn(`Match #${id} API xatosi:`, error);
      return mockMatches.find((m) => String(m.id) === String(id));
    }
  },

  /**
   * O'yin statistikasini olish
   */
  async getMatchStats(matchId: string | number): Promise<MatchStats | undefined> {
    const cacheKey = `stats_${matchId}`;
    const cached = getCache<MatchStats>(cacheKey);
    if (cached) return cached;

    if (!isApiConfigured()) {
      const found = mockMatchStats[String(matchId)] || mockMatchStats['match-1'];
      if (found) setCache(cacheKey, found, CacheTTL.MATCH_DETAILS);
      return found;
    }

    try {
      const response = await apiClient.get('/fixtures/statistics', {
        params: { fixture: matchId },
      });

      if (
        response.data?.response &&
        Array.isArray(response.data.response) &&
        response.data.response.length >= 2
      ) {
        const stats = mapApiStatistics(response.data.response);
        setCache(cacheKey, stats, CacheTTL.MATCH_DETAILS);
        return stats;
      }

      return mockMatchStats[String(matchId)] || mockMatchStats['match-1'];
    } catch (error) {
      console.warn(`MatchStats #${matchId} API xatosi:`, error);
      return mockMatchStats[String(matchId)] || mockMatchStats['match-1'];
    }
  },

  /**
   * O'yin tarkiblari (Lineups) ni olish
   */
  async getMatchLineups(matchId: string | number): Promise<MatchLineups | undefined> {
    const cacheKey = `lineups_${matchId}`;
    const cached = getCache<MatchLineups>(cacheKey);
    if (cached) return cached;

    if (!isApiConfigured()) {
      const match = mockMatches.find((m) => String(m.id) === String(matchId));
      return match?.lineups;
    }

    try {
      const response = await apiClient.get('/fixtures/lineups', {
        params: { fixture: matchId },
      });

      if (response.data?.response && Array.isArray(response.data.response)) {
        const lineups = mapApiLineups(response.data.response);
        if (lineups) {
          setCache(cacheKey, lineups, CacheTTL.MATCH_DETAILS);
          return lineups;
        }
      }

      const match = mockMatches.find((m) => String(m.id) === String(matchId));
      return match?.lineups;
    } catch (error) {
      console.warn(`Lineups #${matchId} xatosi:`, error);
      const match = mockMatches.find((m) => String(m.id) === String(matchId));
      return match?.lineups;
    }
  },

  /**
   * Turnir jadvalini olish
   */
  async getStandings(
    leagueId?: string | number,
    season?: string | number
  ): Promise<StandingRow[]> {
    const targetLeague = leagueId || 353; // Default: O'zbekiston Superligasi
    const targetSeason = season || 2026;
    const cacheKey = `standings_${targetLeague}_${targetSeason}`;

    const cached = getCache<StandingRow[]>(cacheKey);
    if (cached) return cached;

    if (!isApiConfigured()) {
      setCache(cacheKey, mockStandings, CacheTTL.STANDINGS);
      return mockStandings;
    }

    try {
      const response = await apiClient.get('/standings', {
        params: {
          league: targetLeague,
          season: targetSeason,
        },
      });

      if (response.data?.response && response.data.response.length > 0) {
        const standings = mapApiStandings(response.data.response);
        setCache(cacheKey, standings, CacheTTL.STANDINGS);
        return standings;
      }

      setCache(cacheKey, mockStandings, CacheTTL.STANDINGS);
      return mockStandings;
    } catch (error) {
      console.warn("Standings API xatosi, mockStandings ishlatildi:", error);
      return mockStandings;
    }
  },

  /**
   * Futbol yangiliklarini olish
   */
  async getNews(): Promise<NewsItem[]> {
    return Promise.resolve(mockNews);
  },
};

export default footballApi;
