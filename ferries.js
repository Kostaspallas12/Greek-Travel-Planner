// ─── FERRY DATA ──────────────────────────────────────────────────────────────
// Δεν υπάρχει δωρεάν API για τα ελληνικά δρομολόγια, οπότε ο πίνακας είναι χειροκίνητος.
// Οι ώρες και οι τιμές (από €/άτομο, χωρίς όχημα) είναι ενδεικτικές και αλλάζουν ανά εποχή.

// bbox: [latMin, latMax, lonMin, lonMax]. Εύβοια και Λευκάδα συνδέονται οδικά, άρα μετρούν ως ηπειρωτικές.
const ISLANDS = {
  crete: [34.8, 35.7, 23.4, 26.4], rhodes: [35.85, 36.5, 27.65, 28.3], kos: [36.65, 36.9, 26.9, 27.4],
  kalymnos: [36.9, 37.1, 26.9, 27.1], leros: [37.1, 37.2, 26.8, 26.9], patmos: [37.28, 37.37, 26.5, 26.62],
  astypalea: [36.5, 36.65, 26.25, 26.45], karpathos: [35.4, 35.9, 27.05, 27.25],
  lesvos: [38.95, 39.4, 25.8, 26.65], chios: [38.2, 38.62, 25.85, 26.2], samos: [37.65, 37.82, 26.55, 27.1],
  ikaria: [37.5, 37.7, 26.0, 26.4], limnos: [39.8, 40.05, 25.0, 25.46], thassos: [40.55, 40.82, 24.5, 24.8],
  samothraki: [40.4, 40.52, 25.45, 25.7], santorini: [36.33, 36.48, 25.33, 25.5], mykonos: [37.4, 37.5, 25.3, 25.47],
  paros: [36.98, 37.15, 25.1, 25.28], naxos: [36.93, 37.2, 25.33, 25.6], syros: [37.37, 37.52, 24.87, 24.97],
  milos: [36.65, 36.78, 24.33, 24.55], andros: [37.75, 37.97, 24.68, 24.98], tinos: [37.52, 37.68, 25.05, 25.27],
  kea: [37.55, 37.68, 24.27, 24.4], kythnos: [37.33, 37.45, 24.38, 24.47], aegina: [37.67, 37.78, 23.42, 23.57],
  hydra: [37.31, 37.37, 23.42, 23.56], spetses: [37.24, 37.28, 23.1, 23.18], skiathos: [39.13, 39.2, 23.38, 23.52],
  skopelos: [39.07, 39.2, 23.6, 23.75], alonissos: [39.1, 39.27, 23.83, 24.0], skyros: [38.77, 38.97, 24.4, 24.65],
  corfu: [39.35, 39.85, 19.62, 20.13], paxi: [39.18, 39.25, 20.1, 20.25], ithaca: [38.27, 38.48, 20.63, 20.77],
  kefalonia: [38.03, 38.5, 20.33, 20.82], zakynthos: [37.63, 37.95, 20.62, 21.0],
};

