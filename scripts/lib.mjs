// Membaca tokens.json dan meresolusi referensi "{path.ke.token}".
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("..", import.meta.url));

export function loadTokens() {
  return JSON.parse(readFileSync(new URL("../tokens.json", import.meta.url), "utf8"));
}

/** Ambil nilai token lewat path bertitik; "light.x"/"dark.x" = semantic.light.x. */
export function get(tokens, path) {
  const parts = path.split(".");
  if (parts[0] === "light" || parts[0] === "dark") parts.unshift("semantic");
  let node = tokens;
  for (const p of parts) {
    if (node == null || !(p in node)) throw new Error(`Token tidak ada: ${path}`);
    node = node[p];
  }
  return resolve(tokens, node, path);
}

export function resolve(tokens, value, from = "?") {
  if (typeof value !== "string") return value;
  const m = value.match(/^\{(.+)\}$/);
  if (!m) return value;
  if (m[1] === from) throw new Error(`Referensi melingkar: ${from}`);
  return get(tokens, m[1]);
}

/** Objek semantic (light/dark) dengan semua referensi sudah jadi hex. */
export function semantic(tokens, mode) {
  return Object.fromEntries(
    Object.entries(tokens.semantic[mode]).map(([k, v]) => [k, resolve(tokens, v, `${mode}.${k}`)]),
  );
}

export function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`Bukan hex 6 digit: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

// WCAG 2.1: relative luminance & contrast ratio (https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio).
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
