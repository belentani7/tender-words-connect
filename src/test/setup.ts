import "@testing-library/jest-dom";

// jsdom no implementa window.scrollTo y la app lo usa al cambiar de sección.
// Sin este stub, cada navegación interna dejaba un error en la consola.
Object.defineProperty(window, "scrollTo", { writable: true, value: () => {} });
Object.defineProperty(Element.prototype, "scrollTo", { writable: true, value: () => {} });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
