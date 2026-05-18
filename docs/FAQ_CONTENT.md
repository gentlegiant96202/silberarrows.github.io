# SilberArrows — FAQ Content for Proofreading

This document contains every FAQ that currently appears on silberarrows.com, copied **word-for-word** from the codebase. Use it for a single editorial pass; any edits made to this file are advisory only — the live copy is owned by `lib/services.ts`.

## Where this content lives

| Source | Used on | Rendered as |
|---|---|---|
| `lib/services.ts` → `homeFaqs` | `/` (homepage) | Visible `<details>` accordion **and** `FAQPage` JSON-LD schema |
| `lib/services.ts` → `services[].faqs` | `/services/<slug>` (per service) | Visible `<details>` accordion **and** `FAQPage` JSON-LD schema |

## Inventory

- **9** site-wide (Company) FAQs (homepage)
- **19** service-specific FAQs across **10** service pages
- **28** FAQs total

Order below matches the order in the source file so corrections can be applied 1:1.

---

## 1. Site-wide FAQs (homepage)

**Page:** `https://silberarrows.com/`
**Section heading on page:** *Mercedes-Benz Service Dubai FAQs*
**Source:** `lib/services.ts` → `homeFaqs`

### Q1.1

**Q:** What makes SilberArrows different?

**A:** SilberArrows is an independent Mercedes-Benz specialist based in Dubai, focused exclusively on Mercedes-Benz passenger vehicles. Our workshop combines dealer-level diagnostics and technical expertise with a more personal, transparent and enthusiast-driven approach.

### Q1.2

**Q:** What types of Mercedes-Benz vehicles do you work on?

**A:** We work on the full Mercedes-Benz range, from everyday models through to AMG, Maybach, Mercedes-EQ and specialist vehicles.

### Q1.3

**Q:** Do you service and maintain the Mercedes-Benz SLR McLaren?

**A:** Yes. SilberArrows is widely recognised as one of the region's leading specialists for the Mercedes-Benz SLR McLaren, with many of the GCC's cars maintained by our team over the years.

Our experience with the SLR dates back to when the model was originally introduced, including team members who were factory-trained on the platform during its early production years.

From routine maintenance and diagnostics to complex mechanical, hydraulic and electronic repairs, we have extensive hands-on knowledge of the SLR and its unique systems.

### Q1.4

**Q:** Do you work on classic Mercedes-Benz vehicles?

**A:** Yes. Classic Mercedes-Benz vehicles are a major part of what we do. From maintenance and mechanical restoration to sourcing hard-to-find parts and preserving originality, we support both collectors and enthusiasts.

### Q1.5

**Q:** Do you use Mercedes-Benz diagnostic systems?

**A:** Yes. We use XENTRY diagnostics for fault diagnosis, coding, software functions and guided troubleshooting across Mercedes-Benz models.

### Q1.6

**Q:** Do you use genuine Mercedes-Benz parts?

**A:** Yes. We use genuine Mercedes-Benz parts and approved fluids to maintain reliability, performance and long-term vehicle integrity.

### Q1.7

**Q:** Do you offer collection and delivery?

**A:** Yes. We offer complimentary collection and delivery across Dubai for servicing and repair work.

### Q1.8

**Q:** Do you offer performance upgrades and tuning?

**A:** Yes. We supply and install performance upgrades including genuine RENNtech and PowerAi products and software.

### Q1.9

**Q:** Do you offer service and extended warranty plans?

**A:** Yes. We offer ServiceCare maintenance plans and our SilberArrows Extended Warranty Program for eligible Mercedes-Benz vehicles, helping customers manage servicing and ownership costs with added peace of mind.

---

## 2. Service Page FAQs

Each subsection below corresponds to one `/services/<slug>` page.

### 2.1 Brake Service & Repair

**Page:** `https://silberarrows.com/services/brake-service`
**Section heading on page:** *Brake Service FAQs*
**Source:** `services[slug="brake-service"].faqs` (2 FAQs)

