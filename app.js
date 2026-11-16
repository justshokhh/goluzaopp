let activeClubIdx = 0;
let activeRoleFilter = "ALL";
let userApiKey = localStorage.getItem("goluz_api_key_2026") || "";

function getTeamLogoUrl(teamName, customLogo = null) {
  if (customLogo) return customLogo;
  const key = Object.keys(teamIds).find(k => teamName.includes(k));
  if (key) return `https://media.api-sports.io/football/teams/${teamIds[key]}.png`;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=0f172a&color=00e5a0&bold=true`;
}

function getPlayerImgUrl(player) {
  if (player.photo) return player.photo;
  if (player.apiId) return `https://media.api-sports.io/football/players/${player.apiId}.png`;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=141e33&color=fff&size=128&bold=true`;
}

function imgFallback(img, name) {
  img.onerror = null;
  img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=141e33&color=00e5a0&size=128&bold=true`;
}

function ratBadge(val) {
  const n = parseFloat(val);
  if (n >= 7.7) return "rat-blue";
  if (n >= 7.2) return "rat-green";
  return "rat-amber";
}

function drawMatches() {
  document.getElementById("live-container").innerHTML = liveGames.map((m, i) => `
    <div class="match-box is-live" onclick="showMatchModal(${i})">
      <div class="m-header">
        <span>${m.league}</span>
        <span style="color: var(--mint); font-weight: 700;"><i class="dot"></i> ${m.min}'</span>
      </div>
      <div class="m-row">
        <div class="m-club">
          <img class="real-logo" src="${getTeamLogoUrl(m.home, m.homeLogo)}" onerror="imgFallback(this, '${m.home}')">
          <b>${m.home}</b>
        </div>
        <div class="m-mid">
          <div class="score-pill">${m.hScore} : ${m.aScore}</div>
          <div class="xg-tag">xG ${m.xg[0]} - ${m.xg[1]}</div>
        </div>
        <div class="m-club">
          <img class="real-logo" src="${getTeamLogoUrl(m.away, m.awayLogo)}" onerror="imgFallback(this, '${m.away}')">
          <b>${m.away}</b>
        </div>
      </div>
      <div class="events-strip">
        ${m.events.map(e => `<span class="chip">${e.icon} ${e.min}' ${e.text}</span>`).join("")}
      </div>
    </div>
  `).join("");

  document.getElementById("upcoming-container").innerHTML = upcomingGames.map(m => `
    <div class="match-box">
      <div class="m-header"><span>${m.status}</span><span style="color:var(--blue); font-weight:600;">${m.time}</span></div>
      <div class="m-row">
        <div class="m-club"><img class="real-logo" src="${getTeamLogoUrl(m.home)}" onerror="imgFallback(this, '${m.home}')"><b>${m.home}</b></div>
        <div class="m-mid"><div class="score-pill" style="font-size:16px;">VS</div><div class="xg-tag">Boshlanmagan</div></div>
        <div class="m-club"><img class="real-logo" src="${getTeamLogoUrl(m.away)}" onerror="imgFallback(this, '${m.away}')"><b>${m.away}</b></div>
      </div>
    </div>
  `).join("");

  document.getElementById("recent-container").innerHTML = pastGames.map(m => `
    <div class="match-box">
      <div class="m-header"><span>${m.date}</span><span>FT</span></div>
      <div class="m-row">
        <div class="m-club"><img class="real-logo" src="${getTeamLogoUrl(m.home)}" onerror="imgFallback(this, '${m.home}')"><b>${m.home}</b></div>
        <div class="m-mid"><div class="score-pill">${m.score}</div><div class="xg-tag">Yakunlangan</div></div>
        <div class="m-club"><img class="real-logo" src="${getTeamLogoUrl(m.away)}" onerror="imgFallback(this, '${m.away}')"><b>${m.away}</b></div>
      </div>
    </div>
  `).join("");
}

function drawTable() {
  document.getElementById("standings-body").innerHTML = tableRows.map(r => {
    let cls = r.pos === 1 ? "p-ucl" : r.pos === 2 ? "p-acl" : r.pos >= 15 ? "p-rel" : "";
    return `
      <tr>
        <td><span class="pos-num ${cls}">${r.pos}</span></td>
        <td><div class="t-flex"><img class="mini-logo" src="${getTeamLogoUrl(r.team, r.logo)}" onerror="imgFallback(this, '${r.team}')"><span>${r.team}</span></div></td>
        <td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td>
        <td style="color: var(--muted);">${r.g}</td>
        <td style="font-weight: 800; color: var(--mint);">${r.pts}</td>
      </tr>
    `;
  }).join("");
}

function drawScorers() {
  const list = [];
  allClubs.forEach((c, cIdx) => c.players.forEach((p, pIdx) => list.push({ ...p, club: c.name, cIdx, pIdx })));
  list.sort((a, b) => b.goals - a.goals || b.assists - a.assists);

  document.getElementById("scorers-container").innerHTML = list.slice(0, 14).map((s, idx) => `
    <div class="player-card" onclick="openPlayerStats(${s.cIdx}, ${s.pIdx})">
      <div class="pl-left">
        <img class="pl-img" src="${getPlayerImgUrl(s)}" onerror="imgFallback(this, '${s.name}')">
        <div>
          <div class="pl-name">${idx + 1}. ${s.name}</div>
          <div class="pl-meta">
            <img class="mini-logo" src="${getTeamLogoUrl(s.club)}" onerror="imgFallback(this, '${s.club}')">
            <span>${s.club} • ⚽ ${s.goals} gol • 🎯 ${s.assists} assist</span>
          </div>
        </div>
      </div>
      <div class="rat-box ${ratBadge(s.rating)}">${s.rating}</div>
    </div>
  `).join("");
}

function drawClubs(list = allClubs) {
  document.getElementById("clubs-container").innerHTML = list.map(c => {
    const p = clubColors[c.name] || ["#1e293b", "#0f172a"];
    const realIdx = allClubs.findIndex(x => x.name === c.name);
    return `
      <div class="club-box" style="background: linear-gradient(145deg, ${p[0]}38, ${p[1]}b0);" onclick="showClubModal(${realIdx})">
        <div class="cb-top">
          <img class="real-logo" src="${getTeamLogoUrl(c.name)}" onerror="imgFallback(this, '${c.name}')">
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
      <div style="z-index:2; text-align:center;"><img class="real-logo" src="${getTeamLogoUrl(m.home, m.homeLogo)}" onerror="imgFallback(this, '${m.home}')"><div style="font-size:12px; font-weight:700; margin-top:4px;">${m.home}</div></div>
      <div style="z-index:2; background:rgba(0,0,0,0.65); padding:6px 12px; border-radius:10px; font-size:12px; font-weight:700;">xG: ${m.xg[0]} — ${m.xg[1]}</div>
      <div style="z-index:2; text-align:center;"><img class="real-logo" src="${getTeamLogoUrl(m.away, m.awayLogo)}" onerror="imgFallback(this, '${m.away}')"><div style="font-size:12px; font-weight:700; margin-top:4px;">${m.away}</div></div>
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
  document.querySelectorAll(".f-pill").forEach((el, i) => el.classList.toggle("active", i === 0));

  const c = allClubs[idx];
  const logoEl = document.getElementById("mc-logo");
  logoEl.src = getTeamLogoUrl(c.name);
  logoEl.onerror = () => imgFallback(logoEl, c.name);

  document.getElementById("mc-title").textContent = `${c.name} (${c.city})`;
  document.getElementById("mc-sub").textContent = `Murabbiy: ${c.coach} • To‘liq statistika uchun futbolchini bosing`;
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
  document.querySelectorAll(".f-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderRosterList();
}

function renderRosterList() {
  const c = allClubs[activeClubIdx];
  const filtered = c.players.map((p, originalIdx) => ({ ...p, originalIdx })).filter(p => activeRoleFilter === "ALL" || p.role === activeRoleFilter);
  document.getElementById("mc-list").innerHTML = filtered.map(p => `
    <div class="player-card" style="margin-bottom: 10px;" onclick="openPlayerStats(${activeClubIdx}, ${p.originalIdx})">
      <div class="pl-left">
        <img class="pl-img" src="${getPlayerImgUrl(p)}" onerror="imgFallback(this, '${p.name}')">
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
  const c = allClubs[cIdx];
  const p = c.players[pIdx];
  const imgEl = document.getElementById("mp-photo");
  imgEl.src = getPlayerImgUrl(p);
  imgEl.onerror = () => imgFallback(imgEl, p.name);

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

function goTab(id, btn) {
  document.querySelectorAll(".nav-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function hideModal(id) { document.getElementById(id).classList.remove("open"); }
function bgClick(e, id) { if (e.target.id === id) hideModal(id); }

drawMatches();
drawTable();
drawScorers();
drawClubs();
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
