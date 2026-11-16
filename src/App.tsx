/**
 * UzScore — 3 Ustunli Professional SofaScore Layout
 * Principal Frontend Architecture standarti bo'yicha.
 *
 * Chap (240px): Sidebar — "Mening ligalarim" + Sevimli jamoalar
 * Markaz (flex-1): Filtr tablari + TournamentGroup o'yinlar oqimi
 * O'ng (360px): StandingsWidget + NewsFeed
 *
 * Pastki mobil navigatsiya: 375px–768px
 */

import { useEffect, useMemo, useState } from 'react';
import {
  Trophy,
  Star,
  Settings,
  Search,
  Radio,
  X,
  Tv2,
  CheckCircle2,
  Clock3,
  Heart,
  Zap,
  RefreshCw,
} from 'lucide-react';

import { useFootballStore, type TournamentId, type ActiveTab } from './store/useFootballStore';
import { TournamentGroup } from './components/TournamentGroup';
import { MatchRow } from './components/MatchRow';
import { MatchCenterDrawer } from './components/MatchCenterDrawer';
import { StandingsWidget, type TournamentKey } from './components/StandingsWidget';
import { NewsFeed } from './features/news';
import type { Match } from './types/football';

// ============================================================================
// SABIT MA'LUMOTLAR
// ============================================================================

interface LeagueSidebarItem {
  id: TournamentId;
  name: string;
  badge: string;
  color: string;          // accent rang
  indicatorColor: string; // sol chiziq rangi (CSS)
  bgColor: string;        // hover orqa fon
}

const SIDEBAR_LEAGUES: LeagueSidebarItem[] = [
  {
    id: 'ucl',
    name: 'Champions League',
    badge: 'UCL',
    color: '#93c5fd',
    indicatorColor: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.08)',
  },
  {
    id: 'uel',
    name: 'Europa League',
    badge: 'UEL',
    color: '#fdba74',
    indicatorColor: '#f97316',
    bgColor: 'rgba(249,115,22,0.08)',
  },
  {
    id: 'uz_superliga',
    name: "O'zbekiston Superligasi",
    badge: 'UZS',
    color: '#6ee7b7',
    indicatorColor: '#10b981',
    bgColor: 'rgba(16,185,129,0.08)',
  },
  {
    id: 'premier_league',
    name: 'Premier League',
    badge: 'EPL',
    color: '#f472b6',
    indicatorColor: '#e11d48',
    bgColor: 'rgba(225,29,72,0.08)',
  },
  {
    id: 'laliga',
    name: 'La Liga EA Sports',
    badge: 'ESP',
    color: '#fca5a5',
    indicatorColor: '#ef4444',
    bgColor: 'rgba(239,68,68,0.08)',
  },
];

const FAVORITE_TEAMS = [
  { name: 'Paxtakor', color: '#003399', badge: 'PAK' },
  { name: 'Real Madrid', color: '#fdb913', badge: 'RMA' },
  { name: 'Bayern Munich', color: '#dc2626', badge: 'BAY' },
  { name: 'Arsenal', color: '#ef4444', badge: 'ARS' },
];

interface StatusTab {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
}

