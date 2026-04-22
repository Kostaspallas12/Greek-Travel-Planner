const GEOAPIFY_KEY = "REPLACE_WITH_YOUR_KEY";;

const state = { stopIndex: 0 };

const VEHICLE_LABELS = { "0.5": "Μοτοσυκλέτα", "1.0": "Αυτοκίνητο", "1.4": "Αυτοκίνητο με ρυμουλκό", "2.0": "Φορτηγό" };
const VEHICLE_ICONS = { "0.5": "🏍️", "1.0": "🚗", "1.4": "🚙", "2.0": "🚛" };

const HIGHWAYS = [
  { id: "attiki", name: "Αττική Οδός",
    stations: [{ name: "Αττική Οδός", tolls: { "0.5": 1.25, "1.0": 2.55, "1.4": 6.30, "2.0": 10.10 } }] },
  { id: "nea_odos", name: "Νέα Οδός (Αθήνα–Λαμία)",
    stations: [
      { name: "Αφίδνες", tolls: { "0.5": 2.70, "1.0": 3.90, "1.4": 9.75, "2.0": 13.70 } },
      { name: "Θήβα", tolls: { "0.5": 3.20, "1.0": 4.55, "1.4": 11.45, "2.0": 16.00 } },
      { name: "Τραγάνα", tolls: { "0.5": 3.15, "1.0": 4.55, "1.4": 11.40, "2.0": 15.95 } },
      { name: "Αγία Τριάδα", tolls: { "0.5": 1.45, "1.0": 2.10, "1.4": 5.25, "2.0": 7.35 } },
      { name: "Μαυρομαντήλα", tolls: { "0.5": 1.55, "1.0": 2.25, "1.4": 5.65, "2.0": 7.90 } }
    ]
  },
  { id: "aigaiou", name: "Αυτ/μος Αιγαίου (Λαμία–Θεσ/νίκη)",
    stations: [
      { name: "Πελασγία", tolls: { "0.5": 2.90, "1.0": 4.10, "1.4": 10.20, "2.0": 14.30 } },
      { name: "Μοσχοχώρι", tolls: { "0.5": 3.30, "1.0": 4.70, "1.4": 11.80, "2.0": 16.50 } },
      { name: "Μακρυχώρι", tolls: { "0.5": 2.10, "1.0": 3.00, "1.4": 7.50, "2.0": 10.50 } },
      { name: "Λεπτοκαρυά", tolls: { "0.5": 2.60, "1.0": 3.80, "1.4": 9.40, "2.0": 13.10 } },
      { name: "Κλειδί (Αιγίνιο)", tolls: { "0.5": 1.80, "1.0": 2.60, "1.4": 6.40, "2.0": 9.00 } }
    ]
  },
  { id: "olympia", name: "Ολυμπία Οδός (Αθήνα–Πάτρα)",
    stations: [
      { name: "Ελευσίνα", tolls: { "0.5": 1.70, "1.0": 2.50, "1.4": 6.30, "2.0": 8.90 } },
      { name: "Ισθμός", tolls: { "0.5": 1.50, "1.0": 2.10, "1.4": 5.40, "2.0": 7.60 } },
      { name: "Κιάτο", tolls: { "0.5": 1.90, "1.0": 2.70, "1.4": 6.80, "2.0": 9.60 } },
      { name: "Ελαιώνας", tolls: { "0.5": 2.70, "1.0": 3.80, "1.4": 9.70, "2.0": 13.60 } },
      { name: "Ρίο", tolls: { "0.5": 1.90, "1.0": 2.70, "1.4": 6.80, "2.0": 9.50 } }
    ]
  },
  { id: "gefyra", name: "Γέφυρα Ρίου–Αντιρρίου",
    stations: [{ name: "Γέφυρα Ρίου–Αντιρρίου", tolls: { "0.5": 2.50, "1.0": 15.40, "1.4": 23.70, "2.0": 23.70 } }] },
  { id: "ionia", name: "Ιόνια Οδός (Αντίρριο–Ιωάννινα)",
    stations: [
      { name: "Κλόκοβα", tolls: { "0.5": 2.50, "1.0": 3.55, "1.4": 8.90, "2.0": 12.50 } },
      { name: "Αγγελόκαστρο", tolls: { "0.5": 2.90, "1.0": 4.20, "1.4": 10.50, "2.0": 14.70 } },
      { name: "Μενίδι Άρτας", tolls: { "0.5": 2.50, "1.0": 3.55, "1.4": 8.95, "2.0": 12.50 } },
      { name: "Τέροβο", tolls: { "0.5": 2.55, "1.0": 3.70, "1.4": 9.25, "2.0": 12.95 } }
    ]
  },
  { id: "e65", name: "Ε65 (Λαμία–Καλαμπάκα)",
    stations: [
      { name: "Λιανοκλάδι", tolls: { "0.5": 1.40, "1.0": 2.05, "1.4": 5.15, "2.0": 7.20 } },
      { name: "Τρίκαλα", tolls: { "0.5": 2.25, "1.0": 3.25, "1.4": 8.10, "2.0": 11.40 } }
    ]
  },
  { id: "egnatia", name: "Εγνατία Οδός",
    stations: [
      { name: "Τύρια (Παραμυθιά)", tolls: { "0.5": 1.50, "1.0": 2.10, "1.4": 5.30, "2.0": 7.40 } },
      { name: "Παμβώτιδα", tolls: { "0.5": 0.80, "1.0": 1.20, "1.4": 3.00, "2.0": 4.20 } },
      { name: "Μαλακάσι (Μέτσοβο)", tolls: { "0.5": 1.00, "1.0": 1.40, "1.4": 3.50, "2.0": 4.90 } },
      { name: "Σιάτιστα", tolls: { "0.5": 1.10, "1.0": 1.50, "1.4": 3.80, "2.0": 5.30 } },
      { name: "Πολύμυλος (Κοζάνη)", tolls: { "0.5": 1.00, "1.0": 1.40, "1.4": 3.50, "2.0": 4.90 } },
      { name: "Μάλγαρα", tolls: { "0.5": 0.80, "1.0": 1.20, "1.4": 3.00, "2.0": 4.20 } },
      { name: "Θεσ/νίκη (Ωραιόκαστρο)", tolls: { "0.5": 0.30, "1.0": 0.50, "1.4": 1.00, "2.0": 1.50 } },
      { name: "Ανάληψη (Λαγκαδά)", tolls: { "0.5": 1.30, "1.0": 1.80, "1.4": 4.50, "2.0": 6.30 } },
      { name: "Ασπροβάλτα", tolls: { "0.5": 0.60, "1.0": 0.90, "1.4": 2.30, "2.0": 3.20 } },
      { name: "Μουσθένη (Καβάλα)", tolls: { "0.5": 1.10, "1.0": 1.60, "1.4": 4.00, "2.0": 5.60 } },
      { name: "Ίασμος (Κομοτηνή)", tolls: { "0.5": 1.00, "1.0": 1.40, "1.4": 3.50, "2.0": 4.90 } },
      { name: "Μεστής", tolls: { "0.5": 1.20, "1.0": 1.70, "1.4": 4.30, "2.0": 6.00 } },
      { name: "Αρδανίου", tolls: { "0.5": 0.80, "1.0": 1.20, "1.4": 3.00, "2.0": 4.20 } }
    ]
  },
  { id: "moreas", name: "Μορέας (Κόρινθος–Καλαμάτα)",
    stations: [
      { name: "Σπαθοβούνι", tolls: { "0.5": 2.00, "1.0": 2.95, "1.4": 7.45, "2.0": 10.45 } },
      { name: "Νεστάνη", tolls: { "0.5": 1.90, "1.0": 2.80, "1.4": 7.10, "2.0": 9.95 } },
      { name: "Γέφυρα Μαναρη", tolls: { "0.5": 1.60, "1.0": 2.30, "1.4": 5.75, "2.0": 8.05 } },
      { name: "Βελιγοστή", tolls: { "0.5": 1.00, "1.0": 1.45, "1.4": 3.70, "2.0": 5.20 } },
      { name: "Καλαμάτα", tolls: { "0.5": 1.50, "1.0": 2.25, "1.4": 5.65, "2.0": 7.90 } }
    ]
  }
];

