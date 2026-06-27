# Dino Design System — Writing Guide

Source of truth for writing component documentation pages (`src/pages/components/`).
Read this before creating or updating any component page.

---

## Page structure

Every component page follows this exact order. Do not add or reorder sections.

1. **Playground** — interactive preview, no heading, goes straight in
2. `<h2>` **Variants** — one `<h3>` per named variant, plus optional Size `<h3>`
3. `<h2>` **Usage** — when and how to use this component
4. `<h2>` **Combinations** — only when the component meaningfully composes with others
5. `<h2>` **Do's & Don'ts**
6. `<hr />` + **Related** paragraph — links to companion components

The `headings` array in the frontmatter must mirror every `<h2>` and `<h3>` slug exactly so the TOC works.

Combinations is optional. Skip it for standalone components where there is nothing meaningful to show.

---

## .astro is not .mdx — never mix syntaxes

`.astro` files do not process Markdown. These will render as literal text or break the parser:

```
❌  ```html ... ```       (fenced code blocks)
❌  ### Heading           (markdown headings)
❌  - **bold list item**  (markdown lists)
❌  | col | col |         (markdown tables)
```

Use HTML for everything:

```
✅  <h3 id="size">Size</h3>
✅  <ul><li><strong>…</strong></li></ul>
✅  <pre><code>…</code></pre>
```

---

## 1. Playground

The playground is an interactive preview. It sits at the top of every page before the first `<h2>`, and lets the reader change props and see the component update live.

### Structure

```html
<section class="playground" aria-label="Interactive preview">

  <!-- Stage: the component preview -->
  <div class="playground__stage" id="preview-stage">
    <!-- Render the component or a raw HTML clone here -->
  </div>

  <!-- Controls: buttons and inputs to change props -->
  <div class="playground__controls" role="group" aria-label="Playground controls">
    <fieldset class="ctrl-group">
      <legend class="ctrl-group__label">Prop name</legend>
      <div class="ctrl-group__options">
        {['value1', 'value2'].map(v => (
          <button
            class:list={['ctrl-btn', { 'is-active': v === 'value1' }]}
            data-prop="propName"
            data-value={v}
          >{v}</button>
        ))}
      </div>
    </fieldset>
  </div>

  <!-- Code snippet: auto-updates as the user changes controls -->
  <div class="playground__code">
    <pre id="preview-code" class="code-snippet"></pre>
    <button class="copy-btn" id="copy-btn" aria-label="Copy code">
      <svg id="icon-copy" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg id="icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:none">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </button>
  </div>

</section>
```

### Code snippet rules

- The `<pre id="preview-code">` must always be empty in the HTML. Populate it via JavaScript in `render()` or `updateCode()`.
- The snippet must reflect the actual props the user has selected, using the same attribute names as the Astro component.
- Only include non-default prop values. Don't output `status="default"` if default is already the default.
- The copy button swaps the clipboard icon for a checkmark on click. No text feedback. Reverts after 1500 ms.

### Stage background

Choose the background that best represents how the component appears in the real app. Most components use `var(--surface-page)`. Components that live on elevated surfaces (like SectionHeader) use `var(--surface-elevate)`. Always a token from `global.css`.

### JavaScript pattern

```js
<script>
  const codeEl = document.getElementById('preview-code');
  const state  = { prop1: 'default-value', prop2: 'other-value' };

  function render() {
    // 1. Update the live preview DOM
    // 2. Generate and write the snippet
    const attrs = [
      `prop1="${state.prop1}"`,
      state.prop2 !== 'default' ? `prop2="${state.prop2}"` : '',
    ].filter(Boolean).join(' ');
    if (codeEl) codeEl.textContent = `<ComponentName ${attrs} />`;
  }

  document.querySelectorAll('.ctrl-btn[data-prop]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prop = btn.dataset.prop;
      document.querySelectorAll(`.ctrl-btn[data-prop="${prop}"]`)
        .forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      state[prop] = btn.dataset.value;
      render();
    });
  });

  render(); // always call on load to populate the snippet

  // Copy handler — always the same, copy verbatim
  const copyBtn   = document.getElementById('copy-btn');
  const iconCopy  = document.getElementById('icon-copy');
  const iconCheck = document.getElementById('icon-check');
  copyBtn?.addEventListener('click', () => {
    const code = document.getElementById('preview-code')?.textContent || '';
    navigator.clipboard.writeText(code).then(() => {
      if (iconCopy)  iconCopy.style.display  = 'none';
      if (iconCheck) iconCheck.style.display = 'block';
      setTimeout(() => {
        if (iconCopy)  iconCopy.style.display  = 'block';
        if (iconCheck) iconCheck.style.display = 'none';
      }, 1500);
    });
  });
</script>
```

Do not use TypeScript generics inside `.map()` or `.sort()` callbacks — esbuild throws a parse error. Keep all callbacks as plain JavaScript.

---

## 2. Variants

### One example per named variant

Each `<h3>` that documents a named variant (primary, secondary, error...) shows a single example of that variant, centered in a box.

```html
<h3 id="primary">Primary</h3>
<p>One or two sentences. Lead with action verbs. Say when to use it.</p>
<div class="example-center">
  <ComponentName variant="primary" />
</div>
```

### Multi-state sections

When a `<h3>` shows all the values of one property together (all statuses, all colors, all fill levels...), stack them in a labeled column.

```html
<h3 id="status">Status</h3>
<p>Description.</p>
<div class="example-row example-row--col">
  <div class="size-row">
    <span class="size-label">Default</span>
    <ComponentName status="default" />
  </div>
  <div class="size-row">
    <span class="size-label">Hover</span>
    <ComponentName status="hover" />
  </div>
</div>
```

### Size section

If the component has multiple sizes, document them as a `<h3>` inside Variants (not a top-level `<h2>`). Show all sizes together, aligned and labeled below each one.

```html
<h3 id="sizes">Size</h3>
<p>Description of when to use each size.</p>
<div class="example-row example-row--sizes" style="justify-content: center;">
  <div class="size-item">
    <ComponentName size="xl" />
    <span class="size-label">xl</span>
  </div>
  <div class="size-item">
    <ComponentName size="lg" />
    <span class="size-label">lg</span>
  </div>
</div>
```

### When to use each pattern

| Situation | Class |
|---|---|
| One named variant (primary, secondary...) | `example-center` |
| All values of one property shown together (statuses, colors...) | `example-row example-row--col` |
| All sizes shown side by side with label below | `example-row example-row--sizes` |
| Combinations section | `example-row example-row--col` |

---

## 3. Usage

Two or three short paragraphs. Explain:

- When to reach for this component vs alternatives
- What to avoid in terms of misuse
- Any prop or behavior that is not obvious from the variants

No bullet lists. No subheadings inside Usage. Just clear prose.

---

## 4. Combinations (optional)

Only include this section when the component is meaningfully paired with another — for example Field + Label + Button, or OptionCard + Button + ProgressBar.

Show a real, working example. The example must feel like it belongs in the learning app: a lesson form, a quiz screen, a progress indicator.

---

## 5. Do's & Don'ts

Always three items per column. Strong tag on the rule, then a short explanation.

```html
<div class="dos-donts">
  <div class="dos-donts__col dos-donts__col--do">
    <p class="dos-donts__label">Do</p>
    <ul>
      <li><strong>Lead with the rule.</strong> Follow with a short explanation why.</li>
    </ul>
  </div>
  <div class="dos-donts__col dos-donts__col--dont">
    <p class="dos-donts__label">Don't</p>
    <ul>
      <li><strong>Lead with the rule.</strong> Follow with a short explanation why.</li>
    </ul>
  </div>
</div>

<hr />
<p>
  <strong>Related:</strong>
  <a href="/components/other">Other Component</a> (one sentence on why it's related)
  ·
  <a href="/components/another">Another Component</a> (one sentence)
</p>
```

---

## Copy rules

**Voice:** Direct, warm, slightly informal. Write for teammates: designers, engineers, and marketers who build with this system every day. Address the reader as "you". Explain like a colleague, not a committee.

**Lead with verbs:** "moves", "blocks", "warns", "celebrates", "unlocks". Avoid nouns as the first word of a description.

**App context:** All examples must feel like they belong in a gamified learning app. Use: "Keep going", "Lesson complete", "You earned a badge", "3 exercises left", "Streak: 7 days". Never use: "Submit", "Dashboard", "Table view", "Click here", "Item 1".

**Users, not learners:** Refer to the people using the app as "users" or "students", never "learners".

**Sentence length:** Max 2 lines per card or variant description.

**No em dashes:** Don't use `—` to attach a follow-up thought. Rewrite as two sentences, or use a comma, colon, or parentheses.

```
# Wrong
"Use it when there's one dominant action — think: continue a lesson."

# Right
"Use it when there's one dominant action. Think: continue a lesson."
```

**Write in English. Always.**

---

## Page boilerplate

### Frontmatter and layout

```astro
---
import DocLayout from '../../layouts/DocLayout.astro';
import ComponentName from '../../components/ComponentName/ComponentName.astro';

const headings = [
  { depth: 2, slug: 'variants',     text: 'Variants' },
  { depth: 3, slug: 'variant-name', text: 'Variant Name' },
  { depth: 3, slug: 'sizes',        text: 'Size' },         // only if has sizes
  { depth: 2, slug: 'usage',        text: 'Usage' },
  { depth: 2, slug: 'combinations', text: 'Combinations' }, // only if included
  { depth: 2, slug: 'dos-donts',    text: "Do's & Don'ts" },
];
---

<DocLayout
  title="Component Name"
  description="One sentence. What it does in the app, not how it is built."
  headings={headings}
>
```

