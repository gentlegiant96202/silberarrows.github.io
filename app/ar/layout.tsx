import { HtmlLang } from "@/components/ar/HtmlLang";
import { ArabicHeader } from "@/components/ar/ArabicHeader";
import { ArabicFooter } from "@/components/ar/ArabicFooter";
import { ArabicMobileBar } from "@/components/ar/ArabicMobileBar";

/**
 * Layout for every /ar route. The root layout still owns <html>, <body>, the
 * tracking scripts, the fonts (IBM Plex Sans Arabic is registered there as
 * `--font-ibm-arabic` → `font-arabic` utility) and the ContactModalProvider,
 * which switches to Arabic on /ar paths. `ChromeGate` hides the English
 * header/footer/mobile bar here, and this layout mounts the RTL equivalents.
 */
export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="ar" dir="rtl" className="font-arabic">
      <HtmlLang lang="ar" dir="rtl" />
      <ArabicHeader />
      {children}
      <ArabicFooter />
      <ArabicMobileBar />
    </div>
  );
}
