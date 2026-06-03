import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpRight, Waypoints } from "lucide-react";
import CommandList from "@/command/CommandList";
import SearchInput from "@/command/SearchInput";
import CodeBlock from "@/command/CodeBlock";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { categoryList, commandList } from "@/lib/data";
import { resolveText } from "@/lib/i18n";
import { useCommands } from "@/hooks/useCommands";
import { useSearchStore } from "@/store/useSearchStore";
import { commandCombos, type ComboWorkflow, type ComboStep } from "@/data/combos";

const CategoryPage = () => {
  const { slug } = useParams();
  const { keyword, setKeyword, setActiveCategory } = useSearchStore();
  const commands = useCommands(keyword, slug);
  const category = categoryList.find((item) => item.slug === slug);
  const { locale, t } = useI18n();

  useEffect(() => {
    setActiveCategory(slug);
  }, [setActiveCategory, slug]);

  const workflows = useMemo<ComboWorkflow[]>(() => {
    if (!slug) return [];
    const list: ComboWorkflow[] = [];
    const categoryCommandIds = new Set(
      commandList
        .filter((cmd) => cmd.categorySlug === slug)
        .map((cmd) => cmd.id)
    );
    for (const [cmdId, combos] of Object.entries(commandCombos)) {
      if (categoryCommandIds.has(cmdId)) {
        combos.forEach((combo) => {
          list.push(combo);
        });
      }
    }
    return list;
  }, [slug]);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-6 md:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-none">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between relative z-10">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-4">
              {category ? (
                <div className="h-14 w-14 shrink-0 rounded-xl bg-zinc-50 border border-zinc-200 p-2.5 dark:bg-zinc-900 dark:border-zinc-800 flex items-center justify-center shadow-sm">
                  <img
                    src={category.image}
                    alt={resolveText(category.name, locale)}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {category ? resolveText(category.name, locale) : t("category")}
                </h1>
                <p className="max-w-2xl text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1 leading-relaxed">
                  {category ? resolveText(category.description, locale) : t("commandCategories")}
                </p>
              </div>
            </div>
          </div>
          {category ? (
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="gap-1.5 self-start sm:self-auto rounded-lg border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-semibold"
            >
              <a href={category.docsUrl} target="_blank" rel="noreferrer">
                {t("officialDocs")}
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-550" />
              </a>
            </Button>
          ) : null}
        </div>
        <div className="mt-6 border-t border-zinc-200/50 pt-6 dark:border-zinc-800/40">
          <SearchInput value={keyword} onChange={setKeyword} />
        </div>
      </section>

      {commands.length === 0 ? (
        <div className="rounded-xl border border-zinc-200/60 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/20 px-6 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 shadow-inner">
          {t("noCommands")}
        </div>
      ) : (
        <div className="space-y-10">
          <CommandList commands={commands} />
          
          {workflows.length > 0 && (
            <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800/60">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {t("comboWorkflows")} (A-Z)
                </h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-medium">
                  {t("comboWorkflowsDesc")}
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {workflows.map((workflow, idx) => (
                  <div 
                    key={`workflow-${idx}`} 
                    className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="flex items-start gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                          <Waypoints className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-800">
                            Combo {idx + 1}
                          </span>
                          <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1.5 leading-snug">
                            {resolveText(workflow.title, locale)}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="relative pl-6 ml-3 border-l border-zinc-200 dark:border-zinc-800 space-y-6">
                        {workflow.steps.map((step: ComboStep, stepIdx: number) => (
                          <div key={`step-${stepIdx}`} className="relative">
                            {/* Step number badge on timeline */}
                            <span className="absolute -left-[34px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-200 bg-white text-[9px] font-bold text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                              {stepIdx + 1}
                            </span>
                            <div className="space-y-2">
                              <p className="text-xs text-zinc-650 dark:text-zinc-300 font-medium leading-relaxed">
                                {resolveText(step.desc, locale)}
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
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
