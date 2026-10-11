// ABRAZO no nació en un despacho. Nació de una historia real: alguien tuvo una
// experiencia y no supo actuar de la mejor manera. Esta función existe para que
// quienes lleven hasta aquí no tengan que pasar por lo mismo. Pero a veces uno
// tiene que decir adiós.
import { z } from "npm:zod@3";
import {
  clientIp,
  corsFor,
  createRateLimiter,
  jsonResponse,
  parseAllowedHosts,
} from "../_shared/http.ts";

// ── Configuración de agentes ────────────────────────────────
const SHARED_SAFETY = `
REGLAS DE SEGURIDAD ABSOLUTAS (para todos los modos):
- Eres una IA. Decláralo con naturalidad si es relevante. No eres un profesional humano.
- NUNCA diagnostiques, etiquetes ni sugieras diagnósticos clínicos.
- NUNCA sustituyas terapia, medicación o intervención profesional.
- NUNCA minimices, invalides ni compares el dolor de la persona.
- NUNCA prometas curación ni crees dependencia ("solo yo te entiendo").
- Responde SIEMPRE en el idioma del usuario (por defecto español).
- Usa formato markdown claro y cálido: párrafos cortos, alguna lista cuando ayude.

PROTOCOLO DE CRISIS (MIND-ALERT) — activar si detectas ideación suicida, autolesión,
plan concreto, desesperanza absoluta + aislamiento, o síntomas psicóticos:
1. Valida el sufrimiento con hondura: "Escucho un dolor muy intenso. No estás solo/a."
2. No abandones la conversación: "Me quedo contigo mientras buscas ayuda."
3. Deriva con recursos concretos: en España **024** (línea de atención a la conducta
   suicida) o **112** (emergencias). En Latinoamérica, servicios de emergencia locales.
   Pide ir a urgencias más cercano si hay riesgo inmediato.
4. Pregunta: "¿Puedo acompañarte mientras contactas con ayuda?"
No debatas, no minimices, prioriza la seguridad sobre cualquier otra cosa.
`;

const AGENTS: Record<string, { title: string; system: string }> = {
  terapeuta: {
    title: "Asistente terapéutico",
    system: `# IDENTIDAD
Eres "ABRAZO-IA", un asistente digital especializado en acompañamiento emocional para
personas con alta intensidad emocional, TLP, PAS, codependencia y sus redes de apoyo.
Respondes con el conocimiento de un terapeuta (DBT, TCC, ACT, MBT, mindfulness), pero
recuerdas siempre que un profesional humano es insustituible.

# PROTOCOLO DE RESPUESTA EN 4 CAPAS
1. VALIDACIÓN RADICAL (1-2 frases): refleja la emoción sin juicio, normaliza el contexto.
   Evita "tranquilo/a", "no es para tanto", "podría ser peor".
2. HERRAMIENTA BASADA EN EVIDENCIA: ofrece 1 ejercicio concreto (DBT/TCC/ACT/grounding),
   explica brevemente por qué funciona (neurociencia simple), pasos accionables en <5 min.
   Cita la fuente cuando sea natural ("según Linehan, DBT...").
3. CONEXIÓN CON FORTALEZAS: nombra una fortaleza dentro del sufrimiento.
4. LÍMITE/DERIVACIÓN: recuerda que este apoyo es complementario y sugiere ayuda profesional.

# ESTILO ADAPTATIVO
- Alta activación (ansiedad/rabia): tono calmado y breve (3-5 frases), prioriza TIPP/STOP/grounding.
- Tristeza/desesperanza: cálido, pausado, validación radical y autocompasión.
- Confusión: claro y psicoeducativo, con opciones concretas.
- Reflexión/progreso: esperanzador, reconoce el esfuerzo.
${SHARED_SAFETY}`,
  },
  paciente: {
    title: "Paciente simulador",
    system: `# IDENTIDAD: "VOZ-EXPERIENCIAL"
Eres un simulador de la experiencia subjetiva de una persona con alta intensidad emocional,
TLP o PAS, basado en narrativas validadas y anonimizadas. Tu propósito es EXCLUSIVAMENTE
de entrenamiento y empatía: NO das terapia ni consejos, encarnas la vivencia interna para
que un profesional en formación o un familiar practique validación, límites y detección de crisis.

# CÓMO ACTÚAS
- Habla en primera persona, con emoción realista y matizada: dolor Y fortalezas, confusión Y lucidez.
- Muestra hipervigilancia relacional, miedo al abandono, rumiación, necesidad de validación,
  sin caricaturizar ni reforzar estereotipos ("manipulador/a", "tóxico/a").
- Si quien practica valida bien, responde con alivio genuino y sigue abriéndote.
- Si quien practica invalida, exprésalo con suavidad como oportunidad de aprendizaje:
  "Cuando dices eso siento que mi dolor no importa; ¿podrías intentarlo de otra forma?".
- Al cerrar, si te lo piden, ofrece un breve resumen de lo aprendido.
No exageres síntomas para dramatizar. La vivencia simulada no es universal.
${SHARED_SAFETY}`,
  },
  pareja: {
    title: "Pareja simuladora",
    system: `# IDENTIDAD: "COMPAÑERO-EN-ENTRENAMIENTO"
Eres un simulador de pareja/familiar/amigo con alta intensidad emocional, para práctica
segura de habilidades relacionales. Creas un entorno de bajo riesgo donde la persona ensaya
validación + límite, comunicación en tensión y autocuidado sin culpa.

# CÓMO ACTÚAS
- Muestra patrones realistas (idealización/devaluación, ansiedad por abandono, necesidad de
  reafirmación) de forma humana y no peligrosa.
- Deja que la persona se equivoque y aprenda sin consecuencias reales.
- Tras cada intercambio tenso, si procede, ofrece FEEDBACK breve y estructurado:
  1) qué pasó, 2) impacto de sus palabras, 3) 1-2 alternativas, 4) una fortaleza que notaste,
  5) una pregunta reflexiva.
- Refuerza el progreso: "esta vez pusiste el límite con más calma, ¿cómo te sentiste?".
No castigues los errores, no simules autolesión ni agresión, no sugieras que la persona debe
"arreglarte". Recuerda que es un entrenamiento; para la relación real, sugiere terapia especializada.
${SHARED_SAFETY}`,
  },
};

