import { Link } from "react-router-dom";
import { ChevronRight, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Command } from "@/types";
import CodeBlock from "@/command/CodeBlock";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategoryIcon } from "@/lib/category-icons";
import { findCategoryBySlug } from "@/lib/data";
import { resolveText } from "@/lib/i18n";

type CommandCardProps = {
  command: Command;
};

const CommandCard = ({ command }: CommandCardProps) => {
  const { locale, t } = useI18n();
  const category = findCategoryBySlug(command.categorySlug);
  const Icon = getCategoryIcon(command.categorySlug);

  return (
    <Card className="h-full rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-none flex flex-col justify-between">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              <Icon className="h-3.5 w-3.5" />
              {category ? resolveText(category.name, locale) : command.group}
            </div>
            <Link
              to={`/command/${command.id}`}
              className="group inline-flex items-center gap-1 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              {resolveText(command.name, locale)}
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          {command.danger ? (
            <Badge tone="warning" className="gap-1.5 py-1 px-2.5 rounded-md font-semibold text-[10px] uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-350 border border-rose-500/20">
              <ShieldAlert className="h-3 w-3" />
              {t("warning")}
            </Badge>
          ) : null}
        </div>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {resolveText(command.description, locale)}
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <CodeBlock code={command.syntax} />
        {command.danger ? (
          <div className="rounded-lg border border-rose-500/25 bg-rose-500/5 px-4 py-3 text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
            <div className="flex gap-2 items-start">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
              <span>{resolveText(command.danger, locale)}</span>
            </div>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2 pt-2">
          {command.tags.map((tag) => (
            <Badge 
              key={tag} 
              tone="muted"
              className="bg-zinc-100/80 text-zinc-600 border border-zinc-200/50 hover:bg-zinc-200/50 dark:bg-zinc-800/40 dark:text-zinc-400 dark:border-zinc-800/80 dark:hover:bg-zinc-900 px-2 py-0.5 rounded text-xs transition-colors font-medium"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandCard;
