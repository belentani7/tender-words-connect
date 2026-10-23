import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Brain, HeartHandshake, Send, Sparkles, User2, AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { readChatStream } from "@/lib/chatStream";

type AgentId = "terapeuta" | "paciente" | "pareja";
type Msg = { role: "user" | "assistant"; content: string };

const AGENTS: { id: AgentId; name: string; tagline: string; icon: typeof Brain; opener: string }[] = [
  {
    id: "terapeuta",
    name: "Asistente terapéutico",
    tagline: "Valida, psicoeduca y ofrece herramientas basadas en evidencia (DBT · TCC · ACT).",
    icon: Sparkles,
    opener:
      "Soy ABRAZO-IA, un acompañante emocional con IA (no un profesional humano). Cuéntame qué estás sintiendo o qué situación te trae hoy.",
  },
  {
    id: "paciente",
    name: "Paciente simulador",
    tagline: "Practica validación y límites con una vivencia realista. Solo entrenamiento.",
    icon: User2,
    opener:
      "Estoy aquí para que practiques. Encarno la experiencia de alguien con alta intensidad emocional. Empieza cuando quieras: ¿cómo me hablarías?",
  },
  {
    id: "pareja",
    name: "Pareja simuladora",
    tagline: "Ensaya comunicación en tensión y recibe feedback. Entorno seguro.",
    icon: HeartHandshake,
    opener:
      "Vamos a entrenar una conversación difícil. Puedes equivocarte sin consecuencias reales; te daré feedback. ¿Qué quieres decirme?",
  },
];

