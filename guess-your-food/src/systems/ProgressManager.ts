// Progress Management System - Handles XP, levels, coins, collection, achievements
import { PlayerProgress, Achievement, Food, DailyChallenge, Reward } from '../types';

const STORAGE_KEY = 'guess-your-food-progress';

export class ProgressManager {
  private static instance: ProgressManager;
  private progress: PlayerProgress | null = null;
  
  private constructor() {}
  
  public static getInstance(): ProgressManager {
    if (!ProgressManager.instance) {
      ProgressManager.instance = new ProgressManager();
    }
    return ProgressManager.instance;
  }

  /**
   * Load progress from localStorage
   */
  loadProgress(): PlayerProgress {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Check if daily reward needs reset
        this.checkDailyReset(parsed);
        
        this.progress = parsed;
        return parsed;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    
    // Create default progress
    this.progress = this.createDefaultProgress();
    return this.progress;
  }

  /**
   * Save progress to localStorage
   */
  saveProgress(): void {
    if (!this.progress) return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  /**
   * Add XP and handle level up
   */
  addXP(amount: number): { newLevel: number; leveledUp: boolean } {
    if (!this.progress) return { newLevel: 1, leveledUp: false };
    
    const oldLevel = this.progress.level;
    this.progress.xp += amount;
    
    // Calculate level based on XP (100 XP per level)
    const newLevel = Math.floor(this.progress.xp / 100) + 1;
    
    if (newLevel > oldLevel) {
      this.progress.level = newLevel;
      this.saveProgress();
      return { newLevel, leveledUp: true };
    }
    
    return { newLevel: oldLevel, leveledUp: false };
  }

  /**
   * Add coins
   */
  addCoins(amount: number): number {
    if (!this.progress) return 0;
    
    this.progress.coins += amount;
    this.saveProgress();
    return this.progress.coins;
  }

  /**
   * Add score
   */
  addScore(amount: number): number {
    if (!this.progress) return 0;
    
    this.progress.score += amount;
    this.saveProgress();
    return this.progress.score;
  }

  /**
   * Update streak
   */
  updateStreak(isCorrect: boolean): number {
    if (!this.progress) return 0;
    
    if (isCorrect) {
      this.progress.streak += 1;
    } else {
      this.progress.streak = 0;
    }
    
    this.saveProgress();
    return this.progress.streak;
  }

  /**
   * Reduce lives
   */
  reduceLives(amount: number = 1): number {
    if (!this.progress) return 5;
    
    this.progress.lives = Math.max(0, this.progress.lives - amount);
    this.saveProgress();
    return this.progress.lives;
  }

  /**
   * Restore lives
   */
  restoreLives(amount: number = 1): number {
    if (!this.progress) return 5;
    
    this.progress.lives = Math.min(5, this.progress.lives + amount);
    this.saveProgress();
    return this.progress.lives;
  }

  /**
   * Add food to collection
   */
  discoverFood(foodId: string): boolean {
    if (!this.progress) return false;
    
    if (!this.progress.collection.includes(foodId)) {
      this.progress.collection.push(foodId);
      this.saveProgress();
      
      // Check achievements
      this.checkCollectionAchievements();
      
      return true;
    }
    
    return false;
  }

  /**
   * Check if food is discovered
   */
  isFoodDiscovered(foodId: string): boolean {
    if (!this.progress) return false;
    return this.progress.collection.includes(foodId);
  }

  /**
   * Get collection count
   */
  getCollectionCount(): number {
    if (!this.progress) return 0;
    return this.progress.collection.length;
  }

  /**
   * Get total foods count
   */
  getTotalFoodsCount(): number {
    // This should come from database
    return 100; // Placeholder
  }

  /**
   * Get collection percentage
   */
  getCollectionPercentage(): number {
    const collected = this.getCollectionCount();
    const total = this.getTotalFoodsCount();
    return total > 0 ? Math.round((collected / total) * 100) : 0;
  }

  /**
   * Update country progress
   */
  updateCountryProgress(countryId: string, foodId: string): void {
    if (!this.progress) return;
    
    if (!this.progress.countryProgress[countryId]) {
      this.progress.countryProgress[countryId] = {
        foodsDiscovered: 0,
        citiesDiscovered: 0
      };
    }
    
    // Increment if not already counted
    // In a real implementation, we'd track which foods were counted
    this.progress.countryProgress[countryId].foodsDiscovered += 1;
    this.saveProgress();
  }

  /**
   * Update city progress
   */
  updateCityProgress(cityId: string, foodId: string): void {
    if (!this.progress) return;
    
    if (!this.progress.cityProgress[cityId]) {
      this.progress.cityProgress[cityId] = {
        foodsDiscovered: 0
      };
    }
    
    this.progress.cityProgress[cityId].foodsDiscovered += 1;
    this.saveProgress();
  }

  /**
   * Check and unlock achievements
   */
  checkCollectionAchievements(): void {
    if (!this.progress) return;
    
    const collectionSize = this.progress.collection.length;
    
    const achievementsToCheck: Array<{ id: string; target: number }> = [
      { id: 'first-food', target: 1 },
      { id: 'ten-foods', target: 10 },
      { id: 'hundred-foods', target: 100 }
    ];
    
    for (const achievement of achievementsToCheck) {
      const existingAchievement = this.progress.achievements.find(a => a.id === achievement.id);
      
      if (existingAchievement && !existingAchievement.unlocked && collectionSize >= achievement.target) {
        existingAchievement.unlocked = true;
        existingAchievement.unlockedAt = new Date().toISOString();
        existingAchievement.progress = collectionSize;
      }
    }
    
    this.saveProgress();
  }

  /**
   * Get current progress
   */
  getProgress(): PlayerProgress | null {
    return this.progress;
  }

  /**
   * Check daily reset
   */
  private checkDailyReset(progress: PlayerProgress): void {
    const today = new Date().toDateString();
    const lastDate = progress.dailyProgress.date;
    
    if (lastDate !== today) {
      // New day - reset daily challenges
      progress.dailyProgress = {
        date: today,
        challengesCompleted: [],
        rewardClaimed: false
      };
      this.saveProgress();
    }
  }

  /**
   * Create default progress object
   */
  private createDefaultProgress(): PlayerProgress {
    return {
      xp: 0,
      level: 1,
      coins: 0,
      score: 0,
      streak: 0,
      lives: 5,
      collection: [],
      achievements: [
        {
          id: 'first-food',
          name: { en: 'First Food', fa: 'اولین غذا', ar: 'الطعام الأول' },
          description: { en: 'Discover your first food', fa: 'اولین غذای خود را کشف کنید', ar: 'اكتشف طعامك الأول' },
          unlocked: false,
          progress: 0,
          target: 1
        },
        {
          id: 'ten-foods',
          name: { en: '10 Foods', fa: '۱۰ غذا', ar: '10 أطعمة' },
          description: { en: 'Discover 10 different foods', fa: '۱۰ غذای مختلف کشف کنید', ar: 'اكتشف 10 أطعمة مختلفة' },
          unlocked: false,
          progress: 0,
          target: 10
        },
        {
          id: 'hundred-foods',
          name: { en: '100 Foods', fa: '۱۰۰ غذا', ar: '100 طعام' },
          description: { en: 'Discover 100 different foods', fa: '۱۰۰ غذای مختلف کشف کنید', ar: 'اكتشف 100 طعام مختلف' },
          unlocked: false,
          progress: 0,
          target: 100
        }
      ],
      dailyProgress: {
        date: new Date().toDateString(),
        challengesCompleted: [],
        rewardClaimed: false
      },
      lastLogin: new Date().toISOString(),
      settings: {
        language: 'en',
        soundEnabled: true,
        notificationsEnabled: true,
        calendarType: 'gregorian'
      },
      countryProgress: {},
      cityProgress: {}
    };
  }

  /**
   * Handle correct answer rewards
   */
  handleCorrectAnswer(baseXP: number = 10, baseCoins: number = 5, comboMultiplier: number = 1): Reward {
    if (!this.progress) return { xp: 0, coins: 0 };
    
    const xpReward = Math.floor(baseXP * comboMultiplier);
    const coinReward = Math.floor(baseCoins * comboMultiplier);
    
    this.addXP(xpReward);
    this.addCoins(coinReward);
    this.addScore(xpReward * 10);
    this.updateStreak(true);
    
    return { xp: xpReward, coins: coinReward };
  }

  /**
   * Handle wrong answer
   */
  handleWrongAnswer(): void {
    if (!this.progress) return;
    
    this.reduceLives(1);
    this.updateStreak(false);
  }
}

export const progressManager = ProgressManager.getInstance();
