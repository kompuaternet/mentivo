import { QUESTIONS } from '@/data/questions'
import { PROFESSIONS } from '@/data/professions'
import type {
  ScoreDimensions, UserProfile, ProfessionMatch,
  ThinkingStyleInfo, CharacterTypeInfo, LeadershipInfo,
  WorkStyleType, CareerArchetype, EducationRecommendation,
  EducationDirection, LocaleText,
} from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const zero = (): ScoreDimensions => ({
  R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
  L: 0, analytical: 0, creative: 0, strategic: 0, empathetic: 0,
  solo: 0, team: 0, structure: 0, pace: 0,
})

function normalize(scores: ScoreDimensions): ScoreDimensions {
  const riasecMax = Math.max(scores.R, scores.I, scores.A, scores.S, scores.E, scores.C, 1)
  const factor = 10 / riasecMax
  return {
    R: Math.min(10, scores.R * factor),
    I: Math.min(10, scores.I * factor),
    A: Math.min(10, scores.A * factor),
    S: Math.min(10, scores.S * factor),
    E: Math.min(10, scores.E * factor),
    C: Math.min(10, scores.C * factor),
    L: Math.min(20, scores.L),
    analytical: scores.analytical,
    creative:   scores.creative,
    strategic:  scores.strategic,
    empathetic: scores.empathetic,
    solo: scores.solo,
    team: scores.team,
    structure: scores.structure,
    pace: scores.pace,
  }
}

// Cosine similarity between two RIASEC vectors
function riasecSimilarity(
  user: ScoreDimensions,
  prof: { R: number; I: number; A: number; S: number; E: number; C: number }
): number {
  const u = [user.R, user.I, user.A, user.S, user.E, user.C]
  const p = [prof.R, prof.I, prof.A, prof.S, prof.E, prof.C]

  const dot = u.reduce((sum, val, i) => sum + val * p[i], 0)
  const magU = Math.sqrt(u.reduce((sum, val) => sum + val * val, 0))
  const magP = Math.sqrt(p.reduce((sum, val) => sum + val * val, 0))

  if (magU === 0 || magP === 0) return 0
  return dot / (magU * magP) // 0-1
}

// ─── Core calculation ─────────────────────────────────────────────────────────

export function calculateProfile(answers: Record<number, string>): UserProfile {
  const raw = zero()

  // Accumulate scores from all answers
  for (const [qIdStr, optId] of Object.entries(answers)) {
    const qId = parseInt(qIdStr, 10)
    const question = QUESTIONS.find(q => q.id === qId)
    if (!question) continue
    const option = question.options.find(o => o.id === optId)
    if (!option) continue

    for (const [key, value] of Object.entries(option.scores) as [keyof ScoreDimensions, number][]) {
      raw[key] += value
    }
  }

  const scores = normalize(raw)

  // ── Thinking style ──────────────────────────────────────────────
  const thinkingStyle = buildThinkingStyle(raw)

  // ── Character type (introvert / extrovert / ambivert) ──────────
  const characterType = buildCharacterType(raw)

  // ── Leadership level (1-5) ──────────────────────────────────────
  const leadershipLevel = buildLeadershipLevel(raw)

  // ── Work style ─────────────────────────────────────────────────
  const workStyle: WorkStyleType = raw.solo > raw.team + 2
    ? 'solo'
    : raw.team > raw.solo + 2
      ? 'team'
      : 'mixed'

  // ── Career pace ─────────────────────────────────────────────────
  const careerPace = raw.pace > 6 ? 'fast' : raw.structure > 6 ? 'deep' : 'steady'

  // ── Top-7 professions ──────────────────────────────────────────
  const topProfessions = matchProfessions(scores, raw.L)

  // ── Strengths & growth zones ───────────────────────────────────
  const { strengths, growthZones } = buildStrengthsAndGrowth(scores, raw)

  // ── Career archetype ───────────────────────────────────────────
  const archetype = buildArchetype(scores, raw)

  // ── Education recommendation ───────────────────────────────────
  const education = buildEducation(topProfessions, scores)

  return {
    scores,
    thinkingStyle,
    characterType,
    leadershipLevel,
    workStyle,
    careerPace,
    topProfessions,
    strengths,
    growthZones,
    archetype,
    education,
  }
}

// ─── Sub-builders ─────────────────────────────────────────────────────────────

