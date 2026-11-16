import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import type { TeamCrestDetails } from '../types/football';

export interface TeamCrestProps {
  name: string;
  logoUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  crestDetails?: TeamCrestDetails;
  className?: string;
}

// Klub nomiga qarab unikal tabiiy rang palitrasi
const getTeamPalette = (name: string, crestDetails?: TeamCrestDetails) => {
  if (crestDetails?.primaryColor && crestDetails?.secondaryColor) {
    return {
      bg: `linear-gradient(135deg, ${crestDetails.primaryColor}, ${crestDetails.secondaryColor})`,
      text: crestDetails.textColor || '#ffffff',
    };
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const palettes = [
    { bg: 'linear-gradient(135deg, #1d4ed8, #0f172a)', text: '#bfdbfe' }, // Blue (Paxtakor, Man City, Real Madrid)
    { bg: 'linear-gradient(135deg, #059669, #022c22)', text: '#a7f3d0' }, // Emerald (Nasaf, Navbahor)
    { bg: 'linear-gradient(135deg, #dc2626, #450a0a)', text: '#fecaca' }, // Red (Arsenal, Liverpool)
    { bg: 'linear-gradient(135deg, #d97706, #451a03)', text: '#fde68a' }, // Amber (Neftchi, Roma)
    { bg: 'linear-gradient(135deg, #7c3aed, #2e1065)', text: '#ddd6fe' }, // Purple
    { bg: 'linear-gradient(135deg, #0891b2, #083344)', text: '#a5f3fc' }, // Cyan
    { bg: 'linear-gradient(135deg, #e11d48, #4c0519)', text: '#fecdd3' }, // Rose (Atletico, Bayern)
  ];

  const index = Math.abs(hash) % palettes.length;
  return palettes[index];
};

export const TeamCrest: React.FC<TeamCrestProps> = ({
  name,
  logoUrl,
  size = 'md',
  crestDetails,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Tabiiy o'lchamlar — ortiqcha chegaralarsiz toza ko'rinish
  const sizeClasses = {
    xs: 'h-4 w-4 min-w-4 text-[8px]',
    sm: 'h-5 w-5 min-w-5 text-[9px]',
    md: 'h-6 w-6 min-w-6 text-[10px]',
    lg: 'h-8 w-8 min-w-8 text-xs font-semibold',
    xl: 'h-12 w-12 min-w-12 text-sm font-bold',
    '2xl': 'h-16 w-16 min-w-16 text-base font-bold',
  };

  const getInitials = (teamName: string) => {
    if (!teamName) return 'FC';
    const words = teamName.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return teamName.slice(0, 2).toUpperCase();
  };

  const palette = getTeamPalette(name || 'Jamoa', crestDetails);

  // Haqiqiy rasm — ortiqcha qalin ramkalar va qopqoqlarsiz, toza logotip
  if (logoUrl && !imageError) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`${sizeClasses[size]} shrink-0 object-contain select-none drop-shadow-sm ${className}`}
        loading="lazy"
        onError={() => setImageError(true)}
      />
    );
  }

  // Zaxira: Nafis, zamonaviy tekis gerb
  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
      }}
      className={`relative inline-flex items-center justify-center rounded-md shrink-0 font-bold select-none transition-transform ${sizeClasses[size]} ${className}`}
      title={name}
    >
      <Shield className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-15 pointer-events-none" />
      <span className="relative z-10 leading-none tracking-tight">
        {getInitials(name)}
      </span>
      {crestDetails?.stars && crestDetails.stars > 0 && (
        <span className="absolute -top-1 -right-0.5 text-[7px] text-amber-300">★</span>
      )}
    </div>
  );
};
