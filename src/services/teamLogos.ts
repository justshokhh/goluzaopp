/**
 * UzScore — Haqiqiy va Professional Futbol Logolari Tizimi
 * API-Sports CDN (Yevropa top klublari & turnirlar) va
 * O'zbekiston Superligasi 16 ta klubi uchun Custom SVG Emblema Generator.
 *
 * Hech qachon singan rasm (broken image) yoki ui-avatars ishlatilmaydi!
 */

// ============================================================================
// 1. API-SPORTS RASMIY CDN BAZASI (YEVROPA TOP KLUBLARI VA TURNIRLAR)
// ============================================================================

export const API_SPORTS_BASE = 'https://media.api-sports.io/football';

/**
 * Top Yevropa klublarining rasmiy API-Sports ID-lari
 */
export const EUROPEAN_TEAM_IDS: Record<string, number> = {
  // Ispaniya (La Liga)
  'real-madrid': 541,
  'real madrid': 541,
  barcelona: 529,
  'fc barcelona': 529,
  'atletico-madrid': 530,
  'atletico madrid': 530,
  sevilla: 536,
  'athletic-bilbao': 531,
  'athletic bilbao': 531,
  valencia: 532,
  villarreal: 533,
  'real-sociedad': 548,
  'real sociedad': 548,
  girona: 547,
  betis: 543,
  'real betis': 543,

  // Angliya (Premier League)
  'manchester-city': 50,
  'man city': 50,
  'manchester city': 50,
  arsenal: 42,
  liverpool: 40,
  'manchester-united': 33,
  'man united': 33,
  'manchester united': 33,
  chelsea: 49,
  tottenham: 47,
  'tottenham hotspur': 47,
  'aston-villa': 66,
  'aston villa': 66,
  'newcastle-united': 34,
  newcastle: 34,
  brighton: 51,
  west_ham: 48,
  'west ham': 48,

  // Germaniya (Bundesliga)
  'bayern-munich': 157,
  'bayern munich': 157,
  bayern: 157,
  'borussia-dortmund': 165,
  'borussia dortmund': 165,
  dortmund: 165,
  'bayer-leverkusen': 168,
  'bayer leverkusen': 168,
  leverkusen: 168,
  'rb-leipzig': 173,
  'rb leipzig': 173,
  leipzig: 173,
  stuttgart: 172,
  frankfurt: 169,

  // Italiya (Serie A)
  inter: 505,
  'inter milan': 505,
  juventus: 496,
  milan: 489,
  'ac milan': 489,
  roma: 497,
  'as roma': 497,
  napoli: 492,
  lazio: 487,
  atalanta: 499,
  fiorentina: 502,

  // Fransiya (Ligue 1)
  psg: 85,
  'paris saint germain': 85,
  'paris saint-germain': 85,
  monaco: 91,
  marseille: 81,
  lyon: 80,
  lille: 79,
};

/**
 * Rasmiy turnirlar ID-lari
 */
export const LEAGUE_IDS: Record<string, number> = {
  ucl: 2, // UEFA Champions League
  'champions-league': 2,
  'uefa-champions-league': 2,
  uel: 3, // UEFA Europa League
  'europa-league': 3,
  'uefa-europa-league': 3,
  uel_conf: 848, // UEFA Europa Conference League
  conference_league: 848,
  premier_league: 39, // Premier League
  epl: 39,
  laliga: 140, // La Liga
  'la-liga': 140,
  serie_a: 135, // Serie A
  'serie-a': 135,
  bundesliga: 78,
  ligue_1: 61,
  'ligue-1': 61,
  uz_superliga: 353, // O'zbekiston Superligasi
  superliga: 353,
};

// ============================================================================
// 2. O'ZBEKISTON SUPERLIGASI 16 TA KLUBI EMBLEMALARI VA KONFIGURATSIYASI
// ============================================================================

export interface ClubCrestConfig {
  id: string;
  name: string;
  shortName: string;
  year: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  stars: number;
  shieldShape: 'classic' | 'pointed' | 'round' | 'diamond' | 'crown';
  symbolType:
    | 'cotton'
    | 'falcon'
    | 'dragon'
    | 'oil-derrick'
    | 'mining'
    | 'eagle'
    | 'letter-d'
    | 'lion'
    | 'sun'
    | 'swallow'
    | 'minaret'
    | 'flame'
    | 'fortress'
    | 'crown'
    | 'train'
    | 'monogram';
  pattern: 'stripes' | 'split' | 'solid' | 'cross' | 'diagonal';
}

