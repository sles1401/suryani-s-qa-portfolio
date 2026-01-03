import { Link } from "react-router-dom";
import { ArrowRight, Heart, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/section-header";
import profilePhoto from "@/assets/profile-photo.jpg";

const values = [
  {
    icon: Target,
    title: "Attention to Detail",
    description: "I believe thorough testing comes from carefully examining every aspect of a product, leaving no stone unturned."
  },
  {
    icon: Users,
    title: "Clear Communication",
    description: "Effective bug reports and documentation help teams understand issues quickly and fix them efficiently."
  },
  {
    icon: Heart,
    title: "User-Centered Mindset",
    description: "Quality assurance is ultimately about ensuring users have a positive, reliable experience with the product."
  }
];

const About = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-28 hero-gradient">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary bg-accent rounded-full mb-6 opacity-0 animate-fade-in">
              About Me
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 opacity-0 animate-fade-in-up animate-delay-100">
              A QA Professional Focused on Quality
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-0 animate-fade-in-up animate-delay-200">
              I'm Suryani Lestari, a Software Quality Assurance professional specializing in manual testing. 
              My work centers on helping teams build reliable software through systematic testing and clear documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="opacity-0 animate-fade-in-up">
              <SectionHeader
                label="Background"
                title="Professional Journey"
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  My journey in quality assurance began with a genuine interest in understanding how 
                  software works and how to make it better for users. Over time, I've developed a 
                  systematic approach to testing that helps teams catch issues early in the development cycle.
                </p>
                <p>
                  I focus on manual testing because I believe there's no substitute for thinking like a user 
                  and exploring software the way real people would use it. This approach often uncovers 
                  issues that automated tests might miss.
                </p>
                <p>
                  My goal is simple: to help teams deliver software that works reliably and meets the 
                  needs of the people who use it.
                </p>
              </div>
            </div>
            <div className="flex justify-center opacity-0 animate-fade-in animate-delay-200">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-soft">
                  <img
                    src={profilePhoto}
                    alt="Suryani Lestari"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -z-10 top-4 left-4 w-full h-full bg-primary/20 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader
            label="Values"
            title="What Guides My Work"
            centered
          />
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`p-8 rounded-xl bg-card border border-border/50 shadow-card hover:shadow-soft transition-shadow opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Want to Know More About My Experience?
          </h2>
          <Button asChild size="lg" className="group">
            <Link to="/experience">
              View QA Experience
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