function buildThinkingStyle(raw: ScoreDimensions): ThinkingStyleInfo {
  const candidates = [
    { key: 'analytical' as const, score: raw.analytical },
    { key: 'creative' as const,   score: raw.creative },
    { key: 'strategic' as const,  score: raw.strategic },
    { key: 'empathetic' as const, score: raw.empathetic },
  ]
  const top = candidates.sort((a, b) => b.score - a.score)[0].key

  const map: Record<string, ThinkingStyleInfo> = {
    analytical: {
      key: 'analytical',
      emoji: '🔬',
      name: { ru: 'Аналитик', en: 'Analyst', uk: 'Аналітик', de: 'Analytiker/in', es: 'Analítico/a', tr: 'Analist' },
      description: {
        ru: 'Мыслишь системно, видишь закономерности там где другие видят хаос. Тебе нужно понять как всё работает — до конца.',
        en: 'Think systematically, see patterns where others see chaos. You need to understand how everything works — completely.',
        uk: 'Мислиш системно, бачиш закономірності там де інші бачать хаос. Тобі потрібно зрозуміти як все працює — до кінця.',
        de: 'Denkst systematisch, siehst Muster, wo andere Chaos sehen. Du musst verstehen, wie alles funktioniert — vollständig.',
        es: 'Piensas sistemáticamente, ves patrones donde otros ven caos. Necesitas entender cómo funciona todo, completamente.',
        tr: 'Sistematik düşünürsün, başkalarının kaos gördüğü yerde örüntüler görürsün. Her şeyin nasıl çalıştığını tamamen anlamanız gerekir.',
      },
    },
    creative: {
      key: 'creative',
      emoji: '🎨',
      name: { ru: 'Творец', en: 'Creator', uk: 'Творець', de: 'Kreativer/Kreative', es: 'Creativo/a', tr: 'Yaratıcı' },
      description: {
        ru: 'Мыслишь образами и ассоциациями. Создаёшь нечто уникальное и своё. Стандартные решения тебя скучают.',
        en: 'Think in images and associations. Create something unique and your own. Standard solutions bore you.',
        uk: 'Мислиш образами та асоціаціями. Створюєш щось унікальне і своє. Стандартні рішення тебе нудять.',
        de: 'Denkst in Bildern und Assoziationen. Erschaffst etwas Einzigartiges und Eigenes. Standardlösungen langweilen dich.',
        es: 'Piensas en imágenes y asociaciones. Creas algo único y propio. Las soluciones estándar te aburren.',
        tr: 'Görüntüler ve çağrışımlar içinde düşünürsün. Benzersiz ve kendine özgü bir şey yaratırsın. Standart çözümler seni sıkar.',
      },
    },
    strategic: {
      key: 'strategic',
      emoji: '♟️',
      name: { ru: 'Стратег', en: 'Strategist', uk: 'Стратег', de: 'Stratege/Strategin', es: 'Estratega', tr: 'Stratejist' },
      description: {
        ru: 'Видишь большую картину. Думаешь на несколько ходов вперёд и строишь системы которые работают без тебя.',
        en: 'See the big picture. Think several moves ahead and build systems that work without you.',
        uk: 'Бачиш велику картину. Думаєш на кілька кроків вперед та будуєш системи які працюють без тебе.',
        de: 'Siehst das Gesamtbild. Denkst mehrere Schritte voraus und baust Systeme auf, die ohne dich funktionieren.',
        es: 'Ves el panorama general. Piensas varios pasos adelante y construyes sistemas que funcionan sin ti.',
        tr: 'Büyük resmi görürsün. Birkaç adım ilerisini düşünür ve sensiz çalışan sistemler inşa edersin.',
      },
    },
    empathetic: {
      key: 'empathetic',
      emoji: '💙',
      name: { ru: 'Эмпат', en: 'Empath', uk: 'Емпат', de: 'Einfühlsamer/Einfühlsame', es: 'Empático/a', tr: 'Empatik' },
      description: {
        ru: 'Чувствуешь людей. Понимаешь мотивы и эмоции. Это твой главный инструмент для решения любых задач.',
        en: 'Feel people. Understand motives and emotions. This is your main tool for solving any problems.',
        uk: 'Відчуваєш людей. Розумієш мотиви та емоції. Це твій головний інструмент для вирішення будь-яких завдань.',
        de: 'Fühlst Menschen. Verstehst Motive und Emotionen. Das ist dein Hauptwerkzeug zur Lösung aller Probleme.',
        es: 'Sientes a las personas. Entiendes motivos y emociones. Esta es tu principal herramienta para resolver cualquier problema.',
        tr: 'İnsanları hissedersin. Motivasyonları ve duyguları anlarsın. Bu, herhangi bir sorunu çözmek için ana araçındır.',
      },
    },
  }
  return map[top]
}

