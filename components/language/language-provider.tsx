"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { defaultLanguage, translateText, type Language } from "@/lib/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "pfv_language";
const ignoredParents = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);
const translatableAttributes = ["placeholder", "aria-label", "title", "alt", "data-label"] as const;

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function preserveWhitespace(original: string, translated: string) {
  const prefix = original.match(/^\s*/)?.[0] ?? "";
  const suffix = original.match(/\s*$/)?.[0] ?? "";
  return `${prefix}${translated}${suffix}`;
}

function translateValue(value: string, language: Language) {
  const normalized = normalizeText(value);

  if (!normalized) return value;

  const translated = translateText(normalized, language);
  return translated !== normalized ? preserveWhitespace(value, translated) : value;
}

function shouldTranslateElement(element: HTMLElement | null) {
  if (!element) return false;
  if (ignoredParents.has(element.tagName)) return false;
  if (element.closest("[data-no-translate]")) return false;
  return true;
}

function translateDom(language: Language) {
  if (typeof document === "undefined" || !document.body) return;

  document.documentElement.lang = language;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!shouldTranslateElement(parent)) return NodeFilter.FILTER_REJECT;
      if (!normalizeText(node.nodeValue ?? "")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach((node) => {
    const next = translateValue(node.nodeValue ?? "", language);
    if (next !== node.nodeValue) {
      node.nodeValue = next;
    }
  });

  document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], [title], [alt], [data-label]").forEach((element) => {
    if (!shouldTranslateElement(element)) return;

    translatableAttributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;

      const next = translateValue(value, language);
      if (next !== value) {
        element.setAttribute(attribute, next);
      }
    });
  });
}

function scheduleRepeatedTranslations(callback: () => void) {
  const timeouts = [700, 1800, 3400].map((delay) => window.setTimeout(callback, delay));
  return () => timeouts.forEach((timeout) => window.clearTimeout(timeout));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const languageRef = useRef<Language>(defaultLanguage);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const initialLanguage = stored === "fr" || stored === "en" ? stored : defaultLanguage;

    languageRef.current = initialLanguage;
    setLanguageState(initialLanguage);
    document.documentElement.lang = initialLanguage;

    return scheduleRepeatedTranslations(() => {
      translateDom(languageRef.current);
    });
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    languageRef.current = nextLanguage;
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    translateDom(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "fr" ? "en" : "fr");
  }, [language, setLanguage]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      translateDom(language);
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [language, pathname]);

  useEffect(() => {
    let scheduled = false;
    let observer: MutationObserver | null = null;
    const scheduleTranslation = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        translateDom(languageRef.current);
      });
    };

    const timeout = window.setTimeout(() => {
      observer = new MutationObserver(scheduleTranslation);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [...translatableAttributes]
      });
    }, 2500);

    return () => {
      window.clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage
    }),
    [language, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
