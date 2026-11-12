# DNS pro tatai.cz — přepnutí webu na Vercel + Resend

Stav zjištěný 12. 11. 2026 z veřejného DNS:

| Záznam | Hodnota dnes | Co s ním |
|---|---|---|
| NS | Webglobe (`ns1/ns2.webglobe.cz`, `ns3.webglobe.com`) | beze změny, DNS spravuje Webglobe |
| `tatai.cz` A | `62.109.154.162` (starý web na Webglobe) | **změnit** na Vercel |
| `tatai.cz` AAAA | `2001:1ab0:7e1e:151:62:109:154:162` | **smazat** (Vercel IPv6 nemá; jinak by část návštěvníků dál viděla starý web) |
| `www.tatai.cz` | CNAME na `tatai.cz` | **změnit** na Vercel |
| `*.tatai.cz` | zástupný CNAME na `tatai.cz` | beze změny (konkrétní nové záznamy mají přednost) |
| MX | `tatai-cz.mail.protection.outlook.com` (Microsoft 365) | **NEMĚNIT** — pošta info@ / stavba@ |
| TXT | `MS=ms54603686`, SPF s `include:spf.protection.outlook.com` | **NEMĚNIT** |

Starý web běží bez platného HTTPS certifikátu; po přepnutí ho nahradí nový.

## Postup

1. **Vercel** → projekt `tatai` → Settings → Domains → přidat
   `www.tatai.cz` (hlavní) a `tatai.cz` (nastavit „Redirect to
   www.tatai.cz“). Vercel ukáže přesné hodnoty záznamů — ty mají přednost
   před hodnotami níže.
2. **Resend** → Domains → Add domain → `tatai.cz`, region **EU (Ireland)**.
   Resend ukáže záznamy; DKIM hodnota je jedinečná, zkopírovat celou.
3. Doplnit hodnoty do e-mailu níže a poslat správci.
4. Po změně DNS: Vercel sám vydá HTTPS certifikát (minuty), v Resendu
   kliknout **Verify**.

## E-mail pro správce (k odeslání)

> Dobrý den,
>
> prosím o úpravu DNS záznamů domény **tatai.cz** (Webglobe). Přecházíme
> s webem na hosting Vercel a přidáváme odesílání e-mailů z webového
> formuláře přes službu Resend. **Pošty (Microsoft 365) se změna netýká —
> MX záznam a stávající TXT záznamy (MS=…, SPF) prosím ponechte beze
> změny.**
>
> **Web (Vercel)**
>
> | Typ | Název | Hodnota | Akce |
> |---|---|---|---|
> | A | `tatai.cz` (@) | `__VERCEL_A__` | nahradit stávající `62.109.154.162` |
> | AAAA | `tatai.cz` (@) | — | **smazat** stávající `2001:1ab0:…:162` |
> | CNAME | `www` | `__VERCEL_CNAME__` | nahradit stávající CNAME na `tatai.cz` |
>
> **Odesílání e-mailů z webu (Resend)**
>
> | Typ | Název | Hodnota | Priorita |
> |---|---|---|---|
> | TXT | `resend._domainkey` | `__RESEND_DKIM__` | — |
> | MX | `send` | `feedback-smtp.eu-west-1.amazonses.com` | 10 |
> | TXT | `send` | `v=spf1 include:amazonses.com ~all` | — |
> | TXT | `_dmarc` | `v=DMARC1; p=none;` | — |
>
> Záznamy `send` a `resend._domainkey` jsou na subdoménách, s poštou
> Microsoft 365 nekolidují. Pokud by šlo, prosím o TTL 300 s, ať se změna
> rychle projeví.
>
> Děkuji.

## Typické hodnoty (ověřit v administraci Vercelu a Resendu)

- `__VERCEL_A__`: Vercel uvádí `76.76.21.21`; novější projekty mohou dostat
  jinou adresu — platí ta z Vercelu.
- `__VERCEL_CNAME__`: `cname.vercel-dns.com` nebo projektová hodnota
  `….vercel-dns-0xx.com` — platí ta z Vercelu.
- `__RESEND_DKIM__`: dlouhý řetězec začínající `p=MIGfMA0…` — jen z Resendu.
- Region Resendu musí odpovídat MX `send` (`eu-west-1` = Irsko).
- `_dmarc`: dnes není; `p=none` jen sleduje, nic neblokuje. Pokud ho
  správce už má, nechat stávající.

## Po přepnutí

- `https://www.tatai.cz` načte nový web, `https://tatai.cz` přesměruje na www.
- Na Vercelu nastavit proměnné pro formulář (viz `docs/spusteni.md`),
  nejdřív `CONTACT_TO` na testovací e-mail, potom smazat.
- Google Search Console: ověřit web a odeslat `sitemap.xml`.