// ─── TOLL STATE ───────────────────────────────────────────────────────────────
const tollState = { checkedStations: {}, vehicleKey: "1.0" };

function normaliseVehicleKey(key) {
  const n = parseFloat(key);
  if (n === 0.5) return "0.5";
  if (n === 1.0) return "1.0";
  if (n === 1.4) return "1.4";
  if (n === 2.0) return "2.0";
  return "1.0";
}

function hwTotal(hw, vKey) {
  return hw.stations.reduce((s, st) => {
    const k = `${hw.id}__${st.name}`;
    return s + (tollState.checkedStations[k] ? (st.tolls[vKey] || 0) : 0);
  }, 0);
}

function allTolls() {
  return HIGHWAYS.reduce((s, hw) => s + hwTotal(hw, tollState.vehicleKey), 0);
}

function isHwFullyOn(hw) {
  return hw.stations.length > 0 && hw.stations.every(st => tollState.checkedStations[`${hw.id}__${st.name}`]);
}

function isHwAnyOn(hw) {
  return hw.stations.some(st => tollState.checkedStations[`${hw.id}__${st.name}`]);
}

function setHwAll(hw, on) {
  hw.stations.forEach(st => { tollState.checkedStations[`${hw.id}__${st.name}`] = on; });
}

// ─── TOLL UI ─────────────────────────────────────────────────────────────────

