const GEOAPIFY_KEY = "REPLACE_WITH_YOUR_KEY";;

// ─── I18N ────────────────────────────────────────────────────────────────────

let currentLang = (() => { try { return localStorage.getItem('lang') || 'el'; } catch { return 'el'; } })();

const T = {
  el: {
    nav_home:'Αρχή', nav_planner:'Πλάνο Διαδρομής', nav_guide:'Οδηγός Προορισμού',
    nav_privacy:'Απόρρητο', nav_cta:'Ξεκίνα →',
    hero_badge:'ΔΩΡΕΑΝ ΕΡΓΑΛΕΙΟ ΤΑΞΙΔΙΟΥ ΣΤΗΝ ΕΛΛΑΔΑ',
    hero_title:'Κάθε ταξίδι ξεκινά<br>με <span class="hero-accent">ένα καλό πλάνο.</span>',
    hero_subtitle:'Σχεδίασε τη διαδρομή σου, υπολόγισε κόστος βενζίνης,<br>διόδια και βρες αξιοθέατα στην Ελλάδα.',
    hero_cta:'Ξεκίνα τώρα →',
    form_route:'Διαδρομή', form_from:'Από', from_ph:'Πόλη εκκίνησης...',
    form_to:'Προς', to_ph:'Τελικός προορισμός...', form_add_stop:'+ Προσθήκη ενδιάμεσης στάσης',
    form_dates:'Ημερομηνίες', form_depart:'Αναχώρηση', form_return:'Επιστροφή',
    form_settings:'Ρυθμίσεις', form_vehicle:'Τύπος οχήματος',
    form_people:'Άτομα', people_ph:'π.χ. 2',
    form_fuel_cons:'Κατανάλωση (L/100km)', fuel_cons_ph:'π.χ. 7',
    form_fuel_price:'Τιμή βενζίνης (€/L)', fuel_price_ph:'π.χ. 1.95',
    form_food_lbl:'Φαγητό/άτομο/στάση (€)', food_ph:'π.χ. 12',
    form_entry_lbl:'Είσοδοι/άτομο/στάση (€)', entry_ph:'π.χ. 5',
    form_notes:'Σημειώσεις', notes_ph:'Προσωπικές σημειώσεις...',
    v_car:'Αυτοκίνητο', v_moto:'Μοτοσυκλέτα', v_trailer:'Αυτοκίνητο με ρυμουλκό', v_truck:'Φορτηγό',
    search_btn:'🔍 Υπολογισμός Διαδρομής',
    res_maps:'🗺️ Άνοιγμα στο Google Maps ↗',
    res_distance:'Απόσταση', res_duration:'Χρόνος', res_stops:'Στάσεις',
    res_total_cost:'Εκτιμώμενο συνολικό κόστος',
    res_tolls_h:'🛣️ Διόδια', res_tolls_sub:'Επίλεξε αυτοκινητόδρομους που θα περάσεις · ',
    res_plan:'Αναλυτικό Πλάνο',
    res_pdf_note:'💡 Τα κόστη είναι εκτιμήσεις βάσει των επιλογών σου.',
    res_pdf_btn:'📄 Αποθήκευση ως PDF',
    leg_origin:'Αφετηρία', leg_origin_desc:'Σημείο εκκίνησης του ταξιδιού σου.',
    leg_start:'Έναρξη ταξιδιού', leg_weather:'Καιρός', leg_sights:'Αξιοθέατα',
    leg_food:'Φαγητό', leg_arrival:'Άφιξη',
    leg_person:'άτομο', leg_people:'άτομα',
    guide_label:'Οδηγός Προορισμού', guide_heading:'Τι να κάνεις στον προορισμό σου',
    guide_desc:'Βάλε τον προορισμό, τις μέρες σου και τα ενδιαφέροντά σου. Σου φτιάχνουμε πρόγραμμα με αξιοθέατα, εστιατόρια και δραστηριότητες.',
    guide_where:'Πού θες να πας;', guide_dest:'Προορισμός',
    guide_dest_ph:'π.χ. Αθήνα, Θεσσαλονίκη, Ρόδος...',
    guide_days:'Ημέρες παραμονής', guide_days_ph:'π.χ. 3',
    guide_budget:'Προϋπολογισμός/μέρα',
    guide_budget_eco:'€ Οικονομικό', guide_budget_mid:'€€ Μεσαίο', guide_budget_lux:'€€€ Premium',
    guide_interests:'Ενδιαφέροντα',
    p_food:'🍽️ Φαγητό', p_sights:'🏛️ Αξιοθέατα', p_nature:'🌿 Φύση',
    p_night:'🎉 Νυχτερινή ζωή', p_shop:'🛍️ Ψώνια', p_beach:'🏖️ Παραλία',
    guide_btn:'🗺️ Δημιουργία Προγράμματος',
    guide_day:'Ημέρα', guide_places:'τοποθεσίες',
    guide_no_res:'Δεν βρέθηκαν τοποθεσίες για τα επιλεγμένα ενδιαφέροντα. Δοκίμασε διαφορετικά ενδιαφέροντα ή άλλον προορισμό.',
    loading:'Υπολογισμός διαδρομής...',
    footer_copy:'© 2025 Travel Planner Greece · Τα δεδομένα διοδίων είναι εκτιμήσεις βάσει επίσημων τιμοκαταλόγων.',
    footer_privacy:'Πολιτική Απορρήτου',
    w_clear:'Αίθριος καιρός', w_few_clouds:'Λίγα σύννεφα', w_cloudy:'Συννεφιά',
    w_fog:'Ομίχλη', w_drizzle:'Ψιλόβροχο', w_rain:'Βροχή', w_snow:'Χιόνι',
    w_showers:'Ντους βροχής', w_sleet:'Χιονόνερο', w_storm:'Καταιγίδα',
    err_no_key:'Δεν έχει οριστεί Geoapify API key. Βάλε το key σου στη μεταβλητή GEOAPIFY_KEY στο app.js.',
    err_fill_route:'Συμπλήρωσε αφετηρία και προορισμό.',
    err_missing_fields:'Λείπουν βασικά πεδία της φόρμας.',
    err_fill_dest:'Συμπλήρωσε τον προορισμό.',
    err_select_interest:'Επίλεξε τουλάχιστον ένα ενδιαφέρον.',
    err_general:'Κάτι πήγε στραβά στον υπολογισμό της διαδρομής.',
    err_guide:'Σφάλμα κατά την αναζήτηση.',
    no_location:'Δεν βρέθηκε τοποθεσία στην Ελλάδα για',
    no_route:'Δεν βρέθηκε διαδρομή.',
    empty_field:'Υπάρχει κενό πεδίο στη διαδρομή.',
  },
  en: {
    nav_home:'Home', nav_planner:'Route Planner', nav_guide:'Destination Guide',
    nav_privacy:'Privacy', nav_cta:'Start →',
    hero_badge:'FREE TRAVEL TOOL FOR GREECE',
    hero_title:'Every trip starts<br>with <span class="hero-accent">a great plan.</span>',
    hero_subtitle:'Plan your route, calculate fuel costs,<br>tolls and discover attractions in Greece.',
    hero_cta:'Start now →',
    form_route:'Route', form_from:'From', from_ph:'Starting city...',
    form_to:'To', to_ph:'Final destination...', form_add_stop:'+ Add a stop',
    form_dates:'Dates', form_depart:'Departure', form_return:'Return',
    form_settings:'Settings', form_vehicle:'Vehicle type',
    form_people:'People', people_ph:'e.g. 2',
    form_fuel_cons:'Consumption (L/100km)', fuel_cons_ph:'e.g. 7',
    form_fuel_price:'Fuel price (€/L)', fuel_price_ph:'e.g. 1.95',
    form_food_lbl:'Food/person/stop (€)', food_ph:'e.g. 12',
    form_entry_lbl:'Entries/person/stop (€)', entry_ph:'e.g. 5',
    form_notes:'Notes', notes_ph:'Personal notes...',
    v_car:'Car', v_moto:'Motorcycle', v_trailer:'Car with trailer', v_truck:'Truck',
    search_btn:'🔍 Calculate Route',
    res_maps:'🗺️ Open in Google Maps ↗',
    res_distance:'Distance', res_duration:'Duration', res_stops:'Stops',
    res_total_cost:'Estimated total cost',
    res_tolls_h:'🛣️ Tolls', res_tolls_sub:'Select highways you will pass through · ',
    res_plan:'Detailed Plan',
    res_pdf_note:'💡 Costs are estimates based on your settings.',
    res_pdf_btn:'📄 Save as PDF',
    leg_origin:'Origin', leg_origin_desc:'Your trip starting point.',
    leg_start:'Journey start', leg_weather:'Weather', leg_sights:'Sights',
    leg_food:'Food', leg_arrival:'Arrival',
    leg_person:'person', leg_people:'people',
    guide_label:'Destination Guide', guide_heading:'What to do at your destination',
    guide_desc:'Enter your destination, days and interests. We\'ll create an itinerary with attractions, restaurants and activities.',
    guide_where:'Where do you want to go?', guide_dest:'Destination',
    guide_dest_ph:'e.g. Athens, Thessaloniki, Rhodes...',
    guide_days:'Days of stay', guide_days_ph:'e.g. 3',
    guide_budget:'Budget/day',
    guide_budget_eco:'€ Budget', guide_budget_mid:'€€ Mid-range', guide_budget_lux:'€€€ Premium',
    guide_interests:'Interests',
    p_food:'🍽️ Food', p_sights:'🏛️ Sights', p_nature:'🌿 Nature',
    p_night:'🎉 Nightlife', p_shop:'🛍️ Shopping', p_beach:'🏖️ Beach',
    guide_btn:'🗺️ Create Itinerary',
    guide_day:'Day', guide_places:'places',
    guide_no_res:'No places found for the selected interests. Try different interests or another destination.',
    loading:'Calculating route...',
    footer_copy:'© 2025 Travel Planner Greece · Toll data are estimates based on official price lists.',
    footer_privacy:'Privacy Policy',
    w_clear:'Clear sky', w_few_clouds:'Few clouds', w_cloudy:'Overcast',
    w_fog:'Foggy', w_drizzle:'Drizzle', w_rain:'Rain', w_snow:'Snow',
    w_showers:'Rain showers', w_sleet:'Sleet', w_storm:'Thunderstorm',
    err_no_key:'No Geoapify API key set. Add your key to the GEOAPIFY_KEY variable in app.js.',
    err_fill_route:'Please enter origin and destination.',
    err_missing_fields:'Missing required form fields.',
    err_fill_dest:'Please enter a destination.',
    err_select_interest:'Please select at least one interest.',
    err_general:'Something went wrong calculating the route.',
    err_guide:'Error during search.',
    no_location:'No location found in Greece for',
    no_route:'No route found.',
    empty_field:'A route field is empty.',
  }
};

