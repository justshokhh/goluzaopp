const teamIds = {
  "Paxtakor": 561, "Nasaf": 562, "Navbahor": 564, "Neftchi": 565,
  "OKMK": 560, "Bunyodkor": 559, "Lokomotiv": 563, "So‘g‘diyona": 567,
  "Buxoro": 558, "Qizilqum": 566, "Qo‘qon-1912": 568, "Dinamo": 4356,
  "Andijon": 4355, "Surxon": 4357, "Mash’al": 4358, "Xorazm": 10432
};

const clubColors = {
  "Neftchi": ["#059669", "#022c22"], "Paxtakor": ["#d97706", "#1e1b4b"],
  "Navbahor": ["#dc2626", "#450a0a"], "Nasaf": ["#2563eb", "#172554"],
  "OKMK": ["#1d4ed8", "#0f172a"], "Lokomotiv": ["#e11d48", "#064e3b"],
  "Buxoro": ["#0284c7", "#082f49"], "Dinamo": ["#0369a1", "#0c4a6e"],
  "Qizilqum": ["#b91c1c", "#450a0a"], "Surxon": ["#ca8a04", "#422006"],
  "Andijon": ["#dc2626", "#1e3a8a"], "So‘g‘diyona": ["#15803d", "#052e16"],
  "Xorazm": ["#0891b2", "#164e63"], "Bunyodkor": ["#1e40af", "#172554"],
  "Qo‘qon-1912": ["#16a34a", "#14532d"], "Mash’al": ["#2563eb", "#1e3a8a"]
};

let liveGames = [
  {
    fixtureId: null,
    league: "Superliga • 28-tur",
    min: 74,
    home: "Navbahor",
    away: "Neftchi",
    hScore: 1,
    aScore: 2,
    xg: ["1.38", "2.24"],
    stats: { poss: [47, 53], shots: [10, 15], target: [4, 7], pass: [81, 86], corners: [4, 7] },
    events: [
      { min: 14, icon: "⚽", text: "S. Peritsa (Neftchi)" },
      { min: 39, icon: "⚽", text: "R. Jiyanov (Navbahor)" },
      { min: 64, icon: "⚽", text: "J. Iskanderov (Neftchi)" }
    ]
  },
  {
    fixtureId: null,
    league: "Superliga • 28-tur",
    min: 43,
    home: "Lokomotiv",
    away: "Paxtakor",
    hScore: 1,
    aScore: 1,
    xg: ["0.95", "1.14"],
    stats: { poss: [41, 59], shots: [5, 9], target: [2, 4], pass: [78, 88], corners: [2, 5] },
    events: [
      { min: 19, icon: "⚽", text: "D. Hamdamov (Paxtakor)" },
      { min: 35, icon: "⚽", text: "T. Abduxoliqov (Lokomotiv)" }
    ]
  }
];

let upcomingGames = [
  { time: "19-noyabr • 18:00", home: "Surxon", away: "Andijon", status: "28-tur" },
  { time: "20-noyabr • 17:00", home: "OKMK", away: "Qizilqum", status: "28-tur" },
  { time: "21-noyabr • 17:00", home: "Qo‘qon-1912", away: "So‘g‘diyona", status: "28-tur" },
  { time: "21-noyabr • 17:00", home: "Nasaf", away: "Mash’al", status: "28-tur" },
  { time: "21-noyabr • 18:00", home: "Xorazm", away: "Buxoro", status: "28-tur" },
  { time: "22-noyabr • 16:00", home: "Dinamo", away: "Bunyodkor", status: "28-tur" }
];

let pastGames = [
  { date: "14-noyabr • 26-tur", home: "Neftchi", score: "4 : 0", away: "Bunyodkor" },
  { date: "8-noyabr • 27-tur", home: "Paxtakor", score: "3 : 1", away: "Qo‘qon-1912" },
  { date: "8-noyabr • 27-tur", home: "Neftchi", score: "2 : 1", away: "OKMK" },
  { date: "8-noyabr • 27-tur", home: "Buxoro", score: "0 : 1", away: "Nasaf" },
  { date: "7-noyabr • 27-tur", home: "Qizilqum", score: "0 : 1", away: "Navbahor" },
  { date: "6-noyabr • 27-tur", home: "So‘g‘diyona", score: "1 : 3", away: "Dinamo" }
];

let tableRows = [
  { pos: 1, team: "Neftchi", p: 27, w: 20, d: 4, l: 3, g: "65:23", pts: 64 },
  { pos: 2, team: "Paxtakor", p: 27, w: 17, d: 8, l: 2, g: "48:26", pts: 59 },
  { pos: 3, team: "Navbahor", p: 27, w: 16, d: 7, l: 4, g: "46:25", pts: 55 },
  { pos: 4, team: "Nasaf", p: 27, w: 12, d: 9, l: 6, g: "39:24", pts: 45 },
  { pos: 5, team: "OKMK", p: 27, w: 13, d: 6, l: 8, g: "39:35", pts: 45 },
  { pos: 6, team: "Lokomotiv", p: 27, w: 12, d: 7, l: 8, g: "44:34", pts: 43 },
  { pos: 7, team: "Buxoro", p: 27, w: 12, d: 6, l: 9, g: "38:34", pts: 42 },
  { pos: 8, team: "Dinamo", p: 27, w: 10, d: 7, l: 10, g: "42:40", pts: 37 },
  { pos: 9, team: "Qizilqum", p: 27, w: 10, d: 5, l: 12, g: "25:32", pts: 35 },
  { pos: 10, team: "Surxon", p: 27, w: 7, d: 10, l: 10, g: "20:29", pts: 31 },
  { pos: 11, team: "Andijon", p: 27, w: 9, d: 4, l: 14, g: "31:37", pts: 31 },
  { pos: 12, team: "So‘g‘diyona", p: 27, w: 8, d: 6, l: 13, g: "44:53", pts: 30 },
  { pos: 13, team: "Xorazm", p: 27, w: 6, d: 8, l: 13, g: "23:38", pts: 26 },
  { pos: 14, team: "Bunyodkor", p: 27, w: 8, d: 2, l: 17, g: "27:47", pts: 26 },
  { pos: 15, team: "Qo‘qon-1912", p: 27, w: 5, d: 9, l: 13, g: "26:39", pts: 24 },
  { pos: 16, team: "Mash’al", p: 27, w: 1, d: 2, l: 24, g: "12:53", pts: 5 }
];

