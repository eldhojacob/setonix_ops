# Setonix Technologies — Landing Page

A single-page, fully static marketing website for **Setonix Technologies**, a
biomedical company developing fiber-reinforced bioactive composite materials for
bone repair and orthopaedic implant innovation.

The site is plain HTML, a Tailwind-compiled stylesheet, vanilla JavaScript, and
SVG imagery. **There is no backend or server-side runtime** — it is hosted on
GitHub Pages. Node.js is used only as a local build tool to compile the CSS; it
is not required at runtime. The page fades in gently on load and sections
fade/rise into view as you scroll (honoring `prefers-reduced-motion`). The
contact form submits to [Formspree](https://formspree.io) and falls back to a
`mailto:` link until an endpoint is configured.

## Project structure

```
index.html              # full single-page markup
css/styles.css          # compiled Tailwind output — COMMITTED (served as-is)
js/main.js              # nav, mobile menu, scroll reveal, hero fade, form
images/                 # SVG hero / platform / lab / pipeline / about imagery + logo
src/styles/input.css    # Tailwind directives + custom animation/state CSS
tailwind.config.js      # brand palette + content globs
.nojekyll               # disables Jekyll processing on GitHub Pages
```

## Local build

Node.js is only needed to compile the CSS. Install dependencies once:

```bash
npm install
```

Build the stylesheet (one-off, minified):

```bash
npm run build:css
```

Rebuild automatically while editing styles:

```bash
npm run watch:css
```

Both scripts compile `src/styles/input.css` into `css/styles.css`. Commit the
compiled `css/styles.css` whenever styles change — GitHub Pages serves it
directly and does not run any build.

## Preview

Because the site is fully static, you can open it directly or serve the folder:

```bash
npx serve .
```

Or simply open `index.html` in a browser. (Serving the folder is closer to how
GitHub Pages serves it, so relative paths behave identically.)

## Configure the contact form (Formspree)

The form works out of the box via a `mailto:` fallback. To receive submissions
by email instead:

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the form id — the final path segment of your endpoint URL
   (`https://formspree.io/f/XXXXXXX`).
3. In `js/main.js`, replace `XXXXXXX` in the `FORMSPREE_ENDPOINT` constant near
   the top of the file with your form id.

Until `XXXXXXX` is replaced, submitting the form opens a prefilled
`mailto:info@setonixtech.com` message in the visitor's email client, so the form
is never a dead end.

## Deploy to GitHub Pages

1. Rebuild and commit the compiled CSS:
   ```bash
   npm run build:css
   git add css/styles.css
   git commit -m "chore: rebuild compiled CSS"
   ```
2. Push `main`:
   ```bash
   git push origin main
   ```
3. In the repository on GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then select
   branch `main` and folder `/ (root)`. Save.

The site publishes at **https://eldhojacob.github.io/setonix_ops/**.

Notes:
- All asset paths are **relative** (`css/...`, `js/...`, `images/...`) so the
  site works correctly under the GitHub project-pages subpath.
- A `.nojekyll` file is present at the repo root so GitHub Pages serves every
  file verbatim without Jekyll processing.

## Custom domain (later)

To attach a custom domain later (do this only when you have the domain):

1. Add a `CNAME` file at the repo root containing just the domain (e.g.
   `www.setonixtech.com`).
2. Configure DNS:
   - **Apex domain** (`setonixtech.com`): add four `A` records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and
     `185.199.111.153`.
   - **www subdomain**: add a `CNAME` record pointing to
     `eldhojacob.github.io`.
3. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.

No `CNAME` file is committed yet — add it only when the custom domain is ready.