/**
 * O'zbekiston Superligasining 16 ta professional klubi
 */
export const UZ_SUPERLIGA_CLUBS: Record<string, ClubCrestConfig> = {
  paxtakor: {
    id: 'paxtakor',
    name: 'Paxtakor Toshkent',
    shortName: 'PAK',
    year: '1956',
    primaryColor: '#003399', // Moviy / ko'k
    secondaryColor: '#fdb913', // Oltin sariq
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 3,
    shieldShape: 'classic',
    symbolType: 'cotton',
    pattern: 'stripes',
  },
  navbahor: {
    id: 'navbahor',
    name: 'Navbahor Namangan',
    shortName: 'NAV',
    year: '1978',
    primaryColor: '#c8102e', // To'q qizil
    secondaryColor: '#ffffff', // Oq
    accentColor: '#10b981',
    textColor: '#ffffff',
    stars: 1,
    shieldShape: 'pointed',
    symbolType: 'falcon',
    pattern: 'split',
  },
  nasaf: {
    id: 'nasaf',
    name: 'Nasaf Qarshi',
    shortName: 'NAS',
    year: '1986',
    primaryColor: '#002f6c', // To'q ko'k
    secondaryColor: '#ffffff', // Oq
    accentColor: '#e11d48', // Qizil ajdaho alangasi
    textColor: '#ffffff',
    stars: 1,
    shieldShape: 'round',
    symbolType: 'dragon',
    pattern: 'diagonal',
  },
  neftchi: {
    id: 'neftchi',
    name: 'Neftchi Farg‘ona',
    shortName: 'NEF',
    year: '1962',
    primaryColor: '#006a4e', // Neftchi yashili
    secondaryColor: '#ffffff', // Oq
    accentColor: '#f59e0b', // Oltin
    textColor: '#ffffff',
    stars: 1,
    shieldShape: 'classic',
    symbolType: 'oil-derrick',
    pattern: 'stripes',
  },
  okmk: {
    id: 'okmk',
    name: 'OKMK Olmaliq',
    shortName: 'AGMK',
    year: '2004',
    primaryColor: '#f59e0b', // Konchilar oltini
    secondaryColor: '#1e3a8a', // To'q ko'k
    accentColor: '#ffffff',
    textColor: '#1e3a8a',
    stars: 0,
    shieldShape: 'diamond',
    symbolType: 'mining',
    pattern: 'split',
  },
  sogdiyona: {
    id: 'sogdiyona',
    name: 'So‘g‘diyona Jizzax',
    shortName: 'SOG',
    year: '1970',
    primaryColor: '#15803d', // Yashil
    secondaryColor: '#eab308', // Sariq
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'classic',
    symbolType: 'eagle',
    pattern: 'stripes',
  },
  dinamo: {
    id: 'dinamo',
    name: 'Dinamo Samarqand',
    shortName: 'DIN',
    year: '1960',
    primaryColor: '#0284c7', // Samarqand moviysi
    secondaryColor: '#ffffff',
    accentColor: '#f59e0b',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'classic',
    symbolType: 'letter-d',
    pattern: 'diagonal',
  },
  surxon: {
    id: 'surxon',
    name: 'Surxon Termiz',
    shortName: 'SUR',
    year: '1968',
    primaryColor: '#d97706', // Qum / oltin sariq
    secondaryColor: '#991b1b', // To'q qizil
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'pointed',
    symbolType: 'lion',
    pattern: 'split',
  },
  andijon: {
    id: 'andijon',
    name: 'Andijon FK',
    shortName: 'AND',
    year: '1964',
    primaryColor: '#1d4ed8', // Moviy
    secondaryColor: '#ffffff', // Oq
    accentColor: '#dc2626', // Qizil
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'pointed',
    symbolType: 'falcon',
    pattern: 'stripes',
  },
  qizilqum: {
    id: 'qizilqum',
    name: 'Qizilqum Zarafshon',
    shortName: 'QIZ',
    year: '1967',
    primaryColor: '#b91c1c', // Qizil
    secondaryColor: '#fbbf24', // Oltin qum
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'round',
    symbolType: 'sun',
    pattern: 'split',
  },
  bunyodkor: {
    id: 'bunyodkor',
    name: 'Bunyodkor Toshkent',
    shortName: 'BUN',
    year: '2005',
    primaryColor: '#0284c7', // Ko'k
    secondaryColor: '#ffffff', // Oq
    accentColor: '#fbbf24', // Oltin
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'classic',
    symbolType: 'swallow',
    pattern: 'stripes',
  },
  buxoro: {
    id: 'buxoro',
    name: 'Buxoro FK',
    shortName: 'BUX',
    year: '1960',
    primaryColor: '#0f766e', // Zumrad / zangori
    secondaryColor: '#ffffff',
    accentColor: '#d97706', // Buxoro g'ishti
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'classic',
    symbolType: 'minaret',
    pattern: 'diagonal',
  },
  mashal: {
    id: 'mashal',
    name: 'Mash‘al Muborak',
    shortName: 'MAS',
    year: '1971',
    primaryColor: '#0369a1', // Ko'k
    secondaryColor: '#ea580c', // Alanga olovi
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'pointed',
    symbolType: 'flame',
    pattern: 'split',
  },
  xorazm: {
    id: 'xorazm',
    name: 'Xorazm Urganch',
    shortName: 'XOR',
    year: '1989',
    primaryColor: '#1e40af', // Moviy
    secondaryColor: '#facc15', // Qadimiy quyosh
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'classic',
    symbolType: 'fortress',
    pattern: 'stripes',
  },
  qoqon: {
    id: 'qoqon',
    name: 'Qo‘qon-1912',
    shortName: 'QOQ',
    year: '1912',
    primaryColor: '#581c87', // To'q binafsha (tarixiy saroy)
    secondaryColor: '#f97316', // Olovrang
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 0,
    shieldShape: 'crown',
    symbolType: 'crown',
    pattern: 'split',
  },
  lokomotiv: {
    id: 'lokomotiv',
    name: 'Lokomotiv Toshkent',
    shortName: 'LOK',
    year: '2002',
    primaryColor: '#dc2626', // Qizil
    secondaryColor: '#15803d', // Yashil
    accentColor: '#ffffff',
    textColor: '#ffffff',
    stars: 1,
    shieldShape: 'round',
    symbolType: 'train',
    pattern: 'stripes',
  },
};

