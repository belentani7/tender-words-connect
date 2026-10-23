import { describe, expect, it, vi } from "vitest";
import { readChatStream } from "./chat-stream";

const chunks = (...parts: string[]): ReadableStream<Uint8Array> => {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      parts.forEach((part) => controller.enqueue(encoder.encode(part)));
      controller.close();
    },
  });
};

describe("readChatStream", () => {
  it("reconstructs JSON split between network chunks and accumulates deltas", async () => {
    const onDelta = vi.fn();
    const body = chunks(
      "data: {\"choices\":[{\"delta\":{\"con",
      "tent\":\"Hola\"}}]}\r\n\r",
      "\ndata: {\"choices\":[{\"delta\":{\"content\":\" mundo\"}}]}\n\n",
      "data: [DONE]\n\n",
    );
    await expect(readChatStream(body, onDelta)).resolves.toBe("Hola mundo");
    expect(onDelta.mock.calls.map(([value]) => value)).toEqual(["Hola", "Hola mundo"]);
  });

  it("decodes a UTF-8 character even when its bytes arrive separately", async () => {
    const bytes = new TextEncoder().encode('data: {"choices":[{"delta":{"content":"😀"}}]}\n\ndata: [DONE]\n\n');
    const emojiAt = bytes.indexOf(0xf0);
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.slice(0, emojiAt + 1));
        controller.enqueue(bytes.slice(emojiAt + 1));
        controller.close();
      },
    });
    await expect(readChatStream(body, vi.fn())).resolves.toBe("😀");
  });

  it("rejects a response that ends before [DONE]", async () => {
    await expect(readChatStream(chunks('data: {"choices":[{"delta":{"content":"solo parcial"}}]}\n\n'), vi.fn()))
      .rejects.toThrow(/antes de completar/);
  });

  it("does not silently discard invalid SSE JSON", async () => {
    await expect(readChatStream(chunks("data: {not-json}\n\ndata: [DONE]\n\n"), vi.fn()))
      .rejects.toThrow(/dañada/);
  });

  it("rejects empty completions and upstream error events", async () => {
    await expect(readChatStream(chunks("data: [DONE]\n\n"), vi.fn()))
      .rejects.toThrow(/ningún mensaje/);
    await expect(readChatStream(chunks('data: {"error":{"message":"failed"}}\n\n'), vi.fn()))
      .rejects.toThrow(/interrumpió/);
  });

  it("stops when the request is cancelled", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(readChatStream(chunks("data: [DONE]\n\n"), vi.fn(), controller.signal))
      .rejects.toMatchObject({ name: "AbortError" });
  });
});
