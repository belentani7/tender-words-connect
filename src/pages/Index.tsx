import { useState, ReactNode } from "react";
import { useLang } from "@/hooks/useLang";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Heart, BookOpen, Eye, Shield, MessageCircleHeart, Scale, Users, ChevronRight } from "lucide-react";

type Section = "home" | "what" | "signs" | "story" | "tools" | "boundaries" | "community";

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

  const navItems: { id: Section; label: string; icon: ReactNode }[] = [
    { id: "home", label: t.nav.home, icon: <Heart className="w-4 h-4" /> },
    { id: "what", label: t.nav.what, icon: <BookOpen className="w-4 h-4" /> },
    { id: "signs", label: t.nav.signs, icon: <Eye className="w-4 h-4" /> },
    { id: "story", label: t.nav.story, icon: <MessageCircleHeart className="w-4 h-4" /> },
    { id: "tools", label: t.nav.tools, icon: <Shield className="w-4 h-4" /> },
    { id: "boundaries", label: t.nav.boundaries, icon: <Scale className="w-4 h-4" /> },
    { id: "community", label: t.nav.community, icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient-primary">{t.header.title}</h1>
            </div>
            <LanguageSwitcher />
          </div>
          <p className="text-muted-foreground text-sm md:text-base">{t.header.subtitle}</p>
          <p className="text-muted-foreground/60 text-xs mt-1">{t.header.tagline}</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[100px] md:top-[120px] z-40 bg-background/60 backdrop-blur-md border-b border-border/30">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
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
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">

        {/* HOME */}
        <SectionWrapper visible={section === "home"}>
          <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 mb-8 border border-primary/10">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{t.home.heroTitle}</h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-4">{t.home.heroP1}</p>
            <p className="text-foreground/80 text-lg leading-relaxed">{t.home.heroP2}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "📚", title: t.home.card1Title, desc: t.home.card1Desc },
              { icon: "🌿", title: t.home.card2Title, desc: t.home.card2Desc },
              { icon: "💛", title: t.home.card3Title, desc: t.home.card3Desc },
            ].map((c, i) => (
              <Card key={i}>
                <span className="text-2xl mb-3 block">{c.icon}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* WHAT IS BPD */}
        <SectionWrapper visible={section === "what"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-8">{t.what.title}</h2>
          
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.what.clinicalTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.what.clinicalIntro}</p>
            <ul className="space-y-2">
              {t.what.symptoms.map((s, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <span className="text-healing mt-0.5">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="bg-warm/10 border-l-4 border-warm rounded-r-xl p-4 mb-6 text-foreground/80">
            ⚠️ {t.what.warningNote}
          </div>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.what.whyTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.what.whyIntro}</p>
            <ul className="space-y-2 ml-4 list-disc text-foreground/80">
              {t.what.whyPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </Card>

          <div className="bg-healing/10 border-l-4 border-healing rounded-r-xl p-4 text-foreground/80">
            ✓ {t.what.truthNote}
          </div>
        </SectionWrapper>

        {/* SIGNS */}
        <SectionWrapper visible={section === "signs"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-8">{t.signs.title}</h2>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-destructive/80 mb-4">{t.signs.patternsTitle}</h3>
            <ul className="space-y-3">
              {t.signs.patterns.map((p, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <span className="text-destructive/60 mt-0.5">🚩</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="bg-warm/10 border-l-4 border-warm rounded-r-xl p-4 mb-6 text-foreground/80">
            {t.signs.warningNote}
          </div>

          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.signs.whatToDoTitle}</h3>
            <ol className="space-y-3 list-decimal ml-5 text-foreground/80">
              {t.signs.whatToDo.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
            </ol>
          </Card>
        </SectionWrapper>

        {/* STORY */}
        <SectionWrapper visible={section === "story"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-4">{t.story.title}</h2>
          <p className="text-muted-foreground mb-8 text-lg italic">{t.story.intro}</p>

          <Card className="border-l-4 border-l-primary mb-6">
            <h4 className="text-primary font-semibold mb-2">{t.story.beginningTitle}</h4>
            <p className="text-foreground/80 leading-relaxed">{t.story.beginningText}</p>
          </Card>

          <Card className="border-l-4 border-l-warm mb-6">
            <h4 className="text-warm font-semibold mb-2">{t.story.turnTitle}</h4>
            <p className="text-foreground/80 leading-relaxed mb-3">{t.story.turnText}</p>
            <p className="text-foreground/80 leading-relaxed">{t.story.turnText2}</p>
          </Card>

          <Card className="border-l-4 border-l-destructive mb-6">
            <h4 className="text-destructive font-semibold mb-2">{t.story.collapseTitle}</h4>
            <p className="text-foreground/80 leading-relaxed">{t.story.collapseText}</p>
          </Card>

          {/* THE APOLOGY — tender, central */}
          <div className="bg-gradient-warm rounded-3xl p-8 md:p-10 mb-6 border border-primary/20">
            <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              {t.story.apologyTitle}
            </h4>
            <p className="text-foreground/90 leading-relaxed italic text-lg">{t.story.apologyText}</p>
          </div>

          <Card className="mb-6">
            <h4 className="text-foreground font-semibold mb-4">{t.story.lessonTitle}</h4>
            <ul className="space-y-2">
              {t.story.lessons.map((l, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="bg-healing/10 border-l-4 border-healing rounded-r-xl p-4 text-foreground/80 italic">
            {t.story.endNote}
          </div>
        </SectionWrapper>

        {/* TOOLS */}
        <SectionWrapper visible={section === "tools"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-8">{t.tools.title}</h2>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.tools.diaryTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.tools.diaryIntro}</p>
            <textarea
              className="w-full bg-background border border-border rounded-xl p-4 text-foreground/80 text-sm font-mono min-h-[200px] resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder={t.tools.diaryPlaceholder}
            />
          </Card>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.tools.questionsTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.tools.questionsIntro}</p>
            <div className="space-y-4">
              {[
                { q: t.tools.q1, d: t.tools.q1Desc },
                { q: t.tools.q2, d: t.tools.q2Desc },
                { q: t.tools.q3, d: t.tools.q3Desc },
              ].map((item, i) => (
                <div key={i} className="bg-primary/5 rounded-xl p-4 border-l-3 border-l-primary">
                  <p className="font-semibold text-foreground mb-1">{item.q}</p>
                  <p className="text-muted-foreground text-sm">{item.d}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.tools.boundaryPhraseTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.tools.boundaryPhraseIntro}</p>
            <div className="bg-healing/5 rounded-xl p-5 border-l-4 border-healing mb-4">
              <p className="text-foreground font-medium italic">{t.tools.boundaryTemplate}</p>
            </div>
            <div className="space-y-2">
              {t.tools.boundaryExamples.map((ex, i) => (
                <p key={i} className="text-foreground/70 text-sm pl-4 border-l-2 border-border">{ex}</p>
              ))}
            </div>
          </Card>
        </SectionWrapper>

        {/* BOUNDARIES */}
        <SectionWrapper visible={section === "boundaries"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-8">{t.boundaries.title}</h2>

          <Card className="mb-6 overflow-hidden">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.boundaries.differenceTitle}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left p-3 text-destructive/80 font-semibold rounded-tl-lg">{t.boundaries.withoutLabel}</th>
                    <th className="text-left p-3 text-healing font-semibold rounded-tr-lg">{t.boundaries.withLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.boundaries.rows.map(([without, withB], i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                      <td className="p-3 text-foreground/70 border-t border-border/30">{without}</td>
                      <td className="p-3 text-foreground/90 border-t border-border/30">{withB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.boundaries.essentialTitle}</h3>
            <ol className="space-y-3 list-decimal ml-5 text-foreground/80">
              {t.boundaries.essentials.map((e, i) => <li key={i} className="leading-relaxed">{e}</li>)}
            </ol>
          </Card>

          <div className="bg-healing/10 border-l-4 border-healing rounded-r-xl p-4 text-foreground/80 italic">
            {t.boundaries.paradoxNote}
          </div>
        </SectionWrapper>

        {/* COMMUNITY */}
        <SectionWrapper visible={section === "community"}>
          <h2 className="text-2xl md:text-3xl font-bold text-gradient-primary mb-8">{t.community.title}</h2>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.community.notAloneTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.community.notAloneIntro}</p>
            <ul className="space-y-2 ml-4 list-disc text-foreground/80">
              {t.community.resources.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </Card>

          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.community.whenToLeaveTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.community.whenToLeaveIntro}</p>
            <ul className="space-y-2 ml-4 list-disc text-foreground/80">
              {t.community.whenToLeave.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </Card>

          <div className="bg-warm/10 border-l-4 border-warm rounded-r-xl p-4 mb-6 text-foreground/80">
            {t.community.finalWarning}
          </div>

          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-3">{t.community.epilogueTitle}</h3>
            <p className="text-foreground/80 mb-3">{t.community.epilogueP1}</p>
            <p className="text-foreground/80 mb-4">{t.community.epilogueP2}</p>
            <p className="text-foreground font-semibold italic text-lg">{t.community.epilogueFinal}</p>
          </Card>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border/50 mt-16 py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm mb-2">{t.footer.createdFrom}</p>
          <p className="text-muted-foreground/60 text-xs mb-4">{t.footer.credit}</p>
          <p className="text-muted-foreground/40 text-xs">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
