import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategoryIcon } from "@/lib/category-icons";
import { resolveText } from "@/lib/i18n";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { locale, t } = useI18n();
  const Icon = getCategoryIcon(category.slug);

  return (
    <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-none flex flex-col justify-between">
      <CardContent className="p-6 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              <Icon className="h-3.5 w-3.5" />
              {t("categoryLabel")}
            </div>
            <div className="h-10 w-10 rounded-lg bg-zinc-50 border border-zinc-100 p-2 dark:bg-zinc-800 dark:border-zinc-800 flex items-center justify-center">
              <img
                src={category.image}
                alt={resolveText(category.name, locale)}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Link 
              to={`/category/${category.slug}`} 
              className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              {resolveText(category.name, locale)}
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
              {resolveText(category.description, locale)}
            </p>
          </div>
        </div>
        <div className="flex gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-auto">
          <Button asChild variant="outline" size="sm" className="rounded-lg h-8 px-3 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800">
            <Link to={`/category/${category.slug}`} className="text-xs font-semibold">
              {t("command")}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="rounded-lg h-8 px-3 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 gap-1.5">
            <a href={category.docsUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold">
              {t("officialDocs")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
