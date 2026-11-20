/**
 * UzScore — SpotlightMatch (Kun O'yini / Markaziy Uchrashuv Paneli)
 * SofaScore va Apple Sports estetikasidagi jonli markaziy uchrashuv
 * xG taqsimoti, jonli daqiqa, voqealar va tezkor tahlil tugmasi bilan.
 */

import React from 'react';
import { Flame, Activity, Star, ChevronRight, Target } from 'lucide-react';
import type { Match } from '../types/football';
import { TeamCrest } from './TeamCrest';

export interface SpotlightMatchProps {
  match: Match;
  onSelectMatch: (match: Match) => void;
  onToggleFavorite?: (matchId: string | number) => void;
  isFavorite?: boolean;
}

export const SpotlightMatch: React.FC<SpotlightMatchProps> = ({
  match,
  onSelectMatch,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED' || match.status === 'FT';
  const homeScore = match.score?.home ?? match.homeTeam.score ?? 0;
  const awayScore = match.score?.away ?? match.awayTeam.score ?? 0;

  const homeXG = match.stats?.expectedGoals?.home ?? match.xG?.home ?? 1.84;
  const awayXG = match.stats?.expectedGoals?.away ?? match.xG?.away ?? 1.12;
  const totalXG = homeXG + awayXG || 1;
  const homeXGPct = Math.round((homeXG / totalXG) * 100);

  // So'nggi 2 ta gol yoki qizil kartochka voqeasi
  const keyEvents = (match.events || [])
    .filter((e) => e.type === 'GOAL' || e.type === 'RED' || e.type === 'RED_CARD')
    .slice(-3);

  return (
    <div
      onClick={() => onSelectMatch(match)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0e1626] via-[#090d16] to-[#07090e] p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10 cursor-pointer select-none"
    >
      {/* Orqa fondagi ambient nur effekti */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl transition-opacity group-hover:opacity-100 opacity-60" />

      {/* Yuqori qator: Turnir nomi, Jonli status va Sevimli */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
            <Flame className="w-3.5 h-3.5 fill-emerald-400 animate-pulse" />
            <span>KUN O'YINI</span>
          </span>
          <span className="text-xs font-semibold text-zinc-300">
            {match.league?.name || match.tournamentName || "O'zbekiston Superligasi"}
          </span>
          {match.league?.round && (
            <span className="text-[11px] text-zinc-500 hidden sm:inline">• {match.league.round}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isLive ? (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{match.minute}' Jonli</span>
            </div>
          ) : isFinished ? (
            <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
              Yakunlandi
            </span>
          ) : (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium text-zinc-300">
              {match.startTime || '20:00'}
            </span>
          )}

          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(match.id);
              }}
              className="p-1 rounded-lg hover:bg-white/[0.08] transition-colors"
              title="Sevimlilarga qo'shish"
            >
              <Star
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Asosiy Markaziy Qism: Jamoalar, Emblema va Hisob */}
      <div className="relative z-10 grid grid-cols-7 items-center gap-2 py-4 sm:py-5">
        {/* Mezbon jamoa */}
        <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-end sm:gap-3 text-center sm:text-right">
          <div className="order-2 sm:order-1 mt-2 sm:mt-0">
            <h3 className="text-sm sm:text-lg font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              {match.homeTeam.name}
            </h3>
            <span className="text-[11px] text-zinc-400 font-medium">Mezbon</span>
          </div>
          <div className="order-1 sm:order-2 shrink-0 transform group-hover:scale-105 transition-transform">
            <TeamCrest
              name={match.homeTeam.name}
              logoUrl={match.homeTeam.logo}
              crestDetails={match.homeTeam.crestDetails}
              size="lg"
            />
          </div>
        </div>

        {/* Hisob ko'rinishi */}
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tighter">
            <span>{homeScore}</span>
            <span className="text-zinc-600">:</span>
            <span>{awayScore}</span>
          </div>
          {match.htScore && (
            <span className="text-[10px] text-zinc-500 font-semibold mt-0.5 tabular-nums">
              HT {match.htScore.home}-{match.htScore.away}
            </span>
          )}
        </div>

        {/* Mehmon jamoa */}
        <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-start sm:gap-3 text-center sm:text-left">
          <div className="shrink-0 transform group-hover:scale-105 transition-transform">
            <TeamCrest
              name={match.awayTeam.name}
              logoUrl={match.awayTeam.logo}
              crestDetails={match.awayTeam.crestDetails}
              size="lg"
            />
          </div>
          <div className="mt-2 sm:mt-0">
            <h3 className="text-sm sm:text-lg font-black text-white tracking-tight group-hover:text-emerald-400 transition-colors">
              {match.awayTeam.name}
            </h3>
            <span className="text-[11px] text-zinc-400 font-medium">Mehmon</span>
          </div>
        </div>
      </div>

      {/* xG Ko'rsatkichi va Kutilgan Gollar Balansi */}
      <div className="relative z-10 rounded-xl bg-white/[0.03] border border-white/[0.04] p-2.5 sm:p-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-emerald-400 flex items-center gap-1">
            <Target className="w-3 h-3" /> {homeXG.toFixed(2)} xG ({homeXGPct}%)
          </span>
          <span className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">
            Kutilgan Gollar (xG)
          </span>
          <span className="text-sky-400">
            ({100 - homeXGPct}%) {awayXG.toFixed(2)} xG
          </span>
        </div>

        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden flex gap-0.5">
          <div
            style={{ width: `${homeXGPct}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
          />
          <div
            style={{ width: `${100 - homeXGPct}%` }}
            className="h-full bg-sky-500 rounded-r-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Pastki Qator: So'nggi Voqealar va Match Center Tugmasi */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs text-zinc-300">
          <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {keyEvents.length > 0 ? (
            <div className="flex items-center gap-2 text-[11px]">
              {keyEvents.map((ev, i) => (
                <span key={i} className="flex items-center gap-1 text-zinc-300 bg-white/[0.04] px-2 py-0.5 rounded-md">
                  <span>{ev.minute}'</span>
                  <span>{ev.type === 'GOAL' ? '⚽' : '🟥'}</span>
                  <span className="font-semibold text-white">{ev.player}</span>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-zinc-500 text-[11px]">Qizg'in bahs davom etmoqda...</span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
          <span>Match Center ⚡</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
