# Requirements Document

## Introduction

Setonix Technologies is a biomedical service company specializing in fiber-reinforced
bioactive composite materials for bone repair and orthopaedic implant innovation. This
feature delivers a single-page, scrollable marketing website that mirrors the provided
design poster exactly. The site is a fully static site (HTML + compiled CSS + vanilla JS)
hosted on GitHub Pages, styled with Tailwind CSS compiled at build time. It emphasizes a
premium, polished feel: content fades and rises into view smoothly as the user scrolls,
and the hero fades in gently on initial page load.

Because GitHub Pages serves static files only (no server-side runtime), the contact form
submits to a third-party form service (Formspree) rather than a custom backend. Node.js is
used only as a local build tool to compile Tailwind CSS; it is not required at runtime.

The design poster establishes the brand aesthetic (blue/teal gradients, rounded cards,
soft shadows, microscopy and composite imagery) and the section order: Hero →
Highlights → Technology Platform → Research & Validation → Development Pipeline →
About → Contact → Footer.

## Requirements

### Requirement 1: Static project foundation with Tailwind build

**User Story:** As a developer, I want a static site project with a Tailwind CSS build
step, so that the page can be hosted on GitHub Pages and styles are maintainable.

#### Acceptance Criteria

1. WHEN the project is installed with `npm install` THEN all build dependencies (Tailwind
   CSS and its tooling) SHALL be resolved from `package.json`.
2. WHEN `npm run build:css` is executed THEN Tailwind SHALL compile source styles into a
   single output stylesheet referenced by the page.
3. WHEN the site is opened by double-clicking the HTML file or via any static file server
   THEN it SHALL render fully without requiring a server-side runtime.
4. WHEN the compiled stylesheet is produced THEN it SHALL be committed to the repository so
   GitHub Pages can serve it directly (no build step runs on GitHub Pages).
5. WHEN the project is opened THEN it SHALL include a Tailwind config that defines the
   brand color palette (blues, teals, gradient stops) used throughout the design.

### Requirement 2: Fixed navigation header

**User Story:** As a visitor, I want a navigation bar with the brand logo and section
links, so that I can orient myself and jump to any section.

#### Acceptance Criteria

1. WHEN the page loads THEN a header SHALL display the Setonix Technologies logo mark and
   wordmark on the left.
2. WHEN the page loads THEN the header SHALL display navigation links: Technology,
   Research, Pipeline, About, Contact, and a highlighted "Partner With Us" button.
3. WHEN a navigation link is clicked THEN the page SHALL smooth-scroll to the
   corresponding section.
4. WHEN the user scrolls down THEN the header SHALL remain accessible (sticky/fixed) at
   the top of the viewport.
5. WHEN viewed on a small screen THEN the navigation SHALL collapse into a mobile-friendly
   menu (hamburger toggle).

### Requirement 3: Hero section with load-in fade

**User Story:** As a visitor, I want an impactful hero section that fades in gently when
the page opens, so that my first impression feels premium.

#### Acceptance Criteria

1. WHEN the page first loads THEN the hero content SHALL fade in smoothly (opacity 0 to 1
   with a subtle upward motion) over roughly 0.6–1.2 seconds.
