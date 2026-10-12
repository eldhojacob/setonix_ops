# Implementation Plan — Setonix Technologies landing page (tasks 1–3)

Scope: scaffold the fully-static GitHub Pages site, define the Tailwind style layer, and
build the HTML skeleton + fixed nav header. This plan covers ONLY tasks 1, 2, and 3 from
`.kiro/specs/setonix-landing-page/tasks.md`. Tasks 4–16 are out of scope.

## Context established during exploration

- Repo root `c:\Users\eldho\kiro_projects\Sentonix` is greenfield: only `.kiro/` (specs)
  and `settings/mcp.json` exist. No `package.json`, README, AGENTS.md, CONTRIBUTING, or
  `.kiro/steering/*` — so the three spec files are the authoritative design.
- Toolchain present: Node v24.15.0, npm 11.12.1 (verified via `node --version` / `npm --version`).
- Decision — Tailwind CSS v3 CLI (not v4): the spec and context mandate "current stable
  Tailwind CSS v3 (CLI build)". Latest v3 is `tailwindcss@3.4.19` (verified via `npm view
  tailwindcss@3 version`); pin `^3.4.19`. Companion `postcss@^8.5.29`, `autoprefixer@^10.6.1`
  (verified via `npm view`).
- Decision — fully static, NO server. Node is build-time only (compiles Tailwind CSS). No
  `server.js`, no express, no `start` script. Publishable files live at the REPO ROOT
  (`index.html`, `css/styles.css`, `js/main.js`, `images/`), per design.md "Project structure".
- Decision — RELATIVE asset paths everywhere (`css/...`, `js/...`, `images/...`) so the site
  resolves under a GitHub project-pages subpath; custom domain comes later.
- Decision — the compiled `css/styles.css` is committed (GitHub Pages runs no build), so it
  must NOT be gitignored.
- Brand palette (design.md "Styling"): brand {50:#eef6ff,100:#d9ecff,300:#7cc3f0,400:#4aa8e6,
  500:#2d8fd6,600:#1f6fb2,700:#184f86}, teal {300:#5fd3d0,400:#35bdc0,500:#15a7ab}.
- Windows/PowerShell shell. On Windows the Tailwind CLI binary resolves as
  `npx tailwindcss ...`; use that form in the npm scripts so it works cross-platform.

---

## TASK 1 — Scaffold the static project with a Tailwind build

- [ ] 1. Create `package.json` at the repo root.
      Fields: name `setonix-landing-page`, version `1.0.0`, `private: true`, `license` as
      appropriate. Scripts ONLY — no start/server: `"build:css": "tailwindcss -i
      ./src/styles/input.css -o ./css/styles.css --minify"` and `"watch:css": "tailwindcss
      -i ./src/styles/input.css -o ./css/styles.css --watch"`. devDependencies:
      `tailwindcss ^3.4.19`, `postcss ^8.5.29`, `autoprefixer ^10.6.1`. No dependencies
      (no express).
      Files: `package.json`
      Verify: `npm pkg get scripts` returns the two css scripts and no server/start script;
      `npm pkg get devDependencies` lists tailwindcss, postcss, autoprefixer. (Install itself
      is verified in task 2.)

- [ ] 2. Create `tailwind.config.js` at the repo root.
      `module.exports` with `content: ["./index.html", "./js/**/*.js"]`, and
      `theme.extend.colors` holding the exact `brand` and `teal` palettes listed in the
      context above. `plugins: []`.
      Files: `tailwind.config.js`
      Verify: `node -e "const c=require('./tailwind.config.js'); if(c.theme.extend.colors.brand['700']!=='#184f86'||c.theme.extend.colors.teal['500']!=='#15a7ab'){process.exit(1)} console.log('ok')"`
      prints `ok` (confirms the config loads and the palette values are correct).

- [ ] 3. Create `postcss.config.js` at the repo root.
      `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`.
      Files: `postcss.config.js`
      Verify: `node -e "require('./postcss.config.js'); console.log('ok')"` prints `ok`.

- [ ] 4. Create `src/styles/input.css` with the Tailwind directives and empty layer blocks.
      Contents: `@tailwind base;` `@tailwind components;` `@tailwind utilities;` followed by
      an empty `@layer components { }` and an empty `@layer utilities { }` block to be filled
      in task 2. (Keep them present so task 2 only adds rules, never restructures.)
      Files: `src/styles/input.css`
      Verify: file exists and contains the three `@tailwind` directives plus the two empty
      `@layer` blocks (read the file to confirm). Compilation is verified at the end of task 2.

