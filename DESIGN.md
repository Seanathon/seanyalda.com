# Sean Yalda — Portfolio Design System

> Source of truth for visual decisions. Companion to PRODUCT.md.

## Visual theme / mood

Dark-first, editorial, photographic. The default theme (Inkwell) feels like a private monograph — cream type on near-black ground with a single amber accent. Eleven alternate themes shift the mood without changing the structure: cooler (Stoic), warmer (Velvet, Hearth, Norfolk), louder (Synth, Fuchsia), more institutional (Tuxedo).

Light surfaces appear only in dedicated cream sections (Statement, alternating case-study sections, footer-right column, Education on the CV). They are always intentional, not the default.

## Color

OKLCH-based tokens defined per theme. Twelve themes, each declaring the same set of roles. The default is Inkwell.

### Theme tokens (per theme)

| Role | Purpose |
|---|---|
| `--bg` | Primary surface (dark) |
| `--text` | Primary text on dark |
| `--cream` / `--c1` | Light surface + warm neutral |
| `--accent` / `--pop` | Single highlight color |
| `--clay` | Mid-tone surface or text on cream |
| `--surface` / `--atmosphere` | Tinted background gradients |
| `--earth` | Quiet UI labels, captions |
| `--hero-txt` | Eyebrow / label text on cream |
| `--border` | Subtle dividers on dark |
| `--border-l` | Subtle dividers on cream |
| `--text-rgb`, `--bg-rgb`, `--accent-rgb`, `--atmosphere-rgb` | RGB pairs for alpha compositing |

### Color strategy

**Restrained by default** — each theme is one accent ≤10% of surface area. The cream sections are larger, but they're surfaces not accents.

Two themes break Restrained on purpose: **Synth** (drenched neon pink+yellow on deep purple) and **Notebook** (yellow surface, slate text) cross into Committed. That's the craft signal — themes demonstrate range.

### Bans

- No `#000` or `#fff` (always tinted via OKLCH).
- No gradient text. Hero headlines use a single solid `var(--pop)` for the em.
- No glass / backdrop-filter cards except the toolbar popovers (deliberate, low-frequency).

## Typography

### Family

**Geist** by Vercel. Variable-weight axis 100–900, loaded from Google Fonts in `BaseLayout.astro`. Geometric, neutral, editorial — close in spirit to PP Neue Montreal but with the full weight range and a permissive license.

Originally used **PP Neue Montreal** (Regular only, via a third-party Webflow CDN). Swapped to Geist when the design needed real weight contrast. PP Neue Montreal can be reintroduced as a paid family if self-hosted with full weights.

System fallback: `-apple-system, "Helvetica Neue", sans-serif`.

