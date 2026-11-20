import React from 'react';
import { Search, Trophy, X, Radio, Star } from 'lucide-react';

export type FilterType = 'all' | 'live' | 'favorites';

export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  liveCount?: number;
  favoritesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  liveCount = 0,
  favoritesCount = 0,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#080a0f]/90 backdrop-blur-2xl border-b border-white/[0.06] transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Yuqori qator: Logotip, Qidiruv va Jonli holat */}
        <div className="flex h-14 items-center justify-between gap-4 sm:gap-6">
          {/* UzScore Logotipi — sof minimalist, o'ta tiniq */}
          <div className="flex items-center gap-2.5 shrink-0 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-black font-black text-xs tracking-tighter">
              Uz
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-bold tracking-tight text-white">
                Uz<span className="text-emerald-400">Score</span>
              </span>
              <span className="text-[9.5px] font-semibold text-zinc-400 uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>

          {/* Qidiruv maydoni — tiniq, minimal va qulay */}
          <div className="flex-1 max-w-sm sm:max-w-md">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-3.5 w-3.5 text-zinc-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Jamoa yoki turnir nomini qidiring..."
                className="w-full rounded-xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] py-1.5 pl-8 pr-7 text-xs sm:text-[13px] text-white placeholder-zinc-400 transition-colors focus:border-white/20 focus:bg-[#0e121b] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-400 hover:text-white"
                  title="Tozalash"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Jonli indikator (Desktop) — tiniq va sokin */}
          <div className="hidden md:flex items-center gap-2 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
              <Radio
                className={`h-3.5 w-3.5 ${
                  liveCount > 0 ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'
                }`}
              />
              <span className="text-[11.5px] font-medium text-zinc-300">
                Jonli:{' '}
                <span className={`tabular-nums font-semibold ${liveCount > 0 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                  {liveCount} ta o'yin
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Pastki qator: Filtr tugmalari (Toza monoxrom Apple Segment) */}
        <div className="flex items-center justify-between border-t border-white/[0.04] py-1.5 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-lg border border-white/[0.03]">
            {/* Barchasi */}
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Trophy className="h-3 w-3" />
              <span>Barchasi</span>
            </button>

            {/* Jonli */}
            <button
              type="button"
              onClick={() => onFilterChange('live')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-all ${
                activeFilter === 'live'
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Jonli</span>
              {liveCount > 0 && (
                <span className="text-[10px] font-bold tabular-nums">
                  {liveCount}
                </span>
              )}
            </button>

            {/* Sevimlilar */}
            <button
              type="button"
              onClick={() => onFilterChange('favorites')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-all ${
                activeFilter === 'favorites'
                  ? 'bg-amber-400 text-black font-semibold shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Star className="h-3 w-3" />
              <span>Sevimlilar</span>
              {favoritesCount > 0 && (
                <span className="text-[10px] font-bold tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
