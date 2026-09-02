import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { buildLeadUserData, buildLeadPayload } from "@/lib/meta-capi";
import { uploadClickConversion } from "@/lib/google-ads-capi";

const WEBHOOK_URL =
  "https://bothook.io/v1/public/triggers/webhooks/c59aa2c4-f68c-414a-88fe-d601d92b01c3";

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || null;
}

/** Trim + cap a free-text attribution value; returns null when empty. */
function cleanAttr(value: unknown, max = 256): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return null;
  return v.length > max ? v.slice(0, max) : v;
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
      gbraid,
      wbraid,
      source,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const fullPhone = `${countryCode || "+971"}${phone}`;

    // Attribution persisted with the lead so WhatsApp/Call/form conversions
    // can be reconciled against real conversations, and so a future
    // value-based (Data Manager API) upload has the click id it needs.
    const attribution = {
      source: cleanAttr(source),
      gclid: cleanAttr(gclid),
      gbraid: cleanAttr(gbraid),
      wbraid: cleanAttr(wbraid),
      event_id: cleanAttr(eventId, 128),
      landing_url: cleanAttr(eventSourceUrl, 2048),
    };

    const promises: Promise<void>[] = [
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: fullPhone }),
      }).then((webhookResponse) => {
        if (!webhookResponse.ok) {
          console.error("Webhook failed:", webhookResponse.status);
        }
      }),
    ];

    const supabase = getSupabase();
    if (supabase) {
      promises.push(
        (async () => {
          const { error } = await supabase
            .from("leads")
            .insert({ name, phone: fullPhone, ...attribution });
          if (!error) return;

          // If the attribution columns don't exist yet (migration
          // 0002_leads_attribution.sql not run), never lose the lead — fall
          // back to the original minimal insert.
          const missingColumn =
            error.code === "PGRST204" || /column/i.test(error.message);
          if (missingColumn) {
            console.error(
              "Supabase insert: attribution columns missing, run supabase/migrations/0002_leads_attribution.sql. Falling back.",
              error.message
            );
            const { error: fallbackError } = await supabase
              .from("leads")
              .insert({ name, phone: fullPhone });
            if (fallbackError) {
              console.error("Supabase insert error:", fallbackError.message);
            }
            return;
          }
          console.error("Supabase insert error:", error.message);
        })()
      );
    }

    await Promise.all(promises);

    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (pixelId && accessToken) {
      const clientIp = getClientIp(request);
      const clientUserAgent = request.headers.get("user-agent") || null;

      const userData = buildLeadUserData({
        name,
        fullPhone,
        countryCode: countryCode || "+971",
        clientIp,
        clientUserAgent,
        fbp: fbp || null,
        fbc: fbc || null,
      });

      const payload = buildLeadPayload({
        eventId:
          eventId ||
          `lead-${eventTime}-${Math.random().toString(36).slice(2)}`,
        eventTime,
        eventSourceUrl: eventSourceUrl || null,
        userData,
      });

      try {
        const capiUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`;
        const capiRes = await fetch(capiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!capiRes.ok) {
          const errText = await capiRes.text();
          console.error("[CAPI] Meta error:", capiRes.status, errText);
        }
      } catch (capiErr) {
        console.error("[CAPI] Request failed:", capiErr);
      }
    }

    // Legacy Google Ads API offline conversion upload. DEPRECATED: Google blocks
    // these uploads on 2026-06-15 (migrating to the Data Manager API), and the
    // web-form lead is now tracked client-side via gtag. Disabled by default;
    // only runs when GOOGLE_ADS_OFFLINE_UPLOAD_ENABLED is explicitly "true".
    if (
      process.env.GOOGLE_ADS_OFFLINE_UPLOAD_ENABLED === "true" &&
      process.env.GOOGLE_ADS_CUSTOMER_ID &&
      process.env.GOOGLE_ADS_DEVELOPER_TOKEN
    ) {
      try {
        await uploadClickConversion({
          gclid: gclid || null,
          phone: fullPhone,
          name,
        });
      } catch (gadsErr) {
        console.error("[Google Ads] Conversion upload failed:", gadsErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
