/**
 * UzScore — NewsFeed
 * Turnirlar bo'yicha filtrlanadigan professional yangiliklar lenti.
 * Gradient + Jamoa logolari kompozitsiyasi — hech qachon singan rasm yo'q.
 */

import React, { useState, useMemo } from 'react';
import { Clock, ChevronRight, Flame, Rss } from 'lucide-react';
import { mockNewsArticles, NEWS_CATEGORIES, type NewsArticle, type NewsCategory } from './newsData';
import { ArticleReaderModal } from './ArticleReaderModal';

// ─────────────────────────────────────────────
// Turnir Badge komponenti
// ─────────────────────────────────────────────
const TournamentBadge: React.FC<{ category: NewsCategory; className?: string }> = ({ category, className = '' }) => {
  const cfg = NEWS_CATEGORIES.find((c) => c.id === category);
  if (!cfg) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${cfg.color} ${cfg.borderColor} ${className}`}
    >
      {cfg.label}
    </span>
  );
};

// ─────────────────────────────────────────────
// O'qish vaqti komponenti
// ─────────────────────────────────────────────
const ReadTimeChip: React.FC<{ minutes: number }> = ({ minutes }) => (
  <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 font-medium">
    <Clock className="w-3 h-3" />
    {minutes} daqiqa
  </span>
);

// ─────────────────────────────────────────────
// Gradient Kompositsiya (rasm o'rniga)
// ─────────────────────────────────────────────
const GradientComposition: React.FC<{ article: NewsArticle; size?: 'sm' | 'md' }> = ({
  article,
  size = 'md',
}) => {
  const h = size === 'sm' ? 'h-28' : 'h-36';

  return (
    <div
      className={`relative ${h} w-full rounded-xl overflow-hidden flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${article.gradientFrom}f0, ${article.gradientTo}e0)`,
      }}
    >
      {/* Ambiyans yig'imi */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at 15% 50%, ${article.accentColor} 0%, transparent 55%),
                            radial-gradient(ellipse at 85% 15%, ${article.accentColor}66 0%, transparent 45%)`,
        }}
      />

      {/* Mesh naqsh */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${article.accentColor} 0px, ${article.accentColor} 1px, transparent 1px, transparent 20px)`,
        }}
      />

      {/* Jamoa logolari — katta, orqada, shaffof */}
      <div className="absolute inset-0 flex items-center justify-end pr-4 gap-2 select-none pointer-events-none">
        {article.teamLogos.map((logo, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 rounded-2xl flex items-center justify-center font-black border border-white/10 ${
              size === 'sm' ? 'w-12 h-12 text-sm opacity-25' : 'w-16 h-16 text-lg opacity-30'
            }`}
            style={{ background: logo.bg, color: logo.color }}
          >
            {logo.initials}
          </div>
        ))}
      </div>

      {/* Kategoriya badge — yuqori chap */}
      <div className="absolute top-2.5 left-2.5">
        <TournamentBadge category={article.category} />
      </div>

      {/* Pastki qorongʻu gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-10"
        style={{ background: `linear-gradient(to top, ${article.gradientTo}cc, transparent)` }}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// Yirik (Featured) Yangilik Kartochkasi
// ─────────────────────────────────────────────
const FeaturedCard: React.FC<{ article: NewsArticle; onClick: () => void }> = ({ article, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group rounded-2xl border border-[#1f293d] bg-[#131722] overflow-hidden hover:border-gray-600/50 transition-all duration-200 hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    >
      {/* Gradient Rasm */}
      <GradientComposition article={article} size="md" />

      {/* Kontent */}
      <div className="p-4 space-y-2.5">
        {/* Sarlavha */}
        <h2 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-gray-100 transition-colors">
          {article.title}
        </h2>

        {/* Qisqacha */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{article.summary}</p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <ReadTimeChip minutes={article.readTimeMinutes} />
            {/* Jamoa teglari */}
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#0b0e14] border border-[#1f293d] text-gray-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <ChevronRight
            className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all"
          />
        </div>
      </div>
    </button>
  );
};

