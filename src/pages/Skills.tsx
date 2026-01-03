import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type SkillLevel = "Basic" | "Familiar" | "Proficient";

interface Skill {
  name: string;
  level: SkillLevel;
}

const SkillBar = ({ name, level }: Skill) => {
  const { t } = useLanguage();
  
  const levelConfig = {
    Basic: { dots: 1, label: t("Dasar", "Basic") },
    Familiar: { dots: 2, label: t("Terbiasa", "Familiar") },
    Proficient: { dots: 3, label: t("Mahir", "Proficient") },
  };

  const config = levelConfig[level];

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50">
      <span className="text-foreground font-medium">{name}</span>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                dot <= config.dots ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground w-20">{config.label}</span>
      </div>
    </div>
  );
};

const Skills = () => {
  const { t } = useLanguage();

  const coreSkills: Skill[] = [
    { name: t("Manual Testing", "Manual Testing"), level: "Proficient" },
    { name: t("Test Case Design", "Test Case Design"), level: "Familiar" },
    { name: t("Regression Testing", "Regression Testing"), level: "Familiar" },
    { name: t("Bug Reporting", "Bug Reporting"), level: "Proficient" },
  ];

  const tools: Skill[] = [
    { name: "Jira", level: "Familiar" },
    { name: "TestRail", level: "Familiar" },
    { name: "Postman", level: "Basic" },
    { name: "Browser DevTools", level: "Basic" },
  ];

  const softSkills: Skill[] = [
    { name: t("Ketelitian", "Attention to Detail"), level: "Proficient" },
    { name: t("Berpikir Analitis", "Analytical Thinking"), level: "Familiar" },
    { name: t("Komunikasi yang Jelas", "Clear Communication"), level: "Familiar" },
    { name: t("Kemauan Belajar", "Willingness to Learn"), level: "Proficient" },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              {t("Keahlian", "Skills")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t("Keahlian & Kemampuan", "Skills & Capabilities")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Gambaran jujur tentang keahlian QA saya saat ini dan alat yang saya gunakan.",
                "An honest overview of my current QA skills and the tools I use."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 bg-card border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
              </div>
              <span className="text-muted-foreground">{t("Dasar", "Basic")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-muted" />
              </div>
              <span className="text-muted-foreground">{t("Terbiasa", "Familiar")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>
              <span className="text-muted-foreground">{t("Mahir", "Proficient")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core QA Skills */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              label={t("Keahlian Inti", "Core Skills")}
              title={t("Keahlian QA Utama", "Core QA Skills")}
              centered
            />
            <div className="space-y-3">
              {coreSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SkillBar {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              label={t("Alat", "Tools")}
              title={t("Alat & Teknologi", "Tools & Technologies")}
              centered
            />
            <div className="space-y-3">
              {tools.map((skill, index) => (
                <div
                  key={skill.name}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SkillBar {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Soft Skills */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              label={t("Soft Skills", "Soft Skills")}
              title={t("Kemampuan Interpersonal", "Interpersonal Skills")}
              centered
            />
            <div className="space-y-3">
              {softSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SkillBar {...skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            {t("Tertarik Melihat Contoh Pekerjaan?", "Interested in Seeing Sample Work?")}
          </h2>
          <Button asChild size="lg" className="group">
            <Link to="/portfolio">
              {t("Lihat Portofolio", "View Portfolio")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Skills;
