/**
 * UzScore — SofaScore Shot Map (Zarbalar Xaritasi)
 * Professional darajadagi 2D maydondagi zarbalar vizualizatsiyasi.
 * Har bir zarba o'zining xG hajmi, koordinatasi, natijasi (Gol, Aniq, Noto'g'ri, To'silgan)
 * va zarba bergan futbolchisi bilan interaktiv ko'rsatiladi.
 */

import React, { useState, useMemo } from 'react';
import type { Match } from '../types/football';
import { Target, Info } from 'lucide-react';

export type ShotOutcome = 'goal' | 'saved' | 'missed' | 'blocked';

export interface ShotData {
  id: string;
  minute: number;
  player: string;
  team: 'home' | 'away';
  x: number; // 0..100 (maydon eni bo'yicha)
  y: number; // 0..100 (jarima maydonchasi chuqurligi)
  xG: number; // 0.02 .. 0.85
  outcome: ShotOutcome;
  detail: string;
}

export interface ShotMapProps {
  match: Match;
  className?: string;
}

/**
 * Match statistikasi va voqealaridan kelib chiqib realistik zarbalar koordinatasini hosil qiladi
 */
function generateShots(match: Match): ShotData[] {
  const shots: ShotData[] = [];
  const homeName = match.homeTeam.name;
  const awayName = match.awayTeam.name;

  // 1. Gollar
  (match.events || []).forEach((ev, idx) => {
    if (ev.type === 'GOAL' || ev.type === 'PENALTY') {
      const isHome = ev.team === 'home';
      shots.push({
        id: `shot-goal-${idx}`,
        minute: ev.minute,
        player: ev.player,
        team: ev.team,
        x: isHome ? 46 + (idx % 3) * 4 : 52 - (idx % 3) * 4,
        y: ev.type === 'PENALTY' ? 22 : 12 + (idx * 5) % 15,
        xG: ev.type === 'PENALTY' ? 0.79 : 0.42 + (idx * 0.08),
        outcome: 'goal',
        detail: ev.type === 'PENALTY' ? 'Penalti goli' : 'Darvozaning burchagiga aniq zarba',
      });
    }
  });

  // 2. Aniq va to'silgan zarbalar
  const homeTotal = match.stats?.totalShots?.home ?? 12;
  const awayTotal = match.stats?.totalShots?.away ?? 8;
  const homeTarget = match.stats?.shotsOnTarget?.home ?? 5;
  const awayTarget = match.stats?.shotsOnTarget?.away ?? 3;

  // Mezbon zarbalari
  for (let i = 0; i < homeTotal; i++) {
    const isGoal = i < (match.score?.home ?? 1);
    if (isGoal) continue; // Gollar allaqachon qo'shilgan
    const isSaved = i < homeTarget;
    const isBlocked = i % 3 === 0;

    shots.push({
      id: `shot-home-${i}`,
      minute: Math.min(88, 7 + i * 7),
      player: i % 2 === 0 ? homeName + ' hujumchisi' : homeName + ' yarim himoyachisi',
      team: 'home',
      x: 35 + (i * 7) % 32,
      y: 14 + (i * 6) % 24,
      xG: parseFloat((0.04 + (i * 0.035)).toFixed(2)),
      outcome: isSaved ? 'saved' : isBlocked ? 'blocked' : 'missed',
      detail: isSaved
        ? 'Darvozabon seyvi'
        : isBlocked
        ? 'Himoyachi zarbani to‘sdi'
        : 'Darvoza to‘sini yonidan o‘tdi',
    });
  }

  // Mehmon zarbalari
  for (let j = 0; j < awayTotal; j++) {
    const isGoal = j < (match.score?.away ?? 0);
    if (isGoal) continue;
    const isSaved = j < awayTarget;
    const isBlocked = j % 3 === 1;

    shots.push({
      id: `shot-away-${j}`,
      minute: Math.min(89, 12 + j * 9),
      player: j % 2 === 0 ? awayName + ' forvardi' : awayName + ' xavbeki',
      team: 'away',
      x: 38 + (j * 8) % 30,
      y: 16 + (j * 7) % 22,
      xG: parseFloat((0.03 + (j * 0.04)).toFixed(2)),
      outcome: isSaved ? 'saved' : isBlocked ? 'blocked' : 'missed',
      detail: isSaved
        ? 'Darvozabon osonlikcha ushlab oldi'
        : isBlocked
        ? 'Zarba to‘sildi'
        : 'Darvozadan ancha uzoq ketdi',
    });
  }

  return shots;
}

