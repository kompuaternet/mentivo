import type { Locale } from '@/types'

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
]

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'ru'
  const lang = navigator.language.slice(0, 2).toLowerCase()
  const map: Record<string, Locale> = {
    ru: 'ru', en: 'en', uk: 'uk', de: 'de', es: 'es', tr: 'tr',
  }
  return map[lang] ?? 'en'
}

// ─── UI translations ───────────────────────────────────────────────────────────

type UIKey =
  | 'hero_title'
  | 'hero_subtitle'
  | 'hero_cta'
  | 'hero_stats_tests'
  | 'hero_stats_professions'
  | 'hero_stats_min'
  | 'how_title'
  | 'how_1_title' | 'how_1_desc'
  | 'how_2_title' | 'how_2_desc'
  | 'how_3_title' | 'how_3_desc'
  | 'test_question'
  | 'test_of'
  | 'test_block'
  | 'test_back'
  | 'test_complete'
  | 'results_free_title'
  | 'results_free_subtitle'
  | 'results_locked_title'
  | 'results_locked_subtitle'
  | 'results_unlock_cta'
  | 'results_unlock_price'
  | 'results_match'
  | 'results_profession_no'
  | 'results_your_profile'
  | 'results_thinking'
  | 'results_character'
  | 'results_leadership'
  | 'results_workstyle'
  | 'results_career_pace'
  | 'results_strengths'
  | 'results_growth'
  | 'results_top7'
  | 'results_education'
  | 'results_direction'
  | 'results_specialties'
  | 'results_format'
  | 'results_platforms'
  | 'results_first_step'
  | 'results_archetype'
  | 'results_share'
  | 'results_retake'
  | 'payment_success'
  | 'payment_processing'
  | 'workstyle_solo' | 'workstyle_team' | 'workstyle_mixed'
  | 'pace_fast' | 'pace_steady' | 'pace_deep'
  | 'footer_tagline'

type Translations = Record<UIKey, Record<Locale, string>>