function buildCharacterType(raw: ScoreDimensions): CharacterTypeInfo {
  const introScore = raw.solo + raw.I * 0.3
  const extroScore = raw.team + raw.E * 0.3 + raw.S * 0.2

  const diff = extroScore - introScore

  const key = diff > 4 ? 'extrovert' : diff < -4 ? 'introvert' : 'ambivert'

  const map: Record<string, CharacterTypeInfo> = {
    introvert: {
      key: 'introvert',
      emoji: '🌙',
      name: { ru: 'Интроверт', en: 'Introvert', uk: 'Інтроверт', de: 'Introvertiert', es: 'Introvertido/a', tr: 'İçe dönük' },
      description: {
        ru: 'Восстанавливаешься в одиночестве, думаешь глубоко. Работаешь лучше в тишине без лишних отвлечений.',
        en: 'Recharge alone, think deeply. Work best in quiet without unnecessary distractions.',
        uk: 'Відновлюєшся наодинці, думаєш глибоко. Працюєш краще в тиші без зайвих відволікань.',
        de: 'Tankst allein auf, denkst tief. Arbeitest am besten in Stille ohne unnötige Ablenkungen.',
        es: 'Te recargas solo/a, piensas profundamente. Trabajas mejor en silencio sin distracciones innecesarias.',
        tr: 'Yalnız iken enerji toplarsın, derin düşünürsün. Gereksiz dikkat dağıtıcılar olmadan sessizlikte en iyi çalışırsın.',
      },
    },
    extrovert: {
      key: 'extrovert',
      emoji: '☀️',
      name: { ru: 'Экстраверт', en: 'Extrovert', uk: 'Екстраверт', de: 'Extravertiert', es: 'Extrovertido/a', tr: 'Dışa dönük' },
      description: {
        ru: 'Заряжаешься от общения. Думаешь вслух, идеи рождаются в диалоге. Команда — твоя суперсила.',
        en: 'Get energy from communication. Think out loud, ideas are born in dialogue. Team is your superpower.',
        uk: 'Заряджаєшся від спілкування. Думаєш вголос, ідеї народжуються в діалозі. Команда — твоя суперсила.',
        de: 'Tankst durch Kommunikation auf. Denkst laut, Ideen entstehen im Dialog. Das Team ist deine Superkraft.',
        es: 'Te energizas con la comunicación. Piensas en voz alta, las ideas nacen en el diálogo. El equipo es tu superpoder.',
        tr: 'İletişimden enerji alırsın. Yüksek sesle düşünürsün, fikirler diyalogda doğar. Ekip süper gücündür.',
      },
    },
    ambivert: {
      key: 'ambivert',
      emoji: '⚖️',
      name: { ru: 'Амбиверт', en: 'Ambivert', uk: 'Амбіверт', de: 'Ambivertiert', es: 'Ambivertido/a', tr: 'Ambivert' },
      description: {
        ru: 'Комфортно и в команде и в одиночестве. Умеешь переключаться. Это редкое и ценное качество.',
        en: 'Comfortable both in a team and alone. Able to switch between modes. This is a rare and valuable quality.',
        uk: 'Комфортно і в команді і на самоті. Вмієш перемикатися. Це рідкісна і цінна якість.',
        de: 'Wohl sowohl im Team als auch allein. Kannst zwischen Modi wechseln. Das ist eine seltene und wertvolle Eigenschaft.',
        es: 'Cómodo/a tanto en equipo como solo/a. Capaz de cambiar entre modos. Es una cualidad rara y valiosa.',
        tr: 'Hem takımda hem de yalnız rahat hissedersin. Modlar arasında geçiş yapabilirsin. Bu nadir ve değerli bir özelliktir.',
      },
    },
  }
  return map[key]
}