// ============================================================================
// 3. PROFESSIONAL CUSTOM SVG GENERATOR (100% OFFLINE VA ISHONCHLI)
// ============================================================================

/**
 * Qalqon shakli yo'llari (SVG Path)
 */
function getShieldPath(shape: ClubCrestConfig['shieldShape']): string {
  switch (shape) {
    case 'pointed':
      return 'M 10 15 Q 10 8 18 8 L 82 8 Q 90 8 90 15 L 90 55 Q 90 80 50 96 Q 10 80 10 55 Z';
    case 'round':
      return 'M 50 6 C 75 6 92 22 92 50 C 92 78 74 94 50 94 C 26 94 8 78 8 50 C 8 22 25 6 50 6 Z';
    case 'diamond':
      return 'M 50 6 L 92 50 L 50 94 L 8 50 Z';
    case 'crown':
      return 'M 10 24 L 28 12 L 50 20 L 72 12 L 90 24 L 88 64 Q 86 86 50 95 Q 14 86 12 64 Z';
    case 'classic':
    default:
      return 'M 12 12 Q 12 8 18 8 L 82 8 Q 88 8 88 12 L 88 48 Q 88 78 50 94 Q 12 78 12 48 Z';
  }
}

/**
 * Ichki ramzlar (Paxta, Ajdaho, Olov, Konchilar va h.k.)
 */
