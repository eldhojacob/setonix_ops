# Implementation Plan

- [x] 1. Scaffold the static project with a Tailwind build
  - Create `package.json` with scripts: `build:css` (tailwind build input→output,
    minified) and `watch:css` (tailwind --watch). No runtime/server scripts.
  - Add devDependencies: tailwindcss, postcss, autoprefixer.
  - Create `tailwind.config.js` with the brand/teal color palette, gradient-friendly theme
    extensions, and content globs pointing at `index.html` and `js/**/*.js`.
  - Create `postcss.config.js` and `src/styles/input.css` with `@tailwind` directives plus
    empty `@layer components`/`@layer utilities` blocks to fill later.
  - Create `.gitignore` (ignore `node_modules`; do NOT ignore `css/styles.css` — it is
    committed) and an empty `.nojekyll` at the repo root.
  - _Requirements: 1.1, 1.2, 1.5, 12.3_

- [x] 2. Define the Tailwind style layer (palette, gradients, components, animations)
  - In `src/styles/input.css`, add `@layer utilities` for `.bg-hero-gradient`,
    `.bg-brand-gradient`, `.text-gradient`.
  - Add `@layer components` for `.btn-primary`, `.btn-secondary`, `.card`, `.eyebrow`,
    `.section`.
  - Add the `[data-reveal]` / `.is-visible` reveal CSS, the `prefers-reduced-motion`
    override, and the hero `is-loaded` fade-in styles.
  - Run `npm install` then `npm run build:css` and confirm `css/styles.css` is generated.
  - _Requirements: 1.2, 1.5, 3.1, 11.1, 11.3_

- [x] 3. Create the HTML skeleton and fixed navigation header
  - Create `index.html` at the repo root with document head (title, meta viewport,
    `<link href="css/styles.css">`, deferred `<script src="js/main.js">`) using RELATIVE
    asset paths, and the ordered empty `<section>` placeholders with ids.
  - Build the fixed `header`: logo mark + wordmark, nav links (Technology, Research,
    Pipeline, About, Contact), "Partner With Us" button, and a hamburger button for mobile.
  - _Requirements: 2.1, 2.2, 2.4, 2.5, 12.1, 12.2, 13.1_

- [x] 4. Build the Hero section
  - Add eyebrow, headline with gradient-accented "Future of Orthopaedics" span, subheading,
    "Explore Technology" + "Contact Us" CTAs.
  - Add the three inline highlights (Stronger Materials, Healthier Healing, Brighter
    Futures) and the hero imagery with the "Materials Science for a Healthier Human
    Tomorrow" caption.
  - Apply `.bg-hero-gradient` and mark hero children for the load-in fade.
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 13.1_

- [x] 5. Build the Highlights value-cards row
  - Add three `.card`s (Mechanical Performance, Bioactive Integration, Clinical
    Adaptability) each with icon, title, description from poster copy.
  - Add `data-reveal` with staggered `data-reveal-delay`.
  - _Requirements: 4.1, 4.2, 4.3_

