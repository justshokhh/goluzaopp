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
      className={`group relative flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 transition-colors cursor-pointer select-none bg-[#0b0e14] hover:bg-[#131722]/80 border-b border-white/[0.03] last:border-b-0 ${className}`}
    >
      {/* Chapdagi faol nozik LIVE indikatori */}
      {isLive && (
        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-[#10b981]" />
      )}

      {/* 1. Chap ustun: Vaqt / Jonli daqiqa */}
      <div className="flex w-14 sm:w-16 shrink-0 flex-col items-center justify-center text-center">
        {isLive && (
          <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#10b981] tabular-nums tracking-tight">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              {match.minute}'
            </span>
            {match.htScore && (
              <span className="text-[10px] font-medium text-slate-500 tabular-nums">
                HT {match.htScore.home}-{match.htScore.away}
              </span>
            )}
          </div>
        )}

        {isFinished && (
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-semibold text-slate-400 tracking-tight">
              FT
            </span>
            {match.htScore && (
              <span className="text-[10px] font-medium text-slate-500 tabular-nums">
                HT {match.htScore.home}-{match.htScore.away}
              </span>
            )}
          </div>
        )}

        {isScheduled && (
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-[13px] font-semibold text-slate-200 tabular-nums">
              {match.startTime || '21:00'}
            </span>
            <span className="text-[10px] font-normal text-slate-500">Bugun</span>
          </div>
        )}
      </div>

      {/* 2. O'rta ustun: Mezbon va Mehmon jamoalar (SofaScore zich tartibi) */}
      <div className="flex-1 px-3 sm:px-4 min-w-0 flex flex-col justify-center space-y-1">
        {/* Mezbon jamoa */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <TeamCrest
              name={match.homeTeam.name}
              logoUrl={match.homeTeam.logo}
              crestDetails={match.homeTeam.crestDetails}
              size="sm"
            />
            <span
              className={`truncate text-xs sm:text-[13px] tracking-tight transition-colors ${
                isFinished && homeWinning
                  ? 'text-white font-semibold'
                  : isFinished && awayWinning
                  ? 'text-slate-400 font-normal'
                  : isLive && homeWinning
                  ? 'text-white font-semibold'
                  : 'text-slate-200 font-medium'
              }`}
            >
              {match.homeTeam.name}
            </span>

            {/* Qizil kartochka */}
            {homeRedCards > 0 && (
              <span
                title={`${homeRedCards} ta qizil kartochka`}
                className="inline-block w-2 h-2.5 bg-rose-600 rounded-[1px] shrink-0"
              />
            )}
          </div>

          {/* Mezbon hisobi */}
          <div className="shrink-0 pl-2">
            {!isScheduled ? (
              <span
                className={`text-xs sm:text-sm tabular-nums ${
                  isLive && homeWinning
                    ? 'text-[#10b981] font-bold'
                    : isFinished && homeWinning
                    ? 'text-white font-bold'
                    : isFinished && awayWinning
                    ? 'text-slate-500 font-medium'
                    : 'text-slate-200 font-semibold'
                }`}
              >
                {homeScore}
              </span>
            ) : (
              <span className="text-xs text-slate-600 font-mono">-</span>
            )}
          </div>
        </div>

        {/* Mehmon jamoa */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <TeamCrest
              name={match.awayTeam.name}
              logoUrl={match.awayTeam.logo}
              crestDetails={match.awayTeam.crestDetails}
              size="sm"
            />
            <span
              className={`truncate text-xs sm:text-[13px] tracking-tight transition-colors ${
                isFinished && awayWinning
                  ? 'text-white font-semibold'
                  : isFinished && homeWinning
                  ? 'text-slate-400 font-normal'
                  : isLive && awayWinning
                  ? 'text-white font-semibold'
                  : 'text-slate-200 font-medium'
              }`}
            >
              {match.awayTeam.name}
            </span>

            {/* Mehmon qizil kartochka */}
            {awayRedCards > 0 && (
              <span
                title={`${awayRedCards} ta qizil kartochka`}
                className="inline-block w-2 h-2.5 bg-rose-600 rounded-[1px] shrink-0"
              />
            )}
          </div>

          {/* Mehmon hisobi */}
          <div className="shrink-0 pl-2">
            {!isScheduled ? (
              <span
                className={`text-xs sm:text-sm tabular-nums ${
                  isLive && awayWinning
                    ? 'text-[#10b981] font-bold'
                    : isFinished && awayWinning
                    ? 'text-white font-bold'
                    : isFinished && homeWinning
                    ? 'text-slate-500 font-medium'
                    : 'text-slate-200 font-semibold'
                }`}
              >
                {awayScore}
              </span>
            ) : (
              <span className="text-xs text-slate-600 font-mono">-</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. O'ng ustun: xG va Sevimli (Favorite) tugmasi */}
      <div className="flex items-center gap-2 shrink-0 pl-1">
        {match.xG && (
          <div
            title={`xG: ${match.homeTeam.name} ${match.xG.home} - ${match.xG.away} ${match.awayTeam.name}`}
            className="hidden xs:flex flex-col items-end text-[10px] text-slate-400 tabular-nums"
          >
            <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold">xG</span>
            <span className="font-medium text-slate-300">
              {match.xG.home} : {match.xG.away}
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          className="flex h-7 w-7 items-center justify-center text-slate-500 hover:text-amber-400 transition-colors"
          title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
        >
          <Star
            className={`h-4 w-4 transition-transform active:scale-125 ${
              isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-slate-400'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
