import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categoryList, commandList } from "@/lib/data";
import { getCategoryIcon } from "@/lib/category-icons";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveText } from "@/lib/i18n";

const SITE_URL = "https://allfordev.maitrithanh.dev";

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const { locale, t } = useI18n();

  if (segments.length === 0) {
    return null;
  }

  const items: { label: string; path: string; linkable: boolean }[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const path = `/${segments.slice(0, i + 1).join("/")}`;
    const isLast = i === segments.length - 1;

    if (segment === "category") {
      if (!isLast) {
        items.push({ label: t("category"), path: "/category", linkable: true });
      }
      continue;
    }

    if (segment === "command") {
      continue;
    }

    const category = categoryList.find((item) => item.slug === segment);
    if (category) {
      items.push({ label: resolveText(category.name, locale), path, linkable: !isLast });
      continue;
    }

    const command = commandList.find((item) => item.id === segment);
    if (command) {
      const cmdCategory = categoryList.find((c) => c.slug === command.categorySlug);
      if (cmdCategory && !items.find((it) => it.path === `/category/${command.categorySlug}`)) {
        items.push({
          label: resolveText(cmdCategory.name, locale),
          path: `/category/${command.categorySlug}`,
          linkable: true,
        });
      }
      items.push({ label: resolveText(command.name, locale), path, linkable: false });
      continue;
    }

    items.push({ label: segment, path, linkable: !isLast });
  }

  const breadcrumbItems = [
    { name: "Home", path: SITE_URL },
    ...items.map((item) => ({ name: item.label, path: `${SITE_URL}${item.path}` })),
  ];

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.path,
          })),
        })}
      </script>
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-slate-900 dark:hover:text-slate-200">
          {t("home")}
        </Link>
        {items.map((item) => (
          <span key={item.path} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3" />
            {item.linkable ? (
              <Link to={item.path} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
                {item.path.startsWith("/category/") ? (
                  (() => {
                    const slug = item.path.split("/").pop() ?? "";
                    const Icon = getCategoryIcon(slug);
                    return <Icon className="h-3.5 w-3.5" />;
                  })()
                ) : null}
                {item.label}
              </Link>
            ) : (
              <span className="flex items-center gap-1 text-slate-900 dark:text-slate-200 font-medium">
                {item.path.startsWith("/category/") ? (
                  (() => {
                    const slug = item.path.split("/").pop() ?? "";
                    const Icon = getCategoryIcon(slug);
                    return <Icon className="h-3.5 w-3.5" />;
                  })()
                ) : null}
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
