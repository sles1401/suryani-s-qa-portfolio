import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Download, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  const highlights = [
    t("Manual Testing", "Manual Testing"),
    t("Regression Testing", "Regression Testing"),
    t("Bug Reporting", "Bug Reporting"),
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[calc(100vh-4rem)] flex items-center">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 opacity-0 animate-fade-in-up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-accent rounded-full mb-6">
                {t("Quality Assurance", "Quality Assurance")}
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 leading-tight neon-glow">
                Suryani Lestari
              </h1>
              <p className="text-lg md:text-xl text-primary font-medium mb-5">
                {t(
                  "Manual QA Engineer — The Bug Detective",
                  "Manual QA Engineer — The Bug Detective"
                )}
              </p>
              <p className="text-lg md:text-xl text-foreground/90 mb-3 max-w-xl leading-relaxed font-display italic">
                {t(
                  "“Mengungkap bug tersembunyi, memastikan pengalaman yang mulus.”",
                  "“Uncovering hidden bugs, ensuring seamless experiences.”"
                )}
              </p>
              <p className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {t(
                  "QA manual yang teliti, melihat lebih dalam dari sekadar permukaan untuk menjaga kepercayaan pengguna.",
                  "A detail-oriented Manual QA who looks beyond the surface to protect user trust."
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
                  <Link to="/resume">
                    <Download className="mr-2 h-4 w-4" />
                    {t("Unduh Resume / CV", "Download Resume / CV")}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a 
                    href="https://www.linkedin.com/in/suryani-lestari" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    {t("Lihat Profil LinkedIn", "View LinkedIn Profile")}
                  </a>
                </Button>
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

      {/* Brief intro section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up animate-delay-300">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              {t(
                "Memastikan Kualitas, Satu Tes Pada Satu Waktu",
                "Ensuring Quality, One Test at a Time"
              )}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t(
                "Dengan fokus pada manual testing dan quality assurance, saya membantu tim pengembangan mengidentifikasi masalah lebih awal, mendokumentasikan temuan dengan jelas, dan memberikan produk yang memenuhi harapan pengguna.",
                "With a focus on manual testing and quality assurance, I help development teams identify issues early, document findings clearly, and deliver products that meet user expectations."
              )}
            </p>
            <Button asChild variant="link" className="text-primary">
              <Link to="/about">
                {t("Pelajari lebih lanjut tentang saya", "Learn more about me")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
