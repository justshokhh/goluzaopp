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

  // Ranglar uyulib ketmasligi uchun: fon barcha ligalar uchun bir xil toza chuqur qorong'u,
  // rang faqat nozik aksent nishonida (badge) namoyon bo'ladi
  const leagueBadges = {
    ucl: {
      tag: 'UEFA Champions League',
      badgeClass: 'text-sky-300 bg-sky-500/10 border-sky-500/20',
      dotColor: 'bg-sky-400',
    },
    uel: {
      tag: 'UEFA Europa League',
      badgeClass: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
      dotColor: 'bg-orange-400',
    },
    uz_superliga: {
      tag: "O'zbekiston Superligasi",
      badgeClass: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
      dotColor: 'bg-emerald-400',
    },
    premier_league: {
      tag: 'Premier League',
      badgeClass: 'text-pink-300 bg-pink-500/10 border-pink-500/20',
      dotColor: 'bg-pink-400',
    },
    laliga: {
      tag: 'LaLiga EA Sports',
      badgeClass: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
      dotColor: 'bg-rose-400',
    },
    default: {
      tag: 'Futbol',
      badgeClass: 'text-zinc-300 bg-zinc-800/50 border-white/5',
      dotColor: 'bg-zinc-400',
    },
  };

  const badgeInfo = leagueBadges[tournamentKey];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0c0f17] border border-white/[0.06] mb-3 transition-all">
      {/* Sarlavha paneli — sof minimalist, ortiqcha gradientlarsiz, aniq tiniq */}
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
        className="relative flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-[#0e121b] hover:bg-[#121722] transition-colors border-b border-white/[0.04]"
      >
        {/* Chap qism: Liga logosi va nomi */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {league?.logo && !logoError ? (
              <img
                src={league.logo}
                alt={league.name}
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Trophy className="h-4 w-4 text-zinc-400" />
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
              className="truncate text-[14px] font-bold text-white tracking-tight hover:underline cursor-pointer"
            >
              {league?.name || 'Turnir'}
            </span>

            {/* Nozik liga yorlig'i */}
            <span
              className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeInfo.badgeClass}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${badgeInfo.dotColor}`} />
              {badgeInfo.tag}
            </span>

            {league?.round && (
              <span className="text-[11.5px] font-medium text-zinc-400 truncate">
                • {league.round}
              </span>
            )}
          </div>
        </div>

        {/* O'ng qism: Jonli va o'yinlar hisobi */}
        <div className="flex items-center gap-3 shrink-0 pl-2">
          {liveMatchCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-emerald-400 text-[11px] font-bold tabular-nums">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {liveMatchCount} Jonli
            </span>
          )}

          <span className="text-[11.5px] font-medium text-zinc-400 tabular-nums">
            {matchCount} o'yin
          </span>

          <ChevronDown
            className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-white' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      {/* O'yinlar ro'yxati */}
      {isExpanded && (
        <div className="divide-y divide-white/[0.03] bg-[#07090e]">
          {children}
        </div>
      )}
    </section>
  );
};
