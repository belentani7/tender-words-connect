# Auditoría de ABRAZO — 11 de octubre de 2026

Revisión amplia del proyecto con una sola regla: **la intención de diseño no se toca**.
Glassmorphism 2.0, negro absoluto, rojo láser, tipografía ligera y mono, el «umbral» entre
la ternura y «el otro lado», el ritmo de las revelaciones al hacer scroll: todo eso se
mantiene igual. Lo que cambia es lo que estaba roto, lo que era inseguro para quien
llega aquí en un mal momento y lo que hacía difícil mantener el proyecto.

Cómo se hizo: `npm run typecheck`, `npm run lint`, `npm test` y `npm run build` antes y
después. Al terminar, los cuatro pasan limpios (el lint deja 10 avisos benignos de
*fast refresh* en componentes de UI vendidos que la app no usa) y `npm audit` queda
en **cero avisos** (partía de 46).

---

## Lo que estaba roto y ahora funciona

| # | Hallazgo | Consecuencia real | Solución |
|---|----------|-------------------|----------|
| 1 | `npm run dev` y `npm run build` ejecutaban `bunx tsx …` | Sin **bun** instalado, el proyecto no arrancaba: `bunx: not found` | El script del sitemap corre con `node` (Node 22.18+ trae los tipos sin configuración) y, si falla, deja el sitemap ya commiteado en lugar de tumbar el arranque |
| 2 | `@import` de Google Fonts **después** de `@tailwind` | Aviso de build y las fuentes no se pedían hasta tener todo el CSS | Las tipografías se cargan con `<link>` en `index.html`, junto al `preconnect` que ya existía |
| 3 | `tailwind.config.ts` usaba `require()` | Error de lint en un proyecto ESM | Import ESM de `tailwindcss-animate` |
| 4 | `RelationCheck`: `next.has(i) ? next.delete(i) : next.add(i);` | Expresión suelta: funcionaba por accidente, pero es un error de lint y de intención | `if/else` explícito |
| 5 | `BoundaryBuilder`: la función se llamaba `usePreset` | React la trataba como hook y el lint la marcaba como error de *rules-of-hooks* | Renombrada a `applyPreset`, con un comentario para que no vuelva a pasar |
| 6 | `RegulateNow`: `setPhase`/`setCycles` **dentro** del updater de `setLeft` | Los ciclos podían contarse dos veces y el contador se desfasaba de la animación | El tiempo se deriva de un solo estado (`elapsed`): fase, cuenta atrás y ciclos salen de ahí. Cero efectos dentro de updaters |
| 7 | `Journal`: `crypto.randomUUID()` sin alternativa | En `http` (móvil en la misma red) la API no existe y la herramienta moría | `newId()` con alternativa estable |
| 8 | `Journal`: los registros guardados se leían tal cual | Un diario de una versión anterior sin un campo rompía el render (`undefined.trim()`) | `reviveEntries` normaliza lo guardado y rellena lo que falte |
| 9 | Botón atrás/adelante en la enciclopedia | Cambiaba la URL pero la pantalla se quedaba en la entrada anterior | Efecto que sincroniza el estado con la URL |
| 10 | `/enciclopedia/no-existe` | Se veía el índice con una URL que no correspondía | Redirección al índice sin ensuciar el historial |
| 11 | Búsqueda sin ignorar acentos | Escribir «limite» no encontraba «límite» (en la web **y** en la herramienta MCP) | Normalización de acentos en los dos sitios, con el mismo criterio |
| 12 | `npm run lint` incluía el bundle autogenerado de `supabase/functions/mcp` | 9 errores de lint sobre código de máquina | Se ignora el directorio generado (el resto de `supabase/functions` sí se revisa) |

## Accesibilidad y cuidado con quien llega aquí

