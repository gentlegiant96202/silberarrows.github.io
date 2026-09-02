import Image from "next/image";
import {
  Sparkles,
  Star,
  Wrench,
  ShieldCheck,
  ClipboardCheck,
  Truck,
} from "lucide-react";
import { whyChooseUsAr } from "@/lib/content-ar";
import { SectionHeaderAr } from "@/components/ar/SectionHeaderAr";

const icons = [Sparkles, Star, Wrench, ClipboardCheck, ShieldCheck, Truck];

export function WhyChooseUsAr() {
  return (
    <section className="relative overflow-clip border-t border-white/[0.06] py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/why-choose-us-bg-optimized.webp"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover object-center opacity-[0.14] md:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.97)_0%,rgba(5,5,5,0.86)_50%,rgba(5,5,5,0.97)_100%)]" />
      </div>

      <div className="container-page relative">
        <div className="reveal">
          <SectionHeaderAr
            eyebrow={whyChooseUsAr.eyebrow}
            title={whyChooseUsAr.title}
            intro={whyChooseUsAr.intro}
          />
        </div>

        {/* Hairline grid — logical borders so the frame mirrors in RTL */}
        <div className="mt-12 grid border-s border-t border-white/10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {whyChooseUsAr.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={item.title}
                className="reveal group relative border-b border-e border-white/10 p-6 transition-colors duration-300 hover:bg-white/[0.03] md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="ring-chrome relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.1] to-white/[0.02]">
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      className="text-[color:var(--color-platinum)]"
                    />
                  </div>
                  <span
                    aria-hidden
                    dir="ltr"
                    className="index-num text-4xl md:text-5xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-white md:mt-10 md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-[15px]">
                  {item.body}
                </p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
