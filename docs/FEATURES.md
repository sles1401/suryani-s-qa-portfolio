# Dokumentasi Fitur — Suryani Lestari QA Portfolio

Dokumentasi ini menjelaskan seluruh fitur yang tersedia pada aplikasi web portfolio **Suryani Lestari (QA Engineer — Manual & Automation)**, mencakup halaman utama, playground QA interaktif, sistem animasi scroll, dwibahasa, tema, serta standar aksesibilitas dan performa.

---

## 1. Peta Halaman & Routing

Aplikasi dibangun sebagai Single-Page Application (SPA) menggunakan `React Router` (`src/App.tsx`) dengan *lazy loading* untuk halaman sekunder agar ukuran bundel awal tetap ringan.

| Route | Halaman | Komponen Utama | Keterangan |
| --- | --- | --- | --- |
| `/` | Beranda | `src/pages/Home.tsx` | Ringkasan profil, metrik, proyek unggulan, galeri bukti, tools, dan pengalaman |
| `/projects` | Proyek & Bukti | `src/pages/Projects.tsx` | Daftar proyek, studi kasus, laporan bug tersanitasi, dan hasil audit |
| `/projects/:slug` | Detail Studi Kasus | `src/pages/CaseStudy.tsx` | Studi kasus individual (HMS, OrangeHRM, audit portfolio) |
| `/how-i-test` | Cara Saya Menguji | `src/pages/HowITest.tsx` | Alur pengujian 5 langkah, anatomi laporan bug, glosarium QA, dan catatan teknis |
| `/resume` | Resume & CV | `src/pages/Resume.tsx` | Linimasa pengalaman & pendidikan, keahlian utama, dan unduh CV (PDF) |
| `/contact` | Kontak | `src/pages/Contact.tsx` | Informasi kontak dan formulir pesan tervalidasi |
| `/bug-hunter` | Bug Hunter | `src/pages/BugHunter.tsx` | Tantangan interaktif menemukan defect pada simulasi aplikasi |
| `/api-console` | API Console | `src/pages/ApiConsole.tsx` | Konsol simulasi pengujian API (tanpa request jaringan asli) |
| `/about`, `/experience`, `/skills`, `/portfolio` | Redirect | `Navigate` di `src/App.tsx` | Dialihkan otomatis ke `/resume` atau `/projects` agar tautan lama tetap aktif |

---

## 2. Fitur per Halaman

### A. Beranda (`/`)
* **Hero Section dengan Scroll-Linked Parallax** (`src/pages/Home.tsx`):
  * Menampilkan peran, status ketersediaan lokasi, positioning QA, highlight keahlian, serta tombol unduh CV (`CV_URL`), kontak, email, dan LinkedIn.
  * Menggunakan `useScroll` + `useTransform` (`framer-motion`) untuk efek parallax vertikal, skala, dan opacity pada teks serta foto profil saat halaman di-scroll.
* **Sticky Section Navigation** (`src/components/home/SectionNav.tsx`):
  * Navigasi cepat antar-bagian (`Profil`, `Metrik`, `Proyek`, `Bukti`, `Tools`, `Pengalaman`) dengan deteksi bagian aktif melalui `useActiveSection` dan target sentuh minimal `44px`.
* **Ringkasan 30 Detik / Recruiter Snapshot** (`src/components/home/RecruiterSnapshot.tsx`):
  * Ringkasan cepat untuk rekruter dan tim teknis (Level, Fokus, Konteks, Lokasi) beserta tautan langsung ke `/projects` dan `/how-i-test`.
* **Metrik Utama** (`src/components/home/KeyMetrics.tsx`):
  * Menampilkan 4 indikator kuantitatif (`25+` siswa dibimbing, `100+` test case dieksekusi, `50+` bug didokumentasikan, `100%` akurasi konfirmasi flow) lengkap dengan tautan sumber artefak publik.
* **Proyek Unggulan** (`src/components/home/FeaturedProjects.tsx`):
  * Proyek utama (*HMS — Hauling Management System*, NDA) ditampilkan sebagai *lead horizontal card* yang menonjol secara visual, diikuti proyek dokumentasi test case manual dan *QA Tech Hub*.
* **Galeri Bukti Pengujian Tersanitasi** (`src/components/home/SanitizedEvidence.tsx`):
  * Contoh mockup artefak QA (*Dashboard Test Management*, *Templat Laporan Bug*, *Checklist Regression Test*) yang seluruh data sensitif/kliennya sudah disamarkan.
* **Tools & Teknologi** (`src/components/home/ToolsGrid.tsx`):
  * Dikelompokkan menjadi dua kategori seimbang: *Pelacakan & Dokumentasi* (`QA Hub`, `Trello`, `Google Sheets`, `GitHub`) dan *Otomasi, API & Debugging* (`Playwright`, `Java`, `Postman`, `SQL`, `Chrome DevTools`, `Vercel`).
* **Pengalaman & Sorotan** (`src/components/home/ExperienceHighlights.tsx`):
  * Linimasa kronologis pengalaman QA Engineer, Facilitator, Mentor Coding Camp, dan Frontend Developer.

### B. Proyek & Studi Kasus (`/projects` & `/projects/:slug`)
* Merangkum ruang lingkup proyek internal (HMS, Marketing System, PPIC) dan proyek publik.
* Menyediakan tautan ke studi kasus terperinci (`src/data/case-studies.ts`), tabel laporan bug tersanitasi, serta ringkasan hasil audit Lighthouse & aksesibilitas.