- **Panel de accesibilidad**: ahora es un diálogo de verdad (`role="dialog"`, `aria-modal`), se cierra con `Escape`, el foco entra al panel y vuelve al botón, y los interruptores anuncian su estado con `aria-pressed` en el botón (antes estaba en el dibujo, donde ningún lector de pantalla lo mira).
- **Formularios de las herramientas**: las etiquetas no estaban asociadas a sus campos (`htmlFor`/`id`). Quien usa lector de pantalla oía «edición en blanco» en vez de «Disparador». También los dos deslizadores del diario.
- **Autochequeo del vínculo**: cada casilla es ahora `role="checkbox"` con `aria-checked`.
- **Chat con los agentes**: la conversación es una región `aria-live` y el campo de texto tiene etiqueta. Si el agente falla (límite de peticiones, créditos, red), **ya no se borra lo que la persona había escrito**: se devuelve al campo para reintentar.
- **Enlace de salto al contenido** («Saltar al contenido») traducido a los cuatro idiomas.
- **Desplazamiento suave** respeta `prefers-reduced-motion` y el interruptor del panel.
- **404** rediseñada con el lenguaje visual de ABRAZO (antes era la plantilla gris de Vite, en inglés) y con salidas claras a inicio y enciclopedia.
- **`<html lang>`**: el documento arrancaba en `lang="en"` con contenido en español. Ahora es `es` y se mantiene sincronizado con el idioma elegido.

## Contenido

- **La enciclopedia prometía dinámica en pareja, amistad, familia y trabajo, pero 15 de las 20 entradas tenían entre 1 y 3 contextos.** Se han escrito los 37 contextos que faltaban, en el mismo tono (sin diagnóstico, cálido, concreto) y se han unificado las etiquetas («Colega» → «Colega / trabajo»).
- **Portugués y catalán heredan del español** la mirada clínica, los recursos y «el otro lado». Antes eso era invisible: parecía un fallo. Ahora hay un aviso honesto (`untranslated`) en el panel de accesibilidad, en el umbral y al entrar en esas secciones.
- **Idioma recordado**: la elección se guarda y sobrevive a la recarga; si no hay elección previa se respeta el idioma del navegador cuando es uno de los cuatro.

## Tests

Antes: 1 test de plantilla (`expect(true).toBe(true)`). Ahora **52 tests** que protegen lo que se ha arreglado:

- `src/i18n/translations.test.ts` — los cuatro idiomas tienen exactamente las mismas claves (si falta una, esa parte de la interfaz se queda en blanco) y los bloques heredados son los que se avisan.
- `src/content/content.test.ts` — integridad del contenido: ids úicos y con formato de URL, los cuatro contextos relacionales por entrada, preguntas con respuesta, disclaimers presentes.
- `src/lib/mcp/mcp.test.ts` — las cuatro herramientas MCP, incluido el error cuando el id no existe.
- `src/components/tools/tools.test.tsx` — niveles del autochequeo, composición del guion de límites, progreso del plan de crisis, guardado y recuperación de un diario antiguo, ritmos de respiración y etiquetas de formulario.
- `src/components/AccessibilityPanel.test.tsx` — el diálogo, el `Escape`, el `aria-pressed` y el aviso de idioma.
- `src/hooks/useLang.test.tsx` — memoria del idioma, atributo `lang` y valores corruptos.
- `src/pages/Index.test.tsx` — recorrido por todas las secciones, cambio de idioma sin perder la sección, umbral que solo se cruza a propósito y consola limpia de errores de React.
- `src/pages/routes.test.tsx` — la tabla de rutas real: índice de la enciclopedia, entrada con dirección propia, dirección con id inventado que se corrige sola y página 404.

## Dependencias y seguridad

`npm audit` pasó de **46 avisos (3 críticas y 34 altas)** a **cero**. El arreglo fue de fondo, no de parches cosméticos:

