/**
 * UzScore — Live Text Commentary (Matnli Jonli Sharh)
 * SofaScore uslubidagi daqiqabay o'zbek tilidagi tahliliy sharh oqimi.
 */

import React, { useMemo } from 'react';
import type { Match } from '../types/football';
import { Radio } from 'lucide-react';

export interface CommentaryItem {
  id: string;
  minute: number;
  type: 'goal' | 'card' | 'sub' | 'attack' | 'whistle' | 'var';
  text: string;
  important?: boolean;
}

export interface LiveCommentaryProps {
  match: Match;
  className?: string;
}

function generateCommentary(match: Match): CommentaryItem[] {
  const items: CommentaryItem[] = [];
  const home = match.homeTeam.name;
  const away = match.awayTeam.name;

  // Boshlanish
  items.push({
    id: 'comm-start',
    minute: 1,
    type: 'whistle',
    text: `Bosh hakam ${match.referee || 'hakam'} hushtak chaldi. Uchrashuv boshlandi!`,
    important: true,
  });

  // O'yin ichidagi voqealar
  (match.events || []).forEach((ev, idx) => {
    const isHome = ev.team === 'home';
    const teamName = isHome ? home : away;

    if (ev.type === 'GOAL' || ev.type === 'PENALTY') {
      items.push({
        id: `comm-ev-${idx}`,
        minute: ev.minute,
        type: 'goal',
        text: `GOOOOL! ⚽ ${ev.player} (${teamName}) to‘pni darvoza to‘riga aniq joyladi! ${
          ev.assistPlayer ? `Uzatma muallifi: ${ev.assistPlayer}.` : ''
        }`,
        important: true,
      });
    } else if (ev.type === 'RED' || ev.type === 'RED_CARD') {
      items.push({
        id: `comm-ev-${idx}`,
        minute: ev.minute,
        type: 'card',
        text: `CHETLATISH! 🟥 ${ev.player} (${teamName}) qo'pol qoidabuzarlik uchun maydondan chetlatildi!`,
        important: true,
      });
    } else if (ev.type === 'YELLOW' || ev.type === 'YELLOW_CARD') {
      items.push({
        id: `comm-ev-${idx}`,
        minute: ev.minute,
        type: 'card',
        text: `OGOHLANTIRISH 🟨 ${ev.player} (${teamName}) hakam tomonidan sariq kartochka bilan jazolandi.`,
      });
    } else if (ev.type === 'SUB' || ev.type === 'SUBSTITUTION') {
      items.push({
        id: `comm-ev-${idx}`,
        minute: ev.minute,
        type: 'sub',
        text: `ALMASHTIRISH 🔄 ${teamName} tarkibida o'zgarish: ${ev.player} maydonga tushirildi.`,
      });
    }
  });

  // Qo'shimcha oraliq tahliliy epizodlar
  items.push(
    {
      id: 'comm-tac-1',
      minute: 15,
      type: 'attack',
      text: `${home} to'p nazoratini qo'lga olib, raqib jarima maydoni atrofida bosim o'tkazmoqda.`,
    },
    {
      id: 'comm-tac-2',
      minute: 33,
      type: 'attack',
      text: `${away} xavfli qarshi hujumga o'tdi, ammo darvozabon to'pni ishonchli ushlab oldi.`,
    },
    {
      id: 'comm-ht',
      minute: 45,
      type: 'whistle',
      text: `Birinchi bo'lim yakunlandi. Jamoalar tanaffusga yo'l olishdi. (Hisob: ${match.htScore ? `${match.htScore.home} - ${match.htScore.away}` : '0 - 0'})`,
      important: true,
    },
    {
      id: 'comm-tac-3',
      minute: 70,
      type: 'attack',
      text: `Maydonda shiddatli kurash davom etmoqda. Ikkala murabbiy ham taktik ko'rsatmalar bermoqda.`,
    }
  );

  // Daqiqalar bo'yicha teskari tartiblash (eng oxirgisi tepada)
  return items.sort((a, b) => b.minute - a.minute);
}

export const LiveCommentary: React.FC<LiveCommentaryProps> = ({ match, className = '' }) => {
  const commentaryList = useMemo(() => generateCommentary(match), [match]);

  return (
    <div className={`rounded-xl bg-[#080c14] border border-white/[0.05] p-3.5 space-y-3 ${className}`}>
      {/* Sarlavha */}
      <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white tracking-tight">Matnli Jonli Sharh</h4>
            <p className="text-[10px] text-zinc-400">Uchrashuvning daqiqabay o'zbekcha sharhi</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          JONLI STREAM
        </span>
      </div>

      {/* Sharhlar ro'yxati */}
      <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
        {commentaryList.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 rounded-lg p-2.5 text-xs transition-colors ${
              item.important
                ? 'bg-emerald-500/10 border border-emerald-500/25'
                : 'bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04]'
            }`}
          >
            <span
              className={`shrink-0 flex items-center justify-center h-6 w-6 rounded-full font-mono font-bold text-[10px] ${
                item.important
                  ? 'bg-emerald-500 text-black shadow-sm'
                  : 'bg-[#121722] text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {item.minute}'
            </span>
            <p className={`flex-1 text-[11.5px] leading-relaxed ${item.important ? 'text-white font-semibold' : 'text-zinc-300'}`}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
