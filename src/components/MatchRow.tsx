import React from 'react';
import { Star } from 'lucide-react';
import type { Match } from '../types/football';
import { TeamCrest } from './TeamCrest';

export interface MatchRowProps {
  match: Match;
  isFavorite?: boolean;
  onToggleFavorite?: (matchId: string | number) => void;
  onSelectMatch?: (match: Match) => void;
  className?: string;
}

export const MatchRow: React.FC<MatchRowProps> = ({
  match,
  isFavorite = false,
  onToggleFavorite,
  onSelectMatch,
  className = '',
}) => {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED' || match.status === 'FT';
  const isScheduled = match.status === 'SCHEDULED';

  const homeScore = match.score?.home ?? match.homeTeam.score ?? 0;
  const awayScore = match.score?.away ?? match.awayTeam.score ?? 0;

  const homeWinning = homeScore > awayScore;
  const awayWinning = awayScore > homeScore;

  // Qizil kartochkalarni tekshirish
  const homeRedCards =
    match.events?.filter(
      (e) => (e.type === 'RED' || e.type === 'RED_CARD') && e.team === 'home'
    ).length || (match.stats?.redCards?.home ?? 0);

  const awayRedCards =
    match.events?.filter(
      (e) => (e.type === 'RED' || e.type === 'RED_CARD') && e.team === 'away'
    ).length || (match.stats?.redCards?.away ?? 0);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(match.id);
    }
  };

  const handleClick = () => {
    if (onSelectMatch) {
      onSelectMatch(match);
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group relative flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 transition-colors cursor-pointer select-none bg-transparent hover:bg-white/[0.025] border-b border-white/[0.025] last:border-b-0 ${className}`}
    >
      {/* 1. Chap ustun: Holat / Vaqt / Daqiqa */}
      <div className="flex w-12 sm:w-14 shrink-0 flex-col items-center justify-center text-center">
        {isLive && (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 tabular-nums tracking-tight">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {match.minute}'
            </span>
            {match.htScore && (
              <span className="text-[9px] font-medium text-zinc-500 tabular-nums">
                HT {match.htScore.home}-{match.htScore.away}
              </span>
            )}
          </div>
        )}

        {isFinished && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-zinc-400 tracking-tight">
              FT
            </span>
            {match.htScore && (
              <span className="text-[9px] font-medium text-zinc-500 tabular-nums">
                HT {match.htScore.home}-{match.htScore.away}
              </span>
            )}
          </div>
        )}

        {isScheduled && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-zinc-300 tabular-nums">
              {match.startTime || '21:00'}
            </span>
            <span className="text-[9px] font-normal text-zinc-500">Bugun</span>
          </div>
        )}
      </div>

      {/* 2. O'rta ustun: Mezbon va Mehmon jamoalar */}
      <div className="flex-1 px-3 sm:px-4 min-w-0 flex flex-col justify-center space-y-1">
        {/* Mezbon jamoa qatori */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <TeamCrest
              name={match.homeTeam.name}
              logoUrl={match.homeTeam.logo}
              crestDetails={match.homeTeam.crestDetails}
              size="sm"
            />
            <span
              className={`truncate text-[13px] tracking-tight transition-colors ${
                isFinished && homeWinning
                  ? 'text-white font-semibold'
                  : isFinished && awayWinning
                  ? 'text-zinc-400 font-normal'
                  : isLive && homeWinning
                  ? 'text-white font-semibold'
                  : 'text-zinc-200 font-medium'
              }`}
            >
              {match.homeTeam.name}
            </span>

            {/* Qizil kartochka */}
            {homeRedCards > 0 && (
              <span
                title={`${homeRedCards} ta qizil kartochka`}
                className="inline-block w-1.5 h-2.5 bg-rose-500 rounded-[1px] shrink-0 ml-1"
              />
            )}
          </div>

          {/* Mezbon hisobi */}
          <div className="shrink-0 pl-2">
            {!isScheduled ? (
              <span
                className={`text-[13px] tabular-nums transition-colors ${
                  isLive && homeWinning
                    ? 'text-emerald-400 font-bold'
                    : isFinished && homeWinning
                    ? 'text-white font-bold'
                    : isFinished && awayWinning
                    ? 'text-zinc-500 font-medium'
                    : 'text-zinc-200 font-medium'
                }`}
              >
                {homeScore}
              </span>
            ) : (
              <span className="text-[11px] text-zinc-600 font-mono">-</span>
            )}
          </div>
        </div>

        {/* Mehmon jamoa qatori */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <TeamCrest
              name={match.awayTeam.name}
              logoUrl={match.awayTeam.logo}
              crestDetails={match.awayTeam.crestDetails}
              size="sm"
            />
            <span
              className={`truncate text-[13px] tracking-tight transition-colors ${
                isFinished && awayWinning
                  ? 'text-white font-semibold'
                  : isFinished && homeWinning
                  ? 'text-zinc-400 font-normal'
                  : isLive && awayWinning
                  ? 'text-white font-semibold'
                  : 'text-zinc-200 font-medium'
              }`}
            >
              {match.awayTeam.name}
            </span>

            {/* Mehmon qizil kartochka */}
            {awayRedCards > 0 && (
              <span
                title={`${awayRedCards} ta qizil kartochka`}
                className="inline-block w-1.5 h-2.5 bg-rose-500 rounded-[1px] shrink-0 ml-1"
              />
            )}
          </div>

          {/* Mehmon hisobi */}
          <div className="shrink-0 pl-2">
            {!isScheduled ? (
              <span
                className={`text-[13px] tabular-nums transition-colors ${
                  isLive && awayWinning
                    ? 'text-emerald-400 font-bold'
                    : isFinished && awayWinning
                    ? 'text-white font-bold'
                    : isFinished && homeWinning
                    ? 'text-zinc-500 font-medium'
                    : 'text-zinc-200 font-medium'
                }`}
              >
                {awayScore}
              </span>
            ) : (
              <span className="text-[11px] text-zinc-600 font-mono">-</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. O'ng ustun: xG va Sevimli (Favorite) tugmasi */}
      <div className="flex items-center gap-2 shrink-0 pl-1">
        {match.xG && (
          <span
            title={`xG: ${match.homeTeam.name} ${match.xG.home} - ${match.xG.away} ${match.awayTeam.name}`}
            className="hidden xs:inline-block text-[10px] text-zinc-500 tabular-nums"
          >
            xG {match.xG.home}:{match.xG.away}
          </span>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          className="flex h-6 w-6 items-center justify-center text-zinc-600 hover:text-amber-400 transition-colors"
          title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
        >
          <Star
            className={`h-3.5 w-3.5 transition-transform active:scale-125 ${
              isFavorite ? 'fill-amber-400 text-amber-400' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
