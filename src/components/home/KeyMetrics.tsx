import { useLanguage } from "@/contexts/LanguageContext";

const KeyMetrics = () => {
  const { t } = useLanguage();

  const metrics = [
    { value: "25+", label: t("Siswa Dibimbing", "Students Taught") },
    { value: "100+", label: t("Test Case Dieksekusi", "Test Cases Executed") },
    { value: "50+", label: t("Bug Didokumentasikan", "Bugs Documented & Reported") },
    { value: "100%", label: t("Akurasi Konfirmasi Flow", "Flow Confirmation Accuracy") },
  ];

  return (
    <section id="key-metrics" className="py-16 border-y border-border/50 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="sr-only">{t("Metrik Utama", "Key Metrics")}</h2>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m) => (
            <div key={m.label} className="text-center min-w-0">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-4xl md:text-5xl font-bold text-primary tabular-nums">
                  {m.value}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  {m.label}
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