import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Download,
  FileText,
  GraduationCap,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { CV_URL } from "@/lib/links";

const Resume = () => {
  const { t } = useLanguage();

  const timeline = [
    {
      kind: "work" as const,
      period: t("Januari 2026 — Sekarang", "January 2026 — Present"),
      role: t("Software Quality Assurance (SQA)", "Software Quality Assurance (SQA)"),
      entity: "PT. SCBD",
      achievements: [
        t(
          "Merancang, mendokumentasikan, dan mengeksekusi Test Plan, Test Case, dan skenario pengujian untuk aplikasi web.",
          "Designing, documenting, and executing test plans, test cases, and test scenarios for web applications."
        ),
        t(
          "Membangun dan merawat skrip otomasi Playwright dengan Java untuk meningkatkan efisiensi regression dan mempercepat siklus rilis.",
          "Building and maintaining Playwright automation scripts with Java to improve regression efficiency and accelerate release cycles."
        ),
      ],
    },
    {
      kind: "work" as const,
      period: t("Agustus 2025 — Oktober 2025", "August 2025 — October 2025"),
      role: t("Facilitator", "Facilitator"),
      entity: "Kaizen Collaborative Impact",
      achievements: [
        t(
          "Memfasilitasi pembelajaran dasar pemrograman dan AI melalui program Hour of Code.",
          "Facilitated learning of basic programming and AI through the Hour of Code program."
        ),
        t(
          "Membimbing peserta dengan pendekatan interaktif dan inklusif sesuai standar global.",
          "Guided participants with an interactive, inclusive approach aligned with global standards."
        ),
      ],
    },
    {
      kind: "work" as const,
      period: t("Februari 2025 — Juli 2025", "February 2025 — July 2025"),
      role: t("Mentor Coding Camp", "Mentor Coding Camp"),
      entity: "Dicoding Indonesia x DBS",
      achievements: [
        t(
          "Mereview dan mengevaluasi progres belajar mentee pada HTML, CSS, JavaScript, dan React.",
          "Reviewed and evaluated mentees' progress on HTML, CSS, JavaScript, and React."
        ),
        t(
          "Memberi umpan balik rutin dan membantu penyelesaian serta penilaian proyek akhir.",
          "Provided regular feedback and helped mentees finish and evaluate their final projects."
        ),
      ],
    },
    {
      kind: "work" as const,
      period: t("Agustus 2024 — Januari 2025", "August 2024 — January 2025"),
      role: t("Frontend Developer", "Frontend Developer"),
      entity: "Waizly Technology",
      achievements: [
        t(
          "Melanjutkan pengembangan dan perawatan fitur Warehouse Management System (WMS) dengan React JS.",
          "Continued development and maintenance of Warehouse Management System (WMS) features using React JS."
        ),
        t(
          "Memperbaiki bug dan menyesuaikan komponen UI.",
          "Fixed bugs and adjusted UI components."
        ),
      ],
    },
    {
      kind: "education" as const,
      period: "2020 — 2024",
      role: t("S1 Rekayasa Perangkat Lunak", "B.Sc. Software Engineering"),
      entity: t(
        "Universitas Pendidikan Indonesia — IPK 3.64",
        "Universitas Pendidikan Indonesia — GPA 3.64"
      ),
      achievements: [
        t(
          "Fondasi rekayasa perangkat lunak: konsep pengujian, basis data, dan pengembangan web.",
          "Software engineering foundation: testing concepts, databases, and web development."
        ),
      ],
    },
  ];

  const coreCompetencies = [
    t("Konsep Dasar Testing", "Fundamental Testing Concepts"),
    t("Desain Test Case & Skenario", "Test Case & Scenario Design"),
    t("Bug Reporting & Replikasi", "Bug Reporting & Reproduction"),
    t("Regression Testing", "Regression Testing"),
    t("Pengujian UI/UX", "UI/UX Testing"),
    t("Dokumentasi Test Plan", "Test Plan Documentation"),
  ];

  const technicalStack = [
    "Playwright (Java)",
    "Java",
    "JavaScript",
    "Git / GitHub",
    "MySQL",
    "HTML / CSS",
    "React JS",
  ];

  return (
    <PageLayout>
      {/* Hero — single source of the CV download */}
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
                "Ringkasan profesional, timeline pengalaman & pendidikan, dan keahlian utama — plus satu unduhan PDF resmi.",
                "Professional summary, experience & education timeline, and core skills — plus a single official PDF download."
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up animate-delay-300">
              <Button asChild size="lg">
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(
                    "Unduh CV PDF Suryani Lestari",
                    "Download Suryani Lestari CV PDF"
                  )}
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t("Unduh PDF", "Download PDF")}
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
                "QA dengan fondasi Rekayasa Perangkat Lunak serta pengalaman di frontend development (React JS) dan pengajaran teknologi. Teliti dan berfokus pada pengujian, evaluasi, serta peningkatan kualitas produk. Saat ini merancang dan mengeksekusi test case manual sekaligus mengembangkan otomasi Playwright dengan Java.",
                "A QA with a Software Engineering foundation plus experience in frontend development (React JS) and technology instruction. Detail-oriented and focused on testing, evaluation, and improving product quality. Currently designing and executing manual test cases while building Playwright automation with Java."
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
              <ul className="flex flexs-wrap flex-wrap gap-2">
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

      {/* Simple navigational CTA */}
      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="flex flex-wrap items-center justify-center gap-3 text-muted-foreground">
            {t("Tertarik berdiskusi?", "Interested in talking?")}
            <Button asChild variant="link" className="text-primary">
              <Link to="/contact">
                {t("Hubungi Saya", "Contact Me")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Resume;
