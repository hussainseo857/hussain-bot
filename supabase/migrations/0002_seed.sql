-- ============================================================
-- Trip Trekker — Seed Data
-- ============================================================
-- Run AFTER 0001_init.sql

-- ---------- chatbot_settings (single row) ----------
insert into public.chatbot_settings (
  business_name, bot_name, welcome_message, fallback_message,
  primary_color, support_email, support_phone, business_hours, office_location
)
select
  'Trip Trekker',
  'Trekker Assistant',
  'Hi! I''m Trekker Assistant from Trip Trekker. I can help you with destinations, trekking routes, travel packages, booking status, trip planning, safety guidance, gear checklists, best seasons, payments, cancellations, and contact support. What would you like help with?',
  'I don''t have enough information about that in the Trip Trekker knowledge base. Please contact support for accurate details.',
  '#059669',
  'support@triptrekker.example',
  '+92-300-0000000',
  'Mon–Sat, 9:00 AM – 7:00 PM (PKT)',
  'Trip Trekker HQ, Islamabad, Pakistan'
where not exists (select 1 from public.chatbot_settings);

-- ---------- allowed_topics ----------
insert into public.allowed_topics (topic, description) values
  ('destinations', 'Information about travel destinations in our catalog'),
  ('trekking_routes', 'Trekking routes, trails, difficulty and altitude'),
  ('travel_packages', 'Pricing, inclusions, and durations of travel packages'),
  ('booking_status', 'Booking & demo inquiry status by booking ID'),
  ('trip_planning', 'Itinerary planning, suggestions, beginner guidance'),
  ('safety_guidance', 'General safety information from the Trip Trekker knowledge base'),
  ('gear_checklist', 'Required gear for treks and trips'),
  ('best_season', 'Best season to visit destinations / do treks'),
  ('payment', 'Accepted payment methods'),
  ('cancellation_refund', 'Cancellation and refund policies'),
  ('business_hours', 'Office and support hours'),
  ('contact_support', 'How to reach Trip Trekker support')
on conflict (topic) do nothing;

-- ---------- faqs ----------
insert into public.faqs (question, answer, category) values
  ('What is the best season for trekking with Trip Trekker?',
   'For most northern Pakistan treks, the best season is May to September. High-altitude routes like Fairy Meadows or Rakaposhi Base Camp are best in June–August. Lower hikes around Murree/Galiyat are pleasant from March to October.',
   'season'),
  ('How can I book a trip with Trip Trekker?',
   'You can request a booking through our website by selecting a package and sending an inquiry. Our team will confirm availability, share the itinerary, and provide payment instructions.',
   'booking'),
  ('What gear is required for a beginner trek?',
   'A typical beginner gear checklist includes: comfortable trekking shoes, weather-appropriate clothing in layers, a waterproof jacket, a small backpack (20–30L), water bottle, sunblock, cap, basic first-aid kit, and a power bank. The exact list depends on the route.',
   'gear'),
  ('Which treks are beginner-friendly?',
   'Beginner-friendly options include Margalla Hills Trail, Mushkpuri Top Trek, and Miranjani Trek. These are short, low-altitude, and require basic fitness only.',
   'route'),
  ('What payment methods do you accept?',
   'Trip Trekker accepts bank transfer, JazzCash, EasyPaisa, and major debit/credit cards. Payment links are shared after your booking is confirmed.',
   'payment'),
  ('What is your cancellation policy?',
   'Cancellations 14+ days before departure: 90% refund. 7–13 days: 50% refund. Less than 7 days: non-refundable, but you may reschedule once subject to availability.',
   'policy'),
  ('How long do refunds take?',
   'Approved refunds are processed within 5–7 business days to the original payment method.',
   'policy'),
  ('What safety precautions should I take on a trek?',
   'Always trek with a guide on high-altitude routes, carry sufficient water, follow weather updates, do not stray from marked trails, and inform someone of your itinerary. For emergencies, contact local authorities immediately.',
   'safety'),
  ('Is solo travel safe with Trip Trekker?',
   'Yes — solo travelers can join our group departures, which include a certified guide and shared transport. We also recommend solo travelers stick to group treks on first visits.',
   'solo'),
  ('How do I contact Trip Trekker support?',
   'You can reach us at support@triptrekker.example or +92-300-0000000 during business hours (Mon–Sat, 9 AM – 7 PM PKT).',
   'contact'),
  ('What are your business hours?',
   'Our support team is available Monday to Saturday, 9:00 AM to 7:00 PM Pakistan Standard Time.',
   'contact')
