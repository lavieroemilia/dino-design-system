export default {
  component: {
    name: "Field",
    category: "atom",
    description: "Text input students type into. Carries all interactive states and validation results. Always paired with Label above it.",
    type: "input",
  },

  variants: [
    {
      name: "large",
      description: "Default. Full-width forms: sign-up, profile, onboarding.",
      token: "var(--surface-default-dark)",
    },
    {
      name: "medium",
      description: "Tighter spaces: search bars, inline filters, compact form sections.",
      token: "var(--surface-default-dark)",
    },
  ],

  states: [
    {
      name: "default",
      description: "Resting state. Field is available and empty or pre-filled.",
      cssClass: "",
    },
    {
      name: "hover",
      description: "Border and background brighten. Triggered automatically via :hover in the real app.",
      cssClass: "field--hover",
    },
    {
      name: "focus",
      description: "Same visual as hover. Triggered automatically via :focus-within. Placeholder lightens.",
      cssClass: "field--focus",
    },
    {
      name: "disabled",
      description: "Input is locked. cursor: not-allowed. Cannot be interacted with.",
      cssClass: "field--disabled",
    },
    {
      name: "error",
      description: "Validation failed. Red border, error background, warning icon, red text.",
      cssClass: "field--error",
    },
    {
      name: "success",
      description: "Validation passed. Green border, check icon. Background unchanged.",
      cssClass: "field--success",
    },
  ],

  tokens: [
    {
      cssVar: "--surface-default-dark",
      role: "background",
      description: "Default field surface.",
    },
    {
      cssVar: "--surface-hover-dark",
      role: "background",
      description: "Field surface on hover and focus.",
    },
    {
      cssVar: "--surface-disabled-dark",
      role: "background",
      description: "Field surface in disabled state.",
    },
    {
      cssVar: "--surface-error",
      role: "background",
      description: "Field surface when result is error.",
    },
    {
      cssVar: "--border-default",
      role: "border",
      description: "Default border color.",
    },
    {
      cssVar: "--border-hover",
      role: "border",
      description: "Border color on hover and focus states.",
    },
    {
      cssVar: "--border-disabled",
      role: "border",
      description: "Border color in disabled state.",
    },
    {
      cssVar: "--border-error",
      role: "border",
      description: "Border color when result is error.",
    },
    {
      cssVar: "--border-success",
      role: "border",
      description: "Border color when result is success.",
    },
    {
      cssVar: "--text-action-light",
      role: "text",
      description: "Typed input text color.",
    },
    {
      cssVar: "--text-action-light-disabled",
      role: "text",
      description: "Text and placeholder color in disabled state.",
    },
    {
      cssVar: "--text-placeholder",
      role: "text",
      description: "Placeholder color in default state.",
    },
    {
      cssVar: "--text-placeholder-focus",
      role: "text",
      description: "Placeholder color on hover and focus. Slightly brighter than default.",
    },
    {
      cssVar: "--text-error-light",
      role: "text",
      description: "Input text and placeholder color in error state.",
    },
    {
      cssVar: "--icon-default",
      role: "icon",
      description: "Icon color in default, hover, and focus states.",
    },
    {
      cssVar: "--icon-error",
      role: "icon",
      description: "Icon color in error state.",
    },
    {
      cssVar: "--icon-success",
      role: "icon",
      description: "Icon color in success state.",
    },
    {
      cssVar: "--icon-action-light-disabled",
      role: "icon",
      description: "Icon color in disabled state.",
    },
    {
      cssVar: "--black-60",
      role: "shadow",
      description: "Inset shadow on the field container. Gives the input a recessed appearance.",
    },
    {
      cssVar: "--radius-xlg",
      role: "radius",
      description: "Field container corner rounding.",
    },
    {
      cssVar: "--spacing-8",
      role: "spacing",
      description: "Gap between icon and input text, and vertical padding for medium size.",
    },
    {
      cssVar: "--spacing-12",
      role: "spacing",
      description: "Horizontal padding for both sizes.",
    },
    {
      cssVar: "--spacing-16",
      role: "spacing",
      description: "Vertical padding for large size.",
    },
    {
      cssVar: "--font-family-body",
      role: "spacing",
      description: "Input typeface.",
    },
    {
      cssVar: "--font-size-paragraph-md",
      role: "spacing",
      description: "Input font size.",
    },
    {
      cssVar: "--font-weight-medium",
      role: "spacing",
      description: "Input font weight.",
    },
    {
      cssVar: "--line-height-paragraph-md",
      role: "spacing",
      description: "Input line height.",
    },
  ],

  props: {
    size: {
      type: "string",
      options: ["large", "medium"],
      default: "large",
    },
    status: {
      type: "string",
      options: ["default", "hover", "focus", "disabled"],
      default: "default",
      description: "hover and focus are mainly for playground/storybook use. In the real app these are handled by :hover and :focus-within CSS.",
    },
    result: {
      type: "string",
      options: ["none", "error", "success"],
      default: "none",
      description: "Validation feedback. Switch to error only after the student tries to submit. Clear back to none as soon as input becomes valid.",
    },
    placeholder: {
      type: "string",
      default: "Placeholder",
      description: "Short, concrete hint. Prefer examples over instructions: 'e.g. DINO-204' over 'Enter your code'.",
    },
    value: {
      type: "string",
      default: "",
      description: "Pre-filled value.",
    },
    iconLeft: {
      type: "boolean",
      default: false,
      description: "Shows an info icon on the left. Use for fields that need formatting context.",
    },
    iconRight: {
      type: "boolean",
      default: true,
      description: "Shows the result icon on the right. Icon changes with the result prop: circle (none), warning triangle (error), checkmark (success).",
    },
    id: {
      type: "string",
      default: null,
      description: "id of the input element. Must match the for prop on the paired Label.",
    },
    name: {
      type: "string",
      default: null,
      description: "Form field name for submission.",
    },
  },

  slots: [],

  composition: {
    parentConstraints: "Always place inside a form group with a Label above it. Never use without a Label.",
    commonPartners: ["Label", "Button"],
    requiredPair: {
      component: "Label",
      wiring: "Label.for must match Field.id. This is mandatory for accessibility and tap-target size on mobile.",
    },
    standardStack: "Label (required={true}) → Field (id matching label.for) → Button (disabled until valid)",
    notes: "Field does not compose Label internally. The consumer is responsible for rendering them together and passing matching id/for values.",
  },

  accessibility: {
    role: "textbox",
    keyboardSupport: ["Tab to focus", "any character to type", "Escape to blur (browser default)"],
    screenReader: "Announces placeholder when empty. Announces aria-invalid='true' when result is error. Associates with Label via id/for.",
    wcag: ["1.3.1", "1.4.3", "2.1.1", "3.3.1", "3.3.2", "4.1.2"],
    notes: "Color alone is never sufficient for error signalling. Always accompany result='error' with a visible text message explaining what to fix.",
  },

  aiHints: {
    priority: "high",
    useCases: [
      "Student enters their name, email, or password during sign-up.",
      "Student types a class code to join a course.",
      "Student enters an open-ended quiz answer.",
      "Search bar above a lesson or exercise list.",
      "Profile editing: nickname, bio, display name.",
    ],
    antiPatterns: [
      {
        scenario: "Rendering Field without a Label.",
        reason: "Screen readers can't announce what the field is for. Touch users lose the enlarged tap target.",
        alternative: "Always render Label above Field with matching for and id props.",
      },
      {
        scenario: "Setting result='error' before the student has attempted to submit.",
        reason: "Pre-emptive errors feel punishing and increase form abandonment.",
        alternative: "Trigger error state only after a submit attempt or on blur if the field was touched.",
      },
      {
        scenario: "Leaving result='error' after the student has corrected the input.",
        reason: "A stuck error state undermines trust in the validation logic.",
        alternative: "Clear result back to 'none' as soon as the value becomes valid.",
      },
      {
        scenario: "Using status='disabled' to indicate an optional field.",
        reason: "Disabled means the student cannot interact at all, not that the field is optional.",
        alternative: "Leave optional fields enabled. Use Label without required prop to signal optionality.",
      },
      {
        scenario: "Relying on border color alone to communicate error or success.",
        reason: "Color-only feedback fails WCAG 1.4.1 and is invisible to color-blind users.",
        alternative: "Pair result states with the icon (iconRight=true) and a helper text message below the field.",
      },
    ],
  },
}
