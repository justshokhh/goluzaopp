import { useState, useMemo } from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import { Header, type FilterType } from './components/Header';
import { TournamentGroup } from './components/TournamentGroup';
import { MatchRow } from './components/MatchRow';
import { MatchCenterDrawer } from './components/MatchCenterDrawer';
import { StandingsWidget, type TournamentKey } from './components/StandingsWidget';
import { mockMatches } from './services/mockData';
import type { Match } from './types/football';

type TournamentFilter = 'all' | 'uz_superliga' | 'ucl' | 'uel' | 'premier_league' | 'laliga';

interface TournamentTab {
  id: TournamentFilter;
  name: string;
  dotColor?: string;
}

const TOURNAMENT_TABS: TournamentTab[] = [
  { id: 'all', name: 'Barchasi' },
  { id: 'uz_superliga', name: 'Superliga', dotColor: 'bg-emerald-400' },
  { id: 'ucl', name: 'Champions League', dotColor: 'bg-sky-400' },
  { id: 'uel', name: 'Europa League', dotColor: 'bg-orange-400' },
  { id: 'premier_league', name: 'Premier League', dotColor: 'bg-pink-400' },
  { id: 'laliga', name: 'La Liga', dotColor: 'bg-rose-400' },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');
  const [tournamentFilter, setTournamentFilter] = useState<TournamentFilter>('all');
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set(['match-1', 'match-ucl-1']));
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

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

  const liveCount = useMemo(() => mockMatches.filter((m) => m.status === 'LIVE').length, []);
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
    return mockMatches.filter((match) => {
      if (statusFilter === 'live' && match.status !== 'LIVE') return false;
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
  }, [searchQuery, statusFilter, tournamentFilter, favorites]);

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
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-white">
      {/* Yuqori Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        liveCount={liveCount}
        favoritesCount={favoritesCount}
      />

      {/* Asosiy qism */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3.5 flex-1 w-full space-y-3.5">
        {/* Turnirlar navigatsiyasi — Apple Sports minimalizm uslubida */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
          {TOURNAMENT_TABS.map((tab) => {
            const isActive = tournamentFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTournamentFilter(tab.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold'
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

        {/* 2 ustunli tuzilma */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chap ustun: Turnirlar va Zich o'yin qatorlari */}
          <div className="lg:col-span-2 space-y-3">
            {groupedMatches.length === 0 ? (
              <div className="rounded-2xl bg-[#0c0f17] border border-white/[0.04] p-8 text-center">
                <Trophy className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
                <p className="text-xs font-medium text-zinc-300">O'yinlar topilmadi</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Qidiruv so'rovi yoki filtrlarni o'zgartirib ko'ring.
                </p>
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
          <div className="space-y-3.5">
            <StandingsWidget
              initialTournament={
                tournamentFilter !== 'all' ? (tournamentFilter as TournamentKey) : 'uz_superliga'
              }
            />

            {/* SofaScore & Apple Sports Ma'lumot Vidjeti */}
            <div className="rounded-2xl bg-[#0c0f17] border border-white/[0.04] p-3.5 text-xs text-zinc-400 space-y-2">
              <div className="flex items-center justify-between text-white font-medium border-b border-white/[0.04] pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                  <Sparkles className="w-3.5 h-3.5" /> UzScore Minimalist
                </span>
                <span className="text-[10px] text-zinc-500">v3.2</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-[11px]">
                Apple Sports va SofaScore estetikasidagi toza tipografika, har bir ligaga mos sof gradientlar va ixcham qatorlar.
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
    </div>
  );
}

export default App;
