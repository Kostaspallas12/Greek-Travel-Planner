const GEOAPIFY_PROXY = "/.netlify/functions/geoapify";

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
    guide_interests:'Ενδιαφέροντα',
    p_food:'🍽️ Φαγητό', p_sights:'🏛️ Αξιοθέατα', p_nature:'🌿 Φύση',
    p_night:'🎉 Νυχτερινή ζωή', p_shop:'🛍️ Ψώνια', p_beach:'🏖️ Παραλία',
    guide_btn:'🗺️ Δημιουργία Προγράμματος',
    guide_day:'Ημέρα', guide_places:'τοποθεσίες',
    guide_no_res:'Δεν βρέθηκαν τοποθεσίες για τα επιλεγμένα ενδιαφέροντα. Δοκίμασε διαφορετικά ενδιαφέροντα ή άλλον προορισμό.',
    loading:'Υπολογισμός διαδρομής...',
    footer_copy:'© 2026 Travel Planner Greece · Τα δεδομένα διοδίων είναι εκτιμήσεις βάσει επίσημων τιμοκαταλόγων.',
    footer_privacy:'Πολιτική Απορρήτου',
    w_clear:'Αίθριος καιρός', w_few_clouds:'Λίγα σύννεφα', w_cloudy:'Συννεφιά',
    w_fog:'Ομίχλη', w_drizzle:'Ψιλόβροχο', w_rain:'Βροχή', w_snow:'Χιόνι',
    w_showers:'Ντους βροχής', w_sleet:'Χιονόνερο', w_storm:'Καταιγίδα',
    err_fill_route:'Συμπλήρωσε αφετηρία και προορισμό.',
    err_missing_fields:'Λείπουν βασικά πεδία της φόρμας.',
    err_fill_dest:'Συμπλήρωσε τον προορισμό.',
    err_select_interest:'Επίλεξε τουλάχιστον ένα ενδιαφέρον.',
    err_general:'Κάτι πήγε στραβά στον υπολογισμό της διαδρομής.',
    err_guide:'Σφάλμα κατά την αναζήτηση.',
    no_location:'Δεν βρέθηκε τοποθεσία στην Ελλάδα για',
    no_route:'Δεν βρέθηκε διαδρομή.',
    empty_field:'Υπάρχει κενό πεδίο στη διαδρομή.',
    unit_km:'χλμ', unit_points:'σημεία', dur_h:'ω', dur_m:'λ',
    meta_no_dates:'Χωρίς ημερομηνίες', meta_no_notes:'Χωρίς σημειώσεις', meta_notes:'Σημειώσεις',
    cost_food:'Φαγητό', cost_entry:'Είσοδοι', stop_ph:'Ενδιάμεση στάση...', remove_stop:'Αφαίρεση',
    guide_program:'Πρόγραμμα', nav_back:'← Επιστροφή στην αρχική',
    leg_from_port:'Από το λιμάνι', leg_at_port:'Άφιξη στο λιμάνι',
    loading_guide:'Δημιουργία προγράμματος...',
    err_people:'Τα άτομα πρέπει να είναι ακέραιος αριθμός, από 1 και πάνω.',
    err_fuel:'Συμπλήρωσε κατανάλωση και τιμή βενζίνης με αριθμούς μεγαλύτερους από το 0, για να υπολογιστεί το κόστος.',
    err_negative:'Το φαγητό και οι είσοδοι δεν μπορούν να έχουν αρνητική τιμή.',
    err_past_date:'Η αναχώρηση δεν μπορεί να είναι σε παρελθοντική ημερομηνία.',
    err_no_depart:'Συμπλήρωσε και την ημερομηνία αναχώρησης.',
    err_return_before:'Η επιστροφή δεν μπορεί να είναι πριν από την αναχώρηση.',
    err_same_place:'Η αφετηρία και ο επόμενος προορισμός είναι το ίδιο μέρος',
    err_guide_days:'Οι ημέρες παραμονής πρέπει να είναι ακέραιος αριθμός από 1 έως 14.',
    guide_fewer:(found, days) => `Βρέθηκαν μέρη για ${found} από τις ${days} ημέρες. Δοκίμασε περισσότερα ενδιαφέροντα.`,
    weather_later:'Η πρόγνωση καιρού εμφανίζεται έως 16 ημέρες πριν από το ταξίδι.',
    pick_from_list:'Δεν είμαστε σίγουροι ποιο μέρος εννοείς. Διάλεξέ το από τη λίστα προτάσεων',
    no_road_route:'Δεν βρέθηκε οδική διαδρομή. Αν ο προορισμός είναι μικρό νησί, δεν υπάρχει ακόμα στα δρομολόγια της εφαρμογής.',
    no_sea_route:'Δεν βρέθηκε ακτοπλοϊκή σύνδεση στα δρομολόγια της εφαρμογής για',
    sea_title:'⛴️ Επίλεξε πώς θα πας', sea_ferry:'Πλοίο', sea_road:'οδικά', sea_total:'συνολικά',
    sea_person:'/άτομο', sea_no_price:'τιμή: δες την εταιρεία',
    sea_many:'πολλά δρομολόγια τη μέρα', sea_daily:'περίπου καθημερινά', sea_weekly:'λίγες φορές την εβδομάδα',
    sea_no_cars:'⚠️ Μόνο επιβάτες, χωρίς όχημα',
    sea_note:'Ώρες και τιμές είναι ενδεικτικές, χωρίς αναμονή στο λιμάνι και χωρίς το εισιτήριο οχήματος. Τα δρομολόγια αλλάζουν ανά εποχή, οπότε έλεγξέ τα πριν κλείσεις.',
    sea_tickets:'Εισιτήρια', sea_road_leg:'Οδικώς', sea_fuel:'Βενζίνη',
    road_has_ferry:'⚠️ Η διαδρομή περιλαμβάνει πλοίο που δεν υπάρχει στα δρομολόγια της εφαρμογής, οπότε χιλιόμετρα, χρόνος και κόστος δεν είναι ακριβή.',
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
    guide_interests:'Interests',
    p_food:'🍽️ Food', p_sights:'🏛️ Sights', p_nature:'🌿 Nature',
    p_night:'🎉 Nightlife', p_shop:'🛍️ Shopping', p_beach:'🏖️ Beach',
    guide_btn:'🗺️ Create Itinerary',
    guide_day:'Day', guide_places:'places',
    guide_no_res:'No places found for the selected interests. Try different interests or another destination.',
    loading:'Calculating route...',
    footer_copy:'© 2026 Travel Planner Greece · Toll data are estimates based on official price lists.',
    footer_privacy:'Privacy Policy',
    w_clear:'Clear sky', w_few_clouds:'Few clouds', w_cloudy:'Overcast',
    w_fog:'Foggy', w_drizzle:'Drizzle', w_rain:'Rain', w_snow:'Snow',
    w_showers:'Rain showers', w_sleet:'Sleet', w_storm:'Thunderstorm',
    err_fill_route:'Please enter origin and destination.',
    err_missing_fields:'Missing required form fields.',
    err_fill_dest:'Please enter a destination.',
    err_select_interest:'Please select at least one interest.',
    err_general:'Something went wrong calculating the route.',
    err_guide:'Error during search.',
    no_location:'No location found in Greece for',
    no_route:'No route found.',
    empty_field:'A route field is empty.',
    unit_km:'km', unit_points:'points', dur_h:'h', dur_m:'min',
    meta_no_dates:'No dates', meta_no_notes:'No notes', meta_notes:'Notes',
    cost_food:'Food', cost_entry:'Entries', stop_ph:'Add a stop...', remove_stop:'Remove',
    guide_program:'Itinerary', nav_back:'← Back to home',
    leg_from_port:'From the port', leg_at_port:'Arrival at the port',
    loading_guide:'Creating your itinerary...',
    err_people:'People must be a whole number, 1 or more.',
    err_fuel:'Enter fuel consumption and fuel price as numbers above 0, so the cost can be calculated.',
    err_negative:'Food and entries cannot have a negative price.',
    err_past_date:'The departure date cannot be in the past.',
    err_no_depart:'Please enter a departure date as well.',
    err_return_before:'The return date cannot be before the departure date.',
    err_same_place:'The start and next destination are the same place',
    err_guide_days:'Days of stay must be a whole number from 1 to 14.',
    guide_fewer:(found, days) => `We found places for ${found} of your ${days} days. Try adding more interests.`,
    weather_later:'The weather forecast appears up to 16 days before your trip.',
    pick_from_list:'We are not sure which place you mean. Please choose it from the suggestions',
    no_road_route:'No road route found. If your destination is a small island, it is not in the app\'s ferry lines yet.',
    no_sea_route:'No ferry connection in the app\'s ferry lines for',
    sea_title:'⛴️ Choose how to get there', sea_ferry:'Ferry', sea_road:'by road', sea_total:'in total',
    sea_person:'/person', sea_no_price:'price: check the operator',
    sea_many:'several sailings a day', sea_daily:'roughly daily', sea_weekly:'a few times a week',
    sea_no_cars:'⚠️ Foot passengers only, no vehicles',
    sea_note:'Times and prices are indicative, excluding port waiting time and the vehicle ticket. Schedules change by season, so check them before booking.',
    sea_tickets:'Tickets', sea_road_leg:'By road', sea_fuel:'Fuel',
    road_has_ferry:'⚠️ This route includes a ferry that is not in the app\'s ferry lines, so distance, time and cost are not accurate.',
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
  const pageTitle = document.body.dataset[lang === 'en' ? 'titleEn' : 'titleEl'];
  if (pageTitle) document.title = pageTitle;
  try { localStorage.setItem('lang', lang); } catch {}
}

