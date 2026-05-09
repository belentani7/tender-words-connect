export type { Lang, Translations } from "./types";
export { langLabels } from "./types";
import type { Lang, Translations } from "./types";
import { langLabels } from "./types";
import { es } from "./es";
import { en } from "./en";
import { pt } from "./pt";
import { ca } from "./ca";
import { darkEs } from "./dark/es";
import { darkEn } from "./dark/en";

const merge = (base: Translations, dark: typeof darkEs): Translations => ({
  ...base,
  nav: { ...base.nav, ...dark.nav },
  tlpDolor: dark.tlpDolor,
  threshold: dark.threshold,
  darkSide: dark.darkSide,
});

export const translations: Record<Lang, Translations> = {
  es: merge(es, darkEs),
  en: merge(en, darkEn),
  pt: merge(pt, darkEs),
  ca: merge(ca, darkEs),
};
export { langLabels as langLabelsExport };