function buildLeadershipLevel(raw: ScoreDimensions): LeadershipInfo {
  const l = raw.L
  const level = l <= 3 ? 1 : l <= 6 ? 2 : l <= 10 ? 3 : l <= 14 ? 4 : 5

  const map: Record<number, LeadershipInfo> = {
    1: {
      level: 1,
      emoji: '🌱',
      name: { ru: 'Исполнитель', en: 'Executor', uk: 'Виконавець', de: 'Ausführer/in', es: 'Ejecutor/a', tr: 'Yürütücü' },
      description: {
        ru: 'Работаешь лучше всего как часть структуры. Сфокусирован(а) на качественном выполнении задач.',
        en: 'Work best as part of a structure. Focused on quality task execution.',
        uk: 'Працюєш найкраще як частина структури. Сфокусований(а) на якісному виконанні завдань.',
        de: 'Arbeitest am besten als Teil einer Struktur. Fokussiert auf qualitativ hochwertige Aufgabenerfüllung.',
        es: 'Trabajas mejor como parte de una estructura. Enfocado/a en la ejecución de tareas con calidad.',
        tr: 'Bir yapının parçası olarak en iyi çalışırsın. Kaliteli görev yürütmeye odaklanmışsın.',
      },
    },
    2: {
      level: 2,
      emoji: '⭐',
      name: { ru: 'Специалист', en: 'Specialist', uk: 'Спеціаліст', de: 'Spezialist/in', es: 'Especialista', tr: 'Uzman' },
      description: {
        ru: 'Твоя экспертиза — твоя власть. Люди слушают тебя за знания, а не за должность.',
        en: 'Your expertise is your power. People listen to you for your knowledge, not your position.',
        uk: 'Твоя експертиза — твоя влада. Люди слухають тебе за знання, а не за посаду.',
        de: 'Deine Expertise ist deine Macht. Menschen hören dir wegen deines Wissens zu, nicht wegen deiner Position.',
        es: 'Tu experiencia es tu poder. Las personas te escuchan por tu conocimiento, no por tu posición.',
        tr: 'Uzmanlığın gücündür. İnsanlar seni konumun için değil bilgin için dinler.',
      },
    },
    3: {
      level: 3,
      emoji: '🎯',
      name: { ru: 'Лидер команды', en: 'Team Lead', uk: 'Лідер команди', de: 'Teamleiter/in', es: 'Líder de Equipo', tr: 'Takım Lideri' },
      description: {
        ru: 'Можешь вести небольшую команду к результату. Совмещаешь экспертизу и управление.',
        en: 'Can lead a small team to results. Combine expertise and management.',
        uk: 'Можеш вести невелику команду до результату. Поєднуєш експертизу та управління.',
        de: 'Kannst ein kleines Team zum Ergebnis führen. Kombinierst Expertise und Management.',
        es: 'Puedes llevar un pequeño equipo al resultado. Combinas experiencia y gestión.',
        tr: 'Küçük bir ekibi sonuçlara götürebilirsin. Uzmanlık ve yönetimi birleştirirsin.',
      },
    },
    4: {
      level: 4,
      emoji: '👑',
      name: { ru: 'Менеджер / Руководитель', en: 'Manager / Director', uk: 'Менеджер / Керівник', de: 'Manager/in / Direktor/in', es: 'Gerente / Director/a', tr: 'Yönetici / Direktör' },
      description: {
        ru: 'Ведёшь большие команды или проекты. Думаешь стратегически, но не теряешь контакт с деталями.',
        en: 'Lead large teams or projects. Think strategically while not losing touch with details.',
        uk: 'Ведеш великі команди або проєкти. Думаєш стратегічно, але не втрачаєш контакт з деталями.',
        de: 'Führst große Teams oder Projekte. Denkst strategisch, verlierst aber den Kontakt zu Details nicht.',
        es: 'Lideras grandes equipos o proyectos. Piensas estratégicamente sin perder contacto con los detalles.',
        tr: 'Büyük takımları veya projeleri yönetirsin. Stratejik düşünürken detaylarla temas kaybetmezsin.',
      },
    },
    5: {
      level: 5,
      emoji: '🚀',
      name: { ru: 'Визионер / Предприниматель', en: 'Visionary / Entrepreneur', uk: 'Візіонер / Підприємець', de: 'Visionär/in / Unternehmer/in', es: 'Visionario/a / Emprendedor/a', tr: 'Vizyoner / Girişimci' },
      description: {
        ru: 'Создаёшь новые структуры с нуля. Ведёшь за собой не силой должности, а силой идеи.',
        en: 'Create new structures from scratch. Lead not by power of position, but by power of idea.',
        uk: 'Створюєш нові структури з нуля. Ведеш за собою не силою посади, а силою ідеї.',
        de: 'Erschaffst neue Strukturen von Grund auf. Führst nicht durch Positionsmacht, sondern durch die Kraft der Idee.',
        es: 'Creas nuevas estructuras desde cero. Lideras no por el poder del cargo, sino por el poder de la idea.',
        tr: 'Sıfırdan yeni yapılar yaratırsın. Konum gücüyle değil, fikrin gücüyle liderlik edersin.',
      },
    },
  }
  return map[level as 1 | 2 | 3 | 4 | 5]
}

function matchProfessions(scores: ScoreDimensions, rawL: number): ProfessionMatch[] {
  return PROFESSIONS
    .filter(p => rawL >= p.minLeadership || true) // include all, just score them
    .map(p => {
      const sim = riasecSimilarity(scores, p.riasec)
      // Slight penalty if leadership is too low for a role
      const leadershipPenalty = rawL < p.minLeadership ? 0.85 : 1
      const matchPercent = Math.round(sim * 100 * leadershipPenalty)
      return { profession: p, matchPercent: Math.min(99, matchPercent) }
    })
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 7)
}

