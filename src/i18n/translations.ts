export type { Lang, Translations } from "./types";
export { langLabels } from "./types";
import type { Lang, Translations } from "./types";
import { es } from "./es";
import { en } from "./en";
import { pt } from "./pt";
import { ca } from "./ca";
import { darkEs } from "./dark/es";
import { darkEn } from "./dark/en";
import { extrasEs } from "./extras/es";
import { extrasEn } from "./extras/en";

// Portugués y catalán todavía no tienen bloques propios de «el otro lado»,
// clínica ni recursos, así que heredan los de español: es mejor mostrar el
// contenido completo en otro idioma que dejar secciones vacías. La interfaz lo
// avisa con `untranslated` en lugar de disimularlo.
const merge = (base: Translations, dark: typeof darkEs, extras: typeof extrasEs): Translations => ({
  ...base,
  nav: { ...base.nav, ...dark.nav, ...extras.nav },
  tlpDolor: dark.tlpDolor,
  threshold: dark.threshold,
  darkSide: dark.darkSide,
  clinical: extras.clinical,
  resources: extras.resources,
  news: extras.news,
  a11y: extras.a11y,
});

export const translations: Record<Lang, Translations> = {
  es: merge(es, darkEs, extrasEs),
  en: merge(en, darkEn, extrasEn),
  pt: merge(pt, darkEs, extrasEs),
  ca: merge(ca, darkEs, extrasEs),
};
