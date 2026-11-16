import React from 'react';
import type { StandingRow } from '../types/football';
import { StandingsWidget, type TournamentKey } from './StandingsWidget';

export interface StandingsTableProps {
  standings?: StandingRow[];
  title?: string;
  season?: string;
  onTeamClick?: (teamId: string | number) => void;
  tournamentKey?: TournamentKey;
}

/**
 * StandingsTable — Orqaga moslik uchun yangi ko'p turnirli StandingsWidget sarmoyasi
 */
export const StandingsTable: React.FC<StandingsTableProps> = ({
  onTeamClick,
  tournamentKey = 'uz_superliga',
}) => {
  return (
    <StandingsWidget
      initialTournament={tournamentKey}
      onTeamClick={onTeamClick}
    />
  );
};
