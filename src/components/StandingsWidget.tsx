import React, { useState } from 'react';
import { Trophy, Target, Award } from 'lucide-react';
import type { StandingRow, FormResult } from '../types/football';
import { TeamCrest } from './TeamCrest';
import { mockStandings, mockTopScorers, mockTopAssists } from '../services/mockData';
import { getTeamLogo } from '../services/teamLogos';

export type TournamentKey = 'uz_superliga' | 'ucl' | 'uel' | 'premier_league' | 'laliga';

export interface StandingsWidgetProps {
  initialTournament?: TournamentKey;
  onTeamClick?: (teamId: string | number) => void;
  className?: string;
}

// Barcha 5 ta liga uchun boyitilgan rasmiy jadvallar
const TOURNAMENT_STANDINGS: Record<
  TournamentKey,
  {
    title: string;
    subtitle: string;
    season: string;
    theme: {
      gradient: string;
      accent: string;
      badge: string;
      border: string;
    };
    rows: StandingRow[];
  }
> = {
  uz_superliga: {
    title: "O'zbekiston Superligasi",
    subtitle: '2026-yilgi mavsum turnir jadvali',
    season: '2026',
    theme: {
      gradient: 'from-[#06241c] via-[#093329] to-[#0a0f14]',
      accent: 'text-[#10b981]',
      badge: 'bg-[#10b981]/20 border-[#10b981]/40 text-[#6ee7b7]',
      border: 'border-[#065f46]/60',
    },
    rows: mockStandings,
  },
  ucl: {
    title: 'UEFA Champions League',
    subtitle: 'Umumiy liga bosqichi jadvali',
    season: '2025/26',
    theme: {
      gradient: 'from-[#0a1128] via-[#0e1b4d] to-[#090d16]',
      accent: 'text-[#93c5fd]',
      badge: 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#93c5fd]',
      border: 'border-[#1e3a8a]/60',
    },
    rows: [
      {
        position: 1,
        team: { id: 'real_madrid', name: 'Real Madrid', shortName: 'RMA', logo: getTeamLogo('real', 'Real Madrid') },
        played: 6, won: 5, drawn: 1, lost: 0, gf: 16, ga: 5, gd: 11, goalsFor: 16, goalsAgainst: 5, goalDifference: 11, points: 16,
        form: ['W', 'W', 'W', 'D', 'W'], zone: 'ucl',
      },
      {
        position: 2,
        team: { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', logo: getTeamLogo('liverpool', 'Liverpool') },
        played: 6, won: 5, drawn: 0, lost: 1, gf: 14, ga: 4, gd: 10, goalsFor: 14, goalsAgainst: 4, goalDifference: 10, points: 15,
        form: ['W', 'W', 'L', 'W', 'W'], zone: 'ucl',
      },
      {
        position: 3,
        team: { id: 'man_city', name: 'Manchester City', shortName: 'MCI', logo: getTeamLogo('mancity', 'Man City') },
        played: 6, won: 4, drawn: 2, lost: 0, gf: 15, ga: 6, gd: 9, goalsFor: 15, goalsAgainst: 6, goalDifference: 9, points: 14,
        form: ['W', 'D', 'W', 'W', 'D'], zone: 'ucl',
      },
      {
        position: 4,
        team: { id: 'bayern', name: 'Bayern Munich', shortName: 'BAY', logo: getTeamLogo('bayern', 'Bayern Munich') },
        played: 6, won: 4, drawn: 1, lost: 1, gf: 18, ga: 8, gd: 10, goalsFor: 18, goalsAgainst: 8, goalDifference: 10, points: 13,
        form: ['W', 'W', 'D', 'W', 'L'], zone: 'ucl',
      },
      {
        position: 5,
        team: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', logo: getTeamLogo('arsenal', 'Arsenal') },
        played: 6, won: 4, drawn: 1, lost: 1, gf: 11, ga: 4, gd: 7, goalsFor: 11, goalsAgainst: 4, goalDifference: 7, points: 13,
        form: ['W', 'D', 'W', 'W', 'L'], zone: 'ucl',
      },
      {
        position: 6,
        team: { id: 'barcelona', name: 'Barcelona', shortName: 'BAR', logo: getTeamLogo('barcelona', 'Barcelona') },
        played: 6, won: 4, drawn: 0, lost: 2, gf: 17, ga: 9, gd: 8, goalsFor: 17, goalsAgainst: 9, goalDifference: 8, points: 12,
        form: ['L', 'W', 'W', 'W', 'W'], zone: 'ucl',
      },
      {
        position: 7,
        team: { id: 'inter', name: 'Inter Milan', shortName: 'INT', logo: getTeamLogo('inter', 'Inter') },
        played: 6, won: 3, drawn: 2, lost: 1, gf: 9, ga: 4, gd: 5, goalsFor: 9, goalsAgainst: 4, goalDifference: 5, points: 11,
        form: ['W', 'D', 'W', 'D', 'L'], zone: 'ucl',
      },
      {
        position: 8,
        team: { id: 'psg', name: 'Paris Saint-Germain', shortName: 'PSG', logo: getTeamLogo('psg', 'PSG') },
        played: 6, won: 3, drawn: 1, lost: 2, gf: 10, ga: 7, gd: 3, goalsFor: 10, goalsAgainst: 7, goalDifference: 3, points: 10,
        form: ['W', 'L', 'D', 'W', 'W'], zone: 'ucl',
      },
    ],
  },
  premier_league: {
    title: 'Premier League',
    subtitle: 'Angliya Chempionati jadvali',
    season: '2025/26',
    theme: {
      gradient: 'from-[#1e072b] via-[#2e0b40] to-[#0d0a12]',
      accent: 'text-[#f472b6]',
      badge: 'bg-[#e11d48]/20 border-[#e11d48]/40 text-[#f472b6]',
      border: 'border-[#701a75]/60',
    },
    rows: [
      {
        position: 1,
        team: { id: 'liverpool', name: 'Liverpool', shortName: 'LIV', logo: getTeamLogo('liverpool', 'Liverpool') },
        played: 24, won: 18, drawn: 4, lost: 2, gf: 55, ga: 21, gd: 34, goalsFor: 55, goalsAgainst: 21, goalDifference: 34, points: 58,
        form: ['W', 'W', 'W', 'D', 'W'], zone: 'ucl',
      },
      {
        position: 2,
        team: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', logo: getTeamLogo('arsenal', 'Arsenal') },
        played: 24, won: 16, drawn: 5, lost: 3, gf: 49, ga: 22, gd: 27, goalsFor: 49, goalsAgainst: 22, goalDifference: 27, points: 53,
        form: ['W', 'W', 'D', 'W', 'W'], zone: 'ucl',
      },
      {
        position: 3,
        team: { id: 'man_city', name: 'Manchester City', shortName: 'MCI', logo: getTeamLogo('mancity', 'Man City') },
        played: 24, won: 15, drawn: 6, lost: 3, gf: 52, ga: 26, gd: 26, goalsFor: 52, goalsAgainst: 26, goalDifference: 26, points: 51,
        form: ['D', 'W', 'W', 'L', 'W'], zone: 'ucl',
      },
      {
        position: 4,
        team: { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', logo: getTeamLogo('chelsea', 'Chelsea') },
        played: 24, won: 13, drawn: 5, lost: 6, gf: 44, ga: 30, gd: 14, goalsFor: 44, goalsAgainst: 30, goalDifference: 14, points: 44,
        form: ['W', 'L', 'W', 'D', 'W'], zone: 'ucl',
      },
      {
        position: 5,
        team: { id: 'newcastle', name: 'Newcastle United', shortName: 'NEW', logo: getTeamLogo('newcastle', 'Newcastle') },
        played: 24, won: 12, drawn: 5, lost: 7, gf: 39, ga: 28, gd: 11, goalsFor: 39, goalsAgainst: 28, goalDifference: 11, points: 41,
        form: ['W', 'W', 'L', 'W', 'D'], zone: 'uel',
      },
      {
        position: 6,
        team: { id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'TOT', logo: getTeamLogo('tottenham', 'Tottenham') },
        played: 24, won: 11, drawn: 4, lost: 9, gf: 46, ga: 35, gd: 11, goalsFor: 46, goalsAgainst: 35, goalDifference: 11, points: 37,
        form: ['L', 'W', 'L', 'W', 'W'], zone: 'none',
      },
    ],
  },
  laliga: {
    title: 'LaLiga EA Sports',
    subtitle: 'Ispaniya Chempionati jadvali',
    season: '2025/26',
    theme: {
      gradient: 'from-[#26090c] via-[#380d12] to-[#0f0a0b]',
      accent: 'text-[#fca5a5]',
      badge: 'bg-[#ef4444]/20 border-[#ef4444]/40 text-[#fca5a5]',
      border: 'border-[#991b1b]/60',
    },
    rows: [
      {
        position: 1,
        team: { id: 'barcelona', name: 'Barcelona', shortName: 'BAR', logo: getTeamLogo('barcelona', 'Barcelona') },
        played: 23, won: 18, drawn: 2, lost: 3, gf: 61, ga: 24, gd: 37, goalsFor: 61, goalsAgainst: 24, goalDifference: 37, points: 56,
        form: ['W', 'W', 'W', 'W', 'L'], zone: 'ucl',
      },
      {
        position: 2,
        team: { id: 'real_madrid', name: 'Real Madrid', shortName: 'RMA', logo: getTeamLogo('real', 'Real Madrid') },
        played: 23, won: 17, drawn: 4, lost: 2, gf: 53, ga: 21, gd: 32, goalsFor: 53, goalsAgainst: 21, goalDifference: 32, points: 55,
        form: ['W', 'W', 'D', 'W', 'W'], zone: 'ucl',
      },
      {
        position: 3,
        team: { id: 'atletico', name: 'Atletico Madrid', shortName: 'ATM', logo: getTeamLogo('atletico', 'Atletico Madrid') },
        played: 23, won: 14, drawn: 6, lost: 3, gf: 40, ga: 17, gd: 23, goalsFor: 40, goalsAgainst: 17, goalDifference: 23, points: 48,
        form: ['W', 'D', 'W', 'W', 'D'], zone: 'ucl',
      },
      {
        position: 4,
        team: { id: 'athletic', name: 'Athletic Club', shortName: 'ATH', logo: getTeamLogo('athletic', 'Athletic Club') },
        played: 23, won: 12, drawn: 6, lost: 5, gf: 35, ga: 22, gd: 13, goalsFor: 35, goalsAgainst: 22, goalDifference: 13, points: 42,
        form: ['W', 'W', 'L', 'D', 'W'], zone: 'ucl',
      },
      {
        position: 5,
        team: { id: 'villarreal', name: 'Villarreal', shortName: 'VIL', logo: getTeamLogo('villarreal', 'Villarreal') },
        played: 23, won: 11, drawn: 5, lost: 7, gf: 39, ga: 33, gd: 6, goalsFor: 39, goalsAgainst: 33, goalDifference: 6, points: 38,
        form: ['L', 'W', 'W', 'D', 'L'], zone: 'uel',
      },
    ],
  },
  uel: {
    title: 'UEFA Europa League',
    subtitle: 'Yevropa Ligasi umumiy bosqichi',
    season: '2025/26',
    theme: {
      gradient: 'from-[#1a0f07] via-[#2b1405] to-[#0d0d0d]',
      accent: 'text-[#fdba74]',
      badge: 'bg-[#f97316]/20 border-[#f97316]/40 text-[#fdba74]',
      border: 'border-[#c2410c]/60',
    },
    rows: [
      {
        position: 1,
        team: { id: 'lazio', name: 'Lazio', shortName: 'LAZ', logo: getTeamLogo('lazio', 'Lazio') },
        played: 6, won: 5, drawn: 1, lost: 0, gf: 13, ga: 3, gd: 10, goalsFor: 13, goalsAgainst: 3, goalDifference: 10, points: 16,
        form: ['W', 'W', 'W', 'D', 'W'], zone: 'uel',
      },
      {
        position: 2,
        team: { id: 'athletic', name: 'Athletic Club', shortName: 'ATH', logo: getTeamLogo('athletic', 'Athletic Club') },
        played: 6, won: 5, drawn: 1, lost: 0, gf: 11, ga: 2, gd: 9, goalsFor: 11, goalsAgainst: 2, goalDifference: 9, points: 16,
        form: ['W', 'W', 'W', 'W', 'D'], zone: 'uel',
      },
      {
        position: 3,
        team: { id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'TOT', logo: getTeamLogo('tottenham', 'Tottenham') },
        played: 6, won: 4, drawn: 1, lost: 1, gf: 14, ga: 6, gd: 8, goalsFor: 14, goalsAgainst: 6, goalDifference: 8, points: 13,
        form: ['W', 'L', 'W', 'W', 'D'], zone: 'uel',
      },
      {
        position: 4,
        team: { id: 'man_utd', name: 'Manchester United', shortName: 'MUN', logo: getTeamLogo('manutd', 'Man United') },
        played: 6, won: 3, drawn: 3, lost: 0, gf: 12, ga: 7, gd: 5, goalsFor: 12, goalsAgainst: 7, goalDifference: 5, points: 12,
        form: ['W', 'W', 'D', 'D', 'W'], zone: 'uel',
      },
    ],
  },
};

export const StandingsWidget: React.FC<StandingsWidgetProps> = ({
  initialTournament = 'uz_superliga',
  onTeamClick,
  className = '',
}) => {
  const [selectedTournament, setSelectedTournament] = useState<TournamentKey>(initialTournament);
  const [viewMode, setViewMode] = useState<'standings' | 'scorers' | 'assists'>('standings');

  const currentData = TOURNAMENT_STANDINGS[selectedTournament] || TOURNAMENT_STANDINGS.uz_superliga;
  const currentScorers = mockTopScorers[selectedTournament] || mockTopScorers.uz_superliga || [];
  const currentAssists = mockTopAssists[selectedTournament] || mockTopAssists.uz_superliga || [];

  // Oxirgi 5 o'yin formasi doirachasi
  const renderFormCircle = (result: FormResult, idx: number) => {
    let bg = 'bg-gray-700 text-gray-300';
    let label = 'D';

    if (result === 'W') {
      bg = 'bg-[#10b981] text-black font-black shadow-sm shadow-[#10b981]/40';
      label = 'G';
    } else if (result === 'D') {
      bg = 'bg-amber-500 text-black font-black';
      label = 'D';
    } else if (result === 'L') {
      bg = 'bg-rose-600 text-white font-black';
      label = 'M';
    }

    return (
      <span
        key={idx}
        title={result === 'W' ? "G'alaba" : result === 'D' ? 'Durang' : "Mag'lubiyat"}
        className={`inline-flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full text-[9px] sm:text-[10px] tracking-tight ${bg}`}
      >
        {label}
      </span>
    );
  };

  // Turnir bo'yicha chiziq indikatori rangi
  const getZoneBorderColor = (row: StandingRow, index: number, total: number) => {
    if (row.zone === 'ucl') return 'border-l-4 border-l-blue-500';
    if (row.zone === 'uel') return 'border-l-4 border-l-orange-500';
    if (row.zone === 'relegation') return 'border-l-4 border-l-rose-500';

    if (selectedTournament === 'ucl') {
      if (index < 8) return 'border-l-4 border-l-blue-500';
      return 'border-l-4 border-l-transparent';
    }
    if (selectedTournament === 'uel') {
      if (index < 8) return 'border-l-4 border-l-orange-500';
      return 'border-l-4 border-l-transparent';
    }
    // Superliga & Ligalar:
    if (index === 0) return 'border-l-4 border-l-[#10b981]'; // Chempion
    if (index < 3) return 'border-l-4 border-l-blue-500'; // Xalqaro zona
    if (index >= total - 2) return 'border-l-4 border-l-rose-500'; // Quyi liga
    return 'border-l-4 border-l-transparent';
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${currentData.theme.border} bg-[#0b0e14] shadow-xl transition-all ${className}`}
    >
      {/* Sarlavha qismi (Tanlangan turnir gradienti bilan) */}
      <div
        className={`relative border-b border-[#1f293d] p-3.5 sm:p-4 bg-gradient-to-r ${currentData.theme.gradient}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/40 border border-white/10 text-white shadow-inner">
              <Trophy className={`h-4 w-4 ${currentData.theme.accent}`} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{currentData.title}</span>
                <span className="rounded bg-black/40 px-1.5 py-0.2 text-[10px] font-black text-gray-300 border border-white/10">
                  {currentData.season}
                </span>
              </h2>
              <p className="text-[11px] text-gray-400">{currentData.subtitle}</p>
            </div>
          </div>

          <span
            className={`hidden xs:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${currentData.theme.badge}`}
          >
            Jadval
          </span>
        </div>

        {/* Turnir tanlash selektori (Kichik Tablar) */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {[
            { id: 'uz_superliga', label: 'Superliga' },
            { id: 'ucl', label: 'UCL' },
            { id: 'premier_league', label: 'EPL' },
            { id: 'laliga', label: 'La Liga' },
            { id: 'uel', label: 'UEL' },
          ].map((t) => {
            const isSelected = selectedTournament === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTournament(t.id as TournamentKey)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-black shadow-md'
                    : 'bg-black/40 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Jadval / To'purarlar / Asistentlar rejimi */}
        <div className="mt-2.5 flex items-center gap-1 border-t border-white/10 pt-2">
          <button
            type="button"
            onClick={() => setViewMode('standings')}
            className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-1 text-xs font-bold transition-all ${
              viewMode === 'standings'
                ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="h-3 w-3" />
            <span>Jadval</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('scorers')}
            className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-1 text-xs font-bold transition-all ${
              viewMode === 'scorers'
                ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Target className="h-3 w-3" />
            <span>To'purarlar</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('assists')}
            className={`flex-1 flex items-center justify-center gap-1 rounded-lg py-1 text-xs font-bold transition-all ${
              viewMode === 'assists'
                ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Award className="h-3 w-3" />
            <span>Asistentlar</span>
          </button>
        </div>
      </div>

      {/* 1. JADVAL TANASI (SofaScore zich tartibi) */}
      {viewMode === 'standings' && (
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1f293d] bg-[#131722]/80 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-400">
                <th scope="col" className="w-9 sm:w-11 py-2 text-center">
                  #
                </th>
                <th scope="col" className="min-w-[130px] sm:min-w-[170px] py-2 px-2">
                  Jamoa
                </th>
                <th scope="col" className="w-8 py-2 text-center" title="O'yinlar">
                  O'
                </th>
                <th scope="col" className="w-8 py-2 text-center" title="G'alaba">
                  G'
                </th>
                <th scope="col" className="w-8 py-2 text-center" title="Durang">
                  D
                </th>
                <th scope="col" className="w-8 py-2 text-center" title="Mag'lubiyat">
                  M
                </th>
                <th scope="col" className="hidden sm:table-cell w-12 py-2 text-center" title="To'plar nisbati">
                  T/N
                </th>
                <th scope="col" className="w-9 py-2 text-center" title="To'plar farqi">
                  +/-
                </th>
                <th scope="col" className="w-10 py-2 text-center font-black text-white" title="Ochko">
                  O
                </th>
                <th scope="col" className="hidden md:table-cell py-2 px-2 text-center min-w-[120px]" title="Oxirgi 5 o'yin formasi">
                  Forma
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f293d]/50 bg-[#0b0e14]">
              {currentData.rows.map((row, idx) => {
                const total = currentData.rows.length;
                const borderClass = getZoneBorderColor(row, idx, total);

                return (
                  <tr
                    key={row.team.id}
                    onClick={() => onTeamClick && onTeamClick(row.team.id)}
                    className={`group transition-colors hover:bg-[#131722] cursor-pointer ${borderClass}`}
                  >
                    <td className="py-2.5 text-center font-mono font-bold text-gray-400 group-hover:text-white">
                      {row.position}
                    </td>

                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <TeamCrest
                          name={row.team.name}
                          logoUrl={row.team.logo}
                          crestDetails={row.team.crestDetails}
                          size="xs"
                        />
                        <span className="truncate font-semibold text-gray-200 group-hover:text-white group-hover:underline">
                          {row.team.shortName || row.team.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 text-center text-gray-400 font-mono">{row.played}</td>
                    <td className="py-2.5 text-center text-gray-400 font-mono">{row.won}</td>
                    <td className="py-2.5 text-center text-gray-400 font-mono">{row.drawn}</td>
                    <td className="py-2.5 text-center text-gray-400 font-mono">{row.lost}</td>
                    <td className="hidden sm:table-cell py-2.5 text-center text-gray-400 font-mono text-[11px]">
                      {row.gf}-{row.ga}
                    </td>
                    <td
                      className={`py-2.5 text-center font-mono font-semibold ${
                        row.gd > 0
                          ? 'text-emerald-400'
                          : row.gd < 0
                          ? 'text-rose-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="py-2.5 text-center font-black text-white font-mono text-sm bg-white/[0.02]">
                      {row.points}
                    </td>
                    <td className="hidden md:table-cell py-2.5 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {row.form && row.form.map((res, i) => renderFormCircle(res, i))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. TO'PURARLAR RO'YXATI */}
      {viewMode === 'scorers' && (
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1f293d] bg-[#131722]/80 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-400">
                <th scope="col" className="w-9 py-2 text-center">#</th>
                <th scope="col" className="py-2 px-2">Futbolchi</th>
                <th scope="col" className="py-2 px-2">Jamoa</th>
                <th scope="col" className="w-10 py-2 text-center" title="O'yinlar">O'</th>
                <th scope="col" className="w-10 py-2 text-center" title="Penaltilar">Pen</th>
                <th scope="col" className="w-12 py-2 text-center font-black text-[#10b981]" title="Gollar">G</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f293d]/50 bg-[#0b0e14]">
              {currentScorers.map((player) => (
                <tr key={player.name} className="hover:bg-[#131722] transition-colors">
                  <td className="py-2.5 text-center font-mono font-bold text-gray-400">
                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {player.countryFlag && <span className="text-sm shrink-0">{player.countryFlag}</span>}
                      <span className="font-bold text-white truncate">{player.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <TeamCrest name={player.team} logoUrl={player.teamLogo} size="xs" />
                      <span className="text-gray-300 truncate">{player.team}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-center font-mono text-gray-400">{player.matches}</td>
                  <td className="py-2.5 text-center font-mono text-gray-500">{player.penalties ?? 0}</td>
                  <td className="py-2.5 text-center font-mono font-black text-sm text-[#10b981] bg-emerald-500/5">
                    {player.goals}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. ASISTENTLAR RO'YXATI */}
      {viewMode === 'assists' && (
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1f293d] bg-[#131722]/80 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-400">
                <th scope="col" className="w-9 py-2 text-center">#</th>
                <th scope="col" className="py-2 px-2">Futbolchi</th>
                <th scope="col" className="py-2 px-2">Jamoa</th>
                <th scope="col" className="w-10 py-2 text-center" title="O'yinlar">O'</th>
                <th scope="col" className="w-12 py-2 text-center font-black text-[#38bdf8]" title="Golli uzatmalar">A</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f293d]/50 bg-[#0b0e14]">
              {currentAssists.map((player) => (
                <tr key={player.name} className="hover:bg-[#131722] transition-colors">
                  <td className="py-2.5 text-center font-mono font-bold text-gray-400">
                    {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {player.countryFlag && <span className="text-sm shrink-0">{player.countryFlag}</span>}
                      <span className="font-bold text-white truncate">{player.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <TeamCrest name={player.team} logoUrl={player.teamLogo} size="xs" />
                      <span className="text-gray-300 truncate">{player.team}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-center font-mono text-gray-400">{player.matches}</td>
                  <td className="py-2.5 text-center font-mono font-black text-sm text-[#38bdf8] bg-sky-500/5">
                    {player.assists}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Zonalarning tushuntirish paneli */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#1f293d] bg-[#0f131c] px-3.5 py-2 text-[10px] text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#10b981]" /> OChL / Chempion
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> UCL / Xalqaro
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Quyi liga
          </span>
        </div>
        <span className="text-gray-500">Jonli yangilanish</span>
      </div>
    </div>
  );
};
