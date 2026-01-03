import { Link } from "react-router-dom";
import { ArrowRight, FileText, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";

const portfolioItems = [
  {
    title: "Test Case Documentation",
    description: "Comprehensive test cases covering functional and regression testing scenarios."
  },
  {
    title: "Bug Reports",
    description: "Sample bug reports with clear reproduction steps and severity classifications."
  },
  {
    title: "Test Plans",
    description: "Structured test plans outlining testing scope, approach, and schedule."
  },
  {
    title: "Test Summary Reports",
    description: "Project completion reports summarizing testing activities and findings."
  }
];

const Portfolio = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              Portfolio
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              QA Portfolio
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              A collection of QA documentation and testing materials demonstrating my 
              approach to quality assurance.
            </p>
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
                    Sample Materials Available Upon Request
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Due to confidentiality agreements, detailed project materials are not publicly displayed. 
                    However, I'm happy to share relevant samples during our discussion. 
                    Please feel free to reach out.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Available */}
            <SectionHeader
              label="Available Materials"
              title="What I Can Share"
              description="The following types of QA documentation are available upon request for review."
            />

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {portfolioItems.map((item, index) => (
                <div 
                  key={item.title}
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
                Request Portfolio Materials
              </h3>
              <p className="text-muted-foreground mb-6">
                Interested in seeing specific examples of my QA work? Get in touch and I'll be happy to share relevant samples.
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Contact Me
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
