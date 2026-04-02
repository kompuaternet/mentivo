// ─── Localization ────────────────────────────────────────────────────────────

export type Locale = 'ru' | 'en' | 'uk' | 'de' | 'es' | 'tr'
export type LocaleText = Record<Locale, string>

// ─── Score Dimensions ────────────────────────────────────────────────────────

export interface ScoreDimensions {
  // Holland RIASEC model
  R: number  // Realistic     — hands-on, technical, nature
  I: number  // Investigative — analytical, science, data
  A: number  // Artistic      — creative, design, art
  S: number  // Social        — people, teaching, helping
  E: number  // Enterprising  — business, leadership, sales
  C: number  // Conventional  — order, administration, data

  // Personality dimensions
  L: number          // Leadership potential (accumulates)
  analytical: number
  creative: number
  strategic: number
  empathetic: number

  // Work style
  solo: number       // prefers working alone
  team: number       // prefers team work
  structure: number  // prefers structured environment
  pace: number       // prefers fast pace / growth
}

// ─── Questions ───────────────────────────────────────────────────────────────

export interface QuestionOption {
  id: string
  text: LocaleText
  scores: Partial<ScoreDimensions>
}

export interface Question {
  id: number
  block: number
  blockName: LocaleText
  blockEmoji: string
  text: LocaleText
  options: QuestionOption[]
}

// ─── Professions ─────────────────────────────────────────────────────────────

export type EducationDirection = 'technical' | 'humanitarian' | 'medical' | 'creative' | 'social' | 'business' | 'natural'

export interface Profession {
  id: string
  name: LocaleText
  description: LocaleText
  emoji: string
  riasec: { R: number; I: number; A: number; S: number; E: number; C: number }
  minLeadership: number          // 1-5, minimum L score to appear
  educationDirection: EducationDirection
  specialties: LocaleText        // search keywords
  platforms: string[]
}

// ─── Profile (derived from answers) ─────────────────────────────────────────

export type ThinkingStyle = 'analytical' | 'creative' | 'strategic' | 'empathetic'

export interface ThinkingStyleInfo {
  key: ThinkingStyle
  name: LocaleText
  description: LocaleText
  emoji: string
}

export type CharacterType = 'introvert' | 'extrovert' | 'ambivert'

export interface CharacterTypeInfo {
  key: CharacterType
  name: LocaleText
  description: LocaleText
  emoji: string
}

export type LeadershipLevel = 1 | 2 | 3 | 4 | 5

export interface LeadershipInfo {
  level: LeadershipLevel
  name: LocaleText
  description: LocaleText
  emoji: string
}

export type WorkStyleType = 'solo' | 'team' | 'mixed'

export interface ProfessionMatch {
  profession: Profession
  matchPercent: number
}

export interface CareerArchetype {
  key: string
  name: LocaleText
  description: LocaleText
  emoji: string
}

export interface EducationRecommendation {
  direction: EducationDirection
  directionName: LocaleText
  specialties: LocaleText
  platforms: string[]
  format: LocaleText
  firstStep: LocaleText
}

export interface UserProfile {
  scores: ScoreDimensions

  // Personality
  thinkingStyle: ThinkingStyleInfo
  characterType: CharacterTypeInfo
  leadershipLevel: LeadershipInfo
  workStyle: WorkStyleType
  careerPace: 'fast' | 'steady' | 'deep'

  // Professions
  topProfessions: ProfessionMatch[]  // sorted by match%, all 7

  // Strengths
  strengths: LocaleText[]
  growthZones: LocaleText[]

  // Career archetype
  archetype: CareerArchetype

  // Education
  education: EducationRecommendation
}

// ─── Session ─────────────────────────────────────────────────────────────────

export interface TestSession {
  id: string
  locale: Locale
  answers: Record<number, string>   // questionId → optionId
  profile?: UserProfile
  isPaid: boolean
  createdAt: string
}
