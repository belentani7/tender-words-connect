import { defineMcp } from "@lovable.dev/mcp-js";
import listDisordersTool from "./tools/list-disorders";
import getDisorderTool from "./tools/get-disorder";
import searchEncyclopediaTool from "./tools/search-encyclopedia";
import listFaqsTool from "./tools/list-faqs";

// `allowedOrigins` se omite a propósito: el valor por omisión solo admite
// peticiones del mismo origen y de clientes que no son navegadores, que es lo
// que queremos para un servidor MCP público. Escribir "any" aquí abriría el
// servidor a cualquier página web que hable con él desde el navegador de quien
// la visita.
export default defineMcp({
  name: "abrazo-encyclopedia-mcp",
  title: "ABRAZO · Encyclopedia of Dynamics",
  version: "0.1.0",
  instructions:
    "Public, Spanish-first reference on mental-health disorders and their relationship dynamics (couples, family, friends, colleagues). Use `search_encyclopedia` to find relevant content, `list_disorders` to browse the catalog, `get_disorder` for a full clinical entry by id, and `list_faqs` for common questions about boundaries, manipulation and asking for help. This is educational content, not a diagnosis or a substitute for professional care.",
  tools: [searchEncyclopediaTool, listDisordersTool, getDisorderTool, listFaqsTool],
});