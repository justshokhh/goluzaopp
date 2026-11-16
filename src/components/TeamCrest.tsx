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

// Klub nomiga qarab unikal gradient va ranglar palitrasi
const getTeamPalette = (name: string, crestDetails?: TeamCrestDetails) => {
  if (crestDetails?.primaryColor && crestDetails?.secondaryColor) {
    return {
      bg: `linear-gradient(135deg, ${crestDetails.primaryColor}, ${crestDetails.secondaryColor})`,
      border: crestDetails.accentColor || crestDetails.primaryColor,
      text: crestDetails.textColor || '#ffffff',
    };
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const palettes = [
    { bg: 'linear-gradient(135deg, #1e3a8a, #0f172a)', border: '#3b82f6', text: '#93c5fd' }, // Blue (Paxtakor, Man City, Real Madrid)
    { bg: 'linear-gradient(135deg, #065f46, #022c22)', border: '#10b981', text: '#6ee7b7' }, // Emerald (Nasaf, Navbahor)
    { bg: 'linear-gradient(135deg, #991b1b, #450a0a)', border: '#ef4444', text: '#fca5a5' }, // Red (Arsenal, Liverpool, Lokomotiv)
    { bg: 'linear-gradient(135deg, #b45309, #451a03)', border: '#f59e0b', text: '#fde68a' }, // Amber (Neftchi, Roma)
    { bg: 'linear-gradient(135deg, #581c87, #2e1065)', border: '#a855f7', text: '#e9d5ff' }, // Purple
    { bg: 'linear-gradient(135deg, #0e7490, #083344)', border: '#06b6d4', text: '#a5f3fc' }, // Cyan
    { bg: 'linear-gradient(135deg, #be123c, #4c0519)', border: '#f43f5e', text: '#fecdd3' }, // Rose (Atletico, Bayern)
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

  const sizeClasses = {
    xs: 'h-4 w-4 text-[8px]',
    sm: 'h-5 w-5 text-[9px]',
    md: 'h-6 w-6 text-[10px]',
    lg: 'h-8 w-8 text-xs font-bold',
    xl: 'h-11 w-11 text-sm font-black',
    '2xl': 'h-14 w-14 text-base font-black',
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

  // Haqiqiy rasm mavjud bo'lsa va xato bo'lmasa
  if (logoUrl && !imageError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-[#131722] p-0.5 ring-1 ring-white/10 ${sizeClasses[size]} ${className}`}
      >
        <img
          src={logoUrl}
          alt={name}
          className="h-full w-full object-contain rounded-full"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Zaxira: Apple Sports / SofaScore uslubidagi professional SVG gerb
  return (
    <div
      style={{
        background: palette.bg,
        borderColor: `${palette.border}66`,
        color: palette.text,
      }}
      className={`relative inline-flex items-center justify-center rounded-lg border shadow-sm shrink-0 font-extrabold select-none transition-transform hover:scale-105 ${sizeClasses[size]} ${className}`}
      title={name}
    >
      <Shield className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-20 pointer-events-none" />
      <span className="relative z-10 leading-none tracking-tight drop-shadow-sm">
        {getInitials(name)}
      </span>
      {crestDetails?.stars && crestDetails.stars > 0 && (
        <span className="absolute -top-1 -right-0.5 text-[8px] text-amber-400">★</span>
      )}
    </div>
  );
};
