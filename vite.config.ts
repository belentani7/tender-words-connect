import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
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
  plugins: [react(), mcpPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    // React y el router cambian mucho menos que el contenido, así que se empaquetan
    // aparte: el bundle principal baja de tamaño y el navegador puede reutilizar
    // ese caché entre despliegues. No afecta ni al diseño ni al comportamiento.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-dom/client"],
          router: ["react-router-dom"],
        },
      },
    },
  },
}));
