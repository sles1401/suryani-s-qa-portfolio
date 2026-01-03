import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import profilePhoto from "@/assets/profile-photo.jpg";

const Home = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[calc(100vh-4rem)] flex items-center">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 opacity-0 animate-fade-in-up">
              <span className="inline-block px-4 py-1.5 text-sm font-medium text-primary bg-accent rounded-full mb-6">
                Quality Assurance Professional
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
                Suryani Lestari
              </h1>
              <p className="text-xl md:text-2xl text-secondary font-medium mb-4">
                Software Quality Assurance
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Helping teams deliver reliable software through thorough manual testing, 
                clear documentation, and attention to detail.
              </p>
              
              {/* Quick highlights */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Manual Testing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Regression Testing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Bug Reporting</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link to="/experience">
                    View Experience
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="order-1 lg:order-2 flex justify-center opacity-0 animate-fade-in animate-delay-200">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-soft border-4 border-card">
                  <img
                    src={profilePhoto}
                    alt="Suryani Lestari - Software Quality Assurance Professional"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief intro section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in-up animate-delay-300">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Ensuring Quality, One Test at a Time
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              With a focus on manual testing and quality assurance, I help development teams 
              identify issues early, document findings clearly, and deliver products that 
              meet user expectations. My approach is thorough, systematic, and always 
              centered on improving the end-user experience.
            </p>
            <Button asChild variant="link" className="text-primary">
              <Link to="/about">
                Learn more about me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
