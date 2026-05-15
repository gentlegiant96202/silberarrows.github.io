# SilberArrows — FAQ Content for Proofreading

This document contains every FAQ that currently appears on silberarrows.com, copied **word-for-word** from the codebase. Use it for a single editorial pass; any edits made to this file are advisory only — the live copy is owned by `lib/services.ts`.

## Where this content lives

| Source | Used on | Rendered as |
|---|---|---|
| `lib/services.ts` → `homeFaqs` | `/` (homepage) | Visible `<details>` accordion **and** `FAQPage` JSON-LD schema |
| `lib/services.ts` → `services[].faqs` | `/services/<slug>` (per service) | Visible `<details>` accordion **and** `FAQPage` JSON-LD schema |

## Inventory

- **8** site-wide FAQs (homepage)
- **26** service-specific FAQs across **10** service pages
- **34** FAQs total

Order below matches the order in the source file so corrections can be applied 1:1.

---

## 1. Site-wide FAQs (homepage)

**Page:** `https://silberarrows.com/`
**Section heading on page:** *Mercedes-Benz Service Dubai FAQs*
**Source:** `lib/services.ts` → `homeFaqs`

### Q1.1

**Q:** Are you an authorised Mercedes-Benz service center?

**A:** We are an independent Mercedes-Benz specialist in Al Quoz, Dubai, not a franchised dealer. We use genuine Mercedes-Benz parts, the official XENTRY Diagnosis platform and factory service schedules so your Mercedes-Benz keeps full service-history integrity.

### Q1.2

**Q:** Will using SilberArrows void my Mercedes-Benz warranty?

**A:** Yes. Independent servicing and repairs can void your Mercedes-Benz manufacturer warranty under typical warranty terms. If your vehicle is still in factory warranty, speak with your authorised dealer or Mercedes-Benz before choosing us. Many of our customers are post-warranty or have accepted that trade-off for specialist care and value; all work we perform is covered by our own 12-month warranty on parts and labour.

### Q1.3

**Q:** How much do you save vs a Mercedes-Benz main dealer?

**A:** Customers typically save 30 to 40 percent on Service A, Service B and major repairs vs main-dealer pricing, with the same genuine parts and factory schedule. Our hourly labour rate is AED 375.

### Q1.4

**Q:** Do you offer collection and delivery in Dubai?

**A:** Yes. Free collection and delivery across Dubai is included with every service and major repair. Just call +971 4 380 5515 or WhatsApp us to arrange a time.

### Q1.5

**Q:** Where are you located?

**A:** Our workshop is on Al Manara Street in Al Quoz, Dubai. We're open Monday to Saturday, 8:00 AM to 6:00 PM.

### Q1.6

**Q:** Do you service AMG, Maybach and Mercedes EQ models?

**A:** Yes. We service all Mercedes-Benz models including AMG performance cars, Maybach, and the entire Mercedes EQ electric range.

### Q1.7

**Q:** Do you work on classic Mercedes-Benz models?

**A:** Yes. We specialise in classic Mercedes-Benz cars as well as modern models, from routine maintenance and mechanical rebuilds to sourcing correct parts and preserving originality where it matters.

### Q1.8

**Q:** Do you offer performance tuning and RENNtech products?

**A:** Yes. We offer performance tuning and upgrades, and we are the only authorised RENNtech distributor in Dubai. You can buy and fit genuine RENNtech hardware and software through us with proper installation and support.

---

## 2. Service Page FAQs

Each subsection below corresponds to one `/services/<slug>` page.

### 2.1 Brake Service & Repair

**Page:** `https://silberarrows.com/services/brake-service`
**Section heading on page:** *Brake Service FAQs*
**Source:** `services[slug="brake-service"].faqs` (4 FAQs)

#### Q2.1.1

**Q:** How often should I replace the brake pads on my Mercedes-Benz?

**A:** Most Mercedes-Benz brake pads last 30,000 to 60,000 km depending on driving style and traffic conditions. We inspect pad thickness, disc wear and brake fluid at every service so you only replace what's actually worn.

#### Q2.1.2

**Q:** Do you use genuine Mercedes-Benz brake parts?

**A:** Yes. We only fit genuine Mercedes-Benz pads, discs and brake fluid that meet factory friction and heat-tolerance specs, preserving pedal feel and your service history.

#### Q2.1.3

**Q:** How much does a Mercedes-Benz brake service cost in Dubai?

**A:** Brake pad and disc pricing depends on your model and which axle is being serviced. We provide a no-obligation written quote after inspection, with parts and labour itemised before any work begins.

#### Q2.1.4

**Q:** Can you reset the electronic parking brake (EPB)?

**A:** Yes. We use XENTRY Diagnosis to retract and recalibrate the EPB callipers for safe pad replacement on all C-Class, E-Class, S-Class, GLC, GLE and other electronic-park-brake models.

---

### 2.2 Scheduled Maintenance – Service A & B

**Page:** `https://silberarrows.com/services/scheduled-maintenance`
**Section heading on page:** *Scheduled Maintenance FAQs*
**Source:** `services[slug="scheduled-maintenance"].faqs` (4 FAQs)

