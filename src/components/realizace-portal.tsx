"use client";

import { useEffect, useState, type ReactNode } from "react";
import GlyphPortal, { type GlyphPortalStyle } from "./ui/glyph-portal";
import { ChapterTab } from "./ui/chapter-tab";

/**
 * The way into the Realizace chapter: the word itself is the doorway. The
 * page goes dark, REALIZACE stands cut out of it with the work showing
 * through the letters, and scrolling flies the camera into one of them until
 * that letter fills the screen and you're inside the chapter. Scrolling back
 * up reverses it.
 *
 * Střechy and Domy both open the same way — a photo plate with a heading —
 * which is right for two chapters that are siblings. Realizace isn't a third
 * sibling, it's the point the other two have been arguing for, so it gets a
 * threshold instead of another plate. Everything after it (O nás, Kontakt)
 * goes back to the normal chapter treatment.
 *
 * Mounting waits for fonts because the portal measures the glyph off canvas
 * and freezes whichever face is available at mount: a face that arrives
 * afterwards would move the ink out from under the camera, and one still
 * pending makes the portal disable its own motion for good. Only the first
 * family is handed over for the same reason — the portal marks itself stalled
 * if *any* requested family fails its check, and generic names like
 * `sans-serif` can't be checked reliably.
 */
export function RealizacePortal({ children }: { children: ReactNode }) {
  const [fontFamily, setFontFamily] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const resolve = () => {
      if (cancelled) return;
      const declared = getComputedStyle(document.documentElement).getPropertyValue("--font-archivo").trim();
      const first = declared.split(",")[0]?.trim().replace(/^["']|["']$/g, "");
      setFontFamily(first || "Arial Black");
    };
    document.fonts.ready.then(resolve, resolve);
    return () => {
      cancelled = true;
    };
  }, []);

  // Before the face is settled the chapter opens the same way every other one
  // does, so it is never unlabelled — and it is always below the fold, so the
  // swap isn't something a reader watches happen.
  if (!fontFamily) {
    return (
      <div className="bg-surface-page">
        <ChapterTab index="03" label="Realizace" />
        <div className="py-(--section-y-md)">{children}</div>
      </div>
    );
  }

  return (
    <GlyphPortal
      word="REALIZACE"
      fontFamily={fontFamily}
      fontWeight={700}
      interactive={false}
      scrollLength={2.6}
      enterLabel="Přejít na realizace"
      style={
        {
          // Dark page, the work showing through the letters, opening onto the
          // chapter's own bone ground — so the camera lands exactly on the
          // colour the wall of projects already sits on.
          "--gp-paper": "var(--color-graphite-900)",
          "--gp-ink": "var(--color-bone-200)",
          "--gp-field": "var(--color-surface-page)",
          "--gp-foreground": "var(--color-graphite-1000)",
        } as GlyphPortalStyle
      }
      front={
        <div className="absolute inset-0">
          <span className="absolute left-(--container-gutter) top-10 flex items-baseline gap-3 font-mono text-eyebrow tracking-eyebrow uppercase">
            <span className="text-signal-500">03</span>
            <span className="text-bone-200">Realizace</span>
          </span>
          <p
            className="absolute inset-x-(--container-gutter) m-0 text-center font-mono text-caption tracking-mono text-graphite-300"
            style={{ top: "calc(var(--gp-word-bottom, 55%) + 2.5rem)" }}
          >
            Šest staveb. Skladba, fotky a jméno stavbyvedoucího u každé.
          </p>
        </div>
      }
    >
      {children}
    </GlyphPortal>
  );
}
