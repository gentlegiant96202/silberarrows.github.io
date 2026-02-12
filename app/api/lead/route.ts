import { NextRequest, NextResponse } from 'next/server';

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

    // Send to webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone: fullPhone }),
    });

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