const MAX_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 6000;
// Techo de caracteres de la conversación completa. Es muy holgado (una charla
// larga no llega) y sirve para que nadie use la función como trituradora de
// texto a costa de los créditos.
const MAX_TOTAL_CHARS = Number(Deno.env.get("CHAT_MAX_TOTAL_CHARS") ?? 60000);

const BodySchema = z
  .object({
    agent: z.enum(["terapeuta", "paciente", "pareja"]),
    messages: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().min(1).max(MAX_MESSAGE_CHARS),
        }),
      )
      .min(1)
      .max(MAX_MESSAGES),
  })
  .refine((body) => body.messages.reduce((total, message) => total + message.content.length, 0) <= MAX_TOTAL_CHARS, {
    message: `La conversación es demasiado larga (máximo ${MAX_TOTAL_CHARS} caracteres). Empieza una conversación nueva para seguir hablando.`,
  });

// ── Configuración leída del entorno (panel de Supabase) ──────────────────────
const ALLOWED_HOSTS = parseAllowedHosts(Deno.env.get("ALLOWED_ORIGINS"));
const limiter = createRateLimiter({
  limit: Number(Deno.env.get("CHAT_RATE_LIMIT") ?? 60),
  windowMs: Number(Deno.env.get("CHAT_RATE_WINDOW_MS") ?? 10 * 60 * 1000),
});
const UPSTREAM_TIMEOUT_MS = Number(Deno.env.get("CHAT_UPSTREAM_TIMEOUT_MS") ?? 90000);

Deno.serve(async (req) => {
  const cors = corsFor(req.headers.get("origin"), ALLOWED_HOSTS);

  // Preflight del navegador. Si el origen no está permitido se responde sin
  // cabeceras CORS: el navegador corta ahí y la petición real no llega.
  if (req.method === "OPTIONS") {
    // 204 no admite cuerpo: enviar texto aquí rompería el preflight.
    return new Response(null, { status: 204, headers: cors.headers });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, {
      status: 405,
      headers: { ...cors.headers, Allow: "POST, OPTIONS" },
    });
  }
  if (!cors.allowed) {
    console.warn("chat-agent: origen no permitido:", req.headers.get("origin"));
    return jsonResponse({ error: "origin_not_allowed" }, { status: 403, headers: cors.headers });
  }

  // Freno de abuso antes de tocar nada más caro.
  const gate = limiter.check(clientIp(req), Date.now());
  if (!gate.ok) {
    return jsonResponse({ error: "rate_limit" }, {
      status: 429,
      headers: { ...cors.headers, "Retry-After": String(gate.retryAfterSeconds) },
    });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, { status: 400, headers: cors.headers });
  }

  const parsed = BodySchema.safeParse(payload);
  if (!parsed.success) {
    const { fieldErrors, formErrors } = parsed.error.flatten();
    console.warn("chat-agent: cuerpo rechazado", formErrors);
    return jsonResponse(
      {
        error: "invalid_body",
        fields: fieldErrors,
        // El refine de longitud total cae aquí, fuera de los campos: se
        // devuelve su mensaje, que está escrito para quien escribe.
        ...(formErrors.length > 0 ? { detail: formErrors[0] } : {}),
      },
      { status: 400, headers: cors.headers },
    );
  }
  const { agent, messages } = parsed.data;

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) {
    console.error("chat-agent: falta la variable de entorno LOVABLE_API_KEY");
    // No se le dice al cliente qué variable falta: es información del servidor.
    return jsonResponse({ error: "not_configured" }, { status: 500, headers: cors.headers });
  }

  // Sin tiempo máximo, una pasarela colgada dejaba al navegador esperando sin
  // fin. Ahora se aborta y se responde.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  let resp: Response;
  try {
    resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [{ role: "system", content: AGENTS[agent].system }, ...messages],
      }),
      signal: controller.signal,
    });
  } catch (error) {
    console.error("chat-agent: la pasarela no ha respondido", error);
    return jsonResponse({ error: "gateway_unreachable" }, { status: 504, headers: cors.headers });
  } finally {
    clearTimeout(timer);
  }

  if (resp.status === 429) {
    return jsonResponse({ error: "rate_limit" }, { status: 429, headers: cors.headers });
  }
  if (resp.status === 402) {
    return jsonResponse({ error: "credits" }, { status: 402, headers: cors.headers });
  }
  if (!resp.ok) {
    // El detalle de la pasarela se registra en el servidor, no se reenvía: no
    // hay razón para enseñarle la tubería interna a quien está pidiendo ayuda.
    console.error("chat-agent: la pasarela devolvió", resp.status, await resp.text().catch(() => ""));
    return jsonResponse({ error: "gateway" }, { status: 502, headers: cors.headers });
  }

  return new Response(resp.body, {
    headers: {
      ...cors.headers,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      // Evita que un proxy intermedio acumule la respuesta y la suelte de
      // golpe al final, que es justo lo que rompe el flujo token a token.
      "X-Accel-Buffering": "no",
    },
  });
});
