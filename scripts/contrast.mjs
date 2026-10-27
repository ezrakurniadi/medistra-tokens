// Cek kontras WCAG 2.1 untuk semua pasangan di tokens.json → contrast.pairs.
// Keluar dengan kode 1 kalau ada pasangan yang di bawah ambang.
import { loadTokens, get, contrast } from "./lib.mjs";

const tokens = loadTokens();
let gagal = 0;
console.log("teks / latar".padEnd(78), "rasio   min  hasil");
for (const [fg, bg, min] of tokens.contrast.pairs) {
  const a = get(tokens, fg);
  const b = get(tokens, bg);
  const r = contrast(a, b);
  const ok = r >= min;
  if (!ok) gagal++;
  const label = `${fg} ${a} / ${bg} ${b}`;
  console.log(label.padEnd(78), r.toFixed(2).padStart(5), String(min).padStart(5), ok ? " LULUS" : " GAGAL");
}
console.log(`\n${tokens.contrast.pairs.length - gagal}/${tokens.contrast.pairs.length} pasangan lulus.`);
process.exit(gagal ? 1 : 0);
