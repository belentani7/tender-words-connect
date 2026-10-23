/**
 * OpenAI-compatible SSE reader. A network chunk is not necessarily an SSE
 * event: JSON, CRLF, and multi-byte Unicode can all cross chunk boundaries.
 * Reject incomplete streams instead of presenting a partial response as final.
 */
export async function readChatStream(
  body: ReadableStream<Uint8Array>,
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let eventData: string[] = [];
  let fullText = "";
  let completed = false;

  const flushEvent = () => {
    if (eventData.length === 0) return;
    const data = eventData.join("\n");
    eventData = [];
    if (completed) return;
    if (data === "[DONE]") {
      completed = true;
      return;
    }
    let event: { choices?: Array<{ delta?: { content?: unknown } }>; error?: unknown };
    try {
      event = JSON.parse(data);
    } catch {
      throw new Error("La respuesta de IA llegó dañada o incompleta.");
    }
    if (!event || typeof event !== "object") {
      throw new Error("La respuesta de IA llegó dañada o incompleta.");
    }
    if (event.error) throw new Error("El proveedor de IA interrumpió la respuesta.");
    const delta = event.choices?.[0]?.delta?.content;
    if (typeof delta === "string" && delta.length > 0) {
      fullText += delta;
      onDelta(fullText);
    }
  };

  const handleLine = (raw: string) => {
    const line = raw.endsWith("\r") ? raw.slice(0, -1) : raw;
    if (line === "") {
      flushEvent();
    } else if (line.startsWith("data:")) {
      eventData.push(line.slice(5).trimStart());
    }
    // SSE comments and metadata (id, event, retry) are intentionally ignored.
  };

  const onAbort = () => { void reader.cancel().catch(() => undefined); };
  signal?.addEventListener("abort", onAbort, { once: true });
  try {
    if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    while (!completed) {
      const { done, value } = await reader.read();
      if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let lineEnd = buffer.indexOf("\n");
      while (lineEnd !== -1) {
        handleLine(buffer.slice(0, lineEnd));
        buffer = buffer.slice(lineEnd + 1);
        if (completed) break;
        lineEnd = buffer.indexOf("\n");
      }
    }
    if (!completed) {
      buffer += decoder.decode();
      if (buffer) handleLine(buffer);
      flushEvent();
    }
    if (!completed) throw new Error("La conexión se cerró antes de completar la respuesta.");
    if (!fullText.trim()) throw new Error("El proveedor no envió ningún mensaje.");
    return fullText;
  } finally {
    signal?.removeEventListener("abort", onAbort);
    // Si hay un error a mitad del flujo, cierra también el stream y libera la
    // conexión; no dejes una lectura de datos sensibles abierta en segundo plano.
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
