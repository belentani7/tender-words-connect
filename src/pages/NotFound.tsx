import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Library } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden flex items-center justify-center px-4">
      {/* Mismo campo ambiental que el resto de la app: coherencia de diseno. */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/[0.06] blur-[120px] animate-float" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-primary/[0.04] blur-[140px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <main className="max-w-xl w-full relative z-10">
        <div className="glass laser-border rounded-3xl p-8 md:p-10 text-center">
          <p className="mono text-[10px] tracking-wider-2 text-primary/80 uppercase mb-4">— Error 404</p>
          <h1 className="text-5xl md:text-6xl font-extralight text-foreground/95 leading-[1.05] tracking-tight mb-4">
            Esta pagina no existe
          </h1>
          <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-2">
            La direccion que buscas no esta en el mapa. No pasa nada: se puede volver al inicio o seguir
            explorando la enciclopedia.
          </p>
          <p className="mono text-[10px] tracking-wider-2 text-foreground/30 uppercase mb-8 break-all">
            {location.pathname}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center gap-2 glass-laser laser-border rounded-full px-6 py-3 mono text-xs tracking-wider-2 text-foreground hover:text-laser transition-all duration-500"
            >
              Volver al inicio <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/enciclopedia")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 mono text-xs tracking-wider-2 border border-foreground/15 text-foreground/60 hover:text-foreground/90 hover:border-foreground/30 transition-all"
            >
              <Library className="w-3.5 h-3.5" /> Enciclopedia
            </button>
          </div>

          <p className="text-foreground/35 text-xs leading-relaxed italic mt-8 flex items-center justify-center gap-2">
            <ArrowLeft className="w-3 h-3" /> ABRAZO · Este sitio no reemplaza terapia profesional.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