function getSymbolSvg(symbol: ClubCrestConfig['symbolType'], color: string): string {
  switch (symbol) {
    case 'cotton':
      // Paxtakor paxta chanog'i
      return `
        <circle cx="50" cy="48" r="8" fill="${color}" opacity="0.95" />
        <circle cx="42" cy="44" r="6" fill="${color}" opacity="0.85" />
        <circle cx="58" cy="44" r="6" fill="${color}" opacity="0.85" />
        <circle cx="44" cy="55" r="6" fill="${color}" opacity="0.85" />
        <circle cx="56" cy="55" r="6" fill="${color}" opacity="0.85" />
        <path d="M 50 56 Q 50 64 46 66" stroke="#fdb913" stroke-width="2.5" fill="none" stroke-linecap="round" />
      `;
    case 'dragon':
      // Nasaf Ajdari
      return `
        <path d="M 38 42 Q 50 34 62 40 Q 66 48 56 56 Q 48 64 52 70" fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" />
        <circle cx="44" cy="38" r="3" fill="#facc15" />
        <path d="M 58 44 L 66 42 L 62 48 Z" fill="${color}" />
      `;
    case 'falcon':
    case 'eagle':
      // Navbahor va Andijon Lochin/Burgut qanotlari
      return `
        <path d="M 28 42 Q 50 32 72 42 Q 62 58 50 68 Q 38 58 28 42 Z" fill="${color}" opacity="0.9" />
        <circle cx="50" cy="38" r="3" fill="#ffffff" />
      `;
    case 'oil-derrick':
      // Neftchi Farg'ona minorasi
      return `
        <path d="M 45 34 L 55 34 L 58 66 L 42 66 Z" fill="none" stroke="${color}" stroke-width="2.5" />
        <line x1="44" y1="44" x2="56" y2="56" stroke="${color}" stroke-width="1.5" />
        <line x1="56" y1="44" x2="44" y2="56" stroke="${color}" stroke-width="1.5" />
        <polygon points="50,28 46,34 54,34" fill="${color}" />
      `;
    case 'mining':
      // OKMK Bolg'alari
      return `
        <path d="M 38 42 L 62 62 M 62 42 L 38 62" stroke="${color}" stroke-width="4" stroke-linecap="round" />
        <rect x="34" y="38" width="8" height="6" fill="${color}" rx="1" />
        <rect x="58" y="38" width="8" height="6" fill="${color}" rx="1" />
      `;
    case 'letter-d':
      // Dinamo "D" harfi
      return `
        <path d="M 42 36 L 50 36 C 58 36 62 42 62 50 C 62 58 58 64 50 64 L 42 64 Z" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round" />
        <line x1="42" y1="36" x2="42" y2="64" stroke="${color}" stroke-width="5" />
      `;
    case 'lion':
      // Surxon sher / qoplon
      return `
        <circle cx="50" cy="48" r="12" fill="none" stroke="${color}" stroke-width="3.5" />
        <path d="M 44 46 L 50 54 L 56 46" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      `;
    case 'flame':
      // Mash'al Muborak alangasi
      return `
        <path d="M 50 32 C 55 40 62 48 58 58 C 55 64 45 64 42 58 C 38 52 46 44 50 32 Z" fill="${color}" />
        <circle cx="50" cy="54" r="3" fill="#ffffff" />
      `;
    case 'crown':
      // Qo'qon toji
      return `
        <polygon points="36,44 42,56 50,42 58,56 64,44 62,64 38,64" fill="${color}" stroke="#ffffff" stroke-width="1" />
      `;
    case 'train':
      // Lokomotiv poyezdi
      return `
        <rect x="38" y="44" width="24" height="18" rx="2" fill="${color}" />
        <circle cx="44" cy="62" r="3" fill="#ffffff" />
        <circle cx="56" cy="62" r="3" fill="#ffffff" />
        <rect x="42" y="38" width="6" height="6" fill="${color}" />
      `;
    case 'swallow':
      // Bunyodkor qaldirg'ochi
      return `
        <path d="M 34 52 Q 50 36 66 52 Q 56 48 50 58 Q 44 48 34 52 Z" fill="${color}" />
        <circle cx="50" cy="42" r="3" fill="#ffffff" />
      `;
    case 'minaret':
      // Buxoro minorasi
      return `
        <path d="M 45 32 L 55 32 L 57 66 L 43 66 Z" fill="${color}" opacity="0.9" />
        <polygon points="50,26 43,32 57,32" fill="${color}" />
        <rect x="47" y="40" width="6" height="8" rx="1" fill="#ffffff" />
      `;
    case 'sun':
      // Qizilqum quyoshi
      return `
        <circle cx="50" cy="50" r="10" fill="${color}" />
        <path d="M 50 32 L 50 36 M 50 64 L 50 68 M 32 50 L 36 50 M 64 50 L 68 50" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />
      `;
    case 'fortress':
      // Xorazm qal'asi
      return `
        <rect x="36" y="44" width="28" height="20" rx="1" fill="${color}" />
        <polygon points="36,44 36,38 42,38 42,44 46,44 46,38 54,38 54,44 58,44 58,38 64,38 64,44" fill="${color}" />
        <rect x="47" y="52" width="6" height="12" rx="3" fill="#ffffff" />
      `;
    default:
      // Standart futbol to'pi ramzi
      return `
        <circle cx="50" cy="50" r="11" fill="none" stroke="${color}" stroke-width="3" />
        <polygon points="50,44 55,48 53,54 47,54 45,48" fill="${color}" />
      `;
  }
}

/**
 * Rang yorqinligini moslashtirish yordamchisi
 */
function adjustBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Har bir klub uchun to'liq SVG kodini generatsiya qilish
 */
export function generateTeamSvgString(config: ClubCrestConfig): string {
  const shieldD = getShieldPath(config.shieldShape);
  const symbolSvg = getSymbolSvg(config.symbolType, config.accentColor);

  // Yulduzlar SVG
  let starsSvg = '';
  if (config.stars > 0) {
    if (config.stars === 1) {
      starsSvg = `<polygon points="50,14 52,19 57,19 53,22 55,27 50,24 45,27 47,22 43,19 48,19" fill="#facc15" stroke="#ffffff" stroke-width="0.5" />`;
    } else if (config.stars === 3) {
      starsSvg = `
        <polygon points="40,14 41.5,17.5 45,17.5 42,19.5 43.5,23 40,21 36.5,23 38,19.5 35,17.5 38.5,17.5" fill="#facc15" stroke="#ffffff" stroke-width="0.5" />
        <polygon points="50,11 52,16 57,16 53,19 55,24 50,21 45,24 47,19 43,16 48,16" fill="#facc15" stroke="#ffffff" stroke-width="0.5" />
        <polygon points="60,14 61.5,17.5 65,17.5 62,19.5 63.5,23 60,21 56.5,23 58,19.5 55,17.5 58.5,17.5" fill="#facc15" stroke="#ffffff" stroke-width="0.5" />
      `;
    }
  }

  // Ichki naqsh
  let patternSvg = '';
  if (config.pattern === 'stripes') {
    patternSvg = `
      <rect x="36" y="0" width="8" height="100" fill="${config.secondaryColor}" opacity="0.35" />
      <rect x="56" y="0" width="8" height="100" fill="${config.secondaryColor}" opacity="0.35" />
    `;
  } else if (config.pattern === 'split') {
    patternSvg = `
      <rect x="50" y="0" width="50" height="100" fill="${config.secondaryColor}" opacity="0.3" />
    `;
  } else if (config.pattern === 'diagonal') {
    patternSvg = `
      <polygon points="10,0 35,0 90,80 90,100" fill="${config.secondaryColor}" opacity="0.25" />
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="grad-${config.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${config.primaryColor}" />
          <stop offset="100%" stop-color="${adjustBrightness(config.primaryColor, -25)}" />
        </linearGradient>
        <clipPath id="clip-${config.id}">
          <path d="${shieldD}" />
        </clipPath>
        <filter id="shadow-${config.id}" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4" />
        </filter>
      </defs>

      <!-- Tashqi hoshiya va soya -->
      <path d="${shieldD}" fill="url(#grad-${config.id})" filter="url(#shadow-${config.id})" />

      <!-- Qalqon ichidagi elementlar -->
      <g clip-path="url(#clip-${config.id})">
        ${patternSvg}
        ${symbolSvg}

        <!-- Qisqa nom -->
        <text x="50" y="${config.stars > 0 ? 32 : 28}" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="10" fill="${config.textColor}" text-anchor="middle" letter-spacing="1">
          ${config.shortName}
        </text>

        <!-- Tashkil topgan yili -->
        <text x="50" y="84" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="7.5" fill="${config.accentColor}" text-anchor="middle" opacity="0.95">
          ${config.year}
        </text>
      </g>

      <!-- Ichki oltin yoki oq nozik qirra -->
      <path d="${shieldD}" fill="none" stroke="${config.accentColor}" stroke-width="2.5" opacity="0.85" />
      <path d="${shieldD}" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.4" />

      <!-- Yulduzlar -->
      ${starsSvg}
    </svg>
  `.trim();
}

/**
 * SVG matnini Data URI formatiga xavfsiz o'tkazish (100% oflayn ishlaydi)
 */
export function generateTeamSvgDataUri(config: ClubCrestConfig): string {
  const svg = generateTeamSvgString(config);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// O'zbekiston klublari uchun kesh xotirasi
const UZ_SVG_CACHE: Record<string, string> = {};

// ============================================================================
// 4. BARCHA KLUBLAR VA TURNIRLAR UCHUN YAGONA LOGOTIP RESURSINI ANIQLASH
// ============================================================================

/**
 * O'zbekiston Superligasi logotipi (Rasmiy kubokli professional SVG)
 */
export function getSuperligaLogo(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="46" fill="#0b0e14" stroke="#10b981" stroke-width="4" />
      <circle cx="50" cy="50" r="40" fill="#131722" />
      <!-- Kubok ramzi -->
      <path d="M 32 30 L 68 30 L 60 52 C 58 60 54 64 50 64 C 46 64 42 60 40 52 Z" fill="#10b981" />
      <path d="M 46 64 L 54 64 L 56 74 L 44 74 Z" fill="#10b981" />
      <rect x="38" y="74" width="24" height="6" rx="2" fill="#10b981" />
      <!-- Yozuv -->
      <text x="50" y="24" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        SUPERLIGA
      </text>
      <text x="50" y="88" font-family="Arial, sans-serif" font-weight="800" font-size="6.5" fill="#10b981" text-anchor="middle">
        UZBEKISTAN
      </text>
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Kalit so'z bo'yicha O'zbekiston klubini topish
 */
export function findUzClubConfig(query: string | number): ClubCrestConfig | undefined {
  const normalized = String(query).toLowerCase().trim().replace(/['‘`]/g, '');

  for (const [key, config] of Object.entries(UZ_SUPERLIGA_CLUBS)) {
    if (
      normalized === key ||
      normalized.includes(key) ||
      normalized.includes(config.shortName.toLowerCase()) ||
      config.name.toLowerCase().includes(normalized)
    ) {
      return config;
    }
  }

  return undefined;
}

/**
 * Asosiy va ishonchli jamoa logotipini olish:
 * 1) O'zbekiston Superligasi jamoasi bo'lsa -> 100% oflayn Custom SVG Emblema (hech qachon sinmaydi)
 * 2) Yevropa top klubi bo'lsa -> Rasmiy API-Sports CDN PNG rasmi
 * 3) Boshqa jamoalar bo'lsa -> Chiroyli standart SVG qalqon (hech qachon ui-avatars yoki broken link emas)
 */
export function getTeamLogo(identifier: string | number, fallbackName?: string): string {
  const idStr = String(identifier).toLowerCase().trim();
  const nameStr = (fallbackName || idStr).toLowerCase().trim();

  // 1. O'zbekiston klubini tekshirish
  const uzClub = findUzClubConfig(idStr) || findUzClubConfig(nameStr);
  if (uzClub) {
    if (!UZ_SVG_CACHE[uzClub.id]) {
      UZ_SVG_CACHE[uzClub.id] = generateTeamSvgDataUri(uzClub);
    }
    return UZ_SVG_CACHE[uzClub.id];
  }

  // 2. Yevropa top klubini tekshirish
  for (const [teamKey, apiId] of Object.entries(EUROPEAN_TEAM_IDS)) {
    if (idStr === teamKey || nameStr.includes(teamKey)) {
      return `${API_SPORTS_BASE}/teams/${apiId}.png`;
    }
  }

  // Raqamli ID bo'lsa va API-Sports dan olingan bo'lsa
  const numId = Number(identifier);
  if (!isNaN(numId) && numId > 0 && numId < 100000) {
    return `${API_SPORTS_BASE}/teams/${numId}.png`;
  }

  // 3. Fallback: Har qanday noma'lum klub uchun professional SVG gerb
  const cleanName = (fallbackName || idStr).replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'Club';
  const initials = cleanName
    .split(' ')
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join('');

  const fallbackSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <linearGradient id="fb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <path d="M 14 12 Q 14 8 20 8 L 80 8 Q 86 8 86 12 L 86 48 Q 86 78 50 94 Q 14 78 14 48 Z" fill="url(#fb-grad)" stroke="#10b981" stroke-width="2.5" />
      <circle cx="50" cy="46" r="14" fill="#10b981" opacity="0.15" />
      <text x="50" y="52" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#10b981" text-anchor="middle" letter-spacing="1">
        ${initials || 'FC'}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`;
}

/**
 * Turnir logotipini olish:
 * - O'zbekiston Superligasi uchun rasmiy SVG
 * - Yevropa va boshqa turnirlar uchun API-Sports rasmiy CDN
 */
export function getTournamentLogo(themeOrId: string | number): string {
  const key = String(themeOrId).toLowerCase().trim();

  if (key === 'uz_superliga' || key.includes('superliga')) {
    return getSuperligaLogo();
  }

  if (LEAGUE_IDS[key]) {
    return `${API_SPORTS_BASE}/leagues/${LEAGUE_IDS[key]}.png`;
  }

  const num = Number(themeOrId);
  if (!isNaN(num) && num > 0) {
    return `${API_SPORTS_BASE}/leagues/${num}.png`;
  }

  // Standart Champions League fallback
  return `${API_SPORTS_BASE}/leagues/2.png`;
}
