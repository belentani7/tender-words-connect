import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AgentChat from "./AgentChat";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

const encoder = new TextEncoder();

function typeAndSend(message: string) {
  fireEvent.change(screen.getByRole("textbox", { name: /escribe tu mensaje/i }), {
    target: { value: message },
  });
  fireEvent.click(screen.getByRole("button", { name: "Enviar" }));
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ABRAZO AgentChat reliability", () => {
  it("renders the streamed reply and explains third-party data processing", async () => {
    const sse = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"Hola "}}]}\n\n'));
        controller.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"qué tal"}}]}\n\n'));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    const call = vi.fn().mockResolvedValue({ ok: true, status: 200, body: sse });
    vi.stubGlobal("fetch", call);
    render(<AgentChat />);

    expect(screen.getByRole("note")).toHaveTextContent(/servicio externo de IA/);
    typeAndSend("Necesito practicar");
    expect(await screen.findByText("Hola qué tal")).toBeInTheDocument();
    expect(call).toHaveBeenCalledTimes(1);
  });

  it("restores a failed submission as a draft without duplicating it in the chat", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    render(<AgentChat />);
    typeAndSend("Un mensaje que no quiero perder");

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: /escribe tu mensaje/i }))
        .toHaveValue("Un mensaje que no quiero perder");
    });
    expect(screen.queryByText("Un mensaje que no quiero perder")).not.toBeInTheDocument();
  });

  it("cancels a pending request on reset and restores its text", async () => {
    let requestSignal: AbortSignal | undefined;
    vi.stubGlobal("fetch", vi.fn().mockImplementation((_url, options: RequestInit) => {
      requestSignal = options.signal as AbortSignal;
      return new Promise(() => {});
    }));
    render(<AgentChat />);
    typeAndSend("Mi experiencia");
    fireEvent.click(screen.getByRole("button", { name: /reiniciar conversación/i }));

    expect(requestSignal?.aborted).toBe(true);
    expect(screen.getByRole("textbox", { name: /escribe tu mensaje/i })).toHaveValue("Mi experiencia");
    expect(screen.queryByText("Mi experiencia")).not.toBeInTheDocument();
  });

  it("cancels the previous role's request when switching role", () => {
    let requestSignal: AbortSignal | undefined;
    vi.stubGlobal("fetch", vi.fn().mockImplementation((_url, options: RequestInit) => {
      requestSignal = options.signal as AbortSignal;
      return new Promise(() => {});
    }));
    render(<AgentChat />);
    typeAndSend("Practicar límites");
    fireEvent.click(screen.getByRole("button", { name: /paciente simulador/i }));

    expect(requestSignal?.aborted).toBe(true);
    expect(screen.getByRole("textbox", { name: /escribe tu mensaje/i })).toHaveValue("Practicar límites");
    expect(screen.getByRole("button", { name: /paciente simulador/i })).toHaveAttribute("aria-pressed", "true");
  });
});
