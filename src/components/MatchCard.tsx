import React from 'react';
import type { Match } from '../types/football';
import { MatchRow } from './MatchRow';

export interface MatchCardProps {
  match: Match;
  isFavorite?: boolean;
  onToggleFavorite?: (matchId: string | number) => void;
  onSelectMatch?: (match: Match) => void;
  className?: string;
}

/**
 * MatchCard — Orqaga moslik uchun SofaScore zich MatchRow komponentining sarmoyasi
 */
export const MatchCard: React.FC<MatchCardProps> = (props) => {
  return <MatchRow {...props} />;
};

export { MatchRow };
