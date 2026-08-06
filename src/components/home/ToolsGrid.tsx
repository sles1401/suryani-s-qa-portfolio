import {
  BarChart3,
  ClipboardList,
  Table2,
  KanbanSquare,
  TestTube2,
  Coffee,
  Github,
  Rocket,
  Bug,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ToolsGrid = () => {
  const { t } = useLanguage();

  const groups = [
    {
      title: t("Visualisasi Data", "Data Visualization"),
      usage: t(
        "Merangkum hasil eksekusi tes menjadi dashboard yang mudah dibaca tim.",
        "Turning test execution results into dashboards the team can read quickly."
      ),
      items: [{ name: "Looker Studio", icon: BarChart3 }],
    },
    {
      title: t("Pelacakan & Dokumentasi", "Tracking & Documentation"),
      usage: t(
        "Test management & tracking: menyimpan test case, status eksekusi, dan laporan bug.",
        "Test management & tracking: storing test cases, execution status, and bug reports."
      ),
      items: [
        { name: "QA Hub", icon: ClipboardList },
        { name: "Trello", icon: KanbanSquare },
        { name: "Google Sheets", icon: Table2 },
      ],
    },
    {
      title: t("Otomasi & Version Control", "Automation & Version Control"),
      usage: t(
        "Automation: latihan Playwright dengan Java (Page Object Model), kode dikelola di GitHub dan di-deploy via Vercel.",
        "Automation: practicing Playwright with Java (Page Object Model), code managed on GitHub and deployed via Vercel."
      ),
      items: [
        { name: "Playwright", icon: TestTube2 },
        { name: "Java", icon: Coffee },
        { name: "GitHub", icon: Github },
        { name: "Vercel", icon: Rocket },
      ],
    },
    {
      title: t("Alat Pengujian", "Testing Tools"),
      usage: t(
        "Inspeksi elemen, cek console error, dan verifikasi request saat pengujian manual.",
        "Inspecting elements, checking console errors, and verifying requests during manual testing."
      ),
      items: [{ name: "Chrome DevTools", icon: Bug }],
    },
  ];

  return (
    <section id="tools-technologies" className="py-20 bg-muted/20 border-y border-border/50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
          {t("Tools & Teknologi", "Tools & Technologies")}
        </h2>

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                {group.title}
              </h3>
              <p className="mb-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                {group.usage}
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.items.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="group flex items-center gap-3 min-w-0 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/60 hover:bg-accent/60"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:scale-110"
                    />
                    <span className="truncate text-sm font-medium text-foreground">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;