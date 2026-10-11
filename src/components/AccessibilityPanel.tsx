import { useCallback, useEffect, useRef, useState } from "react";
import { Settings2, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";

type Settings = {
  contrast: boolean;
  fontSize: "sm" | "base" | "lg" | "xl";
  reduceMotion: boolean;
  skipSensitive: boolean;
  dyslexia: boolean;
};

const DEFAULTS: Settings = {
  contrast: false,
  fontSize: "base",
  reduceMotion: false,
  skipSensitive: false,
  dyslexia: false,
};

const STORAGE_KEY = "abrazo-a11y";

const load = (): Settings => {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
};

const apply = (s: Settings) => {
  const root = document.documentElement;
  root.style.fontSize = { sm: "14px", base: "16px", lg: "18px", xl: "20px" }[s.fontSize];
  document.body.classList.toggle("a11y-contrast", s.contrast);
  document.body.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  document.body.classList.toggle("a11y-skip-sensitive", s.skipSensitive);
  document.body.classList.toggle("a11y-dyslexia", s.dyslexia);
};

const AccessibilityPanel = () => {
  const { t, lang } = useLang();
  const a = t.a11y!;
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(load);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    apply(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  // Cerrar con Escape y devolver el foco al botón: sin esto, quien navega con
  // teclado se quedaba encerrado en el panel o perdía el foco al cerrarlo.
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const toggle = (key: keyof Settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] } as Settings));

  // Portugués y catalán comparten todavía los bloques avanzados con el español.
  // Se dice claro en lugar de dejar que parezca un fallo de la app.
  const partialContent = lang !== "es" && lang !== "en";

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label={a.open}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 glass-strong laser-border rounded-full w-12 h-12 flex items-center justify-center text-foreground/70 hover:text-laser transition-all"
      >
        <Settings2 className="w-4 h-4" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-end md:items-center justify-center p-4"
          onClick={close}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong laser-border rounded-3xl p-6 w-full max-w-md space-y-4 focus:outline-none"
          >
            <div className="flex items-center justify-between">
              <h3 id="a11y-title" className="mono text-xs tracking-wider-2 text-foreground/80 uppercase">{a.title}</h3>
              <button onClick={close} aria-label={a.close} className="text-foreground/60 hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <Toggle label={a.contrast} value={settings.contrast} onChange={() => toggle("contrast")} />
            <Toggle label={a.reduceMotion} value={settings.reduceMotion} onChange={() => toggle("reduceMotion")} />
            <Toggle label={a.skipSensitive} value={settings.skipSensitive} onChange={() => toggle("skipSensitive")} />
            <Toggle label={a.dyslexia} value={settings.dyslexia} onChange={() => toggle("dyslexia")} />

            <div role="group" aria-label={a.fontSize}>
              <p className="mono text-[10px] tracking-wider-2 text-foreground/50 uppercase mb-2">{a.fontSize}</p>
              <div className="flex gap-2">
                {(["sm", "base", "lg", "xl"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSettings((s) => ({ ...s, fontSize: sz }))}
                    aria-pressed={settings.fontSize === sz}
                    className={`flex-1 py-2 rounded-full mono text-[10px] tracking-wider-2 border transition-all ${
                      settings.fontSize === sz
                        ? "border-primary/60 text-primary bg-primary/10"
                        : "border-foreground/15 text-foreground/60"
                    }`}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSettings(DEFAULTS)}
              className="w-full py-2 mono text-[10px] tracking-wider-2 text-foreground/60 hover:text-foreground border border-foreground/15 rounded-full uppercase"
            >
              {a.reset}
            </button>

            {partialContent && (
              <p className="text-foreground/40 text-[11px] leading-relaxed">{t.untranslated}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) => (
  // `aria-pressed` va en el botón (no en el dibujo del interruptor): es el
  // botón quien recibe el foco y quien anuncia su estado al lector de pantalla.
  <button onClick={onChange} aria-pressed={value} className="w-full flex items-center justify-between py-2">
    <span className="text-foreground/80 text-sm text-left">{label}</span>
    <span className={`relative w-10 h-5 rounded-full transition-all ${value ? "bg-primary/70" : "bg-foreground/15"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-foreground rounded-full transition-all ${value ? "left-5" : "left-0.5"}`} />
    </span>
  </button>
);

export default AccessibilityPanel;
