# Paila Creation — website

A static, dependency-free website: semantic HTML, one stylesheet, two small scripts. No build step.

```
index.html          Home
services.html       Services (anchors: #websites #web-apps #android #desktop #it-solutions)
about.html          About
contact.html        Contact + inquiry form
assets/css/styles.css
assets/js/main.js       header state, mobile menu, section reveals
assets/js/contact.js    form validation, email draft / endpoint submission
assets/images/          logo crops (WebP + JPG fallback), social preview image
assets/icons/           favicons generated from logo.jpg
assets/fonts/           Plus Jakarta Sans + Inter variable fonts (latin, WOFF2, OFL licence)
deploy-templates/       SEO files to activate once the production domain is confirmed
robots.txt
logo.jpg                original logo as supplied (source file; not referenced by pages)
CONTENT-NOTES.md        what is verified, what needs approval, what is missing
```

## Preview locally

Any static server works. From this folder:

```bash
python -m http.server 8000
# then open http://localhost:8000/
```

or `npx serve .`. Opening the HTML files directly (`file://`) also works, but a server is closer to production.

## Deploy

Upload the folder's contents to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel/shared hosting, etc.). There is nothing to build. You can leave out `logo.jpg`, `README.md`, `CONTENT-NOTES.md` and `deploy-templates/`, since no page needs them.

### Once the production domain is confirmed

The domain `pailacreation.com` is listed on Facebook but has not been confirmed as the deployment target, so domain-dependent settings are **not active**. When it is confirmed:

1. **Canonical and Open Graph URLs:** add the lines from `deploy-templates/head-snippets.html` to each page's `<head>`, one block per page.
2. **Structured data:** in `index.html`, add `"url"` and `"logo"` to the Organization JSON-LD (the values are in the same snippet file).
3. **Sitemap:** copy `deploy-templates/sitemap.xml` to the site root.
4. **robots.txt:** add the line `Sitemap: https://pailacreation.com/sitemap.xml`.
5. Change `og:image` to an absolute URL (`https://pailacreation.com/assets/images/og-image.jpg`). Some social platforms ignore relative image URLs.

If a different domain is used, replace `pailacreation.com` throughout those templates.

## Contact form

The form has two modes, set by the `data-endpoint` attribute on `<form id="inquiry-form">` in `contact.html`.

- **`data-endpoint=""` (current):** the form checks the fields, then opens a pre-filled email to info@pailacreation.com in the visitor's own email app. The page says clearly that nothing has been sent yet. It also shows the message with a **Copy message** button, in case no email app opens. It never shows a "Message sent" confirmation.
- **`data-endpoint="https://…"`:** the form POSTs `FormData` (name, email, company, service, message) with `Accept: application/json`. While it sends, the button is disabled, so the form cannot be submitted twice. A success message appears only after a 2xx response. If sending fails, the visitor's text stays in the form and an error is announced.

Suitable endpoints include Formspree, Basin, Netlify Forms (via its POST URL), or a small server function. **Never put API keys or email-service secrets in `contact.js`.** Anything in client-side JavaScript is public. Keep secrets on the server or with the form service.

Without JavaScript, the form falls back to the browser's native `mailto:` handling, and the email address is always visible as a link.

Links like `contact.html?service=android` preselect a service. Only the listed option values are accepted, and anything else is ignored.

## Editing notes

- Colours, spacing, type, radii, shadows and motion are CSS custom properties at the top of `styles.css`. The design is a modern product-site system (Framer-style): floating pill navigation, rounded cards with soft shadows, bento grids, illustrative UI mock-ups with real labels, and entrance/scroll animations that respect reduced-motion settings.
- The header and footer are repeated in each HTML file (no templating). If you edit one, edit all four.
- To mark the current page, set `aria-current="page"` on its nav link.
- Reveal animations only apply to elements with the `.reveal` class. They switch on only after JavaScript confirms support, so content is never hidden if scripts fail. They are disabled when the visitor prefers reduced motion.
