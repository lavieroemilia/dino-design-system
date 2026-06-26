export default {
  component: {
    name: "Label",
    category: "atom",
    description: "Sits above every input field. Wires the click area to the field via the for prop, and optionally signals required status or shows a hint tooltip.",
    type: "display",
  },

  variants: [
    {
      name: "default",
      description: "Optional field. No asterisk. Use when the student can leave the field blank.",
      token: "var(--text-body-default)",
    },
    {
      name: "required",
      description: "Mandatory field. Shows a red asterisk before the label text.",
      token: "var(--icon-error)",
    },
  ],

  states: [
    {
      name: "default",
      description: "Label text only. No asterisk, no hint.",
      cssClass: "",
    },
    {
      name: "required",
      description: "Red asterisk prepended. Applied when required prop is true.",
      cssClass: "label--required",
    },
    {
      name: "with-hint",
      description: "Question-mark icon appended. Rendered when hint prop is provided.",
      cssClass: "",
    },
    {
      name: "hint-hover",
      description: "Hint icon brightens from placeholder color to body color.",
      cssClass: ":hover on .label__hint-btn",
    },
    {
      name: "hint-focused",
      description: "Visible focus ring on the hint button for keyboard users.",
      cssClass: ":focus-visible on .label__hint-btn",
    },
  ],

  tokens: [
    {
      cssVar: "--text-body-default",
      role: "text",
      description: "Label text color.",
    },
    {
      cssVar: "--icon-error",
      role: "text",
      description: "Required asterisk color. Signals a mandatory field without adding copy.",
    },
    {
      cssVar: "--text-placeholder",
      role: "text",
      description: "Hint icon default color. Recedes so it doesn't compete with the label text.",
    },
    {
      cssVar: "--font-family-body",
      role: "spacing",
      description: "Typeface for label text and asterisk.",
    },
    {
      cssVar: "--font-size-paragraph-md",
      role: "spacing",
      description: "Font size for label text and asterisk.",
    },
    {
      cssVar: "--font-weight-medium",
      role: "spacing",
      description: "Label text weight.",
    },
    {
      cssVar: "--font-weight-regular",
      role: "spacing",
      description: "Asterisk weight. Intentionally lighter than the label text.",
    },
    {
      cssVar: "--line-height-paragraph-md",
      role: "spacing",
      description: "Line height for label text and asterisk.",
    },
    {
      cssVar: "--spacing-4",
      role: "spacing",
      description: "Gap between asterisk, label text, and hint icon.",
    },
    {
      cssVar: "--radius-xsm",
      role: "radius",
      description: "Focus ring border-radius on the hint button.",
    },
    {
      cssVar: "--primary-500",
      role: "border",
      description: "Focus outline color on the hint button.",
    },
  ],

  props: {
    label: {
      type: "string",
      default: "Label",
      description: "Visible label text. Keep to one or two words. Move longer explanations into hint.",
    },
    required: {
      type: "boolean",
      default: false,
      description: "Shows the red asterisk. Must be consistent: if you mark some required fields, mark all of them.",
    },
    hint: {
      type: "string",
      default: null,
      description: "Short tooltip text. Reveals the question-mark icon. Use when the field name alone doesn't explain what's expected.",
    },
    for: {
      type: "string",
      default: null,
      description: "id of the input this label belongs to. Always pass this — without it the label won't focus the field on tap.",
    },
    id: {
      type: "string",
      default: null,
      description: "Optional id for the label element itself. Used for playground scripting or aria-labelledby wiring.",
    },
  },

  slots: [],

  composition: {
    parentConstraints: "Always place inside or directly above a form group. Never use as a heading or caption outside a form context.",
    commonPartners: ["Field", "Input", "Select", "Textarea"],
    notes: "Label is typically consumed by Field, which handles the label-to-input wiring automatically. Use Label standalone only when building a custom field layout.",
  },

  accessibility: {
    role: "label",
    keyboardSupport: ["Tab (hint button is focusable when hint is provided)"],
    screenReader: "Announces the label text when the associated input is focused. The asterisk is aria-hidden — required status should also be communicated via aria-required on the input.",
    wcag: ["1.3.1", "2.1.1", "2.4.6", "3.3.2"],
    notes: "The for prop is mandatory for accessibility. An unlinked label is visually correct but functionally broken for screen reader and touch users.",
  },

  aiHints: {
    priority: "medium",
    useCases: [
      "Above every input, select, or textarea in a form.",
      "In a registration or onboarding flow where required fields need to be signalled upfront.",
      "Inside a quiz answer form where hint text explains the expected format.",
    ],
    antiPatterns: [
      {
        scenario: "Using Label without the for prop.",
        reason: "The label won't focus the input on tap and screen readers won't associate it with the field.",
        alternative: "Always pass for with the matching input id. If using Field, let Field handle the wiring.",
      },
      {
        scenario: "Writing a full sentence as the label text.",
        reason: "Labels must scan fast. Long copy breaks the visual rhythm of a form.",
        alternative: "Keep label to one or two words. Put explanations in the hint prop.",
      },
      {
        scenario: "Marking only some required fields with required.",
        reason: "Users learn the asterisk pattern. One unmarked required field breaks their mental model.",
        alternative: "Be consistent: mark every mandatory field or none. Don't mix conventions.",
      },
      {
        scenario: "Using Label outside a form to style a caption or section heading.",
        reason: "Label renders a <label> element. Outside a form context it carries incorrect semantics.",
        alternative: "Use a <span> or <p> with the appropriate text token from global.css.",
      },
    ],
  },
}
