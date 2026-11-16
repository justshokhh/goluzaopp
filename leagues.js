/**
 * Gol Uz — Xalqaro va Mahalliy Musobaqalar Bazasi (leagues.js)
 * Barcha ligalar, turnir jadvali, taqvim va API-Football integratsiyasi
 */

const LEAGUES_DATA = [
  // 1. XALQARO (UEFA & FIFA)
  {
    id: 2,
    name: "UEFA Champions League",
    uzName: "UEFA Chempionlar Ligasi",
    region: "INT",
    country: "World",
    flag: "🇪🇺",
    badge: "https://media.api-sports.io/football/leagues/2.png",
    season: 2026,
    activeRound: "Liga bosqichi • 6-tur",
    standings: [
      { pos: 1, team: "Liverpool", p: 6, w: 6, d: 0, l: 0, g: "15:2", pts: 18 },
      { pos: 2, team: "Inter", p: 6, w: 5, d: 1, l: 0, g: "11:1", pts: 16 },
      { pos: 3, team: "Barcelona", p: 6, w: 5, d: 0, l: 1, g: "18:6", pts: 15 },
      { pos: 4, team: "Arsenal", p: 6, w: 4, d: 2, l: 0, g: "12:3", pts: 14 },
      { pos: 5, team: "Sporting CP", p: 6, w: 4, d: 1, l: 1, g: "13:6", pts: 13 },
      { pos: 6, team: "Monaco", p: 6, w: 4, d: 1, l: 1, g: "12:8", pts: 13 },
      { pos: 7, team: "Real Madrid", p: 6, w: 4, d: 0, l: 2, g: "14:9", pts: 12 },
      { pos: 8, team: "Bayern Munich", p: 6, w: 4, d: 0, l: 2, g: "16:8", pts: 12 }
    ],
    scorers: [
      { name: "Robert Lewandowski", club: "Barcelona", goals: 7, assists: 2, rating: "8.3" },
      { name: "Raphinha", club: "Barcelona", goals: 6, assists: 4, rating: "8.5" },
      { name: "Harry Kane", club: "Bayern Munich", goals: 6, assists: 1, rating: "8.1" },
      { name: "Erling Haaland", club: "Manchester City", goals: 5, assists: 1, rating: "7.9" }
    ],
    fixtures: [
      { home: "Real Madrid", away: "Manchester City", time: "21:00", date: "24-noyabr", status: "Kutilmoqda" },
      { home: "Bayern Munich", away: "PSG", time: "21:00", date: "25-noyabr", status: "Kutilmoqda" },
      { home: "Liverpool", away: "Real Madrid", score: "2 : 0", date: "6-noyabr", status: "Yakunlandi" }
    ]
  },
  {
    id: 3,
    name: "UEFA Europa League",
    uzName: "UEFA Yevropa Ligasi",
    region: "INT",
    country: "World",
    flag: "🇪🇺",
    badge: "https://media.api-sports.io/football/leagues/3.png",
    season: 2026,
    activeRound: "Liga bosqichi • 5-tur",
    standings: [
      { pos: 1, team: "Lazio", p: 5, w: 4, d: 1, l: 0, g: "11:2", pts: 13 },
      { pos: 2, team: "Athletic Club", p: 5, w: 4, d: 1, l: 0, g: "9:2", pts: 13 },
      { pos: 3, team: "Eintracht Frankfurt", p: 5, w: 3, d: 2, l: 0, g: "10:5", pts: 11 },
      { pos: 4, team: "Galatasaray", p: 5, w: 3, d: 2, l: 0, g: "12:8", pts: 11 }
    ],
    scorers: [
      { name: "Ayoub El Kaabi", club: "Olympiacos", goals: 5, assists: 1, rating: "7.8" },
      { name: "Victor Osimhen", club: "Galatasaray", goals: 4, assists: 2, rating: "8.0" }
    ],
    fixtures: [
      { home: "Manchester United", away: "Bodo/Glimt", time: "21:00", date: "28-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 848,
    name: "UEFA Conference League",
    uzName: "UEFA Konferensiyalar Ligasi",
    region: "INT",
    country: "World",
    flag: "🇪🇺",
    badge: "https://media.api-sports.io/football/leagues/848.png",
    season: 2026,
    activeRound: "Guruh bosqichi • 4-tur",
    standings: [
      { pos: 1, team: "Chelsea", p: 3, w: 3, d: 0, l: 0, g: "16:3", pts: 9 },
      { pos: 2, team: "Legia Warsaw", p: 3, w: 3, d: 0, l: 0, g: "8:0", pts: 9 },
      { pos: 3, team: "Jagiellonia", p: 3, w: 3, d: 0, l: 0, g: "7:1", pts: 9 },
      { pos: 4, team: "Rapid Wien", p: 3, w: 3, d: 0, l: 0, g: "6:1", pts: 9 }
    ],
    scorers: [
      { name: "Christopher Nkunku", club: "Chelsea", goals: 6, assists: 1, rating: "8.2" }
    ],
    fixtures: [
      { home: "Heidenheim", away: "Chelsea", time: "18:45", date: "28-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 5,
    name: "UEFA Nations League",
    uzName: "UEFA Millatlar Ligasi",
    region: "INT",
    country: "World",
    flag: "🇪🇺",
    badge: "https://media.api-sports.io/football/leagues/5.png",
    season: 2026,
    activeRound: "A-divizioni • Pley-off",
    standings: [
      { pos: 1, team: "Ispaniya", p: 6, w: 5, d: 1, l: 0, g: "13:4", pts: 16 },
      { pos: 2, team: "Germaniya", p: 6, w: 4, d: 2, l: 0, g: "18:4", pts: 14 },
      { pos: 3, team: "Fransiya", p: 6, w: 4, d: 1, l: 1, g: "12:6", pts: 13 },
      { pos: 4, team: "Portugaliya", p: 6, w: 4, d: 2, l: 0, g: "13:5", pts: 14 }
    ],
    scorers: [
      { name: "Viktor Gyökeres", club: "Shvetsiya", goals: 9, assists: 4, rating: "8.9" },
      { name: "Cristiano Ronaldo", club: "Portugaliya", goals: 5, assists: 1, rating: "7.9" }
    ],
    fixtures: [
      { home: "Ispaniya", away: "Niderlandiya", time: "20:45", date: "20-mart 2026", status: "Kutilmoqda" }
    ]
  },
  {
    id: 1,
    name: "FIFA World Cup 2026",
    uzName: "Jahon Chempionati 2026",
    region: "INT",
    country: "World",
    flag: "🌐",
    badge: "https://media.api-sports.io/football/leagues/1.png",
    season: 2026,
    activeRound: "AQSH, Kanada & Meksika",
    standings: [
      { pos: 1, team: "Argentina", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 },
      { pos: 2, team: "Fransiya", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 },
      { pos: 3, team: "O‘zbekiston (Yo‘llanmada)", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 },
      { pos: 4, team: "Braziliya", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 }
    ],
    scorers: [
      { name: "Kylian Mbappé", club: "Fransiya", goals: 0, assists: 0, rating: "8.2" },
      { name: "Lionel Messi", club: "Argentina", goals: 0, assists: 0, rating: "8.4" }
    ],
    fixtures: [
      { home: "AQSH", away: "Raqib aniqlanmoqda", time: "18:00", date: "11-iyun 2026", status: "Ochilish o‘yini" }
    ]
  },
  {
    id: 15,
    name: "FIFA Club World Cup",
    uzName: "Klublar o‘rtasida JCH 2026",
    region: "INT",
    country: "World",
    flag: "🌐",
    badge: "https://media.api-sports.io/football/leagues/15.png",
    season: 2026,
    activeRound: "32 ta eng kuchli klub",
    standings: [
      { pos: 1, team: "Real Madrid", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 },
      { pos: 2, team: "Manchester City", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 },
      { pos: 3, team: "Al-Hilal", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 },
      { pos: 4, team: "Palmeiras", p: 0, w: 0, d: 0, l: 0, g: "0:0", pts: 0 }
    ],
    scorers: [
      { name: "Vinicius Jr", club: "Real Madrid", goals: 0, assists: 0, rating: "8.3" }
    ],
    fixtures: [
      { home: "Real Madrid", away: "Al-Hilal", time: "20:00", date: "15-iyun 2026", status: "Kutilmoqda" }
    ]
  },

  // 2. YEVROPA TOP-5 LIGALARI
  {
    id: 39,
    name: "Premier League",
    uzName: "Angliya Premyer-Ligasi",
    region: "TOP5",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    badge: "https://media.api-sports.io/football/leagues/39.png",
    season: 2026,
    activeRound: "12-tur",
    standings: [
      { pos: 1, team: "Liverpool", p: 11, w: 9, d: 1, l: 1, g: "21:6", pts: 28 },
      { pos: 2, team: "Manchester City", p: 11, w: 7, d: 2, l: 2, g: "22:13", pts: 23 },
      { pos: 3, team: "Chelsea", p: 11, w: 5, d: 4, l: 2, g: "21:13", pts: 19 },
      { pos: 4, team: "Arsenal", p: 11, w: 5, d: 4, l: 2, g: "18:12", pts: 19 },
      { pos: 5, team: "Nottingham Forest", p: 11, w: 5, d: 4, l: 2, g: "15:10", pts: 19 },
      { pos: 6, team: "Brighton", p: 11, w: 5, d: 4, l: 2, g: "19:15", pts: 19 }
    ],
    scorers: [
      { name: "Erling Haaland", club: "Manchester City", goals: 12, assists: 0, rating: "7.98" },
      { name: "Bryan Mbeumo", club: "Brentford", goals: 8, assists: 1, rating: "7.64" },
      { name: "Cole Palmer", club: "Chelsea", goals: 7, assists: 5, rating: "8.12" },
      { name: "Mohamed Salah", club: "Liverpool", goals: 8, assists: 6, rating: "8.25" }
    ],
    fixtures: [
      { home: "Manchester City", away: "Tottenham", time: "18:30", date: "23-noyabr", status: "Kutilmoqda" },
      { home: "Southampton", away: "Liverpool", time: "15:00", date: "24-noyabr", status: "Kutilmoqda" },
      { home: "Arsenal", away: "Nottingham Forest", time: "16:00", date: "23-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 140,
    name: "La Liga",
    uzName: "Ispaniya La Ligasi",
    region: "TOP5",
    country: "Spain",
    flag: "🇪🇸",
    badge: "https://media.api-sports.io/football/leagues/140.png",
    season: 2026,
    activeRound: "14-tur",
    standings: [
      { pos: 1, team: "Barcelona", p: 13, w: 11, d: 0, l: 2, g: "40:12", pts: 33 },
      { pos: 2, team: "Real Madrid", p: 12, w: 8, d: 3, l: 1, g: "25:11", pts: 27 },
      { pos: 3, team: "Atletico Madrid", p: 13, w: 7, d: 5, l: 1, g: "19:7", pts: 26 },
      { pos: 4, team: "Villarreal", p: 12, w: 7, d: 3, l: 2, g: "23:19", pts: 24 }
    ],
    scorers: [
      { name: "Robert Lewandowski", club: "Barcelona", goals: 14, assists: 2, rating: "8.10" },
      { name: "Vinicius Jr", club: "Real Madrid", goals: 8, assists: 4, rating: "7.95" },
      { name: "Raphinha", club: "Barcelona", goals: 7, assists: 6, rating: "8.20" }
    ],
    fixtures: [
      { home: "Celta Vigo", away: "Barcelona", time: "22:00", date: "23-noyabr", status: "Kutilmoqda" },
      { home: "Leganes", away: "Real Madrid", time: "19:30", date: "24-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 135,
    name: "Serie A",
    uzName: "Italiya A Seriyasi",
    region: "TOP5",
    country: "Italy",
    flag: "🇮🇹",
    badge: "https://media.api-sports.io/football/leagues/135.png",
    season: 2026,
    activeRound: "13-tur",
    standings: [
      { pos: 1, team: "Napoli", p: 12, w: 8, d: 2, l: 2, g: "19:9", pts: 26 },
      { pos: 2, team: "Atalanta", p: 12, w: 8, d: 1, l: 3, g: "31:15", pts: 25 },
      { pos: 3, team: "Inter", p: 12, w: 7, d: 4, l: 1, g: "26:14", pts: 25 },
      { pos: 4, team: "Fiorentina", p: 12, w: 7, d: 4, l: 1, g: "25:10", pts: 25 },
      { pos: 5, team: "Lazio", p: 12, w: 8, d: 1, l: 3, g: "26:14", pts: 25 },
      { pos: 6, team: "Juventus", p: 12, w: 6, d: 6, l: 0, g: "21:7", pts: 24 }
    ],
    scorers: [
      { name: "Mateo Retegui", club: "Atalanta", goals: 11, assists: 3, rating: "7.88" },
      { name: "Marcus Thuram", club: "Inter", goals: 7, assists: 2, rating: "7.65" }
    ],
    fixtures: [
      { home: "Milan", away: "Juventus", time: "19:00", date: "23-noyabr", status: "Kutilmoqda" },
      { home: "Napoli", away: "Roma", time: "19:00", date: "24-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 78,
    name: "Bundesliga",
    uzName: "Germaniya Bundesligasi",
    region: "TOP5",
    country: "Germany",
    flag: "🇩🇪",
    badge: "https://media.api-sports.io/football/leagues/78.png",
    season: 2026,
    activeRound: "11-tur",
    standings: [
      { pos: 1, team: "Bayern Munich", p: 10, w: 8, d: 2, l: 0, g: "33:7", pts: 26 },
      { pos: 2, team: "RB Leipzig", p: 10, w: 6, d: 3, l: 1, g: "15:5", pts: 21 },
      { pos: 3, team: "Eintracht Frankfurt", p: 10, w: 6, d: 2, l: 2, g: "26:16", pts: 20 },
      { pos: 4, team: "Bayer Leverkusen", p: 10, w: 4, d: 5, l: 1, g: "21:16", pts: 17 }
    ],
    scorers: [
      { name: "Harry Kane", club: "Bayern Munich", goals: 11, assists: 5, rating: "8.32" },
      { name: "Omar Marmoush", club: "Eintracht", goals: 11, assists: 7, rating: "8.48" }
    ],
    fixtures: [
      { home: "Bayern Munich", away: "Augsburg", time: "21:30", date: "22-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 61,
    name: "Ligue 1",
    uzName: "Fransiya 1-Ligasi",
    region: "TOP5",
    country: "France",
    flag: "🇫🇷",
    badge: "https://media.api-sports.io/football/leagues/61.png",
    season: 2026,
    activeRound: "12-tur",
    standings: [
      { pos: 1, team: "PSG", p: 11, w: 9, d: 2, l: 0, g: "33:10", pts: 29 },
      { pos: 2, team: "Monaco", p: 11, w: 7, d: 2, l: 2, g: "18:8", pts: 23 },
      { pos: 3, team: "Marseille", p: 11, w: 6, d: 2, l: 3, g: "24:15", pts: 20 }
    ],
    scorers: [
      { name: "Bradley Barcola", club: "PSG", goals: 10, assists: 2, rating: "7.78" },
      { name: "Mason Greenwood", club: "Marseille", goals: 8, assists: 1, rating: "7.52" }
    ],
    fixtures: [
      { home: "PSG", away: "Toulouse", time: "22:00", date: "22-noyabr", status: "Kutilmoqda" }
    ]
  },

  // 3. OSIYO (AFC)
  {
    id: 17,
    name: "AFC Champions League Elite",
    uzName: "AFC Chempionlar Ligasi Elite",
    region: "AFC",
    country: "Asia",
    flag: "🌏",
    badge: "https://media.api-sports.io/football/leagues/17.png",
    season: 2026,
    activeRound: "G‘arb mintaqasi • 5-tur",
    standings: [
      { pos: 1, team: "Al-Hilal", p: 4, w: 4, d: 0, l: 0, g: "16:5", pts: 12 },
      { pos: 2, team: "Al-Ahli", p: 4, w: 4, d: 0, l: 0, g: "10:2", pts: 12 },
      { pos: 3, team: "Al-Nassr", p: 4, w: 3, d: 1, l: 0, g: "9:3", pts: 10 },
      { pos: 4, team: "Al-Sadd", p: 4, w: 2, d: 2, l: 0, g: "5:2", pts: 8 },
      { pos: 5, team: "Paxtakor (Toshkent)", p: 4, w: 0, d: 3, l: 1, g: "1:2", pts: 3 }
    ],
    scorers: [
      { name: "Aleksandar Mitrovich", club: "Al-Hilal", goals: 5, assists: 1, rating: "8.25" },
      { name: "Cristiano Ronaldo", club: "Al-Nassr", goals: 3, assists: 1, rating: "7.80" }
    ],
    fixtures: [
      { home: "Al-Gharafa", away: "Al-Nassr", time: "20:00", date: "25-noyabr", status: "Kutilmoqda" },
      { home: "Paxtakor", away: "Al-Ain", time: "18:00", date: "3-dekabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 18,
    name: "AFC Champions League Two",
    uzName: "AFC Chempionlar Ligasi Two",
    region: "AFC",
    country: "Asia",
    flag: "🌏",
    badge: "https://media.api-sports.io/football/leagues/18.png",
    season: 2026,
    activeRound: "Guruh bosqichi • 5-tur",
    standings: [
      { pos: 1, team: "Nasaf (Qarshi)", p: 4, w: 3, d: 1, l: 0, g: "7:3", pts: 10 },
      { pos: 2, team: "Al-Hussein", p: 4, w: 3, d: 0, l: 1, g: "6:4", pts: 9 },
      { pos: 3, team: "Al-Ahli Manama", p: 4, w: 1, d: 0, l: 3, g: "3:7", pts: 3 }
    ],
    scorers: [
      { name: "Husayin Norchayev", club: "Nasaf", goals: 4, assists: 1, rating: "7.85" }
    ],
    fixtures: [
      { home: "Nasaf", away: "Al-Hussein", time: "19:00", date: "27-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 7,
    name: "AFC Asian Cup",
    uzName: "Osiyo Kubogi",
    region: "AFC",
    country: "Asia",
    flag: "🌏",
    badge: "https://media.api-sports.io/football/leagues/7.png",
    season: 2026,
    activeRound: "Xalqaro turnir",
    standings: [
      { pos: 1, team: "Qatar (Chempion)", p: 7, w: 6, d: 1, l: 0, g: "14:5", pts: 19 },
      { pos: 2, team: "Iordaniya", p: 7, w: 4, d: 1, l: 2, g: "13:8", pts: 13 },
      { pos: 3, team: "O‘zbekiston (1/4 final)", p: 5, w: 3, d: 2, l: 0, g: "7:3", pts: 11 }
    ],
    scorers: [
      { name: "Akram Afif", club: "Qatar", goals: 8, assists: 3, rating: "8.5" },
      { name: "Abbosbek Fayzullayev", club: "O‘zbekiston", goals: 2, assists: 1, rating: "7.6" }
    ],
    fixtures: []
  },
  {
    id: 30,
    name: "World Cup Qualification Asia",
    uzName: "JCH-2026 Osiyo Saralash (3-bosqich)",
    region: "AFC",
    country: "Asia",
    flag: "🌏",
    badge: "https://media.api-sports.io/football/leagues/30.png",
    season: 2026,
    activeRound: "3-saralash bosqichi • 6-tur",
    standings: [
      { pos: 1, team: "Eron", p: 5, w: 4, d: 1, l: 0, g: "9:3", pts: 13 },
      { pos: 2, team: "O‘zbekiston", p: 5, w: 3, d: 1, l: 1, g: "7:5", pts: 10 },
      { pos: 3, team: "BAA", p: 5, w: 2, d: 1, l: 2, g: "7:4", pts: 7 },
      { pos: 4, team: "Qatar", p: 5, w: 2, d: 1, l: 2, g: "10:12", pts: 7 },
      { pos: 5, team: "Qirg‘iziston", p: 5, w: 1, d: 0, l: 4, g: "4:10", pts: 3 },
      { pos: 6, team: "KXDR", p: 5, w: 0, d: 2, l: 3, g: "5:8", pts: 2 }
    ],
    scorers: [
      { name: "Eldor Shomurodov", club: "O‘zbekiston", goals: 3, assists: 2, rating: "7.8" },
      { name: "Mehdi Taremi", club: "Eron", goals: 4, assists: 3, rating: "8.1" }
    ],
    fixtures: [
      { home: "KXDR", away: "O‘zbekiston", time: "17:00", date: "19-noyabr", status: "Kutilmoqda" },
      { home: "Qirg‘iziston", away: "Eron", time: "19:00", date: "19-noyabr", status: "Kutilmoqda" },
      { home: "BAA", away: "Qatar", time: "20:00", date: "19-noyabr", status: "Kutilmoqda" }
    ]
  },

  // 4. O‘ZBEKISTON
  {
    id: 369,
    name: "Uzbekistan Super League",
    uzName: "O‘zbekiston Superligasi 2026",
    region: "UZB",
    country: "Uzbekistan",
    flag: "🇺🇿",
    badge: "https://media.api-sports.io/football/leagues/369.png",
    season: 2026,
    activeRound: "28-tur",
    standings: [
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
    ],
    scorers: [
      { name: "Lyupcho Doriev", club: "So‘g‘diyona", goals: 15, assists: 6, rating: "8.02" },
      { name: "Temurxo‘ja Abduxoliqov", club: "Lokomotiv", goals: 14, assists: 3, rating: "7.74" },
      { name: "Stipe Peritsa", club: "Neftchi", goals: 14, assists: 4, rating: "7.81" },
      { name: "Anvar Hojimirzayev", club: "Dinamo", goals: 12, assists: 5, rating: "7.62" },
      { name: "Dostonbek Hamdamov", club: "Paxtakor", goals: 11, assists: 6, rating: "7.70" }
    ],
    fixtures: [
      { home: "Surxon", away: "Andijon", time: "18:00", date: "19-noyabr", status: "28-tur" },
      { home: "OKMK", away: "Qizilqum", time: "17:00", date: "20-noyabr", status: "28-tur" },
      { home: "Nasaf", away: "Mash’al", time: "17:00", date: "21-noyabr", status: "28-tur" }
    ]
  },
  {
    id: 370,
    name: "Uzbekistan Pro League",
    uzName: "O‘zbekiston Pro Ligasi",
    region: "UZB",
    country: "Uzbekistan",
    flag: "🇺🇿",
    badge: "https://media.api-sports.io/football/leagues/370.png",
    season: 2026,
    activeRound: "26-tur",
    standings: [
      { pos: 1, team: "Olimpik (Toshkent)", p: 25, w: 17, d: 5, l: 3, g: "46:18", pts: 56 },
      { pos: 2, team: "Sho‘rtan (G‘uzor)", p: 25, w: 15, d: 6, l: 4, g: "41:20", pts: 51 },
      { pos: 3, team: "Aral (Nukus)", p: 25, w: 13, d: 6, l: 6, g: "36:24", pts: 45 },
      { pos: 4, team: "Do‘stlik (Toshkent)", p: 25, w: 11, d: 4, l: 10, g: "32:30", pts: 37 }
    ],
    scorers: [
      { name: "Asad Jo‘raboyev", club: "Olimpik", goals: 13, assists: 4, rating: "7.65" }
    ],
    fixtures: [
      { home: "Sho‘rtan", away: "Olimpik", time: "16:00", date: "22-noyabr", status: "Kutilmoqda" }
    ]
  },
  {
    id: 371,
    name: "Uzbekistan Cup",
    uzName: "O‘zbekiston Kubogi",
    region: "UZB",
    country: "Uzbekistan",
    flag: "🇺🇿",
    badge: "https://media.api-sports.io/football/leagues/371.png",
    season: 2026,
    activeRound: "Final bosqichi",
    standings: [
      { pos: 1, team: "Andijon (Amaldagi Sohib)", p: 6, w: 5, d: 1, l: 0, g: "14:4", pts: 16 },
      { pos: 2, team: "Navbahor (Finalchi)", p: 6, w: 4, d: 1, l: 1, g: "12:5", pts: 13 }
    ],
    scorers: [
      { name: "Muhammadali G‘iyosov", club: "Andijon", goals: 5, assists: 2, rating: "7.7" }
    ],
    fixtures: []
  }
];

// Mintaqalar bo'yicha filtrlash
function getLeaguesByRegion(region = "ALL") {
  if (region === "ALL") return LEAGUES_DATA;
  return LEAGUES_DATA.filter(l => l.region === region);
}

// Liga ID bo'yicha olish
function getLeagueById(id) {
  return LEAGUES_DATA.find(l => l.id === parseInt(id));
}

// Real API orqali liganing turnir jadvalini yuklash
async function fetchLeagueStandingsApi(leagueId, apiKey) {
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=2026`, {
      headers: { "x-apisports-key": apiKey }
    });
    const data = await res.json();
    if (data.response?.[0]?.league?.standings?.[0]) {
      return data.response[0].league.standings[0].map(t => ({
        pos: t.rank,
        team: t.team.name,
        logo: t.team.logo,
        p: t.all.played,
        w: t.all.win,
        d: t.all.draw,
        l: t.all.lose,
        g: `${t.all.goals.for}:${t.all.goals.against}`,
        pts: t.points
      }));
    }
  } catch (err) {
    console.warn("Liga jadvalini yuklashda xatolik:", err);
  }
  return null;
}
