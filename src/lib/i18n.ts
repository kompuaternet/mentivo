import type { Locale, LocaleText } from '@/types'

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
]

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'ru'
  const lang = navigator.language.slice(0, 2).toLowerCase()
  const map: Record<string, Locale> = {
    ru: 'ru', en: 'en', uk: 'uk', de: 'de', es: 'es', tr: 'tr', fr: 'fr',
  }
  return map[lang] ?? 'en'
}

/** Get localized text with English fallback */
export function getLT(text: LocaleText | undefined, locale: Locale): string {
  if (!text) return ''
  return text[locale] ?? text['en'] ?? ''
}

// ─── UI translations ───────────────────────────────────────────────────────────

type UIKey =
  | 'hub_badge' | 'hub_title_a' | 'hub_title_b' | 'hub_subtitle'
  | 'hub_popular' | 'hub_soon' | 'hub_questions' | 'hub_start'
  | 'hub_test_career_title' | 'hub_test_career_subtitle' | 'hub_test_career_desc'
  | 'hub_test_career_f1' | 'hub_test_career_f2' | 'hub_test_career_f3' | 'hub_test_career_f4'
  | 'hub_test_iq_title' | 'hub_test_iq_subtitle' | 'hub_test_iq_desc'
  | 'hub_test_iq_f1' | 'hub_test_iq_f2' | 'hub_test_iq_f3' | 'hub_test_iq_f4'
  | 'hub_test_mbti_title' | 'hub_test_mbti_subtitle' | 'hub_test_mbti_desc'
  | 'hub_test_mbti_f1' | 'hub_test_mbti_f2' | 'hub_test_mbti_f3' | 'hub_test_mbti_f4'
  | 'career_f1_title' | 'career_f1_desc' | 'career_f2_title' | 'career_f2_desc'
  | 'career_f3_title' | 'career_f3_desc' | 'career_f4_title' | 'career_f4_desc'
  | 'career_f5_title' | 'career_f5_desc' | 'career_f6_title' | 'career_f6_desc'
  | 'career_f7_title' | 'career_f7_desc' | 'career_f8_title' | 'career_f8_desc'
  | 'testimonial_1_text' | 'testimonial_1_name'
  | 'testimonial_2_text' | 'testimonial_2_name'
  | 'testimonial_3_text' | 'testimonial_3_name'
  | 'career_badge'
  | 'career_step'
  | 'career_what_title'
  | 'career_what_sub'
  | 'career_free_note'
  | 'career_paid_note'
  | 'career_start_now'
  | 'career_cta_title'
  | 'career_cta_sub'
  | 'test_analyzing'
  | 'test_analyzing_sub'
  | 'hero_title'
  | 'hero_title2'
  | 'hero_subtitle'
  | 'hero_cta'
  | 'hero_timer_line'
  | 'hero_micro'
  | 'hero_no_signup'
  | 'research_label'
  | 'research_credit'
  | 'research_stat_papers'
  | 'research_stat_years'
  | 'research_stat_countries'
  | 'hero_useful_title'
  | 'hero_useful_1' | 'hero_useful_2' | 'hero_useful_3'
  | 'hero_stats_tests'
  | 'hero_stats_professions'
  | 'hero_stats_min'
  | 'hero_stats_satisfaction'
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
  | 'career_trust_bar'
  | 'insight_btn'
  | 'insight_subheading'
  | 'insight_t_analytical_title' | 'insight_t_analytical_desc'
  | 'insight_t_creative_title' | 'insight_t_creative_desc'
  | 'insight_t_social_title' | 'insight_t_social_desc'
  | 'insight_t_strategic_title' | 'insight_t_strategic_desc'
  | 'insight_t_practical_title' | 'insight_t_practical_desc'
  | 'insight_top_pct'

type Translations = Record<UIKey, Partial<Record<Locale, string>>>

