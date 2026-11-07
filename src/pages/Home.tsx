import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Download, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import RecruiterSnapshot from "@/components/home/RecruiterSnapshot";
import KeyMetrics from "@/components/home/KeyMetrics";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import SanitizedEvidence from "@/components/home/SanitizedEvidence";
import ToolsGrid from "@/components/home/ToolsGrid";
import ExperienceHighlights from "@/components/home/ExperienceHighlights";
import SectionNav from "@/components/home/SectionNav";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import { CV_URL, EMAIL, LINKEDIN_URL } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";

const Home = () => {
  const { t } = useLanguage();

  usePageMeta({
    title: "Suryani Lestari | QA Engineer — Manual & Automation Testing",
    description:
      "Junior QA Engineer with manual and automated testing experience using Playwright (Java & JavaScript) and Postman. Explore projects, sanitized testing evidence, and QA documentation.",
    path: "/",
  });

  const highlights = [
    t("Manual Testing", "Manual Testing"),
    t("Playwright Automation", "Playwright Automation"),
    t("API Testing (Postman)", "API Testing (Postman)"),
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <SectionNav />

      <section id="hero" className="hero-gradient min-h-[calc(100vh-4rem)] flex items-center scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 opacity-0 animate-fade-in-up">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-accent rounded-full">
                  {t("Junior QA Engineer", "Junior QA Engineer")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <span
                    aria-hidden="true"
                    className="status-dot inline-block h-2 w-2 rounded-full bg-emerald-500"
                  />
                  {t(
                    "Bandung · Remote / On-site",
                    "Bandung · Remote / On-site"
                  )}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 leading-tight neon-glow">
                Suryani Lestari
              </h1>
              <p className="text-lg md:text-xl text-primary font-medium mb-5">
                {t(
                  "QA Engineer — Manual & Automation · The Bug Detective",
                  "QA Engineer — Manual & Automation · The Bug Detective"
                )}
              </p>
              <p className="text-lg md:text-xl text-foreground/90 mb-3 max-w-xl leading-relaxed font-display italic">
                {t(
                  "“Mengungkap bug tersembunyi, memastikan pengalaman yang mulus.”",
                  "“Uncovering hidden bugs, ensuring seamless experiences.”"
                )}
              </p>
              <p className="text-base text-muted-foreground mb-4 max-w-lg leading-relaxed">
                {t(
                  "QA engineer yang teliti, melihat lebih dalam dari sekadar permukaan untuk menjaga kepercayaan pengguna.",
                  "A detail-oriented QA engineer who looks beyond the surface to protect user trust."
                )}
              </p>
              <p className="mb-8 max-w-lg text-sm font-medium text-foreground/80">
                {t(
                  "QA Engineer sejak Januari 2026 · Playwright (Java & JavaScript) · Postman",
                  "QA Engineer since January 2026 · Playwright (Java & JavaScript) · Postman"
                )}
              </p>
              
              {/* Quick highlights */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <a
                    href={CV_URL}
                    download="Suryani-Lestari-QA-CV.pdf"
                    onClick={() => trackEvent("cv_download", { location: "hero" })}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {t("Unduh CV (PDF)", "Download CV (PDF)")}
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    {t("Hubungi Saya", "Contact Me")}
                  </Link>
                </Button>
              </div>
              <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={`mailto:${EMAIL}`}
                  onClick={() => trackEvent("email_click", { location: "hero" })}
                  className="inline-flex min-w-0 items-center gap-2 text-foreground hover:text-primary"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                  <span className="break-all">{EMAIL}</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("linkedin_click", { location: "hero" })}
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                >
                  <Linkedin aria-hidden="true" className="h-4 w-4 text-primary" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="order-1 lg:order-2 flex justify-center opacity-0 animate-fade-in animate-delay-200">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-soft border-4 border-card">
                  <img
                    src={profilePhoto}
                    alt="Suryani Lestari - Software Quality Assurance"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RecruiterSnapshot />
      <KeyMetrics />
      <FeaturedProjects />
      <SanitizedEvidence />
      <ToolsGrid />
      <ExperienceHighlights />

      {/* Closing navigation */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up animate-delay-300">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {t("Ingin melihat rekam jejak lengkap?", "Want to see the full track record?")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t("Buka Resume atau hubungi saya untuk berdiskusi.", "Open my Resume or contact me to talk.")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline"><Link to="/resume">{t("Buka Resume", "Open Resume")}</Link></Button>
              <Button asChild><Link to="/contact">{t("Hubungi Saya", "Contact Me")}<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