### C. Cara Saya Menguji (`/how-i-test`)
* Menjelaskan metodologi pengujian 5 tahap (memahami requirement & risiko, merancang test case dengan BVA & EP, eksekusi berlapis UI/API/SQL, pelaporan bug yang dapat direproduksi, serta regresi & verifikasi perbaikan).
* Menyertakan anatomi laporan bug dan glosarium istilah QA.

### D. Resume (`/resume`)
* Linimasa lengkap pengalaman kerja dan pendidikan (S1 Rekayasa Perangkat Lunak).
* Daftar *Core Competencies* dan *Technical Stack*, serta tombol unduh CV PDF.

### E. Bug Hunter (`/bug-hunter`)
* Tantangan QA interaktif berbasis simulasi aplikasi checkout/e-commerce dengan defect yang sengaja ditanam (`BUG-01` s.d. `BUG-05`, mencakup kesalahan kalkulasi total, validasi email, kontras WCAG AA, tombol tidak merespons, dll.).
* Setiap defect yang ditemukan membuka dialog detail berisi severity, kondisi aktual, *expected result*, dan tombol **Salin Laporan Bug (Markdown)** dengan notifikasi toast.

### F. Mini API Console (`/api-console`)
* Simulator pengujian API lokal tanpa panggilan jaringan eksternal (`src/lib/api-console.ts`).
* Mendukung pemilihan endpoint, metode HTTP (`GET`, `POST`, dll.), header JSON, body JSON, serta tombol skenario cepat (**Isi contoh valid** dan **Uji tanpa token (401)**).
* Menampilkan badge status HTTP, durasi simulasi (ms), header response, *syntax-highlighted JSON* dengan kontras WCAG AA, tombol salin response, serta **Checklist Asersi QA** otomatis (status HTTP, waktu respons `< 500 ms`, dan `Content-Type: application/json`).

### G. Kontak (`/contact`)
* Formulir kontak dengan validasi dua lapis (`validateContact` dan `submitContactMessage` di `src/lib/contact-validation.ts`), pesan error inline per field, proteksi honeypot (`company`), serta fallback `mailto:`.
* Status konfirmasi pengiriman bertahan hingga pengguna menekan tombol **Kirim pesan lain**.

---

## 3. Fitur Global, Animasi & Pengalaman Pengguna

* **Scroll Progress Indicator** (`src/components/ScrollProgress.tsx`):
  * Bilah progres tipis (`3px`) di bagian paling atas viewport menggunakan `useScroll` dan `useSpring` (`scaleX` GPU-friendly).
* **Reusable Scroll Reveal** (`src/components/ScrollReveal.tsx`):
  * Komponen `ScrollReveal` (arah `up`, `down`, `left`, `right`, `none`), `ScrollRevealGroup`, dan `ScrollRevealItem` berbasis `whileInView` (`viewport={{ once: true, amount: 0.2 }}`) untuk animasi masuk bertahap (*staggered*) pada grid dan daftar.
* **Transisi Halaman** (`src/components/PageTransition.tsx`):
  * Animasi transisi halus antar-rute pada konten `<main>`.
* **Dwibahasa (ID / EN)** (`src/contexts/LanguageContext.tsx`, `src/components/LanguageToggle.tsx`):
  * Seluruh teks antarmuka mendukung Bahasa Indonesia dan Bahasa Inggris dengan preferensi tersimpan di `localStorage`.
* **Tema Light & Dark** (`src/contexts/ThemeContext.tsx`, `src/components/ThemeToggle.tsx`):
  * Mode terang dan gelap persisten dengan penyesuaian kontras warna di kedua tema.
* **Komponen Pendukung Layout**:
  * `Header` (`src/components/layout/Header.tsx`) dengan menu responsif dan dropdown *Alat QA*.
  * `LiveClock` (`src/components/LiveClock.tsx`), `CustomCursor` (`src/components/CustomCursor.tsx`), dan `ScrollToTop` (`src/components/ScrollToTop.tsx`).

---

## 4. Aksesibilitas, Performa & Quality Gates

* **Dukungan `prefers-reduced-motion`**:
  * Root aplikasi dibungkus `<MotionConfig reducedMotion="user">` di `src/App.tsx`.
  * `ScrollProgress`, `ScrollReveal`, `PageTransition`, dan parallax hero di `Home.tsx` memeriksa `useReducedMotion()` sehingga animasi non-esensial dan pergeseran awal otomatis dinonaktifkan saat pengguna mengaktifkan *reduced motion*.
  * Aturan CSS `@media (prefers-reduced-motion: reduce)` di `src/index.css` menonaktifkan durasi animasi/transisi CSS.
* **Aksesibilitas (a11y)**:
  * *Skip link* (`Skip to main content`) di `PageLayout.tsx`, ring `:focus-visible`, struktur heading semantik, serta pengujian otomatis menggunakan `@axe-core/playwright`.
* **Performa & Pengujian**:
  * Font *Source Sans 3* dan *Playfair Display* di-bundle secara lokal (*self-hosted*).
  * Penjaga ukuran bundel (`scripts/check-bundle-size.mjs`) membatasi total JS `<= 230 kB`, total CSS `<= 20 kB`, dan chunk terbesar `<= 200 kB` (gzipped).
  * Pengujian unit menggunakan **Vitest** (`npx vitest run`) dan pengujian E2E + visual snapshot menggunakan **Playwright**.
