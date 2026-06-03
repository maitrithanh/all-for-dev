import type { Locale, LocalizedText } from "@/types";

export const resolveText = (value: LocalizedText, locale: Locale) => {
  if (typeof value === "string") return value;
  return value[locale] ?? value.vi;
};
