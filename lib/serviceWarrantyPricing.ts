/**
 * Shared pricing data + lookup logic for the ServiceCare and Extended Warranty
 * calculators. Pure data and functions only — no React, no API calls, no
 * external dependencies — so it can be imported into any page or service.
 *
 * All prices are in AED and EXCLUDE 5% VAT.
 */

// ─────────────────────────────────────────────────────────────────────────────
// SERVICECARE
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceCarePricing {
  model: string;
  variant: string;
  /** 'N/A' = the variant is not split by year range. */
  year: string;
  /** AED. 0 = not offered (display as "N/A"). */
  standard: number;
  /** AED. */
  premium: number;
}

/** Fixed coverage terms shown on every ServiceCare quote. */
export const SERVICECARE_TERMS = {
  standard: { years: 2, km: 30000, label: '2 Years / 30,000 km' },
  premium: { years: 4, km: 60000, label: '4 Years / 60,000 km' },
  vatNote: 'Excl. 5% VAT',
} as const;

export const SERVICECARE_PRICING: ServiceCarePricing[] = [
  // AMG GT
  { model: 'AMG GT', variant: 'AMG GT/GT63', year: 'N/A', standard: 6100, premium: 16900 },
  { model: 'AMG GT', variant: 'GT43/53 4-DR', year: 'N/A', standard: 3800, premium: 11700 },
  { model: 'AMG GT', variant: 'AMG GT 63 4-DR', year: 'N/A', standard: 6100, premium: 16900 },

  // A
  { model: 'A', variant: 'A 200 / 250', year: 'N/A', standard: 2900, premium: 8600 },
  { model: 'A', variant: 'A 35 AMG', year: 'N/A', standard: 3700, premium: 10000 },
  { model: 'A', variant: 'A 45 AMG', year: 'N/A', standard: 3700, premium: 10000 },

  // C
  { model: 'C', variant: 'C 200', year: 'Up to 2014', standard: 2700, premium: 7600 },
  { model: 'C', variant: 'C 200', year: '2015-2021', standard: 2900, premium: 9000 },
  { model: 'C', variant: 'C 200', year: '2022+', standard: 2900, premium: 9400 },
  { model: 'C', variant: 'C 250', year: 'Up to 2014', standard: 2700, premium: 7600 },
  { model: 'C', variant: 'C 250', year: '2015+', standard: 2900, premium: 9000 },
  { model: 'C', variant: 'C 350', year: 'Up to 2014', standard: 3400, premium: 8800 },
  { model: 'C', variant: 'C 300', year: '2015+', standard: 2900, premium: 9000 },
  { model: 'C', variant: 'C 450', year: 'N/A', standard: 3400, premium: 9400 },
  { model: 'C', variant: 'C 43 AMG (4 CYL)', year: '2022+', standard: 4000, premium: 11600 },
  { model: 'C', variant: 'C 43 AMG (6 CYL)', year: 'Up to 2022', standard: 3700, premium: 11400 },
  { model: 'C', variant: 'C 63 AMG', year: 'Up to 2014', standard: 4500, premium: 11900 },
  { model: 'C', variant: 'C 63 AMG', year: '2015+', standard: 4800, premium: 12600 },

  // CLE
  { model: 'CLE', variant: 'CLE 200 / 300', year: 'N/A', standard: 2900, premium: 9400 },
  { model: 'CLE', variant: 'CLE 53', year: 'N/A', standard: 3800, premium: 11700 },
  { model: 'CLE', variant: 'CLE 63', year: 'N/A', standard: 4800, premium: 14000 },

  // CLA
  { model: 'CLA', variant: 'CLA 200 / 250', year: 'N/A', standard: 2900, premium: 8600 },
  { model: 'CLA', variant: 'CLA 35 AMG', year: 'N/A', standard: 3700, premium: 10000 },
  { model: 'CLA', variant: 'CLA 45 AMG', year: 'N/A', standard: 3700, premium: 10000 },

  // CLS
  { model: 'CLS', variant: 'CLS 350 / 400', year: '2011-2017', standard: 3300, premium: 9200 },
  { model: 'CLS', variant: 'CLS 350', year: '2018+', standard: 2900, premium: 9400 },
  { model: 'CLS', variant: 'CLS 450', year: '2018+', standard: 3300, premium: 10700 },
  { model: 'CLS', variant: 'CLS 53 AMG', year: 'N/A', standard: 4500, premium: 13000 },
  { model: 'CLS', variant: 'CLS 63 AMG', year: '2011-2017', standard: 4800, premium: 12600 },

  // E - SEDAN
  { model: 'E - SEDAN', variant: 'E 200', year: '2009-2016', standard: 2800, premium: 7700 },
  { model: 'E - SEDAN', variant: 'E 200', year: '2017-2023', standard: 3000, premium: 9100 },
  { model: 'E - SEDAN', variant: 'E 200', year: '2024+', standard: 3100, premium: 9800 },
  { model: 'E - SEDAN', variant: 'E 300', year: '2016-2023', standard: 3000, premium: 9100 },
  { model: 'E - SEDAN', variant: 'E 300', year: '2024+', standard: 3100, premium: 9100 },
  { model: 'E - SEDAN', variant: 'E 350', year: '2009-2016', standard: 3100, premium: 8800 },
  { model: 'E - SEDAN', variant: 'E 350', year: '2016-2024', standard: 3000, premium: 9100 },
  { model: 'E - SEDAN', variant: 'E 400', year: '2016-2024', standard: 3500, premium: 11000 },
  { model: 'E - SEDAN', variant: 'E 500', year: '2009-2016', standard: 3300, premium: 9500 },
  { model: 'E - SEDAN', variant: 'E 43 AMG', year: 'N/A', standard: 3800, premium: 11700 },
  { model: 'E - SEDAN', variant: 'E 53 AMG', year: 'N/A', standard: 3800, premium: 11700 },
  { model: 'E - SEDAN', variant: 'E 63 AMG', year: 'Up to 2024', standard: 4800, premium: 14000 },
  { model: 'E - SEDAN', variant: 'E 63 AMG', year: '2024+', standard: 4900, premium: 14300 },

  // E - COUPE
  { model: 'E - COUPE', variant: 'E 200', year: '2009-2017', standard: 2900, premium: 7900 },
  { model: 'E - COUPE', variant: 'E 200', year: '2017-2023', standard: 3100, premium: 9800 },
  { model: 'E - COUPE', variant: 'E 300', year: '2017-2023', standard: 3100, premium: 9800 },
  { model: 'E - COUPE', variant: 'E 350', year: '2009-2017', standard: 3200, premium: 9600 },
  { model: 'E - COUPE', variant: 'E 400', year: '2017-2023', standard: 3500, premium: 11000 },
  { model: 'E - COUPE', variant: 'E 500', year: '2009-2017', standard: 3200, premium: 9600 },
  { model: 'E - COUPE', variant: 'E 53 AMG', year: 'N/A', standard: 3800, premium: 11700 },

  // G
  { model: 'G', variant: 'G 400(d)', year: '2019+', standard: 4300, premium: 13000 },
  { model: 'G', variant: 'G 500 / 550', year: 'Up to 2018', standard: 4000, premium: 11000 },
  { model: 'G', variant: 'G 500 / 550', year: '2019+', standard: 4300, premium: 13000 },
  { model: 'G', variant: 'G 55 AMG', year: 'N/A', standard: 4800, premium: 12500 },
  { model: 'G', variant: 'G 63 AMG', year: 'Up to 2018', standard: 4800, premium: 12500 },
  { model: 'G', variant: 'G 63 AMG', year: '2019+', standard: 5400, premium: 15400 },

  // GL / GLS
  { model: 'GL / GLS', variant: 'GLS 450', year: '2019+', standard: 3600, premium: 11300 },
  { model: 'GL / GLS', variant: 'GL 500 / 550', year: '2012-2019', standard: 3600, premium: 11800 },
  { model: 'GL / GLS', variant: 'GLS 500 / 550 / 580', year: '2019+', standard: 3600, premium: 11800 },
  { model: 'GL / GLS', variant: 'GLS 63 AMG', year: '2019+', standard: 4800, premium: 14000 },

  // GLA
  { model: 'GLA', variant: 'GLA 200 / 250', year: 'N/A', standard: 2900, premium: 8600 },
  { model: 'GLA', variant: 'GLA 35 AMG', year: 'N/A', standard: 3700, premium: 10000 },
  { model: 'GLA', variant: 'GLA 45 AMG', year: 'N/A', standard: 3700, premium: 10000 },

  // GLB
  { model: 'GLB', variant: 'GLB 200 / 250', year: 'N/A', standard: 2900, premium: 8600 },
  { model: 'GLB', variant: 'GLB 35 AMG', year: 'N/A', standard: 3700, premium: 10000 },

  // GLC
  { model: 'GLC', variant: 'GLC 200 / 250 / 300', year: 'N/A', standard: 2900, premium: 8600 },
  { model: 'GLC', variant: 'GLC 43 AMG', year: 'N/A', standard: 3700, premium: 11500 },
  { model: 'GLC', variant: 'GLC 53 AMG', year: 'N/A', standard: 4800, premium: 14000 },
  { model: 'GLC', variant: 'GLC 63 AMG', year: 'N/A', standard: 4800, premium: 14000 },

  // GLE
  { model: 'GLE', variant: 'GLE 350', year: 'N/A', standard: 3600, premium: 10900 },
  { model: 'GLE', variant: 'GLE 400 / 450', year: 'N/A', standard: 3600, premium: 11300 },
  { model: 'GLE', variant: 'GLE 43 AMG', year: 'N/A', standard: 3900, premium: 11900 },
  { model: 'GLE', variant: 'GLE 53 AMG', year: 'N/A', standard: 3900, premium: 11700 },
  { model: 'GLE', variant: 'GLE 63 AMG', year: 'Up to 2019', standard: 4800, premium: 14000 },
  { model: 'GLE', variant: 'GLE 63 AMG', year: '2020+', standard: 4800, premium: 14000 },

  // MAYBACH
  { model: 'MAYBACH', variant: 'S 560', year: '2015-2021', standard: 6500, premium: 15900 },
  { model: 'MAYBACH', variant: 'S 580', year: '2021+', standard: 6500, premium: 17400 },
  { model: 'MAYBACH', variant: 'S 600 / 650', year: '2015-2021', standard: 6500, premium: 15900 },
  { model: 'MAYBACH', variant: 'S 680', year: '2021+', standard: 6500, premium: 17400 },

  // ML
  { model: 'ML', variant: 'ML 350 / 400', year: 'N/A', standard: 3600, premium: 11300 },
  { model: 'ML', variant: 'ML 500', year: 'N/A', standard: 3600, premium: 11800 },
  { model: 'ML', variant: 'ML 63', year: 'N/A', standard: 4800, premium: 14000 },

  // S
  { model: 'S', variant: 'S 400 / 450', year: '2013-2020', standard: 3800, premium: 11700 },
  { model: 'S', variant: 'S 500 / 550 / 560', year: '2013-2020', standard: 3800, premium: 12000 },
  { model: 'S', variant: 'S 500', year: '2020+', standard: 3800, premium: 11700 },
  { model: 'S', variant: 'S 580', year: '2020+', standard: 3800, premium: 12000 },
  { model: 'S', variant: 'S 600', year: '2013-2020', standard: 4900, premium: 15000 },
  { model: 'S', variant: 'S 63 AMG', year: 'N/A', standard: 4900, premium: 14300 },
  { model: 'S', variant: 'S 65 AMG', year: 'N/A', standard: 5200, premium: 15600 },

  // SL
  { model: 'SL', variant: 'SL 400', year: '2012-2020', standard: 4000, premium: 10500 },
  { model: 'SL', variant: 'SL 500', year: '2012-2020', standard: 4500, premium: 12000 },
  { model: 'SL', variant: 'SL 43 AMG', year: '2020+', standard: 4400, premium: 12300 },
  { model: 'SL', variant: 'SL 55 AMG', year: '2020+', standard: 4900, premium: 14400 },
  { model: 'SL', variant: 'SL 63 AMG', year: '2012-2020', standard: 4900, premium: 12900 },
  { model: 'SL', variant: 'SL 65 AMG', year: '2012-2020', standard: 6100, premium: 15700 },
  { model: 'SL', variant: 'SL 63 AMG', year: '2020+', standard: 4900, premium: 14400 },

  // SLK / SLC
  { model: 'SLK / SLC', variant: 'SLK 200', year: '2011-2016', standard: 3100, premium: 9800 },
  { model: 'SLK / SLC', variant: 'SLC 200 / 300', year: '2017-2020', standard: 3100, premium: 9800 },
  { model: 'SLK / SLC', variant: 'SLK 350', year: '2011-2016', standard: 3600, premium: 11200 },
  { model: 'SLK / SLC', variant: 'SLC 43', year: '2017-2020', standard: 4100, premium: 12300 },
  { model: 'SLK / SLC', variant: 'SLK 55 AMG', year: '2011-2016', standard: 4700, premium: 13800 },

  // SLR & SLS
  { model: 'SLR', variant: 'SLR', year: 'N/A', standard: 0, premium: 44300 },
  { model: 'SLS', variant: 'SLS', year: 'N/A', standard: 6100, premium: 17300 },

  // V
  { model: 'V', variant: 'V 250 / 300', year: 'N/A', standard: 4100, premium: 10300 },

  // EQ / ELECTRIC
  { model: 'EQ / ELECTRIC', variant: 'EQA', year: 'N/A', standard: 2900, premium: 5800 },
  { model: 'EQ / ELECTRIC', variant: 'EQB', year: 'N/A', standard: 2900, premium: 5800 },
  { model: 'EQ / ELECTRIC', variant: 'EQC', year: 'N/A', standard: 2900, premium: 5800 },
  { model: 'EQ / ELECTRIC', variant: 'EQE', year: 'N/A', standard: 3300, premium: 6600 },
  { model: 'EQ / ELECTRIC', variant: 'EQS', year: 'N/A', standard: 3300, premium: 6600 },
  { model: 'EQ / ELECTRIC', variant: 'EQV', year: 'N/A', standard: 3300, premium: 6600 },
  { model: 'EQ / ELECTRIC', variant: 'EQG', year: 'N/A', standard: 4100, premium: 8600 },
  { model: 'EQ / ELECTRIC', variant: 'CLA', year: 'N/A', standard: 2900, premium: 5800 },
];

