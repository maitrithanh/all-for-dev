import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import sql from "highlight.js/lib/languages/sql";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("sql", sql);

type CodeBlockProps = {
  code: string;
  language?: "bash" | "json" | "typescript" | "sql";
};

// Regex to highlight common developer command utilities differently in bash mode
const highlightMainCommands = (html: string) => {
  // Split by HTML tags to avoid modifying attributes, classes, or tags
  const parts = html.split(/(<[^>]+>)/g);
  
  const commandKeywords = [
    "docker-compose",
    "git",
    "docker",
    "npm",
    "npx",
    "pnpm",
    "yarn",
    "bun",
    "php",
    "composer",
    "mysql",
    "mysqldump",
    "sudo",
    "ls",
    "cp",
    "rm",
    "curl",
    "pwd",
    "chmod",
    "grep",
    "systemctl",
    "ssh",
    "mkdir",
    "mv",
    "cat",
    "nano",
    "vim"
  ];

  // Regex matches command keyword on word boundary, excluding lookbehinds/lookaheads for path/URL chars
  const regex = new RegExp(
    `(?<![/:.-])\\b(${commandKeywords.join("|")})\\b(?![/:.-])`,
    "g"
  );

  return parts
    .map((part) => {
      if (part.startsWith("<")) {
        return part;
      }
      return part.replace(regex, (match) => {
        return `<span class="hljs-main-cmd font-bold">${match}</span>`;
      });
    })
    .join("");
};

const CodeBlock = ({ code, language = "bash" }: CodeBlockProps) => {
  const { t } = useI18n();
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const highlighted = hljs.highlight(code, { language });
    const processedHtml = language === "bash" ? highlightMainCommands(highlighted.value) : highlighted.value;
    setHtml(processedHtml);
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(language === "bash" ? t("copiedCommand") : t("copiedCode"));
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="code-block overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950 shadow-none">
      {/* Terminal macOS window controls header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-900 bg-zinc-100/60 dark:bg-zinc-900/60 px-4 py-2.5 text-xs text-zinc-500 dark:text-zinc-400 select-none">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="font-mono text-[9px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">{language}</span>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
          onClick={handleCopy}
          aria-label="Copy code snippet"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      <div className="relative p-4">
        <pre className="overflow-x-auto text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </div>
  );
};

export type InlineCodeProps = {
  code: string;
  language?: "bash" | "json" | "typescript" | "sql";
};

export const InlineCode = ({ code, language = "bash" }: InlineCodeProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const highlighted = hljs.highlight(code, { language });
    const processedHtml = language === "bash" ? highlightMainCommands(highlighted.value) : highlighted.value;
    setHtml(processedHtml);
  }, [code, language]);

  return (
    <code 
      className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-50 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded truncate block max-w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodeBlock;
