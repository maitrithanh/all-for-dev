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
        "fixed left-0 top-0 hidden h-screen flex-col border-r border-zinc-200 bg-white py-4 dark:border-zinc-800 dark:bg-zinc-950 xl:flex transition-all duration-300 z-30",
        isCollapsed ? "w-16 px-1.5" : "w-72 px-2"
      )}
    >
      {/* Brand Header */}
      {!isCollapsed ? (
        <div className="mb-6 px-2 animate-in fade-in duration-200">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
            All For Developer
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("commandCategories")}
          </h2>
        </div>
      ) : (
        <div className="mb-6 flex justify-center py-2 select-none animate-in fade-in duration-200">
          <span className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            AFD
          </span>
        </div>
      )}

      {/* Categories List */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1">
        {GROUPS.map((groupObj) => {
          const groupCategories = categoryList.filter(
            (c) => c.group === groupObj.key
          );
          if (groupCategories.length === 0) return null;

          return (
            <div key={groupObj.key} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-450 dark:text-zinc-500 select-none animate-in fade-in duration-200">
                  {t(groupObj.labelKey)}
                </div>
              ) : (
                groupObj.key !== "languages" && (
                  <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-900" />
                )
              )}

              <div className="flex flex-col gap-1">
                {groupCategories.map((category) => {
                  const isActive = location.pathname.includes(category.slug);
                  return (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      title={isCollapsed ? resolveText(category.name, locale) : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg py-2 transition-all duration-200",
                        isCollapsed ? "justify-center px-0.5" : "px-3 items-center",
                        isActive
                          ? "bg-zinc-100 text-zinc-950 font-semibold dark:bg-zinc-800 dark:text-zinc-50 shadow-none"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-450 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-md bg-zinc-900 dark:bg-zinc-100" />
                      )}
                      <div className="h-5 w-5 shrink-0 rounded-md bg-white border border-zinc-200 p-0.5 flex items-center justify-center shadow-sm">
                        <img
                          src={category.image}
                          alt={resolveText(category.name, locale)}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      {!isCollapsed && (
                        <span className="font-semibold text-sm tracking-wide truncate animate-in fade-in duration-200">
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
        className="absolute right-[-10px] top-6 z-40 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm hover:bg-zinc-50 hover:text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 cursor-pointer transition-all"
        title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </aside>
  );
};

export default CategorySidebar;
