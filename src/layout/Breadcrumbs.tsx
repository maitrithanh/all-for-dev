import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categoryList } from "@/lib/data";
import { getCategoryIcon } from "@/lib/category-icons";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveText } from "@/lib/i18n";

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const { locale, t } = useI18n();

  if (segments.length === 0) {
    return null;
  }

  const items = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    if (segment === "category") {
      return { label: t("category"), path };
    }
    if (segment === "command") {
      return { label: t("command"), path };
    }
    const category = categoryList.find((item) => item.slug === segment);
    return { label: category ? resolveText(category.name, locale) : segment, path };
  });

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
      <Link to="/" className="hover:text-slate-900 dark:hover:text-slate-200">
        {t("home")}
      </Link>
      {items.map((item) => (
        <span key={item.path} className="flex items-center gap-2">
          <ChevronRight className="h-3 w-3" />
          <Link to={item.path} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
            {item.path.startsWith("/category/") && item.label !== t("category") ? (
              (() => {
                const slug = item.path.split("/").pop() ?? "";
                const Icon = getCategoryIcon(slug);
                return <Icon className="h-3.5 w-3.5" />;
              })()
            ) : null}
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