function buildStrengthsAndGrowth(
  scores: ScoreDimensions,
  raw: ScoreDimensions
): { strengths: LocaleText[]; growthZones: LocaleText[] } {

  const allStrengths: Array<{ condition: boolean; text: LocaleText }> = [
    {
      condition: raw.analytical > 6,
      text: { ru: 'Системное мышление', en: 'Systems thinking', uk: 'Системне мислення', de: 'Systemdenken', es: 'Pensamiento sistémico', tr: 'Sistemik düşünme' },
    },
    {
      condition: raw.creative > 6,
      text: { ru: 'Нестандартное мышление', en: 'Out-of-the-box thinking', uk: 'Нестандартне мислення', de: 'Unkonventionelles Denken', es: 'Pensamiento innovador', tr: 'Alışılmışın dışında düşünme' },
    },
    {
      condition: raw.strategic > 6,
      text: { ru: 'Стратегическое видение', en: 'Strategic vision', uk: 'Стратегічне бачення', de: 'Strategische Vision', es: 'Visión estratégica', tr: 'Stratejik vizyon' },
    },
    {
      condition: raw.empathetic > 6,
      text: { ru: 'Глубокая эмпатия', en: 'Deep empathy', uk: 'Глибока емпатія', de: 'Tiefe Empathie', es: 'Empatía profunda', tr: 'Derin empati' },
    },
    {
      condition: scores.I > 7,
      text: { ru: 'Любопытство и желание разобраться', en: 'Curiosity and drive to understand', uk: 'Допитливість та бажання розібратися', de: 'Neugier und Wille zu verstehen', es: 'Curiosidad y deseo de comprender', tr: 'Merak ve anlama isteği' },
    },
    {
      condition: scores.A > 7,
      text: { ru: 'Чувство прекрасного и вкус', en: 'Sense of beauty and taste', uk: 'Почуття прекрасного та смак', de: 'Sinn für Schönheit und Geschmack', es: 'Sentido de la belleza y el gusto', tr: 'Güzellik duygusu ve zevk' },
    },
    {
      condition: scores.S > 7,
      text: { ru: 'Умение слышать людей', en: 'Ability to listen to people', uk: 'Вміння чути людей', de: 'Fähigkeit, Menschen zuzuhören', es: 'Capacidad de escuchar a las personas', tr: 'İnsanları dinleme yeteneği' },
    },
    {
      condition: scores.E > 7,
      text: { ru: 'Инициативность и предпринимательский дух', en: 'Initiative and entrepreneurial spirit', uk: 'Ініціативність та підприємницький дух', de: 'Initiative und unternehmerischer Geist', es: 'Iniciativa y espíritu emprendedor', tr: 'Girişimcilik ruhu ve inisiyatif' },
    },
    {
      condition: scores.C > 7,
      text: { ru: 'Внимание к деталям и точность', en: 'Attention to detail and precision', uk: 'Увага до деталей та точність', de: 'Detailgenauigkeit und Präzision', es: 'Atención al detalle y precisión', tr: 'Detaylara dikkat ve hassasiyet' },
    },
    {
      condition: scores.R > 7,
      text: { ru: 'Практичность и ориентация на результат', en: 'Practicality and results orientation', uk: 'Практичність та орієнтація на результат', de: 'Pragmatismus und Ergebnisorientierung', es: 'Practicidad y orientación a resultados', tr: 'Pratiklik ve sonuç odaklılık' },
    },
    {
      condition: raw.L > 10,
      text: { ru: 'Природная склонность к лидерству', en: 'Natural leadership tendency', uk: 'Природна схильність до лідерства', de: 'Natürliche Führungsneigung', es: 'Tendencia natural al liderazgo', tr: 'Doğal liderlik eğilimi' },
    },
    {
      condition: raw.structure > 6,
      text: { ru: 'Организованность и умение планировать', en: 'Organisation and planning skills', uk: 'Організованість та вміння планувати', de: 'Organisationsfähigkeit und Planungsgeschick', es: 'Organización y capacidad de planificación', tr: 'Organize olma ve planlama becerileri' },
    },
  ]

  const strengths = allStrengths.filter(s => s.condition).map(s => s.text).slice(0, 5)

  // Growth zones — opposite of strengths (where scores are low)
  const allGrowth: Array<{ condition: boolean; text: LocaleText }> = [
    {
      condition: raw.empathetic < 3 && scores.I > 6,
      text: { ru: 'Работа с эмоциями и межличностное общение', en: 'Working with emotions and interpersonal communication', uk: 'Робота з емоціями та міжособистісне спілкування', de: 'Emotionsarbeit und zwischenmenschliche Kommunikation', es: 'Trabajo con emociones y comunicación interpersonal', tr: 'Duygularla çalışma ve kişilerarası iletişim' },
    },
    {
      condition: raw.creative < 3 && scores.C > 6,
      text: { ru: 'Гибкость мышления и творческий подход', en: 'Flexibility of thinking and creative approach', uk: 'Гнучкість мислення та творчий підхід', de: 'Gedankenflexibilität und kreativer Ansatz', es: 'Flexibilidad de pensamiento y enfoque creativo', tr: 'Düşünce esnekliği ve yaratıcı yaklaşım' },
    },
    {
      condition: raw.strategic < 3,
      text: { ru: 'Долгосрочное планирование', en: 'Long-term planning', uk: 'Довгострокове планування', de: 'Langfristige Planung', es: 'Planificación a largo plazo', tr: 'Uzun vadeli planlama' },
    },
    {
      condition: raw.L < 5,
      text: { ru: 'Уверенность и навыки публичного выступления', en: 'Confidence and public speaking skills', uk: 'Впевненість та навички публічного виступу', de: 'Selbstvertrauen und Redefähigkeiten', es: 'Confianza y habilidades de oratoria', tr: 'Güven ve konuşma becerileri' },
    },
    {
      condition: raw.structure < 3,
      text: { ru: 'Организация времени и задач', en: 'Time and task organisation', uk: 'Організація часу та завдань', de: 'Zeit- und Aufgabenorganisation', es: 'Organización del tiempo y las tareas', tr: 'Zaman ve görev organizasyonu' },
    },
  ]

  const growthZones = allGrowth.filter(g => g.condition).map(g => g.text).slice(0, 3)

  return { strengths, growthZones }
}

