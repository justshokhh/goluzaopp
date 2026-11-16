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

  // Qizil kartochkalarni tekshirish (events va stats orqali)
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
      className={`group relative flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 transition-colors cursor-pointer select-none bg-[#0b0e14] hover:bg-[#131722] border-b border-[#1f293d]/50 last:border-b-0 ${className}`}
    >
      {/* Chapdagi nozik LIVE vertikal indikatori */}
      {isLive && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      )}

      {/* 1. Chap ustun: Vaqt / Jonli daqiqa / HT hisobi */}
      <div className="flex w-16 sm:w-20 shrink-0 flex-col items-center justify-center pr-2 border-r border-[#1f293d]/60 text-center">
        {isLive && (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[11px] font-black text-[#10b981]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span>{match.minute}'</span>
            </div>
            {match.htScore && (
              <span className="text-[10px] font-medium text-gray-500 mt-0.5 tracking-tight">
                HT {match.htScore.home}-{match.htScore.away}
              </span>
            )}
          </div>
        )}

        {isFinished && (
          <div className="flex flex-col items-center">
            <span className="rounded bg-gray-800/90 px-1.5 py-0.2 text-[10px] font-black tracking-wide text-gray-300">
              FT
            </span>
            {match.htScore && (
              <span className="text-[10px] font-medium text-gray-500 mt-0.5 tracking-tight">
                HT {match.htScore.home}-{match.htScore.away}
              </span>
            )}
          </div>
        )}

        {isScheduled && (
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-bold text-gray-200 tracking-tight">
              {match.startTime || '21:00'}
            </span>
            <span className="text-[10px] font-medium text-gray-500 mt-0.5">Bugun</span>
          </div>
        )}
      </div>

      {/* 2. O'rta ustun: Mezbon va Mehmon jamoalar (Ixcham 2 qator) */}
      <div className="flex-1 px-3 sm:px-4 min-w-0 flex flex-col justify-center space-y-1">
        {/* Mezbon jamoa */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <TeamCrest
              name={match.homeTeam.name}
              logoUrl={match.homeTeam.logo}
              crestDetails={match.homeTeam.crestDetails}
              size="sm"
            />
            <span
              className={`truncate text-xs sm:text-sm font-semibold transition-colors ${
                isFinished && homeWinning
                  ? 'text-white font-bold'
                  : isFinished && awayWinning
                  ? 'text-gray-400'
                  : isLive && homeWinning
                  ? 'text-emerald-300 font-bold'
                  : 'text-gray-200'
              }`}
            >
              {match.homeTeam.name}
            </span>

            {/* Qizil kartochka belgisi */}
            {homeRedCards > 0 && (
              <span
                title={`${homeRedCards} ta qizil kartochka`}
                className="inline-block w-2 h-3 bg-red-600 rounded-[1.5px] shrink-0 shadow-sm shadow-red-500/50"
              />
            )}
          </div>

          {/* Mezbon hisobi */}
          <div className="shrink-0 pl-2">
            {!isScheduled ? (
              <span
                className={`text-xs sm:text-sm font-extrabold ${
                  isLive && homeWinning
                    ? 'text-[#10b981]'
                    : isFinished && homeWinning
                    ? 'text-white'
                    : isFinished && awayWinning
                    ? 'text-gray-500'
                    : 'text-gray-300'
                }`}
              >
                {homeScore}
              </span>
            ) : (
              <span className="text-xs text-gray-600">-</span>
            )}
          </div>
        </div>

        {/* Mehmon jamoa */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <TeamCrest
              name={match.awayTeam.name}
              logoUrl={match.awayTeam.logo}
              crestDetails={match.awayTeam.crestDetails}
              size="sm"
            />
            <span
              className={`truncate text-xs sm:text-sm font-semibold transition-colors ${
                isFinished && awayWinning
                  ? 'text-white font-bold'
                  : isFinished && homeWinning
                  ? 'text-gray-400'
                  : isLive && awayWinning
                  ? 'text-emerald-300 font-bold'
                  : 'text-gray-200'
              }`}
            >
              {match.awayTeam.name}
            </span>

            {/* Mehmon qizil kartochka belgisi */}
            {awayRedCards > 0 && (
              <span
                title={`${awayRedCards} ta qizil kartochka`}
                className="inline-block w-2 h-3 bg-red-600 rounded-[1.5px] shrink-0 shadow-sm shadow-red-500/50"
              />
            )}
          </div>

          {/* Mehmon hisobi */}
          <div className="shrink-0 pl-2">
            {!isScheduled ? (
              <span
                className={`text-xs sm:text-sm font-extrabold ${
                  isLive && awayWinning
                    ? 'text-[#10b981]'
                    : isFinished && awayWinning
                    ? 'text-white'
                    : isFinished && homeWinning
                    ? 'text-gray-500'
                    : 'text-gray-300'
                }`}
              >
                {awayScore}
              </span>
            ) : (
              <span className="text-xs text-gray-600">-</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. O'ng ustun: xG ko'rsatkichi va Sevimli (Favorite) tugmasi */}
      <div className="flex items-center gap-2.5 shrink-0 pl-2">
        {/* xG (Expected Goals) */}
        {match.xG && (
          <div
            title={`Kutilgan gollar (xG): ${match.homeTeam.name} ${match.xG.home} - ${match.xG.away} ${match.awayTeam.name}`}
            className="hidden xs:flex flex-col items-end text-[10px] text-gray-400 bg-[#131722] px-1.5 py-0.5 rounded border border-white/5"
          >
            <span className="text-[8px] uppercase tracking-wider text-gray-500 font-bold">xG</span>
            <span className="font-semibold text-gray-300">
              {match.xG.home} : {match.xG.away}
            </span>
          </div>
        )}

        {/* Favorite tugmasi */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:text-amber-400 hover:bg-white/5 transition-all"
          title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
        >
          <Star
            className={`h-4 w-4 transition-transform active:scale-125 ${
              isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-500'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
