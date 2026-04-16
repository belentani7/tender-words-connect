export type { Lang, Translations } from "./types";
export { langLabels } from "./types";
import type { Lang, Translations } from "./types";
import { langLabels } from "./types";
import { es } from "./es";
import { en } from "./en";
import { pt } from "./pt";
import { ca } from "./ca";

export const translations: Record<Lang, Translations> = { es, en, pt, ca };
export { langLabels as langLabelsExport };
