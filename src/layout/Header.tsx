import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/types";

const locales: Locale[] = ["vi", "en", "ja"];

const flagMap: Record<Locale, { label: string; flagUrl: string }> = {
  vi: { label: "Tiếng Việt", flagUrl: "https://flagcdn.com/vn.svg" },
  en: { label: "English", flagUrl: "https://flagcdn.com/us.svg" },
  ja: { label: "日本語", flagUrl: "https://flagcdn.com/jp.svg" }
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
      <div className="min-w-0">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300 transition-colors"
        >
          {t("siteTitle")}
        </Link>
        <p className="text-xs font-medium mt-0.5 text-zinc-500 dark:text-zinc-400">
          {t("siteSubtitle")}
        </p>
      </div>
      <div className="flex items-center gap-3 self-start sm:self-auto">
        {/* Custom shadcn-like language dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 dark:focus:ring-zinc-300 transition-all select-none shadow-sm"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <img
              src={flagMap[locale].flagUrl}
              alt={flagMap[locale].label}
              className="w-4.5 h-3 object-cover rounded-sm border border-zinc-200/50 dark:border-zinc-800/80 shrink-0"
            />
            <span className="tracking-wider">{flagMap[locale].label}</span>
            <ChevronDown className={`h-3.5 w-3.5 text-zinc-450 dark:text-zinc-500 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-zinc-200/80 bg-white p-1 shadow-md z-50 dark:border-zinc-800 dark:bg-zinc-950 animate-in fade-in slide-in-from-top-2 duration-150 ease-out">
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 select-none">
                {t("language")}
              </div>
              <div className="h-px bg-zinc-100 dark:bg-zinc-900 my-1" />
              <div className="space-y-0.5">
                {locales.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setLocale(item);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full rounded-md px-2.5 py-2 text-left text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                      item === locale
                        ? "font-bold text-zinc-950 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-900/60"
                        : "font-medium text-zinc-600 dark:text-zinc-450 hover:text-zinc-950 dark:hover:text-zinc-100"
                    }`}
                  >
                    <img
                      src={flagMap[item].flagUrl}
                      alt={flagMap[item].label}
                      className="w-4.5 h-3 object-cover rounded-sm border border-zinc-200/50 dark:border-zinc-800/80 shrink-0"
                    />
                    <span>{flagMap[item].label}</span>
                    {item === locale && (
                      <Check className="h-3.5 w-3.5 text-zinc-950 dark:text-zinc-50 shrink-0 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9 rounded-lg border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-sm"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-zinc-400 hover:text-amber-400 transition-colors" />
          ) : (
            <Moon className="h-4 w-4 text-zinc-600 hover:text-indigo-600 transition-colors" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