const PORTS = {
  // Ηπειρωτικά λιμάνια (και Εύβοια)
  piraeus: { el: "Πειραιάς", en: "Piraeus", lat: 37.942, lon: 23.6465, island: null },
  rafina: { el: "Ραφήνα", en: "Rafina", lat: 38.022, lon: 24.008, island: null },
  lavrio: { el: "Λαύριο", en: "Lavrio", lat: 37.714, lon: 24.056, island: null },
  thessaloniki: { el: "Θεσσαλονίκη", en: "Thessaloniki", lat: 40.634, lon: 22.935, island: null },
  kavala: { el: "Καβάλα", en: "Kavala", lat: 40.934, lon: 24.412, island: null },
  keramoti: { el: "Κεραμωτή", en: "Keramoti", lat: 40.856, lon: 24.703, island: null },
  alexandroupoli: { el: "Αλεξανδρούπολη", en: "Alexandroupoli", lat: 40.845, lon: 25.877, island: null },
  volos: { el: "Βόλος", en: "Volos", lat: 39.357, lon: 22.945, island: null },
  mantoudi: { el: "Μαντούδι (Εύβοια)", en: "Mantoudi (Evia)", lat: 38.85, lon: 23.5, island: null },
  kymi: { el: "Κύμη (Εύβοια)", en: "Kymi (Evia)", lat: 38.63, lon: 24.12, island: null },
  patras: { el: "Πάτρα", en: "Patras", lat: 38.25, lon: 21.73, island: null },
  kyllini: { el: "Κυλλήνη", en: "Kyllini", lat: 37.936, lon: 21.141, island: null },
  astakos: { el: "Αστακός", en: "Astakos", lat: 38.532, lon: 21.082, island: null },
  igoumenitsa: { el: "Ηγουμενίτσα", en: "Igoumenitsa", lat: 39.5, lon: 20.26, island: null },
  // Λιμάνια νησιών
  heraklion: { el: "Ηράκλειο", en: "Heraklion", lat: 35.343, lon: 25.137, island: "crete" },
  souda: { el: "Σούδα (Χανιά)", en: "Souda (Chania)", lat: 35.49, lon: 24.08, island: "crete" },
  rhodes: { el: "Ρόδος", en: "Rhodes", lat: 36.45, lon: 28.23, island: "rhodes" },
  kos: { el: "Κως", en: "Kos", lat: 36.897, lon: 27.29, island: "kos" },
  kalymnos: { el: "Κάλυμνος", en: "Kalymnos", lat: 36.95, lon: 26.985, island: "kalymnos" },
  leros: { el: "Λέρος", en: "Leros", lat: 37.13, lon: 26.85, island: "leros" },
  patmos: { el: "Πάτμος", en: "Patmos", lat: 37.32, lon: 26.545, island: "patmos" },
  astypalea: { el: "Αστυπάλαια", en: "Astypalea", lat: 36.55, lon: 26.355, island: "astypalea" },
  karpathos: { el: "Κάρπαθος", en: "Karpathos", lat: 35.505, lon: 27.215, island: "karpathos" },
  mytilene: { el: "Μυτιλήνη", en: "Mytilene", lat: 39.105, lon: 26.56, island: "lesvos" },
  chios: { el: "Χίος", en: "Chios", lat: 38.37, lon: 26.14, island: "chios" },
  samos: { el: "Σάμος (Βαθύ)", en: "Samos (Vathy)", lat: 37.755, lon: 26.975, island: "samos" },
  ikaria: { el: "Ικαρία", en: "Ikaria", lat: 37.61, lon: 26.295, island: "ikaria" },
  limnos: { el: "Λήμνος", en: "Limnos", lat: 39.875, lon: 25.055, island: "limnos" },
  limenas: { el: "Λιμένας (Θάσος)", en: "Limenas (Thassos)", lat: 40.78, lon: 24.71, island: "thassos" },
  prinos: { el: "Πρίνος (Θάσος)", en: "Prinos (Thassos)", lat: 40.76, lon: 24.6, island: "thassos" },
  samothraki: { el: "Σαμοθράκη", en: "Samothraki", lat: 40.475, lon: 25.47, island: "samothraki" },
  santorini: { el: "Σαντορίνη", en: "Santorini", lat: 36.385, lon: 25.43, island: "santorini" },
  mykonos: { el: "Μύκονος", en: "Mykonos", lat: 37.46, lon: 25.33, island: "mykonos" },
  paros: { el: "Πάρος", en: "Paros", lat: 37.085, lon: 25.15, island: "paros" },
  naxos: { el: "Νάξος", en: "Naxos", lat: 37.107, lon: 25.375, island: "naxos" },
  syros: { el: "Σύρος", en: "Syros", lat: 37.44, lon: 24.945, island: "syros" },
  milos: { el: "Μήλος", en: "Milos", lat: 36.725, lon: 24.445, island: "milos" },
  andros: { el: "Άνδρος", en: "Andros", lat: 37.88, lon: 24.73, island: "andros" },
  tinos: { el: "Τήνος", en: "Tinos", lat: 37.537, lon: 25.16, island: "tinos" },
  kea: { el: "Κέα", en: "Kea", lat: 37.66, lon: 24.31, island: "kea" },
  kythnos: { el: "Κύθνος", en: "Kythnos", lat: 37.39, lon: 24.42, island: "kythnos" },
  aegina: { el: "Αίγινα", en: "Aegina", lat: 37.75, lon: 23.425, island: "aegina" },
  hydra: { el: "Ύδρα", en: "Hydra", lat: 37.35, lon: 23.465, island: "hydra" },
  spetses: { el: "Σπέτσες", en: "Spetses", lat: 37.265, lon: 23.155, island: "spetses" },
  skiathos: { el: "Σκιάθος", en: "Skiathos", lat: 39.16, lon: 23.49, island: "skiathos" },
  skopelos: { el: "Σκόπελος", en: "Skopelos", lat: 39.125, lon: 23.73, island: "skopelos" },
  alonissos: { el: "Αλόννησος", en: "Alonissos", lat: 39.14, lon: 23.865, island: "alonissos" },
  skyros: { el: "Σκύρος", en: "Skyros", lat: 38.84, lon: 24.535, island: "skyros" },
  corfu: { el: "Κέρκυρα", en: "Corfu", lat: 39.625, lon: 19.91, island: "corfu" },
  paxi: { el: "Παξοί", en: "Paxi", lat: 39.2, lon: 20.185, island: "paxi" },
  sami: { el: "Σάμη (Κεφαλονιά)", en: "Sami (Kefalonia)", lat: 38.25, lon: 20.65, island: "kefalonia" },
  kefporos: { el: "Πόρος (Κεφαλονιά)", en: "Poros (Kefalonia)", lat: 38.15, lon: 20.78, island: "kefalonia" },
  ithaca: { el: "Ιθάκη", en: "Ithaca", lat: 38.36, lon: 20.7, island: "ithaca" },
  zakynthos: { el: "Ζάκυνθος", en: "Zakynthos", lat: 37.785, lon: 20.9, island: "zakynthos" },
};

