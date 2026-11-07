import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bug, ChevronDown, Download, Menu, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import LiveClock from "@/components/LiveClock";
import { useLanguage } from "@/contexts/LanguageContext";
import { CV_URL } from "@/lib/links";
import { trackEvent } from "@/lib/analytics";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t("Beranda", "Home"), href: "/" },
    { name: t("Proyek", "Projects"), href: "/projects" },
    { name: t("Proses", "Process"), href: "/how-i-test" },
    { name: t("Resume", "Resume"), href: "/resume" },
    { name: t("Kontak", "Contact"), href: "/contact" },
  ];

  const qaTools = [
    { name: "Bug Hunter", href: "/bug-hunter", icon: Bug },
    { name: "API Console", href: "/api-console", icon: Terminal },
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
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-1 px-3 text-sm font-medium ${
                    qaTools.some((item) => isActive(item.href))
                      ? "bg-accent text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {t("Alat QA", "QA Tools")}
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {qaTools.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      to={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="gap-2"
                    >
                      <item.icon aria-hidden="true" className="h-4 w-4 text-primary" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Preferences + Mobile menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <a
                href={CV_URL}
                download="Suryani-Lestari-QA-CV.pdf"
                onClick={() => trackEvent("cv_download", { location: "header" })}
              >
                <Download className="mr-1.5 h-4 w-4" />
                CV
              </a>
            </Button>
            <LiveClock />
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t("Buka menu navigasi", "Toggle menu")}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="my-2 border-t border-border/50 pt-3">
                <a
                  href={CV_URL}
                  download="Suryani-Lestari-QA-CV.pdf"
                  onClick={() => {
                    trackEvent("cv_download", { location: "mobile_menu" });
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
                >
                  <Download aria-hidden="true" className="h-4 w-4 text-primary" />
                  {t("Unduh CV (PDF)", "Download CV (PDF)")}
                </a>
                <p className="px-4 pb-2 pt-3 text-xs font-semibold uppercase text-muted-foreground">
                  {t("Alat QA", "QA Tools")}
                </p>
                {qaTools.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon aria-hidden="true" className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
