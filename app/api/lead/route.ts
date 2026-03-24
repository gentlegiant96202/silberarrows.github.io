import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { buildLeadUserData, buildLeadPayload } from '../../../lib/meta-capi';
import { uploadClickConversion } from '../../../lib/google-ads-capi';

const WEBHOOK_URL = 'https://bothook.io/v1/public/triggers/webhooks/c59aa2c4-f68c-414a-88fe-d601d92b01c3';

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || null;
}

export async function POST(request: NextRequest) {
  const eventTime = Math.floor(Date.now() / 1000);

  try {
    const body = await request.json();
    const {
      name,
      countryCode,
      phone,
      eventId,
      fbp,
      fbc,
      eventSourceUrl,
      gclid,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const fullPhone = `${countryCode || '+971'}${phone}`;

    // Save to Supabase and send webhook in parallel
    const [dbResult, webhookResponse] = await Promise.all([
      supabase.from('leads').insert({ name, phone: fullPhone }),
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: fullPhone }),
      }),
    ]);

    if (dbResult.error) {
      console.error('Supabase insert error:', dbResult.error.message);
    }

    if (!webhookResponse.ok) {
      console.error('Webhook failed:', webhookResponse.status);
    }

    // Meta Conversions API (Lead) – optional; do not fail lead on CAPI errors
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (pixelId && accessToken) {
      const clientIp = getClientIp(request);
      const clientUserAgent = request.headers.get('user-agent') || null;

      const userData = buildLeadUserData({
        name,
        fullPhone,
        countryCode: countryCode || '+971',
        clientIp,
        clientUserAgent,
        fbp: fbp || null,
        fbc: fbc || null,
      });

      const payload = buildLeadPayload({
        eventId: eventId || `lead-${eventTime}-${Math.random().toString(36).slice(2)}`,
        eventTime,
        eventSourceUrl: eventSourceUrl || null,
        userData,
      });

      try {
        const capiUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
        const capiRes = await fetch(capiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!capiRes.ok) {
          const errText = await capiRes.text();
          console.error('[CAPI] Meta error:', capiRes.status, errText);
        }
      } catch (capiErr) {
        console.error('[CAPI] Request failed:', capiErr);
      }
    }

    // Google Ads Conversion Upload – optional; do not fail lead on errors
    if (process.env.GOOGLE_ADS_CUSTOMER_ID && process.env.GOOGLE_ADS_DEVELOPER_TOKEN) {
      try {
        await uploadClickConversion({
          gclid: gclid || null,
          phone: fullPhone,
          name,
        });
      } catch (gadsErr) {
        console.error('[Google Ads] Conversion upload failed:', gadsErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
