import Image from "next/image";
import {
  Sparkles,
  Star,
  Wrench,
  ShieldCheck,
  ClipboardCheck,
  Truck,
} from "lucide-react";
import { whyChooseUs } from "@/lib/content";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { preserveBrandWrap } from "@/lib/utils";

const icons = [Sparkles, Star, Wrench, ClipboardCheck, ShieldCheck, Truck];

export function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/why-choose-us-bg-optimized.webp"
          alt=""
          fill
          sizes="100vw"
          className="hidden md:block object-cover object-center opacity-[0.18]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.85)_50%,rgba(5,5,5,0.95)_100%)]" />
      </div>

      <div className="container-page relative">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built For One Marque. Mercedes-Benz Specialists."
          intro="With over a decade of dedicated experience, we provide unparalleled expertise and premium service exclusively for Mercedes-Benz owners in Dubai."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl glass-card ring-silver silver-glow p-4 sm:p-6 transition"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent opacity-60 transition group-hover:opacity-100" />
                <div className="relative flex h-11 w-11 items-center justify-center rounded-lg ring-chrome bg-gradient-to-b from-white/[0.12] to-white/[0.02]">
                  <Icon
                    size={20}
                    className="text-[color:var(--color-platinum)]"
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {preserveBrandWrap(item.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-silver-400)]">
                  {preserveBrandWrap(item.body)}
                </p>
                <span className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(229,228,226,0.18),transparent_70%)] blur-2xl opacity-0 transition group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
