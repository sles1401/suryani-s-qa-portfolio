import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const label = isDark
    ? t("Aktifkan mode terang", "Switch to light mode")
    : t("Aktifkan mode gelap", "Switch to dark mode");

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/60 text-foreground transition-colors hover:bg-accent"
    >
      <Sun
        className={`h-4 w-4 transition-all ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;