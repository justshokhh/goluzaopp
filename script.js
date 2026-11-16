// ============================================================
// 1. REAL FOOTBALL API SOZLAMALARI (API-Football / api-sports.io)
// ============================================================
const API_CONFIG = {
  useRealApi: true, // <-- Real API ishlatish uchun true qiling
  apiKey: "d8064a415c475419d22fb56cb83df26d", // api-sports.io dan olingan kalit
  leagueId: 369, // O'zbekiston Superligasi ID raqami
  season: 2026
};

// ============================================================
// 2. JONLI O'YINLAR (SofaScore Live Center simulyatsiyasi + API)
// ============================================================
let liveMatches = [
  {
    id: 101,
    league: "Superliga • 28-tur (Markaziy o‘yin)",
    minute: 68,
    home: "Navbahor",
    away: "Neftchi",
    homeScore: 1,
    awayScore: 2,
    stadium: "Markaziy stadion, Namangan",
    stats: { possession: [48, 52], shots: [11, 14], onTarget: [4, 6], corners: [5, 7] },
    events: [
      { min: 14, team: "away", type: "⚽ Gol", player: "Stipe Peritsa (assist: J. Iskanderov)" },
      { min: 39, team: "home", type: "⚽ Gol", player: "Ruslanbek Jiyanov" },
      { min: 52, team: "away", type: "🟨 Sariq", player: "Farrux Sayfiyev" },
      { min: 63, team: "away", type: "⚽ Gol", player: "Jamshid Iskanderov (jarima zarbasi)" }
    ]
  },
  {
    id: 102,
    league: "Superliga • 28-tur (Toshkent derbisi)",
    minute: 41,
    home: "Lokomotiv",
    away: "Paxtakor",
    homeScore: 1,
    awayScore: 1,
    stadium: "Lokomotiv stadioni, Toshkent",
    stats: { possession: [42, 58], shots: [6, 9], onTarget: [2, 4], corners: [2, 5] },
    events: [
      { min: 19, team: "away", type: "⚽ Gol", player: "Dostonbek Hamdamov" },
      { min: 34, team: "home", type: "⚽ Gol", player: "Temurxo‘ja Abduxoliqov (penalti)" }
    ]
  }
];

// ============================================================
// 3. TURNIR JADVALI (2026)
// ============================================================
const standingsData = [
  { pos: 1, team: "Neftchi (Farg‘ona)", p: 27, w: 20, d: 4, l: 3, gd: "+42 (65:23)", pts: 64 },
  { pos: 2, team: "Paxtakor (Toshkent)", p: 27, w: 17, d: 8, l: 2, gd: "+22 (48:26)", pts: 59 },
  { pos: 3, team: "Navbahor (Namangan)", p: 27, w: 16, d: 7, l: 4, gd: "+21 (46:25)", pts: 55 },
  { pos: 4, team: "Nasaf (Qarshi)", p: 27, w: 12, d: 9, l: 6, gd: "+15 (39:24)", pts: 45 },
  { pos: 5, team: "OKMK (Olmaliq)", p: 27, w: 13, d: 6, l: 8, gd: "+4 (39:35)", pts: 45 },
  { pos: 6, team: "Lokomotiv (Toshkent)", p: 27, w: 12, d: 7, l: 8, gd: "+10 (44:34)", pts: 43 },
  { pos: 7, team: "Buxoro", p: 27, w: 12, d: 6, l: 9, gd: "+4 (38:34)", pts: 42 },
  { pos: 8, team: "Dinamo (Samarqand)", p: 27, w: 10, d: 7, l: 10, gd: "+2 (42:40)", pts: 37 },
  { pos: 9, team: "Qizilqum (Navoiy)", p: 27, w: 10, d: 5, l: 12, gd: "-7 (25:32)", pts: 35 },
  { pos: 10, team: "Surxon (Termiz)", p: 27, w: 7, d: 10, l: 10, gd: "-9 (20:29)", pts: 31 },
  { pos: 11, team: "Andijon", p: 27, w: 9, d: 4, l: 14, gd: "-6 (31:37)", pts: 31 },
  { pos: 12, team: "So‘g‘diyona (Jizzax)", p: 27, w: 8, d: 6, l: 13, gd: "-9 (44:53)", pts: 30 },
  { pos: 13, team: "Xorazm (Urganch)", p: 27, w: 6, d: 8, l: 13, gd: "-15 (23:38)", pts: 26 },
  { pos: 14, team: "Bunyodkor (Toshkent)", p: 27, w: 8, d: 2, l: 17, gd: "-20 (27:47)", pts: 26 },
  { pos: 15, team: "Qo‘qon-1912", p: 27, w: 5, d: 9, l: 13, gd: "-13 (26:39)", pts: 24 },
  { pos: 16, team: "Mash’al (Muborak)", p: 27, w: 1, d: 2, l: 24, gd: "-41 (12:53)", pts: 5 }
];

