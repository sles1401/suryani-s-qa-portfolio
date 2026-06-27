import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Mail,
  Bug,
  AlertTriangle,
  Monitor,
  ListChecks,
  Download,
  Github,
  Linkedin,
  ClipboardCheck,
  Cpu,
  Wrench,
  Send,
  AlertCircle,
  CheckCircle,
  GraduationCap,
  Code2,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

const Portfolio = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const prev = document.title;
    document.title = "QA Portfolio - Suryani Lestari";
    return () => {
      document.title = prev;
    };
  }, []);

  const GITHUB_URL = "https://github.com/sles1401";
  const LINKEDIN_URL = "https://www.linkedin.com/in/suryani-lestari/";
  const EMAIL = "suryanilestari123@gmail.com";

  const skillGroups = [
    {
      icon: ClipboardCheck,
      title: t("Manual Testing", "Manual Testing"),
      items: [
        "Test Planning",
        "Test Case Design",
        "Bug Reporting",
        "Boundary Value Analysis",
        "Equivalence Partitioning",
        "UAT",
      ],
    },
    {
      icon: Cpu,
      title: t("Automation & API Testing", "Automation & API Testing"),
      items: [
        "API Testing (Postman)",
        "Web Automation",
        "SQL Validation",
        "Integration Testing",
      ],
    },
    {
      icon: Wrench,
      title: t("Tools & Platforms", "Tools & Platforms"),
      items: [
        "Git",
        "GitHub",
        "VSCode",
        "Google Cloud Platform (GCP)",
        "Firebase",
        "Redis",
        "MySQL / MariaDB",
      ],
    },
  ];

  const deliverables = [
    {
      icon: ClipboardCheck,
      title: t("Manual Testing Suite", "Manual Testing Suite"),
      description: t(
        "Merancang skenario pengujian menyeluruh: positive, negative, dan edge cases — lengkap dengan langkah reproduksi dan hasil yang diharapkan.",
        "Designing thorough test scenarios: positive, negative, and edge cases — complete with reproduction steps and expected results."
      ),
      cta: t("Lihat Test Cases di GitHub", "View Test Cases on GitHub"),
      href: GITHUB_URL,
      Icon: Github,
    },
    {
      icon: Code2,
      title: t("API & Automated Testing", "API & Automated Testing"),
      description: t(
        "Pengujian endpoint API, validasi response code, dan otomatisasi alur sistem menggunakan Postman.",
        "Endpoint API testing, response-code validation, and system flow automation using Postman."
      ),
      cta: t("Lihat Test Scripts", "View Test Scripts"),
      href: GITHUB_URL,
      Icon: Github,
    },
    {
      icon: GraduationCap,
      title: t(
        "Educational Authority & QA Case Studies",
        "Educational Authority & QA Case Studies"
      ),
      description: t(
        "Pengalaman mengajar 25+ siswa di bidang QA dan pemrograman — membedah kesalahan logika aplikasi dan memimpin pemecahan masalah teknis.",
        "Experience teaching 25+ students in QA and programming — dissecting application logic errors and leading technical problem-solving."
      ),
      cta: t("Lihat Kredensial di LinkedIn", "View Credentials on LinkedIn"),
      href: LINKEDIN_URL,
      Icon: Linkedin,
    },
  ];

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

  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const contactSchema = z.object({
    name: z.string().trim().min(1, t("Nama wajib diisi", "Name is required")).max(100),
    email: z.string().trim().email(t("Alamat email tidak valid", "Invalid email address")).max(255),
    subject: z.string().trim().min(1, t("Subjek wajib diisi", "Subject is required")).max(200),
    message: z.string().trim().min(1, t("Pesan wajib diisi", "Message is required")).max(2000),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fe[err.path[0] as string] = err.message;
      });
      setErrors(fe);
      return;
    }
    const subject = `Website Contact — ${formData.name} — ${formData.subject}`;
    const body =
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `${formData.message}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    toast({
      title: t("Membuka klien email…", "Opening your email client…"),
      description: t(
        "Pesan Anda telah disiapkan. Silakan kirim dari aplikasi email Anda.",
        "Your message is ready. Please send it from your email app."
      ),
    });
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              QA Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 opacity-0 animate-fade-in-up animate-delay-100 neon-glow">
              Suryani Lestari
            </h1>
            <p className="text-lg md:text-xl text-primary font-medium mb-5 opacity-0 animate-fade-in-up animate-delay-100">
              {t(
                "Quality Assurance Engineer & Tech Educator",
                "Quality Assurance Engineer & Tech Educator"
              )}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 opacity-0 animate-fade-in-up animate-delay-200">
              {t(
                "Berfokus pada pengujian manual yang ketat, otomatisasi API/E2E, dan memastikan kualitas perangkat lunak terbaik melalui dokumentasi yang terstruktur.",
                "Focused on rigorous manual testing, API/E2E automation, and ensuring the best software quality through structured documentation."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up animate-delay-300">
              <Button asChild size="lg" className="group">
                <Link to="/resume">
                  <Download className="mr-2 h-4 w-4" />
                  {t("Unduh CV", "Download CV")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#qa-deliverables">
                  {t("Lihat Dokumentasi QA", "View QA Documentation")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Set */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Keahlian", "Skill Set")}
            title={t("Technical & QA Skill Set", "Technical & QA Skill Set")}
            description={t(
              "Kompetensi yang saya gunakan sehari-hari untuk merancang, menjalankan, dan mendokumentasikan pengujian.",
              "The competencies I use day-to-day to design, execute, and document testing."
            )}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-border/60 shadow-card hover:border-primary/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {g.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-foreground/80 border border-border/50"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section id="qa-deliverables" className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Deliverables", "Core Deliverables")}
            title={t(
              "Testing Framework & Core Deliverables",
              "Testing Framework & Core Deliverables"
            )}
            description={t(
              "Tiga area utama pekerjaan QA yang dapat ditinjau lebih lanjut.",
              "Three core areas of QA work available for review."
            )}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              const CtaIcon = d.Icon;
              return (
                <article
                  key={i}
                  className="flex flex-col p-6 rounded-2xl bg-background border border-border/60 shadow-card hover:shadow-soft hover:border-primary/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {d.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {d.description}
                  </p>
                  <Button asChild variant="outline" className="w-full group">
                    <a href={d.href} target="_blank" rel="noopener noreferrer">
                      <CtaIcon className="mr-2 h-4 w-4" />
                      {d.cta}
                    </a>
                  </Button>
                </article>
              );
            })}
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

      {/* Available materials */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <SectionHeader
              label={t("Materi Tersedia", "Available Materials")}
              title={t("Yang Dapat Saya Bagikan", "What I Can Share")}
              description={t(
                "Jenis dokumentasi QA berikut tersedia atas permintaan untuk ditinjau.",
                "The following types of QA documentation are available upon request for review."
              )}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Let's Connect */}
      <section id="contact" className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              label={t("Kontak", "Contact")}
              title={t("Mari Terhubung", "Let's Connect")}
              description={t(
                "Punya pertanyaan atau peluang? Kirim pesan singkat dan saya akan membalas.",
                "Have a question or an opportunity? Send a short message and I'll get back to you."
              )}
            />
            <div className="bg-background border border-border/60 rounded-2xl p-8 shadow-card">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {t("Klien email dibuka", "Email client opened")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "Silakan kirim pesan dari aplikasi email Anda untuk menyelesaikan pengiriman.",
                      "Please send the message from your email app to complete delivery."
                    )}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSent(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    {t("Tulis pesan baru", "Write another message")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {t("Nama", "Name")} <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("Nama Anda", "Your name")}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {t("Subjek", "Subject")} <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("Tentang apa pesan ini?", "What is this about?")}
                      className={errors.subject ? "border-destructive" : ""}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("Pesan", "Message")} <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("Tulis pesan Anda…", "Write your message…")}
                      className={`resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="w-full group">
                    {t("Kirim Pesan", "Send Message")}
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {t(
                      "Mengirim akan membuka klien email Anda dengan pesan yang sudah disiapkan untuk ",
                      "Submitting opens your email client with a pre-filled message to "
                    )}
                    <a href={`mailto:${EMAIL}`} className="text-primary hover:underline">
                      {EMAIL}
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Portfolio;