// Ξαναζωγραφίζει ό,τι έχει ήδη εμφανιστεί, κρατώντας τις επιλογές διοδίων του χρήστη.
window.toggleLang = function() {
  applyLang(currentLang === 'el' ? 'en' : 'el');
  clearError();
  const guideErr = qs('guideErrorBox');
  if (guideErr) { guideErr.textContent = ''; guideErr.style.display = 'none'; }
  document.querySelectorAll('.stop-input').forEach(el => { el.placeholder = t('stop_ph'); });
  if (state.lastRender) renderResults({ ...state.lastRender, scroll: false, keepTolls: true });
  if (state.lastGuide) renderGuideResults(...state.lastGuide, false);
};

// ─────────────────────────────────────────────────────────────────────────────

const state = { stopIndex: 0, renderId: 0, lastRender: null, lastGuide: null };

const VEHICLE_KEYS = { "0.5": "v_moto", "1.0": "v_car", "1.4": "v_trailer", "2.0": "v_truck" };
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

const TOLL_EN = {
  "Αττική Οδός": "Attiki Odos", "Νέα Οδός (Αθήνα–Λαμία)": "Nea Odos (Athens–Lamia)", "Αφίδνες": "Afidnes", "Θήβα": "Thiva", "Τραγάνα": "Tragana", "Αγία Τριάδα": "Agia Triada", "Μαυρομαντήλα": "Mavromantila",
  "Αυτ/μος Αιγαίου (Λαμία–Θεσ/νίκη)": "Aegean Motorway (Lamia–Thessaloniki)", "Πελασγία": "Pelasgia", "Μοσχοχώρι": "Moschochori", "Μακρυχώρι": "Makrychori", "Λεπτοκαρυά": "Leptokarya", "Κλειδί (Αιγίνιο)": "Kleidi (Aiginio)",
  "Ολυμπία Οδός (Αθήνα–Πάτρα)": "Olympia Odos (Athens–Patras)", "Ελευσίνα": "Elefsina", "Ισθμός": "Isthmos", "Κιάτο": "Kiato", "Ελαιώνας": "Elaionas", "Ρίο": "Rio",
  "Γέφυρα Ρίου–Αντιρρίου": "Rio–Antirrio Bridge", "Ιόνια Οδός (Αντίρριο–Ιωάννινα)": "Ionia Odos (Antirrio–Ioannina)", "Κλόκοβα": "Klokova", "Αγγελόκαστρο": "Angelokastro", "Μενίδι Άρτας": "Menidi (Arta)", "Τέροβο": "Terovo",
  "Ε65 (Λαμία–Καλαμπάκα)": "E65 (Lamia–Kalambaka)", "Λιανοκλάδι": "Lianokladi", "Τρίκαλα": "Trikala",
  "Εγνατία Οδός": "Egnatia Odos", "Τύρια (Παραμυθιά)": "Tyria (Paramythia)", "Παμβώτιδα": "Pamvotida", "Μαλακάσι (Μέτσοβο)": "Malakasi (Metsovo)", "Σιάτιστα": "Siatista", "Πολύμυλος (Κοζάνη)": "Polymylos (Kozani)", "Μάλγαρα": "Malgara", "Θεσ/νίκη (Ωραιόκαστρο)": "Thessaloniki (Oraiokastro)", "Ανάληψη (Λαγκαδά)": "Analipsi (Lagkadas)", "Ασπροβάλτα": "Asprovalta", "Μουσθένη (Καβάλα)": "Mousthéni (Kavala)", "Ίασμος (Κομοτηνή)": "Iasmos (Komotini)", "Μεστής": "Mesti", "Αρδανίου": "Ardanio",
  "Μορέας (Κόρινθος–Καλαμάτα)": "Moreas (Corinth–Kalamata)", "Σπαθοβούνι": "Spathovouni", "Νεστάνη": "Nestani", "Γέφυρα Μαναρη": "Manari Bridge", "Βελιγοστή": "Veligosti", "Καλαμάτα": "Kalamata",
};
function tollName(name) { return currentLang === 'en' ? (TOLL_EN[name] || name) : name; }

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

