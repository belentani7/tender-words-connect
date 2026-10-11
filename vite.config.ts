import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // El servidor de desarrollo se abre también desde dominios de vista previa
    // (Arena, Lovable, túneles). Vite rechaza por defecto cualquier Host que no
    // conozca con un 403, así que se permite cualquiera: en desarrollo da igual
    // y en producción esto no se aplica.
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), tailwindcss(), mcpPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // React y el router cambian mucho menos que el contenido, así que se empaquetan
    // aparte: el bundle principal baja de tamaño y el navegador puede reutilizar
    // ese caché entre despliegues. No afecta ni al diseño ni al comportamiento.
    rollupOptions: {
      output: {
        // Vite 8 usa rolldown, que solo acepta manualChunks como funcion.
        // React y el router cambian mucho menos que el contenido: van en su
        // propio chunk para que el navegador los reutilice entre despliegues.
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return "react";
          if (/node_modules\/(react-router|@remix-run\/router)\//.test(id)) return "router";
          return undefined;
        },
      },
    },
  },
}));
