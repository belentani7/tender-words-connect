import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Lang, translations, Translations } from "@/i18n/translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType | null>(null);

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};

const LANGS: Lang[] = ["es", "en", "pt", "ca"];
const STORAGE_KEY = "abrazo-lang";

const isLang = (value: unknown): value is Lang =>
  typeof value === "string" && (LANGS as string[]).includes(value);

/**
 * Idioma de arranque. Antes siempre era español fijo, así que bastaba recargar
 * la página para perder el idioma elegido. Ahora se recuerda la elección y, si
 * todavía no hay ninguna, se respeta el idioma del navegador cuando es uno de
 * los cuatro que existen.
 */
const initialLang = (): Lang => {
  if (typeof window === "undefined") return "es";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
    const nav = window.navigator?.language?.slice(0, 2).toLowerCase();
    return isLang(nav) ? nav : "es";
  } catch {
    return "es";
  }
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* almacenamiento no disponible: el idioma simplemente no se recuerda */
    }
    // El atributo lang del documento lo leen los lectores de pantalla y los
    // traductores automáticos; mantenerlo sincronizado con el idioma visible
    // es lo que hace que la pronunciación sea la correcta.
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export type { Lang };
