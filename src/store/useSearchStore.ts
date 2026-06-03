import { create } from "zustand";

type SearchState = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  activeCategory?: string;
  setActiveCategory: (category?: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),
  activeCategory: undefined,
  setActiveCategory: (category) => set({ activeCategory: category }),
}));
