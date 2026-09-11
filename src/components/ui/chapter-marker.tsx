/**
 * How a chapter says its own name: the number in signal cyan, the name in
 * mono at heading scale beside it.
 *
 * Střechy and Domy carry it on their photo plates, O nás over the portal, and
 * Kontakt inside its own section — same mark every time, so the number is the
 * one thing on the page that always means "you are here". Set at h2 rather
 * than at label size on purpose: the visitor's answer to "where am I" should
 * not be the smallest type on the screen.
 */
export function ChapterMarker({
  index,
  name,
  tone = "default",
}: {
  index: string;
  name: string;
  tone?: "default" | "inverse";
}) {
  return (
    <span className="flex items-baseline gap-4 font-mono text-h2 font-medium uppercase tracking-wide">
      <span className="text-signal-500">{index}</span>
      <span className={tone === "inverse" ? "text-inverse" : "text-strong"}>{name}</span>
    </span>
  );
}
