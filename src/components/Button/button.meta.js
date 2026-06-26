export default {
  component: {
    name: "Button",
    category: "atom",
    description: "Triggers an action or navigates to a destination. Renders as <button> by default, or <a> when href is passed.",
    type: "interactive",
  },

  variants: [
    {
      name: "primary",
      description: "Use for the single dominant action on a screen. One per screen, max.",
      token: "var(--surface-button-primary-default)",
    },
    {
      name: "secondary",
      description: "Use when both actions carry equal weight and neither should recede.",
      token: "var(--surface-button-white-default)",
    },
    {
      name: "tertiary",
      description: "Recedes alongside Primary or Danger. Use for low-stakes optional actions.",
      token: "var(--surface-button-transparent-default)",
    },
    {
      name: "ghost",
      description: "Quiet inline action inside cards and dense layouts. Not for decision flows.",
      token: "transparent",
    },
    {
      name: "danger",
      description: "Warns before irreversible actions. Always pair with a Tertiary cancel and a confirmation step.",
      token: "var(--surface-button-error-default)",
    },
    {
      name: "premium",
      description: "Drives upgrade actions. Treat like Primary: one per screen, never stacked with another Premium.",
      token: "var(--surface-button-premium-default)",
    },
  ],

  sizes: ["sm", "md", "lg", "xl"],

  states: [
    {
      name: "default",
      description: "Resting state. Component is interactive and available.",
      cssClass: "",
    },
    {
      name: "hover",
      description: "Signals clickability. Each variant has its own hover surface token.",
      cssClass: ":hover",
    },
    {
      name: "pressed",
      description: "Applies translateY(1px) and shadow-button-active. Provides tactile feedback.",
      cssClass: ":active",
    },
    {
      name: "disabled",
      description: "Blocks the action. pointer-events: none. Use when a condition must be met first.",
      cssClass: "btn--disabled",
    },
  ],

  tokens: [
    {
      cssVar: "--surface-button-primary-default",
      role: "background",
      description: "Primary variant surface.",
    },
    {
      cssVar: "--surface-button-primary-hover",
      role: "background",
      description: "Primary variant hover surface.",
    },
    {
      cssVar: "--surface-button-white-default",
      role: "background",
      description: "Secondary variant surface.",
    },
    {
      cssVar: "--surface-button-white-hover",
      role: "background",
      description: "Secondary variant hover surface.",
    },
    {
      cssVar: "--surface-button-transparent-default",
      role: "background",
      description: "Tertiary variant surface.",
    },
    {
      cssVar: "--surface-button-transparent-hover",
      role: "background",
      description: "Tertiary and ghost hover surface.",
    },
    {
      cssVar: "--surface-button-error-default",
      role: "background",
      description: "Danger variant surface.",
    },
    {
      cssVar: "--surface-button-error-hover",
      role: "background",
      description: "Danger variant hover surface.",
    },
    {
      cssVar: "--surface-button-premium-default",
      role: "background",
      description: "Premium variant surface. Gradient token.",
    },
    {
      cssVar: "--surface-button-premium-hover",
      role: "background",
      description: "Premium variant hover surface.",
    },
    {
      cssVar: "--surface-button-disabled",
      role: "background",
      description: "Shared disabled surface across all variants.",
    },
    {
      cssVar: "--text-action-light",
      role: "text",
      description: "Label color for dark-surface variants: primary, tertiary, danger, premium.",
    },
    {
      cssVar: "--text-action-dark",
      role: "text",
      description: "Label color for light-surface variant: secondary.",
    },
    {
      cssVar: "--text-action-light-disabled",
      role: "text",
      description: "Label color in disabled state across all variants.",
    },
    {
      cssVar: "--text-body-default",
      role: "text",
      description: "Label color for ghost variant only.",
    },
    {
      cssVar: "--shadow-button",
      role: "shadow",
      description: "Default elevation. Removed on ghost and disabled.",
    },
    {
      cssVar: "--shadow-button-active",
      role: "shadow",
      description: "Reduced shadow on :active to reinforce press feedback.",
    },
    {
      cssVar: "--shadow-text",
      role: "shadow",
      description: "Text shadow on dark-surface variants. Not applied to ghost or secondary.",
    },
    {
      cssVar: "--font-family-body",
      role: "spacing",
      description: "Button label typeface.",
    },
    {
      cssVar: "--font-weight-semibold",
      role: "spacing",
      description: "Button label weight.",
    },
    {
      cssVar: "--font-size-paragraph-lg",
      role: "spacing",
      description: "Label size for xl.",
    },
    {
      cssVar: "--font-size-paragraph-md",
      role: "spacing",
      description: "Label size for lg.",
    },
    {
      cssVar: "--font-size-paragraph-sm",
      role: "spacing",
      description: "Label size for md.",
    },
    {
      cssVar: "--font-size-paragraph-xsm",
      role: "spacing",
      description: "Label size for sm.",
    },
  ],

  props: {
    variant: {
      type: "string",
      options: ["primary", "secondary", "tertiary", "ghost", "danger", "premium"],
      default: "primary",
    },
    size: {
      type: "string",
      options: ["sm", "md", "lg", "xl"],
      default: "xl",
    },
    label: {
      type: "string",
      default: "Button",
      description: "Visible label text. Write as verb + noun: 'Start test', 'Save progress'.",
    },
    href: {
      type: "string",
      default: null,
      description: "When set, renders as <a> instead of <button>. Use for navigation, not actions.",
    },
    disabled: {
      type: "boolean",
      default: false,
      description: "Applies btn--disabled class and aria-disabled. Always explain to the user what unlocks the button.",
    },
  },

  slots: [
    {
      name: "icon-left",
      accepts: ["Icon"],
      required: false,
      description: "Use for action reinforcement, not decoration.",
    },
    {
      name: "icon-right",
      accepts: ["Icon"],
      required: false,
      description: "Use for directional cues. Avoid filling both icon slots at once.",
    },
  ],

  composition: {
    parentConstraints: "Never nest inside another interactive element or <a> tag. Avoid placing inside <form> tags.",
    commonPartners: ["Icon", "Badge", "Modal", "Card", "ProgressBar", "OptionCard"],
    validPairs: [
      { a: "primary",   b: "tertiary",  note: "Standard two-action flow. Default choice for confirm/cancel." },
      { a: "danger",    b: "tertiary",  note: "Destructive confirmation. Danger on the right, Tertiary on the left." },
      { a: "primary",   b: "secondary", note: "Only when both actions carry truly equal weight." },
      { a: "premium",   b: "ghost",     note: "Upgrade screens. Ghost handles 'maybe later'." },
    ],
    invalidPairs: [
      { a: "primary",  b: "primary",  reason: "Two primary buttons remove hierarchy." },
      { a: "premium",  b: "premium",  reason: "Premium impact depends on scarcity." },
      { a: "ghost",    b: "primary",  reason: "Ghost belongs inside dense layouts, not in two-action flows." },
    ],
  },

  accessibility: {
    role: "button",
    keyboardSupport: ["Enter", "Space"],
    screenReader: "Announces label text. Announces aria-disabled state when disabled.",
    wcag: ["1.4.3", "2.1.1", "2.4.7", "4.1.2"],
    notes: "When href is passed, the element renders as <a> with role link. Tab order and keyboard behavior change accordingly.",
  },

  aiHints: {
    priority: "high",
    useCases: [
      "Confirming an answer at the end of a quiz question.",
      "Starting or continuing a lesson.",
      "Unlocking a new level or badge.",
      "Submitting a streak check-in.",
      "Navigating to the next exercise (use href).",
      "Triggering a destructive action like quitting a lesson or resetting progress.",
      "Driving an upgrade to Premium.",
    ],
    antiPatterns: [
      {
        scenario: "Using primary for every action on a screen.",
        reason: "Visual hierarchy breaks when every action competes equally.",
        alternative: "Use one primary per screen. Default the second action to tertiary.",
      },
      {
        scenario: "Using danger without a confirmation step.",
        reason: "Destructive actions must have a checkpoint. Firing on first tap can cause irreversible loss.",
        alternative: "Show a confirmation modal or dialog before executing the danger action.",
      },
      {
        scenario: "Using ghost in a two-action decision flow.",
        reason: "Ghost has too little visual weight to represent a meaningful choice.",
        alternative: "Use tertiary for the secondary action in decision flows.",
      },
      {
        scenario: "Using disabled without explaining what unlocks it.",
        reason: "A disabled button with no explanation is a dead end for the user.",
        alternative: "Always pair a disabled button with helper text explaining the unlock condition.",
      },
      {
        scenario: "Stacking two premium buttons on the same screen.",
        reason: "Premium's conversion power depends on scarcity. Repeating it dilutes the signal.",
        alternative: "One premium button per screen. Use ghost for secondary upgrade-related actions.",
      },
      {
        scenario: "Using href on a button that triggers a mutation.",
        reason: "href renders an <a> tag, which communicates navigation to assistive tech and browsers.",
        alternative: "Use onClick for actions. Use href only for destinations.",
      },
    ],
  },
}
