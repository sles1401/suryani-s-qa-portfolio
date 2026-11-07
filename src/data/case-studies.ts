import { TEST_CASE_DOCS_REPO_URL, TEST_CASE_SHEET_URL } from "@/lib/links";

type Bilingual = { id: string; en: string };

export type CaseStudyLink = {
  label: Bilingual;
  href: string;
  external: boolean;
};

export type CaseStudy = {
  slug: string;
  project: string;
  tag: Bilingual;
  summary: Bilingual;
  context: Bilingual;
  risks: Bilingual[];
  approach: Bilingual[];
  findings: Bilingual[];
  outcome: Bilingual;
  caveat: Bilingual;
  evidence: CaseStudyLink[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "hauling-management-system",
    project: "HMS — Hauling Management System",
    tag: { id: "Internal · NDA", en: "Internal · NDA" },
    summary: {
      id: "Pengujian manual modul master data, transaksi hauling, dan laporan ritase pada sistem operasi tambang.",
      en: "Manual testing of master data, hauling transactions, and trip reports in a mining operations system.",
    },
    context: {
      id: "HMS dipakai untuk mencatat unit, driver, lokasi, transaksi hauling, dan ritase. Kesalahan kecil pada data atau perhitungan langsung terlihat di laporan operasional, sehingga pengujian difokuskan pada integritas data dan alur antar-modul.",
      en: "HMS records units, drivers, locations, hauling transactions, and trip counts. Small data or calculation errors surface immediately in operational reports, so testing focused on data integrity and cross-module flows.",
    },
    risks: [
      {
        id: "Salah hitung ritase atau tonase berdampak langsung ke laporan operasional.",
        en: "Incorrect trip or tonnage calculations directly affect operational reports.",
      },
      {
        id: "Data master yang tidak konsisten merambat ke transaksi dan laporan.",
        en: "Inconsistent master data propagates into transactions and reports.",
      },
      {
        id: "Validasi tanggal dan sesi yang lemah membuka celah integritas data.",
        en: "Weak date and session validation opens data-integrity gaps.",
      },
    ],
    approach: [
      {
        id: "Desain test case dengan boundary value analysis dan equivalence partitioning.",
        en: "Test-case design with boundary value analysis and equivalence partitioning.",
      },
      {
        id: "Checklist regresi per rilis untuk modul master data dan transaksi.",
        en: "Per-release regression checklist for master data and transaction modules.",
      },
      {
        id: "Validasi hasil lewat query SQL, bukan hanya tampilan UI.",
        en: "Result validation through SQL queries, not just the UI.",
      },
      {
        id: "Pelaporan bug dengan langkah reproduksi, bukti, severity, dan status.",
        en: "Bug reports with reproduction steps, evidence, severity, and status.",
      },
    ],
    findings: [
      {
        id: "BUG-114 (Critical): total ritase salah saat muatan ganda.",
        en: "BUG-114 (Critical): trip total wrong with double loads.",
      },
      {
        id: "BUG-097 (Major): sesi tidak berakhir setelah logout.",
        en: "BUG-097 (Major): session not invalidated after logout.",
      },
      {
        id: "BUG-088 (Major): validasi tanggal menerima tanggal masa depan.",
        en: "BUG-088 (Major): date validation accepts future dates.",
      },
      {
        id: "BUG-061 (Minor): label form transaksi tidak konsisten.",
        en: "BUG-061 (Minor): inconsistent transaction form labels.",
      },
    ],
    outcome: {
      id: "100+ test case dieksekusi dan 50+ temuan terdokumentasi di tracker internal. Empat contoh tersanitasi dipublikasikan di halaman Projects; detail lengkap tersedia saat wawancara.",
      en: "100+ test cases executed and 50+ findings documented in the internal tracker. Four sanitized samples are published on the Projects page; full details are available on request.",
    },
    caveat: {
      id: "Materi klien tidak dipublikasikan. Angka berasal dari tracker internal dan tidak dapat diverifikasi publik; yang bisa ditinjau adalah sampel format dan contoh temuan tersanitasi.",
      en: "Client material is not published. Figures come from the internal tracker and cannot be publicly verified; reviewable items are the sample formats and sanitized findings.",
    },
    evidence: [
      {
        label: { id: "Sampel test case", en: "Sample test cases" },
        href: TEST_CASE_SHEET_URL,
        external: true,
      },
      {
        label: { id: "Repo dokumentasi manual test", en: "Manual-test documentation repo" },
        href: TEST_CASE_DOCS_REPO_URL,
        external: true,
      },
      {
        label: { id: "Contoh laporan bug", en: "Sample bug reports" },
        href: "/projects#bug-reports",
        external: false,
      },
    ],
  },
  {
    slug: "orangehrm-manual-testing",
    project: "OrangeHRM — Manual Testing Portfolio",
    tag: { id: "Publik · Fase desain", en: "Public · Design phase" },
    summary: {
      id: "Perencanaan dan desain 62 test case manual untuk sembilan modul OrangeHRM Open Source Demo.",
      en: "Planning and designing 62 manual test cases across nine OrangeHRM Open Source Demo modules.",
    },
    context: {
      id: "OrangeHRM adalah aplikasi HRIS publik yang dipakai sebagai objek latihan. Tujuannya bukan mengejar angka, tetapi mendokumentasikan proses QA secara utuh: rencana, desain kasus uji, traceability, format bug, dan catatan eksplorasi.",
      en: "OrangeHRM is a public HRIS application used as a practice target. The goal was not to chase numbers but to document the full QA process: plan, test design, traceability, bug format, and exploratory notes.",
    },
    risks: [
      {
        id: "Cakupan sembilan modul mudah melebar tanpa rencana dan prioritas.",
        en: "Nine modules easily expand beyond scope without a plan and priorities.",
      },
      {
        id: "Kasus uji tanpa traceability sulit diaudit cakupannya.",
        en: "Test cases without traceability are hard to audit for coverage.",
      },
      {
        id: "Mengklaim hasil eksekusi sebelum benar-benar dijalankan merusak kredibilitas.",
        en: "Claiming execution results before running them damages credibility.",
      },
    ],
    approach: [
      {
        id: "Test plan dengan tujuan, ruang lingkup, strategi, dan entry/exit criteria.",
        en: "Test plan with objectives, scope, strategy, and entry/exit criteria.",
      },
      {
        id: "62 kasus uji di seluruh modul: happy path, boundary, negatif, dan state transition.",
        en: "62 test cases across modules: happy path, boundary, negative, and state transition.",
      },
      {
        id: "Traceability matrix untuk memetakan modul ke kasus uji.",
        en: "Traceability matrix mapping modules to test cases.",
      },
      {
        id: "Panduan severity/priority, template bug, dan charter exploratory testing.",
        en: "Severity/priority guide, bug template, and exploratory testing charters.",
      },
    ],
    findings: [
      {
        id: "Seluruh 62 test case masih berstatus “Belum dijalankan” di repo.",
        en: "All 62 test cases are still marked “Not run” in the repo.",
      },
      {
        id: "Cakupan desain mencakup Login, Dashboard, PIM, Leave, Time, Recruitment, My Info, Admin, dan Directory.",
        en: "Design coverage spans Login, Dashboard, PIM, Leave, Time, Recruitment, My Info, Admin, and Directory.",
      },
      {
        id: "Tidak ada bug yang diklaim karena eksekusi belum dilakukan.",
        en: "No bugs are claimed because execution has not been performed.",
      },
    ],
    outcome: {
      id: "Artefak desain selesai: test plan, 62 test case, traceability matrix, dan template laporan. Fase eksekusi berikutnya akan mengisi hasil dan bukti nyata.",
      en: "Design artifacts are complete: test plan, 62 test cases, traceability matrix, and report templates. The execution phase will fill in real results and evidence.",
    },
    caveat: {
      id: "Ini adalah bukti desain pengujian, bukan bukti eksekusi. Saya sengaja tidak mengklaim pass/fail atau temuan yang belum dijalankan.",
      en: "This is evidence of test design, not execution. I deliberately do not claim pass/fail results or findings that have not been run.",
    },
    evidence: [
      {
        label: { id: "Repo manual-test", en: "manual-test repo" },
        href: "https://github.com/sles1401/manual-test",
        external: true,
      },
      {
        label: { id: "Test cases", en: "Test cases" },
        href: "https://github.com/sles1401/manual-test/blob/main/docs/02-test-cases.md",
        external: true,
      },
      {
        label: { id: "Test plan", en: "Test plan" },
        href: "https://github.com/sles1401/manual-test/blob/main/docs/01-test-plan.md",
        external: true,
      },
    ],
  },
  {
    slug: "portfolio-quality-audit",
    project: "Portfolio Site — Quality Audit",
    tag: { id: "Publik · Audit", en: "Public · Audit" },
    summary: {
      id: "Mengaudit situs portofolio ini sendiri: routing, aksesibilitas, performa, SEO, dan ketahanan form kontak.",
      en: "Auditing this portfolio itself: routing, accessibility, performance, SEO, and contact-form resilience.",
    },
    context: {
      id: "Situs ini adalah produk yang saya kendalikan penuh, jadi cocok dijadikan objek audit end-to-end. Temuan dari audit ini langsung diperbaiki dan diverifikasi lewat build, test, dan CI.",
      en: "This site is a product I fully control, making it a good end-to-end audit target. Findings were fixed and verified through builds, tests, and CI.",
    },
    risks: [
      {
        id: "Deep link 404 membuat recruiter tidak bisa membuka halaman yang dibagikan.",
        en: "Deep-link 404s prevent recruiters from opening shared pages.",
      },
      {
        id: "Metadata share yang hilang membuat tautan terlihat kosong.",
        en: "Missing share metadata makes links look empty.",
      },
      {
        id: "Bundle membengkak dan form pihak ketiga yang rapuh menurunkan keandalan.",
        en: "Bloated bundles and fragile third-party forms reduce reliability.",
      },
    ],
    approach: [
      {
        id: "Playwright + axe-core untuk aksesibilitas di light dan dark theme.",
        en: "Playwright + axe-core for accessibility in light and dark themes.",
      },
      {
        id: "Lighthouse dan budget ukuran bundle dijalankan di CI.",
        en: "Lighthouse and bundle-size budgets run in CI.",
      },
      {
        id: "Audit keyboard, heading, label, dan reduced-motion secara manual.",
        en: "Manual keyboard, heading, label, and reduced-motion audit.",
      },
      {
        id: "Verifikasi header keamanan dan fallback SPA langsung di production.",
        en: "Security headers and SPA fallback verified directly in production.",
      },
    ],
    findings: [
      {
        id: "0 pelanggaran axe-core kritis di seluruh halaman, light dan dark.",
        en: "0 critical axe-core violations across all pages, light and dark.",
      },
      {
        id: "CLS < 0.01 saat modal dibuka/ditutup dan posisi scroll dipulihkan.",
        en: "CLS < 0.01 on modal open/close with scroll position restored.",
      },
      {
        id: "Budget bundle dan Lighthouse dijaga otomatis, bukan dicek manual.",
        en: "Bundle and Lighthouse budgets are enforced automatically, not checked manually.",
      },
    ],
    outcome: {
      id: "SPA fallback, metadata per route, OG image, CV satu halaman, font self-host, dan endpoint kontak sendiri sudah aktif di production.",
      en: "SPA fallback, per-route metadata, OG image, one-page CV, self-hosted fonts, and an own contact endpoint are live in production.",
    },
    caveat: {
      id: "Hasil audit mencerminkan kondisi repo saat ini. Angka dapat berubah setelah konten atau dependensi diperbarui.",
      en: "Audit results reflect the current repo state. Numbers may change after content or dependency updates.",
    },
    evidence: [
      {
        label: { id: "Repositori situs", en: "Site repository" },
        href: "https://github.com/sles1401/suryani-s-qa-portfolio",
        external: true,
      },
      {
        label: { id: "Workflow CI", en: "CI workflow" },
        href: "https://github.com/sles1401/suryani-s-qa-portfolio/blob/main/.github/workflows/ci.yml",
        external: true,
      },
      {
        label: { id: "Hasil audit di Projects", en: "Audit results on Projects" },
        href: "/projects",
        external: false,
      },
    ],
  },
];

export const getCaseStudy = (slug?: string) =>
  CASE_STUDIES.find((item) => item.slug === slug);
