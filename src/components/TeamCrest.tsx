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
    { bg: 'linear-gradient(135deg, #1e3a8a, #0f172a)', text: '#bfdbfe' },
    { bg: 'linear-gradient(135deg, #065f46, #022c22)', text: '#a7f3d0' },
    { bg: 'linear-gradient(135deg, #b91c1c, #450a0a)', text: '#fecaca' },
    { bg: 'linear-gradient(135deg, #b45309, #451a03)', text: '#fde68a' },
    { bg: 'linear-gradient(135deg, #6d28d9, #2e1065)', text: '#ddd6fe' },
    { bg: 'linear-gradient(135deg, #0e7490, #083344)', text: '#a5f3fc' },
    { bg: 'linear-gradient(135deg, #be123c, #4c0519)', text: '#fecdd3' },
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

  // Tabiiy ixcham o'lchamlar (Minimalistik)
  const sizeClasses = {
    xs: 'h-3.5 w-3.5 min-w-3.5 text-[7px]',
    sm: 'h-4.5 w-4.5 min-w-4.5 text-[8.5px]',
    md: 'h-5.5 w-5.5 min-w-5.5 text-[9.5px]',
    lg: 'h-7 w-7 min-w-7 text-[11px] font-semibold',
    xl: 'h-11 w-11 min-w-11 text-xs font-bold',
    '2xl': 'h-14 w-14 min-w-14 text-sm font-bold',
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

  // Haqiqiy rasm — mutlaqo hoshiyasiz, shaffof, tabiiy
  if (logoUrl && !imageError) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`${sizeClasses[size]} shrink-0 object-contain select-none ${className}`}
        loading="lazy"
        onError={() => setImageError(true)}
      />
    );
  }

  // Zaxira: Juda toza, nafis minimalist nishoncha
  return (
    <div
      style={{
        background: palette.bg,
        color: palette.text,
      }}
      className={`relative inline-flex items-center justify-center rounded-[5px] shrink-0 font-bold select-none ${sizeClasses[size]} ${className}`}
      title={name}
    >
      <Shield className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-15 pointer-events-none" />
      <span className="relative z-10 leading-none tracking-tight">
        {getInitials(name)}
      </span>
    </div>
  );
};
