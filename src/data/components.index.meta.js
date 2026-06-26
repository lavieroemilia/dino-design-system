export const dinoComponentsIndex = {
  version: "1.0.0",
  theme: "dark-by-default",
  tokenSource: "src/styles/global.css y src/data/tokens_tokens.json",
  tokenLayers: [
    "Brand — primitivos: --green-500, --purple-default",
    "Semantic — roles: --primary-600, --error-default",
    "Components/Dark — uso en componentes: --surface-button-primary-default"
  ],
  figmaFileKey: "buQi7JYJvoqL0Lt5peBqtw",

  components: [
    {
      name: "Button",
      category: "atom",
      type: "interactive",
      description: "Dispara acciones. Seis variantes, cuatro tamaños, un estado disabled.",
      figmaNodeId: "15:475",
      metaFile: "src/data/button.meta.js",
      docPage: "/components/button",
      status: "stable"
    },
    {
      name: "Field",
      category: "atom",
      type: "input",
      description: "Campo de texto de una línea. Estados default, focus, error y disabled.",
      figmaNodeId: "15:12352",
      metaFile: "src/data/field.meta.js",
      docPage: "/components/field",
      status: "stable"
    },
    {
      name: "Label",
      category: "atom",
      type: "display",
      description: "Etiqueta de categoría o estado. Solo lectura, nunca interactiva.",
      figmaNodeId: "15:12072",
      metaFile: "src/data/label.meta.js",
      docPage: "/components/label",
      status: "stable"
    },
    {
      name: "OptionCard",
      category: "molecule",
      type: "interactive",
      description: "Tarjeta seleccionable para respuestas de quiz. Estados correct, incorrect, selected.",
      figmaNodeId: "68:1562",
      metaFile: "src/data/option-card.meta.js",
      docPage: "/components/option-card",
      status: "stable"
    },
    {
      name: "ProgressBar",
      category: "atom",
      type: "display",
      description: "Barra de progreso de lección. Variantes de color según estado del estudiante.",
      figmaNodeId: "38:254",
      metaFile: "src/data/progress-bar.meta.js",
      docPage: "/components/progress-bar",
      status: "stable"
    },
    {
      name: "SectionHeader",
      category: "molecule",
      type: "display",
      description: "Cabecera de sección con título, subtítulo y slot para acción opcional.",
      figmaNodeId: "82:7126",
      metaFile: "src/data/section-header.meta.js",
      docPage: "/components/section-header",
      status: "stable"
    }
  ]
}
