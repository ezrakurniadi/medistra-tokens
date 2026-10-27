// Membangun dist/ dari tokens.json. Tanpa dependensi; cukup Node >= 18.
//   node scripts/build.mjs          → tulis dist/
//   node scripts/build.mjs --check  → gagal kalau dist/ tidak sama dengan hasil build
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadTokens, semantic, hexToRgb } from "./lib.mjs";

const t = loadTokens();
const light = semantic(t, "light");
const dark = semantic(t, "dark");
const STATUS = Object.keys(t.color.status);
const HEADER = "/* DIBANGKITKAN dari tokens.json oleh scripts/build.mjs, jangan diedit manual. */\n";
const DARK_SELECTOR = '.dark, [data-mantine-color-scheme="dark"]';

const decl = (entries, indent = "  ") => entries.map(([k, v]) => `${indent}${k}: ${v};`).join("\n");

// ---- Variabel dasar (dipakai tokens.css dan @theme v4; nama mengikuti konvensi Tailwind v4) ----
function baseVars() {
  const out = [];
  for (const pal of ["medistra", "slate"])
    for (const [shade, hex] of Object.entries(t.color[pal])) out.push([`--color-${pal}-${shade}`, hex]);
  for (const s of STATUS) {
    const c = t.color.status[s];
    out.push(
      [`--color-${s}`, c.fg],
      [`--color-${s}-bg`, c.bg],
      [`--color-${s}-border`, c.border],
      [`--color-${s}-solid`, c.solid],
      [`--color-on-${s}`, c["on-solid"]],
    );
  }
  out.push(["--font-sans", t.font.sans], ["--font-heading", t.font.heading], ["--font-mono", t.font.mono]);
  for (const [k, v] of Object.entries(t.radius)) if (k !== "default") out.push([`--radius-${k}`, v]);
  for (const [k, v] of Object.entries(t.shadow)) out.push([`--shadow-${k}`, v]);
  return out;
}

// Variabel semantik gaya shadcn (--primary dkk.) + versi kanal RGB untuk preset v3 (opacity modifier).
function semanticVars(sem, mode) {
  const out = Object.entries(sem).map(([k, v]) => [`--${k}`, v]);
  out.push(...Object.entries(sem).map(([k, v]) => [`--${k}-rgb`, hexToRgb(v).join(" ")]));
  // Warna teks status ikut mode: di latar gelap pakai varian terang.
  if (mode === "dark") for (const s of STATUS) out.push([`--color-${s}`, t.color.status[s]["fg-dark"]]);
  return out;
}

const SPACING = Object.entries(t.spacing).map(([k, v]) => [`--space-${k}`, v]);

function semanticBlocks() {
  return (
    `:root {\n${decl([["--radius", t.radius.default], ...semanticVars(light, "light")])}\n}\n\n` +
    `${DARK_SELECTOR} {\n  color-scheme: dark;\n${decl(semanticVars(dark, "dark"))}\n}\n`
  );
}

// ---- (a) CSS variables polos ----
const tokensCss =
  HEADER +
  `:root {\n${decl([...baseVars(), ...SPACING])}\n}\n\n` +
  semanticBlocks();

// ---- (b1) Tailwind v4: @theme + variabel shadcn ----
const SEM_KEYS = Object.keys(light);
const tailwindV4 =
  HEADER +
  `/* Pakai: @import "tailwindcss"; @import "@ezrakurniadi/medistra-tokens/tailwind-v4.css"; */\n` +
  `@theme {\n${decl(baseVars())}\n}\n\n` +
  `/* Spasi tidak dimasukkan ke @theme: --spacing-md akan menimpa max-w-md dkk. */\n` +
  `:root {\n${decl(SPACING)}\n}\n\n` +
  semanticBlocks() +
  `\n@theme inline {\n${decl(SEM_KEYS.map((k) => [`--color-${k}`, `var(--${k})`]))}\n}\n`;

