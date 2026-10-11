// Pruebas de las utilidades HTTP de las funciones de Supabase.
//
// No hace falta Deno ni desplegar nada: este archivo solo depende de tipos
// estándar, así que vitest lo ejecuta igual que el resto del proyecto.

import { describe, expect, it } from "vitest";
import {
  clientIp,
  corsFor,
  createRateLimiter,
  jsonResponse,
  parseAllowedHosts,
} from "./http.ts";

const PRODUCCION = "https://tender-words-connect.lovable.app";
const POR_DEFECTO = parseAllowedHosts(null);

describe("parseAllowedHosts", () => {
  it("usa la lista por defecto cuando no hay variable de entorno", () => {
    expect(parseAllowedHosts(undefined)).toEqual(POR_DEFECTO);
    expect(parseAllowedHosts("")).toEqual(POR_DEFECTO);
    expect(parseAllowedHosts("   ")).toEqual(POR_DEFECTO);
  });

  it("acepta la variable de entorno, limpia espacios e ignora entradas vacías", () => {
    expect(parseAllowedHosts(" https://mi-dominio.com , , https://otro.es ")).toEqual([
      "https://mi-dominio.com",
      "https://otro.es",
    ]);
  });

  it("la lista por defecto cubre producción, previas y desarrollo", () => {
    expect(POR_DEFECTO).toContain("tender-words-connect.lovable.app");
    expect(POR_DEFECTO).toContain(".lovable.app");
    expect(POR_DEFECTO).toContain("localhost");
  });
});

describe("corsFor", () => {
  it("devuelve el origen tal cual cuando está permitido", () => {
    const { allowed, headers } = corsFor(PRODUCCION, POR_DEFECTO);
    expect(allowed).toBe(true);
    expect(headers["Access-Control-Allow-Origin"]).toBe(PRODUCCION);
    expect(headers.Vary).toBe("Origin");
    expect(headers["Access-Control-Allow-Methods"]).toContain("POST");
  });

  it("admite los subdominios de los patronos con punto", () => {
    expect(corsFor("https://abc-123.lovable.app", POR_DEFECTO).allowed).toBe(true);
    expect(corsFor("https://vista-previa.e2b.app", POR_DEFECTO).allowed).toBe(true);
    expect(corsFor("http://localhost:8080", POR_DEFECTO).allowed).toBe(true);
  });

  it("no se deja engañar por dominios que solo se parecen", () => {
    expect(corsFor("https://lovable.app.atacante.com", POR_DEFECTO).allowed).toBe(false);
    expect(corsFor("https://mi-lovable.app", POR_DEFECTO).allowed).toBe(false);
    expect(corsFor("https://localhost.atacante.com", POR_DEFECTO).allowed).toBe(false);
    expect(corsFor("https://ejemplo.com", POR_DEFECTO).allowed).toBe(false);
  });

  it("sin cabecera Origin no hay navegador: se permite y no se inventa un origen", () => {
    const { allowed, headers } = corsFor(null, POR_DEFECTO);
    expect(allowed).toBe(true);
    expect(headers["Access-Control-Allow-Origin"]).toBeUndefined();
  });

  it("un origen no permitido no recibe cabecera que el navegador pueda usar", () => {
    const { allowed, headers } = corsFor("https://ejemplo.com", POR_DEFECTO);
    expect(allowed).toBe(false);
    expect(headers["Access-Control-Allow-Origin"]).toBeUndefined();
  });

  it("el comodín sigue disponible como válvula de escape", () => {
    const { allowed, headers } = corsFor("https://cualquiera.com", ["*"]);
    expect(allowed).toBe(true);
    expect(headers["Access-Control-Allow-Origin"]).toBe("*");
  });
});

describe("clientIp", () => {
  const como = (entries: Record<string, string>) => ({ headers: new Map(Object.entries(entries)) });

  it("toma la primera IP de x-forwarded-for", () => {
    expect(clientIp(como({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }))).toBe("1.2.3.4");
  });

  it("recurre a x-real-ip y finalmente a «anon»", () => {
    expect(clientIp(como({ "x-real-ip": "5.6.7.8" }))).toBe("5.6.7.8");
    expect(clientIp(como({}))).toBe("anon");
  });
});

describe("createRateLimiter", () => {
  it("deja pasar hasta el límite y corta justo después", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect(limiter.check("ip", 0)).toEqual({ ok: true, remaining: 2, retryAfterSeconds: 0 });
    expect(limiter.check("ip", 100)).toEqual({ ok: true, remaining: 1, retryAfterSeconds: 0 });
    expect(limiter.check("ip", 200)).toEqual({ ok: true, remaining: 0, retryAfterSeconds: 0 });
    const bloqueado = limiter.check("ip", 300);
    expect(bloqueado.ok).toBe(false);
    expect(bloqueado.remaining).toBe(0);
    expect(bloqueado.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("la ventana se libera con el tiempo", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("ip", 0).ok).toBe(true);
    expect(limiter.check("ip", 999).ok).toBe(false);
    expect(limiter.check("ip", 1001).ok).toBe(true);
  });

  it("cada cliente cuenta por separado", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("una-ip", 0).ok).toBe(true);
    expect(limiter.check("otra-ip", 0).ok).toBe(true);
    expect(limiter.check("una-ip", 1).ok).toBe(false);
  });

  it("no retiene golpes antiguos para siempre", () => {
    const limiter = createRateLimiter({ limit: 100, windowMs: 1000 });
    for (let i = 0; i < 50; i += 1) limiter.check(`ip-${i}`, 0);
    // Pasada la ventana, todos esos golpes caducan y el mapa se vacía.
    expect(limiter.check("ip-nueva", 100000)).toEqual({ ok: true, remaining: 99, retryAfterSeconds: 0 });
    expect(limiter.check("ip-0", 100000).ok).toBe(true);
  });
});

describe("jsonResponse", () => {
  it("serializa el cuerpo y respeta el estado", async () => {
    const res = jsonResponse({ error: "rate_limit" }, { status: 429, headers: { "Retry-After": "7" } });
    expect(res.status).toBe(429);
    expect(res.headers.get("Content-Type")).toBe("application/json");
    expect(res.headers.get("Retry-After")).toBe("7");
    expect(await res.json()).toEqual({ error: "rate_limit" });
  });

  it("por defecto responde 200", () => {
    expect(jsonResponse({ ok: true }).status).toBe(200);
  });
});
