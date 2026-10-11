import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Las funciones de Supabase también se prueban: sus utilidades viven en
    // `supabase/functions/_shared` y no dependen de Deno.
    include: ["src/**/*.{test,spec}.{ts,tsx}", "supabase/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
