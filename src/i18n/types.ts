export type Lang = "es" | "en" | "pt" | "ca";

export const langLabels: Record<Lang, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
  ca: "Català",
};

export interface Translations {
  nav: {
    home: string;
    understanding: string;
    signs: string;
    story: string;
    tools: string;
    boundaries: string;
    forBoth: string;
    whatIfMe: string;
    faq: string;
    glossary: string;
    farewell: string;
    community: string;
  };
  header: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  home: {
    heroTitle: string;
    heroP1: string;
    heroP2: string;
    heroP3: string;
    ctaButton: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  understanding: {
    title: string;
    intro: string;
    emotionalSkinTitle: string;
    emotionalSkinDesc: string;
    abandonmentTitle: string;
    abandonmentDesc: string;
    voidTitle: string;
    voidDesc: string;
    closingNote: string;
    clinicalTitle: string;
    clinicalPoints: { title: string; desc: string }[];
  };
  signs: {
    title: string;
    intro: string;
    patterns: { title: string; desc: string }[];
    closingNote: string;
  };
  story: {
    title: string;
    subtitle: string;
    quote: string;
    intro: string;
    bodyP1: string;
    bodyP2: string;
    bodyP3: string;
    bodyP4: string;
    bodyP5: string;
    credit: string;
  };
  tools: {
    title: string;
    intro: string;
    validationTitle: string;
    validationSituation: string;
    validationWrong: string;
    validationRight: string;
    validationWhy: string;
    trafficLightTitle: string;
    redLabel: string;
    redDesc: string;
    yellowLabel: string;
    yellowDesc: string;
    greenLabel: string;
    greenDesc: string;
    breathingTitle: string;
    breathingDesc: string;
    breathingInhale: string;
    breathingHold: string;
    breathingExhale: string;
    communicationTitle: string;
    communicationIntro: string;
    commPoints: { title: string; desc: string }[];
    dontDoTitle: string;
    dontDoDesc: string;
  };
  boundaries: {
    title: string;
    intro: string;
    badTitle: string;
    badExample: string;
    badExplain: string;
    goodTitle: string;
    goodExample: string;
    hardestTitle: string;
    hardestDesc: string;
    tipsTitle: string;
    tips: { title: string; desc: string }[];
  };
  forBoth: {
    title: string;
    subtitle: string;
    intro: string;
    sideATitle: string;
    sideASubtitle: string;
    sideAPoints: { title: string; desc: string }[];
    sideBTitle: string;
    sideBSubtitle: string;
    sideBPoints: { title: string; desc: string }[];
  };
  whatIfMe: {
    title: string;
    subtitle: string;
    intro: string;
    signsTitle: string;
    signsIntro: string;
    signs: { title: string; desc: string }[];
    stepsTitle: string;
    steps: { title: string; desc: string }[];
    closingNote: string;
  };
  faq: {
    title: string;
    intro: string;
    questions: { q: string; a: string }[];
  };
  glossary: {
    title: string;
    intro: string;
    terms: { term: string; def: string }[];
  };
  farewell: {
    title: string;
    subtitle: string;
    intro: string;
    letterTitle: string;
    letterText: string;
    closingNote: string;
  };
  community: {
    title: string;
    intro: string;
    lettersTitle: string;
    letters: { text: string; author: string }[];
    resourcesTitle: string;
    resourcesIntro: string;
    resources: string[];
    selfCareTitle: string;
    selfCareIntro: string;
    selfCarePoints: { title: string; desc: string }[];
    recoveryTitle: string;
    recoveryIntro: string;
    recoveryPoints: { title: string; desc: string }[];
    conclusionTitle: string;
    conclusionText: string;
    conclusionFinal: string;
  };
  footer: {
    line1: string;
    line2: string;
    line3: string;
  };
}