- **Tailwind CSS 3 → 4** (con `@tailwindcss/vite`): las tres críticas venían de `braces`, que solo se resuelven en la línea 4. La migración respeta el diseño al pie de la letra: los mismos tokens (`--primary: 350 100% 51%`, `--laser`, …), las mismas utilidades (`.glass`, `.glass-laser`, `.laser-border`, `.reveal`, `.reveal-stagger`, `.hover-lift`, `.press-spring`, `.mono`, `.tracking-wider-2`, `.scrollbar-hide`, `.prose-chat`, `.text-gradient-primary`, `.shadow-tender`, `.bg-gradient-hero`), los mismos `keyframes` y las mismas adaptaciones `a11y-*` y `prefers-reduced-motion`. El CSS construido se revisó clase a clase: las 415 clases que usa `src/` siguen saliendo.
- **Vite 5 → 8**, **Vitest 3 → 4**, **ESLint 9** y **TypeScript-ESLint 8**: hacían falta para cerrar las alertas altas de `vite`, `esbuild` y del cargador de tests.
- **React Router 6 → 7**: dos avisos moderados (redirección abierta por barra invertida e inyección de constructor en la hidratación SSR) afectan a toda la línea 6 y no tienen parche; el salto es la única salida. La app solo usa `BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`, `useParams` y `useLocation`, que mantienen su firma, y ahora `src/pages/routes.test.tsx` monta la misma tabla de rutas que `App.tsx` para que un futuro salto no pase en silencio.
- **`esbuild` fijado en 0.28.2** y **`@modelcontextprotocol/sdk` fijado en 1.32.1** mediante `overrides`: el aviso de `esbuild` (lectura arbitraria de ficheros con el servidor de desarrollo, solo en Windows) afecta a `>=0.27.3 <0.28.1`, y `@lovable.dev/mcp-js` clavaba el SDK en 1.28.0, dentro del rango con aviso alto. El servidor MCP sigue funcionando: sus 8 tests pasan y el bundle de `supabase/functions/mcp` se regenera igual.
- **Fuera**: `lovable-tagger` (etiquetaba el DOM para el editor de Lovable y depende de Tailwind 3), `@tailwindcss/typography`, `postcss` y `autoprefixer` (Tailwind 4 ya hace ese trabajo). `postcss.config.js` se borró: sobraba.
- El `package-lock.json` se regeneró entero desde el registro público; las URL internas que impedían instalar en limpio desaparecieron.

Lo que **no** cambia: el lenguaje visual, el comportamiento de cada sección y el troceado del bundle. El precio del parche del router son unos 20 kB más en su chunk (React Router 7 trae su capa de datos incluida); es el coste de cerrar los dos avisos moderados.

## Rendimiento y despliegue

- El bundle principal baja de **614 kB a 466 kB** separando React y el router en sus propios *chunks* (mejor caché entre despliegues). El build ya no muestra avisos.
- `npm run typecheck` como script nuevo.
- `server.allowedHosts: true` en desarrollo: sin eso, cualquier vista previa remota (Arena, Lovable, túneles) recibía un **403** de Vite y no cargaba.
- Eliminado `src/App.css` (plantilla de Vite que no importaba nadie).

## Pendiente honesto

- Quedan 10 avisos de *fast refresh* en componentes de UI vendidos (`src/components/ui/*`) que la aplicación no utiliza. Tocarlos es ruido; se pueden borrar los que no se usen cuando alguien quiera.
- El CSS generado pasa de 75,8 kB a 98,2 kB (16 kB tras *gzip*) con Tailwind 4, que emite más utilidades base y declaraciones `@property`. Todo lo que usa la app sigue saliendo, pero adelgazar ese CSS (podar lo no utilizado) es el siguiente paso de rendimiento.
- Vite 8 sugiere cambiar `@vitejs/plugin-react-swc` por `@vitejs/plugin-react`: el proyecto no usa plugins de SWC, así que es un cambio seguro y algo más rápido. Se deja anotado para no tocarlo en la misma pasada que la migración.
- `recharts` marca su versión 2.x como obsoleta (aviso de mantenimiento, no de seguridad). Migrar a la 3 cambia la API de los gráficos: mejor hacerlo en una pasada propia.
- La búsqueda de la enciclopedia es textual simple (sin ranking por relevancia ni resaltado). Funciona y ya ignora acentos, pero no es un motor de búsqueda.
- «El otro lado», la mirada clínica y los recursos siguen sin traducir a portugués y catalán. El aviso ya lo dice; la traducción es trabajo de contenido, no de código.

---

*Auditoría hecha con el mismo cariño con el que está escrito el proyecto: sin romper la ternura, sin esconder lo que no funciona.*
