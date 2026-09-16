// Question Generator System - Creates validated quiz questions
import type { Food, Country, City, Question, Option, Language } from '../types';
import { foods, countries, cities } from '../data/database';

export class QuestionGenerator {
  private static instance: QuestionGenerator;
  
  private constructor() {}
  
  public static getInstance(): QuestionGenerator {
    if (!QuestionGenerator.instance) {
      QuestionGenerator.instance = new QuestionGenerator();
    }
    return QuestionGenerator.instance;
  }

  /**
   * Generate a food guessing question
   */
  generateFoodGuessQuestion(food: Food, lang: Language): Question | null {
    try {
      const correctOption: Option = {
        id: food.id,
        text: {
          en: food.englishName,
          fa: food.persianName,
          ar: food.arabicName
        },
        isCorrect: true
      };

      // Get 3 unique incorrect options from different foods
      const wrongOptions = this.getUniqueWrongOptions(food, 3, lang);
      
      if (wrongOptions.length < 3) {
        return null;
      }

      const options = this.shuffleArray([correctOption, ...wrongOptions]);
      
      // Validate question before returning
      if (!this.validateQuestion(options, correctOption.id)) {
        return null;
      }

      return {
        id: `food-${food.id}-${Date.now()}`,
        type: 'food_guess',
        text: {
          en: 'What food is this?',
          fa: 'این چه غذایی است؟',
          ar: 'ما هو هذا الطعام؟'
        },
        options,
        correctAnswerId: food.id,
        foodId: food.id,
        explanation: {
          en: food.description.en,
          fa: food.description.fa,
          ar: food.description.ar
        },
        funFact: food.funFacts
      };
    } catch (error) {
      console.error('Error generating food guess question:', error);
      return null;
    }
  }

  /**
   * Generate a city guessing question
   */
  generateCityGuessQuestion(food: Food, lang: Language): Question | null {
    try {
      if (!food.cityIds || food.cityIds.length === 0) {
        return null;
      }

      const cityId = food.cityIds[0];
      const city = cities.find(c => c.id === cityId);
      
      if (!city) {
        return null;
      }

      const correctOption: Option = {
        id: city.id,
        text: {
          en: city.englishName,
          fa: city.persianName,
          ar: city.arabicName
        },
        isCorrect: true
      };

      // Get 3 unique wrong cities from different countries
      const wrongCities = cities
        .filter(c => c.countryId !== city.countryId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      if (wrongCities.length < 3) {
        return null;
      }

      const wrongOptions: Option[] = wrongCities.map(c => ({
        id: c.id,
        text: {
          en: c.englishName,
          fa: c.persianName,
          ar: c.arabicName
        },
        isCorrect: false
      }));

      const options = this.shuffleArray([correctOption, ...wrongOptions]);

      if (!this.validateQuestion(options, city.id)) {
        return null;
      }

      return {
        id: `city-${food.id}-${Date.now()}`,
        type: 'city_guess',
        text: {
          en: `Which city is ${this.getFoodName(food, lang)} associated with?`,
          fa: `${this.getFoodName(food, lang)} با کدام شهر مرتبط است؟`,
          ar: `مع أي مدينة يرتبط ${this.getFoodName(food, lang)}؟`
        },
        options,
        correctAnswerId: city.id,
        foodId: food.id,
        cityId: city.id,
        explanation: {
          en: `${city.englishName} is in ${this.getCountryName(city.countryId, lang)}.`,
          fa: `${city.persianName} در ${this.getCountryName(city.countryId, lang)} قرار دارد.`,
          ar: `${city.arabicName} تقع في ${this.getCountryName(city.countryId, lang)}.`
        }
      };
    } catch (error) {
      console.error('Error generating city guess question:', error);
      return null;
    }
  }

  /**
   * Generate a country guessing question
   */
  generateCountryGuessQuestion(food: Food, lang: Language): Question | null {
    try {
      if (!food.countryIds || food.countryIds.length === 0) {
        return null;
      }

      const countryId = food.countryIds[0];
      const country = countries.find(c => c.id === countryId);
      
      if (!country) {
        return null;
      }

      const correctOption: Option = {
        id: country.id,
        text: {
          en: country.englishName,
          fa: country.persianName,
          ar: country.arabicName
        },
        isCorrect: true
      };

      // Get 3 unique wrong countries from different continents
      const wrongCountries = countries
        .filter(c => c.id !== countryId && c.continent !== country.continent)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      if (wrongCountries.length < 3) {
        // Fallback to any 3 countries
        wrongCountries.push(...countries
          .filter(c => c.id !== countryId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3 - wrongCountries.length)
        );
      }

      if (wrongCountries.length < 3) {
        return null;
      }

      const wrongOptions: Option[] = wrongCountries.map(c => ({
        id: c.id,
        text: {
          en: c.englishName,
          fa: c.persianName,
          ar: c.arabicName
        },
        isCorrect: false
      }));

      const options = this.shuffleArray([correctOption, ...wrongOptions]);

      if (!this.validateQuestion(options, countryId)) {
        return null;
      }

      return {
        id: `country-${food.id}-${Date.now()}`,
        type: 'country_guess',
        text: {
          en: `Which country is ${this.getFoodName(food, lang)} from?`,
          fa: `${this.getFoodName(food, lang)} از کدام کشور است؟`,
          ar: `من أي دولة يأتي ${this.getFoodName(food, lang)}؟`
        },
        options,
        correctAnswerId: countryId,
        foodId: food.id,
        countryId: countryId,
        explanation: {
          en: `${this.getFoodName(food, lang)} is a traditional dish from ${country.englishName}.`,
          fa: `${this.getFoodName(food, lang)} یک غذای سنتی از ${country.persianName} است.`,
          ar: `${this.getFoodName(food, lang)} هو طبق تقليدي من ${country.arabicName}.`
        }
      };
    } catch (error) {
      console.error('Error generating country guess question:', error);
      return null;
    }
  }

  /**
   * Generate a continent guessing question
   */
  generateContinentGuessQuestion(countryId: string, lang: Language): Question | null {
    try {
      const country = countries.find(c => c.id === countryId);
      
      if (!country) {
        return null;
      }

      const correctOption: Option = {
        id: country.continent,
        text: {
          en: country.continent,
          fa: this.translateContinent(country.continent, 'fa'),
          ar: this.translateContinent(country.continent, 'ar')
        },
        isCorrect: true
      };

      const allContinents = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];
      const wrongContinents = allContinents
        .filter(c => c !== country.continent)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const wrongOptions: Option[] = wrongContinents.map(c => ({
        id: c,
        text: {
          en: c,
          fa: this.translateContinent(c, 'fa'),
          ar: this.translateContinent(c, 'ar')
        },
        isCorrect: false
      }));

      const options = this.shuffleArray([correctOption, ...wrongOptions]);

      if (!this.validateQuestion(options, country.continent)) {
        return null;
      }

      return {
        id: `continent-${countryId}-${Date.now()}`,
        type: 'reverse_geography',
        text: {
          en: `Which continent is ${this.getCountryName(countryId, lang)} in?`,
          fa: `${this.getCountryName(countryId, lang)} در کدام قاره قرار دارد؟`,
          ar: `في أي قارة تقع ${this.getCountryName(countryId, lang)}؟`
        },
        options,
        correctAnswerId: country.continent,
        countryId: countryId,
        explanation: {
          en: `${country.englishName} is located in ${country.continent}.`,
          fa: `${country.persianName} در ${this.translateContinent(country.continent, 'fa')} قرار دارد.`,
          ar: `${country.arabicName} تقع في ${this.translateContinent(country.continent, 'ar')}.`
        }
      };
    } catch (error) {
      console.error('Error generating continent question:', error);
      return null;
    }
  }