// [λιμάνι, λιμάνι, ώρες, από €/άτομο (null = άγνωστο), συχνότητα: many | daily | weekly, noCars]
const FERRY_LINES = [
  ["piraeus", "heraklion", 9, 33, "many"], ["piraeus", "souda", 9, 52, "daily"],
  ["piraeus", "rhodes", 14, 46, "daily"], ["piraeus", "kos", 11, 63, "daily"],
  ["piraeus", "patmos", 8, 44, "weekly"], ["piraeus", "leros", 8.5, 49, "weekly"],
  ["piraeus", "kalymnos", 10, 60, "weekly"], ["piraeus", "astypalea", 10, 45, "weekly"],
  ["piraeus", "karpathos", 17, null, "weekly"],
  ["piraeus", "mytilene", 11.5, 44, "weekly"], ["piraeus", "chios", 8, 40, "weekly"],
  ["piraeus", "samos", 10, 60, "daily"], ["piraeus", "ikaria", 7, 47, "weekly"],
  ["piraeus", "limnos", 17, 72, "weekly"], ["lavrio", "limnos", 9, 29, "weekly"],
  ["piraeus", "santorini", 7.5, 46, "many"], ["piraeus", "mykonos", 5.5, 44, "many"],
  ["piraeus", "paros", 4.5, 41, "many"], ["piraeus", "milos", 5, 42, "many"],
  ["piraeus", "naxos", 5, 43, "many"], ["piraeus", "syros", 4, 37, "many"],
  ["rafina", "andros", 2, 25, "many"], ["rafina", "tinos", 3.5, 30, "many"],
  ["rafina", "mykonos", 4, 38, "many"], ["rafina", "naxos", 5, 43, "daily"],
  ["lavrio", "kythnos", 1.5, 15, "many"], ["lavrio", "kea", 1, 11, "many"],
  ["piraeus", "aegina", 1, 9.5, "many"], ["piraeus", "hydra", 2, 33, "many", true],
  ["piraeus", "spetses", 2.5, 42, "many", true],
  ["volos", "skiathos", 2.5, 35, "daily"], ["volos", "skopelos", 3.5, 42, "daily"],
  ["volos", "alonissos", 4, 42, "daily"], ["mantoudi", "skiathos", 2, 29, "daily"],
  ["mantoudi", "skopelos", 3, 29, "daily"], ["mantoudi", "alonissos", 3.5, 29, "daily"],
  ["kymi", "skyros", 1.75, 20, "daily"],
  ["patras", "sami", 3.25, 15, "daily"], ["patras", "ithaca", 3.25, 15, "daily"],
  ["kyllini", "zakynthos", 1.25, 13.5, "many"], ["kyllini", "kefporos", 1.25, 14.5, "many"],
  ["astakos", "sami", 2.75, 12, "daily"], ["astakos", "ithaca", 2.75, 12, "daily"],
  ["igoumenitsa", "corfu", 1.25, 6, "many"], ["igoumenitsa", "paxi", 1.75, 6, "daily"],
  ["sami", "ithaca", 0.5, 3, "daily"],
  ["thessaloniki", "limnos", 8, 23, "weekly"], ["thessaloniki", "mytilene", 10, 34, "weekly"],
  ["thessaloniki", "chios", 13, null, "weekly"], ["thessaloniki", "samos", 17, null, "weekly"],
  ["thessaloniki", "mykonos", 15, null, "weekly"], ["thessaloniki", "syros", 14, null, "weekly"],
  ["kavala", "limenas", 1.25, 5, "many"], ["kavala", "prinos", 1.25, 5, "daily"],
  ["keramoti", "limenas", 0.6, 3, "many"],
  ["kavala", "limnos", 4.5, 16, "weekly"], ["kavala", "mytilene", 10, 27, "weekly"],
  ["kavala", "chios", 13, 27, "weekly"], ["kavala", "samos", 17, 27, "weekly"],
  ["alexandroupoli", "samothraki", 2.25, null, "daily"],
  ["rhodes", "kos", 4, null, "daily"], ["mykonos", "santorini", 2.5, null, "daily"],
].map(([a, b, hours, price, freq, noCars]) => ({ a, b, hours, price, freq, noCars: !!noCars }));

