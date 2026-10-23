import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AgentChat from "./AgentChat";

beforeEach(() => {
  // jsdom has no Element.scrollTo, but the chat scrolls on updates.
  HTMLElement.prototype.scrollTo = vi.fn();
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("AgentChat: mensajes sensibles", () => {
  it("restituye un mensaje fallido sin duplicarlo en el historial", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 503, ok: false, body: null });
    vi.stubGlobal("fetch", fetchMock);
    render(<AgentChat />);
    const input = screen.getByRole("textbox", { name: /escribe tu mensaje al agente/i });
    fireEvent.change(input, { target: { value: "Necesito hablar" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    await waitFor(() => expect(input).toHaveValue("Necesito hablar"));
    expect(screen.queryByText("Necesito hablar")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const [, request] = fetchMock.mock.calls[1];
    expect(JSON.parse(request.body).messages).toEqual([{ role: "user", content: "Necesito hablar" }]);
  });

  it("cambiar de simulador cancela la solicitud anterior y descarta su respuesta tardía", async () => {
    let resolveFetch!: (response: Response) => void;
    let signal!: AbortSignal;
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => {
      signal = init.signal as AbortSignal;
      return new Promise<Response>((resolve) => { resolveFetch = resolve; });
    }));
    render(<AgentChat />);
    fireEvent.change(screen.getByRole("textbox", { name: /escribe tu mensaje al agente/i }), {
      target: { value: "Texto privado" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
    expect(signal.aborted).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /paciente simulador/i }));
    expect(signal.aborted).toBe(true);

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"No debe mostrarse"}}]}\n\n'));
        controller.close();
      },
    });
    await act(async () => {
      resolveFetch(new Response(body, { status: 200 }));
    });
    expect(screen.getByText(/estoy aquí para que practiques/i)).toBeInTheDocument();
    expect(screen.queryByText(/No debe mostrarse/)).not.toBeInTheDocument();
    expect(screen.queryByText("Texto privado")).not.toBeInTheDocument();
  });
});
