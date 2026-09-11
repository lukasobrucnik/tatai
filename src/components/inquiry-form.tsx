"use client";

import { useState } from "react";
import { Eyebrow } from "./ui/eyebrow";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const TYPES = ["Plochá střecha", "Šikmá střecha", "Sloupková konstrukce", "CLT panely", "Roubenka", "Něco jiného"];

export function InquiryForm({
  title = "Nezávazná poptávka",
  eyebrow = "Kontakt",
}: {
  title?: string;
  /** Pass null where the section already names itself above the form — two
   *  labels on top of each other is one label too many. */
  eyebrow?: string | null;
}) {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-8"
    >
      <div className="grid gap-5 pb-6 border-b border-border-hairline">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-h2 font-display font-medium tracking-heading text-strong">{title}</h2>
      </div>

      {sent ? (
        <p className="text-lead text-strong">Děkujeme. Ozveme se do dvou pracovních dnů.</p>
      ) : (
        <>
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
            <Input label="Jméno" required placeholder="Jan Novák" name="name" />
            <Input label="Telefon" type="tel" required placeholder="+420 777 123 456" name="phone" />
            <Input label="E-mail" type="email" placeholder="jan@novak.cz" name="email" />
            <Select label="Typ zakázky" required options={TYPES} name="type" />
          </div>
          <Input
            label="Popis zakázky"
            multiline
            rows={5}
            hint="Lokalita, rozměry, termín — cokoli, co už víte."
            name="description"
          />
          <Checkbox
            label="Souhlasím se zpracováním osobních údajů"
            description="Údaje použijeme výhradně k odpovědi na tuto poptávku."
            name="consent"
            required
          />
          <Button type="submit" variant="accent" size="lg" arrow className="justify-self-start">
            Odeslat poptávku
          </Button>
        </>
      )}
    </form>
  );
}
