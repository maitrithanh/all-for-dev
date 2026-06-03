export type Locale = "vi" | "en" | "ja";

export type LocalizedText =
  | string
  | {
      vi: string;
      en: string;
      ja: string;
    };

export type CommandVariation = {
  syntax: string;
  description: LocalizedText;
};

export type Command = {
  id: string;
  name: LocalizedText;
  group: string;
  categorySlug: string;
  description: LocalizedText;
  detail: LocalizedText;
  syntax: string;
  example: string;
  breakdown: LocalizedText[];
  commonErrors: LocalizedText[];
  fixes: LocalizedText[];
  tags: string[];
  danger?: LocalizedText;
  variations?: CommandVariation[];
};

export type CategoryGroup = "languages" | "frameworks" | "tools" | "systems";

export type Category = {
  id: string;
  name: LocalizedText;
  slug: string;
  description: LocalizedText;
  accent: string;
  image: string;
  docsUrl: string;
  group?: CategoryGroup;
};
