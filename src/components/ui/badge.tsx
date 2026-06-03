import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "muted" | "warning";
};

const Badge = ({ className, tone = "primary", ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
      tone === "primary" && "bg-sky-500/15 text-sky-700 dark:text-sky-200",
      tone === "muted" && "bg-slate-200/80 text-slate-700 dark:bg-white/10 dark:text-slate-200",
      tone === "warning" && "bg-rose-500/15 text-rose-700 dark:text-rose-200",
      className
    )}
    {...props}
  />
);

export { Badge };
