import { Link } from "react-router-dom";
import {
  Briefcase,
  Download,
  FileText,
  GraduationCap,
  Linkedin,
  Mail,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const Resume = () => {
  const { t } = useLanguage();

  const timeline = [
    {
      kind: "work" as const,
      period: "2024 — 2025",
      role: t("QA Manual (Proyek)", "Manual QA (Project)"),
      entity: t(
        "HMS Project — Hauling Management System (Internal / NDA)",
        "HMS Project — Hauling Management System (Internal / NDA)"
      ),
      achievements: [
        t(
          "Menulis & mengeksekusi 100+ test case manual untuk modul master data dan transaksi hauling.",
          "Wrote and executed 100+ manual test cases across master data and hauling transaction modules."
        ),
        t(
          "Melaporkan 50+ bug dengan langkah reproduksi, bukti, dan severity yang jelas.",
          "Reported 50+ bugs with clear reproduction steps, evidence, and severity."
        ),
        t(
          "Menemukan bug kritis pada perhitungan ritase sebelum rilis produksi.",
          "Caught critical trip-calculation bugs before the production release."
        ),
      ],
    },
    {
      kind: "work" as const,
      period: "2023 — 2024",
      role: t("Pengajar / Mentor Dasar Web", "Web Basics Instructor / Mentor"),
      entity: t("Kelas mentoring privat & kelompok", "Private and group mentoring classes"),
      achievements: [
        t(
          "Membimbing 25+ siswa pada dasar web dan pola pikir pengujian.",
          "Guided 25+ students through web fundamentals and a testing mindset."
        ),
        t(
          "Menyusun materi latihan berbasis skenario uji sederhana.",
          "Built practice material based on simple test scenarios."
        ),
      ],
    },
    {
      kind: "education" as const,
      period: t("Pendidikan", "Education"),
      role: t("Belajar Mandiri Quality Assurance", "Self-Directed Quality Assurance Study"),
      entity: t(
        "Kursus online, dokumentasi ISTQB, dan proyek pribadi (QA Tech Hub)",
        "Online courses, ISTQB materials, and personal projects (QA Tech Hub)"
      ),
      achievements: [
        t(
          "Membangun QA Tech Hub sendiri untuk melatih pengujian dan memahami sisi developer.",
          "Built the QA Tech Hub myself to practice testing and understand the developer side."
        ),
      ],
    },
  ];

  const coreCompetencies = [
    t("Manual Testing", "Manual Testing"),
    t("Bug Reporting", "Bug Reporting"),
    t("Regression Testing", "Regression Testing"),
    t("Desain Test Case", "Test Case Design"),
    t("Boundary Value Analysis", "Boundary Value Analysis"),
    t("Exploratory Testing", "Exploratory Testing"),
  ];

  const technicalStack = [
    "Google Sheets / Excel",
    "Postman (API basics)",
    "Chrome DevTools",
    "Jira / Trello",
    "Playwright (Java, basics)",
    "SQL (basic queries)",
  ];

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
                "CV interaktif: ringkasan profesional, timeline pengalaman & pendidikan, dan keahlian utama — plus unduhan PDF resmi.",
                "An interactive CV: professional summary, experience & education timeline, and core skills — plus the official PDF download."
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up animate-delay-300">
              <Button asChild size="lg">
                <a
                  href="/cv/Suryani-Lestari-QA-CV.pdf"
                  download="Suryani-Lestari-QA-CV.pdf"
                  type="application/pdf"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t("Unduh PDF", "Download PDF")}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  {t("Hubungi Saya", "Contact Me")}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a
                  href="https://www.linkedin.com/in/suryani-lestari"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Summary */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <Sparkles aria-hidden="true" className="h-6 w-6 text-primary" />
              {t("Ringkasan Profesional", "Professional Summary")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                "QA tahap awal karir dengan fokus pada Manual Quality Assurance. Saya senang membedah alur aplikasi, menyusun test case yang rapi, dan menulis laporan bug yang mudah direproduksi developer. Fokus karier saya: memperdalam functional & regression testing pada aplikasi web, sambil bertahap masuk ke API testing dan automation.",
                "An early-career QA focused on Manual Quality Assurance. I enjoy breaking down application flows, writing structured test cases, and producing bug reports developers can reproduce easily. My career focus: deepening functional and regression testing for web apps, while gradually moving into API testing and automation."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
            {t("Pengalaman & Pendidikan", "Experience & Education")}
          </h2>
          <ol className="relative max-w-3xl border-l border-border pl-6 space-y-10 sm:pl-8">
            {timeline.map((item) => {
              const Icon = item.kind === "work" ? Briefcase : GraduationCap;
              return (
                <li key={item.role} className="relative min-w-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.15rem] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card sm:-left-[2.65rem]"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary">
                    {item.period}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.entity}</p>
                  <ul className="mt-3 space-y-2">
                    {item.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 text-sm text-foreground/80 leading-relaxed"
                      >
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 border-y border-border/50 bg-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
            {t("Keahlian Utama", "Core Skills")}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText aria-hidden="true" className="h-5 w-5 text-primary" />
                {t("Core Competencies", "Core Competencies")}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {coreCompetencies.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Wrench aria-hidden="true" className="h-5 w-5 text-primary" />
                {t("Technical Stack", "Technical Stack")}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {technicalStack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
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
              
              <Button asChild size="lg" className="group mb-4">
                <a
                  href="/cv/Suryani-Lestari-QA-CV.pdf"
                  download="Suryani-Lestari-QA-CV.pdf"
                  type="application/pdf"
                  aria-label={t("Unduh Resume PDF Suryani Lestari", "Download Suryani Lestari Resume PDF")}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t("Unduh Resume (PDF)", "Download Resume (PDF)")}
                </a>
              </Button>

              <p className="text-xs text-muted-foreground">
                {t(
                  "File: Suryani-Lestari-QA-CV.pdf",
                  "File: Suryani-Lestari-QA-CV.pdf"
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
