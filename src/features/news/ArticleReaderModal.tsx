/**
 * UzScore — ArticleReaderModal
 * To'liq maqola o'qish modali: tahliliy matn, Win Probability skalasi,
 * bog'liq o'yin kartochkasi va asosiy statistika.
 */

import React, { useEffect, useRef } from 'react';
import {
  X,
  Clock,
  User,
  Tag,
  TrendingUp,
  Zap,
  BarChart2,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import type { NewsArticle } from './newsData';

// ─────────────────────────────────────────────
// Win Probability Vizual Skalasi
// ─────────────────────────────────────────────
const WinProbabilityBar: React.FC<{
  home: number;
  draw: number;
  away: number;
  homeTeamName: string;
  awayTeamName: string;
  accentColor: string;
}> = ({ home, draw, away, homeTeamName, awayTeamName, accentColor }) => {
  return (
    <div className="rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-4 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
        <span className="text-xs font-bold text-white uppercase tracking-widest">
          G'alaba Ehtimoli
        </span>
      </div>

      {/* Ustunlar (3 ta) */}
      <div className="flex gap-2 items-end h-20">
        {/* Mezbon */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-sm font-black" style={{ color: accentColor }}>
            {home}%
          </span>
          <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: `${(home / 100) * 64}px`, minHeight: 16 }}>
            <div className="absolute inset-0 rounded-t-lg" style={{ background: accentColor, opacity: 0.85 }} />
            <div className="absolute inset-0 rounded-t-lg animate-pulse" style={{ background: accentColor, opacity: 0.15 }} />
          </div>
        </div>

        {/* Durang */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-sm font-black text-gray-400">{draw}%</span>
          <div
            className="w-full rounded-t-lg bg-gray-600/50"
            style={{ height: `${(draw / 100) * 64}px`, minHeight: 12 }}
          />
        </div>

        {/* Mehmon */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-sm font-black text-gray-500">{away}%</span>
          <div
            className="w-full rounded-t-lg bg-gray-700/40"
            style={{ height: `${(away / 100) * 64}px`, minHeight: 10 }}
          />
        </div>
      </div>

      {/* Yorliqlar */}
      <div className="flex gap-2 text-[10px] text-gray-500 font-semibold">
        <div className="flex-1 text-center truncate">{homeTeamName}</div>
        <div className="flex-1 text-center">Durang</div>
        <div className="flex-1 text-center truncate">{awayTeamName}</div>
      </div>

      {/* Chiziqli shkala */}
      <div className="flex rounded-full overflow-hidden h-2 gap-px mt-1">
        <div
          className="rounded-l-full transition-all duration-700"
          style={{ width: `${home}%`, background: accentColor }}
        />
        <div
          className="transition-all duration-700 bg-gray-500/60"
          style={{ width: `${draw}%` }}
        />
        <div
          className="rounded-r-full transition-all duration-700 bg-gray-700/50"
          style={{ width: `${away}%` }}
        />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Bog'liq O'yin Kartochkasi
// ─────────────────────────────────────────────
const RelatedMatchCard: React.FC<{
  match: NewsArticle['relatedMatch'];
  accentColor: string;
}> = ({ match, accentColor }) => {
  if (!match) return null;

  const statusColors: Record<string, string> = {
    LIVE: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    FT: 'text-gray-400 bg-gray-600/15 border-gray-600/30',
    SCHEDULED: 'text-blue-300 bg-blue-600/15 border-blue-500/30',
  };

  const statusLabels: Record<string, string> = {
    LIVE: '● JONLI',
    FT: 'TUGADI',
    SCHEDULED: 'REJALASHTIRILGAN',
  };

  return (
    <div className="rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" style={{ color: accentColor }} />
        <span className="text-xs font-bold text-white uppercase tracking-widest">
          Bog'liq O'yin
        </span>
      </div>

      <div className="rounded-xl border border-[#1f293d] bg-[#131722] p-3 space-y-2">
        {/* Turnir nomi */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">
            {match.tournament}
          </span>
          <span
            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${statusColors[match.status] || statusColors.SCHEDULED}`}
          >
            {statusLabels[match.status] || match.status}
          </span>
        </div>

        {/* O'yin: jamoalar va hisoblar */}
        <div className="flex items-center gap-3">
          {/* Mezbon */}
          <div className="flex-1 flex flex-col items-start gap-0.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: accentColor + '25', color: accentColor, border: `1px solid ${accentColor}40` }}
            >
              {match.homeTeam.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-xs text-white font-semibold leading-tight">{match.homeTeam}</span>
          </div>

          {/* Hisoblar */}
          <div className="flex flex-col items-center">
            {match.status === 'FT' || match.status === 'LIVE' ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white tabular-nums">{match.homeScore ?? 0}</span>
                <span className="text-sm text-gray-600 font-bold">:</span>
                <span className="text-xl font-black text-white tabular-nums">{match.awayScore ?? 0}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-gray-400">{match.date}</span>
            )}
            {match.minute && match.status === 'LIVE' && (
              <span className="text-[9px] text-emerald-400 font-bold">{match.minute}'</span>
            )}
          </div>

          {/* Mehmon */}
          <div className="flex-1 flex flex-col items-end gap-0.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black bg-gray-700/50 text-gray-300 border border-gray-700/50"
            >
              {match.awayTeam.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-xs text-white font-semibold leading-tight text-right">{match.awayTeam}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Maqola Matni Rendereri (markdown-style)
// ─────────────────────────────────────────────
const ArticleContent: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        // **Bold sarlavha**
        if (line.startsWith('**') && line.endsWith('**')) {
          const text = line.slice(2, -2);
          return (
            <h3 key={i} className="text-white font-bold text-base mt-4 first:mt-0 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full inline-block flex-shrink-0" style={{ background: '#10b981' }} />
              {text}
            </h3>
          );
        }

        // - ro'yxat elementi
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start gap-2 ml-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
              <p className="text-gray-400">{line.slice(2)}</p>
            </div>
          );
        }

        return <p key={i} className="text-gray-300">{line}</p>;
      })}
    </div>
  );
};

// ─────────────────────────────────────────────
// Asosiy Modal
// ─────────────────────────────────────────────
interface ArticleReaderModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ESC klavishi bilan yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Modalni ochganda yuqoriga scroll
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen, article?.id]);

  if (!isOpen || !article) return null;

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('uz-UZ', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <>
      {/* Orqa fon overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
      >
        <div
          className="pointer-events-auto relative w-full max-w-2xl max-h-[90vh] rounded-2xl border border-[#1f293d] bg-[#131722] shadow-2xl flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ─── HEADER GRADIENT BANNER ─── */}
          <div
            className="relative flex-shrink-0 h-36 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${article.gradientFrom}ee, ${article.gradientTo}dd)`,
            }}
          >
            {/* Fon patterni */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, ${article.accentColor} 0%, transparent 60%),
                                  radial-gradient(circle at 80% 20%, ${article.accentColor}88 0%, transparent 50%)`,
              }}
            />

            {/* Jamoa logolari */}
            <div className="absolute inset-0 flex items-center justify-end pr-6 gap-3 opacity-30 pointer-events-none select-none">
              {article.teamLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black border border-white/10"
                  style={{ background: logo.bg, color: logo.color }}
                >
                  {logo.initials}
                </div>
              ))}
            </div>

            {/* Yopish tugmasi */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all z-10"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Kategoriya badge */}
            <div className="absolute bottom-3 left-4">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${article.badgeColor}`}
              >
                {article.category}
              </span>
            </div>
          </div>

          {/* ─── SCROLLABLE KONTENT ─── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">
            <div className="p-5 space-y-5">
              {/* Sarlavha */}
              <div>
                <h1 className="text-lg font-black text-white leading-tight mb-3">
                  {article.title}
                </h1>

                {/* Meta ma'lumotlar */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span className="text-gray-400 font-semibold">{article.author}</span>
                    <span className="text-gray-600">— {article.authorRole}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} daqiqa o'qish
                  </span>
                  <span className="text-gray-600">{publishedDate}</span>
                </div>
              </div>

              {/* Qisqacha tafsilot */}
              <div
                className="rounded-xl border-l-2 pl-3 py-2 text-sm text-gray-400 italic"
                style={{ borderColor: article.accentColor + '80' }}
              >
                {article.summary}
              </div>

              {/* Win Probability */}
              {article.winProbability && (
                <WinProbabilityBar
                  {...article.winProbability}
                  accentColor={article.accentColor}
                />
              )}

              {/* Bog'liq O'yin Kartochkasi */}
              {article.relatedMatch && (
                <RelatedMatchCard
                  match={article.relatedMatch}
                  accentColor={article.accentColor}
                />
              )}

              {/* Asosiy statistika */}
              {article.keyStats && article.keyStats.length > 0 && (
                <div className="rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" style={{ color: article.accentColor }} />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                      Asosiy Statistika
                    </span>
                  </div>
                  <div className="space-y-2">
                    {article.keyStats.map((stat, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-[#1f293d] last:border-0">
                        <span className="text-xs text-gray-500">{stat.label}</span>
                        <div className="text-right">
                          <span className="text-xs font-bold text-white">{stat.value}</span>
                          {stat.team && (
                            <span className="text-[10px] text-gray-600 ml-1.5">({stat.team})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Asosiy Highlights */}
              {article.highlights && article.highlights.length > 0 && (
                <div className="rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" style={{ color: article.accentColor }} />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                      Asosiy Nuqtalar
                    </span>
                  </div>
                  <div className="space-y-2">
                    {article.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: article.accentColor }} />
                        <span className="text-xs text-gray-400">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* To'liq Maqola Matni */}
              <div className="rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-4">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1f293d]">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">
                    To'liq Tahlil
                  </span>
                  <span className="ml-auto text-[10px] text-gray-600 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} daqiqa
                  </span>
                </div>
                <ArticleContent content={article.fullContent} />
              </div>

              {/* Teglar */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                <Tag className="w-3 h-3 text-gray-600 mt-0.5" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-gray-500 bg-[#0b0e14] border border-[#1f293d] hover:text-gray-300 hover:border-gray-600 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
