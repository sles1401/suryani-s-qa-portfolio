import { ExternalLink, FileText, Github, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import hmsPreview from "@/assets/project-hms.jpg";
import testCasesPreview from "@/assets/project-testcases.jpg";
import qaHubPreview from "@/assets/project-qahub.jpg";

const DOCS_REPO_URL = "https://github.com/sles1401/qa-test-documentation";
const TEST_CASE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1WQq0nQmS3f7-Live-Test-Case-Dummy/edit?usp=sharing";
const QA_HUB_URL = "https://suryani-s-tech-hub.vercel.app/";
const QA_HUB_REPO_URL = "https://github.com/sles1401";

const FeaturedProjects = () => {
  const { t } = useLanguage();

  interface Project {
    title: string;
    image: string;
    imageAlt: string;
    tags: string[];
    method: string;
    description: string;
    cta: string;
    href: string;
    confidential?: boolean;
    confidentialLabel?: string;
    note?: string;
    internalHref?: boolean;
    repoHref?: string;
    repoCta?: string;
    repoInternalHref?: boolean;
  }

  const projects: Project[] = [
    {
      title: "HMS Project — Hauling Management System",
      image: hmsPreview,
      confidential: true,
      confidentialLabel: t("Internal Project — NDA", "Internal Project — NDA"),
      imageAlt: t(
        "Pratinjau antarmuka dashboard Hauling Management System",
        "Preview of the Hauling Management System dashboard interface"
      ),
      tags: ["Web Testing", "Manual QA", "Master Data Testing"],
      method: t(
        "Metodologi: Black Box Testing, Equivalence Partitioning, Boundary Value Analysis, Regression Testing.",
        "Methodology: Black Box Testing, Equivalence Partitioning, Boundary Value Analysis, Regression Testing."
      ),
      description: t(
        "Ruang lingkup: modul master data (unit, driver, lokasi), form transaksi hauling, dan laporan ritase. Pengujian: fungsional, batas nilai (tonase & tanggal), negatif, serta regresi setelah perbaikan. Dampak: menemukan bug kritis pada perhitungan ritase dan duplikasi data master sebelum rilis produksi, dengan langkah reproduksi yang bisa langsung dipakai developer.",
        "Scope: master data modules (units, drivers, locations), hauling transaction forms, and trip reports. Testing: functional, boundary value (tonnage & dates), negative, and regression after fixes. Impact: caught critical bugs in trip calculation and master-data duplication before the production release, with reproduction steps developers could use directly."
      ),
      note: t(
        "Repositori dan data proyek tidak dapat dibagikan karena kerahasiaan klien. Contoh artefak di bawah sudah disamarkan.",
        "The repository and project data cannot be shared due to client confidentiality. The sample artifacts below are sanitized."
      ),
      cta: t("Lihat Sanitized Sample Bug Report", "View Sanitized Sample Bug Report"),
      href: "#sanitized-evidence",
      internalHref: true,
      repoHref: "#sanitized-evidence",
      repoCta: t("Detail Study Case", "Case Study Details"),
      repoInternalHref: true,
    },
    {
      title: t(
        "Dokumentasi Test Case Manual",
        "Manual Test Case Documentation"
      ),
      image: testCasesPreview,
      imageAlt: t(
        "Pratinjau lembar test case manual dengan status eksekusi",
        "Preview of the manual test case sheet with execution status"
      ),
      tags: ["Test Design", "Manual QA", "Google Sheets"],
      method: t(
        "Metodologi: Positive & Negative Testing, Decision Table, Boundary Value Analysis.",
        "Methodology: Positive & Negative Testing, Decision Table, Boundary Value Analysis."
      ),
      description: t(
        "Kumpulan test case fungsional dan negatif dengan langkah, data uji, expected result, dan status eksekusi — dipakai sebagai basis regression testing berulang.",
        "A set of functional and negative test cases with steps, test data, expected results, and execution status — used as the basis for repeated regression testing."
      ),
      cta: t("Lihat Test Case", "View Test Cases"),
      href: TEST_CASE_SHEET_URL,
      repoHref: DOCS_REPO_URL,
      repoCta: t("Repositori Dokumentasi", "Documentation Repository"),
    },
    {
      title: t("QA Tech Hub (Proyek Pribadi)", "QA Tech Hub (Personal Project)"),
      image: qaHubPreview,
      imageAlt: t(
        "Pratinjau halaman utama QA Tech Hub",
        "Preview of the QA Tech Hub home page"
      ),
      tags: ["Self-Built", "Vercel", "Web Architecture"],
      method: t(
        "Pendekatan: exploratory testing pada aplikasi sendiri, plus cek routing dan state dari sisi developer.",
        "Approach: exploratory testing on my own app, plus routing and state checks from the developer side."
      ),
      description: t(
        "Hub QA internal yang dibangun sendiri untuk mempercepat alur pengujian dan memahami routing, state, serta struktur halaman dari sisi developer.",
        "A self-built internal QA hub that speeds up testing workflows and builds understanding of routing, state, and page structure from the developer side."
      ),
      cta: t("Buka QA Hub", "Open QA Hub"),
      href: QA_HUB_URL,
      repoHref: QA_HUB_REPO_URL,
      repoCta: t("Lihat Repository", "View Repository"),
    },
  ];

  return (
    <section id="featured-projects" className="py-20 scroll-mt-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
            {t("Proyek Unggulan", "Featured Projects")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "Proyek nyata beserta bukti pengujiannya — apa yang diuji dan dampaknya.",
              "Real projects with their testing evidence — what was tested and the impact."
            )}
          </p>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <li
              key={p.title}
              className="flex flex-col min-w-0 overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-soft"
            >
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                width={1024}
                height={640}
                className="aspect-[16/10] w-full border-b border-border object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
              {p.confidential && (
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-accent px-2.5 py-1 text-xs font-semibold text-primary">
                  <Lock aria-hidden="true" className="h-3 w-3" />
                  {p.confidentialLabel}
                </span>
              )}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">
                {p.description}
              </p>
              <p className="mt-3 text-xs font-mono text-primary leading-relaxed">
                {p.method}
              </p>
              {p.note && (
                <p className="mt-3 rounded-md border border-border bg-muted/40 p-3 text-xs text-foreground/80 leading-relaxed">
                  {p.note}
                </p>
              )}
              <Button asChild variant="outline" className="mt-6 w-full">
                <a
                  href={p.href}
                  target={p.internalHref ? undefined : "_blank"}
                  rel={p.internalHref ? undefined : "noopener noreferrer"}
                  aria-label={`${p.cta} — ${p.title}`}
                >
                  {p.internalHref ? (
                    <FileText className="mr-2 h-4 w-4" />
                  ) : (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  )}
                  {p.cta}
                </a>
              </Button>
              {p.repoHref && (
                <Button asChild variant="ghost" className="mt-2 w-full">
                  <a
                    href={p.repoHref}
                    target={p.repoInternalHref ? undefined : "_blank"}
                    rel={p.repoInternalHref ? undefined : "noopener noreferrer"}
                    aria-label={`${p.repoCta} — ${p.title}`}
                  >
                    {p.repoInternalHref ? (
                      <FileText className="mr-2 h-4 w-4" />
                    ) : (
                      <Github className="mr-2 h-4 w-4" />
                    )}
                    {p.repoCta}
                  </a>
                </Button>
              )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProjects;