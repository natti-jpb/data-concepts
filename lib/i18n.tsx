"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Lang, type Strings } from "./dictionary";

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Strings;
}

const I18nContext = createContext<I18nValue | null>(null);
const STORAGE_KEY = "dc-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server and first client render both use "pt" → no hydration mismatch.
  // A stored preference is applied after mount via the effect below.
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  const toggle = () => setLang(lang === "pt" ? "en" : "pt");

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t: dictionary[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider");
  return ctx;
}
