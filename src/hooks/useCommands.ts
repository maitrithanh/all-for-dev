import { useMemo } from "react";
import { commandList } from "@/lib/data";
import { resolveText } from "@/lib/i18n";
import { useI18n } from "@/i18n/I18nProvider";

export const useCommands = (keyword: string, category?: string) => {
  const { locale } = useI18n();

  return useMemo(() => {
    const query = keyword.trim().toLowerCase();
    return commandList.filter((command) => {
      const matchesCategory = category ? command.categorySlug === category : true;
      if (!matchesCategory) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack = [
        resolveText(command.name, locale),
        resolveText(command.description, locale),
        command.group,
        command.tags.join(" "),
        resolveText(command.detail, locale),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [keyword, category, locale]);
};