const AgentChat = () => {
  const [agent, setAgent] = useState<AgentId>("terapeuta");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [interrupted, setInterrupted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const pendingTextRef = useRef<string | null>(null);
  const active = AGENTS.find((a) => a.id === agent)!;

  // A response must not keep writing into an unmounted conversation.
  useEffect(() => () => requestRef.current?.abort(), []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const stopRequest = () => {
    const unsent = pendingTextRef.current;
    requestRef.current?.abort();
    requestRef.current = null;
    pendingTextRef.current = null;
    setLoading(false);
    // Switching roles or clearing a stalled chat must never erase a long
    // message that was already submitted but has not finished processing.
    if (unsent) setInput((current) => current.trim() && current.trim() !== unsent ? `${unsent}\n\n${current}` : unsent);
  };

  const changeAgent = (next: AgentId) => {
    if (next === agent) return;
    stopRequest();
    setMessages([]);
    setInterrupted(false);
    setAgent(next);
  };

  const resetChat = () => {
    stopRequest();
    setInterrupted(false);
    setMessages([]);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading || requestRef.current) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    const controller = new AbortController();
    requestRef.current = controller;
    pendingTextRef.current = text;
    setMessages(next);
    setInput("");
    setLoading(true);
    setInterrupted(false);
    let hasReply = false;

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ agent, messages: next }),
        signal: controller.signal,
      });

      if (resp.status === 429) throw new Error("Demasiadas solicitudes. Vuelve a intentarlo en un momento.");
      if (resp.status === 402) throw new Error("El servicio de IA no tiene créditos disponibles.");
      if (resp.status === 400) throw new Error("El mensaje no se pudo procesar. Prueba con un texto más corto.");
      if (resp.status === 503) throw new Error("El servicio de IA no está disponible en este momento.");
      if (!resp.ok || !resp.body) throw new Error("No se pudo conectar con el agente.");

      await readChatStream(resp.body, (reply) => {
        if (controller.signal.aborted) return;
        hasReply = true;
        setMessages((current) => {
          const updated = [...current];
          if (updated[updated.length - 1]?.role === "assistant") {
            updated[updated.length - 1] = { role: "assistant", content: reply };
          } else {
            updated.push({ role: "assistant", content: reply });
          }
          return updated;
        });
      }, controller.signal);
      if (!hasReply) throw new Error("El agente no ha generado una respuesta. Inténtalo de nuevo.");
    } catch (error) {
      if (controller.signal.aborted) return;
      if (hasReply) {
        // Keep the partial response visibly marked by the toast. Retrying
        // will retain the existing conversation instead of losing context.
        setInterrupted(true);
        toast.error("Respuesta interrumpida. Lo recibido se ha conservado.");
      } else {
        // A failed request is not a sent message: restore the draft without
        // creating duplicates on the next attempt. Do not overwrite new typing.
        setMessages((current) =>
          current[current.length - 1]?.role === "user"
            ? current.slice(0, -1)
            : current,
        );
        setInput((current) => current.trim() && current.trim() !== text ? `${text}\n\n${current}` : text);
        const known = error instanceof Error && [
          "Demasiadas solicitudes. Vuelve a intentarlo en un momento.",
          "El servicio de IA no tiene créditos disponibles.",
          "El mensaje no se pudo procesar. Prueba con un texto más corto.",
          "El servicio de IA no está disponible en este momento.",
          "No se pudo conectar con el agente.",
          "El agente no ha generado una respuesta. Inténtalo de nuevo.",
        ].includes(error.message);
        toast.error(known ? (error as Error).message : "Error de red o respuesta incompleta. Inténtalo de nuevo.");
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        pendingTextRef.current = null;
        setLoading(false);
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="space-y-5">
      {/* Crisis banner */}
      <div className="reveal glass-laser laser-border rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-foreground/70 text-xs leading-relaxed">
          Estos agentes usan IA con fines educativos y de práctica. <strong className="text-foreground/90">No diagnostican
          ni sustituyen a un profesional</strong>. Si hay riesgo de autolesión o suicidio, llama al <strong className="text-laser">024</strong> (España)
          o a tus servicios de emergencia locales.
        </p>
      </div>

      <p role="note" className="text-foreground/55 text-xs leading-relaxed">
        Privacidad: los mensajes enviados al agente se procesan mediante un servicio externo de IA.
        Evita incluir información que te identifique. Este chat no se guarda en tu diario local.
      </p>

      {/* Agent selector */}
      <div className="grid sm:grid-cols-3 gap-3">
        {AGENTS.map((a) => {
          const Icon = a.icon;
          const on = a.id === agent;
          return (
            <button
              key={a.id}
              onClick={() => changeAgent(a.id)}
              aria-pressed={on}
              className={`reveal-stagger hover-lift press-spring text-left rounded-2xl p-4 border transition-all duration-500 ${
                on
                  ? "glass-laser laser-border"
                  : "glass border-foreground/[0.06] hover:border-foreground/20"
              }`}
            >
              <Icon className={`w-4 h-4 mb-2 ${on ? "text-laser" : "text-foreground/50"}`} />
              <h4 className={`text-sm font-light mb-1 ${on ? "text-foreground/95" : "text-foreground/80"}`}>{a.name}</h4>
              <p className="text-foreground/50 text-[11px] leading-relaxed">{a.tagline}</p>
            </button>
          );
        })}
      </div>

      {/* Chat window */}
      <div className="glass rounded-3xl border border-foreground/[0.06] overflow-hidden flex flex-col" style={{ height: "min(65vh, 560px)" }}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-foreground/[0.06]">
          <p className="mono text-[10px] tracking-wider-2 text-foreground/50 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-laser" />
            {active.name}
          </p>
          {messages.length > 0 && (
            <button
              onClick={resetChat}
              className="text-foreground/40 hover:text-foreground/80 transition-colors"
              aria-label="Reiniciar conversación"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Conversación con el agente"
          className="flex-1 overflow-y-auto scrollbar-hide px-5 py-5 space-y-4"
        >
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center px-4">
              <p className="text-foreground/45 text-sm leading-relaxed max-w-md">{active.opener}</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary/15 border border-primary/25 text-foreground/90"
                    : "glass border border-foreground/[0.06] text-foreground/80"
                }`}
              >
                {m.role === "assistant" ? (
                  <div className="prose-chat">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="glass border border-foreground/[0.06] rounded-2xl px-4 py-3">
                <Loader2 className="w-4 h-4 text-foreground/40 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-foreground/[0.06] p-3">
          {interrupted && (
            <p role="alert" className="mb-2 rounded-xl border border-amber-400/30 p-3 text-xs text-amber-200">
              La respuesta anterior quedó incompleta por un corte de conexión. El texto recibido permanece visible.
              Puedes volver a enviar un mensaje para continuar.
            </p>
          )}
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              aria-label="Escribe tu mensaje al agente"
              placeholder="Escribe aquí…"
              className="flex-1 resize-none bg-transparent text-foreground/90 text-sm placeholder:text-foreground/30 focus:outline-none px-3 py-2 max-h-32 scrollbar-hide"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="press-spring shrink-0 w-9 h-9 rounded-full glass-laser laser-border flex items-center justify-center text-foreground/80 hover:text-laser disabled:opacity-40 disabled:pointer-events-none transition-all"
              aria-label="Enviar"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;