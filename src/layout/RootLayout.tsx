import { ReactNode, useState, useEffect } from "react";
import CategorySidebar from "@/layout/CategorySidebar";
import Header from "@/layout/Header";
import MobileSidebar from "@/layout/MobileSidebar";
import Breadcrumbs from "@/layout/Breadcrumbs";
import { useTheme, type ThemeMode } from "@/hooks/useTheme";
import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";


type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  const { setThemeMode } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>("auto");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };

  useEffect(() => {
    // If there is no valid saved theme in localStorage, it means this is the first visit
    const savedTheme = localStorage.getItem("theme");
    console.log("RootLayout: savedTheme in localStorage is:", savedTheme);
    if (savedTheme !== "light" && savedTheme !== "dark" && savedTheme !== "auto") {
      console.log("RootLayout: Triggering theme selection popup.");
      setShowPopup(true);
    }
  }, []);

  const handleConfirm = () => {
    console.log("RootLayout: Confirming theme selection:", selectedTheme);
    setThemeMode(selectedTheme);
    setShowPopup(false);
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <CategorySidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={cn(
          "min-w-0 flex-1 transition-all duration-300",
          isSidebarCollapsed ? "xl:pl-16" : "xl:pl-72"
        )}
      >
        <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="w-full flex items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
            <Header />
            <MobileSidebar />
          </div>
        </div>
        <div className="w-full px-4 py-6 sm:px-6 md:px-8">
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>

      {/* First-time Theme Selection Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-[2px] p-4 transition-opacity duration-300">
          <div className="relative w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 flex flex-col items-center text-center">

            {/* Title & Description */}
            <h2 className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("selectThemeTitle")}
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed max-w-xs font-medium">
              {t("selectThemeDesc")}
            </p>

            {/* Mode Select Buttons Grid */}
            <div className="grid grid-cols-3 gap-2.5 w-full mt-6">
              {[
                { mode: "light" as ThemeMode, labelKey: "themeLight", imgUrl: "/theme_light_icon.png" },
                { mode: "dark" as ThemeMode, labelKey: "themeDark", imgUrl: "/theme_dark_icon.png" },
                { mode: "auto" as ThemeMode, labelKey: "themeSystem", imgUrl: "/theme_system_icon.png" }
              ].map(({ mode, labelKey, imgUrl }) => {
                const isSelected = selectedTheme === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      setSelectedTheme(mode);
                      setThemeMode(mode); // Apply theme immediately on click
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-2.5 rounded-xl border transition-all text-[11px] font-bold shadow-sm cursor-pointer ${
                      isSelected
                        ? "border-zinc-950 bg-zinc-50 text-zinc-950 dark:border-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
                        : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-850 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-450 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
                    }`}
                  >
                    <img src={imgUrl} alt={t(labelKey as any)} className="h-11 w-11 object-cover shrink-0 rounded-xl border border-zinc-100 dark:border-zinc-800" />
                    <span className="tracking-wide">{t(labelKey as any)}</span>
                  </button>
                );
              })}
            </div>

            {/* Section: Language */}
            <div className="h-px bg-zinc-100 dark:bg-zinc-900 w-full mt-5" />
            <div className="w-full text-left mt-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 select-none">
                {t("language")}
              </span>
            </div>

            {/* Language Selection Grid */}
            <div className="grid grid-cols-3 gap-2.5 w-full mt-2">
              {[
                { lang: "vi" as Locale, label: "Tiếng Việt", flagUrl: "https://flagcdn.com/vn.svg" },
                { lang: "en" as Locale, label: "English", flagUrl: "https://flagcdn.com/us.svg" },
                { lang: "ja" as Locale, label: "日本語", flagUrl: "https://flagcdn.com/jp.svg" }
              ].map(({ lang, label, flagUrl }) => {
                const isSelected = locale === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLocale(lang); // Change language immediately on click
                    }}
                    className={`flex flex-col items-center justify-center gap-2 p-2.5 rounded-xl border transition-all text-[11px] font-bold shadow-sm cursor-pointer ${
                      isSelected
                        ? "border-zinc-950 bg-zinc-50 text-zinc-950 dark:border-zinc-50 dark:bg-zinc-900 dark:text-zinc-50"
                        : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-850 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-450 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
                    }`}
                  >
                    <img
                      src={flagUrl}
                      alt={label}
                      className="w-7 h-4 object-cover rounded-sm border border-zinc-200/50 dark:border-zinc-800/80 shrink-0"
                    />
                    <span className="tracking-wide">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full h-10 mt-6 rounded-lg bg-zinc-950 text-white hover:bg-zinc-900 font-bold dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors text-xs shadow-sm cursor-pointer flex items-center justify-center"
            >
              {t("confirm")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
