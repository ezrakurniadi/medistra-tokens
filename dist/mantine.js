/* DIBANGKITKAN dari tokens.json oleh scripts/build.mjs, jangan diedit manual. */
// Objek polos untuk createTheme() Mantine v7+; paket ini tidak bergantung pada @mantine/core.
//   import { createTheme } from '@mantine/core';
//   import { mantineTheme } from '@ezrakurniadi/medistra-tokens/mantine';
//   export const theme = createTheme({ ...mantineTheme, components: { ... } });
export const mantineTheme = {
  "primaryColor": "medistra",
  "primaryShade": 7,
  "autoContrast": true,
  "fontFamily": "Inter, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif",
  "fontFamilyMonospace": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  "headings": {
    "fontFamily": "Outfit, Inter, system-ui, sans-serif",
    "fontWeight": "700"
  },
  "colors": {
    "medistra": [
      "#f0fdf4",
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a",
      "#00730D",
      "#005009",
      "#012e11"
    ],
    "slate": [
      "#f8fafc",
      "#f1f5f9",
      "#e2e8f0",
      "#cbd5e1",
      "#94a3b8",
      "#64748b",
      "#475569",
      "#334155",
      "#1e293b",
      "#0f172a"
    ],
    "dark": [
      "#f1f5f9",
      "#e2e8f0",
      "#cbd5e1",
      "#94a3b8",
      "#64748b",
      "#475569",
      "#1e293b",
      "#0f172a",
      "#0b1120",
      "#020617"
    ]
  },
  "defaultRadius": "md",
  "radius": {
    "xs": "0.125rem",
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "1rem",
    "xl": "2rem"
  },
  "spacing": {
    "xs": "0.625rem",
    "sm": "0.75rem",
    "md": "1rem",
    "lg": "1.25rem",
    "xl": "2rem"
  },
  "shadows": {
    "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
  },
  "other": {
    "status": {
      "kritis": {
        "fg": "#b91c1c",
        "bg": "#fef2f2",
        "border": "#fecaca",
        "solid": "#b91c1c",
        "on-solid": "#ffffff",
        "fg-dark": "#fca5a5"
      },
      "waspada": {
        "fg": "#b45309",
        "bg": "#fffbeb",
        "border": "#fde68a",
        "solid": "#b45309",
        "on-solid": "#ffffff",
        "fg-dark": "#fcd34d"
      },
      "normal": {
        "fg": "#15803d",
        "bg": "#f0fdf4",
        "border": "#bbf7d0",
        "solid": "#15803d",
        "on-solid": "#ffffff",
        "fg-dark": "#86efac"
      },
      "info": {
        "fg": "#1d4ed8",
        "bg": "#eff6ff",
        "border": "#bfdbfe",
        "solid": "#1d4ed8",
        "on-solid": "#ffffff",
        "fg-dark": "#93c5fd"
      }
    },
    "semantic": {
      "light": {
        "background": "#ffffff",
        "foreground": "#334155",
        "card": "#ffffff",
        "card-foreground": "#334155",
        "popover": "#ffffff",
        "popover-foreground": "#334155",
        "primary": "#00730D",
        "primary-foreground": "#ffffff",
        "secondary": "#f1f5f9",
        "secondary-foreground": "#0f172a",
        "muted": "#f1f5f9",
        "muted-foreground": "#475569",
        "accent": "#f0fdf4",
        "accent-foreground": "#005009",
        "destructive": "#b91c1c",
        "destructive-foreground": "#ffffff",
        "border": "#e2e8f0",
        "input": "#64748b",
        "ring": "#00730D"
      },
      "dark": {
        "background": "#0f172a",
        "foreground": "#f1f5f9",
        "card": "#1e293b",
        "card-foreground": "#f1f5f9",
        "popover": "#1e293b",
        "popover-foreground": "#f1f5f9",
        "primary": "#4ade80",
        "primary-foreground": "#012e11",
        "secondary": "#1e293b",
        "secondary-foreground": "#f1f5f9",
        "muted": "#1e293b",
        "muted-foreground": "#94a3b8",
        "accent": "#012e11",
        "accent-foreground": "#bbf7d0",
        "destructive": "#fca5a5",
        "destructive-foreground": "#0f172a",
        "border": "#334155",
        "input": "#64748b",
        "ring": "#4ade80"
      }
    }
  }
};