// ─────────────────────────────────────────────
// Kichik (Compact) Yangilik Kartochkasi
// ─────────────────────────────────────────────
const CompactCard: React.FC<{ article: NewsArticle; onClick: () => void }> = ({ article, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group flex items-stretch gap-3 rounded-xl border border-[#1f293d] bg-[#131722] p-3 hover:border-gray-600/50 transition-all duration-200 hover:bg-[#161c28] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    >
      {/* Mini Gradient */}
      <div
        className="relative w-20 flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${article.gradientFrom}e0, ${article.gradientTo}d0)` }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle, ${article.accentColor} 0%, transparent 70%)` }}
        />
        {article.teamLogos[0] && (
          <div
            className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border border-white/10"
            style={{ background: article.teamLogos[0].bg, color: article.teamLogos[0].color }}
          >
            {article.teamLogos[0].initials}
          </div>
        )}
        {/* Badge overlay */}
        <div className="absolute top-1 left-1">
          <span
            className="text-[8px] font-black px-1 py-px rounded"
            style={{ background: article.accentColor + '30', color: article.accentColor }}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Matn qismi */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
        <p className="text-xs font-semibold text-white leading-snug line-clamp-2 group-hover:text-gray-100 transition-colors">
          {article.title}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <ReadTimeChip minutes={article.readTimeMinutes} />
          {article.tags[0] && (
            <span className="text-[9px] text-gray-600 font-medium truncate">
              #{article.tags[0]}
            </span>
          )}
        </div>
      </div>

      <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-500 self-center flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
    </button>
  );
};

// ─────────────────────────────────────────────
// Filtr Paneli
// ─────────────────────────────────────────────
const FilterBar: React.FC<{
  active: NewsCategory | 'Hammasi';
  onChange: (c: NewsCategory | 'Hammasi') => void;
}> = ({ active, onChange }) => (
  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
    {NEWS_CATEGORIES.map((cat) => {
      const isActive = active === cat.id;
      return (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id as NewsCategory | 'Hammasi')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
            isActive
              ? `${cat.color} ${cat.borderColor} shadow-sm`
              : 'text-gray-500 border-[#1f293d] hover:border-gray-600 hover:text-gray-400 bg-transparent'
          }`}
        >
          {cat.label}
        </button>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────
// Asosiy NewsFeed Komponenti
// ─────────────────────────────────────────────
export const NewsFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'Hammasi'>('Hammasi');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Filtrlangan maqolalar
  const filtered = useMemo(() => {
    if (activeCategory === 'Hammasi') return mockNewsArticles;
    return mockNewsArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  // Birinchi 2 ta — featured, qolganlar compact
  const featuredArticles = filtered.slice(0, 2);
  const compactArticles = filtered.slice(2);

  return (
    <>
      <div className="rounded-2xl border border-[#1f293d] bg-[#131722] overflow-hidden">
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#1f293d]">
          <div className="flex items-center gap-2">
            <Rss className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-black text-white uppercase tracking-wide">Sport Yangiliklari</span>
            <span className="ml-1 text-[10px] text-gray-600 font-medium">
              {filtered.length} ta
            </span>
          </div>
          {/* Jonli indikator */}
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
            <Flame className="w-3 h-3" />
            YANGILANDI
          </div>
        </div>

        {/* ─── Filtr paneli ─── */}
        <div className="px-4 py-3 border-b border-[#1f293d]">
          <FilterBar active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* ─── Kartochkalar ─── */}
        <div className="p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-gray-600 text-sm">
              Bu kategoriyada yangiliklar mavjud emas.
            </div>
          ) : (
            <>
              {/* Featured kartochkalar (1-2) */}
              {featuredArticles.length > 0 && (
                <div className={`grid gap-3 ${featuredArticles.length >= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                  {featuredArticles.map((article) => (
                    <FeaturedCard
                      key={article.id}
                      article={article}
                      onClick={() => setSelectedArticle(article)}
                    />
                  ))}
                </div>
              )}

              {/* Ajratuvchi chiziq */}
              {compactArticles.length > 0 && (
                <div className="flex items-center gap-2 py-1">
                  <div className="flex-1 h-px bg-[#1f293d]" />
                  <span className="text-[9px] text-gray-700 font-semibold uppercase tracking-widest">
                    Boshqa yangiliklar
                  </span>
                  <div className="flex-1 h-px bg-[#1f293d]" />
                </div>
              )}

              {/* Compact kartochkalar (3+) */}
              <div className="space-y-2">
                {compactArticles.map((article) => (
                  <CompactCard
                    key={article.id}
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ─── Maqola o'qish modali ─── */}
      <ArticleReaderModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </>
  );
};