#### Q2.1.1

**Q:** How do I know if my brakes need attention?

**A:** Common signs include vibration, squealing, longer stopping distances, warning messages or brake pedal changes. We recommend having the braking system inspected as soon as any symptoms appear.

#### Q2.1.2

**Q:** Do you work on AMG braking systems?

**A:** Yes. We work on standard and AMG braking systems including large-performance brake packages and electronic braking systems.

---

### 2.2 Scheduled Maintenance – Service A & B

**Page:** `https://silberarrows.com/services/scheduled-maintenance`
**Section heading on page:** *Scheduled Maintenance FAQs*
**Source:** `services[slug="scheduled-maintenance"].faqs` (3 FAQs)

#### Q2.2.1

**Q:** How often should a Mercedes-Benz be serviced?

**A:** Most Mercedes-Benz models require servicing every 12 months or 15,000 km, depending on usage and driving conditions.

#### Q2.2.2

**Q:** What is the difference between Service A and Service B?

**A:** Service A is the smaller routine maintenance interval, while Service B includes additional maintenance items and inspections. The exact requirements vary depending on model, age and mileage.

#### Q2.2.3

**Q:** Do you follow Mercedes-Benz service schedules?

**A:** Yes. We follow manufacturer maintenance schedules and service procedures specific to your model.

---

### 2.3 Tyre Replacement & Balancing

**Page:** `https://silberarrows.com/services/tyre-replacement`
**Section heading on page:** *Tyre Replacement FAQs*
**Source:** `services[slug="tyre-replacement"].faqs` (1 FAQ)

#### Q2.3.1

**Q:** Do you fit run-flat and AMG tyres?

**A:** Yes. We supply and fit standard, run-flat and AMG performance tyres depending on your vehicle requirements.

---

### 2.4 Wheel Alignment

**Page:** `https://silberarrows.com/services/wheel-alignment`
**Section heading on page:** *Wheel Alignment FAQs*
**Source:** `services[slug="wheel-alignment"].faqs` (1 FAQ)

#### Q2.4.1

**Q:** How often should wheel alignment be checked?

**A:** We recommend checking alignment after tyre replacement, suspension work, pothole impacts or whenever uneven tyre wear or steering pull is noticed.

---

### 2.5 Battery Testing & Replacement

**Page:** `https://silberarrows.com/services/battery-service`
**Section heading on page:** *Battery Service FAQs*
**Source:** `services[slug="battery-service"].faqs` (2 FAQs)

#### Q2.5.1

**Q:** How long do Mercedes-Benz batteries typically last in Dubai?

**A:** Due to high temperatures, most batteries typically last around 3–4 years depending on usage and driving habits.

#### Q2.5.2

**Q:** Does a new battery need programming?

**A:** Many modern Mercedes-Benz models require battery registration or coding after replacement so the charging and energy-management systems operate correctly.

---

### 2.6 Air Conditioning Service & Repair

**Page:** `https://silberarrows.com/services/air-conditioning`
**Section heading on page:** *Air Conditioning FAQs*
**Source:** `services[slug="air-conditioning"].faqs` (2 FAQs)

#### Q2.6.1

**Q:** Why is my air conditioning not cold enough?

**A:** Common causes include low refrigerant, leaks, blocked filters or failing components. In Dubai's climate, regular air-conditioning maintenance is especially important.

#### Q2.6.2

**Q:** How often should the cabin filter be replaced?

**A:** We typically recommend replacing the cabin filter every 12 months due to dust and environmental conditions in the UAE.

---

### 2.7 Engine Repair & Overhaul

**Page:** `https://silberarrows.com/services/engine-repair`
**Section heading on page:** *Engine Repair FAQs*
**Source:** `services[slug="engine-repair"].faqs` (2 FAQs)

#### Q2.7.1

**Q:** Do you repair common Mercedes-Benz engine issues?

