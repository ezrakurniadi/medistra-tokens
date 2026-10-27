# @ezrakurniadi/medistra-tokens

Token desain bersama Medistra/MIRA. Satu sumber (`tokens.json`), tiga keluaran di `dist/`:

| Keluaran | Berkas | Untuk |
|---|---|---|
| CSS variables polos | `dist/tokens.css` | CSS polos, dan wajib untuk preset Tailwind v3 |
| Tailwind v4 | `dist/tailwind-v4.css` (`@theme` + variabel shadcn) | Tailwind v4 / shadcn terbaru |
| Tailwind v3 | `dist/tailwind-preset.cjs` | Tailwind v3 / shadcn lama |
| Mantine | `dist/mantine.js` (`mantineTheme`) | Mantine v7+ `createTheme` |
| JS | `dist/tokens.js` | Nilai token di kode (chart, kanvas) |

Aturan pakai dan syarat kontras ada di [DESIGN.md](DESIGN.md).

## Pasang

Repo publik (sejak 2026-10-27, keputusan Ezra di EZR-123), tanpa registry. Pasang sebagai dependensi git dengan tag versi; tidak perlu kredensial, termasuk di CI tanpa secret:

```bash
npm i github:ezrakurniadi/medistra-tokens#v0.1.0
```

`dist/` ikut di-commit, jadi tidak ada langkah build saat instalasi. Jangan menyalin `dist/` ke proyek (vendoring); salinan bisa menyimpang diam-diam dari sumbernya.

## Pakai

**CSS polos**
```css
@import "@ezrakurniadi/medistra-tokens/dist/tokens.css";
.badge-usang { color: var(--color-waspada); background: var(--color-waspada-bg); }
```

**Tailwind v4 / shadcn**
```css
@import "tailwindcss";
@import "@ezrakurniadi/medistra-tokens/tailwind-v4.css";
@custom-variant dark (&:where(.dark, .dark *));
```
Hapus blok `:root { --primary: ... }` bawaan `shadcn init` supaya tidak menimpa token.

**Tailwind v3 / shadcn lama**
```js
// tailwind.config.cjs
module.exports = { presets: [require("@ezrakurniadi/medistra-tokens/tailwind-preset")], content: [...] };
```
```css
@import "@ezrakurniadi/medistra-tokens/dist/tokens.css";
@tailwind base; @tailwind components; @tailwind utilities;
```

**Mantine**
```ts
import { createTheme } from "@mantine/core";
import { mantineTheme } from "@ezrakurniadi/medistra-tokens/mantine";
export const theme = createTheme({ ...mantineTheme, components: { /* khusus proyek */ } });
```
Status klinis ada di `theme.other.status.kritis.fg` dst.

## Kelas/variabel yang tersedia

- Skala: `medistra-50..900` (primary = 700), `slate-50..900`
- Status: `kritis`, `waspada`, `normal`, `info` → `text-kritis`, `bg-kritis-bg`, `border-kritis-border`, `bg-kritis-solid text-on-kritis`
- Semantik shadcn: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive` (+ `-foreground`), `border`, `input`, `ring`, `--radius`
- Font: `font-sans`, `font-heading`, `font-mono`; radius `xs..xl`; shadow `xs..xl`

## Mengubah token

```bash
# edit tokens.json
npm run build      # tulis ulang dist/
npm test           # cek kontras WCAG + pastikan dist/ sinkron
```
Naikkan `version`, commit, lalu `git tag vX.Y.Z && git push --tags`.
