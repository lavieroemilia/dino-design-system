export default {
  component: {
    name: "ProgressBar",
    category: "atom",
    description: "Shows how far a student has progressed toward a goal. Works for lesson completion, fossil collection, or any measurable target with a known end.",
    type: "display",
  },

  variants: [
    {
      name: "yellow",
      description: "Default. Use for general lesson or exercise progress.",
      token: "var(--gradient-yellow)",
    },
    {
      name: "green",
      description: "Use for subjects or categories associated with green in the app's color-per-subject system.",
      token: "var(--gradient-green)",
    },
    {
      name: "red",
      description: "Use for subjects or categories associated with red.",
      token: "var(--gradient-red)",
    },
    {
      name: "orange",
      description: "Use for subjects or categories associated with orange.",
      token: "var(--gradient-orange)",
    },
    {
      name: "purple",
      description: "Use for subjects or categories associated with purple.",
      token: "var(--gradient-purple)",
    },
  ],

  sizes: [
    {
      name: "lg",
      height: "24px",
      description: "Default. Use at the top of lesson screens as the primary progress indicator.",
      supportsLabel: true,
    },
    {
      name: "md",
      height: "20px",
      description: "Secondary progress indicator. Still supports count and icon overlay.",
      supportsLabel: true,
    },
    {
      name: "sm",
      height: "12px",
      description: "Compact indicator inside cards or tight layouts. count and showIcon are silently ignored.",
      supportsLabel: false,
    },
    {
      name: "xs",
      height: "6px",
      description: "Minimal indicator. Decorative use only. count and showIcon are silently ignored.",
      supportsLabel: false,
    },
  ],

  states: [
    {
      name: "empty",
      description: "value is 0. Fill is invisible but the track is visible.",
      cssClass: "",
    },
    {
      name: "partial",
      description: "value between 1 and 99. Normal use.",
      cssClass: "",
    },
    {
      name: "complete",
      description: "value is 100. Fill covers the full track. The parent screen should trigger a celebration state.",
      cssClass: "",
    },
  ],

  tokens: [
    {
      cssVar: "--gradient-yellow",
      role: "background",
      description: "Fill gradient for yellow variant.",
    },
    {
      cssVar: "--gradient-green",
      role: "background",
      description: "Fill gradient for green variant.",
    },
    {
      cssVar: "--gradient-red",
      role: "background",
      description: "Fill gradient for red variant.",
    },
    {
      cssVar: "--gradient-orange",
      role: "background",
      description: "Fill gradient for orange variant.",
    },
    {
      cssVar: "--gradient-purple",
      role: "background",
      description: "Fill gradient for purple variant.",
    },
    {
      cssVar: "--black-20",
      role: "background",
      description: "Track background. The unfilled portion of the bar.",
    },
    {
      cssVar: "--black-60",
      role: "shadow",
      description: "Inset shadow on the track and text-shadow on the count label.",
    },
    {
      cssVar: "--neutral-white-100",
      role: "text",
      description: "Count label text color.",
    },
    {
      cssVar: "--font-family-body",
      role: "spacing",
      description: "Count label typeface.",
    },
    {
      cssVar: "--font-size-paragraph-xsm",
      role: "spacing",
      description: "Count label font size.",
    },
    {
      cssVar: "--font-weight-semibold",
      role: "spacing",
      description: "Count label font weight.",
    },
  ],

  props: {
    value: {
      type: "number",
      default: 0,
      description: "Progress percentage. Clamped to 0–100 internally. Always pass a number, never a string.",
    },
    size: {
      type: "string",
      options: ["lg", "md", "sm", "xs"],
      default: "lg",
    },
    color: {
      type: "string",
      options: ["yellow", "green", "red", "orange", "purple"],
      default: "yellow",
      description: "Assign one color per subject and never change it mid-session. Students recognize subjects by color.",
    },
    label: {
      type: "string",
      default: null,
      description: "Accessible label for the progressbar role. Defaults to 'Progress: {value}%' if not provided.",
    },
    count: {
      type: "string",
      default: null,
      description: "Text overlay on the bar. Format: 'current / total' (e.g. '50 / 300'). Only visible on lg and md. Silently ignored on sm and xs.",
    },
    showIcon: {
      type: "boolean",
      default: false,
      description: "Shows the fossil (Caracola) icon alongside the count. Only visible on lg and md. Can be used without count.",
    },
  },

  slots: [],

  composition: {
    parentConstraints: "Needs a defined width from its parent. Renders width: 100% by default.",
    commonPartners: ["Button", "OptionCard", "SectionHeader"],
    placementRules: [
      "Place at the top of lesson screens, above the question content.",
      "In cards, use sm or xs as a secondary indicator below the card title.",
      "Never place mid-paragraph or between answer choices.",
    ],
    colorSystem: "One color per subject, defined at the app level and passed consistently. Changing a subject's color mid-session breaks the pattern students have learned.",
  },

  accessibility: {
    role: "progressbar",
    keyboardSupport: [],
    screenReader: "Announces via aria-valuenow, aria-valuemin (0), aria-valuemax (100), and aria-label. Screen readers will say the percentage. The label prop overrides the default 'Progress: {value}%' announcement.",
    wcag: ["1.3.1", "1.4.1", "4.1.2"],
    notes: "Color is never the only signal — the fill width communicates progress independently of color. Always provide a meaningful aria-label via the label prop when context isn't obvious.",
  },

  aiHints: {
    priority: "high",
    useCases: [
      "Top of a lesson screen showing how many exercises remain.",
      "Fossil collection tracker showing current vs. total fossils.",
      "Dashboard card showing a student's subject completion rate.",
      "Compact progress indicator in a course list row.",
    ],
    antiPatterns: [
      {
        scenario: "Passing count or showIcon with size sm or xs.",
        reason: "The overlay is silently ignored on small sizes. The agent will think it rendered but the user sees nothing.",
        alternative: "Only use count and showIcon with size lg or md.",
      },
      {
        scenario: "Using multiple colors for the same subject across screens.",
        reason: "Students build a mental map of subject → color. Inconsistency erases that pattern.",
        alternative: "Define the color-per-subject mapping at the app level and pass it consistently.",
      },
      {
        scenario: "Letting the bar reach 100% without any parent-level response.",
        reason: "Completing a goal is a key motivational moment. A silent completion feels like a bug.",
        alternative: "Trigger a celebration state (animation, badge, success message) in the parent when value reaches 100.",
      },
      {
        scenario: "Passing a string to the value prop.",
        reason: "The component clamps the value with Math.min/Math.max. These don't work on strings.",
        alternative: "Always pass value as a number. Convert before passing: value={Number(raw)}.",
      },
    ],
  },
}
