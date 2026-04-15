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

export const translations: Record<Lang, Translations> = {
  // ───────────────────── ESPAÑOL ─────────────────────
  es: {
    nav: {
      home: "Inicio",
      understanding: "Entender el TLP",
      signs: "Señales",
      story: "Historia Real",
      tools: "Herramientas",
      boundaries: "Límites",
      community: "Comunidad",
    },
    header: {
      title: "ABRAZO",
      subtitle: "Para quienes aman a alguien con Trastorno Límite de la Personalidad (TLP)",
      tagline: "Nacido del dolor. Construido con ternura. Para convertir el dolor en comprensión.",
    },
    home: {
      heroTitle: "Amas a alguien que sufre.",
      heroP1: "Amas con incondicionalidad. Pero cada día es diferente. Algunos días es el amor más intenso que has sentido; otros días te sientes en una pesadilla de la que no sabes cómo despertar.",
      heroP2: "No estás solo/a. Y no eres responsable de \"arreglar\" a la otra persona.",
      heroP3: "Este sitio existe para ti. No para diagnosticar. No para juzgar. Existe para que entiendas qué está pasando, cómo protegerte con amor, y cómo soltar sin rencor.",
      ctaButton: "Empieza a entender",
      card1Title: "📚 Aprende",
      card1Desc: "Entiende qué es TLP desde la perspectiva de quien lo ama. No una lista fría de síntomas, sino un mapa del territorio emocional.",
      card2Title: "🌿 Reconoce patrones",
      card2Desc: "Identifica comportamientos sin diagnosticar. Con compasión, no juicio. Para entender por qué reaccionas como reaccionas.",
      card3Title: "💛 Protégete",
      card3Desc: "Aprende límites que honren tu amor y tu salud mental. Porque cuidarte no es egoísmo, es la base para poder seguir estando ahí.",
    },
    understanding: {
      title: "Entendiendo el TLP",
      intro: "Cuando amas a alguien con Trastorno Límite de la Personalidad, los manuales clínicos no son suficientes. No necesitas una lista fría de síntomas; necesitas saber por qué duele tanto y por qué te sientes tan confundido/a.",
      emotionalSkinTitle: "El \"Tercer Grado Emocional\"",
      emotionalSkinDesc: "Su piel emocional no tiene capa protectora. Sienten el mundo a 100 grados mientras los demás estamos a 25. Por eso una crítica suave puede sentirse para ellos como un ataque devastador.",
      abandonmentTitle: "El Miedo al Abandono",
      abandonmentDesc: "No es capricho. Es una alarma interna que suena constantemente gritando \"Te van a dejar\". Muchas de sus reacciones desproporcionadas no son contra ti, son contra ese miedo paralizante.",
      voidTitle: "El Vacío",
      voidDesc: "No es aburrimiento. Es un agujero negro existencial que intentan llenar con relaciones intensas, compras o ira. Tú no puedes llenar ese vacío, y liberarte de esa carga es el primer paso para poder ayudar de verdad.",
      closingNote: "Aprender esto no es justificar el maltrato. Es entender el mapa del territorio en el que estás caminando.",
      clinicalTitle: "Lo que dice la ciencia",
      clinicalPoints: [
        { title: "Inestabilidad Emocional", desc: "Las emociones son muy intensas y cambiantes, con patrones de idealización y devaluación en sus vínculos." },
        { title: "Miedo al Abandono", desc: "Un miedo intenso y a menudo irracional a ser dejado de lado. Pueden reaccionar de forma desproporcionada ante una separación real o percibida." },
        { title: "Pensamiento Dicotómico", desc: "El mundo se percibe en extremos (blanco o negro), sin apenas matices. Alguien puede ser maravilloso en un momento y despreciable al siguiente." },
        { title: "Impulsividad", desc: "Tendencia a actuar sin pensar en las consecuencias, como una forma de regular el dolor emocional." },
      ],
    },
    signs: {
      title: "Reconoce Patrones",
      intro: "Quizás tu persona no tiene diagnóstico. Quizás solo sabes que la relación es una montaña rusa. Estos son patrones que suelen aparecer. Observa con compasión, no para etiquetar, sino para entender.",
      patterns: [
        { title: "Idealización y Devaluación", desc: "Un día eres su salvación, su persona favorita en el universo. Al día siguiente, un pequeño desacuerdo te convierte en la peor persona del mundo." },
        { title: "Hipersensibilidad a la Crítica", desc: "Te dice: \"Ya estás enfadado conmigo, ¿verdad?\" cuando tú solo estás cansado/a. Su radar para detectar el rechazo está calibrado al máximo." },
        { title: "Miedo a la Soledad", desc: "No soportan estar a solas consigo mismos. Pueden enviar decenas de mensajes seguidos si no respondes en 10 minutos. No es control, es pánico." },
        { title: "Autosabotaje", desc: "Justo cuando la relación va bien y hay paz, surge una pelea por algo mínimo. La estabilidad, para un cerebro TLP, a veces es más aterradora que el caos conocido." },
      ],
      closingNote: "Reconocer estos patrones no es etiquetar a nadie. Es darte permiso para entender lo que vives y buscar herramientas para navegarlo.",
    },
    story: {
      title: "La Historia Real",
      subtitle: "El origen de ABRAZO",
      quote: "ABRAZO fue creado desde el dolor vivido de alguien que amó demasiado intensamente.",
      intro: "El creador de ABRAZO no es psicólogo. Es una persona como tú. Conoció a alguien en un momento de sus vidas en que ambos buscaban un ancla. La conexión fue inmediata, magnética, de esas que te hacen creer en almas gemelas.",
      bodyP1: "Durante meses, navegó entre el cielo y el infierno. Había fines de semana de risas, planes de futuro y una intimidad que nunca había sentido. Pero también había portazos, amenazas de ruptura semanales y un agotamiento emocional que lo dejaba vacío.",
      bodyP2: "Esa persona no era \"mala\". Sufría.",
      bodyP3: "Él no era \"débil\". Amaba.",
      bodyP4: "La relación terminó. Se quedó con el corazón roto y mil preguntas sin respuesta: ¿Por qué pasó esto? ¿Fue mi culpa? ¿Se puede amar a alguien así sin destruirse?",
      bodyP5: "De ese duelo nació ABRAZO. Decidió transmutar el dolor en sabiduría para que la siguiente persona que busque \"Cómo ayudar a mi pareja con TLP sin volverme loco\" encuentre un abrazo y no un juicio.",
      credit: "Basado en experiencia real. Transmutado en sabiduría para otros.",
    },
    tools: {
      title: "Herramientas para el Día a Día",
      intro: "Amar a alguien con TLP requiere un nuevo lenguaje. No el de la lógica fría, sino el de la validación emocional.",
      validationTitle: "1. Validación sin estar de acuerdo",
      validationSituation: "Situación: Te grita: \"¡Odias estar conmigo, lo sé!\"",
      validationWrong: "Reacción normal (que empeora todo): \"Eso no es verdad, estás exagerando, cálmate.\"",
      validationRight: "Herramienta ABRAZO: \"Siento mucho que te estés sintiendo así ahora mismo. Debe ser horrible sentir que alguien a quien quieres te rechaza.\"",
      validationWhy: "No confirmas que le odias; confirmas que su sentimiento es real y doloroso. Eso baja la temperatura de la crisis.",
      trafficLightTitle: "2. La Técnica del Semáforo en Crisis",
      redLabel: "🔴 Luz Roja — Crisis aguda",
      redDesc: "No razonar. Solo decir: \"Estoy aquí. No me voy a ir. Cuando puedas respirar, hablamos.\"",
      yellowLabel: "🟡 Luz Amarilla — Calma tensa",
      yellowDesc: "Distraer con algo sensorial: un vaso de agua fría, una manta, salir al balcón 1 minuto.",
      greenLabel: "🟢 Luz Verde — Tranquilidad",
      greenDesc: "Es el momento de hablar del problema real, pero siempre desde el \"Yo\" y no desde el \"Tú\". \"Cuando sube la voz, yo me asusto y necesito un momento para mí.\"",
      breathingTitle: "3. Respiración para ti",
      breathingDesc: "Si sientes que te ahogas, usa la técnica 4-7-8: Inhala en 4 segundos, retén 7, exhala en 8. Repite 3 veces. Es para ti. Para no perder tu centro.",
      communicationTitle: "Estrategias de Comunicación",
      communicationIntro: "La comunicación es el pilar para manejar los momentos difíciles:",
      commPoints: [
        { title: "Validación Emocional", desc: "Reconocer y aceptar el sentimiento de la otra persona, sin que esto signifique que estés de acuerdo con su conducta." },
        { title: "Escucha Activa", desc: "Estar plenamente presente, escuchar sin juzgar, sin minimizar su experiencia ni ofrecer soluciones no solicitadas." },
        { title: "Comunicación No Violenta", desc: "Expresa tus propias necesidades sin atacar ni culpar, utilizando frases en primera persona (\"Yo me siento...\")." },
      ],
      dontDoTitle: "Qué NO hacer",
      dontDoDesc: "Ponerse a la defensiva, usar etiquetas o comentarios invalidantes (\"estás exagerando\") que pueden intensificar el conflicto.",
    },
    boundaries: {
      title: "Límites Compasivos",
      intro: "En el amor con TLP, o aprendes a poner límites o el vínculo te devora. El límite no es un castigo, es la valla que protege el jardín de tu relación para que no sea pisoteado.",
      badTitle: "Límite Mal Puesto (Castigo)",
      badExample: "\"Como me has gritado, me voy y no vuelvo en 3 días.\"",
      badExplain: "Esto activa el miedo al abandono y desata una crisis mayor.",
      goodTitle: "Límite Compasivo (Amor propio)",
      goodExample: "\"Te quiero muchísimo, y justo porque te quiero y quiero que esto funcione, necesito salir a dar una vuelta de 20 minutos para calmarme. Cuando vuelva, si los dos estamos más tranquilos, podemos seguir hablando. No me voy de la relación, me voy de la discusión.\"",
      hardestTitle: "El límite más difícil",
      hardestDesc: "Hay un momento en que el límite compasivo es: \"No puedo ayudarte sin destruirme a mí mismo/a.\" Amar también es saber soltar. No por falta de amor, sino por exceso de respeto a tu propia vida.",
      tipsTitle: "Claves para establecer límites",
      tips: [
        { title: "Sé Claro y Cariñoso", desc: "\"Te quiero y quiero escucharte, pero no puedo hacerlo si me gritas.\"" },
        { title: "Sé Consistente", desc: "Una vez puesto, mantenlo. La consistencia genera seguridad y previsibilidad, algo que las personas con TLP necesitan profundamente." },
        { title: "Diferencia Límites de Ultimátums", desc: "Los límites protegen tu bienestar (\"Necesito salir a caminar si la conversación sube de tono\"), mientras que los ultimátums controlan la conducta del otro." },
      ],
    },
    community: {
      title: "No Estás Solo/a",
      intro: "Este rincón es para compartir lo que callas. Para soltar el peso de sentirte el único cuidador del mundo.",
      lettersTitle: "Cartas a ABRAZO",
      letters: [
        { text: "Hoy pude poner un límite por primera vez. Estoy temblando, pero me siento un poco más yo.", author: "Ana" },
        { text: "Entendí que cuando me insulta, no está hablando de mí, sino de su infierno interno. Sigue doliendo, pero ya no me lo creo.", author: "Carlos" },
      ],
      resourcesTitle: "Recursos Profesionales",
      resourcesIntro: "ABRAZO no reemplaza la terapia.",
      resources: [
        "Busca profesionales especializados en Terapia Dialéctica Conductual (DBT) para tu ser querido.",
        "Busca terapia individual para ti. Cuidar a alguien con TLP es un trabajo emocional de alto rendimiento.",
        "BPDfamily.com — Comunidad para amigos y familia.",
        "NAMI.org — National Alliance on Mental Illness.",
        "Libros: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera).",
      ],
      selfCareTitle: "❤️ Cuidando de Ti Mismo/a",
      selfCareIntro: "Apoyar a alguien con TLP es agotador y conlleva un alto riesgo de fatiga por compasión. Cuidarte no es egoísta, es la única forma de poder seguir estando ahí.",
      selfCarePoints: [
        { title: "Busca tu propia red", desc: "Habla con amigos, familiares o únete a un grupo de apoyo para familiares." },
        { title: "Considera terapia para ti", desc: "Un profesional puede proporcionarte herramientas para gestionar el estrés y poner límites saludables." },
        { title: "Mantén tu propia vida", desc: "No abandones tus aficiones, amistades y rutinas. Recuperar tiempo para ti es vital." },
      ],
      recoveryTitle: "🤝 Apoyando su Proceso",
      recoveryIntro: "Tu papel es de apoyo, no de terapeuta. La responsabilidad del tratamiento es de la persona con TLP y de sus profesionales.",
      recoveryPoints: [
        { title: "Anímale a buscar ayuda", desc: "Es fundamental que el tratamiento lo guíe un profesional especializado en TLP." },
        { title: "Celebra los pequeños logros", desc: "Reconoce el esfuerzo y los pequeños avances sin grandes aspavientos." },
        { title: "Mantén una estructura estable", desc: "Las rutinas familiares predecibles son una fuente de seguridad que contrarresta su caos interno." },
      ],
      conclusionTitle: "💡 En Conclusión",
      conclusionText: "Amar a alguien con TLP es un viaje complejo y profundo que requiere aprender nuevas habilidades, practicar la compasión y, sobre todo, ser muy amable contigo mismo/a. Con el enfoque correcto, es posible construir una relación más fuerte y estable.",
      conclusionFinal: "Si la situación se vuelve insostenible o afecta gravemente tu salud mental, buscar ayuda profesional para ti es un acto de responsabilidad y amor propio.",
    },
    footer: {
      line1: "ABRAZO fue creado desde el dolor vivido, transformado en comprensión para otros.",
      line2: "Basado en experiencia real. Para convertir el dolor en comprensión.",
      line3: "© 2026 ABRAZO — Amar a alguien con TLP. Este sitio no reemplaza terapia profesional.",
    },
  },

  // ───────────────────── ENGLISH ─────────────────────
  en: {
    nav: {
      home: "Home",
      understanding: "Understanding BPD",
      signs: "Warning Signs",
      story: "Real Story",
      tools: "Tools",
      boundaries: "Boundaries",
      community: "Community",
    },
    header: {
      title: "ABRAZO",
      subtitle: "For those who love someone with Borderline Personality Disorder (BPD)",
      tagline: "Born from pain. Built with tenderness. To turn pain into understanding.",
    },
    home: {
      heroTitle: "You love someone who suffers.",
      heroP1: "You love unconditionally. But every day is different. Some days it's the most intense love you've ever felt; other days you feel trapped in a nightmare you can't wake up from.",
      heroP2: "You're not alone. And you're not responsible for \"fixing\" the other person.",
      heroP3: "This site exists for you. Not to diagnose. Not to judge. It exists so you can understand what's happening, how to protect yourself with love, and how to let go without resentment.",
      ctaButton: "Start understanding",
      card1Title: "📚 Learn",
      card1Desc: "Understand what BPD is from the perspective of someone who loves a person with it. Not a cold list of symptoms, but a map of the emotional terrain.",
      card2Title: "🌿 Recognize patterns",
      card2Desc: "Identify behaviors without diagnosing. With compassion, not judgment. To understand why you react the way you do.",
      card3Title: "💛 Protect yourself",
      card3Desc: "Learn boundaries that honor your love and your mental health. Because self-care isn't selfish — it's the foundation for being able to stay present.",
    },
    understanding: {
      title: "Understanding BPD",
      intro: "When you love someone with Borderline Personality Disorder, clinical manuals aren't enough. You don't need a cold list of symptoms; you need to know why it hurts so much and why you feel so confused.",
      emotionalSkinTitle: "The \"Emotional Third Degree\"",
      emotionalSkinDesc: "Their emotional skin has no protective layer. They feel the world at 100 degrees while the rest of us are at 25. That's why a gentle criticism can feel to them like a devastating attack.",
      abandonmentTitle: "The Fear of Abandonment",
      abandonmentDesc: "It's not a whim. It's an internal alarm that constantly screams \"They're going to leave you.\" Many of their disproportionate reactions aren't against you — they're against that paralyzing fear.",
      voidTitle: "The Void",
      voidDesc: "It's not boredom. It's an existential black hole they try to fill with intense relationships, shopping, or anger. You can't fill that void, and freeing yourself from that burden is the first step to truly helping.",
      closingNote: "Learning this doesn't justify mistreatment. It's understanding the map of the territory you're walking through.",
      clinicalTitle: "What science says",
      clinicalPoints: [
        { title: "Emotional Instability", desc: "Emotions are very intense and changeable, with patterns of idealization and devaluation in their relationships." },
        { title: "Fear of Abandonment", desc: "An intense and often irrational fear of being left behind. They may react disproportionately to real or perceived separation." },
        { title: "Dichotomous Thinking", desc: "The world is perceived in extremes (black or white), with hardly any nuance. Someone can be wonderful one moment and despicable the next." },
        { title: "Impulsivity", desc: "A tendency to act without thinking about consequences, as a way to regulate emotional pain." },
      ],
    },
    signs: {
      title: "Recognize Patterns",
      intro: "Maybe your person doesn't have a diagnosis. Maybe you just know the relationship is a rollercoaster. These are patterns that tend to appear. Observe with compassion, not to label, but to understand.",
      patterns: [
        { title: "Idealization and Devaluation", desc: "One day you're their salvation, their favorite person in the universe. The next day, a small disagreement makes you the worst person in the world." },
        { title: "Hypersensitivity to Criticism", desc: "They say: \"You're mad at me, aren't you?\" when you're just tired. Their radar for detecting rejection is calibrated to the max." },
        { title: "Fear of Being Alone", desc: "They can't stand being alone with themselves. They might send dozens of messages in a row if you don't respond in 10 minutes. It's not control — it's panic." },
        { title: "Self-sabotage", desc: "Just when the relationship is going well and there's peace, a fight erupts over something minor. Stability, for a BPD mind, is sometimes more terrifying than familiar chaos." },
      ],
      closingNote: "Recognizing these patterns isn't labeling anyone. It's giving yourself permission to understand what you're living through and to seek tools to navigate it.",
    },
    story: {
      title: "The Real Story",
      subtitle: "The origin of ABRAZO",
      quote: "ABRAZO was created from the lived pain of someone who loved too intensely.",
      intro: "The creator of ABRAZO is not a psychologist. He's a person like you. He met someone at a moment in their lives when both were looking for an anchor. The connection was immediate, magnetic — the kind that makes you believe in soulmates.",
      bodyP1: "For months, he navigated between heaven and hell. There were weekends of laughter, plans for the future, and an intimacy he'd never felt. But there were also slammed doors, weekly breakup threats, and an emotional exhaustion that left him empty.",
      bodyP2: "That person wasn't \"bad.\" They suffered.",
      bodyP3: "He wasn't \"weak.\" He loved.",
      bodyP4: "The relationship ended. He was left heartbroken with a thousand unanswered questions: Why did this happen? Was it my fault? Can you love someone like this without destroying yourself?",
      bodyP5: "From that grief, ABRAZO was born. He decided to transmute pain into wisdom so the next person who searches \"How to help my partner with BPD without losing my mind\" finds an embrace and not a judgment.",
      credit: "Based on real experience. Transmuted into wisdom for others.",
    },
    tools: {
      title: "Daily Tools",
      intro: "Loving someone with BPD requires a new language. Not one of cold logic, but of emotional validation.",
      validationTitle: "1. Validation without agreeing",
      validationSituation: "Situation: They yell: \"You hate being with me, I know it!\"",
      validationWrong: "Normal reaction (which makes it worse): \"That's not true, you're exaggerating, calm down.\"",
      validationRight: "ABRAZO tool: \"I'm so sorry you're feeling this way right now. It must be horrible to feel that someone you love is rejecting you.\"",
      validationWhy: "You're not confirming that you hate them; you're confirming that their feeling is real and painful. That lowers the temperature of the crisis.",
      trafficLightTitle: "2. The Traffic Light Technique in Crisis",
      redLabel: "🔴 Red Light — Acute crisis",
      redDesc: "Don't reason. Just say: \"I'm here. I'm not leaving. When you can breathe, we'll talk.\"",
      yellowLabel: "🟡 Yellow Light — Tense calm",
      yellowDesc: "Distract with something sensory: a glass of cold water, a blanket, stepping outside for 1 minute.",
      greenLabel: "🟢 Green Light — Calm",
      greenDesc: "This is the time to talk about the real issue, but always from \"I\" not \"You.\" \"When voices are raised, I get scared and I need a moment.\"",
      breathingTitle: "3. Breathing for you",
      breathingDesc: "If you feel like you're drowning, use the 4-7-8 technique: Inhale for 4 seconds, hold for 7, exhale for 8. Repeat 3 times. It's for you. To not lose your center.",
      communicationTitle: "Communication Strategies",
      communicationIntro: "Communication is the pillar for handling difficult moments:",
      commPoints: [
        { title: "Emotional Validation", desc: "Recognize and accept the other person's feelings, without it meaning you agree with their behavior." },
        { title: "Active Listening", desc: "Be fully present, listen without judging, without minimizing their experience or offering unsolicited solutions." },
        { title: "Nonviolent Communication", desc: "Express your own needs without attacking or blaming, using first-person statements (\"I feel...\")." },
      ],
      dontDoTitle: "What NOT to do",
      dontDoDesc: "Getting defensive, using labels or invalidating comments (\"you're exaggerating\") that can intensify the conflict.",
    },
    boundaries: {
      title: "Compassionate Boundaries",
      intro: "In love with BPD, either you learn to set boundaries or the bond consumes you. A boundary isn't punishment — it's the fence that protects the garden of your relationship from being trampled.",
      badTitle: "Poorly Set Boundary (Punishment)",
      badExample: "\"Since you yelled at me, I'm leaving and not coming back for 3 days.\"",
      badExplain: "This triggers the fear of abandonment and unleashes a bigger crisis.",
      goodTitle: "Compassionate Boundary (Self-love)",
      goodExample: "\"I love you so much, and precisely because I love you and want this to work, I need to go for a 20-minute walk to calm down. When I come back, if we're both calmer, we can keep talking. I'm not leaving the relationship — I'm leaving the argument.\"",
      hardestTitle: "The hardest boundary",
      hardestDesc: "There comes a moment when the compassionate boundary is: \"I can't help you without destroying myself.\" Loving also means knowing how to let go. Not from lack of love, but from excess of respect for your own life.",
      tipsTitle: "Keys to setting boundaries",
      tips: [
        { title: "Be Clear and Caring", desc: "\"I love you and want to listen, but I can't do it if you're yelling at me.\"" },
        { title: "Be Consistent", desc: "Once set, maintain it. Consistency creates safety and predictability — something people with BPD deeply need." },
        { title: "Distinguish Boundaries from Ultimatums", desc: "Boundaries protect your wellbeing (\"I need to step away if the conversation escalates\"), while ultimatums control the other person's behavior." },
      ],
    },
    community: {
      title: "You're Not Alone",
      intro: "This corner is for sharing what you keep silent. For releasing the weight of feeling like the only caretaker in the world.",
      lettersTitle: "Letters to ABRAZO",
      letters: [
        { text: "Today I was able to set a boundary for the first time. I'm trembling, but I feel a little more like myself.", author: "Ana" },
        { text: "I understood that when they insult me, they're not talking about me — they're talking about their inner hell. It still hurts, but I no longer believe it.", author: "Carlos" },
      ],
      resourcesTitle: "Professional Resources",
      resourcesIntro: "ABRAZO does not replace therapy.",
      resources: [
        "Find professionals specialized in Dialectical Behavior Therapy (DBT) for your loved one.",
        "Seek individual therapy for yourself. Supporting someone with BPD is high-performance emotional work.",
        "BPDfamily.com — Community for friends and family.",
        "NAMI.org — National Alliance on Mental Illness.",
        "Books: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera).",
      ],
      selfCareTitle: "❤️ Taking Care of Yourself",
      selfCareIntro: "Supporting someone with BPD is exhausting and carries a high risk of compassion fatigue. Taking care of yourself isn't selfish — it's the only way to keep being there.",
      selfCarePoints: [
        { title: "Build your own support network", desc: "Talk to friends, family, or join a support group for families." },
        { title: "Consider therapy for yourself", desc: "A professional can give you tools to manage stress and set healthy boundaries." },
        { title: "Maintain your own life", desc: "Don't abandon your hobbies, friendships, and routines. Time for yourself is vital." },
      ],
      recoveryTitle: "🤝 Supporting Their Process",
      recoveryIntro: "Your role is support, not therapist. The responsibility of treatment belongs to the person with BPD and their professionals.",
      recoveryPoints: [
        { title: "Encourage them to seek help", desc: "It's essential that treatment is guided by a professional specialized in BPD." },
        { title: "Celebrate small wins", desc: "Acknowledge the effort and small progress without fanfare." },
        { title: "Maintain a stable structure", desc: "Predictable family routines are a source of security that counteracts their internal chaos." },
      ],
      conclusionTitle: "💡 In Conclusion",
      conclusionText: "Loving someone with BPD is a complex and profound journey that requires learning new skills, practicing compassion, and above all, being very kind to yourself. With the right approach, it's possible to build a stronger and more stable relationship.",
      conclusionFinal: "If the situation becomes unbearable or seriously affects your mental health, seeking professional help for yourself is an act of responsibility and self-love.",
    },
    footer: {
      line1: "ABRAZO was created from lived pain, transformed into understanding for others.",
      line2: "Based on real experience. To turn pain into understanding.",
      line3: "© 2026 ABRAZO — Loving someone with BPD. This site does not replace professional therapy.",
    },
  },

  // ───────────────────── PORTUGUÊS ─────────────────────
  pt: {
    nav: {
      home: "Início",
      understanding: "Entender o TPB",
      signs: "Sinais",
      story: "História Real",
      tools: "Ferramentas",
      boundaries: "Limites",
      community: "Comunidade",
    },
    header: {
      title: "ABRAZO",
      subtitle: "Para quem ama alguém com Transtorno de Personalidade Borderline (TPB)",
      tagline: "Nascido da dor. Construído com ternura. Para transformar dor em compreensão.",
    },
    home: {
      heroTitle: "Você ama alguém que sofre.",
      heroP1: "Você ama incondicionalmente. Mas cada dia é diferente. Alguns dias é o amor mais intenso que já sentiu; outros dias você se sente preso num pesadelo do qual não sabe como acordar.",
      heroP2: "Você não está sozinho/a. E não é responsável por \"consertar\" a outra pessoa.",
      heroP3: "Este site existe para você. Não para diagnosticar. Não para julgar. Existe para que você entenda o que está acontecendo, como se proteger com amor, e como soltar sem ressentimento.",
      ctaButton: "Comece a entender",
      card1Title: "📚 Aprenda",
      card1Desc: "Entenda o que é TPB pela perspectiva de quem ama alguém que o tem. Não uma lista fria de sintomas, mas um mapa do terreno emocional.",
      card2Title: "🌿 Reconheça padrões",
      card2Desc: "Identifique comportamentos sem diagnosticar. Com compaixão, não julgamento. Para entender por que você reage como reage.",
      card3Title: "💛 Proteja-se",
      card3Desc: "Aprenda limites que honrem seu amor e sua saúde mental. Porque cuidar de si não é egoísmo — é a base para poder continuar presente.",
    },
    understanding: {
      title: "Entendendo o TPB",
      intro: "Quando você ama alguém com Transtorno de Personalidade Borderline, os manuais clínicos não são suficientes. Você não precisa de uma lista fria de sintomas; precisa saber por que dói tanto e por que se sente tão confuso/a.",
      emotionalSkinTitle: "O \"Terceiro Grau Emocional\"",
      emotionalSkinDesc: "Sua pele emocional não tem camada protetora. Sentem o mundo a 100 graus enquanto os demais estamos a 25. Por isso uma crítica suave pode ser sentida por eles como um ataque devastador.",
      abandonmentTitle: "O Medo do Abandono",
      abandonmentDesc: "Não é capricho. É um alarme interno que toca constantemente gritando \"Vão te deixar\". Muitas de suas reações desproporcionadas não são contra você, são contra esse medo paralisante.",
      voidTitle: "O Vazio",
      voidDesc: "Não é tédio. É um buraco negro existencial que tentam preencher com relações intensas, compras ou raiva. Você não pode preencher esse vazio, e se libertar dessa carga é o primeiro passo para ajudar de verdade.",
      closingNote: "Aprender isso não é justificar maus tratos. É entender o mapa do território em que você está caminhando.",
      clinicalTitle: "O que diz a ciência",
      clinicalPoints: [
        { title: "Instabilidade Emocional", desc: "As emoções são muito intensas e mutáveis, com padrões de idealização e desvalorização nos vínculos." },
        { title: "Medo do Abandono", desc: "Um medo intenso e frequentemente irracional de ser deixado de lado. Podem reagir de forma desproporcional a uma separação real ou percebida." },
        { title: "Pensamento Dicotômico", desc: "O mundo é percebido em extremos (preto ou branco), quase sem nuances. Alguém pode ser maravilhoso num momento e desprezível no seguinte." },
        { title: "Impulsividade", desc: "Tendência a agir sem pensar nas consequências, como forma de regular a dor emocional." },
      ],
    },
    signs: {
      title: "Reconheça Padrões",
      intro: "Talvez sua pessoa não tenha diagnóstico. Talvez você só saiba que a relação é uma montanha-russa. Estes são padrões que costumam aparecer. Observe com compaixão, não para rotular, mas para entender.",
      patterns: [
        { title: "Idealização e Desvalorização", desc: "Um dia você é a salvação dele/a, a pessoa favorita no universo. No dia seguinte, um pequeno desentendimento te transforma na pior pessoa do mundo." },
        { title: "Hipersensibilidade à Crítica", desc: "Diz: \"Você está bravo comigo, né?\" quando você só está cansado/a. Seu radar para detectar rejeição está calibrado no máximo." },
        { title: "Medo da Solidão", desc: "Não suportam estar sozinhos consigo mesmos. Podem enviar dezenas de mensagens seguidas se você não responder em 10 minutos. Não é controle, é pânico." },
        { title: "Autossabotagem", desc: "Justo quando a relação vai bem e há paz, surge uma briga por algo mínimo. A estabilidade, para um cérebro TPB, às vezes é mais assustadora que o caos conhecido." },
      ],
      closingNote: "Reconhecer esses padrões não é rotular ninguém. É se dar permissão para entender o que você vive e buscar ferramentas para navegar isso.",
    },
    story: {
      title: "A História Real",
      subtitle: "A origem do ABRAZO",
      quote: "ABRAZO foi criado a partir da dor vivida de alguém que amou intensamente demais.",
      intro: "O criador do ABRAZO não é psicólogo. É uma pessoa como você. Conheceu alguém num momento de suas vidas em que ambos buscavam uma âncora. A conexão foi imediata, magnética, daquelas que fazem você acreditar em almas gêmeas.",
      bodyP1: "Durante meses, navegou entre o céu e o inferno. Havia fins de semana de risos, planos de futuro e uma intimidade que nunca havia sentido. Mas também havia portas batendo, ameaças semanais de término e uma exaustão emocional que o deixava vazio.",
      bodyP2: "Essa pessoa não era \"má\". Sofria.",
      bodyP3: "Ele não era \"fraco\". Amava.",
      bodyP4: "A relação terminou. Ficou com o coração partido e mil perguntas sem resposta: Por que isso aconteceu? Foi minha culpa? Dá para amar alguém assim sem se destruir?",
      bodyP5: "Desse luto nasceu o ABRAZO. Decidiu transmutar a dor em sabedoria para que a próxima pessoa que pesquise \"Como ajudar meu parceiro com TPB sem enlouquecer\" encontre um abraço e não um julgamento.",
      credit: "Baseado em experiência real. Transmutado em sabedoria para outros.",
    },
    tools: {
      title: "Ferramentas para o Dia a Dia",
      intro: "Amar alguém com TPB requer uma nova linguagem. Não a da lógica fria, mas a da validação emocional.",
      validationTitle: "1. Validação sem concordar",
      validationSituation: "Situação: Grita: \"Você odeia estar comigo, eu sei!\"",
      validationWrong: "Reação normal (que piora tudo): \"Isso não é verdade, você está exagerando, se acalma.\"",
      validationRight: "Ferramenta ABRAZO: \"Sinto muito que você esteja se sentindo assim agora. Deve ser horrível sentir que alguém que você ama está te rejeitando.\"",
      validationWhy: "Você não confirma que o odeia; confirma que o sentimento dele é real e doloroso. Isso baixa a temperatura da crise.",
      trafficLightTitle: "2. A Técnica do Semáforo na Crise",
      redLabel: "🔴 Luz Vermelha — Crise aguda",
      redDesc: "Não raciocinar. Apenas dizer: \"Estou aqui. Não vou embora. Quando você puder respirar, conversamos.\"",
      yellowLabel: "🟡 Luz Amarela — Calma tensa",
      yellowDesc: "Distrair com algo sensorial: um copo de água gelada, um cobertor, sair na varanda 1 minuto.",
      greenLabel: "🟢 Luz Verde — Tranquilidade",
      greenDesc: "É o momento de falar do problema real, mas sempre desde o \"Eu\" e não desde o \"Você\". \"Quando a voz sobe, eu me assusto e preciso de um momento.\"",
      breathingTitle: "3. Respiração para você",
      breathingDesc: "Se sentir que está se afogando, use a técnica 4-7-8: Inspire em 4 segundos, segure 7, expire em 8. Repita 3 vezes. É para você. Para não perder seu centro.",
      communicationTitle: "Estratégias de Comunicação",
      communicationIntro: "A comunicação é o pilar para lidar com os momentos difíceis:",
      commPoints: [
        { title: "Validação Emocional", desc: "Reconhecer e aceitar o sentimento da outra pessoa, sem que isso signifique concordar com sua conduta." },
        { title: "Escuta Ativa", desc: "Estar plenamente presente, ouvir sem julgar, sem minimizar a experiência nem oferecer soluções não solicitadas." },
        { title: "Comunicação Não Violenta", desc: "Expressar suas próprias necessidades sem atacar nem culpar, usando frases em primeira pessoa (\"Eu me sinto...\")." },
      ],
      dontDoTitle: "O que NÃO fazer",
      dontDoDesc: "Ficar na defensiva, usar rótulos ou comentários invalidantes (\"você está exagerando\") que podem intensificar o conflito.",
    },
    boundaries: {
      title: "Limites Compassivos",
      intro: "No amor com TPB, ou você aprende a colocar limites ou o vínculo te devora. O limite não é castigo, é a cerca que protege o jardim do seu relacionamento para que não seja pisoteado.",
      badTitle: "Limite Mal Colocado (Castigo)",
      badExample: "\"Como você gritou comigo, vou embora e não volto por 3 dias.\"",
      badExplain: "Isso ativa o medo do abandono e desencadeia uma crise maior.",
      goodTitle: "Limite Compassivo (Amor-próprio)",
      goodExample: "\"Te amo muito, e justamente porque te amo e quero que isso funcione, preciso sair para caminhar 20 minutos para me acalmar. Quando voltar, se estivermos mais tranquilos, podemos continuar conversando. Não estou saindo da relação — estou saindo da discussão.\"",
      hardestTitle: "O limite mais difícil",
      hardestDesc: "Há um momento em que o limite compassivo é: \"Não posso te ajudar sem me destruir.\" Amar também é saber soltar. Não por falta de amor, mas por excesso de respeito pela sua própria vida.",
      tipsTitle: "Chaves para estabelecer limites",
      tips: [
        { title: "Seja Claro e Carinhoso", desc: "\"Te amo e quero te ouvir, mas não consigo fazer isso se você gritar comigo.\"" },
        { title: "Seja Consistente", desc: "Uma vez colocado, mantenha. A consistência gera segurança e previsibilidade — algo que pessoas com TPB precisam profundamente." },
        { title: "Diferencie Limites de Ultimatos", desc: "Limites protegem seu bem-estar (\"Preciso sair se a conversa esquentar\"), enquanto ultimatos controlam a conduta do outro." },
      ],
    },
    community: {
      title: "Você Não Está Sozinho/a",
      intro: "Este cantinho é para compartilhar o que você cala. Para soltar o peso de se sentir o único cuidador do mundo.",
      lettersTitle: "Cartas ao ABRAZO",
      letters: [
        { text: "Hoje consegui colocar um limite pela primeira vez. Estou tremendo, mas me sinto um pouco mais eu.", author: "Ana" },
        { text: "Entendi que quando me insulta, não está falando de mim, mas do seu inferno interno. Ainda dói, mas já não acredito.", author: "Carlos" },
      ],
      resourcesTitle: "Recursos Profissionais",
      resourcesIntro: "ABRAZO não substitui terapia.",
      resources: [
        "Busque profissionais especializados em Terapia Comportamental Dialética (DBT) para seu ente querido.",
        "Busque terapia individual para você. Cuidar de alguém com TPB é trabalho emocional de alto rendimento.",
        "BPDfamily.com — Comunidade para amigos e família.",
        "NAMI.org — National Alliance on Mental Illness.",
        "Livros: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera).",
      ],
      selfCareTitle: "❤️ Cuidando de Você",
      selfCareIntro: "Apoiar alguém com TPB é exaustivo e carrega alto risco de fadiga por compaixão. Cuidar de si não é egoísmo — é a única forma de poder continuar presente.",
      selfCarePoints: [
        { title: "Construa sua rede", desc: "Converse com amigos, familiares ou participe de um grupo de apoio para famílias." },
        { title: "Considere terapia para você", desc: "Um profissional pode fornecer ferramentas para gerenciar estresse e colocar limites saudáveis." },
        { title: "Mantenha sua própria vida", desc: "Não abandone seus hobbies, amizades e rotinas. Tempo para si é vital." },
      ],
      recoveryTitle: "🤝 Apoiando o Processo",
      recoveryIntro: "Seu papel é de apoio, não de terapeuta. A responsabilidade do tratamento é da pessoa com TPB e seus profissionais.",
      recoveryPoints: [
        { title: "Incentive a buscar ajuda", desc: "É fundamental que o tratamento seja guiado por um profissional especializado em TPB." },
        { title: "Celebre pequenas conquistas", desc: "Reconheça o esforço e os pequenos avanços sem grandes alvoroços." },
        { title: "Mantenha uma estrutura estável", desc: "Rotinas familiares previsíveis são fonte de segurança que contrabalança o caos interno." },
      ],
      conclusionTitle: "💡 Em Conclusão",
      conclusionText: "Amar alguém com TPB é uma jornada complexa e profunda que requer aprender novas habilidades, praticar a compaixão e, acima de tudo, ser muito gentil consigo mesmo/a. Com a abordagem certa, é possível construir uma relação mais forte e estável.",
      conclusionFinal: "Se a situação se tornar insustentável ou afetar gravemente sua saúde mental, buscar ajuda profissional para si é um ato de responsabilidade e amor-próprio.",
    },
    footer: {
      line1: "ABRAZO foi criado a partir da dor vivida, transformada em compreensão para outros.",
      line2: "Baseado em experiência real. Para transformar dor em compreensão.",
      line3: "© 2026 ABRAZO — Amar alguém com TPB. Este site não substitui terapia profissional.",
    },
  },

  // ───────────────────── CATALÀ ─────────────────────
  ca: {
    nav: {
      home: "Inici",
      understanding: "Entendre el TLP",
      signs: "Senyals",
      story: "Història Real",
      tools: "Eines",
      boundaries: "Límits",
      community: "Comunitat",
    },
    header: {
      title: "ABRAZO",
      subtitle: "Per a qui estima algú amb Trastorn Límit de la Personalitat (TLP)",
      tagline: "Nascut del dolor. Construït amb tendresa. Per convertir el dolor en comprensió.",
    },
    home: {
      heroTitle: "Estimes algú que pateix.",
      heroP1: "Estimes incondicionalment. Però cada dia és diferent. Alguns dies és l'amor més intens que has sentit; altres dies et sents atrapat en un malson del qual no saps com despertar.",
      heroP2: "No estàs sol/a. I no ets responsable d'\"arreglar\" l'altra persona.",
      heroP3: "Aquest lloc existeix per a tu. No per diagnosticar. No per jutjar. Existeix perquè entenguis què està passant, com protegir-te amb amor, i com deixar anar sense rancor.",
      ctaButton: "Comença a entendre",
      card1Title: "📚 Aprèn",
      card1Desc: "Entén què és el TLP des de la perspectiva de qui estima algú que el té. No una llista freda de símptomes, sinó un mapa del terreny emocional.",
      card2Title: "🌿 Reconeix patrons",
      card2Desc: "Identifica comportaments sense diagnosticar. Amb compassió, no judici. Per entendre per què reacciones com reacciones.",
      card3Title: "💛 Protegeix-te",
      card3Desc: "Aprèn límits que honrin el teu amor i la teva salut mental. Perquè cuidar-te no és egoisme — és la base per poder seguir present.",
    },
    understanding: {
      title: "Entenent el TLP",
      intro: "Quan estimes algú amb Trastorn Límit de la Personalitat, els manuals clínics no són suficients. No necessites una llista freda de símptomes; necessites saber per què fa tant de mal i per què et sents tan confós/a.",
      emotionalSkinTitle: "El \"Tercer Grau Emocional\"",
      emotionalSkinDesc: "La seva pell emocional no té capa protectora. Senten el món a 100 graus mentre els altres estem a 25. Per això una crítica suau pot sentir-se per a ells com un atac devastador.",
      abandonmentTitle: "La Por a l'Abandonament",
      abandonmentDesc: "No és un caprici. És una alarma interna que sona constantment cridant \"Et deixaran\". Moltes de les seves reaccions desproporcionades no són contra tu, són contra aquesta por paralitzant.",
      voidTitle: "El Buit",
      voidDesc: "No és avorriment. És un forat negre existencial que intenten omplir amb relacions intenses, compres o ràbia. Tu no pots omplir aquest buit, i alliberar-te d'aquesta càrrega és el primer pas per poder ajudar de veritat.",
      closingNote: "Aprendre això no és justificar el maltractament. És entendre el mapa del territori pel qual estàs caminant.",
      clinicalTitle: "El que diu la ciència",
      clinicalPoints: [
        { title: "Inestabilitat Emocional", desc: "Les emocions són molt intenses i canviants, amb patrons d'idealització i devaluació en els seus vincles." },
        { title: "Por a l'Abandonament", desc: "Una por intensa i sovint irracional a ser deixat de banda. Poden reaccionar de forma desproporcionada davant una separació real o percebuda." },
        { title: "Pensament Dicotòmic", desc: "El món es percep en extrems (blanc o negre), gairebé sense matisos. Algú pot ser meravellós en un moment i menyspreable al següent." },
        { title: "Impulsivitat", desc: "Tendència a actuar sense pensar en les conseqüències, com a forma de regular el dolor emocional." },
      ],
    },
    signs: {
      title: "Reconeix Patrons",
      intro: "Potser la teva persona no té diagnòstic. Potser només saps que la relació és una muntanya russa. Aquests són patrons que solen aparèixer. Observa amb compassió, no per etiquetar, sinó per entendre.",
      patterns: [
        { title: "Idealització i Devaluació", desc: "Un dia ets la seva salvació, la seva persona favorita a l'univers. L'endemà, un petit desacord et converteix en la pitjor persona del món." },
        { title: "Hipersensibilitat a la Crítica", desc: "Et diu: \"Ja estàs enfadat amb mi, oi?\" quan tu només estàs cansat/da. El seu radar per detectar el rebuig està calibrat al màxim." },
        { title: "Por a la Soledat", desc: "No suporten estar sols amb si mateixos. Poden enviar desenes de missatges seguits si no respons en 10 minuts. No és control, és pànic." },
        { title: "Autosabotatge", desc: "Just quan la relació va bé i hi ha pau, sorgeix una baralla per alguna cosa mínima. L'estabilitat, per a un cervell TLP, de vegades és més aterridora que el caos conegut." },
      ],
      closingNote: "Reconèixer aquests patrons no és etiquetar ningú. És donar-te permís per entendre el que vius i buscar eines per navegar-ho.",
    },
    story: {
      title: "La Història Real",
      subtitle: "L'origen d'ABRAZO",
      quote: "ABRAZO va ser creat des del dolor viscut d'algú que va estimar massa intensament.",
      intro: "El creador d'ABRAZO no és psicòleg. És una persona com tu. Va conèixer algú en un moment de les seves vides en què tots dos buscaven una àncora. La connexió va ser immediata, magnètica, d'aquelles que et fan creure en ànimes bessones.",
      bodyP1: "Durant mesos, va navegar entre el cel i l'infern. Hi havia caps de setmana de riures, plans de futur i una intimitat que mai havia sentit. Però també hi havia portades, amenaces setmanals de ruptura i un esgotament emocional que el deixava buit.",
      bodyP2: "Aquella persona no era \"dolenta\". Patia.",
      bodyP3: "Ell no era \"feble\". Estimava.",
      bodyP4: "La relació va acabar. Es va quedar amb el cor trencat i mil preguntes sense resposta: Per què va passar això? Va ser culpa meva? Es pot estimar algú així sense destruir-se?",
      bodyP5: "D'aquell dol va néixer ABRAZO. Va decidir transmutar el dolor en saviesa perquè la propera persona que cerqui \"Com ajudar la meva parella amb TLP sense tornar-me boig\" trobi una abraçada i no un judici.",
      credit: "Basat en experiència real. Transmutat en saviesa per a altres.",
    },
    tools: {
      title: "Eines per al Dia a Dia",
      intro: "Estimar algú amb TLP requereix un nou llenguatge. No el de la lògica freda, sinó el de la validació emocional.",
      validationTitle: "1. Validació sense estar d'acord",
      validationSituation: "Situació: Et crida: \"Odies estar amb mi, ho sé!\"",
      validationWrong: "Reacció normal (que empitjora tot): \"Això no és veritat, estàs exagerant, calma't.\"",
      validationRight: "Eina ABRAZO: \"Sento molt que et sentis així ara mateix. Deu ser horrible sentir que algú a qui estimes et rebutja.\"",
      validationWhy: "No confirmes que l'odies; confirmes que el seu sentiment és real i dolorós. Això baixa la temperatura de la crisi.",
      trafficLightTitle: "2. La Tècnica del Semàfor en Crisi",
      redLabel: "🔴 Llum Vermella — Crisi aguda",
      redDesc: "No raonar. Només dir: \"Sóc aquí. No me n'aniré. Quan puguis respirar, parlarem.\"",
      yellowLabel: "🟡 Llum Groga — Calma tensa",
      yellowDesc: "Distreure amb alguna cosa sensorial: un got d'aigua freda, una manta, sortir al balcó 1 minut.",
      greenLabel: "🟢 Llum Verda — Tranquil·litat",
      greenDesc: "És el moment de parlar del problema real, però sempre des del \"Jo\" i no des del \"Tu\". \"Quan puja la veu, jo m'espanto i necessito un moment.\"",
      breathingTitle: "3. Respiració per a tu",
      breathingDesc: "Si sents que t'ofegues, usa la tècnica 4-7-8: Inhala en 4 segons, reté 7, exhala en 8. Repeteix 3 vegades. És per a tu. Per no perdre el teu centre.",
      communicationTitle: "Estratègies de Comunicació",
      communicationIntro: "La comunicació és el pilar per gestionar els moments difícils:",
      commPoints: [
        { title: "Validació Emocional", desc: "Reconèixer i acceptar el sentiment de l'altra persona, sense que això signifiqui que estiguis d'acord amb la seva conducta." },
        { title: "Escolta Activa", desc: "Estar plenament present, escoltar sense jutjar, sense minimitzar la seva experiència ni oferir solucions no sol·licitades." },
        { title: "Comunicació No Violenta", desc: "Expressar les teves pròpies necessitats sense atacar ni culpar, utilitzant frases en primera persona (\"Jo em sento...\")." },
      ],
      dontDoTitle: "Què NO fer",
      dontDoDesc: "Posar-se a la defensiva, usar etiquetes o comentaris invalidants (\"estàs exagerant\") que poden intensificar el conflicte.",
    },
    boundaries: {
      title: "Límits Compassius",
      intro: "En l'amor amb TLP, o aprens a posar límits o el vincle et devora. El límit no és un càstig, és la tanca que protegeix el jardí de la teva relació perquè no sigui trepitjat.",
      badTitle: "Límit Mal Posat (Càstig)",
      badExample: "\"Com que m'has cridat, me'n vaig i no torno en 3 dies.\"",
      badExplain: "Això activa la por a l'abandonament i desencadena una crisi major.",
      goodTitle: "Límit Compassiu (Amor propi)",
      goodExample: "\"T'estimo moltíssim, i justament perquè t'estimo i vull que això funcioni, necessito sortir a fer una volta de 20 minuts per calmar-me. Quan torni, si tots dos estem més tranquils, podem seguir parlant. No me'n vaig de la relació, me'n vaig de la discussió.\"",
      hardestTitle: "El límit més difícil",
      hardestDesc: "Hi ha un moment en què el límit compassiu és: \"No puc ajudar-te sense destruir-me a mi mateix/a.\" Estimar també és saber deixar anar. No per falta d'amor, sinó per excés de respecte a la teva pròpia vida.",
      tipsTitle: "Claus per establir límits",
      tips: [
        { title: "Sigues Clar i Carinyós", desc: "\"T'estimo i vull escoltar-te, però no puc fer-ho si em crides.\"" },
        { title: "Sigues Consistent", desc: "Un cop posat, manté'l. La consistència genera seguretat i previsibilitat, quelcom que les persones amb TLP necessiten profundament." },
        { title: "Diferencia Límits d'Ultimàtums", desc: "Els límits protegeixen el teu benestar (\"Necessito sortir si la conversa puja de to\"), mentre que els ultimàtums controlen la conducta de l'altre." },
      ],
    },
    community: {
      title: "No Estàs Sol/a",
      intro: "Aquest racó és per compartir el que calles. Per deixar anar el pes de sentir-te l'únic cuidador del món.",
      lettersTitle: "Cartes a ABRAZO",
      letters: [
        { text: "Avui he pogut posar un límit per primera vegada. Estic tremolant, però em sento una mica més jo.", author: "Ana" },
        { text: "He entès que quan m'insulta, no està parlant de mi, sinó del seu infern intern. Segueix fent mal, però ja no m'ho crec.", author: "Carlos" },
      ],
      resourcesTitle: "Recursos Professionals",
      resourcesIntro: "ABRAZO no substitueix la teràpia.",
      resources: [
        "Busca professionals especialitzats en Teràpia Dialèctica Conductual (DBT) per al teu ésser estimat.",
        "Busca teràpia individual per a tu. Cuidar algú amb TLP és un treball emocional d'alt rendiment.",
        "BPDfamily.com — Comunitat per a amics i família.",
        "NAMI.org — National Alliance on Mental Illness.",
        "Llibres: \"I Hate You — Don't Leave Me\" (Krieger), \"The Buddha and Borderline\" (Kiera).",
      ],
      selfCareTitle: "❤️ Cuidant de Tu Mateix/a",
      selfCareIntro: "Donar suport a algú amb TLP és esgotador i comporta un alt risc de fatiga per compassió. Cuidar-te no és egoisme — és l'única forma de poder seguir sent-hi.",
      selfCarePoints: [
        { title: "Construeix la teva xarxa", desc: "Parla amb amics, familiars o uneix-te a un grup de suport per a famílies." },
        { title: "Considera teràpia per a tu", desc: "Un professional pot proporcionar-te eines per gestionar l'estrès i posar límits saludables." },
        { title: "Manté la teva pròpia vida", desc: "No abandonis les teves aficions, amistats i rutines. Temps per a tu és vital." },
      ],
      recoveryTitle: "🤝 Donant Suport al Procés",
      recoveryIntro: "El teu paper és de suport, no de terapeuta. La responsabilitat del tractament és de la persona amb TLP i els seus professionals.",
      recoveryPoints: [
        { title: "Anima'l a buscar ajuda", desc: "És fonamental que el tractament el guiï un professional especialitzat en TLP." },
        { title: "Celebra les petites fites", desc: "Reconeix l'esforç i els petits avenços sense grans rebombories." },
        { title: "Manté una estructura estable", desc: "Les rutines familiars previsibles són font de seguretat que contraresta el seu caos intern." },
      ],
      conclusionTitle: "💡 En Conclusió",
      conclusionText: "Estimar algú amb TLP és un viatge complex i profund que requereix aprendre noves habilitats, practicar la compassió i, sobretot, ser molt amable amb tu mateix/a. Amb l'enfocament correcte, és possible construir una relació més forta i estable.",
      conclusionFinal: "Si la situació es torna insostenible o afecta greument la teva salut mental, buscar ajuda professional per a tu és un acte de responsabilitat i amor propi.",
    },
    footer: {
      line1: "ABRAZO va ser creat des del dolor viscut, transformat en comprensió per a altres.",
      line2: "Basat en experiència real. Per convertir el dolor en comprensió.",
      line3: "© 2026 ABRAZO — Estimar algú amb TLP. Aquest lloc no substitueix teràpia professional.",
    },
  },
};