function buildArchetype(scores: ScoreDimensions, raw: ScoreDimensions): CareerArchetype {
  // Determine dominant profile
  const dominantRIASEC = (['R', 'I', 'A', 'S', 'E', 'C'] as const)
    .reduce((best, key) => scores[key] > scores[best] ? key : best, 'R' as 'R' | 'I' | 'A' | 'S' | 'E' | 'C')

  const archetypes: Record<string, CareerArchetype> = {
    I: {
      key: 'researcher',
      emoji: '🔭',
      name: { ru: 'Исследователь', en: 'The Researcher', uk: 'Дослідник', de: 'Der/Die Forscher/in', es: 'El/La Investigador/a', tr: 'Araştırmacı' },
      description: {
        ru: 'Твоя миссия — понять мир глубже чем кто-либо. Ты превращаешь сложное в ясное.',
        en: 'Your mission is to understand the world deeper than anyone. You turn complexity into clarity.',
        uk: 'Твоя місія — зрозуміти світ глибше ніж хтось інший. Ти перетворюєш складне на ясне.',
        de: 'Deine Mission ist es, die Welt tiefer zu verstehen als irgendjemand. Du machst Komplexes klar.',
        es: 'Tu misión es entender el mundo más profundamente que nadie. Conviertes lo complejo en claro.',
        tr: 'Misyonun dünyayı herkesten daha derin anlamak. Karmaşık olanı netliğe dönüştürürsün.',
      },
    },
    A: {
      key: 'creator',
      emoji: '🎭',
      name: { ru: 'Создатель', en: 'The Creator', uk: 'Творець', de: 'Der/Die Schöpfer/in', es: 'El/La Creador/a', tr: 'Yaratıcı' },
      description: {
        ru: 'Твоя миссия — добавить в мир что-то чего ещё не было. Ты видишь то что другие только почувствуют потом.',
        en: 'Your mission is to add something to the world that didn\'t exist yet. You see what others will only feel later.',
        uk: 'Твоя місія — додати у світ щось чого ще не було. Ти бачиш те що інші тільки відчують потім.',
        de: 'Deine Mission ist es, der Welt etwas hinzuzufügen, das noch nicht existierte. Du siehst, was andere erst später fühlen werden.',
        es: 'Tu misión es añadir al mundo algo que aún no existía. Ves lo que otros solo sentirán después.',
        tr: 'Misyonun dünyaya henüz var olmayan bir şey katmak. Başkalarının sonra hissedeceğini şimdiden görürsün.',
      },
    },
    S: {
      key: 'helper',
      emoji: '🌟',
      name: { ru: 'Вдохновитель', en: 'The Inspirer', uk: 'Натхненник', de: 'Der/Die Inspirator/in', es: 'El/La Inspirador/a', tr: 'İlham Verici' },
      description: {
        ru: 'Твоя миссия — помогать людям становиться лучшей версией себя. Ты меняешь жизни через контакт.',
        en: 'Your mission is to help people become the best version of themselves. You change lives through connection.',
        uk: 'Твоя місія — допомагати людям ставати кращою версією себе. Ти змінюєш життя через контакт.',
        de: 'Deine Mission ist es, Menschen zu helfen, die beste Version ihrer selbst zu werden. Du veränderst Leben durch Kontakt.',
        es: 'Tu misión es ayudar a las personas a convertirse en la mejor versión de sí mismas. Cambias vidas a través del contacto.',
        tr: 'Misyonun insanların en iyi versiyonları olmalarına yardım etmek. Bağlantı yoluyla hayatları değiştirirsin.',
      },
    },
    E: {
      key: 'builder',
      emoji: '⚡',
      name: { ru: 'Строитель империй', en: 'The Empire Builder', uk: 'Будівник імперій', de: 'Der/Die Imperiumserbauer/in', es: 'El/La Constructor/a de Imperios', tr: 'İmparatorluk Kurucusu' },
      description: {
        ru: 'Твоя миссия — строить то чего ещё нет. Превращать идею в компанию, движение, систему.',
        en: 'Your mission is to build what doesn\'t exist yet. Turn an idea into a company, movement, system.',
        uk: 'Твоя місія — будувати те чого ще немає. Перетворювати ідею на компанію, рух, систему.',
        de: 'Deine Mission ist es, das zu bauen, was noch nicht existiert. Eine Idee in ein Unternehmen, eine Bewegung, ein System verwandeln.',
        es: 'Tu misión es construir lo que aún no existe. Convertir una idea en una empresa, movimiento, sistema.',
        tr: 'Misyonun henüz var olmayanı inşa etmek. Bir fikri şirkete, harekete, sisteme dönüştürmek.',
      },
    },
    C: {
      key: 'architect',
      emoji: '🏛️',
      name: { ru: 'Архитектор систем', en: 'The Systems Architect', uk: 'Архітектор систем', de: 'Der/Die Systemarchitekt/in', es: 'El/La Arquitecto/a de Sistemas', tr: 'Sistem Mimarı' },
      description: {
        ru: 'Твоя миссия — создавать порядок из хаоса. Строить структуры которые работают без ошибок.',
        en: 'Your mission is to create order from chaos. Build structures that work without errors.',
        uk: 'Твоя місія — створювати порядок з хаосу. Будувати структури які працюють без помилок.',
        de: 'Deine Mission ist es, aus Chaos Ordnung zu schaffen. Strukturen aufzubauen, die fehlerfrei funktionieren.',
        es: 'Tu misión es crear orden a partir del caos. Construir estructuras que funcionen sin errores.',
        tr: 'Misyonun kaostan düzen yaratmak. Hatasız çalışan yapılar inşa etmek.',
      },
    },
    R: {
      key: 'craftsman',
      emoji: '🔨',
      name: { ru: 'Мастер своего дела', en: 'The Master Craftsman', uk: 'Майстер своєї справи', de: 'Der/Die Meister/in seines Fachs', es: 'El/La Maestro/a Artesano/a', tr: 'Usta' },
      description: {
        ru: 'Твоя миссия — делать реальные вещи лучше чем кто-либо. Качество работы — это твоя подпись.',
        en: 'Your mission is to make real things better than anyone else. Quality of work is your signature.',
        uk: 'Твоя місія — робити реальні речі краще ніж хтось інший. Якість роботи — це твій підпис.',
        de: 'Deine Mission ist es, echte Dinge besser als jeder andere zu machen. Die Qualität der Arbeit ist deine Unterschrift.',
        es: 'Tu misión es hacer cosas reales mejor que nadie. La calidad del trabajo es tu firma.',
        tr: 'Misyonun gerçek şeyleri herkesten daha iyi yapmak. İşin kalitesi imzandır.',
      },
    },
  }

  return archetypes[dominantRIASEC]
}

