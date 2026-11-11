import type { NextRequest } from "next/server";
import { INQUIRY_RECIPIENTS, PHONE } from "@/lib/data";

/**
 * Poptávkový formulář → e-mail na info@tatai.cz a stavba@tatai.cz.
 *
 * Posílá se přes Resend (https://resend.com), voláním jejich REST API přímo
 * přes fetch — kvůli jednomu POSTu nemá smysl tahat do projektu SDK.
 *
 * Proměnné prostředí (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  povinná; bez ní route vrací 503 a formulář nabídne
 *                   náhradní cestu (e-mail / telefon), takže poptávka
 *                   se neztratí ani na demu bez klíče.
 *   CONTACT_TO      volitelná, čárkami oddělení příjemci; výchozí jsou
 *                   INQUIRY_RECIPIENTS z lib/data.
 *   CONTACT_FROM    odesílatel; dokud není doména tatai.cz v Resendu
 *                   ověřená, musí zůstat onboarding@resend.dev (a Resend
 *                   pak doručuje jen na e-mail vlastníka účtu).
 */

export const runtime = "nodejs";

const MAX_LEN = { name: 120, phone: 40, email: 200, type: 80, description: 5000 };

// Klouzavé okno v paměti jedné instance — první zábrana proti zahlcení
// z jedné IP, ne tvrdý limit napříč celým provozem.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fail(status: number, error: string) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return fail(429, "Příliš mnoho odeslání. Zkuste to prosím za pár minut.");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Neplatný požadavek.");
  }

  // Honeypot: pole, které člověk nevidí. Robotovi hlásíme úspěch, ať se
  // nenaučí hledat jiný signál.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, MAX_LEN.name);
  const phone = clean(body.phone, MAX_LEN.phone);
  const email = clean(body.email, MAX_LEN.email);
  const type = clean(body.type, MAX_LEN.type);
  const description = clean(body.description, MAX_LEN.description);
  const consent = body.consent === true;

  if (!name || !phone || !type) return fail(400, "Vyplňte prosím jméno, telefon a typ zakázky.");
  if (!consent) return fail(400, "Bez souhlasu se zpracováním údajů poptávku odeslat nemůžeme.");
  if (email && !/^[^\s@"'<>]+@[^\s@"'<>]+\.[^\s@"'<>]+$/.test(email)) return fail(400, "E-mail nevypadá správně.");

  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO ?? INQUIRY_RECIPIENTS.join(","))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM ?? "TATAI web <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("[poptavka] RESEND_API_KEY není nastavený");
    return Response.json(
      { ok: false, unavailable: true, error: `Odesílání teď nefunguje. Napište nám na ${to[0]} nebo zavolejte na ${PHONE}.` },
      { status: 503 },
    );
  }

  const id = crypto.randomUUID().slice(0, 8).toUpperCase();
  const date = new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague", dateStyle: "long", timeStyle: "short" });

  const rows: [string, string][] = [
    ["Jméno", name],
    ["Telefon", phone],
    ["E-mail", email || "—"],
    ["Typ zakázky", type],
    ["Datum", date],
  ];

  const text = [
    `Nová poptávka #${id} z webu tatai.cz`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Popis:",
    description || "—",
  ].join("\n");

  // Barvy jsou literály, protože e-mailoví klienti CSS proměnné neumí — hodnoty
  // odpovídají tokenům z globals.css (bone-200/100, graphite-1000/500/200/100,
  // signal-500).
  const html = `<!DOCTYPE html><html lang="cs"><head><meta charset="utf-8"></head><body style="margin:0;background:#f5f2ec;padding:24px 12px;font-family:-apple-system,'Segoe UI',sans-serif;color:#0e1113">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#faf8f4;border:1px solid #d5d9db;border-collapse:collapse">
<tr><td style="padding:20px 24px;border-bottom:2px solid #00a8e0"><div style="font:600 11px monospace;letter-spacing:.12em;text-transform:uppercase;color:#606060">Nová poptávka #${id}</div><div style="font-size:20px;font-weight:600;margin-top:4px">${escapeHtml(type)} — ${escapeHtml(name)}</div></td></tr>
${rows.map(([k, v]) => `<tr><td style="padding:10px 24px;border-bottom:1px solid #e8ebec;font-size:14px"><span style="display:inline-block;width:110px;color:#606060">${k}</span><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
<tr><td style="padding:16px 24px 24px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(description || "—")}</td></tr>
</table></body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email || undefined,
        subject: `Poptávka #${id}: ${type} — ${name}`,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[poptavka] Resend odmítl e-mail:", res.status, await res.text());
      return fail(502, `Poptávku se nepodařilo odeslat. Zavolejte nám prosím na ${PHONE}.`);
    }
  } catch (err) {
    console.error("[poptavka] Chyba spojení s Resendem:", err);
    return fail(502, `Poptávku se nepodařilo odeslat. Zavolejte nám prosím na ${PHONE}.`);
  }

  return Response.json({ ok: true, id });
}
