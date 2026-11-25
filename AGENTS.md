# AGENTS.md — ABRAZO (tender-words-connect)

> Cómo trabajar en este repositorio sin romperlo. Léelo antes de tocar nada.

## Qué es

ABRAZO es un espacio accesible y multilingüe para entender los vínculos,
reconocer patrones de relación, practicar límites y recuperar la soberanía
personal. Es **educativo y de autorreflexión**: no diagnostica, no es un
tratamiento clínico y no sustituye a un profesional. Los avisos de peligro
(recursos de crisis) y los límites del producto son contenido sensible: no se
tocan. Los agentes de IA se identifican claramente como IA.

Repositorio canónico: `github.com/belentani7/tender-words-connect`.
`README.md` cuenta la visión; `AUDIT.md` registra lo que se auditó y por qué;
`PROJECT_MASTER_PROMPT.md` describe el destino del producto.

## Stack (verificado el 2026-11-25)

- **Node ≥ 22.18** (los scripts usan el type stripping nativo de Node).
- **Vite 8** + **React 18** + **TypeScript** + **Tailwind CSS 4**
  (`@tailwindcss/vite`) + **React Router 7**.
- **Vitest 4** + Testing Library (jsdom).
- **Supabase Edge Functions** (Deno) en `supabase/functions/`
  (`chat-agent`, `mcp`, utilidades en `_shared/` que sí se prueban en local).
- Despliegue: **Vercel** (`vercel.json`, framework `vite`) y **GitHub Pages**
  (`.github/workflows/pages.yml`). CI: `.github/workflows/ci.yml`
  (`npm run quality:check` + `npm audit --omit=dev --audit-level=high`).

## Comandos

```bash
npm ci                # instalar exactamente el lockfile
npm run dev           # desarrollo en http://localhost:8080
npm run quality:check # typecheck + lint + test + build (la puerta de calidad)
npm run typecheck     # tsc --noEmit (app y configuración)
npm run lint          # eslint
npm test              # vitest run
npm run build         # build de producción (regenera public/sitemap.xml)
```

`npm install` con npm 10.9.8 puede abortar con un error interno de arborist
(`Cannot read properties of null (reading 'edgesOut')`). El lockfile commiteado
se regeneró con npm 12; `npm ci` funciona con npm 10 y npm 12. Si necesitas
regenerar el lockfile, hazlo con npm ≥ 11 o npm ≥ 12 y verifica después
`npm ci && npm run quality:check`.

## Estructura

```
index.html               shell de Vite; monta /src/main.tsx
src/main.tsx             raíz React (HelmetProvider + App)
src/App.tsx              proveedores + tabla de rutas (solo "/", "/enciclopedia", 404)
src/pages/               Index (portada), Enciclopedia (índice + detalle), NotFound
src/components/          app + tools/ (herramientas) + ui/ (solo sonner, toast, toaster, tooltip)
src/content/             wiki-data y toolkit-data (contenido, con tests de integridad)
src/i18n/                es · en · pt · ca (misma clave en los cuatro; hay test)
src/hooks/               useLang (idioma, persistencia), useScrollReveal, use-toast
src/lib/mcp/             herramientas MCP expuestas también por la función `mcp`
scripts/generate-sitemap.ts   regenera public/sitemap.xml (predev/prebuild)
supabase/functions/      chat-agent (pasarela IA endurecida), mcp, _shared/http.ts
```

## Reglas del proyecto

1. **La intención de diseño no se toca**: negro absoluto, rojo láser
   (`--primary: 350 100% 51%`), glassmorphism 2.0, tipografía ligera + mono.
   Ver la sección de diseño en `AUDIT.md`.
2. Los tests de `src/i18n`, `src/content`, `src/components/tools` y
   `supabase/functions/_shared` son **contrato**: si fallan, el producto se rompe
   para quien llega en un mal momento. No se aflojan para que pase la CI.
3. Nada de secretos en el repo: `.gitleaks.toml` + CodeQL + hygiene workflow.
   CODEOWNERS: `@belentani7`.
4. Commits: `type(scope): resumen` (feat, fix, docs, chore, refactor, test, perf, style).
5. Antes de commit: `npm run quality:check` en verde. Si no puedes ejecutarlo,
   dilo explícitamente en el mensaje/PR.