function t(key) { return T[currentLang]?.[key] ?? T.el[key] ?? key; }

function applyLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T[lang]?.[el.dataset.i18n] ?? T.el[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = T[lang]?.[el.dataset.i18nHtml] ?? T.el[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = T[lang]?.[el.dataset.i18nPlaceholder] ?? T.el[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  });
  const btn = qs('langBtn');
  if (btn) btn.textContent = lang === 'el' ? 'EN' : 'ΕΛ';
  document.documentElement.lang = lang;
  try { localStorage.setItem('lang', lang); } catch {}
}

window.toggleLang = function() { applyLang(currentLang === 'el' ? 'en' : 'el'); };

// ─────────────────────────────────────────────────────────────────────────────

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
function weatherDescription(c) { if(c===0)return t('w_clear'); if(c<=2)return t('w_few_clouds'); if(c<=3)return t('w_cloudy'); if(c<=48)return t('w_fog'); if(c<=57)return t('w_drizzle'); if(c<=67)return t('w_rain'); if(c<=77)return t('w_snow'); if(c<=82)return t('w_showers'); if(c<=86)return t('w_sleet'); return t('w_storm'); }

async function searchCitySuggestions(text) {
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(text)}&filter=countrycode:gr&format=json&limit=5&apiKey=${GEOAPIFY_KEY}`;
  return (await apiJson(url)).results || [];
}

async function geocodePlace(text) {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(text+", Greece")}&filter=countrycode:gr&format=json&limit=1&apiKey=${GEOAPIFY_KEY}`;
  const data = await apiJson(url);
  if (!data.results?.length) throw new Error(`${t('no_location')}: ${text}`);
  const item = data.results[0];
  return { name: item.city||item.town||item.village||item.suburb||item.name||text, label: item.formatted||item.address_line1||text, lat: item.lat, lon: item.lon };
}

