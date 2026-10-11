import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { LangProvider, useLang } from "./useLang";

const Probe = () => {
  const { lang, setLang, t } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="title">{t.header.title}</span>
      <button onClick={() => setLang("en")}>EN</button>
      <button onClick={() => setLang("ca")}>CA</button>
    </div>
  );
};

afterEach(() => {
  localStorage.clear();
  document.documentElement.lang = "";
});

describe("useLang", () => {
  it("recuerda el idioma elegido entre recargas", () => {
    localStorage.setItem("abrazo-lang", "pt");
    render(
      <LangProvider>
        <Probe />
      </LangProvider>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("pt");
  });

  it("si no hay elección previa respeta el idioma del navegador", () => {
    render(
      <LangProvider>
        <Probe />
      </LangProvider>,
    );
    // jsdom está en inglés: antes el arranque siempre era español fijo.
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
  });

  it("al cambiar de idioma lo guarda y actualiza el atributo lang del documento", () => {
    render(
      <LangProvider>
        <Probe />
      </LangProvider>,
    );
    fireEvent.click(screen.getByText("CA"));

    expect(screen.getByTestId("lang")).toHaveTextContent("ca");
    expect(localStorage.getItem("abrazo-lang")).toBe("ca");
    // Lo usan los lectores de pantalla para pronunciar el texto correctamente.
    expect(document.documentElement.lang).toBe("ca");
  });

  it("un valor guardado que no es un idioma válido no rompe nada", () => {
    localStorage.setItem("abrazo-lang", "klingon");
    render(
      <LangProvider>
        <Probe />
      </LangProvider>,
    );
    expect(["es", "en"]).toContain(screen.getByTestId("lang").textContent);
  });
});
