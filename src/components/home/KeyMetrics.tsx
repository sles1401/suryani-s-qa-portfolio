import { Users, ListChecks, Bug, GitCompareArrows } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const KeyMetrics = () => {
  const { t } = useLanguage();

  const metrics = [
    {
      value: "25+",
      icon: Users,
      label: t("Siswa Dibimbing", "Students Taught"),
      context: t(
        "Dasar web & pola pikir pengujian, kelas mentoring 2023–2024",
        "Web basics & testing mindset, 2023–2024 mentoring classes"
      ),
    },
    {
      value: "100+",
      icon: ListChecks,
      label: t("Test Case Dieksekusi", "Test Cases Executed"),
      context: t(
        "Test case manual fungsional & negatif pada proyek HMS",
        "Functional & negative manual test cases on the HMS project"
      ),
    },
    {
      value: "50+",
      icon: Bug,
      label: t("Bug Didokumentasikan", "Bugs Documented & Reported"),
      context: t(
        "Lengkap dengan langkah reproduksi, bukti, dan severity",
        "Complete with reproduction steps, evidence, and severity"
      ),
    },
    {
      value: "100%",
      icon: GitCompareArrows,
      label: t("Akurasi Konfirmasi Flow", "Flow Confirmation Accuracy"),
      context: t(
        "Validasi alur data master data ↔ modul hauling",
        "Data-flow validation between master data and hauling modules"
      ),
    },
  ];

  return (
    <section id="key-metrics" className="py-16 scroll-mt-28 border-y border-border/50 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="sr-only">{t("Metrik Utama", "Key Metrics")}</h2>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map(({ icon: Icon, ...m }) => (
            <div key={m.label} className="text-center min-w-0">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <Icon
                  aria-hidden="true"
                  className="mx-auto mb-3 h-6 w-6 text-primary"
                />
                <span className="block font-display text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  {m.value}
                </span>
                <span className="mt-2 block text-base font-semibold text-foreground">
                  {m.label}
                </span>
                <span className="mt-1.5 block text-sm text-foreground/75 leading-relaxed">
                  {m.context}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default KeyMetrics;