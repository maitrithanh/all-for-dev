import { Link } from "react-router-dom";
import { SEOHelmet } from "@/components/SEOHelmet";
import { useI18n } from "@/i18n/I18nProvider";

const SITE_URL = "https://allfordev.maitrithanh.dev";

const NotFoundPage = () => {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <SEOHelmet
        title="404 Not Found | Developer Command Handbook"
        description="Page not found"
        canonicalUrl={SITE_URL}
        noindex
      />
      <span className="text-7xl font-black text-zinc-300 dark:text-zinc-700 select-none">404</span>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {t("commandNotFound")}
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {t("commandCategories")}
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {t("backHome")}
      </Link>
    </div>
  );
};

export default NotFoundPage;
