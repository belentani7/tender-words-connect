import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AgentChat from "@/components/AgentChat";

describe("AgentChat remote processing policy", () => {
  it("does not enable submission before remote processing and consent are explicit", () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    render(<AgentChat />);

    fireEvent.change(screen.getByPlaceholderText("Escribe aquí…"), {
      target: { value: "Contenido emocional privado" },
    });

    expect(screen.getByRole("button", { name: "Enviar" })).toBeDisabled();
    expect(screen.getByText(/procesamiento externo desactivado/i)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
