# Clear Cloud Software — Design System

Papercut sky. One metaphor carried everywhere: **we take the heavy weather,
the client gets clear skies.** Every surface is a flat sheet of cut paper
floating in a calm blue gradient, with editorial grotesque type on top.

This document covers the existing landing page and extends the system to
**article pages** and the **slide deck system**.

---

## 1. Voice

- Confident, dry, short. "You bring the idea. We ship the software."
- Weather metaphor is allowed once per surface, never twice in a row.
- Sentence fragments welcome. Exclamation marks are not.
- Headlines state a trade: problem in ink, payoff in steel blue.
  ("Complex problems. **Clear skies.**")

## 2. Tokens

Declared in `app/globals.css` under `:root` + `@theme inline`
(Tailwind v4 — no JS config; add new tokens there).

| Token | Value | Use |
|---|---|---|
| `--background` | `#dde8f3` | page ground (gradient, see below) |
| `--foreground` | `#22272e` | ink — headings, body on paper |
| `--steel` | `#4a6d94` | second headline line, accents, numbers |
| `--navy` | `#2e4a68` | buttons, rules, eyebrow text |
| `--ink-soft` | `#5a6b7d` | secondary text, labels |
| paper white | `#ffffff → #dce6f1` | cloud/sheet face gradient (top→bottom) |
| board layers | `#e2ebf4`, `#b3c7dc` | stacked backing sheets |
| band tones | `#d3e0ed`, `#a5c0da` | papercut horizon strips |

**Sky**: `linear-gradient(180deg, #e9eff7 0%, #d3e0ee 55%, #b6cde4 100%)`
plus a 24px white dot grid at 30% opacity (paper grain). Single daylight
theme by design — no dark mode.