**A:** Yes. We regularly diagnose and repair oil leaks, cooling-system faults, timing-chain issues, turbocharger faults and other engine-related problems across a wide range of Mercedes-Benz engines.

#### Q2.7.2

**Q:** How long do major repairs usually take?

**A:** Repair times vary depending on the fault, parts availability and complexity of the work. We provide estimated timelines and updates throughout the process.

---

### 2.8 Suspension & Steering Repair

**Page:** `https://silberarrows.com/services/suspension-repair`
**Section heading on page:** *Suspension Repair FAQs*
**Source:** `services[slug="suspension-repair"].faqs` (2 FAQs)

#### Q2.8.1

**Q:** Do you repair AIRMATIC suspension systems?

**A:** Yes. We diagnose and repair AIRMATIC systems including compressors, air struts, valve blocks and ride-height related faults.

#### Q2.8.2

**Q:** Why is my Mercedes-Benz sitting low overnight?

**A:** This is commonly caused by an air suspension leak or a fault within the suspension control system. We carry out pressure testing and diagnostics to identify the fault correctly.

---

### 2.9 Electrical & Computer Diagnostics

**Page:** `https://silberarrows.com/services/diagnostics`
**Section heading on page:** *Diagnostics FAQs*
**Source:** `services[slug="diagnostics"].faqs` (2 FAQs)

#### Q2.9.1

**Q:** Can you diagnose warning lights and electrical faults?

**A:** Yes. We diagnose engine, transmission, suspension, electrical and electronic faults using Mercedes-Benz diagnostic systems and guided testing procedures.

#### Q2.9.2

**Q:** Do you carry out software programming and coding?

**A:** Yes. We carry out coding, programming and software-related functions where required, depending on the model and system involved.

---

### 2.10 Interior & Exterior Detailing

**Page:** `https://silberarrows.com/services/detailing`
**Section heading on page:** *Detailing FAQs*
**Source:** `services[slug="detailing"].faqs` (2 FAQs)

#### Q2.10.1

**Q:** Do you offer ceramic coating and paint protection?

**A:** Yes. We offer professional detailing, paint correction and ceramic coating services to help protect and preserve your vehicle's finish.

#### Q2.10.2

**Q:** Can you remove swirl marks and light scratches?

**A:** Yes. Paint correction and machine polishing can significantly improve gloss, clarity and surface finish depending on the condition of the paintwork.

---

## Editorial notes (for the proofreader)

A few stylistic patterns are repeated across the copy. Calling these out so the proofreader can decide whether to standardise:

- **Spelling.** British/AE conventions are used throughout: *tyres*, *recognised*, *specialise*, *authorised*, *labour*. No American spellings remain in the question wording.
- **Multi-paragraph answers.** Q1.3 (SLR McLaren) is the only multi-paragraph FAQ. Paragraphs are stored in `lib/services.ts` separated by `\n\n` and rendered as visible breaks via the `whitespace-pre-line` class on the answer `<p>`. JSON-LD passes the same string verbatim.
- **Acronyms used without expansion** (intentional for SEO): *XENTRY*, *AMG*, *AIRMATIC*, *Mercedes-EQ*, *4MATIC*, *RENNtech*, *PowerAi*, *ServiceCare*, *GCC*.
- **Numerical ranges.** En-dash form ("3–4 years") is used in Q2.5.1; otherwise no numerical ranges appear in the new copy.
- **Brand mentions.** *RENNtech*, *PowerAi*, *ServiceCare* and *SilberArrows Extended Warranty Program* appear in homepage FAQs (Q1.8, Q1.9). Confirm these are how they should be capitalised on the site.

Once edits are agreed, the corrections should be applied back into `lib/services.ts` (the `homeFaqs` array and the `faqs` field of each entry in the `services` array). The on-page accordion text and the JSON-LD `FAQPage` schema both render directly from those strings, so a single edit propagates to both surfaces and to Google's structured-data understanding.
