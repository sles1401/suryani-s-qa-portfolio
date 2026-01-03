import { Link } from "react-router-dom";
import { ArrowRight, FileText, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t } = useLanguage();

  const portfolioItems = [
    {
      title: t("Dokumentasi Test Case", "Test Case Documentation"),
      description: t(
        "Test case yang mencakup skenario functional dan regression testing.",
        "Test cases covering functional and regression testing scenarios."
      )
    },
    {
      title: t("Bug Reports", "Bug Reports"),
      description: t(
        "Contoh laporan bug dengan langkah reproduksi dan klasifikasi tingkat keparahan.",
        "Sample bug reports with reproduction steps and severity classifications."
      )
    },
    {
      title: t("Test Plans", "Test Plans"),
      description: t(
        "Rencana pengujian yang menguraikan ruang lingkup, pendekatan, dan jadwal.",
        "Test plans outlining testing scope, approach, and schedule."
      )
    },
    {
      title: t("Laporan Ringkasan Pengujian", "Test Summary Reports"),
      description: t(
        "Laporan penyelesaian proyek yang merangkum aktivitas dan temuan pengujian.",
        "Project completion reports summarizing testing activities and findings."
      )
    }
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              {t("Portofolio", "Portfolio")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t("Portofolio QA", "QA Portfolio")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Kumpulan dokumentasi QA dan materi pengujian yang menunjukkan pendekatan saya terhadap quality assurance.",
                "A collection of QA documentation and testing materials demonstrating my approach to quality assurance."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Notice Card */}
            <div className="bg-accent/50 border border-primary/20 rounded-2xl p-8 mb-12 opacity-0 animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    {t(
                      "Contoh Materi Tersedia Atas Permintaan",
                      "Sample Materials Available Upon Request"
                    )}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t(
                      "Contoh test case, bug report, dan dokumentasi QA tersedia atas permintaan. Materi portofolio ini merupakan pekerjaan tahap awal karir dan pembelajaran.",
                      "Sample test cases, bug reports, and QA documentation are available upon request. This portfolio represents early-career and learning-stage work."
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Silakan hubungi saya untuk mendiskusikan contoh yang relevan.",
                      "Please feel free to reach out to discuss relevant samples."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* What's Available */}
            <SectionHeader
              label={t("Materi Tersedia", "Available Materials")}
              title={t("Yang Dapat Saya Bagikan", "What I Can Share")}
              description={t(
                "Jenis dokumentasi QA berikut tersedia atas permintaan untuk ditinjau.",
                "The following types of QA documentation are available upon request for review."
              )}
            />

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {portfolioItems.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center bg-card border border-border/50 rounded-2xl p-8 opacity-0 animate-fade-in-up animate-delay-400">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("Minta Materi Portofolio", "Request Portfolio Materials")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Tertarik melihat contoh spesifik dari pekerjaan QA saya? Hubungi saya dan saya akan dengan senang hati berbagi sampel yang relevan.",
                  "Interested in seeing specific examples of my QA work? Get in touch and I'll be happy to share relevant samples."
                )}
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  {t("Hubungi Saya", "Contact Me")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Portfolio;