async function resolvePlaceFromInput(input) {
  const value = input.value.trim();
  if (!value) throw new Error(t('empty_field'));
  const { label, lat, lon, name } = input.dataset;
  if (label && lat && lon && value === label) return { name: name||value, label, lat: Number(lat), lon: Number(lon) };
  return geocodePlace(value);
}

async function getRoute(places) {
  const waypoints = places.map(p=>`${p.lat},${p.lon}`).join("|");
  const url = `https://api.geoapify.com/v1/routing?waypoints=${encodeURIComponent(waypoints)}&mode=drive&format=json&lang=el&apiKey=${GEOAPIFY_KEY}`;
  const data = await apiJson(url);
  if (!data.results?.length) throw new Error(t('no_route'));
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
  if (qs("metaPeople")) qs("metaPeople").textContent = `${settings.people} ${settings.people>1?t('leg_people'):t('leg_person')}`;
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
  originCard.innerHTML = `<div class="leg-head" onclick="toggleLeg(this)"><div><h3>${t('leg_origin')}: ${escapeHtml(places[0].name)}</h3><p>${t('leg_origin_desc')}</p></div><div>▾</div></div><div class="leg-body"><div class="place-list"><div class="place-item"><strong>${t('leg_start')}</strong><div class="muted">${escapeHtml(places[0].label||places[0].name)}</div></div></div></div>`;
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
      weatherHtml = `<div class="place-item weather-item"><strong>${t('leg_weather')} ${formatDate(weatherDate)}</strong><div class="weather-details"><span class="weather-icon">${weatherIcon(weather.code)}</span><span class="weather-desc">${weatherDescription(weather.code)}</span><span class="weather-temp"><span class="temp-max">↑${weather.maxTemp}°</span><span class="temp-min">↓${weather.minTemp}°</span></span>${weather.precipitation>0?`<span class="weather-rain">🌧 ${weather.precipitation.toFixed(1)}mm</span>`:""}</div></div>`;
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
          <div class="place-item"><strong>${t('leg_sights')}</strong><div class="muted">${poi.sights.map(x=>`${escapeHtml(x.name)} — ${escapeHtml(x.desc)}`).join("<br>")}</div></div>
          <div class="place-item"><strong>${t('leg_food')}</strong><div class="muted">${poi.food.map(x=>`${escapeHtml(x.name)} — ${escapeHtml(x.desc)}`).join("<br>")}</div></div>
          <div class="place-item"><strong>${t('leg_arrival')}</strong><div class="muted">${escapeHtml(toPlace.label||toPlace.name)}</div></div>
        </div>
      </div>`;
    legsContainer.appendChild(card);
  }

  if (qs("results")) { qs("results").style.display = "block"; qs("results").scrollIntoView({ behavior: "smooth", block: "start" }); }
}

async function handleSearch() {
  clearError();
  if (!GEOAPIFY_KEY || GEOAPIFY_KEY.includes("ΒΑΛΕ_ΕΔΩ") || GEOAPIFY_KEY.includes("REPLACE")) { showError(t('err_no_key')); return; }
  const { originInput, destinationInput, stopInputs } = collectRouteInputs();
  if (!originInput || !destinationInput) { showError(t('err_missing_fields')); return; }
  if (!originInput.value.trim() || !destinationInput.value.trim()) { showError(t('err_fill_route')); return; }

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
    showError(err.message || t('err_general'));
  } finally { showLoader(false); }
}

// ─── DESTINATION GUIDE ──────────────────────────────────────────────────────

const GUIDE_CAT_ICONS = {
  'catering.restaurant': '🍽️', 'catering.cafe': '☕', 'catering.bar': '🍻',
  'catering.fast_food': '🍔', 'tourism.attraction': '🏛️', 'tourism.sights': '🗺️',
  'entertainment.museum': '🏺', 'entertainment.nightclub': '🎉',
  'leisure.park': '🌿', 'natural': '🌲', 'commercial.shopping_mall': '🛍️',
  'commercial': '🛒', 'leisure.beach_resort': '🏖️', 'natural.water': '🌊',
};

const GUIDE_CAT_LABELS = {
  'catering.restaurant': 'Εστιατόριο', 'catering.cafe': 'Καφέ', 'catering.bar': 'Μπαρ',
  'catering.fast_food': 'Fast food', 'tourism.attraction': 'Αξιοθέατο',
  'tourism.sights': 'Αξιοθέατο', 'entertainment.museum': 'Μουσείο',
  'entertainment.nightclub': 'Νυχτερινό κέντρο', 'leisure.park': 'Πάρκο',
  'natural': 'Φύση', 'commercial.shopping_mall': 'Εμπορικό κέντρο',
  'commercial': 'Κατάστημα', 'leisure.beach_resort': 'Παραλία', 'natural.water': 'Παραλία / Θαλάσσιο',
};

function guideCatIcon(cat) {
  if (!cat) return '📍';
  for (const [k, v] of Object.entries(GUIDE_CAT_ICONS)) { if (cat.startsWith(k)) return v; }
  return '📍';
}

function guideCatLabel(cat) {
  if (!cat) return '';
  for (const [k, v] of Object.entries(GUIDE_CAT_LABELS)) { if (cat.startsWith(k)) return v; }
  return cat.replace(/\./g, ' · ');
}

async function fetchGuidePlaces(lat, lon, cats, limit) {
  const url = `https://api.geoapify.com/v2/places?categories=${encodeURIComponent(cats)}&filter=circle:${lon},${lat},15000&limit=${limit}&apiKey=${GEOAPIFY_KEY}`;
  try {
    const data = await apiJson(url);
    return (data.features || []).map(f => ({
      name: f.properties?.name,
      address: f.properties?.address_line2 || f.properties?.city || '',
      category: (f.properties?.categories || [])[0] || cats.split(',')[0],
    })).filter(p => p.name && p.name.trim().length > 0);
  } catch { return []; }
}

