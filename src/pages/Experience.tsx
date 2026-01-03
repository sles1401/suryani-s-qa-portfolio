import { Link } from "react-router-dom";
import { ArrowRight, Bug, ClipboardCheck, FileText, RefreshCw, Search, TestTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";

const responsibilities = [
  {
    icon: ClipboardCheck,
    title: "Test Case Design",
    description: "Creating comprehensive test cases that cover functional requirements and user scenarios."
  },
  {
    icon: TestTube,
    title: "Manual Testing",
    description: "Executing thorough manual tests to verify software functionality and user experience."
  },
  {
    icon: RefreshCw,
    title: "Regression Testing",
    description: "Ensuring new changes don't break existing functionality through systematic regression tests."
  },
  {
    icon: Bug,
    title: "Bug Reporting",
    description: "Documenting issues with clear steps to reproduce, expected vs actual results, and severity."
  },
  {
    icon: Search,
    title: "Exploratory Testing",
    description: "Discovering edge cases and unexpected behaviors through creative exploration of the software."
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Maintaining clear test documentation and quality reports for stakeholders."
  }
];

const strengths = [
  "Systematic approach to test planning and execution",
  "Strong attention to detail in identifying issues",
  "Clear and concise bug reporting",
  "Effective communication with development teams",
  "Understanding of user perspective and UX considerations",
  "Organized documentation and reporting"
];

const tools = [
  "JIRA",
  "TestRail",
  "Google Sheets",
  "Postman",
  "Browser DevTools",
  "Trello",
  "Slack",
  "Confluence"
];

const Experience = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              QA Experience
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              Quality Assurance Experience
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              An overview of my QA responsibilities, testing expertise, and the tools I use 
              to ensure software quality.
            </p>
          </div>
        </div>
      </section>

      {/* Role Snapshot */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-fade-in-up">
            <SectionHeader
              label="Role Snapshot"
              title="Software Quality Assurance"
              description="Specializing in manual testing with a focus on ensuring product reliability and user satisfaction."
              centered
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.map((item, index) => (
              <div 
                key={item.title}
                className="p-6 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="opacity-0 animate-fade-in-up">
              <SectionHeader
                label="Strengths"
                title="What I Bring to QA"
              />
              <ul className="space-y-4">
                {strengths.map((strength, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="opacity-0 animate-fade-in-up animate-delay-200">
              <SectionHeader
                label="Tools"
                title="Tools & Technologies"
              />
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span 
                    key={tool}
                    className="px-4 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-lg border border-border/50"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Familiar with various testing and project management tools commonly used in software development teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Interested in Seeing Sample Work?
          </h2>
          <Button asChild size="lg" className="group">
            <Link to="/portfolio">
              View Portfolio
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Experience;
