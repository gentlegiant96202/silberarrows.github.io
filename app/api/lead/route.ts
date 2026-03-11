import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { buildLeadUserData, buildLeadPayload } from '../../../lib/meta-capi';

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
    if (!pixelId || !accessToken) {
      console.warn('[CAPI] Skipped: META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set');
    } else {
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
        console.log('[CAPI] Sending Lead event to Meta');
        const capiUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
        const capiRes = await fetch(capiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const resText = await capiRes.text();
        if (capiRes.ok) {
          console.log('[CAPI] Meta response', capiRes.status, resText.slice(0, 200));
        } else {
          console.error('[CAPI] Meta error:', capiRes.status, resText);
        }
      } catch (capiErr) {
        console.error('[CAPI] Request failed:', capiErr);
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
