import { describe, expect, it, beforeEach } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import RelationCheck from "./RelationCheck";
import BoundaryBuilder from "./BoundaryBuilder";
import CrisisPlan from "./CrisisPlan";
import Journal from "./Journal";
import RegulateNow from "./RegulateNow";
import { RELATION_CHECK, CHECK_TIERS, CRISIS_FIELDS } from "@/content/toolkit-data";

beforeEach(() => {
  localStorage.clear();
});

describe("RelationCheck", () => {
  it("suma las señales marcadas y muestra el nivel que corresponde", () => {
    render(<RelationCheck />);
    const items = screen.getAllByRole("checkbox");
    // Las tres primeras casillas del listado.
    fireEvent.click(items[0]);
    fireEvent.click(items[1]);
    fireEvent.click(items[2]);

    fireEvent.click(screen.getByRole("button", { name: /ver lectura/i }));

    const expected = CHECK_TIERS.find((t) => 3 <= t.max)!;
    expect(screen.getByText(expected.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`3 de ${RELATION_CHECK.length}`))).toBeInTheDocument();
  });

  it("volver a pulsar una casilla la desmarca", () => {
    render(<RelationCheck />);
    const items = screen.getAllByRole("checkbox");
    fireEvent.click(items[0]);
    expect(items[0]).toHaveAttribute("aria-checked", "true");
    fireEvent.click(items[0]);
    expect(items[0]).toHaveAttribute("aria-checked", "false");
  });
});

describe("BoundaryBuilder", () => {
  it("compone el guion con el tono elegido y los campos rellenados", () => {
    render(<BoundaryBuilder />);

    fireEvent.change(screen.getByLabelText(/D · Describe los hechos/), {
      target: { value: "cancelas planes el mismo día" },
    });
    fireEvent.change(screen.getByLabelText(/A · Afirma lo que pides/), {
      target: { value: "que me avises con un día de antelación" },
    });

    const script = screen.getByText(/Cuando cancelas planes el mismo día/);
    expect(script.textContent).toContain("Te pido que me avises con un día de antelación.");
    // El tono por defecto es «Tierno y firme»: incluye su frase de entrada.
    expect(script.textContent).toContain("Te quiero y quiero seguir aquí");
  });

  it("los presets rellenan los cuatro campos de golpe", () => {
    render(<BoundaryBuilder />);
    fireEvent.click(screen.getByRole("button", { name: /mensajes de madrugada/i }));

    expect((screen.getByLabelText(/D · Describe los hechos/) as HTMLTextAreaElement).value).toContain(
      "entre la una y las cinco",
    );
    expect((screen.getByLabelText(/A · Afirma lo que pides/) as HTMLTextAreaElement).value).toContain(
      "después de las once",
    );
    expect(screen.getByText(/Cuando me escribes entre la una y las cinco/)).toBeInTheDocument();
  });

  it("sin datos no muestra ningún guion", () => {
    render(<BoundaryBuilder />);
    expect(screen.queryByText(/Tu guion/)).not.toBeInTheDocument();
  });
});

describe("CrisisPlan", () => {
  it("cuenta los campos completados", () => {
    render(<CrisisPlan />);
    expect(screen.getByText(`0 / ${CRISIS_FIELDS.length}`)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(CRISIS_FIELDS[0].label), {
      target: { value: "Mi hermana Ana" },
    });
    expect(screen.getByText(`1 / ${CRISIS_FIELDS.length}`)).toBeInTheDocument();
  });
});

describe("Journal", () => {
  it("guarda un registro y muestra sus datos", () => {
    render(<Journal />);
    fireEvent.click(screen.getByRole("button", { name: /nuevo registro/i }));
    fireEvent.change(screen.getByLabelText(/Disparador/), {
      target: { value: "No contestó al mensaje" },
    });
    fireEvent.click(screen.getByRole("button", { name: /guardar registro/i }));

    expect(screen.getByText(/No contestó al mensaje/)).toBeInTheDocument();
    expect(screen.getByText(/Miedo · 6\/10 → 4\/10/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("abrazo-journal")!)).toHaveLength(1);
  });

  it("abre aunque el guardado sea de una versión antigua e incompleta", () => {
    localStorage.setItem(
      "abrazo-journal",
      JSON.stringify([{ emotion: "Rabia" }, "basura", { id: "x", trigger: 5 }]),
    );
    render(<Journal />);
    // El registro válido se ve; los campos que faltan toman el valor por defecto.
    expect(screen.getByText(/Rabia · 6\/10 → 4\/10/)).toBeInTheDocument();
  });
});

describe("RegulateNow", () => {
  // La cuenta atrás es el número grande; los ritmos también contienen dígitos en
  // su nombre, así que se selecciona por la clase del contador.
  const countdown = () => screen.getByText(/^\d+$/, { selector: "p.tabular-nums" });

  it("arranca en la primera fase del ritmo coherente", () => {
    render(<RegulateNow />);
    expect(screen.getByText("Inspira")).toBeInTheDocument();
    expect(countdown()).toHaveTextContent("4");
    expect(screen.getByText(/Ciclos completados · 0/)).toBeInTheDocument();
  });

  it("cambiar de ritmo lo aplica y reinicia la cuenta", () => {
    render(<RegulateNow />);
    fireEvent.click(screen.getByRole("button", { name: /caja 4-4-4-4/i }));
    expect(screen.getByText(/Ordena la mente cuando hay ruido mental/)).toBeInTheDocument();
    expect(countdown()).toHaveTextContent("4");
  });
});

describe("accesibilidad de los formularios", () => {
  it("cada campo tiene etiqueta asociada", () => {
    render(<CrisisPlan />);
    for (const f of CRISIS_FIELDS.slice(0, 3)) {
      const input = screen.getByLabelText(f.label) as HTMLTextAreaElement;
      expect(input.tagName).toBe("TEXTAREA");
    }
  });
});
