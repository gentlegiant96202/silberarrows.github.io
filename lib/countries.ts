import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

export type Country = {
  /** ISO 3166-1 alpha-2 code, e.g. "AE" */
  code: CountryCode;
  /** Localised country name, e.g. "United Arab Emirates" */
  name: string;
  /** Dial code including the leading "+", e.g. "+971" */
  dialCode: string;
  /** Flag emoji derived from the ISO code */
  flag: string;
};

const regionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

// Surfaced first because they cover the bulk of the UAE audience:
// the GCC states, then the UK, India and Pakistan.
const PRIORITY: CountryCode[] = [
  "AE",
  "SA",
  "QA",
  "KW",
  "BH",
  "OM",
  "GB",
  "IN",
  "PK",
];

const allCountries: Country[] = getCountries()
  .map((code) => ({
    code,
    name: regionNames?.of(code) ?? code,
    dialCode: `+${getCountryCallingCode(code)}`,
    flag: flagEmoji(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const priorityCountries = PRIORITY.map((code) =>
  allCountries.find((c) => c.code === code)
).filter((c): c is Country => Boolean(c));

const restCountries = allCountries.filter((c) => !PRIORITY.includes(c.code));

/**
 * All countries for phone selection. Priority markets (Gulf, UK, India,
 * Pakistan) are surfaced first, then the remainder alphabetically.
 */
export const countries: Country[] = [...priorityCountries, ...restCountries];

/** Number of leading priority countries — used to render a divider. */
export const PRIORITY_COUNT = priorityCountries.length;

export const DEFAULT_COUNTRY: CountryCode = "AE";