const recentMatches = [
  { date: "14 Noyabr • 26-tur", home: "Neftchi", score: "4 : 0", away: "Bunyodkor" },
  { date: "8 Noyabr • 27-tur", home: "Paxtakor", score: "3 : 1", away: "Qo‘qon-1912" },
  { date: "8 Noyabr • 27-tur", home: "Neftchi", score: "2 : 1", away: "OKMK" },
  { date: "8 Noyabr • 27-tur", home: "Buxoro", score: "0 : 1", away: "Nasaf" },
  { date: "7 Noyabr • 27-tur", home: "Qizilqum", score: "0 : 1", away: "Navbahor" },
  { date: "6 Noyabr • 27-tur", home: "So‘g‘diyona", score: "1 : 3", away: "Dinamo" }
];

const upcomingMatches = [
  { date: "Ertaga, 18:00 • 28-tur", home: "Surxon", time: "18:00", away: "Andijon" },
  { date: "Ertaga, 18:30 • 28-tur", home: "Nasaf", time: "18:30", away: "Mash’al" },
  { date: "21 Noyabr, 17:00 • 28-tur", home: "OKMK", time: "17:00", away: "Buxoro" },
  { date: "21 Noyabr, 19:00 • 28-tur", home: "Dinamo", time: "19:00", away: "Bunyodkor" }
];

// ============================================================
// 4. TO'PURARLAR RO'YXATI
// ============================================================
const topScorers = [
  { rank: 1, name: "Lyupcho Doriev", club: "So‘g‘diyona • Chap vinger (31 yosh)", goals: 15 },
  { rank: 2, name: "Temurxo‘ja Abduxoliqov", club: "Lokomotiv • Markaziy hujumchi (35 yosh)", goals: 14 },
  { rank: 3, name: "Stipe Peritsa", club: "Neftchi • Markaziy hujumchi (31 yosh)", goals: 14 },
  { rank: 4, name: "Anvar Hojimirzayev", club: "Dinamo • Ikkinchi hujumchi (32 yosh)", goals: 12 },
  { rank: 5, name: "Dostonbek Hamdamov", club: "Paxtakor • O‘ng vinger (30 yosh)", goals: 11 },
  { rank: 6, name: "Husayin Norchayev", club: "Nasaf • Markaziy hujumchi (24 yosh)", goals: 10 },
  { rank: 7, name: "Bobur Abduxoliqov", club: "Paxtakor • Markaziy hujumchi (29 yosh)", goals: 10 },
  { rank: 8, name: "Sherzod Esanov", club: "Buxoro • Yarim himoyachi (23 yosh)", goals: 10 }
];

