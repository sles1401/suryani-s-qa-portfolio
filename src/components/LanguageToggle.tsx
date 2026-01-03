import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center gap-1 bg-accent/50 rounded-full p-0.5">
      <button
        onClick={() => handleToggle("id")}
        className={cn(
          "px-3 py-1 text-xs font-medium rounded-full transition-all",
          language === "id"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => handleToggle("en")}
        className={cn(
          "px-3 py-1 text-xs font-medium rounded-full transition-all",
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