function stationDomId(hw, st) { return `${hw.id}_${hw.stations.indexOf(st)}`; }

function renderTollPicker(vehicleKey, keepSelection = false) {
  tollState.vehicleKey = vehicleKey;
  if (!keepSelection) tollState.checkedStations = {};

  const inner = qs("tollPickerInner");
  if (!inner) return;

  inner.innerHTML = `<div class="toll-hw-list">${HIGHWAYS.map(hw => {
    const isSingle = hw.stations.length === 1;
    return `
      <div class="toll-hw-item">
        <div class="toll-hw-row" id="hwrow_${hw.id}">
          <div class="toll-hw-toggle" id="hwtoggle_${hw.id}" onclick="onHwToggleClick('${hw.id}')"></div>
          <span class="toll-hw-name">${escapeHtml(tollName(hw.name))}</span>
          ${!isSingle ? `<button class="toll-expand-btn" id="hwexpbtn_${hw.id}" onclick="toggleHwStations('${hw.id}')">›</button>` : ''}
          <span class="toll-hw-price" id="hwprice_${hw.id}">0.00€</span>
        </div>
        ${!isSingle ? `
        <div class="toll-stations-wrap" id="hwstations_${hw.id}">
          <div class="toll-stations-inner">
            ${hw.stations.map(st => {
              const k = `${hw.id}__${st.name}`;
              const safeId = stationDomId(hw, st);
              return `<label class="toll-st-row" for="st_${safeId}">
                <input type="checkbox" id="st_${safeId}" data-key="${escapeHtml(k)}" onchange="onStationChange(this)">
                <span class="toll-st-name" id="stname_${safeId}">${escapeHtml(tollName(st.name))}</span>
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
        const safeId = stationDomId(hw, st);
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
  const grand = window.cachedCosts.fuel + tolls + window.cachedCosts.food + window.cachedCosts.entry + window.cachedCosts.ferry;
  if (qs("sumTotalCost")) qs("sumTotalCost").textContent = euro(grand);
  if (qs("tollSumInline")) qs("tollSumInline").textContent = euro(tolls);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// [όνομα, περιγραφή] ανά γλώσσα
const POI_BY_CITY = {
  "θεσσαλονικη": {
    el: { sights: [["Λευκός Πύργος", "Σύμβολο της πόλης"], ["Άγιος Δημήτριος", "Ιστορικός ναός"]], food: [["Λαδάδικα", "Περιοχή για φαγητό και βράδυ"], ["Τρίγωνα Πανοράματος", "Κλασικό γλυκό της πόλης"]] },
    en: { sights: [["White Tower", "The symbol of the city"], ["Agios Dimitrios", "Historic church"]], food: [["Ladadika", "An area for food and nights out"], ["Trigona Panoramatos", "The city's classic pastry"]] } },
  "αθηνα": {
    el: { sights: [["Ακρόπολη", "Το πιο εμβληματικό σημείο"], ["Πλάκα", "Ιστορική γειτονιά"]], food: [["Μοναστηράκι", "Street food και βόλτα"], ["Κουκάκι", "Καφέ και brunch"]] },
    en: { sights: [["Acropolis", "The most iconic landmark"], ["Plaka", "Historic neighbourhood"]], food: [["Monastiraki", "Street food and a stroll"], ["Koukaki", "Coffee and brunch"]] } },
  "πατρα": {
    el: { sights: [["Κάστρο Πατρών", "Ιστορικό κάστρο με θέα"], ["Ρωμαϊκό Ωδείο", "Σημαντικό αρχαιολογικό μνημείο"]], food: [["Ρήγα Φεραίου", "Κεντρικός δρόμος με καφέ και φαγητό"], ["Παραλία Πάτρας", "Βόλτα και στάση για φαγητό"]] },
    en: { sights: [["Patras Castle", "Historic castle with a view"], ["Roman Odeon", "Important archaeological monument"]], food: [["Riga Feraiou", "Central street with cafes and food"], ["Patras seafront", "A walk and a food stop"]] } },
  "κοζανη": {
    el: { sights: [["Κεντρική Πλατεία", "Σημείο αναφοράς της πόλης"], ["Λαογραφικό Μουσείο", "Ματιά στην τοπική ιστορία"]], food: [["Τοπική ταβέρνα", "Δοκίμασε τοπικές γεύσεις"], ["Κέντρο Κοζάνης", "Καφέ και φαγητό"]] },
    en: { sights: [["Central Square", "The city's meeting point"], ["Folklore Museum", "A look at local history"]], food: [["Local tavern", "Try local flavours"], ["Kozani centre", "Coffee and food"]] } },
};
const POI_ALIASES = { thessaloniki: "θεσσαλονικη", athens: "αθηνα", patras: "πατρα", patra: "πατρα", kozani: "κοζανη" };
const POI_DEFAULT = {
  el: { sights: [["Κεντρική πλατεία", "Καλή πρώτη στάση για βόλτα"]], food: [["Τοπική ταβέρνα", "Δοκίμασε τοπική κουζίνα"]] },
  en: { sights: [["Central square", "A good first stop for a walk"]], food: [["Local tavern", "Try the local cuisine"]] },
};

function qs(id) { return document.getElementById(id); }
function greekKey(str) { return String(str || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function getPoiForCity(name) { const k = greekKey(name); const pois = POI_BY_CITY[POI_ALIASES[k] || k] || POI_DEFAULT; return pois[currentLang] || pois.el; }
function poiLines(items) { return items.map(([name, desc]) => `${escapeHtml(name)} — ${escapeHtml(desc)}`).join("<br>"); }
function showError(msg) { const b = qs("errorBox"); if (!b) return; b.textContent = msg; b.style.display = "block"; }
function clearError() { const b = qs("errorBox"); if (!b) return; b.textContent = ""; b.style.display = "none"; }
function showLoader(on, textKey = "loading") { const l = qs("loader"); if (!l) return; const text = l.querySelector(".loading-text"); if (on && text) text.textContent = t(textKey); l.style.display = on ? "flex" : "none"; }
function formatDate(v) { if (!v) return null; const [y,m,d] = v.split("-"); return `${d}/${m}/${y}`; }
function formatDuration(s) { const tm = Math.round(s/60); const h = Math.floor(tm/60); const m = tm%60; if (h<=0) return `${m}${t('dur_m')}`; if (m===0) return `${h}${t('dur_h')}`; return `${h}${t('dur_h')} ${m}${t('dur_m')}`; }
function euro(v) { return `${Number(v||0).toFixed(2)}€`; }
function calcFuelCost(km, c, p) { return (km/100)*c*p; }
function calcFoodCost(ppl, f) { return ppl*f; }
function calcEntryCost(ppl, e) { return ppl*e; }
function escapeHtml(s) { return String(s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }

async function apiJson(url) { const r = await fetch(url); const d = await r.json(); if (!r.ok) throw new Error(d?.message||`HTTP ${r.status}`); return d; }
function debounce(fn, delay=300) { let t; return (...a) => { clearTimeout(t); t = setTimeout(()=>fn(...a), delay); }; }
function todayIso() { return isoDate(new Date()); }
function isoDate(d) { return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split("T")[0]; }

const FORECAST_DAYS = 16;
function hasForecast(date) {
  const last = new Date();
  last.setDate(last.getDate() + FORECAST_DAYS - 1);
  return date >= todayIso() && date <= isoDate(last);
}

async function getWeather(lat, lon, date) {
  if (!hasForecast(date)) return null;
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&timezone=auto&start_date=${date}&end_date=${date}`;
    const data = await fetch(url).then(r=>r.json());
    if (!data.daily) return null;
    return { maxTemp: Math.round(data.daily.temperature_2m_max[0]), minTemp: Math.round(data.daily.temperature_2m_min[0]), precipitation: data.daily.precipitation_sum[0], code: data.daily.weathercode[0] };
  } catch { return null; }
}
function weatherIcon(c) { if(c===0)return"☀️"; if(c<=2)return"🌤️"; if(c<=3)return"☁️"; if(c<=48)return"🌫️"; if(c<=57)return"🌦️"; if(c<=67)return"🌧️"; if(c<=77)return"❄️"; if(c<=82)return"🌧️"; if(c<=86)return"🌨️"; return"⛈️"; }
function weatherDescription(c) { if(c===0)return t('w_clear'); if(c<=2)return t('w_few_clouds'); if(c<=3)return t('w_cloudy'); if(c<=48)return t('w_fog'); if(c<=57)return t('w_drizzle'); if(c<=67)return t('w_rain'); if(c<=77)return t('w_snow'); if(c<=82)return t('w_showers'); if(c<=86)return t('w_sleet'); return t('w_storm'); }

// Πρώτα οι πόλεις, μετά οι περιοχές και στο τέλος δρόμοι και καταστήματα.
const SUGGESTION_ORDER = ["city", "suburb", "county", "state", "postcode", "street", "building", "amenity"];
function suggestionRank(item) { const i = SUGGESTION_ORDER.indexOf(item.result_type); return i < 0 ? SUGGESTION_ORDER.length : i; }

function islandName(island) { return island[currentLang] || island.el; }
function islandPlace(island) { const p = PORTS[island.port]; return { name: islandName(island), label: islandName(island), names: { el: island.el, en: island.en }, lat: p.lat, lon: p.lon }; }

async function searchCitySuggestions(text) {
  const url = `${GEOAPIFY_PROXY}?endpoint=autocomplete&text=${encodeURIComponent(text)}&filter=countrycode:gr&format=json&limit=8&lang=${currentLang}`;
  const results = ((await apiJson(url)).results || []).sort((a, b) => suggestionRank(a) - suggestionRank(b));
  const islands = findIslandsByPrefix(text).map(island => { const p = islandPlace(island); return { name: p.name, formatted: p.label, lat: p.lat, lon: p.lon }; });
  return [...islands, ...results].slice(0, 5);
}

const ACCEPTED_TYPES = ["city", "county", "state", "street", "building"];
const MIN_CONFIDENCE = 0.8;
const SAME_PLACE_KM = 20;

// Το geocoding επιστρέφει πάντα κάτι στην Ελλάδα (το «Paris» είναι κατάστημα στα Ιωάννινα),
// οπότε κρατάμε μόνο σίγουρα αποτελέσματα και για τα υπόλοιπα ζητάμε επιλογή από τη λίστα.
function pickConfidentResult(results) {
  const top = results[0];
  if (!ACCEPTED_TYPES.includes(top.result_type) || (top.rank?.confidence ?? 0) < MIN_CONFIDENCE) return null;
  const sameNameCities = results.filter(r => r.result_type === "city" && r.rank?.match_type === "full_match" && (r.rank?.confidence ?? 0) >= 0.9);
  const ambiguous = sameNameCities.some(r => haversineKm(top, r) > SAME_PLACE_KM);
  return ambiguous ? null : top;
}

async function geocodePlace(text) {
  const url = `${GEOAPIFY_PROXY}?endpoint=search&text=${encodeURIComponent(text+", Greece")}&filter=countrycode:gr&format=json&limit=5&lang=${currentLang}`;
  const data = await apiJson(url);
  if (!data.results?.length) throw new Error(`${t('no_location')}: ${text}`);
  const item = pickConfidentResult(data.results);
  if (!item) { const err = new Error(`${t('pick_from_list')}: ${text}`); err.needsPick = true; throw err; }
  return { name: item.city||item.town||item.village||item.suburb||item.name||item.other_names?.name||item.state||text, label: item.formatted||item.address_line1||text, lat: item.lat, lon: item.lon };
}

async function resolvePlaceFromInput(input) {
  const value = input.value.trim();
  if (!value) throw new Error(t('empty_field'));
  const island = findIslandExact(value);
  if (island) return islandPlace(island);
  const { label, lat, lon, name } = input.dataset;
  if (label && lat && lon && value === label) return { name: name||value, label, lat: Number(lat), lon: Number(lon) };
  try { return await geocodePlace(value); }
  catch (err) { if (err.needsPick) input.focus(); throw err; }
}

async function getRoute(places, { avoidFerries = false } = {}) {
  const waypoints = places.map(p=>`${p.lat},${p.lon}`).join("|");
  const avoidParam = avoidFerries ? "&avoid=ferries" : "";
  const url = `${GEOAPIFY_PROXY}?endpoint=routing&waypoints=${encodeURIComponent(waypoints)}&mode=drive&format=json&lang=${currentLang}${avoidParam}`;
  const data = await apiJson(url);
  if (!data.results?.length) throw new Error(t('no_route'));
  return data.results[0];
}

function createAutocomplete(input) {
  const list = input.parentElement.querySelector(".autocomplete-list");
  if (!list) return;
  const run = debounce(async () => {
    const q = input.value.trim();
    if (q.length < 2) { list.style.display = "none"; list.innerHTML = ""; return; }
    try {
      const suggestions = await searchCitySuggestions(q);
      if (q !== input.value.trim() || input.dataset.lat || document.activeElement !== input) return;
      if (!suggestions.length) { list.style.display = "none"; list.innerHTML = ""; return; }
      list.innerHTML = suggestions.map(item => {
        const main = item.city||item.town||item.village||item.suburb||item.name||item.other_names?.name||item.formatted||q;
        const sub = item.formatted||"";
        return `<div class="autocomplete-item" data-name="${escapeHtml(main)}" data-label="${escapeHtml(sub||main)}" data-lat="${item.lat}" data-lon="${item.lon}"><div class="autocomplete-main">${escapeHtml(main)}</div><div class="autocomplete-sub">${escapeHtml(sub)}</div></div>`;
      }).join("");
      list.style.display = "block";
      list.querySelectorAll(".autocomplete-item").forEach(el => {
        el.addEventListener("click", () => { input.value = el.dataset.label; input.dataset.name = el.dataset.name; input.dataset.label = el.dataset.label; input.dataset.lat = el.dataset.lat; input.dataset.lon = el.dataset.lon; list.style.display = "none"; });
      });
    } catch (err) { list.style.display = "none"; list.innerHTML = ""; console.error(err); }
  }, 250);
  input.addEventListener("input", () => { input.dataset.lat = input.dataset.lon = input.dataset.label = input.dataset.name = ""; run(); });
  input.addEventListener("focus", () => { if (!input.dataset.lat) run(); });
  input.addEventListener("blur", () => setTimeout(() => { list.style.display = "none"; }, 150));
}

function createStopRow() {
  state.stopIndex += 1;
  const wrapper = document.createElement("div");
  wrapper.className = "stop-row";
  wrapper.innerHTML = `<div class="field" style="margin:0;"><input class="input place-input stop-input" type="text" placeholder="${t('stop_ph')}" /><div class="autocomplete-list"></div></div><button class="icon-btn" type="button" title="${t('remove_stop')}" aria-label="${t('remove_stop')}">✕</button>`;
  wrapper.querySelector(".icon-btn").addEventListener("click", () => wrapper.remove());
  createAutocomplete(wrapper.querySelector("input"));
  return wrapper;
}

function initBaseAutocomplete() { document.querySelectorAll(".place-input").forEach(createAutocomplete); }
function collectRouteInputs() { return { originInput: qs("origin"), destinationInput: qs("destination"), stopInputs: Array.from(document.querySelectorAll(".stop-input")) }; }
function buildGoogleMapsUrl(places) { return `https://www.google.com/maps/dir/${places.map(p=>encodeURIComponent(p.label||p.name)).join("/")}`; }
window.toggleLeg = function(header) { const body = header.nextElementSibling; if (!body) return; body.classList.toggle("open"); };

// ─── TRIP PLAN (ΔΡΟΜΟΣ + ΠΛΟΙΟ) ──────────────────────────────────────────────

function portName(id) { return PORTS[id][currentLang] || PORTS[id].el; }
function portPlace(id) { const p = PORTS[id]; return { name: portName(id), label: portName(id), names: { el: p.el, en: p.en }, lat: p.lat, lon: p.lon }; }
function placeName(p) { return p.names?.[currentLang] || p.name; }
function placeLabel(p) { return p.names ? placeName(p) : (p.label || p.name); }
function sameLand(a, b) { return islandAt(a.lat, a.lon) === islandAt(b.lat, b.lon); }

async function fetchRoadLegs(places) {
  let route;
  try { route = await getRoute(places, { avoidFerries: true }); }
  catch (err) { console.error(err); throw new Error(t('no_road_route')); }
  return (route.legs || []).map((leg, i) => ({ type: "road", from: places[i], to: places[i+1], distance: leg.distance, time: leg.time, ferry: !!route.ferry }));
}

// Όταν το σημείο είναι το ίδιο το λιμάνι (π.χ. επιλογή «Λέσβος») δεν χρειάζεται κλήση στον router.
async function roadLegsBetween(a, b) {
  if (haversineKm(a, b) < 0.3) return [{ type: "road", from: a, to: b, distance: 0, time: 0, ferry: false }];
  return fetchRoadLegs([a, b]);
}

async function buildSeaOption(from, to, lines) {
  const firstPort = portPlace(lines[0].from);
  const lastPort = portPlace(lines[lines.length-1].to);
  const [toPort, fromPort] = await Promise.all([roadLegsBetween(from, firstPort), roadLegsBetween(lastPort, to)]);
  return { lines, legs: [...toPort, ...lines.map(line => ({ type: "ferry", line })), ...fromPort] };
}

async function buildSeaSegment(from, to) {
  const paths = findSeaPaths(from, to);
  const built = await Promise.allSettled(paths.map(lines => buildSeaOption(from, to, lines)));
  const options = built.filter(r => r.status === "fulfilled").map(r => r.value);
  if (!options.length) throw new Error(`${t('no_sea_route')}: ${placeName(from)} → ${placeName(to)}`);
  return { from, to, options, selected: 0 };
}

// Ο router του Geoapify δεν αποκλείει τα πλοία (το avoid=ferries είναι απλή προτίμηση) και
// συχνά δεν βρίσκει διαδρομή προς νησιά, οπότε τα θαλάσσια τμήματα τα υπολογίζουμε εμείς.
async function buildTripPlan(places) {
  if (places.every((p, i) => i === 0 || sameLand(places[i-1], p))) {
    return [{ legs: await fetchRoadLegs(places), perLegStops: true }];
  }
  const segments = [];
  for (let i = 1; i < places.length; i++) {
    const from = places[i-1], to = places[i];
    segments.push(sameLand(from, to) ? { legs: await fetchRoadLegs([from, to]) } : await buildSeaSegment(from, to));
  }
  return segments;
}

function segmentLegs(seg) { return seg.options ? seg.options[seg.selected].legs : seg.legs; }

// Φαγητό, είσοδοι και καιρός μετρούν μόνο στο τέλος κάθε στάσης, όχι στα λιμάνια.
function flattenPlan(plan) {
  return plan.flatMap(seg => {
    const legs = segmentLegs(seg);
    return legs.map((leg, i) => ({ ...leg, endsAtStop: seg.perLegStops || i === legs.length - 1 }));
  });
}

function optionSummary(option) {
  const roadLegs = option.legs.filter(l => l.type === "road");
  const km = roadLegs.reduce((s, l) => s + l.distance, 0) / 1000;
  const sec = roadLegs.reduce((s, l) => s + l.time * 1.05, 0) + option.lines.reduce((s, l) => s + l.hours * 3600, 0);
  return { km, sec };
}

function renderSeaOptions(plan) {
  const box = qs("seaOptions");
  if (!box) return;
  const seaSegments = plan.map((seg, i) => ({ seg, i })).filter(x => x.seg.options);
  const hasUnknownFerry = plan.some(seg => segmentLegs(seg).some(l => l.ferry));
  const warning = hasUnknownFerry ? `<div class="sea-warning">${t('road_has_ferry')}</div>` : "";
  if (!seaSegments.length) { box.innerHTML = warning; return; }

  box.innerHTML = `${warning}<div class="sea-card">
    <h3>${t('sea_title')}</h3>
    ${seaSegments.map(({ seg, i }) => `
      ${seaSegments.length > 1 ? `<div class="sea-segment-title">${escapeHtml(placeName(seg.from))} → ${escapeHtml(placeName(seg.to))}</div>` : ""}
      ${seg.options.map((option, j) => {
        const { km, sec } = optionSummary(option);
        const lines = option.lines.map(l => {
          const price = l.price === null ? t('sea_no_price') : `${euro(l.price)}${t('sea_person')}`;
          return `<div class="sea-option-line">${escapeHtml(portName(l.from))} → ${escapeHtml(portName(l.to))} · ~${formatDuration(l.hours * 3600)} · ${price}<div class="muted">${t('sea_' + l.freq)}${l.noCars ? ` · ${t('sea_no_cars')}` : ""}</div></div>`;
        }).join("");
        return `<label class="sea-option${j === seg.selected ? " selected" : ""}">
          <input type="radio" name="sea_${i}" ${j === seg.selected ? "checked" : ""} onchange="selectSeaOption(${i},${j})">
          <div class="sea-option-body">${lines}<div class="sea-option-total">${km.toFixed(0)} ${t('unit_km')} ${t('sea_road')} · ~${formatDuration(sec)} ${t('sea_total')}</div></div>
        </label>`;
      }).join("")}`).join("")}
    <p class="sea-note">${t('sea_note')}</p>
  </div>`;
}

window.selectSeaOption = function(segIndex, optionIndex) {
  const last = state.lastRender;
  if (!last) return;
  last.plan[segIndex].selected = optionIndex;
  renderResults({ ...last, scroll: false });
};

async function renderResults({ places, plan, settings, tripInfo, scroll = true, keepTolls = false }) {
  const renderId = ++state.renderId;
  state.lastRender = { places, plan, settings, tripInfo };
  const legs = flattenPlan(plan);
  const roadLegs = legs.filter(l => l.type === "road");
  const ferryLegs = legs.filter(l => l.type === "ferry");
  const totalKm = roadLegs.reduce((s, l) => s + l.distance, 0) / 1000;
  // +5% buffer για πιο ρεαλιστικό χρόνο
  const totalDurationSec = roadLegs.reduce((s, l) => s + l.time * 1.05, 0) + ferryLegs.reduce((s, l) => s + l.line.hours * 3600, 0);
  const vehicleKey = normaliseVehicleKey(settings.vehicleMultiplier);

  const totalFuel = calcFuelCost(totalKm, settings.fuelConsumption, settings.fuelPrice);
  const totalFood = (places.length - 1) * calcFoodCost(settings.people, settings.foodPerStop);
  const totalEntries = (places.length - 1) * calcEntryCost(settings.people, settings.entryPerStop);
  const totalFerry = ferryLegs.reduce((s, l) => s + (l.line.price || 0) * settings.people, 0);
  window.cachedCosts = { fuel: totalFuel, food: totalFood, entry: totalEntries, ferry: totalFerry };
  renderSeaOptions(plan);

  if (qs("routeTitle")) qs("routeTitle").textContent = `${placeName(places[0])} → ${placeName(places[places.length-1])}`;
  const dateLabel = tripInfo.dateFrom ? `${formatDate(tripInfo.dateFrom)}${tripInfo.dateTo?" – "+formatDate(tripInfo.dateTo):""}` : t('meta_no_dates');
  if (qs("metaDates")) qs("metaDates").textContent = dateLabel;
  if (qs("metaPeople")) qs("metaPeople").textContent = `${settings.people} ${settings.people>1?t('leg_people'):t('leg_person')}`;
  if (qs("metaVehicle")) qs("metaVehicle").textContent = t(VEHICLE_KEYS[vehicleKey]||"v_car");
  if (qs("metaVehicleIcon")) qs("metaVehicleIcon").textContent = VEHICLE_ICONS[vehicleKey]||"🚗";
  if (qs("metaNotes")) qs("metaNotes").textContent = tripInfo.notes ? `${t('meta_notes')}: ${tripInfo.notes.slice(0,40)}${tripInfo.notes.length>40?"...":""}` : t('meta_no_notes');
  if (qs("mapsLink")) qs("mapsLink").href = buildGoogleMapsUrl(places);
  if (qs("sumDistance")) qs("sumDistance").textContent = `${totalKm.toFixed(1)} ${t('unit_km')}`;
  if (qs("sumDuration")) qs("sumDuration").textContent = formatDuration(totalDurationSec);
  if (qs("sumStops")) qs("sumStops").textContent = `${places.length} ${t('unit_points')}`;
  if (qs("sumTotalCost")) qs("sumTotalCost").textContent = euro(totalFuel + totalFood + totalEntries + totalFerry + (keepTolls ? allTolls() : 0));

  const tollBody = qs("tollCardBody");
  if (tollBody) tollBody.classList.add("open");
  if (qs("tollCardIcon")) qs("tollCardIcon").textContent = "▴";
  renderTollPicker(vehicleKey, keepTolls);

  const legsContainer = qs("legs");
  if (!legsContainer) return;
  legsContainer.innerHTML = "";

  const originCard = document.createElement("div");
  originCard.className = "leg-card";
  originCard.innerHTML = `<div class="leg-head" onclick="toggleLeg(this)"><div><h3>${t('leg_origin')}: ${escapeHtml(placeName(places[0]))}</h3><p>${t('leg_origin_desc')}</p></div><div>▾</div></div><div class="leg-body"><div class="place-list"><div class="place-item"><strong>${t('leg_start')}</strong><div class="muted">${escapeHtml(placeLabel(places[0]))}</div></div></div></div>`;
  legsContainer.appendChild(originCard);

  const weatherDate = tripInfo.dateFrom || todayIso();

  for (let i = 0; i < legs.length; i++) {
    const leg = legs[i];

    if (leg.type === "ferry") {
      const l = leg.line;
      const ferryCard = document.createElement("div");
      ferryCard.className = "leg-card";
      ferryCard.innerHTML = `<div class="leg-head" onclick="toggleLeg(this)"><div><h3>⛴️ ${escapeHtml(portName(l.from))} → ${escapeHtml(portName(l.to))}</h3><p>${t('sea_ferry')} • ~${formatDuration(l.hours * 3600)}</p></div><div>▾</div></div><div class="leg-body"><div class="cost-grid"><div class="cost-box"><small>${t('sea_tickets')}</small><strong>${l.price === null ? "–" : euro(l.price * settings.people)}</strong></div></div><div class="place-list"><div class="place-item"><div class="muted">${t('sea_' + l.freq)}${l.noCars ? ` · ${t('sea_no_cars')}` : ""}</div></div></div></div>`;
      legsContainer.appendChild(ferryCard);
      continue;
    }

    const fromPlace = leg.from;
    const toPlace = leg.to;
    const legKm = leg.distance / 1000;
    const legSec = leg.time * 1.05;
    const legFuel = calcFuelCost(legKm, settings.fuelConsumption, settings.fuelPrice);

    if (!leg.endsAtStop) {
      const roadCard = document.createElement("div");
      roadCard.className = "leg-card";
      roadCard.innerHTML = `<div class="leg-head" onclick="toggleLeg(this)"><div><h3>${escapeHtml(placeName(fromPlace))} → ${escapeHtml(placeName(toPlace))}</h3><p>${t('sea_road_leg')} • ${legKm.toFixed(1)} ${t('unit_km')} • ${formatDuration(legSec)}</p></div><div>▾</div></div><div class="leg-body"><div class="cost-grid"><div class="cost-box"><small>${t('sea_fuel')}</small><strong>${euro(legFuel)}</strong></div></div></div>`;
      legsContainer.appendChild(roadCard);
      continue;
    }

    const legFood = calcFoodCost(settings.people, settings.foodPerStop);
    const legEntry = calcEntryCost(settings.people, settings.entryPerStop);
    const poi = getPoiForCity(placeName(toPlace));
    const weather = await getWeather(toPlace.lat, toPlace.lon, weatherDate);
    if (renderId !== state.renderId) return;

    let weatherHtml = "";
    if (weather) {
      weatherHtml = `<div class="place-item weather-item"><strong>${t('leg_weather')} ${formatDate(weatherDate)}</strong><div class="weather-details"><span class="weather-icon">${weatherIcon(weather.code)}</span><span class="weather-desc">${weatherDescription(weather.code)}</span><span class="weather-temp"><span class="temp-max">↑${weather.maxTemp}°</span><span class="temp-min">↓${weather.minTemp}°</span></span>${weather.precipitation>0?`<span class="weather-rain">🌧 ${weather.precipitation.toFixed(1)}mm</span>`:""}</div></div>`;
    } else if (!hasForecast(weatherDate)) {
      weatherHtml = `<div class="place-item"><strong>${t('leg_weather')} ${formatDate(weatherDate)}</strong><div class="muted">${t('weather_later')}</div></div>`;
    }

    const card = document.createElement("div");
    card.className = "leg-card";
    card.innerHTML = `
      <div class="leg-head" onclick="toggleLeg(this)">
        <div><h3>${placeName(fromPlace) === placeName(toPlace) ? `${t('leg_from_port')}: ${escapeHtml(placeName(toPlace))}` : `${escapeHtml(placeName(fromPlace))} → ${escapeHtml(placeName(toPlace))}`}</h3><p>${leg.distance === 0 ? t('leg_at_port') : `${legKm.toFixed(1)} ${t('unit_km')} • ${formatDuration(legSec)}`}</p></div>
        <div>▾</div>
      </div>
      <div class="leg-body">
        <div class="cost-grid">
          <div class="cost-box"><small>${t('sea_fuel')}</small><strong>${euro(legFuel)}</strong></div>
          <div class="cost-box"><small>${t('cost_food')}</small><strong>${euro(legFood)}</strong></div>
          <div class="cost-box"><small>${t('cost_entry')}</small><strong>${euro(legEntry)}</strong></div>
        </div>
        <div class="place-list">
          ${weatherHtml}
          <div class="place-item"><strong>${t('leg_sights')}</strong><div class="muted">${poiLines(poi.sights)}</div></div>
          <div class="place-item"><strong>${t('leg_food')}</strong><div class="muted">${poiLines(poi.food)}</div></div>
          <div class="place-item"><strong>${t('leg_arrival')}</strong><div class="muted">${escapeHtml(placeLabel(toPlace))}</div></div>
        </div>
      </div>`;
    legsContainer.appendChild(card);
  }

  if (qs("results")) { qs("results").style.display = "block"; if (scroll) qs("results").scrollIntoView({ behavior: "smooth", block: "start" }); }
}

// Επιστρέφει τις ρυθμίσεις ή πετάει σφάλμα με το μήνυμα για τον χρήστη.
function readSettings() {
  const raw = id => (qs(id)?.value ?? "").trim();
  const people = raw("people") === "" ? 1 : Number(raw("people"));
  if (!Number.isInteger(people) || people < 1) throw new Error(t('err_people'));
  const fuelConsumption = Number(raw("fuelConsumption"));
  const fuelPrice = Number(raw("fuelPrice"));
  if (!(fuelConsumption > 0) || !(fuelPrice > 0)) throw new Error(t('err_fuel'));
  const foodPerStop = Number(raw("foodPerStop") || 0);
  const entryPerStop = Number(raw("entryPerStop") || 0);
  if (foodPerStop < 0 || entryPerStop < 0) throw new Error(t('err_negative'));
  return { vehicleMultiplier: Number(qs("vehicleType")?.value || 1.0), people, fuelConsumption, fuelPrice, foodPerStop, entryPerStop };
}

function validateDates(dateFrom, dateTo) {
  if (dateTo && !dateFrom) throw new Error(t('err_no_depart'));
  if (dateFrom && dateFrom < todayIso()) throw new Error(t('err_past_date'));
  if (dateFrom && dateTo && dateTo < dateFrom) throw new Error(t('err_return_before'));
}

async function handleSearch() {
  clearError();
  if (qs("results")) qs("results").style.display = "none";
  state.lastRender = null;
  const { originInput, destinationInput, stopInputs } = collectRouteInputs();
  if (!originInput || !destinationInput) { showError(t('err_missing_fields')); return; }
  if (!originInput.value.trim() || !destinationInput.value.trim()) { showError(t('err_fill_route')); return; }

  const tripInfo = { dateFrom: qs("dateFrom")?.value||"", dateTo: qs("dateTo")?.value||"", notes: qs("notes")?.value.trim()||"" };
  let settings;
  try {
    settings = readSettings();
    validateDates(tripInfo.dateFrom, tripInfo.dateTo);
  } catch (err) { showError(err.message); return; }

  try {
    showLoader(true);
    const places = [];
    places.push(await resolvePlaceFromInput(originInput));
    for (const input of stopInputs) { if (input.value.trim()) places.push(await resolvePlaceFromInput(input)); }
    places.push(await resolvePlaceFromInput(destinationInput));
    const repeated = places.find((p, i) => i > 0 && haversineKm(places[i-1], p) < 0.3);
    if (repeated) throw new Error(`${t('err_same_place')}: ${repeated.name}`);
    const plan = await buildTripPlan(places);
    await renderResults({ places, plan, settings, tripInfo });
  } catch (err) {
    console.error(err);
    showError(err.message || t('err_general'));
  } finally { showLoader(false); }
}

// ─── DESTINATION GUIDE ──────────────────────────────────────────────────────

const GUIDE_CAT_ICONS = {
  'catering.restaurant': '🍽️', 'catering.cafe': '☕', 'catering.bar': '🍻',
  'catering.fast_food': '🍔', 'tourism.attraction': '🏛️', 'tourism.sights': '🗺️',
  'entertainment.museum': '🏺', 'adult.nightclub': '🎉',
  'leisure.park': '🌿', 'natural': '🌲', 'commercial.shopping_mall': '🛍️',
  'commercial': '🛒', 'beach': '🏖️', 'natural.water': '🌊',
};

const GUIDE_CAT_LABELS = {
  'catering.restaurant': { el: 'Εστιατόριο', en: 'Restaurant' }, 'catering.cafe': { el: 'Καφέ', en: 'Cafe' }, 'catering.bar': { el: 'Μπαρ', en: 'Bar' },
  'catering.fast_food': { el: 'Fast food', en: 'Fast food' }, 'tourism.attraction': { el: 'Αξιοθέατο', en: 'Attraction' },
  'tourism.sights': { el: 'Αξιοθέατο', en: 'Sight' }, 'entertainment.museum': { el: 'Μουσείο', en: 'Museum' },
  'adult.nightclub': { el: 'Νυχτερινό κέντρο', en: 'Nightclub' }, 'leisure.park': { el: 'Πάρκο', en: 'Park' },
  'natural': { el: 'Φύση', en: 'Nature' }, 'commercial.shopping_mall': { el: 'Εμπορικό κέντρο', en: 'Shopping centre' },
  'commercial': { el: 'Κατάστημα', en: 'Shop' }, 'beach': { el: 'Παραλία', en: 'Beach' }, 'natural.water': { el: 'Παραλία / Θαλάσσιο', en: 'Beach / Water' },
};

function guideCatIcon(cat) { return GUIDE_CAT_ICONS[cat] || '📍'; }
function guideCatLabel(cat) { return GUIDE_CAT_LABELS[cat]?.[currentLang] || ''; }

// Το API δίνει τις κατηγορίες αλφαβητικά, οπότε κρατάμε την πιο συγκεκριμένη που γνωρίζουμε.
function bestGuideCategory(categories) {
  const known = Object.keys(GUIDE_CAT_LABELS).filter(k => categories.includes(k));
  return known.sort((a, b) => b.length - a.length)[0] || '';
}

const GUIDE_SKIP_NAME = /κυλικε|canteen|[Ѐ-ӿ]/i;
const GUIDE_MINOR_SIGHTS = ["tourism.attraction.artwork", "tourism.sights.memorial"];

// Όσο περισσότερα στοιχεία έχει ένα μέρος, τόσο πιο πιθανό είναι να αξίζει. Τα αγάλματα και οι προτομές μένουν πίσω.
function guidePlaceScore(props) {
  const raw = props.datasource?.raw || {};
  const signals = [raw.wikidata || raw.wikipedia, raw.wikipedia, raw.website || raw["contact:website"], raw.phone || raw["contact:phone"], raw.opening_hours, raw.cuisine];
  const isMinor = GUIDE_MINOR_SIGHTS.some(c => (props.categories || []).includes(c));
  return signals.filter(Boolean).length - (isMinor ? 5 : 0);
}

async function fetchGuidePlaces(lat, lon, cats, limit) {
  const fetchLimit = Math.max(40, limit * 2);
  const url = `${GEOAPIFY_PROXY}?endpoint=places&categories=${encodeURIComponent(cats)}&filter=circle:${lon},${lat},15000&bias=proximity:${lon},${lat}&limit=${fetchLimit}&lang=${currentLang}`;
  try {
    const data = await apiJson(url);
    const seen = new Set();
    return (data.features || []).map(f => f.properties || {})
      .filter(p => {
        const key = normalizeName(p.name);
        if (!key || GUIDE_SKIP_NAME.test(p.name) || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((p, order) => ({ order, score: guidePlaceScore(p), name: p.name, address: p.address_line2 || p.city || '', category: bestGuideCategory(p.categories || []) }))
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .slice(0, limit);
  } catch { return []; }
}

async function handleGuideSearch() {
  const destInput = qs('guideDestination');
  const daysInput = qs('guideDays');
  const errBox = qs('guideErrorBox');
  const showErr = msg => { if (errBox) { errBox.textContent = msg; errBox.style.display = 'block'; } };
  const clearErr = () => { if (errBox) { errBox.textContent = ''; errBox.style.display = 'none'; } };
  clearErr();
  if (qs('guideResults')) qs('guideResults').style.display = 'none';
  state.lastGuide = null;

  if (!destInput?.value.trim()) { showErr(t('err_fill_dest')); return; }

  const days = daysInput?.value.trim() ? Number(daysInput.value) : 3;
  if (!Number.isInteger(days) || days < 1 || days > 14) { showErr(t('err_guide_days')); return; }
  const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value);
  if (!interests.length) { showErr(t('err_select_interest')); return; }

  try {
    showLoader(true, 'loading_guide');

    const place = await resolvePlaceFromInput(destInput);

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

    renderGuideResults(place, dayPlans, days);
  } catch (err) {
    console.error(err);
    if (errBox) { errBox.textContent = err.message || t('err_guide'); errBox.style.display = 'block'; }
  } finally {
    showLoader(false);
  }
}

function renderGuideResults(place, dayPlans, days, scroll = true) {
  state.lastGuide = [place, dayPlans, days];
  const resultsEl = qs('guideResults');
  const titleEl = qs('guideResultsTitle');
  const cardsEl = qs('guideDayCards');
  if (!resultsEl || !cardsEl) return;

  if (titleEl) titleEl.textContent = `${t('guide_program')}: ${placeName(place)}`;
  cardsEl.innerHTML = '';

  if (!dayPlans.length) {
    cardsEl.innerHTML = `<p style="color:var(--text-muted);padding:16px 0;">${t('guide_no_res')}</p>`;
    resultsEl.style.display = 'block';
    if (scroll) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  if (dayPlans.length < days) {
    const note = document.createElement('p');
    note.className = 'guide-fewer';
    note.textContent = t('guide_fewer')(dayPlans.length, days);
    cardsEl.appendChild(note);
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
  if (scroll) resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function downloadPDF() {
  document.querySelectorAll(".leg-body").forEach(b => b.classList.add("open"));
  setTimeout(() => window.print(), 300);
}

function initMenu() {
  const toggle = qs("navToggle");
  const links = qs("navLinks");
  if (!toggle || !links) return;
  const setOpen = open => { links.classList.toggle("open", open); toggle.setAttribute("aria-expanded", String(open)); };
  toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
  links.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
}

function initApp() {
  initMenu();
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
  ["dateFrom","dateTo"].forEach(id => { const el = qs(id); if (el) el.min = todayIso(); });
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