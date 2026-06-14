import { Link } from "react-router-dom";
import { ArrowRight, Bug, ClipboardCheck, FileText, RefreshCw, Search, TestTube, WifiOff, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";

const Experience = () => {
  const { t } = useLanguage();

  const responsibilities = [
    {
      icon: ClipboardCheck,
      title: t("Desain Test Case", "Test Case Design"),
      description: t(
        "Membuat test case yang mencakup kebutuhan fungsional dan skenario pengguna.",
        "Creating test cases that cover functional requirements and user scenarios."
      )
    },
    {
      icon: TestTube,
      title: t("Manual Testing", "Manual Testing"),
      description: t(
        "Melakukan pengujian manual untuk memverifikasi fungsionalitas software dan pengalaman pengguna.",
        "Executing manual tests to verify software functionality and user experience."
      )
    },
    {
      icon: RefreshCw,
      title: t("Regression Testing", "Regression Testing"),
      description: t(
        "Memastikan perubahan baru tidak merusak fungsionalitas yang sudah ada.",
        "Ensuring new changes don't break existing functionality."
      )
    },
    {
      icon: Bug,
      title: t("Bug Reporting", "Bug Reporting"),
      description: t(
        "Mendokumentasikan masalah dengan langkah reproduksi yang jelas dan tingkat keparahan.",
        "Documenting issues with clear reproduction steps and severity levels."
      )
    },
    {
      icon: Search,
      title: t("Functional Testing", "Functional Testing"),
      description: t(
        "Memverifikasi bahwa setiap fitur bekerja sesuai dengan spesifikasi yang ditentukan.",
        "Verifying that each feature works according to defined specifications."
      )
    },
    {
      icon: FileText,
      title: t("Dokumentasi", "Documentation"),
      description: t(
        "Memelihara dokumentasi pengujian dan laporan yang jelas untuk stakeholder.",
        "Maintaining clear test documentation and reports for stakeholders."
      )
    }
  ];

  const strengths = [
    t("Pendekatan sistematis dalam perencanaan dan eksekusi pengujian", "Systematic approach to test planning and execution"),
    t("Perhatian terhadap detail dalam mengidentifikasi masalah", "Strong attention to detail in identifying issues"),
    t("Pelaporan bug yang jelas dan ringkas", "Clear and concise bug reporting"),
    t("Komunikasi efektif dengan tim pengembangan", "Effective communication with development teams"),
    t("Pemahaman perspektif pengguna", "Understanding of user perspective"),
    t("Dokumentasi dan pelaporan yang terorganisir", "Organized documentation and reporting")
  ];

  const caseStudies = [
    {
      icon: WifiOff,
      title: t("Form Saat Koneksi Terputus", "Form Submission on Network Drop"),
      finding: t(
        "Menguji submit form saat koneksi internet tiba-tiba mati di tengah proses.",
        "Tested form submission when the network suddenly dropped mid-request."
      ),
      result: t(
        "Menemukan loading spinner yang berputar tanpa henti tanpa pesan error — pengguna tidak tahu harus melakukan apa.",
        "Found an infinite loading spinner with no error message — users had no idea what to do next."
      ),
    },
    {
      icon: ShieldAlert,
      title: t("Validasi Karakter Spesial", "Special Character Validation"),
      finding: t(
        "Mencoba input karakter unicode, emoji, dan pola mirip SQL di kolom nama dan pencarian.",
        "Tried unicode characters, emoji, and SQL-like patterns in name and search fields."
      ),
      result: t(
        "Beberapa kolom menerima string panjang tanpa batas dan menampilkan output yang rusak di daftar.",
        "Several fields accepted unbounded strings and rendered as broken output in list views."
      ),
    },
    {
      icon: Sparkles,
      title: t("Sesi Login Kadaluarsa", "Expired Login Session"),
      finding: t(
        "Mendiamkan tab selama lebih dari satu jam, lalu mencoba aksi seperti menyimpan data.",
        "Left a tab idle for over an hour, then attempted actions like saving data."
      ),
      result: t(
        "Aksi gagal diam-diam tanpa redirect ke halaman login — data pengguna hilang.",
        "Action failed silently with no redirect to login — the user's draft was lost."
      ),
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              {t("Pengalaman QA", "QA Experience")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t("Pengalaman Quality Assurance", "Quality Assurance Experience")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Gambaran tentang tanggung jawab QA saya dan pendekatan dalam memastikan kualitas software.",
                "An overview of my QA responsibilities and approach to ensuring software quality."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Role Snapshot */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
            <SectionHeader
              label={t("Gambaran Peran", "Role Snapshot")}
              title={t("Software Quality Assurance", "Software Quality Assurance")}
              description={t(
                "Berfokus pada manual testing dengan pengalaman dalam proyek nyata, functional testing, regression testing, dan bug reporting.",
                "Focused on manual testing with experience in real projects, functional testing, regression testing, and bug reporting."
              )}
              centered
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((item, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              label={t("Kekuatan", "Strengths")}
              title={t("Yang Saya Bawa ke QA", "What I Bring to QA")}
              centered
            />
            <ul className="space-y-4">
              {strengths.map((strength, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="text-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bug Hunting Case Studies */}
      <section className="py-20 bg-card border-t border-border/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              label={t("Studi Kasus", "Case Studies")}
              title={t("Cerita Berburu Bug", "Bug Hunting Case Studies")}
              description={t(
                "Beberapa edge case yang saya kejar — cerita singkat tentang apa yang diuji dan apa yang ditemukan.",
                "A few edge cases I chased — short stories of what was tested and what surfaced."
              )}
              centered
            />
            <div className="space-y-4">
              {caseStudies.map((c, i) => (
                <article
                  key={i}
                  className="p-6 rounded-xl bg-background border border-border/60 hover:border-primary/40 transition-colors opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                      <c.icon className="h-5 w-5 text-primary" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">{c.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        <span className="font-semibold text-foreground">{t("Yang diuji: ", "What was tested: ")}</span>
                        {c.finding}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{t("Temuan: ", "Finding: ")}</span>
                        {c.result}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            {t("Lihat Keahlian Saya", "View My Skills")}
          </h2>
          <Button asChild size="lg" className="group">
            <Link to="/skills">
              {t("Lihat Keahlian", "View Skills")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Experience;
