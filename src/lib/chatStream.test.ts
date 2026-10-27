import { describe, expect, it, vi } from "vitest";
import { readChatStream } from "./chatStream";

const encoder = new TextEncoder();
const streamed = (pieces: Uint8Array[]) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      for (const piece of pieces) controller.enqueue(piece);
      controller.close();
    },
  });

const event = (text: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`;

describe("ABRAZO chat SSE reader", () => {
  it("reconstructs arbitrarily split events and UTF-8 code points", async () => {
    const all = encoder.encode(event("á💛") + event(" bien") + "data: [DONE]\r\n\r\n");
    const chunks = Array.from(all, (byte) => new Uint8Array([byte]));
    const receive = vi.fn();

    const text = await readChatStream(streamed(chunks), receive);
    expect(text).toBe("á💛 bien");
    expect(receive).toHaveBeenLastCalledWith("á💛 bien");
  });

  it("supports multiline SSE data and ignores comments and metadata", async () => {
    const response =
      ": keepalive\n\n" +
      'event: message\ndata: {"choices":[\ndata: {"delta":{"content":"Hola"}}]}\n\n' +
      "data: [DONE]\n\n";
    expect(await readChatStream(streamed([encoder.encode(response)]), () => {})).toBe("Hola");
  });

  it("processes a final DONE event even without the trailing newline", async () => {
    expect(await readChatStream(streamed([encoder.encode(event("Hola") + "data: [DONE]")]), () => {})).toBe("Hola");
  });

  it("accepts lone CR line endings in SSE events", async () => {
    const response = event("Hola").replace(/\n/g, "\r") + "data: [DONE]\r\r";
    expect(await readChatStream(streamed([encoder.encode(response)]), () => {})).toBe("Hola");
  });

  it("cancels the reader when event parsing fails", async () => {
    let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode("data: {\n\n"));
      },
      cancel() {
        cancelled = true;
      },
    });
    await expect(readChatStream(stream, () => {})).rejects.toThrow("invalid_chat_event");
    expect(cancelled).toBe(true);
  });

  it("rejects truncated streams rather than treating a partial reply as complete", async () => {
    const receive = vi.fn();
    await expect(readChatStream(streamed([encoder.encode(event("Mitad"))]), receive))
      .rejects.toThrow("incomplete_chat_stream");
    expect(receive).toHaveBeenCalledWith("Mitad");
  });

  it("rejects malformed events and explicit gateway errors", async () => {
    await expect(readChatStream(streamed([encoder.encode("data: {\n\n")]), () => {}))
      .rejects.toThrow("invalid_chat_event");
    await expect(readChatStream(
      streamed([encoder.encode('data: {"error":{"message":"private"}}\n\n')]),
      () => {},
    )).rejects.toThrow("gateway_chat_error");
  });

  it("stops reading when a pending request is cancelled", async () => {
    let wasCancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      cancel() { wasCancelled = true; },
    });
    const controller = new AbortController();
    const pending = readChatStream(stream, () => {}, controller.signal);
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(wasCancelled).toBe(true);
  });
  it("rejects an oversized unterminated SSE line instead of buffering indefinitely", async () => {
    const input = "data: " + "x".repeat(150_000);
    await expect(readChatStream(streamed([encoder.encode(input)]), () => {}))
      .rejects.toThrow("chat_event_too_large");
  });

  it("bounds multiline SSE event data before parsing JSON", async () => {
    const input = Array.from({ length: 5 }, () => "data: " + "a".repeat(30_000) + "\n").join("");
    await expect(readChatStream(streamed([encoder.encode(input)]), () => {}))
      .rejects.toThrow("chat_event_too_large");
  });

  it("rejects oversized aggregate replies without presenting the excess text", async () => {
    const chunks = Array.from({ length: 6 }, () => event("a".repeat(100_000)));
    const onText = vi.fn();
    await expect(readChatStream(streamed([encoder.encode(chunks.join("") + "data: [DONE]\\n\\n")]), onText))
      .rejects.toThrow("chat_reply_too_large");
    expect(onText).toHaveBeenCalledTimes(5);
    expect(onText.mock.lastCall?.[0]).toHaveLength(500_000);
  });

});
