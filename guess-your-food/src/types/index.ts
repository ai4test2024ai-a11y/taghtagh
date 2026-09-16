// Core Type Definitions for Guess Your Food

export interface Food {
  id: string;
  name: string;
  nativeName: string;
  englishName: string;
  persianName: string;
  arabicName: string;
  countryIds: string[];
  regionIds: string[];
  cityIds: string[];
  category: string;
  description: Record<string, string>;
  ingredients: string[];
  recipe: Recipe;
  preparationTime: number;
  cookingTime: number;
  servings: number;
  cookingMethod: string;
  culturalInfo: Record<string, string>;
  foodHistory: Record<string, string>;
  foodFacts: Record<string, string>;
  funFacts: Record<string, string>;
  regionalVariations: Record<string, string>;
  difficulty: Difficulty;
  rarity: Rarity;
  image: string;
  aliases: string[];
  tags: string[];
}

export interface Recipe {
  ingredients: Ingredient[];
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  servings: number;
  difficulty: Difficulty;
  cookingMethod: string;
  steps: RecipeStep[];
}

export interface Ingredient {
  name: Record<string, string>;
  amount: string;
  unit: string;
  optional?: boolean;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: Record<string, string>;
  tip?: Record<string, string>;
}

export interface Country {
  id: string;
  englishName: string;
  persianName: string;
  arabicName: string;
  flag: string;
  continent: Continent;
  region: string;
  capital: string;
  majorCities: string[];
  foodIds: string[];
  completionData: CompletionData;
}

export interface City {
  id: string;
  englishName: string;
  persianName: string;
  arabicName: string;
  countryId: string;
  region: string;
  foodIds: string[];
}

export interface Region {
  id: string;
  englishName: string;
  persianName: string;
  arabicName: string;
  countryId: string;
  foodIds: string[];
  cityIds: string[];
}

export interface CompletionData {
  foodsDiscovered: number;
  totalFoods: number;
  citiesDiscovered: number;
  totalCities: number;
}

export type Continent = 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Oceania' | 'Antarctica';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Extreme';

export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export type Language = 'en' | 'fa' | 'ar';

export type Direction = 'ltr' | 'rtl';

export interface PlayerProgress {
  xp: number;
  level: number;
  coins: number;
  score: number;
  streak: number;
  lives: number;
  collection: string[]; // Food IDs
  achievements: Achievement[];
  dailyProgress: DailyProgress;
  lastLogin: string;
  settings: PlayerSettings;
  countryProgress: Record<string, CountryProgress>;
  cityProgress: Record<string, CityProgress>;
}

export interface CountryProgress {
  foodsDiscovered: number;
  citiesDiscovered: number;
}

export interface CityProgress {
  foodsDiscovered: number;
}

export interface PlayerSettings {
  language: Language;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  calendarType: 'gregorian' | 'persian';
}

export interface Achievement {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export interface DailyProgress {
  date: string;
  challengesCompleted: string[];
  rewardClaimed: boolean;
}

export interface DailyChallenge {
  id: string;
  name: Record<string, string>;
  description: Record<string, string>;
  type: ChallengeType;
  target: number;
  reward: Reward;
}

export type ChallengeType = 
  | 'guess_foods'
  | 'discover_countries'
  | 'complete_city_questions'
  | 'guess_iranian_foods'
  | 'get_streak'
  | 'discover_rare_food';

export interface Reward {
  xp: number;
  coins: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: Record<string, string>;
  options: Option[];
  correctAnswerId: string;
  foodId?: string;
  cityId?: string;
  countryId?: string;
  explanation: Record<string, string>;
  funFact?: Record<string, string>;
}

export type QuestionType = 
  | 'food_guess'
  | 'city_guess'
  | 'country_guess'
  | 'region_guess'
  | 'ingredient_guess'
  | 'recipe_guess'
  | 'reverse_geography';

export interface Option {
  id: string;
  text: Record<string, string>;
  isCorrect: boolean;
}

export interface GameState {
  currentQuestion: Question | null;
  selectedAnswer: string | null;
  isSubmitting: boolean;
  showResult: boolean;
  isCorrect: boolean;
  comboCount: number;
  sessionXp: number;
  sessionCoins: number;
  questionsAnswered: number;
}

export interface FilterState {
  countryId?: string;
  cityId?: string;
  regionId?: string;
  category?: string;
  difficulty?: Difficulty;
  rarity?: Rarity;
  collected?: boolean;
  vegetarian?: boolean;
  streetFood?: boolean;
  dessert?: boolean;
  traditional?: boolean;
  drink?: boolean;
}