window.toggleTollCard = function() {
  const body = qs("tollCardBody");
  const icon = qs("tollCardIcon");
  if (!body) return;
  body.classList.toggle("open");
  if (icon) icon.textContent = body.classList.contains("open") ? "▴" : "▾";
};

function renderTollPicker(vehicleKey) {
  tollState.vehicleKey = vehicleKey;
  tollState.checkedStations = {};

  const inner = qs("tollPickerInner");
  if (!inner) return;

  inner.innerHTML = `<div class="toll-hw-list">${HIGHWAYS.map(hw => {
    const isSingle = hw.stations.length === 1;
    return `
      <div class="toll-hw-item">
        <div class="toll-hw-row" id="hwrow_${hw.id}">
          <div class="toll-hw-toggle" id="hwtoggle_${hw.id}" onclick="onHwToggleClick('${hw.id}')"></div>
          <span class="toll-hw-name">${escapeHtml(hw.name)}</span>
          ${!isSingle ? `<button class="toll-expand-btn" id="hwexpbtn_${hw.id}" onclick="toggleHwStations('${hw.id}')">›</button>` : ''}
          <span class="toll-hw-price" id="hwprice_${hw.id}">0.00€</span>
        </div>
        ${!isSingle ? `
        <div class="toll-stations-wrap" id="hwstations_${hw.id}">
          <div class="toll-stations-inner">
            ${hw.stations.map(st => {
              const k = `${hw.id}__${st.name}`;
              const safeId = k.replace(/[^a-z0-9]/gi, '_');
              return `<label class="toll-st-row" for="st_${safeId}">
                <input type="checkbox" id="st_${safeId}" data-key="${escapeHtml(k)}" onchange="onStationChange(this)">
                <span class="toll-st-name" id="stname_${safeId}">${escapeHtml(st.name)}</span>
                <span class="toll-st-price">${euro(st.tolls[vehicleKey] || 0)}</span>
              </label>`;
            }).join("")}
          </div>
        </div>` : ''}
      </div>
    `;
  }).join("")}</div>`;

  refreshTollUI();
}

window.onHwToggleClick = function(hwId) {
  const hw = HIGHWAYS.find(h => h.id === hwId);
  if (!hw) return;
  const isOn = isHwFullyOn(hw);
  setHwAll(hw, !isOn);
  refreshTollUI();
  refreshCosts();
};

window.toggleHwStations = function(hwId) {
  const wrap = qs(`hwstations_${hwId}`);
  const btn = qs(`hwexpbtn_${hwId}`);
  if (!wrap) return;
  wrap.classList.toggle("open");
  if (btn) btn.classList.toggle("open");
};

