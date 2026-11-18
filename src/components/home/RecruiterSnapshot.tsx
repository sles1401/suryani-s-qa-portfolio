import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  FolderGit2,
  Layers,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";

const RecruiterSnapshot = () => {
  const { t } = useLanguage();

  const facts = [
    {
      icon: BriefcaseBusiness,
      label: t("Level", "Level"),
      value: t("Junior QA Engineer", "Junior QA Engineer"),
      detail: t("Sejak Januari 2026", "Since January 2026"),
    },
    {
      icon: Code2,
      label: t("Fokus", "Focus"),
      value: t("Manual & Automation", "Manual & Automation"),
      detail: "Playwright (Java, JS), Postman, SQL",
    },
    {
      icon: Layers,
      label: t("Konteks", "Context"),
      value: t("Aplikasi web internal", "Internal web applications"),
      detail: "Hauling, Marketing, PPIC",
    },
    {
      icon: MapPin,
      label: t("Lokasi", "Location"),
      value: "Bandung, Indonesia",
      detail: t("Remote atau on-site", "Remote or on-site"),
    },
  ];

  return (
    <section id="ringkasan" className="border-y border-border/50 bg-card py-14 scroll-mt-28 overflow-x-clip">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-center">
          <ScrollReveal direction="up">
            <p className="mb-2 text-sm font-medium text-primary">
              {t("Ringkasan 30 Detik", "30-Second Summary")}
            </p>
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              {t("Untuk rekruter dan tim teknis", "For recruiters and technical teams")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t(
                "Fokus pada perancangan test case negatif, validasi integritas data, dan otomasi regresi dengan Playwright. Terbuka untuk posisi penuh waktu maupun kontrak QA.",
                "Focused on negative test-case design, data-integrity validation, and Playwright regression automation. Open to full-time or contract QA roles."
              )}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/projects">
                  <FolderGit2 className="mr-2 h-4 w-4" />
                  {t("Lihat Proyek & Bukti", "View Projects & Evidence")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-i-test">
                  {t("Cara Saya Menguji", "How I Test")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollRevealGroup as="dl" className="grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <ScrollRevealItem
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
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSnapshot;