- [ ] 5. Create `.gitignore` and an empty `.nojekyll` at the repo root.
      `.gitignore` ignores `node_modules/` (and OS/editor noise such as `.DS_Store`) but must
      NOT list `css/styles.css` — that file is committed. `.nojekyll` is an empty file that
      disables Jekyll on GitHub Pages.
      Files: `.gitignore`, `.nojekyll`
      Verify: `.gitignore` contains `node_modules` and does not contain `styles.css`; a
      zero-byte `.nojekyll` exists at the repo root (`Get-Item .nojekyll` succeeds).

- [ ] 6. Mark task 1 complete in the spec task list.
      Change the task-1 checkbox from `- [ ] 1.` to `- [x] 1.` in the tasks file.
      Files: `.kiro/specs/setonix-landing-page/tasks.md`
      Verify: the task-1 line reads `- [x] 1. Scaffold the static project with a Tailwind build`.

---

## TASK 2 — Define the Tailwind style layer (palette, gradients, components, animations)

Depends on task 1 (needs `src/styles/input.css`, `tailwind.config.js`, `postcss.config.js`,
and `package.json`). All edits in this task go into `src/styles/input.css`.

- [ ] 7. Add the gradient/utility classes to the `@layer utilities` block in `src/styles/input.css`.
      - `.bg-hero-gradient` — a diagonal (`to bottom right`) blue→teal wash using the brand
        and teal palette stops (e.g. brand-50/brand-100 → teal-300), suitable as a full-section
        background.
      - `.bg-brand-gradient` — a blue→teal gradient (e.g. brand-500 → teal-500) for buttons and
        panels.
      - `.text-gradient` — gradient-clipped text: apply `.bg-brand-gradient`-style background with
        `background-clip:text; -webkit-background-clip:text; color:transparent;
        -webkit-text-fill-color:transparent;`.
      Files: `src/styles/input.css`
      Verify: covered by the build in step 10 (classes compile into `css/styles.css`).

- [ ] 8. Add the component classes to the `@layer components` block in `src/styles/input.css`.
      Use Tailwind `@apply` with the brand palette:
      - `.btn-primary` — pill button (`inline-flex items-center rounded-full px-6 py-3
        font-semibold text-white`) using `.bg-brand-gradient`, with hover/focus-visible states.
      - `.btn-secondary` — pill outline/ghost button (rounded-full, brand-600 text, border,
        hover fill).
      - `.card` — `bg-white rounded-2xl shadow-sm border border-slate-100 p-6` (soft shadow,
        subtle border).
      - `.eyebrow` — small uppercase tracked label (`text-xs font-semibold uppercase
        tracking-widest text-teal-500`).
      - `.section` — vertical padding + centered max-width container (`mx-auto max-w-7xl px-4
        sm:px-6 lg:px-8 py-16 md:py-24`).
      Files: `src/styles/input.css`
      Verify: covered by the build in step 10.

- [ ] 9. Add the reveal + load-in animation CSS to `src/styles/input.css` (outside the
      `@layer` blocks, as plain CSS so it is never purged).
      - `[data-reveal] { opacity:0; transform:translateY(24px); transition:opacity .6s
        ease-out, transform .6s ease-out; }`
      - `[data-reveal].is-visible { opacity:1; transform:none; }`
      - `@media (prefers-reduced-motion: reduce) { [data-reveal] { opacity:1; transform:none;
        transition:none; } }`
      - Hero load-in fade driven by a `.is-loaded` class on `<body>`: hero children start at
        `opacity:0; transform:translateY(12px)` and transition to visible when
        `body.is-loaded` is present (~0.8s). Include the reduced-motion override for these too.
      Files: `src/styles/input.css`
      Verify: covered by the build in step 10 (plain CSS is emitted verbatim).

- [ ] 10. Install dependencies and compile the stylesheet.
      Run `npm install`, then `npm run build:css`. This generates `css/styles.css`.
      Files: generates `css/styles.css` (and `node_modules/`, `package-lock.json`).
      Verify: `npm install` exits 0; `npm run build:css` exits 0; `css/styles.css` exists and
      is non-empty — PowerShell: `(Get-Item css/styles.css).Length -gt 0` returns `True`.
      Also confirm the custom classes landed:
      `Select-String -Path css/styles.css -Pattern 'bg-hero-gradient|btn-primary|data-reveal'`
      returns matches.