/**
 * Feature-comparison rows for the ServiceCare quote table.
 * Cell values: '1x' / '2x' literal, 'dash' (—), 'check' (✓), or any literal text.
 */
export const SERVICECARE_COMPARISON_FEATURES: { name: string; standard: string; premium: string }[] = [
  { name: 'Service A (Minor)', standard: '1x', premium: '2x' },
  { name: 'Service B (Major)', standard: '1x', premium: '2x' },
  { name: 'Brake Fluid Replacement', standard: '1x', premium: '2x' },
  { name: 'Spark Plug Replacement', standard: 'dash', premium: 'check' },
  { name: 'Coolant Replacement', standard: 'dash', premium: 'check' },
  { name: 'Transmission Oil Change + Filter Replacement', standard: 'dash', premium: 'check' },
  { name: 'Full Vehicle Inspection', standard: 'check', premium: 'check' },
];

/** Sorted, de-duplicated list of ServiceCare model categories. */
export function getServiceCareModels(): string[] {
  return [...new Set(SERVICECARE_PRICING.map((item) => item.model))].sort();
}

/** De-duplicated list of variants for a given model. */
export function getServiceCareVariants(model: string): string[] {
  return [
    ...new Set(SERVICECARE_PRICING.filter((item) => item.model === model).map((item) => item.variant)),
  ];
}