// Τα νησιά δεν βγαίνουν αξιόπιστα από το geocoding (π.χ. το «Λέσβος» φέρνει ουζερί στην Αθήνα).
const ISLAND_NAMES = [
  { el: "Κρήτη", en: "Crete", port: "heraklion", alt: ["kriti"] }, { el: "Ρόδος", en: "Rhodes", port: "rhodes", alt: ["rodos"] },
  { el: "Κως", en: "Kos", port: "kos" }, { el: "Κάλυμνος", en: "Kalymnos", port: "kalymnos" },
  { el: "Λέρος", en: "Leros", port: "leros" }, { el: "Πάτμος", en: "Patmos", port: "patmos" },
  { el: "Αστυπάλαια", en: "Astypalea", port: "astypalea" }, { el: "Κάρπαθος", en: "Karpathos", port: "karpathos" },
  { el: "Λέσβος", en: "Lesvos", port: "mytilene", alt: ["lesbos"] }, { el: "Χίος", en: "Chios", port: "chios", alt: ["hios"] },
  { el: "Σάμος", en: "Samos", port: "samos" }, { el: "Ικαρία", en: "Ikaria", port: "ikaria" },
  { el: "Λήμνος", en: "Limnos", port: "limnos", alt: ["lemnos"] }, { el: "Θάσος", en: "Thassos", port: "limenas", alt: ["thasos"] },
  { el: "Σαμοθράκη", en: "Samothraki", port: "samothraki" }, { el: "Σαντορίνη", en: "Santorini", port: "santorini", alt: ["θηρα", "thira"] },
  { el: "Μύκονος", en: "Mykonos", port: "mykonos" }, { el: "Πάρος", en: "Paros", port: "paros" },
  { el: "Νάξος", en: "Naxos", port: "naxos" }, { el: "Σύρος", en: "Syros", port: "syros" },
  { el: "Μήλος", en: "Milos", port: "milos" }, { el: "Άνδρος", en: "Andros", port: "andros" },
  { el: "Τήνος", en: "Tinos", port: "tinos" }, { el: "Κέα", en: "Kea", port: "kea", alt: ["τζια", "tzia"] },
  { el: "Κύθνος", en: "Kythnos", port: "kythnos" }, { el: "Αίγινα", en: "Aegina", port: "aegina", alt: ["aigina"] },
  { el: "Ύδρα", en: "Hydra", port: "hydra", alt: ["ydra"] }, { el: "Σπέτσες", en: "Spetses", port: "spetses" },
  { el: "Σκιάθος", en: "Skiathos", port: "skiathos" }, { el: "Σκόπελος", en: "Skopelos", port: "skopelos" },
  { el: "Αλόννησος", en: "Alonissos", port: "alonissos", alt: ["αλονησος", "alonnisos"] }, { el: "Σκύρος", en: "Skyros", port: "skyros" },
  { el: "Κέρκυρα", en: "Corfu", port: "corfu", alt: ["kerkyra"] }, { el: "Παξοί", en: "Paxi", port: "paxi", alt: ["paxos"] },
  { el: "Κεφαλονιά", en: "Kefalonia", port: "sami", alt: ["kefallonia", "cephalonia"] }, { el: "Ιθάκη", en: "Ithaca", port: "ithaca", alt: ["ithaki"] },
  { el: "Ζάκυνθος", en: "Zakynthos", port: "zakynthos", alt: ["zante"] },
];

