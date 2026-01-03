import { Link } from "react-router-dom";
import { ArrowRight, Heart, Target, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: t("Ketelitian", "Attention to Detail"),
      description: t(
        "Saya percaya bahwa pengujian yang menyeluruh berasal dari pemeriksaan setiap aspek produk dengan cermat.",
        "I believe thorough testing comes from carefully examining every aspect of a product."
      )
    },
    {
      icon: Users,
      title: t("Komunikasi yang Jelas", "Clear Communication"),
      description: t(
        "Laporan bug dan dokumentasi yang efektif membantu tim memahami masalah dengan cepat dan memperbaikinya dengan efisien.",
        "Effective bug reports and documentation help teams understand issues quickly and fix them efficiently."
      )
    },
    {
      icon: Heart,
      title: t("Fokus pada Pengguna", "User-Centered Mindset"),
      description: t(
        "Quality assurance pada akhirnya adalah tentang memastikan pengguna memiliki pengalaman yang positif dengan produk.",
        "Quality assurance is ultimately about ensuring users have a positive experience with the product."
      )
    },
    {
      icon: BookOpen,
      title: t("Semangat Belajar", "Willingness to Learn"),
      description: t(
        "Saya selalu terbuka untuk mempelajari hal-hal baru dan meningkatkan kemampuan QA saya secara berkelanjutan.",
        "I'm always open to learning new things and continuously improving my QA skills."
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
              {t("Tentang Saya", "About Me")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t(
                "Membangun Karir di Quality Assurance",
                "Building a Career in Quality Assurance"
              )}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Saya Suryani Lestari, saat ini sedang membangun karir sebagai Software Quality Assurance dengan spesialisasi manual testing.",
                "I'm Suryani Lestari, currently building my career as a Software Quality Assurance specializing in manual testing."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="opacity-0 animate-fade-in-up">
              <SectionHeader
                label={t("Latar Belakang", "Background")}
                title={t("Perjalanan Profesional", "Professional Journey")}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {t(
                    "Saat ini saya sedang membangun karir sebagai Software Quality Assurance. Saya memiliki pengalaman praktis dalam manual testing, bug reporting, dan regression testing.",
                    "I'm currently building my career as a Software Quality Assurance. I have hands-on experience in manual testing, bug reporting, and regression testing."
                  )}
                </p>
                <p>
                  {t(
                    "Saya fokus pada manual testing karena saya percaya tidak ada pengganti untuk berpikir seperti pengguna dan mengeksplorasi software seperti cara orang menggunakannya.",
                    "I focus on manual testing because I believe there's no substitute for thinking like a user and exploring software the way real people would use it."
                  )}
                </p>
                <p>
                  {t(
                    "Dengan pola pikir belajar dan rasa tanggung jawab yang tinggi, tujuan saya adalah membantu tim memberikan software yang handal dan memenuhi kebutuhan penggunanya.",
                    "With a learning mindset and strong sense of responsibility, my goal is to help teams deliver reliable software that meets user needs."
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-center opacity-0 animate-fade-in animate-delay-200">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-soft">
                  <img
                    src={profilePhoto}
                    alt="Suryani Lestari"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-primary/20 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Nilai-nilai", "Values")}
            title={t("Yang Memandu Pekerjaan Saya", "What Guides My Work")}
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-soft transition-shadow opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            {t(
              "Ingin Tahu Lebih Lanjut Tentang Pengalaman Saya?",
              "Want to Know More About My Experience?"
            )}
          </h2>
          <Button asChild size="lg" className="group">
            <Link to="/experience">
              {t("Lihat Pengalaman QA", "View QA Experience")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
