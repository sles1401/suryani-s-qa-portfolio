import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/links";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="mb-10 flex flex-col gap-6 border-b border-border/50 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <span aria-hidden="true" className="status-dot h-2 w-2 rounded-full bg-emerald-500" />
              {t("Terbuka untuk peluang kerja", "Open for work")}
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 min-w-0">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all text-foreground hover:text-primary transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  {t("Bandung, Indonesia (WIB)", "Bandung, Indonesia (WIB)")}
                </span>
              </li>
            </ul>
          </div>
          <Link to="/contact" className="text-sm font-medium text-primary hover:underline">
            {t("Kirim pesan", "Send a message")}
          </Link>
        </div>



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
               href={`mailto:${EMAIL}`}
              className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
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
