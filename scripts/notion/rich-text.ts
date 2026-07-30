type RichTextItem = {
  plain_text?: string;
  href?: string | null;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    code?: boolean;
  };
  type?: string;
  text?: { content?: string; link?: { url?: string } | null };
};

/** Convert Notion rich_text array to a simple Markdown string. */
export function richTextToMarkdown(items: RichTextItem[] | undefined | null): string {
  if (!items?.length) return "";

  return items
    .map((item) => {
      let text = item.plain_text ?? item.text?.content ?? "";
      const ann = item.annotations;
      if (ann?.code) text = `\`${text}\``;
      if (ann?.bold) text = `**${text}**`;
      if (ann?.italic) text = `*${text}*`;
      if (ann?.strikethrough) text = `~~${text}~~`;
      const href = item.href ?? item.text?.link?.url;
      if (href) text = `[${text}](${href})`;
      return text;
    })
    .join("")
    .trim();
}

export function richTextToPlain(items: RichTextItem[] | undefined | null): string {
  if (!items?.length) return "";
  return items.map((i) => i.plain_text ?? "").join("").trim();
}
