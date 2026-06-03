import { categories } from "@/data/categories";
import { commands } from "@/data/commands";

export const categoryList = categories;
export const commandList = commands;

export const findCategoryBySlug = (slug: string) => {
  return categoryList.find((category) => category.slug === slug);
};