export const ShotMap: React.FC<ShotMapProps> = ({ match, className = '' }) => {
  const [selectedShot, setSelectedShot] = useState<ShotData | null>(null);
  const [filterTeam, setFilterTeam] = useState<'all' | 'home' | 'away'>('all');

  const shots = useMemo(() => generateShots(match), [match]);

  const filteredShots = useMemo(() => {
    if (filterTeam === 'all') return shots;
    return shots.filter((s) => s.team === filterTeam);
  }, [shots, filterTeam]);

  // Statistika sarhisobi
  const summary = useMemo(() => {
    let goals = 0;
    let saved = 0;
    let missed = 0;
    let blocked = 0;
    let totalXG = 0;

    filteredShots.forEach((s) => {
      totalXG += s.xG;
      if (s.outcome === 'goal') goals++;
      else if (s.outcome === 'saved') saved++;
      else if (s.outcome === 'missed') missed++;
      else if (s.outcome === 'blocked') blocked++;
    });

    return {
      goals,
      saved,
      missed,
      blocked,
      totalXG: totalXG.toFixed(2),
      count: filteredShots.length,
    };
  }, [filteredShots]);

  const getOutcomeColor = (outcome: ShotOutcome) => {
    switch (outcome) {
      case 'goal':
        return 'bg-emerald-400 border-white text-black shadow-[0_0_10px_rgba(52,211,153,0.8)]';
      case 'saved':
        return 'bg-sky-400 border-sky-200 text-black shadow-[0_0_8px_rgba(56,189,248,0.6)]';
      case 'blocked':
        return 'bg-amber-400 border-amber-200 text-black';
      case 'missed':
      default:
        return 'bg-zinc-500/80 border-zinc-400 text-white';
    }
  };

  return (
    <div className={`rounded-xl bg-[#090d15] border border-white/[0.05] p-3.5 space-y-3 ${className}`}>
      {/* Sarlavha va Filtrlash */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Target className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white tracking-tight">Zarbalar Xaritasi (Shot Map)</h4>
            <p className="text-[10px] text-zinc-400">xG ehtimolligi va darvoza oldidagi zarbalar</p>
          </div>
        </div>

        {/* Jamoa filtrlari */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-0.5 rounded-lg border border-white/[0.04]">
          <button
            type="button"
            onClick={() => setFilterTeam('all')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
              filterTeam === 'all' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Barchasi
          </button>
          <button
            type="button"
            onClick={() => setFilterTeam('home')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
              filterTeam === 'home' ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {match.homeTeam.shortName || match.homeTeam.name.slice(0, 3)}
          </button>
          <button
            type="button"
            onClick={() => setFilterTeam('away')}
            className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
              filterTeam === 'away' ? 'bg-sky-500/20 text-sky-400' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {match.awayTeam.shortName || match.awayTeam.name.slice(0, 3)}
          </button>
        </div>
      </div>

      {/* Sarhisob ko'rsatkichlari */}
      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
        <div className="rounded-lg bg-white/[0.02] p-2 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Jami xG</span>
          <span className="text-emerald-400 font-bold tabular-nums text-sm">{summary.totalXG}</span>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-2 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Gollar</span>
          <span className="text-white font-bold tabular-nums text-sm">{summary.goals}</span>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-2 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">Aniq (Saved)</span>
          <span className="text-sky-400 font-bold tabular-nums text-sm">{summary.saved}</span>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-2 border border-white/[0.03]">
          <span className="text-[9px] text-zinc-500 block">To'silgan</span>
          <span className="text-amber-400 font-bold tabular-nums text-sm">{summary.blocked}</span>
        </div>
      </div>

      {/* 2D Futbol Jarima Maydonchasi (Pitch Goal Area) */}
      <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#12381f] border border-emerald-800/40">
        {/* Maysazor chiziqlari */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#12381f,#12381f_20px,#144023_20px,#144023_40px)] opacity-95" />

        {/* Maydon chiziqlari (Goal Box, Penalty Area, Arc) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Darvoza chizig'i (yuqorida) */}
          <line x1="0" y1="2" x2="100" y2="2" stroke="#ffffff" strokeWidth="1" />
          {/* Darvoza to'ri */}
          <rect x="36" y="0" width="28" height="2" fill="#ffffff" opacity="0.6" />
          {/* 6 metrli darvozabon maydonchasi */}
          <rect x="32" y="2" width="36" height="12" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          {/* Jarima maydonchasi (16m box) */}
          <rect x="18" y="2" width="64" height="36" fill="none" stroke="#ffffff" strokeWidth="0.8" />
          {/* Penalti nuqtasi */}
          <circle cx="50" cy="22" r="1.2" fill="#ffffff" />
          {/* Jarima maydonchasi yarim yoyi */}
          <path d="M 38 38 A 12 12 0 0 0 62 38" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1,1" />
        </svg>

        {/* Zarbalar nuqtalari */}
        <div className="relative w-full h-full">
          {filteredShots.map((shot) => {
            const size = Math.max(12, Math.min(26, shot.xG * 32));
            const isSelected = selectedShot?.id === shot.id;

            return (
              <div
                key={shot.id}
                onClick={() => setSelectedShot(shot)}
                style={{
                  left: `${shot.x}%`,
                  top: `${shot.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute cursor-pointer rounded-full border flex items-center justify-center transition-transform hover:scale-135 z-20 ${getOutcomeColor(
                  shot.outcome
                )} ${isSelected ? 'ring-2 ring-white scale-125' : ''}`}
                title={`${shot.player} (${shot.minute}') — ${shot.xG} xG`}
              >
                {shot.outcome === 'goal' ? (
                  <span className="text-[10px]">⚽</span>
                ) : (
                  <span className="text-[8px] font-black">{shot.xG.toFixed(2).replace('0.', '.')}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tanlangan zarba info kartochkasi */}
      {selectedShot ? (
        <div className="flex items-center justify-between rounded-lg bg-[#0e1320] border border-white/[0.08] p-2.5 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${selectedShot.outcome === 'goal' ? 'bg-emerald-400' : 'bg-sky-400'}`} />
            <div>
              <span className="font-bold text-white">{selectedShot.player}</span>
              <span className="text-zinc-400 text-[11px] ml-1.5">({selectedShot.minute}')</span>
              <p className="text-[10px] text-zinc-400">{selectedShot.detail}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 font-extrabold text-xs tabular-nums">{selectedShot.xG} xG</span>
            <span className="text-[9px] text-zinc-500 uppercase block">{selectedShot.outcome}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-[10.5px] text-zinc-400 px-1">
          <Info className="w-3.5 h-3.5 text-zinc-500" />
          <span>Har bir doira ustiga bosib, o‘sha zarbaning xG ehtimoli va muallifini ko‘rishingiz mumkin.</span>
        </div>
      )}

      {/* Izoh (Legend) */}
      <div className="flex items-center justify-between border-t border-white/[0.03] pt-2 text-[10px] text-zinc-400 px-1">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" /> ⚽ Gol
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-sky-400" /> Darvozabon seyvi
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> To'silgan
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-zinc-500" /> Noaniq zarba
        </span>
      </div>
    </div>
  );
};
