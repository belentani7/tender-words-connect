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
    what: string;
    signs: string;
    story: string;
    tools: string;
    boundaries: string;
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
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  what: {
    title: string;
    clinicalTitle: string;
    clinicalIntro: string;
    symptoms: string[];
    warningNote: string;
    whyTitle: string;
    whyIntro: string;
    whyPoints: string[];
    truthNote: string;
  };
  signs: {
    title: string;
    patternsTitle: string;
    patterns: string[];
    warningNote: string;
    whatToDoTitle: string;
    whatToDo: string[];
  };
  story: {
    title: string;
    intro: string;
    beginningTitle: string;
    beginningText: string;
    turnTitle: string;
    turnText: string;
    turnText2: string;
    collapseTitle: string;
    collapseText: string;
    apologyTitle: string;
    apologyText: string;
    lessonTitle: string;
    lessons: string[];
    endNote: string;
  };
  tools: {
    title: string;
    diaryTitle: string;
    diaryIntro: string;
    diaryPlaceholder: string;
    questionsTitle: string;
    questionsIntro: string;
    q1: string;
    q1Desc: string;
    q2: string;
    q2Desc: string;
    q3: string;
    q3Desc: string;
    boundaryPhraseTitle: string;
    boundaryPhraseIntro: string;
    boundaryTemplate: string;
    boundaryExamples: string[];
  };
  boundaries: {
    title: string;
    differenceTitle: string;
    withoutLabel: string;
    withLabel: string;
    rows: [string, string][];
    essentialTitle: string;
    essentials: string[];
    paradoxNote: string;
  };
  community: {
    title: string;
    notAloneTitle: string;
    notAloneIntro: string;
    resources: string[];
    whenToLeaveTitle: string;
    whenToLeaveIntro: string;
    whenToLeave: string[];
    finalWarning: string;
    epilogueTitle: string;
    epilogueP1: string;
    epilogueP2: string;
    epilogueFinal: string;
  };
  footer: {
    createdFrom: string;
    credit: string;
    copyright: string;
  };
}

