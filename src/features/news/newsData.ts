/**
 * UzScore — Yangiliklar Mock Ma'lumotlari
 * Professional sport jurnalistikasi standarti
 */

export type NewsCategory = 'UCL' | 'UEL' | 'Superliga' | 'Transferlar' | 'Tahlil';

export interface WinProbability {
  home: number;
  draw: number;
  away: number;
  homeTeamName: string;
  awayTeamName: string;
}

export interface RelatedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'LIVE' | 'FT' | 'SCHEDULED';
  minute?: number;
  date: string;
  tournament: string;
}

export interface NewsArticle {
  id: string;
  category: NewsCategory;
  title: string;
  summary: string;
  fullContent: string;
  readTimeMinutes: number;
  publishedAt: string;
  author: string;
  authorRole: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  badgeColor: string;
  teamLogos: { name: string; initials: string; color: string; bg: string }[];
  winProbability?: WinProbability;
  relatedMatch?: RelatedMatch;
  highlights?: string[];
  keyStats?: { label: string; value: string; team?: string }[];
}

export const NEWS_CATEGORIES: { id: NewsCategory | 'Hammasi'; label: string; color: string; borderColor: string }[] = [
  { id: 'Hammasi', label: 'Barcha', color: 'text-emerald-400 bg-emerald-500/15', borderColor: 'border-emerald-500/30' },
  { id: 'UCL', label: 'UCL', color: 'text-blue-300 bg-blue-600/20', borderColor: 'border-blue-500/30' },
  { id: 'UEL', label: 'UEL', color: 'text-orange-400 bg-orange-500/15', borderColor: 'border-orange-500/30' },
  { id: 'Superliga', label: 'Superliga', color: 'text-emerald-400 bg-emerald-500/15', borderColor: 'border-emerald-500/30' },
  { id: 'Transferlar', label: 'Transfer', color: 'text-purple-400 bg-purple-500/15', borderColor: 'border-purple-500/30' },
  { id: 'Tahlil', label: 'Tahlil', color: 'text-cyan-400 bg-cyan-500/15', borderColor: 'border-cyan-500/30' },
];

