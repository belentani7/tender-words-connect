// Utilidades HTTP compartidas por las funciones de Supabase (Deno).
//
// Regla de este archivo: cero dependencias externas. Se importa desde las
// funciones (que corren en Deno) y desde las pruebas (vitest), y así se puede
// probar el comportamiento HTTP sin arrancar Deno ni desplegar nada.

// ── CORS ─────────────────────────────────────────────────────────────────────
// La función de chat es pública por diseño: cualquiera puede hablar con los
// agentes. Responder con `Access-Control-Allow-Origin: *`, en cambio, dejaba
// que cualquier otra página web gastara los créditos de IA del proyecto desde
// el navegador de quien la visitara. Con una lista de hosts solo se responde a
// los orígenes propios y el resto recibe 403.
//
// `ALLOWED_ORIGINS` (variable de entorno de la función, separada por comas)
// manda sobre esta lista: si la app se publica en un dominio nuevo, se añade
// ahí y no hace falta tocar el código.

const DEFAULT_ALLOWED_HOSTS = [
  "tender-words-connect.lovable.app", // producción
  ".lovable.app", // vistas previas de Lovable
  ".lovableproject.com", // dominios de proyecto de Lovable
  ".e2b.app", // vistas previas de Arena
  "localhost", // desarrollo
  "127.0.0.1",
];

/** Convierte `ALLOWED_ORIGINS` en lista de hosts. Vacío o ausente -> valores por defecto. */
export function parseAllowedHosts(raw: string | null | undefined): string[] {
  if (!raw) return [...DEFAULT_ALLOWED_HOSTS];
  const list = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  return list.length > 0 ? list : [...DEFAULT_ALLOWED_HOSTS];
}

function hostOf(origin: string): string | null {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function hostIsAllowed(host: string, allowed: readonly string[]): boolean {
  return allowed.some((pattern) => {
    const candidate = pattern.toLowerCase();
    // Un patrón que empieza por punto cubre el dominio y sus subdominios;
    // los demás se comparan exactos, para que "localhost" no admita
    // "localhost.atacante.com".
    return candidate.startsWith(".") ? host.endsWith(candidate) : host === candidate;
  });
}

export type CorsDecision = {
  /** Si la petición puede seguir (se responde con cabeceras CORS útiles). */
  allowed: boolean;
  headers: Record<string, string>;
};

/**
 * Decide las cabeceras CORS de una petición.
 *
 * - `*` en la lista -> se permite cualquier origen (válvula de escape).
 * - Sin cabecera `Origin` no hay navegador de por medio (curl, clientes MCP,
 *   server-to-server): CORS no aplica y no se puede falsificar el origen.
 * - Origen no listado -> `allowed: false`, para no gastar créditos de IA en
 *   peticiones que llegan desde otras webs.
 */
export function corsFor(origin: string | null, allowed: readonly string[]): CorsDecision {
  const base: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Max-Age": "86400",
  };

  if (allowed.includes("*")) {
    return { allowed: true, headers: { ...base, "Access-Control-Allow-Origin": "*" } };
  }
  if (!origin) {
    return { allowed: true, headers: base };
  }

  const host = hostOf(origin);
  if (host !== null && hostIsAllowed(host, allowed)) {
    return {
      allowed: true,
      // Se devuelve el origen tal cual vino (con esquema y puerto): es lo que
      // espera el navegador, y `Vary` evita que una caché sirva la respuesta
      // equivocada a otro origen.
      headers: { ...base, "Access-Control-Allow-Origin": origin, Vary: "Origin" },
    };
  }

  return { allowed: false, headers: { ...base, Vary: "Origin" } };
}

// ── Identificación del cliente ───────────────────────────────────────────────

/** IP aproximada del cliente, para el límite de abuso. */
export function clientIp(req: { headers: { get(name: string): string | null } }): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "anon";
}

// ── Límite de abuso ──────────────────────────────────────────────────────────
// Deno levanta varias instancias de la misma función, así que el límite real
// es (instancias × límite). No es una cuota: es un freno para que un script no
// vacíe los créditos de IA de golpe. La cuota de verdad la pone la pasarela
// (402 y 429), que la aplicación ya sabe interpretar y explicar con cariño.

export type RateLimitResult = {
  ok: boolean;
  /** Peticiones que aún caben en la ventana (0 cuando `ok` es false). */
  remaining: number;
  /** Segundos hasta que se libera un hueco (0 cuando `ok` es true). */
  retryAfterSeconds: number;
};

export function createRateLimiter(options: { limit: number; windowMs: number }) {
  const { limit, windowMs } = options;
  const hits = new Map<string, number[]>();

  const sweep = (now: number) => {
    for (const [key, times] of hits) {
      const alive = times.filter((time) => time > now - windowMs);
      if (alive.length > 0) hits.set(key, alive);
      else hits.delete(key);
    }
  };

  return {
    /** `now` entra como parámetro para poder probar el paso del tiempo. */
    check(key: string, now: number): RateLimitResult {
      // El mapa no crece sin techo ni siquiera con IPs que no vuelven.
      if (hits.size > 5000) sweep(now);

      const alive = (hits.get(key) ?? []).filter((time) => time > now - windowMs);
      if (alive.length >= limit) {
        hits.set(key, alive);
        const oldest = Math.min(...alive);
        const wait = oldest + windowMs - now;
        return { ok: false, remaining: 0, retryAfterSeconds: Math.max(1, Math.ceil(wait / 1000)) };
      }

      alive.push(now);
      hits.set(key, alive);
      return { ok: true, remaining: limit - alive.length, retryAfterSeconds: 0 };
    },
    /** Para pruebas: vacía el contador. */
    reset(): void {
      hits.clear();
    },
  };
}

// ── Respuestas ───────────────────────────────────────────────────────────────

export function jsonResponse(
  body: unknown,
  init: { status?: number; headers?: Record<string, string> } = {},
): Response {
  return new Response(JSON.stringify(body), {
    status: init.status ?? 200,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}
