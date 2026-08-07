import { useLanguage } from "@/contexts/LanguageContext";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "hero",
  "key-metrics",
  "featured-projects",
  "sanitized-evidence",
  "tools-technologies",
  "experience-highlights",
];

const SectionNav = () => {
  const { t } = useLanguage();
  const active = useActiveSection(SECTION_IDS);

  const labels: Record<string, string> = {
    hero: t("Profil", "Profile"),
    "key-metrics": t("Metrik", "Metrics"),
    "featured-projects": t("Proyek", "Projects"),
    "sanitized-evidence": t("Bukti", "Evidence"),
    "tools-technologies": t("Tools", "Tools"),
    "experience-highlights": t("Pengalaman", "Experience"),
  };

  return (
    <nav
      aria-label={t("Navigasi bagian halaman", "Page section navigation")}
      className="sticky top-16 z-40 border-b border-border/50 bg-background/85 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-2 text-sm">
          {SECTION_IDS.map((id) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={cn(
                  "block rounded-md px-3 py-1.5 font-medium transition-colors",
                  active === id
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {labels[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SectionNav;