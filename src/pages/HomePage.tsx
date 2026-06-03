import { useEffect } from "react";
import SearchInput from "@/command/SearchInput";
import CategoryCard from "@/command/CategoryCard";
import CommandList from "@/command/CommandList";
import { useCommands } from "@/hooks/useCommands";
import { useI18n } from "@/i18n/I18nProvider";
import { categoryList } from "@/lib/data";
import { useSearchStore } from "@/store/useSearchStore";
import { SEOHelmet } from "@/components/SEOHelmet";

const SITE_URL = "https://allfordev.maitrithanh.dev";

const HomePage = () => {
  const { keyword, setKeyword, setActiveCategory } = useSearchStore();
  const matchedCommands = useCommands(keyword).slice(0, 8);
  const { t } = useI18n();

  useEffect(() => {
    setActiveCategory(undefined);
  }, [setActiveCategory]);

  const title = "Developer Command Handbook";
  const description = t("heroDescription");

  return (
    <div className="space-y-12">
      <SEOHelmet
        title={title}
        description={description}
        canonicalUrl={SITE_URL}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Developer Command Handbook",
          "url": SITE_URL,
          "description": description,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${SITE_URL}/?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        }}
      />
      {/* Flat Hero section */}
      <section className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-8 md:p-10 dark:border-zinc-800 dark:bg-zinc-900 shadow-none">
        <div className="relative z-10 max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-450 dark:text-zinc-500">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white md:text-4xl lg:text-5xl leading-none">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl font-medium">
            {t("heroDescription")}
          </p>
          <div className="mt-8 max-w-xl">
            <SearchInput value={keyword} onChange={setKeyword} />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-zinc-200/60 pb-3 dark:border-zinc-800/60">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("featuredCategories")}
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-medium">
              {t("featuredDesc")}
            </p>
          </div>
          <span className="rounded-full bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-0.5 text-xs font-semibold text-zinc-550 dark:text-zinc-450 border border-zinc-200/50 dark:border-zinc-700/30">
            {categoryList.length} {t("categories")}
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {keyword ? (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b border-zinc-200/60 pb-3 dark:border-zinc-800/60">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {t("quickResults")}
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-medium">
                {t("quickResultsDesc")}
              </p>
            </div>
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-0.5 text-xs font-semibold text-zinc-550 dark:text-zinc-450 border border-zinc-200/50 dark:border-zinc-700/30">
              {matchedCommands.length} {t("resultsCount")}
            </span>
          </div>
          {matchedCommands.length === 0 ? (
            <div className="rounded-xl border border-zinc-200/60 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/20 px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 shadow-inner">
              {t("noCommands")}
            </div>
          ) : (
            <CommandList commands={matchedCommands} />
          )}
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;