// ============================================================
// 5. BARCHA 16 TA SUPERLIGA JAMOASI VA TO'LIQ TARKIBLAR
// ============================================================
const teamsData = [
  {
    name: "Neftchi (Farg‘ona)", short: "NF", color: "#059669", coach: "Islom Ismoilov", stadium: "Istiqlol stadioni (20 000)",
    summary: "2026-yilgi mavsum peshqadami (64 ochko), eng sermahsul jamoa (65 gol).",
    players: [
      { num: 1, name: "Botirali Ergashev", pos: "Darvozabon", age: 31, rating: "7.4", bio: "Terma jamoa darvozaboni. 13 ta quruq o‘yin o‘tkazgan." },
      { num: 34, name: "Farrux Sayfiyev", pos: "Chap himoyachi", age: 35, rating: "7.5", bio: "Tajribali qanot himoyachisi, 7 ta golli uzatma muallifi." },
      { num: 20, name: "Anvar G‘ofurov", pos: "Markaziy himoyachi", age: 30, rating: "7.2", bio: "Ikkinchi qavatdagi kurashlarda yetakchi himoyachi." },
      { num: 10, name: "Jamshid Iskanderov", pos: "Hujumkor yarim himoyachi", age: 33, rating: "7.9", bio: "Jamoa sardori. 7 ta gol va 11 ta assist bilan mavsumning eng yaxshi pleymeykeri." },
      { num: 7, name: "Abror Ismoilov", pos: "Markaziy yarim himoyachi", age: 28, rating: "7.3", bio: "Maydon markazidagi bosim va uzoq masofadan zarbalar ustasi." },
      { num: 9, name: "Stipe Peritsa", pos: "Markaziy hujumchi", age: 31, rating: "7.8", bio: "Xorvatiyalik to‘purar, 25 o‘yinda 14 ta gol urgan." }
    ]
  },
  {
    name: "Paxtakor (Toshkent)", short: "PX", color: "#eab308", coach: "Kamoliddin Tojiyev", stadium: "Paxtakor stadioni (34 000)",
    summary: "Mavsumda eng kam mag‘lubiyatga uchragan klub (2 ta), 59 ochko.",
    players: [
      { num: 12, name: "Vladimir Nazarov", pos: "Darvozabon", age: 24, rating: "7.2", bio: "Yosh va ishonchli darvozabon, penaltilar qaytarishda mohir." },
      { num: 3, name: "Hojiakbar Alijonov", pos: "O‘ng himoyachi", age: 29, rating: "7.6", bio: "Tezkor qanot himoyachisi, 6 ta assist muallifi." },
      { num: 27, name: "Akmal Mozgovoy", pos: "Tayanch yarim himoyachi", age: 27, rating: "7.5", bio: "To‘pni olib qo‘yish va hujumni boshlashda asosiy figura." },
      { num: 17, name: "Dostonbek Hamdamov", pos: "O‘ng vinger", age: 30, rating: "7.7", bio: "Jamoa to‘purari (11 gol), muhim bahslarda gol urmoqda." },
      { num: 11, name: "Flamarion", pos: "Ikkinchi hujumchi", age: 30, rating: "7.5", bio: "Braziliyalik legioner: 6 gol va 8 assist." },
      { num: 10, name: "Bobur Abduxoliqov", pos: "Markaziy hujumchi", age: 29, rating: "7.4", bio: "Mavsumda 10 ta gol urgan mahoratli hujumchi." }
    ]
  },
  {
    name: "Navbahor (Namangan)", short: "NV", color: "#dc2626", coach: "Temur Kapadze", stadium: "Markaziy stadion (28 000)",
    summary: "Temur Kapadze qo‘l ostida kuchli uchlikda bormoqda (55 ochko).",
    players: [
      { num: 1, name: "O‘tkir Yusupov", pos: "Darvozabon", age: 35, rating: "7.6", bio: "Milliy terma jamoa va Navbahor sardori, 11 ta quruq o‘yin." },
      { num: 13, name: "Filip Ivanovich", pos: "Markaziy himoyachi", age: 34, rating: "7.2", bio: "Serbiyalik tajribali himoyachi, standart vaziyatlarda xavfli." },
      { num: 8, name: "Odiljon Hamrobekov", pos: "Tayanch yarim himoyachi", age: 30, rating: "7.5", bio: "O‘zbekistonning eng barqaror tayanch yarim himoyachilaridan biri." },
      { num: 77, name: "Ruslanbek Jiyanov", pos: "Chap vinger", age: 25, rating: "7.5", bio: "Dribling ustasi, 7 gol va 5 assist muallifi." },
      { num: 22, name: "Alisher Odilov", pos: "O‘ng vinger", age: 25, rating: "7.4", bio: "Tezkor hujumchi, 7 gol va 6 golli pas." }
    ]
  },
  {
    name: "Nasaf (Qarshi)", short: "NS", color: "#2563eb", coach: "Ro‘ziqul Berdiyev", stadium: "Markaziy stadion (21 000)",
    summary: "Kuchli to‘rtlikda (45 ochko), eng mustahkam himoyalardan biri (24 gol).",
    players: [
      { num: 35, name: "Abduvohid Ne’matov", pos: "Darvozabon", age: 25, rating: "7.5", bio: "Terma jamoa darvozaboni, yuqori reaksiya egasi." },
      { num: 92, name: "Umar Eshmurodov", pos: "Markaziy himoyachi", age: 33, rating: "7.3", bio: "Qarshiliklar himoya qo‘rg‘oni sardori." },
      { num: 7, name: "Oybek Bozorov", pos: "Chap vinger", age: 29, rating: "7.4", bio: "Texnikasi kuchli vinger, 8 ta assist muallifi." },
      { num: 19, name: "Husayin Norchayev", pos: "Markaziy hujumchi", age: 24, rating: "7.6", bio: "15 o‘yinda 10 ta gol urib, ajoyib sport formasida." }
    ]
  },
  {
    name: "OKMK (Olmaliq)", short: "OK", color: "#1d4ed8", coach: "Mirjalol Qosimov", stadium: "OKMK sport majmuasi (12 000)",
    summary: "Mirjalol Qosimov jamoasi 45 ochko bilan 5-o‘rinda bormoqda.",
    players: [
      { num: 1, name: "Javohir Ilyosov", pos: "Darvozabon", age: 32, rating: "7.1", bio: "Tajribali posbon, ko‘plab seyvlar muallifi." },
      { num: 17, name: "Sanjar Tursunov", pos: "Yarim himoyachi", age: 39, rating: "7.2", bio: "Jamoa faxriysi va standart vaziyatlar ijrochisi." },
      { num: 10, name: "Xurshid G‘iyosov", pos: "Vinger / Hujumchi", age: 31, rating: "7.4", bio: "Penaltilar ustasi, mavsumda 8 ta gol va 6 assist." },
      { num: 9, name: "Ruben Sanches", pos: "Hujumchi", age: 31, rating: "7.2", bio: "Ispaniyalik hujumchi, 7 ta gol muallifi." }
    ]
  },
  {
    name: "Lokomotiv (Toshkent)", short: "LK", color: "#e11d48", coach: "Mirko Yelichich", stadium: "Lokomotiv stadioni (8 000)",
    summary: "43 ochko bilan 6-o‘rinda, hujumkor futbol namoyish etmoqda.",
    players: [
      { num: 1, name: "Abdumavlon Abdujalilov", pos: "Darvozabon", age: 31, rating: "7.0", bio: "Ishonchli darvozabon." },
      { num: 7, name: "Sardor Mirzayev", pos: "Yarim himoyachi", age: 35, rating: "7.3", bio: "5 gol va 7 assist bilan hujumlarni tashkil qilmoqda." },
      { num: 11, name: "Temurxo‘ja Abduxoliqov", pos: "Markaziy hujumchi", age: 35, rating: "7.7", bio: "14 ta gol bilan to‘purarlar poygasida 2-o‘rinda." }
    ]
  },
  {
    name: "Buxoro", short: "BX", color: "#0369a1", coach: "Ulug‘bek Baqoyev", stadium: "Buxoro sport majmuasi (22 000)",
    summary: "42 ochko bilan kuchli yettilikdan joy olgan jangovar jamoa.",
    players: [
      { num: 21, name: "Shirinboy Abdullayev", pos: "Darvozabon", age: 33, rating: "7.1", bio: "Buxoroning asosiy posboni." },
      { num: 10, name: "Sherzod Esanov", pos: "Yarim himoyachi", age: 23, rating: "7.5", bio: "Mavsum kashfiyotlaridan biri: 10 ta gol urgan." },
      { num: 9, name: "Dominik Begich", pos: "Hujumchi", age: 29, rating: "7.2", bio: "7 ta gol bilan hujum chizig‘i yetakchisi." }
    ]
  },
  {
    name: "Dinamo (Samarqand)", short: "DN", color: "#0284c7", coach: "Vadim Abramov", stadium: "Dinamo stadioni (13 800)",
    summary: "Vadim Abramov boshchiligida 42 ta gol urgan tomoshabop jamoa.",
    players: [
      { num: 20, name: "Jahongir O‘rozov", pos: "Markaziy himoyachi", age: 22, rating: "7.3", bio: "O‘zbekiston olimpiya terma jamoasi himoyachisi." },
      { num: 10, name: "Anvar Hojimirzayev", pos: "Ikkinchi hujumchi", age: 32, rating: "7.6", bio: "19 o‘yinda 12 ta gol urgan jamoa to‘purari." },
      { num: 9, name: "Azizbek Amonov", pos: "Hujumchi", age: 29, rating: "7.2", bio: "5 gol va 5 assist qayd etgan." }
    ]
  },
  {
    name: "Qizilqum (Navoiy)", short: "QZ", color: "#b91c1c", coach: "Jamshid Saidov", stadium: "Yoshlar sport majmuasi (12 500)",
    summary: "35 ochko bilan turnir jadvalining o‘rtasida barqaror bormoqda.",
    players: [
      { num: 1, name: "Robert Ozols", pos: "Darvozabon", age: 30, rating: "7.2", bio: "Latviyalik tajribali darvozabon." },
      { num: 10, name: "Islom Kenjaboyev", pos: "Vinger", age: 27, rating: "7.3", bio: "Qizilqumning eng tezkor va xavfli hujumchisi (7 gol)." },
      { num: 11, name: "Elguja Lobjanidze", pos: "Markaziy hujumchi", age: 33, rating: "7.1", bio: "Bo‘ydor hujumchi, 6 ta gol muallifi." }
    ]
  },
  {
    name: "Surxon (Termiz)", short: "SR", color: "#ca8a04", coach: "Fevzi Davletov", stadium: "Surxon arena (10 000)",
    summary: "31 ochko bilan 10-o‘rinda, yoshlardan iborat tezkor jamoa.",
    players: [
      { num: 16, name: "Dilshod Yo‘ldoshev", pos: "Darvozabon", age: 26, rating: "7.0", bio: "Yosh va chaqqon darvozabon." },
      { num: 10, name: "Dmitriy Pletnyov", pos: "Yarim himoyachi", age: 28, rating: "7.2", bio: "Maydon markazida to‘p nazoratini ushlab turadi." },
      { num: 9, name: "Muhammadali Abdurahmonov", pos: "Hujumchi", age: 24, rating: "7.1", bio: "6 ta gol urgan yosh hujumchi." }
    ]
  },
  {
    name: "Andijon", short: "AN", color: "#dc2626", coach: "Aleksandr Xomyakov", stadium: "Bobur arena (18 360)",
    summary: "31 ochko, mamlakatdagi eng qaynoq muxlislarga ega klub.",
    players: [
      { num: 72, name: "Igor Litovka", pos: "Darvozabon", age: 38, rating: "7.1", bio: "Tajribali posbon." },
      { num: 77, name: "Rustam Turdimurodov", pos: "Hujumchi", age: 22, rating: "7.3", bio: "8 ta gol bilan jamoa to‘purari." },
      { num: 8, name: "Farhod Sohibjonov", pos: "Yarim himoyachi", age: 25, rating: "7.2", bio: "5 gol va 5 assist muallifi." }
    ]
  },
  {
    name: "So‘g‘diyona (Jizzax)", short: "SG", color: "#15803d", coach: "Ivan Boshkovich", stadium: "So‘g‘diyona stadioni (11 650)",
    summary: "30 ochko, Superliga to‘purari Lyupcho Doriev o‘ynaydigan jamoa.",
    players: [
      { num: 27, name: "Milan Mitrovich", pos: "Darvozabon", age: 35, rating: "7.0", bio: "Serbiyalik darvozabon." },
      { num: 14, name: "Lyupcho Doriev", pos: "Chap vinger", age: 31, rating: "8.0", bio: "15 ta gol bilan O‘zbekiston Superligasi 2026 to‘purari!" },
      { num: 10, name: "Shohrux Abdurahmonov", pos: "Yarim himoyachi", age: 27, rating: "7.2", bio: "6 ta gol va 6 assist." }
    ]
  },
  {
    name: "Xorazm (Urganch)", short: "XR", color: "#0891b2", coach: "Hakim Fuzaylov", stadium: "Xorazm stadioni (13 500)",
    summary: "26 ochko bilan Superligada jon saqlash uchun kurashmoqda.",
    players: [
      { num: 1, name: "Umidjon Hamroyev", pos: "Darvozabon", age: 29, rating: "7.0", bio: "Xorazmning asosiy posboni." },
      { num: 9, name: "Shahzod Beshimov", pos: "Hujumchi", age: 25, rating: "7.1", bio: "7 ta gol urgan jamoa yetakchisi." }
    ]
  },
  {
    name: "Bunyodkor (Toshkent)", short: "BN", color: "#1e3a8a", coach: "Ilyos Zeytullayev", stadium: "Bunyodkor stadioni (34 000)",
    summary: "26 ochko, yosh akademiya tarbiyalanuvchilariga tayangan klub.",
    players: [
      { num: 1, name: "Suhrob Sultonov", pos: "Darvozabon", age: 36, rating: "6.9", bio: "Tajribali darvozabon." },
      { num: 10, name: "Rasul Yo‘ldoshev", pos: "Yarim himoyachi", age: 26, rating: "7.1", bio: "Jamoa sardori, 5 gol va 4 assist." },
      { num: 11, name: "Temur Mamasiddiqov", pos: "Vinger", age: 24, rating: "7.0", bio: "Tezkor qanot o‘yinchisi (5 gol)." }
    ]
  },
  {
    name: "Qo‘qon-1912", short: "QQ", color: "#16a34a", coach: "Bahrom Haydarov", stadium: "Markaziy stadion (10 500)",
    summary: "24 ochko bilan 15-o‘rinda, o‘zbek futbolining eng ko‘hna klubi.",
    players: [
      { num: 12, name: "Azizxon Isaqov", pos: "Darvozabon", age: 25, rating: "7.0", bio: "Qo‘qonliklar darvozaboni." },
      { num: 10, name: "Shohnazar Norbekov", pos: "Hujumchi", age: 32, rating: "7.1", bio: "6 ta gol muallifi." }
    ]
  },
  {
    name: "Mash’al (Muborak)", short: "MS", color: "#2563eb", coach: "Asror Aliqulov", stadium: "Bahrom Vafoev stadioni (10 000)",
    summary: "5 ochko bilan 16-o‘rinda, yosh futbolchilarni tarbiyalovchi akademiya klubi.",
    players: [
      { num: 1, name: "Rahimjon Davronov", pos: "Darvozabon", age: 29, rating: "6.8", bio: "Ko‘plab zarbalarni qaytarayotgan posbon." },
      { num: 9, name: "Humoyun Murtozayev", pos: "Hujumchi", age: 33, rating: "7.0", bio: "Jamoa sardori va 5 ta gol muallifi." }
    ]
  }
];

