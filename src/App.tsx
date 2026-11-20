import { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  Sparkles,
  Key,
  X,
  Layers,
  Newspaper,
  Star,
} from 'lucide-react';
import { Header } from './components/Header';
import { TournamentGroup } from './components/TournamentGroup';
import { MatchRow } from './components/MatchRow';
import { MatchCenterDrawer } from './components/MatchCenterDrawer';
import { StandingsWidget, type TournamentKey } from './components/StandingsWidget';
import { NewsFeed } from './features/news/NewsFeed';
import { useFootballStore, type TournamentId } from './store/useFootballStore';
import type { Match } from './types/football';

interface TournamentTab {
  id: TournamentId;
  name: string;
  dotColor?: string;
}

const TOURNAMENT_TABS: TournamentTab[] = [
  { id: 'ALL', name: 'Barchasi' },
  { id: 'uz_superliga', name: 'Superliga', dotColor: 'bg-emerald-400' },
  { id: 'ucl', name: 'Champions League', dotColor: 'bg-sky-400' },
  { id: 'uel', name: 'Europa League', dotColor: 'bg-orange-400' },
  { id: 'premier_league', name: 'Premier League', dotColor: 'bg-pink-400' },
  { id: 'laliga', name: 'La Liga', dotColor: 'bg-rose-400' },
];