#### Q2.2.1

**Q:** What's the difference between Service A and Service B on a Mercedes-Benz?

**A:** Service A (Minor) covers oil and filter replacement, fluid top-ups, brake inspection and full diagnostics. Service B (Major) adds cabin filter, A/C treatment, wheel rotation, transmission oil change and a full vehicle inspection. Service A and B alternate roughly every 12 months or 15,000 km.

#### Q2.2.2

**Q:** How often does my Mercedes-Benz need a service?

**A:** Most modern Mercedes-Benz models prompt for service every 12 months or 15,000 km via the ASSYST PLUS maintenance counter. We follow the factory schedule using XENTRY Diagnosis so your service history stays intact.

#### Q2.2.3

**Q:** Will servicing at SilberArrows affect my Mercedes-Benz warranty?

**A:** Servicing outside an authorised Mercedes-Benz dealer can void or limit your manufacturer warranty, depending on your vehicle contract and remaining coverage. If your car is still under factory warranty, please confirm your position with Mercedes-Benz or your selling dealer before booking. We use genuine parts and factory schedules, and every job is covered by our own 12-month warranty on parts and labour.

#### Q2.2.4

**Q:** How much do I save vs the Mercedes-Benz main dealer?

**A:** Customers typically save 30 to 40 percent on Service A and Service B compared with dealer pricing, with the same genuine parts and factory schedule. Free collection and delivery across Dubai is included.

---

### 2.3 Tyre Replacement & Balancing

**Page:** `https://silberarrows.com/services/tyre-replacement`
**Section heading on page:** *Tyre Replacement FAQs*
**Source:** `services[slug="tyre-replacement"].faqs` (2 FAQs)

#### Q2.3.1

**Q:** Do you fit run-flat tyres for Mercedes-Benz?

**A:** Yes. We fit Mercedes-Benz-approved run-flat (MOE/MOExtended) tyres for all models that require them, as well as AMG performance and standard tyres on request.

#### Q2.3.2

**Q:** Can you reset the TPMS sensors after a tyre change?

**A:** Yes. We use XENTRY Diagnosis to relearn and program OEM TPMS sensors so the tyre-pressure warning clears and reads accurately on the instrument cluster.

---

### 2.4 Wheel Alignment

**Page:** `https://silberarrows.com/services/wheel-alignment`
**Section heading on page:** *Wheel Alignment FAQs*
**Source:** `services[slug="wheel-alignment"].faqs` (2 FAQs)

#### Q2.4.1

**Q:** How often should I align the wheels on my Mercedes-Benz?

**A:** We recommend a 4-wheel alignment every 15,000 to 20,000 km, after a kerb impact, or any time you fit new tyres or suspension components to protect tyre life and steering feel.

#### Q2.4.2

**Q:** Do you do AMG and 4MATIC alignment?

**A:** Yes. Our Hunter 3D alignment equipment is approved for AMG and 4MATIC variants and we adjust to model-specific Mercedes-Benz factory specs.

---

### 2.5 Battery Testing & Replacement

**Page:** `https://silberarrows.com/services/battery-service`
**Section heading on page:** *Battery Service FAQs*
**Source:** `services[slug="battery-service"].faqs` (2 FAQs)

#### Q2.5.1

**Q:** Why does a new Mercedes battery need to be registered?

**A:** Modern Mercedes-Benz cars use an Intelligent Battery Sensor and energy-management ECU that tracks charge cycles. A new battery must be coded to the car via XENTRY Diagnosis so the alternator charges it correctly and start-stop and comfort features work.

#### Q2.5.2

**Q:** How long does a Mercedes-Benz battery last in Dubai?

**A:** Dubai heat is hard on batteries. Most original Mercedes-Benz batteries last 3 to 4 years here. We test charge capacity and cranking amps at every service so you can replace before a no-start.

---

### 2.6 Air Conditioning Service & Repair

**Page:** `https://silberarrows.com/services/air-conditioning`
**Section heading on page:** *Air Conditioning FAQs*
**Source:** `services[slug="air-conditioning"].faqs` (3 FAQs)

#### Q2.6.1

**Q:** My Mercedes A/C isn't cold, what's the most common cause?

**A:** Low refrigerant from a slow leak is the most common cause in Dubai. We pressure-test the system, locate the leak with UV dye or electronic detection and refill to the correct R134a or R1234yf spec for your model.

#### Q2.6.2

**Q:** How often should the cabin filter be replaced?

**A:** We recommend replacing the combination (cabin) filter every 12 months in Dubai's dust. It's included in Service B and improves airflow, smell and HEPA filtration.

#### Q2.6.3

**Q:** Do you service R1234yf systems?

**A:** Yes. We have the equipment and certified refrigerant for newer Mercedes-Benz models that use R1234yf as well as legacy R134a systems.

---

### 2.7 Engine Repair & Overhaul

**Page:** `https://silberarrows.com/services/engine-repair`
**Section heading on page:** *Engine Repair FAQs*
**Source:** `services[slug="engine-repair"].faqs` (3 FAQs)

#### Q2.7.1

**Q:** Do you replace timing chains on M271, M272 and M276 engines?

