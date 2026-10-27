/**
 * Read the event stream produced by the ABRAZO chat gateway.
 *
 * SSE events may be split across arbitrary network chunks (including the middle
 * of a UTF-8 character). Only blank lines delimit events; a `data:` line by
 * itself is not guaranteed to contain a complete event.
 */
// Bound untrusted SSE payloads so a stuck or compromised gateway cannot grow
// a browser tab's memory without limit.
const MAX_EVENT_CHARS = 128 * 1024;
const MAX_REPLY_CHARS = 512 * 1024;

export async function readChatStream(
  stream: ReadableStream<Uint8Array>,
  onText: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines: string[] = [];
  let eventChars = 0;
  let fullText = "";
  let finished = false;

  const flushEvent = () => {
    if (dataLines.length === 0) return;
    const payload = dataLines.join("\n");
    dataLines = [];
    eventChars = 0;
    if (payload.trim() === "[DONE]") {
      finished = true;
      return;
    }

    let event: unknown;
    try {
      event = JSON.parse(payload);
    } catch {
      throw new Error("invalid_chat_event");
    }
    if (typeof event !== "object" || event === null) throw new Error("invalid_chat_event");
    const data = event as {
      error?: unknown;
      choices?: Array<{ delta?: { content?: unknown } }>;
    };
    if (data.error) throw new Error("gateway_chat_error");

    const delta = data.choices?.[0]?.delta?.content;
    if (typeof delta === "string" && delta.length > 0) {
      if (fullText.length + delta.length > MAX_REPLY_CHARS) throw new Error("chat_reply_too_large");
      fullText += delta;
      onText(fullText);
    }
  };

  const consume = (text: string) => {
    buffer += text;
    while (!finished) {
      const lineFeed = buffer.indexOf("\n");
      const carriageReturn = buffer.indexOf("\r");
      if (lineFeed === -1 && carriageReturn === -1) break;
      const end = lineFeed === -1
        ? carriageReturn
        : carriageReturn === -1
          ? lineFeed
          : Math.min(lineFeed, carriageReturn);
      // A CRLF delimiter can be split across network chunks; wait for LF.
      if (buffer[end] === "\r" && end + 1 === buffer.length) break;
      const delimiterLength = buffer[end] === "\r" && buffer[end + 1] === "\n" ? 2 : 1;
      const line = buffer.slice(0, end);
      if (line.length > MAX_EVENT_CHARS) throw new Error("chat_event_too_large");
      buffer = buffer.slice(end + delimiterLength);
      if (line === "") {
        flushEvent();
      } else if (line.startsWith("data:")) {
        const data = line.slice(5).replace(/^ /, "");
        eventChars += data.length + 1;
        if (eventChars > MAX_EVENT_CHARS) throw new Error("chat_event_too_large");
        dataLines.push(data);
      }
    }
    if (!finished && buffer.length > MAX_EVENT_CHARS) throw new Error("chat_event_too_large");
  };

  // A request may already have received headers when the user changes agent.
  // Aborting fetch alone is not enough on all browsers: cancel the body reader.
  const abortReader = () => { void reader.cancel().catch(() => undefined); };
  signal?.addEventListener("abort", abortReader, { once: true });
  try {
    if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    while (!finished) {
      const { done, value } = await reader.read();
      if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
      if (done) break;
      consume(decoder.decode(value, { stream: true }));
    }

    // Some servers finish without a final line break: process remaining text.
    if (!finished) {
      consume(decoder.decode());
      if (buffer) {
        consume("\n");
      }
      flushEvent();
    }
    if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    // An interrupted upstream stream must not be mistaken for a full answer.
    if (!finished) throw new Error("incomplete_chat_stream");
    return fullText;
  } finally {
    signal?.removeEventListener("abort", abortReader);
    // Release the upstream body on every exit, including malformed events,
    // gateway errors and truncated streams.
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
