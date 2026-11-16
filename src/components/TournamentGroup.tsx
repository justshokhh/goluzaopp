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

  // 1. UCL Starball pattern (Nafis, xira, ortiqcha hoshiyalarsiz)
  const renderUCLPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none mix-blend-screen"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 140"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="uclGlow" cx="85%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#081026" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="140" fill="url(#uclGlow)" />
      <g fill="#93c5fd" opacity="0.45">
        <polygon points="780,25 785,38 798,38 788,46 792,58 780,50 768,58 772,46 762,38 775,38" />
        <polygon points="710,55 713,64 723,64 715,70 718,79 710,73 702,79 705,70 697,64 707,64" />
        <polygon points="825,75 827,82 834,82 828,86 830,93 825,89 820,93 822,86 816,82 823,82" />
        <polygon points="650,30 652,36 659,36 654,41 656,47 650,43 644,47 646,41 641,36 648,36" />
      </g>
      <path
        d="M650,35 L710,65 L780,40 L825,85"
        stroke="#60a5fa"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );

  // 2. UEL Energy wave pattern
  const renderUELPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 140"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="uelWave" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#140b06" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M550,140 C660,20 760,120 900,10 L900,140 Z" fill="url(#uelWave)" />
      <path
        d="M520,120 C640,15 740,130 900,15"
        stroke="#f97316"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );

  // 3. Superliga milliy Girih naqshi
  const renderSuperligaPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 140"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="uzGirihClean" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M18 0 L36 18 L18 36 L0 18 Z" fill="none" stroke="#10b981" strokeWidth="0.75" opacity="0.4" />
          <circle cx="18" cy="18" r="4" fill="none" stroke="#06b6d4" strokeWidth="0.75" opacity="0.5" />
        </pattern>
        <radialGradient id="uzGlowClean" cx="85%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#031711" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="140" fill="url(#uzGirihClean)" />
      <rect width="900" height="140" fill="url(#uzGlowClean)" />
    </svg>
  );

  // 4. Premier League Neon chiziqlar
  const renderPremierLeaguePattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 140"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="plNeonClean" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ff85" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#170522" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M560,0 L900,0 L900,140 L700,140 Z" fill="url(#plNeonClean)" />
      <line x1="620" y1="15" x2="880" y2="135" stroke="#f43f5e" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
    </svg>
  );

  // 5. La Liga Granat gradient
  const renderLaLigaPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 140"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="laligaCleanGlow" cx="85%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1c0507" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="140" fill="url(#laligaCleanGlow)" />
      <path d="M580,130 Q740,20 900,70" stroke="#ef4444" strokeWidth="1.8" fill="none" opacity="0.35" />
    </svg>
  );

  // Rasmiy turnir ranglari va uslub konfiguratsiyasi (Ortiqcha hoshiyalarsiz)
  const themes = {
    ucl: {
      headerBg: 'bg-gradient-to-r from-[#081026] via-[#0c1a40] to-[#080d1a]',
      accentColor: 'text-[#38bdf8]',
      tagBg: 'text-[#93c5fd] bg-sky-500/10',
      tag: 'UEFA Champions League',
      pattern: renderUCLPattern(),
    },
    uel: {
      headerBg: 'bg-gradient-to-r from-[#140b06] via-[#241207] to-[#0a0807]',
      accentColor: 'text-[#fb923c]',
      tagBg: 'text-[#fdba74] bg-orange-500/10',
      tag: 'UEFA Europa League',
      pattern: renderUELPattern(),
    },
    uz_superliga: {
      headerBg: 'bg-gradient-to-r from-[#031711] via-[#06261c] to-[#06120e]',
      accentColor: 'text-[#34d399]',
      tagBg: 'text-[#6ee7b7] bg-emerald-500/10',
      tag: "O'zbekiston Superligasi",
      pattern: renderSuperligaPattern(),
    },
    premier_league: {
      headerBg: 'bg-gradient-to-r from-[#170522] via-[#250937] to-[#0d0514]',
      accentColor: 'text-[#f472b6]',
      tagBg: 'text-[#f472b6] bg-pink-500/10',
      tag: 'Premier League',
      pattern: renderPremierLeaguePattern(),
    },
    laliga: {
      headerBg: 'bg-gradient-to-r from-[#1c0507] via-[#2d090d] to-[#0e0405]',
      accentColor: 'text-[#f87171]',
      tagBg: 'text-[#fca5a5] bg-red-500/10',
      tag: 'LaLiga EA Sports',
      pattern: renderLaLigaPattern(),
    },
    default: {
      headerBg: 'bg-[#131722]',
      accentColor: 'text-slate-300',
      tagBg: 'text-slate-300 bg-slate-700/30',
      tag: 'Futbol',
      pattern: null,
    },
  };

  const theme = themes[tournamentKey];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0d111a] border border-white/[0.06] mb-3.5 shadow-sm">
      {/* Sarlavha paneli — Apple Sports uslubida toza, ortiqcha hoshiyalarsiz */}
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
        className={`relative flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${theme.headerBg}`}
      >
        {/* Nafis fon naqshi */}
        {theme.pattern}

        {/* Chap qism: Toza liga logosi va yozuvlar */}
        <div className="relative z-10 flex items-center gap-3 min-w-0">
          {/* Logo — ortiqcha qora quti va borderlarsiz toza tasvir */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            {league?.logo && !logoError ? (
              <img
                src={league.logo}
                alt={league.name}
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Trophy className={`h-5 w-5 ${theme.accentColor}`} />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span
                onClick={(e) => {
                  if (onLeagueClick && league?.id) {
                    e.stopPropagation();
                    onLeagueClick(league.id);
                  }
                }}
                className="truncate text-[15px] font-bold text-white tracking-tight hover:text-white/80 transition-colors cursor-pointer"
              >
                {league?.name || 'Turnir'}
              </span>

              {/* Nafis kichik tur tegi */}
              {league?.round && (
                <span className="text-[12px] font-medium text-slate-400 truncate">
                  • {league.round}
                </span>
              )}
            </div>

            <span className="text-[11px] font-normal text-slate-400">
              {league?.country || 'Xalqaro'}
            </span>
          </div>
        </div>

        {/* O'ng qism: Jonli indikator va o'yinlar hisoblagichi */}
        <div className="relative z-10 flex items-center gap-2.5 shrink-0 pl-2">
          {liveMatchCount > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-emerald-400 text-[11px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{liveMatchCount} Jonli</span>
            </div>
          )}

          <span className="text-xs font-medium text-slate-400">
            {matchCount} o'yin
          </span>

          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-white' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      {/* O'yinlar qatorlari — SofaScore ixcham layout */}
      {isExpanded && (
        <div className="divide-y divide-white/[0.04] bg-[#0b0e14]">
          {children}
        </div>
      )}
    </section>
  );
};
