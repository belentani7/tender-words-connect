// Punto de entrada de la aplicacion Tender Words Connect.
//
// El orden de los proveedores de arriba abajo no es casual. Cada uno envuelve
// al siguiente, asi que el de mas fuera es el primero que se ejecuta y el
// ultimo que se destruye:
//
//   1. QueryClientProvider  -> datos del servidor (react-query)
//   2. TooltipProvider      -> interfaz (los tooltips necesitan estar dentro)
//   3. LangProvider         -> idioma, del que dependen TODAS las paginas
//   4. BrowserRouter        -> rutas
//
// LangProvider va por fuera del router a proposito: si estuviera dentro, cada
// cambio de pagina reiniciaria el idioma elegido y el usuario tendria que
// volver a seleccionarlo. Estando fuera, la eleccion sobrevive a la navegacion.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/hooks/useLang";
import Index from "./pages/Index.tsx";
import Enciclopedia from "./pages/Enciclopedia.tsx";
import NotFound from "./pages/NotFound.tsx";

// Un unico QueryClient para toda la aplicacion: comparte cache entre paginas,
// asi volver a la enciclopedia no vuelve a pedir lo mismo al servidor.
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LangProvider>
        {/* Los dos Toaster conviven: uno para los avisos del sistema de diseno
            y otro para los de Sonner. Se mantienen ambos por compatibilidad con
            los componentes que ya usaban cada uno. */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/enciclopedia" element={<Enciclopedia />} />
            {/* La misma pagina sirve la lista y el detalle: con :id muestra una
                entrada concreta, sin el muestra el indice. Una sola pantalla que
                cubre los dos casos, con un enlace compartible en cada entrada. */}
            <Route path="/enciclopedia/:id" element={<Enciclopedia />} />
            {/* Cualquier otra direccion cae aqui en vez de dejar la pantalla en
                blanco, que es lo que mas confunde a quien llega por un enlace roto. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;