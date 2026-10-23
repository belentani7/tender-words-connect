# PROJECT MASTER PROMPT — ABRAZO

> Canonical repository: `belentani7/tender-words-connect`.
> Identity: **ABRAZO** — an accessible, emotionally literate, multilingual space for understanding relationships, practicing boundaries, and rebuilding self-agency.
> Motto: *Nacido del dolor. Construido con ternura. Para convertir el dolor en comprensión.*

## Source of truth and identity

Read the actual source code, `README.md`, `src/content`, `src/components/tools`, `src/pages`, and `supabase/functions` before edits. Preserve the existing ABRAZO identity, content and authorial voice. Do not mistake the repository's historic technical name, Tender Words Connect, for a separate product. Do not create a new repository for a related idea. Prefer incremental extensions over replatforming or wholesale rewrites.

ABRAZO is **not** a diagnostic or clinical treatment system. It is an educational, self-reflection and communication-skills product. Content must not equate a behavior pattern with a diagnosis or stigmatize people with mental illness. AI companions identify themselves clearly as AI. Immediate-danger resources and limits of the tool must remain visible.

## Full product destination

Build a complete end-to-end experience, beyond a landing page:

1. **Discover and orient**: brand-led home, careful onboarding, clear navigation, mobile-first performance, four languages with equal content coverage, low-friction entry for someone in emotional distress.
2. **Learn**: an inclusive encyclopedia grounded in reputable sources, patterns and counterexamples, relationship contexts (partner, family, friends, work), readable detail views, and responsible external resource references.
3. **Practice**: working tools for boundary scripts, emotional journaling, personal crisis/safety plans, regulation exercises, relationship reflection, and attachment self-observation. Save with predictable behavior, correct migrations, and accessible controls.
4. **Companion AI**: three clearly separated roles — reflection, patient simulation, partner simulation — with streaming that tolerates chunk boundaries, network errors and cancellations. Never silently drop the person's text; never leak secrets to browsers. Provide fair-use limits and sensible fallbacks when service is down.
5. **Agency and privacy**: user-controlled local data, readable export and deletion, optional private sync only if it can be securely implemented with consent, accessible disclosures about which interactions are sent to a third-party AI provider, and no hidden telemetry of sensitive writing.
6. **Reliability and delivery**: reproducible installation, one passing typecheck/lint/test/build quality command, automated security checks, smoke-tested navigation, staged preview and validated production deployment.

## Existing technical architecture

React + TypeScript + Vite, shadcn/Radix UI, Tailwind, React Router, Vitest, Supabase Edge Functions for the AI chat; local browser persistence for some sensitive tools. Reuse these choices unless a well-tested requirement justifies changing them. Content, design and functionality belong in this repository, not a duplicate.

Canonical commands based on current `package.json`: `npm ci`, `npm run quality:check`, `npm run dev`, `npm run build`. The committed `package-lock.json` defines installation; do not use pnpm-only CI without a pnpm lockfile.

## Execution phases (build rather than audit)

- **Phase A — foundations**: CI uses existing package manager/scripts; tests of privacy-sensitive tools; fix type, lint and build failures. Keep production deploy blocked until checks pass.
- **Phase B — user-safe functionality**: validate and migrate locally stored journal and crisis-plan data; guard destructive actions; make local export, print and removal dependable; test keyboard and screen readers.
- **Phase C — AI resilience**: abort pending requests on role change/reset; make SSE response parsing reliable; handle 400/402/429/5xx and network loss; protect user text; test an incomplete stream; add consent messaging and transparent processing boundaries.
- **Phase D — experience depth**: connect educational content to real exercise paths, improve multilingual journey completeness, support reduced motion and assistive technology, refine mobile layouts and information hierarchy.
- **Phase E — release**: production audit, non-secret environment documentation, smoke tests of live routes and chat provider, accessibility pass, staged release, functional verification on actual domain. Publish only when real functionality works.

## Operating instruction for successive agents

For each meaningful increment: (a) inspect relevant current code, (b) implement working behavior and a focused regression test, (c) run the real quality gate when a runner is available, (d) inspect CI failures and correct them, (e) commit with an accurate message, (f) record actual delivery state, then proceed to the next unfinished requirement. Do not claim success because a file or plan exists. Do not repeat architecture study unless required by a specific implementation. Do not push private information to a public repo or make this repo public without explicit authorization.

## Verified implementation log

- 2026-10-23: crisis-plan deletion now requires explicit confirmation; corrupted local state is normalized, and two regression tests were added.
- 2026-10-23: CI rewritten around the repository's npm lockfile and actual `quality:check` script (typecheck, lint, Vitest, build), with a production-dependency vulnerability gate and build artifact.
- **Verification pending**: GitHub Actions run and production deployment results must be observed before marking these changes validated. No claim is made that ABRAZO is complete.
