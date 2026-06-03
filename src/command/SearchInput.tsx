import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput = ({
  value,
  onChange,
  placeholder,
  className,
}: SearchInputProps) => {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus when "/" is pressed, but not when user is inside any editable fields
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA" &&
        !document.activeElement?.hasAttribute("contenteditable")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 transition-all duration-150",
        "focus-within:border-zinc-950",
        "dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-50",
        className
      )}
    >
      <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t("searchPlaceholder")}
        className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors shrink-0"
          aria-label="Clear search query"
        >
          <X className="h-4 w-4" />
        </button>
      ) : (
        <div className="hidden sm:flex items-center gap-1 pointer-events-none select-none">
          <kbd className="h-5 min-w-[20px] items-center justify-center rounded border border-zinc-200 bg-zinc-50 px-1 text-[10px] font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 flex">
            /
          </kbd>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
