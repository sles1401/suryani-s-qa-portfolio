import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import evidenceDashboard from "@/assets/evidence-dashboard.jpg";
import evidenceBugReport from "@/assets/evidence-bugreport.jpg";
import evidenceRegression from "@/assets/evidence-regression.jpg";

const SanitizedEvidence = () => {
  const { t } = useLanguage();

  const items = [
    {
      image: evidenceDashboard,
      title: t("Dashboard Test Management", "Test Management Dashboard"),
      alt: t(
        "Mockup dashboard test management dengan nama klien disamarkan",
        "Test management dashboard mockup with client names redacted"
      ),
      caption: t(
        "Ringkasan test run: jumlah pass/fail/blocked per suite, dipakai untuk memantau progres eksekusi per rilis.",
        "Test run summary: pass/fail/blocked counts per suite, used to track execution progress per release."
      ),
    },
    {
      image: evidenceBugReport,
      title: t("Templat Laporan Bug", "Bug Report Template"),
      alt: t(
        "Mockup templat laporan bug dengan data sensitif ditutup",
        "Bug report template mockup with sensitive data blacked out"
      ),
      caption: t(
        "Format laporan bug: severity, langkah reproduksi, expected vs actual result, dan lampiran bukti.",
        "Bug report format: severity, reproduction steps, expected vs actual result, and evidence attachments."
      ),
    },
    {
      image: evidenceRegression,
      title: t("Checklist Regression Test", "Regression Test Checklist"),
      alt: t(
        "Mockup checklist regression test dengan kolom data uji disamarkan",
        "Regression test checklist mockup with test data columns redacted"
      ),
      caption: t(
        "Checklist regresi per modul dengan status eksekusi dan prioritas; kolom data uji dan akun disamarkan.",
        "Per-module regression checklist with execution status and priority; test data and account columns redacted."
      ),
    },
  ];

  return (
    <section
      id="sanitized-evidence"
      className="py-20 scroll-mt-28 border-y border-border/50 bg-muted/20"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
            <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
            {t("Sanitized / Bebas Data Sensitif", "Sanitized / No Sensitive Data")}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
            {t("Galeri Bukti Pengujian", "Testing Evidence Gallery")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "Untuk proyek internal tanpa repositori publik, berikut contoh format artefak QA yang saya pakai. Semua contoh sudah disamarkan dari nama klien, data uji, dan informasi sensitif lainnya.",
              "For internal projects without a public repository, these are the QA artifact formats I work with. Every sample is redacted of client names, test data, and other sensitive information."
            )}
          </p>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={1024}
                height={640}
                className="aspect-[16/10] w-full border-b border-border object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SanitizedEvidence;