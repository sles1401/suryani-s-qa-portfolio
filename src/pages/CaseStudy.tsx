import { Link, Navigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  ListChecks,
  Search,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getCaseStudy } from "@/data/case-studies";

const CaseStudy = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const study = getCaseStudy(slug);

  usePageMeta({
    title: study
      ? `${study.project} — Case Study | Suryani Lestari`
      : "Case Study Not Found | Suryani Lestari",
    description: study
      ? t(study.summary.id, study.summary.en)
      : "The requested case study could not be found.",
    path: `/projects/${slug ?? ""}`,
  });

  if (!study) return <Navigate to="/projects" replace />;

  const sections = [
    {
      icon: Target,
      label: t("Konteks", "Context"),
      body: <p className="text-muted-foreground leading-relaxed">{t(study.context.id, study.context.en)}</p>,
    },
    {
      icon: AlertTriangle,
      label: t("Risiko yang Diprioritaskan", "Prioritized Risks"),
      body: (
        <ul className="space-y-3">
          {study.risks.map((risk) => (
            <li key={risk.id} className="flex gap-3 text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{t(risk.id, risk.en)}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: ListChecks,
      label: t("Pendekatan Pengujian", "Testing Approach"),
      body: (
        <ol className="space-y-3">
          {study.approach.map((item, index) => (
            <li key={item.id} className="flex gap-3 text-muted-foreground">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <span className="leading-relaxed">{t(item.id, item.en)}</span>
            </li>
          ))}
        </ol>
      ),
    },
    {
      icon: Search,
      label: t("Temuan", "Findings"),
      body: (
        <ul className="space-y-3">
          {study.findings.map((finding) => (
            <li key={finding.id} className="flex gap-3 text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{t(finding.id, finding.en)}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: CheckCircle2,
      label: t("Hasil", "Outcome"),
      body: <p className="text-muted-foreground leading-relaxed">{t(study.outcome.id, study.outcome.en)}</p>,
    },
  ];

  return (
    <PageLayout>
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              to="/projects"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {t("Kembali ke Projects", "Back to Projects")}
            </Link>
            <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              {t("Studi Kasus", "Case Study")} · {t(study.tag.id, study.tag.en)}
            </span>
            <h1 className="mb-5 font-display text-4xl font-semibold text-foreground md:text-5xl">
              {study.project}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(study.summary.id, study.summary.en)}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <article className="space-y-10">
              {sections.map((section) => (
                <div key={section.label}>
                  <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-semibold text-foreground">
                    <section.icon aria-hidden="true" className="h-5 w-5 text-primary" />
                    {section.label}
                  </h2>
                  {section.body}
                </div>
              ))}
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-primary/15 bg-accent/50 p-6">
                <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <AlertTriangle aria-hidden="true" className="h-4 w-4 text-primary" />
                  {t("Catatan Integritas", "Integrity Note")}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(study.caveat.id, study.caveat.en)}
                </p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-card">
                <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <FileText aria-hidden="true" className="h-4 w-4 text-primary" />
                  {t("Artefak & Bukti", "Artifacts & Evidence")}
                </h2>
                <ul className="space-y-3">
                  {study.evidence.map((item) =>
                    item.external ? (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          {t(item.label.id, item.label.en)}
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ) : (
                      <li key={item.href}>
                        <Link
                          to={item.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          {t(item.label.id, item.label.en)}
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </aside>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/contact">
                {t("Diskusikan Studi Kasus Ini", "Discuss This Case Study")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/projects">{t("Lihat Semua Proyek", "View All Projects")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudy;
