import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle, CheckCircle2, HelpCircle, Tag, Waypoints,
  Terminal, BookOpen, ArrowLeft, ChevronRight, Layers, AlertCircle,
  type LucideIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/command/CodeBlock";
import { SEOHelmet } from "@/components/SEOHelmet";
import { useI18n } from "@/i18n/I18nProvider";
import { commandList, findCategoryBySlug } from "@/lib/data";
import { resolveText } from "@/lib/i18n";
import { commandCombos } from "@/data/combos";

const SITE_URL = "https://allfordev.maitrithanh.dev";

const SectionHeading = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <div className="flex items-center gap-2">
    <Icon className="h-4 w-4 text-zinc-400" />
    <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">{label}</h2>
  </div>
);

const CommandDetailPage = () => {
  const { id } = useParams();
  const { locale, t } = useI18n();
  const command = useMemo(
    () => commandList.find((item) => item.id === id),
    [id]
  );
  const category = command ? findCategoryBySlug(command.categorySlug) : undefined;

  if (!command) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 text-center text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <SEOHelmet
          title="Command Not Found | Developer Command Handbook"
          description="Page not found"
          canonicalUrl={SITE_URL}
          noindex
        />
        {t("commandNotFound")} <Link to="/">{t("backHome")}</Link>
      </div>
    );
  }

  const commandName = resolveText(command.name, locale);
  const commandDesc = resolveText(command.description, locale);
  const commandDetail = resolveText(command.detail, locale);
  const pageTitle = `${commandName} - ${command.group} | Developer Command Handbook`;
  const canonicalUrl = `${SITE_URL}/command/${command.id}`;
  const categoryName = category ? resolveText(category.name, locale) : command.group;

  const hasVariations = command.variations && command.variations.length > 0;
  const hasErrors = command.commonErrors.length > 0;
  const hasCombos = commandCombos[command.id] && commandCombos[command.id].length > 0;
  const cardStyle = "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50";

  const showCommand = (code: string) => (
    <div className="font-mono text-sm bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 leading-relaxed">
      {code}
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl pb-16">
      <SEOHelmet
        title={pageTitle}
        description={commandDesc}
        canonicalUrl={canonicalUrl}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": commandName,
          "description": commandDesc,
          "url": canonicalUrl,
          "about": categoryName,
          "proficiencyLevel": "Beginner",
          "keywords": command.tags.join(", ")
        }}
      />

      <Link
        to={`/category/${command.categorySlug}`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {categoryName}
      </Link>

      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-3 py-0.5 rounded-full text-[11px] font-bold">
            {categoryName}
          </Badge>
          {command.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              className="bg-zinc-50 text-zinc-400 dark:bg-zinc-800/60 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-full text-[10px] font-medium"
            >
              #{tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-3xl">
          {commandName}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {commandDetail}
        </p>
      </div>

      {command.danger ? (
        <div className="flex items-start gap-3 border border-amber-500/20 bg-amber-500/5 rounded-xl px-4 py-3 mb-8">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            <span className="font-bold uppercase tracking-wider">{t("warning")}: </span>
            {resolveText(command.danger, locale)}
          </p>
        </div>
      ) : null}

      <div className="space-y-6">
        <div className={`${cardStyle} p-5 space-y-4`}>
          <SectionHeading icon={Terminal} label={t("syntax")} />
          {showCommand(command.syntax)}
          <Separator className="bg-zinc-100 dark:bg-zinc-800" />
          <SectionHeading icon={Terminal} label="Example" />
          <CodeBlock code={command.example} />
        </div>

        <div className={`${cardStyle} p-5 space-y-4`}>
          <SectionHeading icon={BookOpen} label={t("breakdown")} />
          <div className="space-y-0">
            {command.breakdown.map((item, index) => {
              const isLast = index === command.breakdown.length - 1;
              return (
                <div key={`breakdown-${index}`} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                      {index + 1}
                    </div>
                    {!isLast && <div className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />}
                  </div>
                  <div className={`flex-1 ${isLast ? "" : "pb-5"}`}>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-0.5">
                      {resolveText(item, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {hasVariations ? (
          <div className={`${cardStyle} divide-y divide-zinc-100 dark:divide-zinc-800`}>
            {command.variations!.map((variant, index) => (
              <div key={`variant-${index}`} className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-purple-500" />
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t("variations")}</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {resolveText(variant.description, locale)}
                </p>
                <CodeBlock code={variant.syntax} />
              </div>
            ))}
          </div>
        ) : null}

        {hasErrors ? (
          <div className={`${cardStyle} divide-y divide-zinc-100 dark:divide-zinc-800`}>
            {command.commonErrors.map((err, index) => (
              <div key={`error-fix-${index}`} className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/40">
                    <HelpCircle className="h-3 w-3 text-rose-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider mb-0.5">
                      {t("commonErrors")}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {resolveText(err, locale)}
                    </p>
                  </div>
                </div>
                {index < command.fixes.length ? (
                  <div className="flex items-start gap-3 pl-8">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider mb-0.5">
                        {t("fixes")}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {resolveText(command.fixes[index], locale)}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {hasCombos ? commandCombos[command.id]!.map((combo, comboIdx) => (
          <div key={`combo-${comboIdx}`} className={`${cardStyle} p-5 space-y-4`}>
            <div className="flex items-center gap-2">
              <Waypoints className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {combo.title[locale] ?? combo.title.vi}
              </h2>
            </div>
            <div className="space-y-0">
              {combo.steps.map((step, stepIdx) => {
                const isLast = stepIdx === combo.steps.length - 1;
                return (
                  <div key={`step-${stepIdx}`} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[10px] font-bold text-zinc-400">
                        {stepIdx + 1}
                      </div>
                      {!isLast && <div className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800" />}
                    </div>
                    <div className={`flex-1 space-y-2 ${isLast ? "" : "pb-5"}`}>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-0.5">
                        {step.desc[locale] ?? step.desc.vi}
                      </p>
                      {step.command ? <CodeBlock code={step.command} /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )) : null}

        <div className={`${cardStyle} p-5`}>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t("tags")}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {command.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-full text-[10px] font-medium"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="ml-auto rounded-full border-zinc-200 dark:border-zinc-700 text-[11px] font-medium h-7"
            >
              <Link to={`/category/${command.categorySlug}`}>
                <ChevronRight className="h-3 w-3 mr-0.5 rotate-180" />
                {t("viewAllInCategory")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandDetailPage;
