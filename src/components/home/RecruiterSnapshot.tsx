import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  Layers,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CV_URL, EMAIL, LINKEDIN_URL } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";

const RecruiterSnapshot = () => {
  const { t } = useLanguage();

  const facts = [
    {
      icon: BriefcaseBusiness,
      label: t("Level", "Level"),
      value: t("Junior QA Engineer", "Junior QA Engineer"),
      detail: t("±10 bulan, sejak Januari 2026", "~10 months, since January 2026"),
    },
    {
      icon: Code2,
      label: t("Fokus", "Focus"),
      value: t("Manual + Automation", "Manual + Automation"),
      detail: "Playwright (Java & JavaScript) · Postman",
    },
    {
      icon: Layers,
      label: t("Konteks", "Context"),
      value: t("Aplikasi web internal", "Internal web applications"),
      detail: "Hauling · Marketing · PPIC",
    },
    {
      icon: MapPin,
      label: t("Lokasi", "Location"),
      value: "Bandung, Indonesia",
      detail: t("Remote / on-site sesuai kebutuhan", "Remote / on-site as needed"),
    },
  ];

  return (
    <section id="ringkasan" className="border-y border-border/50 bg-card py-14 scroll-mt-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
          <div>
            <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              {t("Ringkasan 30 Detik", "30-Second Summary")}
            </span>
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              {t("Untuk rekruter dan tim teknis", "For recruiters and technical teams")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t(
                "QA Engineer junior dengan fokus manual testing dan otomasi Playwright. Terbuka untuk posisi penuh waktu, kontrak, maupun kolaborasi QA — remote atau on-site.",
                "A junior QA Engineer focused on manual testing and Playwright automation. Open to full-time roles, contracts, or QA collaborations — remote or on-site."
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={CV_URL}
                  download="Suryani-Lestari-QA-CV.pdf"
                  onClick={() => trackEvent("cv_download", { location: "snapshot" })}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t("Unduh CV (PDF)", "Download CV (PDF)")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-i-test">
                  {t("Cara saya menguji", "How I test")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-5">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => trackEvent("email_click", { location: "snapshot" })}
                className="inline-flex min-w-0 items-center gap-2 text-foreground hover:text-primary"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                <span className="break-all">{EMAIL}</span>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("linkedin_click", { location: "snapshot" })}
                className="inline-flex items-center gap-2 text-foreground hover:text-primary"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4 text-primary" />
                LinkedIn
              </a>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border/60 bg-background p-5"
              >
                <fact.icon aria-hidden="true" className="h-5 w-5 text-primary" />
                <dt className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold text-foreground">
                  {fact.value}
                </dd>
                <dd className="mt-1 text-sm text-muted-foreground">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSnapshot;
