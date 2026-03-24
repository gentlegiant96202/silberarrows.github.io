import crypto from 'crypto';

function sha256Hash(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return '';
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

let cachedToken: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Google OAuth token refresh failed: ${response.status} ${err}`);
  }

  const data = await response.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.token;
}

function formatConversionDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}+00:00`;
}

export interface GoogleAdsConversionData {
  gclid?: string | null;
  name?: string;
  phone?: string;
}

export async function uploadClickConversion(data: GoogleAdsConversionData): Promise<void> {
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  if (!customerId || !conversionActionId || !developerToken) return;

  const accessToken = await getAccessToken();
  const conversionAction = `customers/${customerId}/conversionActions/${conversionActionId}`;
  const conversionDateTime = formatConversionDateTime(new Date());

  const userIdentifiers: Record<string, unknown>[] = [];

  if (data.phone) {
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (phoneDigits) {
      userIdentifiers.push({ hashedPhoneNumber: sha256Hash(phoneDigits) });
    }
  }

  if (data.name) {
    const parts = data.name.trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ').trim();
    if (firstName) {
      userIdentifiers.push({
        addressInfo: {
          hashedFirstName: sha256Hash(firstName),
          ...(lastName && { hashedLastName: sha256Hash(lastName) }),
        },
      });
    }
  }

  const conversion: Record<string, unknown> = {
    conversionAction,
    conversionDateTime,
  };

  if (data.gclid) {
    conversion.gclid = data.gclid;
  }

  if (userIdentifiers.length > 0) {
    conversion.userIdentifiers = userIdentifiers;
  }

  const url = `https://googleads.googleapis.com/v23/customers/${customerId}:uploadClickConversions`;

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${accessToken}`,
    'developer-token': developerToken,
    'Content-Type': 'application/json',
  };

  if (loginCustomerId) {
    headers['login-customer-id'] = loginCustomerId;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      conversions: [conversion],
      partialFailure: true,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[Google Ads] Upload error:', response.status, errText);
    return;
  }

  const result = await response.json();
  if (result.partialFailureError) {
    console.error('[Google Ads] Partial failure:', JSON.stringify(result.partialFailureError));
  }
}
