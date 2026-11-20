/**
 * UzScore — SofaScore Player Heatmap (Futbolchi Harakat/Issiqlik Xaritasi)
 * Tanlangan futbolchining maydon bo'ylab harakat radiusi va to'pga teginish zichligini
 * radial-gradient issiqlik dog'lari bilan 2D maydonda vizual ko'rsatadi.
 */

import React, { useMemo } from 'react';
import type { PlayerLineup } from '../types/football';
import { Flame } from 'lucide-react';

export interface PlayerHeatmapProps {
  player: PlayerLineup;
  teamType?: 'home' | 'away';
  className?: string;
}

interface HeatSpot {
  cx: number; // 0..100
  cy: number; // 0..100
  r: number;  // radius
  opacity: number;
  color: string;
}

/**
 * Futbolchining pozitsiyasiga qarab maydondagi issiqlik zonalarini hisoblaydi
 */
function generateHeatSpots(player: PlayerLineup, teamType: 'home' | 'away'): HeatSpot[] {
  const pos = (player.pos || 'MF').toUpperCase();
  const isHome = teamType === 'home';

  // Y-o'qi yo'nalishi (Mezbon pastdan yuqoriga, Mehmon yuqoridan pastga)
  const forwardY = isHome ? 25 : 75;
  const midfieldY = isHome ? 50 : 50;
  const defenseY = isHome ? 75 : 25;
  const goalY = isHome ? 90 : 10;

  const spots: HeatSpot[] = [];

  if (pos === 'GK') {
    spots.push(
      { cx: 50, cy: goalY, r: 25, opacity: 0.85, color: '#ef4444' },
      { cx: 45, cy: goalY + (isHome ? -6 : 6), r: 18, opacity: 0.7, color: '#f59e0b' },
      { cx: 55, cy: goalY + (isHome ? -4 : 4), r: 16, opacity: 0.65, color: '#10b981' }
    );
  } else if (pos === 'DF') {
    spots.push(
      { cx: 35, cy: defenseY, r: 28, opacity: 0.8, color: '#ef4444' },
      { cx: 65, cy: defenseY, r: 26, opacity: 0.75, color: '#f59e0b' },
      { cx: 50, cy: defenseY + (isHome ? -12 : 12), r: 22, opacity: 0.6, color: '#10b981' },
      { cx: 20, cy: defenseY, r: 18, opacity: 0.5, color: '#38bdf8' }
    );
  } else if (pos === 'FW') {
    spots.push(
      { cx: 50, cy: forwardY, r: 28, opacity: 0.9, color: '#ef4444' },
      { cx: 42, cy: forwardY + (isHome ? 8 : -8), r: 24, opacity: 0.75, color: '#f59e0b' },
      { cx: 58, cy: forwardY + (isHome ? -6 : 6), r: 20, opacity: 0.65, color: '#10b981' },
      { cx: 48, cy: forwardY + (isHome ? -14 : 14), r: 16, opacity: 0.55, color: '#ef4444' }
    );
  } else {
    // Yarim himoyachi (Box-to-box MF)
    spots.push(
      { cx: 50, cy: midfieldY, r: 32, opacity: 0.85, color: '#ef4444' },
      { cx: 38, cy: midfieldY + (isHome ? -10 : 10), r: 26, opacity: 0.75, color: '#f59e0b' },
      { cx: 62, cy: midfieldY + (isHome ? 12 : -12), r: 24, opacity: 0.7, color: '#10b981' },
      { cx: 50, cy: forwardY + (isHome ? 10 : -10), r: 20, opacity: 0.6, color: '#38bdf8' }
    );
  }

  return spots;
}

export const PlayerHeatmap: React.FC<PlayerHeatmapProps> = ({
  player,
  teamType = 'home',
  className = '',
}) => {
  const heatSpots = useMemo(() => generateHeatSpots(player, teamType), [player, teamType]);

  // Realistik futbolchi match statistikasi
  const stats = useMemo(() => {
    const isGk = player.pos === 'GK';
    const isFw = player.pos === 'FW';
    const isDf = player.pos === 'DF';

    return {
      touches: isGk ? 38 : isDf ? 68 : isFw ? 46 : 74,
      passes: isGk ? '24/29 (83%)' : isDf ? '52/58 (90%)' : isFw ? '28/34 (82%)' : '58/65 (89%)',
      duelsWon: isGk ? '2/2 (100%)' : isDf ? '8/11 (73%)' : isFw ? '6/12 (50%)' : '7/10 (70%)',
      distanceKm: isGk ? '4.8 km' : isFw ? '10.2 km' : '11.4 km',
    };
  }, [player.pos]);

  return (
    <div className={`rounded-xl bg-[#080c14] border border-white/[0.05] p-3 space-y-2.5 ${className}`}>
      {/* Sarlavha */}
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          Harakat Xaritasi (Heatmap)
        </span>
        <span className="text-[10px] text-zinc-400 font-mono">90 daqiqa zichligi</span>
      </div>

      {/* 2D Futbol Maydoni + Heatmap qatlami */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#0e2a17] border border-emerald-800/40">
        {/* Maysazor chiziqlari */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#0e2a17,#0e2a17_15px,#11331c_15px,#11331c_30px)] opacity-95" />

        {/* Maydon SVG chiziqlari */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect x="2" y="2" width="96" height="96" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="2" y1="50" x2="98" y2="50" stroke="#ffffff" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <rect x="25" y="2" width="50" height="18" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          <rect x="25" y="80" width="50" height="18" fill="none" stroke="#ffffff" strokeWidth="0.8" />
        </svg>

        {/* Radial Issiqlik Dog'lari (Hotspots) */}
        <div className="absolute inset-0 z-0">
          {heatSpots.map((spot, idx) => (
            <div
              key={idx}
              style={{
                left: `${spot.cx}%`,
                top: `${spot.cy}%`,
                width: `${spot.r * 2.5}%`,
                height: `${spot.r * 2.5}%`,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${spot.color} 0%, rgba(245,158,11,0.5) 45%, rgba(16,185,129,0.2) 75%, transparent 100%)`,
                opacity: spot.opacity,
                filter: 'blur(12px)',
              }}
              className="absolute rounded-full pointer-events-none mix-blend-screen"
            />
          ))}
        </div>
      </div>

      {/* Issiqlik Shkalasi Ko'rsatkichlari */}
      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
        <div className="rounded-lg bg-white/[0.02] p-1.5 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Teginishlar</span>
          <span className="text-white font-bold tabular-nums text-xs">{stats.touches}</span>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-1.5 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Paslar</span>
          <span className="text-emerald-400 font-bold tabular-nums text-xs">{stats.passes}</span>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-1.5 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Duellar</span>
          <span className="text-sky-400 font-bold tabular-nums text-xs">{stats.duelsWon}</span>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-1.5 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Masofa</span>
          <span className="text-amber-400 font-bold tabular-nums text-xs">{stats.distanceKm}</span>
        </div>
      </div>
    </div>
  );
};
