import { useEffect, useState } from "react";
import { Bug, CheckCircle2, RotateCcw, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Severity = "Critical" | "Major" | "Minor";

type Defect = {
  id: string;
  severity: Severity;
  title: { id: string; en: string };
  description: { id: string; en: string };
  expected: { id: string; en: string };
};

const DEFECTS: Record<string, Defect> = {
  price: {
    id: "BUG-01",
    severity: "Critical",
    title: { id: "Total harga salah hitung", en: "Order total miscalculated" },
    description: {
      id: "Subtotal 2 × Rp150.000 seharusnya Rp300.000, tetapi total yang ditampilkan Rp150.000 — diskon dihitung dua kali.",
      en: "Subtotal for 2 × Rp150,000 should be Rp300,000, but the displayed total is Rp150,000 — the discount is applied twice.",
    },
    expected: {
      id: "Total = (harga × qty) − diskon, dihitung satu kali dan konsisten dengan invoice.",
      en: "Total = (price × qty) − discount, applied once and consistent with the invoice.",
    },
  },
  email: {
    id: "BUG-02",
    severity: "Major",
    title: { id: "Validasi email tidak aktif", en: "Email validation missing" },
    description: {
      id: "Field email menerima nilai tanpa tanda '@' dan form tetap bisa dikirim.",
      en: "The email field accepts values without an '@' and the form still submits.",
    },
    expected: {
      id: "Email invalid ditolak dengan pesan error inline sebelum submit.",
      en: "Invalid emails are rejected with an inline error before submit.",
    },
  },
  contrast: {
    id: "BUG-03",
    severity: "Major",
    title: { id: "Kontras teks di bawah WCAG AA", en: "Text contrast below WCAG AA" },
    description: {
      id: "Teks bantuan abu-abu terang di atas latar putih memiliki rasio kontras ±2.1:1.",
      en: "Light grey helper text on white has a contrast ratio of about 2.1:1.",
    },
    expected: {
      id: "Rasio kontras minimal 4.5:1 untuk teks normal (WCAG 2.1 AA).",
      en: "Minimum 4.5:1 contrast ratio for body text (WCAG 2.1 AA).",
    },
  },
  cta: {
    id: "BUG-04",
    severity: "Critical",
    title: { id: "Tombol bayar tidak merespons", en: "Pay button does not respond" },
    description: {
      id: "Klik pada tombol utama tidak memicu aksi apa pun; tidak ada loading state maupun error.",
      en: "Clicking the primary button triggers no action; no loading state and no error.",
    },
    expected: {
      id: "Tombol memicu proses pembayaran dengan loading state dan hasil sukses/gagal yang jelas.",
      en: "The button starts checkout with a loading state and a clear success/failure result.",
    },
  },
  typo: {
    id: "BUG-05",
    severity: "Minor",
    title: { id: "Typo pada label", en: "Typo in label" },
    description: {
      id: "Label menampilkan 'Aadress' alih-alih 'Address'.",
      en: "The label reads 'Aadress' instead of 'Address'.",
    },
    expected: {
      id: "Label ditulis benar sesuai glosarium produk.",
      en: "Label spelled correctly per the product glossary.",
    },
  },
};

const severityStyles: Record<Severity, string> = {
  Critical: "bg-destructive/15 text-destructive-text border-destructive/40",
  Major: "bg-primary/15 text-primary border-primary/40",
  Minor: "bg-muted text-muted-foreground border-border",
};

const BugHunter = () => {
  const { t } = useLanguage();
  const [found, setFound] = useState<string[]>([]);
  const [active, setActive] = useState<Defect | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Bug Hunter — Interactive QA Challenge | Suryani Lestari";
    return () => {
      document.title = prev;
    };
  }, []);

  const total = Object.keys(DEFECTS).length;

  const report = (key: string) => {
    const defect = DEFECTS[key];
    setActive(defect);
    setFound((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const hotspotClass = (key: string) =>
    `relative cursor-pointer rounded-md outline-none ring-offset-2 ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring ${
      found.includes(key) ? "ring-2 ring-primary/60" : "hover:ring-2 hover:ring-primary/40"
    }`;

  return (
    <PageLayout>
      <section className="py-16 lg:py-24 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6">
              <Bug className="h-3.5 w-3.5" />
              {t("Modul Interaktif", "Interactive Module")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-5">
              Bug Hunter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(
                `Antarmuka tiruan di bawah ini sengaja memuat ${total} cacat. Klik area yang menurut Anda rusak untuk melihat anotasi QA: severity, deskripsi, dan expected result.`,
                `The mock interface below intentionally contains ${total} defects. Click any area you think is broken to reveal the QA annotation: severity, description, and expected result.`
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
            {/* Mock UI under test */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {t("Aplikasi Uji (tiruan)", "Application Under Test (mock)")}
                </h2>
                <Button variant="outline" size="sm" onClick={() => setFound([])}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {t("Ulangi", "Reset")}
                </Button>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <div className="mb-6 flex items-center gap-2 border-b border-border/60 pb-4">
                  <span className="h-3 w-3 rounded-full bg-destructive/60" />
                  <span className="h-3 w-3 rounded-full bg-primary/60" />
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                  <span className="ml-3 text-xs text-muted-foreground">
                    checkout.demo-shop.test
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Price defect */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Order summary hotspot"
                    data-testid="hotspot-price"
                    className={`${hotspotClass("price")} border border-border/50 p-4`}
                    onClick={() => report("price")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && report("price")}
                  >
                    <p className="text-sm font-medium text-foreground mb-2">
                      {t("Ringkasan Pesanan", "Order Summary")}
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>QA Toolkit × 2</span>
                      <span>Rp150.000</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm font-semibold text-foreground">
                      <span>Total</span>
                      <span>Rp150.000</span>
                    </div>
                  </div>

                  {/* Email defect */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Email field hotspot"
                    data-testid="hotspot-email"
                    className={`${hotspotClass("email")} border border-border/50 p-4`}
                    onClick={() => report("email")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && report("email")}
                  >
                    <p className="text-sm font-medium text-foreground mb-2">Email</p>
                    <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                      suryani.example.com
                    </div>
                    {/* Contrast defect */}
                    <span
                      role="button"
                      tabIndex={0}
                      data-testid="hotspot-contrast"
                      aria-label="Helper text hotspot"
                      className={`${hotspotClass("contrast")} mt-2 inline-block text-xs text-muted-foreground/40`}
                      onClick={(e) => {
                        e.stopPropagation();
                        report("contrast");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          report("contrast");
                        }
                      }}
                    >
                      {t("Kami tidak akan mengirim spam.", "We will never send you spam.")}
                    </span>
                  </div>

                  {/* Typo defect */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Address label hotspot"
                    data-testid="hotspot-typo"
                    className={`${hotspotClass("typo")} border border-border/50 p-4`}
                    onClick={() => report("typo")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && report("typo")}
                  >
                    <p className="text-sm font-medium text-foreground mb-2">Aadress</p>
                    <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                      Jl. Merdeka 12, Jakarta
                    </div>
                  </div>

                  {/* Dead CTA */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label="Pay now button hotspot"
                    data-testid="hotspot-cta"
                    className={`${hotspotClass("cta")} p-1`}
                    onClick={() => report("cta")}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && report("cta")}
                  >
                    <div className="w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">
                      {t("Bayar Sekarang", "Pay Now")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Findings panel */}
            <aside>
              <SectionHeader
                label={t("Laporan", "Findings")}
                title={t("Temuan Anda", "Your Findings")}
                description={t(
                  "Setiap cacat yang ditemukan dicatat seperti entri bug report.",
                  "Every defect you find is logged like a bug report entry."
                )}
              />
              <p
                data-testid="bughunter-progress"
                className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <Target className="h-4 w-4 text-primary" />
                {found.length}/{total} {t("cacat ditemukan", "defects found")}
              </p>

              <ul className="space-y-3">
                {Object.entries(DEFECTS).map(([key, defect]) => {
                  const discovered = found.includes(key);
                  return (
                    <li
                      key={key}
                      className={`rounded-xl border p-4 transition-colors ${
                        discovered ? "border-primary/30 bg-card" : "border-border/50 bg-muted/30"
                      }`}
                    >
                      {discovered ? (
                        <>
                          <div className="mb-1 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-xs font-mono text-muted-foreground">
                              {defect.id}
                            </span>
                            <Badge variant="outline" className={severityStyles[defect.severity]}>
                              {defect.severity}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {t(defect.title.id, defect.title.en)}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {t("Belum ditemukan", "Not found yet")}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{active.id}</span>
                  <Badge variant="outline" className={severityStyles[active.severity]}>
                    {active.severity}
                  </Badge>
                </div>
                <DialogTitle className="font-display">
                  {t(active.title.id, active.title.en)}
                </DialogTitle>
                <DialogDescription>
                  {t(active.description.id, active.description.en)}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {t("Expected Result", "Expected Result")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(active.expected.id, active.expected.en)}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default BugHunter;
