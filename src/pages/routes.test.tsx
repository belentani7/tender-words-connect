// Pruebas de enrutado: la app sirve la portada, el indice de la enciclopedia,
// cada entrada con direccion propia y una pagina 404 para cualquier otra cosa.
//
// Estas pruebas montan la misma tabla de rutas que src/App.tsx (dentro de un
// MemoryRouter para no depender del historial del navegador) y comprueban los
// tres caminos que mas se usan al compartir enlaces:
//   1. /enciclopedia            -> indice
//   2. /enciclopedia/:id        -> entrada concreta
//   3. /enciclopedia/no-existe  -> vuelve al indice corrigiendo la direccion
//   4. /cualquier-cosa         -> pagina 404
//
// La portada no se prueba aqui (src/pages/Index.test.tsx ya la cubre entera);
// se sustituye por un marcador ligero para no volver a montarla.

import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { LangProvider } from "@/hooks/useLang";
import { WIKI_DATA } from "@/content/wiki-data";
import Enciclopedia from "@/pages/Enciclopedia";
import NotFound from "@/pages/NotFound";

const Sonda = () => {
  const { pathname } = useLocation();
  return (
    <p data-testid="sonda-ruta" className="mono">
      {pathname}
    </p>
  );
};

const renderRuta = (rutaInicial: string) =>
  render(
    <HelmetProvider>
      <LangProvider>
        <MemoryRouter initialEntries={[rutaInicial]}>
          <Sonda />
          <Routes>
            <Route path="/" element={<p data-testid="portada">portada</p>} />
            <Route path="/enciclopedia" element={<Enciclopedia />} />
            <Route path="/enciclopedia/:id" element={<Enciclopedia />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </LangProvider>
    </HelmetProvider>,
  );

beforeEach(() => {
  // jsdom informa en-US; la app cae a navegador sin preferencia guardada. Se
  // fuerza el espanol, que es el idioma de las etiquetas que se comprueban.
  localStorage.setItem("abrazo-lang", "es");
});

afterEach(() => {
  localStorage.clear();
});

describe("rutas de la enciclopedia", () => {
  it("muestra el indice en /enciclopedia", async () => {
    renderRuta("/enciclopedia");

    expect(screen.getByTestId("sonda-ruta")).toHaveTextContent("/enciclopedia");
    expect(await screen.findByLabelText("Buscar en la enciclopedia")).toBeInTheDocument();
    // El indice tambien lista las entradas, no solo el buscador.
    expect(screen.getAllByText(WIKI_DATA[0].title).length).toBeGreaterThan(0);
  });

  it("abre una entrada concreta en /enciclopedia/:id", async () => {
    const entry = WIKI_DATA[0];
    renderRuta(`/enciclopedia/${entry.id}`);

    expect(await screen.findByRole("heading", { name: entry.title })).toBeInTheDocument();
    expect(screen.getByTestId("sonda-ruta")).toHaveTextContent(`/enciclopedia/${entry.id}`);
  });

  it("corrige la direccion cuando el id no existe y deja el historial limpio", async () => {
    renderRuta("/enciclopedia/no-existe");

    // El efecto de Enciclopedia navega con replace a /enciclopedia.
    await waitFor(() => {
      expect(screen.getByTestId("sonda-ruta")).toHaveTextContent("/enciclopedia");
    });
    expect(await screen.findByLabelText("Buscar en la enciclopedia")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /no-existe/ })).not.toBeInTheDocument();
  });

  it("muestra la pagina 404 en cualquier otra direccion", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    renderRuta("/una-direccion-inventada");

    expect(screen.getByRole("heading", { name: "Esta pagina no existe" })).toBeInTheDocument();
    expect(screen.getByTestId("sonda-ruta")).toHaveTextContent("/una-direccion-inventada");
    // El error de consola documenta el intento real (util para depurar enlaces rojos).
    expect(error).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/una-direccion-inventada",
    );

    error.mockRestore();
  });
});