window.onStationChange = function(cb) {
  const key = cb.dataset.key;
  tollState.checkedStations[key] = cb.checked;
  refreshTollUI();
  refreshCosts();
};

function refreshTollUI() {
  const vKey = tollState.vehicleKey;
  for (const hw of HIGHWAYS) {
    const row = qs(`hwrow_${hw.id}`);
    const toggle = qs(`hwtoggle_${hw.id}`);
    const priceEl = qs(`hwprice_${hw.id}`);
    const total = hwTotal(hw, vKey);
    const isOn = isHwFullyOn(hw);
    const hasAny = isHwAnyOn(hw);

    if (row) row.classList.toggle("active", hasAny);

    if (toggle) {
      if (isOn) {
        toggle.style.background = "var(--gold)";
        toggle.style.opacity = "1";
      } else if (hasAny) {
        toggle.style.background = "var(--sky)";
        toggle.style.opacity = "0.8";
      } else {
        toggle.style.background = "";
        toggle.style.opacity = "";
      }
    }

    if (priceEl) priceEl.textContent = total > 0 ? euro(total) : "0.00€";

    if (hw.stations.length > 1) {
      hw.stations.forEach(st => {
        const k = `${hw.id}__${st.name}`;
        const safeId = k.replace(/[^a-z0-9]/gi, '_');
        const cb = qs(`st_${safeId}`);
        if (cb) cb.checked = !!tollState.checkedStations[k];
        const nm = qs(`stname_${safeId}`);
        if (nm) nm.classList.toggle("checked", !!tollState.checkedStations[k]);
      });
    }
  }

  const grand = allTolls();
  const inlineEl = qs("tollSumInline");
  if (inlineEl) inlineEl.textContent = euro(grand);
}

