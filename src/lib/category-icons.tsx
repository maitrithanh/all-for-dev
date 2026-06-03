import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Box,
  Cable,
  Database,
  FileCode2,
  FolderGit2,
  Layers3,
  Package,
  Palette,
  Server,
  TerminalSquare,
  Waypoints,
  Wrench,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  git: FolderGit2,
  react: AppWindow,
  vite: Waypoints,
  nextjs: Layers3,
  php: FileCode2,
  mysql: Database,
  laravel: Server,
  tailwind: Palette,
  node: Package,
  linux: TerminalSquare,
  docker: Box,
  composer: Wrench,
  api: Cable,
};

export const getCategoryIcon = (slug: string) => {
  return categoryIcons[slug] ?? TerminalSquare;
};
