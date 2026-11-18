import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle, Download, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
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
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 44]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

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

      <section
        ref={heroRef}
        id="hero"
        className="hero-gradient flex items-center py-14 lg:min-h-[calc(100dvh-4rem)] lg:py-20 scroll-mt-28 overflow-x-clip"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
              }
              style={shouldReduceMotion ? undefined : { y: textY, opacity: textOpacity }}
            >
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-block px-3.5 py-1.5 text-sm font-medium text-primary bg-accent rounded-full">
                  QA Engineer
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <span
                    aria-hidden="true"
                    className="status-dot inline-block h-2 w-2 rounded-full bg-emerald-500"
                  />
                  {t("Bandung — Remote atau On-site", "Bandung — Remote or On-site")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-3 leading-tight">
                Suryani Lestari
              </h1>
              <p className="text-lg md:text-xl text-primary font-medium mb-4">
                {t(
                  "Manual & Playwright Automation (Java & JavaScript)",
                  "Manual & Playwright Automation (Java & JavaScript)"
                )}
              </p>
              <p className="text-base md:text-lg text-foreground/85 mb-4 max-w-xl leading-relaxed">
                {t(
                  "Menemukan bug kritis pada alur bisnis, batas nilai, dan konsistensi data sebelum kode menyentuh pengguna.",
                  "Catching critical bugs across business flows, boundary values, and data consistency before code reaches users."
                )}
              </p>
              <p className="mb-8 max-w-lg text-sm font-medium text-muted-foreground">
                {t(
                  "Berpengalaman di sistem web internal sejak Januari 2026 dengan Postman & verifikasi SQL.",
                  "Testing internal web applications since January 2026 with Postman & SQL verification."
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
            </motion.div>

            {/* Profile Photo */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }
              }
              style={
                shouldReduceMotion
                  ? undefined
                  : { y: photoY, scale: photoScale, opacity: photoOpacity }
              }
            >
              <div className="relative">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-soft border-4 border-card">
                  <img
                    src={profilePhoto}
                    alt="Suryani Lestari - Software Quality Assurance"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
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
          <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center">
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
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
