import React from 'react';
import { Search, Trophy, X, Radio, Star, RefreshCw } from 'lucide-react';

export type FilterType = 'all' | 'live' | 'favorites';

export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  liveCount?: number;
  favoritesCount?: number;
  isRealApi?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  liveCount = 0,
  favoritesCount = 0,
  isRealApi = false,
  isLoading = false,
  onRefresh,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0e14]/90 backdrop-blur-xl border-b border-white/[0.05] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Yuqori qator: Logotip, Qidiruv va Jonli holat */}
        <div className="flex h-14 items-center justify-between gap-4 sm:gap-6">
          {/* UzScore Logotipi — ortiqcha qalin ramkalarsiz, zamonaviy Apple uslubida */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-[#10b981] text-[#0b0e14] font-black text-sm tracking-tighter shadow-sm">
              Uz
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">
                Uz<span className="text-[#10b981]">Score</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>

          {/* Qidiruv maydoni — toza, minimal va qulay */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Jamoa yoki turnir qidirish..."
                className="w-full rounded-xl bg-[#131722]/80 border border-white/[0.06] py-1.5 pl-9 pr-8 text-xs sm:text-[13px] text-slate-100 placeholder-slate-500 transition-colors focus:border-[#10b981]/50 focus:bg-[#131722] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-white"
                  title="Tozalash"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Jonli indikator va Yangilash (Desktop & Mobile) */}
          <div className="flex items-center gap-2 text-xs">
            {isRealApi && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-[#10b981] border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-ping" />
                API Real Live
              </span>
            )}

            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-[#131722] text-slate-300">
              <Radio
                className={`h-3.5 w-3.5 ${
                  liveCount > 0 ? 'text-[#10b981] animate-pulse' : 'text-slate-500'
                }`}
              />
              <span className="font-medium text-slate-400">
                Jonli:{' '}
                <span className={`font-semibold ${liveCount > 0 ? 'text-[#10b981]' : 'text-slate-400'}`}>
                  {liveCount} ta
                </span>
              </span>
            </div>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                title="Jonli ma'lumotlarni yangilash"
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#131722] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-[#10b981]' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Pastki qator: Filtr tugmalari (Toza tabs) */}
        <div className="flex items-center justify-between border-t border-white/[0.04] py-2 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Barchasi */}
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>Barchasi</span>
            </button>

            {/* Jonli (LIVE) */}
            <button
              type="button"
              onClick={() => onFilterChange('live')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                activeFilter === 'live'
                  ? 'bg-emerald-500/15 text-[#10b981] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span>Jonli</span>
              {liveCount > 0 && (
                <span className="ml-0.5 text-[11px] font-bold text-[#10b981]">
                  ({liveCount})
                </span>
              )}
            </button>

            {/* Sevimlilar */}
            <button
              type="button"
              onClick={() => onFilterChange('favorites')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                activeFilter === 'favorites'
                  ? 'bg-amber-400/15 text-amber-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              <span>Sevimlilar</span>
              {favoritesCount > 0 && (
                <span className="ml-0.5 text-[11px] font-bold text-amber-300">
                  ({favoritesCount})
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
