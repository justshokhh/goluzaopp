import React, { useState, useEffect } from 'react';
import {
  X,
  Trophy,
  Activity,
  BarChart2,
  Users,
  GitCommit,
  Calendar,
  MapPin,
  UserCheck,
  Tv,
  CornerDownRight,
  TrendingUp,
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

  // ESC tugmasi orqali yopish
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

  if (!isOpen || !match) return null;

  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FINISHED' || match.status === 'FT';
  const homeScore = match.score?.home ?? match.homeTeam.score ?? 0;
  const awayScore = match.score?.away ?? match.awayTeam.score ?? 0;

  // Turnir bo'yicha vizual fon
  const theme = match.league?.theme || match.tournamentTheme || 'uz_superliga';
  const getHeaderGradient = () => {
    switch (theme) {
      case 'ucl':
        return 'from-[#0a1128] via-[#0e1b4d] to-[#090d16] border-[#1e3a8a]/60';
      case 'uel':
        return 'from-[#1a0f07] via-[#2b1405] to-[#0d0d0d] border-[#c2410c]/60';
      case 'premier_league':
        return 'from-[#1e072b] via-[#2e0b40] to-[#0d0a12] border-[#701a75]/60';
      case 'laliga':
        return 'from-[#26090c] via-[#380d12] to-[#0f0a0b] border-[#991b1b]/60';
      case 'uz_superliga':
      default:
        return 'from-[#06241c] via-[#093329] to-[#0a0f14] border-[#065f46]/60';
    }
  };

  // Statistikalarni olish (match.stats yoki mockMatchStats dan)
  const stats: MatchStats =
    match.stats ||
    mockMatchStats[match.id] || {
      ballPossession: { home: 54, away: 46 },
      expectedGoals: { home: match.xG?.home ?? 1.84, away: match.xG?.away ?? 1.12 },
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

  // SofaScore reytingi rangini aniqlash
  const getRatingBadgeColor = (rating?: number) => {
    if (!rating) return 'bg-gray-700 text-gray-300';
    if (rating >= 8.0) return 'bg-blue-600 text-white font-extrabold shadow-sm shadow-blue-500/50';
    if (rating >= 7.0) return 'bg-emerald-600 text-white font-extrabold shadow-sm shadow-emerald-500/50';
    if (rating >= 6.0) return 'bg-amber-500 text-black font-extrabold';
    return 'bg-rose-600 text-white font-extrabold';
  };

  // Voqealar ikonkasi
  const renderEventIcon = (event: MatchEvent) => {
    switch (event.type) {
      case 'GOAL':
      case 'PENALTY':
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs shadow-sm">
            ⚽
          </span>
        );
      case 'YELLOW':
      case 'YELLOW_CARD':
        return (
          <span
            title="Sariq kartochka"
            className="inline-block h-4 w-3 bg-amber-400 rounded-[1.5px] shadow-sm shadow-amber-400/40"
          />
        );
      case 'RED':
      case 'RED_CARD':
        return (
          <span
            title="Qizil kartochka"
            className="inline-block h-4 w-3 bg-rose-600 rounded-[1.5px] shadow-sm shadow-rose-600/40"
          />
        );
      case 'SUB':
      case 'SUBSTITUTION':
        return (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px]">
            🔄
          </span>
        );
      case 'VAR':
        return (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/40 text-[10px]">
            <Tv className="w-3 h-3" />
          </span>
        );
      default:
        return (
          <span className="h-2 w-2 rounded-full bg-gray-400" />
        );
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
      <div className="space-y-1.5 py-1.5">
        <div className="flex items-center justify-between text-xs">
          <span
            className={`w-14 text-left font-mono font-bold ${
              isHomeBetter ? 'text-[#10b981] font-black text-sm' : 'text-gray-300'
            }`}
          >
            {homeVal}
            {isPercentage ? '%' : ''}
          </span>
          <span className="flex-1 text-center font-medium text-gray-400 text-[11px] uppercase tracking-wider">
            {label}
          </span>
          <span
            className={`w-14 text-right font-mono font-bold ${
              isAwayBetter ? 'text-[#10b981] font-black text-sm' : 'text-gray-300'
            }`}
          >
            {awayVal}
            {isPercentage ? '%' : ''}
          </span>
        </div>

        {/* Ikki tomonlama markazdan yoki ikki qirradan chiquvchi progress bar */}
        <div className="flex h-2 w-full gap-1 overflow-hidden rounded-full bg-[#0b0e14]">
          {/* Mezbon bar */}
          <div className="flex w-1/2 justify-end bg-gray-800/40 rounded-l-full overflow-hidden">
            <div
              style={{ width: `${homePercent}%` }}
              className={`h-full transition-all duration-500 rounded-l-full ${
                isHomeBetter ? 'bg-[#10b981]' : 'bg-gray-600'
              }`}
            />
          </div>
          {/* Mehmon bar */}
          <div className="flex w-1/2 justify-start bg-gray-800/40 rounded-r-full overflow-hidden">
            <div
              style={{ width: `${awayPercent}%` }}
              className={`h-full transition-all duration-500 rounded-r-full ${
                isAwayBetter ? 'bg-[#10b981]' : 'bg-gray-600'
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  // Tarkiblar uchun maydonda futbolchilarni joylashtirish
  const renderFieldFormation = (
    players: PlayerLineup[],
    teamType: 'home' | 'away',
    _teamName?: string
  ) => {
    // Pozitsiyalar bo'yicha guruhlash: GK, DF, MF, FW
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
                className="group relative flex flex-col items-center cursor-pointer"
                title={`${player.name} #${player.number} (${player.pos}) ${player.country ? `• ${player.country}` : ''}`}
              >
                {/* Futbolchi doirasi yoki rasmi */}
                <div
                  className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 shadow-lg transition-transform group-hover:scale-115 ${
                    teamType === 'home'
                      ? 'bg-blue-900/90 border-blue-400 text-white'
                      : 'bg-emerald-950/90 border-emerald-400 text-white'
                  }`}
                >
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="h-full w-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="text-[11px] sm:text-xs font-black">{player.number}</span>

                  {/* SofaScore Reytingi */}
                  {player.rating && (
                    <span
                      className={`absolute -bottom-1 -right-1 px-1 py-0.2 rounded text-[9px] font-black tracking-tight ${getRatingBadgeColor(
                        player.rating
                      )}`}
                    >
                      {player.rating}
                    </span>
                  )}
                </div>

                {/* Futbolchi familiyasi va bayrog'i */}
                <span className="mt-1 flex items-center gap-0.5 max-w-[85px] truncate text-[10px] font-bold text-gray-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] bg-black/60 px-1.5 py-0.2 rounded-full border border-white/10">
                  {player.countryFlag && (
                    <span className="text-[10px] shrink-0" title={player.country}>
                      {player.countryFlag}
                    </span>
                  )}
                  <span className="truncate">{player.name.split(' ').slice(-1)[0]}</span>
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
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-[#1f293d] bg-[#131722] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================================================================= */}
        {/* 1. TOP HEADER: Turnir brendi, Jamoalar, Hisob va Yopish */}
        {/* ================================================================= */}
        <div
          className={`relative shrink-0 border-b p-4 sm:p-6 bg-gradient-to-br ${getHeaderGradient()}`}
        >
          {/* Yuqori kichik qator: Turnir nomi va Yopish tugmasi */}
          <div className="flex items-center justify-between text-xs text-gray-300 mb-3">
            <div className="flex items-center gap-2 font-bold tracking-tight">
              <Trophy className="h-4 w-4 text-[#10b981]" />
              <span>{match.league?.name || match.tournamentName}</span>
              {match.league?.round && (
                <>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{match.league.round}</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/40 text-gray-400 hover:text-white hover:bg-black/60 border border-white/10 transition-colors"
              title="Yopish (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Markaziy Hisob va Jamoalar Bloki (Apple Sports estetikasida) */}
          <div className="grid grid-cols-7 items-center gap-2 text-center py-2">
            {/* Mezbon jamoa (3 ustun) */}
            <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-end sm:gap-4">
              <div className="order-2 sm:order-1 sm:text-right mt-1 sm:mt-0">
                <h3 className="text-sm sm:text-lg font-black text-white tracking-tight">
                  {match.homeTeam.name}
                </h3>
                <span className="text-[11px] font-medium text-gray-400">Mezbon</span>
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

            {/* Markaziy Hisob va Daqiqa (1 ustun) */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 sm:gap-2 text-2xl sm:text-4xl font-black text-white font-mono">
                <span>{homeScore}</span>
                <span className="text-gray-500 text-xl sm:text-2xl">:</span>
                <span>{awayScore}</span>
              </div>

              {isLive ? (
                <div className="mt-1 flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-black text-[#10b981] border border-emerald-500/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-ping" />
                  <span>{match.minute}' Jonli</span>
                </div>
              ) : isFinished ? (
                <span className="mt-1 rounded bg-gray-800 px-2 py-0.5 text-[11px] font-black text-gray-300">
                  Yakunlandi
                </span>
              ) : (
                <span className="mt-1 rounded bg-gray-800 px-2 py-0.5 text-[11px] font-bold text-gray-400">
                  {match.startTime || '21:00'}
                </span>
              )}

              {match.htScore && (
                <span className="text-[10px] text-gray-400 mt-0.5 font-medium">
                  HT {match.htScore.home}-{match.htScore.away}
                </span>
              )}
            </div>

            {/* Mehmon jamoa (3 ustun) */}
            <div className="col-span-3 flex flex-col items-center sm:flex-row sm:justify-start sm:gap-4">
              <div>
                <TeamCrest
                  name={match.awayTeam.name}
                  logoUrl={match.awayTeam.logo}
                  crestDetails={match.awayTeam.crestDetails}
                  size="xl"
                />
              </div>
              <div className="sm:text-left mt-1 sm:mt-0">
                <h3 className="text-sm sm:text-lg font-black text-white tracking-tight">
                  {match.awayTeam.name}
                </h3>
                <span className="text-[11px] font-medium text-gray-400">Mehmon</span>
              </div>
            </div>
          </div>

          {/* O'yin stadioni va bosh hakam axboroti */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400 border-t border-white/10 pt-2.5">
            {match.stadium && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500" /> {match.stadium}
              </span>
            )}
            {match.referee && (
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-gray-500" /> Hakam: {match.referee}
              </span>
            )}
            {match.attendance && (
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-gray-500" /> {match.attendance.toLocaleString()} muxlis
              </span>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. TABLAR NAVIGATSIYASI (SofaScore Tab Bar) */}
        {/* ================================================================= */}
        <div className="flex items-center border-b border-[#1f293d] bg-[#0f131c] px-4">
          <button
            type="button"
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'summary'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Sharh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'stats'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Statistika</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lineups')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lineups'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Tarkiblar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('h2h')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'h2h'
                ? 'border-[#10b981] text-[#10b981]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>H2H & Jadval</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* 3. ASOSIY TAB MAZMUNI (Scrollable) */}
        {/* ================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: SHARH (SUMMARY) — Vertikal vaqt shkalasi */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <GitCommit className="w-4 h-4 text-[#10b981]" /> O'yin Voqealari Shkalasi
              </h4>

              {match.events && match.events.length > 0 ? (
                <div className="relative border-l-2 border-[#1f293d] ml-4 sm:ml-6 pl-4 sm:pl-6 space-y-4 py-2">
                  {match.events.map((event) => {
                    const isHome = event.team === 'home';
                    return (
                      <div
                        key={event.id}
                        className="relative flex items-start gap-3 text-xs transition-all hover:bg-white/[0.02] p-2 rounded-xl"
                      >
                        {/* Shkaladagi nuqta (Daqiqa doirasi) */}
                        <div className="absolute -left-[27px] sm:-left-[35px] flex h-7 w-7 items-center justify-center rounded-full bg-[#131722] border-2 border-[#10b981] text-[10px] font-black text-[#10b981] shadow-md">
                          {event.minute}'
                        </div>

                        {/* Voqea kartochkasi */}
                        <div className="flex-1 flex items-center justify-between rounded-xl bg-[#0b0e14] border border-[#1f293d] p-3 shadow-sm">
                          <div className="flex items-center gap-3">
                            {renderEventIcon(event)}
                            <div>
                              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                <span>{event.player}</span>
                                <span className="text-[10px] font-semibold text-gray-500 uppercase">
                                  ({isHome ? match.homeTeam.name : match.awayTeam.name})
                                </span>
                              </div>
                              {event.assistPlayer && (
                                <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                                  <CornerDownRight className="w-3 h-3 text-[#10b981]" />
                                  Assist: <span className="text-gray-200">{event.assistPlayer}</span>
                                </p>
                              )}
                              {event.detail && (
                                <p className="text-[11px] text-gray-500 italic mt-0.5">
                                  {event.detail}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="rounded bg-[#131722] px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border border-white/5">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-[#1f293d] bg-[#0b0e14] p-8 text-center text-gray-500 text-xs">
                  Ushbu o'yin uchun voqealar hali qayd etilmagan.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: STATISTIKA (STATS) — SofaScore gorizontal progress-barlar */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1f293d] pb-2 text-xs font-bold text-gray-400">
                <span className="text-white">{match.homeTeam.name}</span>
                <span className="uppercase tracking-wider">Umumiy ko'rsatkichlar</span>
                <span className="text-white">{match.awayTeam.name}</span>
              </div>

              <div className="rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-4 sm:p-5 space-y-3">
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

          {/* TAB 3: TARKIBLAR (LINEUPS) — Yashil futbol maydoni va reytinglar */}
          {activeTab === 'lineups' && (
            <div className="space-y-4">
              {match.lineups ? (
                <div>
                  {/* Sxemalar sarlavhasi */}
                  <div className="flex items-center justify-between px-2 pb-2 text-xs font-bold text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-extrabold">{match.homeTeam.name}</span>
                      <span className="rounded bg-blue-900/60 px-2 py-0.5 text-blue-200 border border-blue-500/30">
                        {match.lineups.home.formation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-emerald-900/60 px-2 py-0.5 text-emerald-200 border border-emerald-500/30">
                        {match.lineups.away.formation}
                      </span>
                      <span className="text-white font-extrabold">{match.awayTeam.name}</span>
                    </div>
                  </div>

                  {/* Yashil futbol maydoni (Soccer Field) */}
                  <div className="relative w-full h-[540px] sm:h-[600px] rounded-2xl overflow-hidden border-2 border-emerald-600/40 shadow-2xl bg-[#144824]">
                    {/* Maysa chiziqlari (Grass stripes pattern) */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#144824,#144824_40px,#18522a_40px,#18522a_80px)] opacity-90" />

                    {/* Maydon oq chiziqlari SVG */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 400 600"
                      preserveAspectRatio="none"
                    >
                      {/* Tashqi chegara */}
                      <rect x="15" y="15" width="370" height="570" fill="none" stroke="#ffffff" strokeWidth="2" />
                      {/* Markaziy chiziq */}
                      <line x1="15" y1="300" x2="385" y2="300" stroke="#ffffff" strokeWidth="2" />
                      {/* Markaziy doira */}
                      <circle cx="200" cy="300" r="45" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="200" cy="300" r="3" fill="#ffffff" />
                      {/* Yuqori Jarima maydonchasi */}
                      <rect x="110" y="15" width="180" height="90" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <rect x="145" y="15" width="110" height="35" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <path d="M 160 105 A 40 40 0 0 0 240 105" fill="none" stroke="#ffffff" strokeWidth="2" />
                      {/* Pastki Jarima maydonchasi */}
                      <rect x="110" y="495" width="180" height="90" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <rect x="145" y="550" width="110" height="35" fill="none" stroke="#ffffff" strokeWidth="2" />
                      <path d="M 160 495 A 40 40 0 0 1 240 495" fill="none" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    {/* Maydon ichidagi ikkala jamoa futbolchilari */}
                    <div className="relative z-10 grid grid-rows-2 h-full">
                      {/* Yuqori yarim: Mezbon jamoa */}
                      <div className="border-b border-white/20">
                        {renderFieldFormation(
                          match.lineups.home.startXI,
                          'home',
                          match.homeTeam.name
                        )}
                      </div>

                      {/* Pastki yarim: Mehmon jamoa */}
                      <div>
                        {renderFieldFormation(
                          match.lineups.away.startXI,
                          'away',
                          match.awayTeam.name
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Murabbiylar va Zaxira o'yinchilari */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-xl border border-[#1f293d] bg-[#0b0e14] p-3">
                      <p className="font-bold text-white mb-1">
                        Murabbiy: <span className="text-gray-300 font-normal">{match.lineups.home.coach}</span>
                      </p>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Zaxiradagilar:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {match.lineups.home.substitutes.map((s) => (
                          <span
                            key={s.number}
                            className="rounded bg-[#131722] px-2 py-0.5 text-[11px] text-gray-300 border border-white/5"
                          >
                            #{s.number} {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#1f293d] bg-[#0b0e14] p-3">
                      <p className="font-bold text-white mb-1">
                        Murabbiy: <span className="text-gray-300 font-normal">{match.lineups.away.coach}</span>
                      </p>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Zaxiradagilar:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {match.lineups.away.substitutes.map((s) => (
                          <span
                            key={s.number}
                            className="rounded bg-[#131722] px-2 py-0.5 text-[11px] text-gray-300 border border-white/5"
                          >
                            #{s.number} {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-[#1f293d] bg-[#0b0e14] p-8 text-center text-gray-500 text-xs">
                  Tarkiblar rasman e'lon qilinishi kutilmoqda.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: H2H & JADVAL — O'zaro o'yinlar va Jonli Turnir o'rni */}
          {activeTab === 'h2h' && (
            <div className="space-y-4">
              {/* O'zaro oxirgi 5 o'yin */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#10b981]" /> O'zaro Oxirgi O'yinlar (Head-to-Head)
                </h4>
                <div className="space-y-2">
                  {[
                    { date: '2025.10.12', comp: 'Superliga', home: match.homeTeam.name, away: match.awayTeam.name, score: '2 : 1', win: 'home' },
                    { date: '2025.05.18', comp: 'Superliga', home: match.awayTeam.name, away: match.homeTeam.name, score: '1 : 1', win: 'draw' },
                    { date: '2024.11.02', comp: "O'zbekiston Kubogi", home: match.homeTeam.name, away: match.awayTeam.name, score: '3 : 0', win: 'home' },
                    { date: '2024.08.20', comp: 'Superliga', home: match.awayTeam.name, away: match.homeTeam.name, score: '2 : 2', win: 'draw' },
                    { date: '2024.04.15', comp: 'Superliga', home: match.homeTeam.name, away: match.awayTeam.name, score: '0 : 1', win: 'away' },
                  ].map((h2h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-[#0b0e14] border border-[#1f293d] px-3.5 py-2.5 text-xs"
                    >
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="font-mono text-[11px] text-gray-500">{h2h.date}</span>
                        <span className="rounded bg-[#131722] px-1.5 py-0.5 text-[9px] font-bold text-gray-400">
                          {h2h.comp}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-semibold">
                        <span className={h2h.win === 'home' ? 'text-white font-bold' : 'text-gray-400'}>
                          {h2h.home}
                        </span>
                        <span className="rounded bg-black/50 px-2 py-0.5 font-mono font-black text-[#10b981] border border-emerald-500/30">
                          {h2h.score}
                        </span>
                        <span className={h2h.win === 'away' ? 'text-white font-bold' : 'text-gray-400'}>
                          {h2h.away}
                        </span>
                      </div>

                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase ${
                          h2h.win === 'home'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : h2h.win === 'away'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {h2h.win === 'home' ? "G'alaba" : h2h.win === 'away' ? "Mag'lubiyat" : 'Durang'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Turnir jadvalidagi o'rni taqqoslovi */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#10b981]" /> Turnir Jadvalidagi Holat
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Mezbon jamoa jadval kartochkasi */}
                  <div className="rounded-xl border border-[#1f293d] bg-[#0b0e14] p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TeamCrest
                          name={match.homeTeam.name}
                          logoUrl={match.homeTeam.logo}
                          size="sm"
                        />
                        <span className="font-bold text-white">{match.homeTeam.name}</span>
                      </div>
                      <span className="rounded bg-blue-600/20 px-2 py-0.5 text-blue-400 font-extrabold text-[11px] border border-blue-500/30">
                        #2 O'rin
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-1 border-t border-[#1f293d]/60">
                      <div>
                        <span className="text-gray-500 block text-[9px]">O'YIN</span>
                        <span className="font-bold text-gray-200">18</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">G'/D/M</span>
                        <span className="font-bold text-gray-200">11/5/2</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">T-N</span>
                        <span className="font-bold text-gray-200">36-16</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">OCHKO</span>
                        <span className="font-black text-[#10b981] text-xs">38</span>
                      </div>
                    </div>
                  </div>

                  {/* Mehmon jamoa jadval kartochkasi */}
                  <div className="rounded-xl border border-[#1f293d] bg-[#0b0e14] p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TeamCrest
                          name={match.awayTeam.name}
                          logoUrl={match.awayTeam.logo}
                          size="sm"
                        />
                        <span className="font-bold text-white">{match.awayTeam.name}</span>
                      </div>
                      <span className="rounded bg-emerald-600/20 px-2 py-0.5 text-emerald-400 font-extrabold text-[11px] border border-emerald-500/30">
                        #3 O'rin
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-1 border-t border-[#1f293d]/60">
                      <div>
                        <span className="text-gray-500 block text-[9px]">O'YIN</span>
                        <span className="font-bold text-gray-200">18</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">G'/D/M</span>
                        <span className="font-bold text-gray-200">10/6/2</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">T-N</span>
                        <span className="font-bold text-gray-200">31-15</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px]">OCHKO</span>
                        <span className="font-black text-[#10b981] text-xs">36</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
