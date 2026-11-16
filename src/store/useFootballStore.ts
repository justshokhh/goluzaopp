/**
 * UzScore — Global State Store (Zustand)
 * Principal Frontend Architecture bo'yicha professional tuzilma.
 *
 * Jonli Simulyatsiya Dvigateli:
 *  - Har 7 soniyada LIVE o'yinlarning daqiqasini oshiradi
 *  - Vaqti-vaqti bilan gol, xG oshishi va sariq kartochkani simulyatsiya qiladi
 *  - Gol bo'lganda: 4s GOAL_FLASH effekti + "GOOOOL!" xabarnomasi
 */

import { create } from 'zustand';
import type { Match, MatchEvent } from '../types/football';
import { mockMatches } from '../services/mockData';
import { footballApi, isApiConfigured } from '../services/footballApi';

// ============================================================================
// TIPLAR
// ============================================================================

export type TournamentId =
  | 'ALL'
  | 'ucl'
  | 'uel'
  | 'uz_superliga'
  | 'premier_league'
  | 'laliga';

export type ActiveTab =
  | 'ALL'
  | 'LIVE'
  | 'FINISHED'
  | 'SCHEDULED'
  | 'FAVORITES';

export type DateOffset = -1 | 0 | 1; // Kecha | Bugun | Ertaga

export interface GoalNotification {
  id: string;
  matchId: string | number;
  homeTeam: string;
  awayTeam: string;
  scorer: string;
  minute: number;
  score: { home: number; away: number };
  team: 'home' | 'away';
}

// ============================================================================
// STORE INTERFEYSI
// ============================================================================

export interface FootballStore {
  // --- UI holati ---
  selectedTournament: TournamentId;
  activeTab: ActiveTab;
  selectedDate: DateOffset;
  selectedMatchId: string | number | null;
  searchQuery: string;
  favorites: Set<string | number>;

  // --- O'yinlar ma'lumotlari ---
  matches: Match[];
  isRealApiActive: boolean;
  isLoadingMatches: boolean;

  // --- Jonli simulyatsiya ---
  goalFlashIds: Set<string | number>;        // 4s yashil yonib-o'chisin
  goalNotification: GoalNotification | null; // "GOOOOL!" xabarnomasi
  simulationActive: boolean;
  _intervalId: ReturnType<typeof setInterval> | null;

  // --- Actionlar ---
  setSelectedTournament: (t: TournamentId) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedDate: (d: DateOffset) => void;
  setSelectedMatchId: (id: string | number | null) => void;
  setSearchQuery: (q: string) => void;
  toggleFavorite: (id: string | number) => void;
  dismissGoalNotification: () => void;
  fetchRealMatches: (forceRefresh?: boolean) => Promise<void>;
  setCustomApiKey: (key: string) => void;

  // --- Avtomatik yangilanish (Smart Polling) ---
  isPollingActive: boolean;
  pollingIntervalSeconds: number;
  lastPollTime: number | null;
  _pollingIntervalId: ReturnType<typeof setInterval> | null;
  startPolling: () => void;
  stopPolling: () => void;
  togglePolling: () => void;
  setPollingIntervalSeconds: (sec: number) => void;

  // --- Simulyatsiya boshqaruvi ---
  startSimulation: () => void;
  stopSimulation: () => void;
  _tick: () => void;
}

// ============================================================================
// YORDAMCHI FUNKSIYALAR
// ============================================================================

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const GOAL_PROBABILITY = 0.18;    // Har tickda gol urilishi ehtimoli
const YELLOW_PROBABILITY = 0.12;  // Sariq kartochka ehtimoli
const XG_BOOST_PROBABILITY = 0.35; // xG oshishi ehtimoli

