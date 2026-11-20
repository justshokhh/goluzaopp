import React from 'react';
import {
  Search,
  Trophy,
  X,
  Star,
  CheckCircle2,
  Calendar,
  Volume2,
  VolumeX,
  Key,
  RotateCw,
  Newspaper,
  Play,
  Square,
} from 'lucide-react';
import type { ActiveTab } from '../store/useFootballStore';

export interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: ActiveTab;
  onFilterChange: (filter: ActiveTab) => void;
  selectedDate?: -1 | 0 | 1;
  onDateChange?: (offset: -1 | 0 | 1) => void;
  liveCount?: number;
  favoritesCount?: number;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isRealApiActive?: boolean;
  onOpenApiModal?: () => void;
  isPollingActive?: boolean;
  onTogglePolling?: () => void;
  simulationActive?: boolean;
  onToggleSimulation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  selectedDate = 0,
  onDateChange,
  liveCount = 0,
  favoritesCount = 0,
  soundEnabled = true,
  onToggleSound,
  isRealApiActive = false,
  onOpenApiModal,
  isPollingActive = true,
  onTogglePolling,
  simulationActive = false,
  onToggleSimulation,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#07090e]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/30 transition-all">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Yuqori qator: Logotip, Qidiruv, Ovoz va API holati */}
        <div className="flex h-14 items-center justify-between gap-3 sm:gap-6">
          {/* UzScore Logotipi */}
          <div className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-black font-black text-sm shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400/40 group-hover:scale-105 transition-transform">
              ⚽
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black tracking-tight text-white">
                Gol<span className="text-emerald-400">Uz</span>
              </span>
              <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-widest px-1.5 py-0.5 rounded-md">
                PRO
              </span>
            </div>
          </div>

          {/* Qidiruv maydoni */}
          <div className="flex-1 max-w-xs sm:max-w-md">
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-3.5 w-3.5 text-zinc-400 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Jamoa, o'yinchi yoki turnir..."
                className="w-full rounded-xl bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] py-1.5 pl-9 pr-7 text-xs text-zinc-100 placeholder-zinc-500 transition-all focus:border-emerald-500/50 focus:bg-[#0c121e] focus:ring-2 focus:ring-emerald-500/20 focus:outline-none shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-zinc-500 hover:text-white"
                  title="Tozalash"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* O'ng tomon: Boshqaruv vositalari (Ovoz, API, Simulyatsiya, Jonli hisoblagich) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Ovoz tugmasi */}
            {onToggleSound && (
              <button
                type="button"
                onClick={onToggleSound}
                className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
                  soundEnabled
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                    : 'border-white/[0.05] bg-white/[0.02] text-zinc-500 hover:text-zinc-300'
                }`}
                title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish (Gol signallari)"}
              >
                {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
            )}

            {/* Simulyatsiya yoqish/to'xtatish */}
            {onToggleSimulation && (
              <button
                type="button"
                onClick={onToggleSimulation}
                className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  simulationActive
                    ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400 animate-pulse'
                    : 'border-white/[0.05] bg-white/[0.02] text-zinc-400 hover:text-zinc-200'
                }`}
                title="Jonli o'yinlar simulyatsiya dvigatelini boshqarish"
              >
                {simulationActive ? <Square className="h-3 w-3 fill-emerald-400" /> : <Play className="h-3 w-3" />}
                <span>{simulationActive ? 'Simulyatsiya Faol' : 'Simulyatsiya'}</span>
              </button>
            )}

            {/* Polling tugmasi */}
            {onTogglePolling && (
              <button
                type="button"
                onClick={onTogglePolling}
                className={`hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] transition-colors ${
                  isPollingActive
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400'
                    : 'border-white/[0.05] bg-white/[0.02] text-zinc-500'
                }`}
                title="Avto-yangilanishni boshqarish (30s)"
              >
                <RotateCw className={`h-3 w-3 ${isPollingActive ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <span>30s</span>
              </button>
            )}

            {/* API Kalit tugmasi */}
            {onOpenApiModal && (
              <button
                type="button"
                onClick={onOpenApiModal}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  isRealApiActive
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-semibold'
                    : 'border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.1]'
                }`}
                title="API-Football kalitini ulash yoki tekshirish"
              >
                <Key className="h-3 w-3 text-emerald-400" />
                <span className="hidden sm:inline">{isRealApiActive ? 'API Faol' : 'API Kalit'}</span>
              </button>
            )}

            {/* Jonli hisoblagich nishoni */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 ${liveCount > 0 ? 'animate-ping opacity-75' : 'opacity-20'}`} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tabular-nums">{liveCount}</span>
              <span className="hidden sm:inline text-[11px] font-normal text-emerald-300/80">Jonli</span>
            </div>
          </div>
        </div>

        {/* Pastki qator: Filtr tablari va Sana Tanlagich (Kecha, Bugun, Ertaga) */}
        <div className="flex items-center justify-between border-t border-white/[0.04] py-1.5 overflow-x-auto no-scrollbar gap-2">
          {/* Asosiy tablar */}
          <div className="flex items-center gap-1 bg-white/[0.025] p-0.5 rounded-lg border border-white/[0.03]">
            {/* Barchasi */}
            <button
              type="button"
              onClick={() => onFilterChange('ALL')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-white/10 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Trophy className="h-3 w-3" />
              <span>Barchasi</span>
            </button>

            {/* Jonli */}
            <button
              type="button"
              onClick={() => onFilterChange('LIVE')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                activeFilter === 'LIVE'
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold shadow-sm ring-1 ring-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Jonli</span>
              {liveCount > 0 && (
                <span className="text-[10px] font-bold text-emerald-400 tabular-nums">
                  {liveCount}
                </span>
              )}
            </button>

            {/* Tugagan (Finished) */}
            <button
              type="button"
              onClick={() => onFilterChange('FINISHED')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                activeFilter === 'FINISHED'
                  ? 'bg-white/10 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <CheckCircle2 className="h-3 w-3" />
              <span className="hidden sm:inline">Tugagan</span>
            </button>

            {/* Bo'lajak (Scheduled) */}
            <button
              type="button"
              onClick={() => onFilterChange('SCHEDULED')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                activeFilter === 'SCHEDULED'
                  ? 'bg-white/10 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar className="h-3 w-3" />
              <span className="hidden sm:inline">Bo'lajak</span>
            </button>

            {/* Sevimlilar */}
            <button
              type="button"
              onClick={() => onFilterChange('FAVORITES')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                activeFilter === 'FAVORITES'
                  ? 'bg-amber-400/20 text-amber-300 font-bold shadow-sm ring-1 ring-amber-400/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Star className="h-3 w-3" />
              <span>Sevimlilar</span>
              {favoritesCount > 0 && (
                <span className="text-[10px] font-bold text-amber-300 tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Tahliliy Yangiliklar */}
            <button
              type="button"
              onClick={() => onFilterChange('NEWS')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                activeFilter === 'NEWS'
                  ? 'bg-sky-500/20 text-sky-300 font-bold shadow-sm ring-1 ring-sky-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Newspaper className="h-3 w-3" />
              <span>Yangiliklar</span>
            </button>
          </div>

          {/* Sana Tanlagich (Kecha, Bugun, Ertaga) */}
          {onDateChange && (
            <div className="flex items-center gap-1 bg-white/[0.025] p-0.5 rounded-lg border border-white/[0.03] shrink-0">
              <button
                type="button"
                onClick={() => onDateChange(-1)}
                className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                  selectedDate === -1 ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Kecha
              </button>
              <button
                type="button"
                onClick={() => onDateChange(0)}
                className={`rounded px-2.5 py-1 text-[11px] font-bold transition-colors ${
                  selectedDate === 0 ? 'bg-emerald-500/20 text-emerald-400 font-extrabold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Bugun
              </button>
              <button
                type="button"
                onClick={() => onDateChange(1)}
                className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                  selectedDate === 1 ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Ertaga
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