on conflict do nothing;

-- ---------- knowledge_base ----------
insert into public.knowledge_base (title, content, category) values
  ('Trip Trekker — Company Overview',
   'Trip Trekker is a Pakistan-based adventure and trekking platform helping travelers discover destinations, plan routes, and book guided trips. We focus on safe, beginner-friendly access to the northern areas of Pakistan and curated adventure experiences.',
   'about'),
  ('General Trekking Safety Guidelines',
   'Before any trek: check weather, share your itinerary with someone, carry enough water (at least 2L), bring layered clothing, and never travel alone on high-altitude routes. On the trail, stick to marked paths, take regular breaks, and acclimatize properly above 3000m to avoid altitude sickness. In any emergency, contact local emergency services or your tour operator immediately.',
   'safety'),
  ('Altitude Sickness — Awareness Note',
   'Altitude sickness can occur above 2500m. Symptoms include headache, nausea, dizziness, and fatigue. Mitigation: ascend slowly, hydrate well, avoid alcohol, and descend if symptoms worsen. Trip Trekker does not provide medical diagnosis — please consult a doctor before high-altitude treks.',
   'safety'),
  ('Standard Gear Checklist',
   'Standard gear: trekking shoes with good grip, two pairs of warm socks, thermal base layers, fleece, waterproof shell jacket, trekking pants, gloves, beanie, sunglasses, sunscreen (SPF 50+), headlamp, water bottle / hydration bladder, snacks, basic first-aid kit, power bank, and a 30–50L backpack depending on trip length.',
   'gear'),
  ('Booking & Inquiry Process',
   'Submit an inquiry via the website. Our team confirms availability within 24 hours on business days. Once confirmed, you receive an itinerary, gear checklist, and payment link. A booking is considered confirmed only after the deposit is received.',
   'booking'),
  ('Payment & Refund Policy Overview',
   'Deposits are 30% of the package price at booking, balance due 7 days before departure. Refund tiers: 14+ days = 90%, 7–13 days = 50%, less than 7 days = non-refundable but one-time reschedule is offered subject to availability.',
   'policy'),
  ('Best Time to Visit Northern Pakistan',
   'For Hunza, Skardu, and Fairy Meadows the prime window is May–September with the warmest, clearest weather in July–August. For Swat and Naran Kaghan, May–September. For Murree/Galiyat, March–October for greenery and December–February for snow.',
   'season'),
  ('Solo Traveler Guidance',
   'Solo travelers are welcome on Trip Trekker group departures, which include a guide, shared transport, and shared accommodation. Solo private trips are also available at a higher price. We recommend group trips for first-time solo trekkers.',
   'solo'),
  ('What Trip Trekker Does NOT Provide',
   'Trip Trekker does not provide medical, legal, or emergency-rescue services. For any urgent safety situation, weather emergency, accident, or missing-person incident, contact local emergency services or local authorities immediately.',
   'policy'),
  ('Group Size & Guide Information',
   'Most group departures are 6–12 travelers with at least one certified guide. Private trips are arranged on request. Children under 12 are welcome on family tours but not on high-altitude treks.',
   'about')
on conflict do nothing;

