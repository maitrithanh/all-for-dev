import { Link, useLocation } from "react-router-dom";
import { categoryList } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveText } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategorySidebarProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

const GROUPS = [
  { key: "languages", labelKey: "languages" },
  { key: "frameworks", labelKey: "frameworks" },
  { key: "tools", labelKey: "tools" },
  { key: "systems", labelKey: "systems" }
] as const;

const CategorySidebar = ({ isCollapsed, onToggle }: CategorySidebarProps) => {
  const location = useLocation();
  const { locale, t } = useI18n();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 hidden h-screen flex-col border-r border-zinc-200/80 bg-white/95 backdrop-blur-sm py-4 dark:border-zinc-800/80 dark:bg-zinc-950/95 xl:flex transition-all duration-300 z-30",
        isCollapsed ? "w-16 px-1.5" : "w-72 px-2"
      )}
    >
      {/* Brand Header */}
      {!isCollapsed ? (
        <div className="mb-6 px-3 animate-in fade-in duration-200">
          <Link to="/" className="flex items-center gap-2.5 mb-1 hover:opacity-80 transition-opacity">
            <img src="/favicon.svg" alt="Logo" className="h-7 w-7 object-contain" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              All For Developer
            </p>
          </Link>
          <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("commandCategories")}
          </h2>
        </div>
      ) : (
        <div className="mb-6 flex justify-center py-2.5 select-none animate-in fade-in duration-200">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/favicon.svg" alt="Logo" className="h-7 w-7 object-contain" />
          </Link>
        </div>
      )}

      {/* Categories List */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        {GROUPS.map((groupObj) => {
          const groupCategories = categoryList.filter(
            (c) => c.group === groupObj.key
          );
          if (groupCategories.length === 0) return null;

          return (
            <div key={groupObj.key}>
              {!isCollapsed ? (
                <div className="relative px-3 py-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 select-none animate-in fade-in duration-200">
                    {t(groupObj.labelKey)}
                  </span>
                  <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-zinc-200/80 via-zinc-200/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40" />
                </div>
              ) : (
                groupObj.key !== "languages" && (
                  <div className="mx-3 my-2 border-t border-zinc-200/60 dark:border-zinc-800/60" />
                )
              )}

              <div className={cn("flex flex-col gap-0.5", isCollapsed ? "mt-2" : "mt-2")}>
                {groupCategories.map((category) => {
                  const isActive = location.pathname.includes(`/category/${category.slug}`);
                  return (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      title={isCollapsed ? resolveText(category.name, locale) : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg transition-all duration-200",
                        isCollapsed ? "justify-center px-0 py-1.5 mx-0.5" : "px-3 py-2",
                        isActive
                          ? "bg-zinc-100/80 text-zinc-900 font-semibold dark:bg-zinc-800/60 dark:text-zinc-50"
                          : "text-zinc-500 hover:bg-zinc-100/50 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-200"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/3 h-1/3 w-0.5 rounded-r-full bg-zinc-900 dark:bg-zinc-100 transition-all" />
                      )}
                      <div
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
                          isActive
                            ? "border-zinc-300 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-800"
                            : "border-transparent bg-transparent group-hover:border-zinc-200 group-hover:bg-white dark:group-hover:border-zinc-700 dark:group-hover:bg-zinc-900"
                        )}
                      >
                        <img
                          src={category.image}
                          alt={resolveText(category.name, locale)}
                          className="h-4 w-4 object-contain transition-transform duration-200 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      {!isCollapsed && (
                        <span className="text-sm font-medium tracking-wide truncate animate-in fade-in duration-200">
                          {resolveText(category.name, locale)}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Collapse/Expand Toggle Button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "absolute right-[-11px] top-5 z-40 flex h-5 w-5 items-center justify-center rounded-full",
          "border border-zinc-200 bg-white text-zinc-400 shadow-sm",
          "hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700",
          "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500",
          "dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
          "cursor-pointer transition-all duration-200",
          "hover:scale-110 active:scale-95"
        )}
        title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </aside>
  );
};

export default CategorySidebar;
