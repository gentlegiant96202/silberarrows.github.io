import type { Metadata } from "next";
import Link from "next/link";
import { ServiceReminderLegalPage } from "@/components/ServiceReminderLegalPage";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/service-reminder/terms";
const canonical = `${site.url}${path}`;

const title = "Terms of Use | Mercedes-Benz Service Reminder";
const description =
  "Terms of use for the Mercedes-Benz Service Reminder Chrome extension from SilberArrows. Guidance only, acceptable use, liability and governing law.";

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

export default function ServiceReminderTermsPage() {
  return (
    <ServiceReminderLegalPage
      title="Terms of Use"
      intro="Mercedes-Benz Service Reminder Chrome extension — conditions for using the Tool."
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Service Reminder" },
        { label: "Terms of Use" },
      ]}
      breadcrumbItems={[
        { name: "Home", href: "/" },
        { name: "Terms of Use", href: path },
      ]}
    >
      <p>
        <em>Last updated: 25 October 2026</em>
      </p>
      <p>
        These terms apply to the Mercedes-Benz Service Reminder Chrome
        extension, its Notion connection and its MCP/API service (the
        &quot;Tool&quot;), provided by SILBER ARROWS 1934 AUTO REPAIRING L.L.C
        (&quot;SilberArrows&quot;, &quot;we&quot;). By using the Tool you agree
        to them.
      </p>

      <h2>1. The Tool</h2>
      <p>
        The Tool is free. It estimates when a Mercedes-Benz may next need
        Service A or Service B based on details you enter, and can optionally
        create a service schedule page in your Notion workspace.
      </p>

      <h2>2. Guidance only</h2>
      <p>
        Estimates are a general guide and may be wrong. Always follow your
        vehicle&apos;s ASSYST / service indicator, owner&apos;s manual and a
        qualified technician. Do not rely on the Tool for safety decisions.
      </p>

      <h2>3. Independence</h2>
      <p>
        SilberArrows is an independent service centre and is not affiliated
        with, endorsed by or sponsored by Mercedes-Benz Group AG.
        &quot;Mercedes-Benz&quot; and related marks belong to their owners and
        are used only to describe compatibility. Notion is a trademark of Notion
        Labs, Inc.; the Tool is not made by Notion.
      </p>

      <h2>4. Your Notion workspace</h2>
      <p>
        You choose which Notion pages the Tool can access and you are
        responsible for your use of Notion under Notion&apos;s terms. You can
        revoke access at any time in Notion.
      </p>

      <h2>5. Acceptable use</h2>
      <p>
        Do not misuse the Tool or its API, attempt to disrupt it, or use it
        unlawfully.
      </p>

      <h2>6. Software licence</h2>
      <p>
        The Tool&apos;s source code is offered under the MIT licence. It is
        provided &quot;as is&quot;, without warranties of any kind.
      </p>

      <h2>7. Liability</h2>
      <p>
        To the extent permitted by UAE law, SilberArrows is not liable for any
        indirect or consequential loss, or for any loss from relying on the
        Tool&apos;s estimates. Nothing in these terms limits liability that
        cannot be limited by law.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update the Tool or these terms. Changes appear on this page with
        a new date.
      </p>

      <h2>9. Law</h2>
      <p>
        These terms are governed by the laws of the Emirate of Dubai and the
        federal laws of the UAE; the courts of Dubai have jurisdiction.
      </p>

      <h2>10. Contact</h2>
      <p>
        <a href="mailto:marketing@silberarrows.com">
          marketing@silberarrows.com
        </a>
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
