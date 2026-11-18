import {
  ClipboardList,
  Table2,
  KanbanSquare,
  TestTube2,
  Coffee,
  Github,
  Rocket,
  Bug,
  Database,
  Send,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/ScrollReveal";

const ToolsGrid = () => {
  const { t } = useLanguage();

  const groups = [
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
        { name: "GitHub", icon: Github },
      ],
    },
    {
      title: t("Otomasi, API & Debugging", "Automation, API & Debugging"),
      usage: t(
        "Otomasi Playwright (Java & JS), uji API dengan Postman, inspeksi DOM/network di DevTools, dan verifikasi data lewat SQL.",
        "Playwright automation (Java & JS), API testing with Postman, DOM/network inspection in DevTools, and data verification via SQL."
      ),
      items: [
        { name: "Playwright", icon: TestTube2 },
        { name: "Java", icon: Coffee },
        { name: "Postman", icon: Send },
        { name: "SQL", icon: Database },
        { name: "Chrome DevTools", icon: Bug },
        { name: "Vercel", icon: Rocket },
      ],
    },
  ];

  return (
    <section id="tools-technologies" className="py-20 scroll-mt-28 bg-muted/20 border-y border-border/50">
      <div className="container mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-10">
            {t("Tools & Teknologi", "Tools & Technologies")}
          </h2>
        </ScrollReveal>

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                {group.title}
              </h3>
              <p className="mb-4 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                {group.usage}
              </p>
              <ScrollRevealGroup as="ul" stagger={0.06} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.items.map(({ name, icon: Icon }) => (
                  <ScrollRevealItem
                    as="li"
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
                  </ScrollRevealItem>
                ))}
              </ScrollRevealGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;