function generateGoalEvent(
  match: Match,
): MatchEvent {
  const team: 'home' | 'away' = Math.random() < 0.5 ? 'home' : 'away';
  const players = [
    'Simulyatsiya Goli',
    'Cheran',
    'Tabatadze',
    'Sergeyev',
    'Saka',
    'Kane',
    'Musiala',
    'Bellingham',
    'Dybala',
  ];
  return {
    id: `sim-goal-${Date.now()}-${Math.random()}`,
    minute: match.minute,
    type: 'GOAL',
    team,
    player: players[randomInt(0, players.length - 1)],
    detail: 'Jonli Simulyatsiya Goli',
  };
}

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const useFootballStore = create<FootballStore>((set, get) => ({
  // --- Boshlang'ich holat ---
  selectedTournament: 'ALL',
  activeTab: 'ALL',
  selectedDate: 0,
  selectedMatchId: null,
  searchQuery: '',
  favorites: new Set(['match-1', 'match-ucl-1']),

  matches: mockMatches.map((m) => ({ ...m })),
  isRealApiActive: isApiConfigured(),
  isLoadingMatches: false,

  isPollingActive: true,
  pollingIntervalSeconds: 30,
  lastPollTime: null,
  _pollingIntervalId: null,

  goalFlashIds: new Set(),
  goalNotification: null,
  simulationActive: false,
  _intervalId: null,

  // ─── Actionlar ─────────────────────────────────────────────────────────────

  setSelectedTournament: (t) => set({ selectedTournament: t }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedDate: (d) => {
    set({ selectedDate: d });
    get().fetchRealMatches(true);
  },
  setSelectedMatchId: (id) => set({ selectedMatchId: id }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  setCustomApiKey: (key: string) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('uzscore_api_key', key.trim());
    }
    set({ isRealApiActive: isApiConfigured() });
    get().fetchRealMatches(true);
  },

  fetchRealMatches: async (forceRefresh?: boolean) => {
    set({ isLoadingMatches: true });
    try {
      const offset = get().selectedDate;
      const date = new Date();
      date.setDate(date.getDate() + offset);
      const dateStr = date.toISOString().split('T')[0];

      const oldMatches = get().matches;

      // 1. Jonli o'yinlarni olish (API-Sports /fixtures?live=all)
      const liveMatches = await footballApi.getLiveMatches(forceRefresh);

      // 2. Kunning barcha o'yinlarini olish (fixtures?date=...)
      const allMatches = await footballApi.getAllMatches(dateStr, forceRefresh);

      // 3. Jonli o'yinlar va kunlik o'yinlarni birlashtirish
      const mergedMap = new Map<string | number, Match>();

      // Avval jonli o'yinlarni ro'yxat boshiga qo'yish
      if (Array.isArray(liveMatches) && liveMatches.length > 0) {
        liveMatches.forEach((m) => mergedMap.set(m.id, m));
      }

      // Keyin kunlik fixtures qo'shish
      if (Array.isArray(allMatches) && allMatches.length > 0) {
        allMatches.forEach((m) => {
          if (!mergedMap.has(m.id)) {
            mergedMap.set(m.id, m);
          }
        });
      }

      const realMatches = Array.from(mergedMap.values());
      if (realMatches && realMatches.length > 0) {
        // Real vaqtda yangi gol urilganini aniqlash (Score comparison)
        realMatches.forEach((newM) => {
          const oldM = oldMatches.find((o) => o.id === newM.id);
          if (oldM) {
            const homeScored = (newM.score?.home ?? 0) > (oldM.score?.home ?? 0);
            const awayScored = (newM.score?.away ?? 0) > (oldM.score?.away ?? 0);
            if (homeScored || awayScored) {
              const scoringTeam = homeScored ? 'home' : 'away';

              // Yashil yonib-o'chish effekti
              set((s) => {
                const flash = new Set(s.goalFlashIds);
                flash.add(newM.id);
                return { goalFlashIds: flash };
              });
              setTimeout(() => {
                set((s) => {
                  const flash = new Set(s.goalFlashIds);
                  flash.delete(newM.id);
                  return { goalFlashIds: flash };
                });
              }, 4000);

              // "GOOOOL!" xabarnomasi
              const notif: GoalNotification = {
                id: `real-goal-${Date.now()}-${newM.id}`,
                matchId: newM.id,
                homeTeam: newM.homeTeam.name,
                awayTeam: newM.awayTeam.name,
                scorer: homeScored ? newM.homeTeam.name : newM.awayTeam.name,
                minute: newM.minute,
                score: newM.score,
                team: scoringTeam,
              };
              set({ goalNotification: notif });
              setTimeout(() => {
                set({ goalNotification: null });
              }, 6000);
            }
          }
        });

        set({
          matches: realMatches,
          isRealApiActive: isApiConfigured(),
          isLoadingMatches: false,
          lastPollTime: Date.now(),
        });
      } else {
        set({ isLoadingMatches: false });
      }
    } catch (err) {
      console.warn("Real API dan ma'lumot olishda xato:", err);
      set({ isLoadingMatches: false });
    }
  },

  startPolling: () => {
    const { _pollingIntervalId, pollingIntervalSeconds } = get();
    if (_pollingIntervalId) clearInterval(_pollingIntervalId);

    // Dastlabki yangilash
    get().fetchRealMatches(true);

    const id = setInterval(() => {
      // Agar foydalanuvchi sahifani yashirgan bo'lsa (hidden), so'rov yubormaslik (kvotani asraydi)
      if (typeof document !== 'undefined' && document.hidden) {
        return;
      }
      get().fetchRealMatches(true);
    }, pollingIntervalSeconds * 1000);

    set({ isPollingActive: true, _pollingIntervalId: id });
  },

  stopPolling: () => {
    const { _pollingIntervalId } = get();
    if (_pollingIntervalId) clearInterval(_pollingIntervalId);
    set({ isPollingActive: false, _pollingIntervalId: null });
  },

  togglePolling: () => {
    const { isPollingActive } = get();
    if (isPollingActive) {
      get().stopPolling();
    } else {
      get().startPolling();
    }
  },

  setPollingIntervalSeconds: (sec: number) => {
    set({ pollingIntervalSeconds: sec });
    if (get().isPollingActive) {
      get().startPolling();
    }
  },

  toggleFavorite: (id) =>
    set((state) => {
      const next = new Set(state.favorites);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { favorites: next };
    }),

  dismissGoalNotification: () => set({ goalNotification: null }),

  // ─── Jonli Simulyatsiya Dvigateli ──────────────────────────────────────────

  startSimulation: () => {
    const { simulationActive, _tick } = get();
    if (simulationActive) return;

    const id = setInterval(_tick, 7000);
    set({ simulationActive: true, _intervalId: id });
  },

  stopSimulation: () => {
    const { _intervalId } = get();
    if (_intervalId) {
      clearInterval(_intervalId);
    }
    set({ simulationActive: false, _intervalId: null });
  },

  _tick: () => {
    set((state) => {
      const updatedMatches = state.matches.map((match) => {
        // Faqat LIVE o'yinlarga tegish
        if (match.status !== 'LIVE') return match;

        // Daqiqani oshirish (90' ga yetsa FT ga o'tkazish)
        const newMinute = match.minute + 1;
        if (newMinute > 95) {
          return { ...match, status: 'FINISHED' as const, minute: 90 };
        }

        let updatedMatch = { ...match, minute: newMinute };
        const newEvents = [...(match.events || [])];

        // xG oshishi
        if (Math.random() < XG_BOOST_PROBABILITY && updatedMatch.xG) {
          const side = Math.random() < 0.5 ? 'home' : 'away';
          updatedMatch = {
            ...updatedMatch,
            xG: {
              ...updatedMatch.xG!,
              [side]: parseFloat(
                ((updatedMatch.xG?.[side as 'home' | 'away'] || 0) + 0.03).toFixed(2)
              ),
            },
          };
        }

        // Sariq kartochka
        if (Math.random() < YELLOW_PROBABILITY) {
          const team: 'home' | 'away' = Math.random() < 0.5 ? 'home' : 'away';
          newEvents.push({
            id: `sim-yellow-${Date.now()}`,
            minute: newMinute,
            type: 'YELLOW',
            team,
            player: 'Simulyatsiya Oyunchisi',
            detail: 'Qoidabuzarlik',
          });
          updatedMatch = { ...updatedMatch, events: newEvents };
        }

        return updatedMatch;
      });

      return { matches: updatedMatches };
    });

    // Gol simulyatsiyasi (alohida, flash uchun)
    if (Math.random() < GOAL_PROBABILITY) {
      set((state) => {
        const liveMatches = state.matches.filter((m) => m.status === 'LIVE');
        if (liveMatches.length === 0) return {};

        const target = liveMatches[randomInt(0, liveMatches.length - 1)];
        const scoringTeam: 'home' | 'away' = Math.random() < 0.5 ? 'home' : 'away';

        const newScore = {
          home: target.score.home + (scoringTeam === 'home' ? 1 : 0),
          away: target.score.away + (scoringTeam === 'away' ? 1 : 0),
        };

        const newEvent = generateGoalEvent(target);
        newEvent.team = scoringTeam;

        const updatedMatches = state.matches.map((m) => {
          if (m.id !== target.id) return m;
          return {
            ...m,
            score: newScore,
            homeTeam: { ...m.homeTeam, score: newScore.home },
            awayTeam: { ...m.awayTeam, score: newScore.away },
            events: [...(m.events || []), newEvent],
          };
        });

        // GOAL_FLASH: 4 soniya yashil yonib-o'chish
        const newFlashIds = new Set(state.goalFlashIds);
        newFlashIds.add(target.id);

        setTimeout(() => {
          useFootballStore.setState((s) => {
            const updated = new Set(s.goalFlashIds);
            updated.delete(target.id);
            return { goalFlashIds: updated };
          });
        }, 4000);

        // "GOOOOL!" xabarnomasi
        const notification: GoalNotification = {
          id: `notif-${Date.now()}`,
          matchId: target.id,
          homeTeam: target.homeTeam.name,
          awayTeam: target.awayTeam.name,
          scorer: newEvent.player,
          minute: target.minute,
          score: newScore,
          team: scoringTeam,
        };

        // 6 soniyadan keyin yopish
        setTimeout(() => {
          useFootballStore.setState({ goalNotification: null });
        }, 6000);

        return {
          matches: updatedMatches,
          goalFlashIds: newFlashIds,
          goalNotification: notification,
        };
      });
    }
  },
}));
