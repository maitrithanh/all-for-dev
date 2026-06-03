import { Helmet } from "react-helmet-async";
import { useI18n } from "@/i18n/I18nProvider";

const LOCALE_MAP: Record<string, string> = {
  vi: "vi_VN",
  en: "en_US",
  ja: "ja_JP",
};

type SEOHelmetProps = {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
};

const SEOHelmet = ({
  title,
  description,
  canonicalUrl,
  imageUrl,
  jsonLd,
  noindex,
}: SEOHelmetProps) => {
  const { locale } = useI18n();
  const ogLocale = LOCALE_MAP[locale] || "en_US";
  const alternateLocales = Object.values(LOCALE_MAP).filter((l) => l !== ogLocale);
  const defaultImage = `${canonicalUrl.startsWith("http") ? canonicalUrl.split("/").slice(0, 3).join("/") : "https://allfordev.maitrithanh.dev"}/og-image.svg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:locale" content={ogLocale} />
      {alternateLocales.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl || defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImage} />
      {noindex && <meta name="robots" content="noindex" />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export { SEOHelmet };
export type { SEOHelmetProps };