2. WHEN the hero renders THEN it SHALL show the eyebrow text ("Engineering a Stronger
   Tomorrow"), the headline ("Advanced Bioactive Composites for the Future of
   Orthopaedics") with "Future of Orthopaedics" accented in gradient color, and a
   supporting subheading.
3. WHEN the hero renders THEN it SHALL display two call-to-action buttons: "Explore
   Technology" (primary) and "Contact Us" (secondary).
4. WHEN the hero renders THEN it SHALL show three inline highlights (Stronger Materials,
   Healthier Healing, Brighter Futures) and the hero implant/microscopy imagery on the
   right with the "Materials Science for a Healthier Human Tomorrow" caption.
5. WHEN the hero renders THEN its background SHALL use the blue/teal gradient consistent
   with the poster.

### Requirement 4: Highlights (value cards) row

**User Story:** As a visitor, I want three highlight cards summarizing core strengths, so
that I quickly understand the value proposition.

#### Acceptance Criteria

1. WHEN the highlights section renders THEN it SHALL display three cards: Mechanical
   Performance, Bioactive Integration, and Clinical Adaptability.
2. WHEN each card renders THEN it SHALL include an icon, a title, and a short description
   matching the poster copy.
3. WHEN the section scrolls into view THEN the cards SHALL fade and rise into view
   (staggered where feasible).

### Requirement 5: Technology Platform section

**User Story:** As a visitor, I want to understand the technology platform, so that I
grasp how the composites are engineered.

#### Acceptance Criteria

1. WHEN the section renders THEN it SHALL show the "Our Approach" eyebrow, the "Technology
   Platform" heading, and the descriptive paragraph from the poster.
2. WHEN the section renders THEN it SHALL list four platform capabilities with icons:
   Light-cure & self-cure composite systems, Bioactive fillers, Engineered fibers, and
   Tailored composite design.
3. WHEN the section renders THEN it SHALL display the composite/microscopy imagery and the
   "From Materials to Meaningful Healing" caption.
4. WHEN the section renders THEN it SHALL include the horizontal feature strip (Advanced
   Materials, Bioactive Design, Versatile Platforms, Real-World Impact).
5. WHEN the section scrolls into view THEN its content SHALL fade/rise into view.

### Requirement 6: Research & Validation section

**User Story:** As a visitor, I want to see how the company validates its science, so that
I trust the rigor behind the products.

#### Acceptance Criteria

1. WHEN the section renders THEN it SHALL show the "Evidence Driven" eyebrow, the "Research
   & Validation" heading, the "From the lab to real-world impact" subheading, and the
   descriptive paragraph.
2. WHEN the section renders THEN it SHALL display three cards: Laboratory Testing, In Vitro
   Studies, and Preclinical Evaluation, each with icon, title, and description.
3. WHEN the section renders THEN it SHALL include a "Learn More" action and the laboratory
   imagery.
4. WHEN the section scrolls into view THEN its content SHALL fade/rise into view.

### Requirement 7: Development Pipeline section

**User Story:** As a visitor, I want to see the innovation pipeline, so that I understand
where the company is heading.

#### Acceptance Criteria

1. WHEN the section renders THEN it SHALL show the "Building What's Next" eyebrow, the
   "Development Pipeline" heading, and the descriptive paragraph with a "View Our Pipeline"
   action.
2. WHEN the section renders THEN it SHALL display four pipeline stages in sequence with
   connecting arrows: Current Platform, Antimicrobial Materials, Self-Healing Composites,
   and Next-Generation Systems, each with imagery, title, and short description.
3. WHEN the section renders THEN it SHALL include the "Continuous Innovation for Brighter
   Tomorrows" caption.
4. WHEN the section scrolls into view THEN its content SHALL fade/rise into view.

### Requirement 8: About Setonix section

**User Story:** As a visitor, I want to learn about the company's mission, so that I
understand who they are.

#### Acceptance Criteria

1. WHEN the section renders THEN it SHALL show the "About Setonix" eyebrow, the
   "Translating Science into Better Outcomes" heading, and the descriptive paragraph.
2. WHEN the section renders THEN it SHALL include a "Learn More About Us" action, the
   landscape "Bold Science, Real Impact, Healthier Lives" image panel, and the
   "Collaborate With Us / Partner With Us" gradient panel.
3. WHEN the section scrolls into view THEN its content SHALL fade/rise into view.

### Requirement 9: Contact section with form

**User Story:** As a visitor, I want to send a message and see contact details, so that I
can reach out about partnerships.

#### Acceptance Criteria

1. WHEN the section renders THEN it SHALL show the "Let's Build a Healthier Tomorrow"
   eyebrow, the "Get in Touch" heading, and the supporting text.
2. WHEN the section renders THEN it SHALL display a form with Name, Email, and Message
   fields and a "Send Message" button.
3. WHEN the section renders THEN it SHALL display contact details: email
   (info@setonixtech.com), a LinkedIn link, and a global collaboration line.
4. WHEN the user submits the form with valid Name, Email, and Message THEN the browser
   SHALL validate the fields and show a success confirmation.
5. IF a required field is empty or the email is malformed THEN the form SHALL show a
   validation message and SHALL NOT submit.
6. WHEN the form is submitted THEN it SHALL POST to a third-party form service (Formspree)
   endpoint whose URL is configured in one place, so that submissions are delivered by
   email without any custom backend.
7. IF the Formspree endpoint is not yet configured (placeholder present) THEN the form
   SHALL fall back gracefully to a `mailto:` link so the site is still functional before
   setup.

### Requirement 10: Footer

**User Story:** As a visitor, I want a footer with brand and navigation, so that I can
re-navigate and see legal info.

#### Acceptance Criteria

1. WHEN the footer renders THEN it SHALL show the Setonix Technologies logo, the repeated
   navigation links, the "Building Better Bones for Brighter Tomorrows" tagline, and the
   "© 2024 Setonix Technologies. All rights reserved." copyright.

### Requirement 11: Scroll-reveal animation system

**User Story:** As a visitor, I want sections to animate in as I scroll, so that the page
feels alive and high-end.

#### Acceptance Criteria

1. WHEN a section or card enters the viewport THEN it SHALL transition from hidden
   (reduced opacity, slight downward offset) to visible (full opacity, natural position).
2. WHEN an element has already been revealed THEN it SHALL remain visible and SHALL NOT
   re-hide on scroll-up.
3. WHEN the browser signals `prefers-reduced-motion` THEN animations SHALL be disabled and
   content SHALL render immediately visible.
4. WHEN scroll reveal is implemented THEN it SHALL use IntersectionObserver (no heavy
   animation libraries required).

### Requirement 12: GitHub Pages deployment

**User Story:** As the site owner, I want the site hosted for free on GitHub Pages, so that
it is publicly accessible without managing a server.

#### Acceptance Criteria

1. WHEN the repository is configured for GitHub Pages THEN the published site SHALL serve
   `index.html` and all static assets (CSS, JS, images) from the repository root (or
   `/docs`), with correct relative asset paths.
2. WHEN assets are referenced THEN they SHALL use relative paths so the site works under a
   project-pages subpath (e.g. `https://<user>.github.io/<repo>/`).
3. WHEN the repository root includes a `.nojekyll` file THEN GitHub Pages SHALL serve all
   files without Jekyll processing.
4. WHEN the project is set up THEN it SHALL include documentation (README) describing how
   to build the CSS, configure the Formspree endpoint, and enable GitHub Pages.
5. WHEN the compiled CSS and all assets are committed THEN the live GitHub Pages site SHALL
   match the local site exactly (no runtime build required).

### Requirement 13: Responsive, accessible, pixel-faithful layout

**User Story:** As a visitor on any device, I want the page to look like the poster and be
usable, so that the experience is consistent and inclusive.

#### Acceptance Criteria

1. WHEN viewed on desktop THEN the layout, section order, colors, and typography SHALL
   closely match the provided poster.
2. WHEN viewed on tablet and mobile THEN multi-column sections SHALL reflow into stacked
   layouts without horizontal overflow.
3. WHEN the page is navigated by keyboard THEN interactive elements SHALL be focusable with
   visible focus indicators.
4. WHEN images render THEN they SHALL include descriptive alt text, and color contrast for
   text SHALL meet WCAG AA where feasible.
