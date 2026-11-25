# BIBLIA.md — ABRAZO (tender-words-connect)

> Documento de doctrina del producto. Visión, misión, reglas, arquitectura, stack y decisiones de diseño.

## 1. Visión

ABRAZO es un producto de `belentani7` dentro de su universo de proyectos.
Cuenta una historia real: la de una persona que tuvo una experiencia y no supo
actuar de la mejor manera. Espera servir al máximo a quienes no quieren pasar
por lo mismo.

## 2. Misión

Proveer valor a través de tecnología moderna, código mantenible y una experiencia
accesible para quien llega en un momento difícil. Convertir el dolor en
comprensión: entender el territorio, nombrar los patrones y recuperar la
soberanía personal.

## 3. Stack tecnológico

- **Node.js ≥ 22.18**: runtime principal.
- **React 18 + TypeScript**: interfaz de usuario.
- **Vite 8**: build tool y servidor de desarrollo.
- **Tailwind CSS 4** (`@tailwindcss/vite`): estilos utilitarios.
- **React Router 7**: enrutado (`BrowserRouter`).
- **Vitest 4 + Testing Library**: pruebas unitarias y de componentes.
- **Supabase Edge Functions** (Deno): `chat-agent` (pasarela IA endurecida) y `mcp`.

## 4. Reglas de desarrollo

- Spec-first cuando el cambio es grande: entender antes de tocar; diffs atómicos.
- No commitear secretos, API keys, tokens ni credenciales.
- Ejecutar gitleaks antes de cada push (workflow `hygiene.yml` lo hace por ti).
- CODEOWNERS: `@belentani7` revisión requerida.
- Conventional commits: `type(scope): summary`.
- Cada cambio es reversible y verificable: `npm run quality:check` en verde.

## 5. Tokens de diseño

Núcleo «Vacío y Láser» (ver `src/index.css`):

- Negro absoluto de fondo: `hsl(0 0% 0%)`.
- Rojo láser primario: `hsl(350 100% 51%)` (`#ff073a`).
- Blanco etéreo de primer plano, usado con opacidades (`/80`, `/50`…).
- Vidrio (`.glass`, `.glass-laser`), bordes `.laser-border`, sombras `--gentle-shadow`,
  tipografía Inter (texto) + JetBrains Mono (etiquetas) + Atkinson Hyperlegible (lectura larga/accesible).

Los tokens CANON antiguos (negro #05030a, dorado #d4af37, cyan #4de8e0)
**ya no se usan**: el producto convergió en Vacío y Láser. No reintroducirlos.

## 6. Accesibilidad y cuidado

- Contraste ≥ 4.5:1 en texto de cuerpo; foco visible con `:focus-visible`.
- Sin animación que ignore `prefers-reduced-motion`; panel de accesibilidad
  real (`role="dialog"`, cierre con `Escape`, foco restituido).
- Skip-link traducido a los cuatro idiomas; navegación por teclado en todo.
- Estados vacío, error y carga diseñados (chat IA, diario, plan de crisis).

## 7. Seguridad

- `.gitleaks.toml` configurado; workflow `hygiene.yml` escanea en cada push/PR.
- CodeQL semanal (`codeql.yml`); Dependabot activo; `npm audit` en cero avisos.
- `chat-agent`: CORS con lista de hosts, límite de abuso, 405 para no-POST,
  techo de caracteres, timeout a la pasarela, sin filtrar detalles internos.
- CODEOWNERS `@belentani7`; SECURITY.md con política de reporte.

## 8. Decisiones de arquitectura

- Repositorio independiente `belentani7/tender-words-connect`.
- Despliegue con **build** de Vite: Vercel (`vercel.json`, `framework: vite`,
  rewrites SPA para `/enciclopedia/*`) y GitHub Pages (`pages.yml`, base relativa).
- `index.html` es el shell de Vite; **nunca** una página estática paralela.
  Todo el sitio vive en `src/`.
- Contenido (`src/content`) separado de presentación; integridad del contenido
  garantizada por tests.
- i18n con claves idénticas en es/en/pt/ca; bloques heredados avisados con honestidad.

## Convenciones de commit

`type(scope): resumen` — feat, fix, docs, chore, refactor, test, perf, style.
