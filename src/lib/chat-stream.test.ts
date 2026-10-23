import { describe, expect, it, vi } from "vitest";
import { readChatStream } from "./chat-stream";

const sse = (value: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content: value } }] })}\r\n\r\n`;

function response(chunks: Uint8Array[]): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
}

describe("readChatStream", () => {
  const encoder = new TextEncoder();
  it("reconstruye eventos y caracteres UTF-8 fragmentados incluso con CRLF", async () => {
    const raw = encoder.encode(sse("Hola ") + sse("😊") + "data: [DONE]\r\n\r\n");
    const parts = Array.from(raw, (byte) => new Uint8Array([byte]));
    const values: string[] = [];
    await readChatStream(response(parts), (delta) => values.push(delta));
    expect(values.join("")).toBe("Hola 😊");
  });

  it("procesa el último evento incluso si se cierra sin salto de línea", async () => {
    const values: string[] = [];
    await readChatStream(response([encoder.encode(sse("Uno") + `data: ${JSON.stringify({ choices: [{ delta: { content: " dos" } }] })}`)]), (delta) => values.push(delta));
    expect(values.join("")).toBe("Uno dos");
  });

  it("ignora comentarios y eventos sin contenido, pero no el texto", async () => {
    const values: string[] = [];
    await readChatStream(response([encoder.encode(": keepalive\n\ndata: {}\n\n" + sse("OK"))]), (delta) => values.push(delta));
    expect(values).toEqual(["OK"]);
  });

  it("señala los errores emitidos dentro del stream", async () => {
    const onDelta = vi.fn();
    await expect(readChatStream(response([encoder.encode('data: {"error":"provider offline"}\n\n')]), onDelta))
      .rejects.toThrow(/interrumpió/);
    expect(onDelta).not.toHaveBeenCalled();
  });

  it("rechaza las respuestas vacías para permitir reintentar sin perder el mensaje", async () => {
    await expect(readChatStream(response([encoder.encode("data: [DONE]\n\n")]), () => undefined))
      .rejects.toThrow(/no devolvió contenido/);
  });

  it("respeta el aborto antes de leer datos personales", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(readChatStream(response([]), () => undefined, controller.signal))
      .rejects.toMatchObject({ name: "AbortError" });
  });
});