export const translations: Record<Lang, Translations> = {
  es: {
    nav: {
      home: "Inicio",
      what: "¿Qué es TLP?",
      signs: "Señales",
      story: "Nuestra Historia",
      tools: "Herramientas",
      boundaries: "Límites",
      community: "Comunidad",
    },
    header: {
      title: "ABRAZO",
      subtitle: "Para quienes aman a alguien con Trastorno Límite de la Personalidad",
      tagline: "Nacido del dolor. Construido con ternura. Para que otros entiendan.",
    },
    home: {
      heroTitle: "Amas a alguien que sufre. Y tú también sufres.",
      heroP1: "Amas con todo el corazón. Pero cada día es diferente. Hay días de amor puro, de risas, de sentir que nada puede separarlos. Y hay días en que todo se rompe sin aviso — donde te conviertes en el enemigo sin saber por qué.",
      heroP2: "Este sitio existe para ti. No para juzgar. No para diagnosticar. Sino para ofrecerte comprensión, herramientas, y la verdad más tierna que conozco: puedes amar profundamente a alguien y aun así necesitar soltar.",
      card1Title: "Comprende",
      card1Desc: "Entiende qué es TLP desde el corazón de quien ama a alguien que lo tiene.",
      card2Title: "Reconoce patrones",
      card2Desc: "Identifica lo que pasa sin culpar. Con compasión, nunca con juicio.",
      card3Title: "Cuídate",
      card3Desc: "Aprende a poner límites que honren tu amor y protejan tu paz.",
    },
    what: {
      title: "¿Qué es el Trastorno Límite de la Personalidad?",
      clinicalTitle: "Lo que dice la ciencia, dicho con el corazón",
      clinicalIntro: "El TLP es un trastorno que causa un dolor inmenso — tanto a quien lo vive como a quien lo ama. Se caracteriza por:",
      symptoms: [
        "Miedo intenso al abandono — real o imaginado",
        "Relaciones intensas pero inestables — idealización seguida de devaluación",
        "Identidad inestable — no saben quiénes son realmente",
        "Impulsividad que puede ser destructiva",
        "Cambios emocionales rápidos — de amor extremo a rechazo en horas",
        "Rabia intensa que puede sentirse desproporcionada",
        "Un vacío crónico que nada parece llenar",
        "En los peores momentos, autolesión o amenazas",
      ],
      warningNote: "Nada de esto es su culpa. Pero tu bienestar también importa. Ambas verdades coexisten.",
      whyTitle: "¿Por qué aman así?",
      whyIntro: "Alguien con TLP ama con una intensidad que puede ser abrumadora porque:",
      whyPoints: [
        "Necesitan validación constante para sentirse reales",
        "Cargan un miedo existencial al abandono que viene de heridas antiguas",
        "No pueden regular sus emociones — oscilan entre extremos",
        "A veces confunden control con seguridad",
        "No toleran la ambigüedad — eres todo bueno o todo malo",
      ],
      truthNote: "Pueden sentir amor genuino. Pueden sanar con terapia (DBT). Pero tu amor solo no es suficiente para curar su TLP. Eso no es tu fracaso — es la realidad.",
    },
    signs: {
      title: "Señales que quizás reconoces",
      patternsTitle: "Si ves estos patrones en los primeros meses:",
      patterns: [
        "\"Eres perfecto, eres mi salvación\" — muy rápido, muy intenso",
        "Te pide constantemente que confirmes tu amor — y nunca es suficiente",
        "Te ama profundamente... y horas después no siente nada por ti",
        "Habla de futuro en semanas — matrimonio, hijos, para siempre",
        "\"Si me amas, harías X\" — el amor como condición, no como regalo",
        "Quiere que dejes a amigos o familia por él",
        "Inconsistencias que no parecen maliciosas, pero confunden",
        "Crisis emocionales extremas — amenazas, autolesión",
      ],
      warningNote: "Si reconoces varios de estos signos, no significa que no merezca amor. Significa que su sanación no depende de ti. Y que mereces protegerte.",
      whatToDoTitle: "¿Qué hacer si reconoces esto?",
      whatToDo: [
        "No huyas asustado. Pero tampoco cierres los ojos.",
        "Habla con ternura: \"He notado que cambian tus sentimientos rápidamente. ¿Podemos hablar de esto juntos?\"",
        "Sugiere terapia DBT — no como ultimátum, sino como puente hacia la paz.",
        "Establece límites con amor desde el primer día.",
        "Pregúntate honestamente: ¿Puedo amar a esta persona tal como es? ¿O estoy esperando que cambie?",
      ],
    },
    story: {
      title: "Nuestra Historia",
      intro: "Esta historia es real. No es única. Es la danza que millones de personas bailan cada día — la del amor que duele, que confunde, que transforma.",
      beginningTitle: "El comienzo",
      beginningText: "Pedro vio en Thiago alguien a quien podía abrazar con todo su ser. Le dio casa, apoyo, empresa, defensa, amor sin condiciones. Durante un tiempo, Thiago lo idealizó. Fueron los días más luminosos de la vida de Pedro.",
      turnTitle: "El giro",
      turnText: "Cuando Pedro quiso profundizar la intimidad, Thiago sintió pánico. \"No confundas el vínculo,\" dijo. Pedro lo sintió como frialdad. Thiago lo sintió como invasión. Ambos tenían razón. Ambos tenían miedo.",
      turnText2: "Pedro llenó el silencio con análisis. Thiago llenó el vacío trayendo a otros. El ciclo de idealización y devaluación ya había comenzado.",
      collapseTitle: "El colapso",
      collapseText: "Thiago hizo cosas que lastimaron profundamente a Pedro — acusaciones falsas, traiciones, manipulación. Pedro, herido y desesperado, respondió con crueldad — mensajes hirientes, palabras que no debería haber dicho. Ambos causaron daño desde sus propias heridas.",
      apologyTitle: "Lo que Pedro necesita decir",
      apologyText: "\"Thiago, te hice daño. Mis palabras fueron crueles y no tenían derecho de salir de mi boca. Lamento cada mensaje que te envié desde la rabia. Pero también necesito ser honesto: tú me hiciste daño primero, y profundo. Las acusaciones falsas, las traiciones, el rechazo después de haberlo dado todo — eso me rompió. No digo esto para justificarme. Lo digo porque ambos merecemos la verdad. Te perdono. Y me perdono. Y te dejo ir con amor.\"",
      lessonTitle: "Lo que aprendimos",
      lessons: [
        "El amor incondicional NO es lo mismo que amor sin límites",
        "No puedes salvar a alguien que no quiere ser salvado — y eso no es tu culpa",
        "Tu generosidad puede ser percibida como control — sin que tú lo sepas",
        "Sus acusaciones pueden contener su verdad emocional, aunque no sean la verdad objetiva",
        "El análisis obsesivo es otra forma de no soltar",
        "Soltar es el acto final de amor — el más difícil y el más tierno",
      ],
      endNote: "Pedro está aprendiendo a amar desde la distancia. Thiago está buscando su propia paz. No está \"bien\" — pero es honesto. Y la honestidad es donde empieza la sanación.",
    },
    tools: {
      title: "Herramientas con Ternura",
      diaryTitle: "El Diario de Patrones",
      diaryIntro: "Cada semana, escríbete a ti mismo con honestidad:",
      diaryPlaceholder: "FECHA: ____\n\n1. ¿Cuándo me sentí invisible esta semana?\n   - ¿Qué hice para sentirme visible de nuevo?\n\n2. ¿Qué momentos pasaron de un extremo a otro?\n   - ¿Cómo respondí?\n\n3. ¿Intenté salvarlo? ¿O intenté salvarme a mí mismo?\n\n4. Mi verdadera necesidad esta semana fue: _____\n   - ¿La pedí? ¿O esperé que la adivinara?",
      questionsTitle: "Las 3 Preguntas de Claridad",
      questionsIntro: "Cuando todo se nubla, responde por escrito:",
      q1: "¿Esto es su verdad o su síntoma?",
      q1Desc: "Si dice \"No te amo,\" puede ser lo que siente en ese instante. No lo discutas. Reconócelo: \"Entiendo que así te sientes ahora.\"",
      q2: "¿Puedo controlar esto?",
      q2Desc: "Si no puedes: suelta con amor. Si puedes: actúa con ternura, no con control.",
      q3: "¿Estoy salvando o estoy evitando mi propio dolor?",
      q3Desc: "Esta es la pregunta más importante. Si es lo segundo, necesitas terapia propia — no una relación.",
      boundaryPhraseTitle: "La Frase del Límite Amoroso",
      boundaryPhraseIntro: "Cuando necesites un límite, usa esta estructura:",
      boundaryTemplate: "\"Te amo. [LÍMITE]. Esto no cambia que te ame — cambia cómo puedo estar contigo.\"",
      boundaryExamples: [
        "\"Te amo. No voy a responder amenazas. Esto no cambia que te ame — cambia cómo puedo estar contigo.\"",
        "\"Te amo. No voy a dejar a mi familia porque tú lo pidas. Esto no cambia que te ame.\"",
        "\"Te amo. Voy a dejarte ir porque ambos necesitamos sanar. Esto no cambia que te ame — nunca dejará de ser cierto.\"",
      ],
    },
    boundaries: {
      title: "Límites Compasivos",
      differenceTitle: "¿Cuál es la diferencia?",
      withoutLabel: "Sin Límites (Dañino)",
      withLabel: "Con Límites (Amoroso)",
      rows: [
        ["\"Te doy TODO porque te amo\"", "\"Te doy lo que puedo sin perderme\""],
        ["\"Si me amenazas, accedo\"", "\"Si hablas de hacerte daño, llamo a emergencias. Eso es amor.\""],
        ["\"Espío para saber si me amas\"", "\"Te pregunto directamente qué necesitas\""],
        ["\"Te humillo cuando duele\"", "\"Tomo distancia para no dañarnos\""],
        ["\"Sacrifico todo por ti\"", "\"Te amo Y tengo una vida propia\""],
      ],
      essentialTitle: "Los 5 Límites Esenciales",
      essentials: [
        "Límite emocional: \"Tu colapso no es mi responsabilidad. Puedo acompañarte, pero no salvarte.\"",
        "Límite de tiempo: \"Te amo. Y también necesito tiempo para mí.\"",
        "Límite de honestidad: \"No voy a prometerte algo que no puedo cumplir.\"",
        "Límite de seguridad: \"Si hay amenazas, llamaré a profesionales. Eso es cuidarte de verdad.\"",
        "Límite de verdad: \"No aceptaré acusaciones falsas como forma de control.\"",
      ],
      paradoxNote: "Cuando pones límites compasivos, puede sentirse como menos amor. En realidad, es el primer momento en que la otra persona siente la responsabilidad de su propio dolor. Y eso puede ser el inicio de su sanación.",
    },
    community: {
      title: "No Estás Solo",
      notAloneTitle: "Millones de personas aman a alguien con TLP",
      notAloneIntro: "Hay comunidades y recursos que pueden ayudarte:",
      resources: [
        "BPDfamily.com — Comunidad para amigos y familia",
        "NAMI.org — National Alliance on Mental Illness",
        "Terapia de pareja informada en DBT",
        "Grupos de apoyo locales (busca \"NAMI Family Support\")",
        "Libros: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera)",
      ],
      whenToLeaveTitle: "Cuándo alejarse — no es fracaso, es claridad",
      whenToLeaveIntro: "Alejarse es correcto cuando:",
      whenToLeave: [
        "Tu propia salud mental se está destruyendo",
        "Se niega a buscar ayuda profesional",
        "Las acusaciones falsas te ponen en peligro",
        "Te obliga a elegir entre él y tu vida",
        "Descubres que amas la idea de salvarlo — no a él",
      ],
      finalWarning: "Alejarse no es abandonar. Es reconocer que su sanación no depende de ti. Y que la tuya tampoco depende de quedarte.",
      epilogueTitle: "¿Qué pasó con Pedro y Thiago?",
      epilogueP1: "Pedro está aprendiendo a amar sin necesitar salvar. Ha establecido límites. Ha buscado terapia. Ha creado este sitio.",
      epilogueP2: "Thiago está en su propio camino. Tal vez algún día busque ayuda. Tal vez no. Pero esa ya no es responsabilidad de Pedro.",
      epilogueFinal: "Eso es amor incondicional: soltar con ternura.",
    },
    footer: {
      createdFrom: "ABRAZO fue creado desde el dolor vivido, transformado en ternura para otros.",
      credit: "Basado en la experiencia real de Pedro y su amor por Thiago. Transmutado en sabiduría.",
      copyright: "© 2026 ABRAZO — Amar con ternura. Este sitio no reemplaza terapia profesional.",
    },
  },

  en: {
    nav: {
      home: "Home",
      what: "What is BPD?",
      signs: "Warning Signs",
      story: "Our Story",
      tools: "Tools",
      boundaries: "Boundaries",
      community: "Community",
    },
    header: {
      title: "ABRAZO",
      subtitle: "For those who love someone with Borderline Personality Disorder",
      tagline: "Born from pain. Built with tenderness. So others may understand.",
    },
    home: {
      heroTitle: "You love someone who suffers. And you suffer too.",
      heroP1: "You love with everything you have. But every day is different. Some days it's pure love, laughter, feeling like nothing could ever tear you apart. Other days, everything shatters without warning — and suddenly you're the enemy without knowing why.",
      heroP2: "This site exists for you. Not to judge. Not to diagnose. But to offer understanding, tools, and the most tender truth I know: you can love someone deeply and still need to let go.",
      card1Title: "Understand",
      card1Desc: "Learn what BPD is from the heart of someone who loves a person who has it.",
      card2Title: "Recognize patterns",
      card2Desc: "Identify what's happening without blame. With compassion, never judgment.",
      card3Title: "Protect yourself",
      card3Desc: "Learn boundaries that honor your love and protect your peace.",
    },
    what: {
      title: "What is Borderline Personality Disorder?",
      clinicalTitle: "What science says, spoken from the heart",
      clinicalIntro: "BPD causes immense pain — both to the person living with it and to those who love them. It's characterized by:",
      symptoms: [
        "Intense fear of abandonment — real or imagined",
        "Intense but unstable relationships — idealization followed by devaluation",
        "Unstable identity — not knowing who they truly are",
        "Impulsivity that can be destructive",
        "Rapid emotional shifts — from extreme love to rejection in hours",
        "Intense anger that can feel disproportionate",
        "A chronic emptiness that nothing seems to fill",
        "In the worst moments, self-harm or threats",
      ],
      warningNote: "None of this is their fault. But your wellbeing matters too. Both truths coexist.",
      whyTitle: "Why do they love like this?",
      whyIntro: "Someone with BPD loves with overwhelming intensity because:",
      whyPoints: [
        "They need constant validation to feel real",
        "They carry an existential fear of abandonment from old wounds",
        "They can't regulate their emotions — they swing between extremes",
        "Sometimes they confuse control with safety",
        "They can't tolerate ambiguity — you're all good or all bad",
      ],
      truthNote: "They can feel genuine love. They can heal with therapy (DBT). But your love alone isn't enough to cure their BPD. That's not your failure — it's reality.",
    },
    signs: {
      title: "Signs you might recognize",
      patternsTitle: "If you see these patterns in the first months:",
      patterns: [
        "\"You're perfect, you're my salvation\" — too fast, too intense",
        "Constantly asks you to confirm your love — and it's never enough",
        "Loves you deeply... and hours later feels nothing for you",
        "Talks about the future in weeks — marriage, children, forever",
        "\"If you love me, you'd do X\" — love as condition, not gift",
        "Wants you to leave friends or family for them",
        "Inconsistencies that don't seem malicious, but confuse you",
        "Extreme emotional crises — threats, self-harm",
      ],
      warningNote: "Recognizing these signs doesn't mean they don't deserve love. It means their healing doesn't depend on you. And you deserve to protect yourself.",
      whatToDoTitle: "What to do if you recognize this?",
      whatToDo: [
        "Don't run scared. But don't close your eyes either.",
        "Speak with tenderness: \"I've noticed your feelings change quickly. Can we talk about this together?\"",
        "Suggest DBT therapy — not as an ultimatum, but as a bridge to peace.",
        "Set loving boundaries from day one.",
        "Ask yourself honestly: Can I love this person as they are? Or am I waiting for them to change?",
      ],
    },
    story: {
      title: "Our Story",
      intro: "This story is real. It's not unique. It's the dance millions of people dance every day — love that hurts, that confuses, that transforms.",
      beginningTitle: "The beginning",
      beginningText: "Pedro saw in Thiago someone he could embrace with everything he had. He gave him a home, support, a business, legal defense, unconditional love. For a while, Thiago idealized him. Those were the brightest days of Pedro's life.",
      turnTitle: "The turn",
      turnText: "When Pedro tried to deepen the intimacy, Thiago panicked. \"Don't confuse the bond,\" he said. Pedro felt it as coldness. Thiago felt it as invasion. Both were right. Both were afraid.",
      turnText2: "Pedro filled the silence with analysis. Thiago filled the void by bringing others in. The cycle of idealization and devaluation had already begun.",
      collapseTitle: "The collapse",
      collapseText: "Thiago did things that deeply hurt Pedro — false accusations, betrayals, manipulation. Pedro, wounded and desperate, responded with cruelty — hurtful messages, words he should never have said. Both caused damage from their own wounds.",
      apologyTitle: "What Pedro needs to say",
      apologyText: "\"Thiago, I hurt you. My words were cruel and had no right to leave my mouth. I'm sorry for every message I sent from rage. But I also need to be honest: you hurt me first, and deeply. The false accusations, the betrayals, the rejection after I gave everything — that broke me. I don't say this to justify myself. I say it because we both deserve the truth. I forgive you. And I forgive myself. And I let you go with love.\"",
      lessonTitle: "What we learned",
      lessons: [
        "Unconditional love is NOT the same as love without boundaries",
        "You can't save someone who doesn't want to be saved — and that's not your fault",
        "Your generosity can be perceived as control — without you knowing",
        "Their accusations may contain their emotional truth, even if not objective truth",
        "Obsessive analysis is another way of not letting go",
        "Letting go is the final act of love — the hardest and the most tender",
      ],
      endNote: "Pedro is learning to love from a distance. Thiago is searching for his own peace. It's not \"fine\" — but it's honest. And honesty is where healing begins.",
    },
    tools: {
      title: "Tools with Tenderness",
      diaryTitle: "The Pattern Diary",
      diaryIntro: "Each week, write to yourself with honesty:",
      diaryPlaceholder: "DATE: ____\n\n1. When did I feel invisible this week?\n   - What did I do to feel seen again?\n\n2. What moments swung from one extreme to another?\n   - How did I respond?\n\n3. Did I try to save them? Or was I trying to save myself?\n\n4. My real need this week was: _____\n   - Did I ask for it? Or did I wait for them to guess?",
      questionsTitle: "The 3 Clarity Questions",
      questionsIntro: "When everything gets cloudy, answer in writing:",
      q1: "Is this their truth or their symptom?",
      q1Desc: "If they say \"I don't love you,\" it may be what they feel right now. Don't argue. Acknowledge: \"I understand that's how you feel right now.\"",
      q2: "Can I control this?",
      q2Desc: "If not: let go with love. If yes: act with tenderness, not control.",
      q3: "Am I saving them or avoiding my own pain?",
      q3Desc: "This is the most important question. If it's the latter, you need your own therapy — not a relationship.",
      boundaryPhraseTitle: "The Loving Boundary Phrase",
      boundaryPhraseIntro: "When you need a boundary, use this structure:",
      boundaryTemplate: "\"I love you. [BOUNDARY]. This doesn't change that I love you — it changes how I can be with you.\"",
      boundaryExamples: [
        "\"I love you. I won't respond to threats. This doesn't change that I love you — it changes how I can be with you.\"",
        "\"I love you. I won't leave my family because you ask. This doesn't change that I love you.\"",
        "\"I love you. I'm letting you go because we both need to heal. This doesn't change that I love you — it never will.\"",
      ],
    },
    boundaries: {
      title: "Compassionate Boundaries",
      differenceTitle: "What's the difference?",
      withoutLabel: "Without Boundaries (Harmful)",
      withLabel: "With Boundaries (Loving)",
      rows: [
        ["\"I give you EVERYTHING because I love you\"", "\"I give what I can without losing myself\""],
        ["\"If you threaten, I comply\"", "\"If you talk about hurting yourself, I call for help. That's love.\""],
        ["\"I spy to know if you love me\"", "\"I ask you directly what you need\""],
        ["\"I humiliate you when it hurts\"", "\"I take distance so we don't hurt each other\""],
        ["\"I sacrifice everything for you\"", "\"I love you AND I have my own life\""],
      ],
      essentialTitle: "The 5 Essential Boundaries",
      essentials: [
        "Emotional boundary: \"Your collapse is not my responsibility. I can walk beside you, but not save you.\"",
        "Time boundary: \"I love you. And I also need time for myself.\"",
        "Honesty boundary: \"I won't promise something I can't keep.\"",
        "Safety boundary: \"If there are threats, I'll call professionals. That's truly caring for you.\"",
        "Truth boundary: \"I won't accept false accusations as a form of control.\"",
      ],
      paradoxNote: "When you set compassionate boundaries, it may feel like less love. In reality, it's the first moment the other person feels responsible for their own pain. And that can be the beginning of their healing.",
    },
    community: {
      title: "You're Not Alone",
      notAloneTitle: "Millions of people love someone with BPD",
      notAloneIntro: "There are communities and resources that can help:",
      resources: [
        "BPDfamily.com — Community for friends and family",
        "NAMI.org — National Alliance on Mental Illness",
        "DBT-informed couples therapy",
        "Local support groups (search \"NAMI Family Support\")",
        "Books: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera)",
      ],
      whenToLeaveTitle: "When to walk away — it's not failure, it's clarity",
      whenToLeaveIntro: "Walking away is right when:",
      whenToLeave: [
        "Your own mental health is being destroyed",
        "They refuse to seek professional help",
        "False accusations put you in danger",
        "They force you to choose between them and your life",
        "You discover you love the idea of saving them — not them",
      ],
      finalWarning: "Walking away is not abandoning. It's recognizing that their healing doesn't depend on you. And yours doesn't depend on staying.",
      epilogueTitle: "What happened with Pedro and Thiago?",
      epilogueP1: "Pedro is learning to love without needing to save. He's set boundaries. He's sought therapy. He's created this site.",
      epilogueP2: "Thiago is on his own path. Maybe one day he'll seek help. Maybe not. But that's no longer Pedro's responsibility.",
      epilogueFinal: "That is unconditional love: letting go with tenderness.",
    },
    footer: {
      createdFrom: "ABRAZO was created from lived pain, transformed into tenderness for others.",
      credit: "Based on the real experience of Pedro and his love for Thiago. Transmuted into wisdom.",
      copyright: "© 2026 ABRAZO — Love with tenderness. This site does not replace professional therapy.",
    },
  },

  pt: {
    nav: {
      home: "Início",
      what: "O que é TPB?",
      signs: "Sinais",
      story: "Nossa História",
      tools: "Ferramentas",
      boundaries: "Limites",
      community: "Comunidade",
    },
    header: {
      title: "ABRAZO",
      subtitle: "Para quem ama alguém com Transtorno de Personalidade Borderline",
      tagline: "Nascido da dor. Construído com ternura. Para que outros compreendam.",
    },
    home: {
      heroTitle: "Você ama alguém que sofre. E você também sofre.",
      heroP1: "Você ama com tudo que tem. Mas cada dia é diferente. Há dias de amor puro, de risadas, de sentir que nada pode separá-los. E há dias em que tudo se quebra sem aviso — e de repente você é o inimigo sem saber por quê.",
      heroP2: "Este site existe para você. Não para julgar. Não para diagnosticar. Mas para oferecer compreensão, ferramentas, e a verdade mais terna que conheço: você pode amar alguém profundamente e ainda assim precisar soltar.",
      card1Title: "Compreenda",
      card1Desc: "Entenda o que é TPB a partir do coração de quem ama alguém que o tem.",
      card2Title: "Reconheça padrões",
      card2Desc: "Identifique o que acontece sem culpar. Com compaixão, nunca com julgamento.",
      card3Title: "Cuide-se",
      card3Desc: "Aprenda limites que honrem seu amor e protejam sua paz.",
    },
    what: {
      title: "O que é o Transtorno de Personalidade Borderline?",
      clinicalTitle: "O que a ciência diz, falado com o coração",
      clinicalIntro: "O TPB causa uma dor imensa — tanto para quem vive com ele quanto para quem ama. Caracteriza-se por:",
      symptoms: [
        "Medo intenso de abandono — real ou imaginário",
        "Relações intensas mas instáveis — idealização seguida de desvalorização",
        "Identidade instável — não sabem quem realmente são",
        "Impulsividade que pode ser destrutiva",
        "Mudanças emocionais rápidas — de amor extremo a rejeição em horas",
        "Raiva intensa que pode parecer desproporcional",
        "Um vazio crônico que nada parece preencher",
        "Nos piores momentos, autolesão ou ameaças",
      ],
      warningNote: "Nada disso é culpa deles. Mas seu bem-estar também importa. Ambas as verdades coexistem.",
      whyTitle: "Por que amam assim?",
      whyIntro: "Alguém com TPB ama com intensidade avassaladora porque:",
      whyPoints: [
        "Precisam de validação constante para se sentirem reais",
        "Carregam um medo existencial de abandono que vem de feridas antigas",
        "Não conseguem regular suas emoções — oscilam entre extremos",
        "Às vezes confundem controle com segurança",
        "Não toleram ambiguidade — você é todo bom ou todo mau",
      ],
      truthNote: "Podem sentir amor genuíno. Podem curar-se com terapia (DBT). Mas seu amor sozinho não é suficiente para curar o TPB deles. Isso não é seu fracasso — é a realidade.",
    },
    signs: {
      title: "Sinais que talvez você reconheça",
      patternsTitle: "Se você vê estes padrões nos primeiros meses:",
      patterns: [
        "\"Você é perfeito, é minha salvação\" — rápido demais, intenso demais",
        "Pede constantemente que confirme seu amor — e nunca é suficiente",
        "Te ama profundamente... e horas depois não sente nada por você",
        "Fala de futuro em semanas — casamento, filhos, para sempre",
        "\"Se você me ama, faria X\" — amor como condição, não como presente",
        "Quer que você deixe amigos ou família por ele",
        "Inconsistências que não parecem maliciosas, mas confundem",
        "Crises emocionais extremas — ameaças, autolesão",
      ],
      warningNote: "Reconhecer estes sinais não significa que não merece amor. Significa que a cura dele não depende de você. E que você merece se proteger.",
      whatToDoTitle: "O que fazer se reconhece isso?",
      whatToDo: [
        "Não fuja assustado. Mas também não feche os olhos.",
        "Fale com ternura: \"Percebi que seus sentimentos mudam rápido. Podemos conversar sobre isso juntos?\"",
        "Sugira terapia DBT — não como ultimato, mas como ponte para a paz.",
        "Estabeleça limites com amor desde o primeiro dia.",
        "Pergunte-se honestamente: Posso amar esta pessoa como ela é? Ou estou esperando que mude?",
      ],
    },
    story: {
      title: "Nossa História",
      intro: "Esta história é real. Não é única. É a dança que milhões de pessoas dançam todos os dias — a do amor que dói, que confunde, que transforma.",
      beginningTitle: "O começo",
      beginningText: "Pedro viu em Thiago alguém que podia abraçar com todo seu ser. Deu-lhe casa, apoio, empresa, defesa, amor sem condições. Por um tempo, Thiago o idealizou. Foram os dias mais luminosos da vida de Pedro.",
      turnTitle: "A virada",
      turnText: "Quando Pedro quis aprofundar a intimidade, Thiago sentiu pânico. \"Não confunda o vínculo,\" disse. Pedro sentiu como frieza. Thiago sentiu como invasão. Ambos tinham razão. Ambos tinham medo.",
      turnText2: "Pedro preencheu o silêncio com análise. Thiago preencheu o vazio trazendo outros. O ciclo de idealização e desvalorização já havia começado.",
      collapseTitle: "O colapso",
      collapseText: "Thiago fez coisas que machucaram profundamente Pedro — acusações falsas, traições, manipulação. Pedro, ferido e desesperado, respondeu com crueldade — mensagens ferinas, palavras que não deveria ter dito. Ambos causaram dano a partir de suas próprias feridas.",
      apologyTitle: "O que Pedro precisa dizer",
      apologyText: "\"Thiago, eu te machuquei. Minhas palavras foram cruéis e não tinham direito de sair da minha boca. Lamento cada mensagem que te enviei da raiva. Mas também preciso ser honesto: você me machucou primeiro, e profundamente. As acusações falsas, as traições, a rejeição depois de ter dado tudo — isso me quebrou. Não digo isso para me justificar. Digo porque ambos merecemos a verdade. Eu te perdoo. E me perdoo. E te deixo ir com amor.\"",
      lessonTitle: "O que aprendemos",
      lessons: [
        "Amor incondicional NÃO é o mesmo que amor sem limites",
        "Você não pode salvar alguém que não quer ser salvo — e isso não é sua culpa",
        "Sua generosidade pode ser percebida como controle — sem você saber",
        "As acusações deles podem conter sua verdade emocional, mesmo não sendo verdade objetiva",
        "Análise obsessiva é outra forma de não soltar",
        "Soltar é o ato final de amor — o mais difícil e o mais terno",
      ],
      endNote: "Pedro está aprendendo a amar à distância. Thiago está buscando sua própria paz. Não está \"bem\" — mas é honesto. E a honestidade é onde começa a cura.",
    },
    tools: {
      title: "Ferramentas com Ternura",
      diaryTitle: "O Diário de Padrões",
      diaryIntro: "Cada semana, escreva para si mesmo com honestidade:",
      diaryPlaceholder: "DATA: ____\n\n1. Quando me senti invisível esta semana?\n   - O que fiz para me sentir visto novamente?\n\n2. Que momentos foram de um extremo ao outro?\n   - Como respondi?\n\n3. Tentei salvá-lo? Ou tentei salvar a mim mesmo?\n\n4. Minha verdadeira necessidade esta semana foi: _____\n   - Pedi? Ou esperei que adivinhasse?",
      questionsTitle: "As 3 Perguntas de Clareza",
      questionsIntro: "Quando tudo fica nublado, responda por escrito:",
      q1: "Isto é verdade dele ou sintoma dele?",
      q1Desc: "Se ele diz \"Não te amo,\" pode ser o que sente naquele instante. Não discuta. Reconheça: \"Entendo que é assim que você se sente agora.\"",
      q2: "Posso controlar isso?",
      q2Desc: "Se não: solte com amor. Se sim: aja com ternura, não com controle.",
      q3: "Estou salvando ou evitando minha própria dor?",
      q3Desc: "Esta é a pergunta mais importante. Se é a segunda, você precisa de terapia própria — não de um relacionamento.",
      boundaryPhraseTitle: "A Frase do Limite Amoroso",
      boundaryPhraseIntro: "Quando precisar de um limite, use esta estrutura:",
      boundaryTemplate: "\"Eu te amo. [LIMITE]. Isso não muda que eu te amo — muda como posso estar com você.\"",
      boundaryExamples: [
        "\"Eu te amo. Não vou responder a ameaças. Isso não muda que eu te amo — muda como posso estar com você.\"",
        "\"Eu te amo. Não vou deixar minha família porque você pede. Isso não muda que eu te amo.\"",
        "\"Eu te amo. Vou te deixar ir porque ambos precisamos curar. Isso não muda que eu te amo — nunca vai.\"",
      ],
    },
    boundaries: {
      title: "Limites Compassivos",
      differenceTitle: "Qual é a diferença?",
      withoutLabel: "Sem Limites (Prejudicial)",
      withLabel: "Com Limites (Amoroso)",
      rows: [
        ["\"Te dou TUDO porque te amo\"", "\"Te dou o que posso sem me perder\""],
        ["\"Se ameaça, eu cedo\"", "\"Se fala em se machucar, chamo ajuda. Isso é amor.\""],
        ["\"Espio para saber se me ama\"", "\"Pergunto diretamente o que precisa\""],
        ["\"Te humilho quando dói\"", "\"Me afasto para não nos machucarmos\""],
        ["\"Sacrifico tudo por você\"", "\"Te amo E tenho minha própria vida\""],
      ],
      essentialTitle: "Os 5 Limites Essenciais",
      essentials: [
        "Limite emocional: \"Seu colapso não é minha responsabilidade. Posso caminhar ao seu lado, mas não salvá-lo.\"",
        "Limite de tempo: \"Te amo. E também preciso de tempo para mim.\"",
        "Limite de honestidade: \"Não vou prometer algo que não posso cumprir.\"",
        "Limite de segurança: \"Se houver ameaças, chamarei profissionais. Isso é cuidar de verdade.\"",
        "Limite de verdade: \"Não aceitarei acusações falsas como forma de controle.\"",
      ],
      paradoxNote: "Quando você coloca limites compassivos, pode parecer menos amor. Na verdade, é o primeiro momento em que a outra pessoa sente a responsabilidade pela própria dor. E isso pode ser o início da cura dela.",
    },
    community: {
      title: "Você Não Está Sozinho",
      notAloneTitle: "Milhões de pessoas amam alguém com TPB",
      notAloneIntro: "Há comunidades e recursos que podem ajudar:",
      resources: [
        "BPDfamily.com — Comunidade para amigos e família",
        "NAMI.org — National Alliance on Mental Illness",
        "Terapia de casal informada em DBT",
        "Grupos de apoio locais (busque \"NAMI Family Support\")",
        "Livros: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera)",
      ],
      whenToLeaveTitle: "Quando se afastar — não é fracasso, é clareza",
      whenToLeaveIntro: "Se afastar é correto quando:",
      whenToLeave: [
        "Sua própria saúde mental está sendo destruída",
        "Ele se recusa a buscar ajuda profissional",
        "Acusações falsas te colocam em perigo",
        "Te obriga a escolher entre ele e sua vida",
        "Você descobre que ama a ideia de salvá-lo — não ele",
      ],
      finalWarning: "Se afastar não é abandonar. É reconhecer que a cura dele não depende de você. E que a sua também não depende de ficar.",
      epilogueTitle: "O que aconteceu com Pedro e Thiago?",
      epilogueP1: "Pedro está aprendendo a amar sem precisar salvar. Estabeleceu limites. Buscou terapia. Criou este site.",
      epilogueP2: "Thiago está em seu próprio caminho. Talvez um dia busque ajuda. Talvez não. Mas isso já não é responsabilidade de Pedro.",
      epilogueFinal: "Isso é amor incondicional: soltar com ternura.",
    },
    footer: {
      createdFrom: "ABRAZO foi criado a partir da dor vivida, transformada em ternura para outros.",
      credit: "Baseado na experiência real de Pedro e seu amor por Thiago. Transmutado em sabedoria.",
      copyright: "© 2026 ABRAZO — Amar com ternura. Este site não substitui terapia profissional.",
    },
  },

  ca: {
    nav: {
      home: "Inici",
      what: "Què és el TLP?",
      signs: "Senyals",
      story: "La nostra història",
      tools: "Eines",
      boundaries: "Límits",
      community: "Comunitat",
    },
    header: {
      title: "ABRAZO",
      subtitle: "Per a qui estima algú amb Trastorn Límit de la Personalitat",
      tagline: "Nascut del dolor. Construït amb tendresa. Perquè altres ho entenguin.",
    },
    home: {
      heroTitle: "Estimes algú que pateix. I tu també pateixes.",
      heroP1: "Estimes amb tot el cor. Però cada dia és diferent. Hi ha dies d'amor pur, de riures, de sentir que res no us pot separar. I hi ha dies en què tot es trenca sense avís — i de cop ets l'enemic sense saber per què.",
      heroP2: "Aquest lloc existeix per a tu. No per jutjar. No per diagnosticar. Sinó per oferir-te comprensió, eines, i la veritat més tendra que conec: pots estimar algú profundament i igualment necessitar deixar anar.",
      card1Title: "Comprèn",
      card1Desc: "Entén què és el TLP des del cor de qui estima algú que el té.",
      card2Title: "Reconeix patrons",
      card2Desc: "Identifica què passa sense culpar. Amb compassió, mai amb judici.",
      card3Title: "Cuida't",
      card3Desc: "Aprèn límits que honrin el teu amor i protegeixin la teva pau.",
    },
    what: {
      title: "Què és el Trastorn Límit de la Personalitat?",
      clinicalTitle: "El que diu la ciència, dit amb el cor",
      clinicalIntro: "El TLP causa un dolor immens — tant a qui el viu com a qui l'estima. Es caracteritza per:",
      symptoms: [
        "Por intensa a l'abandonament — real o imaginat",
        "Relacions intenses però inestables — idealització seguida de devaluació",
        "Identitat inestable — no saben qui són realment",
        "Impulsivitat que pot ser destructiva",
        "Canvis emocionals ràpids — d'amor extrem a rebuig en hores",
        "Ràbia intensa que pot semblar desproporcionada",
        "Un buit crònic que res no sembla omplir",
        "En els pitjors moments, autolesió o amenaces",
      ],
      warningNote: "Res d'això és culpa seva. Però el teu benestar també importa. Ambdues veritats coexisteixen.",
      whyTitle: "Per què estimen així?",
      whyIntro: "Algú amb TLP estima amb una intensitat aclaparadora perquè:",
      whyPoints: [
        "Necessiten validació constant per sentir-se reals",
        "Porten una por existencial a l'abandonament que ve de ferides antigues",
        "No poden regular les seves emocions — oscil·len entre extrems",
        "De vegades confonen control amb seguretat",
        "No toleren l'ambigüitat — ets tot bo o tot dolent",
      ],
      truthNote: "Poden sentir amor genuí. Poden curar-se amb teràpia (DBT). Però el teu amor sol no és suficient per curar el seu TLP. Això no és el teu fracàs — és la realitat.",
    },
    signs: {
      title: "Senyals que potser reconeixes",
      patternsTitle: "Si veus aquests patrons en els primers mesos:",
      patterns: [
        "\"Ets perfecte, ets la meva salvació\" — massa ràpid, massa intens",
        "Et demana constantment que confirmis el teu amor — i mai n'hi ha prou",
        "T'estima profundament... i hores després no sent res per tu",
        "Parla de futur en setmanes — matrimoni, fills, per sempre",
        "\"Si m'estimes, faries X\" — l'amor com a condició, no com a regal",
        "Vol que deixis amics o família per ell",
        "Inconsistències que no semblen malicioses, però confonen",
        "Crisis emocionals extremes — amenaces, autolesió",
      ],
      warningNote: "Reconèixer aquests senyals no vol dir que no mereixi amor. Vol dir que la seva curació no depèn de tu. I que mereixes protegir-te.",
      whatToDoTitle: "Què fer si ho reconeixes?",
      whatToDo: [
        "No fugis espantat. Però tampoc tanquis els ulls.",
        "Parla amb tendresa: \"He notat que els teus sentiments canvien ràpidament. Podem parlar-ne junts?\"",
        "Suggereix teràpia DBT — no com a ultimàtum, sinó com a pont cap a la pau.",
        "Estableix límits amb amor des del primer dia.",
        "Pregunta't honestament: Puc estimar aquesta persona tal com és? O estic esperant que canviï?",
      ],
    },
    story: {
      title: "La Nostra Història",
      intro: "Aquesta història és real. No és única. És la dansa que milions de persones ballen cada dia — la de l'amor que fa mal, que confon, que transforma.",
      beginningTitle: "El començament",
      beginningText: "Pedro va veure en Thiago algú a qui podia abraçar amb tot el seu ésser. Li va donar casa, suport, empresa, defensa, amor sense condicions. Durant un temps, Thiago el va idealitzar. Van ser els dies més lluminosos de la vida de Pedro.",
      turnTitle: "El gir",
      turnText: "Quan Pedro va voler aprofundir la intimitat, Thiago va sentir pànic. \"No confonguis el vincle,\" va dir. Pedro ho va sentir com a fredor. Thiago ho va sentir com a invasió. Tots dos tenien raó. Tots dos tenien por.",
      turnText2: "Pedro va omplir el silenci amb anàlisi. Thiago va omplir el buit portant-hi altres. El cicle d'idealització i devaluació ja havia començat.",
      collapseTitle: "El col·lapse",
      collapseText: "Thiago va fer coses que van fer molt de mal a Pedro — acusacions falses, traïcions, manipulació. Pedro, ferit i desesperat, va respondre amb crueltat — missatges feridors, paraules que no hauria d'haver dit. Tots dos van causar dany des de les seves pròpies ferides.",
      apologyTitle: "El que Pedro necessita dir",
      apologyText: "\"Thiago, et vaig fer mal. Les meves paraules van ser cruels i no tenien dret de sortir de la meva boca. Lamento cada missatge que et vaig enviar des de la ràbia. Però també necessito ser honest: tu em vas fer mal primer, i profundament. Les acusacions falses, les traïcions, el rebuig després d'haver-ho donat tot — això em va trencar. No ho dic per justificar-me. Ho dic perquè tots dos mereixem la veritat. Et perdono. I em perdono. I et deixo anar amb amor.\"",
      lessonTitle: "El que vam aprendre",
      lessons: [
        "L'amor incondicional NO és el mateix que amor sense límits",
        "No pots salvar algú que no vol ser salvat — i això no és culpa teva",
        "La teva generositat pot ser percebuda com a control — sense que ho sàpigues",
        "Les seves acusacions poden contenir la seva veritat emocional, encara que no siguin veritat objectiva",
        "L'anàlisi obsessiva és una altra forma de no deixar anar",
        "Deixar anar és l'acte final d'amor — el més difícil i el més tendre",
      ],
      endNote: "Pedro està aprenent a estimar des de la distància. Thiago està buscant la seva pròpia pau. No està \"bé\" — però és honest. I l'honestedat és on comença la curació.",
    },
    tools: {
      title: "Eines amb Tendresa",
      diaryTitle: "El Diari de Patrons",
      diaryIntro: "Cada setmana, escriu-te a tu mateix amb honestedat:",
      diaryPlaceholder: "DATA: ____\n\n1. Quan em vaig sentir invisible aquesta setmana?\n   - Què vaig fer per sentir-me visible de nou?\n\n2. Quins moments van anar d'un extrem a l'altre?\n   - Com vaig respondre?\n\n3. Vaig intentar salvar-lo? O intentava salvar-me a mi mateix?\n\n4. La meva veritable necessitat aquesta setmana va ser: _____\n   - La vaig demanar? O vaig esperar que l'endevinés?",
      questionsTitle: "Les 3 Preguntes de Claredat",
      questionsIntro: "Quan tot s'ennuvola, respon per escrit:",
      q1: "Això és la seva veritat o el seu símptoma?",
      q1Desc: "Si diu \"No t'estimo,\" pot ser el que sent en aquell instant. No ho discuteixis. Reconeix-ho: \"Entenc que així et sents ara.\"",
      q2: "Puc controlar això?",
      q2Desc: "Si no: deixa anar amb amor. Si sí: actua amb tendresa, no amb control.",
      q3: "Estic salvant o estic evitant el meu propi dolor?",
      q3Desc: "Aquesta és la pregunta més important. Si és la segona, necessites teràpia pròpia — no una relació.",
      boundaryPhraseTitle: "La Frase del Límit Amorós",
      boundaryPhraseIntro: "Quan necessitis un límit, utilitza aquesta estructura:",
      boundaryTemplate: "\"T'estimo. [LÍMIT]. Això no canvia que t'estimo — canvia com puc estar amb tu.\"",
      boundaryExamples: [
        "\"T'estimo. No respondré amenaces. Això no canvia que t'estimo — canvia com puc estar amb tu.\"",
        "\"T'estimo. No deixaré la meva família perquè tu ho demanis. Això no canvia que t'estimo.\"",
        "\"T'estimo. Et deixo anar perquè tots dos necessitem curar. Això no canvia que t'estimo — mai ho farà.\"",
      ],
    },
    boundaries: {
      title: "Límits Compassius",
      differenceTitle: "Quina és la diferència?",
      withoutLabel: "Sense Límits (Perjudicial)",
      withLabel: "Amb Límits (Amorós)",
      rows: [
        ["\"Et dono TOT perquè t'estimo\"", "\"Et dono el que puc sense perdre'm\""],
        ["\"Si amenaces, cedeixo\"", "\"Si parles de fer-te mal, truco ajuda. Això és amor.\""],
        ["\"Espio per saber si m'estimes\"", "\"Et pregunto directament què necessites\""],
        ["\"T'humilio quan fa mal\"", "\"Prenc distància per no fer-nos mal\""],
        ["\"Sacrifico tot per tu\"", "\"T'estimo I tinc la meva pròpia vida\""],
      ],
      essentialTitle: "Els 5 Límits Essencials",
      essentials: [
        "Límit emocional: \"El teu col·lapse no és la meva responsabilitat. Puc caminar al teu costat, però no salvar-te.\"",
        "Límit de temps: \"T'estimo. I també necessito temps per a mi.\"",
        "Límit d'honestedat: \"No prometré quelcom que no puc complir.\"",
        "Límit de seguretat: \"Si hi ha amenaces, trucaré professionals. Això és cuidar-te de veritat.\"",
        "Límit de veritat: \"No acceptaré acusacions falses com a forma de control.\"",
      ],
      paradoxNote: "Quan poses límits compassius, pot semblar menys amor. En realitat, és el primer moment en què l'altra persona sent la responsabilitat del seu propi dolor. I això pot ser l'inici de la seva curació.",
    },
    community: {
      title: "No Estàs Sol",
      notAloneTitle: "Milions de persones estimen algú amb TLP",
      notAloneIntro: "Hi ha comunitats i recursos que poden ajudar:",
      resources: [
        "BPDfamily.com — Comunitat per a amics i família",
        "NAMI.org — National Alliance on Mental Illness",
        "Teràpia de parella informada en DBT",
        "Grups de suport locals (cerca \"NAMI Family Support\")",
        "Llibres: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera)",
      ],
      whenToLeaveTitle: "Quan allunyar-se — no és fracàs, és claredat",
      whenToLeaveIntro: "Allunyar-se és correcte quan:",
      whenToLeave: [
        "La teva pròpia salut mental s'està destruint",
        "Es nega a buscar ajuda professional",
        "Les acusacions falses et posen en perill",
        "T'obliga a triar entre ell i la teva vida",
        "Descobreixes que estimes la idea de salvar-lo — no a ell",
      ],
      finalWarning: "Allunyar-se no és abandonar. És reconèixer que la seva curació no depèn de tu. I que la teva tampoc depèn de quedar-te.",
      epilogueTitle: "Què va passar amb Pedro i Thiago?",
      epilogueP1: "Pedro està aprenent a estimar sense necessitar salvar. Ha establert límits. Ha buscat teràpia. Ha creat aquest lloc.",
      epilogueP2: "Thiago està en el seu propi camí. Potser algun dia buscarà ajuda. Potser no. Però això ja no és responsabilitat de Pedro.",
      epilogueFinal: "Això és amor incondicional: deixar anar amb tendresa.",
    },
    footer: {
      createdFrom: "ABRAZO va ser creat des del dolor viscut, transformat en tendresa per a altres.",
      credit: "Basat en l'experiència real de Pedro i el seu amor per Thiago. Transmutat en saviesa.",
      copyright: "© 2026 ABRAZO — Estimar amb tendresa. Aquest lloc no substitueix teràpia professional.",
    },
  },
};
