import { Fragment } from "react";

const BRAND = "Mercedes-Benz";

/**
 * Renders a string with every "Mercedes-Benz" wrapped in a `whitespace-nowrap`
 * span so the brand never breaks at its hyphen.
 *
 * Use this instead of `preserveBrandWrap()` on Corporate A (display) text:
 * the display face has no U+2011 non-breaking-hyphen glyph, so the
 * substitution would fall back to a different font for that one character.
 */
export function BrandText({ text }: { text: string }) {
  const parts = text.split(BRAND);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="whitespace-nowrap">{BRAND}</span>
          )}
        </Fragment>
      ))}
    </>
  );
}
