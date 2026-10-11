import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LangProvider } from "@/hooks/useLang";
import Index from "./Index";

// Recorrer todas las secciones en español: si algún bloque revienta al montar
// (un campo que falta en la traducción, un dato ausente), este test lo ve.
const SECTIONS = [
  "Entender",
  "Patrones",
  "Herramientas",
  "Límites",
  "Para los Dos",
  "¿Y si soy yo?",
  "Historia",
  "Preguntas",
  "Glosario",
  "Despedida",
  "Comunidad",
  "Su dolor",
  "Clínico",
  "Recursos",
];

afterEach(() => {
  localStorage.clear();
  document.title = "";
});

describe("Index", () => {
  it("monta la portada y permite recorrer todas las secciones", () => {
    localStorage.setItem("abrazo-lang", "es");
    render(
      <LangProvider>
        <Index />
      </LangProvider>,
    );

    expect(screen.getByText("ABRAZO")).toBeInTheDocument();
    expect(document.title).toContain("ABRAZO");

    const nav = screen.getByRole("navigation", { name: /navegación principal/i });
    for (const label of SECTIONS) {
      fireEvent.click(within(nav).getByRole("button", { name: label }));
      // Cada sección pinta su título de encabezado con el número de sección.
      expect(document.querySelector("main h2")).not.toBeNull();
    }
  });

  it("cambia de idioma sin perder la sección abierta", () => {
    localStorage.setItem("abrazo-lang", "es");
    render(
      <LangProvider>
        <Index />
      </LangProvider>,
    );

    const nav = screen.getByRole("navigation", { name: /navegación principal/i });
    fireEvent.click(within(nav).getByRole("button", { name: "Herramientas" }));
    expect(screen.getByText(/semáforo/i)).toBeInTheDocument();

    const switcher = screen.getByRole("group", { name: /language selector/i });
    fireEvent.click(within(switcher).getByRole("button", { name: "EN" }));
    // Sigue en herramientas, ahora en inglés.
    expect(screen.getByText(/traffic light/i)).toBeInTheDocument();
  });

  it("el umbral solo se cruza a propósito y se puede deshacer", () => {
    localStorage.setItem("abrazo-lang", "es");
    render(
      <LangProvider>
        <Index />
      </LangProvider>,
    );

    const nav = screen.getByRole("navigation", { name: /navegación principal/i });
    // Sin cruzar, la navegación oscura no existe.
    expect(within(nav).queryByRole("button", { name: /tríada oscura/i })).not.toBeInTheDocument();

    fireEvent.click(within(nav).getByRole("button", { name: "Su dolor" }));
    fireEvent.click(screen.getByRole("button", { name: /cruzar el umbral/i }));

    expect(within(nav).getByRole("button", { name: /tríada oscura/i })).toBeInTheDocument();
    expect(localStorage.getItem("abrazo-crossed")).toBe("1");

    fireEvent.click(screen.getByRole("button", { name: /volver/i }));
    expect(within(nav).queryByRole("button", { name: /tríada oscura/i })).not.toBeInTheDocument();
  });

  it("no ensucia la consola con errores de React", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem("abrazo-lang", "es");
    render(
      <LangProvider>
        <Index />
      </LangProvider>,
    );
    const nav = screen.getByRole("navigation", { name: /navegación principal/i });
    for (const label of SECTIONS) {
      fireEvent.click(within(nav).getByRole("button", { name: label }));
    }
    expect(error).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it("el pie cuenta de dónde nace ABRAZO, en el idioma elegido", () => {
    localStorage.setItem("abrazo-lang", "es");
    render(
      <LangProvider>
        <Index />
      </LangProvider>,
    );

    // La nota de origen es personal y tiene que estar en todos los idiomas:
    // si falta en uno, esa persona lee un pie vacío.
    expect(screen.getByText(/Esto está hecho en base a una historia real/)).toBeInTheDocument();
    expect(screen.getByText(/Pero a veces uno tiene que decir adiós/)).toBeInTheDocument();
  });
});
