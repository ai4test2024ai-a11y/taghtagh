// Translation System for Guess Your Food
import { Language } from '../types';

export interface Translation {
  en: string;
  fa: string;
  ar: string;
}

export const translations: Record<string, Translation> = {
  // Game Title
  'game.title': {
    en: 'GUESS YOUR FOOD',
    fa: 'غذای خود را حدس بزنید',
    ar: 'اختر طعامك'
  },
  'game.subtitle': {
    en: 'How well do you know the food of the world?',
    fa: 'چقدر غذاهای جهان را می‌شناسید؟',
    ar: 'كم تعرف عن طعام العالم؟'
  },

  // Navigation
  'nav.home': { en: 'Home', fa: 'خانه', ar: 'الرئيسية' },
  'nav.play': { en: 'Play', fa: 'بازی', ar: 'لعب' },
  'nav.world': { en: 'World Map', fa: 'نقشه جهان', ar: 'خريطة العالم' },
  'nav.countries': { en: 'Countries', fa: 'کشورها', ar: 'الدول' },
  'nav.cities': { en: 'Cities', fa: 'شهرها', ar: 'المدن' },
  'nav.collection': { en: 'Food Collection', fa: 'مجموعه غذاها', ar: 'مجموعة الطعام' },
  'nav.recipes': { en: 'Recipes', fa: 'دستور پخت', ar: 'الوصفات' },
  'nav.daily': { en: 'Daily Challenge', fa: 'چالش روزانه', ar: 'تحدي يومي' },
  'nav.achievements': { en: 'Achievements', fa: 'دستاوردها', ar: 'الإنجازات' },
  'nav.profile': { en: 'Profile', fa: 'پروفایل', ar: 'الملف الشخصي' },
  'nav.settings': { en: 'Settings', fa: 'تنظیمات', ar: 'الإعدادات' },

  // Home Page
  'home.playNow': { en: 'PLAY NOW', fa: 'شروع بازی', ar: 'العب الآن' },
  'home.exploreWorld': { en: 'EXPLORE WORLD', fa: 'کاوش جهان', ar: 'استكشف العالم' },
  'home.foodCollection': { en: 'FOOD COLLECTION', fa: 'مجموعه غذاها', ar: 'مجموعة الطعام' },
  'home.dailyChallenge': { en: 'DAILY CHALLENGE', fa: 'چالش روزانه', ar: 'التحدي اليومي' },
  'home.iranJourney': { en: 'IRAN FOOD JOURNEY', fa: 'سفر غذایی ایران', ar: 'رحلة الطعام الإيراني' },

  // Player Stats
  'stats.level': { en: 'Level', fa: 'سطح', ar: 'المستوى' },
  'stats.xp': { en: 'XP', fa: 'امتیاز تجربه', ar: 'نقاط الخبرة' },
  'stats.streak': { en: 'Streak', fa: 'زنجیره', ar: 'سلسلة' },
  'stats.coins': { en: 'Coins', fa: 'سکه', ar: 'عملات' },
  'stats.score': { en: 'Score', fa: 'امتیاز', ar: 'النقاط' },
  'stats.lives': { en: 'Lives', fa: 'جان', ar: 'أرواح' },

  // Question Types
  'question.food_guess': {
    en: 'What food is this?',
    fa: 'این چه غذایی است؟',
    ar: 'ما هو هذا الطعام؟'
  },
  'question.city_guess': {
    en: 'Which city is this food associated with?',
    fa: 'این غذا با کدام شهر مرتبط است؟',
    ar: 'مع أي مدينة يرتبط هذا الطعام؟'
  },
  'question.country_guess': {
    en: 'Which country is this food associated with?',
    fa: 'این غذا با کدام کشور مرتبط است؟',
    ar: 'مع أي دولة يرتبط هذا الطعام؟'
  },
  'question.region_guess': {
    en: 'Which region is this food associated with?',
    fa: 'این غذا با کدام منطقه مرتبط است؟',
    ar: 'مع أي منطقة يرتبط هذا الطعام؟'
  },
  'question.continent_guess': {
    en: 'Which continent is this country in?',
    fa: 'این کشور در کدام قاره قرار دارد؟',
    ar: 'في أي قارة تقع هذه الدولة؟'
  },
  'question.ingredient_guess': {
    en: 'What is a main ingredient?',
    fa: 'مواد اصلی چیست؟',
    ar: 'ما هي المكونات الرئيسية؟'
  },

  // Feedback
  'feedback.correct': {
    en: 'Correct! 🔥',
    fa: 'درست! 🔥',
    ar: 'صحيح! 🔥'
  },
  'feedback.wrong': {
    en: 'That food fooled you! 😆',
    fa: 'این غذا تو رو فریب داد! 😆',
    ar: 'هذا الطعام خدعك! 😆'
  },
  'feedback.combo': {
    en: 'Your taste buds are working! 😂',
    fa: 'جوانه‌های چشایی شما کار می‌کنند! 😂',
    ar: 'براعم التذوق الخاصة بك تعمل! 😂'
  },
  'feedback.perfect': {
    en: 'Perfect! 🌟',
    fa: 'عالی! 🌟',
    ar: 'ممتاز! 🌟'
  },

  // Food Info
  'food.ingredients': { en: 'Ingredients', fa: 'مواد تشکیل دهنده', ar: 'المكونات' },
  'food.recipe': { en: 'Recipe', fa: 'دستور پخت', ar: 'الوصفة' },
  'food.prepTime': { en: 'Prep Time', fa: 'زمان آماده‌سازی', ar: 'وقت التحضير' },
  'food.cookTime': { en: 'Cook Time', fa: 'زمان پخت', ar: 'وقت الطهي' },
  'food.totalTime': { en: 'Total Time', fa: 'زمان کل', ar: 'الوقت الإجمالي' },
  'food.servings': { en: 'Servings', fa: 'تعداد وعده', ar: 'الحصص' },
  'food.difficulty': { en: 'Difficulty', fa: 'سختی', ar: 'الصعوبة' },
  'food.culturalInfo': { en: 'Cultural Information', fa: 'اطلاعات فرهنگی', ar: 'المعلومات الثقافية' },
  'food.history': { en: 'Food History', fa: 'تاریخچه غذا', ar: 'تاريخ الطعام' },
  'food.facts': { en: 'Fun Facts', fa: 'حقایق جالب', ar: 'حقائق ممتعة' },
  'food.variations': { en: 'Regional Variations', fa: 'تنوعات منطقه‌ای', ar: 'الاختلافات الإقليمية' },

  // Difficulty Levels
  'difficulty.easy': { en: 'Easy', fa: 'آسان', ar: 'سهل' },
  'difficulty.medium': { en: 'Medium', fa: 'متوسط', ar: 'متوسط' },
  'difficulty.hard': { en: 'Hard', fa: 'سخت', ar: 'صعب' },
  'difficulty.extreme': { en: 'Extreme', fa: 'بسیار سخت', ar: 'متطرف' },

  // Rarity Levels
  'rarity.common': { en: 'Common', fa: 'رایج', ar: 'شائع' },
  'rarity.uncommon': { en: 'Uncommon', fa: 'غیر رایج', ar: 'غير شائع' },
  'rarity.rare': { en: 'Rare', fa: 'کمیاب', ar: 'نادر' },
  'rarity.epic': { en: 'Epic', fa: 'افسانه‌ای', ar: 'ملحمي' },
  'rarity.legendary': { en: 'Legendary', fa: 'legendary', ar: 'أسطوري' },
  'rarity.mythic': { en: 'Mythic', fa: 'اساطیری', ar: 'خرافي' },

  // Progress
  'progress.country': { en: 'Country Completion', fa: 'تکمیل کشور', ar: 'إكمال الدولة' },
  'progress.city': { en: 'City Completion', fa: 'تکمیل شهر', ar: 'إكمال المدينة' },
  'progress.world': { en: 'World Completion', fa: 'تکمیل جهان', ar: 'إكمال العالم' },
  'progress.foods': { en: 'Foods Discovered', fa: 'غذاهای کشف شده', ar: 'الأطعمة المكتشفة' },
  'progress.cities': { en: 'Cities Discovered', fa: 'شهرهای کشف شده', ar: 'المدن المكتشفة' },
  'progress.countries': { en: 'Countries Discovered', fa: 'کشورهای کشف شده', ar: 'الدول المكتشفة' },

  // Buttons
  'button.submit': { en: 'Submit', fa: 'ثبت', ar: 'إرسال' },
  'button.next': { en: 'Next', fa: 'بعدی', ar: 'التالي' },
  'button.back': { en: 'Back', fa: 'بازگشت', ar: 'رجوع' },
  'button.claim': { en: 'Claim Reward', fa: 'دریافت پاداش', ar: 'المطالبة بالمكافأة' },
  'button.claimed': { en: 'Claimed', fa: 'دریافت شده', ar: 'تمت المطالبة' },
  'button.play': { en: 'Play', fa: 'بازی', ar: 'لعب' },
  'button.search': { en: 'Search', fa: 'جستجو', ar: 'بحث' },
  'button.filter': { en: 'Filter', fa: 'فیلتر', ar: 'تصفية' },

  // Messages
  'message.noResults': {
    en: 'No foods found.',
    fa: 'هیچ غذایی یافت نشد.',
    ar: 'لم يتم العثور على أطعمة.'
  },
  'message.startPlaying': {
    en: 'Start playing to discover your first food!',
    fa: 'برای کشف اولین غذای خود شروع به بازی کنید!',
    ar: 'ابدأ اللعب لاكتشاف طعامك الأول!'
  },
  'message.loading': {
    en: 'Loading...',
    fa: 'در حال بارگذاری...',
    ar: 'جارٍ التحميل...'
  },
  'message.error': {
    en: 'An error occurred. Please try again.',
    fa: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.',
    ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
  },
  'message.dailyAlreadyClaimed': {
    en: 'You have already claimed today\'s reward!',
    fa: 'شما قبلاً پاداش امروز را دریافت کرده‌اید!',
    ar: 'لقد طالبت بالفعل بمكافأة اليوم!'
  },

  // Achievements
  'achievement.firstFood': {
    en: 'First Food',
    fa: 'اولین غذا',
    ar: 'الطعام الأول'
  },
  'achievement.tenFoods': {
    en: '10 Foods',
    fa: '۱۰ غذا',
    ar: '10 أطعمة'
  },
  'achievement.hundredFoods': {
    en: '100 Foods',
    fa: '۱۰۰ غذا',
    ar: '100 طعام'
  },
  'achievement.foodExpert': {
    en: 'Food Expert',
    fa: 'متخصص غذا',
    ar: 'خبير الطعام'
  },
  'achievement.worldExplorer': {
    en: 'World Food Explorer',
    fa: 'کاوشگر غذای جهان',
    ar: 'مستكشف طعام العالم'
  },
  'achievement.perfectQuiz': {
    en: 'Perfect Quiz',
    fa: 'کوییز کامل',
    ar: 'اختبار مثالي'
  },
  'achievement.legendaryHunter': {
    en: 'Legendary Food Hunter',
    fa: 'شکارچی غذای افسانه‌ای',
    ar: 'صياد الطعام الأسطوري'
  },

  // Settings
  'settings.language': { en: 'Language', fa: 'زبان', ar: 'اللغة' },
  'settings.sound': { en: 'Sound Effects', fa: 'افکت‌های صوتی', ar: 'مؤثرات صوتية' },
  'settings.calendar': { en: 'Calendar Type', fa: 'نوع تقویم', ar: 'نوع التقويم' },
  'settings.gregorian': { en: 'Gregorian', fa: 'میلادی', ar: 'ميلادي' },
  'settings.persian': { en: 'Persian (Solar Hijri)', fa: 'شمسی (هجری خورشیدی)', ar: 'فارسي (هجري شمسي)' },

  // Time
  'time.minutes': { en: 'minutes', fa: 'دقیقه', ar: 'دقائق' },
  'time.hours': { en: 'hours', fa: 'ساعت', ar: 'ساعات' },
  
  // Continent names
  'continent.asia': { en: 'Asia', fa: 'آسیا', ar: 'آسيا' },
  'continent.europe': { en: 'Europe', fa: 'اروپا', ar: 'أوروبا' },
  'continent.africa': { en: 'Africa', fa: 'آفریقا', ar: 'أفريقيا' },
  'continent.northAmerica': { en: 'North America', fa: 'آمریکای شمالی', ar: 'أمريكا الشمالية' },
  'continent.southAmerica': { en: 'South America', fa: 'آمریکای جنوبی', ar: 'أمريكا الجنوبية' },
  'continent.oceania': { en: 'Oceania', fa: 'اقیانوسیه', ar: 'أوقيانوسيا' },
  'continent.antarctica': { en: 'Antarctica', fa: 'جنوبگان', ar: 'أنتاركتيكا' }
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] || translations[key]?.en || key;
}

export function getDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';
}

export const supportedLanguages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
];
