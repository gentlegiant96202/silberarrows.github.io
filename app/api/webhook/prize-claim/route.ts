import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = 'https://rplhksxrekbcbhgzcjir.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGhrc3hyZWtiY2JoZ3pjamlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTI2ODUsImV4cCI6MjA2NzcyODY4NX0.Rd_12MZmCPKFeA_WePWA57m0MED6gMRjJhkxauH41D4';
const BOTHOOK_WEBHOOK_URL = 'https://bothook.io/v1/public/triggers/webhooks/ad29e7ad-96a8-4710-83cc-6c2a3ec49564';

export async function POST(request: NextRequest) {
  console.log('🔥 API ENDPOINT CALLED - prize claim processing started');
  
  try {
    const requestBody = await request.json();
    console.log('📥 Received request body:', JSON.stringify(requestBody, null, 2));
    
    const { data } = requestBody;
    console.log('🎉 Processing prize claim data:', JSON.stringify(data, null, 2));
    
    if (!data || !data.mobile || !data.name || !data.prize) {
      console.error('❌ Missing required data fields:', { data });
      throw new Error('Missing required fields: mobile, name, or prize');
    }
    
    // 1. Save to Supabase database
    console.log('💾 Starting database save...');
    try {
      const savePayload = {
        mobile: data.mobile,
        name: data.name,
        selected_prize: data.prize.toString(),
        prize_id: parseInt(data.prize),
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
      };
      
      console.log('💾 Database save payload:', JSON.stringify(savePayload, null, 2));
      console.log('💾 Using Supabase URL:', SUPABASE_URL);
      
      const saveResponse = await fetch(`${SUPABASE_URL}/rest/v1/wheel_entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(savePayload)
      });

      console.log('💾 Database response status:', saveResponse.status);
      console.log('💾 Database response headers:', Object.fromEntries(saveResponse.headers.entries()));

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        console.error('❌ Database save failed - Status:', saveResponse.status);
        console.error('❌ Database save failed - Error text:', errorText);
        throw new Error(`Database save failed: ${saveResponse.status} - ${errorText}`);
      }

      const saveResult = await saveResponse.text();
      console.log('✅ Prize claim saved to database successfully!');
      console.log('✅ Database save result:', saveResult);
    } catch (dbError: unknown) {
      const error = dbError as Error;
      console.error('❌ Database error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      // Continue with webhook even if database fails
    }

    // 2. Send to bothook.io webhook
    try {
      const webhookResponse = await fetch(BOTHOOK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data })
      });

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text();
        console.error('❌ Webhook failed:', errorText);
        throw new Error(`Webhook failed: ${webhookResponse.status}`);
      }

      const webhookResult = await webhookResponse.json();
      console.log('✅ Webhook sent successfully:', webhookResult);
      
      return NextResponse.json({ 
        success: true, 
        database: 'saved',
        webhook: 'sent',
        result: webhookResult
      });

    } catch (webhookError) {
      console.error('❌ Webhook error:', webhookError);
      return NextResponse.json({ 
        success: false, 
        database: 'saved',
        webhook: 'failed',
        error: webhookError.message 
      }, { status: 500 });
    }

  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Prize claim processing failed:', err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
} 