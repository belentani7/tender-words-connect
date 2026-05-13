import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/hooks/useLang";
import { RefreshCw, ExternalLink } from "lucide-react";

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
};

const STORAGE_KEY = "abrazo-news-v1";
const SIX_HOURS = 6 * 60 * 60 * 1000;

const FALLBACK: NewsItem[] = [
  {
    title: "La OMS recuerda que la salud mental es parte indivisible de la salud",
    link: "https://www.who.int/health-topics/mental-health",
    pubDate: new Date().toISOString(),
    source: "OMS",
    description: "Marco global de acción en salud mental 2013-2030.",
  },
  {
    title: "Guía clínica del NICE sobre trastorno límite de la personalidad",
    link: "https://www.nice.org.uk/guidance/cg78",
    pubDate: new Date().toISOString(),
    source: "NICE (UK)",
    description: "Recomendaciones basadas en evidencia para diagnóstico y tratamiento.",
  },
  {
    title: "Estudios longitudinales muestran remisión sostenida del TLP a 10-16 años",
    link: "https://pubmed.ncbi.nlm.nih.gov/?term=zanarini+borderline+remission",
    pubDate: new Date().toISOString(),
    source: "PubMed · Zanarini et al.",
    description: "La recuperación funcional es posible y frecuente.",
  },
  {
    title: "Marsha Linehan y el origen de la Terapia Dialéctica Conductual",
    link: "https://behavioraltech.org/about-us/about-marsha-linehan/",
    pubDate: new Date().toISOString(),
    source: "Behavioral Tech",
    description: "Cómo nació el tratamiento con más evidencia para TLP.",
  },
  {
    title: "Línea 024 de atención a la conducta suicida en España",
    link: "https://www.sanidad.gob.es/linea024/home.htm",
    pubDate: new Date().toISOString(),
    source: "Ministerio de Sanidad",
    description: "Servicio gratuito y confidencial 24/7.",
  },
  {
    title: "Centre LGTBI de Barcelona · servicios y horarios",
    link: "https://www.barcelona.cat/lgtbi/es",
    pubDate: new Date().toISOString(),
    source: "Ajuntament de Barcelona",
    description: "Atención psicológica, jurídica y social en la ciudad.",
  },
  {
    title: "ILGA World · informe anual sobre derechos LGBTI+",
    link: "https://ilga.org",
    pubDate: new Date().toISOString(),
    source: "ILGA World",
    description: "Mapa global y análisis país por país.",
  },
];

const fetchNews = async (): Promise<NewsItem[]> => {
  // Google News RSS through rss2json (free, no key, CORS-friendly)
  const queries = [
    "trastorno+l%C3%ADmite+de+la+personalidad",
    "salud+mental+TLP",
  ];
  const items: NewsItem[] = [];
  for (const q of queries) {
    const rssUrl = `https://news.google.com/rss/search?q=${q}&hl=es&gl=ES&ceid=ES:es`;
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      if (data.status !== "ok" || !Array.isArray(data.items)) continue;
      for (const it of data.items.slice(0, 10)) {
        items.push({
          title: it.title,
          link: it.link,
          pubDate: it.pubDate,
          source: (it.author || data.feed?.title || "Google News").replace(/^.*- /, ""),
          description: (it.description || "").replace(/<[^>]+>/g, "").slice(0, 220),
        });
      }
    } catch {
      /* ignore */
    }
  }
  // dedupe by link
  const seen = new Set<string>();
  return items.filter((i) => (seen.has(i.link) ? false : (seen.add(i.link), true)));
};

const NewsSection = () => {
  const { t } = useLang();
  const n = t.news!;
  const [items, setItems] = useState<NewsItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async (force = false) => {
    setLoading(true);
    setError(false);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && !force) {
        const parsed = JSON.parse(stored) as { items: NewsItem[]; updatedAt: number };
        setItems(parsed.items);
        setUpdatedAt(parsed.updatedAt);
        if (Date.now() - parsed.updatedAt < SIX_HOURS) {
          setLoading(false);
          return;
        }
      }
      const fresh = await fetchNews();
      let merged: NewsItem[];
      if (fresh.length === 0) {
        merged = stored ? (JSON.parse(stored).items as NewsItem[]) : FALLBACK;
        if (!stored) setError(true);
      } else {
        const prev: NewsItem[] = stored ? (JSON.parse(stored).items as NewsItem[]) : [];
        const seen = new Set(fresh.map((i) => i.link));
        merged = [...fresh, ...prev.filter((i) => !seen.has(i.link))].slice(0, 50);
      }
      const now = Date.now();
      setItems(merged);
      setUpdatedAt(now);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: merged, updatedAt: now }));
    } catch {
      setError(true);
      setItems(FALLBACK);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(false);
    const interval = setInterval(() => load(false), SIX_HOURS);
    return () => clearInterval(interval);
  }, [load]);

  const fmt = (ts: number | null) =>
    ts ? new Date(ts).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

  return (
    <div className="space-y-4">
      <div className="reveal flex items-center justify-between gap-4 flex-wrap">
        <p className="mono text-[10px] tracking-wider-2 text-foreground/50 uppercase">
          {n.lastUpdate}: {fmt(updatedAt)}
        </p>
        <button
          onClick={() => load(true)}
          disabled={loading}
          className="inline-flex items-center gap-2 mono text-[10px] tracking-wider-2 uppercase border border-foreground/20 hover:border-foreground/50 rounded-full px-3 py-1.5 text-foreground/70 hover:text-foreground transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          {loading ? n.refreshing : n.refresh}
        </button>
      </div>
      {error && (
        <div className="reveal glass rounded-2xl p-3 text-foreground/60 text-xs">{n.error}</div>
      )}
      {items.length === 0 && !loading && (
        <div className="reveal glass rounded-2xl p-4 text-foreground/60 text-sm">{n.empty}</div>
      )}
      {items.map((item, i) => (
        <div key={item.link + i} className="reveal glass laser-border rounded-2xl p-5">
          <p className="mono text-[10px] tracking-wider-2 text-primary/70 uppercase mb-2">
            {n.source} · {item.source}
            <span className="text-foreground/30"> · {new Date(item.pubDate).toLocaleDateString()}</span>
          </p>
          <h4 className="text-base font-light text-foreground/95 mb-2 leading-snug">{item.title}</h4>
          {item.description && (
            <p className="text-foreground/55 text-sm leading-relaxed mb-3">{item.description}</p>
          )}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mono text-[10px] tracking-wider-2 uppercase text-foreground/70 hover:text-laser"
          >
            {n.open} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsSection;
