import { Download, FileText, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const Resume = () => {
  const { t } = useLanguage();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              {t("Resume", "Resume")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t("Resume / CV", "Resume / CV")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Unduh resume saya untuk melihat latar belakang, keahlian, dan pengalaman QA saya secara lengkap.",
                "Download my resume to see my complete background, skills, and QA experience."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Resume Download Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-12 opacity-0 animate-fade-in-up">
              <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {t("QA Tahap Awal Karir", "Early-Career QA Professional")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "Saya seorang QA tahap awal karir yang berfokus pada manual testing, dengan pengalaman praktis dalam functional testing, regression testing, dan bug reporting. Resume saya berisi detail lengkap tentang perjalanan profesional saya.",
                  "I'm an early-career QA focused on manual testing, with hands-on experience in functional testing, regression testing, and bug reporting. My resume contains full details of my professional journey."
                )}
              </p>
            </div>

            {/* Download Card */}
            <div className="bg-card border border-border/50 rounded-2xl p-8 text-center shadow-card opacity-0 animate-fade-in-up animate-delay-200">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                {t("Unduh Resume Saya", "Download My Resume")}
              </h3>
              <p className="text-muted-foreground mb-8">
                {t(
                  "Klik tombol di bawah untuk mengunduh resume saya dalam format PDF.",
                  "Click the button below to download my resume in PDF format."
                )}
              </p>
              
              <Button size="lg" className="group mb-4">
                <Download className="mr-2 h-5 w-5" />
                {t("Unduh Resume (PDF)", "Download Resume (PDF)")}
              </Button>
              
              <p className="text-xs text-muted-foreground">
                {t(
                  "* File resume akan tersedia setelah diunggah",
                  "* Resume file will be available once uploaded"
                )}
              </p>
            </div>

            {/* LinkedIn Alternative */}
            <div className="mt-8 p-6 rounded-xl bg-muted/30 border border-border/50 text-center opacity-0 animate-fade-in-up animate-delay-300">
              <p className="text-muted-foreground mb-4">
                {t(
                  "Atau lihat profil profesional saya di LinkedIn:",
                  "Or view my professional profile on LinkedIn:"
                )}
              </p>
              <Button asChild variant="outline" size="lg">
                <a 
                  href="https://www.linkedin.com/in/suryani-lestari" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  {t("Lihat Profil LinkedIn", "View LinkedIn Profile")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Resume;