const STATUS_TABS: StatusTab[] = [
  { id: 'ALL', label: 'Barchasi', icon: <Trophy className="h-3.5 w-3.5" /> },
  { id: 'LIVE', label: 'Jonli', icon: <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" /></span> },
  { id: 'FINISHED', label: 'Tugagan', icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  { id: 'SCHEDULED', label: "Bo'lajak", icon: <Clock3 className="h-3.5 w-3.5" /> },
  { id: 'FAVORITES', label: 'Sevimlilar', icon: <Star className="h-3.5 w-3.5" /> },
];

const DATE_LABELS: Record<number, string> = {
  [-1]: 'Kecha',
  [0]: 'Bugun',
  [1]: 'Ertaga',
};

// ============================================================================
// YORDAMCHI: O'YIN TURNIRINI ANIQLASH
// ============================================================================

function getMatchTournamentId(match: Match): TournamentId {
  const id = String(match.league?.id || match.tournamentId || '').toLowerCase();
  const name = String(match.league?.name || match.tournamentName || '').toLowerCase();

  if (id.includes('superliga') || name.includes('superliga') || id.includes('uz')) return 'uz_superliga';
  if (id.includes('ucl') || name.includes('champions')) return 'ucl';
  if (id.includes('uel') || name.includes('europa')) return 'uel';
  if (id.includes('epl') || id.includes('premier') || name.includes('premier')) return 'premier_league';
  if (id.includes('laliga') || name.includes('la liga') || name.includes('laliga')) return 'laliga';
  return 'ALL';
}

// ============================================================================
// KOMPONENTLAR: GOAL NOTIFICATION (ekran pastki o'ng burchagi)
// ============================================================================

function GoalNotification() {
  const { goalNotification, dismissGoalNotification } = useFootballStore();
  if (!goalNotification) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-6 right-5 z-[999] flex flex-col items-end gap-2 animate-in slide-in-from-right duration-300"
      style={{ maxWidth: 320 }}
    >
      {/* Shimmer orqa fon */}
      <div
        className="relative overflow-hidden rounded-2xl border border-[#10b981]/60 shadow-2xl shadow-emerald-500/30"
        style={{ background: 'linear-gradient(135deg, #064e3b, #065f46, #0b4d38)' }}
      >
        {/* Animated glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent animate-pulse" />

        <div className="relative p-4 flex items-start gap-3">
          {/* Gol ikonkasi */}
          <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10b981] shadow-lg shadow-emerald-500/40">
            <span className="text-2xl select-none">⚽</span>
          </div>

          <div className="flex-1 min-w-0">
            {/* GOOOOL! sarlavha */}
            <p className="text-lg font-black text-white tracking-wide uppercase animate-bounce">
              GOOOOL!
            </p>
            {/* O'yin */}
            <p className="text-xs font-bold text-[#6ee7b7] mt-0.5 truncate">
              {goalNotification.homeTeam} vs {goalNotification.awayTeam}
            </p>
            {/* Golchi */}
            <p className="text-xs text-emerald-200 mt-0.5">
              <span className="font-bold">{goalNotification.scorer}</span>{' '}
              <span className="text-emerald-400">{goalNotification.minute}'</span>
            </p>
            {/* Hisob */}
            <div className="mt-1.5 inline-flex items-center gap-1 bg-black/30 rounded-lg px-2 py-0.5">
              <span className="text-sm font-black text-white">
                {goalNotification.score.home} – {goalNotification.score.away}
              </span>
            </div>
          </div>

          {/* Yopish tugmasi */}
          <button
            onClick={dismissGoalNotification}
            className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full text-emerald-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Yopish"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Pastki progress bar (6s countdown) */}
        <div className="h-1 bg-emerald-900/50">
          <div
            className="h-full bg-[#10b981] origin-left"
            style={{ animation: 'shrink 6s linear forwards' }}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONENT: API SOZLAMALARI MODALI
// ============================================================================

function ApiSettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    setCustomApiKey,
    fetchRealMatches,
    isRealApiActive,
    isLoadingMatches,
    isPollingActive,
    pollingIntervalSeconds,
    lastPollTime,
    togglePolling,
    setPollingIntervalSeconds,
  } = useFootballStore();
  const [keyInput, setKeyInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (keyInput.trim()) {
      setCustomApiKey(keyInput.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-[#1f293d] bg-[#0b0e14] p-5 shadow-2xl space-y-4">
        {/* Sarlavha */}
        <div className="flex items-center justify-between border-b border-[#1f293d] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#10b981]">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Jonli Sinxronizatsiya & API Sozlamalari</h3>
              <p className="text-[11px] text-gray-400">Avtomatik Polling va Real Natijalar Tizimi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Holat kartochkasi */}
        <div className="rounded-xl border border-emerald-500/30 bg-[#131722] p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Ulanish holati:</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-[#10b981]">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              {isRealApiActive ? 'API-Sports: Ulangan & Faol' : 'Faol (API-Sports)'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Avto-Polling:</span>
            <button
              onClick={togglePolling}
              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase transition ${
                isPollingActive
                  ? 'bg-emerald-500/20 text-[#10b981] border border-emerald-500/40'
                  : 'bg-gray-800 text-gray-400 border border-gray-700'
              }`}
            >
              {isPollingActive ? 'Yoqilgan' : "To'xtatilgan"}
            </button>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Oxirgi yangilanish:</span>
            <span className="font-semibold text-gray-300">
              {lastPollTime ? new Date(lastPollTime).toLocaleTimeString() : 'Hozir'}
            </span>
          </div>
        </div>

        {/* Polling interval tanlash */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300">Yangilanish oralig'i (Polling Frequency):</label>
          <div className="grid grid-cols-3 gap-2">
            {[15, 30, 60].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setPollingIntervalSeconds(sec)}
                className={`py-1.5 rounded-xl text-xs font-bold transition border ${
                  pollingIntervalSeconds === sec
                    ? 'bg-[#10b981] text-black border-[#10b981] shadow-sm'
                    : 'bg-[#131722] text-gray-400 border-[#1f293d] hover:text-white'
                }`}
              >
                {sec} soniya
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-500">
            * 30s tavsiya etiladi (kunlik 100 ta so'rov limitini optimal tejaydi).
          </p>
        </div>

        {/* API kaliti kiritish */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300">API Kaliti (x-apisports-key):</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="d8064a415c475419d22fb56cb83df26d"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="flex-1 rounded-xl border border-[#1f293d] bg-[#131722] px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-[#10b981] focus:outline-none"
            />
            <button
              onClick={handleSave}
              className="rounded-xl bg-[#10b981] px-3.5 py-2 text-xs font-bold text-black hover:bg-emerald-400 transition"
            >
              Saqlash
            </button>
          </div>
          {savedSuccess && (
            <p className="text-[11px] text-emerald-400 font-medium">
              ✓ API kaliti muvaffaqiyatli saqlandi!
            </p>
          )}
        </div>

        {/* Pastki tugmalar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1f293d]">
          <button
            onClick={() => fetchRealMatches(true)}
            disabled={isLoadingMatches}
            className="flex items-center gap-1.5 rounded-xl border border-[#1f293d] bg-[#131722] px-3 py-1.5 text-xs font-bold text-gray-300 hover:text-white hover:border-gray-500 transition disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoadingMatches ? 'animate-spin text-[#10b981]' : ''}`} />
            <span>{isLoadingMatches ? 'Yuklanmoqda...' : 'Hozir yangilash'}</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#131722] px-4 py-1.5 text-xs font-bold text-gray-300 hover:text-white border border-[#1f293d] transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONENT: NAVBAR
// ============================================================================

interface NavbarProps {
  liveCount: number;
  onOpenSettings?: () => void;
}

function Navbar({ liveCount, onOpenSettings }: NavbarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    isRealApiActive,
    isPollingActive,
    pollingIntervalSeconds,
  } = useFootballStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1f293d] bg-[#0b0e14]/95 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 sm:gap-5 sm:px-6">

        {/* ── GolUz brendi ── */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-[#10b981] shadow-lg shadow-emerald-500/20">
            <span className="text-lg font-black text-[#0b0e14] leading-none">G</span>
            <div className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#131722] border border-emerald-500/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-ping" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-black tracking-tight text-white leading-none">
              Gol<span className="text-[#10b981]">Uz</span>
            </span>
            <span className="text-[9px] font-semibold text-gray-500 tracking-wider uppercase -mt-0.5">
              Score • Live
            </span>
          </div>
        </div>

        {/* ── Qidiruv ── */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jamoa yoki o'yinchi..."
              className="w-full rounded-xl border border-[#1f293d] bg-[#131722] py-2 pl-8 pr-8 text-xs text-gray-200 placeholder-gray-600 transition focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Sana tanlagich ── */}
        <div className="hidden md:flex items-center gap-1 rounded-xl border border-[#1f293d] bg-[#131722] p-1">
          {([-1, 0, 1] as const).map((offset) => (
            <button
              key={offset}
              onClick={() => setSelectedDate(offset)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                selectedDate === offset
                  ? 'bg-[#10b981] text-black shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {DATE_LABELS[offset]}
            </button>
          ))}
        </div>

        {/* ── LIVE hisoblagich ── */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl bg-[#131722] border border-[#1f293d] px-3 py-1.5">
          <Radio
            className={`h-3.5 w-3.5 ${liveCount > 0 ? 'text-[#10b981] animate-pulse' : 'text-gray-500'}`}
          />
          <span className="text-xs font-semibold text-gray-300 whitespace-nowrap">
            Jonli:{' '}
            <span className={`font-black ${liveCount > 0 ? 'text-[#10b981]' : 'text-gray-500'}`}>
              {liveCount}
            </span>
          </span>
        </div>

        {/* ── Polling & API status indikatori ── */}
        <div
          onClick={onOpenSettings}
          role="button"
          tabIndex={0}
          className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#131722] border border-[#1f293d] hover:border-emerald-500/40 cursor-pointer text-[11px] font-semibold text-gray-300 transition"
          title="API Sozlamalari va Jonli Polling Holati"
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isPollingActive ? 'bg-[#10b981]' : 'bg-amber-400'
              } opacity-75`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isPollingActive ? 'bg-[#10b981]' : 'bg-amber-400'
              }`}
            />
          </span>
          <span>
            {isPollingActive ? (
              <>
                Jonli Polling{' '}
                <span className="text-[#10b981] font-bold">({pollingIntervalSeconds}s)</span>
                {isRealApiActive && (
                  <span className="ml-1 rounded bg-[#10b981]/20 px-1 py-0.2 text-[9px] font-black text-[#10b981]">
                    REAL
                  </span>
                )}
              </>
            ) : (
              <span className="text-gray-400">Polling: To'xtatilgan</span>
            )}
          </span>
        </div>

        {/* ── API sozlamalari ── */}
        <button
          onClick={onOpenSettings}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#1f293d] bg-[#131722] text-gray-400 hover:text-white hover:border-emerald-500/50 transition shrink-0"
          title="API Sozlamalari"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

// ============================================================================
// KOMPONENT: CHAP SIDEBAR
// ============================================================================

function Sidebar() {
  const { selectedTournament, setSelectedTournament, activeTab, setActiveTab } = useFootballStore();

  return (
    <aside className="hidden lg:flex w-60 flex-col shrink-0 border-r border-[#1f293d] bg-[#0b0e14] overflow-y-auto">
      <div className="p-4 space-y-5">

        {/* ── Mening ligalarim ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-3.5 w-3.5 text-[#10b981]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Mening ligalarim
            </span>
          </div>

          {/* Hammasi */}
          <button
            onClick={() => setSelectedTournament('ALL')}
            className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold mb-1 transition-all ${
              selectedTournament === 'ALL'
                ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
                : 'text-gray-400 hover:bg-[#131722] hover:text-gray-200 border border-transparent'
            }`}
          >
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-black text-black">ALL</span>
            </div>
            <span>Barcha turnirlar</span>
          </button>

          {/* Ligalar */}
          <div className="space-y-0.5">
            {SIDEBAR_LEAGUES.map((league) => {
              const isActive = selectedTournament === league.id;
              return (
                <button
                  key={league.id}
                  onClick={() => setSelectedTournament(league.id)}
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all border ${
                    isActive
                      ? 'border-opacity-40 shadow-sm'
                      : 'border-transparent hover:bg-[#131722]'
                  }`}
                  style={
                    isActive
                      ? {
                          background: league.bgColor,
                          borderColor: `${league.indicatorColor}50`,
                          color: league.color,
                        }
                      : {}
                  }
                >
                  {/* Rang indikatori */}
                  <div
                    className="h-5 w-1 rounded-full shrink-0"
                    style={{ background: isActive ? league.indicatorColor : '#374151' }}
                  />
                  {/* Badge */}
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[9px] font-black shrink-0"
                    style={
                      isActive
                        ? { background: `${league.indicatorColor}25`, color: league.color }
                        : { background: '#1f293d', color: '#6b7280' }
                    }
                  >
                    {league.badge}
                  </span>
                  <span className={isActive ? '' : 'text-gray-400 group-hover:text-gray-200 truncate'}>
                    {league.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Ajratuvchi ── */}
        <div className="h-px bg-[#1f293d]" />

        {/* ── Sevimli jamoalar ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Sevimli jamoalar
            </span>
          </div>

          <div className="space-y-1">
            {FAVORITE_TEAMS.map((team) => (
              <button
                key={team.name}
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-gray-400 hover:bg-[#131722] hover:text-gray-200 transition"
              >
                <div
                  className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0 text-[9px] font-black text-white"
                  style={{ background: team.color }}
                >
                  {team.badge}
                </div>
                <span className="truncate">{team.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Ajratuvchi ── */}
        <div className="h-px bg-[#1f293d]" />

        {/* ── Tezkor filtr ── */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-yellow-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Tezkor filtr
            </span>
          </div>
          <div className="space-y-0.5">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/25'
                    : 'text-gray-500 hover:bg-[#131722] hover:text-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ============================================================================
// KOMPONENT: FILTR TABLAR (Markaz ustun yuqorisi)
// ============================================================================

function FilterTabs() {
  const { activeTab, setActiveTab, matches } = useFootballStore();
  const liveCount = useMemo(
    () => matches.filter((m) => m.status === 'LIVE').length,
    [matches]
  );

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5">
      {STATUS_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const count = tab.id === 'LIVE' ? liveCount : undefined;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-bold border transition-all shrink-0 ${
              isActive
                ? tab.id === 'LIVE'
                  ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 shadow-sm'
                  : tab.id === 'FAVORITES'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-[#131722] text-white border-gray-600'
                : 'border-[#1f293d] text-gray-400 hover:text-gray-200 hover:border-gray-600'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {count !== undefined && count > 0 && (
              <span className="rounded-full bg-[#10b981] px-1.5 py-0.5 text-[10px] font-black text-black leading-none">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// KOMPONENT: MOBIL PASTKI NAVIGATSIYA
// ============================================================================

function MobileBottomNav() {
  const { activeTab, setActiveTab, matches } = useFootballStore();
  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  const items = [
    { id: 'ALL' as ActiveTab, label: "O'yinlar", icon: <Tv2 className="h-5 w-5" /> },
    { id: 'LIVE' as ActiveTab, label: 'Jonli', icon: <Radio className="h-5 w-5" />, badge: liveCount },
    { id: 'FINISHED' as ActiveTab, label: 'Jadvallar', icon: <Trophy className="h-5 w-5" /> },
    { id: 'FAVORITES' as ActiveTab, label: 'Sevimlilar', icon: <Star className="h-5 w-5" /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[#1f293d] bg-[#0b0e14]/95 backdrop-blur-md">
      <div className="flex items-stretch h-16">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-colors ${
                isActive ? 'text-[#10b981]' : 'text-gray-500'
              }`}
            >
              {/* Aktiv indikator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#10b981] rounded-full" />
              )}
              <div className="relative">
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-[#10b981] flex items-center justify-center text-[9px] font-black text-black">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ============================================================================
// KOMPONENT: SANA TANLAGICH (Mobil)
// ============================================================================

function MobileDatePicker() {
  const { selectedDate, setSelectedDate } = useFootballStore();
  return (
    <div className="flex lg:hidden items-center gap-1 rounded-xl border border-[#1f293d] bg-[#131722] p-1 self-start shrink-0">
      {([-1, 0, 1] as const).map((offset) => (
        <button
          key={offset}
          onClick={() => setSelectedDate(offset)}
          className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
            selectedDate === offset
              ? 'bg-[#10b981] text-black shadow'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {DATE_LABELS[offset]}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// ASOSIY APP KOMPONENTI
// ============================================================================

function App() {
  const {
    matches,
    activeTab,
    selectedTournament,
    selectedMatchId,
    searchQuery,
    favorites,
    goalFlashIds,
    toggleFavorite,
    setSelectedMatchId,
    startSimulation,
    stopSimulation,
    fetchRealMatches,
    startPolling,
    stopPolling,
  } = useFootballStore();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Smart Polling va brauzer Visibility API nazorati
  useEffect(() => {
    startPolling();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchRealMatches(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startPolling, stopPolling, fetchRealMatches]);

  // Jonli daqiqalar simulyatsiyasi (minutlar silliq siljishi uchun)
  useEffect(() => {
    startSimulation();
    return () => stopSimulation();
  }, [startSimulation, stopSimulation]);

  // Tanlangan o'yinni topish
  const selectedMatch = useMemo(
    () => matches.find((m) => m.id === selectedMatchId) ?? null,
    [matches, selectedMatchId]
  );

  // Jonli o'yinlar soni
  const liveCount = useMemo(
    () => matches.filter((m) => m.status === 'LIVE').length,
    [matches]
  );

  // Filtrlangan o'yinlar
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Status filtri
      if (activeTab === 'LIVE' && match.status !== 'LIVE') return false;
      if (activeTab === 'FINISHED' && match.status !== 'FINISHED' && match.status !== 'FT') return false;
      if (activeTab === 'SCHEDULED' && match.status !== 'SCHEDULED') return false;
      if (activeTab === 'FAVORITES' && !favorites.has(match.id)) return false;

      // Turnir filtri
      if (selectedTournament !== 'ALL') {
        const matchTournament = getMatchTournamentId(match);
        if (matchTournament !== selectedTournament) return false;
      }

      // Qidiruv
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const home = match.homeTeam.name.toLowerCase();
        const away = match.awayTeam.name.toLowerCase();
        const league = (match.league?.name || match.tournamentName || '').toLowerCase();
        return home.includes(q) || away.includes(q) || league.includes(q);
      }

      return true;
    });
  }, [matches, activeTab, selectedTournament, searchQuery, favorites]);

  // Turnirlar bo'yicha guruhlash
  const groupedMatches = useMemo(() => {
    const groups: { league: Match['league']; matches: Match[] }[] = [];
    const leagueMap = new Map<string, { league: Match['league']; matches: Match[] }>();

    // Turnir tartib prioriteti
    const ORDER: TournamentId[] = ['uz_superliga', 'ucl', 'uel', 'premier_league', 'laliga'];

    const getSortKey = (m: Match) => {
      const tid = getMatchTournamentId(m);
      const idx = ORDER.indexOf(tid);
      return idx === -1 ? 99 : idx;
    };

    const sorted = [...filteredMatches].sort((a, b) => getSortKey(a) - getSortKey(b));

    sorted.forEach((m) => {
      const key = String(m.league?.id || m.league?.name || m.tournamentId || m.tournamentName);
      if (!leagueMap.has(key)) {
        const group = { league: m.league, matches: [] as Match[] };
        leagueMap.set(key, group);
        groups.push(group);
      }
      leagueMap.get(key)!.matches.push(m);
    });

    return groups;
  }, [filteredMatches]);

  // StandingsWidget uchun turnir kaliti
  const standingsTournamentKey = useMemo<TournamentKey>(() => {
    if (selectedTournament !== 'ALL') return selectedTournament as TournamentKey;
    return 'uz_superliga';
  }, [selectedTournament]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-gray-100 flex flex-col font-sans selection:bg-[#10b981]/30 selection:text-white">
      {/* ── Global CSS animatsiyalari ── */}
      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
        @keyframes goalFlash {
          0%,100% { background-color: transparent; }
          20%,60% { background-color: rgba(16,185,129,0.18); }
          40%,80% { background-color: rgba(16,185,129,0.06); }
        }
        .goal-flash-row {
          animation: goalFlash 0.6s ease-in-out 6;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── NAVBAR ── */}
      <Navbar liveCount={liveCount} onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* ── 3 USTUNLI ASOSIY LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden max-w-[1600px] mx-auto w-full">

        {/* ═══════════════════════════════════
            CHAP USTUN: SIDEBAR (240px, faqat lg+)
        ═══════════════════════════════════ */}
        <Sidebar />

        {/* ═══════════════════════════════════
            MARKAZ USTUN: O'YINLAR OQIMI
        ═══════════════════════════════════ */}
        <main className="flex-1 overflow-y-auto min-w-0 pb-20 lg:pb-6">
          <div className="p-3 sm:p-5 space-y-4 max-w-3xl mx-auto lg:max-w-none">

            {/* Yuqori qator: Filtr tablar + Mobil sana */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <FilterTabs />
              <MobileDatePicker />
            </div>

            {/* O'yinlar oqimi (Turnirlar kesimida guruhlangan) */}
            {groupedMatches.length === 0 ? (
              <div className="rounded-2xl border border-[#1f293d] bg-[#131722] p-10 text-center">
                <Trophy className="mx-auto h-10 w-10 text-gray-700 mb-3" />
                <p className="text-sm font-bold text-gray-400">O'yinlar topilmadi</p>
                <p className="text-xs text-gray-600 mt-1">
                  Filtr yoki qidiruvni o'zgartirib ko'ring.
                </p>
              </div>
            ) : (
              groupedMatches.map((group) => {
                const groupLive = group.matches.filter((m) => m.status === 'LIVE').length;
                return (
                  <TournamentGroup
                    key={String(group.league?.id || group.league?.name)}
                    league={group.league}
                    matchCount={group.matches.length}
                    liveMatchCount={groupLive}
                    initiallyExpanded
                  >
                    <div className="divide-y divide-[#1f293d]/50">
                      {group.matches.map((match) => (
                        <div
                          key={match.id}
                          className={goalFlashIds.has(match.id) ? 'goal-flash-row' : ''}
                        >
                          <MatchRow
                            match={match}
                            isFavorite={favorites.has(match.id)}
                            onToggleFavorite={toggleFavorite}
                            onSelectMatch={(m) => setSelectedMatchId(m.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </TournamentGroup>
                );
              })
            )}
          </div>
        </main>

        {/* ═══════════════════════════════════
            O'NG USTUN: ANALYTICS + JADVAL (360px, faqat xl+)
        ═══════════════════════════════════ */}
        <aside className="hidden xl:flex w-[360px] shrink-0 border-l border-[#1f293d] flex-col overflow-y-auto pb-6 no-scrollbar">
          <div className="p-4 space-y-5">
            {/* Jonli Turnir Jadvali */}
            <StandingsWidget
              initialTournament={standingsTournamentKey}
              key={standingsTournamentKey}
            />

            {/* Yangiliklar va tahlillar */}
            <NewsFeed />
          </div>
        </aside>
      </div>

      {/* ── Mobil Pastki Navigatsiya ── */}
      <MobileBottomNav />

      {/* ── MatchCenter Drawer ── */}
      <MatchCenterDrawer
        match={selectedMatch}
        isOpen={Boolean(selectedMatch)}
        onClose={() => setSelectedMatchId(null)}
        isFavorite={selectedMatch ? favorites.has(selectedMatch.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* ── GOOOOL! Xabarnomasi ── */}
      <GoalNotification />

      {/* ── API Sozlamalari Modali ── */}
      <ApiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

export default App;
