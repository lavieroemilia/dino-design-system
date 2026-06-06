# Dino Design System — Claude Code Rules

You're working on the documentation site for **Dino**, a design system built for a gamified learning app. The stack is **Astro + vanilla CSS**, with design tokens exported from Figma into `global.css`.

---

## Project structure

```
src/
  layouts/   DocLayout.astro          ← shared layout, sidebar, TOC
  pages/
    overview.astro                    ← landing page, lives under Getting Started
    tokens/
      colors.astro                    ← reads from tokens_tokens.json
      typography.astro                ← reads from tokens_tokens.json
      spacing.astro                   ← reads from tokens_tokens.json
    components/[name].astro           ← one file per component
public/
  styles/
    global.css                        ← source of truth for all tokens
tokens_tokens.json                    ← raw Figma token export (read-only reference)
WRITING_GUIDE.md                      ← voice, tone, page structure rules
```

---

## Sidebar (DocLayout.astro)

Two groups, always in this order: **Getting Started** and **Components**.

**Getting Started** is hardcoded:
```
Getting Started
  Overview       → /overview
  Colors         → /tokens/colors
  Typography     → /tokens/typography
  Spacing        → /tokens/spacing
```

**Components** is dynamic — auto-discovers every `.astro` file inside `src/pages/components/` using `Astro.glob`. Never hardcode component links. Use this exact pattern:

```js
const pages = await Astro.glob('../pages/components/*.astro');

const componentItems = pages
  .map(page => {
    const slug = page.file.split('/').pop()?.replace('.astro', '') ?? '';
    const label = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return { label, href: `/components/${slug}` };
  })
  .sort((a, b) => a.label.localeCompare(b.label));
```

⚠️ Never add TypeScript type annotations inline inside `.map()` or `.sort()` — esbuild will throw a parse error.

---

## Token pages (src/pages/tokens/)

Colors, Typography, and Spacing each have their own page. They read data from `tokens_tokens.json` — never duplicate token values manually. These pages document the token system visually; they don't define it.

- `colors.astro` — renders the full color palette with scales and semantic roles.
- `typography.astro` — renders the type scale with live samples.
- `spacing.astro` — renders the spacing scale.

---

## Tokens — always, no exceptions

- Every color, size, spacing, radius, and shadow must come from `global.css`.
- Three layers: **Brand → Semantic → Component**. Components only consume the Component layer.
- Never use hex codes, `px` values, or magic numbers directly in component or page styles.
- A component that reaches past the semantic layer to raw tokens is a bug, not a feature.

---

## overview.astro — what this page is and isn't

The entry point to the docs. A **system reference**, not a product pitch.

**Include:**
- A hero with version chips. Minimal — no paragraphs of intro copy.
- **Principles** section: exactly 4 cards in a 2×2 grid. Each card covers one core design belief. The four principles are:
  1. **Details matter** — micro-decisions (shadows, pressed states, gradients) that individually go unnoticed but together make the product feel crafted.
  2. **Feedback is constant** — every action gets a visual reaction. Hover, pressed, disabled, error, success all have distinct styles.
  3. **One source of truth** — no hardcoded values. Every color, size, and shadow flows from tokens. Change the token, change everything.
  4. **Dark by default** — a dark interface that reduces eye strain in long or late-night study sessions, and gives the app the visual energy of a game.
- **Architecture** section: explain the three-layer token system (Primitives → Semantic → Component). No subsections. Keep it concise.

**Don't include:**
- The origin story of Dino or Ucademy.
- "Why we built this" narratives.
- An Inspiration subsection.
- A component grid or component list — the sidebar handles navigation.
- Color palettes, type scales, or spacing tables — those live in their dedicated token pages.

---

## Copy rules

- Write in **English**. Always.
- Direct, clear, a little personality. Not corporate, not academic.
- Lead with action verbs: "moves", "blocks", "warns", "celebrates", "unlocks".
- Max 2 lines per card or variant description.
- No jargon. If nobody's going to read it, don't write it.
- Never use em dashes ("—") to attach clarifying or follow-up thoughts. That pattern reads as AI-generated. Rewrite as two sentences, or use a comma, colon, or parentheses instead.
  - ❌ "Assign one color per subject so learners can tell courses apart at a glance — consistency within a subject matters more than which color you pick."
  - ✅ "Assign one color per subject so learners can tell courses apart at a glance. Consistency within a subject matters more than which color you pick."
  - ✅ "Assign one color per subject (consistency within a subject matters more than which color you pick)."
- All example content (labels, button text, card copy, combination examples) must reflect the app's context: learning, progress, studying, gamification. Use things like "Keep going", "Lesson complete", "You earned a badge", "3 exercises left", "Streak: 7 days". Never use generic UI copy like "Submit", "Dashboard", "Table view", or "Click here".
  - Talk about "users" or "students, never "learners".

---

## Component pages (src/pages/components/[name].astro)

Every page follows this exact order — no exceptions:

1. Playground (no `<h2>`, goes straight in)
2. `<h2>` Variants — one `<h3>` per variant
3. `<h2>` Usage
4. `<h2>` Combinations
5. `<h2>` Do's & Don'ts

All example content in Variants, Combinations, and Do's & Don'ts must reflect the app's context. Labels, button text, and copy should feel like they belong in a gamified learning app: progress, streaks, lessons, badges, scores, exercises. Never use generic placeholder copy like "Click here", "Submit", "Item 1", or "Dashboard".

---

## HTML & accessibility

- Use semantic tags: `<nav>`, `<main>`, `<aside>`, `<header>`, `<section>`, `<button>`.
- All interactive elements need visible focus states.
- `aria-current="page"` on the active sidebar link.
- `aria-hidden="true"` on decorative elements (arrows, icons used as decoration).
- No `<form>` tags — use `onClick`/`onChange` handlers for interactivity.

---

## CSS

- No Tailwind. No utility frameworks. Use `global.css` tokens directly.
- Interactivity goes in `<script>` tags inside the `.astro` file — clean, no frameworks.
- The layout shell is a CSS grid with 3 columns (sidebar / content / TOC). Don't break this structure.
- Responsive breakpoints are already defined in `DocLayout.astro` — don't add new ones without a reason.
