import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AgentChat from "./AgentChat";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

beforeEach(() => { vi.restoreAllMocks(); });

afterEach(() => { vi.unstubAllGlobals(); });

describe("AgentChat · privacy and resilience", () => {
  it("restores the text when the server rate-limits instead of duplicating a user bubble", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 429, ok: false }));
    render(<AgentChat />);
    fireEvent.change(screen.getByRole("textbox", { name: /escribe tu mensaje/i }), {
      target: { value: "Un texto importante que no quiero perder" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^enviar$/i }));
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: /escribe tu mensaje/i }))
        .toHaveValue("Un texto importante que no quiero perder"),
    );
    expect(screen.queryByText("Un texto importante que no quiero perder")).not.toBeInTheDocument();
  });

  it("cancels a pending request on changing the agent and ignores stale stream results", async () => {
    let aborted = false;
    const pending = new Promise<Response>(() => {});
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => {
      init.signal?.addEventListener("abort", () => { aborted = true; });
      return pending;
    }));
    render(<AgentChat />);
    fireEvent.change(screen.getByRole("textbox", { name: /escribe tu mensaje/i }), {
      target: { value: "No debe pasar al otro modo" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^enviar$/i }));
    fireEvent.click(screen.getByRole("button", { name: /pareja simuladora/i }));
    await waitFor(() => expect(aborted).toBe(true));
    expect(screen.queryByText("No debe pasar al otro modo")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /escribe tu mensaje/i })).toHaveValue("");
  });

  it("shows clear disclosure that messages are processed by an external AI provider", () => {
    render(<AgentChat />);
    expect(screen.getByText(/proveedor externo de IA/i)).toBeInTheDocument();
  });
});
