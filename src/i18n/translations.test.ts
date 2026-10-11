import { describe, expect, it } from "vitest";
import { translations, langLabels } from "./translations";
import type { Lang, Translations } from "./types";

const LANGS: Lang[] = ["es", "en", "pt", "ca"];

/** Recorre un objeto y devuelve todas sus rutas hoja ("home.heroTitle", ...). */
const leafPaths = (value: unknown, prefix = ""): string[] => {
  if (Array.isArray(value)) return [`${prefix}[]`];
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([k, v]) => leafPaths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
};

const ES_KEYS = leafPaths(translations.es).sort();

describe("i18n", () => {
  it("tiene los cuatro idiomas con etiqueta", () => {
    expect(Object.keys(translations).sort()).toEqual([...LANGS].sort());
    for (const l of LANGS) expect(langLabels[l]).toBeTruthy();
  });

  // El español es el idioma origen: si a otro idioma le falta una clave, esa
  // parte de la interfaz se quedaria en blanco o en undefined.
  it.each(LANGS)("%s tiene exactamente las mismas claves que el español", (lang) => {
    expect(leafPaths(translations[lang]).sort()).toEqual(ES_KEYS);
  });

  it("no deja cadenas vacias en el contenido base de ningun idioma", () => {
    const base = (t: Translations) => [
      t.header.title,
      t.header.subtitle,
      t.home.heroTitle,
      t.home.ctaButton,
      t.footer.line1,
      t.footer.line3,
      t.untranslated,
      t.skipToContent,
    ];
    for (const l of LANGS) {
      for (const value of base(translations[l])) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("portugues y catalan heredan los bloques avanzados del espanol (avisado en la interfaz)", () => {
    for (const l of ["pt", "ca"] as Lang[]) {
      expect(translations[l].darkSide).toBe(translations.es.darkSide);
      expect(translations[l].clinical).toBe(translations.es.clinical);
      expect(translations[l].resources).toBe(translations.es.resources);
      // El aviso existe para no ocultar que ese contenido no esta traducido.
      expect(translations[l].untranslated).not.toBe(translations.es.untranslated);
    }
    // Español e ingles si tienen bloques propios y distintos entre si.
    expect(translations.en.darkSide).not.toBe(translations.es.darkSide);
    expect(translations.en.clinical).not.toBe(translations.es.clinical);
  });

  it("el ingles tiene su propio panel de accesibilidad traducido", () => {
    expect(translations.en.a11y?.open).not.toBe(translations.es.a11y?.open);
    expect(translations.en.a11y?.contrast).toBeTruthy();
  });
});