export const UI: Translations = {
  hero_title: {
    ru: 'Найди профессию, которая тебе подходит',
    en: 'Find the career that fits you',
    uk: 'Знайди професію, яка тобі підходить',
    de: 'Finde den Beruf, der zu dir passt',
    es: 'Encuentra la carrera que te corresponde',
    tr: 'Sana uyan kariyer yolunu bul',
    fr: 'Trouve la carrière qui te correspond',
  },
  hero_title2: {
    ru: 'и не трать годы на ошибку',
    en: 'and stop wasting years on the wrong path',
    uk: 'і не витрачай роки на помилку',
    de: 'und verschwende keine Jahre mit Fehlern',
    es: 'y no pierdas años en el error',
    tr: 've yıllarca yanlış yolda zaman kaybetme',
    fr: 'et ne perds pas des années à te tromper',
  },
  hero_subtitle: {
    ru: '30 вопросов на основе модели Holland (RIASEC), используемой по всему миру',
    en: '30 questions based on the Holland (RIASEC) model, used in career guidance worldwide',
    uk: '30 запитань на основі моделі Holland (RIASEC), яка використовується по всьому світу',
    de: '30 Fragen basierend auf dem Holland (RIASEC)-Modell, das weltweit eingesetzt wird',
    es: '30 preguntas basadas en el modelo Holland (RIASEC), utilizado en todo el mundo',
    tr: 'Holland (RIASEC) modeline dayalı 30 soru, dünya genelinde kullanılıyor',
    fr: '30 questions basées sur le modèle Holland (RIASEC), utilisé partout dans le monde',
  },
  hero_timer_line: {
    ru: '⏱ 10 минут → выбор, который определит годы',
    en: '⏱ 10 minutes → a choice that will define years',
    uk: '⏱ 10 хвилин → вибір, який визначить роки',
    de: '⏱ 10 Minuten → eine Wahl, die Jahre bestimmt',
    es: '⏱ 10 minutos → una elección que definirá años',
    tr: '⏱ 10 dakika → yılları belirleyecek bir seçim',
    fr: '⏱ 10 minutes → un choix qui définira des années',
  },
  hero_micro: {
    ru: 'Основано на модели Holland (RIASEC)',
    en: 'Based on the Holland (RIASEC) model',
    uk: 'Засновано на моделі Holland (RIASEC)',
    de: 'Basiert auf dem Holland (RIASEC)-Modell',
    es: 'Basado en el modelo Holland (RIASEC)',
    tr: 'Holland (RIASEC) modeline dayalı',
    fr: 'Basé sur le modèle Holland (RIASEC)',
  },
  hero_cta: {
    ru: 'Узнать свою профессию',
    en: 'Find your career',
    uk: 'Дізнатися свою професію',
    de: 'Meinen Beruf entdecken',
    es: 'Descubrir mi carrera',
    tr: 'Kariyerimi bul',
    fr: 'Trouver ma carrière',
  },
  hero_no_signup: {
    ru: 'Без регистрации',
    en: 'No sign-up required',
    uk: 'Без реєстрації',
    de: 'Ohne Registrierung',
    es: 'Sin registro',
    tr: 'Kayıt olmadan',
    fr: 'Sans inscription',
  },
  research_label: {
    ru: 'Научная основа',
    en: 'Scientific Foundation',
    uk: 'Наукова основа',
    de: 'Wissenschaftliche Grundlage',
    es: 'Base científica',
    tr: 'Bilimsel temel',
    fr: 'Fondement scientifique',
  },
  research_credit: {
    ru: 'Тест основан на модели Holland (RIASEC), разработанной профессором Джоном Холландом в Университете Джонса Хопкинса (1959). Проверена в тысячах исследований и применяется в ведущих университетах более 60 лет.',
    en: 'Based on the Holland (RIASEC) model, developed by Prof. John Holland at Johns Hopkins University (1959). Validated in thousands of studies and used at leading universities for over 60 years.',
    uk: 'Тест заснований на моделі Holland (RIASEC), розробленій професором Джоном Холландом в Університеті Джонса Хопкінса (1959). Перевірена в тисячах досліджень і застосовується у провідних університетах понад 60 років.',
    de: 'Basierend auf dem Holland (RIASEC)-Modell, entwickelt von Prof. John Holland an der Johns Hopkins University (1959). In Tausenden von Studien validiert und seit über 60 Jahren an führenden Universitäten eingesetzt.',
    es: 'Basado en el modelo Holland (RIASEC), desarrollado por el Prof. John Holland en la Universidad Johns Hopkins (1959). Validado en miles de estudios y utilizado en universidades líderes durante más de 60 años.',
    tr: 'Johns Hopkins Üniversitesi\'nde Prof. John Holland tarafından geliştirilen Holland (RIASEC) modeline dayalıdır (1959). Binlerce araştırmada doğrulanmış ve 60 yılı aşkın süredir önde gelen üniversitelerde kullanılmaktadır.',
    fr: 'Basé sur le modèle Holland (RIASEC), développé par le Prof. John Holland à l\'Université Johns Hopkins (1959). Validé dans des milliers d\'études et utilisé dans les meilleures universités depuis plus de 60 ans.',
  },
  research_stat_papers: {
    ru: 'научных публикаций',
    en: 'research papers',
    uk: 'наукових публікацій',
    de: 'Forschungspublikationen',
    es: 'publicaciones científicas',
    tr: 'araştırma makalesi',
    fr: 'publications scientifiques',
  },
  research_stat_years: {
    ru: 'лет в науке',
    en: 'years validated',
    uk: 'років у науці',
    de: 'Jahre validiert',
    es: 'años de validación',
    tr: 'yıl doğrulandı',
    fr: 'ans de validation',
  },
  research_stat_countries: {
    ru: 'стран применения',
    en: 'countries worldwide',
    uk: 'країн застосування',
    de: 'Länder weltweit',
    es: 'países de aplicación',
    tr: 'ülkede kullanılıyor',
    fr: 'pays d\'utilisation',
  },
  hero_useful_title: {
    ru: 'Этот тест особенно полезен, если ты:',
    en: 'This test is especially useful if you:',
    uk: 'Цей тест особливо корисний, якщо ти:',
    de: 'Dieser Test ist besonders nützlich, wenn du:',
    es: 'Este test es especialmente útil si:',
    tr: 'Bu test özellikle şu durumlarda faydalıdır:',
    fr: 'Ce test est particulièrement utile si tu :',
  },
  hero_useful_1: {
    ru: 'не знаешь куда поступать',
    en: "don't know what to study",
    uk: 'не знаєш куди вступати',
    de: 'nicht weißt, was du studieren sollst',
    es: 'no sabes qué estudiar',
    tr: 'ne okuyacağını bilmiyorsun',
    fr: 'ne sais pas quoi étudier',
  },
  hero_useful_2: {
    ru: 'сомневаешься в выборе',
    en: 'are unsure about your choice',
    uk: 'сумніваєшся у виборі',
    de: 'unsicher in deiner Wahl bist',
    es: 'dudas sobre tu elección',
    tr: 'seçiminden emin değilsin',
    fr: 'doutes de ton choix',
  },
  hero_useful_3: {
    ru: 'хочешь сменить профессию',
    en: 'want to change careers',
    uk: 'хочеш змінити професію',
    de: 'den Beruf wechseln möchtest',
    es: 'quieres cambiar de carrera',
    tr: 'kariyer değiştirmek istiyorsun',
    fr: 'veux changer de métier',
  },
  hero_stats_tests: {
    ru: 'тестов пройдено',
    en: 'tests completed',
    uk: 'тестів пройдено',
    de: 'Tests abgeschlossen',
    es: 'tests completados',
    tr: 'test tamamlandı',
    fr: 'tests complétés',
  },
  hero_stats_professions: {
    ru: 'профессий в базе',
    en: 'professions in database',
    uk: 'професій у базі',
    de: 'Berufe in der Datenbank',
    es: 'profesiones en la base de datos',
    tr: 'veritabanında meslek',
    fr: 'professions dans la base',
  },
  hero_stats_satisfaction: {
    ru: 'удовлетворённость',
    en: 'satisfaction rate',
    uk: 'задоволеність',
    de: 'Zufriedenheitsrate',
    es: 'tasa de satisfacción',
    tr: 'memnuniyet oranı',
    fr: 'taux de satisfaction',
  },
  hero_stats_min: {
    ru: 'минут на тест',
    en: 'minutes for the test',
    uk: 'хвилин на тест',
    de: 'Minuten für den Test',
    es: 'minutos para el test',
    tr: 'test için dakika',
    fr: 'minutes pour le test',
  },
  how_title: {
    ru: 'Как это работает?',
    en: 'How does it work?',
    uk: 'Як це працює?',
    de: 'Wie funktioniert es?',
    es: '¿Cómo funciona?',
    tr: 'Nasıl çalışır?',
    fr: 'Comment ça marche ?',
  },
  how_1_title: {
    ru: 'Проходишь тест',
    en: 'Take the test',
    uk: 'Проходиш тест',
    de: 'Teste dich',
    es: 'Realiza el test',
    tr: 'Testi tamamla',
    fr: 'Passe le test',
  },
  how_1_desc: {
    ru: '30 вопросов о твоём мышлении, ценностях и стиле работы. Честно и без правильных ответов.',
    en: '30 questions about your thinking, values and work style. Honest, with no right answers.',
    uk: '30 запитань про твоє мислення, цінності та стиль роботи. Чесно і без правильних відповідей.',
    de: '30 Fragen zu deinem Denken, deinen Werten und deinem Arbeitsstil. Ehrlich, ohne richtige Antworten.',
    es: '30 preguntas sobre tu forma de pensar, valores y estilo de trabajo. Honesto, sin respuestas correctas.',
    tr: 'Düşünme şeklin, değerlerin ve çalışma tarzın hakkında 30 soru. Dürüst, doğru cevap yok.',
    fr: '30 questions sur ta façon de penser, tes valeurs et ton style de travail. Honnête, sans bonnes réponses.',
  },
  how_2_title: {
    ru: 'Получаешь анализ',
    en: 'Get your analysis',
    uk: 'Отримуєш аналіз',
    de: 'Erhalte deine Analyse',
    es: 'Recibe tu análisis',
    tr: 'Analizini al',
    fr: 'Reçois ton analyse',
  },
  how_2_desc: {
    ru: 'Алгоритм анализирует 6 измерений твоей личности и подбирает профессии с процентом совпадения.',
    en: 'The algorithm analyses 6 dimensions of your personality and matches professions with a percentage.',
    uk: 'Алгоритм аналізує 6 вимірів твоєї особистості і підбирає професії з відсотком збігу.',
    de: 'Der Algorithmus analysiert 6 Persönlichkeitsdimensionen und ordnet Berufe mit einem Prozentsatz zu.',
    es: 'El algoritmo analiza 6 dimensiones de tu personalidad y empareja profesiones con porcentaje.',
    tr: 'Algoritma kişiliğinin 6 boyutunu analiz eder ve meslekleri yüzdeyle eşleştirir.',
    fr: 'L\'algorithme analyse 6 dimensions de ta personnalité et associe des professions avec un pourcentage.',
  },
  how_3_title: {
    ru: 'Видишь свой путь',
    en: 'See your path',
    uk: 'Бачиш свій шлях',
    de: 'Sieh deinen Weg',
    es: 'Ve tu camino',
    tr: 'Yolunu gör',
    fr: 'Vois ton chemin',
  },
  how_3_desc: {
    ru: 'Полный профиль: склад характера, уровень лидерства, топ-7 профессий, куда учиться и первый шаг.',
    en: 'Full profile: character type, leadership level, top-7 careers, where to study, and first step.',
    uk: 'Повний профіль: склад характеру, рівень лідерства, топ-7 професій, де навчатись і перший крок.',
    de: 'Vollständiges Profil: Charaktertyp, Führungsebene, Top-7-Berufe, Lernorte und erster Schritt.',
    es: 'Perfil completo: tipo de carácter, nivel de liderazgo, top-7 carreras, dónde estudiar y primer paso.',
    tr: 'Tam profil: karakter tipi, liderlik seviyesi, en iyi 7 kariyer, nerede çalışacağın ve ilk adım.',
    fr: 'Profil complet: type de caractère, niveau de leadership, top-7 carrières, où étudier et premier pas.',
  },
  test_question: {
    ru: 'Вопрос',
    en: 'Question',
    uk: 'Питання',
    de: 'Frage',
    es: 'Pregunta',
    tr: 'Soru',
    fr: 'Question',
  },
  test_of: {
    ru: 'из',
    en: 'of',
    uk: 'з',
    de: 'von',
    es: 'de',
    tr: '/',
    fr: 'sur',
  },
  test_block: {
    ru: 'Блок',
    en: 'Block',
    uk: 'Блок',
    de: 'Block',
    es: 'Bloque',
    tr: 'Blok',
    fr: 'Bloc',
  },
  test_back: {
    ru: 'Назад',
    en: 'Back',
    uk: 'Назад',
    de: 'Zurück',
    es: 'Atrás',
    tr: 'Geri',
    fr: 'Retour',
  },
  test_complete: {
    ru: 'завершено',
    en: 'complete',
    uk: 'завершено',
    de: 'abgeschlossen',
    es: 'completado',
    tr: 'tamamlandı',
    fr: 'complété',
  },
  results_free_title: {
    ru: 'Вот твой результат 👀',
    en: 'Here is your result 👀',
    uk: 'Ось твій результат 👀',
    de: 'Hier ist dein Ergebnis 👀',
    es: 'Aquí está tu resultado 👀',
    tr: 'İşte sonucun 👀',
    fr: 'Voici ton résultat 👀',
  },
  results_free_subtitle: {
    ru: 'Ты видишь только #4 в твоём топе. Хочешь знать что стоит выше?',
    en: 'You see only #4 in your top. Want to know what ranks higher?',
    uk: 'Ти бачиш лише #4 у своєму топі. Хочеш знати що вище?',
    de: 'Du siehst nur #4 in deinem Top. Möchtest du wissen, was höher rangiert?',
    es: 'Solo ves el #4 en tu lista. ¿Quieres saber qué está más arriba?',
    tr: 'Listende yalnızca #4\'ü görüyorsun. Üstte neyin olduğunu bilmek ister misin?',
    fr: 'Tu vois seulement le #4 dans ton top. Tu veux savoir ce qui est plus haut ?',
  },
  results_locked_title: {
    ru: 'Твой полный профиль готов',
    en: 'Your full profile is ready',
    uk: 'Твій повний профіль готовий',
    de: 'Dein vollständiges Profil ist fertig',
    es: 'Tu perfil completo está listo',
    tr: 'Tam profilin hazır',
    fr: 'Ton profil complet est prêt',
  },
  results_locked_subtitle: {
    ru: 'Разблокируй: Топ-7 профессий · Склад характера · Склад мышления · Уровень лидерства · Куда идти учиться',
    en: 'Unlock: Top-7 careers · Character type · Thinking style · Leadership level · Where to study',
    uk: 'Розблокуй: Топ-7 професій · Склад характеру · Склад мислення · Рівень лідерства · Куди навчатися',
    de: 'Freischalten: Top-7-Berufe · Charaktertyp · Denkstil · Führungsebene · Wo man studiert',
    es: 'Desbloquea: Top-7 carreras · Tipo de carácter · Estilo de pensamiento · Nivel de liderazgo · Dónde estudiar',
    tr: 'Kilidi aç: En iyi 7 kariyer · Karakter tipi · Düşünme tarzı · Liderlik seviyesi · Nerede çalışmalı',
    fr: 'Débloque: Top-7 carrières · Type de caractère · Style de pensée · Niveau de leadership · Où étudier',
  },
  results_unlock_cta: {
    ru: '🔓 Открыть полный результат',
    en: '🔓 Unlock full result',
    uk: '🔓 Відкрити повний результат',
    de: '🔓 Vollständiges Ergebnis freischalten',
    es: '🔓 Desbloquear resultado completo',
    tr: '🔓 Tam sonucu aç',
    fr: '🔓 Débloquer le résultat complet',
  },
  results_unlock_price: {
    ru: 'Всего',
    en: 'Only',
    uk: 'Всього',
    de: 'Nur',
    es: 'Solo',
    tr: 'Sadece',
    fr: 'Seulement',
  },
  results_match: {
    ru: 'совпадение',
    en: 'match',
    uk: 'збіг',
    de: 'Übereinstimmung',
    es: 'coincidencia',
    tr: 'uyum',
    fr: 'correspondance',
  },
  results_profession_no: {
    ru: 'Профессия #',
    en: 'Career #',
    uk: 'Професія #',
    de: 'Beruf #',
    es: 'Carrera #',
    tr: 'Kariyer #',
    fr: 'Carrière #',
  },
  results_your_profile: {
    ru: '🧬 Твой профессиональный портрет',
    en: '🧬 Your professional portrait',
    uk: '🧬 Твій професійний портрет',
    de: '🧬 Dein professionelles Porträt',
    es: '🧬 Tu retrato profesional',
    tr: '🧬 Profesyonel portren',
    fr: '🧬 Ton portrait professionnel',
  },
  results_thinking: {
    ru: 'Склад мышления',
    en: 'Thinking style',
    uk: 'Склад мислення',
    de: 'Denkstil',
    es: 'Estilo de pensamiento',
    tr: 'Düşünme tarzı',
    fr: 'Style de pensée',
  },
  results_character: {
    ru: 'Склад характера',
    en: 'Character type',
    uk: 'Склад характеру',
    de: 'Charaktertyp',
    es: 'Tipo de carácter',
    tr: 'Karakter tipi',
    fr: 'Type de caractère',
  },
  results_leadership: {
    ru: 'Уровень лидерства',
    en: 'Leadership level',
    uk: 'Рівень лідерства',
    de: 'Führungsebene',
    es: 'Nivel de liderazgo',
    tr: 'Liderlik seviyesi',
    fr: 'Niveau de leadership',
  },
  results_workstyle: {
    ru: 'Рабочий стиль',
    en: 'Work style',
    uk: 'Робочий стиль',
    de: 'Arbeitsstil',
    es: 'Estilo de trabajo',
    tr: 'Çalışma tarzı',
    fr: 'Style de travail',
  },
  results_career_pace: {
    ru: 'Карьерный темп',
    en: 'Career pace',
    uk: 'Кар\'єрний темп',
    de: 'Karrieretempo',
    es: 'Ritmo de carrera',
    tr: 'Kariyer temposu',
    fr: 'Rythme de carrière',
  },
  results_strengths: {
    ru: '💪 Сильные стороны',
    en: '💪 Strengths',
    uk: '💪 Сильні сторони',
    de: '💪 Stärken',
    es: '💪 Fortalezas',
    tr: '💪 Güçlü yönler',
    fr: '💪 Points forts',
  },
  results_growth: {
    ru: '🌱 Зоны роста',
    en: '🌱 Growth areas',
    uk: '🌱 Зони росту',
    de: '🌱 Wachstumsbereiche',
    es: '🌱 Áreas de crecimiento',
    tr: '🌱 Büyüme alanları',
    fr: '🌱 Zones de croissance',
  },
  results_top7: {
    ru: '🏆 Твой Топ-7 профессий',
    en: '🏆 Your Top-7 careers',
    uk: '🏆 Твій Топ-7 професій',
    de: '🏆 Deine Top-7-Berufe',
    es: '🏆 Tu Top-7 de carreras',
    tr: '🏆 En İyi 7 Kariyer',
    fr: '🏆 Ton Top-7 de carrières',
  },
  results_education: {
    ru: '🎓 Куда идти учиться',
    en: '🎓 Where to study',
    uk: '🎓 Куди йти навчатися',
    de: '🎓 Wo du studieren solltest',
    es: '🎓 Dónde estudiar',
    tr: '🎓 Nerede çalışmalı',
    fr: '🎓 Où étudier',
  },
  results_direction: {
    ru: 'Направление',
    en: 'Direction',
    uk: 'Напрямок',
    de: 'Richtung',
    es: 'Dirección',
    tr: 'Yön',
    fr: 'Direction',
  },
  results_specialties: {
    ru: 'Ищи специальности',
    en: 'Look for specialties',
    uk: 'Шукай спеціальності',
    de: 'Suche nach Fachrichtungen',
    es: 'Busca especialidades',
    tr: 'Uzmanlık ara',
    fr: 'Cherche des spécialités',
  },
  results_format: {
    ru: 'Формат обучения',
    en: 'Study format',
    uk: 'Формат навчання',
    de: 'Lernformat',
    es: 'Formato de estudio',
    tr: 'Eğitim formatı',
    fr: 'Format d\'apprentissage',
  },
  results_platforms: {
    ru: 'Онлайн-платформы для старта',
    en: 'Online platforms to start',
    uk: 'Онлайн-платформи для старту',
    de: 'Online-Plattformen zum Starten',
    es: 'Plataformas online para empezar',
    tr: 'Başlamak için online platformlar',
    fr: 'Plateformes en ligne pour démarrer',
  },
  results_first_step: {
    ru: '🗺️ Твой первый шаг прямо сейчас',
    en: '🗺️ Your first step right now',
    uk: '🗺️ Твій перший крок прямо зараз',
    de: '🗺️ Dein erster Schritt jetzt',
    es: '🗺️ Tu primer paso ahora mismo',
    tr: '🗺️ Şu an atman gereken ilk adım',
    fr: '🗺️ Ton premier pas maintenant',
  },
  results_archetype: {
    ru: '⚡ Твой карьерный архетип',
    en: '⚡ Your career archetype',
    uk: '⚡ Твій кар\'єрний архетип',
    de: '⚡ Dein Karrierearchetyp',
    es: '⚡ Tu arquetipo de carrera',
    tr: '⚡ Kariyer arketipin',
    fr: '⚡ Ton archétype de carrière',
  },
  results_share: {
    ru: 'Поделиться результатом',
    en: 'Share result',
    uk: 'Поділитись результатом',
    de: 'Ergebnis teilen',
    es: 'Compartir resultado',
    tr: 'Sonucu paylaş',
    fr: 'Partager le résultat',
  },
  results_retake: {
    ru: 'Пройти снова',
    en: 'Retake',
    uk: 'Пройти знову',
    de: 'Wiederholen',
    es: 'Repetir',
    tr: 'Tekrar al',
    fr: 'Refaire le test',
  },
  payment_success: {
    ru: 'Оплата прошла успешно!',
    en: 'Payment successful!',
    uk: 'Оплата пройшла успішно!',
    de: 'Zahlung erfolgreich!',
    es: '¡Pago exitoso!',
    tr: 'Ödeme başarılı!',
    fr: 'Paiement réussi !',
  },
  payment_processing: {
    ru: 'Обрабатываем оплату...',
    en: 'Processing payment...',
    uk: 'Обробляємо оплату...',
    de: 'Zahlung wird verarbeitet...',
    es: 'Procesando pago...',
    tr: 'Ödeme işleniyor...',
    fr: 'Traitement du paiement...',
  },
  workstyle_solo: {
    ru: 'Соло-работник',
    en: 'Solo worker',
    uk: 'Соло-працівник',
    de: 'Einzelkämpfer/in',
    es: 'Trabajador/a independiente',
    tr: 'Solo çalışan',
    fr: 'Travailleur solo',
  },
  workstyle_team: {
    ru: 'Командный игрок',
    en: 'Team player',
    uk: 'Командний гравець',
    de: 'Teamplayer/in',
    es: 'Jugador/a de equipo',
    tr: 'Takım oyuncusu',
    fr: 'Joueur d\'équipe',
  },
  workstyle_mixed: {
    ru: 'Гибкий — и так и так',
    en: 'Flexible — both ways',
    uk: 'Гнучкий — і так і так',
    de: 'Flexibel — beides',
    es: 'Flexible — ambas formas',
    tr: 'Esnek — her iki şekilde de',
    fr: 'Flexible — les deux',
  },
  pace_fast: {
    ru: 'Быстрый рост',
    en: 'Fast growth',
    uk: 'Швидке зростання',
    de: 'Schnelles Wachstum',
    es: 'Crecimiento rápido',
    tr: 'Hızlı büyüme',
    fr: 'Croissance rapide',
  },
  pace_steady: {
    ru: 'Стабильный рост',
    en: 'Steady growth',
    uk: 'Стабільне зростання',
    de: 'Stetiges Wachstum',
    es: 'Crecimiento constante',
    tr: 'İstikrarlı büyüme',
    fr: 'Croissance stable',
  },
  pace_deep: {
    ru: 'Глубина и экспертиза',
    en: 'Depth and expertise',
    uk: 'Глибина та експертиза',
    de: 'Tiefe und Expertise',
    es: 'Profundidad y experiencia',
    tr: 'Derinlik ve uzmanlık',
    fr: 'Profondeur et expertise',
  },
  footer_tagline: {
    ru: 'Найди профессию своей мечты',
    en: 'Find your dream profession',
    uk: 'Знайди професію своєї мрії',
    de: 'Finde deinen Traumberuf',
    es: 'Encuentra tu profesión soñada',
    tr: 'Hayal kariyer yolunu bul',
    fr: 'Trouve ta profession de rêve',
  },
  career_badge: {
    ru: 'Научный подход · Основан на модели Holland RIASEC',
    en: 'Science-based · Built on the Holland RIASEC model',
    uk: 'Науковий підхід · Заснований на моделі Holland RIASEC',
    de: 'Wissenschaftlich fundiert · Basiert auf dem Holland-RIASEC-Modell',
    es: 'Enfoque científico · Basado en el modelo Holland RIASEC',
    tr: 'Bilimsel yaklaşım · Holland RIASEC modeline dayalı',
    fr: 'Approche scientifique · Basé sur le modèle Holland RIASEC',
  },
  career_step: {
    ru: 'Шаг',
    en: 'Step',
    uk: 'Крок',
    de: 'Schritt',
    es: 'Paso',
    tr: 'Adım',
    fr: 'Étape',
  },
  career_what_title: {
    ru: 'Что ты получишь?',
    en: 'What will you get?',
    uk: 'Що ти отримаєш?',
    de: 'Was wirst du bekommen?',
    es: '¿Qué obtendrás?',
    tr: 'Ne alacaksın?',
    fr: 'Que vas-tu obtenir ?',
  },
  career_what_sub: {
    ru: 'После прохождения теста ты получишь детальный профиль',
    en: 'After the test you will receive a detailed profile',
    uk: 'Після проходження тесту ти отримаєш детальний профіль',
    de: 'Nach dem Test erhältst du ein detailliertes Profil',
    es: 'Después del test recibirás un perfil detallado',
    tr: 'Testten sonra ayrıntılı bir profil alacaksın',
    fr: 'Après le test tu recevras un profil détaillé',
  },
  career_free_note: {
    ru: '✅ Бесплатно: профессия #4 из топа',
    en: '✅ Free: career #4 from your top',
    uk: '✅ Безкоштовно: професія #4 з топу',
    de: '✅ Kostenlos: Beruf #4 aus deinem Top',
    es: '✅ Gratis: carrera #4 de tu lista',
    tr: '✅ Ücretsiz: listenizden kariyer #4',
    fr: '✅ Gratuit: carrière #4 de ton top',
  },
  career_paid_note: {
    ru: '🔓 Полный доступ: все 8 разделов',
    en: '🔓 Full access: all 8 sections',
    uk: '🔓 Повний доступ: всі 8 розділів',
    de: '🔓 Vollzugriff: alle 8 Abschnitte',
    es: '🔓 Acceso completo: las 8 secciones',
    tr: '🔓 Tam erişim: tüm 8 bölüm',
    fr: '🔓 Accès complet: les 8 sections',
  },
  career_start_now: {
    ru: 'Начать тест',
    en: 'Start test',
    uk: 'Розпочати тест',
    de: 'Test starten',
    es: 'Iniciar test',
    tr: 'Testi başlat',
    fr: 'Commencer le test',
  },
  career_cta_title: {
    ru: 'Готов узнать кем ты должен стать?',
    en: 'Ready to discover who you are meant to be?',
    uk: 'Готовий дізнатись ким ти маєш стати?',
    de: 'Bereit zu entdecken, wer du sein sollst?',
    es: '¿Listo para descubrir quién estás destinado a ser?',
    tr: 'Kim olman gerektiğini keşfetmeye hazır mısın?',
    fr: 'Prêt à découvrir qui tu es censé être ?',
  },
  career_cta_sub: {
    ru: '8–10 минут. Результат на всю жизнь.',
    en: '8–10 minutes. Results for life.',
    uk: '8–10 хвилин. Результат на все життя.',
    de: '8–10 Minuten. Ergebnisse fürs Leben.',
    es: '8–10 minutos. Resultados para toda la vida.',
    tr: '8–10 dakika. Ömür boyu sonuçlar.',
    fr: '8–10 minutes. Des résultats pour la vie.',
  },
  test_analyzing: {
    ru: 'Анализируем твои ответы...',
    en: 'Analyzing your answers...',
    uk: 'Аналізуємо твої відповіді...',
    de: 'Analysieren deine Antworten...',
    es: 'Analizando tus respuestas...',
    tr: 'Cevapların analiz ediliyor...',
    fr: 'Analyse de tes réponses...',
  },
  test_analyzing_sub: {
    ru: 'Строим твой профиль',
    en: 'Building your profile',
    uk: 'Будуємо твій профіль',
    de: 'Erstelle dein Profil',
    es: 'Construyendo tu perfil',
    tr: 'Profilin oluşturuluyor',
    fr: 'Construction de ton profil',
  },

  // ── Hub page ──────────────────────────────────────────────────────────────
  hub_badge: {
    ru: 'Психологические тесты с научным подходом',
    en: 'Science-based psychological tests',
    uk: 'Психологічні тести з науковим підходом',
    de: 'Wissenschaftlich fundierte psychologische Tests',
    es: 'Tests psicológicos con enfoque científico',
    tr: 'Bilimsel yaklaşımlı psikolojik testler',
    fr: 'Tests psychologiques à approche scientifique',
  },
  hub_title_a: {
    ru: 'Познай себя —',
    en: 'Know yourself —',
    uk: 'Пізнай себе —',
    de: 'Erkenne dich —',
    es: 'Conócete —',
    tr: 'Kendini tanı —',
    fr: 'Connais-toi —',
  },
  hub_title_b: {
    ru: 'выбери путь',
    en: 'choose your path',
    uk: 'обери шлях',
    de: 'wähle deinen Weg',
    es: 'elige tu camino',
    tr: 'yolunu seç',
    fr: 'choisis ta voie',
  },
  hub_subtitle: {
    ru: 'Коллекция точных тестов которые помогут понять себя, выбрать профессию и построить карьеру',
    en: 'A collection of precise tests to help you understand yourself, choose a profession and build a career',
    uk: 'Колекція точних тестів які допоможуть зрозуміти себе, обрати професію та побудувати кар\'єру',
    de: 'Eine Sammlung präziser Tests, die dir helfen, dich zu verstehen, einen Beruf zu wählen und eine Karriere aufzubauen',
    es: 'Una colección de tests precisos para ayudarte a entenderte, elegir una profesión y construir una carrera',
    tr: 'Kendini anlamana, meslek seçmene ve kariyer inşa etmene yardımcı olacak hassas testler koleksiyonu',
    fr: 'Une collection de tests précis pour t\'aider à te comprendre, choisir une profession et construire une carrière',
  },
  hub_popular: {
    ru: 'Самый популярный',
    en: 'Most popular',
    uk: 'Найпопулярніший',
    de: 'Am beliebtesten',
    es: 'Más popular',
    tr: 'En popüler',
    fr: 'Le plus populaire',
  },
  hub_soon: {
    ru: 'Скоро',
    en: 'Coming soon',
    uk: 'Скоро',
    de: 'Demnächst',
    es: 'Próximamente',
    tr: 'Yakında',
    fr: 'Bientôt',
  },
  hub_questions: {
    ru: 'вопросов',
    en: 'questions',
    uk: 'питань',
    de: 'Fragen',
    es: 'preguntas',
    tr: 'soru',
    fr: 'questions',
  },
  hub_start: {
    ru: 'Начать',
    en: 'Start',
    uk: 'Почати',
    de: 'Starten',
    es: 'Empezar',
    tr: 'Başla',
    fr: 'Commencer',
  },
  hub_test_career_title: {
    ru: 'Тест на профессию',
    en: 'Career Test',
    uk: 'Тест на професію',
    de: 'Berufstest',
    es: 'Test de Carrera',
    tr: 'Kariyer Testi',
    fr: 'Test de Carrière',
  },
  hub_test_career_subtitle: {
    ru: 'Карьерный профиль',
    en: 'Career Profile',
    uk: 'Кар\'єрний профіль',
    de: 'Karriereprofil',
    es: 'Perfil de Carrera',
    tr: 'Kariyer Profili',
    fr: 'Profil de Carrière',
  },
  hub_test_career_desc: {
    ru: 'Узнай какие профессии подходят именно тебе по модели Holland RIASEC',
    en: 'Find out which careers suit you best using the Holland RIASEC model',
    uk: 'Дізнайся які професії підходять саме тобі за моделлю Holland RIASEC',
    de: 'Finde heraus, welche Berufe am besten zu dir passen – nach dem Holland-RIASEC-Modell',
    es: 'Descubre qué carreras se adaptan mejor a ti según el modelo Holland RIASEC',
    tr: 'Holland RIASEC modeline göre sana en uygun meslekleri keşfet',
    fr: 'Découvre quelles carrières te correspondent le mieux avec le modèle Holland RIASEC',
  },
  hub_test_career_f1: { ru: 'Топ-7 профессий', en: 'Top-7 careers', uk: 'Топ-7 професій', de: 'Top-7-Berufe', es: 'Top-7 carreras', tr: 'En iyi 7 kariyer', fr: 'Top-7 carrières' },
  hub_test_career_f2: { ru: 'Склад мышления', en: 'Thinking style', uk: 'Склад мислення', de: 'Denkstil', es: 'Estilo de pensamiento', tr: 'Düşünme tarzı', fr: 'Style de pensée' },
  hub_test_career_f3: { ru: 'Карьерный архетип', en: 'Career archetype', uk: 'Кар\'єрний архетип', de: 'Karrierearchetyp', es: 'Arquetipo de carrera', tr: 'Kariyer arketipi', fr: 'Archétype de carrière' },
  hub_test_career_f4: { ru: 'Куда учиться', en: 'Where to study', uk: 'Куди вчитися', de: 'Wo studieren', es: 'Dónde estudiar', tr: 'Nerede okumak', fr: 'Où étudier' },
  hub_test_iq_title: { ru: 'IQ тест', en: 'IQ Test', uk: 'IQ тест', de: 'IQ-Test', es: 'Test de IQ', tr: 'IQ Testi', fr: 'Test de QI' },
  hub_test_iq_subtitle: { ru: 'Интеллект и логика', en: 'Intelligence & Logic', uk: 'Інтелект і логіка', de: 'Intelligenz & Logik', es: 'Inteligencia y lógica', tr: 'Zeka ve Mantık', fr: 'Intelligence et Logique' },
  hub_test_iq_desc: {
    ru: 'Измерь свой коэффициент интеллекта с помощью научных задач',
    en: 'Measure your intelligence quotient with scientific tasks',
    uk: 'Виміряй свій коефіцієнт інтелекту за допомогою наукових завдань',
    de: 'Miss deinen Intelligenzquotienten mit wissenschaftlichen Aufgaben',
    es: 'Mide tu cociente de inteligencia con tareas científicas',
    tr: 'Bilimsel görevlerle zeka puanını ölç',
    fr: 'Mesure ton quotient intellectuel avec des tâches scientifiques',
  },
  hub_test_iq_f1: { ru: 'Числовой интеллект', en: 'Numerical intelligence', uk: 'Числовий інтелект', de: 'Numerische Intelligenz', es: 'Inteligencia numérica', tr: 'Sayısal zeka', fr: 'Intelligence numérique' },
  hub_test_iq_f2: { ru: 'Логическое мышление', en: 'Logical thinking', uk: 'Логічне мислення', de: 'Logisches Denken', es: 'Pensamiento lógico', tr: 'Mantıksal düşünme', fr: 'Pensée logique' },
  hub_test_iq_f3: { ru: 'Пространственный IQ', en: 'Spatial IQ', uk: 'Просторовий IQ', de: 'Räumliches IQ', es: 'IQ espacial', tr: 'Uzamsal IQ', fr: 'QI spatial' },
  hub_test_iq_f4: { ru: 'Вербальный анализ', en: 'Verbal analysis', uk: 'Вербальний аналіз', de: 'Verbale Analyse', es: 'Análisis verbal', tr: 'Sözel analiz', fr: 'Analyse verbale' },
  hub_test_mbti_title: { ru: 'Тест личности', en: 'Personality Test', uk: 'Тест особистості', de: 'Persönlichkeitstest', es: 'Test de Personalidad', tr: 'Kişilik Testi', fr: 'Test de Personnalité' },
  hub_test_mbti_subtitle: { ru: 'MBTI профиль', en: 'MBTI Profile', uk: 'MBTI профіль', de: 'MBTI-Profil', es: 'Perfil MBTI', tr: 'MBTI Profili', fr: 'Profil MBTI' },
  hub_test_mbti_desc: {
    ru: 'Определи свой тип личности из 16 возможных архетипов',
    en: 'Determine your personality type from 16 possible archetypes',
    uk: 'Визнач свій тип особистості з 16 можливих архетипів',
    de: 'Bestimme deinen Persönlichkeitstyp aus 16 möglichen Archetypen',
    es: 'Determina tu tipo de personalidad de entre 16 arquetipos posibles',
    tr: '16 olası arketipten kişilik tipini belirle',
    fr: 'Détermine ton type de personnalité parmi 16 archétypes possibles',
  },
  hub_test_mbti_f1: { ru: '16 типов личности', en: '16 personality types', uk: '16 типів особистості', de: '16 Persönlichkeitstypen', es: '16 tipos de personalidad', tr: '16 kişilik tipi', fr: '16 types de personnalité' },
  hub_test_mbti_f2: { ru: 'Сильные стороны', en: 'Strengths', uk: 'Сильні сторони', de: 'Stärken', es: 'Fortalezas', tr: 'Güçlü yönler', fr: 'Points forts' },
  hub_test_mbti_f3: { ru: 'Стиль общения', en: 'Communication style', uk: 'Стиль спілкування', de: 'Kommunikationsstil', es: 'Estilo de comunicación', tr: 'İletişim tarzı', fr: 'Style de communication' },
  hub_test_mbti_f4: { ru: 'Совместимость', en: 'Compatibility', uk: 'Сумісність', de: 'Kompatibilität', es: 'Compatibilidad', tr: 'Uyumluluk', fr: 'Compatibilité' },

  // ── Career page — "What you get" features ────────────────────────────────
  career_f1_title: { ru: 'Топ-7 профессий', en: 'Top-7 careers', uk: 'Топ-7 професій', de: 'Top-7-Berufe', es: 'Top-7 carreras', tr: 'En iyi 7 kariyer', fr: 'Top-7 carrières' },
  career_f1_desc: { ru: 'С процентом совпадения для каждой', en: 'With match percentage for each', uk: 'З відсотком збігу для кожної', de: 'Mit Übereinstimmungsprozent für jeden', es: 'Con porcentaje de coincidencia', tr: 'Her biri için uyum yüzdesi ile', fr: 'Avec pourcentage de correspondance' },
  career_f2_title: { ru: 'Склад мышления', en: 'Thinking style', uk: 'Склад мислення', de: 'Denkstil', es: 'Estilo de pensamiento', tr: 'Düşünme tarzı', fr: 'Style de pensée' },
  career_f2_desc: { ru: 'Аналитик, Творец, Стратег или Эмпат', en: 'Analyst, Creator, Strategist or Empath', uk: 'Аналітик, Творець, Стратег або Емпат', de: 'Analyst, Schöpfer, Stratege oder Empath', es: 'Analista, Creador, Estratega o Empático', tr: 'Analist, Yaratıcı, Stratejist veya Empatik', fr: 'Analyste, Créateur, Stratège ou Empathique' },
  career_f3_title: { ru: 'Склад характера', en: 'Character type', uk: 'Склад характеру', de: 'Charaktertyp', es: 'Tipo de carácter', tr: 'Karakter tipi', fr: 'Type de caractère' },
  career_f3_desc: { ru: 'Интроверт, Экстраверт или Амбиверт', en: 'Introvert, Extrovert or Ambivert', uk: 'Інтроверт, Екстраверт або Амбіверт', de: 'Introvertiert, Extrovertiert oder Ambivertiert', es: 'Introvertido, Extrovertido o Ambivertido', tr: 'İçedönük, Dışadönük veya Ambiverd', fr: 'Introverti, Extraverti ou Ambivert' },
  career_f4_title: { ru: 'Уровень лидерства', en: 'Leadership level', uk: 'Рівень лідерства', de: 'Führungsebene', es: 'Nivel de liderazgo', tr: 'Liderlik seviyesi', fr: 'Niveau de leadership' },
  career_f4_desc: { ru: 'От Исполнителя до Визионера', en: 'From Executor to Visionary', uk: 'Від Виконавця до Візіонера', de: 'Vom Ausführenden zum Visionär', es: 'De Ejecutor a Visionario', tr: 'Uygulayıcıdan Vizyonere kadar', fr: 'De l\'Exécutant au Visionnaire' },
  career_f5_title: { ru: 'Карьерный архетип', en: 'Career archetype', uk: 'Кар\'єрний архетип', de: 'Karrierearchetyp', es: 'Arquetipo de carrera', tr: 'Kariyer arketipi', fr: 'Archétype de carrière' },
  career_f5_desc: { ru: 'Исследователь, Строитель, Создатель...', en: 'Explorer, Builder, Creator…', uk: 'Дослідник, Будівельник, Творець...', de: 'Entdecker, Erbauer, Schöpfer...', es: 'Explorador, Constructor, Creador...', tr: 'Kaşif, Yapıcı, Yaratıcı...', fr: 'Explorateur, Bâtisseur, Créateur...' },
  career_f6_title: { ru: 'Сильные стороны', en: 'Strengths', uk: 'Сильні сторони', de: 'Stärken', es: 'Fortalezas', tr: 'Güçlü yönler', fr: 'Points forts' },
  career_f6_desc: { ru: 'И зоны роста которые стоит развить', en: 'And growth areas to develop', uk: 'І зони зростання які варто розвивати', de: 'Und Wachstumsbereiche die es zu entwickeln gilt', es: 'Y áreas de crecimiento que vale la pena desarrollar', tr: 'Ve geliştirilmesi gereken büyüme alanları', fr: 'Et les zones de croissance à développer' },
  career_f7_title: { ru: 'Куда идти учиться', en: 'Where to study', uk: 'Куди йти вчитися', de: 'Wo man studieren sollte', es: 'Dónde estudiar', tr: 'Nerede okumak', fr: 'Où étudier' },
  career_f7_desc: { ru: 'Направления, специальности, платформы', en: 'Directions, specialties, platforms', uk: 'Напрямки, спеціальності, платформи', de: 'Richtungen, Fachbereiche, Plattformen', es: 'Direcciones, especialidades, plataformas', tr: 'Yönler, uzmanlıklar, platformlar', fr: 'Directions, spécialités, plateformes' },
  career_f8_title: { ru: 'Первый шаг', en: 'First step', uk: 'Перший крок', de: 'Erster Schritt', es: 'Primer paso', tr: 'İlk adım', fr: 'Premier pas' },
  career_f8_desc: { ru: 'Конкретное действие прямо сейчас', en: 'A concrete action right now', uk: 'Конкретна дія прямо зараз', de: 'Eine konkrete Aktion jetzt sofort', es: 'Una acción concreta ahora mismo', tr: 'Şu an atılacak somut bir adım', fr: 'Une action concrète maintenant' },

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonial_1_text: {
    ru: 'Всегда думал что пойду в юристы как родители. Тест показал Data Scientist 94% — теперь учусь на Computer Science и обожаю это!',
    en: 'I always thought I\'d follow my parents into law. The test showed Data Scientist at 94% — now I\'m studying Computer Science and I love it!',
    uk: 'Завжди думав що піду в юристи як батьки. Тест показав Data Scientist 94% — тепер навчаюсь на Computer Science і обожнюю це!',
    de: 'Ich dachte immer, ich würde wie meine Eltern Anwalt werden. Der Test zeigte Data Scientist 94% — jetzt studiere ich Informatik und liebe es!',
    es: 'Siempre pensé que seguiría los pasos de mis padres en derecho. El test mostró Data Scientist 94% — ¡ahora estudio Informática y me encanta!',
    tr: 'Hep ebeveynlerim gibi avukat olacağımı düşündüm. Test %94 ile Data Scientist gösterdi — şimdi Bilgisayar Bilimleri okuyorum ve çok seviyorum!',
    fr: 'J\'ai toujours pensé suivre mes parents dans le droit. Le test a montré Data Scientist à 94% — maintenant j\'étudie l\'informatique et j\'adore ça !',
  },
  testimonial_1_name: { ru: 'Миша, 19 лет', en: 'Mike, 19', uk: 'Міша, 19 років', de: 'Misha, 19', es: 'Misha, 19', tr: 'Misha, 19', fr: 'Misha, 19 ans' },
  testimonial_2_text: {
    ru: 'Я не знала куда поступать. После теста поняла что мой архетип — Создатель. Поступила на UX-дизайн и нашла себя.',
    en: 'I had no idea where to apply. After the test I realized my archetype is Creator. I enrolled in UX design and found myself.',
    uk: 'Я не знала куди вступати. Після тесту зрозуміла що мій архетип — Творець. Вступила на UX-дизайн і знайшла себе.',
    de: 'Ich wusste nicht, wo ich mich bewerben sollte. Nach dem Test erkannte ich, dass mein Archetyp Schöpferin ist. Ich schrieb mich für UX-Design ein und fand mich.',
    es: 'No sabía dónde matricularme. Después del test me di cuenta de que mi arquetipo es Creadora. Me matriculé en diseño UX y me encontré a mí misma.',
    tr: 'Nereye başvuracağımı bilmiyordum. Testten sonra arketipimin Yaratıcı olduğunu anladım. UX tasarımına kaydoldum ve kendimi buldum.',
    fr: 'Je ne savais pas où m\'inscrire. Après le test j\'ai réalisé que mon archétype est Créatrice. Je me suis inscrite en UX design et je me suis trouvée.',
  },
  testimonial_2_name: { ru: 'Саша, 18 лет', en: 'Alex, 18', uk: 'Саша, 18 років', de: 'Sasha, 18', es: 'Sasha, 18', tr: 'Sasha, 18', fr: 'Sasha, 18 ans' },
  testimonial_3_text: {
    ru: 'Тест точнее чем 3 визита к профориентологу. Особенно понравился раздел про склад лидерства.',
    en: 'More accurate than 3 visits to a career counselor. Especially liked the leadership level section.',
    uk: 'Тест точніший ніж 3 візити до профорієнтолога. Особливо сподобався розділ про схильність до лідерства.',
    de: 'Genauer als 3 Besuche beim Berufsberater. Der Abschnitt über die Führungsebene hat mir besonders gut gefallen.',
    es: 'Más preciso que 3 visitas a un orientador vocacional. Especialmente me gustó la sección de nivel de liderazgo.',
    tr: 'Bir kariyer danışmanına 3 ziyaretten daha doğru. Özellikle liderlik seviyesi bölümünü beğendim.',
    fr: 'Plus précis que 3 visites chez un conseiller d\'orientation. J\'ai particulièrement aimé la section sur le niveau de leadership.',
  },
  testimonial_3_name: { ru: 'Дима, 22 года', en: 'Dima, 22', uk: 'Діма, 22 роки', de: 'Dima, 22', es: 'Dima, 22', tr: 'Dima, 22', fr: 'Dima, 22 ans' },

  career_trust_bar: {
    ru: 'Основано на модели Holland (RIASEC) • Используется в 70+ странах • Применяется в профориентации и HR',
    en: 'Based on the Holland (RIASEC) model • Used in 70+ countries • Applied in career guidance and HR',
    uk: 'Засновано на моделі Holland (RIASEC) • Використовується у 70+ країнах • Застосовується в профорієнтації та HR',
    de: 'Basiert auf dem Holland (RIASEC)-Modell • In 70+ Ländern eingesetzt • In Berufsberatung und HR angewendet',
    es: 'Basado en el modelo Holland (RIASEC) • Usado en 70+ países • Aplicado en orientación vocacional y RRHH',
    tr: 'Holland (RIASEC) modeline dayalı • 70\'ten fazla ülkede kullanılıyor • Kariyer rehberliği ve İK\'da uygulanıyor',
    fr: 'Basé sur le modèle Holland (RIASEC) • Utilisé dans 70+ pays • Appliqué en orientation professionnelle et RH',
  },

  // ── Insight screens (shown every 7 questions) ─────────────────────────────
  insight_btn: {
    ru: 'Продолжить', en: 'Continue', uk: 'Продовжити',
    de: 'Weiter', es: 'Continuar', tr: 'Devam', fr: 'Continuer',
  },
  insight_subheading: {
    ru: 'Мы уже видим твой профиль',
    en: 'We can already see your profile',
    uk: 'Ми вже бачимо твій профіль',
    de: 'Wir sehen bereits dein Profil',
    es: 'Ya podemos ver tu perfil',
    tr: 'Profilini zaten görebiliyoruz',
    fr: 'Nous pouvons déjà voir ton profil',
  },
  insight_top_pct: {
    ru: 'Топ', en: 'Top', uk: 'Топ', de: 'Top', es: 'Top', tr: 'İlk', fr: 'Top',
  },
  insight_t_analytical_title: {
    ru: 'Ты мыслишь как учёный',
    en: 'You think like a scientist',
    uk: 'Ти мислиш як вчений',
    de: 'Du denkst wie ein Wissenschaftler',
    es: 'Piensas como un científico',
    tr: 'Bir bilim insanı gibi düşünüyorsun',
    fr: 'Tu penses comme un scientifique',
  },
  insight_t_analytical_desc: {
    ru: 'Твои ответы раскрывают острый аналитический ум. Ты замечаешь закономерности и связи, которые большинство людей упускает.',
    en: 'Your answers reveal a sharp analytical mind. You notice patterns and connections that most people miss.',
    uk: 'Твої відповіді розкривають гострий аналітичний розум. Ти помічаєш закономірності та зв\'язки, які більшість людей не бачить.',
    de: 'Deine Antworten offenbaren einen scharfen analytischen Geist. Du erkennst Muster und Zusammenhänge, die die meisten Menschen übersehen.',
    es: 'Tus respuestas revelan una mente analítica aguda. Notas patrones y conexiones que la mayoría de las personas pasa por alto.',
    tr: 'Cevapların keskin bir analitik zihni ortaya koyuyor. Çoğu insanın gözden kaçırdığı kalıpları ve bağlantıları fark ediyorsun.',
    fr: 'Tes réponses révèlent un esprit analytique acéré. Tu remarques des schémas et connexions que la plupart des gens manquent.',
  },
  insight_t_creative_title: {
    ru: 'У тебя творческое мышление',
    en: 'You have a creative mind',
    uk: 'У тебе творче мислення',
    de: 'Du hast einen kreativen Geist',
    es: 'Tienes una mente creativa',
    tr: 'Yaratıcı bir zihne sahipsin',
    fr: 'Tu as un esprit créatif',
  },
  insight_t_creative_desc: {
    ru: 'Твои ответы показывают яркое творческое мышление и богатое воображение. Ты легко находишь нестандартные решения там, где другие зашли в тупик.',
    en: 'Your answers show vivid creative thinking and rich imagination. You easily find unconventional solutions where others are stuck.',
    uk: 'Твої відповіді показують яскраве творче мислення та багату уяву. Ти легко знаходиш нестандартні рішення там, де інші зайшли в глухий кут.',
    de: 'Deine Antworten zeigen lebhaftes kreatives Denken und reiche Vorstellungskraft. Du findest leicht unkonventionelle Lösungen, wo andere feststecken.',
    es: 'Tus respuestas muestran un pensamiento creativo vívido y una imaginación rica. Encuentras fácilmente soluciones poco convencionales donde otros se quedan atascados.',
    tr: 'Cevapların canlı yaratıcı düşünceyi ve zengin hayal gücünü gösteriyor. Başkalarının takıldığı yerde kolayca alışılmadık çözümler buluyorsun.',
    fr: 'Tes réponses montrent une pensée créative vive et une riche imagination. Tu trouves facilement des solutions non conventionnelles là où les autres sont bloqués.',
  },
  insight_t_social_title: {
    ru: 'Ты глубоко понимаешь людей',
    en: 'You understand people deeply',
    uk: 'Ти глибоко розумієш людей',
    de: 'Du verstehst Menschen tief',
    es: 'Entiendes a las personas profundamente',
    tr: 'İnsanları derinden anlıyorsun',
    fr: 'Tu comprends les gens en profondeur',
  },
  insight_t_social_desc: {
    ru: 'Твои ответы раскрывают исключительную эмпатию и социальный интеллект. Ты чувствуешь эмоции других людей и легко строишь настоящие связи.',
    en: 'Your answers reveal exceptional empathy and social intelligence. You sense other people\'s emotions and build genuine connections effortlessly.',
    uk: 'Твої відповіді розкривають виняткову емпатію та соціальний інтелект. Ти відчуваєш емоції інших людей і легко будуєш справжні зв\'язки.',
    de: 'Deine Antworten offenbaren außergewöhnliche Empathie und soziale Intelligenz. Du spürst die Emotionen anderer Menschen und baust mühelos echte Verbindungen auf.',
    es: 'Tus respuestas revelan empatía excepcional e inteligencia social. Sientes las emociones de otras personas y construyes conexiones genuinas sin esfuerzo.',
    tr: 'Cevapların olağanüstü empati ve sosyal zekayı ortaya koyuyor. Diğer insanların duygularını hissediyor ve zahmetsizce gerçek bağlantılar kuruyorsun.',
    fr: 'Tes réponses révèlent une empathie exceptionnelle et une intelligence sociale. Tu ressens les émotions des autres et construis des liens authentiques sans effort.',
  },
  insight_t_strategic_title: {
    ru: 'Ты мыслишь как лидер',
    en: 'You think like a leader',
    uk: 'Ти мислиш як лідер',
    de: 'Du denkst wie ein Anführer',
    es: 'Piensas como un líder',
    tr: 'Bir lider gibi düşünüyorsun',
    fr: 'Tu penses comme un leader',
  },
  insight_t_strategic_desc: {
    ru: 'Твои ответы раскрывают стратегическое мышление и природные лидерские способности. Ты видишь картину целиком и знаешь как двигаться к цели.',
    en: 'Your answers reveal strategic thinking and natural leadership abilities. You see the big picture and know how to move toward a goal.',
    uk: 'Твої відповіді розкривають стратегічне мислення та природні лідерські здібності. Ти бачиш велику картину і знаєш як рухатися до мети.',
    de: 'Deine Antworten offenbaren strategisches Denken und natürliche Führungsqualitäten. Du siehst das Gesamtbild und weißt, wie du auf ein Ziel zusteuern kannst.',
    es: 'Tus respuestas revelan pensamiento estratégico y habilidades naturales de liderazgo. Ves el panorama general y sabes cómo avanzar hacia un objetivo.',
    tr: 'Cevapların stratejik düşünceyi ve doğal liderlik yeteneklerini ortaya koyuyor. Büyük resmi görüyor ve hedefe nasıl ilerleyeceğini biliyorsun.',
    fr: 'Tes réponses révèlent une pensée stratégique et des capacités naturelles de leadership. Tu vois l\'ensemble et sais comment avancer vers un objectif.',
  },
  insight_t_practical_title: {
    ru: 'Ты прирождённый решатель задач',
    en: 'You\'re a natural problem-solver',
    uk: 'Ти природжений вирішувач проблем',
    de: 'Du bist ein geborener Problemlöser',
    es: 'Eres un solucionador de problemas nato',
    tr: 'Doğal bir problem çözücüsün',
    fr: 'Tu es un résolveur de problèmes né',
  },
  insight_t_practical_desc: {
    ru: 'Твои ответы показывают исключительный практический интеллект. Ты превращаешь идеи в реальные результаты и добиваешься цели там, где другие сдаются.',
    en: 'Your answers show exceptional practical intelligence. You turn ideas into real results and achieve goals where others give up.',
    uk: 'Твої відповіді показують виняткові практичний інтелект. Ти перетворюєш ідеї на реальні результати і досягаєш мети там, де інші здаються.',
    de: 'Deine Antworten zeigen außergewöhnliche praktische Intelligenz. Du verwandelst Ideen in echte Ergebnisse und erreichst Ziele, wo andere aufgeben.',
    es: 'Tus respuestas muestran una inteligencia práctica excepcional. Conviertes ideas en resultados reales y alcanzas metas donde otros se rinden.',
    tr: 'Cevapların olağanüstü pratik zekayı gösteriyor. Fikirleri gerçek sonuçlara dönüştürüyor ve başkalarının vazgeçtiği yerde hedeflere ulaşıyorsun.',
    fr: 'Tes réponses montrent une intelligence pratique exceptionnelle. Tu transformes les idées en résultats concrets et atteins des objectifs là où les autres abandonnent.',
  },
}

export function t(key: UIKey, locale: Locale): string {
  return UI[key]?.[locale] ?? UI[key]?.['en'] ?? key
}
