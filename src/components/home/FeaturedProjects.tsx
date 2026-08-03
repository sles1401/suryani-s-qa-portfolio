import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const DOCS_REPO_URL = "https://github.com/sles1401/qa-test-documentation";
const TEST_CASE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1WQq0nQmS3f7-Live-Test-Case-Dummy/edit?usp=sharing";
const QA_HUB_URL = "https://suryani-s-tech-hub.vercel.app/";

const FeaturedProjects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: "HMS Project — Hauling Management System",
      tags: ["Web Testing", "Manual QA", "Master Data Testing"],
      description: t(
        "Menguji modul master data dan alur hauling end-to-end: validasi input, konfirmasi flow data antar modul, dan regression test setelah perbaikan. Temuan didokumentasikan agar developer bisa reproduksi dengan cepat.",
        "Tested master data modules and the end-to-end hauling flow: input validation, cross-module data flow confirmation, and regression testing after fixes. Findings were documented so developers could reproduce them quickly."
      ),
      cta: t("Lihat Laporan Bug", "View Bug Report"),
      href: DOCS_REPO_URL,
    },
    {
      title: t(
        "Dokumentasi Test Case Manual",
        "Manual Test Case Documentation"
      ),
      tags: ["Test Design", "Manual QA", "Google Sheets"],
      description: t(
        "Kumpulan test case fungsional dan negatif dengan langkah, data uji, expected result, dan status eksekusi — dipakai sebagai basis regression testing berulang.",
        "A set of functional and negative test cases with steps, test data, expected results, and execution status — used as the basis for repeated regression testing."
      ),
      cta: t("Lihat Test Case", "View Test Cases"),
      href: TEST_CASE_SHEET_URL,
    },
    {
      title: t("QA Tech Hub (Proyek Pribadi)", "QA Tech Hub (Personal Project)"),
      tags: ["Self-Built", "Vercel", "Web Architecture"],
      description: t(
        "Hub QA internal yang dibangun sendiri untuk mempercepat alur pengujian dan memahami routing, state, serta struktur halaman dari sisi developer.",
        "A self-built internal QA hub that speeds up testing workflows and builds understanding of routing, state, and page structure from the developer side."
      ),
      cta: t("Buka QA Hub", "Open QA Hub"),
      href: QA_HUB_URL,
    },
  ];

  return (
    <section id="featured-projects" className="py-20">
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
              className="flex flex-col min-w-0 rounded-lg border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-soft"
            >
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
              <Button asChild variant="outline" className="mt-6 w-full">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.cta} — ${p.title}`}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {p.cta}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProjects;