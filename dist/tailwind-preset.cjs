// DIBANGKITKAN dari tokens.json oleh scripts/build.mjs, jangan diedit manual.
// Tailwind v3. Wajib juga mengimpor tokens.css (variabel --primary dkk.).
module.exports = {
  "darkMode": [
    "class"
  ],
  "theme": {
    "extend": {
      "colors": {
        "medistra": {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#00730D",
          "800": "#005009",
          "900": "#012e11"
        },
        "slate": {
          "50": "#f8fafc",
          "100": "#f1f5f9",
          "200": "#e2e8f0",
          "300": "#cbd5e1",
          "400": "#94a3b8",
          "500": "#64748b",
          "600": "#475569",
          "700": "#334155",
          "800": "#1e293b",
          "900": "#0f172a"
        },
        "kritis": {
          "DEFAULT": "var(--color-kritis)",
          "bg": "var(--color-kritis-bg)",
          "border": "var(--color-kritis-border)",
          "solid": "var(--color-kritis-solid)"
        },
        "on-kritis": "var(--color-on-kritis)",
        "waspada": {
          "DEFAULT": "var(--color-waspada)",
          "bg": "var(--color-waspada-bg)",
          "border": "var(--color-waspada-border)",
          "solid": "var(--color-waspada-solid)"
        },
        "on-waspada": "var(--color-on-waspada)",
        "normal": {
          "DEFAULT": "var(--color-normal)",
          "bg": "var(--color-normal-bg)",
          "border": "var(--color-normal-border)",
          "solid": "var(--color-normal-solid)"
        },
        "on-normal": "var(--color-on-normal)",
        "info": {
          "DEFAULT": "var(--color-info)",
          "bg": "var(--color-info-bg)",
          "border": "var(--color-info-border)",
          "solid": "var(--color-info-solid)"
        },
        "on-info": "var(--color-on-info)",
        "background": "rgb(var(--background-rgb) / <alpha-value>)",
        "foreground": "rgb(var(--foreground-rgb) / <alpha-value>)",
        "card": {
          "DEFAULT": "rgb(var(--card-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--card-foreground-rgb) / <alpha-value>)"
        },
        "popover": {
          "DEFAULT": "rgb(var(--popover-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--popover-foreground-rgb) / <alpha-value>)"
        },
        "primary": {
          "DEFAULT": "rgb(var(--primary-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--primary-foreground-rgb) / <alpha-value>)"
        },
        "secondary": {
          "DEFAULT": "rgb(var(--secondary-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--secondary-foreground-rgb) / <alpha-value>)"
        },
        "muted": {
          "DEFAULT": "rgb(var(--muted-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--muted-foreground-rgb) / <alpha-value>)"
        },
        "accent": {
          "DEFAULT": "rgb(var(--accent-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--accent-foreground-rgb) / <alpha-value>)"
        },
        "destructive": {
          "DEFAULT": "rgb(var(--destructive-rgb) / <alpha-value>)",
          "foreground": "rgb(var(--destructive-foreground-rgb) / <alpha-value>)"
        },
        "border": "rgb(var(--border-rgb) / <alpha-value>)",
        "input": "rgb(var(--input-rgb) / <alpha-value>)",
        "ring": "rgb(var(--ring-rgb) / <alpha-value>)"
      },
      "fontFamily": {
        "sans": [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
        "heading": [
          "Outfit",
          "Inter",
          "system-ui",
          "sans-serif"
        ],
        "mono": [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace"
        ]
      },
      "borderRadius": {
        "xs": "2px",
        "sm": "4px",
        "md": "8px",
        "lg": "16px",
        "xl": "32px",
        "DEFAULT": "var(--radius)"
      },
      "boxShadow": {
        "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }
    }
  }
};