### CSS boilerplate

Copy this into every new component page's `<style>` block and adapt as needed. `button.astro` is the canonical reference implementation.

```css
<style>
  /* ── Playground ─────────────────────────────────────────────── */
  .playground {
    background: var(--surface-elevate);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 48px;
  }

  .playground__stage {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 40px 32px;
    background: var(--surface-page); /* change if component lives on elevated surface */
  }

  .preview-wrap { width: 360px; }

  .playground__controls {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    padding: 16px 24px;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .playground__code {
    position: relative;
    padding: var(--spacing-8) var(--spacing-12);
  }

  .code-snippet {
    margin: 0;
    font-family: var(--font-family-code);
    font-size: 0.8rem;
    line-height: 1.6;
    color: var(--primary-300);
    white-space: pre;
    overflow-x: auto;
    max-height: calc(5 * 1.6 * 0.8rem);
    overflow-y: auto;
    padding-right: var(--spacing-40);
  }

  .copy-btn {
    position: absolute;
    top: var(--spacing-8);
    right: var(--spacing-8);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-md);
    border: none;
    background: transparent;
    color: var(--text-placeholder);
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
  }

  .copy-btn:hover  { background: var(--surface-button-transparent-hover); color: var(--text-body-default); }
  .copy-btn:active { transform: translateY(4px); background: transparent; }

  /* ── Controls ────────────────────────────────────────────────── */
  .ctrl-group { border: none; padding: 0; }

  .ctrl-group__label {
    display: block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-placeholder);
    margin-bottom: 8px;
  }

  .ctrl-group__options { display: flex; gap: 6px; flex-wrap: wrap; }

  .ctrl-btn {
    padding: 5px 12px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: var(--text-body-default);
    font-family: var(--font-family-body);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .ctrl-btn:hover     { background: var(--surface-hover-dark); }
  .ctrl-btn.is-active {
    background:   var(--primary-900);
    color:        var(--primary-300);
    border-color: var(--primary-700);
  }

  .ctrl-input {
    background: var(--surface-elevate);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    color: var(--text-body-default);
    font-family: var(--font-family-body);
    font-size: 0.8rem;
    padding: 5px 10px;
    outline: none;
    width: 220px;
    transition: border-color 0.15s;
  }

  .ctrl-input:focus { border-color: var(--primary-600); }

  .ctrl-range {
    width: 100%;
    accent-color: var(--primary-default);
    margin-top: 4px;
  }

  /* ── Example boxes ───────────────────────────────────────────── */
  .example-center {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    background: var(--surface-elevate);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    margin: 12px 0 32px;
  }

  .example-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 24px;
    background: var(--surface-elevate);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    margin: 12px 0 32px;
  }

  .example-row--col    { flex-direction: column; align-items: stretch; gap: 12px; }
  .example-row--sizes  { align-items: flex-end; gap: 20px; }

  .size-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: center;
    gap: 16px;
  }

  .size-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-8);
  }

  .size-label {
    font-size: var(--font-size-paragraph-sm);
    color: var(--text-placeholder);
    white-space: nowrap;
  }

  /* ── Do's & Don'ts ───────────────────────────────────────────── */
  .dos-donts {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 16px 0 24px;
  }

  .dos-donts__col {
    padding: 16px 20px;
    border-radius: 10px;
  }

  .dos-donts__col--do {
    background: color-mix(in srgb, var(--success-default) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--success-default) 30%, transparent);
  }

  .dos-donts__col--dont {
    background: color-mix(in srgb, var(--error-default) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--error-default) 30%, transparent);
  }

  .dos-donts__label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0 0 12px;
  }

  .dos-donts__col--do   .dos-donts__label { color: var(--success-default); }
  .dos-donts__col--dont .dos-donts__label { color: var(--error-default); }

  .dos-donts__col ul {
    margin: 0;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dos-donts__col li {
    font-size: var(--font-size-paragraph-sm);
    line-height: var(--line-height-paragraph-sm);
    color: var(--text-body-default);
  }
</style>
```

---

## What not to include

- Don't document implementation details (how the CSS works, what the props compile to).
- Don't add a Props table. Variants and Usage cover this in a more readable format.
- Don't add a Changelog or History section.
- Don't add color palettes, type scales, or spacing tables — those live in the token pages.
- Don't use full-width screenshots or decorative illustrations.

---

## Reference files

| File | Purpose |
|---|---|
| `public/styles/global.css` | CSS variables — source of truth for all tokens |
| `tokens_tokens.json` | Raw design tokens from Figma (read-only) |
| `src/layouts/DocLayout.astro` | The only layout — 3-column shell with sidebar and TOC |
| `src/pages/components/button.astro` | Canonical reference implementation for component pages |
| `COMPONENT-METADATA-SCHEMA.md` | Schema for `.meta.js` files (AI agent consumption) |
| `CLAUDE.md` | Project rules for Claude Code |
