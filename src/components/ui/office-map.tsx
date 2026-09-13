"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** DS motion: "things reveal, they never bounce". */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Where the firm actually sits, on a map cropped so the address is dead
 * centre — the pin is therefore always at 50%/50% and needs no coordinates
 * passed to it.
 *
 * The pin hovers rather than sits: it drifts a few pixels up and down while
 * its shadow tightens and loosens underneath, which is what sells the height.
 * Two signal rings pulse out of the point on a slow, staggered loop, so the
 * eye is pulled there without the map turning into a carousel. All of it
 * stops dead under prefers-reduced-motion, where a pin at rest over a static
 * shadow says the same thing.
 *
 * The palette is deliberately the logo's: graphite body, signal core. A
 * default red map pin would be the one element on the site belonging to
 * somebody else's brand.
 */
export function OfficeMap({
  src,
  alt,
  label,
  address,
  note,
  href,
}: {
  src: string;
  alt: string;
  /** Eyebrow on the card — "Sídlo". */
  label: string;
  address: string;
  /** One quiet line under the address. */
  note?: string;
  /** Opens the same place in the visitor's own maps. */
  href: string;
}) {
  const reduce = useReducedMotion();

  const float = reduce
    ? {}
    : {
        animate: { y: [0, -7, 0] },
        transition: { duration: 3.4, ease: "easeInOut" as const, repeat: Infinity },
      };

  return (
    <figure className="relative m-0 grid gap-3">
      <div
        className="relative overflow-hidden border border-border-hairline bg-surface-raised"
        style={{ aspectRatio: "4/3" }}
      >
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />

        {/* Everything below is anchored to the exact centre of the crop, which
            is the address. */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {!reduce &&
            [0, 1.7].map((delay) => (
              <motion.span
                key={delay}
                aria-hidden
                className="absolute left-1/2 top-1/2 block size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-500"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 3.6], opacity: [0, 0.55, 0] }}
                transition={{ duration: 3.4, ease: "easeOut", repeat: Infinity, delay, times: [0, 0.15, 1] }}
              />
            ))}

          {/* The ground shadow stays on the point; only the pin leaves it. */}
          <motion.span
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-[6px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-graphite-1000/25 blur-[1.5px]"
            {...(reduce
              ? {}
              : {
                  animate: { scaleX: [1, 0.72, 1], opacity: [0.32, 0.2, 0.32] },
                  transition: { duration: 3.4, ease: "easeInOut", repeat: Infinity },
                })}
          />

          <motion.span
            className="absolute left-1/2 top-1/2 block -translate-x-1/2"
            // -100% puts the pin's tip on the point rather than its middle.
            style={{ translateY: "-100%" }}
            initial={reduce ? undefined : { opacity: 0, y: -14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.span className="block" {...float}>
              <svg width="26" height="36" viewBox="0 0 26 36" fill="none" aria-hidden>
                <path
                  d="M13 35.5S24.5 22.4 24.5 13.4C24.5 6.6 19.4 1 13 1S1.5 6.6 1.5 13.4C1.5 22.4 13 35.5 13 35.5Z"
                  fill="var(--color-graphite-1000)"
                  stroke="var(--color-bone-100)"
                  strokeWidth="1.5"
                />
                <circle cx="13" cy="13" r="4.4" fill="var(--color-signal-500)" />
              </svg>
            </motion.span>
          </motion.span>
        </div>
      </div>

      {/* On a wide screen the card closes the map's bottom-left corner — the one
          the pin is not in. On a phone the map is barely 260px tall and an
          overlay would cover half the streets it is pointing at, so there it
          drops below the picture instead. */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid gap-1.5 border border-border-hairline bg-bone-100/95 px-5 py-4 no-underline backdrop-blur-[2px] transition-colors duration-200 hover:border-signal-500 sm:absolute sm:bottom-4 sm:left-4 sm:right-4 sm:max-w-[30ch] max-sm:px-4! max-sm:py-3!"
      >
        <span className="flex items-center gap-2.5 font-mono text-eyebrow tracking-eyebrow uppercase text-muted">
          <span aria-hidden className="signal-rule h-px w-4" />
          {label}
        </span>
        <span className="text-body-md leading-snug text-strong">{address}</span>
        {note && <span className="font-mono text-caption tracking-mono text-muted">{note}</span>}
        <span className="mt-1 inline-flex items-center gap-2 font-mono text-eyebrow tracking-eyebrow uppercase text-strong">
          Otevřít v mapách
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </a>
    </figure>
  );
}
