import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, BookOpen, Terminal, FileCode2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/command/CodeBlock";
import { SEOHelmet } from "@/components/SEOHelmet";
import { useI18n } from "@/i18n/I18nProvider";
import { resolveText } from "@/lib/i18n";
import { findMasterGuide, type MasterStep } from "@/data/master-guides";
import { categoryList } from "@/lib/data";
import type { Locale } from "@/types";

const SITE_URL = "https://allfordev.maitrithanh.dev";

const GuideStep = ({ step, number, isLast, locale, stepRef }: {
  step: MasterStep; number: number; isLast: boolean; locale: Locale; stepRef?: (el: HTMLDivElement | null) => void;
}) => (
  <div ref={stepRef} id={`step-${number}`} className="flex gap-4 scroll-mt-24">
    <div className="flex flex-col items-center">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
        {number}
      </div>
      {!isLast && <div className="mt-1 h-full w-0.5 bg-gradient-to-b from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-900" />}
    </div>
    <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-8"}`}>
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">
        {resolveText(step.title, locale)}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
        {resolveText(step.content, locale)}
      </p>
      {step.commands && step.commands.length > 0 && (
        <div className="space-y-2 mb-4">
          {step.commands.map((cmd, i) => (
            <CodeBlock key={i} code={cmd} />
          ))}
        </div>
      )}
      {step.code && (
        <div className="mb-4">
          {step.folderPath && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg border border-b-0 border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate">
              <FileCode2 className="h-3 w-3 shrink-0" />
              <span>{step.folderPath}</span>
            </div>
          )}
          <CodeBlock code={step.code} language={step.language ?? "typescript"} />
        </div>
      )}
      {step.notes && step.notes.length > 0 && (
        <div className="space-y-2 mb-2">
          {step.notes.map((note, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-500 mt-0.5" />
              <span className="leading-relaxed">{resolveText(note, locale)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const MasterGuidePage = () => {
  const { slug } = useParams();
  const { locale, t } = useI18n();
  const guide = useMemo(() => slug ? findMasterGuide(slug) : undefined, [slug]);
  const category = guide ? categoryList.find((c) => c.slug === guide.categorySlug) : undefined;
  const categoryName = category ? resolveText(category.name, locale) : "";

  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!guide) return;
    const HEADER_OFFSET = 80;
    let ticking = false;
    const update = () => {
      ticking = false;
      let active = 0;
      for (let i = 0; i < stepRefs.current.length; i++) {
        const el = stepRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= HEADER_OFFSET) active = i;
      }
      setActiveStep((prev) => (prev !== active ? active : prev));
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [guide]);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setStepRef = (index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el;
  };

  if (!guide) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        {t("commandNotFound")} <Link to="/">{t("backHome")}</Link>
      </div>
    );
  }

  const title = resolveText(guide.title, locale);
  const description = resolveText(guide.description, locale);
  const productName = resolveText(guide.productName, locale);
  const canonicalUrl = `${SITE_URL}/master/${guide.slug}`;

  return (
    <div className="mx-auto max-w-6xl pb-16">
      <SEOHelmet
        title={`${title} | Developer Command Handbook`}
        description={description}
        canonicalUrl={canonicalUrl}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "url": canonicalUrl,
          "about": categoryName
        }}
      />

      <Link
        to={`/category/${guide.categorySlug}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {categoryName}
      </Link>

      <div className="flex gap-10">
        {/* Sidebar TOC - desktop only */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20 z-10 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {t("masterGuide")} &mdash; {guide.steps.length} {t("step").toLowerCase()}s
            </p>
            <nav className="space-y-1">
              {guide.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => scrollToStep(i)}
                  className={`w-full text-left flex items-start gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                    activeStep === i
                      ? "bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <span className={`shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold ${
                    activeStep === i
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}>
                    {i + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{resolveText(step.title, locale)}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                {t("masterGuide")}
              </Badge>
              <Badge className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-3 py-0.5 rounded-full text-[11px] font-bold">
                {categoryName}
              </Badge>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
              {title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
              <BookOpen className="h-3.5 w-3.5" />
              <span>
                {guide.steps.length} {t("step").toLowerCase()}s &middot; {t("masterGuideSubtitle")}
              </span>
            </div>
            {category && (
              <Button asChild variant="outline" size="sm" className="rounded-lg border-zinc-200 dark:border-zinc-800">
                <a href={category.docsUrl} target="_blank" rel="noreferrer">
                  {t("officialDocs")}
                </a>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10 mb-10">
            <Terminal className="h-4 w-4 text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              Sản phẩm mẫu: <strong>{productName}</strong> &mdash; {t("masterGuideDesc")}
            </p>
          </div>

          <div className="space-y-0">
            {guide.steps.map((step, index) => (
              <GuideStep
                key={index}
                step={step}
                number={index + 1}
                isLast={index === guide.steps.length - 1}
                locale={locale}
                stepRef={setStepRef(index)}
              />
            ))}
          </div>

          <Separator className="my-10 bg-zinc-200 dark:bg-zinc-800" />

          <div className="text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              {resolveText(guide.title, locale)}
            </p>
            <Button asChild variant="outline" size="sm" className="rounded-lg border-zinc-200 dark:border-zinc-800">
              <Link to={`/category/${guide.categorySlug}`}>
                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                {t("viewAllInCategory")} {categoryName}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterGuidePage;
