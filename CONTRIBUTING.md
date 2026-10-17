# Como contribuir

Gracias por querer colaborar. Esta guia explica el proceso completo.

## Reglas no negociables

1. **Sin PII.** Ningun dato personal en codigo, logs, commits ni prompts de IA.
2. **Sin secrets.** Solo `.env.example`. Las credenciales reales van en GitHub Secrets.
3. **Licencia MIT** en toda contribucion.
4. **`main` esta protegida.** Ramas: `feat/<numero>-<descripcion-corta>`.
5. **CI en verde antes de fusionar.** Nunca se fusiona con checks en rojo.

## Proceso

```bash
# 1. Clona TU fork (no el upstream)
git clone https://github.com/<tu-usuario>/<repo>.git
cd <repo>
git remote add upstream https://github.com/belentani7/<repo>.git

# 2. Rama con prefijo convencional
git checkout -b feat/42-descripcion-corta

# 3. Trabaja y verifica en local
pnpm install --frozen-lockfile
pnpm quality:gates    # typecheck + lint + test + build

# 4. Commit y push
git add -A
git commit -m "feat: descripcion en imperativo"
git push -u origin feat/42-descripcion-corta
```

Abre el PR contra `main`. Enlaza siempre un issue. Manten el diff por debajo de
400 lineas; si lo excede, dividelo en varios PR.

## Antes de abrir el PR

- [ ] CI en verde
- [ ] Sin secrets ni datos personales
- [ ] Documentacion actualizada si aplica
- [ ] Commits con Conventional Commits
- [ ] PR enlazado a un issue

## Reportar seguridad

No abras un issue publico para una vulnerabilidad. Escribe a la direccion de contacto
indicada en `SECURITY.md`.
