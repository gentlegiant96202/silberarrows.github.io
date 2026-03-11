import crypto from 'crypto';

/**
 * SHA-256 hash for Meta CAPI user_data (normalize: trim, lowercase where applicable, then hash).
 */
export function sha256Hash(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return '';
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

/** Map dial code to 2-letter ISO country (lowercase). */
const COUNTRY_CODE_MAP: Record<string, string> = {
  '971': 'ae',
  '44': 'gb',
  '1': 'us',
  '91': 'in',
  '49': 'de',
  '33': 'fr',
  '61': 'au',
  '966': 'sa',
  '974': 'qa',
  '973': 'bh',
  '968': 'om',
  '965': 'kw',
  '20': 'eg',
  '27': 'za',
  '234': 'ng',
  '254': 'ke',
};

export function countryCodeToIso(countryCode: string): string {
  const digits = (countryCode || '').replace(/\D/g, '');
  return COUNTRY_CODE_MAP[digits] || '';
}

export interface LeadEventUserData {
  name: string;
  fullPhone: string;
  countryCode: string;
  clientIp: string | null;
  clientUserAgent: string | null;
  fbp: string | null;
  fbc: string | null;
}

export function buildLeadUserData(data: LeadEventUserData): Record<string, string> {
  const countryIso = countryCodeToIso(data.countryCode);
  const phoneNormalized = data.fullPhone.replace(/\D/g, '');
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ').trim();

  const userData: Record<string, string> = {};

  if (phoneNormalized) {
    userData.ph = sha256Hash(phoneNormalized);
  }
  if (firstName) {
    userData.fn = sha256Hash(firstName);
  }
  if (lastName) {
    userData.ln = sha256Hash(lastName);
  }
  if (countryIso) {
    userData.country = sha256Hash(countryIso);
  }
  if (data.clientIp) {
    userData.client_ip_address = data.clientIp;
  }
  if (data.clientUserAgent) {
    userData.client_user_agent = data.clientUserAgent;
  }
  if (data.fbp) {
    userData.fbp = data.fbp;
  }
  if (data.fbc) {
    userData.fbc = data.fbc;
  }

  return userData;
}

export interface BuildLeadPayloadOptions {
  eventId: string;
  eventTime: number;
  eventSourceUrl: string | null;
  userData: Record<string, string>;
}

/**
 * Build the single Lead event for Meta CAPI.
 * When META_TEST_EVENT_CODE is set (e.g. TEST50369), events go to Test events in Events Manager.
 */
export function buildLeadPayload(options: BuildLeadPayloadOptions): { data: object[] } {
  const testCode = process.env.META_TEST_EVENT_CODE;
  const event: Record<string, unknown> = {
    event_name: 'Lead',
    event_time: options.eventTime,
    event_source_url: options.eventSourceUrl || undefined,
    action_source: 'website',
    event_id: options.eventId,
    user_data: options.userData,
  };
  if (testCode) {
    event.test_event_code = testCode;
  }
  return { data: [event] };
}
