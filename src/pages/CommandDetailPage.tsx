import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, CheckCircle2, HelpCircle, Tag, Waypoints } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "@/command/CodeBlock";
import { useI18n } from "@/i18n/I18nProvider";
import { commandList, findCategoryBySlug } from "@/lib/data";
import { resolveText } from "@/lib/i18n";
import { commandCombos } from "@/data/combos";

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
        {t("commandNotFound")} <Link to="/">{t("backHome")}</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Flat Hero header block */}
      <section className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-none">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge 
              tone="primary" 
              className="bg-zinc-100 text-zinc-800 border border-zinc-200/60 hover:bg-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-250 dark:border-zinc-700/50 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
            >
              {category ? resolveText(category.name, locale) : command.group}
            </Badge>
            <Badge 
              tone="muted"
              className="bg-zinc-50 text-zinc-400 dark:bg-zinc-900/40 dark:text-zinc-500 border border-transparent px-2.5 py-0.5 rounded text-[11px] font-medium"
            >
              #{command.categorySlug}
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
            {resolveText(command.name, locale)}
          </h1>
          <p className="max-w-3xl text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            {resolveText(command.detail, locale)}
          </p>
          <div className="mt-6">
            <CodeBlock code={command.syntax} />
          </div>
          {command.danger ? (
            <div className="rounded-lg border border-rose-500/25 bg-rose-500/5 px-4 py-3.5 text-xs text-rose-700 dark:text-rose-300 leading-relaxed mt-4">
              <div className="flex gap-2.5 items-start">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-800 dark:text-rose-450 mr-1 uppercase tracking-wider text-[10px]">{t("warning")}:</span>
                  <span>{resolveText(command.danger, locale)}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Breakdown, Syntax, Errors & Fixes grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Syntax preview & Example */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-none space-y-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t("syntax")}</h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{t("syntaxDesc")}</p>
            </div>
            <p className="text-sm font-semibold font-mono bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-350 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
              {command.syntax}
            </p>
            <div className="pt-2">
              <CodeBlock code={command.example} />
            </div>
          </div>

          {/* Command Variations */}
          {command.variations && command.variations.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-none space-y-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {t("variations")}
                </h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  {t("variationsDesc")}
                </p>
              </div>
              <div className="space-y-4">
                {command.variations.map((variant, index) => (
                  <div key={`variant-${index}`} className="space-y-2 border-b border-zinc-200/50 pb-4 last:border-b-0 last:pb-0 dark:border-zinc-800/65">
                    <p className="text-xs font-semibold text-zinc-650 dark:text-zinc-350">
                      {resolveText(variant.description, locale)}
                    </p>
                    <CodeBlock code={variant.syntax} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Breakdown Steps timeline */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-none space-y-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {t("breakdown")}
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{t("breakdownDesc")}</p>
            </div>
            <div className="mt-6 relative pl-4 border-l border-zinc-250 dark:border-zinc-800/80 space-y-6">
              {command.breakdown.map((item, index) => (
                <div key={`${command.id}-breakdown-${index}`} className="relative">
                  <span className="absolute -left-[25px] top-0 h-4 w-4 rounded-full border-2 border-zinc-250 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                    {index + 1}
                  </span>
                  <p className="text-sm text-zinc-650 dark:text-zinc-300 pl-2 leading-relaxed">
                    {resolveText(item, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual Combos / Workflows */}
          {commandCombos[command.id] && commandCombos[command.id].map((combo, comboIdx) => (
            <div 
              key={`combo-${comboIdx}`} 
              className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm space-y-5"
            >
              <div className="flex items-start gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  <Waypoints className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-800">
                    {t("comboWorkflow")}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1.5 leading-snug">
                    {combo.title[locale] ?? combo.title.vi}
                  </h3>
                </div>
              </div>

              <div className="relative pl-6 ml-3 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
                {combo.steps.map((step, stepIdx) => (
                  <div key={`step-${stepIdx}`} className="relative">
                    {/* Step number badge on timeline */}
                    <span className="absolute -left-[34px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-200 bg-white text-[9px] font-bold text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                      {stepIdx + 1}
                    </span>
                    <div className="space-y-2">
                      <p className="text-xs text-zinc-650 dark:text-zinc-300 font-medium leading-relaxed">
                        {step.desc[locale] ?? step.desc.vi}
                      </p>
                      {step.command && (
                        <div className="mt-2">
                          <CodeBlock code={step.command} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar panel (Common Errors, Fixes, Tags) */}
        <div className="space-y-6">
          {/* Errors and Fixes comparative blocks */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-none space-y-5">
            {/* Common Errors block */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold tracking-wider text-rose-600 dark:text-rose-400 uppercase flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 shrink-0" />
                {t("commonErrors")}
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-350">
                {command.commonErrors.map((item, index) => (
                  <li key={`${command.id}-error-${index}`} className="flex items-start gap-2 bg-rose-500/5 border border-rose-500/10 p-2.5 rounded-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0 animate-pulse" />
                    <span className="leading-relaxed font-medium">{resolveText(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="bg-zinc-200/50 dark:bg-zinc-800/80" />

            {/* How to Fix block */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                {t("fixes")}
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-350">
                {command.fixes.map((item, index) => (
                  <li key={`${command.id}-fix-${index}`} className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span className="leading-relaxed font-medium text-zinc-800 dark:text-zinc-300">{resolveText(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags list & navigation block */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-none space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-zinc-400" />
              {t("tags")}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {command.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  tone="muted"
                  className="bg-zinc-100 text-zinc-500 border border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-800 px-2 py-0.5 rounded text-xs transition-colors font-semibold"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <Button 
              asChild 
              className="mt-4 w-full rounded-lg border-zinc-200 dark:border-zinc-800 text-xs font-bold" 
              variant="outline"
            >
              <Link to={`/category/${command.categorySlug}`}>
                {t("viewAllInCategory")} {category ? resolveText(category.name, locale) : command.group}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommandDetailPage;
