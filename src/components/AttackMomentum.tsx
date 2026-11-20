/**
 * UzScore — SofaScore Attack Momentum (Hujum Bosimi Grafigi)
 * Dunyoning eng mashhur futbol tahliliy komponenti:
 * O'yinning har bir daqiqasidagi hujum intensivligini va dominatsiyasini
 * ikki tomonlama dinamik bar grafikda ko'rsatadi.
 */

import React, { useState, useMemo } from 'react';
import type { Match, MatchEvent } from '../types/football';
import { Flame } from 'lucide-react';

export interface AttackMomentumProps {
  match: Match;
  className?: string;
}

export interface MinuteMomentum {
  minute: number;
  value: number; // -100 (mehmon kuchli) dan +100 (mezbon kuchli) gacha
  homePressure: number; // 0..100
  awayPressure: number; // 0..100
  events: MatchEvent[];
}

/**
 * Match ma'lumotlari, voqealari va xG statistikasiga asoslanib
 * realistik vaqt o'qi bo'yicha bosim grafigini generatsiya qiladi.
 */
function generateMomentumData(match: Match): MinuteMomentum[] {
  const maxMinute = Math.max(match.minute || 0, match.status === 'SCHEDULED' ? 0 : 90);
  const data: MinuteMomentum[] = [];

  // Match voqealarini daqiqalar bo'yicha xaritalash
  const eventMap = new Map<number, MatchEvent[]>();
  (match.events || []).forEach((ev) => {
    const min = Math.min(Math.max(ev.minute, 1), 95);
    const existing = eventMap.get(min) || [];
    existing.push(ev);
    eventMap.set(min, existing);
  });

  // Jamoalarning statistik kuchi (xG va to'p nazorati ta'siri)
  const homePoss = match.stats?.ballPossession?.home ?? match.stats?.possession?.home ?? 52;
  const baseBias = (homePoss - 50) * 0.8; // Mezbon ustunligi siljishi

  let currentMomentum = baseBias;

  for (let min = 1; min <= Math.max(maxMinute, 90); min++) {
    // Agar o'yin LIVE bo'lsa va bu daqiqa hali o'tmagan bo'lsa, 0 qiymat
    if (match.status === 'LIVE' && min > match.minute) {
      data.push({
        minute: min,
        value: 0,
        homePressure: 0,
        awayPressure: 0,
        events: [],
      });
      continue;
    }

    if (match.status === 'SCHEDULED') {
      data.push({
        minute: min,
        value: 0,
        homePressure: 0,
        awayPressure: 0,
        events: [],
      });
      continue;
    }

    // Tabiiy to'lqinsimon o'zgarish (Random walk + sinus to'lqin)
    const wave = Math.sin(min / 3.5) * 20;
    const noise = (Math.sin(min * 17.3 + (match.id ? String(match.id).charCodeAt(0) : 1)) * 35);
    currentMomentum = currentMomentum * 0.65 + (wave + noise + baseBias) * 0.35;

    // Voqealarga ko'ra keskin portlashlar (Spikes)
    const events = eventMap.get(min) || [];
    let eventBoost = 0;
    events.forEach((ev) => {
      const isHome = ev.team === 'home';
      if (ev.type === 'GOAL' || ev.type === 'PENALTY') {
        eventBoost += isHome ? 85 : -85;
      } else if (ev.type === 'RED' || ev.type === 'RED_CARD') {
        eventBoost += isHome ? -60 : 60; // Qizil olgan tomon bosimni yo'qotadi
      } else if (ev.type === 'YELLOW' || ev.type === 'YELLOW_CARD') {
        eventBoost += isHome ? -15 : 15;
      }
    });

    let finalValue = Math.round(currentMomentum + eventBoost);
    finalValue = Math.max(-95, Math.min(95, finalValue));

    const homePressure = finalValue > 0 ? finalValue : 0;
    const awayPressure = finalValue < 0 ? Math.abs(finalValue) : 0;

    data.push({
      minute: min,
      value: finalValue,
      homePressure,
      awayPressure,
      events,
    });
  }

  return data;
}

