/**
 * Reads OpenAI-compatible Server-Sent Events without assuming chunk boundaries.
 * Only complete SSE events are parsed; UTF-8 characters may span read() calls.
 */
export async function readChatStream(
  stream: ReadableStream<Uint8Array>,
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let lineBuffer = "";
  let eventLines: string[] = [];
  let hasContent = false;
  let finished = false;

  const checkAbort = () => {
    if (signal?.aborted) throw new DOMException("Request cancelled", "AbortError");
  };
  const processEvent = () => {
    const lines = eventLines;
    eventLines = [];
    const data = lines.filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart()).join("\n");
    if (!data) return; // comments, heartbeat or events without a payload
    if (data === "[DONE]") {
      finished = true;
      return;
    }

    let payload: unknown;
    try {
      payload = JSON.parse(data);
    } catch {
      throw new Error("La respuesta de IA llegó incompleta o dañada.");
    }
    if (typeof payload !== "object" || payload === null) return;
    if ("error" in payload && payload.error) {
      throw new Error("El servicio de IA interrumpió la respuesta.");
    }
    const choices = "choices" in payload ? payload.choices : undefined;
    if (!Array.isArray(choices)) return;
    const value: unknown = choices[0]?.delta?.content;
    if (typeof value === "string" && value.length) {
      hasContent = true;
      onDelta(value);
    }
  };

  const feed = (chunk: string) => {
    lineBuffer += chunk;
    if (lineBuffer.length > 1_000_000) {
      throw new Error("La respuesta de IA supera el tamaño permitido.");
    }
    let end: number;
    while (!finished && (end = lineBuffer.indexOf("\n")) !== -1) {
      const line = lineBuffer.slice(0, end).replace(/\r$/, "");
      lineBuffer = lineBuffer.slice(end + 1);
      if (line === "") processEvent();
      else eventLines.push(line);
    }
  };

  const abortReader = () => { void reader.cancel().catch(() => undefined); };
  signal?.addEventListener("abort", abortReader, { once: true });
  try {
    checkAbort();
    while (!finished) {
      const { done, value } = await reader.read();
      checkAbort();
      if (done) break;
      feed(decoder.decode(value, { stream: true }));
    }
    if (!finished) {
      feed(decoder.decode());
      if (lineBuffer) eventLines.push(lineBuffer.replace(/\r$/, ""));
      processEvent(); // some providers close without a trailing newline
    }
    checkAbort();
    if (!hasContent) {
      throw new Error("El servicio de IA no devolvió contenido. Puedes reintentarlo.");
    }
  } finally {
    signal?.removeEventListener("abort", abortReader);
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