function refreshCosts() {
  if (!window.cachedCosts) return;
  const tolls = allTolls();
  const grand = window.cachedCosts.fuel + tolls + window.cachedCosts.food + window.cachedCosts.entry;
  if (qs("sumTotalCost")) qs("sumTotalCost").textContent = euro(grand);
  if (qs("tollSumInline")) qs("tollSumInline").textContent = euro(tolls);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const POI_BY_CITY = {
  "θεσσαλονικη": { sights: [{ name: "Λευκός Πύργος", desc: "Σύμβολο της πόλης" }, { name: "Άγιος Δημήτριος", desc: "Ιστορικός ναός" }], food: [{ name: "Λαδάδικα", desc: "Περιοχή για φαγητό και βράδυ" }, { name: "Τρίγωνα Πανοράματος", desc: "Κλασικό γλυκό της πόλης" }] },
  "αθηνα": { sights: [{ name: "Ακρόπολη", desc: "Το πιο εμβληματικό σημείο" }, { name: "Πλάκα", desc: "Ιστορική γειτονιά" }], food: [{ name: "Μοναστηράκι", desc: "Street food και βόλτα" }, { name: "Κουκάκι", desc: "Καφέ και brunch" }] },
  "πατρα": { sights: [{ name: "Κάστρο Πατρών", desc: "Ιστορικό κάστρο με θέα" }, { name: "Ρωμαϊκό Ωδείο", desc: "Σημαντικό αρχαιολογικό μνημείο" }], food: [{ name: "Ρήγα Φεραίου", desc: "Κεντρικός δρόμος με καφέ και φαγητό" }, { name: "Παραλία Πάτρας", desc: "Βόλτα και στάση για φαγητό" }] },
  "κοζανη": { sights: [{ name: "Κεντρική Πλατεία", desc: "Σημείο αναφοράς της πόλης" }, { name: "Λαογραφικό Μουσείο", desc: "Ματιά στην τοπική ιστορία" }], food: [{ name: "Τοπική ταβέρνα", desc: "Δοκίμασε τοπικές γεύσεις" }, { name: "Κέντρο Κοζάνης", desc: "Καφέ και φαγητό" }] }
};

function qs(id) { return document.getElementById(id); }
function greekKey(str) { return String(str || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function getPoiForCity(name) { const k = greekKey(name); return POI_BY_CITY[k] || { sights: [{ name: "Κεντρική πλατεία", desc: "Καλή πρώτη στάση για βόλτα" }], food: [{ name: "Τοπική ταβέρνα", desc: "Δοκίμασε τοπική κουζίνα" }] }; }
function showError(msg) { const b = qs("errorBox"); if (!b) return; b.textContent = msg; b.style.display = "block"; }
function clearError() { const b = qs("errorBox"); if (!b) return; b.textContent = ""; b.style.display = "none"; }
function showLoader(on) { const l = qs("loader"); if (!l) return; l.style.display = on ? "flex" : "none"; }
function formatDate(v) { if (!v) return null; const [y,m,d] = v.split("-"); return `${d}/${m}/${y}`; }
function formatDuration(s) { const tm = Math.round(s/60); const h = Math.floor(tm/60); const m = tm%60; if (h<=0) return `${m}λ`; if (m===0) return `${h}ω`; return `${h}ω ${m}λ`; }
function euro(v) { return `${Number(v||0).toFixed(2)}€`; }
function calcFuelCost(km, c, p) { return (km/100)*c*p; }
function calcFoodCost(ppl, f) { return ppl*f; }
function calcEntryCost(ppl, e) { return ppl*e; }
function escapeHtml(s) { return String(s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }

async function apiJson(url) { const r = await fetch(url); const d = await r.json(); if (!r.ok) throw new Error(d?.message||`HTTP ${r.status}`); return d; }
function debounce(fn, delay=300) { let t; return (...a) => { clearTimeout(t); t = setTimeout(()=>fn(...a), delay); }; }
function todayIso() { return new Date().toISOString().split("T")[0]; }

async function getWeather(lat, lon, date) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto&start_date=${date}&end_date=${date}`;
    const data = await fetch(url).then(r=>r.json());
    if (!data.daily) return null;
    return { maxTemp: Math.round(data.daily.temperature_2m_max[0]), minTemp: Math.round(data.daily.temperature_2m_min[0]), precipitation: data.daily.precipitation_sum[0], code: data.daily.weathercode[0] };
  } catch { return null; }
}
function weatherIcon(c) { if(c===0)return"☀️"; if(c<=2)return"🌤️"; if(c<=3)return"☁️"; if(c<=48)return"🌫️"; if(c<=57)return"🌦️"; if(c<=67)return"🌧️"; if(c<=77)return"❄️"; if(c<=82)return"🌧️"; if(c<=86)return"🌨️"; return"⛈️"; }
function weatherDescription(c) { if(c===0)return"Αίθριος καιρός"; if(c<=2)return"Λίγα σύννεφα"; if(c<=3)return"Συννεφιά"; if(c<=48)return"Ομίχλη"; if(c<=57)return"Ψιλόβροχο"; if(c<=67)return"Βροχή"; if(c<=77)return"Χιόνι"; if(c<=82)return"Ντους βροχής"; if(c<=86)return"Χιονόνερο"; return"Καταιγίδα"; }

async function searchCitySuggestions(text) {
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&filter=countrycode:gr&format=json&limit=5&apiKey=${GEOAPIFY_KEY}`;
  return (await apiJson(url)).results || [];
}

async function geocodePlace(text) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(text+", Greece")}&filter=countrycode:gr&format=json&limit=1&apiKey=${GEOAPIFY_KEY}`;
  const data = await apiJson(url);
  if (!data.results?.length) throw new Error(`Δεν βρέθηκε τοποθεσία στην Ελλάδα για: ${text}`);
  const item = data.results[0];
  return { name: item.city||item.town||item.village||item.suburb||item.name||text, label: item.formatted||item.address_line1||text, lat: item.lat, lon: item.lon };
}

async function resolvePlaceFromInput(input) {
  const value = input.value.trim();
  if (!value) throw new Error("Υπάρχει κενό πεδίο στη διαδρομή.");
  const { label, lat, lon, name } = input.dataset;
  if (label && lat && lon && value === label) return { name: name||value, label, lat: Number(lat), lon: Number(lon) };
  return geocodePlace(value);
}

async function getRoute(places) {
  const waypoints = places.map(p=>`${p.lat},${p.lon}`).join("|");
  const url = `https://api.geoapify.com/v1/routing?waypoints=${encodeURIComponent(waypoints)}&mode=drive&format=json&lang=el&apiKey=${GEOAPIFY_KEY}`;
  const data = await apiJson(url);
  if (!data.results?.length) throw new Error("Δεν βρέθηκε διαδρομή.");
  return data.results[0];
}

function createAutocomplete(input) {
  const list = input.parentElement.querySelector(".autocomplete-list");
  if (!list) return;
  const run = debounce(async () => {
    const q = input.value.trim();
    input.dataset.lat = input.dataset.lon = input.dataset.label = input.dataset.name = "";
    if (q.length < 2) { list.style.display = "none"; list.innerHTML = ""; return; }
    try {
      const suggestions = await searchCitySuggestions(q);
      if (!suggestions.length) { list.style.display = "none"; list.innerHTML = ""; return; }
      list.innerHTML = suggestions.map(item => {
        const main = item.city||item.town||item.village||item.suburb||item.name||item.formatted||q;
        const sub = item.formatted||"";
        return `<div class="autocomplete-item" data-name="${escapeHtml(main)}" data-label="${escapeHtml(sub||main)}" data-lat="${item.lat}" data-lon="${item.lon}"><div class="autocomplete-main">${escapeHtml(main)}</div><div class="autocomplete-sub">${escapeHtml(sub)}</div></div>`;
      }).join("");
      list.style.display = "block";
      list.querySelectorAll(".autocomplete-item").forEach(el => {
        el.addEventListener("click", () => { input.value = el.dataset.label; input.dataset.name = el.dataset.name; input.dataset.label = el.dataset.label; input.dataset.lat = el.dataset.lat; input.dataset.lon = el.dataset.lon; list.style.display = "none"; });
      });
    } catch (err) { list.style.display = "none"; list.innerHTML = ""; console.error(err); }
  }, 250);
  input.addEventListener("input", run);
  input.addEventListener("focus", run);
  input.addEventListener("blur", () => setTimeout(() => { list.style.display = "none"; }, 150));
}

function createStopRow() {
  state.stopIndex += 1;
  const wrapper = document.createElement("div");
  wrapper.className = "stop-row";
  wrapper.innerHTML = `<div class="field" style="margin:0;"><input class="input place-input stop-input" type="text" placeholder="Ενδιάμεση στάση..." /><div class="autocomplete-list"></div></div><button class="icon-btn" type="button" title="Αφαίρεση">✕</button>`;
  wrapper.querySelector(".icon-btn").addEventListener("click", () => wrapper.remove());
  createAutocomplete(wrapper.querySelector("input"));
  return wrapper;
}

function initBaseAutocomplete() { document.querySelectorAll(".place-input").forEach(createAutocomplete); }
function collectRouteInputs() { return { originInput: qs("origin"), destinationInput: qs("destination"), stopInputs: Array.from(document.querySelectorAll(".stop-input")) }; }
function buildGoogleMapsUrl(places) { return `https://www.google.com/maps/dir/${places.map(p=>encodeURIComponent(p.label||p.name)).join("/")}`; }
window.toggleLeg = function(header) { const body = header.nextElementSibling; if (!body) return; body.classList.toggle("open"); };

async function renderResults({ places, route, settings, tripInfo }) {
  const totalKm = route.distance / 1000;
  // +5% buffer για πιο ρεαλιστικό χρόνο
  const totalDurationSec = route.time * 1.05;
  const legs = route.legs || [];
  const vehicleKey = normaliseVehicleKey(settings.vehicleMultiplier);

  const totalFuel = calcFuelCost(totalKm, settings.fuelConsumption, settings.fuelPrice);
  const totalFood = (places.length - 1) * calcFoodCost(settings.people, settings.foodPerStop);
  const totalEntries = (places.length - 1) * calcEntryCost(settings.people, settings.entryPerStop);
  window.cachedCosts = { fuel: totalFuel, food: totalFood, entry: totalEntries };

  if (qs("routeTitle")) qs("routeTitle").textContent = `${places[0].name} → ${places[places.length-1].name}`;
  const dateLabel = tripInfo.dateFrom ? `${formatDate(tripInfo.dateFrom)}${tripInfo.dateTo?" – "+formatDate(tripInfo.dateTo):""}` : "Χωρίς ημερομηνίες";
  if (qs("metaDates")) qs("metaDates").textContent = dateLabel;
  if (qs("metaPeople")) qs("metaPeople").textContent = `${settings.people} άτομο${settings.people>1?"α":""}`;
  if (qs("metaVehicle")) qs("metaVehicle").textContent = VEHICLE_LABELS[vehicleKey]||"Αυτοκίνητο";
  if (qs("metaVehicleIcon")) qs("metaVehicleIcon").textContent = VEHICLE_ICONS[vehicleKey]||"🚗";
  if (qs("metaNotes")) qs("metaNotes").textContent = tripInfo.notes ? `Σημειώσεις: ${tripInfo.notes.slice(0,40)}${tripInfo.notes.length>40?"...":""}` : "Χωρίς σημειώσεις";
  if (qs("mapsLink")) qs("mapsLink").href = buildGoogleMapsUrl(places);
  if (qs("sumDistance")) qs("sumDistance").textContent = `${totalKm.toFixed(1)} χλμ`;
  if (qs("sumDuration")) qs("sumDuration").textContent = formatDuration(totalDurationSec);
  if (qs("sumStops")) qs("sumStops").textContent = `${places.length} σημεία`;
  if (qs("sumTotalCost")) qs("sumTotalCost").textContent = euro(totalFuel + totalFood + totalEntries);

  const tollBody = qs("tollCardBody");
  if (tollBody) tollBody.classList.add("open");
  if (qs("tollCardIcon")) qs("tollCardIcon").textContent = "▴";
  renderTollPicker(vehicleKey);

  const legsContainer = qs("legs");
  if (!legsContainer) return;
  legsContainer.innerHTML = "";

  const originCard = document.createElement("div");
  originCard.className = "leg-card";
  originCard.innerHTML = `<div class="leg-head" onclick="toggleLeg(this)"><div><h3>Αφετηρία: ${escapeHtml(places[0].name)}</h3><p>Σημείο εκκίνησης του ταξιδιού σου.</p></div><div>▾</div></div><div class="leg-body"><div class="place-list"><div class="place-item"><strong>Έναρξη ταξιδιού</strong><div class="muted">${escapeHtml(places[0].label||places[0].name)}</div></div></div></div>`;
  legsContainer.appendChild(originCard);

  const weatherDate = tripInfo.dateFrom || todayIso();

  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];
    const fromPlace = places[i];
    const toPlace = places[i+1];
    const legKm = leg.distance / 1000;
    const legSec = leg.time * 1.05;
    const legFuel = calcFuelCost(legKm, settings.fuelConsumption, settings.fuelPrice);
    const legFood = calcFoodCost(settings.people, settings.foodPerStop);
    const legEntry = calcEntryCost(settings.people, settings.entryPerStop);
    const poi = getPoiForCity(toPlace.name);
    const weather = await getWeather(toPlace.lat, toPlace.lon, weatherDate);

    let weatherHtml = "";
    if (weather) {
      weatherHtml = `<div class="place-item weather-item"><strong>Καιρός ${formatDate(weatherDate)}</strong><div class="weather-details"><span class="weather-icon">${weatherIcon(weather.code)}</span><span class="weather-desc">${weatherDescription(weather.code)}</span><span class="weather-temp"><span class="temp-max">↑${weather.maxTemp}°</span><span class="temp-min">↓${weather.minTemp}°</span></span>${weather.precipitation>0?`<span class="weather-rain">🌧 ${weather.precipitation.toFixed(1)}mm</span>`:""}</div></div>`;
    }

    const card = document.createElement("div");
    card.className = "leg-card";
    card.innerHTML = `
      <div class="leg-head" onclick="toggleLeg(this)">
        <div><h3>${escapeHtml(fromPlace.name)} → ${escapeHtml(toPlace.name)}</h3><p>${legKm.toFixed(1)} χλμ • ${formatDuration(legSec)}</p></div>
        <div>▾</div>
      </div>
      <div class="leg-body">
        <div class="cost-grid">
          <div class="cost-box"><small>Βενζίνη</small><strong>${euro(legFuel)}</strong></div>
          <div class="cost-box"><small>Φαγητό</small><strong>${euro(legFood)}</strong></div>
          <div class="cost-box"><small>Είσοδοι</small><strong>${euro(legEntry)}</strong></div>
        </div>
        <div class="place-list">
          ${weatherHtml}
          <div class="place-item"><strong>Αξιοθέατα</strong><div class="muted">${poi.sights.map(x=>`${escapeHtml(x.name)} — ${escapeHtml(x.desc)}`).join("<br>")}</div></div>
          <div class="place-item"><strong>Φαγητό</strong><div class="muted">${poi.food.map(x=>`${escapeHtml(x.name)} — ${escapeHtml(x.desc)}`).join("<br>")}</div></div>
          <div class="place-item"><strong>Άφιξη</strong><div class="muted">${escapeHtml(toPlace.label||toPlace.name)}</div></div>
        </div>
      </div>`;
    legsContainer.appendChild(card);
  }

  if (qs("results")) { qs("results").style.display = "block"; qs("results").scrollIntoView({ behavior: "smooth", block: "start" }); }
}

