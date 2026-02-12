import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

const WEBHOOK_URL = 'https://bothook.io/v1/public/triggers/webhooks/c59aa2c4-f68c-414a-88fe-d601d92b01c3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, countryCode, phone } = body;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