export const UI: Translations = {
  hero_title: {
    ru: 'Узнай, какая профессия создана для тебя',
    en: 'Discover the career made for you',
    uk: 'Дізнайся, яка професія створена для тебе',
    de: 'Entdecke den Beruf, der für dich gemacht ist',
    es: 'Descubre la carrera hecha para ti',
    tr: 'Senin için yaratılan kariyer yolunu keşfet',
  },
  hero_subtitle: {
    ru: '30 вопросов. Глубокий анализ. Твой персональный профиль и топ-7 профессий где ты будешь счастлив.',
    en: '30 questions. Deep analysis. Your personal profile and top-7 careers where you will thrive.',
    uk: '30 запитань. Глибокий аналіз. Твій персональний профіль і топ-7 професій де ти будеш щасливий.',
    de: '30 Fragen. Tiefenanalyse. Dein persönliches Profil und top-7 Berufe, in denen du aufblühen wirst.',
    es: '30 preguntas. Análisis profundo. Tu perfil personal y las 7 carreras donde prosperarás.',
    tr: '30 soru. Derin analiz. Kişisel profilin ve başarılı olacağın en iyi 7 kariyer.',
  },
  hero_cta: {
    ru: 'Начать тест — бесплатно',
    en: 'Start the test — free',
    uk: 'Розпочати тест — безкоштовно',
    de: 'Test starten — kostenlos',
    es: 'Iniciar el test — gratis',
    tr: 'Testi başlat — ücretsiz',
  },
  hero_stats_tests: {
    ru: 'тестов пройдено',
    en: 'tests completed',
    uk: 'тестів пройдено',
    de: 'Tests abgeschlossen',
    es: 'tests completados',
    tr: 'test tamamlandı',
  },
  hero_stats_professions: {
    ru: 'профессий в базе',
    en: 'professions in database',
    uk: 'професій у базі',
    de: 'Berufe in der Datenbank',
    es: 'profesiones en la base de datos',
    tr: 'veritabanında meslek',
  },
  hero_stats_min: {
    ru: 'минут на тест',
    en: 'minutes for the test',
    uk: 'хвилин на тест',
    de: 'Minuten für den Test',
    es: 'minutos para el test',
    tr: 'test için dakika',
  },
  how_title: {
    ru: 'Как это работает?',
    en: 'How does it work?',
    uk: 'Як це працює?',
    de: 'Wie funktioniert es?',
    es: '¿Cómo funciona?',
    tr: 'Nasıl çalışır?',
  },
  how_1_title: {
    ru: 'Проходишь тест',
    en: 'Take the test',
    uk: 'Проходиш тест',
    de: 'Teste dich',
    es: 'Realiza el test',
    tr: 'Testi tamamla',
  },
  how_1_desc: {
    ru: '30 вопросов о твоём мышлении, ценностях и стиле работы. Честно и без правильных ответов.',
    en: '30 questions about your thinking, values and work style. Honest, with no right answers.',
    uk: '30 запитань про твоє мислення, цінності та стиль роботи. Чесно і без правильних відповідей.',
    de: '30 Fragen zu deinem Denken, deinen Werten und deinem Arbeitsstil. Ehrlich, ohne richtige Antworten.',
    es: '30 preguntas sobre tu forma de pensar, valores y estilo de trabajo. Honesto, sin respuestas correctas.',
    tr: 'Düşünme şeklin, değerlerin ve çalışma tarzın hakkında 30 soru. Dürüst, doğru cevap yok.',
  },
  how_2_title: {
    ru: 'Получаешь анализ',
    en: 'Get your analysis',
    uk: 'Отримуєш аналіз',
    de: 'Erhalte deine Analyse',
    es: 'Recibe tu análisis',
    tr: 'Analizini al',
  },
  how_2_desc: {
    ru: 'Алгоритм анализирует 6 измерений твоей личности и подбирает профессии с процентом совпадения.',
    en: 'The algorithm analyses 6 dimensions of your personality and matches professions with a percentage.',
    uk: 'Алгоритм аналізує 6 вимірів твоєї особистості і підбирає професії з відсотком збігу.',
    de: 'Der Algorithmus analysiert 6 Persönlichkeitsdimensionen und ordnet Berufe mit einem Prozentsatz zu.',
    es: 'El algoritmo analiza 6 dimensiones de tu personalidad y empareja profesiones con porcentaje.',
    tr: 'Algoritma kişiliğinin 6 boyutunu analiz eder ve meslekleri yüzdeyle eşleştirir.',
  },
  how_3_title: {
    ru: 'Видишь свой путь',
    en: 'See your path',
    uk: 'Бачиш свій шлях',
    de: 'Sieh deinen Weg',
    es: 'Ve tu camino',
    tr: 'Yolunu gör',
  },
  how_3_desc: {
    ru: 'Полный профиль: склад характера, уровень лидерства, топ-7 профессий, куда учиться и первый шаг.',
    en: 'Full profile: character type, leadership level, top-7 careers, where to study, and first step.',
    uk: 'Повний профіль: склад характеру, рівень лідерства, топ-7 професій, де навчатись і перший крок.',
    de: 'Vollständiges Profil: Charaktertyp, Führungsebene, Top-7-Berufe, Lernorte und erster Schritt.',
    es: 'Perfil completo: tipo de carácter, nivel de liderazgo, top-7 carreras, dónde estudiar y primer paso.',
    tr: 'Tam profil: karakter tipi, liderlik seviyesi, en iyi 7 kariyer, nerede çalışacağın ve ilk adım.',
  },
  test_question: {
    ru: 'Вопрос',
    en: 'Question',
    uk: 'Питання',
    de: 'Frage',
    es: 'Pregunta',
    tr: 'Soru',
  },
  test_of: {
    ru: 'из',
    en: 'of',
    uk: 'з',
    de: 'von',
    es: 'de',
    tr: '/',
  },
  test_block: {
    ru: 'Блок',
    en: 'Block',
    uk: 'Блок',
    de: 'Block',
    es: 'Bloque',
    tr: 'Blok',
  },
  test_back: {
    ru: 'Назад',
    en: 'Back',
    uk: 'Назад',
    de: 'Zurück',
    es: 'Atrás',
    tr: 'Geri',
  },
  test_complete: {
    ru: 'завершено',
    en: 'complete',
    uk: 'завершено',
    de: 'abgeschlossen',
    es: 'completado',
    tr: 'tamamlandı',
  },
  results_free_title: {
    ru: 'Вот твой результат 👀',
    en: 'Here is your result 👀',
    uk: 'Ось твій результат 👀',
    de: 'Hier ist dein Ergebnis 👀',
    es: 'Aquí está tu resultado 👀',
    tr: 'İşte sonucun 👀',
  },
  results_free_subtitle: {
    ru: 'Ты видишь только #4 в твоём топе. Хочешь знать что стоит выше?',
    en: 'You see only #4 in your top. Want to know what ranks higher?',
    uk: 'Ти бачиш лише #4 у своєму топі. Хочеш знати що вище?',
    de: 'Du siehst nur #4 in deinem Top. Möchtest du wissen, was höher rangiert?',
    es: 'Solo ves el #4 en tu lista. ¿Quieres saber qué está más arriba?',
    tr: 'Listende yalnızca #4\'ü görüyorsun. Üstte neyin olduğunu bilmek ister misin?',
  },
  results_locked_title: {
    ru: 'Твой полный профиль готов',
    en: 'Your full profile is ready',
    uk: 'Твій повний профіль готовий',
    de: 'Dein vollständiges Profil ist fertig',
    es: 'Tu perfil completo está listo',
    tr: 'Tam profilin hazır',
  },
  results_locked_subtitle: {
    ru: 'Разблокируй: Топ-7 профессий · Склад характера · Склад мышления · Уровень лидерства · Куда идти учиться',
    en: 'Unlock: Top-7 careers · Character type · Thinking style · Leadership level · Where to study',
    uk: 'Розблокуй: Топ-7 професій · Склад характеру · Склад мислення · Рівень лідерства · Куди навчатися',
    de: 'Freischalten: Top-7-Berufe · Charaktertyp · Denkstil · Führungsebene · Wo man studiert',
    es: 'Desbloquea: Top-7 carreras · Tipo de carácter · Estilo de pensamiento · Nivel de liderazgo · Dónde estudiar',
    tr: 'Kilidi aç: En iyi 7 kariyer · Karakter tipi · Düşünme tarzı · Liderlik seviyesi · Nerede çalışmalı',
  },
  results_unlock_cta: {
    ru: '🔓 Открыть полный результат',
    en: '🔓 Unlock full result',
    uk: '🔓 Відкрити повний результат',
    de: '🔓 Vollständiges Ergebnis freischalten',
    es: '🔓 Desbloquear resultado completo',
    tr: '🔓 Tam sonucu aç',
  },
  results_unlock_price: {
    ru: 'Всего',
    en: 'Only',
    uk: 'Всього',
    de: 'Nur',
    es: 'Solo',
    tr: 'Sadece',
  },
  results_match: {
    ru: 'совпадение',
    en: 'match',
    uk: 'збіг',
    de: 'Übereinstimmung',
    es: 'coincidencia',
    tr: 'uyum',
  },
  results_profession_no: {
    ru: 'Профессия #',
    en: 'Career #',
    uk: 'Професія #',
    de: 'Beruf #',
    es: 'Carrera #',
    tr: 'Kariyer #',
  },
  results_your_profile: {
    ru: '🧬 Твой профессиональный портрет',
    en: '🧬 Your professional portrait',
    uk: '🧬 Твій професійний портрет',
    de: '🧬 Dein professionelles Porträt',
    es: '🧬 Tu retrato profesional',
    tr: '🧬 Profesyonel portren',
  },
  results_thinking: {
    ru: 'Склад мышления',
    en: 'Thinking style',
    uk: 'Склад мислення',
    de: 'Denkstil',
    es: 'Estilo de pensamiento',
    tr: 'Düşünme tarzı',
  },
  results_character: {
    ru: 'Склад характера',
    en: 'Character type',
    uk: 'Склад характеру',
    de: 'Charaktertyp',
    es: 'Tipo de carácter',
    tr: 'Karakter tipi',
  },
  results_leadership: {
    ru: 'Уровень лидерства',
    en: 'Leadership level',
    uk: 'Рівень лідерства',
    de: 'Führungsebene',
    es: 'Nivel de liderazgo',
    tr: 'Liderlik seviyesi',
  },
  results_workstyle: {
    ru: 'Рабочий стиль',
    en: 'Work style',
    uk: 'Робочий стиль',
    de: 'Arbeitsstil',
    es: 'Estilo de trabajo',
    tr: 'Çalışma tarzı',
  },
  results_career_pace: {
    ru: 'Карьерный темп',
    en: 'Career pace',
    uk: 'Кар\'єрний темп',
    de: 'Karrieretempo',
    es: 'Ritmo de carrera',
    tr: 'Kariyer temposu',
  },
  results_strengths: {
    ru: '💪 Сильные стороны',
    en: '💪 Strengths',
    uk: '💪 Сильні сторони',
    de: '💪 Stärken',
    es: '💪 Fortalezas',
    tr: '💪 Güçlü yönler',
  },
  results_growth: {
    ru: '🌱 Зоны роста',
    en: '🌱 Growth areas',
    uk: '🌱 Зони росту',
    de: '🌱 Wachstumsbereiche',
    es: '🌱 Áreas de crecimiento',
    tr: '🌱 Büyüme alanları',
  },
  results_top7: {
    ru: '🏆 Твой Топ-7 профессий',
    en: '🏆 Your Top-7 careers',
    uk: '🏆 Твій Топ-7 професій',
    de: '🏆 Deine Top-7-Berufe',
    es: '🏆 Tu Top-7 de carreras',
    tr: '🏆 En İyi 7 Kariyer',
  },
  results_education: {
    ru: '🎓 Куда идти учиться',
    en: '🎓 Where to study',
    uk: '🎓 Куди йти навчатися',
    de: '🎓 Wo du studieren solltest',
    es: '🎓 Dónde estudiar',
    tr: '🎓 Nerede çalışmalı',
  },
  results_direction: {
    ru: 'Направление',
    en: 'Direction',
    uk: 'Напрямок',
    de: 'Richtung',
    es: 'Dirección',
    tr: 'Yön',
  },
  results_specialties: {
    ru: 'Ищи специальности',
    en: 'Look for specialties',
    uk: 'Шукай спеціальності',
    de: 'Suche nach Fachrichtungen',
    es: 'Busca especialidades',
    tr: 'Uzmanlık ara',
  },
  results_format: {
    ru: 'Формат обучения',
    en: 'Study format',
    uk: 'Формат навчання',
    de: 'Lernformat',
    es: 'Formato de estudio',
    tr: 'Eğitim formatı',
  },
  results_platforms: {
    ru: 'Онлайн-платформы для старта',
    en: 'Online platforms to start',
    uk: 'Онлайн-платформи для старту',
    de: 'Online-Plattformen zum Starten',
    es: 'Plataformas online para empezar',
    tr: 'Başlamak için online platformlar',
  },
  results_first_step: {
    ru: '🗺️ Твой первый шаг прямо сейчас',
    en: '🗺️ Your first step right now',
    uk: '🗺️ Твій перший крок прямо зараз',
    de: '🗺️ Dein erster Schritt jetzt',
    es: '🗺️ Tu primer paso ahora mismo',
    tr: '🗺️ Şu an atman gereken ilk adım',
  },
  results_archetype: {
    ru: '⚡ Твой карьерный архетип',
    en: '⚡ Your career archetype',
    uk: '⚡ Твій кар\'єрний архетип',
    de: '⚡ Dein Karrierearchetyp',
    es: '⚡ Tu arquetipo de carrera',
    tr: '⚡ Kariyer arketipin',
  },
  results_share: {
    ru: 'Поделиться результатом',
    en: 'Share result',
    uk: 'Поділитись результатом',
    de: 'Ergebnis teilen',
    es: 'Compartir resultado',
    tr: 'Sonucu paylaş',
  },
  results_retake: {
    ru: 'Пройти снова',
    en: 'Retake',
    uk: 'Пройти знову',
    de: 'Wiederholen',
    es: 'Repetir',
    tr: 'Tekrar al',
  },
  payment_success: {
    ru: 'Оплата прошла успешно!',
    en: 'Payment successful!',
    uk: 'Оплата пройшла успішно!',
    de: 'Zahlung erfolgreich!',
    es: '¡Pago exitoso!',
    tr: 'Ödeme başarılı!',
  },
  payment_processing: {
    ru: 'Обрабатываем оплату...',
    en: 'Processing payment...',
    uk: 'Обробляємо оплату...',
    de: 'Zahlung wird verarbeitet...',
    es: 'Procesando pago...',
    tr: 'Ödeme işleniyor...',
  },
  workstyle_solo: {
    ru: 'Соло-работник',
    en: 'Solo worker',
    uk: 'Соло-працівник',
    de: 'Einzelkämpfer/in',
    es: 'Trabajador/a independiente',
    tr: 'Solo çalışan',
  },
  workstyle_team: {
    ru: 'Командный игрок',
    en: 'Team player',
    uk: 'Командний гравець',
    de: 'Teamplayer/in',
    es: 'Jugador/a de equipo',
    tr: 'Takım oyuncusu',
  },
  workstyle_mixed: {
    ru: 'Гибкий — и так и так',
    en: 'Flexible — both ways',
    uk: 'Гнучкий — і так і так',
    de: 'Flexibel — beides',
    es: 'Flexible — ambas formas',
    tr: 'Esnek — her iki şekilde de',
  },
  pace_fast: {
    ru: 'Быстрый рост',
    en: 'Fast growth',
    uk: 'Швидке зростання',
    de: 'Schnelles Wachstum',
    es: 'Crecimiento rápido',
    tr: 'Hızlı büyüme',
  },
  pace_steady: {
    ru: 'Стабильный рост',
    en: 'Steady growth',
    uk: 'Стабільне зростання',
    de: 'Stetiges Wachstum',
    es: 'Crecimiento constante',
    tr: 'İstikrarlı büyüme',
  },
  pace_deep: {
    ru: 'Глубина и экспертиза',
    en: 'Depth and expertise',
    uk: 'Глибина та експертиза',
    de: 'Tiefe und Expertise',
    es: 'Profundidad y experiencia',
    tr: 'Derinlik ve uzmanlık',
  },
  footer_tagline: {
    ru: 'Найди профессию своей мечты',
    en: 'Find your dream profession',
    uk: 'Знайди професію своєї мрії',
    de: 'Finde deinen Traumberuf',
    es: 'Encuentra tu profesión soñada',
    tr: 'Hayal kariyer yolunu bul',
  },
}

export function t(key: UIKey, locale: Locale): string {
  return UI[key]?.[locale] ?? UI[key]?.['en'] ?? key
}
