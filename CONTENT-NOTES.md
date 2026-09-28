# Content notes — Paila Creation website

This file records where every piece of public content comes from, what still needs the company's approval, and what is missing. Nothing in this file appears on the website.

---

## 1. Verified information (from the company's public Facebook page)

Sources: https://www.facebook.com/pailacreation/about and https://www.facebook.com/pailacreation/about_details (as supplied in the project brief).

| Fact | Where it appears on the site |
|---|---|
| Company name: Paila Creation | All pages |
| Category: Software company | Home, About, structured data |
| Location: Maitidevi, Kathmandu, Nepal | Home, About, Contact, footer, structured data |
| Email: info@pailacreation.com | Contact, About, Home CTA, footer, structured data |
| Facebook: https://www.facebook.com/pailacreation | About, Contact, footer, structured data |
| YouTube: https://www.youtube.com/channel/UCnS9T0V8_8yDATseNWqWEgw | Home (Learning), About, Contact, footer, structured data |
| Website and application design | Services |
| Web applications | Services |
| Android applications | Services |
| Desktop applications | Services |
| IT solutions | Services |
| Programming tutorials on YouTube | Home (Learning), About |
| Domain listed on Facebook: https://pailacreation.com/ | **Not used on the site yet** — see section 5 |

Deliberately **not** used: posts relating to National Cyber Olympiad – Nepal. There is no evidence of a client, product, or formal partnership relationship, so the event is not mentioned anywhere.

---

## 2. Proposed marketing copy — requires company approval

All wording on the site is original copy written from the facts above. The following items go beyond restating those facts and should be approved, edited, or removed by Paila Creation before launch.

| Item | Location | Note |
|---|---|---|
| "Thoughtful software. One clear step forward." (design concept) | Informs visual direction only; not printed as a slogan | Proposed, not an existing company slogan |
| Headline "Your next step starts with better software." | Home hero | Proposed |
| "Five ways we can help you move forward." | Home services | Proposed |
| **Four-stage approach: Understand → Design → Build → Refine and launch** | Home "Approach" section | **Suggested content, not a verified internal methodology.** Public wording is kept conditional ("A typical engagement *can* move through four stages"). Confirm the company actually works this way, or edit. |
| "Clear thinking. Practical software." | Home about preview, About page | Proposed |
| "The aim is straightforward: understand what you need, then build software that is clear to use." | Home about preview | Proposed statement of intent |
| **Working principles: Understand first / Keep it clear / Move step by step** | About page "How we like to work" | **Draft editorial content for company approval.** Not sourced from the company. |
| "Where it helps" lists and "How the work comes together" paragraphs | Services page (each service) | Written as conditional examples of needs a service *can* address, not as claims of past work. Confirm each service description matches what the company offers — particularly **IT solutions**, whose scope is not defined on Facebook, so the copy is intentionally open ("describe the problem and we'll discuss whether we're the right fit"). |
| "Software, one clear step at a time." | About page H1 | Proposed |
| "Updates are shared on Facebook" | About page | Generic; confirm Facebook is actively used |
| Illustrative interface compositions (hero, services visuals) | Home, Services | Built in HTML/CSS. Labelled "Illustrative interface" / "Illustrative layout" so they are not mistaken for client work. They contain no metrics, client names, or results. |
| Code snippet in the Learning section | Home | Decorative, hidden from assistive technology; not taken from a real tutorial |

Suggestion (not used on site): "Paila" (पाइला) means "footstep" in Nepali, which matches the footprint logo. If the company confirms this is the intended meaning, it could become a short, genuine line on the About page.

---

## 3. Brand colours and visual system

Colours were **sampled from the supplied `logo.jpg`**: cyan `#2AB0E3`, teal background `#2B5154`, charcoal `#504A4C`. JPEG sampling can shift colours slightly — re-sample from a vector or PNG logo if one exists.

The logo cyan is extended with an analogous blue for gradients and accents. Text-safe variants are used wherever colour carries text:

| Token | Value | Use |
|---|---|---|
| `--cyan` | #2AB0E3 (logo) | Fills, icons, glows — never as small text on white |
| `--cyan-700` | #0A76A8 | Cyan text on white (5:1) |
| `--blue` / `--blue-700` | #2563EB / #1D5BD8 | Accents, focus rings, gradient text, primary button (white text 5.9:1) |
| `--teal` | #2B5154 (logo) | Background behind the logo image |
| `--ink` | #0B1220 | Headings, dark buttons, body text |
| `--ink-2` / `--ink-3` | #475467 / #5F6B7D | Secondary text (7:1 / 5.4:1 on white) |

Typefaces: **Plus Jakarta Sans** (headings) and **Inter** (body), both variable, OFL, self-hosted.

The interface mock-ups (hero workspace, phone, bento visuals, service visuals) are illustrative and labelled as such. Their labels ("Approve homepage design", "Update opening hours", etc.) are generic examples, not client work.

## 4. Missing assets

| Asset | Status | Workaround used |
|---|---|---|
| Logo with transparent background (SVG or PNG) | **Missing** — only `logo.jpg` (on teal background) supplied | The JPG is cropped (not redrawn) and always shown on a matching teal (#2B5154) tile or panel so its background blends. Proportions preserved. |
| Horizontal logo / "Paila Creation" wordmark | **Missing** — the supplied logo reads only "Creation" under the mark | Header and footer show the cropped mark plus the company name set in Manrope text. This is a temporary text wordmark, not a redrawn logo. |
| Favicon set | Generated from `logo.jpg` crop (32, 180, 512 px PNG) | Replace with versions from the vector logo when available |
| Social preview image | Generated: `assets/images/og-image.jpg` (1200 × 630, logo on brand teal) | Replace with a designed image if wanted |
| Photography | None supplied — none used | Intentional; no stock photos |
| Project/portfolio images | None — no portfolio section | Add a portfolio page only once real, approved project work exists |

---

## 5. Details requiring company confirmation

- [ ] **Domain ownership and hosting** for https://pailacreation.com/ — listed on Facebook but treated as a *proposed* domain. Until confirmed, the site has no canonical URLs, no absolute `og:url`, no sitemap, and no `url`/`logo` in structured data. Ready-made snippets are in `deploy-templates/` (see README).
- [ ] That **info@pailacreation.com** is monitored (it is the only contact route).
- [ ] Approval of all proposed copy in section 2, especially the four-stage approach and the three working principles.
- [ ] The intended scope of **IT solutions**.
- [ ] Whether a **form endpoint** (e.g. a form service or the company's own server) should be used instead of the email-draft approach. Currently the contact form prepares an email in the visitor's own email app and never claims a message was sent.
- [ ] A transparent/vector logo file.

Intentionally **omitted** from the site because they are not verified: phone/WhatsApp numbers, street address or map pin, business hours, response-time promises, founders and team, founding year, years of experience, client names/logos, project counts, awards, certifications, testimonials, ratings, pricing, delivery guarantees, specific technologies, and partnerships.
