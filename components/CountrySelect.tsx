"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { CountryCode } from "libphonenumber-js";
import { countries, PRIORITY_COUNT } from "@/lib/countries";

type CountrySelectProps = {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  disabled?: boolean;
};

export function CountrySelect({ value, onChange, disabled }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => countries.find((c) => c.code === value) ?? countries[0],
    [value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    const normalized = q.replace(/^\+/, "");
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.replace("+", "").includes(normalized) ||
        c.code.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    searchRef.current?.focus();
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function select(code: CountryCode) {
    onChange(code);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country: ${selected.name} (${selected.dialCode})`}
        onClick={() => setOpen((v) => !v)}
        className="flex h-full w-[6.5rem] items-center justify-between gap-1.5 rounded-lg bg-black/40 border border-white/10 px-3 py-3 text-base text-white outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition disabled:opacity-60"
      >
        <span className="flex items-center gap-1.5">
          <span aria-hidden>{selected.flag}</span>
          <span>{selected.dialCode}</span>
        </span>
        <ChevronDown
          size={14}
          className={`text-[color:var(--color-silver-400)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[18rem] max-w-[calc(100vw-3.5rem)] overflow-hidden rounded-xl border border-white/10 bg-[#111113] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
            <Search size={15} className="text-[color:var(--color-silver-500)]" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.stopPropagation();
                  setOpen(false);
                }
              }}
              placeholder="Search country or code"
              className="w-full bg-transparent text-base text-white placeholder:text-[color:var(--color-silver-600)] outline-none"
            />
          </div>

          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-[color:var(--color-silver-500)]">
                No matches
              </li>
            ) : (
              filtered.map((c, i) => {
                const active = c.code === value;
                const showDivider = !query.trim() && i === PRIORITY_COUNT;
                return (
                  <li
                    key={c.code}
                    className={
                      showDivider ? "mt-1 border-t border-white/10 pt-1" : ""
                    }
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => select(c.code)}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                        active ? "bg-white/5 text-white" : "text-[color:var(--color-silver-200)]"
                      }`}
                    >
                      <span aria-hidden className="text-base">
                        {c.flag}
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-[color:var(--color-silver-400)]">
                        {c.dialCode}
                      </span>
                      {active && (
                        <Check size={14} className="text-white" />
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