-- ---------- destinations ----------
insert into public.destinations (name, country, region, description, best_season, difficulty_level, estimated_budget, highlights, safety_notes) values
  ('Hunza Valley','Pakistan','Gilgit-Baltistan',
   'A scenic valley known for ancient forts, terraced fields, and views of Rakaposhi and Ultar Sar. Cultural villages like Karimabad and Altit are highlights.',
   'May to October','Easy to Moderate','PKR 35,000 – 85,000',
   'Baltit Fort, Attabad Lake, Karimabad, Eagle''s Nest viewpoint',
   'Roads can be affected by landslides in monsoon — check road status before travel.'),
  ('Skardu','Pakistan','Gilgit-Baltistan',
   'Gateway to some of the world''s highest peaks including K2. Famous for lakes, cold deserts, and the Shigar valley.',
   'May to September','Moderate','PKR 50,000 – 120,000',
   'Shangrila Resort, Upper Kachura Lake, Shigar Fort, Deosai Plains',
   'High altitude — acclimatize for 24h. Limited cell coverage on remote roads.'),
  ('Fairy Meadows','Pakistan','Gilgit-Baltistan',
   'A high-altitude alpine meadow facing Nanga Parbat (the 9th highest peak in the world). Access is via a jeep ride and a 3–4 hour hike.',
   'June to August','Moderate to Challenging','PKR 40,000 – 90,000',
   'Nanga Parbat view, Beyal Camp, base-camp viewpoint trek',
   'Last 8 km of jeep track is risky — only travel with experienced local drivers. Cold nights even in summer.'),
  ('Naran Kaghan','Pakistan','Khyber Pakhtunkhwa',
   'A popular valley with lakes, rivers, and meadows. Ideal for first-time travelers to the north.',
   'May to September','Easy','PKR 25,000 – 60,000',
   'Saif-ul-Malook Lake, Lulusar Lake, Babusar Top, Shogran',
   'Babusar Top closes in winter due to snow. Carry warm layers even in summer.'),
  ('Swat Valley','Pakistan','Khyber Pakhtunkhwa',
   'Often called the Switzerland of the East — green valleys, rivers, and historical Buddhist sites.',
   'March to October','Easy','PKR 25,000 – 55,000',
   'Malam Jabba, Mahodand Lake, Kalam, Mingora bazaar',
   'Check local advisories before travel. Roads to upper Swat can be slow in peak season.'),
  ('Murree & Galiyat','Pakistan','Punjab / KPK',
   'Pine-covered hill stations close to Islamabad — perfect for short weekend trips and beginner hikes.',
   'March to October (green); December to February (snow)','Easy','PKR 12,000 – 35,000',
   'Mall Road, Patriata chairlift, Nathia Gali, Ayubia pipeline track',
   'Heavy snow in peak winter — drive only with chains/4x4 in snowy conditions.')
on conflict do nothing;

-- ---------- trekking_routes ----------
insert into public.trekking_routes (route_name, destination, duration, difficulty_level, altitude, route_summary, required_gear, safety_notes, best_season) values
  ('Fairy Meadows to Nanga Parbat Base Camp','Fairy Meadows','2 days (overnight)','Challenging','~4200m at base-camp viewpoint',
   'Start at Fairy Meadows (3300m), hike through Beyal Camp, reach the Nanga Parbat base-camp viewpoint, return same way or overnight at Beyal.',
   'Trekking shoes, layered clothing, waterproof jacket, gloves, beanie, sunglasses, sunscreen, water (2L+), snacks, headlamp, basic first aid.',
   'High altitude — acclimatize before attempting. Go with a guide. Avoid in bad weather.','June to August'),
  ('Rakaposhi Base Camp Trek','Hunza','3 days','Challenging','~3500m',
   'Start at Minapin village, climb through pine forests to Hapakun, continue to Tagaphari meadows and Rakaposhi Base Camp views.',
   'Sturdy trekking shoes, sleeping bag (rated to 0°C), backpack 40L+, layered clothing, gloves, hat, water purification tablets.',
   'Stream crossings can be high in afternoons — start early. Hire a local guide.','June to September'),
  ('Margalla Hills Trail 5','Islamabad / Margalla Hills','3–4 hours','Easy','~1100m at top',
   'A well-marked trail starting from the Saidpur side, climbing through forest to a panoramic viewpoint over Islamabad.',
   'Trail shoes, water bottle (1L), cap, sunscreen, light snacks.',
   'Carry water — no shops on trail. Avoid mid-day in summer.','October to April'),
  ('Deosai Plains Day Hike','Skardu / Deosai','1 day','Easy to Moderate','~4100m plateau',
   'A jeep ride into Deosai National Park and a short hike around Sheosar Lake. Wide-open high-altitude plateau, often called Land of Giants.',
   'Warm layers (even in summer), water (2L), snacks, sun protection.',
   'Weather changes rapidly. Altitude is high — limit exertion if unacclimatized.','July to mid-September'),
  ('Mushkpuri Top Trek','Nathia Gali / Galiyat','3–4 hours round trip','Easy to Moderate','~2800m',
   'A pine-forest trek starting near Nathia Gali, ending at Mushkpuri Top with views of Kashmir on a clear day.',
   'Trail shoes, light jacket, water, snacks, cap.',
   'Trail can be slippery after rain. Start before noon.','April to October'),
  ('Miranjani Trek','Ayubia / Galiyat','4–5 hours round trip','Moderate','~2992m',
   'The highest peak in the Galiyat range, accessed via a forested trail from Nathia Gali.',
   'Trail shoes, layered clothing, water (2L), snacks, sunscreen.',
   'Weather can change quickly — carry a light rain jacket.','April to October')
