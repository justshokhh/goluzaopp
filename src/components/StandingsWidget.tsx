import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import type { StandingRow, FormResult } from '../types/football';
import { TeamCrest } from './TeamCrest';
import { mockStandings } from '../services/mockData';
import { getTeamLogo } from '../services/teamLogos';

export type TournamentKey = 'uz_superliga' | 'ucl' | 'premier_league' | 'laliga' | 'uel';

export interface StandingsWidgetProps {
  initialTournament?: TournamentKey;
  onTeamClick?: (teamId: string | number) => void;
  className?: string;
}

// 5 ta liga uchun rasmiy jadvallar
const TOURNAMENT_STANDINGS: Record<
  TournamentKey,
  {
    title: string;
    season: string;
    theme: {
      headerBg: string;
      accent: string;
      pillActive: string;
    };
    rows: StandingRow[];
  }
> = {
  uz_superliga: {
    title: "O'zbekiston Superligasi",
    season: '2026',
    theme: {
      headerBg: 'bg-gradient-to-r from-[#03140e] via-[#052119] to-[#050e0b]',
      accent: 'text-[#34d399]',
      pillActive: 'bg-[#10b981] text-black font-semibold',
    },
    rows: mockStandings,
  },
  ucl: {
    title: 'UEFA Champions League',
    season: '2025/26',
    theme: {
      headerBg: 'bg-gradient-to-r from-[#070e22] via-[#091536] to-[#070b18]',
      accent: 'text-[#38bdf8]',
      pillActive: 'bg-[#38bdf8] text-black font-semibold',
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
    season: '2025/26',
    theme: {
      headerBg: 'bg-gradient-to-r from-[#13051c] via-[#1e072c] to-[#0a0410]',
      accent: 'text-[#f472b6]',
      pillActive: 'bg-[#f472b6] text-black font-semibold',
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
    season: '2025/26',
    theme: {
      headerBg: 'bg-gradient-to-r from-[#160406] via-[#24080b] to-[#0a0304]',
      accent: 'text-[#f87171]',
      pillActive: 'bg-[#ef4444] text-white font-semibold',
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
    season: '2025/26',
    theme: {
      headerBg: 'bg-gradient-to-r from-[#120a05] via-[#1f1006] to-[#090706]',
      accent: 'text-[#fb923c]',
      pillActive: 'bg-[#f97316] text-black font-semibold',
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

  const currentData = TOURNAMENT_STANDINGS[selectedTournament] || TOURNAMENT_STANDINGS.uz_superliga;

  // Oxirgi 5 o'yin formasi nishonchasi (Nafis minimalist)
  const renderFormCircle = (result: FormResult, idx: number) => {
    let bg = 'bg-zinc-800 text-zinc-400';
    let label = 'D';

    if (result === 'W') {
      bg = 'bg-emerald-500/20 text-emerald-400';
      label = 'G';
    } else if (result === 'D') {
      bg = 'bg-amber-500/20 text-amber-400';
      label = 'D';
    } else if (result === 'L') {
      bg = 'bg-rose-500/20 text-rose-400';
      label = 'M';
    }

    return (
      <span
        key={idx}
        title={result === 'W' ? "G'alaba" : result === 'D' ? 'Durang' : "Mag'lubiyat"}
        className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8.5px] font-semibold tabular-nums ${bg}`}
      >
        {label}
      </span>
    );
  };

  // Nozik zona belgisi (1px/2px rangli nuqta yoki chiziq)
  const getZoneBorderClass = (row: StandingRow, index: number, total: number) => {
    if (row.zone === 'ucl') return 'border-l-2 border-l-sky-400';
    if (row.zone === 'uel') return 'border-l-2 border-l-orange-400';
    if (row.zone === 'relegation') return 'border-l-2 border-l-rose-500';

    if (selectedTournament === 'ucl' && index < 8) return 'border-l-2 border-l-sky-400';
    if (selectedTournament === 'uel' && index < 8) return 'border-l-2 border-l-orange-400';
    if (index === 0) return 'border-l-2 border-l-emerald-400';
    if (index < 3) return 'border-l-2 border-l-sky-400';
    if (index >= total - 2) return 'border-l-2 border-l-rose-500';
    return 'border-l-2 border-l-transparent';
  };

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-[#0c0f17] border border-white/[0.04] shadow-sm transition-all ${className}`}
    >
      {/* Sarlavha paneli — real minimalist */}
      <div className={`p-3.5 sm:p-4 ${currentData.theme.headerBg}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className={`h-4 w-4 ${currentData.theme.accent}`} />
            <h2 className="text-[13.5px] font-semibold text-white tracking-tight flex items-center gap-1.5">
              <span>{currentData.title}</span>
              <span className="text-[11px] font-normal text-zinc-400">
                {currentData.season}
              </span>
            </h2>
          </div>
        </div>

        {/* Turnir tanlash navigatsiyasi — toza pilllar */}
        <div className="mt-2.5 flex items-center gap-1 overflow-x-auto no-scrollbar pt-0.5">
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
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? currentData.theme.pillActive
                    : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Jadval tanasi */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.03] bg-[#07090e] text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              <th scope="col" className="w-7 py-2 text-center">#</th>
              <th scope="col" className="min-w-[130px] sm:min-w-[150px] py-2 px-2">Jamoa</th>
              <th scope="col" className="w-6 py-2 text-center" title="O'yinlar">O'</th>
              <th scope="col" className="w-6 py-2 text-center" title="G'alaba">G'</th>
              <th scope="col" className="w-6 py-2 text-center" title="Durang">D</th>
              <th scope="col" className="w-6 py-2 text-center" title="Mag'lubiyat">M</th>
              <th scope="col" className="hidden sm:table-cell w-9 py-2 text-center" title="To'plar nisbati">T/N</th>
              <th scope="col" className="w-7 py-2 text-center" title="To'plar farqi">+/-</th>
              <th scope="col" className="w-8 py-2 text-center font-semibold text-white" title="Ochko">O</th>
              <th scope="col" className="hidden md:table-cell py-2 px-2 text-center min-w-[100px]" title="Oxirgi 5 o'yin formasi">Forma</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02] bg-[#07090e]">
            {currentData.rows.map((row, idx) => {
              const total = currentData.rows.length;
              const borderClass = getZoneBorderClass(row, idx, total);

              return (
                <tr
                  key={row.team.id}
                  onClick={() => onTeamClick && onTeamClick(row.team.id)}
                  className={`transition-colors hover:bg-white/[0.02] cursor-pointer ${borderClass}`}
                >
                  {/* O'rin */}
                  <td className="py-2 text-center text-zinc-500 font-medium tabular-nums text-[11px]">
                    {row.position}
                  </td>

                  {/* Jamoa logosi va nomi */}
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <TeamCrest
                        name={row.team.name}
                        logoUrl={row.team.logo}
                        crestDetails={row.team.crestDetails}
                        size="xs"
                      />
                      <span className="truncate text-zinc-200 font-medium tracking-tight text-[12.5px]">
                        {row.team.shortName || row.team.name}
                      </span>
                    </div>
                  </td>

                  {/* Ko'rsatkichlar */}
                  <td className="py-2 text-center text-zinc-400 tabular-nums text-[11px]">{row.played}</td>
                  <td className="py-2 text-center text-zinc-400 tabular-nums text-[11px]">{row.won}</td>
                  <td className="py-2 text-center text-zinc-400 tabular-nums text-[11px]">{row.drawn}</td>
                  <td className="py-2 text-center text-zinc-400 tabular-nums text-[11px]">{row.lost}</td>

                  <td className="hidden sm:table-cell py-2 text-center text-zinc-500 tabular-nums text-[10.5px]">
                    {row.gf}-{row.ga}
                  </td>

                  <td
                    className={`py-2 text-center tabular-nums text-[11px] font-medium ${
                      row.gd > 0
                        ? 'text-emerald-400'
                        : row.gd < 0
                        ? 'text-rose-400'
                        : 'text-zinc-500'
                    }`}
                  >
                    {row.gd > 0 ? `+${row.gd}` : row.gd}
                  </td>

                  {/* Ochko */}
                  <td className="py-2 text-center font-semibold text-white tabular-nums text-[12px]">
                    {row.points}
                  </td>

                  {/* Forma */}
                  <td className="hidden md:table-cell py-2 px-2 text-center">
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

      {/* Zonalarning qisqa izohi */}
      <div className="flex items-center justify-between border-t border-white/[0.03] bg-[#0a0d14] px-3.5 py-2 text-[10px] text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> OChL / Chempion
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> UCL / Xalqaro
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Quyi liga
          </span>
        </div>
      </div>
    </div>
  );
};
