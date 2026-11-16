/**
 * UzScore — Futbol Ma'lumotlar Tizimi (Types & Data Contracts)
 * SofaScore standarti bo'yicha professional tiplashtirish
 */

export type TournamentTheme =
  | 'ucl'
  | 'uel'
  | 'uel_conf'
  | 'uz_superliga'
  | 'premier_league'
  | 'laliga'
  | 'serie_a';

export type MatchStatus = 'LIVE' | 'HT' | 'FT' | 'SCHEDULED' | 'FINISHED';

export type EventType =
  | 'GOAL'
  | 'OWN_GOAL'
  | 'PENALTY'
  | 'YELLOW'
  | 'RED'
  | 'SUB'
  | 'VAR'
  | 'YELLOW_CARD'
  | 'RED_CARD'
  | 'SUBSTITUTION'
  | 'PENALTY_MISSED';

export interface MatchEvent {
  id: string | number;
  minute: number;
  extraMinute?: number;
  type: EventType;
  team: 'home' | 'away';
  player: string;
  assistPlayer?: string;
  assist?: string; // Orqaga moslik uchun
  detail?: string;
}

export interface PlayerLineup {
  number: number;
  name: string;
  pos: 'GK' | 'DF' | 'MF' | 'FW' | string;
  rating?: number; // Masalan 8.4
  grid?: string; // Masalan '1:1', '2:3'
  isCaptain?: boolean;
  photo?: string;
  country?: string;
  countryFlag?: string;
}

export interface MatchLineup {
  formation: string; // Masalan '4-3-3', '4-2-3-1'
  coach: string;
  startXI: PlayerLineup[];
  substitutes: PlayerLineup[];
}

export interface MatchLineups {
  home: MatchLineup;
  away: MatchLineup;
}

export interface TeamCrestDetails {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  textColor?: string;
  shieldShape?: 'classic' | 'pointed' | 'round' | 'diamond' | 'crown';
  stars?: number;
  year?: string;
}

export interface TeamInfo {
  id: number | string;
  name: string;
  shortName?: string;
  logo: string;
  score: number;
  crestDetails?: TeamCrestDetails;
}

export interface LeagueInfo {
  id: number | string;
  name: string;
  country: string;
  logo: string;
  round?: string;
  season?: number | string;
  theme?: TournamentTheme;
}

export interface StatPair {
  home: number;
  away: number;
}

export interface ScoreBoard {
  home: number;
  away: number;
}

export interface MatchStats {
  ballPossession?: StatPair;
  expectedGoals?: StatPair; // xG (Expected Goals)
  bigChances?: StatPair;
  totalShots?: StatPair;
  shotsOnTarget?: StatPair;
  blockedShots?: StatPair;
  cornerKicks?: StatPair;
  offsides?: StatPair;
  fouls?: StatPair;
  yellowCards?: StatPair;
  redCards?: StatPair;
  passesAccurate?: StatPair;
  passAccuracyPct?: StatPair;

  // Orqaga moslik aliaslari:
  possession?: StatPair;
  corners?: StatPair;
  passes?: StatPair;
  passAccuracy?: StatPair;
}

export interface Match {
  id: string | number;
  tournamentId?: string | number;
  tournamentName?: string;
  tournamentTheme?: TournamentTheme;
  round?: string;
  status: MatchStatus;
  minute: number;
  startTime: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  score: ScoreBoard;
  htScore?: ScoreBoard;
  xG?: ScoreBoard;
  referee?: string;
  stadium?: string;
  attendance?: number;
  events: MatchEvent[];
  stats?: MatchStats;
  lineups?: MatchLineups;

  // UI komponentlar uchun moslik:
  league: LeagueInfo;
}

export type FormResult = 'W' | 'D' | 'L';

export interface StandingTeam {
  id: number | string;
  name: string;
  logo: string;
  shortName?: string;
  crestDetails?: TeamCrestDetails;
}

export interface StandingRow {
  position: number;
  team: StandingTeam;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number; // Goals For
  ga: number; // Goals Against
  gd: number; // Goal Difference
  points: number;
  form: FormResult[];
  zone?: 'ucl' | 'uel' | 'promotion' | 'relegation' | 'none';

  // Orqaga moslik maydonlari:
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface NewsItem {
  id: string | number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  teamTag: string;
  publishedAt: string;
  author?: string;
  readTimeMinutes?: number;
}

export interface TopPlayerStat {
  rank: number;
  name: string;
  team: string;
  teamId?: string | number;
  teamLogo?: string;
  goals?: number;
  assists?: number;
  penalties?: number;
  matches: number;
  photo?: string;
  country?: string;
  countryFlag?: string;
}