on conflict do nothing;

-- ---------- travel_packages ----------
insert into public.travel_packages (package_name, destination, duration, price_range, included_services, excluded_services, cancellation_policy, payment_policy) values
  ('3-Day Hunza Explorer','Hunza Valley','3 days / 2 nights','PKR 35,000 – 45,000 per person',
   'Transport from Islamabad/Gilgit, 2 nights hotel (twin sharing), breakfast, guided tour of Karimabad, Attabad Lake visit, Eagle''s Nest sunrise viewpoint.',
   'Lunch & dinner, personal expenses, entry tickets, travel insurance.',
   '14+ days: 90% refund. 7–13 days: 50% refund. <7 days: non-refundable, one reschedule allowed.',
   '30% deposit at booking, balance 7 days before departure.'),
  ('5-Day Skardu Adventure','Skardu','5 days / 4 nights','PKR 65,000 – 85,000 per person',
   'Flights or transport, 4 nights hotel, breakfast, Deosai day trip, Shigar Fort visit, Shangrila & Upper Kachura, certified guide.',
   'Personal expenses, optional excursions, travel insurance.',
   '14+ days: 90%. 7–13 days: 50%. <7 days: non-refundable, reschedule subject to availability.',
   '30% deposit at booking, balance 7 days before departure.'),
  ('Fairy Meadows Trekking Trip','Fairy Meadows','4 days / 3 nights','PKR 45,000 – 60,000 per person',
   'Transport, jeep ride, porter assistance, wooden hut stay, breakfast & dinner, guided hike to Beyal Camp / Nanga Parbat viewpoint.',
   'Lunch, soft drinks, personal expenses, insurance.',
   '14+ days: 90%. 7–13 days: 50%. <7 days: non-refundable.',
   '30% deposit at booking, balance 7 days before departure.'),
  ('Naran Kaghan Family Tour','Naran Kaghan','4 days / 3 nights','PKR 28,000 – 38,000 per person',
   'Transport, 3 nights family-friendly hotel, breakfast, Saif-ul-Malook trip, Lulusar & Babusar Top visit (season permitting).',
   'Lunch & dinner, jeep rides, personal expenses.',
   '14+ days: 90%. 7–13 days: 50%. <7 days: non-refundable.',
   '30% deposit at booking, balance 7 days before departure.'),
  ('Swat Valley Scenic Tour','Swat Valley','4 days / 3 nights','PKR 30,000 – 42,000 per person',
   'Transport, 3 nights hotel, breakfast, Malam Jabba chairlift, Mahodand Lake jeep tour, Kalam stay.',
   'Lunch & dinner, personal expenses, insurance.',
   '14+ days: 90%. 7–13 days: 50%. <7 days: non-refundable.',
   '30% deposit at booking, balance 7 days before departure.')
on conflict do nothing;

-- ---------- sample_bookings ----------
insert into public.sample_bookings (booking_id, customer_name, package_name, destination, status, travel_date, payment_status, notes) values
  ('TT1001','Ali Raza','3-Day Hunza Explorer','Hunza Valley','Confirmed','2026-06-12','Fully paid','Group of 2'),
  ('TT1002','Sara Khan','5-Day Skardu Adventure','Skardu','Pending confirmation','2026-07-05','Payment pending','Awaiting deposit'),
  ('TT1003','Bilal Ahmed','Fairy Meadows Trekking Trip','Fairy Meadows','Inquiry received','2026-07-20','Payment pending','Inquiry submitted via website'),
  ('TT1004','Hina Iqbal','Naran Kaghan Family Tour','Naran Kaghan','Cancelled','2026-08-02','Fully paid','Cancelled 12 days before — 50% refund processed'),
  ('TT1005','Usman Tariq','Swat Valley Scenic Tour','Swat Valley','Completed','2026-04-10','Fully paid','Trip completed — feedback received'),
  ('TT1006','Ayesha Malik','3-Day Hunza Explorer','Hunza Valley','Payment pending','2026-09-01','Payment pending','Waiting for balance payment')
on conflict (booking_id) do nothing;
