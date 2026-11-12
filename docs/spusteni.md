# Před spuštěním na tatai.cz

Co web potřebuje, aby nebyl demo, ale hotový produkt. Stav k 12. 11. 2026.

## Hotovo v kódu

| Oblast | Stav | Kde |
|---|---|---|
| Favicon (záložka prohlížeče) | Vlastní značka TATAI, 16/32/48 px + SVG | `src/app/favicon.ico`, `src/app/icon.svg` |
| Ikona na plochu iPhonu | 180 px | `src/app/apple-icon.png` |
| Ikona na plochu Androidu, manifest | 192/512 px + maskable | `src/app/manifest.ts`, `public/icon-*.png` |
| Náhled při sdílení odkazu (WhatsApp, Messenger, Facebook, LinkedIn, X, e-mail) | 1200×630, aktuální texty, fonty webu; dědí ho i podstránky | `src/app/opengraph-image.jpg`, `twitter-image.jpg` |
| Logo | Vektor (SVG) rekonstruovaný z `logo.png`, ostrý na každém displeji; světlá varianta do patičky | `public/logo/tatai-mark*.svg` |
| Titulek, popis, kanonická URL | Ano, pro každou stránku | `layout.tsx`, podstránky |
| Strukturovaná data (Google) | Firma, adresa, souřadnice, působnost, FAQ | `components/structured-data.tsx` |
| robots.txt, sitemap.xml | Ano | `src/app/robots.ts`, `sitemap.ts` |
| Stránka 404 | Ano, mimo index | `src/app/not-found.tsx` |
| Bezpečnostní hlavičky | HSTS, nosniff, ochrana proti vložení do cizího webu | `next.config.ts` |
| Cookies lišta | Ano (web používá jen nezbytné cookies) | `components/cookie-consent.tsx` |
| Ochrana soukromí, obchodní podmínky | Ano; doplněn právní základ a zpracovatelé (Vercel, Resend) | `src/app/ochrana-soukromi`, `obchodni-podminky` |
| Zbytky ze šablony Next.js | Smazány (výchozí favicon, `next.svg`, `vercel.svg` …) | — |

## Musí udělat majitel / správce (nejde bez přístupů)

1. **Doména.** Ve Vercelu přidat `tatai.cz` a `www.tatai.cz`, u registrátora
   nastavit DNS podle Vercelu. Web počítá s hlavní adresou
   `https://www.tatai.cz` (holá `tatai.cz` na ni přesměruje). Pokud má být
   hlavní adresa bez `www`, nastavit na Vercelu `NEXT_PUBLIC_SITE_URL`.
2. **Odesílání formuláře.** Účet Resend, ověřit doménu `tatai.cz` (DNS
   záznamy SPF/DKIM), na Vercelu nastavit `RESEND_API_KEY`, `CONTACT_FROM`
   (např. `TATAI web <web@tatai.cz>`), případně `CONTACT_TO`. Do té doby
   formulář nabízí jen odeslání přes e-mail zákazníka.
3. **Ochrana preview.** Produkční doména musí být veřejná (Vercel
   Authentication se týká jen náhledových adres).
4. **Google Search Console.** Po spuštění ověřit web (proměnná
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` na Vercelu), odeslat
   `https://www.tatai.cz/sitemap.xml`.
5. **Google Business Profile** na adresu Pavelkova 1210/10b — nejvíc
   poptávek z mapy přijde odsud; odkaz „Otevřít v mapách“ pak lze nasměrovat
   přímo na profil.
6. **Starý web.** Pokud na `tatai.cz` dnes něco běží a má podstránky
   v Googlu, sepsat jejich adresy a přesměrovat je (301) na nový web.

## K ověření s majitelem

- Fotka zelené střechy: smíme ji použít (stažená z cizího webu)?
- Texty právních stránek: projít, ideálně s účetní / právníkem (název
  zpracovatelů, doba uchování).
- Statistiky návštěvnosti: zatím žádné. Pokud je chce, nejjednodušší je
  Vercel Web Analytics (bez cookies, lištu není třeba měnit).

## Po spuštění zkontrolovat

- Náhled odkazu: poslat si odkaz do WhatsAppu/Messengeru, případně
  <https://www.opengraph.xyz> nebo Facebook Sharing Debugger.
- Favicon v záložce, ikonu po „Přidat na plochu“ (iPhone i Android).
- Odeslat zkušební poptávku a ověřit, že dorazí na info@ i stavba@.
- PageSpeed Insights (mobil) — cíl: zelená ve všech čtyřech kategoriích.