async function handleGuideSearch() {
  const destInput = qs('guideDestination');
  const daysInput = qs('guideDays');
  const errBox = qs('guideErrorBox');
  const showErr = msg => { if (errBox) { errBox.textContent = msg; errBox.style.display = 'block'; } };
  const clearErr = () => { if (errBox) { errBox.textContent = ''; errBox.style.display = 'none'; } };
  clearErr();

  if (!GEOAPIFY_KEY || GEOAPIFY_KEY.includes('REPLACE')) { showErr(t('err_no_key')); return; }
  if (!destInput?.value.trim()) { showErr(t('err_fill_dest')); return; }

  const days = Math.min(14, Math.max(1, parseInt(daysInput?.value) || 3));
  const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value);
  if (!interests.length) { showErr(t('err_select_interest')); return; }

  try {
    showLoader(true);

    let place;
    if (destInput.dataset.lat && destInput.dataset.lon && destInput.value === destInput.dataset.label) {
      place = { name: destInput.dataset.name || destInput.value, lat: +destInput.dataset.lat, lon: +destInput.dataset.lon };
    } else {
      place = await geocodePlace(destInput.value.trim());
    }

    const limit = Math.max(4, Math.ceil(days * 4 / interests.length) + 2);
    const groups = await Promise.all(interests.map(cats => fetchGuidePlaces(place.lat, place.lon, cats, limit)));

    // Interleave results so each day gets a mix of categories
    const interleaved = [];
    const maxLen = Math.max(0, ...groups.map(g => g.length));
    for (let i = 0; i < maxLen; i++) {
      for (const g of groups) { if (i < g.length) interleaved.push(g[i]); }
    }

    // 4 places per day
    const dayPlans = [];
    for (let d = 0; d < days; d++) {
      const chunk = interleaved.slice(d * 4, (d + 1) * 4);
      if (chunk.length) dayPlans.push(chunk);
    }

    renderGuideResults(place.name, dayPlans);
  } catch (err) {
    console.error(err);
    if (errBox) { errBox.textContent = err.message || t('err_guide'); errBox.style.display = 'block'; }
  } finally {
    showLoader(false);
  }
}

