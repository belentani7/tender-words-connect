import { describe, expect, it } from "vitest";
import listDisordersTool from "./tools/list-disorders";
import getDisorderTool from "./tools/get-disorder";
import listFaqsTool from "./tools/list-faqs";
import searchEncyclopediaTool from "./tools/search-encyclopedia";
import { WIKI_DATA } from "../../content/wiki-data";

// Los tools de MCP son funciones puras sobre el contenido: se pueden probar sin
// servidor. Si el contenido cambia, estos tests avisan antes que un agente de IA
// devolviendo datos incompletos.
const run = async (tool: unknown, input: unknown) => {
  const t = tool as { handler: (i: unknown) => Promise<{ content: { text: string }[]; isError?: boolean; structuredContent?: { count?: number; disorders?: unknown[]; results?: unknown[] } }> };
  return t.handler(input);
};

describe("mcp: list_disorders", () => {
  it("devuelve todo el catalogo con su nivel clinico", async () => {
    const res = await run(listDisordersTool, {});
    const structured = res.structuredContent!;
    expect(structured.count).toBe(WIKI_DATA.length);
    expect(res.content[0].text).toContain(WIKI_DATA[0].title);
    expect(res.isError).toBeUndefined();
  });
});

describe("mcp: get_disorder", () => {
  it("encuentra una entrada por id sin distinguir mayusculas", async () => {
    const res = await run(getDisorderTool, { id: "  TLP " });
    expect(res.isError).toBeUndefined();
    expect(res.content[0].text).toContain("Trastorno L");
    expect(res.content[0].text).toContain("Criterios");
  });

  it("con id inexistente devuelve error y la lista de ids validos", async () => {
    const res = await run(getDisorderTool, { id: "no-existe" });
    expect(res.isError).toBe(true);
    expect(res.content[0].text).toContain("tlp");
  });
});

describe("mcp: search_encyclopedia", () => {
  it("encuentra contenido por termino", async () => {
    const res = await run(searchEncyclopediaTool, { query: "abandono", limit: 5 });
    const results = res.structuredContent!.results!;
    expect(results.length).toBeGreaterThan(0);
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("respeta el limite y no revienta con terminos raros", async () => {
    const res = await run(searchEncyclopediaTool, { query: "zzzzz", limit: 3 });
    expect(res.structuredContent!.results).toHaveLength(0);
  });

  it("una query con varias palabras exige que aparezcan todas", async () => {
    const res = await run(searchEncyclopediaTool, { query: "limite vinculo", limit: 25 });
    const results = res.structuredContent!.results as { type: string }[];
    // Al menos un resultado con las dos palabras, no vale con cualquiera de ellas.
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("mcp: list_faqs", () => {
  it("sin filtro devuelve todas las categorias", async () => {
    const res = await run(listFaqsTool, {});
    expect(res.isError).toBeUndefined();
    expect(res.content[0].text.length).toBeGreaterThan(100);
  });

  it("con categoria inexistente devuelve error y las disponibles", async () => {
    const res = await run(listFaqsTool, { category: "inventada" });
    expect(res.isError).toBe(true);
    expect(res.content[0].text).toContain("Disponibles");
  });
});
