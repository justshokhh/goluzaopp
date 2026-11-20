import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Trophy,
  Activity,
  BarChart2,
  Users,
  Calendar,
  MapPin,
  UserCheck,
  Tv,
  CornerDownRight,
  TrendingUp,
  Percent,
} from 'lucide-react';
import type {
  Match,
  MatchStats,
  MatchEvent,
  PlayerLineup,
  StatPair,
} from '../types/football';
import { TeamCrest } from './TeamCrest';
import { mockMatchStats } from '../services/mockData';
import { AttackMomentum } from './AttackMomentum';

export interface MatchCenterDrawerProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (matchId: string | number) => void;
  isFavorite?: boolean;
}

type TabType = 'summary' | 'stats' | 'lineups' | 'h2h';

export const MatchCenterDrawer: React.FC<MatchCenterDrawerProps> = ({
  match,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerLineup | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const stats: MatchStats =
    (match && match.stats) ||
    (match && mockMatchStats[match.id]) || {
      ballPossession: { home: 54, away: 46 },
      expectedGoals: { home: match?.xG?.home ?? 1.84, away: match?.xG?.away ?? 1.12 },
      bigChances: { home: 3, away: 1 },
      totalShots: { home: 14, away: 9 },
      shotsOnTarget: { home: 6, away: 3 },
      blockedShots: { home: 4, away: 2 },
      cornerKicks: { home: 7, away: 4 },
      offsides: { home: 2, away: 1 },
      fouls: { home: 11, away: 15 },
      yellowCards: { home: 2, away: 3 },
      redCards: { home: 0, away: 0 },
      passesAccurate: { home: 412, away: 348 },
      passAccuracyPct: { home: 84, away: 78 },
    };

  // SofaScore G'alaba ehtimoli (Win Probability & Odds)
  const winProb = useMemo(() => {
    const homeXG = stats.expectedGoals?.home ?? 1.6;
    const awayXG = stats.expectedGoals?.away ?? 1.1;
    const total = homeXG + awayXG + 1.1;
    const homePct = Math.min(78, Math.max(18, Math.round((homeXG / total) * 100)));
    const awayPct = Math.min(78, Math.max(18, Math.round((awayXG / total) * 100)));
    const drawPct = Math.max(12, 100 - homePct - awayPct);
    return {
      home: homePct,
      draw: drawPct,
      away: awayPct,
      homeOdds: (100 / homePct).toFixed(2),
      drawOdds: (100 / drawPct).toFixed(2),
      awayOdds: (100 / awayPct).toFixed(2),
    };
  }, [stats]);

  if (!isOpen || !match) return null;

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED' || match.status === 'FT';
  const homeScore = match.score?.home ?? match.homeTeam.score ?? 0;
  const awayScore = match.score?.away ?? match.awayTeam.score ?? 0;

  // Turnir bo'yicha tabiiy sarlavha foni
  const theme = match.league?.theme || match.tournamentTheme || 'uz_superliga';
  const getHeaderGradient = () => {
    switch (theme) {
      case 'ucl':
        return 'bg-gradient-to-r from-[#081026] via-[#0c1a40] to-[#080d1a]';
      case 'uel':
        return 'bg-gradient-to-r from-[#140b06] via-[#241207] to-[#0a0807]';
      case 'premier_league':
        return 'bg-gradient-to-r from-[#170522] via-[#250937] to-[#0d0514]';
      case 'laliga':
        return 'bg-gradient-to-r from-[#1c0507] via-[#2d090d] to-[#0e0405]';
      case 'uz_superliga':
      default:
        return 'bg-gradient-to-r from-[#031711] via-[#06261c] to-[#06120e]';
    }
  };

  // SofaScore reytingi rangi
  const getRatingBadgeColor = (rating?: number) => {
    if (!rating) return 'bg-slate-700 text-slate-300';
    if (rating >= 8.0) return 'bg-sky-600 text-white font-bold';
    if (rating >= 7.0) return 'bg-emerald-600 text-white font-bold';
    if (rating >= 6.0) return 'bg-amber-500 text-black font-bold';
    return 'bg-rose-600 text-white font-bold';
  };

  // Voqealar ikonkasi
  const renderEventIcon = (event: MatchEvent) => {
    switch (event.type) {
      case 'GOAL':
      case 'PENALTY':
        return <span className="text-sm">⚽</span>;
      case 'YELLOW':
      case 'YELLOW_CARD':
        return <span className="inline-block h-3.5 w-2.5 bg-amber-400 rounded-[1px]" />;
      case 'RED':
      case 'RED_CARD':
        return <span className="inline-block h-3.5 w-2.5 bg-rose-600 rounded-[1px]" />;
      case 'SUB':
      case 'SUBSTITUTION':
        return <span className="text-xs text-sky-400">🔄</span>;
      case 'VAR':
        return <Tv className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <span className="h-2 w-2 rounded-full bg-slate-400" />;
    }
  };

  // SofaScore ikki tomonlama gorizontal progress-bar
  const renderStatBar = (
    label: string,
    pair?: StatPair,
    isPercentage = false,
    higherIsBetter = true
  ) => {
    if (!pair) return null;
    const homeVal = pair.home;
    const awayVal = pair.away;
    const total = homeVal + awayVal || 1;
    const homePercent = Math.round((homeVal / total) * 100);
    const awayPercent = 100 - homePercent;

    const isHomeBetter = higherIsBetter ? homeVal > awayVal : homeVal < awayVal;
    const isAwayBetter = higherIsBetter ? awayVal > homeVal : awayVal < homeVal;

    return (
      <div className="space-y-1.5 py-1">
        <div className="flex items-center justify-between text-xs">
          <span
            className={`w-12 text-left font-semibold tabular-nums ${
              isHomeBetter ? 'text-[#10b981] font-bold text-[13px]' : 'text-slate-400'
            }`}
          >
            {homeVal}
            {isPercentage ? '%' : ''}
          </span>
          <span className="flex-1 text-center font-medium text-slate-400 text-[11px]">
            {label}
          </span>
          <span
            className={`w-12 text-right font-semibold tabular-nums ${
              isAwayBetter ? 'text-[#10b981] font-bold text-[13px]' : 'text-slate-400'
            }`}
          >
            {awayVal}
            {isPercentage ? '%' : ''}
          </span>
        </div>

        {/* Progress bar — nozik va silliq */}
        <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-[#0b0e14]">
          <div className="flex w-1/2 justify-end bg-slate-800/50 rounded-l-full overflow-hidden">
            <div
              style={{ width: `${homePercent}%` }}
              className={`h-full transition-all duration-300 rounded-l-full ${
                isHomeBetter ? 'bg-[#10b981]' : 'bg-slate-600'
              }`}
            />
          </div>
          <div className="flex w-1/2 justify-start bg-slate-800/50 rounded-r-full overflow-hidden">
            <div
              style={{ width: `${awayPercent}%` }}
              className={`h-full transition-all duration-300 rounded-r-full ${
                isAwayBetter ? 'bg-[#10b981]' : 'bg-slate-600'
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  // Futbol maydonida o'yinchilarni joylashtirish
  const renderFieldFormation = (
    players: PlayerLineup[],
    teamType: 'home' | 'away',
    _teamName?: string
  ) => {
    const gk = players.filter((p) => p.pos === 'GK');
    const df = players.filter((p) => p.pos === 'DF');
    const mf = players.filter((p) => p.pos === 'MF');
    const fw = players.filter((p) => p.pos === 'FW');

    const lines = teamType === 'home' ? [gk, df, mf, fw] : [fw, mf, df, gk];

    return (
      <div className="flex flex-col justify-around h-full py-2">
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className="flex justify-around items-center w-full px-2">
            {line.map((player) => (
              <div
                key={player.number}
                onClick={() => setSelectedPlayer(player)}
                className="group relative flex flex-col items-center cursor-pointer"
                title={`${player.name} (#${player.number}) — Bosib tahlil qiling`}
              >
                {/* Futbolchi doirasi — ortiqcha qalin ramkalarsiz */}
                <div
                  className={`relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-white text-[11px] font-bold shadow-sm transition-transform group-hover:scale-125 group-active:scale-95 ${
                    teamType === 'home' ? 'bg-sky-900 text-sky-100 ring-1 ring-sky-500/50' : 'bg-emerald-950 text-emerald-100 ring-1 ring-emerald-500/50'
                  }`}
                >
                  <span>{player.number}</span>

                  {player.rating && (
                    <span
                      className={`absolute -bottom-1 -right-1 px-1 py-0.2 rounded text-[8px] font-bold ${getRatingBadgeColor(
                        player.rating
                      )}`}
                    >
                      {player.rating}
                    </span>
                  )}
                </div>

                <span className="mt-1 max-w-[65px] truncate text-[10px] font-medium text-slate-100 drop-shadow">
                  {player.name.split(' ').slice(-1)[0]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0d111a] border border-white/[0.08] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================================================= */}
        {/* 1. TOP HEADER: Turnir, Jamoalar va Hisob */}
        {/* ================================================================= */}
        <div className={`p-4 sm:p-5 ${getHeaderGradient()} border-b border-white/[0.06]`}>
          {/* Yuqori qator: Liga va Yopish */}
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
            <div className="flex items-center gap-1.5 font-medium">
              <Trophy className="h-3.5 w-3.5 text-[#10b981]" />
              <span>{match.league?.name || match.tournamentName}</span>
              {match.league?.round && (
                <span className="text-slate-400">• {match.league.round}</span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Yopish"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Markaziy Hisob va Jamoalar (ortiqcha hoshiyalarsiz) */}
          <div className="grid grid-cols-7 items-center gap-2 text-center py-2">
            {/* Mezbon */}
            <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-end sm:gap-3">
              <div className="order-2 sm:order-1 sm:text-right mt-1 sm:mt-0">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {match.homeTeam.name}
                </h3>
                <span className="text-[11px] text-slate-400">Mezbon</span>
              </div>
              <div className="order-1 sm:order-2">
                <TeamCrest
                  name={match.homeTeam.name}
                  logoUrl={match.homeTeam.logo}
                  crestDetails={match.homeTeam.crestDetails}
                  size="xl"
                />
              </div>
            </div>

            {/* Hisob */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
                <span>{homeScore}</span>
                <span className="text-slate-500">:</span>
                <span>{awayScore}</span>
              </div>

              {isLive ? (
                <div className="mt-1 flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-[#10b981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span>{match.minute}' Jonli</span>
                </div>
              ) : isFinished ? (
                <span className="mt-1 text-[11px] font-medium text-slate-400">
                  Yakunlandi
                </span>
              ) : (
                <span className="mt-1 text-[11px] font-medium text-slate-400">
                  {match.startTime || '21:00'}
                </span>
              )}

              {match.htScore && (
                <span className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
                  HT {match.htScore.home}-{match.htScore.away}
                </span>
              )}
            </div>

            {/* Mehmon */}
            <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-start sm:gap-3">
              <div>
                <TeamCrest
                  name={match.awayTeam.name}
                  logoUrl={match.awayTeam.logo}
                  crestDetails={match.awayTeam.crestDetails}
                  size="xl"
                />
              </div>
              <div className="sm:text-left mt-1 sm:mt-0">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {match.awayTeam.name}
                </h3>
                <span className="text-[11px] text-slate-400">Mehmon</span>
              </div>
            </div>
          </div>

          {/* Stadion va hakam */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 border-t border-white/[0.05] pt-2">
            {match.stadium && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> {match.stadium}
              </span>
            )}
            {match.referee && (
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-slate-500" /> {match.referee}
              </span>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. TABLAR NAVIGATSIYASI */}
        {/* ================================================================= */}
        <div className="flex items-center border-b border-white/[0.05] bg-[#0b0e14] px-4">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-all ${
              activeTab === 'summary'
                ? 'border-[#10b981] text-[#10b981] font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Sharh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-all ${
              activeTab === 'stats'
                ? 'border-[#10b981] text-[#10b981] font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>Statistika</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lineups')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-all ${
              activeTab === 'lineups'
                ? 'border-[#10b981] text-[#10b981] font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Tarkiblar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('h2h')}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-all ${
              activeTab === 'h2h'
                ? 'border-[#10b981] text-[#10b981] font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>H2H & Jadval</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* 3. ASOSIY TAB MAZMUNI */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: SHARH (SUMMARY) */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              {/* SofaScore G'alaba Ehtimolligi (Odds & Win Probability) */}
              <div className="rounded-xl bg-[#090d15] border border-white/[0.05] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" />
                    G'alaba Ehtimoli (Win Probability)
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">1 - X - 2 Koeffitsient</span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="text-emerald-400">
                    <span>1: {match.homeTeam.shortName || match.homeTeam.name.slice(0, 3)}</span>{' '}
                    <span className="text-zinc-500 font-normal">({winProb.homeOdds})</span> {winProb.home}%
                  </div>
                  <div className="text-amber-400">
                    <span>X: Durang</span>{' '}
                    <span className="text-zinc-500 font-normal">({winProb.drawOdds})</span> {winProb.draw}%
                  </div>
                  <div className="text-sky-400">
                    <span>2: {match.awayTeam.shortName || match.awayTeam.name.slice(0, 3)}</span>{' '}
                    <span className="text-zinc-500 font-normal">({winProb.awayOdds})</span> {winProb.away}%
                  </div>
                </div>

                {/* 3 qismli segment bar */}
                <div className="h-2 w-full rounded-full bg-white/[0.04] overflow-hidden flex gap-0.5">
                  <div
                    style={{ width: `${winProb.home}%` }}
                    className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
                    title={`${match.homeTeam.name}: ${winProb.home}%`}
                  />
                  <div
                    style={{ width: `${winProb.draw}%` }}
                    className="h-full bg-amber-500/80 transition-all duration-500"
                    title={`Durang: ${winProb.draw}%`}
                  />
                  <div
                    style={{ width: `${winProb.away}%` }}
                    className="h-full bg-sky-500 rounded-r-full transition-all duration-500"
                    title={`${match.awayTeam.name}: ${winProb.away}%`}
                  />
                </div>
              </div>

              {/* SofaScore Hujum Bosimi (Attack Momentum) */}
              <AttackMomentum match={match} />

              {/* Voqealar lenti */}
              <div>
                <h4 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#10b981]" />
                  Uchrashuv Voqealari Xronologiyasi
                </h4>
              {match.events && match.events.length > 0 ? (
                <div className="relative border-l border-white/[0.08] ml-4 pl-4 space-y-3 py-1">
                  {match.events.map((event) => {
                    const isHome = event.team === 'home';
                    return (
                      <div
                        key={event.id}
                        className="relative flex items-center justify-between text-xs py-1"
                      >
                        {/* Shkaladagi daqiqa */}
                        <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-[#0d111a] border border-[#10b981] text-[9px] font-bold text-[#10b981]">
                          {event.minute}'
                        </div>

                        <div className="flex items-center gap-2.5 pl-2">
                          {renderEventIcon(event)}
                          <div>
                            <span className="font-semibold text-white">
                              {event.player}
                            </span>
                            <span className="text-[11px] text-slate-400 ml-1.5">
                              ({isHome ? match.homeTeam.name : match.awayTeam.name})
                            </span>
                            {event.assistPlayer && (
                              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                                <CornerDownRight className="w-3 h-3 text-[#10b981]" />
                                {event.assistPlayer}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-[10px] uppercase font-medium text-slate-400">
                          {event.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Voqealar hali qayd etilmagan.
                </div>
              )}
              </div>
            </div>
          )}

          {/* TAB 2: STATISTIKA */}
          {activeTab === 'stats' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-1 text-xs font-semibold text-slate-400">
                <span className="text-white">{match.homeTeam.name}</span>
                <span className="text-[11px]">Ko'rsatkichlar</span>
                <span className="text-white">{match.awayTeam.name}</span>
              </div>

              <div className="rounded-xl bg-[#0b0e14] p-3 sm:p-4 space-y-2 border border-white/[0.03]">
                {renderStatBar("To'pga egalik %", stats.ballPossession, true)}
                {renderStatBar('Kutilgan gollar (xG)', stats.expectedGoals)}
                {renderStatBar('Katta imkoniyatlar', stats.bigChances)}
                {renderStatBar('Jami zarbalar', stats.totalShots)}
                {renderStatBar('Darvozaga aniq zarbalar', stats.shotsOnTarget)}
                {renderStatBar('To\'silgan zarbalar', stats.blockedShots)}
                {renderStatBar('Burchak zarbalari', stats.cornerKicks)}
                {renderStatBar('Ofsaydlar', stats.offsides, false, false)}
                {renderStatBar('Qoidabuzarliklar', stats.fouls, false, false)}
                {renderStatBar('Sariq kartochkalar', stats.yellowCards, false, false)}
                {renderStatBar('Qizil kartochkalar', stats.redCards, false, false)}
                {renderStatBar('Aniq paslar', stats.passesAccurate)}
                {renderStatBar('Pas aniqligi %', stats.passAccuracyPct, true)}
              </div>
            </div>
          )}

          {/* TAB 3: TARKIBLAR */}
          {activeTab === 'lineups' && (
            <div className="space-y-3">
              {match.lineups ? (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span>{match.homeTeam.name}</span>
                      <span className="text-slate-400">({match.lineups.home.formation})</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span className="text-slate-400">({match.lineups.away.formation})</span>
                      <span>{match.awayTeam.name}</span>
                    </div>
                  </div>

                  {/* Futbol maydoni */}
                  <div className="relative w-full h-[500px] sm:h-[540px] rounded-xl overflow-hidden bg-[#154625] border border-emerald-700/30">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#154625,#154625_35px,#184f2a_35px,#184f2a_70px)] opacity-95" />

                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 400 600"
                      preserveAspectRatio="none"
                    >
                      <rect x="15" y="15" width="370" height="570" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                      <line x1="15" y1="300" x2="385" y2="300" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx="200" cy="300" r="45" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                      <rect x="110" y="15" width="180" height="85" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                      <rect x="110" y="500" width="180" height="85" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                    </svg>

                    <div className="relative z-10 grid grid-rows-2 h-full">
                      <div className="border-b border-white/10">
                        {renderFieldFormation(
                          match.lineups.home.startXI,
                          'home',
                          match.homeTeam.name
                        )}
                      </div>
                      <div>
                        {renderFieldFormation(
                          match.lineups.away.startXI,
                          'away',
                          match.awayTeam.name
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Murabbiylar */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-[#0b0e14] p-2.5 border border-white/[0.04]">
                      <span className="text-slate-400">Murabbiy:</span>{' '}
                      <span className="font-semibold text-white">{match.lineups.home.coach}</span>
                    </div>
                    <div className="rounded-lg bg-[#0b0e14] p-2.5 border border-white/[0.04]">
                      <span className="text-slate-400">Murabbiy:</span>{' '}
                      <span className="font-semibold text-white">{match.lineups.away.coach}</span>
                    </div>
                  </div>
                  {/* Zaxira O'yinchilari (Substitutes) */}
                  <div className="mt-3 space-y-2">
                    <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      Zaxira O'yinchilari (Bosing — tahlil uchun)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Mezbon zaxira */}
                      <div className="rounded-lg bg-[#0b0e14] p-2.5 border border-white/[0.04] space-y-1.5">
                        <span className="text-[11px] font-semibold text-emerald-400">{match.homeTeam.name}</span>
                        <div className="space-y-1">
                          {match.lineups.home.substitutes.map((sub) => (
                            <div
                              key={sub.number}
                              onClick={() => setSelectedPlayer(sub)}
                              className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-white/[0.04] cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 text-zinc-500 font-mono text-[11px]">#{sub.number}</span>
                                <span className="text-zinc-200">{sub.name}</span>
                                <span className="text-[10px] text-zinc-500">({sub.pos})</span>
                              </div>
                              {sub.rating && (
                                <span className={`px-1 rounded text-[9px] font-bold ${getRatingBadgeColor(sub.rating)}`}>
                                  {sub.rating}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mehmon zaxira */}
                      <div className="rounded-lg bg-[#0b0e14] p-2.5 border border-white/[0.04] space-y-1.5">
                        <span className="text-[11px] font-semibold text-sky-400">{match.awayTeam.name}</span>
                        <div className="space-y-1">
                          {match.lineups.away.substitutes.map((sub) => (
                            <div
                              key={sub.number}
                              onClick={() => setSelectedPlayer(sub)}
                              className="flex items-center justify-between text-xs py-1 px-1.5 rounded hover:bg-white/[0.04] cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 text-zinc-500 font-mono text-[11px]">#{sub.number}</span>
                                <span className="text-zinc-200">{sub.name}</span>
                                <span className="text-[10px] text-zinc-500">({sub.pos})</span>
                              </div>
                              {sub.rating && (
                                <span className={`px-1 rounded text-[9px] font-bold ${getRatingBadgeColor(sub.rating)}`}>
                                  {sub.rating}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-slate-500 text-xs">
                  Tarkiblar hali e'lon qilinmagan.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: H2H & JADVAL */}
          {activeTab === 'h2h' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#10b981]" /> O'zaro oxirgi o'yinlar
              </h4>
              <div className="space-y-1.5">
                {[
                  { date: '2025.10.12', home: match.homeTeam.name, away: match.awayTeam.name, score: '2 : 1' },
                  { date: '2025.05.18', home: match.awayTeam.name, away: match.homeTeam.name, score: '1 : 1' },
                  { date: '2024.11.02', home: match.homeTeam.name, away: match.awayTeam.name, score: '3 : 0' },
                ].map((h2h, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-[#0b0e14] px-3 py-2 border border-white/[0.03]"
                  >
                    <span className="text-slate-500 tabular-nums">{h2h.date}</span>
                    <span className="font-medium text-slate-200">
                      {h2h.home} vs {h2h.away}
                    </span>
                    <span className="font-bold text-[#10b981] tabular-nums">
                      {h2h.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* O'yinchi batafsil profili modali */}
        {selectedPlayer && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlayer(null);
            }}
          >
            <div
              className="relative w-full max-w-sm rounded-2xl bg-[#0c101c] border border-white/[0.1] p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 font-mono font-extrabold text-base ring-1 ring-emerald-500/30">
                    #{selectedPlayer.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{selectedPlayer.name}</h3>
                    <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-emerald-400">{selectedPlayer.pos}</span>
                      {selectedPlayer.country && (
                        <>
                          <span>•</span>
                          <span>{selectedPlayer.country}</span>
                        </>
                      )}
                      {selectedPlayer.isCaptain && (
                        <span className="rounded bg-amber-400/20 text-amber-300 px-1 text-[9px] font-bold">KAPITAN</span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPlayer(null)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SofaScore Reyting va ko'rsatkichlar */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-xl bg-white/[0.03] p-3 border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-400 block mb-1">SofaScore Reyting</span>
                  <span className={`inline-block px-3 py-1 rounded-md text-sm font-black ${getRatingBadgeColor(selectedPlayer.rating || 7.0)}`}>
                    {selectedPlayer.rating ? selectedPlayer.rating.toFixed(1) : '7.1'}
                  </span>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-3 border border-white/[0.04]">
                  <span className="text-[10px] text-zinc-400 block mb-1">Maydondagi roli</span>
                  <span className="text-emerald-400 font-bold text-sm block">Asosiy O'yinchi</span>
                  <span className="text-[10px] text-zinc-500">Taktik sxema</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlayer(null)}
                className="w-full rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-black hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