function renderGuideResults(cityName, dayPlans) {
  const resultsEl = qs('guideResults');
  const titleEl = qs('guideResultsTitle');
  const cardsEl = qs('guideDayCards');
  if (!resultsEl || !cardsEl) return;

  if (titleEl) titleEl.textContent = `Πρόγραμμα: ${cityName}`;
  cardsEl.innerHTML = '';

  if (!dayPlans.length) {
    cardsEl.innerHTML = `<p style="color:var(--text-muted);padding:16px 0;">${t('guide_no_res')}</p>`;
    resultsEl.style.display = 'block';
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  dayPlans.forEach((places, i) => {
    const card = document.createElement('div');
    card.className = 'guide-day-card';
    card.innerHTML = `
      <div class="guide-day-head">
        <h3>${t('guide_day')} ${i + 1}</h3>
        <span class="guide-day-count">${places.length} ${t('guide_places')}</span>
      </div>
      <div class="guide-day-body">
        ${places.map(p => `
          <div class="guide-place-card">
            <div class="guide-place-icon">${guideCatIcon(p.category)}</div>
            <div class="guide-place-info">
              <div class="guide-place-name">${escapeHtml(p.name)}</div>
              <div class="guide-place-type">${escapeHtml(guideCatLabel(p.category))}</div>
              ${p.address ? `<div class="guide-place-address">${escapeHtml(p.address)}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>`;
    cardsEl.appendChild(card);
  });

  resultsEl.style.display = 'block';
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  const guideSearchBtn = qs("guideSearchBtn");
  if (guideSearchBtn) guideSearchBtn.addEventListener("click", handleGuideSearch);
  const langBtn = qs("langBtn");
  if (langBtn) langBtn.addEventListener("click", toggleLang);
  initBaseAutocomplete();
  applyLang(currentLang);
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