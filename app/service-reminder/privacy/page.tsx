import type { Metadata } from "next";
import Link from "next/link";
import { ServiceReminderLegalPage } from "@/components/ServiceReminderLegalPage";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/service-reminder/privacy";
const canonical = `${site.url}${path}`;

const title = "Privacy Policy | Mercedes-Benz Service Reminder";
const description =
  "Privacy policy for the Mercedes-Benz Service Reminder Chrome extension from SilberArrows. What the Tool stores, what we receive, and your choices.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: canonical,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [defaultOgImage.url],
  },
};

export default function ServiceReminderPrivacyPage() {
  return (
    <ServiceReminderLegalPage
      title="Privacy Policy"
      intro="Mercedes-Benz Service Reminder Chrome extension — what we store, what we receive, and your choices."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Service Reminder" },
        { label: "Privacy Policy" },
      ]}
      breadcrumbItems={[
        { name: "Home", href: "/" },
        { name: "Privacy Policy", href: path },
      ]}
    >
      <p>
        <em>Last updated: 25 October 2026</em>
      </p>
      <p>
        This policy covers the Mercedes-Benz Service Reminder Chrome extension,
        its Notion connection and its MCP/API service (together, &quot;the
        Tool&quot;), provided by SILBER ARROWS 1934 AUTO REPAIRING L.L.C
        (&quot;SilberArrows&quot;, &quot;we&quot;).
      </p>

      <h2>What the Tool stores</h2>
      <ul>
        <li>
          <strong>Vehicle details you enter</strong> (model, last service date
          and type, mileage, reminder interval). These are stored only in your
          browser (Chrome local storage). We do not receive them.
        </li>
        <li>
          <strong>Notion connection (optional).</strong> If you connect Notion,
          the access and refresh tokens Notion issues, plus your workspace name
          and ID, are stored only in your browser.
        </li>
      </ul>

      <h2>What we receive</h2>
      <p>
        When you connect Notion, the one-time authorisation code (or a refresh
        token) is sent to our token service at silberarrows-mcp.netlify.app so
        it can be exchanged with Notion using our client secret. The service
        passes the result straight back to your browser and does not store or
        log tokens, codes or any vehicle details. Our hosting provider
        (Netlify) may keep standard technical request logs (such as IP address
        and time) for security and operations.
      </p>

      <h2>What we send to Notion</h2>
      <p>
        Only when you click &quot;Create service schedule page in Notion&quot;,
        the Tool sends your service schedule (vehicle model, next service type,
        due date, mileage figures and booking details) directly from your
        browser to Notion&apos;s API to create a page in the workspace and page
        you chose. The Tool only reads the list of pages you shared with it to
        find where to put the page. Notion&apos;s own{" "}
        <a
          href="https://www.notion.com/notion/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>{" "}
        applies to data held in Notion.
      </p>

      <h2>What we do not do</h2>
      <ul>
        <li>No accounts, analytics, advertising or tracking in the Tool.</li>
        <li>We do not sell or share your data.</li>
        <li>We do not read or change any other Notion content.</li>
      </ul>

      <h2>Your choices</h2>
      <p>
        Use &quot;Disconnect&quot; in the extension to delete the stored Notion
        tokens, and remove the connection in Notion under Settings &gt;
        Connections to revoke access. Uninstalling the extension deletes all
        locally stored data. You can delete the Notion page at any time.
      </p>

      <h2>Children</h2>
      <p>The Tool is not directed to children under 13.</p>

      <h2>Changes and contact</h2>
      <p>
        We will post any changes on this page with a new date. Questions or
        requests:{" "}
        <a href="mailto:marketing@silberarrows.com">
          marketing@silberarrows.com
        </a>
        .
      </p>

      <hr />
      <p>
        SILBER ARROWS 1934 AUTO REPAIRING L.L.C (trading as SilberArrows -
        Mercedes-Benz Service Centre), Dubai DET trade licence no. 663524, Al
        Manara Street, Al Quoz Industrial Area 1, Dubai, United Arab Emirates.
        Support:{" "}
        <a href="mailto:marketing@silberarrows.com">
          marketing@silberarrows.com
        </a>{" "}
        ·{" "}
        <Link href="/">{site.url.replace(/^https?:\/\//, "")}</Link>
      </p>
    </ServiceReminderLegalPage>
  );
}
