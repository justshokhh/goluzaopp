import React from 'react';
import { Search, Flame, Star, Trophy, X, Radio } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b border-[#1f293d] bg-[#0b0e14]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Yuqori qator: Logotip, Qidiruv va Jonli indikator */}
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-6">
          {/* UzScore Logotipi */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-[#10b981] shadow-lg shadow-emerald-500/20">
              <span className="text-xl font-black text-[#0b0e14] tracking-tighter">Uz</span>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#131722] border border-emerald-500/40">
                <span className="h-2 w-2 rounded-full bg-[#10b981] animate-ping" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  Uz<span className="text-[#10b981]">Score</span>
                </span>
                <span className="hidden sm:inline-flex items-center rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-black text-[#10b981] border border-emerald-500/20 uppercase tracking-wider">
                  Pro
                </span>
              </div>
              <span className="hidden text-[11px] font-medium text-gray-400 sm:block -mt-1">
                Apple Sports & SofaScore Standarti
              </span>
            </div>
          </div>

          {/* Qidiruv maydoni */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Jamoa yoki turnir nomini qidiring..."
                className="w-full rounded-xl border border-[#1f293d] bg-[#131722] py-2 pl-9 pr-9 text-xs sm:text-sm text-gray-200 placeholder-gray-500 transition-all focus:border-[#10b981] focus:bg-[#0b0e14] focus:outline-none focus:ring-1 focus:ring-[#10b981]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  title="Tozalash"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Jonli indikator (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-[#131722] border border-[#1f293d] px-3 py-1.5 shadow-sm">
              <Radio
                className={`h-4 w-4 ${
                  liveCount > 0 ? 'text-[#10b981] animate-pulse' : 'text-gray-500'
                }`}
              />
              <span className="text-xs font-semibold text-gray-300">
                Jonli efirda:{' '}
                <span className={`font-black ${liveCount > 0 ? 'text-[#10b981]' : 'text-gray-400'}`}>
                  {liveCount} ta o'yin
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Pastki qator: Filtr tugmalari (SofaScore tab bar uslubida) */}
        <div className="flex items-center justify-between border-t border-[#1f293d]/60 py-2.5 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Barchasi */}
            <button
              type="button"
              onClick={() => onFilterChange('all')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-emerald-500/15 text-[#10b981] border border-emerald-500/30 shadow-sm'
                  : 'text-gray-400 hover:bg-[#131722] hover:text-gray-200'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>Barcha o'yinlar</span>
            </button>

            {/* Jonli (LIVE) */}
            <button
              type="button"
              onClick={() => onFilterChange('live')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                activeFilter === 'live'
                  ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                  : 'text-gray-400 hover:bg-[#131722] hover:text-gray-200'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span>Jonli</span>
              {liveCount > 0 && (
                <span className="ml-0.5 rounded-full bg-[#10b981] px-1.5 py-0.2 text-[10px] font-black text-black">
                  {liveCount}
                </span>
              )}
            </button>

            {/* Sevimlilar (Favorites) */}
            <button
              type="button"
              onClick={() => onFilterChange('favorites')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold transition-all ${
                activeFilter === 'favorites'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-gray-400 hover:bg-[#131722] hover:text-gray-200'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              <span>Sevimlilar</span>
              {favoritesCount > 0 && (
                <span className="ml-0.5 rounded-full bg-amber-400 px-1.5 py-0.2 text-[10px] font-black text-black">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-gray-500 font-semibold">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Superliga 19-tur davom etmoqda
          </div>
        </div>
      </div>
    </header>
  );
};
