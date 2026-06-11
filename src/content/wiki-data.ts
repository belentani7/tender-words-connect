// ============================================================
// ENCICLOPEDIA DE DINÁMICAS Y SALUD MENTAL
// Capa aparte, enriquecida. Scope: trastornos mentales y su
// dinámica relacional (pareja, amistad, familia, colega, vecino).
// Español-first. ABRAZO permanece como módulo discreto dentro del TLP.
// ============================================================

export type WikiSectionBlock = { id: string; title: string; content: string };
export type WikiDynamic = { context: string; desc: string };

export type DisorderEntry = {
  id: string;
  title: string;
  short: string;
  summary: string;
  clinicalLevel: "básico" | "intermedio" | "clínico";
  cluster?: string;
  tags: string[];
  sections: WikiSectionBlock[];
  criteria?: string[];
  dynamics: WikiDynamic[];
  care: string[];
  hasAbrazo?: boolean;
};

export type DudaCategory = {
  id: string;
  category: string;
  icon: string;
  intro: string;
  questions: { q: string; a: string }[];
};

// ── Catálogo de trastornos ──────────────────────────────────
export const WIKI_DATA: DisorderEntry[] = [
  {
    id: "tlp",
    title: "Trastorno Límite de la Personalidad",
    short: "TLP",
    summary:
      "Inestabilidad intensa en emociones, autoimagen y vínculos, con un miedo profundo al abandono y una sensibilidad emocional que se vive a flor de piel.",
    clinicalLevel: "clínico",
    cluster: "Cluster B",
    tags: ["personalidad", "regulación emocional", "vínculos", "DBT", "apego"],
    sections: [
      {
        id: "definicion",
        title: "Definición clínica",
        content:
          "Según el DSM-5-TR, el TLP es un patrón persistente de inestabilidad en las relaciones interpersonales, la autoimagen y la afectividad, junto con una marcada impulsividad. No es un defecto de carácter ni una elección: es un trastorno del sistema de regulación emocional. La persona siente las emociones con más intensidad, las alcanza más rápido y tarda más en volver a la calma.",
      },
      {
        id: "neurobiologia",
        title: "Base neurobiológica",
        content:
          "Se observa una amígdala hiperreactiva (la alarma del miedo se dispara antes y más fuerte) y una menor modulación desde la corteza prefrontal (el freno racional llega tarde). A esto se suma una sensibilidad documentada al rechazo. El resultado no es manipulación: es una respuesta biológica desbordada que la propia persona muchas veces no entiende.",
      },
      {
        id: "dinamica",
        title: "Dinámica interpersonal",
        content:
          "Aparece el ciclo de idealización y devaluación: hoy eres lo más valioso del mundo, mañana una amenaza. El esfuerzo por evitar el abandono puede volverse frenético. La intensidad no significa falta de amor; muchas veces es exactamente lo contrario: amar con tanta fuerza que da vértigo perderlo.",
      },
      {
        id: "esperanza",
        title: "Pronóstico y recuperación",
        content:
          "Es uno de los trastornos de personalidad con mejor pronóstico. Con terapia (especialmente DBT, mentalización y terapia de esquemas) muchas personas alcanzan remisión sostenida. La regulación emocional se puede aprender. El TLP no es una sentencia.",
      },
    ],
    criteria: [
      "Esfuerzos frenéticos para evitar un abandono real o imaginado.",
      "Relaciones intensas e inestables que alternan idealización y devaluación.",
      "Alteración de la identidad: autoimagen inestable de forma marcada.",
      "Impulsividad en al menos dos áreas potencialmente dañinas (gasto, sexo, sustancias, conducción, atracones).",
      "Conductas, gestos o amenazas de autolesión recurrentes.",
      "Inestabilidad afectiva por reactividad del estado de ánimo.",
      "Sentimientos crónicos de vacío.",
      "Ira intensa e inapropiada o dificultad para controlarla.",
      "Ideación paranoide transitoria o síntomas disociativos graves bajo estrés.",
    ],
    dynamics: [
      { context: "Pareja / persona favorita", desc: "La 'persona favorita' se vuelve ancla emocional: su atención regula y su silencio desestabiliza. Validar sin rescatar y sostener límites firmes y amables es lo que crea seguridad real." },
      { context: "Amistad", desc: "Vínculos profundos y leales, pero con miedo a ser reemplazado. Pequeños cambios de tono se interpretan como rechazo. La constancia tranquila vale más que las grandes promesas." },
      { context: "Familia", desc: "El hogar suele ser el escenario de las tormentas. Reducir la 'emoción expresada' (crítica y sobreimplicación) baja la frecuencia de crisis." },
      { context: "Colega / trabajo", desc: "Alta empatía y creatividad, pero la crítica se vive como amenaza personal. El feedback concreto y privado funciona mejor que el público." },
    ],
    care: [
      "Validar la emoción antes que discutir el hecho.",
      "Límites compasivos: 'No puedo ahora, sí mañana' no es abandono.",
      "Constancia y previsibilidad bajan la alarma del sistema nervioso.",
      "Cuidar también de ti: sostener a alguien no es vaciarte.",
    ],
    hasAbrazo: true,
  },
  {
    id: "tept-c",
    title: "Trauma complejo y TEPT",
    short: "TEPT / TEPT-C",
    summary:
      "Respuesta del sistema nervioso a un trauma único o sostenido en el tiempo: revivir, evitar, hipervigilancia y una sensación constante de peligro que ya pasó.",
    clinicalLevel: "clínico",
    tags: ["trauma", "sistema nervioso", "memoria", "regulación", "disociación"],
    sections: [
      { id: "definicion", title: "Qué es", content: "El TEPT surge tras la exposición a un suceso traumático. El TEPT complejo (TEPT-C) aparece tras trauma prolongado o repetido (a menudo en la infancia o en relaciones de abuso) y añade dificultades de regulación emocional, autoconcepto negativo y problemas relacionales." },
      { id: "sintomas", title: "Cómo se manifiesta", content: "Reexperimentación (flashbacks, pesadillas), evitación de lo que recuerda al trauma, hiperactivación (sobresaltos, insomnio, irritabilidad) y alteraciones del estado de ánimo y la cognición. En el TEPT-C, además, vergüenza crónica y sensación de estar 'roto'." },
      { id: "cuerpo", title: "El trauma vive en el cuerpo", content: "El sistema nervioso queda atascado en modo defensa. No es debilidad: es protección que se quedó encendida. La recuperación pasa por enseñarle al cuerpo que el peligro terminó." },
    ],
    dynamics: [
      { context: "Pareja", desc: "La intimidad puede activar alarmas antiguas. La seguridad se construye con previsibilidad, consentimiento y paciencia, no con presión." },
      { context: "Amistad", desc: "Puede haber distancia protectora o, al revés, apego intenso por miedo a la pérdida. Respetar el ritmo es clave." },
      { context: "Familia", desc: "Cuando el trauma viene del propio sistema familiar, poner distancia puede ser un acto de salud, no de traición." },
    ],
    care: [
      "No fuerces el relato del trauma; acompaña el presente.",
      "Anclajes sensoriales (respiración, frío, tacto) ayudan en los flashbacks.",
      "La terapia de trauma (EMDR, somática, fásica) es de primera línea.",
    ],
  },
  {
    id: "bipolar",
    title: "Trastorno Bipolar",
    short: "TB",
    summary:
      "Alternancia entre fases de elevación del ánimo (manía o hipomanía) y fases depresivas, en episodios que duran días o semanas, no minutos.",
    clinicalLevel: "clínico",
    tags: ["estado de ánimo", "manía", "depresión", "ciclos", "medicación"],
    sections: [
      { id: "definicion", title: "Qué es", content: "Es un trastorno del estado de ánimo con episodios diferenciados. En la manía hay euforia o irritabilidad, menos necesidad de dormir, impulsividad y grandiosidad; en la depresión, todo lo contrario. Es biológico y altamente tratable con medicación y psicoeducación." },
      { id: "diferencia", title: "No confundir con TLP", content: "La diferencia clave es el tiempo: en el TLP el ánimo cambia en horas como reacción a lo relacional; en el bipolar los episodios duran días o semanas y no dependen tanto del contexto interpersonal." },
    ],
    dynamics: [
      { context: "Pareja", desc: "La estabilidad de rutinas (sueño, medicación) protege el vínculo. Aprender a reconocer señales tempranas de un episodio es protección mutua." },
      { context: "Familia", desc: "La psicoeducación familiar reduce recaídas. Diferenciar 'la persona' de 'el episodio' evita resentimientos." },
    ],
    care: [
      "El sueño regular es un estabilizador del ánimo.",
      "Acordar un plan de crisis en calma, para usarlo en episodio.",
      "No retirar la medicación sin acompañamiento profesional.",
    ],
  },
  {
    id: "narcisista",
    title: "Trastorno Narcisista de la Personalidad",
    short: "TNP",
    summary:
      "Patrón de grandiosidad, necesidad de admiración y falta de empatía que, por debajo, suele esconder una autoestima extremadamente frágil.",
    clinicalLevel: "clínico",
    cluster: "Cluster B",
    tags: ["personalidad", "empatía", "autoestima", "vínculos", "dinámica"],
    sections: [
      { id: "definicion", title: "Qué es", content: "Detrás de la fachada de superioridad suele haber una herida narcisista: un yo que no soporta la vergüenza. Existe el narcisismo grandioso (visible, dominante) y el vulnerable (encubierto, victimista). No todo el que es egoísta tiene TNP: es un patrón rígido y generalizado." },
      { id: "dinamica", title: "Dinámica relacional", content: "El vínculo puede pasar por idealización, devaluación y descarte. La empatía cognitiva (saber qué sientes) puede estar presente sin empatía afectiva (importarle). Reconocerlo no es etiquetar para odiar, sino protegerte." },
    ],
    dynamics: [
      { context: "Pareja", desc: "Ciclo de love bombing, control sutil y devaluación. Recuperar criterio propio y red externa es esencial." },
      { context: "Colega", desc: "Tiende a apropiarse de logros y a desviar culpas. Documentar y poner límites claros protege tu trabajo." },
      { context: "Familia", desc: "Roles asignados (el 'dorado', el 'chivo expiatorio') generan dinámicas dañinas entre hermanos." },
    ],
    care: [
      "Confía en lo que ves, no solo en lo que te dicen.",
      "Mantén una red de apoyo fuera del vínculo.",
      "Límites con consecuencias reales, no solo advertencias.",
    ],
  },
  {
    id: "antisocial",
    title: "Trastorno Antisocial de la Personalidad",
    short: "TAP",
    summary:
      "Patrón de desprecio y violación de los derechos de los demás, con dificultad para el remordimiento y tendencia a la manipulación.",
    clinicalLevel: "clínico",
    cluster: "Cluster B",
    tags: ["personalidad", "empatía", "impulsividad", "riesgo"],
    sections: [
      { id: "definicion", title: "Qué es", content: "Implica desprecio por las normas y los derechos ajenos, engaño, impulsividad y baja respuesta de culpa. La psicopatía es una variante con rasgos específicos de frialdad emocional. Solo profesionales diagnostican: aquí describimos para reconocer dinámicas, no para etiquetar." },
    ],
    dynamics: [
      { context: "Pareja", desc: "El encanto inicial puede ocultar control y explotación. La seguridad pasa por planes de salida y apoyo profesional." },
      { context: "Vecino / entorno", desc: "Transgresión de límites comunes sin culpa aparente. No personalices: protege tus espacios." },
    ],
    care: [
      "Tu seguridad física y emocional es prioridad uno.",
      "Evita el rol de 'salvador': no es tu responsabilidad cambiarlo.",
      "Busca apoyo especializado si hay abuso.",
    ],
  },
  {
    id: "tdah",
    title: "TDAH",
    short: "TDAH",
    summary:
      "Patrón de inatención, impulsividad y/o hiperactividad de base neurobiológica que afecta la regulación de la atención, el tiempo y las emociones.",
    clinicalLevel: "intermedio",
    tags: ["neurodivergencia", "atención", "impulsividad", "ejecutivo"],
    sections: [
      { id: "definicion", title: "Qué es", content: "El TDAH no es falta de voluntad: es una diferencia en las funciones ejecutivas (planificar, iniciar, inhibir, recordar). La disregulación emocional y la 'disforia sensible al rechazo' son frecuentes y a veces se confunden con TLP." },
      { id: "diferencia", title: "No confundir con TLP", content: "Ambos comparten impulsividad y reactividad, pero en el TDAH no hay miedo central al abandono ni inestabilidad de identidad como eje. Pueden coexistir." },
    ],
    dynamics: [
      { context: "Pareja", desc: "Olvidos y desorganización pueden leerse como desamor cuando no lo son. Sistemas externos (recordatorios, rutinas) ayudan más que los reproches." },
      { context: "Colega", desc: "Creatividad y foco intenso en lo que motiva; dificultad con lo tedioso. Acuerdos claros y plazos visibles funcionan." },
    ],
    care: [
      "Estructura externa > fuerza de voluntad.",
      "Separar la conducta del afecto: 'olvidó' no es 'no le importas'.",
      "Tratamiento combinado (psicoeducación + a veces medicación) es eficaz.",
    ],
  },
  {
    id: "depresion",
    title: "Depresión",
    short: "TDM",
    summary:
      "Más que tristeza: una bajada sostenida del ánimo, la energía y la capacidad de disfrutar que altera el sueño, el apetito y el pensamiento.",
    clinicalLevel: "intermedio",
    tags: ["estado de ánimo", "energía", "anhedonia", "tratamiento"],
    sections: [
      { id: "definicion", title: "Qué es", content: "La depresión mayor implica estado de ánimo bajo o pérdida de interés casi todos los días durante al menos dos semanas, con cambios en sueño, apetito, concentración y sensación de inutilidad. No se 'sale poniendo de tu parte': es un cuadro tratable." },
    ],
    dynamics: [
      { context: "Pareja", desc: "El retraimiento no es rechazo. Acompañar sin presionar y cuidar el propio desgaste sostiene el vínculo." },
      { context: "Amistad", desc: "La presencia constante y sin exigencias vale más que los consejos. Invitar sin condicionar la respuesta." },
    ],
    care: [
      "Pequeños pasos diarios antes que grandes metas.",
      "Pedir ayuda profesional no es rendirse, es estrategia.",
      "Vigilar señales de riesgo y conocer líneas de crisis.",
    ],
  },
  {
    id: "ansiedad",
    title: "Trastornos de Ansiedad",
    short: "TAG / fobias",
    summary:
      "Sistema de alarma que se activa sin peligro real: preocupación excesiva, anticipación catastrófica y síntomas físicos de miedo.",
    clinicalLevel: "básico",
    tags: ["ansiedad", "miedo", "cuerpo", "evitación"],
    sections: [
      { id: "definicion", title: "Qué es", content: "Incluye el trastorno de ansiedad generalizada, las fobias, el pánico y la ansiedad social. El cuerpo reacciona como ante una amenaza (taquicardia, tensión, mareo) aunque la mente sepa que no la hay. La evitación alivia a corto plazo pero alimenta el miedo." },
    ],
    dynamics: [
      { context: "Pareja", desc: "Pedir reaseguro constante puede agotar. Acompañar sin reforzar la evitación es el equilibrio sano." },
      { context: "Colega", desc: "El perfeccionismo ansioso rinde pero desgasta. Normalizar el error reduce la presión." },
    ],
    care: [
      "Respiración lenta y exposición gradual, no evitación.",
      "Reducir cafeína y mejorar el sueño bajan la activación.",
      "La TCC tiene gran evidencia para la ansiedad.",
    ],
  },
  {
    id: "toc",
    title: "Trastorno Obsesivo-Compulsivo",
    short: "TOC",
    summary:
      "Obsesiones (pensamientos intrusivos que generan angustia) y compulsiones (rituales para aliviarla) que consumen tiempo y libertad.",
    clinicalLevel: "intermedio",
    tags: ["obsesiones", "compulsiones", "ansiedad", "rituales"],
    sections: [
      { id: "definicion", title: "Qué es", content: "No es ser ordenado o meticuloso. Es un ciclo agotador: un pensamiento intrusivo (contaminación, daño, duda) dispara angustia, y un ritual (lavado, comprobación, repetición mental) la calma un momento... y la refuerza para la próxima vez." },
    ],
    dynamics: [
      { context: "Pareja", desc: "La familia puede quedar 'acomodando' los rituales sin querer. Dejar de acomodarlos, con apoyo terapéutico, ayuda a romper el ciclo." },
    ],
    care: [
      "No discutas con la obsesión: trabaja la respuesta al malestar.",
      "La EPR (exposición con prevención de respuesta) es el tratamiento de elección.",
      "Evita dar reaseguros infinitos.",
    ],
  },
  {
    id: "evitativo",
    title: "Trastorno Evitativo de la Personalidad",
    short: "TEvP",
    summary:
      "Inhibición social, sentimientos de inadecuación e hipersensibilidad a la evaluación negativa que llevan a evitar el contacto pese al deseo de vínculo.",
    clinicalLevel: "intermedio",
    cluster: "Cluster C",
    tags: ["personalidad", "vergüenza", "apego", "vínculos"],
    sections: [
      { id: "definicion", title: "Qué es", content: "Quieren cercanía pero la evitan por miedo al rechazo y a la humillación. No es desinterés: es protección. Se diferencia de la fobia social por ser un patrón más profundo y estable de autoimagen de inadecuación." },
    ],
    dynamics: [
      { context: "Pareja", desc: "Necesitan garantías de aceptación incondicional antes de abrirse. La presión los aleja; la paciencia los acerca." },
    ],
    care: [
      "Avances pequeños y seguros en exposición social.",
      "Reforzar lo que sí hacen, sin sobreproteger.",
    ],
  },
  {
    id: "dependiente",
    title: "Trastorno de la Personalidad por Dependencia",
    short: "TPD",
    summary:
      "Necesidad excesiva de ser cuidado que lleva a sumisión, miedo a la separación y dificultad para tomar decisiones por cuenta propia.",
    clinicalLevel: "intermedio",
    cluster: "Cluster C",
    tags: ["personalidad", "apego", "autonomía", "vínculos"],
    sections: [
      { id: "definicion", title: "Qué es", content: "El temor a quedarse solo lleva a ceder, complacer y delegar decisiones vitales en otros. Puede confundirse con amor entregado, pero el eje es el miedo, no el cuidado libre." },
    ],
    dynamics: [
      { context: "Pareja", desc: "Riesgo de relaciones desequilibradas o de quedar atrapado en vínculos dañinos por miedo a la soledad. Recuperar autonomía gradual es el camino." },
    ],
    care: [
      "Fomentar pequeñas decisiones propias cada día.",
      "No castigar la dependencia: acompañar la autonomía.",
    ],
  },
  {
    id: "espectro-autista",
    title: "Espectro Autista (TEA)",
    short: "TEA",
    summary:
      "Una forma distinta de procesar lo social y lo sensorial. No es un trastorno relacional por daño: es neurodivergencia, con necesidades y fortalezas propias.",
    clinicalLevel: "intermedio",
    tags: ["neurodivergencia", "sensorial", "comunicación", "vínculos"],
    sections: [
      { id: "definicion", title: "Qué es", content: "Implica diferencias en comunicación social, intereses intensos, necesidad de previsibilidad y sensibilidad sensorial. Lo incluimos para deshacer un mito frecuente: el autismo no es manipulación ni falta de empatía, es otra forma de estar en el mundo." },
    ],
    dynamics: [
      { context: "Pareja", desc: "La literalidad y la honestidad pueden malinterpretarse como frialdad. La comunicación explícita y clara evita malentendidos." },
      { context: "Colega", desc: "Foco profundo y rigor; necesita instrucciones claras y entornos sensorialmente amables." },
    ],
    care: [
      "Comunicación directa, concreta y sin dobles sentidos.",
      "Respetar necesidades sensoriales y de previsibilidad.",
      "No patologizar lo que solo es diferencia.",
    ],
  },
];

