import { describe, expect, it } from "vitest";
import {
  WIKI_DATA,
  DUDAS,
  CLINICAL_LEVELS,
  WIKI_DISCLAIMER,
} from "./wiki-data";
import {
  SKILL_CARDS,
  ATTACH_ITEMS,
  ATTACH_RESULTS,
  RELATION_CHECK,
  CHECK_TIERS,
  CRISIS_FIELDS,
  TOOLKIT_DISCLAIMER,
} from "./toolkit-data";

describe("wiki-data", () => {
  it("no repite identificadores de trastorno", () => {
    const ids = WIKI_DATA.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cada entrada trae el contenido minimo para renderizarse", () => {
    for (const d of WIKI_DATA) {
      expect(d.id).toMatch(/^[a-z0-9-]+$/); // se usa en la URL /enciclopedia/:id
      expect(d.title.trim()).not.toBe("");
      expect(d.short.trim()).not.toBe("");
      expect(d.summary.trim()).not.toBe("");
      expect(d.tags.length).toBeGreaterThan(0);
      expect(d.sections.length).toBeGreaterThan(0);
      expect(d.dynamics.length).toBeGreaterThan(0);
      expect(d.care.length).toBeGreaterThan(0);
      expect(CLINICAL_LEVELS[d.clinicalLevel]).toBeTruthy();
      for (const s of d.sections) expect(s.id.trim()).not.toBe("");
    }
  });

  // La portada de la enciclopedia promete dinamica en pareja, amistad, familia
  // y trabajo: si a una entrada le falta un contexto, esa promesa se rompe.
  it("cada entrada cubre los cuatro contextos relacionales", () => {
    for (const d of WIKI_DATA) {
      const contexts = d.dynamics.map((x) => x.context);
      expect(new Set(contexts).size).toBe(contexts.length); // sin repetir
      expect(contexts.length).toBeGreaterThanOrEqual(4);
      for (const expected of ["Pareja", "Amistad", "Familia", "Colega"]) {
        expect(contexts.some((c) => c.startsWith(expected))).toBe(true);
      }
      for (const x of d.dynamics) expect(x.desc.trim().length).toBeGreaterThan(20);
    }
  });

  it("las categorias de dudas tienen id unico y preguntas con respuesta", () => {
    const ids = DUDAS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    let total = 0;
    for (const c of DUDAS) {
      expect(c.questions.length).toBeGreaterThan(0);
      total += c.questions.length;
      for (const qa of c.questions) {
        expect(qa.q.trim()).not.toBe("");
        expect(qa.a.trim()).not.toBe("");
      }
    }
    expect(total).toBeGreaterThan(30);
  });

  // Sin acentos, para que la comprobacion no dependa de la tilde.
  const plain = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  it("los disclaimers recuerdan que esto no diagnostica", () => {
    expect(plain(WIKI_DISCLAIMER)).toContain("diagnost");
    expect(plain(TOOLKIT_DISCLAIMER)).toContain("diagnost");
  });
});

describe("toolkit-data", () => {
  it("las fichas DBT tienen acronimo, modulo valido y pasos", () => {
    const modules = new Set([
      "Mindfulness",
      "Tolerancia al malestar",
      "Regulación emocional",
      "Eficacia interpersonal",
    ]);
    for (const c of SKILL_CARDS) {
      expect(c.acronym.trim()).not.toBe("");
      expect(modules.has(c.module)).toBe(true);
      expect(c.steps.length).toBeGreaterThan(1);
      for (const s of c.steps) {
        expect(s.k.trim()).not.toBe("");
        expect(s.v.trim()).not.toBe("");
      }
    }
  });

  it("el test de apego cubre las dos dimensiones y todos los resultados", () => {
    const dims = new Set(ATTACH_ITEMS.map((i) => i.dim));
    expect(dims).toEqual(new Set(["ansioso", "evitativo"]));
    expect(ATTACH_ITEMS.length).toBeGreaterThanOrEqual(10);
    for (const style of ["seguro", "ansioso", "evitativo", "desorganizado"] as const) {
      expect(ATTACH_RESULTS[style].title.trim()).not.toBe("");
      expect(ATTACH_RESULTS[style].work.length).toBeGreaterThan(0);
    }
  });

  it("los niveles del autochequeo son progresivos y cubren cualquier marcado", () => {
    const maxes = CHECK_TIERS.map((t) => t.max);
    expect([...maxes].sort((a, b) => a - b)).toEqual(maxes); // ordenados
    expect(maxes[maxes.length - 1]).toBeGreaterThanOrEqual(RELATION_CHECK.length); // siempre hay nivel
    for (const marked of [0, 1, 5, 12, 99]) {
      expect(CHECK_TIERS.find((t) => marked <= t.max)).toBeDefined();
    }
  });

  it("el plan de crisis tiene identificadores unicos", () => {
    const ids = CRISIS_FIELDS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of CRISIS_FIELDS) expect(f.label.trim()).not.toBe("");
  });

});
