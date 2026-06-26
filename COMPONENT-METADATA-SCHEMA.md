# Component Metadata Schema

Cada componente de Dino debe tener un archivo `[nombre].meta.js` en `src/data/`.
Este archivo es para consumo de AI agents. No es documentación para humanos.

## Schema

```js
export const metadata = {
  component: {
    name: "string — PascalCase, igual que el componente Astro",
    category: "atom | molecule | organism",
    description: "string — qué hace en una frase",
    type: "interactive | display | container | input | navigation"
  },

  variants: [
    {
      name: "string — nombre exacto de la prop/variant",
      description: "string — cuándo elegir esta variante",
      token: "string — CSS var principal que define su apariencia"
    }
  ],

  states: [
    {
      name: "string — default | hover | disabled | error | focus | pressed",
      description: "string — qué comunica este estado al usuario",
      cssClass: "string — clase CSS aplicada, o null si es pseudo-clase"
    }
  ],

  tokens: [
    {
      cssVar: "string — nombre exacto del CSS var",
      role: "surface | text | border | icon | shadow",
      description: "string — por qué este componente usa este token"
    }
  ],

  composition: {
    parentConstraints: ["string — en qué contextos puede vivir"],
    commonPartners: ["string — componentes que aparecen junto a este con frecuencia"],
    slots: {
      "nombre-slot": "string — qué acepta y si es obligatorio u opcional"
    }
  },

  accessibility: {
    role: "string — ARIA role del elemento raíz",
    keyboardSupport: "string — teclas que activan o navegan el componente",
    screenReader: "string — qué anuncia un lector de pantalla al enfocarlo",
    wcag: "AA"
  },

  aiHints: {
    priority: "high | medium | low",
    useCases: ["string — situación concreta donde usar este componente"],
    antiPatterns: [
      {
        scenario: "string — qué hace mal el agente con frecuencia",
        reason: "string — por qué está mal",
        alternative: "string — qué debe hacer en cambio"
      }
    ]
  }
}
```

## Reglas de nomenclatura en Figma

Los componentes en Figma usan este formato de prop:
- `type=primary` → variant name: "primary"
- `size=extra large` → size: "xl"
- `status=default` → state name: "default"

## Ejemplo — Button

```js
export const metadata = {
  component: {
    name: "Button",
    category: "atom",
    description: "Dispara una acción. No navega a menos que se le pase href.",
    type: "interactive"
  },

  variants: [
    { name: "primary", description: "Acción principal de la pantalla. Máximo uno por vista.", token: "--surface-button-primary-default" },
    { name: "secondary", description: "Acción de igual peso que primary. Usar solo cuando ambas opciones importan igual.", token: "--surface-button-secondary-default" },
    { name: "tertiary", description: "Acción que debe receder visualmente. Para cancelar o acciones opcionales.", token: "none" },
    { name: "ghost", description: "Acción inline en layouts densos. No usar en flujos de decisión.", token: "--surface-button-transparent-default" },
    { name: "danger", description: "Acción destructiva e irreversible. Siempre con confirmación y Tertiary junto a él.", token: "--surface-button-error-default" },
    { name: "premium", description: "Desbloquea contenido de pago. Reemplaza a primary en pantallas de upgrade.", token: "--surface-button-premium-default" }
  ],

  states: [
    { name: "default", description: "Estado de reposo. Acción disponible.", cssClass: null },
    { name: "hover", description: "Feedback visual al pasar el cursor o el foco.", cssClass: null },
    { name: "pressed", description: "Feedback de pulsación.", cssClass: "is-active" },
    { name: "disabled", description: "Acción bloqueada. Siempre explicar qué necesita el estudiante para desbloquearla.", cssClass: "is-disabled" }
  ],

  tokens: [
    { cssVar: "--surface-button-primary-default", role: "surface", description: "Fondo del botón primary en reposo." },
    { cssVar: "--surface-button-primary-hover", role: "surface", description: "Fondo del botón primary en hover." },
    { cssVar: "--surface-button-disabled", role: "surface", description: "Fondo de cualquier variante en disabled." },
    { cssVar: "--text-action-light", role: "text", description: "Etiqueta en botones con fondo oscuro (primary, danger, premium)." },
    { cssVar: "--text-action-dark", role: "text", description: "Etiqueta en botones con fondo claro (white)." },
    { cssVar: "--text-action-light-disabled", role: "text", description: "Etiqueta cuando el botón está deshabilitado." },
    { cssVar: "--shadow-button", role: "shadow", description: "Sombra que da profundidad al botón en reposo." },
    { cssVar: "--shadow-button-active", role: "shadow", description: "Sombra reducida que simula la pulsación." }
  ],

  composition: {
    parentConstraints: ["footer de pantalla", "dialogs de confirmación", "headers de sección", "forms"],
    commonPartners: ["Button (tertiary como cancelar)", "ProgressBar (encima en flujos de quiz)", "OptionCard (el Button confirma la selección)"],
    slots: {
      "icon-left": "Icono SVG opcional. Refuerza la acción. No usar junto a icon-right.",
      "icon-right": "Icono SVG opcional. Para indicar dirección. No usar junto a icon-left.",
      "label": "Texto del botón. Obligatorio. Formato: verbo + objeto ('Guardar progreso', 'Salir de la lección')."
    }
  },

  accessibility: {
    role: "button (o link si tiene href)",
    keyboardSupport: "Enter y Space activan el botón. Tab navega entre botones.",
    screenReader: "Anuncia el label y el estado (disabled si aplica).",
    wcag: "AA"
  },

  aiHints: {
    priority: "high",
    useCases: [
      "Confirmar la selección en un quiz",
      "Continuar al siguiente paso de un flujo",
      "Abandonar una lección (variant danger)",
      "Desbloquear contenido premium (variant premium)"
    ],
    antiPatterns: [
      { scenario: "Dos botones primary en la misma pantalla", reason: "El usuario no sabe qué hacer primero.", alternative: "Uno primary, el otro tertiary o secondary." },
      { scenario: "Ghost en un flujo de decisión", reason: "No tiene peso visual suficiente para representar una opción importante.", alternative: "Secondary si ambas tienen igual peso, tertiary si una debe receder." },
      { scenario: "Danger sin confirmación", reason: "Las acciones destructivas son irreversibles.", alternative: "Dialog de confirmación con danger + tertiary antes de ejecutar." },
      { scenario: "Label vago como OK, Submit o Click here", reason: "El usuario no sabe qué va a pasar.", alternative: "Verbo + objeto: 'Guardar progreso', 'Enviar respuesta'." }
    ]
  }
}
```
