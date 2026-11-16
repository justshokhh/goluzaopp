/**
 * Gol Uz — Media & Logo Engine
 * media.api-sports.io integratsiyasi va buzilmaydigan dinamik SVG fallback tizimi
 */

// Barcha klublar uchun maxsus ranglar va qisqartmalar
const clubMetadata = {
  // O'zbekiston Superligasi
  "Neftchi": { code: "NEF", colors: ["#059669", "#022c22"], id: 565 },
  "Paxtakor": { code: "PAX", colors: ["#d97706", "#1e1b4b"], id: 561 },
  "Navbahor": { code: "NAV", colors: ["#dc2626", "#450a0a"], id: 564 },
  "Nasaf": { code: "NAS", colors: ["#2563eb", "#172554"], id: 562 },
  "OKMK": { code: "OKM", colors: ["#1d4ed8", "#0f172a"], id: 560 },
  "Lokomotiv": { code: "LOK", colors: ["#e11d48", "#064e3b"], id: 563 },
  "Buxoro": { code: "BUX", colors: ["#0284c7", "#082f49"], id: 558 },
  "Dinamo": { code: "DIN", colors: ["#0369a1", "#0c4a6e"], id: 4356 },
  "Qizilqum": { code: "QIZ", colors: ["#b91c1c", "#450a0a"], id: 566 },
  "Surxon": { code: "SUR", colors: ["#ca8a04", "#422006"], id: 4357 },
  "Andijon": { code: "AND", colors: ["#dc2626", "#1e3a8a"], id: 4355 },
  "So‘g‘diyona": { code: "SOG", colors: ["#15803d", "#052e16"], id: 567 },
  "Xorazm": { code: "XOR", colors: ["#0891b2", "#164e63"], id: 10432 },
  "Bunyodkor": { code: "BUN", colors: ["#1e40af", "#172554"], id: 559 },
  "Qo‘qon-1912": { code: "QOQ", colors: ["#16a34a", "#14532d"], id: 568 },
  "Mash’al": { code: "MAS", colors: ["#2563eb", "#1e3a8a"], id: 4358 },

  // Xalqaro Top Klublar
  "Real Madrid": { code: "RMA", colors: ["#FFFFFF", "#00529F"], id: 541 },
  "Barcelona": { code: "BAR", colors: ["#004D98", "#A50044"], id: 529 },
  "Manchester City": { code: "MCI", colors: ["#6CABDD", "#1C2C5B"], id: 50 },
  "Arsenal": { code: "ARS", colors: ["#EF0107", "#063672"], id: 42 },
  "Liverpool": { code: "LIV", colors: ["#C8102E", "#00B2A9"], id: 40 },
  "Bayern Munich": { code: "FCB", colors: ["#DC052D", "#0066B2"], id: 157 },
  "PSG": { code: "PSG", colors: ["#004170", "#DA291C"], id: 85 },
  "Inter": { code: "INT", colors: ["#010E80", "#000000"], id: 505 },
  "Juventus": { code: "JUV", colors: ["#000000", "#FFFFFF"], id: 496 },
  "Al-Hilal": { code: "HIL", colors: ["#003399", "#FFFFFF"], id: 2577 },
  "Al-Nassr": { code: "NAS", colors: ["#FFD700", "#002B7F"], id: 2579 }
};

