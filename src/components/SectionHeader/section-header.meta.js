export default {
  component: {
    name: "SectionHeader",
    category: "organism",
    description: "Floating card at the top of the Home screen that tells students which section they're in and links to the theory content. Purpose-built for the learning map. Not a general-purpose card.",
    type: "navigation",
  },

  variants: [
    {
      name: "default",
      description: "Resting state. Card floats above the map with full elevation.",
      token: "var(--surface-default-dark)",
    },
    {
      name: "hover",
      description: "Surface brightens. Signals the card is tappable.",
      token: "var(--surface-hover-dark)",
    },
    {
      name: "pressed",
      description: "Card shifts down 4px and inner shadow disappears. Simulates physical button depth via padding inversion.",
      token: "var(--surface-hover-dark)",
    },
    {
      name: "disabled",
      description: "Section is locked. Student cannot navigate to it. cursor: not-allowed, tabindex -1.",
      token: "var(--surface-disabled-dark)",
    },
  ],

  states: [
    {
      name: "default",
      description: "Resting. Full drop shadow and inner shadow visible.",
      cssClass: "section-header--default",
    },
    {
      name: "hover",
      description: "Background brightens. Hover and pressed are handled by :hover/:active in the real app.",
      cssClass: "section-header--hover",
    },
    {
      name: "pressed",
      description: "Padding inverts (top increases, bottom decreases). Inner shadow hidden. Box shadow removed. Card visually depresses.",
      cssClass: "section-header--pressed",
    },
    {
      name: "disabled",
      description: "Muted surface. Text and icon opacity reduced. tabindex='-1' removes it from keyboard navigation.",
      cssClass: "section-header--disabled",
    },
  ],

  tokens: [
    {
      cssVar: "--surface-default-dark",
      role: "background",
      description: "Card and box layer background in default state.",
    },
    {
      cssVar: "--surface-hover-dark",
      role: "background",
      description: "Card and box layer background on hover and pressed.",
    },
    {
      cssVar: "--surface-disabled-dark",
      role: "background",
      description: "Card and box layer background in disabled state.",
    },
    {
      cssVar: "--surface-button-transparent-default",
      role: "background",
      description: "Icon button and inner box layer background.",
    },
    {
      cssVar: "--neutral-white-70",
      role: "text",
      description: "Theme subtitle text color (e.g. 'Tema 1, bloque 1').",
    },
    {
      cssVar: "--text-headings",
      role: "text",
      description: "Section title text color.",
    },
    {
      cssVar: "--text-action-light-disabled",
      role: "text",
      description: "Text color for both theme and title in disabled state.",
    },
    {
      cssVar: "--neutral-black-20",
      role: "shadow",
      description: "Card drop shadow.",
    },
    {
      cssVar: "--neutral-black-30",
      role: "shadow",
      description: "Card inner shadow (bottom) and icon button inner shadow.",
    },
    {
      cssVar: "--radius-xlg",
      role: "radius",
      description: "Card and background layer corner rounding.",
    },
    {
      cssVar: "--radius-lg",
      role: "radius",
      description: "Depth box layer corner rounding.",
    },
    {
      cssVar: "--radius-md",
      role: "radius",
      description: "Icon button corner rounding.",
    },
    {
      cssVar: "--spacing-8",
      role: "spacing",
      description: "Gap between text block and icon button.",
    },
    {
      cssVar: "--spacing-12",
      role: "spacing",
      description: "Card horizontal padding and default top padding.",
    },
    {
      cssVar: "--spacing-16",
      role: "spacing",
      description: "Card bottom padding (default) and top padding (pressed state).",
    },
    {
      cssVar: "--spacing-40",
      role: "spacing",
      description: "Icon button width and height.",
    },
    {
      cssVar: "--font-family-body",
      role: "spacing",
      description: "Typeface for both theme subtitle and section title.",
    },
    {
      cssVar: "--font-size-paragraph-sm",
      role: "spacing",
      description: "Theme subtitle font size.",
    },
    {
      cssVar: "--font-weight-medium",
      role: "spacing",
      description: "Theme subtitle font weight.",
    },
    {
      cssVar: "--font-size-paragraph-md",
      role: "spacing",
      description: "Section title font size.",
    },
    {
      cssVar: "--font-weight-semibold",
      role: "spacing",
      description: "Section title font weight.",
    },
    {
      cssVar: "--scale-150",
      role: "spacing",
      description: "6px gap between theme subtitle and section title. No --spacing-6 token exists; uses raw scale token instead.",
    },
  ],

  props: {
    theme: {
      type: "string",
      default: "Tema 1, bloque 1",
      description: "Subtitle line. Communicates where in the curriculum this section lives. Truncates with ellipsis if too long.",
    },
    sectionTitle: {
      type: "string",
      default: "Section Title",
      description: "Main bold title. The section name. Keep short enough to fit one line — overflow is clipped silently.",
    },
    status: {
      type: "string",
      options: ["default", "hover", "pressed", "disabled"],
      default: "default",
      description: "hover and pressed are handled automatically in the real app. Pass them only in playground or static preview contexts. Only pass disabled when the section is locked.",
    },
    id: {
      type: "string",
      default: null,
      description: "Optional id for playground scripting or external targeting.",
    },
  },

  slots: [],

  composition: {
    parentConstraints: "Floats above the learning map on the Home screen. Must not be embedded between path nodes or inside a scrollable list. Position is fixed or sticky relative to the map container.",
    commonPartners: ["ProgressBar"],
    placementRules: [
      "Always at the top of the Home screen, above the path nodes.",
      "Never inside another card or container component.",
      "Always reflects the student's current section in real time.",
    ],
    interactionModel: {
      cardTap: "Opens the subject detail view.",
      bookIconTap: "Goes directly to the theory content for this section.",
      note: "If both destinations are the same screen, both handlers can point to the same route. If they differ, pass separate handlers.",
    },
  },

  accessibility: {
    role: "button",
    keyboardSupport: ["Tab to focus", "Enter or Space to activate", "Tab to reach the inner book icon button"],
    screenReader: "The card wrapper has role='button'. The inner book icon button has aria-label='Abrir contenido de la sección'. aria-disabled='true' is set when status is disabled.",
    wcag: ["1.3.1", "2.1.1", "2.4.3", "2.4.6", "4.1.2"],
    notes: "The component uses role='button' on a <div>, not a native <button>. This is intentional for layout flexibility but requires that all keyboard behaviors (Enter, Space) are handled by the consuming app's event bindings.",
  },

  aiHints: {
    priority: "medium",
    useCases: [
      "Home screen header showing the student's active section.",
      "Navigation entry point to subject detail or theory view.",
      "Locked section indicator when prerequisites haven't been completed.",
    ],
    antiPatterns: [
      {
        scenario: "Using SectionHeader outside the Home screen as a general card component.",
        reason: "Its visual language, interaction model, and copy structure are all specific to the learning map context.",
        alternative: "Use a generic card pattern for other contexts. SectionHeader is not a reusable card.",
      },
      {
        scenario: "Embedding SectionHeader between path nodes in the map.",
        reason: "The component is designed to float above the map, not inside it. Placing it mid-map breaks the visual hierarchy.",
        alternative: "Position it at the top of the map container, outside the path node list.",
      },
      {
        scenario: "Letting theme or sectionTitle overflow without checking length.",
        reason: "Both text elements truncate with ellipsis. There is no tooltip or expand behavior. Long text disappears.",
        alternative: "Enforce character limits at the data level: theme under ~30 chars, sectionTitle under ~40 chars.",
      },
      {
        scenario: "Showing a stale section title when the student advances.",
        reason: "The card should always reflect the current section. A stale title disorients the student.",
        alternative: "Bind theme and sectionTitle to the student's live progress state, not a static value.",
      },
    ],
  },
}
