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

  // 1. UEFA Champions League (ucl): Starball SVG pattern
  const renderUCLPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none mix-blend-screen"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 180"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="uclGlow" cx="80%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#0e1b4d" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0a1128" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="180" fill="url(#uclGlow)" />
      {/* Rasmiy UCL Starball yulduzlari */}
      <g fill="#93c5fd" opacity="0.6">
        <polygon points="780,25 785,40 801,40 788,50 793,65 780,55 767,65 772,50 759,40 775,40" />
        <polygon points="690,65 694,76 706,76 696,83 700,94 690,87 680,94 684,83 674,76 686,76" />
        <polygon points="830,95 833,103 842,103 835,108 837,116 830,111 823,116 825,108 818,103 827,103" />
        <polygon points="610,30 613,38 622,38 615,44 617,52 610,47 603,52 605,44 598,38 607,38" />
        <polygon points="860,35 862,41 869,41 863,46 865,52 860,48 855,52 857,46 851,41 858,41" />
      </g>
      {/* Geometrik yulduzli bog'lanish chiziqlari */}
      <path
        d="M610,38 L690,75 L780,45 L830,105 L860,42"
        stroke="#60a5fa"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.4"
      />
      <circle cx="780" cy="45" r="28" stroke="#3b82f6" strokeWidth="0.8" fill="none" opacity="0.3" strokeDasharray="2 3" />
    </svg>
  );

  // 2. UEFA Europa League (uel): Dinamik to'lqinli chiziqlar
  const renderUELPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 180"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="uelEnergy" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#ea580c" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#1a0f07" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M500,180 C620,30 720,160 880,10 L900,180 Z"
        fill="url(#uelEnergy)"
      />
      <path
        d="M450,140 C580,20 700,170 890,15"
        stroke="#f97316"
        strokeWidth="2"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M520,170 C630,60 740,180 880,45"
        stroke="#fb923c"
        strokeWidth="1.2"
        fill="none"
        opacity="0.3"
      />
      <line x1="720" y1="0" x2="800" y2="180" stroke="#f97316" strokeWidth="0.8" opacity="0.2" strokeDasharray="5 5" />
    </svg>
  );

  // 3. O'zbekiston Superligasi (uz_superliga): Milliy geometrik naqsh (Girih)
  const renderSuperligaPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 180"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="uzGirih" width="44" height="44" patternUnits="userSpaceOnUse">
          <path
            d="M22 0 L44 22 L22 44 L0 22 Z"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <circle cx="22" cy="22" r="6" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
          <path
            d="M0 0 L12 12 M32 12 L44 0 M32 32 L44 44 M0 44 L12 32"
            stroke="#10b981"
            strokeWidth="0.6"
            opacity="0.35"
          />
        </pattern>
        <radialGradient id="uzEmeraldGlow" cx="85%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#06241c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="180" fill="url(#uzGirih)" />
      <rect width="900" height="180" fill="url(#uzEmeraldGlow)" />
    </svg>
  );

  // 4. Premier League (premier_league): Binafsha-to'q pushti va neon aksent
  const renderPremierLeaguePattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 180"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="plNeonGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ff85" stopOpacity="0.3" />
          <stop offset="45%" stopColor="#e11d48" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1e072b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M520,0 L900,0 L900,180 L680,180 Z" fill="url(#plNeonGrad)" />
      <g stroke="#00ff85" strokeWidth="1" fill="none" opacity="0.4">
        <polygon points="780,20 830,55 810,105 760,80" />
        <polygon points="700,75 745,95 725,140 680,120" />
        <line x1="620" y1="20" x2="880" y2="170" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="6 4" />
      </g>
    </svg>
  );

  // 5. La Liga (laliga): Qizil-marjon gradient va dinamik chiziqlar
  const renderLaLigaPattern = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 180"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="laligaGlow" cx="85%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#26090c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="180" fill="url(#laligaGlow)" />
      <path
        d="M540,170 Q720,20 900,80"
        stroke="#ef4444"
        strokeWidth="2.2"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M590,180 Q760,50 900,110"
        stroke="#f87171"
        strokeWidth="1.2"
        fill="none"
        opacity="0.3"
      />
      <circle cx="820" cy="70" r="45" stroke="#ef4444" strokeWidth="0.8" fill="none" opacity="0.2" strokeDasharray="4 4" />
    </svg>
  );

  // Turnirlar vizual konfiguratsiyasi (Talab 1 bo'yicha qat'iy)
  const configs = {
    ucl: {
      gradient: 'bg-gradient-to-r from-[#0a1128] via-[#0e1b4d] to-[#090d16]',
      border: 'border-[#1e3a8a]/70 hover:border-[#3b82f6]',
      tagBg: 'bg-[#3b82f6]/20 border-[#3b82f6]/40 text-[#93c5fd]',
      accent: 'text-[#93c5fd]',
      subAccent: 'text-[#3b82f6]',
      tag: 'UEFA CHAMPIONS LEAGUE',
      pattern: renderUCLPattern(),
      shadow: 'shadow-blue-950/40',
      pillBg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    },
    uel: {
      gradient: 'bg-gradient-to-r from-[#1a0f07] via-[#2b1405] to-[#0d0d0d]',
      border: 'border-[#c2410c]/60 hover:border-[#f97316]',
      tagBg: 'bg-[#f97316]/20 border-[#f97316]/40 text-[#fdba74]',
      accent: 'text-[#f97316]',
      subAccent: 'text-[#fdba74]',
      tag: 'UEFA EUROPA LEAGUE',
      pattern: renderUELPattern(),
      shadow: 'shadow-orange-950/40',
      pillBg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    },
    uz_superliga: {
      gradient: 'bg-gradient-to-r from-[#06241c] via-[#093329] to-[#0a0f14]',
      border: 'border-[#065f46]/70 hover:border-[#10b981]',
      tagBg: 'bg-[#10b981]/20 border-[#10b981]/40 text-[#6ee7b7]',
      accent: 'text-[#10b981]',
      subAccent: 'text-[#06b6d4]',
      tag: "O'ZBEKISTON SUPERLIGASI",
      pattern: renderSuperligaPattern(),
      shadow: 'shadow-emerald-950/40',
      pillBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    },
    premier_league: {
      gradient: 'bg-gradient-to-r from-[#1e072b] via-[#2e0b40] to-[#0d0a12]',
      border: 'border-[#701a75]/70 hover:border-[#e11d48]',
      tagBg: 'bg-[#e11d48]/20 border-[#e11d48]/40 text-[#f472b6]',
      accent: 'text-[#f472b6]',
      subAccent: 'text-[#00ff85]',
      tag: 'PREMIER LEAGUE',
      pattern: renderPremierLeaguePattern(),
      shadow: 'shadow-purple-950/40',
      pillBg: 'bg-pink-500/10 border-pink-500/30 text-pink-300',
    },
    laliga: {
      gradient: 'bg-gradient-to-r from-[#26090c] via-[#380d12] to-[#0f0a0b]',
      border: 'border-[#991b1b]/70 hover:border-[#ef4444]',
      tagBg: 'bg-[#ef4444]/20 border-[#ef4444]/40 text-[#fca5a5]',
      accent: 'text-[#fca5a5]',
      subAccent: 'text-[#ef4444]',
      tag: 'LALIGA EA SPORTS',
      pattern: renderLaLigaPattern(),
      shadow: 'shadow-red-950/40',
      pillBg: 'bg-red-500/10 border-red-500/30 text-red-300',
    },
    default: {
      gradient: 'bg-gradient-to-r from-[#111622] via-[#151c2c] to-[#0d1017]',
      border: 'border-[#1f293d] hover:border-gray-500',
      tagBg: 'bg-gray-800 border-gray-700 text-gray-300',
      accent: 'text-gray-200',
      subAccent: 'text-gray-400',
      tag: 'FUTBOL',
      pattern: null,
      shadow: 'shadow-black/30',
      pillBg: 'bg-gray-800 border-gray-700 text-gray-300',
    },
  };

  const currentTheme = configs[tournamentKey];

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 shadow-xl ${currentTheme.border} ${currentTheme.shadow} mb-4`}
    >
      {/* Sarlavha paneli (Header Bar) — Apple Sports va SofaScore standartida */}
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
        className={`relative flex items-center justify-between px-3.5 py-3 cursor-pointer select-none transition-all ${currentTheme.gradient}`}
      >
        {/* Orqa fon SVG naqshi */}
        {currentTheme.pattern}

        {/* Chap qism: Liga emblemasi, Nomi va Rasmiy Brand blok */}
        <div className="relative z-10 flex items-center gap-3 min-w-0">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/45 backdrop-blur-md p-1.5 border border-white/10 shadow-inner">
            {league?.logo && !logoError ? (
              <img
                src={league.logo}
                alt={league.name}
                className="h-full w-full object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Trophy className={`h-5 w-5 ${currentTheme.accent}`} />
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
                className="truncate text-sm sm:text-base font-extrabold tracking-tight text-white hover:underline cursor-pointer"
              >
                {league?.name || 'Turnir'}
              </span>

              {/* Rasmiy turnir yorlig'i */}
              <span
                className={`hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${currentTheme.tagBg}`}
              >
                {currentTheme.tag}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
              <span className="truncate">{league?.country || 'Xalqaro'}</span>
              {league?.round && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className={`${currentTheme.accent} font-semibold truncate`}>
                    {league.round}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* O'ng qism: LIVE hisoblagichi, o'yinlar soni va Chevron */}
        <div className="relative z-10 flex items-center gap-2 shrink-0 pl-2">
          {liveMatchCount > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 border border-emerald-500/40 text-[#10b981] text-[11px] font-black tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span>{liveMatchCount} JONLI</span>
            </div>
          )}

          <div className="hidden sm:flex items-center gap-1 rounded-lg bg-black/35 backdrop-blur-sm px-2.5 py-1 text-xs text-gray-300 border border-white/5">
            <span className="font-bold text-white">{matchCount}</span>
            <span className="text-[10px] text-gray-400">o'yin</span>
          </div>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:text-white transition-colors"
            aria-label={isExpanded ? "Yig'ish" : "Ochish"}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180 text-white' : 'rotate-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* O'yinlar ro'yxati (Ixcham SofaScore row layout uchun konteyner) */}
      {isExpanded && (
        <div className="divide-y divide-[#1f293d]/50 bg-[#0b0e14]/95">
          {children}
        </div>
      )}
    </section>
  );
};