// ── Dudas frecuentes, separadas por bloques temáticos ───────
export const DUDAS: DudaCategory[] = [
  {
    id: "es-normal",
    category: "¿Es normal que…?",
    icon: "💭",
    intro: "Las preguntas que mucha gente piensa en voz baja y casi nadie se atreve a decir.",
    questions: [
      { q: "¿Es normal sentir que camino sobre cáscaras de huevo?", a: "Sentir que mides cada palabra para no provocar una reacción es una señal de que la relación te tiene en alerta constante. Es muy común, y no es lo que debería sentirse un vínculo seguro." },
      { q: "¿Es normal que un día sea idealizado y al siguiente, despreciado?", a: "El cambio brusco entre 'eres todo' y 'no vales nada' (idealización-devaluación) es agotador y desorientador. Ocurre en algunas dinámicas, pero no es la base de un amor estable." },
      { q: "¿Es normal dudar de mi propia memoria de lo que pasó?", a: "Si sales de las conversaciones confundido sobre qué ocurrió realmente, podrías estar viviendo gaslighting. Apuntar los hechos cuando estás en calma ayuda a recuperar tu criterio." },
      { q: "¿Es normal querer a alguien y a la vez sentir que me vacía?", a: "El amor y el agotamiento pueden coexistir. Que quieras a alguien no significa que la dinámica sea sana. Ambas cosas pueden ser verdad al mismo tiempo." },
      { q: "¿Es normal sentirme responsable de su estabilidad emocional?", a: "Sentir que eres el termostato emocional de otra persona es una carga insostenible. Acompañar no es ser responsable de regular a alguien las 24 horas." },
    ],
  },
  {
    id: "limites",
    category: "Límites y culpa",
    icon: "🛡️",
    intro: "Poner límites no es abandonar. Es la condición para que un vínculo sea sostenible.",
    questions: [
      { q: "Si pongo un límite, ¿lo estoy abandonando?", a: "No. Un límite dice 'esto es lo que puedo dar para seguir aquí'. Abandonar es irse; poner límites es, muchas veces, lo que permite quedarse sin destruirse." },
      { q: "¿Por qué me siento culpable al cuidar de mí?", a: "Si creciste cuidando a otros, tu sistema interpreta el autocuidado como egoísmo. No lo es. Cuidarte es lo que te permite seguir cuidando sin vaciarte." },
      { q: "¿Está mal necesitar tiempo a solas?", a: "Necesitar espacio es humano y sano. Un vínculo seguro tolera la distancia sin vivirla como amenaza." },
      { q: "¿Cómo pongo un límite sin herir a alguien frágil?", a: "Valida primero, luego limita: 'Sé que esto te duele y me importas; aun así, no puedo seguir esta conversación ahora'. Firmeza y ternura a la vez." },
    ],
  },
  {
    id: "soy-yo",
    category: "¿Y si soy yo?",
    icon: "🪞",
    intro: "Mirarse con honestidad no es culparse. Es el primer paso para cambiar.",
    questions: [
      { q: "¿Y si la persona con el problema soy yo?", a: "Hacerse esta pregunta ya habla de capacidad de autoobservación, algo que rara vez aparece en quien daña sin registro. Buscar evaluación profesional es un acto de responsabilidad, no de culpa." },
      { q: "¿Tener rasgos de un trastorno significa tenerlo?", a: "No. Todas las personas tenemos algo de cada rasgo en distintos niveles. Un trastorno es un patrón rígido, persistente y que genera sufrimiento o disfunción. El nivel lo determina un profesional." },
      { q: "¿Puedo cambiar si reconozco mis patrones?", a: "Sí. El reconocimiento es la puerta. Con acompañamiento, los patrones aprendidos se pueden reescribir. La biología predispone, no condena." },
    ],
  },
  {
    id: "diferencias",
    category: "Diferencias entre trastornos",
    icon: "🧭",
    intro: "Personalidad no es lo mismo que trastorno, y cada cuadro tiene su propia lógica.",
    questions: [
      { q: "¿En qué se diferencia el TLP del trastorno bipolar?", a: "En el tiempo y el disparador. En el TLP el ánimo cambia en horas, casi siempre por algo relacional. En el bipolar los episodios duran días o semanas y son más independientes del contexto." },
      { q: "¿Personalidad y trastorno de personalidad son lo mismo?", a: "No. La personalidad es tu forma estable de ser. Se vuelve 'trastorno' solo cuando un patrón es rígido, generalizado y causa sufrimiento o problemas serios de funcionamiento." },
      { q: "¿El TDAH se confunde con el TLP?", a: "Comparten impulsividad y reactividad emocional, pero el TDAH no tiene como eje el miedo al abandono ni la inestabilidad de identidad. A veces coexisten." },
      { q: "¿Todo el que es egoísta es narcisista?", a: "No. El narcisismo como trastorno es un patrón rígido y generalizado de grandiosidad y falta de empatía, no un mal día o un rasgo aislado." },
    ],
  },
  {
    id: "manipulacion",
    category: "Manipulación y dinámicas dañinas",
    icon: "⚠️",
    intro: "Reconocer una táctica no es etiquetar para odiar: es recuperar tu criterio.",
    questions: [
      { q: "¿Qué es el love bombing?", a: "Una avalancha de atención, regalos y promesas al inicio que crea dependencia rápida. Lo sano se construye con tiempo; lo que va demasiado rápido conviene observarlo con calma." },
      { q: "¿Qué es el hoovering?", a: "El intento de 'reabsorberte' justo cuando intentas alejarte: mensajes de cambio, promesas, crisis repentinas. Anticiparlo te ayuda a no recaer en automático." },
      { q: "¿Qué es DARVO?", a: "Negar, atacar e invertir víctima y agresor. El que daña se presenta como la verdadera víctima. Reconocer el patrón evita que cargues una culpa que no es tuya." },
      { q: "¿La intensidad es lo mismo que el amor?", a: "No necesariamente. La intensidad activa el cuerpo, pero la seguridad lo calma. Un vínculo sano puede ser intenso y, a la vez, tranquilo." },
    ],
  },
  {
    id: "ayuda",
    category: "Pedir ayuda y soltar",
    icon: "🌱",
    intro: "Cuándo acompañar, cuándo poner distancia y cómo cuidarte en el proceso.",
    questions: [
      { q: "¿Cuándo acompañar y cuándo alejarme?", a: "Acompaña cuando hay reconocimiento, cuidado mutuo y cambios reales. Plantéate distancia cuando la relación te anula, te aísla o te hace sentir inseguro de forma sostenida." },
      { q: "¿Soltar es una traición?", a: "No. Si una relación te vacía, poner distancia es un acto de cuidado, no de abandono. Puedes querer a alguien y aun así no poder quedarte." },
      { q: "¿Cómo sé si necesito ayuda profesional?", a: "Si el malestar interfiere con tu vida diaria, tus relaciones o tu salud, es momento de buscar apoyo. Pedir ayuda es estrategia, no debilidad." },
      { q: "¿Y si la otra persona no quiere ayuda?", a: "No puedes obligar a nadie a tratarse. Sí puedes decidir cómo te cuidas tú, qué límites pones y qué apoyo buscas para ti." },
    ],
  },
];

export const CLINICAL_LEVELS: Record<DisorderEntry["clinicalLevel"], string> = {
  básico: "Lectura accesible",
  intermedio: "Profundidad media",
  clínico: "Detalle clínico",
};

export const WIKI_DISCLAIMER =
  "Esta enciclopedia es educativa y no sustituye una evaluación clínica. Nadie debe diagnosticarse a sí mismo ni a otros: solo profesionales con experiencia diagnostican. Si estás en crisis, contacta con líneas de apoyo o servicios de emergencia.";