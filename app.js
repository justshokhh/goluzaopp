let activeClubIdx = 0;
let activeRoleFilter = "ALL";
let activeRegion = "ALL";
let activeLeagueId = 369;
let activeLeagueSubTab = "table";
let compareMode = "team";
let cmpTeamAIdx = 0;
let cmpTeamBIdx = 1;
let cmpPlayerA = { cIdx: 0, pIdx: 0 };
let cmpPlayerB = { cIdx: 1, pIdx: 0 };
let activePlayerCIdx = 0;
let activePlayerPIdx = 0;
let userApiKey = localStorage.getItem("goluz_api_key_2026") || "";

function ratBadge(val) {
  const n = parseFloat(val);
  if (n >= 7.7) return "rat-blue";
  if (n >= 7.2) return "rat-green";
  return "rat-amber";
}

// Sevimlilar tizimi (Favorites)
function getFavorites() {
  try {
    const raw = localStorage.getItem("goluz_favorites_2026");
    if (!raw) return { clubs: ["Neftchi Farg'ona", "Paxtakor"], players: ["Jasur Jaloliddinov", "Oston Urunov"] };
    return JSON.parse(raw);
  } catch (e) {
    return { clubs: [], players: [] };
  }
}

function saveFavorites(favs) {
  localStorage.setItem("goluz_favorites_2026", JSON.stringify(favs));
}

function isClubFavorite(name) {
  return getFavorites().clubs.includes(name);
}

function isPlayerFavorite(name) {
  return getFavorites().players.includes(name);
}

function toggleCurrentClubFav() {
  const c = allClubs[activeClubIdx];
  if (!c) return;
  const favs = getFavorites();
  const idx = favs.clubs.indexOf(c.name);
  if (idx > -1) {
    favs.clubs.splice(idx, 1);
  } else {
    favs.clubs.push(c.name);
  }
  saveFavorites(favs);
  updateFavClubBtn();
  drawFavorites();
}

function toggleCurrentPlayerFav() {
  const c = allClubs[activePlayerCIdx];
  if (!c) return;
  const p = c.players[activePlayerPIdx];
  if (!p) return;
  const favs = getFavorites();
  const idx = favs.players.indexOf(p.name);
  if (idx > -1) {
    favs.players.splice(idx, 1);
  } else {
    favs.players.push(p.name);
  }
  saveFavorites(favs);
  updateFavPlayerBtn();
  drawFavorites();
}

function updateFavClubBtn() {
  const btn = document.getElementById("mc-fav-btn");
  if (!btn) return;
  const c = allClubs[activeClubIdx];
  if (c && isClubFavorite(c.name)) {
    btn.innerHTML = "★";
    btn.classList.add("active");
  } else {
    btn.innerHTML = "☆";
    btn.classList.remove("active");
  }
}

function updateFavPlayerBtn() {
  const btn = document.getElementById("mp-fav-btn");
  if (!btn) return;
  const c = allClubs[activePlayerCIdx];
  if (!c) return;
  const p = c.players[activePlayerPIdx];
  if (p && isPlayerFavorite(p.name)) {
    btn.innerHTML = "★";
    btn.classList.add("active");
  } else {
    btn.innerHTML = "☆";
    btn.classList.remove("active");
  }
}

