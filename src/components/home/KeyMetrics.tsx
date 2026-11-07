import { Link } from "react-router-dom";
import { ArrowUpRight, Users, ListChecks, Bug, GitCompareArrows } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TEST_CASE_DOCS_REPO_URL, TEST_CASE_SHEET_URL } from "@/lib/links";

const KeyMetrics = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      value: "25+",
      icon: Users,
      label: t("Siswa Dibimbing", "Students Taught"),
      context: t(
        "Dasar web & pola pikir pengujian, kelas mentoring 2023–2024",
        "Web basics & testing mindset, 2023–2024 mentoring classes"
      ),
      source: null,
    },
    {
      value: "100+",
      icon: ListChecks,
      label: t("Test Case Dieksekusi", "Test Cases Executed"),
      context: t(
        "Test case manual fungsional & negatif pada proyek Hauling Management System",
        "Functional & negative manual test cases on the Hauling Management System project"
      ),
      source: {
        href: TEST_CASE_SHEET_URL,
        label: t("Lihat sampel test case", "View sample test cases"),
        external: true,
      },
    },
    {
      value: "50+",
      icon: Bug,
      label: t("Bug Didokumentasikan", "Bugs Documented & Reported"),
      context: t(
        "Lengkap dengan langkah reproduksi, bukti, dan severity",
        "Complete with reproduction steps, evidence, and severity"
      ),
      source: {
        href: "/projects#bug-reports",
        label: t("Lihat contoh laporan", "View sample reports"),
        external: false,
      },
    },
    {
      value: "100%",
      icon: GitCompareArrows,
      label: t("Akurasi Konfirmasi Flow", "Flow Confirmation Accuracy"),
      context: t(
        "0 selisih pada sampel validasi alur data master ↔ modul hauling",
        "Zero mismatches on the sampled data-flow validation between master data and hauling modules"
      ),
      source: null,
    },
  ];

  return (
    <section id="key-metrics" className="py-16 scroll-mt-28 border-y border-border/50 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="sr-only">{t("Metrik Utama", "Key Metrics")}</h2>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map(({ icon: Icon, ...m }) => (
            <div key={m.label} className="text-center min-w-0">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <Icon
                  aria-hidden="true"
                  className="mx-auto mb-3 h-6 w-6 text-primary"
                />
                <span className="block font-display text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  {m.value}
                </span>
                <span className="mt-2 block text-base font-semibold text-foreground">
                  {m.label}
                </span>
                <span className="mt-1.5 block text-sm text-foreground/75 leading-relaxed">
                  {m.context}
                </span>
                {m.source && (
                  m.source.external ? (
                    <a
                      href={m.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {m.source.label}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={m.source.href}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {m.source.label}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  )
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-muted-foreground">
          {t(
            "Angka eksekusi berasal dari tracker internal HMS (NDA). Artefak yang dapat ditinjau publik: sampel test case, repo dokumentasi manual test, dan contoh laporan bug tersanitasi di halaman Projects.",
            "Execution figures come from the internal HMS tracker (NDA). Publicly reviewable artifacts: sample test cases, the manual-test documentation repo, and sanitized sample bug reports on the Projects page."
          )}{" "}
          <a
            href={TEST_CASE_DOCS_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {t("Repo dokumentasi", "Documentation repo")}
          </a>
          {" · "}
          <Link to="/projects" className="font-medium text-primary hover:underline">
            {t("Lihat Projects", "View Projects")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default KeyMetrics;