function normalizeName(str) { return String(str || "").toLowerCase().trim().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ς/g, "σ"); }
function islandNames(island) { return [island.el, island.en, ...(island.alt || [])].map(normalizeName); }
function findIslandExact(text) { const k = normalizeName(text); return ISLAND_NAMES.find(i => islandNames(i).includes(k)); }
function findIslandsByPrefix(text) { const k = normalizeName(text); return k.length < 2 ? [] : ISLAND_NAMES.filter(i => islandNames(i).some(n => n.startsWith(k))); }

// ─── SEA PLANNER ─────────────────────────────────────────────────────────────

const ROAD_DETOUR = 1.3;
const ROAD_KMH = 70;
const BOARDING_HOURS = 1;

function islandAt(lat, lon) {
  for (const [id, [latMin, latMax, lonMin, lonMax]] of Object.entries(ISLANDS)) {
    if (lat >= latMin && lat <= latMax && lon >= lonMin && lon <= lonMax) return id;
  }
  return null;
}

function haversineKm(a, b) {
  const rad = d => d * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

function roadHoursEstimate(a, b) { return haversineKm(a, b) * ROAD_DETOUR / ROAD_KMH; }

// Επιστρέφει [{ from, to, hours, price, freq, noCars }, ...] για ένα ή δύο πλοία.
function linesFrom(portId) {
  return FERRY_LINES.filter(l => l.a === portId || l.b === portId)
    .map(l => ({ ...l, from: portId, to: l.a === portId ? l.b : l.a }));
}

function findSeaPaths(from, to, maxOptions = 3) {
  const fromIsland = islandAt(from.lat, from.lon);
  const toIsland = islandAt(to.lat, to.lon);
  const portsOf = island => Object.keys(PORTS).filter(id => PORTS[id].island === island);
  const endPorts = new Set(portsOf(toIsland));

  const direct = [], withTransfer = [];
  for (const start of portsOf(fromIsland)) {
    for (const first of linesFrom(start)) {
      if (endPorts.has(first.to)) { direct.push([first]); continue; }
      if (PORTS[first.to].island === fromIsland) continue;
      for (const second of linesFrom(first.to)) {
        if (second.to !== start && endPorts.has(second.to)) withTransfer.push([first, second]);
      }
    }
  }

  // Μετεπιβίβαση προτείνεται μόνο όταν δεν υπάρχει απευθείας πλοίο.
  const score = lines => roadHoursEstimate(from, PORTS[lines[0].from])
    + lines.reduce((s, l) => s + l.hours + BOARDING_HOURS, 0)
    + roadHoursEstimate(PORTS[lines[lines.length - 1].to], to);
  const candidates = direct.length ? direct : withTransfer;
  return candidates.map(lines => ({ lines, score: score(lines) }))
    .sort((x, y) => x.score - y.score)
    .slice(0, maxOptions)
    .map(c => c.lines);
}

if (typeof module !== "undefined") module.exports = { ISLANDS, PORTS, FERRY_LINES, ISLAND_NAMES, islandAt, findSeaPaths, haversineKm, findIslandExact, findIslandsByPrefix };
