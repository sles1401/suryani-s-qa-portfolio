import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bug,
  Database,
  ExternalLink,
  FileSpreadsheet,
  Github,
  Lightbulb,
  Lock,
  ShieldCheck,
  Gauge,
  Accessibility,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import {
  TEST_CASE_SHEET_URL,
  TEST_CASE_DOCS_REPO_URL,
  QA_HUB_URL,
  QA_HUB_REPO_URL,
} from "@/lib/links";
import { CASE_STUDIES } from "@/data/case-studies";

const Projects = () => {
  const { t } = useLanguage();

  usePageMeta({
    title: "Projects & Testing Evidence | Suryani Lestari",
    description:
      "Case studies, testing scope, sanitized bug reports, and audit results for HMS, Marketing System, PPIC, OrangeHRM, and this portfolio.",
    path: "/projects",
  });

  const projects = [
    {
      name: "HMS — Hauling Management System",
      nda: true,
      centralized: true,
      role: t("QA Engineer", "QA Engineer"),
      scope: t(
        "Modul master data (unit, driver, lokasi), form transaksi hauling, dan laporan ritase dengan data terpusat (centralized).",
        "Master data modules (units, drivers, locations), hauling transaction forms, and trip reports with centralized data."
      ),
      proves: t(
        "Desain test negatif, validasi data lintas modul, dan bug report yang bisa langsung dieksekusi developer.",
        "Negative test design, cross-module data validation, and bug reports developers can act on directly."
      ),
      approach: [
        t("Test case design (BVA & equivalence partitioning)", "Test case design (BVA & equivalence partitioning)"),
        t("Regression checklist tiap rilis", "Per-release regression checklist"),
        t("Validasi konsistensi data terpusat lewat query SQL", "Centralized data-consistency validation via SQL queries"),
      ],
      links: [
        { label: t("Contoh test case (Sheets)", "Sample test cases (Sheets)"), href: TEST_CASE_SHEET_URL, icon: FileSpreadsheet },
        { label: t("Dokumentasi manual test", "Manual test documentation"), href: TEST_CASE_DOCS_REPO_URL, icon: Github },
      ],
    },
    {
      name: "Marketing System",
      nda: true,
      centralized: true,
      role: t("QA Engineer", "QA Engineer"),
      scope: t(
        "Sistem marketing dengan data terpusat (centralized); validasi alur dan konsistensi data antar-modul.",
        "Marketing system with centralized data; validation of flows and cross-module data consistency."
      ),
      proves: t(
        "Konsistensi data antar-modul pada sistem dengan satu sumber data.",
        "Cross-module data consistency in a single-source system."
      ),
      approach: [
        t("Desain test case fungsional & negatif untuk alur sistem", "Functional & negative test-case design for system flows"),
        t("Validasi konsistensi data pada sumber data terpusat", "Data-consistency validation against the centralized source"),
        t("Regression checklist tiap rilis", "Per-release regression checklist"),
      ],
      links: [],
    },
    {
      name: "PPIC — Production Planning & Inventory Control",
      nda: true,
      centralized: true,
      role: t("QA Engineer", "QA Engineer"),
      scope: t(
        "Sistem perencanaan produksi dan pengendalian persediaan dengan data terpusat (centralized); fokus pada validasi perhitungan dan konsistensi stok.",
        "Production planning and inventory control system with centralized data; focus on calculation validation and stock consistency."
      ),
      proves: t(
        "Validasi perhitungan dan stok pada alur perencanaan produksi.",
        "Calculation and stock validation in production planning flows."
      ),
      approach: [
        t("Test case perhitungan, boundary, dan skenario negatif", "Test cases for calculations, boundaries, and negative scenarios"),
        t("Validasi data stok lewat query SQL", "Stock-data validation through SQL queries"),
        t("Regression checklist tiap rilis", "Per-release regression checklist"),
      ],
      links: [],
    },
    {
      name: "QA Tech Hub",
      nda: false,
      centralized: false,
      role: t("Perancang & penguji", "Builder & tester"),
      scope: t(
        "Web produktivitas untuk kebutuhan dokumentasi QA harian.",
        "Productivity web app for day-to-day QA documentation needs."
      ),
      proves: t(
        "Membangun sekaligus menguji produk sendiri, termasuk API dan aksesibilitas dasar.",
        "Building and testing my own product, including API and basic accessibility checks."
      ),
      approach: [
        t("Pengujian fungsional lintas browser", "Cross-browser functional testing"),
        t("Pemeriksaan aksesibilitas dasar", "Basic accessibility checks"),
        t("Uji API dengan Postman", "API testing with Postman"),
      ],
      links: [
        { label: t("Buka aplikasi", "Open the app"), href: QA_HUB_URL, icon: ExternalLink },
        { label: t("Repositori", "Repository"), href: QA_HUB_REPO_URL, icon: Github },
      ],
    },
  ];

  const bugs = [
    {
      id: "BUG-114",
      severity: "Critical",
      title: t("Perhitungan total ritase salah saat muatan ganda", "Trip total calculation wrong with double loads"),
      status: "Fixed",
      env: "Chrome 122 / Staging",
    },
    {
      id: "BUG-097",
      severity: "Major",
      title: t("Sesi tidak berakhir setelah logout", "Session not invalidated after logout"),
      status: "Fixed",
      env: "Firefox 123 / Staging",
    },
    {
      id: "BUG-088",
      severity: "Major",
      title: t("Validasi tanggal hauling menerima tanggal masa depan", "Hauling date accepts future dates"),
      status: "Fixed",
      env: "Chrome 121 / QA",
    },
    {
      id: "BUG-061",
      severity: "Minor",
      title: t("Label tidak konsisten pada form transaksi hauling", "Inconsistent labels on hauling transaction form"),
      status: "Won't fix",
      env: "Chrome 121 / QA",
    },
  ];

  const audits = [
    {
      icon: Accessibility,
      title: t("Audit Aksesibilitas", "Accessibility Audit"),
      result: t(
        "0 pelanggaran axe-core kritis pada seluruh halaman portofolio (light & dark).",
        "0 critical axe-core violations across all portfolio pages (light & dark)."
      ),
    },
    {
      icon: Gauge,
      title: t("Audit Performa", "Performance Audit"),
      result: t(
        "Lighthouse dijalankan di CI dengan budget skor dan ukuran bundle.",
        "Lighthouse runs in CI with score and bundle-size budgets."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("Stabilitas Layout", "Layout Stability"),
      result: t(
        "CLS < 0.01 saat modal dibuka/ditutup, posisi scroll dipulihkan tepat.",
        "CLS < 0.01 on modal open/close, scroll position restored exactly."
      ),
    },
  ];

  const severityTone: Record<string, string> = {
    Critical: "bg-destructive/15 text-destructive-text border-destructive/40",
    Major: "bg-primary/15 text-primary border-primary/40",
    Minor: "bg-muted text-muted-foreground border-border",
  };

  return (
    <PageLayout>
      <section className="py-16 lg:py-24 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6">
              {t("Proyek", "Projects")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-5">
              {t("Detail Proyek & Hasil Pengujian", "Project Details & Testing Results")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                "Ringkasan lingkup tiap proyek, contoh laporan bug yang disanitasi, dan hasil audit. Materi dari proyek internal hanya ditampilkan dalam bentuk yang sudah disanitasi sesuai NDA.",
                "Scope for each project, sanitized bug report samples, and audit results. Internal project material is only shown in sanitized form per NDA."
              )}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/60 bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Lock aria-hidden="true" className="h-4 w-4 text-primary" />
                  NDA
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {t(
                    "Repo dan data klien tidak dibagikan; bukti berupa test case tersamarkan dan case study.",
                    "Client repos and data are not shared; evidence is sanitized test cases and case studies."
                  )}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Database aria-hidden="true" className="h-4 w-4 text-primary" />
                  Centralized
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {t(
                    "Satu sumber data dipakai lintas modul; konsistensinya divalidasi lewat query SQL.",
                    "One data source is shared across modules; consistency is validated through SQL queries."
                  )}
                </p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Github aria-hidden="true" className="h-4 w-4 text-primary" />
                  {t("Publik", "Public")}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {t(
                    "Artefak yang bisa dibuka dan diverifikasi langsung.",
                    "Artifacts you can open and verify directly."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project details */}
      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Detail", "Details")}
            title={t("Proyek yang Saya Uji", "Projects I Tested")}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.name}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-card"
              >
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-semibold text-foreground">{p.name}</h3>
                  {p.nda && (
                    <Badge variant="outline" className="gap-1 border-border text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      {t("Proyek Internal — NDA", "Internal Project — NDA")}
                    </Badge>
                  )}
                  {p.centralized && (
                    <Badge variant="outline" className="gap-1 border-border text-muted-foreground">
                      <Database className="h-3 w-3" />
                      {t("Centralized", "Centralized")}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium text-foreground">{t("Peran", "Role")}:</span> {p.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium text-foreground">{t("Lingkup", "Scope")}:</span> {p.scope}
                </p>
                <p className="mb-5 flex gap-2 text-sm text-muted-foreground">
                  <Lightbulb aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <span className="font-medium text-foreground">
                      {t("Yang dibuktikan", "What it proves")}:
                    </span>{" "}
                    {p.proves}
                  </span>
                </p>
                <ul className="mb-5 space-y-2">
                  {p.approach.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {a}
                    </li>
                  ))}
                </ul>
                {p.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.links.map((l) => (
                      <Button key={l.href} asChild variant="outline" size="sm">
                        <a href={l.href} target="_blank" rel="noopener noreferrer">
                          <l.icon className="mr-2 h-4 w-4" />
                          {l.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Studi Kasus", "Case Studies")}
            title={t("Proses, Bukan Hanya Hasil", "Process, Not Just Results")}
            description={t(
              "Tiga studi kasus yang menunjukkan konteks, risiko, pendekatan, dan batas antara klaim publik dan data internal.",
              "Three case studies showing context, risks, approach, and the boundary between public claims and internal data."
            )}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                to={`/projects/${study.slug}`}
                className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-colors hover:border-primary/40"
              >
                <span className="mb-3 inline-block self-start rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-primary">
                  {t(study.tag.id, study.tag.en)}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                  {study.project}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(study.summary.id, study.summary.en)}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("Baca studi kasus", "Read case study")}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bug reports */}
      <section id="bug-reports" className="py-14 bg-muted/30 scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Laporan Bug", "Bug Reports")}
            title={t("Contoh Temuan (Disanitasi)", "Sample Findings (Sanitized)")}
            description={t(
              "Judul dan lingkungan ditulis ulang tanpa data klien. Detail langkah lengkap tersedia saat wawancara.",
              "Titles and environments are rewritten without client data. Full reproduction steps are available on request."
            )}
          />
          <div className="overflow-x-auto rounded-2xl border border-border/50 bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>{t("Ringkasan", "Summary")}</TableHead>
                  <TableHead>{t("Lingkungan", "Environment")}</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bugs.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-mono text-xs">{b.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={severityTone[b.severity]}>
                        {b.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-[220px] text-sm text-foreground">{b.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{b.env}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{b.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={TEST_CASE_DOCS_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {t("Repo dokumentasi", "Documentation repo")}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/bug-hunter">
                <Bug className="mr-2 h-4 w-4" />
                {t("Coba Bug Hunter", "Try Bug Hunter")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Audits */}
      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Audit", "Audit")}
            title={t("Hasil Audit Otomatis", "Automated Audit Results")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {audits.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border/50 bg-card p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground">{a.result}</p>
              </div>
            ))}
          </div>

          <Link
            to="/how-i-test"
            className="group mt-10 block rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-colors hover:border-primary/40"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {t("Cara saya menguji", "How I test")}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t(
                    "Proses lima langkah, anatomi bug report, glossary istilah QA, dan catatan teknis untuk developer.",
                    "The five-step process, bug report anatomy, a QA glossary, and technical notes for developers."
                  )}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("Buka proses", "Open the process")}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>

          <div className="mt-10 rounded-2xl border border-primary/15 bg-accent/50 p-6">
            <p className="text-foreground">
              {t("Tertarik berdiskusi?", "Interested in discussing further?")}{" "}
              <Link to="/contact" className="font-medium text-primary hover:underline">
                {t("Hubungi Saya", "Contact Me")} <ArrowRight className="inline h-4 w-4" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