// ---- (b2) Tailwind v3 preset ----
const rgbVar = (k) => `rgb(var(--${k}-rgb) / <alpha-value>)`;
const semColors = {};
for (const k of SEM_KEYS) {
  const [base, fg] = k.endsWith("-foreground") ? [k.slice(0, -"-foreground".length), true] : [k, false];
  if (["border", "input", "ring", "background", "foreground"].includes(k)) {
    semColors[k] = rgbVar(k);
    continue;
  }
  semColors[base] ??= {};
  semColors[base][fg ? "foreground" : "DEFAULT"] = rgbVar(k);
}
const statusColors = Object.fromEntries(
  STATUS.flatMap((s) => [
    [s, { DEFAULT: `var(--color-${s})`, bg: `var(--color-${s}-bg)`, border: `var(--color-${s}-border)`, solid: `var(--color-${s}-solid)` }],
    [`on-${s}`, `var(--color-on-${s})`],
  ]),
);
const splitFont = (s) => s.split(",").map((x) => x.trim().replace(/^"|"$/g, ""));
const preset = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: { medistra: t.color.medistra, slate: t.color.slate, ...statusColors, ...semColors },
      fontFamily: { sans: splitFont(t.font.sans), heading: splitFont(t.font.heading), mono: splitFont(t.font.mono) },
      borderRadius: { ...Object.fromEntries(Object.entries(t.radius).filter(([k]) => k !== "default")), DEFAULT: "var(--radius)" },
      boxShadow: t.shadow,
    },
  },
};
const tailwindPreset =
  HEADER.replace("/*", "//").replace(" */", "") +
  "// Tailwind v3. Wajib juga mengimpor tokens.css (variabel --primary dkk.).\n" +
  `module.exports = ${JSON.stringify(preset, null, 2)};\n`;

// ---- (c) Mantine ----
const shades = (pal) => Object.values(t.color[pal]);
const pxToRem = (v) => `${parseFloat(v) / 16}rem`;
const mantine = {
  primaryColor: "medistra",
  primaryShade: 7,
  autoContrast: true,
  fontFamily: t.font.sans,
  fontFamilyMonospace: t.font.mono,
  headings: { fontFamily: t.font.heading, fontWeight: t.font["weight-heading"] },
  colors: {
    medistra: shades("medistra"),
    slate: shades("slate"),
    // Skala "dark" Mantine: [0] teks terang ... [7] latar body; disusun dari slate.
    dark: [
      t.color.slate["100"], t.color.slate["200"], t.color.slate["300"], t.color.slate["400"], t.color.slate["500"],
      t.color.slate["600"], t.color.slate["800"], t.color.slate["900"], "#0b1120", "#020617",
    ],
  },
  defaultRadius: "md",
  radius: Object.fromEntries(Object.entries(t.radius).filter(([k]) => k !== "default").map(([k, v]) => [k, pxToRem(v)])),
  spacing: Object.fromEntries(Object.entries(t.spacing).map(([k, v]) => [k, pxToRem(v)])),
  shadows: t.shadow,
  other: {
    status: Object.fromEntries(STATUS.map((s) => [s, t.color.status[s]])),
    semantic: { light, dark },
  },
};
const mantineJs =
  HEADER +
  "// Objek polos untuk createTheme() Mantine v7+; paket ini tidak bergantung pada @mantine/core.\n" +
  "//   import { createTheme } from '@mantine/core';\n" +
  "//   import { mantineTheme } from '@ezrakurniadi/medistra-tokens/mantine';\n" +
  "//   export const theme = createTheme({ ...mantineTheme, components: { ... } });\n" +
  `export const mantineTheme = ${JSON.stringify(mantine, null, 2)};\n`;
const mantineDts =
  "import type { MantineThemeOverride } from '@mantine/core';\n" +
  "export declare const mantineTheme: MantineThemeOverride;\n";

// ---- Objek JS token (resolved) ----
const resolved = { color: t.color, semantic: { light, dark }, font: t.font, radius: t.radius, spacing: t.spacing, shadow: t.shadow };
const tokensJs = HEADER + `export const tokens = ${JSON.stringify(resolved, null, 2)};\nexport default tokens;\n`;
const toType = (v, ind = "") =>
  typeof v === "string"
    ? "string"
    : `{\n${Object.entries(v).map(([k, x]) => `${ind}  ${JSON.stringify(k)}: ${toType(x, ind + "  ")};`).join("\n")}\n${ind}}`;
const tokensDts = `declare const tokens: ${toType(resolved)};\nexport { tokens };\nexport default tokens;\n`;

const files = {
  "tokens.css": tokensCss,
  "tailwind-v4.css": tailwindV4,
  "tailwind-preset.cjs": tailwindPreset,
  "mantine.js": mantineJs,
  "mantine.d.ts": mantineDts,
  "tokens.js": tokensJs,
  "tokens.d.ts": tokensDts,
};

const dist = join(ROOT, "dist");
const check = process.argv.includes("--check");
let beda = 0;
if (!check) mkdirSync(dist, { recursive: true });
for (const [name, content] of Object.entries(files)) {
  const p = join(dist, name);
  if (check) {
    if (!existsSync(p) || readFileSync(p, "utf8") !== content) {
      console.error(`dist/${name} usang; jalankan npm run build`);
      beda++;
    }
  } else {
    writeFileSync(p, content);
    console.log(`dist/${name}`);
  }
}
process.exit(beda ? 1 : 0);