// ============================================================
// 6. REAL API BILAN ISHLASH FUNKSIYASI
// ============================================================
async function fetchLiveFromApi() {
  if (!API_CONFIG.useRealApi || API_CONFIG.apiKey === "SIZNING_API_KALITINGIZ_SHU_YERGA") {
    return; // Demo Live rejimi ishlaydi
  }
  try {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures?league=${API_CONFIG.leagueId}&season=${API_CONFIG.season}&live=all`, {
      headers: { "x-apisports-key": API_CONFIG.apiKey }
    });
    const data = await res.json();
    if (data.response && data.response.length > 0) {
      liveMatches = data.response.map(item => ({
        id: item.fixture.id,
        league: `Superliga • ${item.league.round}`,
        minute: item.fixture.status.elapsed || 1,
        home: item.teams.home.name,
        away: item.teams.away.name,
        homeScore: item.goals.home ?? 0,
        awayScore: item.goals.away ?? 0,
        stadium: item.fixture.venue.name || "O‘zbekiston",
        stats: { possession: [50, 50], shots: [5, 5], onTarget: [2, 2], corners: [3, 3] },
        events: (item.events || []).map(ev => ({
          min: ev.time.elapsed,
          team: ev.team.id === item.teams.home.id ? "home" : "away",
          type: ev.type === "Goal" ? "⚽ Gol" : "🟨 Kartochka",
          player: ev.player.name
        }))
      }));
      document.getElementById("api-status-badge").innerHTML = `<span class="live-dot"></span> REAL API • JONLI`;
      renderLiveMatches();
    }
  } catch (err) {
    console.warn("API ulanishida xatolik, lokal rejim ishlamoqda:", err);
  }
}

// ============================================================
// 7. RENDER FUNKSIYALARI
// ============================================================
function renderLiveMatches() {
  document.getElementById("live-matches").innerHTML = liveMatches.map((m, idx) => `
    <div class="match-card" style="cursor: pointer; border-color: rgba(0, 229, 160, 0.3);" onclick="openMatchModal(${idx})">
      <div class="match-meta">
        <span>${m.league}</span>
        <span style="color: var(--accent); font-weight: 700; display: flex; align-items: center; gap: 6px;">
          <i class="live-dot"></i> ${m.minute}'
        </span>
      </div>
      <div class="match-teams">
        <div class="team-side">${m.home}</div>
        <div class="score-box" style="background: rgba(0, 229, 160, 0.16);">${m.homeScore} : ${m.awayScore}</div>
        <div class="team-side away">${m.away}</div>
      </div>
    </div>
  `).join("");
}

function renderMatches() {
  renderLiveMatches();

  document.getElementById("recent-matches").innerHTML = recentMatches.map(m => `
    <div class="match-card">
      <div class="match-meta"><span>${m.date}</span><span>Yakunlandi</span></div>
      <div class="match-teams">
        <div class="team-side">${m.home}</div>
        <div class="score-box">${m.score}</div>
        <div class="team-side away">${m.away}</div>
      </div>
    </div>
  `).join("");

  document.getElementById("upcoming-matches").innerHTML = upcomingMatches.map(m => `
    <div class="match-card">
      <div class="match-meta"><span>${m.date}</span><span>Tez orada</span></div>
      <div class="match-teams">
        <div class="team-side">${m.home}</div>
        <div class="score-box upcoming">${m.time}</div>
        <div class="team-side away">${m.away}</div>
      </div>
    </div>
  `).join("");
}

function renderStandings() {
  document.getElementById("standings-body").innerHTML = standingsData.map(row => {
    let posClass = "";
    if (row.pos === 1) posClass = "pos-1";
    else if (row.pos === 2) posClass = "pos-2";
    else if (row.pos === 3) posClass = "pos-3";
    else if (row.pos >= 15) posClass = "pos-rel";

    return `
      <tr>
        <td><span class="pos-badge ${posClass}">${row.pos}</span></td>
        <td style="font-weight: 700;">${row.team}</td>
        <td>${row.p}</td>
        <td>${row.w}</td>
        <td>${row.d}</td>
        <td>${row.l}</td>
        <td style="color: var(--text-muted);">${row.gd}</td>
        <td class="pts-cell">${row.pts}</td>
      </tr>
    `;
  }).join("");
}

function renderScorers() {
  document.getElementById("scorers-grid").innerHTML = topScorers.map(s => {
    const rankClass = s.rank <= 3 ? `rank-${s.rank}` : "";
    return `
      <div class="scorer-card">
        <div class="scorer-left">
          <div class="rank-circle ${rankClass}">${s.rank}</div>
          <div class="scorer-info">
            <h4>${s.name}</h4>
            <span>${s.club}</span>
          </div>
        </div>
        <div class="goals-pill">${s.goals}<small>Gol</small></div>
      </div>
    `;
  }).join("");
}

function renderTeams(list = teamsData) {
  document.getElementById("teams-grid").innerHTML = list.map(t => {
    const realIdx = teamsData.findIndex(item => item.name === t.name);
    return `
      <div class="team-card" onclick="openTeamModal(${realIdx})">
        <div class="team-header">
          <div class="team-avatar" style="background: ${t.color};">${t.short}</div>
          <span style="font-size: 12px; color: var(--text-muted);">Murabbiy: ${t.coach}</span>
        </div>
        <h3>${t.name}</h3>
        <p>${t.summary}</p>
        <button class="view-squad-btn">Tarkib (${t.players.length} nafar asosiy o‘yinchi) →</button>
      </div>
    `;
  }).join("");
}

function filterTeams() {
  const q = document.getElementById("team-search").value.toLowerCase().trim();
  if (!q) {
    renderTeams(teamsData);
    return;
  }
  const filtered = teamsData.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.coach.toLowerCase().includes(q) ||
    t.players.some(p => p.name.toLowerCase().includes(q))
  );
  renderTeams(filtered);
}

// ============================================================
// 8. TAB VA MODAL FUNKSIYALARI
// ============================================================
function switchTab(sectionId, btn) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

function openTeamModal(index) {
  const team = teamsData[index];
  document.getElementById("modal-team-name").textContent = team.name;
  document.getElementById("modal-team-meta").textContent = `Bosh murabbiy: ${team.coach} • Stadion: ${team.stadium}`;

  document.getElementById("modal-players-list").innerHTML = team.players.map(p => `
    <div class="player-item">
      <div class="player-row">
        <div>
          <span class="player-num">#${p.num}</span>
          <strong style="font-size: 15px;">${p.name}</strong>
          <span style="color: var(--text-muted); font-size: 12.5px; margin-left: 6px;">(${p.age} yosh)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: rgba(0,229,160,0.15); color: var(--accent); padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 12px;">★ ${p.rating}</span>
          <span class="player-pos">${p.pos}</span>
        </div>
      </div>
      <p class="player-bio">${p.bio}</p>
    </div>
  `).join("");

  document.getElementById("team-modal").classList.add("open");
}

function openMatchModal(index) {
  const m = liveMatches[index];
  document.getElementById("match-modal-status").textContent = `🔴 JONLI • ${m.minute}-DAQIQA`;
  document.getElementById("match-modal-title").textContent = `${m.home}  ${m.homeScore} : ${m.awayScore}  ${m.away}`;
  document.getElementById("match-modal-stadium").textContent = `${m.league} • ${m.stadium}`;

  const eventsHtml = m.events.map(e => `
    <div class="player-item" style="flex-direction: row; justify-content: space-between; align-items: center;">
      <div>
        <span class="player-num">${e.min}'</span>
        <strong>${e.player}</strong>
      </div>
      <span class="player-pos">${e.type}</span>
    </div>
  `).join("");

  document.getElementById("match-modal-body").innerHTML = `
    <h4 class="modal-subtitle">O‘yin voqealari (Gollar va kartochkalar)</h4>
    ${eventsHtml}
    <h4 class="modal-subtitle" style="margin-top: 18px;">SofaScore o‘yin statistikasi</h4>
    <div class="player-item">
      <div class="player-row"><span>To‘p nazorati</span><strong>${m.stats.possession[0]}% — ${m.stats.possession[1]}%</strong></div>
      <div class="player-row"><span>Jami zarbalar</span><strong>${m.stats.shots[0]} — ${m.stats.shots[1]}</strong></div>
      <div class="player-row"><span>Aniq zarbalar</span><strong>${m.stats.onTarget[0]} — ${m.stats.onTarget[1]}</strong></div>
      <div class="player-row"><span>Burchak to‘plari</span><strong>${m.stats.corners[0]} — ${m.stats.corners[1]}</strong></div>
    </div>
  `;

  document.getElementById("match-modal").classList.add("open");
}

function closeModal(e, id) {
  if (e.target.id === id) forceCloseModal(id);
}

function forceCloseModal(id) {
  document.getElementById(id).classList.remove("open");
}

// Jonli daqiqalarni avtomatik yangilab turish (har 15 soniyada)
setInterval(() => {
  if (!API_CONFIG.useRealApi) {
    liveMatches.forEach(m => {
      if (m.minute < 90) m.minute += 1;
    });
    renderLiveMatches();
  } else {
    fetchLiveFromApi();
  }
}, 15000);

// Ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
  renderMatches();
  renderStandings();
  renderScorers();
  renderTeams();
  fetchLiveFromApi();
});