import { useState, ReactNode } from "react";
import { useLang } from "@/hooks/useLang";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Heart, BookOpen, Eye, Shield, MessageCircleHeart, Scale, Users, ChevronRight, Wind, Handshake, HelpCircle, BookOpenCheck, Flame } from "lucide-react";

type Section = "home" | "understanding" | "signs" | "story" | "tools" | "boundaries" | "forBoth" | "whatIfMe" | "faq" | "glossary" | "farewell" | "community";

const SectionWrapper = ({ children, visible }: { children: ReactNode; visible: boolean }) => {
  if (!visible) return null;
  return <div className="animate-fade-in">{children}</div>;
};

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50 transition-all duration-300 hover:shadow-tender ${className}`}>
    {children}
  </div>
);

const Index = () => {
  const { t } = useLang();
  const [section, setSection] = useState<Section>("home");

  const goTo = (s: Section) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems: { id: Section; label: string; icon: ReactNode }[] = [
    { id: "home", label: t.nav.home, icon: <Heart className="w-4 h-4" /> },
    { id: "understanding", label: t.nav.understanding, icon: <BookOpen className="w-4 h-4" /> },
    { id: "signs", label: t.nav.signs, icon: <Eye className="w-4 h-4" /> },
    { id: "story", label: t.nav.story, icon: <MessageCircleHeart className="w-4 h-4" /> },
    { id: "tools", label: t.nav.tools, icon: <Shield className="w-4 h-4" /> },
    { id: "boundaries", label: t.nav.boundaries, icon: <Scale className="w-4 h-4" /> },
    { id: "forBoth", label: t.nav.forBoth, icon: <Handshake className="w-4 h-4" /> },
    { id: "whatIfMe", label: t.nav.whatIfMe, icon: <HelpCircle className="w-4 h-4" /> },
    { id: "faq", label: t.nav.faq, icon: <BookOpenCheck className="w-4 h-4" /> },
    { id: "glossary", label: t.nav.glossary, icon: <BookOpen className="w-4 h-4" /> },
    { id: "farewell", label: t.nav.farewell, icon: <Flame className="w-4 h-4" /> },
    { id: "community", label: t.nav.community, icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <h1 className="text-xl md:text-2xl font-bold text-gradient-primary">{t.header.title}</h1>
            </div>
            <LanguageSwitcher />
          </div>
          <p className="text-muted-foreground text-xs md:text-sm leading-snug">{t.header.subtitle}</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[72px] md:top-[76px] z-40 bg-background/60 backdrop-blur-md border-b border-border/30">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  section === item.id
                    ? "bg-primary text-primary-foreground shadow-tender"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 md:py-10">

        {/* ─── HOME ─── */}
        <SectionWrapper visible={section === "home"}>
          <div className="bg-gradient-hero rounded-3xl p-6 md:p-10 mb-6 border border-primary/10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{t.home.heroTitle}</h2>
            <p className="text-foreground/80 leading-relaxed mb-3">{t.home.heroP1}</p>
            <p className="text-foreground font-semibold mb-3">{t.home.heroP2}</p>
            <p className="text-foreground/80 leading-relaxed mb-5">{t.home.heroP3}</p>
            <button onClick={() => goTo("understanding")} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium shadow-tender hover:opacity-90 transition-all">
              {t.home.ctaButton}
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: t.home.card1Title, desc: t.home.card1Desc },
              { title: t.home.card2Title, desc: t.home.card2Desc },
              { title: t.home.card3Title, desc: t.home.card3Desc },
            ].map((c, i) => (
              <Card key={i}>
                <h3 className="text-base font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* ─── UNDERSTANDING ─── */}
        <SectionWrapper visible={section === "understanding"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.understanding.title}</h2>
          <p className="text-muted-foreground mb-6 text-base italic leading-relaxed">{t.understanding.intro}</p>
          <div className="space-y-4 mb-6">
            {[
              { icon: "🔥", title: t.understanding.emotionalSkinTitle, desc: t.understanding.emotionalSkinDesc },
              { icon: "🚪", title: t.understanding.abandonmentTitle, desc: t.understanding.abandonmentDesc },
              { icon: "🕳️", title: t.understanding.voidTitle, desc: t.understanding.voidDesc },
            ].map((item, i) => (
              <Card key={i}>
                <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2"><span>{item.icon}</span>{item.title}</h3>
                <p className="text-foreground/80 leading-relaxed text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
          <div className="bg-warm/10 border-l-4 border-warm rounded-r-xl p-4 mb-6 text-foreground/80 text-sm italic">{t.understanding.closingNote}</div>
          <Card>
            <h3 className="text-base font-semibold text-foreground mb-4">{t.understanding.clinicalTitle}</h3>
            <div className="space-y-3">
              {t.understanding.clinicalPoints.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-healing mt-0.5">✓</span>
                  <div><span className="font-medium text-foreground">{p.title}: </span><span className="text-foreground/70 text-sm">{p.desc}</span></div>
                </div>
              ))}
            </div>
          </Card>
        </SectionWrapper>

        {/* ─── SIGNS ─── */}
        <SectionWrapper visible={section === "signs"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.signs.title}</h2>
          <p className="text-muted-foreground mb-6 italic leading-relaxed">{t.signs.intro}</p>
          <div className="space-y-4 mb-6">
            {t.signs.patterns.map((p, i) => (
              <Card key={i} className="border-l-4 border-l-warm">
                <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2"><span className="text-warm">🚩</span>{p.title}</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
          <div className="bg-healing/10 border-l-4 border-healing rounded-r-xl p-4 text-foreground/80 text-sm italic">{t.signs.closingNote}</div>
        </SectionWrapper>

        {/* ─── STORY ─── */}
        <SectionWrapper visible={section === "story"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">{t.story.title}</h2>
          <p className="text-muted-foreground text-sm mb-6">{t.story.subtitle}</p>
          <div className="bg-gradient-warm rounded-2xl p-6 md:p-8 mb-6 border border-primary/15">
            <p className="text-foreground italic text-lg leading-relaxed">"{t.story.quote}"</p>
          </div>
          <Card className="mb-6">
            <p className="text-foreground/80 leading-relaxed mb-4">{t.story.intro}</p>
            <p className="text-foreground/80 leading-relaxed mb-4">{t.story.bodyP1}</p>
            <div className="my-5 space-y-1">
              <p className="text-foreground font-semibold italic">{t.story.bodyP2}</p>
              <p className="text-foreground font-semibold italic">{t.story.bodyP3}</p>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">{t.story.bodyP4}</p>
            <p className="text-foreground/80 leading-relaxed">{t.story.bodyP5}</p>
          </Card>
          <p className="text-muted-foreground text-xs text-center italic">{t.story.credit}</p>
        </SectionWrapper>

        {/* ─── TOOLS ─── */}
        <SectionWrapper visible={section === "tools"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.tools.title}</h2>
          <p className="text-muted-foreground mb-6 italic">{t.tools.intro}</p>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-4">{t.tools.validationTitle}</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-muted/50 rounded-xl p-3"><p className="text-foreground/80">💬 {t.tools.validationSituation}</p></div>
              <div className="bg-destructive/5 rounded-xl p-3 border-l-3 border-l-destructive/40"><p className="text-foreground/70">❌ {t.tools.validationWrong}</p></div>
              <div className="bg-healing/5 rounded-xl p-3 border-l-3 border-l-healing"><p className="text-foreground/90">✅ {t.tools.validationRight}</p></div>
              <p className="text-muted-foreground text-xs italic pt-1">{t.tools.validationWhy}</p>
            </div>
          </Card>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-4">{t.tools.trafficLightTitle}</h3>
            <div className="space-y-3">
              {[
                { label: t.tools.redLabel, desc: t.tools.redDesc, color: "bg-destructive/8 border-l-destructive/50" },
                { label: t.tools.yellowLabel, desc: t.tools.yellowDesc, color: "bg-warm/8 border-l-warm" },
                { label: t.tools.greenLabel, desc: t.tools.greenDesc, color: "bg-healing/8 border-l-healing" },
              ].map((light, i) => (
                <div key={i} className={`rounded-xl p-3 border-l-4 ${light.color}`}>
                  <p className="font-medium text-foreground text-sm mb-1">{light.label}</p>
                  <p className="text-foreground/70 text-sm">{light.desc}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
              <Wind className="w-4 h-4 text-primary" />{t.tools.breathingTitle}
            </h3>
            <p className="text-foreground/80 text-sm leading-relaxed">{t.tools.breathingDesc}</p>
            <div className="flex gap-3 mt-4 justify-center">
              {[
                { n: "4", label: t.tools.breathingInhale },
                { n: "7", label: t.tools.breathingHold },
                { n: "8", label: t.tools.breathingExhale },
              ].map((step, i) => (
                <div key={i} className="bg-primary/5 rounded-xl px-5 py-3 text-center">
                  <p className="text-2xl font-bold text-primary">{step.n}</p>
                  <p className="text-xs text-muted-foreground">{step.label}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-2">{t.tools.communicationTitle}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.tools.communicationIntro}</p>
            <div className="space-y-3">
              {t.tools.commPoints.map((cp, i) => (
                <div key={i} className="flex gap-3">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div><span className="font-medium text-foreground text-sm">{cp.title}: </span><span className="text-foreground/70 text-sm">{cp.desc}</span></div>
                </div>
              ))}
            </div>
          </Card>
          <div className="bg-destructive/5 border-l-4 border-destructive/40 rounded-r-xl p-4 text-sm">
            <p className="font-medium text-foreground mb-1">{t.tools.dontDoTitle}</p>
            <p className="text-foreground/70">{t.tools.dontDoDesc}</p>
          </div>
        </SectionWrapper>

        {/* ─── BOUNDARIES ─── */}
        <SectionWrapper visible={section === "boundaries"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.boundaries.title}</h2>
          <p className="text-muted-foreground mb-6 italic leading-relaxed">{t.boundaries.intro}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="border-l-4 border-l-destructive/40">
              <h4 className="text-sm font-semibold text-destructive/80 mb-2">{t.boundaries.badTitle}</h4>
              <p className="text-foreground/80 text-sm italic mb-2">{t.boundaries.badExample}</p>
              <p className="text-muted-foreground text-xs">{t.boundaries.badExplain}</p>
            </Card>
            <Card className="border-l-4 border-l-healing">
              <h4 className="text-sm font-semibold text-healing mb-2">{t.boundaries.goodTitle}</h4>
              <p className="text-foreground/80 text-sm italic">{t.boundaries.goodExample}</p>
            </Card>
          </div>
          <Card className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-4">{t.boundaries.tipsTitle}</h3>
            <div className="space-y-3">
              {t.boundaries.tips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div><span className="font-medium text-foreground text-sm">{tip.title}: </span><span className="text-foreground/70 text-sm">{tip.desc}</span></div>
                </div>
              ))}
            </div>
          </Card>
          <div className="bg-gradient-warm rounded-2xl p-6 border border-primary/15">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Heart className="w-4 h-4 text-primary" />{t.boundaries.hardestTitle}</h4>
            <p className="text-foreground/80 text-sm leading-relaxed italic">{t.boundaries.hardestDesc}</p>
          </div>
        </SectionWrapper>

        {/* ─── FOR BOTH ─── */}
        <SectionWrapper visible={section === "forBoth"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">{t.forBoth.title}</h2>
          <p className="text-muted-foreground text-sm mb-4 italic">{t.forBoth.subtitle}</p>
          <p className="text-foreground/80 leading-relaxed mb-6">{t.forBoth.intro}</p>

          {/* Side A */}
          <div className="mb-6">
            <div className="bg-healing/10 rounded-2xl p-5 md:p-6 border border-healing/20 mb-4">
              <h3 className="text-lg font-bold text-healing mb-1">{t.forBoth.sideATitle}</h3>
              <p className="text-foreground/70 text-sm italic">{t.forBoth.sideASubtitle}</p>
            </div>
            <div className="space-y-4">
              {t.forBoth.sideAPoints.map((p, i) => (
                <Card key={i} className="border-l-4 border-l-healing/40">
                  <h4 className="font-semibold text-foreground mb-2">{p.title}</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Side B */}
          <div>
            <div className="bg-warm/10 rounded-2xl p-5 md:p-6 border border-warm/20 mb-4">
              <h3 className="text-lg font-bold text-warm mb-1">{t.forBoth.sideBTitle}</h3>
              <p className="text-foreground/70 text-sm italic">{t.forBoth.sideBSubtitle}</p>
            </div>
            <div className="space-y-4">
              {t.forBoth.sideBPoints.map((p, i) => (
                <Card key={i} className="border-l-4 border-l-warm/40">
                  <h4 className="font-semibold text-foreground mb-2">{p.title}</h4>
                  <p className="text-foreground/70 text-sm leading-relaxed">{p.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* ─── WHAT IF ME ─── */}
        <SectionWrapper visible={section === "whatIfMe"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">{t.whatIfMe.title}</h2>
          <p className="text-muted-foreground text-sm mb-6 italic">{t.whatIfMe.subtitle}</p>
          <Card className="mb-6">
            <p className="text-foreground/80 leading-relaxed">{t.whatIfMe.intro}</p>
          </Card>

          <h3 className="text-base font-semibold text-foreground mb-2">{t.whatIfMe.signsTitle}</h3>
          <p className="text-muted-foreground text-sm mb-4 italic">{t.whatIfMe.signsIntro}</p>
          <div className="space-y-4 mb-6">
            {t.whatIfMe.signs.map((s, i) => (
              <Card key={i} className="border-l-4 border-l-tender">
                <h4 className="font-semibold text-foreground mb-1">{s.title}</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>

          <h3 className="text-base font-semibold text-foreground mb-4">{t.whatIfMe.stepsTitle}</h3>
          <div className="space-y-4 mb-6">
            {t.whatIfMe.steps.map((s, i) => (
              <Card key={i} className="border-l-4 border-l-primary/40">
                <h4 className="font-semibold text-foreground mb-2">{s.title}</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-warm rounded-2xl p-6 border border-primary/15 text-center">
            <p className="text-foreground/80 text-sm leading-relaxed italic">{t.whatIfMe.closingNote}</p>
          </div>
        </SectionWrapper>

        {/* ─── FAQ ─── */}
        <SectionWrapper visible={section === "faq"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.faq.title}</h2>
          <p className="text-muted-foreground mb-6 italic">{t.faq.intro}</p>
          <div className="space-y-4">
            {t.faq.questions.map((faq, i) => (
              <Card key={i}>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-primary">❓</span>{faq.q}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* ─── GLOSSARY ─── */}
        <SectionWrapper visible={section === "glossary"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.glossary.title}</h2>
          <p className="text-muted-foreground mb-6 italic">{t.glossary.intro}</p>
          <div className="space-y-4">
            {t.glossary.terms.map((term, i) => (
              <Card key={i}>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-primary">📖</span>{term.term}
                </h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{term.def}</p>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* ─── FAREWELL ─── */}
        <SectionWrapper visible={section === "farewell"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">{t.farewell.title}</h2>
          <p className="text-muted-foreground text-sm mb-6 italic">{t.farewell.subtitle}</p>
          <Card className="mb-6">
            <p className="text-foreground/80 leading-relaxed">{t.farewell.intro}</p>
          </Card>
          <div className="bg-gradient-warm rounded-2xl p-6 md:p-8 mb-6 border border-primary/15">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span>🕯️</span>{t.farewell.letterTitle}
            </h3>
            <p className="text-foreground/80 italic text-base leading-relaxed">{t.farewell.letterText}</p>
          </div>
          <div className="bg-healing/10 border-l-4 border-healing rounded-r-xl p-4 text-foreground/80 text-sm italic">
            {t.farewell.closingNote}
          </div>
        </SectionWrapper>

        {/* ─── COMMUNITY ─── */}
        <SectionWrapper visible={section === "community"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.community.title}</h2>
          <p className="text-muted-foreground mb-6 italic">{t.community.intro}</p>
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-3">{t.community.lettersTitle}</h3>
            <div className="space-y-3">
              {t.community.letters.map((letter, i) => (
                <Card key={i} className="border-l-4 border-l-tender">
                  <p className="text-foreground/80 text-sm italic leading-relaxed">"{letter.text}"</p>
                  <p className="text-muted-foreground text-xs mt-2">— {letter.author}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-2">{t.community.selfCareTitle}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.community.selfCareIntro}</p>
            <div className="space-y-3">
              {t.community.selfCarePoints.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div><span className="font-medium text-foreground text-sm">{p.title}: </span><span className="text-foreground/70 text-sm">{p.desc}</span></div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-2">{t.community.recoveryTitle}</h3>
            <p className="text-muted-foreground text-sm mb-4">{t.community.recoveryIntro}</p>
            <div className="space-y-3">
              {t.community.recoveryPoints.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div><span className="font-medium text-foreground text-sm">{p.title}: </span><span className="text-foreground/70 text-sm">{p.desc}</span></div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mb-5">
            <h3 className="text-base font-semibold text-foreground mb-2">{t.community.resourcesTitle}</h3>
            <p className="text-muted-foreground text-sm mb-3">{t.community.resourcesIntro}</p>
            <ul className="space-y-1.5 ml-4 list-disc text-foreground/80 text-sm">
              {t.community.resources.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </Card>
          <div className="bg-gradient-warm rounded-2xl p-6 border border-primary/15">
            <h3 className="font-semibold text-foreground mb-3">{t.community.conclusionTitle}</h3>
            <p className="text-foreground/80 text-sm leading-relaxed mb-3">{t.community.conclusionText}</p>
            <p className="text-foreground font-medium text-sm italic">{t.community.conclusionFinal}</p>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border/50 mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs mb-1">{t.footer.line1}</p>
          <p className="text-muted-foreground/60 text-xs mb-2">{t.footer.line2}</p>
          <p className="text-muted-foreground/40 text-xs">{t.footer.line3}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
