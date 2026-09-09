/**
 * A chapter's leading edge: the numbered tab naming the chapter you've just
 * entered, the way an index tab names a divider in a folder. Numbering
 * continues the hero's own panel labels (01 — Střechy, 02 — Domy), so one
 * index system runs through the whole page.
 *
 * The hairline gives the edge definition where two same-coloured chapters
 * meet and the shadow alone would be doing all the work.
 */
export function ChapterTab({ index, label }: { index?: string; label: string }) {
  return (
    <div className="border-t border-border-hairline bg-surface-page">
      <div className="container-tatai flex items-baseline gap-3 py-4">
        {index && <span className="font-mono text-eyebrow tracking-eyebrow text-signal-500">{index}</span>}
        <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-muted">{label}</span>
      </div>
    </div>
  );
}
