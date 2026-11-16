import { useState, useMemo, useEffect } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { Header, type FilterType } from './components/Header';
import { TournamentGroup } from './components/TournamentGroup';
import { MatchRow } from './components/MatchRow';
import { MatchCenterDrawer } from './components/MatchCenterDrawer';
import { StandingsWidget, type TournamentKey } from './components/StandingsWidget';
import { useFootballStore } from './store/useFootballStore';
import type { Match } from './types/football';

type TournamentFilter = 'all' | 'uz_superliga' | 'ucl' | 'uel' | 'premier_league' | 'laliga';

interface TournamentTab {
  id: TournamentFilter;
  name: string;
  badge: string;
  activeBg: string;
}

const TOURNAMENT_TABS: TournamentTab[] = [
  {
    id: 'all',
    name: 'Barchasi',
    badge: 'Hammasi',
    activeBg: 'bg-white/10 text-white font-semibold',
  },
  {
    id: 'uz_superliga',
    name: 'Superliga',
    badge: 'UZB',
    activeBg: 'bg-emerald-500/20 text-[#10b981] font-semibold',
  },
  {
    id: 'ucl',
    name: 'Champions League',
    badge: 'UCL',
    activeBg: 'bg-sky-500/20 text-sky-300 font-semibold',
  },
  {
    id: 'uel',
    name: 'Europa League',
    badge: 'UEL',
    activeBg: 'bg-orange-500/20 text-orange-300 font-semibold',
  },
  {
    id: 'premier_league',
    name: 'Premier League',
    badge: 'EPL',
    activeBg: 'bg-pink-500/20 text-pink-300 font-semibold',
  },
  {
    id: 'laliga',
    name: 'La Liga',
    badge: 'ESP',
    activeBg: 'bg-red-500/20 text-red-300 font-semibold',
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');
  const [tournamentFilter, setTournamentFilter] = useState<TournamentFilter>('all');
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set(['match-1', 'match-ucl-1']));
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Store ma'lumotlari va actionlari
  const matches = useFootballStore((s) => s.matches);
  const isRealApiActive = useFootballStore((s) => s.isRealApiActive);
  const isLoadingMatches = useFootballStore((s) => s.isLoadingMatches);
  const startPolling = useFootballStore((s) => s.startPolling);
  const stopPolling = useFootballStore((s) => s.stopPolling);
  const fetchRealMatches = useFootballStore((s) => s.fetchRealMatches);
  const goalNotification = useFootballStore((s) => s.goalNotification);

  // Jonli pollingni boshlash
  useEffect(() => {
    startPolling();
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  const toggleFavorite = (matchId: string | number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }
      return next;
    });
  };

  const liveCount = useMemo(
    () => matches.filter((m) => m.status === 'LIVE' || m.status === 'HT').length,
    [matches]
  );
  const favoritesCount = favorites.size;

  const getMatchTournamentKey = (match: Match): TournamentFilter => {
    const id = String(match.league?.id || match.tournamentId || '').toLowerCase();
    const name = String(match.league?.name || match.tournamentName || '').toLowerCase();
    if (id.includes('superliga') || name.includes('superliga') || id.includes('uz')) return 'uz_superliga';
    if (id.includes('ucl') || name.includes('champions')) return 'ucl';
    if (id.includes('uel') || name.includes('europa')) return 'uel';
    if (id.includes('epl') || id.includes('premier') || name.includes('premier')) return 'premier_league';
    if (id.includes('laliga') || name.includes('la liga') || name.includes('laliga')) return 'laliga';
    return 'all';
  };

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const isLiveMatch = match.status === 'LIVE' || match.status === 'HT';
      if (statusFilter === 'live' && !isLiveMatch) return false;
      if (statusFilter === 'favorites' && !favorites.has(match.id)) return false;

      if (tournamentFilter !== 'all') {
        const matchTournament = getMatchTournamentKey(match);
        if (matchTournament !== tournamentFilter) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const homeName = match.homeTeam.name.toLowerCase();
        const awayName = match.awayTeam.name.toLowerCase();
        const leagueName = (match.league?.name || match.tournamentName || '').toLowerCase();
        return homeName.includes(query) || awayName.includes(query) || leagueName.includes(query);
      }

      return true;
    });
  }, [matches, searchQuery, statusFilter, tournamentFilter, favorites]);

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

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans selection:bg-[#10b981]/25 selection:text-white">
      {/* Yuqori Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        liveCount={liveCount}
        favoritesCount={favoritesCount}
        isRealApi={isRealApiActive}
        isLoading={isLoadingMatches}
        onRefresh={() => fetchRealMatches(true)}
      />

      {/* Asosiy qism */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 w-full space-y-4">
        {/* Turnirlar navigatsiyasi — toza pill tugmalar, ortiqcha hoshiyalarsiz */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {TOURNAMENT_TABS.map((tab) => {
            const isActive = tournamentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTournamentFilter(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? tab.activeBg
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <span>{tab.name}</span>
                <span className="text-[10px] opacity-75 font-normal">
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2 ustunli tuzilma */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Chap ustun: Turnirlar va Zich o'yin qatorlari */}
          <div className="lg:col-span-2 space-y-3.5">
            {groupedMatches.length === 0 ? (
              <div className="rounded-2xl bg-[#0d111a] border border-white/[0.05] p-8 text-center">
                <Trophy className="mx-auto h-10 w-10 text-slate-600 mb-2.5" />
                <p className="text-sm font-medium text-slate-300">O'yinlar topilmadi</p>
                <p className="text-xs text-slate-500 mt-1">
                  {statusFilter === 'live' && tournamentFilter !== 'all' && liveCount > 0
                    ? `Tanlangan turnirda jonli o'yin yo'q, lekin boshqa turnirlarda ${liveCount} ta jonli o'yin bormoqda.`
                    : "Qidiruv so'rovi yoki filtrlarni o'zgartirib ko'ring."}
                </p>
                {statusFilter === 'live' && tournamentFilter !== 'all' && liveCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setTournamentFilter('all')}
                    className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-3.5 py-1.5 text-xs font-semibold text-[#10b981] hover:bg-emerald-500/30 transition-colors"
                  >
                    Barcha jonli o'yinlarni ko'rish ({liveCount} ta)
                  </button>
                )}
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
                    <div className="divide-y divide-white/[0.03]">
                      {group.matches.map((match) => (
                        <MatchRow
                          key={match.id}
                          match={match}
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

          {/* O'ng ustun: Turnir Jadvali va Axborot bloki */}
          <div className="space-y-4">
            <StandingsWidget
              initialTournament={
                tournamentFilter !== 'all' ? (tournamentFilter as TournamentKey) : 'uz_superliga'
              }
            />

            {/* SofaScore & Apple Sports Ma'lumot Vidjeti */}
            <div className="rounded-2xl bg-[#0d111a] border border-white/[0.05] p-4 text-xs text-slate-400 space-y-2.5">
              <div className="flex items-center justify-between text-white font-medium border-b border-white/[0.05] pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Sparkles className="w-4 h-4" /> UzScore Pro
                </span>
                <span className="text-[11px] text-slate-500">Apple Sports UI</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Turnirlar o'z rasmiy ranglariga moslangan: UCL chuqur kosmik-ko'k, UEL olovrang,
                Superliga zumrad-yashil, EPL binafsha-neon, La Liga granat-qizil.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* O'yin Markazi */}
      <MatchCenterDrawer
        match={selectedMatch}
        isOpen={Boolean(selectedMatch)}
        onClose={() => setSelectedMatch(null)}
        isFavorite={selectedMatch ? favorites.has(selectedMatch.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Jonli Gol ("GOOOOL!") Xabarnomasi */}
      {goalNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 bg-[#131722] border border-[#10b981] p-4 rounded-2xl shadow-2xl animate-bounce">
          <div className="h-3.5 w-3.5 rounded-full bg-[#10b981] animate-ping" />
          <div>
            <div className="text-xs font-black text-[#10b981] uppercase tracking-wider">
              GOOOOL! ({goalNotification.minute}')
            </div>
            <div className="text-sm font-bold text-white">
              {goalNotification.homeTeam} {goalNotification.score.home} - {goalNotification.score.away} {goalNotification.awayTeam}
            </div>
            <div className="text-xs text-slate-400">
              Muallif: <span className="text-slate-200">{goalNotification.scorer}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
