"use client";

import { useState, type FormEvent } from "react";
import { Eyebrow } from "./ui/eyebrow";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { INQUIRY_RECIPIENTS, PHONE } from "@/lib/data";

const TYPES = [
  "Plochá střecha",
  "Šikmá střecha",
  "Zelená střecha",
  "Rekonstrukce střechy",
  "Dřevostavba — sloupková",
  "Dřevostavba — CLT panely",
  "Roubenka",
  "Subdodávka pro firmu",
  "Něco jiného",
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; mailto?: string };

/** Záložní cesta, když server poptávku odeslat nemůže: stejný obsah
 *  předvyplněný do e-mailu, ať zákazník nemusí nic psát znovu. */
function mailtoFrom(data: Record<string, string>) {
  const subject = `Poptávka: ${data.type || "dotaz"} — ${data.name}`;
  const lines = [`Jméno: ${data.name}`, `Telefon: ${data.phone}`];
  if (data.email) lines.push(`E-mail: ${data.email}`);
  lines.push(`Typ zakázky: ${data.type}`, "", data.description);
  const body = lines.join("\n");
  return `mailto:${INQUIRY_RECIPIENTS.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function InquiryForm({
  title = "Nezávazná poptávka",
  eyebrow = "Kontakt",
}: {
  title?: string;
  /** Pass null where the section already names itself above the form — two
   *  labels on top of each other is one label too many. */
  eyebrow?: string | null;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      type: String(fd.get("type") ?? ""),
      description: String(fd.get("description") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/poptavka", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: fd.get("consent") !== null }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; unavailable?: boolean };
      if (res.ok && json.ok) {
        setStatus({ kind: "sent" });
        return;
      }
      setStatus({
        kind: "error",
        message: json.error ?? `Poptávku se nepodařilo odeslat. Zavolejte nám prosím na ${PHONE}.`,
        mailto: res.status >= 500 ? mailtoFrom(data) : undefined,
      });
    } catch {
      setStatus({
        kind: "error",
        message: `Spojení selhalo. Zkuste to znovu, nebo nám zavolejte na ${PHONE}.`,
        mailto: mailtoFrom(data),
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="relative grid gap-8">
      <div className="grid gap-5 pb-6 border-b border-border-hairline">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-h2 font-display font-medium tracking-heading text-strong">{title}</h2>
      </div>

      {status.kind === "sent" ? (
        <p role="status" className="text-lead text-strong">
          Děkujeme. Ozveme se do dvou pracovních dnů.
        </p>
      ) : (
        <>
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            <Input label="Jméno" required placeholder="Jan Novák" name="name" autoComplete="name" />
            <Input label="Telefon" type="tel" required placeholder="+420 777 123 456" name="phone" autoComplete="tel" />
            <Input label="E-mail" type="email" placeholder="jan@novak.cz" name="email" autoComplete="email" />
            <Select label="Typ zakázky" required options={TYPES} name="type" />
          </div>
          <Input
            label="Popis zakázky"
            multiline
            rows={5}
            hint="Lokalita, rozměry, termín — cokoli, co už víte."
            name="description"
          />
          {/* Honeypot: člověk ho nevidí ani na něj nedotabuje, robot vyplní. */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label>
              Web
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <Checkbox
            label="Souhlasím se zpracováním osobních údajů"
            description="Údaje použijeme výhradně k odpovědi na tuto poptávku."
            name="consent"
            required
          />

          {status.kind === "error" && (
            <div role="alert" className="grid gap-2 border-l-2 border-signal-500 pl-4">
              <p className="m-0 text-body-md leading-body text-strong">{status.message}</p>
              {status.mailto && (
                <a href={status.mailto} className="font-mono text-eyebrow uppercase tracking-eyebrow text-strong underline underline-offset-4">
                  Odeslat poptávku e-mailem
                </a>
              )}
            </div>
          )}

          <Button type="submit" variant="accent" size="lg" arrow className="justify-self-start" disabled={sending}>
            {sending ? "Odesílám…" : "Odeslat poptávku"}
          </Button>
        </>
      )}
    </form>
  );
}