Font features enabled site-wide via `font-feature-settings: "ss01", "ss03", "cv11"` (Geist's stylistic alternates for cleaner numerals and "a"/"g" forms).

### Scale (size)

**Modular scale, 1.2 ratio (minor third), 16px base.** Display headlines use fluid `clamp()` between two scale steps.

| Token | Value | Use |
|---|---|---|
| `--fs-2xs` | 0.579rem (~9px) | Micro credits |
| `--fs-xs` | 0.694rem (~11px) | Eyebrows, nav, sec-label |
| `--fs-sm` | 0.833rem (~13px) | Meta, captions, list secondary |
| `--fs-base` | 1rem (16px) | Body, list primary, default UI |
| `--fs-md` | 1.2rem (~19px) | Large body, subheadings |
| `--fs-lg` | 1.44rem (~23px) | Small headings |
| `--fs-xl` | 1.728rem (~28px) | Section subheading min |
| `--fs-2xl` | 2.074rem (~33px) | Case heading large |
| `--fs-3xl` | 2.488rem (~40px) | Display small |
| `--fs-4xl` | 2.986rem (~48px) | Section display min |
| `--fs-5xl` | 3.583rem (~57px) | Display medium |
| `--fs-6xl` | 4.3rem (~69px) | Display large |
| `--fs-7xl` | 5.16rem (~83px) | Hero large |
| `--fs-8xl` | 6.192rem (~99px) | Hero maximum |

Fluid display tokens that interpolate between two scale steps: `--fs-hero`, `--fs-display`, `--fs-statement`, `--fs-case-h2`, `--fs-footer-display`, `--fs-case-outro`, `--fs-case-outro-p`, `--fs-role-company`, `--fs-work-card`.

### Weight

| Token | Weight | Use |
|---|---|---|
| `--fw-light` | 300 | Reserved (unused currently) |
| `--fw-regular` | 400 | Body, all display headlines (size carries weight visually) |
| `--fw-medium` | 500 | Uppercase labels, eyebrows, small UI titles, `<strong>` |
| `--fw-semibold` | 600 | Interactive: CTAs, nav links, case-points counters |
| `--fw-bold` | 700 | Reserved (unused — too corporate for the editorial register) |

Weight strategy: large display sizes stay at 400 — the size does the work. Mid-tier titles, uppercase labels, and emphasis live at 500. Buttons and active nav at 600. Bold (700) is intentionally unused.

### Line-height

| Token | Value | Use |
|---|---|---|
| `--lh-display` | 1.0 | Massive display headlines |
| `--lh-tight` | 1.1 | Hero / case-h2 (large display) |
| `--lh-snug` | 1.3 | Subheadings, work-card titles, multi-line list items |
| `--lh-normal` | 1.6 | **Body baseline** (set on `body { }`, inherits everywhere) |
| `--lh-loose` | 1.75 | Long-form narrative blocks (statement-body) |

### Letter-spacing

| Token | Value | Use |
|---|---|---|
| `--tracking-tight` | -0.025em | Large display |
| `--tracking-snug` | -0.015em | Mid-tier headings (statement, case-h2) |
| `--tracking-normal` | 0 | Body |
| `--tracking-wide` | 0.06em | Uppercase utility (role-title) |
| `--tracking-wider` | 0.1em | Uppercase labels (hero-tag-text, sec-label-text) |
| `--tracking-widest` | 0.14em | Micro labels (skill-cat-label, rec-type, case-meta-label) |

### Measure

- Body paragraphs cap at 56ch (statement-body) or 65–75ch elsewhere.
- Case-study bullets: 640px max-width on `.role-bullets`.

### Foreground role layering

Color is the third axis of hierarchy. Two base layers per surface:

| Layer | Dark surfaces | Cream surfaces |
|---|---|---|
| Primary text | `rgba(var(--text-rgb), 0.95)` | `var(--bg)` |
| Secondary body | `rgba(var(--text-rgb), 0.78)` (work-card desc) / `0.7` (case-points, role-bullets) | `var(--bg)` at opacity 0.85 |
| Tertiary / labels | `var(--earth)` (theme-tinted) | `var(--hero-txt)` |
| Accent | `var(--accent)` / `var(--pop)` | `var(--clay)` / `var(--accent)` |

## Layout / Spacing

- Page padding: 48px desktop, 24px mobile. Applied uniformly to nav / sections / footer.
- Section block padding: 96px vertical desktop, 64px vertical mobile.
- Major grid breakpoints: 768px (mobile collapse).
- Hero takes 100vh; `--short` variant takes 70vh.
- Statement and case sections use 2-column grid (varies); work cards use auto-fit min 320px columns.
- The `statement-tiles` element is a recurring 4-color signature laid horizontally at the seam between dark and cream.

## Components

### Navigation
- Fixed top nav, transparent until scrolled (`.scrolled` adds tinted bg).
- 12px wordmark left, uppercase 11px links right.
- Active page highlighted with `--accent`.

### Notch toolbar
- Fixed right edge, vertical orientation, rounded only on left side.
- Two icon buttons: palette (theme) and document (CV).
- Popovers open to the left; click-outside and Escape close.
- Mobile: collapses to horizontal pill at bottom.

### Hero
- Full-bleed background photo + dark gradient overlay.
- Headline 100vh / 70vh, em-color accent on the second clause.
- Hero-tag (dot + uppercase tag) above; hero-strip (contact links + CTA) below.

### Statement
- Cream surface. 2-column grid: label + headline left, body paragraphs right.
- Marked by the 4-tile color signature at top.

### Section (generic)
- Three variants: default (dark), cream (light), surface (tinted brand).
- Each has `sec-label` (dot + uppercase) and `display` (large title).

### Work card
- Grid item with autofit minmax. Number, company, role-period, description, "Read case study" CTA.
- Hover lifts a tinted gradient overlay.

### Case study sections
- `case-meta`: 3-column credits/stack/services strip.
- `case-section`: 280px label column + 1fr body column with optional numbered points (`case-points`).
- `case-gallery`: 2fr hero + 1fr stack of two thumbs.
- `case-outro`: large summary paragraph + display-size CTA.

### Photo strip
- Full-bleed image at 48vh (or 99vh for `--tall`).
- Location + photographer credit overlaid bottom-right.

## Motion

- Scroll reveals via GSAP ScrollTrigger; opacity + 28px y-translate.
- Hero entrance is a 1.2s staggered timeline (tag → headline → strip).
- Astro View Transitions enabled site-wide via `<ClientRouter />`.
- Photo strip hover scales image 1.025 over 8s.
- No layout-property animations. No bounce. Ease-out curves only.

## Accessibility notes

- All themes claim to meet AA on primary text combos (audit deferred per roadmap).
- `prefers-reduced-motion` collapses durations to 0.01ms globally.
- Skip-to-content link is missing (roadmap).
