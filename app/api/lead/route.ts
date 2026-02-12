import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = 'https://rplhksxrekbcbhgzcjir.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGhrc3hyZWtiY2JoZ3pjamlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTI2ODUsImV4cCI6MjA2NzcyODY4NX0.Rd_12MZmCPKFeA_WePWA57m0MED6gMRjJhkxauH41D4';

// TODO: Replace with your actual webhook URL
const LEAD_WEBHOOK_URL = 'https://bothook.io/v1/public/triggers/webhooks/REPLACE_WITH_YOUR_WEBHOOK_ID';

export async function POST(request: NextRequest) {
  console.log('📥 Lead form submission received');
  
  try {
    const body = await request.json();
    const { name, countryCode, phone, source } = body;
    
    console.log('📋 Lead data:', { name, countryCode, phone, source });
    
    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }
    
    const fullPhone = `${countryCode}${phone}`;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    
    // 1. Save to Supabase
    try {
      const savePayload = {
        name,
        phone: fullPhone,
        country_code: countryCode,
        source_page: source,
        ip_address: ipAddress,
        created_at: new Date().toISOString()
      };
      
      console.log('💾 Saving to database:', savePayload);
      
      const saveResponse = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(savePayload)
      });

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        console.error('❌ Database save failed:', saveResponse.status, errorText);
        // Continue even if database fails
      } else {
        console.log('✅ Lead saved to database');
      }
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      // Continue with webhook even if database fails
    }

    // 2. Send to webhook
    try {
      const webhookPayload = {
        name,
        phone: fullPhone,
        countryCode,
        source,
        timestamp: new Date().toISOString()
      };
      
      console.log('🔗 Sending to webhook:', webhookPayload);
      
      const webhookResponse = await fetch(LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      if (!webhookResponse.ok) {
        console.error('❌ Webhook failed:', webhookResponse.status);
      } else {
        console.log('✅ Webhook sent successfully');
      }
    } catch (webhookError) {
      console.error('❌ Webhook error:', webhookError);
      // Don't fail the request if webhook fails
    }

    return NextResponse.json({ 
      success: true,
      message: 'Lead submitted successfully'
    });

  } catch (error) {
    console.error('❌ Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
