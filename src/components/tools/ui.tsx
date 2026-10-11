import { ReactNode, useEffect, useId, useState } from "react";

export const TPanel = ({
  children,
  className = "",
  laser = false,
}: {
  children: ReactNode;
  className?: string;
  laser?: boolean;
}) => (
  <div className={`${laser ? "glass-laser" : "glass"} laser-border rounded-3xl p-5 md:p-7 ${className}`}>
    {children}
  </div>
);

export const Label = ({ children }: { children: ReactNode }) => (
  <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-2">{children}</p>
);

export const Field = ({
  label,
  hint,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) => {
  // El <label> envuelve el texto pero NO el textarea, así que sin htmlFor un
  // lector de pantalla anunciaba el campo como «edición en blanco» y no decía
  // qué hay que escribir. useId evita colisiones si hay varios formularios.
  const id = useId();
  const hintId = `${id}-hint`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-light text-foreground/90 mb-1">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-foreground/40 text-xs leading-relaxed mb-2">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        aria-describedby={hint ? hintId : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full glass rounded-2xl border border-foreground/10 bg-transparent px-4 py-3 text-sm text-foreground/90 placeholder:text-foreground/30 leading-relaxed focus:outline-none focus:border-primary/40 transition-colors resize-y"
      />
    </div>
  );
};

export const Btn = ({
  children,
  onClick,
  variant = "ghost",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "laser";
  disabled?: boolean;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`press-spring inline-flex items-center gap-2 rounded-full px-4 py-2 mono text-[11px] tracking-wider-2 uppercase transition-all disabled:opacity-40 disabled:pointer-events-none ${
      variant === "laser"
        ? "border border-primary/40 text-foreground/90 hover:text-laser hover:border-primary/70"
        : "border border-foreground/10 text-foreground/55 hover:text-foreground/90 hover:border-foreground/25"
    }`}
  >
    {children}
  </button>
);

/**
 * Identificador único que no depende de `crypto.randomUUID`: esa API solo existe
 * en contextos seguros (https o localhost) y la app puede abrirse en http simple
 * desde un móvil en la misma red. Sin ella, `crypto.randomUUID()` lanzaría y la
 * herramienta se quedaría inservible.
 */
export const newId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * Persistencia local: nada sale del dispositivo.
 *
 * `revive` normaliza lo que haya guardado una versión anterior de la herramienta.
 * Sin él, un registro viejo al que le falte un campo llegaría a la interfaz como
 * `undefined` y podía romper el render (por ejemplo `e.trigger.trim()`).
 */
export function useLocalState<T>(key: string, initial: T, revive?: (raw: unknown) => T | null) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return initial;
      const parsed = JSON.parse(raw) as unknown;
      if (revive) {
        const revived = revive(parsed);
        return revived === null ? initial : revived;
      }
      return parsed as T;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [key, value]);
  return [value, setValue] as const;
}