**Shadows** (the system's depth language — never use borders for depth):
- Sheet on sky: `drop-shadow(0 12px 14px rgba(34,55,82,0.25))`
- Lobe on lobe (inside a cloud): `feDropShadow dy=7 blur=6 #7e9bb9 @ 45%`, clipped to the silhouette
- Band on band: `drop-shadow(0 -7px 9px rgba(34,55,82,0.22))`
- Button lift: flat color block, no radius, darkens on hover

## 3. Type

| Role | Font | Notes |
|---|---|---|
| Display | **Oswald** (`--font-display`) | headings, semibold, tight leading `1.02` |
| Body | **Geist** (`--font-sans`) | paragraphs, UI |
| Label | **Geist Mono** (`--font-mono`) | eyebrows, numbers, meta — always uppercase, tracked `0.2em–0.3em` |

Landing scale: H1 `clamp(3rem, 8vw, 7rem)`. Eyebrow pattern: 40px hairline
(`h-px bg-navy`) + mono caps label.

## 4. Paper component library (in `app/page.tsx`, extract when reused)

- **`CardboardCloud`** — SVG cloud of circle lobes + stadium slab. Three
  stacked sheets offset on the x-axis only (bottoms stay aligned — a
  vertical offset reads as a dirty line under the flat base). Face gradient
  per lobe + per-lobe shadow clipped inside the silhouette. `overflow:
  visible` on the SVG is mandatory or the shadow clips into a "square
  image". Needs a unique `uid` per instance (SVG filter/clip ids).
- **`ScallopBand`** — full-width wavy strip, `preserveAspectRatio="none"`,
  upward drop shadow. Stack 2–3 (deep → light → white) to build a horizon;
  the white one merges into a white content sheet below. `flip` mirrors the
  wave to avoid visible repetition.
- **`PaperSun`** — repeating radial rings + white glow. At most one per
  surface, tucked behind a cloud.

Layering rule: **nearer = lower on screen = drawn on top.** Decorations sit
at `z-0`, content at `z-10`. Big clouds may bleed off-canvas and sink into
the horizon bands.

## 5. Motion

CSS only. Two animations exist; do not add more kinds:
- `drift` — clouds sway ±1.5rem over ~30s.
- `rise-in` / stagger — content fades up once on load, `--d` delays in
  0.15s steps.
Everything respects `prefers-reduced-motion: reduce`. No scroll-jacking, no
parallax, no JS animation libraries.

---

## 6. Article pages (`/articles/*`)

Articles are **mostly reading**; the papercut world frames the text, it
never interrupts it.

**Layout**
- Same header as landing (logo + wordmark, email, navy button). Sticky not
  required; articles may scroll (the no-scroll rule is landing-only).
- Hero: sky gradient, eyebrow (`ARTICLE · 12 MIN · 2026-08-29` in mono
  caps), Oswald title `clamp(2.2rem, 5vw, 4rem)`, optional one-line steel
  subtitle. One small `CardboardCloud` top-right, `opacity-70`. No sun.
- Body sits on a **white paper sheet** that starts with a `ScallopBand`
  (white) a third of the way down and runs to the footer — the article is
  literally written on the front sheet of the horizon.
- Measure: `max-w-[42rem]` centered. Body `1.0625rem/1.75` Geist, ink on
  white. Generous `py`.

**Article elements**
- H2: Oswald semibold, preceded by mono-caps kicker number (`01`, `02` — same
  pattern as the capabilities strip).
- Pull quote: small paper card — white sheet, x-offset backing layer,
  sheet shadow, steel Oswald text. Slight `-1deg` rotation allowed here only.
- Code blocks: navy `#2e4a68` sheet, Geist Mono, pale text, same sheet
  shadow, no radius (cut corners are square in this system).
- Images/figures: square corners, sheet shadow, mono caption below.
- End of article: scallop divider, then "More clear skies" — 2–3 article
  cards (white sheets, kicker + Oswald title + one-line teaser).

**Restraint budget per article page:** max one cloud, one horizon, zero
suns, zero drifting elements inside the reading column.

## 7. Slide deck system (16:9)

Slides are the landing page split into frames: big Oswald statements on
sky, content on paper sheets, horizon anchoring the bottom.

**Constants on every slide**
- Sky gradient + dot grain background.
- Footer strip: mono caps, `logo mark · deck title` left, slide number
  (`04 / 18`, steel) right.
- Type in viewport units so decks scale: display `6–9vw` (title slides),
  H2 `4vw`, body `1.6–1.8vw`, labels `1vw` mono caps. Body text ≥ `1.4vw`,
  never below.

**Masters**
1. **Title** — landing hero recipe: eyebrow + two-line Oswald statement
   (ink / steel), giant cloud behind text bleeding off-left, horizon bands
   at bottom, sun optional. The only slide that may use the sun.
2. **Section break** — number huge in steel (`01`), section name in ink,
   one small cloud. Horizon rises higher (~40% of frame) to signal a chapter.
3. **Content** — eyebrow + H2 top-left; body in one or two columns ON a
   white sheet with scalloped top edge (band + sheet, exactly like the
   landing footer). Max 4 bullets or 1 diagram per slide.
4. **Quote / stat** — one white paper card centered on open sky, Oswald
   steel for the number or quote, mono attribution. Nothing else.
5. **Closing** — "Clear skies." + contact email + navy button block.
   Mirror of the title slide with the cloud on the right.

**Slide rules**
- One idea per slide; if a bullet wraps twice, it's a new slide.
- Decorations never overlap text — clouds live in whitespace, text lives
  on sheets or open sky.
- Charts: ink + steel + navy only, white sheet background, mono axis labels,
  no gridlines heavier than `rgba(34,55,82,0.15)`.
- Static export (PDF) must lose nothing: drift/rise-in are web-only sugar.

## 8. Don'ts

- No rounded corners on content blocks (paper is cut straight; only cloud
  lobes and pills are round).
- No borders for depth — depth is always a shadow between sheets.
- No dark mode, no purple, no gradients on type.
- No new fonts, no italics in Oswald, no second metaphor.
- Never scale a cloud so text sits on its shadowed edge — text sits on the
  flat face or on open sky.
