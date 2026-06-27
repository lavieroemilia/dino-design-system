# Dino Design System — Writing Guide

This guide is the source of truth for writing component documentation pages. Follow it every time you create or update a page in `src/pages/components/`.

---

## Page structure

Every component page follows this exact order. Do not add or reorder sections.

1. **Playground** — interactive preview, no heading
2. `<h2>` **Variants** — one `<h3>` per named variant, plus optional Size `<h3>`
3. `<h2>` **Usage** — when and how to use this component
4. `<h2>` **Combinations** — only when the component meaningfully composes with others
5. `<h2>` **Do's & Don'ts**

The Combinations section is optional. Skip it for standalone components (like SectionHeader) where there's nothing meaningful to show.

---

## 1. Playground

The playground is an interactive preview where the reader can change props and see the component update live. It always sits at the top of the page, before the first `<h2>`.

### Structure

```html
<section class="playground" aria-label="Interactive preview">

  <!-- Stage: the component preview -->
  <div class="playground__stage" id="preview-stage">
    <!-- render the component or a raw HTML clone of it here -->
  </div>

  <!-- Controls: buttons and inputs to change props -->
  <div class="playground__controls" role="group" aria-label="Playground controls">
    <fieldset class="ctrl-group">
      <legend class="ctrl-group__label">Prop name</legend>
      <div class="ctrl-group__options">
        <!-- ctrl-btn per option -->
      </div>
    </fieldset>
  </div>

  <!-- Code snippet: auto-updates as the user changes controls -->
  <div class="playground__code">
    <pre id="preview-code" class="code-snippet"></pre>
    <button class="copy-btn" id="copy-btn" aria-label="Copy code">
      <svg id="icon-copy" ...><!-- clipboard icon --></svg>
      <svg id="icon-check" ... style="display:none"><!-- check icon --></svg>
    </button>
  </div>

</section>
```

### Code snippet rules

- The `<pre id="preview-code">` must always be empty in the HTML. Populate it via JavaScript in `render()` or `updateCode()`.
- The snippet must reflect the actual props the user has selected, using the same attribute names as the Astro component.
- Only include non-default prop values in the snippet. Don't output `status="default"` if default is already the default.
- The copy button swaps the clipboard icon for a checkmark on click. No text feedback. Revert after 1500ms.

### Stage background

Choose the background that best represents how the component appears in the real app. Most components use `var(--surface-page)`. Components that live on elevated surfaces (like SectionHeader) use `var(--surface-elevate)`. Always use a token from `global.css`.

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

  render(); // always call on load

  // Copy handler — always the same
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

Do not use TypeScript generics inside `.map()` or `.sort()` callbacks — esbuild will throw a parse error.

---

## 2. Variants

### One example per named variant

Each `<h3>` represents one named variant of the component. It shows a single example of that variant, centered in a box.

```html
<h3 id="primary">Primary</h3>
<p>One or two sentences. Lead with action verbs. Say when to use it.</p>
<div class="example-center">
  <ComponentName variant="primary" />
</div>
```

The `.example-center` box always has a background, a subtle border, and center-aligned content:

```css
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
```

### Multi-state sections

When a `<h3>` documents all the states of a single property (status, result, fill states...), show them stacked in a column with a label next to each one. This makes comparison easy.

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

The `.example-row` box shares the same background and border as `.example-center`:

```css
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

.example-row--col { flex-direction: column; align-items: stretch; gap: 12px; }
```

### Size section

If the component has multiple sizes, document them as a `<h3>` inside Variants — not as a top-level `<h2>`. The size section shows all sizes together, aligned and labeled.

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

```css
.example-row--sizes { align-items: flex-end; gap: 20px; }
.size-item { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-8); }
.size-label { font-size: var(--font-size-paragraph-sm); color: var(--text-placeholder); }
```

**When to use `example-center` vs `example-row`:**

| Situation | Use |
|---|---|
| One named variant (primary, secondary...) | `example-center` |
| All values of one property shown together (all statuses, all colors...) | `example-row example-row--col` |
| All sizes shown side by side | `example-row example-row--sizes` |
| Combinations section | `example-row example-row--col` |

---

## 3. Usage

Two or three short paragraphs. Explain:

- **When** to reach for this component vs alternatives
- **What to avoid** in terms of misuse
- Any prop or behavior that's not obvious from the variants