const allClubs = [
  {
    id: 565, name: "Neftchi", city: "Farg‘ona", coach: "Islom Ismoilov", pts: 64,
    players: [
      { apiId: 34435, num: 1, name: "Botirali Ergashev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 31, height: "189 sm", weight: "82 kg", apps: 26, starts: 26, mins: 2340, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 78, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.42" },
      { apiId: 34436, num: 16, name: "Sanjar Quvvatov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 36, height: "186 sm", weight: "81 kg", apps: 15, starts: 15, mins: 1350, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 80, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.30" },
      { apiId: 34443, num: 34, name: "Farrux Sayfiyev", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 35, height: "177 sm", weight: "72 kg", apps: 26, starts: 25, mins: 2290, goals: 2, assists: 7, pens: 0, shots: 18, keyPasses: 34, passAcc: 84, dribbles: 21, tackles: 48, yellow: 4, red: 0, rating: "7.54" },
      { apiId: 34455, num: 4, name: "Zoir Jo‘raboyev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇹🇯 Tojikiston", age: 27, height: "187 sm", weight: "82 kg", apps: 26, starts: 26, mins: 2310, goals: 3, assists: 1, pens: 0, shots: 17, keyPasses: 8, passAcc: 88, dribbles: 5, tackles: 58, yellow: 3, red: 0, rating: "7.50" },
      { apiId: 34456, num: 20, name: "Muhsin Ubaydullayev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "185 sm", weight: "80 kg", apps: 25, starts: 24, mins: 2180, goals: 1, assists: 2, pens: 0, shots: 12, keyPasses: 7, passAcc: 86, dribbles: 4, tackles: 51, yellow: 4, red: 0, rating: "7.38" },
      { apiId: 34457, num: 70, name: "Mirzohid G‘ofurov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 37, height: "176 sm", weight: "71 kg", apps: 24, starts: 23, mins: 2040, goals: 2, assists: 5, pens: 0, shots: 16, keyPasses: 29, passAcc: 83, dribbles: 19, tackles: 46, yellow: 3, red: 0, rating: "7.40" },
      { apiId: 34461, num: 10, name: "Jamshid Iskanderov", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 33, height: "171 sm", weight: "65 kg", apps: 27, starts: 27, mins: 2380, goals: 7, assists: 11, pens: 2, shots: 44, keyPasses: 68, passAcc: 86, dribbles: 39, tackles: 24, yellow: 3, red: 0, rating: "7.88" },
      { apiId: 34463, num: 7, name: "Abror Ismoilov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 28, height: "182 sm", weight: "76 kg", apps: 26, starts: 26, mins: 2300, goals: 5, assists: 6, pens: 0, shots: 39, keyPasses: 47, passAcc: 88, dribbles: 28, tackles: 52, yellow: 4, red: 0, rating: "7.65" },
      { apiId: 30414, num: 9, name: "Stipe Peritsa", role: "FWD", pos: "Markaziy hujumchi", nat: "🇭🇷 Xorvatiya", age: 31, height: "192 sm", weight: "86 kg", apps: 25, starts: 23, mins: 2050, goals: 14, assists: 4, pens: 3, shots: 69, keyPasses: 19, passAcc: 76, dribbles: 15, tackles: 9, yellow: 3, red: 0, rating: "7.81" },
      { apiId: 34482, num: 11, name: "Bilolxon Toshmirzayev", role: "FWD", pos: "O‘ng vinger", nat: "🇺🇿 O‘zbekiston", age: 26, height: "175 sm", weight: "68 kg", apps: 25, starts: 22, mins: 1970, goals: 8, assists: 7, pens: 0, shots: 46, keyPasses: 38, passAcc: 81, dribbles: 38, tackles: 19, yellow: 2, red: 0, rating: "7.58" }
    ]
  },
  {
    id: 561, name: "Paxtakor", city: "Toshkent", coach: "Kamoliddin Tojiyev", pts: 59,
    players: [
      { apiId: 138880, num: 12, name: "Vladimir Nazarov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 24, height: "190 sm", weight: "83 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 2, passAcc: 81, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.38" },
      { apiId: 34437, num: 1, name: "Pavel Pavlyuchenko", role: "GK", pos: "Darvozabon", nat: "🇧🇾 Belarus", age: 28, height: "193 sm", weight: "86 kg", apps: 16, starts: 16, mins: 1440, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 79, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.28" },
      { apiId: 34445, num: 3, name: "Hojiakbar Alijonov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "178 sm", weight: "72 kg", apps: 26, starts: 26, mins: 2310, goals: 2, assists: 6, pens: 0, shots: 22, keyPasses: 38, passAcc: 85, dribbles: 31, tackles: 54, yellow: 4, red: 0, rating: "7.62" },
      { apiId: 138888, num: 5, name: "Muhammadqodir Hamraliyev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "188 sm", weight: "82 kg", apps: 26, starts: 26, mins: 2320, goals: 2, assists: 1, pens: 0, shots: 15, keyPasses: 9, passAcc: 87, dribbles: 7, tackles: 56, yellow: 4, red: 0, rating: "7.46" },
      { apiId: 34459, num: 22, name: "Dilshod Saitov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "177 sm", weight: "71 kg", apps: 25, starts: 24, mins: 2150, goals: 1, assists: 5, pens: 0, shots: 18, keyPasses: 33, passAcc: 84, dribbles: 27, tackles: 49, yellow: 3, red: 0, rating: "7.42" },
      { apiId: 138890, num: 27, name: "Akmal Mozgovoy", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "184 sm", weight: "78 kg", apps: 26, starts: 26, mins: 2320, goals: 3, assists: 4, pens: 0, shots: 28, keyPasses: 29, passAcc: 89, dribbles: 19, tackles: 67, yellow: 6, red: 0, rating: "7.51" },
      { apiId: 34464, num: 7, name: "Sardor Sobirxo‘jayev", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "178 sm", weight: "73 kg", apps: 26, starts: 25, mins: 2230, goals: 3, assists: 8, pens: 0, shots: 31, keyPasses: 55, passAcc: 89, dribbles: 24, tackles: 48, yellow: 4, red: 0, rating: "7.60" },
      { apiId: 138892, num: 8, name: "Ibrohim Ibrohimov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "183 sm", weight: "77 kg", apps: 25, starts: 23, mins: 2050, goals: 2, assists: 4, pens: 0, shots: 22, keyPasses: 28, passAcc: 87, dribbles: 18, tackles: 59, yellow: 5, red: 0, rating: "7.40" },
      { apiId: 34452, num: 17, name: "Dostonbek Hamdamov", role: "FWD", pos: "O‘ng vinger", nat: "🇺🇿 O‘zbekiston", age: 30, height: "178 sm", weight: "71 kg", apps: 27, starts: 25, mins: 2280, goals: 11, assists: 6, pens: 2, shots: 56, keyPasses: 42, passAcc: 82, dribbles: 34, tackles: 18, yellow: 2, red: 0, rating: "7.70" },
      { apiId: 34481, num: 10, name: "Bobur Abduxoliqov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "181 sm", weight: "75 kg", apps: 24, starts: 21, mins: 1890, goals: 10, assists: 4, pens: 1, shots: 52, keyPasses: 21, passAcc: 77, dribbles: 20, tackles: 11, yellow: 2, red: 0, rating: "7.45" }
    ]
  },
  {
    id: 564, name: "Navbahor", city: "Namangan", coach: "Temur Kapadze", pts: 55,
    players: [
      { apiId: 34434, num: 1, name: "O‘tkir Yusupov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 35, height: "189 sm", weight: "84 kg", apps: 27, starts: 27, mins: 2430, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 79, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.60" },
      { apiId: 34431, num: 12, name: "Eldorbek Suyunov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 35, height: "191 sm", weight: "85 kg", apps: 16, starts: 16, mins: 1440, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 80, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.32" },
      { apiId: 34454, num: 13, name: "Filip Ivanovich", role: "DEF", pos: "Markaziy himoyachi", nat: "🇷🇸 Serbiya", age: 34, height: "190 sm", weight: "85 kg", apps: 26, starts: 26, mins: 2340, goals: 3, assists: 1, pens: 0, shots: 19, keyPasses: 7, passAcc: 86, dribbles: 4, tackles: 58, yellow: 5, red: 0, rating: "7.45" },
      { apiId: 138889, num: 24, name: "Saidazamat Mirsaidov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "179 sm", weight: "73 kg", apps: 25, starts: 24, mins: 2140, goals: 1, assists: 4, pens: 0, shots: 17, keyPasses: 30, passAcc: 83, dribbles: 26, tackles: 48, yellow: 3, red: 0, rating: "7.38" },
      { apiId: 34458, num: 8, name: "Odiljon Hamrobekov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 30, height: "180 sm", weight: "75 kg", apps: 26, starts: 26, mins: 2310, goals: 2, assists: 5, pens: 0, shots: 24, keyPasses: 32, passAcc: 90, dribbles: 17, tackles: 64, yellow: 5, red: 0, rating: "7.53" },
      { apiId: 34466, num: 6, name: "Jamshid Boltaboyev", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 30, height: "181 sm", weight: "76 kg", apps: 26, starts: 25, mins: 2210, goals: 2, assists: 4, pens: 0, shots: 25, keyPasses: 31, passAcc: 88, dribbles: 20, tackles: 62, yellow: 6, red: 0, rating: "7.48" },
      { apiId: 34467, num: 23, name: "Abrorbek Toshqo‘ziyev", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "176 sm", weight: "70 kg", apps: 25, starts: 22, mins: 1950, goals: 4, assists: 5, pens: 0, shots: 33, keyPasses: 36, passAcc: 82, dribbles: 31, tackles: 24, yellow: 2, red: 0, rating: "7.35" },
      { apiId: 284122, num: 77, name: "Ruslanbek Jiyanov", role: "FWD", pos: "Chap vinger", nat: "🇺🇿 O‘zbekiston", age: 25, height: "175 sm", weight: "69 kg", apps: 26, starts: 24, mins: 2180, goals: 7, assists: 5, pens: 0, shots: 48, keyPasses: 33, passAcc: 80, dribbles: 41, tackles: 16, yellow: 3, red: 0, rating: "7.52" },
      { apiId: 162148, num: 19, name: "Husayin Norchayev", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "184 sm", weight: "77 kg", apps: 25, starts: 22, mins: 2010, goals: 10, assists: 2, pens: 1, shots: 54, keyPasses: 16, passAcc: 75, dribbles: 18, tackles: 8, yellow: 2, red: 0, rating: "7.58" },
      { apiId: 34484, num: 9, name: "Toma Tabatadze", role: "FWD", pos: "Markaziy hujumchi", nat: "🇬🇪 Gruziya", age: 34, height: "187 sm", weight: "83 kg", apps: 25, starts: 23, mins: 2030, goals: 9, assists: 3, pens: 2, shots: 52, keyPasses: 17, passAcc: 76, dribbles: 18, tackles: 10, yellow: 3, red: 0, rating: "7.50" }
    ]
  },
  {
    id: 562, name: "Nasaf", city: "Qarshi", coach: "Ro‘ziqul Berdiyev", pts: 45,
    players: [
      { apiId: 138885, num: 35, name: "Abduvohid Ne’matov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 25, height: "188 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 82, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.50" },
      { apiId: 34432, num: 1, name: "Zafar Safoev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 33, height: "189 sm", weight: "83 kg", apps: 17, starts: 17, mins: 1530, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 79, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.25" },
      { apiId: 34448, num: 92, name: "Umar Eshmurodov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 33, height: "188 sm", weight: "82 kg", apps: 26, starts: 26, mins: 2340, goals: 2, assists: 1, pens: 0, shots: 14, keyPasses: 9, passAcc: 88, dribbles: 5, tackles: 58, yellow: 4, red: 0, rating: "7.35" },
      { apiId: 138886, num: 5, name: "G‘olib G‘aybullayev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "186 sm", weight: "80 kg", apps: 26, starts: 26, mins: 2320, goals: 2, assists: 1, pens: 0, shots: 14, keyPasses: 6, passAcc: 87, dribbles: 4, tackles: 54, yellow: 4, red: 0, rating: "7.42" },
      { apiId: 34453, num: 28, name: "Igor Golban", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 35, height: "191 sm", weight: "86 kg", apps: 24, starts: 23, mins: 2060, goals: 2, assists: 0, pens: 0, shots: 12, keyPasses: 5, passAcc: 86, dribbles: 3, tackles: 48, yellow: 4, red: 0, rating: "7.32" },
      { apiId: 138895, num: 7, name: "Oybek Bozorov", role: "MID", pos: "Chap vinger", nat: "🇺🇿 O‘zbekiston", age: 29, height: "172 sm", weight: "66 kg", apps: 25, starts: 24, mins: 2120, goals: 4, assists: 8, pens: 0, shots: 39, keyPasses: 51, passAcc: 83, dribbles: 45, tackles: 22, yellow: 3, red: 0, rating: "7.44" },
      { apiId: 138894, num: 8, name: "Sharof Muhitdinov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "179 sm", weight: "74 kg", apps: 26, starts: 26, mins: 2280, goals: 5, assists: 7, pens: 1, shots: 42, keyPasses: 48, passAcc: 86, dribbles: 29, tackles: 38, yellow: 4, red: 0, rating: "7.54" },
      { apiId: 34470, num: 10, name: "Javohir Sidiqov", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "167 sm", weight: "62 kg", apps: 25, starts: 23, mins: 2040, goals: 4, assists: 8, pens: 0, shots: 36, keyPasses: 56, passAcc: 85, dribbles: 38, tackles: 22, yellow: 2, red: 0, rating: "7.56" },
      { apiId: 34472, num: 88, name: "Marko Stanojevich", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇷🇸 Serbiya", age: 37, height: "182 sm", weight: "78 kg", apps: 25, starts: 24, mins: 2110, goals: 3, assists: 4, pens: 1, shots: 28, keyPasses: 34, passAcc: 89, dribbles: 14, tackles: 56, yellow: 5, red: 0, rating: "7.48" },
      { apiId: 34486, num: 32, name: "Zoran Marushich", role: "FWD", pos: "Markaziy hujumchi", nat: "🇷🇸 Serbiya", age: 32, height: "187 sm", weight: "83 kg", apps: 25, starts: 23, mins: 2040, goals: 8, assists: 4, pens: 1, shots: 49, keyPasses: 18, passAcc: 77, dribbles: 20, tackles: 12, yellow: 3, red: 0, rating: "7.45" }
    ]
  },
  {
    id: 560, name: "OKMK", city: "Olmaliq", coach: "Mirjalol Qosimov", pts: 45,
    players: [
      { apiId: 34438, num: 1, name: "Javohir Ilyosov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 32, height: "188 sm", weight: "82 kg", apps: 26, starts: 26, mins: 2340, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 80, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.20" },
      { apiId: 34429, num: 25, name: "Valijon Rahimov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 31, height: "190 sm", weight: "84 kg", apps: 20, starts: 19, mins: 1710, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 78, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.15" },
      { apiId: 34473, num: 20, name: "Sardor Rahmonov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "186 sm", weight: "80 kg", apps: 25, starts: 25, mins: 2250, goals: 2, assists: 1, pens: 0, shots: 14, keyPasses: 6, passAcc: 85, dribbles: 4, tackles: 46, yellow: 4, red: 0, rating: "7.30" },
      { apiId: 34474, num: 2, name: "Islom To‘xtaxo‘jayev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 36, height: "185 sm", weight: "81 kg", apps: 24, starts: 24, mins: 2160, goals: 1, assists: 1, pens: 0, shots: 10, keyPasses: 5, passAcc: 87, dribbles: 3, tackles: 42, yellow: 5, red: 0, rating: "7.25" },
      { apiId: 34476, num: 3, name: "Akrom Komilov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 30, height: "176 sm", weight: "71 kg", apps: 26, starts: 26, mins: 2310, goals: 1, assists: 4, pens: 0, shots: 16, keyPasses: 28, passAcc: 83, dribbles: 18, tackles: 51, yellow: 3, red: 0, rating: "7.35" },
      { apiId: 34477, num: 7, name: "Dilshod Ahmadaliyev", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "179 sm", weight: "73 kg", apps: 25, starts: 25, mins: 2200, goals: 2, assists: 5, pens: 0, shots: 19, keyPasses: 31, passAcc: 84, dribbles: 24, tackles: 48, yellow: 4, red: 0, rating: "7.32" },
      { apiId: 34478, num: 4, name: "Oybek Rustamov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 28, height: "180 sm", weight: "75 kg", apps: 26, starts: 25, mins: 2240, goals: 3, assists: 3, pens: 0, shots: 26, keyPasses: 22, passAcc: 88, dribbles: 17, tackles: 62, yellow: 5, red: 0, rating: "7.40" },
      { apiId: 34460, num: 17, name: "Sanjar Tursunov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 39, height: "173 sm", weight: "68 kg", apps: 24, starts: 22, mins: 1980, goals: 3, assists: 6, pens: 1, shots: 28, keyPasses: 41, passAcc: 86, dribbles: 16, tackles: 34, yellow: 3, red: 0, rating: "7.28" },
      { apiId: 34465, num: 10, name: "Xurshid G‘iyosov", role: "MID", pos: "Chap vinger", nat: "🇺🇿 O‘zbekiston", age: 31, height: "178 sm", weight: "72 kg", apps: 26, starts: 25, mins: 2240, goals: 8, assists: 6, pens: 3, shots: 47, keyPasses: 44, passAcc: 82, dribbles: 29, tackles: 19, yellow: 3, red: 0, rating: "7.41" },
      { apiId: 34480, num: 88, name: "Mirjamol Qosimov", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 30, height: "175 sm", weight: "70 kg", apps: 23, starts: 18, mins: 1620, goals: 4, assists: 5, pens: 1, shots: 32, keyPasses: 38, passAcc: 84, dribbles: 21, tackles: 18, yellow: 2, red: 0, rating: "7.28" },
      { apiId: 34490, num: 9, name: "Ruben Sanches", role: "FWD", pos: "Markaziy hujumchi", nat: "🇪🇸 Ispaniya", age: 31, height: "185 sm", weight: "79 kg", apps: 24, starts: 21, mins: 1890, goals: 7, assists: 3, pens: 1, shots: 46, keyPasses: 18, passAcc: 78, dribbles: 22, tackles: 11, yellow: 2, red: 0, rating: "7.25" },
      { apiId: 34491, num: 27, name: "Irakli Ruxadze", role: "FWD", pos: "Markaziy hujumchi", nat: "🇬🇪 Gruziya", age: 29, height: "187 sm", weight: "82 kg", apps: 22, starts: 17, mins: 1540, goals: 6, assists: 2, pens: 0, shots: 38, keyPasses: 12, passAcc: 74, dribbles: 14, tackles: 9, yellow: 2, red: 0, rating: "7.20" }
    ]
  },
  {
    id: 563, name: "Lokomotiv", city: "Toshkent", coach: "Mirko Yelichich", pts: 43,
    players: [
      { apiId: 34439, num: 1, name: "Abdumavlon Abdujalilov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 31, height: "187 sm", weight: "80 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 77, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.15" },
      { apiId: 34430, num: 32, name: "Danil Baklanov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 24, height: "192 sm", weight: "85 kg", apps: 18, starts: 18, mins: 1620, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 75, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.08" },
      { apiId: 34494, num: 5, name: "Anzur Ismoilov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 40, height: "190 sm", weight: "86 kg", apps: 24, starts: 24, mins: 2160, goals: 2, assists: 0, pens: 0, shots: 11, keyPasses: 4, passAcc: 86, dribbles: 2, tackles: 44, yellow: 4, red: 0, rating: "7.25" },
      { apiId: 34495, num: 4, name: "Ivan Rogach", role: "DEF", pos: "Markaziy himoyachi", nat: "🇷🇸 Serbiya", age: 33, height: "192 sm", weight: "87 kg", apps: 25, starts: 25, mins: 2250, goals: 1, assists: 1, pens: 0, shots: 13, keyPasses: 5, passAcc: 85, dribbles: 3, tackles: 49, yellow: 5, red: 0, rating: "7.30" },
      { apiId: 34496, num: 2, name: "Abdulazizxon Abdurashidov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "178 sm", weight: "72 kg", apps: 22, starts: 20, mins: 1780, goals: 1, assists: 3, pens: 0, shots: 15, keyPasses: 22, passAcc: 82, dribbles: 19, tackles: 43, yellow: 3, red: 0, rating: "7.15" },
      { apiId: 34497, num: 26, name: "Dilshod Komilov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "176 sm", weight: "71 kg", apps: 24, starts: 23, mins: 2040, goals: 1, assists: 4, pens: 0, shots: 14, keyPasses: 27, passAcc: 81, dribbles: 22, tackles: 45, yellow: 4, red: 0, rating: "7.22" },
      { apiId: 34462, num: 7, name: "Sardor Mirzayev", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 35, height: "172 sm", weight: "66 kg", apps: 26, starts: 24, mins: 2100, goals: 5, assists: 7, pens: 1, shots: 38, keyPasses: 52, passAcc: 84, dribbles: 28, tackles: 21, yellow: 2, red: 0, rating: "7.38" },
      { apiId: 34498, num: 8, name: "Sanjar Qodirqulov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 28, height: "178 sm", weight: "73 kg", apps: 26, starts: 25, mins: 2180, goals: 3, assists: 4, pens: 0, shots: 27, keyPasses: 34, passAcc: 84, dribbles: 24, tackles: 38, yellow: 3, red: 0, rating: "7.32" },
      { apiId: 34499, num: 22, name: "Sobit Sindarov", role: "MID", pos: "Qanot yarim himoyachisi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "174 sm", weight: "68 kg", apps: 23, starts: 19, mins: 1680, goals: 4, assists: 3, pens: 0, shots: 31, keyPasses: 29, passAcc: 80, dribbles: 31, tackles: 18, yellow: 2, red: 0, rating: "7.24" },
      { apiId: 34479, num: 11, name: "Temurxo‘ja Abduxoliqov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 35, height: "184 sm", weight: "79 kg", apps: 26, starts: 24, mins: 2150, goals: 14, assists: 3, pens: 4, shots: 64, keyPasses: 18, passAcc: 76, dribbles: 14, tackles: 7, yellow: 2, red: 0, rating: "7.74" },
      { apiId: 34500, num: 9, name: "Jasur Hakimov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "186 sm", weight: "80 kg", apps: 23, starts: 18, mins: 1590, goals: 6, assists: 2, pens: 1, shots: 41, keyPasses: 14, passAcc: 75, dribbles: 16, tackles: 10, yellow: 2, red: 0, rating: "7.20" }
    ]
  },
  {
    id: 558, name: "Buxoro", city: "Buxoro", coach: "Ulug‘bek Baqoyev", pts: 42,
    players: [
      { apiId: 34440, num: 21, name: "Shirinboy Abdullayev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 33, height: "186 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 78, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.18" },
      { apiId: 34501, num: 1, name: "Luka Kukić", role: "GK", pos: "Darvozabon", nat: "🇧🇦 Bosniya va Gertsegovina", age: 29, height: "194 sm", weight: "88 kg", apps: 21, starts: 21, mins: 1890, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 77, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.22" },
      { apiId: 34502, num: 4, name: "Frane Ikić", role: "DEF", pos: "Markaziy himoyachi", nat: "🇭🇷 Xorvatiya", age: 31, height: "193 sm", weight: "87 kg", apps: 25, starts: 25, mins: 2250, goals: 3, assists: 1, pens: 0, shots: 17, keyPasses: 7, passAcc: 86, dribbles: 4, tackles: 54, yellow: 6, red: 1, rating: "7.38" },
      { apiId: 34503, num: 2, name: "Izzatillo Po‘latov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "177 sm", weight: "70 kg", apps: 24, starts: 23, mins: 2010, goals: 1, assists: 3, pens: 0, shots: 12, keyPasses: 24, passAcc: 82, dribbles: 21, tackles: 46, yellow: 3, red: 0, rating: "7.20" },
      { apiId: 34504, num: 93, name: "Ravshan Xayrullayev", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 28, height: "179 sm", weight: "72 kg", apps: 25, starts: 25, mins: 2200, goals: 1, assists: 4, pens: 0, shots: 15, keyPasses: 29, passAcc: 83, dribbles: 19, tackles: 48, yellow: 4, red: 0, rating: "7.26" },
      { apiId: 34505, num: 5, name: "Jamoliddin Ubaydullayev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "185 sm", weight: "79 kg", apps: 23, starts: 22, mins: 1940, goals: 1, assists: 0, pens: 0, shots: 9, keyPasses: 4, passAcc: 84, dribbles: 3, tackles: 41, yellow: 3, red: 0, rating: "7.15" },
      { apiId: 34506, num: 8, name: "Anvar Jo‘rayev", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "181 sm", weight: "76 kg", apps: 26, starts: 26, mins: 2280, goals: 2, assists: 4, pens: 0, shots: 23, keyPasses: 28, passAcc: 86, dribbles: 16, tackles: 58, yellow: 5, red: 0, rating: "7.35" },
      { apiId: 311456, num: 10, name: "Sherzod Esanov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "178 sm", weight: "71 kg", apps: 27, starts: 26, mins: 2360, goals: 10, assists: 5, pens: 2, shots: 49, keyPasses: 47, passAcc: 85, dribbles: 31, tackles: 39, yellow: 4, red: 0, rating: "7.52" },
      { apiId: 34507, num: 17, name: "Asiljon Begimqulov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "176 sm", weight: "70 kg", apps: 23, starts: 18, mins: 1610, goals: 3, assists: 3, pens: 0, shots: 25, keyPasses: 26, passAcc: 82, dribbles: 23, tackles: 29, yellow: 2, red: 0, rating: "7.18" },
      { apiId: 34492, num: 9, name: "Dominik Begich", role: "FWD", pos: "Markaziy hujumchi", nat: "🇭🇷 Xorvatiya", age: 29, height: "189 sm", weight: "83 kg", apps: 25, starts: 23, mins: 2020, goals: 7, assists: 2, pens: 0, shots: 43, keyPasses: 16, passAcc: 74, dribbles: 15, tackles: 8, yellow: 3, red: 0, rating: "7.22" },
      { apiId: 34508, num: 11, name: "Jasur Hasanov", role: "FWD", pos: "Chap vinger", nat: "🇺🇿 O‘zbekiston", age: 36, height: "175 sm", weight: "69 kg", apps: 24, starts: 19, mins: 1680, goals: 4, assists: 6, pens: 1, shots: 31, keyPasses: 39, passAcc: 81, dribbles: 28, tackles: 16, yellow: 2, red: 0, rating: "7.30" }
    ]
  },
  {
    id: 4356, name: "Dinamo", city: "Samarqand", coach: "Vadim Abramov", pts: 37,
    players: [
      { apiId: 34509, num: 13, name: "Ravshan Yagudin", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 29, height: "189 sm", weight: "83 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 78, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.24" },
      { apiId: 284128, num: 20, name: "Jahongir O‘rozov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 22, height: "187 sm", weight: "79 kg", apps: 26, starts: 26, mins: 2310, goals: 1, assists: 1, pens: 0, shots: 12, keyPasses: 8, passAcc: 84, dribbles: 8, tackles: 52, yellow: 5, red: 0, rating: "7.30" },
      { apiId: 34510, num: 6, name: "Salim Mustafoyev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 34, height: "185 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2200, goals: 2, assists: 1, pens: 0, shots: 13, keyPasses: 7, passAcc: 85, dribbles: 4, tackles: 51, yellow: 4, red: 0, rating: "7.32" },
      { apiId: 34511, num: 3, name: "Artem Suxotskiy", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇦 Ukraina", age: 33, height: "180 sm", weight: "74 kg", apps: 24, starts: 24, mins: 2120, goals: 2, assists: 5, pens: 0, shots: 18, keyPasses: 34, passAcc: 83, dribbles: 20, tackles: 47, yellow: 3, red: 0, rating: "7.36" },
      { apiId: 34512, num: 23, name: "Dušan Mijić", role: "DEF", pos: "O‘ng himoyachi", nat: "🇷🇸 Serbiya", age: 32, height: "182 sm", weight: "76 kg", apps: 24, starts: 23, mins: 2040, goals: 1, assists: 4, pens: 0, shots: 16, keyPasses: 29, passAcc: 82, dribbles: 17, tackles: 45, yellow: 4, red: 0, rating: "7.28" },
      { apiId: 34513, num: 7, name: "Fransis Narx", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇬🇭 Gana", age: 31, height: "176 sm", weight: "72 kg", apps: 25, starts: 24, mins: 2110, goals: 5, assists: 7, pens: 0, shots: 38, keyPasses: 49, passAcc: 84, dribbles: 36, tackles: 25, yellow: 3, red: 0, rating: "7.48" },
      { apiId: 34514, num: 8, name: "Sanjar Shoahmedov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 35, height: "179 sm", weight: "74 kg", apps: 26, starts: 25, mins: 2180, goals: 4, assists: 6, pens: 1, shots: 34, keyPasses: 46, passAcc: 86, dribbles: 22, tackles: 31, yellow: 2, red: 0, rating: "7.42" },
      { apiId: 34515, num: 17, name: "Vladimir Kozak", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 32, height: "184 sm", weight: "78 kg", apps: 25, starts: 24, mins: 2100, goals: 2, assists: 3, pens: 0, shots: 21, keyPasses: 20, passAcc: 88, dribbles: 12, tackles: 59, yellow: 6, red: 0, rating: "7.34" },
      { apiId: 138922, num: 10, name: "Anvar Hojimirzayev", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 32, height: "181 sm", weight: "76 kg", apps: 26, starts: 25, mins: 2210, goals: 12, assists: 5, pens: 2, shots: 58, keyPasses: 27, passAcc: 79, dribbles: 25, tackles: 12, yellow: 3, red: 0, rating: "7.62" },
      { apiId: 34483, num: 9, name: "Azizbek Amonov", role: "FWD", pos: "Ikkinchi hujumchi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "179 sm", weight: "73 kg", apps: 24, starts: 20, mins: 1820, goals: 5, assists: 5, pens: 0, shots: 37, keyPasses: 24, passAcc: 80, dribbles: 22, tackles: 15, yellow: 2, red: 0, rating: "7.26" },
      { apiId: 34516, num: 11, name: "Joel Kojo", role: "FWD", pos: "Markaziy hujumchi", nat: "🇰🇬 Qirg‘iziston", age: 27, height: "178 sm", weight: "74 kg", apps: 26, starts: 25, mins: 2190, goals: 9, assists: 4, pens: 2, shots: 51, keyPasses: 23, passAcc: 78, dribbles: 29, tackles: 14, yellow: 3, red: 0, rating: "7.50" }
    ]
  },
  {
    id: 566, name: "Qizilqum", city: "Navoiy", coach: "Jamshid Saidov", pts: 35,
    players: [
      { apiId: 34441, num: 1, name: "Robert Ozols", role: "GK", pos: "Darvozabon", nat: "🇱🇻 Latviya", age: 30, height: "191 sm", weight: "85 kg", apps: 26, starts: 26, mins: 2340, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 79, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.28" },
      { apiId: 34517, num: 12, name: "Humoyunshoh Sayyotov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 24, height: "188 sm", weight: "82 kg", apps: 18, starts: 18, mins: 1620, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 76, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.12" },
      { apiId: 34518, num: 4, name: "Nikolay Tarasov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇷🇺 Rossiya", age: 27, height: "189 sm", weight: "84 kg", apps: 26, starts: 26, mins: 2340, goals: 2, assists: 0, pens: 0, shots: 15, keyPasses: 5, passAcc: 85, dribbles: 3, tackles: 56, yellow: 5, red: 0, rating: "7.35" },
      { apiId: 34519, num: 5, name: "Samandar Shukurullayev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "186 sm", weight: "80 kg", apps: 24, starts: 24, mins: 2140, goals: 1, assists: 1, pens: 0, shots: 11, keyPasses: 6, passAcc: 84, dribbles: 4, tackles: 48, yellow: 4, red: 0, rating: "7.25" },
      { apiId: 34520, num: 25, name: "Fayzulla Qambarov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "178 sm", weight: "73 kg", apps: 24, starts: 23, mins: 2010, goals: 1, assists: 3, pens: 0, shots: 14, keyPasses: 25, passAcc: 81, dribbles: 18, tackles: 46, yellow: 3, red: 0, rating: "7.20" },
      { apiId: 34521, num: 7, name: "Ilhom Vahobov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 28, height: "177 sm", weight: "71 kg", apps: 25, starts: 24, mins: 2100, goals: 1, assists: 4, pens: 0, shots: 16, keyPasses: 29, passAcc: 82, dribbles: 21, tackles: 47, yellow: 4, red: 0, rating: "7.24" },
      { apiId: 34522, num: 8, name: "Giorgi Kuxianidze", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇬🇪 Gruziya", age: 33, height: "182 sm", weight: "77 kg", apps: 26, starts: 26, mins: 2280, goals: 4, assists: 6, pens: 1, shots: 36, keyPasses: 45, passAcc: 85, dribbles: 26, tackles: 34, yellow: 4, red: 0, rating: "7.42" },
      { apiId: 34523, num: 17, name: "Asror G‘ofurov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "180 sm", weight: "75 kg", apps: 25, starts: 24, mins: 2120, goals: 2, assists: 3, pens: 0, shots: 22, keyPasses: 21, passAcc: 87, dribbles: 15, tackles: 58, yellow: 5, red: 0, rating: "7.30" },
      { apiId: 138901, num: 10, name: "Islom Kenjaboyev", role: "FWD", pos: "Chap vinger", nat: "🇺🇿 O‘zbekiston", age: 27, height: "176 sm", weight: "70 kg", apps: 25, starts: 23, mins: 2050, goals: 7, assists: 4, pens: 1, shots: 42, keyPasses: 28, passAcc: 78, dribbles: 29, tackles: 14, yellow: 3, red: 0, rating: "7.30" },
      { apiId: 34493, num: 11, name: "Elguja Lobjanidze", role: "FWD", pos: "Markaziy hujumchi", nat: "🇬🇪 Gruziya", age: 33, height: "193 sm", weight: "88 kg", apps: 24, starts: 21, mins: 1880, goals: 6, assists: 2, pens: 1, shots: 44, keyPasses: 12, passAcc: 71, dribbles: 11, tackles: 8, yellow: 3, red: 0, rating: "7.18" },
      { apiId: 34524, num: 77, name: "Akaki Shulaia", role: "FWD", pos: "O‘ng vinger", nat: "🇬🇪 Gruziya", age: 29, height: "180 sm", weight: "74 kg", apps: 25, starts: 24, mins: 2090, goals: 6, assists: 5, pens: 0, shots: 44, keyPasses: 35, passAcc: 80, dribbles: 35, tackles: 18, yellow: 2, red: 0, rating: "7.38" }
    ]
  },
  {
    id: 4357, name: "Surxon", city: "Termiz", coach: "Fevzi Davletov", pts: 31,
    players: [
      { apiId: 34442, num: 16, name: "Dilshod Yo‘ldoshev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 26, height: "187 sm", weight: "80 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 2, passAcc: 76, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.10" },
      { apiId: 34525, num: 1, name: "Artyom Potapov", role: "GK", pos: "Darvozabon", nat: "🇰🇬 Qirg‘iziston", age: 34, height: "191 sm", weight: "85 kg", apps: 20, starts: 20, mins: 1800, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 77, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.15" },
      { apiId: 34526, num: 4, name: "Bobur Asqarov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "186 sm", weight: "80 kg", apps: 25, starts: 25, mins: 2250, goals: 1, assists: 1, pens: 0, shots: 11, keyPasses: 5, passAcc: 84, dribbles: 3, tackles: 52, yellow: 4, red: 0, rating: "7.28" },
      { apiId: 34527, num: 6, name: "Sunnatullo Hamidjonov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "176 sm", weight: "70 kg", apps: 24, starts: 23, mins: 2010, goals: 1, assists: 3, pens: 0, shots: 13, keyPasses: 26, passAcc: 82, dribbles: 22, tackles: 46, yellow: 3, red: 0, rating: "7.22" },
      { apiId: 34528, num: 2, name: "Nodirxon Ne’matxonov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "178 sm", weight: "72 kg", apps: 25, starts: 24, mins: 2110, goals: 1, assists: 3, pens: 0, shots: 15, keyPasses: 27, passAcc: 81, dribbles: 25, tackles: 49, yellow: 4, red: 0, rating: "7.25" },
      { apiId: 34529, num: 3, name: "Behzod Shamsiyev", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "187 sm", weight: "81 kg", apps: 23, starts: 22, mins: 1940, goals: 1, assists: 0, pens: 0, shots: 9, keyPasses: 4, passAcc: 83, dribbles: 2, tackles: 44, yellow: 3, red: 0, rating: "7.18" },
      { apiId: 34468, num: 10, name: "Dmitriy Pletnyov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇷🇺 Rossiya", age: 28, height: "180 sm", weight: "74 kg", apps: 26, starts: 25, mins: 2220, goals: 3, assists: 4, pens: 0, shots: 31, keyPasses: 36, passAcc: 83, dribbles: 24, tackles: 31, yellow: 4, red: 0, rating: "7.24" },
      { apiId: 34530, num: 7, name: "Humoyun Sherbo‘tayev", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "179 sm", weight: "73 kg", apps: 26, starts: 25, mins: 2190, goals: 4, assists: 4, pens: 0, shots: 32, keyPasses: 38, passAcc: 84, dribbles: 28, tackles: 36, yellow: 3, red: 0, rating: "7.32" },
      { apiId: 34531, num: 8, name: "Kamronbek Yusupov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "182 sm", weight: "76 kg", apps: 25, starts: 24, mins: 2100, goals: 2, assists: 2, pens: 0, shots: 20, keyPasses: 23, passAcc: 86, dribbles: 16, tackles: 57, yellow: 5, red: 0, rating: "7.26" },
      { apiId: 284130, num: 9, name: "Muhammadali Abdurahmonov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "183 sm", weight: "77 kg", apps: 24, starts: 20, mins: 1840, goals: 6, assists: 1, pens: 0, shots: 36, keyPasses: 11, passAcc: 74, dribbles: 15, tackles: 7, yellow: 2, red: 0, rating: "7.10" },
      { apiId: 34532, num: 27, name: "Asadbek Karimov", role: "FWD", pos: "O‘ng vinger", nat: "🇺🇿 O‘zbekiston", age: 22, height: "176 sm", weight: "69 kg", apps: 24, starts: 21, mins: 1820, goals: 5, assists: 3, pens: 0, shots: 35, keyPasses: 24, passAcc: 78, dribbles: 32, tackles: 14, yellow: 2, red: 0, rating: "7.20" }
    ]
  },
  {
    id: 4355, name: "Andijon", city: "Andijon", coach: "Aleksandr Xomyakov", pts: 31,
    players: [
      { apiId: 34444, num: 72, name: "Igor Litovka", role: "GK", pos: "Darvozabon", nat: "🇺🇦 Ukraina", age: 38, height: "194 sm", weight: "89 kg", apps: 26, starts: 26, mins: 2340, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 78, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.22" },
      { apiId: 34533, num: 1, name: "Mohirbek Komilov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 25, height: "188 sm", weight: "83 kg", apps: 19, starts: 19, mins: 1710, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 76, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.14" },
      { apiId: 34534, num: 5, name: "Vladimir Bubanya", role: "DEF", pos: "Markaziy himoyachi", nat: "🇲🇪 Chernogoriya", age: 34, height: "193 sm", weight: "88 kg", apps: 26, starts: 26, mins: 2340, goals: 3, assists: 1, pens: 0, shots: 18, keyPasses: 7, passAcc: 85, dribbles: 4, tackles: 59, yellow: 5, red: 0, rating: "7.40" },
      { apiId: 34535, num: 15, name: "Ilhom Alijonov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "178 sm", weight: "72 kg", apps: 25, starts: 24, mins: 2120, goals: 1, assists: 4, pens: 0, shots: 17, keyPasses: 29, passAcc: 82, dribbles: 24, tackles: 49, yellow: 4, red: 0, rating: "7.28" },
      { apiId: 34536, num: 66, name: "Abdurahmon Komilov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "186 sm", weight: "80 kg", apps: 24, starts: 24, mins: 2130, goals: 1, assists: 0, pens: 0, shots: 10, keyPasses: 5, passAcc: 84, dribbles: 3, tackles: 46, yellow: 4, red: 0, rating: "7.21" },
      { apiId: 34537, num: 28, name: "Islam Mamatkazin", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "180 sm", weight: "74 kg", apps: 24, starts: 23, mins: 2020, goals: 1, assists: 3, pens: 0, shots: 13, keyPasses: 25, passAcc: 81, dribbles: 19, tackles: 47, yellow: 3, red: 0, rating: "7.22" },
      { apiId: 34538, num: 17, name: "Levan Arveladze", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇦 Ukraina", age: 33, height: "185 sm", weight: "79 kg", apps: 26, starts: 26, mins: 2280, goals: 4, assists: 5, pens: 1, shots: 35, keyPasses: 42, passAcc: 86, dribbles: 21, tackles: 44, yellow: 4, red: 0, rating: "7.44" },
      { apiId: 34469, num: 8, name: "Farhod Sohibjonov", role: "MID", pos: "Qanot yarim himoyachisi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "174 sm", weight: "67 kg", apps: 26, starts: 24, mins: 2110, goals: 5, assists: 5, pens: 0, shots: 34, keyPasses: 31, passAcc: 80, dribbles: 33, tackles: 25, yellow: 3, red: 0, rating: "7.29" },
      { apiId: 34539, num: 10, name: "Bektemir Abdumannonov", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "175 sm", weight: "68 kg", apps: 26, starts: 25, mins: 2160, goals: 6, assists: 7, pens: 1, shots: 42, keyPasses: 51, passAcc: 83, dribbles: 42, tackles: 24, yellow: 2, red: 0, rating: "7.52" },
      { apiId: 311470, num: 77, name: "Rustam Turdimurodov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 22, height: "184 sm", weight: "78 kg", apps: 25, starts: 22, mins: 1980, goals: 8, assists: 2, pens: 1, shots: 45, keyPasses: 15, passAcc: 75, dribbles: 21, tackles: 9, yellow: 2, red: 0, rating: "7.31" },
      { apiId: 34540, num: 9, name: "Luka Zgurskiy", role: "FWD", pos: "Markaziy hujumchi", nat: "🇷🇺 Rossiya", age: 23, height: "188 sm", weight: "81 kg", apps: 23, starts: 19, mins: 1690, goals: 5, assists: 2, pens: 0, shots: 39, keyPasses: 14, passAcc: 74, dribbles: 18, tackles: 8, yellow: 3, red: 0, rating: "7.20" }
    ]
  },
  {
    id: 567, name: "So‘g‘diyona", city: "Jizzax", coach: "Ivan Boshkovich", pts: 30,
    players: [
      { apiId: 34446, num: 27, name: "Milan Mitrovich", role: "GK", pos: "Darvozabon", nat: "🇷🇸 Serbiya", age: 35, height: "190 sm", weight: "86 kg", apps: 26, starts: 26, mins: 2340, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 77, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.15" },
      { apiId: 34541, num: 1, name: "Muhammadyusuf Sobirov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 21, height: "191 sm", weight: "84 kg", apps: 18, starts: 18, mins: 1620, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 76, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.12" },
      { apiId: 34542, num: 4, name: "Islom Qobilov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "188 sm", weight: "82 kg", apps: 26, starts: 26, mins: 2340, goals: 2, assists: 1, pens: 0, shots: 15, keyPasses: 6, passAcc: 85, dribbles: 4, tackles: 57, yellow: 5, red: 0, rating: "7.36" },
      { apiId: 34543, num: 3, name: "Sardor Qulmatov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "186 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2210, goals: 1, assists: 0, pens: 0, shots: 11, keyPasses: 5, passAcc: 84, dribbles: 3, tackles: 49, yellow: 4, red: 0, rating: "7.25" },
      { apiId: 34544, num: 2, name: "Alisher Salimov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "177 sm", weight: "71 kg", apps: 25, starts: 24, mins: 2120, goals: 1, assists: 4, pens: 0, shots: 16, keyPasses: 29, passAcc: 82, dribbles: 23, tackles: 46, yellow: 3, red: 0, rating: "7.28" },
      { apiId: 34545, num: 5, name: "Otabek Ahadov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "179 sm", weight: "72 kg", apps: 23, starts: 22, mins: 1930, goals: 1, assists: 3, pens: 0, shots: 14, keyPasses: 24, passAcc: 81, dribbles: 21, tackles: 43, yellow: 3, red: 0, rating: "7.18" },
      { apiId: 34546, num: 8, name: "Vladimir Jovovich", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇲🇪 Chernogoriya", age: 31, height: "176 sm", weight: "72 kg", apps: 26, starts: 26, mins: 2270, goals: 5, assists: 7, pens: 1, shots: 41, keyPasses: 54, passAcc: 85, dribbles: 33, tackles: 29, yellow: 4, red: 0, rating: "7.56" },
      { apiId: 34471, num: 10, name: "Shohrux Abdurahmonov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "179 sm", weight: "72 kg", apps: 26, starts: 25, mins: 2230, goals: 6, assists: 6, pens: 1, shots: 39, keyPasses: 42, passAcc: 83, dribbles: 27, tackles: 32, yellow: 4, red: 0, rating: "7.35" },
      { apiId: 34547, num: 99, name: "Samandarjon Mavlonqulov", role: "MID", pos: "Qanot yarim himoyachisi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "174 sm", weight: "67 kg", apps: 24, starts: 20, mins: 1740, goals: 4, assists: 4, pens: 0, shots: 29, keyPasses: 31, passAcc: 80, dribbles: 36, tackles: 20, yellow: 2, red: 0, rating: "7.26" },
      { apiId: 39481, num: 14, name: "Lyupcho Doriev", role: "FWD", pos: "Chap vinger", nat: "🇲🇰 Shimoliy Makedoniya", age: 31, height: "183 sm", weight: "77 kg", apps: 27, starts: 27, mins: 2390, goals: 15, assists: 6, pens: 3, shots: 72, keyPasses: 49, passAcc: 81, dribbles: 44, tackles: 17, yellow: 4, red: 0, rating: "8.02" },
      { apiId: 34548, num: 9, name: "Zoran Petrovich", role: "FWD", pos: "Markaziy hujumchi", nat: "🇲🇪 Chernogoriya", age: 28, height: "186 sm", weight: "80 kg", apps: 24, starts: 22, mins: 1910, goals: 7, assists: 3, pens: 1, shots: 46, keyPasses: 17, passAcc: 76, dribbles: 19, tackles: 11, yellow: 3, red: 0, rating: "7.34" }
    ]
  },
  {
    id: 10432, name: "Xorazm", city: "Urganch", coach: "Hakim Fuzaylov", pts: 26,
    players: [
      { apiId: 34447, num: 1, name: "Umidjon Hamroyev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 29, height: "187 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 76, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.10" },
      { apiId: 34549, num: 35, name: "Mashhur Muhammadjonov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 25, height: "190 sm", weight: "84 kg", apps: 18, starts: 18, mins: 1620, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 75, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.08" },
      { apiId: 34550, num: 4, name: "Jasur O‘rinov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "186 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2250, goals: 1, assists: 0, pens: 0, shots: 10, keyPasses: 4, passAcc: 83, dribbles: 3, tackles: 51, yellow: 4, red: 0, rating: "7.22" },
      { apiId: 34551, num: 3, name: "Bobur Farhodov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "185 sm", weight: "79 kg", apps: 24, starts: 24, mins: 2120, goals: 1, assists: 1, pens: 0, shots: 9, keyPasses: 5, passAcc: 82, dribbles: 2, tackles: 47, yellow: 3, red: 0, rating: "7.16" },
      { apiId: 34552, num: 2, name: "Avazxon Mamatxo‘jayev", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "177 sm", weight: "71 kg", apps: 24, starts: 23, mins: 2010, goals: 1, assists: 2, pens: 0, shots: 12, keyPasses: 22, passAcc: 80, dribbles: 20, tackles: 44, yellow: 3, red: 0, rating: "7.15" },
      { apiId: 34553, num: 5, name: "Mirjalol Qurbonov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "178 sm", weight: "72 kg", apps: 23, starts: 22, mins: 1940, goals: 0, assists: 3, pens: 0, shots: 11, keyPasses: 23, passAcc: 81, dribbles: 18, tackles: 42, yellow: 3, red: 0, rating: "7.14" },
      { apiId: 34554, num: 8, name: "Sherzod G‘ulomjonov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "181 sm", weight: "76 kg", apps: 26, starts: 25, mins: 2210, goals: 2, assists: 3, pens: 0, shots: 24, keyPasses: 26, passAcc: 84, dribbles: 17, tackles: 54, yellow: 5, red: 0, rating: "7.25" },
      { apiId: 34555, num: 10, name: "Temur Ismoilov", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "176 sm", weight: "70 kg", apps: 25, starts: 24, mins: 2090, goals: 4, assists: 5, pens: 1, shots: 34, keyPasses: 38, passAcc: 82, dribbles: 27, tackles: 22, yellow: 3, red: 0, rating: "7.30" },
      { apiId: 34556, num: 7, name: "Sunnat Abdullajonov", role: "MID", pos: "Qanot yarim himoyachisi", nat: "🇺🇿 O‘zbekiston", age: 28, height: "175 sm", weight: "69 kg", apps: 24, starts: 21, mins: 1840, goals: 3, assists: 4, pens: 0, shots: 28, keyPasses: 30, passAcc: 79, dribbles: 31, tackles: 18, yellow: 2, red: 0, rating: "7.20" },
      { apiId: 284140, num: 9, name: "Shahzod Beshimov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "182 sm", weight: "76 kg", apps: 25, starts: 22, mins: 2010, goals: 7, assists: 2, pens: 1, shots: 39, keyPasses: 14, passAcc: 74, dribbles: 16, tackles: 8, yellow: 3, red: 0, rating: "7.12" },
      { apiId: 34557, num: 11, name: "Murodbek Bobojonov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "183 sm", weight: "77 kg", apps: 23, starts: 18, mins: 1580, goals: 5, assists: 2, pens: 1, shots: 33, keyPasses: 12, passAcc: 73, dribbles: 14, tackles: 7, yellow: 2, red: 0, rating: "7.10" }
    ]
  },
  {
    id: 559, name: "Bunyodkor", city: "Toshkent", coach: "Ilyos Zeytullayev", pts: 26,
    players: [
      { apiId: 34449, num: 1, name: "Suhrob Sultonov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 36, height: "189 sm", weight: "83 kg", apps: 25, starts: 25, mins: 2250, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 75, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.05" },
      { apiId: 34558, num: 13, name: "Marin Ljubić", role: "GK", pos: "Darvozabon", nat: "🇭🇷 Xorvatiya", age: 28, height: "190 sm", weight: "85 kg", apps: 20, starts: 20, mins: 1800, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 78, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.25" },
      { apiId: 34559, num: 4, name: "Najmiddin Normurodov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "187 sm", weight: "81 kg", apps: 25, starts: 25, mins: 2210, goals: 2, assists: 0, pens: 0, shots: 12, keyPasses: 5, passAcc: 84, dribbles: 3, tackles: 51, yellow: 4, red: 0, rating: "7.28" },
      { apiId: 34560, num: 3, name: "Muzaffar Olimjonov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "185 sm", weight: "78 kg", apps: 23, starts: 22, mins: 1940, goals: 1, assists: 1, pens: 0, shots: 10, keyPasses: 4, passAcc: 83, dribbles: 2, tackles: 45, yellow: 3, red: 0, rating: "7.18" },
      { apiId: 34561, num: 66, name: "Itsuki Urata", role: "DEF", pos: "Chap himoyachi", nat: "🇯🇵 Yaponiya", age: 29, height: "177 sm", weight: "71 kg", apps: 25, starts: 25, mins: 2200, goals: 1, assists: 5, pens: 0, shots: 16, keyPasses: 34, passAcc: 85, dribbles: 24, tackles: 53, yellow: 3, red: 0, rating: "7.42" },
      { apiId: 34562, num: 22, name: "Asadbek Rahimjonov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 22, height: "176 sm", weight: "70 kg", apps: 24, starts: 22, mins: 1980, goals: 1, assists: 3, pens: 0, shots: 14, keyPasses: 26, passAcc: 82, dribbles: 22, tackles: 46, yellow: 3, red: 0, rating: "7.22" },
      { apiId: 34563, num: 8, name: "Usmonali Ismonaliyev", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "181 sm", weight: "76 kg", apps: 26, starts: 25, mins: 2190, goals: 3, assists: 3, pens: 0, shots: 26, keyPasses: 29, passAcc: 86, dribbles: 19, tackles: 58, yellow: 4, red: 0, rating: "7.32" },
      { apiId: 34475, num: 10, name: "Rasul Yo‘ldoshev", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "177 sm", weight: "70 kg", apps: 26, starts: 24, mins: 2130, goals: 5, assists: 4, pens: 1, shots: 36, keyPasses: 34, passAcc: 81, dribbles: 25, tackles: 28, yellow: 3, red: 0, rating: "7.20" },
      { apiId: 34564, num: 7, name: "Bilol Tupliyev", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "175 sm", weight: "68 kg", apps: 24, starts: 21, mins: 1820, goals: 4, assists: 5, pens: 0, shots: 31, keyPasses: 39, passAcc: 82, dribbles: 32, tackles: 21, yellow: 2, red: 0, rating: "7.30" },
      { apiId: 284145, num: 11, name: "Temur Mamasiddiqov", role: "FWD", pos: "O‘ng vinger", nat: "🇺🇿 O‘zbekiston", age: 24, height: "177 sm", weight: "70 kg", apps: 25, starts: 22, mins: 1960, goals: 5, assists: 3, pens: 0, shots: 34, keyPasses: 22, passAcc: 78, dribbles: 27, tackles: 13, yellow: 2, red: 0, rating: "7.09" },
      { apiId: 34565, num: 9, name: "Luis Kacorri", role: "FWD", pos: "Markaziy hujumchi", nat: "🇦🇱 Albaniya", age: 28, height: "193 sm", weight: "87 kg", apps: 24, starts: 22, mins: 1920, goals: 7, assists: 2, pens: 1, shots: 48, keyPasses: 15, passAcc: 74, dribbles: 16, tackles: 9, yellow: 4, red: 0, rating: "7.32" }
    ]
  },
  {
    id: 568, name: "Qo‘qon-1912", city: "Qo‘qon", coach: "Bahrom Haydarov", pts: 24,
    players: [
      { apiId: 34450, num: 12, name: "Azizxon Isaqov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 25, height: "188 sm", weight: "82 kg", apps: 24, starts: 24, mins: 2160, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 75, dribbles: 0, tackles: 0, yellow: 2, red: 0, rating: "7.08" },
      { apiId: 34566, num: 1, name: "Muzaffar Abdullayev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 32, height: "189 sm", weight: "83 kg", apps: 19, starts: 19, mins: 1710, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 76, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.10" },
      { apiId: 34567, num: 4, name: "Bobur Akbarov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 36, height: "186 sm", weight: "82 kg", apps: 24, starts: 24, mins: 2160, goals: 1, assists: 0, pens: 0, shots: 10, keyPasses: 4, passAcc: 83, dribbles: 2, tackles: 48, yellow: 5, red: 0, rating: "7.18" },
      { apiId: 34568, num: 3, name: "Asliddin Toshtemirov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "187 sm", weight: "81 kg", apps: 24, starts: 24, mins: 2110, goals: 1, assists: 1, pens: 0, shots: 9, keyPasses: 4, passAcc: 82, dribbles: 2, tackles: 46, yellow: 4, red: 0, rating: "7.16" },
      { apiId: 34569, num: 2, name: "Aleksandr Merzlyakov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 39, height: "176 sm", weight: "71 kg", apps: 23, starts: 21, mins: 1880, goals: 1, assists: 3, pens: 0, shots: 12, keyPasses: 23, passAcc: 81, dribbles: 16, tackles: 42, yellow: 3, red: 0, rating: "7.14" },
      { apiId: 34570, num: 5, name: "Jasur Yoqubov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "178 sm", weight: "72 kg", apps: 24, starts: 23, mins: 2020, goals: 0, assists: 3, pens: 0, shots: 11, keyPasses: 24, passAcc: 80, dribbles: 19, tackles: 44, yellow: 3, red: 0, rating: "7.15" },
      { apiId: 34571, num: 7, name: "Javohir Husanov", role: "MID", pos: "Qanot yarim himoyachisi", nat: "🇺🇿 O‘zbekiston", age: 27, height: "175 sm", weight: "69 kg", apps: 25, starts: 23, mins: 2040, goals: 4, assists: 4, pens: 0, shots: 31, keyPasses: 34, passAcc: 81, dribbles: 32, tackles: 21, yellow: 2, red: 0, rating: "7.25" },
      { apiId: 34572, num: 8, name: "San’at Shixov", role: "MID", pos: "Markaziy yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 36, height: "177 sm", weight: "72 kg", apps: 24, starts: 22, mins: 1920, goals: 3, assists: 5, pens: 1, shots: 26, keyPasses: 37, passAcc: 84, dribbles: 18, tackles: 31, yellow: 3, red: 0, rating: "7.22" },
      { apiId: 34573, num: 17, name: "Iqbol Malikjonov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "182 sm", weight: "77 kg", apps: 25, starts: 24, mins: 2100, goals: 2, assists: 2, pens: 0, shots: 19, keyPasses: 21, passAcc: 85, dribbles: 14, tackles: 54, yellow: 5, red: 0, rating: "7.20" },
      { apiId: 34485, num: 10, name: "Shohnazar Norbekov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 32, height: "182 sm", weight: "76 kg", apps: 24, starts: 21, mins: 1890, goals: 6, assists: 2, pens: 1, shots: 35, keyPasses: 13, passAcc: 73, dribbles: 12, tackles: 6, yellow: 2, red: 0, rating: "7.10" },
      { apiId: 34574, num: 9, name: "Doniyor Ismoilov", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 31, height: "183 sm", weight: "78 kg", apps: 23, starts: 18, mins: 1560, goals: 5, assists: 2, pens: 0, shots: 33, keyPasses: 11, passAcc: 74, dribbles: 15, tackles: 8, yellow: 2, red: 0, rating: "7.12" }
    ]
  },
  {
    id: 4358, name: "Mash’al", city: "Muborak", coach: "Asror Aliqulov", pts: 5,
    players: [
      { apiId: 34451, num: 1, name: "Rahimjon Davronov", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 29, height: "188 sm", weight: "82 kg", apps: 24, starts: 24, mins: 2160, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 74, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.00" },
      { apiId: 34575, num: 35, name: "Dostonbek To‘xtaboyev", role: "GK", pos: "Darvozabon", nat: "🇺🇿 O‘zbekiston", age: 27, height: "189 sm", weight: "82 kg", apps: 18, starts: 18, mins: 1620, goals: 0, assists: 0, pens: 0, shots: 0, keyPasses: 1, passAcc: 74, dribbles: 0, tackles: 0, yellow: 1, red: 0, rating: "7.02" },
      { apiId: 34576, num: 4, name: "Samandar Ochilov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "187 sm", weight: "81 kg", apps: 24, starts: 24, mins: 2150, goals: 1, assists: 0, pens: 0, shots: 8, keyPasses: 3, passAcc: 81, dribbles: 2, tackles: 49, yellow: 4, red: 0, rating: "7.15" },
      { apiId: 34577, num: 3, name: "Zafar Akramov", role: "DEF", pos: "Markaziy himoyachi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "185 sm", weight: "79 kg", apps: 23, starts: 23, mins: 2020, goals: 1, assists: 1, pens: 0, shots: 7, keyPasses: 4, passAcc: 82, dribbles: 2, tackles: 45, yellow: 4, red: 0, rating: "7.12" },
      { apiId: 34578, num: 2, name: "Muhammadali Tursunov", role: "DEF", pos: "O‘ng himoyachi", nat: "🇺🇿 O‘zbekiston", age: 23, height: "177 sm", weight: "71 kg", apps: 23, starts: 21, mins: 1860, goals: 0, assists: 2, pens: 0, shots: 9, keyPasses: 19, passAcc: 79, dribbles: 18, tackles: 43, yellow: 3, red: 0, rating: "7.08" },
      { apiId: 34579, num: 5, name: "Ergash Ismoilov", role: "DEF", pos: "Chap himoyachi", nat: "🇺🇿 O‘zbekiston", age: 26, height: "178 sm", weight: "72 kg", apps: 24, starts: 22, mins: 1950, goals: 0, assists: 2, pens: 0, shots: 10, keyPasses: 20, passAcc: 80, dribbles: 16, tackles: 44, yellow: 3, red: 0, rating: "7.10" },
      { apiId: 34580, num: 8, name: "Nurjahon Muzaffarov", role: "MID", pos: "Tayanch yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 25, height: "181 sm", weight: "76 kg", apps: 25, starts: 24, mins: 2110, goals: 2, assists: 2, pens: 0, shots: 21, keyPasses: 22, passAcc: 83, dribbles: 15, tackles: 51, yellow: 4, red: 0, rating: "7.18" },
      { apiId: 34581, num: 10, name: "Islom Sharipov", role: "MID", pos: "Hujumkor yarim himoyachi", nat: "🇺🇿 O‘zbekiston", age: 29, height: "176 sm", weight: "70 kg", apps: 25, starts: 23, mins: 2010, goals: 3, assists: 4, pens: 1, shots: 28, keyPasses: 34, passAcc: 82, dribbles: 26, tackles: 20, yellow: 2, red: 0, rating: "7.24" },
      { apiId: 34582, num: 7, name: "Muhammad Yusupov", role: "MID", pos: "Qanot yarim himoyachisi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "175 sm", weight: "68 kg", apps: 23, starts: 20, mins: 1760, goals: 2, assists: 3, pens: 0, shots: 24, keyPasses: 25, passAcc: 78, dribbles: 29, tackles: 17, yellow: 2, red: 0, rating: "7.12" },
      { apiId: 34488, num: 9, name: "Humoyun Murtozayev", role: "FWD", pos: "Markaziy hujumchi", nat: "🇺🇿 O‘zbekiston", age: 33, height: "185 sm", weight: "79 kg", apps: 24, starts: 22, mins: 1950, goals: 5, assists: 1, pens: 1, shots: 33, keyPasses: 10, passAcc: 72, dribbles: 10, tackles: 5, yellow: 3, red: 0, rating: "7.02" },
      { apiId: 34583, num: 11, name: "Otobek Jo‘raqo‘ziyev", role: "FWD", pos: "Ikkinchi hujumchi", nat: "🇺🇿 O‘zbekiston", age: 24, height: "179 sm", weight: "73 kg", apps: 24, starts: 21, mins: 1820, goals: 4, assists: 2, pens: 0, shots: 31, keyPasses: 16, passAcc: 75, dribbles: 21, tackles: 10, yellow: 2, red: 0, rating: "7.15" }
    ]
  }
];