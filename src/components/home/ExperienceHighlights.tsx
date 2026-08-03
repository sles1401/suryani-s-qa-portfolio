import { useLanguage } from "@/contexts/LanguageContext";

const ExperienceHighlights = () => {
  const { t } = useLanguage();

  const timeline = [
    {
      role: t(
        "Manual Quality Assurance Engineer — HMS Project",
        "Manual Quality Assurance Engineer — HMS Project"
      ),
      period: t("2024 — Sekarang", "2024 — Present"),
      points: [
        t(
          "Konfirmasi alur data antar modul master data dan hauling.",
          "Confirmed data flow across master data and hauling modules."
        ),
        t(
          "Eksekusi regression test setiap rilis perbaikan.",
          "Executed regression tests on every fix release."
        ),
        t(
          "Menyusun laporan bug dengan langkah reproduksi dan bukti.",
          "Wrote bug reports with reproduction steps and evidence."
        ),
      ],
    },
    {
      role: t("Pengajar / Mentor Teknologi", "Technology Teacher / Mentor"),
      period: t("2023 — 2024", "2023 — 2024"),
      points: [
        t(
          "Membimbing 25+ siswa pada dasar web dan pola pikir pengujian.",
          "Guided 25+ students on web basics and a testing mindset."
        ),
        t(
          "Menyusun materi latihan praktis dan penilaian.",
          "Built practical exercise material and assessments."
        ),
      ],
    },
    {
      role: t("Belajar Mandiri QA & Otomasi", "Self-Directed QA & Automation"),
      period: t("Berkelanjutan", "Ongoing"),
      points: [
        t(
          "Latihan Playwright dengan Java memakai Page Object Model.",
          "Practicing Playwright with Java using the Page Object Model."
        ),
        t(
          "Membangun QA Hub pribadi untuk merapikan alur pengujian.",
          "Built a personal QA Hub to streamline testing workflows."
        ),
      ],
    },
  ];

  return (
    <section id="experience-highlights" className="py-20">
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceHighlights;