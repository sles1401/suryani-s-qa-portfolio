import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bug,
  CheckCircle2,
  ClipboardList,
  Code2,
  Database,
  FileSearch,
  PencilRuler,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/use-page-meta";
import { QA_HUB_REPO_URL, TEST_CASE_DOCS_REPO_URL } from "@/lib/links";

const HowITest = () => {
  const { t } = useLanguage();

  usePageMeta({
    title: "Cara Saya Menguji | Suryani Lestari",
    description:
      "The five-step testing process, bug report anatomy, QA glossary, and technical notes for developers.",
    path: "/how-i-test",
  });

  const steps = [
    {
      icon: ClipboardList,
      title: t("Pahami requirement & risiko", "Understand requirements & risks"),
      body: t(
        "Baca requirement dan petakan alur yang paling mahal jika salah: perhitungan, data master, dan transisi status. Prioritas datang dari risiko, bukan dari jumlah halaman.",
        "Read the requirements and map the flows that are most expensive to get wrong: calculations, master data, and status transitions. Priority comes from risk, not page count."
      ),
    },
    {
      icon: PencilRuler,
      title: t("Rancang test case", "Design test cases"),
      body: t(
        "Gabungkan happy path, skenario negatif, boundary value analysis (BVA), dan equivalence partitioning (EP). Setiap kasus punya langkah, data uji, dan expected result yang bisa diulang.",
        "Combine happy paths, negative scenarios, boundary value analysis (BVA), and equivalence partitioning (EP). Every case has repeatable steps, test data, and an expected result."
      ),
    },
    {
      icon: PlayCircle,
      title: t("Eksekusi berlapis", "Execute in layers"),
      body: t(
        "Uji UI secara manual, cek API dengan Postman, lalu verifikasi data langsung lewat SQL. Tampilan yang benar belum tentu datanya benar.",
        "Test the UI manually, check APIs with Postman, then verify the data directly through SQL. A correct screen does not guarantee correct data."
      ),
    },
    {
      icon: Bug,
      title: t("Laporkan bug yang bisa direproduksi", "Report reproducible bugs"),
      body: t(
        "Tulis judul spesifik, environment, langkah reproduksi, expected vs actual, severity, priority, dan bukti. Developer harus bisa mereproduksi tanpa bertanya balik.",
        "Write a specific title, environment, reproduction steps, expected vs actual, severity, priority, and evidence. A developer should reproduce it without asking follow-up questions."
      ),
    },
    {
      icon: RefreshCw,
      title: t("Regresi & verifikasi perbaikan", "Regress & verify fixes"),
      body: t(
        "Jalankan checklist regresi per rilis, lalu tutup bug hanya setelah perbaikan diverifikasi. Fokus pada alur yang berubah dan modul yang terdampak.",
        "Run a per-release regression checklist, then close a bug only after the fix is verified. Focus on changed flows and affected modules."
      ),
    },
  ];

  const bugReportFields = [
    {
      label: t("Judul spesifik", "Specific title"),
      detail: t(
        "“Total ritase salah saat muatan ganda” — bukan “laporan error”.",
        "“Trip total wrong with double loads” — not “report is broken”."
      ),
    },
    {
      label: t("Environment", "Environment"),
      detail: t(
        "Browser, versi, halaman, dan data uji yang dipakai.",
        "Browser, version, page, and test data used."
      ),
    },
    {
      label: t("Langkah reproduksi", "Reproduction steps"),
      detail: t(
        "Urutan aksi bernomor yang bisa diikuti orang lain dari awal.",
        "A numbered action sequence anyone can follow from the start."
      ),
    },
    {
      label: t("Expected vs actual", "Expected vs actual"),
      detail: t(
        "Hasil yang seharusnya, hasil yang terjadi, dan selisihnya.",
        "The expected result, the actual result, and the gap."
      ),
    },
    {
      label: t("Severity & priority", "Severity & priority"),
      detail: t(
        "Severity = dampak teknis; priority = urutan perbaikan bisnis.",
        "Severity = technical impact; priority = business fix order."
      ),
    },
    {
      label: t("Bukti", "Evidence"),
      detail: t(
        "Screenshot, rekaman, log, atau response API yang relevan.",
        "Relevant screenshots, recordings, logs, or API responses."
      ),
    },
    {
      label: t("Status & verifikasi", "Status & verification"),
      detail: t(
        "Open, fixed, retest, dan siapa yang memverifikasi.",
        "Open, fixed, retest, and who verified it."
      ),
    },
  ];

  const glossary = [
    {
      term: "BVA",
      full: t("Boundary Value Analysis", "Boundary Value Analysis"),
      body: t(
        "Menguji nilai tepat di batas input — misalnya 0, 1, dan nilai maksimum — karena bug sering muncul di sana.",
        "Testing values right at the input boundaries — for example 0, 1, and the maximum — because bugs often live there."
      ),
    },
    {
      term: "EP",
      full: t("Equivalence Partitioning", "Equivalence Partitioning"),
      body: t(
        "Membagi input menjadi kelompok yang diperlakukan sama, lalu menguji satu wakil dari tiap kelompok.",
        "Splitting inputs into groups treated the same way, then testing one representative from each group."
      ),
    },
    {
      term: t("Regression", "Regression"),
      full: t("Regression testing", "Regression testing"),
      body: t(
        "Memastikan perubahan baru tidak merusak fitur yang sebelumnya sudah berjalan.",
        "Ensuring new changes do not break features that previously worked."
      ),
    },
    {
      term: "Smoke test",
      full: t("Smoke testing", "Smoke testing"),
      body: t(
        "Pemeriksaan cepat alur utama sebelum pengujian yang lebih dalam.",
        "A quick check of the main flow before deeper testing."
      ),
    },
    {
      term: t("Severity vs priority", "Severity vs priority"),
      full: t("Severity & priority", "Severity & priority"),
      body: t(
        "Severity mengukur dampak teknis; priority mengukur urgensi perbaikan dari sisi bisnis.",
        "Severity measures technical impact; priority measures business urgency."
      ),
    },
    {
      term: "NDA",
      full: t("Non-Disclosure Agreement", "Non-Disclosure Agreement"),
      body: t(
        "Perjanjian kerahasiaan. Repo dan data klien tidak boleh dibagikan; bukti yang tampil sudah disamarkan.",
        "A confidentiality agreement. Client repos and data cannot be shared; displayed evidence is sanitized."
      ),
    },
    {
      term: t("Centralized", "Centralized"),
      full: t("Centralized data", "Centralized data"),
      body: t(
        "Satu sumber data dipakai lintas modul, sehingga konsistensinya harus divalidasi dari hulu ke hilir.",
        "One data source is used across modules, so consistency must be validated end to end."
      ),
    },
  ];

  const developerNotes = [
    {
      icon: Code2,
      title: t("Otomasi Playwright", "Playwright automation"),
      body: t(
        "Skrip regression dengan Playwright di Java dan JavaScript untuk alur yang stabil dan sering diulang.",
        "Regression scripts with Playwright in Java and JavaScript for stable, frequently repeated flows."
      ),
    },
    {
      icon: Terminal,
      title: t("API testing", "API testing"),
      body: t(
        "Postman untuk status code, schema, auth, dan error handling — bukan hanya response 200.",
        "Postman for status codes, schema, auth, and error handling — not just a 200 response."
      ),
    },
    {
      icon: Database,
      title: t("Validasi SQL", "SQL validation"),
      body: t(
        "Cek isi tabel dan konsistensi relasi setelah aksi UI, supaya bug data tidak lolos di balik tampilan yang benar.",
        "Check table contents and relation consistency after UI actions so data bugs do not hide behind a correct screen."
      ),
    },
    {
      icon: FileSearch,
      title: t("Network & console", "Network & console"),
      body: t(
        "Chrome DevTools untuk request payload, response, dan error console saat mereproduksi bug.",
        "Chrome DevTools for request payloads, responses, and console errors while reproducing bugs."
      ),
    },
    {
      icon: Bug,
      title: t("Bug report siap eksekusi", "Actionable bug reports"),
      body: t(
        "Langkah, environment, expected/actual, dan bukti yang cukup untuk langsung diperbaiki.",
        "Steps, environment, expected/actual, and enough evidence to start fixing immediately."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("Testability feedback", "Testability feedback"),
      body: t(
        "Masukan soal validasi, state, dan error handling — dibantu latar belakang frontend React JS.",
        "Feedback on validation, state, and error handling — supported by a React JS frontend background."
      ),
    },
  ];

  return (
    <PageLayout>
      <section className="hero-gradient py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              {t("Cara Saya Menguji", "How I Test")}
            </span>
            <h1 className="font-display text-4xl font-semibold text-foreground md:text-5xl">
              {t("Proses, bukan sekadar daftar tools", "Process, not just a tool list")}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {t(
                "Lima langkah yang saya pakai dari requirement sampai verifikasi perbaikan, plus istilah QA yang sering muncul di portofolio ini.",
                "The five steps I use from requirement to fix verification, plus the QA terms that appear across this portfolio."
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href="#proses">{t("Lihat proses", "View process")}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#glossary">{t("Glossary", "Glossary")}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#for-developers">{t("Untuk developer", "For developers")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="proses" className="py-16 scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Alur Kerja", "Workflow")}
            title={t("Lima Langkah Pengujian", "Five Testing Steps")}
            description={t(
              "Urutannya sengaja dibuat sederhana agar mudah diaudit dan diulang oleh tim lain.",
              "The sequence is intentionally simple so other teams can audit and repeat it."
            )}
          />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-card"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                    <step.icon aria-hidden="true" className="h-5 w-5 text-primary" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-primary/15 bg-accent/50 p-6">
            <p className="text-sm leading-relaxed text-foreground/90">
              <span className="font-semibold text-foreground">
                {t("Peran otomasi: ", "Role of automation: ")}
              </span>
              {t(
                "Playwright (Java & JavaScript) dipakai untuk regression yang stabil dan berulang. Exploratory testing tetap manual karena tujuannya menemukan hal yang belum terpikirkan di test case.",
                "Playwright (Java & JavaScript) covers stable, repeated regression. Exploratory testing stays manual because its goal is finding what the test cases did not anticipate."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-muted/20 py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeader
                label={t("Laporan Bug", "Bug Reports")}
                title={t("Anatomi Bug Report yang Berguna", "Anatomy of a Useful Bug Report")}
                description={t(
                  "Tujuan laporan bug bukan menunjukkan bahwa saya menemukan masalah, tetapi membuat developer bisa memperbaikinya tanpa bertanya balik.",
                  "The point of a bug report is not to show I found a problem, but to let a developer fix it without asking follow-up questions."
                )}
              />
              <Button asChild variant="outline" className="mt-2">
                <Link to="/projects#bug-reports">
                  {t("Lihat contoh tersanitasi", "View sanitized samples")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {bugReportFields.map((field, index) => (
                <li
                  key={field.label}
                  className="rounded-xl border border-border/60 bg-card p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
                      {index + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">{field.label}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {field.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="glossary" className="py-16 scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Glossary", "Glossary")}
            title={t("Istilah QA dalam Bahasa Sehari-hari", "QA Terms in Plain Language")}
            description={t(
              "Supaya rekruter non-teknis dan developer sama-sama paham istilah yang dipakai di portofolio ini.",
              "So non-technical recruiters and developers read the same portfolio without a translation gap."
            )}
          />
          <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {glossary.map((item) => (
              <div
                key={item.term}
                className="rounded-xl border border-border/60 bg-card p-5"
              >
                <dt className="font-display text-base font-semibold text-foreground">
                  {item.term}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
                  {item.full}
                </dd>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="for-developers" className="border-y border-border/50 bg-muted/20 py-16 scroll-mt-28">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label={t("Untuk Developer", "For Developers")}
            title={t("Kedalaman Teknis, Bukan Hanya Tools", "Technical Depth, Not Just Tools")}
            description={t(
              "Yang saya kerjakan saat menguji dan bagaimana itu membantu tim developer.",
              "What I actually do while testing and how it helps development teams."
            )}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developerNotes.map((note) => (
              <div
                key={note.title}
                className="rounded-2xl border border-border/50 bg-card p-6 shadow-card"
              >
                <note.icon aria-hidden="true" className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {note.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={TEST_CASE_DOCS_REPO_URL} target="_blank" rel="noopener noreferrer">
                <BookOpen className="mr-2 h-4 w-4" />
                {t("Repo dokumentasi test", "Test documentation repo")}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={QA_HUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-4 w-4" />
                {t("Repo QA Tech Hub", "QA Tech Hub repo")}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/projects">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {t("Lihat proyek & bukti", "View projects & evidence")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/15 bg-accent/50 p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {t("Ingin melihat penerapannya di proyek nyata?", "Want to see it applied to real projects?")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t(
                "Case study menunjukkan konteks, risiko, dan batas antara klaim publik dan data internal.",
                "The case studies show context, risks, and the boundary between public claims and internal data."
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/projects">
                  {t("Buka Projects", "Open Projects")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">{t("Hubungi Saya", "Contact Me")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowITest;
