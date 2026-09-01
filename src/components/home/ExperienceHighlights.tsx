import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceHighlights = () => {
  const { t } = useLanguage();

  const timeline = [
    {
      role: t("Software Quality Assurance (SQA)", "Software Quality Assurance (SQA)"),
      entity: "PT. SCBD",
      period: t("Januari 2026 — Sekarang", "January 2026 — Present"),
      points: [
        t(
          "Merancang, mendokumentasikan, dan mengeksekusi Test Plan, Test Case, dan skenario pengujian untuk aplikasi web.",
          "Designing, documenting, and executing test plans, test cases, and test scenarios for web applications."
        ),
        t(
          "Membangun dan merawat skrip pengujian otomatis dengan Playwright + Java.",
          "Building and maintaining automated test scripts using Playwright with Java."
        ),
      ],
      achievements: [
        t(
          "Meningkatkan efisiensi regression testing dan mempercepat siklus rilis produk.",
          "Improved regression testing efficiency and accelerated product release cycles."
        ),
      ],
    },
    {
      role: t("Facilitator", "Facilitator"),
      entity: "Kaizen Collaborative Impact",
      period: t("Agustus 2025 — Oktober 2025", "August 2025 — October 2025"),
      points: [
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
      role: t("Mentor Coding Camp", "Mentor Coding Camp"),
      entity: "Dicoding Indonesia x DBS",
      period: t("Februari 2025 — Juli 2025", "February 2025 — July 2025"),
      points: [
        t(
          "Mereview dan mengevaluasi progres belajar mentee pada HTML, CSS, JavaScript, dan React.",
          "Reviewed and evaluated mentees' progress on HTML, CSS, JavaScript, and React."
        ),
        t(
          "Memberi umpan balik rutin serta membantu penyelesaian dan penilaian proyek akhir.",
          "Provided regular feedback and helped mentees complete and evaluate their final projects."
        ),
      ],
    },
    {
      role: t("Frontend Developer", "Frontend Developer"),
      entity: "Waizly Technology",
      period: t("Agustus 2024 — Januari 2025", "August 2024 — January 2025"),
      points: [
        t(
          "Melanjutkan pengembangan dan perawatan fitur aplikasi Warehouse Management System (WMS) dengan React JS.",
          "Continued development and maintenance of Warehouse Management System (WMS) features using React JS."
        ),
        t(
          "Memperbaiki bug dan menyesuaikan komponen UI.",
          "Fixed bugs and adjusted UI components."
        ),
      ],
      achievements: [
        t(
          "Pengalaman sisi developer ini mempertajam pengujian UI/UX pada peran QA.",
          "This developer-side experience sharpened UI/UX testing in the QA role."
        ),
      ],
    },
  ];


  return (
    <section id="experience-highlights" className="py-20 scroll-mt-28">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
          {t("Pengalaman & Sorotan", "Experience & Highlights")}
        </h2>

        <ol className="relative max-w-3xl border-l border-border pl-6 space-y-10">
          {timeline.map((item) => (
            <li key={item.role} className="relative min-w-0">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background"
              />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-muted-foreground">{item.entity}</p>
              <p className="mt-1 text-xs font-mono text-primary">{item.period}</p>

              <ul className="mt-3 space-y-2">
                {item.points.map((p) => (
                  <li
                    key={p}
                    className="text-sm text-muted-foreground leading-relaxed before:mr-2 before:text-primary before:content-['—']"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              {item.achievements && (
                <div className="mt-4 rounded-md border border-primary/30 bg-accent/40 p-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary">
                    {t("Pencapaian Utama", "Key Achievements")}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {item.achievements.map((a) => (
                      <li
                        key={a}
                        className="text-sm text-foreground/90 leading-relaxed before:mr-2 before:text-primary before:content-['✓']"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceHighlights;