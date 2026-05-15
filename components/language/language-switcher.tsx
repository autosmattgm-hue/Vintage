"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/language/language-provider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  return (
    <div
      className="inline-flex h-11 shrink-0 items-center rounded-full border border-gold-300/30 bg-background/65 p-1 backdrop-blur"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={toggleLanguage}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2 text-xs font-medium text-muted-foreground transition hover:text-foreground sm:hidden"
        aria-label={language === "fr" ? "Changer la langue en anglais" : "Change language to French"}
      >
        <Languages className="h-4 w-4 text-gold-500" aria-hidden="true" />
        {language.toUpperCase()}
      </button>
      {(["fr", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={cn(
            "hidden h-9 min-w-10 items-center justify-center rounded-full px-3 text-xs font-medium transition sm:inline-flex",
            language === item
              ? "bg-gold-500 text-couture-ink shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={language === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