- [x] 6. Build the Technology Platform section
  - Add "Our Approach" eyebrow, "Technology Platform" heading, paragraph.
  - Add four capability items (Light-cure & self-cure, Bioactive fillers, Engineered
    fibers, Tailored composite design) with icons.
  - Add composite imagery + "From Materials to Meaningful Healing" caption and the
    horizontal feature strip (Advanced Materials, Bioactive Design, Versatile Platforms,
    Real-World Impact). Mark with `data-reveal`.
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7. Build the Research & Validation section
  - Add "Evidence Driven" eyebrow, heading, "From the lab to real-world impact" subheading,
    paragraph, and "Learn More" action.
  - Add three cards (Laboratory Testing, In Vitro Studies, Preclinical Evaluation) and the
    lab imagery. Mark with `data-reveal`.
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 8. Build the Development Pipeline section
  - Add "Building What's Next" eyebrow, heading, paragraph, "View Our Pipeline" action.
  - Add four stages with connecting arrows (Current Platform, Antimicrobial Materials,
    Self-Healing Composites, Next-Generation Systems) each with imagery, title,
    description, and the "Continuous Innovation for Brighter Tomorrows" caption. Mark with
    `data-reveal`.
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 9. Build the About Setonix section
  - Add "About Setonix" eyebrow, "Translating Science into Better Outcomes" heading,
    paragraph, "Learn More About Us" action.
  - Add the landscape "Bold Science, Real Impact, Healthier Lives" panel and the
    Collaborate/Partner gradient panel with "Partner With Us" button. Mark with
    `data-reveal`.
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 10. Build the Contact section and footer
  - Add "Let's Build a Healthier Tomorrow" eyebrow, "Get in Touch" heading, supporting
    text, the form (Name, Email, Message, Send Message) with proper labels/aria and a
    `mailto:` no-JS fallback `action`, and the contact details (email, LinkedIn, global
    collaboration line).
  - Build the `footer`: logo, nav links, "Building Better Bones for Brighter Tomorrows"
    tagline, "© 2024 Setonix Technologies. All rights reserved." Mark with `data-reveal`.
  - _Requirements: 9.1, 9.2, 9.3, 10.1_

- [x] 11. Add placeholder imagery and the logo
  - Add images to `images/` for hero, platform/microscopy, lab, four pipeline stages, the
    mountain landscape, and the logo mark, each wired with descriptive `alt` text. Use
    visually consistent placeholders where exact brand assets are unavailable. Reference
    them with relative paths.
  - _Requirements: 13.4, 12.1, 12.2_

- [x] 12. Implement the interactive JavaScript (`js/main.js`)
  - Hero load-in fade: add `is-loaded` after first paint (guarded by reduced-motion).
  - Scroll reveal: IntersectionObserver over `[data-reveal]`, add `is-visible` once,
    apply per-element delay, reduced-motion fallback marks all visible.
  - Smooth-scroll nav with header offset; sticky-header `scrolled` class on scroll.
  - Mobile menu toggle with `aria-expanded`.
  - _Requirements: 2.3, 2.4, 2.5, 3.1, 11.1, 11.2, 11.3, 11.4_

- [x] 13. Wire the Formspree contact form with mailto fallback
  - Add a `FORMSPREE_ENDPOINT` constant (placeholder `https://formspree.io/f/XXXXXXX`).
  - Validate Name/Email/Message, show inline errors, block invalid submits.
  - If configured, `fetch(FORMSPREE_ENDPOINT, POST)` with `Accept: application/json`, show
    success on 2xx or a retry-able error otherwise. If still placeholder, open a prefilled
    `mailto:info@setonixtech.com`.
  - _Requirements: 9.4, 9.5, 9.6, 9.7_

- [x] 14. Responsive, accessibility, and reduced-motion polish
  - Verify stacked reflow with no horizontal overflow at 375px, 768px, 1280px.
  - Ensure visible keyboard focus on all interactive elements and AA-level text contrast.
  - Confirm `prefers-reduced-motion` disables all animations.
  - _Requirements: 13.2, 13.3, 13.4, 11.3_

- [x] 15. Write the README and GitHub Pages / Formspree setup docs
  - Document: `npm install` → `npm run build:css`, how to get a Formspree form id and set
    `FORMSPREE_ENDPOINT`, how to commit the compiled CSS, push, and enable GitHub Pages
    (Settings → Pages → main / root), and the resulting `https://<user>.github.io/<repo>/`
    URL.
  - _Requirements: 12.4_

- [x] 16. Final build, local verification, and deployment prep
  - Run `npm run build:css`; serve the folder locally (e.g. `npx serve .`) and manually
    verify section order, content, hero fade-in, scroll reveals, nav, mobile menu, and the
    form against the poster.
  - Confirm `css/styles.css`, `.nojekyll`, images, and `js/main.js` are all committed with
    relative paths, ready for GitHub Pages.
  - Clean up any temporary files.
  - _Requirements: 1.2, 1.3, 1.4, 11.1, 11.2, 12.1, 12.5, 13.1_