// Yuqori sifatli vektorli SVG Qalqon (Crest) generatsiyasi
function generateCrestSvg(code, color1 = "#00e5a0", color2 = "#0E1525") {
  const letters = (code || "FC").substring(0, 3).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115" width="100%" height="100%">
    <defs>
      <linearGradient id="g_${letters}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}"/>
        <stop offset="100%" stop-color="${color2}"/>
      </linearGradient>
      <filter id="f" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <!-- Qalqon shakli -->
    <path d="M50 4 C85 4 94 15 94 40 C94 78 50 110 50 110 C50 110 6 78 6 40 C6 15 15 4 50 4 Z" 
          fill="url(#g_${letters})" stroke="rgba(255,255,255,0.22)" stroke-width="2.5" filter="url(#f)"/>
    <path d="M50 10 C80 10 88 18 88 40 C88 73 50 102 50 102 C50 102 12 73 12 40 C12 18 20 10 50 10 Z" 
          fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    <!-- Ichki to'p belgisi -->
    <circle cx="50" cy="38" r="8" fill="rgba(255,255,255,0.15)"/>
    <!-- Klub harflari -->
    <text x="50" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="${letters.length > 2 ? 18 : 22}" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
      ${letters}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Futbolchi uchun zamonaviy avatar SVG generatsiyasi
function generatePlayerAvatarSvg(name, role = "MID") {
  const parts = (name || "Player").trim().split(" ");
  const initials = parts.length > 1 
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() 
    : (name || "PL").substring(0, 2).toUpperCase();

  const roleColors = {
    GK: ["#F59E0B", "#78350F"],
    DEF: ["#38BDF8", "#0369A1"],
    MID: ["#00E5A0", "#065F46"],
    FWD: ["#EC4899", "#831843"]
  };
  const [c1, c2] = roleColors[role] || ["#00E5A0", "#064E3B"];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="pg_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#pg_${initials})"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
    <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="28" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">
      ${initials}
    </text>
    <rect x="25" y="74" width="50" height="18" rx="9" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <text x="50" y="87" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="10" font-weight="800" fill="#00e5a0" text-anchor="middle">${role}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Liga kubogi / gerbi SVG generatsiyasi
function generateLeagueBadgeSvg(code = "LIG", color = "#00e5a0") {
  const short = code.substring(0, 4).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="lg_${short}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#141E33"/>
        <stop offset="100%" stop-color="#070B14"/>
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#lg_${short})" stroke="${color}" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" stroke-dasharray="4 2"/>
    <text x="50" y="44" font-size="22" text-anchor="middle">🏆</text>
    <text x="50" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
      ${short}
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// -------------------------------------------------------------
// Ochiq API Funksiyalari
// -------------------------------------------------------------

function getTeamLogoUrl(teamName, customLogo = null) {
  if (customLogo && !customLogo.includes("undefined")) return customLogo;
  if (!teamName) return generateCrestSvg("FC");

  const meta = clubMetadata[teamName] || Object.entries(clubMetadata).find(([k]) => teamName.includes(k))?.[1];
  if (meta && meta.id) {
    return `https://media.api-sports.io/football/teams/${meta.id}.png`;
  }
  const cleanCode = teamName.replace(/[^a-zA-Z0-9]/g, "").substring(0, 3).toUpperCase();
  return generateCrestSvg(cleanCode);
}

function getPlayerPhotoUrl(player) {
  if (player?.photo && !player.photo.includes("undefined")) return player.photo;
  if (player?.apiId) {
    return `https://media.api-sports.io/football/players/${player.apiId}.png`;
  }
  return generatePlayerAvatarSvg(player?.name || "Player", player?.role || "MID");
}

function getLeagueLogoUrl(leagueId, fallbackName = "Liga") {
  if (leagueId) {
    return `https://media.api-sports.io/football/leagues/${leagueId}.png`;
  }
  return generateLeagueBadgeSvg(fallbackName);
}

// Onerror fallback himoyalari
function handleLogoError(img, teamName) {
  img.onerror = null; // Qayta chaqirilishni oldini olish
  const meta = clubMetadata[teamName] || {};
  const code = meta.code || teamName.substring(0, 3).toUpperCase();
  const [c1, c2] = meta.colors || ["#00e5a0", "#0E1525"];
  img.src = generateCrestSvg(code, c1, c2);
}

function handlePlayerImgError(img, playerName, role = "MID") {
  img.onerror = null;
  img.src = generatePlayerAvatarSvg(playerName, role);
}

function handleLeagueLogoError(img, leagueName) {
  img.onerror = null;
  img.src = generateLeagueBadgeSvg(leagueName || "LIG");
}