async function handleSearch() {
  clearError();
  if (!GEOAPIFY_KEY || GEOAPIFY_KEY.includes("ΒΑΛΕ_ΕΔΩ")) { showError("Βάλε πρώτα το Geoapify API key σου."); return; }
  const { originInput, destinationInput, stopInputs } = collectRouteInputs();
  if (!originInput || !destinationInput) { showError("Λείπουν βασικά πεδία της φόρμας."); return; }
  if (!originInput.value.trim() || !destinationInput.value.trim()) { showError("Συμπλήρωσε αφετηρία και προορισμό."); return; }

  const vehicleMultiplier = Number(qs("vehicleType")?.value || 1.0);
  const settings = {
    vehicleMultiplier,
    people: Math.max(1, Number(qs("people")?.value || 1)),
    fuelConsumption: Math.max(0, Number(qs("fuelConsumption")?.value || 0)),
    fuelPrice: Math.max(0, Number(qs("fuelPrice")?.value || 0)),
    foodPerStop: Math.max(0, Number(qs("foodPerStop")?.value || 0)),
    entryPerStop: Math.max(0, Number(qs("entryPerStop")?.value || 0))
  };
  const tripInfo = { dateFrom: qs("dateFrom")?.value||"", dateTo: qs("dateTo")?.value||"", notes: qs("notes")?.value.trim()||"" };

  try {
    showLoader(true);
    const places = [];
    places.push(await resolvePlaceFromInput(originInput));
    for (const input of stopInputs) { if (input.value.trim()) places.push(await resolvePlaceFromInput(input)); }
    places.push(await resolvePlaceFromInput(destinationInput));
    const route = await getRoute(places);
    await renderResults({ places, route, settings, tripInfo });
  } catch (err) {
    console.error(err);
    showError(err.message || "Κάτι πήγε στραβά στον υπολογισμό της διαδρομής.");
  } finally { showLoader(false); }
}

function downloadPDF() {
  document.querySelectorAll(".leg-body").forEach(b => b.classList.add("open"));
  setTimeout(() => window.print(), 300);
}

function initApp() {
  const addStopBtn = qs("addStopBtn");
  const searchBtn = qs("searchBtn");
  if (addStopBtn) addStopBtn.addEventListener("click", () => { const c = qs("stopsContainer"); if (c) c.appendChild(createStopRow()); });
  if (searchBtn) searchBtn.addEventListener("click", handleSearch);
  initBaseAutocomplete();
  ["origin","destination"].forEach(id => { const el = qs(id); if (el) { el.value = ""; el.dataset.name = el.dataset.label = el.dataset.lat = el.dataset.lon = ""; } });
  const sc = qs("stopsContainer"); if (sc) sc.innerHTML = "";
  if (qs("results")) qs("results").style.display = "none";
  clearError();
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const pdfBtn = qs("pdfBtn");
  if (pdfBtn) pdfBtn.addEventListener("click", downloadPDF);
});