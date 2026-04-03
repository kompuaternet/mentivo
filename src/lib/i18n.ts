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
  | 'results_rankings_title'
  | 'results_only_one_of_7'
  | 'results_strong_match'
  | 'results_better_matches'
  | 'results_almost_best'
  | 'results_full_ready_title'
  | 'results_full_ready_sub'
  | 'results_saved_24h'
  | 'results_no_signup'
  | 'results_instant_access'
  | 'results_lifetime_access'
  | 'results_already_tested'
  | 'results_helped_thousands'
  | 'results_profession_open_label'
  | 'results_rare_profile_title'
  | 'results_rare_profile_sub'
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
  | 'riasec_caption'
  | 'preview_title'
  | 'preview_sub'
  | 'insight_btn'
  | 'insight_subheading'
  | 'insight_checkpoint_1'
  | 'insight_checkpoint_2'
  | 'insight_checkpoint_3'
  | 'insight_analyzing'
  | 'insight_wow'
  | 'insight_confirm_q'
  | 'insight_confirm_yes'
  | 'insight_confirm_partly'
  | 'insight_t_analytical_title' | 'insight_t_analytical_desc'
  | 'insight_t_creative_title' | 'insight_t_creative_desc'
  | 'insight_t_social_title' | 'insight_t_social_desc'
  | 'insight_t_strategic_title' | 'insight_t_strategic_desc'
  | 'insight_t_practical_title' | 'insight_t_practical_desc'
  | 'insight_top_pct'
  | 'test_micro_hint'
  | 'test_analysis_forming'
  | 'test_mins_left'

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
    ru: 'Тест использует модель Holland (RIASEC) — одну из наиболее изученных методологий профориентации, разработанную в 1959 году и применяемую специалистами по всему миру.',
    en: 'This test uses the Holland (RIASEC) model — one of the most researched career assessment frameworks, developed in 1959 and used by career professionals worldwide.',
    uk: 'Тест використовує модель Holland (RIASEC) — одну з найбільш досліджених методологій профорієнтації, розроблену в 1959 році та застосовувану фахівцями по всьому світу.',
    de: 'Dieser Test verwendet das Holland (RIASEC)-Modell — eines der am besten erforschten Berufsberatungskonzepte, entwickelt 1959 und weltweit von Karriereberatern eingesetzt.',
    es: 'Este test utiliza el modelo Holland (RIASEC) — una de las metodologías de orientación vocacional más estudiadas, desarrollada en 1959 y utilizada por profesionales en todo el mundo.',
    tr: 'Bu test, Holland (RIASEC) modelini kullanmaktadır — 1959\'da geliştirilen ve dünya genelinde kariyer uzmanları tarafından kullanılan en çok araştırılan kariyer değerlendirme çerçevelerinden biri.',
    fr: 'Ce test utilise le modèle Holland (RIASEC) — l\'un des cadres d\'orientation professionnelle les plus étudiés, développé en 1959 et utilisé par des professionnels du monde entier.',
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
    ru: 'Ты видишь только #4 — твои ТОП-3 скрыты',
    en: 'You see only #4 — your TOP-3 are hidden',
    uk: 'Ти бачиш лише #4 — твій ТОП-3 прихований',
    de: 'Du siehst nur #4 — deine TOP-3 sind verborgen',
    es: 'Solo ves el #4 — tu TOP-3 está oculto',
    tr: 'Yalnızca #4\'ü görüyorsun — İLK 3\'ün gizli',
    fr: 'Tu ne vois que le #4 — ton TOP-3 est caché',
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
    ru: 'Разблокировать весь рейтинг',
    en: 'Unlock full ranking',
    uk: 'Розблокувати весь рейтинг',
    de: 'Vollständiges Ranking freischalten',
    es: 'Desbloquear clasificación completa',
    tr: 'Tam sıralamayı aç',
    fr: 'Débloquer le classement complet',
  },
  results_rankings_title: {
    ru: 'Твой рейтинг профессий',
    en: 'Your career rankings',
    uk: 'Твій рейтинг професій',
    de: 'Deine Berufsrangliste',
    es: 'Tu clasificación de carreras',
    tr: 'Kariyer sıralaman',
    fr: 'Ton classement de carrières',
  },
  results_only_one_of_7: {
    ru: 'Это только 1 из 7 профессий, которые тебе подходят',
    en: 'This is just 1 of 7 careers that suit you',
    uk: 'Це лише 1 з 7 професій, які тобі підходять',
    de: 'Dies ist nur 1 von 7 Berufen, die zu dir passen',
    es: 'Esta es solo 1 de 7 carreras que te corresponden',
    tr: 'Bu sana uygun 7 kariyerden sadece 1\'i',
    fr: 'C\'est juste 1 des 7 carrières qui te correspondent',
  },
  results_almost_best: {
    ru: 'Ты почти у лучших совпадений',
    en: 'You\'re close to your best matches',
    uk: 'Ти майже у найкращих збігів',
    de: 'Du bist nah an deinen besten Übereinstimmungen',
    es: 'Estás cerca de tus mejores coincidencias',
    tr: 'En iyi eşleşmelerine çok yakınsın',
    fr: 'Tu es presque à tes meilleures correspondances',
  },
  results_strong_match: {
    ru: 'Входит в сильные совпадения',
    en: 'Among your strong matches',
    uk: 'Входить у сильні збіги',
    de: 'Unter deinen starken Übereinstimmungen',
    es: 'Entre tus fuertes coincidencias',
    tr: 'Güçlü eşleşmelerin arasında',
    fr: 'Parmi tes fortes correspondances',
  },
  results_better_matches: {
    ru: 'Есть варианты с ещё более высоким совпадением',
    en: 'There are careers with an even higher match',
    uk: 'Є варіанти з ще вищим збігом',
    de: 'Es gibt Berufe mit noch höherer Übereinstimmung',
    es: 'Hay carreras con una coincidencia aún mayor',
    tr: 'Daha yüksek eşleşmeli kariyerler var',
    fr: 'Il y a des carrières avec une correspondance encore plus élevée',
  },
  results_full_ready_title: {
    ru: 'Самое точное совпадение уже найдено',
    en: 'Your best career match is already found',
    uk: 'Найточніший збіг вже знайдено',
    de: 'Deine beste Karriereübereinstimmung ist gefunden',
    es: 'Tu mejor coincidencia de carrera ya está encontrada',
    tr: 'En iyi kariyer eşleşmen zaten bulundu',
    fr: 'Ta meilleure correspondance de carrière est déjà trouvée',
  },
  results_full_ready_sub: {
    ru: 'Осталось открыть полный рейтинг и увидеть лучшие варианты',
    en: 'Just open the full ranking to see your best options',
    uk: 'Залишилося відкрити повний рейтинг і побачити кращі варіанти',
    de: 'Öffne das vollständige Ranking, um deine besten Optionen zu sehen',
    es: 'Solo abre el ranking completo para ver tus mejores opciones',
    tr: 'En iyi seçeneklerini görmek için tam sıralamayı aç',
    fr: 'Il suffit d\'ouvrir le classement complet pour voir tes meilleures options',
  },
  results_saved_24h: {
    ru: 'Результат будет доступен ещё',
    en: 'Result available for another',
    uk: 'Результат буде доступний ще',
    de: 'Ergebnis noch verfügbar für',
    es: 'Resultado disponible durante',
    tr: 'Sonuç daha şu kadar süre mevcut:',
    fr: 'Résultat disponible encore',
  },
  results_no_signup: {
    ru: 'Без регистрации',
    en: 'No sign-up',
    uk: 'Без реєстрації',
    de: 'Ohne Registrierung',
    es: 'Sin registro',
    tr: 'Kayıt gerektirmez',
    fr: 'Sans inscription',
  },
  results_instant_access: {
    ru: 'Мгновенный доступ после оплаты',
    en: 'Instant access after payment',
    uk: 'Миттєвий доступ після оплати',
    de: 'Sofortiger Zugang nach Zahlung',
    es: 'Acceso instantáneo tras el pago',
    tr: 'Ödemeden sonra anında erişim',
    fr: 'Accès instantané après paiement',
  },
  results_lifetime_access: {
    ru: 'Пожизненный доступ',
    en: 'Lifetime access',
    uk: 'Довічний доступ',
    de: 'Lebenslanger Zugang',
    es: 'Acceso de por vida',
    tr: 'Ömür boyu erişim',
    fr: 'Accès à vie',
  },
  results_already_tested: {
    ru: 'Ты уже прошёл тест — осталось только открыть результат',
    en: 'You\'ve already completed the test — just open the result',
    uk: 'Ти вже пройшов тест — залишилося лише відкрити результат',
    de: 'Du hast den Test bereits abgeschlossen — öffne einfach das Ergebnis',
    es: 'Ya completaste el test — solo abre el resultado',
    tr: 'Testi zaten tamamladın — sadece sonucu aç',
    fr: 'Tu as déjà terminé le test — il ne reste plus qu\'à ouvrir le résultat',
  },
  results_helped_thousands: {
    ru: 'Более 12 000 человек уже открыли свой рейтинг',
    en: 'Over 12,000 people have already unlocked their ranking',
    uk: 'Понад 12 000 людей вже відкрили свій рейтинг',
    de: 'Über 12.000 Menschen haben ihr Ranking bereits geöffnet',
    es: 'Más de 12.000 personas ya desbloquearon su clasificación',
    tr: '12.000\'den fazla kişi sıralamasını zaten açtı',
    fr: 'Plus de 12 000 personnes ont déjà débloqué leur classement',
  },
  results_profession_open_label: {
    ru: 'Открыто',
    en: 'Open',
    uk: 'Відкрито',
    de: 'Geöffnet',
    es: 'Abierto',
    tr: 'Açık',
    fr: 'Ouvert',
  },
  results_rare_profile_title: {
    ru: 'У тебя редкий профиль с точными совпадениями',
    en: 'You have a rare profile with precise matches',
    uk: 'У тебе рідкісний профіль з точними збігами',
    de: 'Du hast ein seltenes Profil mit präzisen Übereinstimmungen',
    es: 'Tienes un perfil raro con coincidencias precisas',
    tr: 'Hassas eşleşmelerle nadir bir profiliniz var',
    fr: 'Tu as un profil rare avec des correspondances précises',
  },
  results_rare_profile_sub: {
    ru: 'Такие результаты встречаются редко',
    en: 'Results like these are uncommon',
    uk: 'Такі результати трапляються рідко',
    de: 'Solche Ergebnisse sind selten',
    es: 'Resultados como estos son poco comunes',
    tr: 'Bu tür sonuçlar nadirdir',
    fr: 'De tels résultats sont rares',
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

  riasec_caption: {
    ru: 'Модель RIASEC: 6 типов профессиональных интересов',
    en: 'RIASEC model: 6 types of professional interests',
    uk: 'Модель RIASEC: 6 типів професійних інтересів',
    de: 'RIASEC-Modell: 6 Arten beruflicher Interessen',
    es: 'Modelo RIASEC: 6 tipos de intereses profesionales',
    tr: 'RIASEC modeli: 6 tür mesleki ilgi',
    fr: 'Modèle RIASEC : 6 types d\'intérêts professionnels',
  },
  preview_title: {
    ru: 'Как будет выглядеть твой результат',
    en: 'What your result will look like',
    uk: 'Як виглядатиме твій результат',
    de: 'Wie dein Ergebnis aussehen wird',
    es: 'Cómo se verá tu resultado',
    tr: 'Sonucun nasıl görünecek',
    fr: 'À quoi ressemblera ton résultat',
  },
  preview_sub: {
    ru: 'Персональный профиль с разбором сильных сторон',
    en: 'Personal profile with strengths breakdown',
    uk: 'Персональний профіль з розбором сильних сторін',
    de: 'Persönliches Profil mit Analyse der Stärken',
    es: 'Perfil personal con análisis de fortalezas',
    tr: 'Güçlü yönlerin analiziyle kişisel profil',
    fr: 'Profil personnel avec analyse des points forts',
  },

  // ── Insight screens (shown every 7 questions) ─────────────────────────────
  insight_btn: {
    ru: 'Продолжить тест', en: 'Continue the test', uk: 'Продовжити тест',
    de: 'Test fortsetzen', es: 'Continuar el test', tr: 'Teste devam et', fr: 'Continuer le test',
  },
  insight_subheading: {
    ru: 'Твои ответы уже формируют твой профиль',
    en: 'Your answers are already shaping your profile',
    uk: 'Твої відповіді вже формують твій профіль',
    de: 'Deine Antworten formen bereits dein Profil',
    es: 'Tus respuestas ya están formando tu perfil',
    tr: 'Cevapların zaten profilini şekillendiriyor',
    fr: 'Tes réponses façonnent déjà ton profil',
  },
  insight_checkpoint_1: {
    ru: 'Первый паттерн обнаружен',
    en: 'First pattern detected',
    uk: 'Перший паттерн виявлено',
    de: 'Erstes Muster erkannt',
    es: 'Primer patrón detectado',
    tr: 'İlk örüntü tespit edildi',
    fr: 'Premier schéma détecté',
  },
  insight_checkpoint_2: {
    ru: 'Анализ углубляется…',
    en: 'Analysis deepens…',
    uk: 'Аналіз поглиблюється…',
    de: 'Analyse vertieft sich…',
    es: 'El análisis se profundiza…',
    tr: 'Analiz derinleşiyor…',
    fr: 'L\'analyse s\'approfondit…',
  },
  insight_checkpoint_3: {
    ru: 'Профиль почти готов',
    en: 'Profile almost ready',
    uk: 'Профіль майже готовий',
    de: 'Profil fast fertig',
    es: 'Perfil casi listo',
    tr: 'Profil neredeyse hazır',
    fr: 'Profil presque prêt',
  },
  insight_analyzing: {
    ru: 'Анализ продолжается…',
    en: 'Analysis in progress…',
    uk: 'Аналіз триває…',
    de: 'Analyse läuft…',
    es: 'Análisis en curso…',
    tr: 'Analiz devam ediyor…',
    fr: 'Analyse en cours…',
  },
  insight_wow: {
    ru: 'Это уже видно из твоих ответов.',
    en: 'This is already visible from your answers.',
    uk: 'Це вже видно з твоїх відповідей.',
    de: 'Das ist bereits aus deinen Antworten ersichtlich.',
    es: 'Esto ya es visible en tus respuestas.',
    tr: 'Bu zaten cevaplarından belli.',
    fr: 'Cela est déjà visible dans tes réponses.',
  },
  insight_confirm_q: {
    ru: 'Это похоже на тебя?',
    en: 'Does this sound like you?',
    uk: 'Це схоже на тебе?',
    de: 'Klingt das nach dir?',
    es: '¿Esto te describe?',
    tr: 'Bu sana benziyor mu?',
    fr: 'Est-ce que ça te ressemble ?',
  },
  insight_confirm_yes: {
    ru: 'Да, точно', en: 'Yes, exactly', uk: 'Так, точно',
    de: 'Ja, genau', es: 'Sí, exacto', tr: 'Evet, kesinlikle', fr: 'Oui, exactement',
  },
  insight_confirm_partly: {
    ru: 'Частично', en: 'Partly', uk: 'Частково',
    de: 'Teilweise', es: 'En parte', tr: 'Kısmen', fr: 'En partie',
  },
  insight_top_pct: {
    ru: 'Топ', en: 'Top', uk: 'Топ', de: 'Top', es: 'Top', tr: 'İlk', fr: 'Top',
  },
  insight_t_analytical_title: {
    ru: 'У тебя сильное аналитическое мышление',
    en: 'You have strong analytical thinking',
    uk: 'У тебе сильне аналітичне мислення',
    de: 'Du hast ein starkes analytisches Denkvermögen',
    es: 'Tienes un pensamiento analítico fuerte',
    tr: 'Güçlü analitik düşünceye sahipsin',
    fr: 'Tu as une pensée analytique forte',
  },
  insight_t_analytical_desc: {
    ru: 'Ты быстро замечаешь закономерности и связи.\nТебе важно понять, как всё устроено на глубоком уровне.',
    en: 'You quickly notice patterns and connections.\nYou need to understand how things work at a deep level.',
    uk: 'Ти швидко помічаєш закономірності та зв\'язки.\nТобі важливо зрозуміти, як усе влаштовано на глибокому рівні.',
    de: 'Du erkennst schnell Muster und Zusammenhänge.\nDu musst verstehen, wie Dinge auf einer tiefen Ebene funktionieren.',
    es: 'Notas rápidamente patrones y conexiones.\nNecesitas entender cómo funcionan las cosas a un nivel profundo.',
    tr: 'Kalıpları ve bağlantıları hızla fark ediyorsun.\nHer şeyin derin bir düzeyde nasıl çalıştığını anlamana gerek var.',
    fr: 'Tu remarques rapidement des schémas et connexions.\nTu as besoin de comprendre comment les choses fonctionnent en profondeur.',
  },
  insight_t_creative_title: {
    ru: 'У тебя живое творческое мышление',
    en: 'You have a vivid creative mind',
    uk: 'У тебе живе творче мислення',
    de: 'Du hast ein lebendiges kreatives Denken',
    es: 'Tienes una mente creativa muy viva',
    tr: 'Canlı bir yaratıcı zihne sahipsin',
    fr: 'Tu as un esprit créatif vif',
  },
  insight_t_creative_desc: {
    ru: 'Ты видишь мир иначе и легко находишь нестандартные решения.\nТам, где другие зашли в тупик — ты уже видишь выход.',
    en: 'You see the world differently and easily find unconventional solutions.\nWhere others are stuck — you already see a way out.',
    uk: 'Ти бачиш світ інакше і легко знаходиш нестандартні рішення.\nТам, де інші зайшли в глухий кут — ти вже бачиш вихід.',
    de: 'Du siehst die Welt anders und findest leicht unkonventionelle Lösungen.\nWo andere feststecken — siehst du bereits einen Ausweg.',
    es: 'Ves el mundo de manera diferente y encuentras fácilmente soluciones poco convencionales.\nDonde otros están atascados — tú ya ves una salida.',
    tr: 'Dünyayı farklı görüyor ve kolayca alışılmadık çözümler buluyorsun.\nBaşkalarının takıldığı yerde sen zaten bir çıkış yolu görüyorsun.',
    fr: 'Tu vois le monde différemment et trouves facilement des solutions non conventionnelles.\nLà où les autres sont bloqués — tu vois déjà une sortie.',
  },
  insight_t_social_title: {
    ru: 'Ты хорошо чувствуешь людей',
    en: 'You have strong emotional intelligence',
    uk: 'Ти добре відчуваєш людей',
    de: 'Du hast eine hohe emotionale Intelligenz',
    es: 'Tienes una fuerte inteligencia emocional',
    tr: 'İnsanları iyi hissediyorsun',
    fr: 'Tu as une grande intelligence émotionnelle',
  },
  insight_t_social_desc: {
    ru: 'Ты чувствуешь людей и понимаешь, что им нужно.\nТебе легко строить настоящие, глубокие связи.',
    en: 'You sense people and understand what they need.\nBuilding real, deep connections comes naturally to you.',
    uk: 'Ти відчуваєш людей і розумієш, що їм потрібно.\nТобі легко будувати справжні, глибокі зв\'язки.',
    de: 'Du spürst Menschen und verstehst, was sie brauchen.\nEchte, tiefe Verbindungen zu knüpfen fällt dir leicht.',
    es: 'Sientes a las personas y entiendes qué necesitan.\nConstruir conexiones reales y profundas te resulta natural.',
    tr: 'İnsanları hissediyor ve ne istediklerini anlıyorsun.\nGerçek, derin bağlantılar kurmak sana doğal geliyor.',
    fr: 'Tu ressens les gens et comprends ce dont ils ont besoin.\nÉtablir des connexions vraies et profondes te vient naturellement.',
  },
  insight_t_strategic_title: {
    ru: 'У тебя стратегическое мышление',
    en: 'You think strategically',
    uk: 'У тебе стратегічне мислення',
    de: 'Du denkst strategisch',
    es: 'Piensas estratégicamente',
    tr: 'Stratejik düşünüyorsun',
    fr: 'Tu penses stratégiquement',
  },
  insight_t_strategic_desc: {
    ru: 'Ты видишь картину целиком и умеешь расставлять приоритеты.\nТвои решения принимаются с прицелом на результат.',
    en: 'You see the big picture and know how to set priorities.\nYour decisions are made with the outcome in mind.',
    uk: 'Ти бачиш велику картину і вмієш розставляти пріоритети.\nТвої рішення приймаються з прицілом на результат.',
    de: 'Du siehst das Gesamtbild und kannst Prioritäten setzen.\nDeine Entscheidungen werden mit Blick auf das Ergebnis getroffen.',
    es: 'Ves el panorama general y sabes cómo establecer prioridades.\nTus decisiones se toman pensando en el resultado.',
    tr: 'Büyük resmi görüyor ve öncelikleri nasıl belirleyeceğini biliyorsun.\nKararların sonucu göz önünde bulundurarak alınıyor.',
    fr: 'Tu vois l\'ensemble et sais établir des priorités.\nTes décisions sont prises en gardant le résultat en tête.',
  },
  insight_t_practical_title: {
    ru: 'Ты умеешь решать сложные задачи',
    en: 'You excel at solving complex problems',
    uk: 'Ти вмієш вирішувати складні задачі',
    de: 'Du bist gut darin, komplexe Probleme zu lösen',
    es: 'Destacas resolviendo problemas complejos',
    tr: 'Karmaşık problemleri çözmede mükemmelsin',
    fr: 'Tu excelles dans la résolution de problèmes complexes',
  },
  test_micro_hint: {
    ru: 'Отвечай так, как поступаешь на самом деле',
    en: 'Answer as you truly behave in real life',
    uk: 'Відповідай так, як насправді поводишся',
    de: 'Antworte so, wie du dich wirklich verhältst',
    es: 'Responde como realmente te comportas',
    tr: 'Gerçekten nasıl davrandığını yanıtla',
    fr: 'Réponds comme tu te comportes vraiment',
  },
  test_analysis_forming: {
    ru: 'Анализ уже формируется…',
    en: 'Analysis is forming…',
    uk: 'Аналіз вже формується…',
    de: 'Analyse wird erstellt…',
    es: 'El análisis se está formando…',
    tr: 'Analiz oluşuyor…',
    fr: 'L\'analyse se forme…',
  },
  test_mins_left: {
    ru: 'мин', en: 'min', uk: 'хв', de: 'Min', es: 'min', tr: 'dk', fr: 'min',
  },
  insight_t_practical_desc: {
    ru: 'Ты превращаешь идеи в реальный результат.\nТебе не нужна идеальная ситуация — ты работаешь с тем, что есть.',
    en: 'You turn ideas into real results.\nYou don\'t need perfect conditions — you work with what\'s available.',
    uk: 'Ти перетворюєш ідеї на реальний результат.\nТобі не потрібна ідеальна ситуація — ти працюєш з тим, що є.',
    de: 'Du verwandelst Ideen in echte Ergebnisse.\nDu brauchst keine perfekten Bedingungen — du arbeitest mit dem, was vorhanden ist.',
    es: 'Conviertes ideas en resultados reales.\nNo necesitas condiciones perfectas — trabajas con lo que hay.',
    tr: 'Fikirleri gerçek sonuçlara dönüştürüyorsun.\nMükemmel koşullara ihtiyacın yok — elindekileri kullanıyorsun.',
    fr: 'Tu transformes les idées en résultats concrets.\nTu n\'as pas besoin de conditions parfaites — tu travailles avec ce qui est disponible.',
  },
}

export function t(key: UIKey, locale: Locale): string {
  return UI[key]?.[locale] ?? UI[key]?.['en'] ?? key
}