function buildEducation(
  topProfessions: ProfessionMatch[],
  scores: ScoreDimensions
): EducationRecommendation {
  // Find most common education direction in top-3
  const directionCounts: Record<EducationDirection, number> = {
    technical: 0, humanitarian: 0, medical: 0,
    creative: 0, social: 0, business: 0, natural: 0,
  }
  topProfessions.slice(0, 3).forEach(pm => {
    directionCounts[pm.profession.educationDirection]++
  })
  const direction = (Object.keys(directionCounts) as EducationDirection[])
    .reduce((best, key) => directionCounts[key] > directionCounts[best] ? key : best, 'technical')

  // Use top profession's specialties as reference
  const topProf = topProfessions[0]?.profession

  const directionNames: Record<EducationDirection, LocaleText> = {
    technical:   { ru: 'Технические науки',   en: 'Technical Sciences',   uk: 'Технічні науки',   de: 'Technische Wissenschaften',  es: 'Ciencias Técnicas',         tr: 'Teknik Bilimler' },
    humanitarian:{ ru: 'Гуманитарные науки',  en: 'Humanities',           uk: 'Гуманітарні науки', de: 'Geisteswissenschaften',      es: 'Humanidades',               tr: 'Beşeri Bilimler' },
    medical:     { ru: 'Медицина и биология',  en: 'Medicine & Biology',   uk: 'Медицина та біологія', de: 'Medizin & Biologie',       es: 'Medicina y Biología',       tr: 'Tıp ve Biyoloji' },
    creative:    { ru: 'Творческие специальности', en: 'Creative Fields', uk: 'Творчі спеціальності', de: 'Kreative Fachrichtungen', es: 'Campos Creativos',          tr: 'Yaratıcı Alanlar' },
    social:      { ru: 'Социальные науки',     en: 'Social Sciences',      uk: 'Соціальні науки',   de: 'Sozialwissenschaften',       es: 'Ciencias Sociales',         tr: 'Sosyal Bilimler' },
    business:    { ru: 'Бизнес и управление',  en: 'Business & Management',uk: 'Бізнес та управління', de: 'Wirtschaft & Management', es: 'Negocios y Gestión',        tr: 'İşletme ve Yönetim' },
    natural:     { ru: 'Естественные науки',   en: 'Natural Sciences',     uk: 'Природничі науки',  de: 'Naturwissenschaften',        es: 'Ciencias Naturales',        tr: 'Doğa Bilimleri' },
  }

  const formatMap: Record<EducationDirection, LocaleText> = {
    technical:    { ru: 'Университет (технический) + онлайн-курсы',    en: 'University (technical) + online courses',  uk: 'Університет (технічний) + онлайн-курси', de: 'Universität (technisch) + Online-Kurse',    es: 'Universidad (técnica) + cursos online',    tr: 'Üniversite (teknik) + online kurslar' },
    humanitarian: { ru: 'Университет (гуманитарный) + практика',       en: 'University (humanities) + practice',       uk: 'Університет (гуманітарний) + практика',  de: 'Universität (geisteswiss.) + Praxis',       es: 'Universidad (humanidades) + práctica',     tr: 'Üniversite (beşeri) + pratik' },
    medical:      { ru: 'Медицинский университет (6 лет)',              en: 'Medical university (6 years)',             uk: 'Медичний університет (6 років)',          de: 'Medizinische Universität (6 Jahre)',        es: 'Universidad de Medicina (6 años)',         tr: 'Tıp üniversitesi (6 yıl)' },
    creative:     { ru: 'Творческий вуз + портфолио + практика',       en: 'Art school + portfolio + practice',        uk: 'Творчий вуз + портфоліо + практика',     de: 'Kunsthochschule + Portfolio + Praxis',      es: 'Escuela de arte + portfolio + práctica',   tr: 'Sanat okulu + portfolio + pratik' },
    social:       { ru: 'Университет (социальный/гуманитарный)',        en: 'University (social/humanities)',           uk: 'Університет (соціальний/гуманітарний)',   de: 'Universität (sozial-/geisteswiss.)',        es: 'Universidad (social/humanidades)',         tr: 'Üniversite (sosyal/beşeri)' },
    business:     { ru: 'Бизнес-школа или экономический факультет',    en: 'Business school or economics faculty',    uk: 'Бізнес-школа або економічний факультет', de: 'Business School oder Wirtschaftsfakultät', es: 'Escuela de negocios o facultad de economía', tr: 'İşletme okulu veya ekonomi fakültesi' },
    natural:      { ru: 'Естественно-научный факультет университета',  en: 'Natural sciences faculty of university',  uk: 'Природничо-науковий факультет університету', de: 'Naturwissenschaftliche Fakultät',        es: 'Facultad de ciencias naturales',          tr: 'Doğa bilimleri fakültesi' },
  }

  const firstStepMap: Record<EducationDirection, LocaleText> = {
    technical:    { ru: 'Попробуй бесплатный введённый курс по программированию или математике на Coursera',    en: 'Try a free intro course in programming or maths on Coursera',  uk: 'Спробуй безкоштовний вступний курс з програмування або математики на Coursera', de: 'Probiere einen kostenlosen Einführungskurs in Programmierung oder Mathematik auf Coursera', es: 'Prueba un curso introductorio gratuito de programación o matemáticas en Coursera', tr: 'Coursera\'da ücretsiz bir programlama veya matematik giriş kursunu dene' },
    humanitarian: { ru: 'Начни читать одну книгу в месяц по интересующей тебя гуманитарной теме',              en: 'Start reading one book a month on a humanities topic you\'re interested in',  uk: 'Почни читати одну книгу на місяць з цікавої тобі гуманітарної теми', de: 'Beginne, monatlich ein Buch zu einem dich interessierenden geisteswissenschaftlichen Thema zu lesen', es: 'Empieza a leer un libro al mes sobre un tema humanístico que te interese', tr: 'İlgilendiğin beşeri bir konuda ayda bir kitap okumaya başla' },
    medical:      { ru: 'Пройди курс "Введение в биологию" на Khan Academy — бесплатно и интерактивно',         en: 'Take the "Introduction to Biology" course on Khan Academy — free and interactive', uk: 'Пройди курс "Вступ до біології" на Khan Academy — безкоштовно та інтерактивно', de: 'Mache den Kurs "Einführung in die Biologie" auf Khan Academy — kostenlos und interaktiv', es: 'Toma el curso "Introducción a la Biología" en Khan Academy, gratis e interactivo', tr: 'Khan Academy\'da "Biyolojiye Giriş" kursunu al — ücretsiz ve interaktif' },
    creative:     { ru: 'Начни проект прямо сейчас — рисунок, видео, текст. Первая работа важнее совершенства', en: 'Start a project right now — drawing, video, text. The first work matters more than perfection', uk: 'Почни проєкт прямо зараз — малюнок, відео, текст. Перша робота важливіша за досконалість', de: 'Starte jetzt ein Projekt — Zeichnung, Video, Text. Das erste Werk ist wichtiger als Perfektion', es: 'Comienza un proyecto ahora mismo — dibujo, video, texto. La primera obra importa más que la perfección', tr: 'Şimdi hemen bir proje başlat — çizim, video, metin. İlk çalışma mükemmeliyetten daha önemlidir' },
    social:       { ru: 'Найди волонтёрский проект в своём городе — опыт важнее диплома на старте',            en: 'Find a volunteer project in your city — experience matters more than a diploma at the start', uk: 'Знайди волонтерський проєкт у своєму місті — досвід важливіший за диплом на початку', de: 'Finde ein freiwilliges Projekt in deiner Stadt — Erfahrung zählt am Anfang mehr als ein Abschluss', es: 'Encuentra un proyecto de voluntariado en tu ciudad — la experiencia importa más que el diploma al inicio', tr: 'Şehrinde gönüllülük projesi bul — başlangıçta deneyim diplomadan daha önemli' },
    business:     { ru: 'Изучи одну бизнес-модель которая тебя восхищает и разберись почему она работает',      en: 'Study one business model you admire and understand why it works', uk: 'Вивчи одну бізнес-модель яка тебе захоплює і розберись чому вона працює', de: 'Untersuche ein Geschäftsmodell, das dich begeistert, und verstehe, warum es funktioniert', es: 'Estudia un modelo de negocio que te admire y entiende por qué funciona', tr: 'Hayran olduğun bir iş modelini incele ve neden işe yaradığını anla' },
    natural:      { ru: 'Подпишись на научный журнал или YouTube-канал по интересующей области',               en: 'Subscribe to a science journal or YouTube channel in your area of interest', uk: 'Підпишись на науковий журнал або YouTube-канал з цікавої галузі', de: 'Abonniere eine wissenschaftliche Zeitschrift oder einen YouTube-Kanal in deinem Interessengebiet', es: 'Suscríbete a una revista científica o canal de YouTube en tu área de interés', tr: 'İlgi alanındaki bir bilim dergisine veya YouTube kanalına abone ol' },
  }

  return {
    direction,
    directionName: directionNames[direction],
    specialties: topProf?.specialties ?? directionNames[direction],
    platforms: topProf?.platforms ?? [],
    format: formatMap[direction],
    firstStep: firstStepMap[direction],
  }
}
