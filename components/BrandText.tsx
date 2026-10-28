import { Fragment } from "react";

const UNBREAKABLE = /(Mercedes-Benz|Pre-Purchase)/;

/**
 * Renders a string with every "Mercedes-Benz" and "Pre-Purchase" wrapped in a
 * `whitespace-nowrap` span so neither breaks at its hyphen.
 *
 * Use this instead of `preserveBrandWrap()` on Corporate A (display) text:
 * the display face has no U+2011 non-breaking-hyphen glyph, so the
 * substitution would fall back to a different font for that one character.
 */
export function BrandText({ text }: { text: string }) {
  const parts = text.split(UNBREAKABLE);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
