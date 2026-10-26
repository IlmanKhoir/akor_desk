# Akor Desk

Custom Frappe app untuk tampilan awal Desk/launcher AKOR. Aset UI berada di
`akor_desk/public/`, terpisah dari aplikasi bisnis `akor`.

| Lokasi | Fungsi |
| --- | --- |
| `launcher/critical.css` | CSS first-paint yang dimuat dari `hooks.py` agar tampilan Desk tidak berkedip. |
| `launcher/loader.js` | Hanya menjalankan tema dan dock ketika rute adalah `/`, `/desk`, atau `/desk/`. |
| `theme/css/` | Tema Desk aktif yang modular. `desk_theme.css` adalah entrypoint CSS-nya. |
| `theme/js/` | Skrip enhancer Desk yang disiapkan untuk dipakai bila dibutuhkan; saat ini belum dimuat agar launcher tetap ringan. |
| `archive/legacy/` | Eksperimen/kode Desk lama yang belum aktif. Tidak dimuat oleh `hooks.py` dan tidak dipublikasikan sebagai aset Frappe. |

Untuk mengubah tampilan aktif, mulai dari `public/theme/css/` atau `public/launcher/`. Jangan memuat berkas di `archive/legacy/` bersamaan dengan tema aktif karena sebagian besar mengubah selector Desk yang sama.