export const AttackMomentum: React.FC<AttackMomentumProps> = ({ match, className = '' }) => {
  const [hoveredPoint, setHoveredPoint] = useState<MinuteMomentum | null>(null);

  const momentumData = useMemo(() => generateMomentumData(match), [match]);

  // Umumiy dominatsiya foizini hisoblash
  const stats = useMemo(() => {
    let homeTotal = 0;
    let awayTotal = 0;
    let validCount = 0;

    momentumData.forEach((d) => {
      if (d.value !== 0 || match.status !== 'LIVE' || d.minute <= match.minute) {
        homeTotal += d.homePressure;
        awayTotal += d.awayPressure;
        validCount++;
      }
    });

    const sum = homeTotal + awayTotal || 1;
    const homePct = Math.round((homeTotal / sum) * 100);
    const awayPct = 100 - homePct;

    return { homePct, awayPct, validCount };
  }, [momentumData, match.status, match.minute]);

  const isLive = match.status === 'LIVE';

  return (
    <div className={`rounded-xl bg-[#090d15] border border-white/[0.05] p-3.5 space-y-3 ${className}`}>
      {/* Sarlavha va Umumiy Bosim Ko'rsatkichi */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white tracking-tight">Hujum Bosimi (Attack Momentum)</h4>
            <p className="text-[10px] text-zinc-400">SofaScore uslubidagi daqiqabay bosim dinamikasi</p>
          </div>
        </div>

        {/* Dominatsiya Balansi */}
        <div className="flex items-center gap-2 text-[11px] font-bold tabular-nums">
          <span className="text-emerald-400">{match.homeTeam.shortName || match.homeTeam.name.slice(0, 3).toUpperCase()} {stats.homePct}%</span>
          <span className="text-zinc-600">:</span>
          <span className="text-sky-400">{stats.awayPct}% {match.awayTeam.shortName || match.awayTeam.name.slice(0, 3).toUpperCase()}</span>
        </div>
      </div>

      {/* Dominatsiya Split Bari */}
      <div className="h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden flex">
        <div
          style={{ width: `${stats.homePct}%` }}
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
        />
        <div
          style={{ width: `${stats.awayPct}%` }}
          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500"
        />
      </div>

      {/* Asosiy Grafig Qismi (0-90 daqiqa bar-chart) */}
      <div className="relative pt-2 pb-1">
        {/* Yuqori/Pastki chegaralar va Jamoa nomlari yorliqlari */}
        <div className="flex justify-between text-[9px] font-medium text-zinc-500 px-1 mb-1">
          <span className="text-emerald-400/80 flex items-center gap-1">
            ▲ {match.homeTeam.name}
          </span>
          <span className="text-sky-400/80 flex items-center gap-1">
            ▼ {match.awayTeam.name}
          </span>
        </div>

        {/* Grafig Container */}
        <div className="relative h-28 w-full bg-[#06080e]/90 rounded-lg border border-white/[0.03] overflow-hidden flex items-center px-1">
          {/* Neytral o'q (Midline) */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.12] z-10" />

          {/* Davrlar bo'yicha chiziqlar (15', 30', HT 45', 60', 75') */}
          {[15, 30, 45, 60, 75].map((period) => (
            <div
              key={period}
              style={{ left: `${(period / 90) * 100}%` }}
              className={`absolute top-0 bottom-0 w-[1px] pointer-events-none z-10 ${
                period === 45 ? 'bg-amber-400/30 border-dashed' : 'bg-white/[0.04]'
              }`}
            />
          ))}

          {/* Jonli daqiqa ko'rsatkichi (Live Cursor) */}
          {isLive && match.minute > 0 && match.minute <= 90 && (
            <div
              style={{ left: `${(match.minute / 90) * 100}%` }}
              className="absolute top-0 bottom-0 w-[2px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] z-20 pointer-events-none animate-pulse"
            >
              <div className="absolute -top-1 -left-[3px] h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          )}

          {/* Daqiqabay Bar ustunlari */}
          <div className="relative w-full h-full flex items-center justify-between z-10">
            {momentumData.slice(0, 90).map((pt) => {
              const isPastOrLive = !isLive || pt.minute <= match.minute;
              const hasEvents = pt.events && pt.events.length > 0;
              const isHome = pt.value >= 0;
              const barHeightPct = Math.max(isPastOrLive ? Math.abs(pt.value) * 0.48 : 0, 2);

              return (
                <div
                  key={pt.minute}
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="group relative flex-1 h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  {/* Voqea belgisi (Goal ⚽, Kartochka) */}
                  {hasEvents && isPastOrLive && (
                    <div
                      className={`absolute z-30 transition-transform group-hover:scale-125 ${
                        isHome ? 'top-1' : 'bottom-1'
                      }`}
                    >
                      {pt.events.some((e) => e.type === 'GOAL' || e.type === 'PENALTY') ? (
                        <span className="text-[10px] drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]">⚽</span>
                      ) : pt.events.some((e) => e.type === 'RED' || e.type === 'RED_CARD') ? (
                        <span className="inline-block w-1.5 h-2 bg-rose-500 rounded-[1px] shadow-sm" />
                      ) : (
                        <span className="inline-block w-1.5 h-2 bg-amber-400 rounded-[1px] shadow-sm" />
                      )}
                    </div>
                  )}

                  {/* Yuqori Bar (Mezbon) */}
                  <div className="w-full flex-1 flex flex-col justify-end items-center pb-[0.5px]">
                    {isHome && isPastOrLive && (
                      <div
                        style={{ height: `${barHeightPct}%` }}
                        className={`w-[80%] max-w-[5px] rounded-t-[1px] transition-all duration-200 ${
                          pt.value > 65
                            ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]'
                            : pt.value > 30
                            ? 'bg-emerald-500/80'
                            : 'bg-emerald-600/50'
                        }`}
                      />
                    )}
                  </div>

                  {/* Pastki Bar (Mehmon) */}
                  <div className="w-full flex-1 flex flex-col justify-start items-center pt-[0.5px]">
                    {!isHome && isPastOrLive && (
                      <div
                        style={{ height: `${barHeightPct}%` }}
                        className={`w-[80%] max-w-[5px] rounded-b-[1px] transition-all duration-200 ${
                          Math.abs(pt.value) > 65
                            ? 'bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.5)]'
                            : Math.abs(pt.value) > 30
                            ? 'bg-sky-500/80'
                            : 'bg-sky-600/50'
                        }`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vaqt yorliqlari (Timeline labels) */}
        <div className="relative flex justify-between text-[9px] font-mono text-zinc-500 px-1 mt-1">
          <span>0'</span>
          <span>15'</span>
          <span>30'</span>
          <span className="text-amber-400/90 font-semibold">HT 45'</span>
          <span>60'</span>
          <span>75'</span>
          <span>90'</span>
        </div>
      </div>

      {/* Hover Info Tooltip (SofaScore Tooltip) */}
      {hoveredPoint && (
        <div className="flex items-center justify-between rounded-lg bg-[#0e1320] border border-white/[0.08] px-3 py-1.5 text-xs text-white animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-400 tabular-nums">{hoveredPoint.minute}' daqiqa:</span>
            {hoveredPoint.value > 0 ? (
              <span className="text-zinc-200">
                <span className="font-semibold text-emerald-400">{match.homeTeam.name}</span> bosimi ({hoveredPoint.homePressure}%)
              </span>
            ) : hoveredPoint.value < 0 ? (
              <span className="text-zinc-200">
                <span className="font-semibold text-sky-400">{match.awayTeam.name}</span> bosimi ({hoveredPoint.awayPressure}%)
              </span>
            ) : (
              <span className="text-zinc-400">Teng kurash</span>
            )}
          </div>

          {hoveredPoint.events.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-300">
              {hoveredPoint.events.map((e, idx) => (
                <span key={idx} className="flex items-center gap-1 bg-white/[0.06] px-1.5 py-0.5 rounded">
                  {e.type === 'GOAL' ? '⚽ Gol:' : e.type === 'YELLOW' ? '🟨 Ogohlantirish:' : '🟥 Chetlatish:'}{' '}
                  {e.player}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
