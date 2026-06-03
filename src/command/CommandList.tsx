import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List, Copy, Check, ChevronRight, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import CommandCard from "@/command/CommandCard";
import { InlineCode } from "@/command/CodeBlock";
import type { Command } from "@/types";
import { useI18n } from "@/i18n/I18nProvider";
import { findCategoryBySlug } from "@/lib/data";
import { resolveText } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

type CommandListProps = {
  commands: Command[];
};

type ViewMode = "grid" | "list";

const CommandList = ({ commands }: CommandListProps) => {
  const { locale, t } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem("command-handbook-view-mode");
    return (saved === "list" || saved === "grid") ? saved : "grid";
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("command-handbook-view-mode", mode);
  };

  const handleCopy = async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success(t("copiedSuccess"));
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* View switch toolbar */}
      <div className="flex justify-end items-center gap-1.5 pb-2">
        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mr-2 uppercase tracking-wider select-none">{t("layout")}:</span>
        <div className="flex items-center rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleViewMode("grid")}
            className={`h-7 w-7 rounded-md ${viewMode === "grid" ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-none" : "text-zinc-400"}`}
            aria-label="Grid layout"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleViewMode("list")}
            className={`h-7 w-7 rounded-md ${viewMode === "list" ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-none" : "text-zinc-400"}`}
            aria-label="List layout"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <section className="grid gap-6 md:grid-cols-2">
          {commands.map((command) => (
            <CommandCard key={command.id} command={command} />
          ))}
        </section>
      ) : (
        /* Compact List View */
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-none">
          {/* Table Headers */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500">
            <div className="col-span-5">{t("syntax")}</div>
            <div className="col-span-5">{t("description")}</div>
            <div className="col-span-1 text-center">{t("categoryLabel")}</div>
            <div className="col-span-1 text-right">{t("actions")}</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {commands.map((command) => {
              const category = findCategoryBySlug(command.categorySlug);
              return (
                <div 
                  key={command.id} 
                  className="grid grid-cols-12 gap-4 px-6 py-4 md:py-3.5 items-center hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  {/* Syntax */}
                  <div className="col-span-12 md:col-span-5 flex items-center gap-2">
                    {command.danger ? (
                      <span title={t("warning")} className="shrink-0 flex items-center">
                        <ShieldAlert className="h-4 w-4 text-rose-500" />
                      </span>
                    ) : null}
                    <InlineCode code={command.syntax} />
                  </div>

                  {/* Description */}
                  <div className="col-span-8 md:col-span-5 text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    {resolveText(command.description, locale)}
                  </div>

                  {/* Category Badge */}
                  <div className="hidden md:flex col-span-1 justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500">
                      {category ? resolveText(category.name, locale) : command.group}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-4 md:col-span-1 flex items-center justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 rounded-md hover:bg-zinc-150 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                      onClick={() => handleCopy(command.id, command.syntax)}
                      aria-label="Copy syntax"
                    >
                      {copiedId === command.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 rounded-md hover:bg-zinc-150 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <Link to={`/command/${command.id}`} aria-label="Command details">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandList;
