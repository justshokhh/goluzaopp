import React, { useState } from 'react';
import { ChevronDown, Trophy } from 'lucide-react';
import type { LeagueInfo } from '../types/football';

export interface TournamentGroupProps {
  league: LeagueInfo;
  matchCount?: number;
  liveMatchCount?: number;
  initiallyExpanded?: boolean;
  onLeagueClick?: (leagueId: string | number) => void;
  children: React.ReactNode;
}

type TournamentId = 'ucl' | 'uel' | 'uz_superliga' | 'premier_league' | 'laliga' | 'default';

const normalizeLeagueId = (id?: string | number, name?: string): TournamentId => {
  const strId = String(id || '').toLowerCase();
  const strName = String(name || '').toLowerCase();

  if (
    strId.includes('ucl') ||
    strName.includes('champions league') ||
    strName.includes('chempionlar ligasi')
  ) {
    return 'ucl';
  }
  if (
    strId.includes('uel') ||
    strName.includes('europa league') ||
    strName.includes('yevropa ligasi')
  ) {
    return 'uel';
  }
  if (
    strId.includes('uz_superliga') ||
    strId.includes('uz-superliga') ||
    strName.includes('superliga') ||
    strName.includes("o'zbekiston") ||
    strName.includes('uzbekistan')
  ) {
    return 'uz_superliga';
  }
  if (
    strId.includes('premier') ||
    strId.includes('epl') ||
    strName.includes('premier league') ||
    strName.includes('angliya')
  ) {
    return 'premier_league';
  }
  if (
    strId.includes('laliga') ||
    strId.includes('la liga') ||
    strName.includes('laliga') ||
    strName.includes('ispaniya')
  ) {
    return 'laliga';
  }

  return 'default';
};

export const TournamentGroup: React.FC<TournamentGroupProps> = ({
  league,
  matchCount = 0,
  liveMatchCount = 0,
  initiallyExpanded = true,
  onLeagueClick,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [logoError, setLogoError] = useState(false);
  const tournamentKey = normalizeLeagueId(league?.id, league?.name);

  // Turnirlarning o'ziga xos chuqur silliq fonlari
  const themes = {
    ucl: {
      headerBg: 'bg-gradient-to-r from-[#070e22] via-[#091536] to-[#070b18]',
      accentColor: 'text-[#38bdf8]',
      badgeColor: 'text-sky-400 bg-sky-500/10',
    },
    uel: {
      headerBg: 'bg-gradient-to-r from-[#120a05] via-[#1f1006] to-[#090706]',
      accentColor: 'text-[#fb923c]',
      badgeColor: 'text-orange-400 bg-orange-500/10',
    },
    uz_superliga: {
      headerBg: 'bg-gradient-to-r from-[#03140e] via-[#052119] to-[#050e0b]',
      accentColor: 'text-[#34d399]',
      badgeColor: 'text-emerald-400 bg-emerald-500/10',
    },
    premier_league: {
      headerBg: 'bg-gradient-to-r from-[#13051c] via-[#1e072c] to-[#0a0410]',
      accentColor: 'text-[#f472b6]',
      badgeColor: 'text-pink-400 bg-pink-500/10',
    },
    laliga: {
      headerBg: 'bg-gradient-to-r from-[#160406] via-[#24080b] to-[#0a0304]',
      accentColor: 'text-[#f87171]',
      badgeColor: 'text-rose-400 bg-rose-500/10',
    },
    default: {
      headerBg: 'bg-[#0e121b]',
      accentColor: 'text-zinc-400',
      badgeColor: 'text-zinc-400 bg-zinc-800/40',
    },
  };

  const theme = themes[tournamentKey];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0b0e15]/90 border border-white/[0.06] mb-3.5 shadow-lg shadow-black/25 hover:border-white/[0.09] transition-all">
      {/* Sarlavha paneli — real minimalist, toza tipografika */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        className={`relative flex items-center justify-between px-3.5 py-2.5 sm:px-4 sm:py-3 cursor-pointer select-none transition-colors border-b border-white/[0.04] ${theme.headerBg}`}
      >
        {/* Chap qism: Liga logosi va nomi */}
        <div className="relative z-10 flex items-center gap-2.5 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {league?.logo && !logoError ? (
              <img
                src={league.logo}
                alt={league.name}
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Trophy className={`h-4 w-4 ${theme.accentColor}`} />
            )}
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <span
              onClick={(e) => {
                if (onLeagueClick && league?.id) {
                  e.stopPropagation();
                  onLeagueClick(league.id);
                }
              }}
              className="truncate text-[13.5px] font-semibold text-zinc-100 tracking-tight hover:text-white transition-colors cursor-pointer"
            >
              {league?.name || 'Turnir'}
            </span>

            {league?.round && (
              <span className="text-[11px] font-normal text-zinc-400 truncate">
                • {league.round}
              </span>
            )}
          </div>
        </div>

        {/* O'ng qism: Jonli va o'yinlar hisobi */}
        <div className="relative z-10 flex items-center gap-2 shrink-0 pl-2">
          {liveMatchCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400 text-[10.5px] font-medium tabular-nums">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {liveMatchCount} Jonli
            </span>
          )}

          <span className="text-[11px] font-normal text-zinc-500 tabular-nums">
            {matchCount} o'yin
          </span>

          <ChevronDown
            className={`h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-zinc-300' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      {/* O'yinlar ro'yxati */}
      {isExpanded && (
        <div className="divide-y divide-white/[0.025] bg-[#07090e]">
          {children}
        </div>
      )}
    </section>
  );
};
