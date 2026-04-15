import { useLang, langLabels, Lang } from "@/hooks/useLang";

const langs: Lang[] = ["es", "en", "pt", "ca"];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="flex gap-2 flex-wrap">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            lang === l
              ? "bg-primary text-primary-foreground shadow-tender"
              : "bg-secondary text-secondary-foreground hover:bg-primary/10"
          }`}
        >
          {langLabels[l]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