function App() {
  const {
    matches,
    goalFlashIds,
    goalNotification,
    dismissGoalNotification,
    simulationActive,
    startSimulation,
    stopSimulation,
    isRealApiActive,
    isPollingActive,
    togglePolling,
    soundEnabled,
    toggleSound,
    setCustomApiKey,
    selectedDate,
    setSelectedDate,
    favorites,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    selectedTournament,
    setSelectedTournament,
  } = useFootballStore();

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [mobileTab, setMobileTab] = useState<'matches' | 'standings' | 'news' | 'favorites'>('matches');

  // Jonli tajriba uchun dastlabki simulyatsiyani faollashtirish
  useEffect(() => {
    if (!isRealApiActive && !simulationActive) {
      startSimulation();
    }
  }, [isRealApiActive, simulationActive, startSimulation]);

  const liveMatches = useMemo(
    () => matches.filter((m) => m.status === 'LIVE'),
    [matches]
  );
  const liveCount = liveMatches.length;
  const favoritesCount = favorites.size;

  const getMatchTournamentKey = (match: Match): TournamentId => {
    const id = String(match.league?.id || match.tournamentId || '').toLowerCase();
    const name = String(match.league?.name || match.tournamentName || '').toLowerCase();
    if (id.includes('superliga') || name.includes('superliga') || id.includes('uz')) return 'uz_superliga';
    if (id.includes('ucl') || name.includes('champions')) return 'ucl';
    if (id.includes('uel') || name.includes('europa')) return 'uel';
    if (id.includes('epl') || id.includes('premier') || name.includes('premier')) return 'premier_league';
    if (id.includes('laliga') || name.includes('la liga') || name.includes('laliga')) return 'laliga';
    return 'ALL';
  };

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // 1. Holat bo'yicha filter
      if (activeTab === 'LIVE' && match.status !== 'LIVE') return false;
      if (activeTab === 'FINISHED' && match.status !== 'FINISHED' && match.status !== 'FT') return false;
      if (activeTab === 'SCHEDULED' && match.status !== 'SCHEDULED') return false;
      if (activeTab === 'FAVORITES' && !favorites.has(match.id)) return false;

      // 2. Turnir bo'yicha filter
      if (selectedTournament !== 'ALL') {
        const matchTournament = getMatchTournamentKey(match);
        if (matchTournament !== selectedTournament) return false;
      }

      // 3. Qidiruv
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const homeName = match.homeTeam.name.toLowerCase();
        const awayName = match.awayTeam.name.toLowerCase();
        const leagueName = (match.league?.name || match.tournamentName || '').toLowerCase();
        return homeName.includes(query) || awayName.includes(query) || leagueName.includes(query);
      }

      return true;
    });
  }, [matches, activeTab, selectedTournament, favorites, searchQuery]);

  const groupedMatches = useMemo(() => {
    const groups: { league: Match['league']; matches: Match[] }[] = [];
    const leagueMap = new Map<string, { league: Match['league']; matches: Match[] }>();

    filteredMatches.forEach((m) => {
      const key = String(m.league?.id || m.league?.name || m.tournamentId || m.tournamentName);
      if (!leagueMap.has(key)) {
        const group = { league: m.league, matches: [] };
        leagueMap.set(key, group);
        groups.push(group);
      }
      leagueMap.get(key)!.matches.push(m);
    });

    return groups;
  }, [filteredMatches]);

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setCustomApiKey(apiKeyInput.trim());
      setIsApiModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-white pb-16 lg:pb-6">
      {/* Yuqori Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeTab}
        onFilterChange={setActiveTab}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        liveCount={liveCount}
        favoritesCount={favoritesCount}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        isRealApiActive={isRealApiActive}
        onOpenApiModal={() => setIsApiModalOpen(true)}
        isPollingActive={isPollingActive}
        onTogglePolling={togglePolling}
        simulationActive={simulationActive}
        onToggleSimulation={() => (simulationActive ? stopSimulation() : startSimulation())}
      />

      {/* Asosiy Qism */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 flex-1 w-full space-y-3.5">
        {/* Agar Yangiliklar tabi tanlangan bo'lsa */}
        {activeTab === 'NEWS' || mobileTab === 'news' ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <div>
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-emerald-400" />
                  Futbol Tahlillari va Eksklyuziv Yangiliklar
                </h2>
                <p className="text-xs text-zinc-400">
                  O'zbekiston Superligasi va Yevropa Top ligalari bo'yicha tahliliy maqolalar
                </p>
              </div>
            </div>
            <NewsFeed />
          </div>
        ) : (
          <>
            {/* Turnirlar navigatsiyasi — SofaScore & Apple Sports minimalizm uslubida */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {TOURNAMENT_TABS.map((tab) => {
                const isActive = selectedTournament === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedTournament(tab.id)}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    {tab.dotColor && (
                      <span className={`h-1.5 w-1.5 rounded-full ${tab.dotColor}`} />
                    )}
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Asosiy 2/3 Ustunli Professional Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Chap Ustun (2 ustun kengligida): O'yinlar oqimi */}
              <div className={`lg:col-span-2 space-y-3 ${mobileTab === 'standings' ? 'hidden lg:block' : 'block'}`}>
                {groupedMatches.length === 0 ? (
                  <div className="rounded-2xl bg-[#0c0f17] border border-white/[0.04] p-10 text-center space-y-2">
                    <Trophy className="mx-auto h-9 w-9 text-zinc-600 mb-1" />
                    <p className="text-sm font-semibold text-zinc-200">Uchrashuvlar topilmadi</p>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      Tanlangan filter, sana yoki qidiruv bo'yicha hozircha o'yinlar mavjud emas. Filtrlarni tozalab ko'ring.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('ALL');
                        setSelectedTournament('ALL');
                        setSearchQuery('');
                      }}
                      className="inline-block mt-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-colors"
                    >
                      Barcha o'yinlarni ko'rsatish
                    </button>
                  </div>
                ) : (
                  groupedMatches.map((group) => {
                    const groupLiveCount = group.matches.filter((m) => m.status === 'LIVE').length;
                    return (
                      <TournamentGroup
                        key={String(group.league?.id || group.league?.name)}
                        league={group.league}
                        matchCount={group.matches.length}
                        liveMatchCount={groupLiveCount}
                        initiallyExpanded={true}
                      >
                        <div className="divide-y divide-white/[0.02]">
                          {group.matches.map((match) => (
                            <MatchRow
                              key={match.id}
                              match={match}
                              isGoalFlash={goalFlashIds.has(match.id)}
                              isFavorite={favorites.has(match.id)}
                              onToggleFavorite={toggleFavorite}
                              onSelectMatch={(m) => setSelectedMatch(m)}
                            />
                          ))}
                        </div>
                      </TournamentGroup>
                    );
                  })
                )}
              </div>

              {/* O'ng Ustun: Turnir Jadvali va Axborot Paneli */}
              <div className={`space-y-3.5 ${mobileTab === 'matches' ? 'hidden lg:block' : 'block'}`}>
                <StandingsWidget
                  initialTournament={
                    selectedTournament !== 'ALL'
                      ? (selectedTournament as TournamentKey)
                      : 'uz_superliga'
                  }
                />

                {/* SofaScore Jonli Tahliliy Banner */}
                <div className="rounded-2xl bg-[#0c0f17] border border-white/[0.04] p-4 text-xs text-zinc-400 space-y-2.5">
                  <div className="flex items-center justify-between text-white font-medium border-b border-white/[0.04] pb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5" /> SofaScore & Apple Sports Style
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">v4.0 Pro</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                    Hujum bosimi (Attack Momentum), jonli Web Audio gol signali, taktik o'yinchilar profili va xG statistikasi integratsiya qilindi.
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/[0.03]">
                    <span className="text-zinc-500">Holat:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {isRealApiActive ? 'Real API Jonli' : 'Simulyatsiya Dvigateli'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Suzuvchi "GOOOOL!" Xabarnomasi (SofaScore Floating Toast) */}
      {goalNotification && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 max-w-sm w-full">
          <div className="relative rounded-2xl bg-[#0d1424] border border-emerald-400/40 p-4 shadow-2xl shadow-emerald-500/20 ring-1 ring-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  ⚽ GOOOOL! ({goalNotification.minute}')
                </span>
              </div>
              <button
                type="button"
                onClick={dismissGoalNotification}
                className="text-zinc-400 hover:text-white p-0.5 rounded hover:bg-white/[0.05]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {goalNotification.homeTeam} {goalNotification.score.home} - {goalNotification.score.away} {goalNotification.awayTeam}
                </h4>
                <p className="text-xs text-emerald-300 font-medium mt-0.5">
                  Muallif: {goalNotification.scorer}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const targetMatch = matches.find((m) => m.id === goalNotification.matchId);
                  if (targetMatch) {
                    setSelectedMatch(targetMatch);
                  }
                  dismissGoalNotification();
                }}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-3 py-1.5 shrink-0 transition-colors shadow-md shadow-emerald-500/20"
              >
                Ko'rish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* O'yin Markazi (MatchCenterDrawer) */}
      <MatchCenterDrawer
        match={selectedMatch}
        isOpen={Boolean(selectedMatch)}
        onClose={() => setSelectedMatch(null)}
        isFavorite={selectedMatch ? favorites.has(selectedMatch.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* API Kalit Modali */}
      {isApiModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setIsApiModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#0c101c] border border-white/[0.1] p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">API-Football Ulash</h3>
                  <p className="text-[10px] text-zinc-400">api-sports.io kalitingizni kiriting</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsApiModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Real vaqtda butun dunyo ligalari va O'zbekiston Superligasi o'yinlarini jonli yangilab borish uchun
              shaxsiy API kalitingizni kiriting:
            </p>

            <input
              type="text"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="API kalitingizni bu yerga joylang..."
              className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none font-mono"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCustomApiKey('');
                  setIsApiModalOpen(false);
                }}
                className="rounded-xl px-3 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Demo rejimga qaytish
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-black transition-colors shadow-md shadow-emerald-500/20"
              >
                Saqlash va Ulash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobil Pastki Navigatsiya Bari (Bottom Navigation Bar) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07090e]/95 backdrop-blur-xl border-t border-white/[0.05] px-4 py-1.5 flex items-center justify-around">
        <button
          type="button"
          onClick={() => {
            setMobileTab('matches');
            setActiveTab('ALL');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            mobileTab === 'matches' && activeTab !== 'NEWS' ? 'text-emerald-400 font-bold' : 'text-zinc-500'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>O'yinlar</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('standings')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            mobileTab === 'standings' ? 'text-emerald-400 font-bold' : 'text-zinc-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Jadvallar</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMobileTab('news');
            setActiveTab('NEWS');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'NEWS' ? 'text-emerald-400 font-bold' : 'text-zinc-500'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Yangiliklar</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMobileTab('favorites');
            setActiveTab('FAVORITES');
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
            activeTab === 'FAVORITES' ? 'text-amber-400 font-bold' : 'text-zinc-500'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Sevimlilar</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