/** De-duplicated list of year ranges for a given model + variant. */
export function getServiceCareYears(model: string, variant: string): string[] {
  return [
    ...new Set(
      SERVICECARE_PRICING.filter((item) => item.model === model && item.variant === variant).map(
        (item) => item.year
      )
    ),
  ];
}

/**
 * True when the variant actually has selectable year ranges (i.e. it's not a
 * single 'N/A' bucket). Use this to decide whether to show a "year" step.
 */
export function serviceCareHasYearOptions(model: string, variant: string): boolean {
  const years = getServiceCareYears(model, variant);
  return years.length > 0 && !years.includes('N/A');
}

/**
 * Lowest Standard + Premium ServiceCare prices across all models, used for the
 * "Starting from" teaser shown before a model is selected. Excludes 0 (not offered).
 */
export function getServiceCareStartingPrices(): { standard: number; premium: number } {
  const standards = SERVICECARE_PRICING.map((p) => p.standard).filter((v) => v > 0);
  const premiums = SERVICECARE_PRICING.map((p) => p.premium).filter((v) => v > 0);
  return { standard: Math.min(...standards), premium: Math.min(...premiums) };
}

/**
 * Look up Standard + Premium prices for a ServiceCare selection.
 * Pass year 'N/A' when the variant isn't split by year.
 * `standard === 0` means "not offered" (display as N/A).
 */
