import { Link } from "react-router-dom";
import { ArrowRight, FileText, Lock, Mail, Bug, AlertTriangle, Monitor, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t } = useLanguage();

  const portfolioItems = [
    {
      title: t("Dokumentasi Test Case", "Test Case Documentation"),
      description: t(
        "Test case yang mencakup skenario functional dan regression testing.",
        "Test cases covering functional and regression testing scenarios."
      )
    },
    {
      title: t("Bug Reports", "Bug Reports"),
      description: t(
        "Contoh laporan bug dengan langkah reproduksi dan klasifikasi tingkat keparahan.",
        "Sample bug reports with reproduction steps and severity classifications."
      )
    },
    {
      title: t("Test Plans", "Test Plans"),
      description: t(
        "Rencana pengujian yang menguraikan ruang lingkup, pendekatan, dan jadwal.",
        "Test plans outlining testing scope, approach, and schedule."
      )
    },
    {
      title: t("Laporan Ringkasan Pengujian", "Test Summary Reports"),
      description: t(
        "Laporan penyelesaian proyek yang merangkum aktivitas dan temuan pengujian.",
        "Project completion reports summarizing testing activities and findings."
      )
    }
  ];

  const matrixRows = [
    {
      feature: t("Login", "Login"),
      steps: t("Masukkan email + password valid, klik Masuk", "Enter valid email + password, click Sign In"),
      expected: t("Diarahkan ke dashboard", "Redirected to dashboard"),
      boundary: t("Email kosong / 256+ karakter", "Empty email / 256+ characters"),
    },
    {
      feature: t("Form Pendaftaran", "Signup Form"),
      steps: t("Isi semua kolom wajib, kirim formulir", "Fill all required fields, submit form"),
      expected: t("Akun dibuat, email verifikasi terkirim", "Account created, verification email sent"),
      boundary: t("Password 7 vs 8 vs 128 karakter", "Password 7 vs 8 vs 128 chars"),
    },
    {
      feature: t("Checkout", "Checkout"),
      steps: t("Tambah item, lanjut ke pembayaran", "Add item, proceed to payment"),
      expected: t("Pesanan tercatat, ringkasan tampil", "Order recorded, summary shown"),
      boundary: t("Qty 0, Qty 9999, stok habis", "Qty 0, Qty 9999, out of stock"),
    },
    {
      feature: t("Pencarian", "Search"),
      steps: t("Ketik kata kunci, tekan Enter", "Type keyword, press Enter"),
      expected: t("Hasil relevan ditampilkan", "Relevant results displayed"),
      boundary: t("String kosong, karakter spesial, SQL-like", "Empty string, special chars, SQL-like"),
    },
  ];

  const bugReport = {
    title: t("Tombol 'Simpan' tidak respon di halaman Profil", "'Save' button unresponsive on Profile page"),
    id: "BUG-0427",
    severity: t("Tinggi", "High"),
    env: "Chrome 121 · macOS 14.3 · Staging",
    steps: [
      t("Buka /profile dalam keadaan login", "Open /profile while signed in"),
      t("Ubah field 'Nama Tampilan'", "Edit the 'Display Name' field"),
      t("Klik tombol 'Simpan'", "Click the 'Save' button"),
    ],
    expected: t(
      "Profil tersimpan, muncul toast konfirmasi.",
      "Profile is saved and a confirmation toast appears."
    ),
    actual: t(
      "Tombol tidak merespons; tidak ada permintaan jaringan; konsol menampilkan TypeError.",
      "Button does not respond; no network request fires; console shows a TypeError."
    ),
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              {t("Portofolio", "Portfolio")}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              {t("Berkas Kasus & Artefak QA", "Case Files & QA Artifacts")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Cuplikan lembar kerja pengujian — bagaimana saya menyusun skenario dan membedah laporan bug.",
                "A peek at testing worksheets — how I structure scenarios and dissect bug reports."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Test Case Matrix */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              label={t("Matriks Test Case", "Test Case Matrix")}
              title={t("Matriks Test Case Interaktif", "Interactive Test Case Matrix")}
              description={t(
                "Contoh cara saya menyusun skenario manual lengkap dengan analisis nilai batas.",
                "A sample of how I structure manual scenarios with boundary value analysis."
              )}
            />
            <div className="rounded-xl border border-border/60 bg-background overflow-hidden shadow-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="font-display text-foreground">
                      <span className="inline-flex items-center gap-2"><ListChecks className="h-4 w-4 text-primary" />{t("Fitur", "Feature")}</span>
                    </TableHead>
                    <TableHead className="font-display text-foreground">{t("Langkah Pengujian", "Test Steps")}</TableHead>
                    <TableHead className="font-display text-foreground">{t("Hasil yang Diharapkan", "Expected Result")}</TableHead>
                    <TableHead className="font-display text-foreground">{t("Analisis Nilai Batas", "Boundary Value Analysis")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matrixRows.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-foreground">{row.feature}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.steps}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{row.expected}</TableCell>
                      <TableCell className="text-muted-foreground text-sm font-mono">{row.boundary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Report */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              label={t("Laporan Investigasi", "Investigation Report")}
              title={t("Anatomi Laporan Bug yang Baik", "Anatomy of a Good Bug Report")}
              description={t(
                "Sebuah contoh ringkas tentang bagaimana saya mendokumentasikan temuan.",
                "A compact example of how I document a finding."
              )}
            />
            <article className="rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden">
              <header className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border/60 bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Bug className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{bugReport.id}</p>
                    <h3 className="font-display text-base font-semibold text-foreground">{bugReport.title}</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 text-destructive px-3 py-1 text-xs font-semibold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {t("Severity", "Severity")}: {bugReport.severity}
                </span>
              </header>
              <div className="grid sm:grid-cols-2 gap-6 p-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                    {t("Langkah Reproduksi", "Steps to Reproduce")}
                  </p>
                  <ol className="space-y-1.5 text-sm text-foreground list-decimal list-inside">
                    {bugReport.steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                      {t("Hasil yang Diharapkan", "Expected")}
                    </p>
                    <p className="text-sm text-foreground">{bugReport.expected}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1 font-semibold">
                      {t("Hasil Aktual", "Actual")}
                    </p>
                    <p className="text-sm text-foreground">{bugReport.actual}</p>
                  </div>
                </div>
              </div>
              <footer className="flex items-center gap-2 px-6 py-3 border-t border-border/60 bg-muted/20 text-xs font-mono text-muted-foreground">
                <Monitor className="h-3.5 w-3.5" />
                <span>{t("Environment", "Environment")}: {bugReport.env}</span>
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Notice Card */}
            <div className="bg-accent/50 border border-primary/20 rounded-2xl p-8 mb-12 opacity-0 animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    {t(
                      "Contoh Materi Tersedia Atas Permintaan",
                      "Sample Materials Available Upon Request"
                    )}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t(
                      "Contoh test case, bug report, dan dokumentasi QA tersedia atas permintaan. Materi portofolio ini merupakan pekerjaan tahap awal karir dan pembelajaran.",
                      "Sample test cases, bug reports, and QA documentation are available upon request. This portfolio represents early-career and learning-stage work."
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Silakan hubungi saya untuk mendiskusikan contoh yang relevan.",
                      "Please feel free to reach out to discuss relevant samples."
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* What's Available */}
            <SectionHeader
              label={t("Materi Tersedia", "Available Materials")}
              title={t("Yang Dapat Saya Bagikan", "What I Can Share")}
              description={t(
                "Jenis dokumentasi QA berikut tersedia atas permintaan untuk ditinjau.",
                "The following types of QA documentation are available upon request for review."
              )}
            />

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {portfolioItems.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center bg-card border border-border/50 rounded-2xl p-8 opacity-0 animate-fade-in-up animate-delay-400">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {t("Minta Materi Portofolio", "Request Portfolio Materials")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t(
                  "Tertarik melihat contoh spesifik dari pekerjaan QA saya? Hubungi saya dan saya akan dengan senang hati berbagi sampel yang relevan.",
                  "Interested in seeing specific examples of my QA work? Get in touch and I'll be happy to share relevant samples."
                )}
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  {t("Hubungi Saya", "Contact Me")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Portfolio;
