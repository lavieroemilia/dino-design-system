export default {
  component: {
    name: "OptionCard",
    category: "molecule",
    description: "The answer a student picks in a multiple-choice question. Renders as a radio input visually wrapped in a tappable card. Always used in groups of 2–4.",
    type: "input",
  },

  variants: [
    {
      name: "default",
      description: "Resting state. Card is available and unselected.",
      token: "var(--surface-default-light)",
    },
    {
      name: "hover",
      description: "Student is hovering over the card. Surface brightens.",
      token: "var(--surface-hover-light)",
    },
    {
      name: "pressed",
      description: "Student is actively tapping. Card shifts down 4px to simulate physical depth.",
      token: "var(--surface-hover-light)",
    },
    {
      name: "error",
      description: "Answer was wrong. Red inner border signals the mistake. Use after submission, never before.",
      token: "var(--border-error)",
    },
    {
      name: "disabled",
      description: "Card is locked. Student cannot interact. Use when the question window has closed.",
      token: "var(--surface-disabled-light)",
    },
  ],

  states: [
    {
      name: "unselected",
      description: "Default radio state. Empty ring on the right.",
      cssClass: "",
    },
    {
      name: "selected",
      description: "Radio fills green. Confirms the tap registered. Applied via selected prop.",
      cssClass: "option-card--selected",
    },
    {
      name: "selected-error",
      description: "Selected but wrong. Radio fills red. Applied when selected=true and status='error' together.",
      cssClass: "option-card--selected option-card--error",
    },
  ],

  tokens: [
    {
      cssVar: "--surface-default-light",
      role: "background",
      description: "Card surface in default and unselected states.",
    },
    {
      cssVar: "--surface-hover-light",
      role: "background",
      description: "Card surface on hover and pressed states.",
    },
    {
      cssVar: "--surface-disabled-light",
      role: "background",
      description: "Card surface in disabled state.",
    },
    {
      cssVar: "--border-default",
      role: "border",
      description: "Radio ring border in default state.",
    },
    {
      cssVar: "--border-action-default",
      role: "border",
      description: "Radio ring border and fill when selected (correct).",
    },
    {
      cssVar: "--border-error",
      role: "border",
      description: "Card inner border and radio ring when status is error.",
    },
    {
      cssVar: "--error-default",
      role: "background",
      description: "Radio fill when selected + error (wrong answer).",
    },
    {
      cssVar: "--text-body-dark",
      role: "text",
      description: "Answer label text color in default state.",
    },
    {
      cssVar: "--neutral-400",
      role: "text",
      description: "Answer label and icon color in disabled state.",
    },
    {
      cssVar: "--neutral-700",
      role: "icon",
      description: "Person icon color in default state.",
    },
    {
      cssVar: "--neutral-black-20",
      role: "shadow",
      description: "Card drop shadow.",
    },
    {
      cssVar: "--black-10",
      role: "shadow",
      description: "Inner shadow on error state.",
    },
    {
      cssVar: "--black-20",
      role: "shadow",
      description: "Pressed state box-shadow (reduced).",
    },
    {
      cssVar: "--black-60",
      role: "shadow",
      description: "Badge drop shadow.",
    },
    {
      cssVar: "--yellow-default",
      role: "background",
      description: "Badge background color.",
    },
    {
      cssVar: "--yellow-50",
      role: "border",
      description: "Badge border color.",
    },
    {
      cssVar: "--font-family-body",
      role: "spacing",
      description: "Answer label typeface.",
    },
    {
      cssVar: "--font-size-paragraph-md",
      role: "spacing",
      description: "Answer label font size.",
    },
    {
      cssVar: "--font-weight-medium",
      role: "spacing",
      description: "Answer label font weight.",
    },
    {
      cssVar: "--line-height-paragraph-md",
      role: "spacing",
      description: "Answer label line height.",
    },
  ],

  props: {
    label: {
      type: "string",
      default: "Option",
      description: "The answer text. Keep to one line. The card truncates overflow with ellipsis — long text disappears silently.",
    },
    status: {
      type: "string",
      options: ["default", "hover", "pressed", "disabled", "error"],
      default: "default",
      description: "hover and pressed are handled automatically by CSS in the real app. Pass them only in playground/static contexts. Only pass error after the student has submitted.",
    },
    selected: {
      type: "boolean",
      default: false,
      description: "Whether this card is the chosen answer. Controls the radio fill and aria-checked state.",
    },
    badge: {
      type: "boolean",
      default: false,
      description: "Shows a yellow dot in the top-right corner to flag the option as new or recommended. Max one badge per question group.",
    },
    name: {
      type: "string",
      default: null,
      description: "Radio group name. Must be identical across all cards in the same question. This is what enforces single-selection.",
    },
    value: {
      type: "string",
      default: null,
      description: "The value submitted when this card is selected.",
    },
  },

  slots: [],

  composition: {
    parentConstraints: "Always render in a vertical stack with 8px gap. Never place a single OptionCard alone — it only makes sense in a group of 2–4.",
    commonPartners: ["Button", "ProgressBar"],
    groupRules: {
      minCards: 2,
      maxCards: 4,
      requiredProp: "All cards in a group must share the same name prop for radio single-selection to work.",
      selectionCount: "Only one card can be selected at a time within a name group.",
    },
    standardStack: "ProgressBar (top) → question text → OptionCard group (2–4 cards) → Button (disabled until one card is selected)",
  },

  accessibility: {
    role: "radio",
    keyboardSupport: ["Tab to reach the group", "Arrow keys to move between options", "Space to select"],
    screenReader: "The hidden radio input carries the accessible state. Screen readers announce the label text and selected/unselected state. aria-invalid='true' is set when status is error.",
    wcag: ["1.3.1", "1.4.1", "2.1.1", "3.3.1", "4.1.2"],
    notes: "The visual card is a <label> wrapping a visually hidden <input type='radio'>. Do not add role='radio' or aria-checked manually — they're on the input already.",
  },

  aiHints: {
    priority: "high",
    useCases: [
      "Multiple-choice quiz question with 2–4 answer options.",
      "True/false question (2 cards).",
      "Subject selection at the start of a session.",
    ],
    antiPatterns: [
      {
        scenario: "Rendering a single OptionCard without a group.",
        reason: "A radio input with no siblings has no purpose. There's nothing to choose between.",
        alternative: "Always render at least 2 OptionCards sharing the same name prop.",
      },
      {
        scenario: "Setting status='error' before the student submits.",
        reason: "Pre-submission error states feel punishing and undermine trust. Students haven't committed to an answer yet.",
        alternative: "Set error only after the submit button is pressed and the answer is confirmed wrong.",
      },
      {
        scenario: "Mixing disabled and error on the same card.",
        reason: "Two conflict signals on one element create confusion about what the state means.",
        alternative: "Pick one. Use error when the answer was wrong. Use disabled when the card is locked regardless of answer.",
      },
      {
        scenario: "Using more than one badge in the same question group.",
        reason: "The badge's meaning comes from scarcity. Multiple badges signal nothing.",
        alternative: "One badge per question group, max.",
      },
      {
        scenario: "Writing label text longer than one line.",
        reason: "The card is fixed height (48px). Overflow is clipped with ellipsis and the student never sees the rest.",
        alternative: "Keep answer labels short and scannable. Move extra context into the question text above.",
      },
      {
        scenario: "Using OptionCard for settings or preferences outside a quiz.",
        reason: "This component is purpose-built for the quiz answer pattern. Its visual language signals 'this is a question'.",
        alternative: "Use a different selection component for non-quiz contexts.",
      },
    ],
  },
}
