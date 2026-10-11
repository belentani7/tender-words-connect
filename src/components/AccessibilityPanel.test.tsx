import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LangProvider } from "@/hooks/useLang";
import AccessibilityPanel from "./AccessibilityPanel";

/** Fija el idioma antes de montar: en jsdom el navegador está en inglés. */
const renderPanel = (lang = "es") => {
  localStorage.setItem("abrazo-lang", lang);
  return render(
    <LangProvider>
      <AccessibilityPanel />
    </LangProvider>,
  );
};

afterEach(() => {
  localStorage.clear();
  document.body.className = "";
  document.documentElement.style.fontSize = "";
});

describe("AccessibilityPanel", () => {
  it("se abre como dialogo modal y se cierra con Escape", () => {
    renderPanel();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /abrir panel de accesibilidad/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("button", { name: /^cerrar$/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("los interruptores anuncian su estado con aria-pressed", () => {
    renderPanel();
    fireEvent.click(screen.getByRole("button", { name: /abrir panel de accesibilidad/i }));

    const contrast = screen.getByRole("button", { name: /alto contraste/i });
    expect(contrast).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(contrast);
    expect(contrast).toHaveAttribute("aria-pressed", "true");
    expect(document.body.classList.contains("a11y-contrast")).toBe(true);
  });

  it("el tamaño de texto se aplica al documento y se recuerda", () => {
    renderPanel();
    fireEvent.click(screen.getByRole("button", { name: /abrir panel de accesibilidad/i }));
    fireEvent.click(screen.getByRole("button", { name: "LG" }));

    expect(document.documentElement.style.fontSize).toBe("18px");
    expect(JSON.parse(localStorage.getItem("abrazo-a11y")!).fontSize).toBe("lg");
  });

  it("avisa cuando el idioma aún no tiene todo el contenido traducido", () => {
    renderPanel("pt");
    fireEvent.click(screen.getByRole("button", { name: /abrir panel de accesibilidad/i }));
    expect(screen.getByText(/blocos avançados/i)).toBeInTheDocument();
  });
});
