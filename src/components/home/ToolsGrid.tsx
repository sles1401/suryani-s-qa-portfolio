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
      items: [{ name: "Looker Studio", icon: BarChart3 }],
    },
    {
      title: t("Pelacakan & Dokumentasi", "Tracking & Documentation"),
      items: [
        { name: "QA Hub", icon: ClipboardList },
        { name: "Trello", icon: KanbanSquare },
        { name: "Google Sheets", icon: Table2 },
      ],
    },
    {
      title: t("Otomasi & Version Control", "Automation & Version Control"),
      items: [
        { name: "Playwright", icon: TestTube2 },
        { name: "Java", icon: Coffee },
        { name: "GitHub", icon: Github },
        { name: "Vercel", icon: Rocket },
      ],
    },
    {
      title: t("Alat Pengujian", "Testing Tools"),
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
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                {group.title}
              </h3>
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