  /**
   * Get a random question based on difficulty
   */
  getRandomQuestion(difficulty: 'Easy' | 'Medium' | 'Hard', lang: Language): Question | null {
    const availableFoods = foods.filter(f => f.difficulty === difficulty || difficulty === 'Medium');
    
    if (availableFoods.length === 0) {
      return null;
    }

    const randomFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    
    // Randomly select question type
    const questionTypes = ['food', 'country'];
    if (randomFood.cityIds && randomFood.cityIds.length > 0) {
      questionTypes.push('city');
    }

    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (selectedType) {
      case 'food':
        return this.generateFoodGuessQuestion(randomFood, lang);
      case 'city':
        return this.generateCityGuessQuestion(randomFood, lang) || this.generateFoodGuessQuestion(randomFood, lang);
      case 'country':
        return this.generateCountryGuessQuestion(randomFood, lang);
      default:
        return this.generateFoodGuessQuestion(randomFood, lang);
    }
  }

  /**
   * Validate that a question has exactly 4 unique options with 1 correct answer
   */
  private validateQuestion(options: Option[], correctAnswerId: string): boolean {
    // Must have exactly 4 options
    if (options.length !== 4) {
      return false;
    }

    // All options must be non-empty
    for (const option of options) {
      if (!option.text.en || !option.text.fa || !option.text.ar) {
        return false;
      }
    }

    // All options must be unique
    const uniqueTexts = new Set(options.map(o => o.text.en));
    if (uniqueTexts.size !== 4) {
      return false;
    }

    // Exactly one correct answer
    const correctCount = options.filter(o => o.isCorrect).length;
    if (correctCount !== 1) {
      return false;
    }

    // Correct answer must exist in options
    const hasCorrectAnswer = options.some(o => o.id === correctAnswerId && o.isCorrect);
    if (!hasCorrectAnswer) {
      return false;
    }

    return true;
  }

  /**
   * Get unique wrong options for a question
   */
  private getUniqueWrongOptions(currentFood: Food, count: number, lang: Language): Option[] {
    const wrongFoods = foods
      .filter(f => f.id !== currentFood.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    return wrongFoods.map(f => ({
      id: f.id,
      text: {
        en: f.englishName,
        fa: f.persianName,
        ar: f.arabicName
      },
      isCorrect: false
    }));
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Get food name in specified language
   */
  private getFoodName(food: Food, lang: Language): string {
    switch (lang) {
      case 'fa': return food.persianName;
      case 'ar': return food.arabicName;
      default: return food.englishName;
    }
  }

  /**
   * Get country name in specified language
   */
  private getCountryName(countryId: string, lang: Language): string {
    const country = countries.find(c => c.id === countryId);
    if (!country) return '';
    
    switch (lang) {
      case 'fa': return country.persianName;
      case 'ar': return country.arabicName;
      default: return country.englishName;
    }
  }

  /**
   * Translate continent name
   */
  private translateContinent(continent: string, lang: Language): string {
    const translations: Record<string, Record<string, string>> = {
      'Asia': { fa: 'آسیا', ar: 'آسيا' },
      'Europe': { fa: 'اروپا', ar: 'أوروبا' },
      'Africa': { fa: 'آفریقا', ar: 'أفريقيا' },
      'North America': { fa: 'آمریکای شمالی', ar: 'أمريكا الشمالية' },
      'South America': { fa: 'آمریکای جنوبی', ar: 'أمريكا الجنوبية' },
      'Oceania': { fa: 'اقیانوسیه', ar: 'أوقيانوسيا' }
    };
    
    return translations[continent]?.[lang] || continent;
  }
}

export const questionGenerator = QuestionGenerator.getInstance();