No bullet lists. No headers inside Usage. Just clear prose.

---

## 4. Combinations (optional)

Only include this section when the component is meaningfully paired with another (e.g. Field + Label + Button, OptionCard + Button + ProgressBar).

Show a real, working example using tokens from the app context. The example must feel like it belongs in the learning app (a lesson form, a quiz screen, etc.).

Skip this section for standalone components where the pairing is obvious from context or trivially simple.

---

## 5. Do's & Don'ts

Always three items per column. Use the same structure:

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
```

After Do's & Don'ts, add a Related section:

```html
<hr />
<p>
  <strong>Related:</strong>
  <a href="/components/other-component">Other Component</a> (one sentence on why it's related)
</p>
```

---

## Copy rules

**Voice:** Direct, warm, slightly informal. Write for teammates — designers, engineers, and marketers who build with this system every day. Address the reader as "you". Write like you're explaining something to a colleague, not documenting for a committee.

**Lead with verbs:** "moves", "blocks", "warns", "celebrates", "unlocks". Avoid nouns as the first word.

**App context:** All examples must feel like they belong in a gamified learning app. Use: "Keep going", "Lesson complete", "You earned a badge", "3 exercises left", "Streak: 7 days". Never use: "Submit", "Dashboard", "Table view", "Click here", "Item 1".

**Users, not learners:** Refer to the people using the app as "users" or "students", never "learners".

**Sentence length:** Max 2 lines per card or variant description. If you need a third sentence, split into two paragraphs.

**No em dashes:** Don't use `—` to attach a follow-up thought. Rewrite as two sentences, or use a comma, colon, or parentheses.

```
# Wrong
"Use this when you need one dominant action — think: continue a lesson."

# Right
"Use this when you need one dominant action. Think: continue a lesson."
```

**No jargon:** If the word wouldn't appear in a conversation with a non-technical colleague, replace it.

---

## CSS checklist for new component pages

Every component page needs these CSS blocks in its `<style>` tag. Copy them from an existing page and adapt as needed.

- [ ] `.playground` — card wrapper with border and background
- [ ] `.playground__stage` — the preview area, centered, with page background
- [ ] `.playground__controls` — flex row of control groups
- [ ] `.playground__code` — the code snippet row (position: relative)
- [ ] `.code-snippet` — the `<pre>` element, monospace, primary color
- [ ] `.copy-btn` — the clipboard icon button, top-right of `.playground__code`
- [ ] `.ctrl-group`, `.ctrl-group__label`, `.ctrl-group__options` — control structure
- [ ] `.ctrl-btn` and `.ctrl-btn.is-active` — toggle buttons
- [ ] `.ctrl-input` — text inputs in controls
- [ ] `.example-center` — single-component example box
- [ ] `.example-row` and `.example-row--col` — multi-item example box
- [ ] `.size-row` and `.size-label` — the label + component grid inside `--col` rows
- [ ] `.dos-donts`, `.dos-donts__col`, `.dos-donts__label` — the Do/Don't columns

The exact values for all these classes are defined in `button.astro`, which is the canonical reference implementation. Copy from there.

---

## Page heading block

Every component page starts with this frontmatter and DocLayout call:

```astro
---
import DocLayout from '../../layouts/DocLayout.astro';
import ComponentName from '../../components/ComponentName/ComponentName.astro';

const headings = [
  { depth: 2, slug: 'variants',     text: 'Variants' },
  { depth: 3, slug: 'variant-name', text: 'Variant Name' }, // one per h3
  { depth: 3, slug: 'sizes',        text: 'Size' },         // only if the component has sizes
  { depth: 2, slug: 'usage',        text: 'Usage' },
  { depth: 2, slug: 'combinations', text: 'Combinations' }, // only if included
  { depth: 2, slug: 'dos-donts',    text: "Do's & Don'ts" },
];
---

<DocLayout
  title="Component Name"
  description="One sentence. What it does, in the simplest terms possible."
  headings={headings}
>
```

The `description` is the subtitle shown below the title. One sentence. What the component does in the app, not how it's built.

---

## What not to include

- Don't document implementation details (how the CSS works, what the Astro props compile to).
- Don't add a Props table. Variants and Usage cover this in a more readable format.
- Don't add a Changelog section.
- Don't add color palettes, type scales, or spacing tables — those live in the token pages.
- Don't use full-width screenshots or decorative illustrations.
