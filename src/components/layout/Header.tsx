import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t("Beranda", "Home"), href: "/" },
    { name: t("Tentang", "About"), href: "/about" },
    { name: t("Proyek", "Projects"), href: "/projects" },
    { name: t("Keahlian", "Skills"), href: "/skills" },
    { name: t("Portofolio", "Portfolio"), href: "/portfolio" },
    { name: "Bug Hunter", href: "/bug-hunter" },
    { name: "API Console", href: "/api-console" },
    { name: t("Resume", "Resume"), href: "/resume" },
    { name: t("Kontak", "Contact"), href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Suryani<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme + Language Toggle + Mobile menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LiveClock />
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.linkedin.com/in/suryani-lestari"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                {t("Profil LinkedIn", "LinkedIn profile")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/sles1401"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                {t("Repositori GitHub", "GitHub repositories")}
              </TooltipContent>
            </Tooltip>
            <ThemeToggle />
            <LanguageToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/contact">
                <Mail className="mr-2 h-4 w-4" />
                {t("Hubungi Saya", "Hire Me")}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-3">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Mail className="mr-2 h-4 w-4" />
                  {t("Hubungi Saya", "Hire Me")}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
