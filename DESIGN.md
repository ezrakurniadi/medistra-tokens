# DESIGN.md: Token desain MIRA

Standar fleet (keputusan Ezra, 2026-10-27): **yang dibakukan hanya token desain** (warna, font, radius, bayangan, spasi). Library UI bebas per proyek: shadcn/Tailwind, Mantine, atau CSS polos. Proyek menyelaraskan token secara bertahap saat UI-nya disentuh; tidak ada migrasi atau rewrite massal.

Sumber tunggal: `tokens.json`. Palet berasal dari `mira/frontend/src/theme.ts` (SIMRS).

## Aturan pakai

1. **Jangan hardcode warna.** Tidak boleh ada `#00730D`, `#b91c1c`, `rgb(...)` dan sejenisnya di komponen. Pakai:
   - CSS: `var(--primary)`, `var(--color-kritis)`, `var(--color-slate-700)`
   - Tailwind: `bg-primary`, `text-kritis`, `border-input`, `text-mira-700`
   - Mantine: `color="mira"`, `theme.other.status.kritis.fg`, `var(--mantine-color-mira-7)`
   
   Pengecualian: kanvas/gambar yang memang harus hitam-putih (mis. tanda tangan), dengan komentar alasannya.
2. **Utamakan token semantik** (`--primary`, `--foreground`, `--muted-foreground`, `--border`) daripada skala mentah (`--color-slate-600`). Token semantik sudah punya varian mode gelap.
3. **Warna status klinis hanya untuk makna status**, bukan dekorasi:

   | Token | Makna | Teks | Latar lembut | Garis | Solid (teks putih) |
   |---|---|---|---|---|---|
   | `kritis` | bahaya, nilai kritis, gagal, kedaluwarsa | `--color-kritis` | `--color-kritis-bg` | `--color-kritis-border` | `--color-kritis-solid` + `--color-on-kritis` |
   | `waspada` | perlu perhatian, mendekati batas, usang | `--color-waspada` | … | … | … |
   | `normal` | dalam batas, berlaku, berhasil | `--color-normal` | … | … | … |
   | `info` | informasi netral, sedang diproses | `--color-info` | … | … | … |

   Warna tidak boleh menjadi satu-satunya pembeda (WCAG 1.4.1): selalu sertai teks/ikon ("Kritis", "Usang").
   `normal` (`#15803d`) sengaja berbeda dari warna brand (`#00730D`) supaya status tidak tertukar dengan tombol aksi.
4. **Hijau brand untuk teks hanya shade 700 ke atas** di latar terang. Shade 600 ke bawah tidak lolos kontras teks (lihat tabel di bawah); gunakan sebagai latar/ilustrasi saja.
5. **Font:** Inter untuk isi, Outfit untuk judul (`--font-sans`, `--font-heading`). Paket ini tidak membundel berkas font. Muat lewat `@fontsource/inter` + `@fontsource/outfit` (disarankan untuk PWA offline) atau Google Fonts; tanpa itu jatuh ke `system-ui`.
6. **Spasi:** skala `--space-xs..xl` = 10/12/16/20/32 px (sama dengan Mantine). Di Tailwind pakai skala bawaan (`2.5`, `3`, `4`, `5`, `8`); spasi sengaja tidak dimasukkan ke `@theme` v4 karena `--spacing-md` akan menimpa `max-w-md`.
7. **Mode gelap:** aktif lewat kelas `.dark` (shadcn/Tailwind) atau `data-mantine-color-scheme="dark"` (Mantine). Hanya token semantik dan teks status yang berganti.
8. **Menambah/mengubah token:** edit `tokens.json`, tambahkan pasangan kontrasnya di `contrast.pairs`, jalankan `npm run build && npm test`, naikkan versi + tag.

## Syarat kontras (WCAG 2.1 AA)

- Teks normal **≥ 4,5:1** (1.4.3). Teks besar (≥ 24 px, atau ≥ 18,66 px tebal) ≥ 3:1.
- Komponen non-teks (garis input, cincin fokus, ikon bermakna) **≥ 3:1** (1.4.11). Karena itu `--input` memakai slate-500, bukan slate-200 seperti bawaan shadcn.
- `npm test` gagal kalau ada pasangan di `contrast.pairs` yang di bawah ambang.

Shade yang **tidak boleh** jadi warna teks di atas putih:

| Warna | Rasio vs `#ffffff` |
|---|---|
| mira-400 `#4ade80` | 1,74 |
| mira-500 `#22c55e` | 2,28 |
| mira-600 `#16a34a` | 3,30 (hanya teks besar) |
| slate-400 `#94a3b8` | 2,56 |
| slate-500 `#64748b` | 4,76 (lolos, batas bawah untuk teks sekunder) |