export const mockNewsArticles: NewsArticle[] = [
  // =============================================
  // 1. UCL — Real Madrid vs Manchester City
  // =============================================
  {
    id: 'news-ucl-1',
    category: 'UCL',
    title: "Real Madrid — Man City: Bernabeu muhiti va Real'ning g'alaba formulasi",
    summary:
      "Chempionlar Ligasining cho'qqi duelida Real Madrid uy maydonida Manchester City bilan uchrashadi. Ancelotti'ning tajribaliligi Guardiola'ning taktik novatorligi bilan sinovda.",
    fullContent: `Evropa futbolining eng prestiJli musobaqasida yana bir katta duel! Real Madrid Bernabeu stadionida Manchester City jamoasini qabul qiladi. Bu uchrashuv nafaqat sport natiJasi, balki ikki futbol falsafasining to'qnashuvi sifatida ham tarixga kiradi.

**Ancelotti'ning g'alaba formulasi**

Carlo Ancelotti so'nggi 5 ta Chempionlar Ligasi dueli'da Real Madrid'ni muvaffaqiyatga olib kelgan. Uning sirli formulasi — tajribali mudofaa liniyasi va Vinicius Juniori orqali hujum qilish. Bu safar ham Modric va Bellingham'ni o'rta qatorda joylashtirishi kutilmoqda.

**Guardiola'ning yangi plani**

Pep Guardiola Real Madrid maydoniga noodatiy 4-1-4-1 sxemasi bilan kirishi taxmin qilinmoqda. Erling Haaland'ni oldin chiqarib yuborib, so'ngra De Bruyne va Foden'ni birlashtirish orqali Real'ning mudofaasini sinashi kutiladi.

**Raqamlar nimani ko'rsatmoqda?**

Son-sanoqsiz duel statistikasiga ko'ra, Real Madrid Bernabeu'da so'nggi 11 ta Chempionlar Ligasi o'yinidan 9 tasida g'alaba qozongan. Biroq Manchester City ham so'nggi mavsum 78 ta o'yin natijasida 71 ta g'alaba bilan tarixi rekordini o'rnatdi.

**Asosiy jangovar shaxslar**

Vinicius Junior — 2025-26 mavsumida UCL'da 7 ta gol bilan eng samarali hujumchi. Erling Haaland — Osiyo Champions Trophy'dan keyin yangi motivatsiya bilan kelmoqda.

**Prognoz**

Ko'plab tahlilchilar Real Madrid'ning uy maydonidagi psixologik ustunligini e'tirof etsa-da, Guardiolaning taktik usta ekanligini ham inkor etib bo'lmaydi. Bu o'yin taxminan 90 minut davomida keskin hal bo'lishi kutiladi.`,
    readTimeMinutes: 4,
    publishedAt: '2026-11-16T10:30:00+05:00',
    author: 'Doniyor Hasanov',
    authorRole: 'UCL Muharriri',
    tags: ['Real Madrid', 'Man City', 'UCL', 'Ancelotti', 'Guardiola'],
    gradientFrom: '#1e3a8a',
    gradientTo: '#0f172a',
    accentColor: '#3b82f6',
    badgeColor: 'bg-blue-600/25 text-blue-300 border-blue-500/30',
    teamLogos: [
      { name: 'Real Madrid', initials: 'RM', color: '#93c5fd', bg: 'linear-gradient(135deg, #1e3a8a, #0f172a)' },
      { name: 'Man City', initials: 'MC', color: '#a7f3d0', bg: 'linear-gradient(135deg, #065f46, #1e3a8a)' },
    ],
    winProbability: { home: 52, draw: 26, away: 22, homeTeamName: 'Real Madrid', awayTeamName: 'Man City' },
    relatedMatch: {
      id: 'match-ucl-1',
      homeTeam: 'Real Madrid',
      awayTeam: 'Man City',
      status: 'SCHEDULED',
      date: '20:45',
      tournament: 'UCL — 5-tur',
    },
    highlights: [
      "Real Madrid so'nggi 11 UCL uyda o'ynalgan o'yindan 9 tasini yutdi",
      "Vinicius Junior — mavsumdagi 7 ta UCL goli bilan lider",
      "Haaland — City uchun 23 o'yin 29 gol statistikasi",
      "Bernabeu stadioni 85,000 tomoshabin sig'imida to'liq sotilgan",
    ],
    keyStats: [
      { label: 'xG (Kutilgan Gol)', value: '2.3 vs 1.8', team: 'Real Madrid' },
      { label: 'Zarba aniqligi', value: '71% vs 68%' },
      { label: 'Top tezlik', value: '34.2 km/s', team: 'Vinicius' },
    ],
  },

  // =============================================
  // 2. SUPERLIGA — Paxtakor tahlili
  // =============================================
  {
    id: 'news-sl-1',
    category: 'Superliga',
    title: "Paxtakor 19-turda Nasaf'ni tor qo'lda: Superligada mavsum burilish nuqtasi",
    summary:
      "Paxtakor Toshkentning o'z maydonida Nasaf Qarshi bilan bo'lgan hal qiluvchi duelda 2-1 hisobida g'alaba qozondi. Bu natija unvon poygasiga jiddiy ta'sir ko'rsatadi.",
    fullContent: `O'zbekiston Superligasida 19-tur hal qiluvchi bo'ldi! Paxtakor Milliy stadionida eng asosiy raqibi Nasaf Qarshi'ni 2-1 hisobida yengdi. Bu g'alaba paxtakorliklarni jadval tepasiga olib chiqdi va mavsum unvonida asosiy da'vogar sifatida mustahkamladi.

**O'yin qanday o'tdi?**

Birinchi yarim vaqtda Paxtakor Eldor Shomurodov'ning nozik burchagi golidan keyin 1-0 oldiga chiqdi. Nasaf 60-daqiqada Firdavs Toshev'ning zarbi orqali tenglashtirdi. Ammo 78-daqiqada Jaloliddin Masharipov'ning ajoyib erkin zarbi g'oliblikni aniqladi.

**Taktik tahlil**

Paxtakor bu safar 4-3-3 sxemasidan foydalanib, o'rta qatorni ko'proq nazorat qildi. Ular 61% qop saqlab, 23 ta zarba ursalar, shundan 8 tasi darvozaga qaratildi. Nasaf esa kontr-hujum strategiyasiga tayanib, bir necha bor xavfli vaziyat yaratdi.

**Shomurodov — Superliganing eng yaxshi futbolchisi**

Eldor Shomurodov bu mavsum 19 ta o'yin 14 ta gol bilan Superliganing gollar jadvalidagi yetakchisi. U shuningdek 8 ta gol tayyorlab 22 ta ball bilan umumiy reyting jadvalida ham birinchi o'rinda.

**Yil oxirigacha prognoz**

Paxtakor: 44 ball — Nasaf: 41 ball — Neftchi: 38 ball. 4 tur qoldi. Agar Paxtakor navbatdagi ikki o'yinni yutsa, Superliga unvoni deyarli kafolatlanadi.`,
    readTimeMinutes: 3,
    publishedAt: '2026-11-16T08:15:00+05:00',
    author: 'Sarvar Yusupov',
    authorRole: 'Superliga Muharriri',
    tags: ['Paxtakor', 'Nasaf', 'Superliga', 'Shomurodov'],
    gradientFrom: '#065f46',
    gradientTo: '#022c22',
    accentColor: '#10b981',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    teamLogos: [
      { name: 'Paxtakor', initials: 'PX', color: '#6ee7b7', bg: 'linear-gradient(135deg, #065f46, #022c22)' },
      { name: 'Nasaf', initials: 'NS', color: '#93c5fd', bg: 'linear-gradient(135deg, #1e3a8a, #0f172a)' },
    ],
    winProbability: { home: 58, draw: 22, away: 20, homeTeamName: 'Paxtakor', awayTeamName: 'Nasaf' },
    relatedMatch: {
      id: 'match-1',
      homeTeam: 'Paxtakor',
      awayTeam: 'Nasaf',
      homeScore: 2,
      awayScore: 1,
      status: 'FT',
      date: 'Bugun',
      tournament: 'Superliga — 19-tur',
    },
    highlights: [
      "Shomurodov 14-gol bilan oltin etik poygasida yetakchiligini saqlamoqda",
      'Paxtakor 44 ball bilan jadval tepasida',
      "Nasaf'dan mudofaachilar 3 ta sariq karta oldi",
      "Milliy stadionida 32,000 tomoshabin ishtirok etdi",
    ],
    keyStats: [
      { label: 'Top saqlab', value: '61% vs 39%', team: 'Paxtakor' },
      { label: 'Zarba (darvozaga)', value: '23 (8) vs 11 (4)' },
      { label: 'Sariq karta', value: '1 vs 3' },
    ],
  },

  // =============================================
  // 3. TRANSFER — Bellingham haqida mish-mish
  // =============================================
  {
    id: 'news-transfer-1',
    category: 'Transferlar',
    title: "Bellingham'ga PSG qiziqmoqda: Fabrizio Romano — 180M€ summasi tasdiqlandi",
    summary:
      "Transfer eksperti Fabrizio Romano Jude Bellingham'ni Real Madrid'dan sotib olish uchun PSG 180 million evrolik taklif tayyorlaganini ma'lum qildi. Real Madrid hozircha sotilishi haqida so'z bo'lmayapti.",
    fullContent: `Transfer dunyosini yana bir yangilik larzaga keltirdi! Fabrizio Romano — jahonning eng ishonchli transfer manbaasi — Jude Bellingham haqida shunday ma'lumot berdi: Paris Saint-Germain Angliya yulduzini sotib olish uchun jiddiy muzokaralar olib bormoqda.

**Raqamlar va faktlar**

Romano Twitter'da "Here We Go" belgisiz bo'lsa-da, PSG'ning 180 million evrolik rasmiy taklifini tasdiqladi. Real Madrid hozircha buni rad etib, Bellingham'ni sotishni rejalashtirayotgani yo'q deb javob berdi.

**Nima uchun PSG bunday harakatda?**

PSG 2025-26 mavsumdagi UCL guruh bosqichida yaxshi natiJa ko'rsata olmadi. Ular yangi format bo'yicha Top 24 ichiga kirishi uchun kuchli "farrosh o'rtapolchi" qidirmoqda. Bellingham — bu roldagi dunyo bo'yicha eng yaxshi 3 nafar futbolchidan biri.

**Bellingham'ning hozirgi holati**

Jude Bellingham bu mavsum Real Madrid uchun 23 o'yin 11 gol 9 assist qayd etib, ajoyib natijani ko'rsatmoqda. U Real Madrid bilan 2029 yilgacha shartnoma tuzgan va uning agenti Middlesbrough kelishuvini buzishni istamayapti.

**Ekspertlar fikri**

Sky Sports tahlilchisi Jamie Carragher: "Bellingham 23 yoshida allaqachon dunyo futbolining aylanishi. Uni 180M€ ga sotib olish aqldan ozish emas, bu investitsiya."

WhoScored.com reytingiga ko'ra Bellingham 8.4 ball bilan Evropa ligalari bo'yicha eng yaxshi o'rta yarim himoyachi.

**Kelajak**

Yanvar transfer oynasi 2027 yil 1 yanvarda ochiladi. Romano'ga ko'ra PSG bu masalani dekabr oyida hal qilmoqchi.`,
    readTimeMinutes: 5,
    publishedAt: '2026-11-16T12:00:00+05:00',
    author: 'Nodir Qodirov',
    authorRole: "Transfer Mutaxassisi",
    tags: ['Bellingham', 'PSG', 'Real Madrid', 'Transfer', 'Romano'],
    gradientFrom: '#581c87',
    gradientTo: '#2e1065',
    accentColor: '#a855f7',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    teamLogos: [
      { name: 'PSG', initials: 'PS', color: '#e9d5ff', bg: 'linear-gradient(135deg, #581c87, #1e3a8a)' },
      { name: 'Real Madrid', initials: 'RM', color: '#93c5fd', bg: 'linear-gradient(135deg, #1e3a8a, #0f172a)' },
    ],
    highlights: [
      "Fabrizio Romano 180M€ summani tasdiqladi",
      "Real Madrid so'nggi 3 transfer oynasida Bellingham'ni saqlab qolgan",
      "PSG UCL guruh bosqichida 7-o'rinda, kuchli kadrni qidirmoqda",
      "Bellingham — WhoScored reytingida 8.4 ball bilan 1-o'rinda",
    ],
    keyStats: [
      { label: "Mavsumdagi gol/assist", value: '11G + 9A', team: 'Bellingham' },
      { label: "WhoScored reytingi", value: '8.4/10' },
      { label: 'Taklif summasi', value: '180,000,000 €' },
    ],
  },

  // =============================================
  // 4. UEL — Arsenal tahlili
  // =============================================
  {
    id: 'news-uel-1',
    category: 'UEL',
    title: "Arsenal — Yevropa Ligasida: Arteta'ning yangi 3-4-3 sistemasi muvaffaqiyat keltirmoqda",
    summary:
      "Arsenal so'nggi 5 ta Yevropa Ligasi o'yinidan 4 tasini yutdi. Mikel Arteta'ning innovatsion 3-4-3 sistemasi raqiblarni dovdiratmoqda.",
    fullContent: `Arsenal Yevropa Ligasida keskin taktik o'zgarish bilan ajoyib natijalar ko'rsatmoqda! Mikel Arteta 3-4-3 sistemasiga o'tgach, Gunners so'nggi 5 o'yindan 4 tasini yutdi, 1 tasini durang bilan yakunladi.

**3-4-3 nima uchun ishlayapti?**

Arteta'ning yangi sistemasida mudofaa liniyasi 3 ta markaziy himoyachidan iborat. Bu esa kanatlar bo'ylab hujum qiluvchi o'ng va chap himoyachilarga ko'proq erkinlik beradi. Gabriel Martinelli va Bukayo Saka endi mustaqil ravishda raqib darvozasiga zarba berish imkoniyatiga ega.

**Raqamlar gapiryapti**

So'nggi 5 UEL o'yinida Arsenal 17 ta gol urdi, faqat 3 ta gol yedi. xG (Kutilgan Gol) ko'rsatkichi: 15.4 vs 4.1 — bu Arsenal'ning hujum dominantligini ko'rsatmoqda.

**Saka — O'rtapoychidan hujumchiga**

Bukayo Saka bu mavsum UEL'da 6 ta gol va 5 ta assist bilan UEL yulduzlari orasida eng samarali hisoblanmoqda. Uning yangi roldagi ko'rsatkichlari — darvozaga 3.4 zarba/o'yin va 7.8 muvaffaqiyatli dribbling/o'yin.

**Raqiblar nimadan qo'rqmoqda?**

Statistik tahlilga ko'ra Arsenal'ning 3-4-3 sistemasida eng xavfli xususiyat — to'p yo'qotganda zudlik bilan topish (pressing). Ular o'rtacha 4.2 soniya ichida to'pni qaytarib oladi — bu Yevropa ligalari bo'yicha rekord.

**Keyingi tur**

Arsenal navbatdagi UEL o'yinida Porto'ni qabul qiladi. Porto ham kuchli jamoaligini ko'rsatdi, ammo Emirates stadionida Arsenal'ning ustunligi aniq ko'rinadi.`,
    readTimeMinutes: 4,
    publishedAt: '2026-11-15T16:45:00+05:00',
    author: 'Alisher Mirzayev',
    authorRole: 'Evropa Futboli Muharriri',
    tags: ['Arsenal', 'UEL', 'Arteta', 'Saka', 'Taktika'],
    gradientFrom: '#991b1b',
    gradientTo: '#450a0a',
    accentColor: '#ef4444',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    teamLogos: [
      { name: 'Arsenal', initials: 'AR', color: '#fca5a5', bg: 'linear-gradient(135deg, #991b1b, #450a0a)' },
    ],
    winProbability: { home: 61, draw: 22, away: 17, homeTeamName: 'Arsenal', awayTeamName: 'Porto' },
    relatedMatch: {
      id: 'match-uel-next',
      homeTeam: 'Arsenal',
      awayTeam: 'Porto',
      status: 'SCHEDULED',
      date: '21:00',
      tournament: 'UEL — 6-tur',
    },
    highlights: [
      "So'nggi 5 UEL o'yinidan 4 ta g'alaba",
      "17 gol — 3 ta gol yeyildi (5 o'yin)",
      "Saka — 6 gol + 5 assist, UEL reytingida 1-o'rinda",
      "O'rtacha pressing vaqti: 4.2 soniya — Evropa rekordi",
    ],
    keyStats: [
      { label: 'xG (xujum)', value: '15.4 — 4.1', team: 'Arsenal ustunligi' },
      { label: "Darvozaga zarba/o'yin", value: '8.4', team: 'Arsenal' },
      { label: 'Pressing samaradorligi', value: '94%' },
    ],
  },

  // =============================================
  // 5. TAHLIL — Haaland fenomeni
  // =============================================
  {
    id: 'news-analysis-1',
    category: 'Tahlil',
    title: "Haaland fenomeni: Nima uchun u futbol tarixidagi eng samarali hujumchi?",
    summary:
      "Erling Haaland 23 yoshida allaqachon futbol tarixi yozmoqda. Statistik tahlil, biomexanik tadqiqotlar va ekspertlar fikrlari asosida norvegiyalik yulduzning sirini yechamiz.",
    fullContent: `Erling Haaland — 23 yoshda allaqachon futbol tarixini qayta yozyapti. Man City va Norvegiyadagi raqamlar hech kim bilan taqqoslab bo'lmaydi. Ammo uning fenomenining sirini tushunish uchun raqamlardan tashqarida ham qaray olish kerak.

**Biomexanik ustunlik**

Sport fanlari instituti tadqiqotiga ko'ra, Haaland'ning sprint tezligi 36.1 km/s — Premier League bo'yicha birinchi o'rin. Ammo uning asosiy ustunligi boshqa: u raqib mudofaachilariga nisbatan "boshlanish pozitsiyasini" o'rtacha 0.3 soniya oldin egallaydi. Bu mikro-ustunlik gol olishda hal qiluvchi ahamiyatga ega.

**Mental kuch**

Sky Sports'ning ekskluziv suhbatida Haaland aytdi: "Men har bir daqiqada o'ylab yuradigan narsa — qanday o'rin egallash kerak? Bu o'yinni o'yin ichida o'ynash." Bu uning "spatial intelligence" (fazoviy aql) ustunligini ko'rsatadi.

**Premier League rekordlari**

- Eng tez 50 gol: 48 o'yin (eski rekord: Shearer 79 o'yin)
- Bir mavsumdagi ko'proq gol: 36 (eski rekord: 34, Shearer)
- Ketma-ket 10 o'yinda gol: Premier League tarixi bo'yicha 4-o'rin

**UCL'dagi ko'rsatkichlar**

28 UCL o'yin — 35 gol. Bu raqam hatto Messi va Ronaldo'ning shu yoshdagi ko'rsatkichlaridan ustun. xG ustunligi: Haaland asl kutilgan goldan 0.42 ga ko'p gol urmoqda — bu uning "sovuq tumorshaqlik"ini ko'rsatadi.

**Zaiflik va rivoji**

Haaland'ning asosiy zaif tomoni — to'p ushlab o'ynash (ball-retention). U xali Benzema yoki Lewandowski darajasidagi "qaytib tushuvchi hujumchi" emas. Ammo 23 yoshida bu kamchiliklarni bartaraf etishi mumkin.

**Umumiy baho**

Statistik modellarga ko'ra, Haaland agar hozirgi sur'atda davom etsa, 32 yoshida Ronaldo'ning 807 ta gol rekordigataqarib qolishi taxmin qilinmoqda. Bu futbol tarixidagi eng katta chegirma bo'lar edi.`,
    readTimeMinutes: 6,
    publishedAt: '2026-11-14T14:00:00+05:00',
    author: 'Bekzod Rahimov',
    authorRole: 'Sport Tahlilchisi',
    tags: ['Haaland', 'Man City', 'UCL', 'Tahlil', 'Statistika'],
    gradientFrom: '#0e7490',
    gradientTo: '#083344',
    accentColor: '#06b6d4',
    badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    teamLogos: [
      { name: 'Man City', initials: 'MC', color: '#a5f3fc', bg: 'linear-gradient(135deg, #0e7490, #083344)' },
      { name: 'Norway', initials: 'NO', color: '#fca5a5', bg: 'linear-gradient(135deg, #991b1b, #450a0a)' },
    ],
    highlights: [
      "Sprint tezligi: 36.1 km/s — Premier League rekordi",
      "50 gol — 48 o'yinda (Shearer rekordi: 79 o'yin)",
      "28 UCL o'yin — 35 gol (Messi va Ronaldo'dan ustun shu yoshda)",
      "xG ustunligi: +0.42 gol/o'yin",
    ],
    keyStats: [
      { label: "Sprint tezligi", value: '36.1 km/s' },
      { label: "Gol/o'yin nisbati", value: '0.94' },
      { label: "xG ustunligi", value: "+0.42/o'yin" },
    ],
  },

  // =============================================
  // 6. UCL — Bayern Munich tahlili
  // =============================================
  {
    id: 'news-ucl-2',
    category: 'UCL',
    title: "Bayern Munich — Kompany effekti: Allianz Arena yangi futbol tili o'rganmoqda",
    summary:
      "Vincent Kompany Bayern Munich'da birinchi mavsumdayoq Bundesliga va UCL'da ikki jalangan yutuqqa erishmoqda. Uning dinamik pressing filosofiyasi nemis futbolini qayta shakllantirmoqda.",
    fullContent: `Vincent Kompany Bayern Munich'da mutlaq inqilob yasamoqda! 38 yoshlik belçiyalik trener birinchi to'liq mavsumdayoq Bundesliga o'yinchilari ustidan to'liq nazoratni qo'lga kiritdi va UCL guruh bosqichida 5 ta o'yindan 5 ta g'alaba bilan peshqadam.

**Kompany'ning taktik falsafasi**

"Futbol — hujumkor pressing orqali boshqariladi" — bu Kompany'ning asosiy printsipi. U Bundesliga tarixidagi eng yuqori PPDA (Passes Allowed Per Defensive Action) ko'rsatkichiga erishdi: 6.2 — bu raqib to'p saqlaganda 6.2 ta uzatishdan keyin to'pni qaytarib olinishini anglatadi.

**Jaffe (Kane + Musiala) kombinatsiyasi**

Harry Kane va Jamal Musiala'ning kombinatsiyasi bundesliganing eng xavfli juftligi sifatida e'tirof etildi. Ular birga 32 ta gol qayd etishdi va 16 ta gol tayyorlab berishdi.

**UCL'dagi ko'rsatkich**

5 o'yin — 5 g'alaba — 18 gol — 2 gol yeyildi. Bu Bayern tarixi bo'yicha eng yaxshi UCL guruh bosqichi boshlash natiJasi.

**Raqiblar niJdan qo'rqmoqda?**

Bayern'ning pressing sistemasida eng xavfli element — to'p yo'qotilgandan 3-6 soniya ichida bosim (counterpressing). Ular bu davrada o'rtacha 2.1 marta to'p qaytarib oladi.

**Prognoz**

Bayern Munich shu mavsum UCL finaliga yetishi prognoz qilinmoqda. Raqiblar sifatida Real Madrid yoki Arsenal nomzodlari ko'rsatilmoqda.`,
    readTimeMinutes: 4,
    publishedAt: '2026-11-15T09:30:00+05:00',
    author: 'Doniyor Hasanov',
    authorRole: 'UCL Muharriri',
    tags: ['Bayern', 'Kompany', 'UCL', 'Bundesliga', 'Kane'],
    gradientFrom: '#be123c',
    gradientTo: '#4c0519',
    accentColor: '#f43f5e',
    badgeColor: 'bg-blue-600/25 text-blue-300 border-blue-500/30',
    teamLogos: [
      { name: 'Bayern', initials: 'BY', color: '#fecdd3', bg: 'linear-gradient(135deg, #be123c, #4c0519)' },
    ],
    winProbability: { home: 65, draw: 20, away: 15, homeTeamName: 'Bayern', awayTeamName: 'Dortmund' },
    relatedMatch: {
      id: 'match-ucl-2',
      homeTeam: 'Bayern',
      awayTeam: 'Atlético',
      status: 'SCHEDULED',
      date: '23:00',
      tournament: 'UCL — 5-tur',
    },
    highlights: [
      'UCL guruh bosqichi: 5 o\'yin — 5 g\'alaba',
      'Kane + Musiala: 32 gol + 16 assist kombinatsiyasi',
      "PPDA: 6.2 — Bundesliga eng yuqori pressing ko'rsatkichi",
      'Kompany — Bundesliga trenerlar reyting: 1-o\'rin (90% g\'alaba)',
    ],
    keyStats: [
      { label: 'UCL g\'alaba nisbati', value: '100% (5/5)' },
      { label: 'PPDA pressing', value: '6.2' },
      { label: 'Gol farqi', value: '+16 (5 o\'yin)' },
    ],
  },
];
