import CategoryCard from "@/command/CategoryCard";
import { useI18n } from "@/i18n/I18nProvider";
import { categoryList } from "@/lib/data";
import { SEOHelmet } from "@/components/SEOHelmet";

const SITE_URL = "https://allfordev.maitrithanh.dev";

const CategoryIndexPage = () => {
  const { t } = useI18n();
  const title = `${t("categories")} | Developer Command Handbook`;
  const description = t("commandCategories");
  const canonicalUrl = `${SITE_URL}/category`;

  return (
    <div className="space-y-8">
      <SEOHelmet
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": title,
          "description": description,
          "url": canonicalUrl
        }}
      />
      {/* <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          {t("categories")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          {t("commandCategories")}
        </p>
      </section> */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categoryList.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </section>
    </div>
  );
};

export default CategoryIndexPage;
