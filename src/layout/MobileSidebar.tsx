import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { categoryList } from "@/lib/data";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveText } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GROUPS = [
  { key: "languages", labelKey: "languages" },
  { key: "frameworks", labelKey: "frameworks" },
  { key: "tools", labelKey: "tools" },
  { key: "systems", labelKey: "systems" }
] as const;

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const { locale, t } = useI18n();
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Disable scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="rounded-lg border-zinc-200 dark:border-zinc-800"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
      </Button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/55 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sheet Content */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 h-full w-[300px] bg-white p-2 border-l border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300 ease-in-out transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="mb-6 flex items-center justify-between px-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                {t("categories")}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t("commandCategories")}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="rounded-md h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 pb-4">
            {GROUPS.map((groupObj) => {
              const groupCategories = categoryList.filter(
                (c) => c.group === groupObj.key
              );
              if (groupCategories.length === 0) return null;

              return (
                <div key={groupObj.key} className="space-y-1.5 px-2">
                  <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 select-none pb-0.5">
                    {t(groupObj.labelKey)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {groupCategories.map((category) => {
                      const isActive = location.pathname.includes(`/category/${category.slug}`);

                      return (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-sm transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900",
                            "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                            isActive && "border-zinc-900 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
                          )}
                        >
                          <div className="h-5 w-5 shrink-0 rounded-md bg-white border border-zinc-200 p-0.5 flex items-center justify-center shadow-sm">
                            <img
                              src={category.image}
                              alt={resolveText(category.name, locale)}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                            {resolveText(category.name, locale)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


export default MobileSidebar;
