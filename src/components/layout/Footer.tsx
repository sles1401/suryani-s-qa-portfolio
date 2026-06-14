import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link 
              to="/" 
              className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              Suryani Lestari
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Software Quality Assurance
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:suryanilestari123@gmail.com"
              className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/suryani-lestari"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Suryani Lestari
          </p>
        </div>

        {/* QA status line */}
        <div className="mt-8 pt-6 border-t border-border/50 flex justify-center">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono text-muted-foreground tracking-wide">
            <span className="status-dot inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>
              {t(
                "Status: Sistem Diaudit. Tidak Ada Bug Kritis Ditemukan.",
                "Status: Systems Audited. No Critical Bugs Found."
              )}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