- [ ] 11. Mark task 2 complete in the spec task list.
      Change the task-2 checkbox from `- [ ] 2.` to `- [x] 2.`.
      Files: `.kiro/specs/setonix-landing-page/tasks.md`
      Verify: the task-2 line reads `- [x] 2. Define the Tailwind style layer ...`.

---

## TASK 3 — Create the HTML skeleton and fixed navigation header

Depends on tasks 1–2 (needs the compiled `css/styles.css` and the component/utility classes
so the header is styled). Content for the sections is deliberately left empty — this task is
the skeleton + header only (tasks 4–10 fill the sections later).

- [ ] 12. Create the stub `js/main.js` so the deferred script reference resolves.
      Minimal placeholder — a top comment noting behavior is implemented in task 12, no
      runtime logic yet (an empty IIFE or just a comment is fine).
      Files: `js/main.js`
      Verify: file exists; `node --check js/main.js` exits 0 (valid JS, no syntax error).

- [ ] 13. Create `index.html` at the repo root — document head + ordered empty section
      skeleton.
      Head: `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width,
      initial-scale=1">`, `<title>Setonix Technologies</title>`, `<link rel="stylesheet"
      href="css/styles.css">`, and `<script src="js/main.js" defer></script>` — all RELATIVE
      paths. Body contains the ordered EMPTY placeholders in poster order, each a labelled
      empty container (HTML comment + a minimal hidden/visually-light heading placeholder is
      fine): `<section id="hero">`, `<section id="highlights">`, `<section id="technology">`,
      `<section id="research">`, `<section id="pipeline">`, `<section id="about">`,
      `<section id="contact">`, and a `<footer>`. No section content beyond the placeholder.
      Files: `index.html`
      Verify: the file parses as a single root document and contains exactly the ids
      `hero, highlights, technology, research, pipeline, about, contact` in that order plus a
      `<footer>` — confirm with
      `Select-String -Path index.html -Pattern 'id="(hero|highlights|technology|research|pipeline|about|contact)"'`
      (seven matches in order) and that `href="css/styles.css"` and `src="js/main.js"` use
      relative paths (no leading `/` or `http`).

- [ ] 14. Build the fixed navigation header in `index.html` and style it with the brand classes.
      Add a `header` fixed/sticky to the top (`fixed top-0 inset-x-0 z-50` with a background
      so content scrolls under it). Left: a logo mark (simple SVG or styled badge) + the
      "Setonix Technologies" wordmark. Center/right nav links — Technology, Research, Pipeline,
      About, Contact — as anchors to `#technology`, `#research`, `#pipeline`, `#about`,
      `#contact`. A highlighted "Partner With Us" button using `.btn-primary`. A mobile
      hamburger `<button>` with `aria-expanded="false"` and an `aria-controls` pointing at the
      mobile menu container (JS wiring is task 12 — markup only here). Apply the `.section`
      container, `.eyebrow`/brand colors as appropriate so the header looks polished.
      Files: `index.html`
      Verify: `Select-String -Path index.html -Pattern 'Partner With Us'` matches; the five
      nav anchors resolve to the five section ids (grep for `href="#technology"` … `href="#contact"`);
      the hamburger button carries `aria-expanded`. Then rebuild to confirm no new classes were
      left unpurged: `npm run build:css` exits 0 and `css/styles.css` stays non-empty. Finally,
      open `index.html` in a browser (or `npx serve .`) and confirm the fixed header renders
      with the logo, five links, and the "Partner With Us" button, and that the empty section
      placeholders stack vertically with no console errors.

- [ ] 15. Mark task 3 complete in the spec task list.
      Change the task-3 checkbox from `- [ ] 3.` to `- [x] 3.`.
      Files: `.kiro/specs/setonix-landing-page/tasks.md`
      Verify: the task-3 line reads `- [x] 3. Create the HTML skeleton and fixed navigation header`.

---

## Notes / assumptions

- The two `npm run build:css` runs (steps 10 and 14) are the real verification; because the
  Tailwind `content` globs point at `index.html` and `js/**/*.js`, any utility class used in
  the header must survive purge — step 14 rebuilds after the HTML exists to prove this.
- Section placeholders are intentionally empty; do NOT add hero/section copy, imagery, JS
  behavior, or the contact form here — those are tasks 4–16 and out of this slice's scope.
- `package-lock.json` and `node_modules/` are generated by `npm install`; `node_modules/` is
  gitignored (step 5), `package-lock.json` is committed.