export function getServiceCarePricing(
  model: string,
  variant: string,
  year: string
): { standard: number; premium: number } | null {
  const item = SERVICECARE_PRICING.find(
    (i) => i.model === model && i.variant === variant && i.year === year
  );
  return item ? { standard: item.standard, premium: item.premium } : null;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTENDED WARRANTY
// ─────────────────────────────────────────────────────────────────────────────

export interface WarrantyPricing {
  model: string;
  /** non-AMG standard (AED) or null when not offered. */
  standard: number | null;
  /** AMG standard (AED) or null when not offered. */
  amgStandard: number | null;
  /** non-AMG premium (AED) or null when not offered. */
  premium: number | null;
  /** AMG premium (AED) or null when not offered. */
  amgPremium: number | null;
}

/** Fixed coverage terms shown on every Extended Warranty quote. */
export const WARRANTY_TERMS = {
  coverageMonths: 12,
  additionalKm: 20000,
  periodLabel: '12 Months / +20,000 km',
  vatNote: 'Excl. 5% VAT',
} as const;

export const WARRANTY_PRICING: WarrantyPricing[] = [
  { model: 'A', standard: 3959, amgStandard: 5959, premium: 6599, amgPremium: 8499 },
  { model: 'CLA', standard: 3959, amgStandard: 5959, premium: 6599, amgPremium: 8499 },

  { model: 'C', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },
  { model: 'CLE', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },
  { model: 'CLS', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },
  { model: 'E', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },
  { model: 'GLA', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },
  { model: 'GLB', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },
  { model: 'GLC', standard: 4650, amgStandard: 6650, premium: 7699, amgPremium: 9499 },

  { model: 'GLE', standard: 5299, amgStandard: 7299, premium: 8799, amgPremium: 10599 },
  { model: 'GLS', standard: 5299, amgStandard: 7299, premium: 8799, amgPremium: 10599 },
  { model: 'G', standard: 5299, amgStandard: 7299, premium: 8799, amgPremium: 10599 },
  { model: 'S', standard: 5299, amgStandard: 7299, premium: 8799, amgPremium: 10599 },
  { model: 'SL', standard: 5299, amgStandard: 7299, premium: 8799, amgPremium: 10599 },

  { model: 'V', standard: 5299, amgStandard: null, premium: 8799, amgPremium: null },

  { model: 'AMG GT (2-DR/4-DR)', standard: null, amgStandard: 9599, premium: null, amgPremium: 13899 },

  { model: 'EQA', standard: 3959, amgStandard: null, premium: 6599, amgPremium: null },
  { model: 'EQB', standard: 3959, amgStandard: null, premium: 6599, amgPremium: null },
  { model: 'EQC', standard: 4650, amgStandard: null, premium: 7699, amgPremium: null },
  { model: 'EQE', standard: 4650, amgStandard: null, premium: 7699, amgPremium: null },
  { model: 'EQS', standard: 5299, amgStandard: null, premium: 8799, amgPremium: null },
  { model: 'EQV', standard: 5299, amgStandard: null, premium: 8799, amgPremium: null },
  { model: 'EQG', standard: 5299, amgStandard: null, premium: 8799, amgPremium: null },

  { model: 'CLA (ELEC)', standard: 3959, amgStandard: null, premium: 6599, amgPremium: null },
  { model: 'GLC (ELEC)', standard: 3959, amgStandard: null, premium: 6599, amgPremium: null },
];

/**
 * Feature-comparison rows for the Extended Warranty quote table.
 * Cell values: 'dash' (—), 'check' (✓), 'checkUpTo60' (✓ up to 60,000 km),
 * or any literal text.
 */
export const WARRANTY_COMPARISON_FEATURES: { name: string; standard: string; premium: string }[] = [
  {
    name: 'Covered parts',
    standard: 'Engine, transmission, transfer case, final drive unit',
    premium: 'All major mechanical, electrical, and electronic components',
  },
  { name: 'A/C, suspension, brakes', standard: 'dash', premium: 'check' },
  { name: 'Electronics', standard: 'dash', premium: 'check' },
  { name: 'Wear & tear components', standard: 'dash', premium: 'checkUpTo60' },
  { name: 'Labour & materials', standard: 'check', premium: 'check' },
  { name: 'Transferable to new owner', standard: 'check', premium: 'check' },
  { name: 'Roadside assistance', standard: 'dash', premium: 'check' },
  { name: 'Territorial coverage', standard: 'UAE only', premium: 'UAE only' },
];

export type WarrantyVariant = 'Standard' | 'AMG';

export interface WarrantyQuote {
  /** Standard-tier price for the resolved variant (AED), or null if unavailable. */
  standardPrice: number | null;
  /** Premium-tier price for the resolved variant (AED), or null if unavailable. */
  premiumPrice: number | null;
  /** 'AMG' when AMG pricing applies (either chosen or AMG-only model), else 'Standard'. */
  variantLabel: WarrantyVariant;
  /** True when the model offers BOTH AMG and non-AMG (show the AMG/Standard step). */
  hasAmgOption: boolean;
  /** True when the model is AMG-only (skip the step, force AMG pricing). */
  isAmgOnly: boolean;
}

/** Ordered list of warranty model categories (as authored, not re-sorted). */
export function getWarrantyModels(): string[] {
  return WARRANTY_PRICING.map((item) => item.model);
}

/**
 * Lowest Standard + Premium warranty prices across all models, used for the
 * "Starting from" teaser shown before a model is selected. Excludes null.
 */
export function getWarrantyStartingPrices(): { standard: number; premium: number } {
  const standards = WARRANTY_PRICING.flatMap((p) => [p.standard, p.amgStandard]).filter(
    (v): v is number => v !== null
  );
  const premiums = WARRANTY_PRICING.flatMap((p) => [p.premium, p.amgPremium]).filter(
    (v): v is number => v !== null
  );
  return { standard: Math.min(...standards), premium: Math.min(...premiums) };
}

export function getWarrantyModelData(model: string): WarrantyPricing | undefined {
  return WARRANTY_PRICING.find((p) => p.model === model);
}

/** True when the model offers BOTH AMG and non-AMG pricing (needs an AMG step). */
export function warrantyHasAmgOption(model: string): boolean {
  const data = getWarrantyModelData(model);
  if (!data) return false;
  return (
    (data.standard !== null || data.premium !== null) &&
    (data.amgStandard !== null || data.amgPremium !== null)
  );
}

/** True when the model only has AMG pricing (e.g. AMG GT). */
export function warrantyIsAmgOnly(model: string): boolean {
  const data = getWarrantyModelData(model);
  if (!data) return false;
  return data.standard === null && data.premium === null;
}

/**
 * Resolve Standard + Premium warranty prices for a model.
 *
 * @param model The selected model category.
 * @param isAmg Whether the user picked the AMG variant. Ignored for AMG-only
 *              models (which always resolve to AMG pricing).
 */
export function getWarrantyQuote(model: string, isAmg: boolean): WarrantyQuote | null {
  const data = getWarrantyModelData(model);
  if (!data) return null;

  const isAmgOnly = warrantyIsAmgOnly(model);
  const useAmg = isAmg || isAmgOnly;

  return {
    standardPrice: useAmg ? data.amgStandard : data.standard,
    premiumPrice: useAmg ? data.amgPremium : data.premium,
    variantLabel: useAmg ? 'AMG' : 'Standard',
    hasAmgOption: warrantyHasAmgOption(model),
    isAmgOnly,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format an AED price for display. A price of 0 (or null) is treated as
 * "not offered" and rendered as "N/A".
 */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined || value === 0) return 'N/A';
  return `AED ${value.toLocaleString()}`;
}
