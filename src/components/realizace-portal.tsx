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
      // Zeroes the portal's own content padding (globals.css) so the ground
      // below can run to the edges and the chapter keeps the site's section
      // rhythm instead of the component's.
      className="portal-flush"
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
      // Without this the component falls back to its own green gradient, which
      // paints over whatever --gp-field is set to. This is the thing that
      // shows through the letters and that the camera lands on, so it has to
      // work twice: brand-tinted enough to be worth flying into, and calm
      // enough to sit under a wall of project cards. Signal cyan bloomed into
      // the page's own bone reads as light coming through the word up close,
      // and as very nearly the normal page ground once you're inside it.
      background={
        <div
          className="absolute inset-0"
          style={{
            transform: "scale(var(--gp-field-scale,1))",
            background: [
              "radial-gradient(circle at 22% 18%, color-mix(in oklab, var(--color-signal-500) 22%, transparent), transparent 48%)",
              "radial-gradient(circle at 78% 72%, color-mix(in oklab, var(--color-signal-400) 16%, transparent), transparent 44%)",
              "var(--color-bone-200)",
            ].join(","),
          }}
        />
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
      {/* The portal makes its content transparent so the field shows behind it
          during the reveal, and the section's own ground is the dark opening
          frame. Neither is a surface to read project cards on once the pin
          releases, so the chapter brings its own.
          It fades in rather than starting flat: an opaque ground meeting the
          field left a hard horizontal seam across the screen, which read as a
          rendering fault rather than as the edge of anything. The gradient
          holds its last stop, so everything below the fade is solid page. */}
      <div
        className="py-(--section-y-md)"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-surface-page) min(38vh, 360px))",
        }}
      >
        {children}
      </div>
    </GlyphPortal>
  );
}