**A:** Yes. Timing chain, guides and tensioner replacement is one of our common engine repairs across M271, M272, M276, M278 and OM651 engines using genuine Mercedes-Benz parts.

#### Q2.7.2

**Q:** Can you rebuild a Mercedes turbocharger?

**A:** We diagnose, repair or replace turbochargers on Mercedes-Benz petrol and diesel engines. Where rebuild is appropriate we use OE-quality CHRA cartridges; otherwise we fit a genuine Mercedes-Benz unit.

#### Q2.7.3

**Q:** How long does a Mercedes engine repair take?

**A:** Small repairs (oil leaks, gaskets, sensors) usually take 1-3 working days. Larger jobs like timing chain or head gasket replacement typically take 4-7 working days. We provide a written timeline before work begins.

---

### 2.8 Suspension & Steering Repair

**Page:** `https://silberarrows.com/services/suspension-repair`
**Section heading on page:** *Suspension Repair FAQs*
**Source:** `services[slug="suspension-repair"].faqs` (2 FAQs)

#### Q2.8.1

**Q:** Do you repair AIRMATIC and Active Body Control (ABC)?

**A:** Yes. We diagnose and repair AIRMATIC air struts, compressors, valve blocks and ride-height sensors as well as ABC pumps, valves and pulsation dampers using genuine Mercedes-Benz parts.

#### Q2.8.2

**Q:** Why is my Mercedes sitting low on one corner?

**A:** This is typically a leaking air strut, faulty compressor or ride-height sensor on AIRMATIC cars. We pressure-test the system and replace the failed component with a genuine Mercedes-Benz unit, then recalibrate ride height.

---

### 2.9 Electrical & Computer Diagnostics

**Page:** `https://silberarrows.com/services/diagnostics`
**Section heading on page:** *Diagnostics FAQs*
**Source:** `services[slug="diagnostics"].faqs` (2 FAQs)

#### Q2.9.1

**Q:** Do you use the official XENTRY Diagnosis system?

**A:** Yes. We use XENTRY Diagnosis, the official Mercedes-Benz factory tool, to read ECUs, run guided tests, perform SCN coding, software updates and component activations.

#### Q2.9.2

**Q:** How much does a Mercedes diagnostic scan cost?

**A:** We offer a competitive flat-rate XENTRY scan with a written fault-code report and repair recommendations. Call +971 4 380 5515 for current pricing.

---

### 2.10 Interior & Exterior Detailing

**Page:** `https://silberarrows.com/services/detailing`
**Section heading on page:** *Detailing FAQs*
**Source:** `services[slug="detailing"].faqs` (2 FAQs)

#### Q2.10.1

**Q:** How long does Mercedes ceramic coating last in Dubai's climate?

**A:** A correctly prepped and applied ceramic coating typically lasts 3 to 5 years in Dubai when paired with proper maintenance washes. Gtechniq and similar professional coatings shrug off sun, dust and harsh wash chemicals.

#### Q2.10.2

**Q:** Do you do paint correction on Mercedes-Benz cars?

**A:** Yes. We perform single- and multi-stage machine polishing to remove swirl marks, light scratches and oxidation, then seal the finish with a ceramic coating or sealant of your choice.

---

## Editorial notes (for the proofreader)

A few stylistic patterns are repeated across the copy. Calling these out so the proofreader can decide whether to standardise:

- **Numerals.** Ranges use the word "to" with comma-grouped thousands ("30 to 40 percent", "30,000 to 60,000 km", "1-3 working days"). The diagnostics scan and engine-repair durations switch to a hyphenated form ("1-3", "4-7"). Otherwise consistent.
- **Spelling.** British/AE conventions are used throughout: *callipers*, *tyres*, *kerb*, *labour*, *specialise*, *authorised*. American forms ("center") appear only inside the question wording at Q1.1 ("Mercedes-Benz service center?"). Decide whether to align that with the British style used everywhere else.
- **Acronyms used without expansion** (intentional for SEO, but worth a review): *XENTRY Diagnosis*, *ASSYST PLUS*, *AIRMATIC*, *ABC* (expanded once as "Active Body Control"), *EPB* (expanded once), *TPMS*, *MOE/MOExtended*, *4MATIC*, *AMG*, *SCN coding*, *R134a / R1234yf*, *CHRA*, *HEPA*, *Gtechniq*.
- **Phone number formatting** is consistent: `+971 4 380 5515` (appears in Q1.4 and Q2.9.2).
- **Currency / labour rate** appears once: "AED 375" (Q1.3).
- **Warranty wording** appears twice with slightly different framing (Q1.2 and Q2.2.3). Worth a side-by-side review to make sure they don't contradict.
- **Savings claim** appears twice (Q1.3 and Q2.2.4). The home version cites the overall range across "Service A, Service B and major repairs"; the service-page version applies only to "Service A and Service B".

Once edits are agreed, the corrections should be applied back into `lib/services.ts` (the `homeFaqs` array and the `faqs` field of each entry in the `services` array). The on-page accordion text and the JSON-LD `FAQPage` schema both render directly from those strings, so a single edit propagates to both surfaces and to Google's structured-data understanding.
