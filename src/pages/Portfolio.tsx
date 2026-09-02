import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Mail,
  Bug,
  AlertTriangle,
  Monitor,
  ListChecks,
  Github,
  ClipboardCheck,
  Cpu,
  Wrench,
  GraduationCap,
  Code2,
  ExternalLink,
  Rocket,
  FileSpreadsheet,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LIVE_TEST_CASE_SHEET_URL,
  TEST_CASE_DOCS_REPO_URL as DOCS_REPO_URL,
  QA_HUB_URL,
} from "@/lib/links";

const Portfolio = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const prev = document.title;
    document.title = "QA Portfolio - Suryani Lestari";
    return () => {
      document.title = prev;
    };
  }, []);

  const TEST_CASE_SHEET_URL = LIVE_TEST_CASE_SHEET_URL;
  const TEST_CASE_DOCS_REPO_URL = DOCS_REPO_URL;



  const skillGroups = [
    {
      icon: ClipboardCheck,
      title: t("Manual Testing", "Manual Testing"),
      items: [
        "Test Planning",
        "Test Case Design",
        "Bug Reporting",
        "Boundary Value Analysis",
        "Equivalence Partitioning",
        "UAT",
      ],
    },
    {
      icon: Cpu,
      title: t("Automation & API Testing", "Automation & API Testing"),
      items: [
        "API Testing (Postman)",
        "Web Automation",
        "SQL Validation",
        "Integration Testing",
      ],
    },
    {
      icon: Wrench,
      title: t("Tools & Platforms", "Tools & Platforms"),
      items: [
        "Git",
        "GitHub",
        "VSCode",
        "Google Cloud Platform (GCP)",
        "Firebase",
        "Redis",
        "MySQL / MariaDB",
      ],
    },
  ];

  const pomSnippet = `src/
├─ pages/
│  ├─ BasePage.java
│  ├─ LoginPage.java
│  └─ CheckoutPage.java
├─ tests/
│  ├─ LoginTests.java
│  └─ CheckoutTests.java
├─ utils/
│  ├─ ConfigReader.java
│  └─ TestDataFactory.java
└─ resources/
   └─ playwright.config.json`;

  const portfolioItems = [
    {
      title: t("Dokumentasi Test Case", "Test Case Documentation"),
      description: t(
        "Test case yang mencakup skenario functional dan regression testing.",
        "Test cases covering functional and regression testing scenarios."
      )
    },
    {
      title: t("Bug Reports", "Bug Reports"),
      description: t(
        "Contoh laporan bug dengan langkah reproduksi dan klasifikasi tingkat keparahan.",
        "Sample bug reports with reproduction steps and severity classifications."
      )
    },
    {
      title: t("Test Plans", "Test Plans"),
      description: t(
        "Rencana pengujian yang menguraikan ruang lingkup, pendekatan, dan jadwal.",
        "Test plans outlining testing scope, approach, and schedule."
      )
    },
    {
      title: t("Laporan Ringkasan Pengujian", "Test Summary Reports"),
      description: t(
        "Laporan penyelesaian proyek yang merangkum aktivitas dan temuan pengujian.",
        "Project completion reports summarizing testing activities and findings."
      )
    }
  ];

  const matrixRows = [
    {
      feature: t("Login", "Login"),
      steps: t("Masukkan email + password valid, klik Masuk", "Enter valid email + password, click Sign In"),
      expected: t("Diarahkan ke dashboard", "Redirected to dashboard"),
      boundary: t("Email kosong / 256+ karakter", "Empty email / 256+ characters"),
    },
    {
      feature: t("Form Pendaftaran", "Signup Form"),
      steps: t("Isi semua kolom wajib, kirim formulir", "Fill all required fields, submit form"),
      expected: t("Akun dibuat, email verifikasi terkirim", "Account created, verification email sent"),
      boundary: t("Password 7 vs 8 vs 128 karakter", "Password 7 vs 8 vs 128 chars"),
    },
    {
      feature: t("Checkout", "Checkout"),
      steps: t("Tambah item, lanjut ke pembayaran", "Add item, proceed to payment"),
      expected: t("Pesanan tercatat, ringkasan tampil", "Order recorded, summary shown"),
      boundary: t("Qty 0, Qty 9999, stok habis", "Qty 0, Qty 9999, out of stock"),
    },
    {
      feature: t("Pencarian", "Search"),
      steps: t("Ketik kata kunci, tekan Enter", "Type keyword, press Enter"),
      expected: t("Hasil relevan ditampilkan", "Relevant results displayed"),
      boundary: t("String kosong, karakter spesial, SQL-like", "Empty string, special chars, SQL-like"),
    },
  ];

  const bugReport = {
    title: t("Tombol 'Simpan' tidak respon di halaman Profil", "'Save' button unresponsive on Profile page"),
    id: "BUG-0427",
    severity: t("Tinggi", "High"),
    env: "Chrome 121 · macOS 14.3 · Staging",
    steps: [
      t("Buka /profile dalam keadaan login", "Open /profile while signed in"),
      t("Ubah field 'Nama Tampilan'", "Edit the 'Display Name' field"),
      t("Klik tombol 'Simpan'", "Click the 'Save' button"),
    ],
    expected: t(
      "Profil tersimpan, muncul toast konfirmasi.",
      "Profile is saved and a confirmation toast appears."
    ),
    actual: t(
      "Tombol tidak merespons; tidak ada permintaan jaringan; konsol menampilkan TypeError.",
      "Button does not respond; no network request fires; console shows a TypeError."
    ),
  };

  const pomTriggerRef = useRef<HTMLButtonElement>(null);
  const pomDialogRef = useRef<HTMLDivElement>(null);
  const pomScrollYRef = useRef(0);
  const [pomOpen, setPomOpen] = useState(false);

  useEffect(() => {
    if (!pomOpen) return;

    // Radix mounts its body scroll lock after the open state changes. Pin the
    // captured offset once that lock is in place so browser scroll anchoring
    // cannot nudge the document while the portal/autofocus lifecycle settles.
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: pomScrollYRef.current, behavior: "auto" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pomOpen]);


  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              QA Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 opacity-0 animate-fade-in-up animate-delay-100 neon-glow">
              Suryani Lestari
            </h1>
            <p className="text-lg md:text-xl text-primary font-medium mb-5 opacity-0 animate-fade-in-up animate-delay-100">
              {t(
                "Quality Assurance Engineer & Tech Educator",
                "Quality Assurance Engineer & Tech Educator"
              )}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Saya seorang QA yang dibesarkan oleh ketelitian Manual Testing, kini bertransisi membangun ekosistem otomasi yang kokoh menggunakan Java Playwright. Saya tidak hanya mencari di mana code itu rusak, tapi saya paham bagaimana code itu dibangun — karena saya juga merancang sistem web sendiri.",
                "A QA professional raised on the rigor of Manual Testing, now transitioning into building robust automation ecosystems using Java Playwright. I don't just find where the code breaks; I understand how it's built — because I architect web systems myself."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up animate-delay-300">
              <Button asChild size="lg" className="group">
                <Link to="/resume">
                  <FileText className="mr-2 h-4 w-4" />
                  {t("Lihat Resume & CV", "View Resume & CV")}
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <a href="#qa-deliverables">
                  {t("Lihat Dokumentasi QA", "View QA Documentation")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Set */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Keahlian", "Skill Set")}
            title={t("Technical & QA Skill Set", "Technical & QA Skill Set")}
            description={t(
              "Kompetensi yang saya gunakan sehari-hari untuk merancang, menjalankan, dan mendokumentasikan pengujian.",
              "The competencies I use day-to-day to design, execute, and document testing."
            )}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-border/60 shadow-card hover:border-primary/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {g.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-foreground/80 border border-border/50"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section id="qa-deliverables" className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Deliverables", "Core Deliverables")}
            title={t(
              "Testing Framework & Core Deliverables",
              "Testing Framework & Core Deliverables"
            )}
            description={t(
              "Tiga area utama pekerjaan QA yang dapat ditinjau lebih lanjut.",
              "Three core areas of QA work available for review."
            )}
          />
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1 — Manual Testing Suite */}
            <article className="flex flex-col min-w-0 p-6 rounded-2xl bg-background border border-border/60 shadow-card hover:shadow-soft hover:border-primary/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {t(
                  "Manual Testing Suite & Live Test Case Matrix",
                  "Manual Testing Suite & Live Test Case Matrix"
                )}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {t(
                  "Membedah edge cases, boundary value analysis, dan skenario logis pengujian yang menyeluruh — didokumentasikan rapi agar mudah diaudit.",
                  "Dissecting edge cases, boundary value analysis, and thorough logical test scenarios — documented cleanly for easy audit."
                )}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-primary mb-2 font-semibold">
                {t("Inspect Test Case Matrix", "Inspect Test Case Matrix")}
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full whitespace-normal text-center bg-primary text-primary-foreground hover:bg-primary/90">
                  <a
                    href={TEST_CASE_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(
                      "Buka Live Test Case Dummy di Google Sheets",
                      "Open Live Test Case Dummy on Google Sheets"
                    )}
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    {t(
                      "Buka Live Test Case Dummy (Google Sheets)",
                      "Open Live Test Case Dummy (Google Sheets)"
                    )}
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full whitespace-normal text-center border-primary/40 text-primary hover:bg-accent">
                  <a
                    href={TEST_CASE_DOCS_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(
                      "Buka repositori dokumen test case di GitHub",
                      "Open test case docs repository on GitHub"
                    )}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {t("Repositori Dokumen (GitHub)", "Docs Repository (GitHub)")}
                  </a>
                </Button>
              </div>
            </article>

            {/* Card 2 — Automation Transition */}
            <article className="flex flex-col min-w-0 p-6 rounded-2xl bg-background border border-border/60 shadow-card hover:shadow-soft hover:border-primary/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {t(
                  "Automation Transition — Java Playwright & Postman",
                  "Automation Transition — Java Playwright & Postman"
                )}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {t(
                  "Transisi dari Manual ke otomasi: skrip E2E dengan Java Playwright (Page Object Model) dipadu otomatisasi API via Postman untuk pengujian yang cepat dan stabil.",
                  "Shifting from Manual to automation: E2E scripts in Java Playwright (Page Object Model) paired with Postman API automation for fast, stable checks."
                )}
              </p>
              <div className="mb-5 flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-primary mb-2 font-semibold">
                  {t("Struktur Framework (POM)", "Framework Structure (POM)")}
                </p>
                <Dialog
                  open={pomOpen}
                  onOpenChange={(open) => {
                    // Remember the reader's scroll position while the modal's
                    // scroll-lock is active, and restore it exactly on close.
                    if (open) {
                      pomScrollYRef.current = window.scrollY;
                    } else {
                      const y = pomScrollYRef.current;
                      requestAnimationFrame(() =>
                        window.scrollTo({ top: y, behavior: "auto" })
                      );
                    }
                    setPomOpen(open);
                  }}
                >
                  <DialogTrigger asChild>
                    <button
                      ref={pomTriggerRef}
                      type="button"
                      aria-label={t(
                        "Perbesar cuplikan struktur Page Object Model",
                        "Expand Page Object Model structure snippet"
                      )}
                      className="group w-full min-w-0 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <pre className="text-[11px] leading-relaxed font-mono bg-muted/60 text-foreground/90 border border-border/60 group-hover:border-primary/60 group-focus-visible:border-primary rounded-lg p-3 max-w-full overflow-x-auto transition-colors cursor-zoom-in">
{pomSnippet}
                      </pre>
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                        {t("Klik untuk perbesar", "Click to expand")}
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent
                     ref={pomDialogRef}
                    className="max-w-2xl"
                    aria-modal="true"
                     tabIndex={-1}
                     onOpenAutoFocus={(event) => {
                       // Radix's default autofocus can scroll a partly visible
                       // trigger by one line while the body lock is mounting.
                       // Focus the dialog without scrolling instead so opening
                       // the modal never changes the saved page offset.
                       event.preventDefault();
                       pomDialogRef.current?.focus({ preventScroll: true });
                       window.scrollTo({
                         top: pomScrollYRef.current,
                         behavior: "auto",
                       });
                     }}
                    onCloseAutoFocus={(event) => {
                      // Return focus to the trigger without scrolling the page,
                      // so the original scroll position is preserved.
                      event.preventDefault();
                      pomTriggerRef.current?.focus({ preventScroll: true });
                    }}
                  >
                    <DialogHeader>
                      <DialogTitle className="font-display">
                        {t(
                          "Struktur Page Object Model — Java Playwright",
                          "Page Object Model Structure — Java Playwright"
                        )}
                      </DialogTitle>
                      <DialogDescription>
                        {t(
                          "Cuplikan struktur folder framework otomasi: pages, tests, utils, dan resources.",
                          "Snippet of the automation framework folder structure: pages, tests, utils, and resources."
                        )}
                      </DialogDescription>
                    </DialogHeader>
                    <pre className="text-xs leading-relaxed font-mono bg-muted/60 text-foreground/90 border border-border/60 rounded-lg p-4 overflow-x-auto max-h-[60vh]">
{pomSnippet}
                    </pre>
                    <div className="rounded-lg border border-border bg-muted/40 p-3 text-xs text-foreground/80 leading-relaxed">
                      {t(
                        "Codebase Playwright bersifat NDA — struktur di atas adalah representasi yang sudah disamarkan.",
                        "The Playwright codebase is under NDA — the structure above is a sanitized representation."
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-accent px-2.5 py-1 text-xs font-semibold text-primary">
                <Lock aria-hidden="true" className="h-3 w-3" />
                {t("Codebase — NDA", "Codebase — NDA")}
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                {t(
                  "Repositori otomasi tidak dapat dibagikan publik karena kerahasiaan klien. Detail pendekatan dan struktur framework bisa saya jelaskan saat wawancara.",
                  "The automation repository cannot be shared publicly due to client confidentiality. I can walk through the approach and framework structure in an interview."
                )}
              </p>

            </article>

            {/* Card 3 — Internal Engineering Tools */}
            <article className="flex flex-col min-w-0 p-6 rounded-2xl bg-background border border-border/60 shadow-card hover:shadow-soft hover:border-primary/40 transition-all">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Rocket className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {t(
                  "Internal Engineering Tools — My Productivity Web",
                  "Internal Engineering Tools — My Productivity Web"
                )}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {t(
                  "Membangun sendiri hub QA internal (deploy di Vercel) untuk mempercepat alur pengujian dan memahami arsitektur web dari sisi developer: MPA, routing, dan state.",
                  "Self-built internal QA hub (deployed on Vercel) that speeds up testing workflows and grounds me in web architecture from the developer side: MPA, routing, and state."
                )}
              </p>
              <Button asChild className="w-full whitespace-normal text-center bg-primary text-primary-foreground hover:bg-primary/90">
                <a
                  href={QA_HUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("Buka Suryani's Tech Hub", "Open Suryani's Tech Hub")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("Launch Suryani's Tech Hub", "Launch Suryani's Tech Hub")}
                </a>
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Test Case Matrix */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              label={t("Matriks Test Case", "Test Case Matrix")}
              title={t("Matriks Test Case Interaktif", "Interactive Test Case Matrix")}
              description={t(
                "Contoh cara saya menyusun skenario manual lengkap dengan analisis nilai batas.",
                "A sample of how I structure manual scenarios with boundary value analysis."
              )}
            />
            <div className="rounded-xl border border-border/60 bg-background overflow-x-auto shadow-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-display text-foreground">
                      <span className="inline-flex items-center gap-2"><ListChecks className="h-4 w-4 text-primary" />{t("Fitur", "Feature")}</span>
                    </TableHead>
                    <TableHead className="font-display text-foreground">{t("Langkah Pengujian", "Test Steps")}</TableHead>
                    <TableHead className="font-display text-foreground">{t("Hasil yang Diharapkan", "Expected Result")}</TableHead>
                    <TableHead className="font-display text-foreground">{t("Analisis Nilai Batas", "Boundary Value Analysis")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrixRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-foreground">{row.feature}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.steps}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.expected}</TableCell>
                      <TableCell className="text-muted-foreground text-sm font-mono">{row.boundary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Report */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              label={t("Laporan Investigasi", "Investigation Report")}
              title={t("Anatomi Laporan Bug yang Baik", "Anatomy of a Good Bug Report")}
              description={t(
                "Sebuah contoh ringkas tentang bagaimana saya mendokumentasikan temuan.",
                "A compact example of how I document a finding."
              )}
            />
            <article className="rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden">
              <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border/60 bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Bug className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{bugReport.id}</p>
                    <h3 className="font-display text-base font-semibold text-foreground">{bugReport.title}</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive text-destructive-foreground px-3 py-1 text-xs font-semibold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {t("Severity", "Severity")}: {bugReport.severity}
                </span>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 p-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                    {t("Langkah Reproduksi", "Steps to Reproduce")}
                  </p>
                  <ol className="space-y-1.5 text-sm text-foreground list-decimal list-inside">
                    {bugReport.steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                      {t("Hasil yang Diharapkan", "Expected")}
                    </p>
                    <p className="text-sm text-foreground">{bugReport.expected}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                      {t("Hasil Aktual", "Actual")}
                    </p>
                    <p className="text-sm text-foreground">{bugReport.actual}</p>
                  </div>
                </div>
              </div>
              <footer className="flex items-center gap-2 px-6 py-3 border-t border-border/60 bg-muted/20 text-xs font-mono text-muted-foreground">
                <Monitor className="h-3.5 w-3.5" />
                <span>{t("Environment", "Environment")}: {bugReport.env}</span>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* Available materials */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              label={t("Materi Tersedia", "Available Materials")}
              title={t("Yang Dapat Saya Bagikan", "What I Can Share")}
              description={t(
                "Jenis dokumentasi QA berikut tersedia atas permintaan untuk ditinjau.",
                "The following types of QA documentation are available upon request for review."
              )}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigational CTA — contact lives on /contact only */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              {t("Tertarik berdiskusi?", "Interested in talking?")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t(
                "Saya terbuka untuk peluang QA dan diskusi seputar pengujian.",
                "I'm open to QA opportunities and testing discussions."
              )}
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
                {t("Hubungi Saya", "Contact Me")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </PageLayout>
  );
};

export default Portfolio;
