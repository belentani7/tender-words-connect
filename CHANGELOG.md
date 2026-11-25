# Changelog

Todas las novedades relevantes de este proyecto se registran aqui.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto adheres a [Semantic Versioning](https://semver.org/lang/es/).

## [No publicado]

### Anadido
- `AGENTS.md` y `BIBLIA.md` reescritos con el estado real del proyecto
  (stack, comandos, reglas). Antes describian un micrositio estatico inventado
  por un generador externo.

### Cambiado
- `index.html` vuelve a ser el shell de Vite: la app ABRAZO se monta otra vez,
  con `<html lang="es">`, meta reales, fuentes Google con preconnect y favicon
  inline laser. El despliegue publica la app, no una landing promocional.
- `vitest.config.ts` usa `@vitejs/plugin-react`; desaparece el duplicado
  `@vitejs/plugin-react-swc`.
- `package.json`: `engines.node >= 22.18` (antes `>=18`, insuficiente para los
  scripts). Lockfile regenerado: vite 8.3.8, vitest 4.1.12, typescript-eslint 8.74.0.
- `.nvmrc` fija `22.18.0`; `pages.yml` usa Node 22 y `npm ci` (coherente con ci.yml).
- `@lovable.dev/mcp-js` queda solo en `devDependencies` (estaba declarado dos veces).
- CSS generado: 98,2 kB (16 kB gzip) → 57,6 kB (10,2 kB gzip) al podar el
  arbol de componentes sin uso.

### Eliminado
- Capa inyectada por el generador `repo-superpowers`: `index.html` estatico
  (sustituia al shell de Vite y referenciaba una ruta local de Windows),
  micrositio estatico (`404`, `docs`, `accesibilidad`, `privacidad`,
  `ecosistema`, `ampliacion`, `site/`, `_shared/`, `hero.js`, `hero.css`),
  bundle `site-hero.js` (+147 kB) y `omega-superpowers-client.js`
  (`require('child_process')` desde el navegador y rutas locales).
- 45 componentes de `src/components/ui/` sin referencias desde la app
  (quedan `sonner`, `toast`, `toaster`, `tooltip`, los unicos importados).
- Dependencias que solo usaban esos componentes: ~34 paquetes `@radix-ui/*`,
  `react-hook-form`, `@hookform/resolvers`, `recharts`, `embla-carousel-react`,
  `vaul`, `cmdk`, `input-otp`, `react-day-picker`, `react-resizable-panels`,
  `date-fns`, `@vitejs/plugin-react-swc`.
- `HeroShader.jsx`/`.d.ts` (importado pero jamas renderizado; dependia del
  `window.initHeroShader` del micrositio inyectado) y su import en `App.tsx`.
- `bun.lock`, `bun.lockb` (URL de proxy interna), `package-lock.json.bak-20261117`,
  `tests/` (plantilla `assert True`), `canon-tokens.*` ( tokens ajenos al design
  system), `data/catalogo.*` (salida de `repo_forge.py`), `manifest.webmanifest`
  (branding ajeno), `.python-version` (no queda Python), `robots.txt` raiz
  (duplicado de `public/robots.txt`), `public/placeholder.svg` (sin referencias).

### Corregido
- Test `production-entrypoint`: fallaba porque `index.html` no era el shell de
  Vite. Restaurado: la suite completa vuelve a pasar (74/74).
- `npm audit`: 18 avisos (4 altas) en el arbol de desarrollo → **0 avisos**.
  (`npm ci` con npm 10.9.8 funciona; regenerar el lockfile requiere npm ≥ 11.)
- El build pasa de 4 modulos transformados (pagina estatica de 9,7 kB) a 1937
  modulos con code-splitting: react 139,8 kB, router 37,8 kB, enciclopedia y
  chat IA lazy, main 463,9 kB (gzip 154 kB).

### Seguridad
- Eliminada la promocion y el cargador externo `C:\Users\...\omega-superpowers-client.js`
  presente en todas las paginas estaticas (filtraba rutas locales y cargaba JS remoto inexistente).

## [0.1.0] - 2026-10-17

### Anadido
- Version inicial del proyecto.
