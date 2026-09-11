"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import GlyphPortal, { type GlyphPortalStyle } from "./ui/glyph-portal";
import { ChapterTab } from "./ui/chapter-tab";

/**
 * A chapter opening you fly into: the page goes dark, a word stands cut out
 * of it with light showing through the letters, and scrolling flies the
 * camera into one of them until that letter fills the screen and you're
 * inside the chapter. Scrolling back up reverses it.
 *
 * Střechy and Domy both open the same way — a photo plate with a heading —
 * which is right for two chapters that are siblings. The chapter this opens
 * isn't a third sibling, it's the point the other two have been arguing for,
 * so it gets a threshold instead of another plate. Exactly one chapter on the
 * page may use it; a second one would turn the site into a showreel.
 *
 * Mounting waits for fonts because the portal measures the glyph off canvas
 * and freezes whichever face is available at mount: a face that arrives
 * afterwards would move the ink out from under the camera, and one still
 * pending makes the portal disable its own motion for good. Only the first
 * family is handed over for the same reason — the portal marks itself stalled
 * if *any* requested family fails its check, and generic names like
 * `sans-serif` can't be checked reliably.
 */
/**
 * Progress at which the letter's interior owns the screen. Before it the dark
 * paper still frames the word and the cursor belongs bone-white; after it the
 * page is the light field and the mark has to go dark or it disappears. The
 * camera's zoom is a function of progress alone, so this holds whatever the
 * scroll length is.
 */
const FIELD_OWNS_SCREEN = 0.4;

export function ChapterPortal({
  word,
  index,
  label,
  caption,
  enterLabel,
  children,
}: {
  /** The word you fly through. Uppercase, and short enough to stand at
   *  display scale on a phone. */
  word: string;
  /** Chapter number, shown top-left over the word. */
  index: string;
  /** Chapter name — what the menu calls this section. */
  label: string;
  /** One line under the word, the chapter's promise. */
  caption: string;
  enterLabel: string;
  children: ReactNode;
}) {
  const [fontFamily, setFontFamily] = useState<string | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const litRef = useRef(false);

  // Fires once per rendered frame, so it touches the DOM directly rather than
  // going through state — a re-render per scroll frame would cost more than
  // the whole portal.
  const handleProgress = useCallback((progress: number) => {
    const lit = progress >= FIELD_OWNS_SCREEN;
    if (lit === litRef.current) return;
    litRef.current = lit;
    const section = hostRef.current?.querySelector<HTMLElement>(".portal-flush");
    if (!section) return;
    if (lit) section.dataset.cursorGround = "light";
    else delete section.dataset.cursorGround;
  }, []);

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
        <ChapterTab index={index} label={label} />
        <div className="py-(--section-y-md)">{children}</div>
      </div>
    );
  }

  return (
    <div ref={hostRef}>
    <GlyphPortal
      onProgress={handleProgress}
      // Zeroes the portal's own content padding (globals.css) so the ground
      // below can run to the edges and the chapter keeps the site's section
      // rhythm instead of the component's.
      className="portal-flush"
      word={word}
      fontFamily={fontFamily}
      fontWeight={700}
      interactive={false}
      scrollLength={1.9}
      // Bez tohohle okna se obsah drží až do 0.78 (viz GlyphPortal): pole
      // vyplní obrazovku někde kolem 0.42 a pak se skoro celou další
      // obrazovku neděje nic — čtenář si stihne myslet, že stránka končí.
      // 0.56 je první moment, kdy je nadpis vůbec pod ohybem, takže se
      // vynořuje rovnou, jak se pole dovře.
      reveal={[0.48, 0.64]}
      enterLabel={enterLabel}
      style={
        {
          // Dark page, light showing through the letters, opening onto the
          // chapter's own ground — so the camera lands exactly on the colour
          // the section below already sits on.
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
      // enough to sit under the section that follows. Signal cyan bloomed into
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
          {/* A notch up from eyebrow size: legible to anyone who looks for it,
              still quiet enough not to pull against the word behind it. */}
          <span className="absolute left-(--container-gutter) top-10 flex items-baseline gap-3 font-mono text-body-sm tracking-eyebrow uppercase">
            <span className="text-signal-500">{index}</span>
            <span className="text-bone-200">{label}</span>
          </span>
          <p
            className="absolute inset-x-(--container-gutter) m-0 text-center font-mono text-caption tracking-mono text-graphite-300"
            style={{ top: "calc(var(--gp-word-bottom, 55%) + 2.5rem)" }}
          >
            {caption}
          </p>
        </div>
      }
    >
      {/* The portal makes its content transparent so the field shows behind it
          during the reveal, and the section's own ground is the dark opening
          frame. Neither is a surface to read on once the pin releases, so the
          chapter brings its own — see .portal-flush in globals.css, which
          paints it across the whole content box rather than only behind this
          wrapper. It fades in from the top rather than starting flat: an
          opaque ground meeting the field left a hard horizontal seam across
          the screen, which read as a rendering fault rather than as the edge
          of anything. */}
      <div className="py-(--section-y-md)">{children}</div>
    </GlyphPortal>
    </div>
  );
}