function drawMatches() {
  const liveEl = document.getElementById("live-container");
  if (liveEl) {
    liveEl.innerHTML = liveGames.map((m, i) => `
      <div class="match-box is-live" onclick="showMatchModal(${i})">
        <div class="m-header">
          <span>${m.league}</span>
          <span style="color: var(--mint); font-weight: 700;"><i class="dot"></i> ${m.min}'</span>
        </div>
        <div class="m-row">
          <div class="m-club">
            <div class="glass-badge size-sm">
              <img class="real-logo" src="${getTeamLogoUrl(m.home, m.homeLogo)}" alt="${m.home}" onerror="handleLogoError(this, '${m.home}')">
            </div>
            <b>${m.home}</b>
          </div>
          <div class="m-mid">
            <div class="score-pill">${m.hScore} : ${m.aScore}</div>
            <div class="xg-tag">xG ${m.xg[0]} - ${m.xg[1]}</div>
          </div>
          <div class="m-club">
            <div class="glass-badge size-sm">
              <img class="real-logo" src="${getTeamLogoUrl(m.away, m.awayLogo)}" alt="${m.away}" onerror="handleLogoError(this, '${m.away}')">
            </div>
            <b>${m.away}</b>
          </div>
        </div>
        <div class="events-strip">
          ${m.events.map(e => `<span class="chip">${e.icon} ${e.min}' ${e.text}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  const upEl = document.getElementById("upcoming-container");
  if (upEl) {
    upEl.innerHTML = upcomingGames.map(m => `
      <div class="match-box">
        <div class="m-header"><span>${m.status}</span><span style="color:var(--blue); font-weight:600;">${m.time}</span></div>
        <div class="m-row">
          <div class="m-club">
            <div class="glass-badge size-sm">
              <img class="real-logo" src="${getTeamLogoUrl(m.home)}" alt="${m.home}" onerror="handleLogoError(this, '${m.home}')">
            </div>
            <b>${m.home}</b>
          </div>
          <div class="m-mid"><div class="score-pill" style="font-size:16px;">VS</div><div class="xg-tag">Boshlanmagan</div></div>
          <div class="m-club">
            <div class="glass-badge size-sm">
              <img class="real-logo" src="${getTeamLogoUrl(m.away)}" alt="${m.away}" onerror="handleLogoError(this, '${m.away}')">
            </div>
            <b>${m.away}</b>
          </div>
        </div>
      </div>
    `).join("");
  }

  const recEl = document.getElementById("recent-container");
  if (recEl) {
    recEl.innerHTML = pastGames.map(m => `
      <div class="match-box">
        <div class="m-header"><span>${m.date}</span><span>FT</span></div>
        <div class="m-row">
          <div class="m-club">
            <div class="glass-badge size-sm">
              <img class="real-logo" src="${getTeamLogoUrl(m.home)}" alt="${m.home}" onerror="handleLogoError(this, '${m.home}')">
            </div>
            <b>${m.home}</b>
          </div>
          <div class="m-mid"><div class="score-pill">${m.score}</div><div class="xg-tag">Yakunlangan</div></div>
          <div class="m-club">
            <div class="glass-badge size-sm">
              <img class="real-logo" src="${getTeamLogoUrl(m.away)}" alt="${m.away}" onerror="handleLogoError(this, '${m.away}')">
            </div>
            <b>${m.away}</b>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function drawTable() {
  const el = document.getElementById("standings-body");
  if (!el) return;
  el.innerHTML = tableRows.map(r => {
    let cls = r.pos === 1 ? "p-ucl" : r.pos === 2 ? "p-acl" : r.pos >= 15 ? "p-rel" : "";
    return `
      <tr>
        <td><span class="pos-num ${cls}">${r.pos}</span></td>
        <td>
          <div class="t-flex">
            <div class="glass-badge size-xs">
              <img class="mini-logo" src="${getTeamLogoUrl(r.team, r.logo)}" onerror="handleLogoError(this, '${r.team}')">
            </div>
            <span>${r.team}</span>
          </div>
        </td>
        <td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
        <td style="color: var(--muted);">${r.g}</td>
        <td style="font-weight: 800; color: var(--mint);">${r.pts}</td>
      </tr>
    `;
  }).join("");
}

function drawScorers() {
  const el = document.getElementById("scorers-container");
  if (!el) return;
  const list = [];
  allClubs.forEach((c, cIdx) => c.players.forEach((p, pIdx) => list.push({ ...p, club: c.name, cIdx, pIdx })));
  list.sort((a, b) => b.goals - a.goals || b.assists - a.assists);

  el.innerHTML = list.slice(0, 14).map((s, idx) => `
    <div class="player-card" onclick="openPlayerStats(${s.cIdx}, ${s.pIdx})">
      <div class="pl-left">
        <img class="pl-img" src="${getPlayerPhotoUrl(s)}" onerror="handlePlayerImgError(this, '${s.name}')">
        <div>
          <div class="pl-name">${idx + 1}. ${s.name}</div>
          <div class="pl-meta">
            <div class="glass-badge size-xs" style="display:inline-flex; vertical-align:middle; margin-right:4px;">
              <img class="mini-logo" src="${getTeamLogoUrl(s.club)}" onerror="handleLogoError(this, '${s.club}')">
            </div>
            <span>${s.club} • ⚽ ${s.goals} gol • 🎯 ${s.assists} assist</span>
          </div>
        </div>
      </div>
      <div class="rat-box ${ratBadge(s.rating)}">${s.rating}</div>
    </div>
  `).join("");
}

function drawClubs(list = allClubs) {
  const container = document.getElementById("clubs-container");
  if (!container) return;
  container.innerHTML = list.map(c => {
    const p = clubColors[c.name] || ["#1e293b", "#0f172a"];
    const realIdx = allClubs.findIndex(x => x.name === c.name);
    return `
      <div class="club-box" style="background: linear-gradient(145deg, ${p[0]}38, ${p[1]}b0);" onclick="showClubModal(${realIdx})">
        <div class="cb-top">
          <div class="glass-badge size-md">
            <img class="real-logo" src="${getTeamLogoUrl(c.name)}" alt="${c.name}" onerror="handleLogoError(this, '${c.name}')">
          </div>
          <span style="background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: 700;">${c.pts} ochko</span>
        </div>
        <div class="cb-name">${c.name}</div>
        <div class="cb-info">📍 ${c.city} • 👔 ${c.coach}</div>
        <div class="cb-foot">
          <span>👥 ${c.players.length} futbolchi</span>
          <span style="color: var(--mint);">To‘liq tarkib →</span>
        </div>
      </div>
    `;
  }).join("");
}

function searchClubs() {
  const q = document.getElementById("search-box").value.toLowerCase().trim();
  if (!q) return drawClubs(allClubs);
  drawClubs(allClubs.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.city.toLowerCase().includes(q) ||
    c.players.some(p => p.name.toLowerCase().includes(q))
  ));
}

// 18 ta Musobaqa (Ligalar) render qilish
function filterByRegion(reg, btn) {
  activeRegion = reg;
  document.querySelectorAll(".region-pill").forEach(p => p.classList.remove("active"));
  if (btn) btn.classList.add("active");
  drawLeagues();
}

function drawLeagues() {
  const container = document.getElementById("leagues-container");
  if (!container) return;
  const list = typeof getLeaguesByRegion === "function" ? getLeaguesByRegion(activeRegion) : LEAGUES_DATA;

  container.innerHTML = list.map(l => {
    const leader = l.standings && l.standings[0] ? l.standings[0].team : "Lider";
    const pts = l.standings && l.standings[0] ? `${l.standings[0].pts} ochko` : "";
    return `
      <div class="league-card" onclick="openLeagueModal(${l.id})">
        <div class="lc-top">
          <div class="glass-badge size-md">
            <img class="real-logo" src="${getLeagueLogoUrl(l.id, l.name)}" alt="${l.name}" onerror="handleLeagueLogoError(this, '${l.name}')">
          </div>
          <span class="region-badge">${l.region} • ID ${l.id}</span>
        </div>
        <div class="lc-name">${l.name}</div>
        <div class="lc-country">${l.flag} ${l.country}</div>
        <div class="lc-meta">
          <span>🏆 Lider: <b>${leader}</b></span>
          <span style="color: var(--mint);">${pts}</span>
        </div>
      </div>
    `;
  }).join("");
}

function openLeagueModal(leagueId) {
  activeLeagueId = leagueId;
  activeLeagueSubTab = "table";
  const l = typeof getLeagueById === "function" ? getLeagueById(leagueId) : LEAGUES_DATA.find(x => x.id === leagueId);
  if (!l) return;

  const logoEl = document.getElementById("ml-logo");
  if (logoEl) {
    logoEl.src = getLeagueLogoUrl(l.id, l.name);
    logoEl.onerror = () => handleLeagueLogoError(logoEl, l.name);
  }
  document.getElementById("ml-title").textContent = `${l.flag} ${l.name}`;
  document.getElementById("ml-sub").textContent = `${l.country} • Rasmiy ID: ${l.id} • 2026-yilgi musobaqa`;

  // Sub-tab tugmalarini yangilash
  document.querySelectorAll("#m-league .filter-row .f-pill").forEach((b, i) => {
    b.classList.toggle("active", i === 0);
  });

  renderLeagueSubTab();
  document.getElementById("m-league").classList.add("open");
}

function showLeagueSubTab(type, btn) {
  activeLeagueSubTab = type;
  document.querySelectorAll("#m-league .filter-row .f-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderLeagueSubTab();
}

function renderLeagueSubTab() {
  const body = document.getElementById("ml-body");
  if (!body) return;
  const l = typeof getLeagueById === "function" ? getLeagueById(activeLeagueId) : LEAGUES_DATA.find(x => x.id === activeLeagueId);
  if (!l) return;

  if (activeLeagueSubTab === "table") {
    const rows = l.standings || [];
    body.innerHTML = `
      <div style="overflow-x: auto;">
        <table class="table-dark">
          <thead>
            <tr>
              <th style="width: 38px;">#</th>
              <th>Klub</th>
              <th>O‘</th>
              <th>G‘</th>
              <th>D</th>
              <th>M</th>
              <th>Gollar</th>
              <th style="text-align: right;">Ochko</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, i) => {
              const posCls = r.pos === 1 ? "p-ucl" : r.pos <= 3 ? "p-acl" : r.pos >= rows.length - 2 ? "p-rel" : "";
              return `
                <tr>
                  <td><span class="pos-num ${posCls}">${r.pos || i + 1}</span></td>
                  <td>
                    <div class="t-flex">
                      <div class="glass-badge size-xs">
                        <img class="mini-logo" src="${getTeamLogoUrl(r.team)}" alt="${r.team}" onerror="handleLogoError(this, '${r.team}')">
                      </div>
                      <span style="font-weight: 600;">${r.team}</span>
                    </div>
                  </td>
                  <td>${r.p}</td>
                  <td>${r.w}</td>
                  <td>${r.d}</td>
                  <td>${r.l}</td>
                  <td style="color: var(--muted);">${r.g}</td>
                  <td style="text-align: right; font-weight: 800; color: var(--mint);">${r.pts}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (activeLeagueSubTab === "fixtures") {
    const list = l.fixtures || [];
    body.innerHTML = `
      <div class="grid-2" style="margin-top: 10px;">
        ${list.map(f => `
          <div class="match-box">
            <div class="m-header">
              <span>${f.date || "2026"}</span>
              <span style="color: ${f.status === 'FT' ? 'var(--muted)' : 'var(--mint)'}; font-weight: 700;">${f.time || f.status}</span>
            </div>
            <div class="m-row">
              <div class="m-club">
                <div class="glass-badge size-sm">
                  <img class="real-logo" src="${getTeamLogoUrl(f.home)}" onerror="handleLogoError(this, '${f.home}')">
                </div>
                <b>${f.home}</b>
              </div>
              <div class="m-mid">
                <div class="score-pill">${f.score || "VS"}</div>
                <div class="xg-tag">${f.status === 'FT' ? 'Yakunlangan' : 'Boshlanmagan'}</div>
              </div>
              <div class="m-club">
                <div class="glass-badge size-sm">
                  <img class="real-logo" src="${getTeamLogoUrl(f.away)}" onerror="handleLogoError(this, '${f.away}')">
                </div>
                <b>${f.away}</b>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  } else if (activeLeagueSubTab === "scorers") {
    const list = l.scorers || [];
    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
        ${list.map((s, idx) => `
          <div class="player-card">
            <div class="pl-left">
              <img class="pl-img" src="${getPlayerPhotoUrl(s)}" onerror="handlePlayerImgError(this, '${s.name}')">
              <div>
                <div class="pl-name">${idx + 1}. ${s.name}</div>
                <div class="pl-meta">
                  <div class="glass-badge size-xs" style="display:inline-flex; vertical-align:middle; margin-right:4px;">
                    <img class="mini-logo" src="${getTeamLogoUrl(s.team || s.club)}" onerror="handleLogoError(this, '${s.team || s.club}')">
                  </div>
                  <span>${s.team || s.club} • ⚽ ${s.goals} gol • 🎯 ${s.assists || 0} assist</span>
                </div>
              </div>
            </div>
            <div class="rat-box ${ratBadge(s.rating || 7.5)}">${s.rating || 7.5}</div>
          </div>
        `).join("")}
      </div>
    `;
  }
}

// Head-to-Head Taqqoslash tizimi (H2H)
function setCompareMode(mode) {
  compareMode = mode;
  document.getElementById("btn-cmp-team").classList.toggle("active", mode === "team");
  document.getElementById("btn-cmp-player").classList.toggle("active", mode === "player");
  drawCompare();
}

function drawCompare() {
  const body = document.getElementById("compare-body");
  if (!body) return;

  if (compareMode === "team") {
    const tA = allClubs[cmpTeamAIdx] || allClubs[0];
    const tB = allClubs[cmpTeamBIdx] || allClubs[1];

    const totalGoalsA = tA.players.reduce((sum, p) => sum + (p.goals || 0), 0);
    const totalGoalsB = tB.players.reduce((sum, p) => sum + (p.goals || 0), 0);
    const topScorerA = [...tA.players].sort((a,b) => b.goals - a.goals)[0] || { name: "-", goals: 0, rating: "7.0" };
    const topScorerB = [...tB.players].sort((a,b) => b.goals - a.goals)[0] || { name: "-", goals: 0, rating: "7.0" };

    const compareBar = (label, valA, valB, unit = "") => {
      const tot = (parseFloat(valA) + parseFloat(valB)) || 1;
      const pctA = Math.round((parseFloat(valA) / tot) * 100);
      return `
        <div class="stat-item" style="margin-bottom: 14px;">
          <div class="stat-txt">
            <b>${valA}${unit}</b>
            <span style="color: var(--muted);">${label}</span>
            <b>${valB}${unit}</b>
          </div>
          <div class="stat-bar">
            <div class="bar-h" style="width: ${pctA}%"></div>
            <div class="bar-a" style="width: ${100 - pctA}%"></div>
          </div>
        </div>
      `;
    };

    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="compare-card">
          <select class="search-inp" style="margin-bottom: 12px; font-weight: 700;" onchange="cmpTeamAIdx = parseInt(this.value); drawCompare();">
            ${allClubs.map((c, i) => `<option value="${i}" ${i === cmpTeamAIdx ? "selected" : ""}>${c.name}</option>`).join("")}
          </select>
          <div class="glass-badge size-lg" style="margin: 0 auto 12px auto;">
            <img class="real-logo" src="${getTeamLogoUrl(tA.name)}" onerror="handleLogoError(this, '${tA.name}')">
          </div>
          <div style="font-size: 18px; font-weight: 800;">${tA.name}</div>
          <div style="font-size: 13px; color: var(--muted);">📍 ${tA.city} • 👔 ${tA.coach}</div>
        </div>

        <div class="compare-card">
          <select class="search-inp" style="margin-bottom: 12px; font-weight: 700;" onchange="cmpTeamBIdx = parseInt(this.value); drawCompare();">
            ${allClubs.map((c, i) => `<option value="${i}" ${i === cmpTeamBIdx ? "selected" : ""}>${c.name}</option>`).join("")}
          </select>
          <div class="glass-badge size-lg" style="margin: 0 auto 12px auto;">
            <img class="real-logo" src="${getTeamLogoUrl(tB.name)}" onerror="handleLogoError(this, '${tB.name}')">
          </div>
          <div style="font-size: 18px; font-weight: 800;">${tB.name}</div>
          <div style="font-size: 13px; color: var(--muted);">📍 ${tB.city} • 👔 ${tB.coach}</div>
        </div>
      </div>

      <div class="compare-card">
        <h4 style="font-size: 15px; margin-bottom: 16px; color: var(--mint);">📊 Jamoaviy Ko‘rsatkichlar Solishtiruvi</h4>
        ${compareBar("Turnir Ochkolari", tA.pts, tB.pts)}
        ${compareBar("Klub Futbolchilari Soni", tA.players.length, tB.players.length)}
        ${compareBar("Jamoa Urgan Gollar", totalGoalsA, totalGoalsB)}
        ${compareBar(`To‘purar Goli (${topScorerA.name} / ${topScorerB.name})`, topScorerA.goals, topScorerB.goals)}
        ${compareBar("To‘purar Reytingi", topScorerA.rating, topScorerB.rating)}
      </div>
    `;
  } else {
    // Player mode
    const cA = allClubs[cmpPlayerA.cIdx] || allClubs[0];
    const pA = cA.players[cmpPlayerA.pIdx] || cA.players[0];
    const cB = allClubs[cmpPlayerB.cIdx] || allClubs[1];
    const pB = cB.players[cmpPlayerB.pIdx] || cB.players[0];

    const compareBar = (label, valA, valB, unit = "") => {
      const tot = (parseFloat(valA) + parseFloat(valB)) || 1;
      const pctA = Math.round((parseFloat(valA) / tot) * 100);
      return `
        <div class="stat-item" style="margin-bottom: 14px;">
          <div class="stat-txt">
            <b>${valA}${unit}</b>
            <span style="color: var(--muted);">${label}</span>
            <b>${valB}${unit}</b>
          </div>
          <div class="stat-bar">
            <div class="bar-h" style="width: ${pctA}%"></div>
            <div class="bar-a" style="width: ${100 - pctA}%"></div>
          </div>
        </div>
      `;
    };

    let pOptionsA = "";
    let pOptionsB = "";
    allClubs.forEach((c, cI) => {
      c.players.forEach((p, pI) => {
        const val = `${cI}_${pI}`;
        const selA = cI === cmpPlayerA.cIdx && pI === cmpPlayerA.pIdx ? "selected" : "";
        const selB = cI === cmpPlayerB.cIdx && pI === cmpPlayerB.pIdx ? "selected" : "";
        pOptionsA += `<option value="${val}" ${selA}>${p.name} (${c.name})</option>`;
        pOptionsB += `<option value="${val}" ${selB}>${p.name} (${c.name})</option>`;
      });
    });

    body.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="compare-card">
          <select class="search-inp" style="margin-bottom: 12px; font-weight: 700;" onchange="const [ci, pi] = this.value.split('_').map(Number); cmpPlayerA = { cIdx: ci, pIdx: pi }; drawCompare();">
            ${pOptionsA}
          </select>
          <img class="pl-img pl-img-lg" style="margin: 0 auto 12px auto; display: block;" src="${getPlayerPhotoUrl(pA)}" onerror="handlePlayerImgError(this, '${pA.name}')">
          <div style="font-size: 18px; font-weight: 800;">${pA.name} <span class="pos-badge">${pA.role}</span></div>
          <div style="font-size: 13px; color: var(--muted);">${cA.name} • #${pA.num} • Reyting: ${pA.rating}</div>
        </div>

        <div class="compare-card">
          <select class="search-inp" style="margin-bottom: 12px; font-weight: 700;" onchange="const [ci, pi] = this.value.split('_').map(Number); cmpPlayerB = { cIdx: ci, pIdx: pi }; drawCompare();">
            ${pOptionsB}
          </select>
          <img class="pl-img pl-img-lg" style="margin: 0 auto 12px auto; display: block;" src="${getPlayerPhotoUrl(pB)}" onerror="handlePlayerImgError(this, '${pB.name}')">
          <div style="font-size: 18px; font-weight: 800;">${pB.name} <span class="pos-badge">${pB.role}</span></div>
          <div style="font-size: 13px; color: var(--muted);">${cB.name} • #${pB.num} • Reyting: ${pB.rating}</div>
        </div>
      </div>

      <div class="compare-card">
        <h4 style="font-size: 15px; margin-bottom: 16px; color: var(--mint);">👤 Futbolchilar Shaxsiy Statistikasi</h4>
        ${compareBar("SofaScore Reyting", pA.rating, pB.rating)}
        ${compareBar("Urilgan Gollar", pA.goals, pB.goals)}
        ${compareBar("Golli Uzatmalar (Assist)", pA.assists, pB.assists)}
        ${compareBar("O‘tkazilgan O‘yinlar", pA.apps, pB.apps)}
        ${compareBar("Maydondagi Daqiqalar", pA.mins, pB.mins, "'")}
        ${compareBar("Jami Zarbalar", pA.shots, pB.shots)}
        ${compareBar("Kalit Paslar", pA.keyPasses, pB.keyPasses)}
        ${compareBar("Paslar Aniqligi", pA.passAcc, pB.passAcc, "%")}
        ${compareBar("Muvaffaqiyatli Dribling", pA.dribbles ?? 10, pB.dribbles ?? 10)}
        ${compareBar("To‘p Olib Qo‘yish", pA.tackles, pB.tackles)}
      </div>
    `;
  }
}

// Sevimlilar sahifasi render qilish
function drawFavorites() {
  const container = document.getElementById("favorites-container");
  if (!container) return;
  const favs = getFavorites();

  const favClubs = allClubs.filter(c => favs.clubs.includes(c.name));
  const favPlayers = [];
  allClubs.forEach((c, cIdx) => {
    c.players.forEach((p, pIdx) => {
      if (favs.players.includes(p.name)) {
        favPlayers.push({ ...p, clubName: c.name, cIdx, pIdx });
      }
    });
  });

  if (favClubs.length === 0 && favPlayers.length === 0) {
    container.innerHTML = `
      <div class="compare-card" style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 40px; margin-bottom: 12px;">⭐</div>
        <h3 style="font-size: 18px; margin-bottom: 8px;">Hozircha hech qanday sevimli klub yoki futbolchi yo‘q</h3>
        <p style="font-size: 14px; color: var(--muted); margin-bottom: 20px;">
          Superliga klublari yoki futbolchilar kartasidagi yulduzcha (⭐) tugmasini bosib, ularni bu yerga qo‘shishingiz mumkin.
        </p>
        <button class="nav-tab active" onclick="goMainTab('v-clubs')">Superliga Klublarini Ko‘rish</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    ${favClubs.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 15px; margin-bottom: 12px; color: var(--mint);">🛡️ Sevimli Klublaringiz (${favClubs.length})</h4>
        <div class="grid-3">
          ${favClubs.map(c => {
            const realIdx = allClubs.findIndex(x => x.name === c.name);
            return `
              <div class="club-box" onclick="showClubModal(${realIdx})">
                <div class="cb-top">
                  <div class="glass-badge size-md">
                    <img class="real-logo" src="${getTeamLogoUrl(c.name)}" onerror="handleLogoError(this, '${c.name}')">
                  </div>
                  <span style="background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: 700;">${c.pts} ochko</span>
                </div>
                <div class="cb-name">${c.name}</div>
                <div class="cb-info">📍 ${c.city} • 👔 ${c.coach}</div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    ` : ""}

    ${favPlayers.length > 0 ? `
      <div>
        <h4 style="font-size: 15px; margin-bottom: 12px; color: var(--mint);">👤 Sevimli Futbolchilaringiz (${favPlayers.length})</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${favPlayers.map(p => `
            <div class="player-card" onclick="openPlayerStats(${p.cIdx}, ${p.pIdx})">
              <div class="pl-left">
                <img class="pl-img" src="${getPlayerPhotoUrl(p)}" onerror="handlePlayerImgError(this, '${p.name}')">
                <div>
                  <div class="pl-name"><span style="color: var(--mint);">#${p.num}</span> ${p.name} <span class="pos-badge">${p.role}</span></div>
                  <div class="pl-meta">
                    <div class="glass-badge size-xs" style="display:inline-flex; vertical-align:middle; margin-right:4px;">
                      <img class="mini-logo" src="${getTeamLogoUrl(p.clubName)}" onerror="handleLogoError(this, '${p.clubName}')">
                    </div>
                    <span>${p.clubName} • ⚽ ${p.goals} gol • 🎯 ${p.assists} assist</span>
                  </div>
                </div>
              </div>
              <div class="rat-box ${ratBadge(p.rating)}">${p.rating}</div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}
  `;
}

function updateProfileStatus() {
  const el = document.getElementById("profile-api-status");
  if (!el) return;
  if (userApiKey) {
    el.textContent = `API Faol (Kalit: ${userApiKey.slice(0, 4)}...${userApiKey.slice(-4)})`;
    el.style.color = "var(--mint)";
  } else {
    el.textContent = "Lokal Demo Rejimi (18 Liga + 16 Superliga Klubi Yuklangan)";
    el.style.color = "var(--blue)";
  }
}

async function showMatchModal(idx) {
  const m = liveGames[idx];
  document.getElementById("mm-badge").textContent = `🔴 JONLI • ${m.min}-DAQIQA`;
  document.getElementById("mm-head").textContent = `${m.home}  ${m.hScore} : ${m.aScore}  ${m.away}`;
  document.getElementById("m-match").classList.add("open");

  const statLine = (label, h, a, unit = "") => {
    const tot = (h + a) || 1;
    const hp = Math.round((h / tot) * 100);
    return `
      <div class="stat-item">
        <div class="stat-txt"><b>${h}${unit}</b><span style="color:var(--muted)">${label}</span><b>${a}${unit}</b></div>
        <div class="stat-bar"><div class="bar-h" style="width:${hp}%"></div><div class="bar-a" style="width:${100 - hp}%"></div></div>
      </div>
    `;
  };

  document.getElementById("mm-body").innerHTML = `
    <div class="pitch">
      <div class="pitch-midline"></div>
      <div class="pitch-ring"></div>
      <div style="z-index:2; text-align:center;">
        <div class="glass-badge size-md" style="margin: 0 auto 4px auto;">
          <img class="real-logo" src="${getTeamLogoUrl(m.home, m.homeLogo)}" onerror="handleLogoError(this, '${m.home}')">
        </div>
        <div style="font-size:12px; font-weight:700;">${m.home}</div>
      </div>
      <div style="z-index:2; background:rgba(0,0,0,0.65); padding:6px 12px; border-radius:10px; font-size:12px; font-weight:700;">xG: ${m.xg[0]} — ${m.xg[1]}</div>
      <div style="z-index:2; text-align:center;">
        <div class="glass-badge size-md" style="margin: 0 auto 4px auto;">
          <img class="real-logo" src="${getTeamLogoUrl(m.away, m.awayLogo)}" onerror="handleLogoError(this, '${m.away}')">
        </div>
        <div style="font-size:12px; font-weight:700;">${m.away}</div>
      </div>
    </div>
    ${statLine("To‘p nazorati", m.stats.poss[0], m.stats.poss[1], "%")}
    ${statLine("Jami zarbalar", m.stats.shots[0], m.stats.shots[1])}
    ${statLine("Aniq zarbalar", m.stats.target[0], m.stats.target[1])}
    ${statLine("Paslar aniqligi", m.stats.pass[0], m.stats.pass[1], "%")}
    ${statLine("Burchak to‘plari", m.stats.corners[0], m.stats.corners[1])}
  `;
}

async function showClubModal(idx) {
  activeClubIdx = idx;
  activeRoleFilter = "ALL";
  document.querySelectorAll("#m-club .f-pill").forEach((el, i) => el.classList.toggle("active", i === 0));

  const c = allClubs[idx];
  const logoEl = document.getElementById("mc-logo");
  logoEl.src = getTeamLogoUrl(c.name);
  logoEl.onerror = () => handleLogoError(logoEl, c.name);

  document.getElementById("mc-title").textContent = `${c.name} (${c.city})`;
  document.getElementById("mc-sub").textContent = `Murabbiy: ${c.coach} • To‘liq statistika uchun futbolchini bosing`;
  updateFavClubBtn();
  document.getElementById("m-club").classList.add("open");

  if (userApiKey && !c.fullLoaded && c.id) {
    document.getElementById("mc-list").innerHTML = `<p style="text-align:center; padding:24px; color:var(--mint);">⏳ ${c.name} jamoasining barcha futbolchilari yuklanmoqda...</p>`;
    try {
      let collected = [];
      for (let page = 1; page <= 2; page++) {
        const res = await fetch(`https://v3.football.api-sports.io/players?team=${c.id}&season=2026&page=${page}`, {
          headers: { "x-apisports-key": userApiKey }
        });
        const data = await res.json();
        if (data.response && data.response.length > 0) collected = collected.concat(data.response);
        if (!data.paging || page >= data.paging.total) break;
      }
      if (collected.length > 0) {
        c.players = collected.map(item => {
          const st = item.statistics[0] || {};
          const rawPos = st.games?.position || "Midfielder";
          let role = rawPos.includes("Goal") ? "GK" : rawPos.includes("Def") ? "DEF" : rawPos.includes("Att") ? "FWD" : "MID";
          return {
            apiId: item.player.id, photo: item.player.photo, num: st.games?.number || "-",
            name: item.player.name, role, pos: rawPos, nat: item.player.nationality || "O‘zbekiston",
            age: item.player.age || "-", height: item.player.height || "-", weight: item.player.weight || "-",
            apps: st.games?.appearences || 0, starts: st.games?.lineups || 0, mins: st.games?.minutes || 0,
            goals: st.goals?.total || 0, assists: st.goals?.assists || 0, pens: st.penalty?.scored || 0,
            shots: st.shots?.total || 0, keyPasses: st.passes?.key || 0, passAcc: st.passes?.accuracy || 75,
            dribbles: st.dribbles?.success || 0, tackles: st.tackles?.total || 0,
            yellow: st.cards?.yellow || 0, red: st.cards?.red || 0,
            rating: parseFloat(st.games?.rating || "7.0").toFixed(2)
          };
        });
        c.fullLoaded = true;
        drawClubs();
      }
    } catch (e) { console.warn(e); }
  }
  renderRosterList();
}

function filterRoster(role, btn) {
  activeRoleFilter = role;
  document.querySelectorAll("#m-club .f-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderRosterList();
}

function renderRosterList() {
  const c = allClubs[activeClubIdx];
  const filtered = c.players.map((p, originalIdx) => ({ ...p, originalIdx })).filter(p => activeRoleFilter === "ALL" || p.role === activeRoleFilter);
  document.getElementById("mc-list").innerHTML = filtered.map(p => `
    <div class="player-card" style="margin-bottom: 10px;" onclick="openPlayerStats(${activeClubIdx}, ${p.originalIdx})">
      <div class="pl-left">
        <img class="pl-img" src="${getPlayerPhotoUrl(p)}" onerror="handlePlayerImgError(this, '${p.name}')">
        <div>
          <div class="pl-name"><span style="color: var(--mint);">#${p.num}</span> ${p.name} <span class="pos-badge">${p.role}</span></div>
          <div class="pl-meta"><span>${p.pos} • ${p.apps} o‘yin • ⚽ ${p.goals} gol • 🎯 ${p.assists} assist</span></div>
        </div>
      </div>
      <div class="rat-box ${ratBadge(p.rating)}">${p.rating}</div>
    </div>
  `).join("");
}

function openPlayerStats(cIdx, pIdx) {
  activePlayerCIdx = cIdx;
  activePlayerPIdx = pIdx;
  const c = allClubs[cIdx];
  const p = c.players[pIdx];
  const imgEl = document.getElementById("mp-photo");
  imgEl.src = getPlayerPhotoUrl(p);
  imgEl.onerror = () => handlePlayerImgError(imgEl, p.name);

  document.getElementById("mp-name").textContent = `${p.name} (#${p.num})`;
  document.getElementById("mp-info").textContent = `${c.name} • ${p.pos} • Reyting: ${p.rating}`;
  document.getElementById("mp-bio-strip").innerHTML = `
    <span class="bio-chip">🌍 ${p.nat || "🇺🇿 O‘zbekiston"}</span>
    <span class="bio-chip">🎂 ${p.age} yosh</span>
    <span class="bio-chip">📏 Bo‘yi: ${p.height || "180 sm"}</span>
    <span class="bio-chip">⚖️ Vazni: ${p.weight || "75 kg"}</span>
  `;
  document.getElementById("mp-stats-body").innerHTML = `
    <div class="p-stat-grid">
      <div class="p-stat-box"><div class="p-stat-val">${p.apps}</div><div class="p-stat-lbl">Jami o‘yinlar</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.starts ?? p.apps}</div><div class="p-stat-lbl">Asosiy tarkib</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.mins}'</div><div class="p-stat-lbl">Daqiqalar</div></div>
      <div class="p-stat-box"><div class="p-stat-val" style="color:#38bdf8;">${p.goals}</div><div class="p-stat-lbl">Gollar</div></div>
      <div class="p-stat-box"><div class="p-stat-val" style="color:#38bdf8;">${p.assists}</div><div class="p-stat-lbl">Assistlar</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.pens ?? 0}</div><div class="p-stat-lbl">Penaltilar</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.shots}</div><div class="p-stat-lbl">Zarbalar</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.keyPasses}</div><div class="p-stat-lbl">Kalit paslar</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.passAcc}%</div><div class="p-stat-lbl">Pas aniqligi</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.dribbles ?? 10}</div><div class="p-stat-lbl">Driblinglar</div></div>
      <div class="p-stat-box"><div class="p-stat-val">${p.tackles}</div><div class="p-stat-lbl">To‘p olib qo‘yish</div></div>
      <div class="p-stat-box"><div class="p-stat-val" style="color:#f59e0b;">${p.yellow} / <span style="color:#ef4444;">${p.red}</span></div><div class="p-stat-lbl">Sariq / Qizil</div></div>
    </div>
  `;
  updateFavPlayerBtn();
  document.getElementById("m-player").classList.add("open");
}

function openApiModal() {
  document.getElementById("api-key-field").value = userApiKey;
  document.getElementById("m-api").classList.add("open");
}

function applyApiKey() {
  userApiKey = document.getElementById("api-key-field").value.trim();
  localStorage.setItem("goluz_api_key_2026", userApiKey);
  hideModal("m-api");
  updateProfileStatus();
  syncWithApi();
}

function resetDemo() {
  userApiKey = "";
  localStorage.removeItem("goluz_api_key_2026");
  hideModal("m-api");
  location.reload();
}

async function syncWithApi() {
  if (!userApiKey) return;
  document.getElementById("status-text").textContent = "API ULANDI • LIVE";
  try {
    const res = await fetch("https://v3.football.api-sports.io/standings?league=369&season=2026", {
      headers: { "x-apisports-key": userApiKey }
    });
    const data = await res.json();
    if (data.response?.[0]?.league?.standings?.[0]) {
      tableRows = data.response[0].league.standings[0].map(t => ({
        pos: t.rank, team: t.team.name, logo: t.team.logo,
        p: t.all.played, w: t.all.win, d: t.all.draw, l: t.all.lose,
        g: `${t.all.goals.for}:${t.all.goals.against}`, pts: t.points
      }));
      drawTable();
    }
  } catch (e) { console.warn(e); }
}

// Navigatsiya boshqaruvi (Desktop + Bottom Tab Bar sync)
function goMainTab(tabId, btn = null) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const targetView = document.getElementById(tabId);
  if (targetView) targetView.classList.add("active");

  // Desktop nav sinxronizatsiyasi
  document.querySelectorAll(".desktop-nav .nav-tab").forEach(t => t.classList.remove("active"));
  const deskMap = {
    "v-matches": "dtab-matches",
    "v-leagues": "dtab-leagues",
    "v-compare": "dtab-compare",
    "v-favorites": "dtab-favorites",
    "v-clubs": "dtab-clubs"
  };
  const dTabId = deskMap[tabId];
  if (dTabId && document.getElementById(dTabId)) {
    document.getElementById(dTabId).classList.add("active");
  }

  // Mobil Bottom Tab Bar sinxronizatsiyasi
  document.querySelectorAll(".bottom-tab-bar .bottom-tab-item").forEach(b => b.classList.remove("active"));
  const botMap = {
    "v-matches": "btab-matches",
    "v-leagues": "btab-leagues",
    "v-compare": "btab-compare",
    "v-favorites": "btab-favorites",
    "v-profile": "btab-profile"
  };
  const bTabId = botMap[tabId];
  if (bTabId && document.getElementById(bTabId)) {
    document.getElementById(bTabId).classList.add("active");
  }

  // Kerakli bo'lim ma'lumotlarini chizish
  if (tabId === "v-leagues") drawLeagues();
  if (tabId === "v-compare") drawCompare();
  if (tabId === "v-favorites") drawFavorites();
  if (tabId === "v-clubs") drawClubs();
  if (tabId === "v-matches") drawMatches();
  if (tabId === "v-profile") updateProfileStatus();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goTab(id, btn) {
  goMainTab(id, btn);
}

function hideModal(id) { document.getElementById(id).classList.remove("open"); }
function bgClick(e, id) { if (e.target.id === id) hideModal(id); }

// Dastlabki ishga tushirish
drawMatches();
drawLeagues();
drawCompare();
drawFavorites();
drawClubs();
updateProfileStatus();
syncWithApi();

// Jonli daqiqalarni avtomatik yangilab turish (har 20 soniyada)
setInterval(() => {
  if (!userApiKey) {
    liveGames.forEach(m => {
      if (m.min < 90) m.min += 1;
    });
    drawMatches();
  } else {
    syncWithApi();
  }
}, 20000);
