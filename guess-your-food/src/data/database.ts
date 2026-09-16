// Food Database - Real Foods from Around the World
import type { Food, Country, City, Region } from '../types';

// ============================================
// COUNTRIES DATABASE
// ============================================

export const countries: Country[] = [
  // ASIA
  {
    id: 'ir',
    englishName: 'Iran',
    persianName: 'ایران',
    arabicName: 'إيران',
    flag: '🇮🇷',
    continent: 'Asia',
    region: 'Middle East',
    capital: 'Tehran',
    majorCities: ['tehran', 'isfahan', 'shiraz', 'tabriz', 'mashhad', 'rasht', 'yazd', 'kerman', 'ahvaz', 'kashan'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'jp',
    englishName: 'Japan',
    persianName: 'ژاپن',
    arabicName: 'اليابان',
    flag: '🇯🇵',
    continent: 'Asia',
    region: 'East Asia',
    capital: 'Tokyo',
    majorCities: ['tokyo', 'hiroshima', 'osaka', 'kyoto', 'nara', 'sapporo', 'fukuoka', 'nagoya', 'kobe', 'yokohama'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'it',
    englishName: 'Italy',
    persianName: 'ایتالیا',
    arabicName: 'إيطاليا',
    flag: '🇮🇹',
    continent: 'Europe',
    region: 'Southern Europe',
    capital: 'Rome',
    majorCities: ['rome', 'naples', 'florence', 'venice', 'milan', 'bologna', 'turin', 'palermo', 'genoa', 'verona'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'cn',
    englishName: 'China',
    persianName: 'چین',
    arabicName: 'الصين',
    flag: '🇨🇳',
    continent: 'Asia',
    region: 'East Asia',
    capital: 'Beijing',
    majorCities: ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'chengdu', 'chongqing', 'wuhan', 'xian', 'hangzhou', 'nanjing'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'in',
    englishName: 'India',
    persianName: 'هند',
    arabicName: 'الهند',
    flag: '🇮🇳',
    continent: 'Asia',
    region: 'South Asia',
    capital: 'New Delhi',
    majorCities: ['delhi', 'mumbai', 'kolkata', 'chennai', 'bangalore', 'hyderabad', 'ahmedabad', 'pune', 'jaipur', 'lucknow'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'mx',
    englishName: 'Mexico',
    persianName: 'مکزیک',
    arabicName: 'المكسيك',
    flag: '🇲🇽',
    continent: 'North America',
    region: 'Central America',
    capital: 'Mexico City',
    majorCities: ['mexicoCity', 'guadalajara', 'monterrey', 'puebla', 'tijuana', 'leon', 'juarez', 'merida', 'cancun', 'oaxaca'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'tr',
    englishName: 'Turkey',
    persianName: 'ترکیه',
    arabicName: 'تركيا',
    flag: '🇹🇷',
    continent: 'Asia',
    region: 'Middle East',
    capital: 'Ankara',
    majorCities: ['istanbul', 'ankara', 'izmir', 'antalya', 'burgas', 'konya', 'gaziantep', 'sanliurfa', 'kayseri', 'mersin'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'fr',
    englishName: 'France',
    persianName: 'فرانسه',
    arabicName: 'فرنسا',
    flag: '🇫🇷',
    continent: 'Europe',
    region: 'Western Europe',
    capital: 'Paris',
    majorCities: ['paris', 'lyon', 'marseille', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'th',
    englishName: 'Thailand',
    persianName: 'تایلند',
    arabicName: 'تايلاند',
    flag: '🇹🇭',
    continent: 'Asia',
    region: 'Southeast Asia',
    capital: 'Bangkok',
    majorCities: ['bangkok', 'chiangMai', 'phuket', 'pattaya', 'krabi', 'ayutthaya', 'sukhothai', 'huaHin', 'samui', 'chiangRai'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'gr',
    englishName: 'Greece',
    persianName: 'یونان',
    arabicName: 'اليونان',
    flag: '🇬🇷',
    continent: 'Europe',
    region: 'Southern Europe',
    capital: 'Athens',
    majorCities: ['athens', 'thessaloniki', 'patras', 'heraklion', 'larissa', 'volos', 'rhodes', 'ioannina', 'chania', 'corfu'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'es',
    englishName: 'Spain',
    persianName: 'اسپانیا',
    arabicName: 'إسبانيا',
    flag: '🇪🇸',
    continent: 'Europe',
    region: 'Southern Europe',
    capital: 'Madrid',
    majorCities: ['madrid', 'barcelona', 'valencia', 'seville', 'zaragoza', 'malaga', 'murcia', 'palma', 'bilbao', 'alicante'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'vn',
    englishName: 'Vietnam',
    persianName: 'ویتنام',
    arabicName: 'فيتنام',
    flag: '🇻🇳',
    continent: 'Asia',
    region: 'Southeast Asia',
    capital: 'Hanoi',
    majorCities: ['hanoi', 'hoChiMinh', 'daNang', 'hue', 'hoian', 'nhaTrang', 'canTho', 'haiPhong', 'dalat', 'vungTau'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'kr',
    englishName: 'South Korea',
    persianName: 'کره جنوبی',
    arabicName: 'كوريا الجنوبية',
    flag: '🇰🇷',
    continent: 'Asia',
    region: 'East Asia',
    capital: 'Seoul',
    majorCities: ['seoul', 'busan', 'incheon', 'daegu', 'daejeon', 'gwangju', 'suwon', 'ulsan', 'changwon', 'jeju'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'lb',
    englishName: 'Lebanon',
    persianName: 'لبنان',
    arabicName: 'لبنان',
    flag: '🇱🇧',
    continent: 'Asia',
    region: 'Middle East',
    capital: 'Beirut',
    majorCities: ['beirut', 'tripoli', 'sidon', 'tyre', 'jounieh', 'zahle', 'baalbek', 'byblos', 'amen', 'batroun'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'eg',
    englishName: 'Egypt',
    persianName: 'مصر',
    arabicName: 'مصر',
    flag: '🇪🇬',
    continent: 'Africa',
    region: 'North Africa',
    capital: 'Cairo',
    majorCities: ['cairo', 'alexandria', 'giza', 'luxor', 'aswan', 'portsaid', 'suez', 'ismailia', 'fayoum', 'mansoura'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'us',
    englishName: 'United States',
    persianName: 'ایالات متحده',
    arabicName: 'الولايات المتحدة',
    flag: '🇺🇸',
    continent: 'North America',
    region: 'North America',
    capital: 'Washington D.C.',
    majorCities: ['newYork', 'losAngeles', 'chicago', 'houston', 'phoenix', 'philadelphia', 'sanAntonio', 'sanDiego', 'dallas', 'sanJose'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'br',
    englishName: 'Brazil',
    persianName: 'برزیل',
    arabicName: 'البرازيل',
    flag: '🇧🇷',
    continent: 'South America',
    region: 'South America',
    capital: 'Brasilia',
    majorCities: ['saoPaulo', 'rioDeJaneiro', 'brasilia', 'salvador', 'fortaleza', 'beloHorizonte', 'manaus', 'curitiba', 'recife', 'portoAlegre'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'de',
    englishName: 'Germany',
    persianName: 'آلمان',
    arabicName: 'ألمانيا',
    flag: '🇩🇪',
    continent: 'Europe',
    region: 'Central Europe',
    capital: 'Berlin',
    majorCities: ['berlin', 'munich', 'hamburg', 'cologne', 'frankfurt', 'stuttgart', 'dusseldorf', 'dortmund', 'essen', 'leipzig'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'ma',
    englishName: 'Morocco',
    persianName: 'مراکش',
    arabicName: 'المغرب',
    flag: '🇲🇦',
    continent: 'Africa',
    region: 'North Africa',
    capital: 'Rabat',
    majorCities: ['casablanca', 'rabat', 'marrakech', 'fes', 'tangier', 'agadir', 'meknes', 'oujda', 'kenitra', 'tetouan'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  },
  {
    id: 'pk',
    englishName: 'Pakistan',
    persianName: 'پاکستان',
    arabicName: 'باكستان',
    flag: '🇵🇰',
    continent: 'Asia',
    region: 'South Asia',
    capital: 'Islamabad',
    majorCities: ['karachi', 'lahore', 'islamabad', 'rawalpindi', 'faisalabad', 'multan', 'peshawar', 'quetta', 'sialkot', 'bahawalpur'],
    foodIds: [],
    completionData: { foodsDiscovered: 0, totalFoods: 0, citiesDiscovered: 0, totalCities: 0 }
  }
];

// ============================================
// CITIES DATABASE
// ============================================

export const cities: City[] = [
  // IRAN CITIES
  { id: 'tehran', englishName: 'Tehran', persianName: 'تهران', arabicName: 'طهران', countryId: 'ir', region: 'Tehran Province', foodIds: [] },
  { id: 'isfahan', englishName: 'Isfahan', persianName: 'اصفهان', arabicName: 'أصفهان', countryId: 'ir', region: 'Isfahan Province', foodIds: [] },
  { id: 'shiraz', englishName: 'Shiraz', persianName: 'شیراز', arabicName: 'شiraz', countryId: 'ir', region: 'Fars Province', foodIds: [] },
  { id: 'tabriz', englishName: 'Tabriz', persianName: 'تبریز', arabicName: 'تبريز', countryId: 'ir', region: 'East Azerbaijan', foodIds: [] },
  { id: 'mashhad', englishName: 'Mashhad', persianName: 'مشهد', arabicName: 'مشهد', countryId: 'ir', region: 'Razavi Khorasan', foodIds: [] },
  { id: 'rasht', englishName: 'Rasht', persianName: 'رشت', arabicName: 'رشت', countryId: 'ir', region: 'Gilan Province', foodIds: [] },
  { id: 'yazd', englishName: 'Yazd', persianName: 'یزد', arabicName: 'يزد', countryId: 'ir', region: 'Yazd Province', foodIds: [] },
  { id: 'kerman', englishName: 'Kerman', persianName: 'کرمان', arabicName: 'كرمان', countryId: 'ir', region: 'Kerman Province', foodIds: [] },
  { id: 'ahvaz', englishName: 'Ahvaz', persianName: 'اهواز', arabicName: 'الأهواز', countryId: 'ir', region: 'Khuzestan', foodIds: [] },
  { id: 'kashan', englishName: 'Kashan', persianName: 'کاشان', arabicName: 'كاشان', countryId: 'ir', region: 'Isfahan Province', foodIds: [] },
  
  // JAPAN CITIES
  { id: 'tokyo', englishName: 'Tokyo', persianName: 'توکیو', arabicName: 'طوكيو', countryId: 'jp', region: 'Kanto', foodIds: [] },
  { id: 'hiroshima', englishName: 'Hiroshima', persianName: 'هیروشیما', arabicName: 'هيروشيما', countryId: 'jp', region: 'Chugoku', foodIds: [] },
  { id: 'osaka', englishName: 'Osaka', persianName: 'اوساکا', arabicName: 'أوساكا', countryId: 'jp', region: 'Kansai', foodIds: [] },
  { id: 'kyoto', englishName: 'Kyoto', persianName: 'کیوتو', arabicName: 'كيوتو', countryId: 'jp', region: 'Kansai', foodIds: [] },
  { id: 'nara', englishName: 'Nara', persianName: 'نارا', arabicName: 'نارا', countryId: 'jp', region: 'Kansai', foodIds: [] },
  { id: 'sapporo', englishName: 'Sapporo', persianName: 'ساپورو', arabicName: 'سابورو', countryId: 'jp', region: 'Hokkaido', foodIds: [] },
  { id: 'fukuoka', englishName: 'Fukuoka', persianName: 'فوکوئوکا', arabicName: 'فوكوكا', countryId: 'jp', region: 'Kyushu', foodIds: [] },
  { id: 'nagoya', englishName: 'Nagoya', persianName: 'ناگویا', arabicName: 'ناغويا', countryId: 'jp', region: 'Chubu', foodIds: [] },
  { id: 'kobe', englishName: 'Kobe', persianName: 'کوبه', arabicName: 'كوبي', countryId: 'jp', region: 'Kansai', foodIds: [] },
  { id: 'yokohama', englishName: 'Yokohama', persianName: 'یوکوهاما', arabicName: 'يوكوهاما', countryId: 'jp', region: 'Kanto', foodIds: [] },
  
  // ITALY CITIES
  { id: 'rome', englishName: 'Rome', persianName: 'رم', arabicName: 'روما', countryId: 'it', region: 'Lazio', foodIds: [] },
  { id: 'naples', englishName: 'Naples', persianName: 'ناپل', arabicName: 'نابولي', countryId: 'it', region: 'Campania', foodIds: [] },
  { id: 'florence', englishName: 'Florence', persianName: 'فلورانس', arabicName: 'فلورنسا', countryId: 'it', region: 'Tuscany', foodIds: [] },
  { id: 'venice', englishName: 'Venice', persianName: 'ونیز', arabicName: 'البندقية', countryId: 'it', region: 'Veneto', foodIds: [] },
  { id: 'milan', englishName: 'Milan', persianName: 'میلان', arabicName: 'ميلانو', countryId: 'it', region: 'Lombardy', foodIds: [] },
  { id: 'bologna', englishName: 'Bologna', persianName: 'بولونیا', arabicName: 'بولونيا', countryId: 'it', region: 'Emilia-Romagna', foodIds: [] },
  { id: 'turin', englishName: 'Turin', persianName: 'تورین', arabicName: 'تورينو', countryId: 'it', region: 'Piedmont', foodIds: [] },
  { id: 'palermo', englishName: 'Palermo', persianName: 'پالرمو', arabicName: 'باليرمو', countryId: 'it', region: 'Sicily', foodIds: [] },
  { id: 'genoa', englishName: 'Genoa', persianName: 'جنوا', arabicName: 'جنوة', countryId: 'it', region: 'Liguria', foodIds: [] },
  { id: 'verona', englishName: 'Verona', persianName: 'ورونا', arabicName: 'فيرونا', countryId: 'it', region: 'Veneto', foodIds: [] }
];

// ============================================
// FOODS DATABASE (Starting with Iranian Foods)
// ============================================

export const foods: Food[] = [
  // IRANIAN FOODS - Tehran
  {
    id: 'ghormeh-sabzi',
    name: 'Ghormeh Sabzi',
    nativeName: 'قورمه سبزی',
    englishName: 'Ghormeh Sabzi',
    persianName: 'قورمه سبزی',
    arabicName: 'قورمة سبزي',
    countryIds: ['ir'],
    regionIds: [],
    cityIds: ['tehran'],
    category: 'Main Dish',
    description: {
      en: 'A traditional Persian herb stew with kidney beans and lamb, considered Iran\'s national dish.',
      fa: 'یک خورش سنتی ایرانی با سبزی، لوبیا قرمز و گوشت گوسفند که به عنوان غذای ملی ایران شناخته می‌شود.',
      ar: 'يطبق تقليدي فارسي من اليخنة مع الأعشاب والفاصوليا الحمراء والضأن، يعتبر الطبق الوطني الإيراني.'
    },
    ingredients: ['Fresh herbs (parsley, cilantro, fenugreek)', 'Kidney beans', 'Lamb or beef', 'Dried limes', 'Onions', 'Turmeric', 'Salt', 'Pepper'],
    recipe: {
      ingredients: [
        { name: { en: 'Fresh herbs mix', fa: 'سبزی قورمه', ar: 'خليط الأعشاب الطازجة' }, amount: '500', unit: 'g' },
        { name: { en: 'Kidney beans', fa: 'لوبیا قرمز', ar: 'فاصوليا حمراء' }, amount: '2', unit: 'cups' },
        { name: { en: 'Lamb', fa: 'گوشت گوسفند', ar: 'لحم ضأن' }, amount: '400', unit: 'g' },
        { name: { en: 'Dried limes', fa: 'لیمو عمانی', ar: 'لومي مجفف' }, amount: '4', unit: 'pieces' },
        { name: { en: 'Onion', fa: 'پیاز', ar: 'بصل' }, amount: '2', unit: 'medium' }
      ],
      preparationTime: 30,
      cookingTime: 120,
      totalTime: 150,
      servings: 4,
      difficulty: 'Medium',
      cookingMethod: 'Stewing',
      steps: [
        { stepNumber: 1, instruction: { en: 'Wash and finely chop the fresh herbs (parsley, cilantro, fenugreek).', fa: 'سبزی‌ها را بشویید و ریز خرد کنید.', ar: 'اغسل الأعشاب الطازجة وقطعها ناعماً.' } },
        { stepNumber: 2, instruction: { en: 'Fry the herbs in oil until dark green.', fa: 'سبزی را در روغن تفت دهید تا تیره شود.', ar: 'اقلي الأعشاب في الزيت حتى تصبح خضراء داكنة.' } },
        { stepNumber: 3, instruction: { en: 'Brown the meat with onions and turmeric.', fa: 'گوشت را با پیاز و زردچوبه تفت دهید.', ar: 'حمّر اللحم مع البصل والكركم.' } },
        { stepNumber: 4, instruction: { en: 'Add herbs, beans, dried limes and water. Simmer for 2 hours.', fa: 'سبزی، لوبیا، لیمو عمانی و آب را اضافه کرده و ۲ ساعت بپزید.', ar: 'أضف الأعشاب والفاصوليا واللومي والماء. اطبخ لمدة ساعتين.' } },
        { stepNumber: 5, instruction: { en: 'Serve hot with Persian rice.', fa: 'با برنج ایرانی سرو کنید.', ar: 'قدم ساخناً مع الأرز الفارسي.' } }
      ]
    },
    preparationTime: 30,
    cookingTime: 120,
    servings: 4,
    cookingMethod: 'Stewing',
    culturalInfo: {
      en: 'Ghormeh Sabzi is often served at family gatherings and special occasions. It is considered the most popular dish in Iran.',
      fa: 'قورمه سبزی معمولاً در دورهمی‌های خانوادگی و مناسبت‌های خاص سرو می‌شود. محبوب‌ترین غذای ایران محسوب می‌شود.',
      ar: 'غالباً ما تقدم قورمة سبزي في التجمعات العائلية والمناسبات الخاصة. تعتبر الطبق الأكثر شعبية في إيران.'
    },
    foodHistory: {
      en: 'This dish has ancient Persian roots and has been prepared for centuries.',
      fa: 'این غذا ریشه در ایران باستان دارد و قرن‌هاست که تهیه می‌شود.',
      ar: 'لهذا الطبق جذور فارسية قديمة وقد تم تحضيره لقرون.'
    },
    foodFacts: {
      en: 'The key to perfect Ghormeh Sabzi is properly frying the herbs.',
      fa: 'راز قورمه سبزی عالی، سرخ کردن صحیح سبزی است.',
      ar: 'المفتاح لقورمة سبزي المثالية هو قلي الأعشاب بشكل صحيح.'
    },
    funFacts: {
      en: 'Every Iranian family has their own secret recipe for Ghormeh Sabzi!',
      fa: 'هر خانواده ایرانی دستور پخت مخفی خود را برای قورمه سبزی دارد!',
      ar: 'كل عائلة إيرانية لديها وصفة سرية خاصة بها لقورمة سبزي!'
    },
    regionalVariations: {
      en: 'Northern Iran adds more fenugreek, while southern regions use more dried limes.',
      fa: 'شمال ایران شنبلیله بیشتری اضافه می‌کند، در حالی که مناطق جنوبی لیمو عمانی بیشتری استفاده می‌کنند.',
      ar: 'شمال إيران يضيف المزيد من الحلبة، بينما تستخدم المناطق الجنوبية المزيد من اللومي.'
    },
    difficulty: 'Medium',
    rarity: 'Common',
    image: '/images/foods/ghormeh-sabzi.jpg',
    aliases: ['Ghorme Sabzi', 'Ghomeh Sabzi'],
    tags: ['stew', 'persian', 'traditional', 'lamb', 'herbs']
  },
  {
    id: 'fesenjan',
    name: 'Fesenjan',
    nativeName: 'فسنجان',
    englishName: 'Fesenjan',
    persianName: 'فسنجان',
    arabicName: 'فسنجان',
    countryIds: ['ir'],
    regionIds: [],
    cityIds: ['tehran', 'rasht'],
    category: 'Main Dish',
    description: {
      en: 'A rich Persian stew made with ground walnuts and pomegranate molasses, typically with duck or chicken.',
      fa: 'یک خورش غنی ایرانی تهیه شده با گردوی آسیاب شده و رب انار، معمولاً با مرغ یا اردک.',
      ar: 'يطبخ فارسي غني مصنوع من الجوز المطحون ودبس الرمان، عادة مع البط أو الدجاج.'
    },
    ingredients: ['Ground walnuts', 'Pomegranate molasses', 'Duck or chicken', 'Onions', 'Sugar (optional)', 'Salt', 'Ice cubes'],
    recipe: {
      ingredients: [
        { name: { en: 'Ground walnuts', fa: 'گردو آسیاب شده', ar: 'جوز مطحون' }, amount: '400', unit: 'g' },
        { name: { en: 'Pomegranate molasses', fa: 'رب انار', ar: 'دبس الرمان' }, amount: '1', unit: 'cup' },
        { name: { en: 'Duck', fa: 'اردک', ar: 'بط' }, amount: '500', unit: 'g' },
        { name: { en: 'Onion', fa: 'پیاز', ar: 'بصل' }, amount: '1', unit: 'large' }
      ],
      preparationTime: 20,
      cookingTime: 180,
      totalTime: 200,
      servings: 4,
      difficulty: 'Hard',
      cookingMethod: 'Slow cooking',
      steps: [
        { stepNumber: 1, instruction: { en: 'Grind walnuts finely.', fa: 'گردو را ریز آسیاب کنید.', ar: 'اطحن الجوز ناعماً.' } },
        { stepNumber: 2, instruction: { en: 'Brown the meat with onion.', fa: 'گوشت را با پیاز تفت دهید.', ar: 'حمّر اللحم مع البصل.' } },
        { stepNumber: 3, instruction: { en: 'Mix walnuts with pomegranate molasses and water.', fa: 'گردو را با رب انار و آب مخلوط کنید.', ar: 'اخلط الجوز مع دبس الرمان والماء.' } },
        { stepNumber: 4, instruction: { en: 'Simmer on low heat for 3 hours, stirring occasionally.', fa: 'به مدت ۳ ساعت روی حرارت کم بپزید.', ar: 'اطبخ على نار هادئة لمدة 3 ساعات.' } },
        { stepNumber: 5, instruction: { en: 'Add ice cubes one by one to release walnut oil.', fa: 'تکه‌های یخ را یکی یکی اضافه کنید.', ar: 'أضف مكعبات الثلج واحدة تلو الأخرى.' } }
      ]
    },
    preparationTime: 20,
    cookingTime: 180,
    servings: 4,
    cookingMethod: 'Slow cooking',
    culturalInfo: {
      en: 'Fesenjan is traditionally served during Yalda Night and other celebrations.',
      fa: 'فسنجان به طور سنتی در شب یلدا و سایر جشن‌ها سرو می‌شود.',
      ar: 'يقدم فسنجان تقليدياً في ليلة يلدا وغيرها من الاحتفالات.'
    },
    foodHistory: {
      en: 'Fesenjan dates back to ancient Persia and was mentioned in historical texts from the Sassanian era.',
      fa: 'فسنجان به ایران باستان باز می‌گردد و در متون تاریخی دوره ساسانی ذکر شده است.',
      ar: 'يعود فسنجان إلى فارس القديمة وتم ذكره في النصوص التاريخية من العصر الساساني.'
    },
    foodFacts: {
      en: 'The longer you cook Fesenjan, the darker and richer it becomes.',
      fa: 'هرچه فسنجان بیشتر بپزد، تیره‌تر و غنی‌تر می‌شود.',
      ar: 'كلما طهيت فسنجان لفترة أطول، أصبح أغمق وأكثر غنى.'
    },
    funFacts: {
      en: 'Some families add a bit of chocolate to enhance the color!',
      fa: 'برخی خانواده‌ها کمی شکلات برای بهبود رنگ اضافه می‌کنند!',
      ar: 'بعض العائلات تضيف قليلاً من الشوكولاتة لتحسين اللون!'
    },
    regionalVariations: {
      en: 'Northern Iran uses sour pomegranate, while central regions prefer sweeter versions.',
      fa: 'شمال ایران از انار ترش استفاده می‌کند، در حالی که مناطق مرکزی نسخه‌های شیرین‌تر را ترجیح می‌دهند.',
      ar: 'شمال إيران يستخدم الرمان الحامض، بينما تفضل المناطق المركزية النسخ الأكثر حلاوة.'
    },
    difficulty: 'Hard',
    rarity: 'Uncommon',
    image: '/images/foods/fesenjan.jpg',
    aliases: ['Fesenjoon', 'Khoresht Fesenjan'],
    tags: ['stew', 'persian', 'walnut', 'pomegranate', 'special-occasion']
  },
  {
    id: 'tahdig',
    name: 'Tahdig',
    nativeName: 'ته‌دیگ',
    englishName: 'Tahdig',
    persianName: 'ته‌دیگ',
    arabicName: 'تهديگ',
    countryIds: ['ir'],
    regionIds: [],
    cityIds: ['tehran'],
    category: 'Rice Dish',
    description: {
      en: 'The crispy golden layer of rice at the bottom of the pot, considered a delicacy in Persian cuisine.',
      fa: 'لایه طلایی و برشته برنج در ته قابلمه که در آشپزی ایرانی یک غذای لذیذ محسوب می‌شود.',
      ar: 'الطبقة الذهبية المقرمشة من الأرز في قاع القدر، تعتبر من المأكولات الشهية في المطبخ الفارسي.'
    },
    ingredients: ['Persian rice', 'Yogurt', 'Egg', 'Saffron', 'Butter or oil', 'Salt'],
    recipe: {
      ingredients: [
        { name: { en: 'Persian rice', fa: 'برنج ایرانی', ar: 'أرز فارسي' }, amount: '3', unit: 'cups' },
        { name: { en: 'Yogurt', fa: 'ماست', ar: 'زبادي' }, amount: '1/2', unit: 'cup' },
        { name: { en: 'Egg', fa: 'تخم مرغ', ar: 'بيضة' }, amount: '1', unit: 'large' },
        { name: { en: 'Saffron', fa: 'زعفران', ar: 'زعفران' }, amount: '1/4', unit: 'tsp' },
        { name: { en: 'Butter', fa: 'کره', ar: 'زبدة' }, amount: '100', unit: 'g' }
      ],
      preparationTime: 15,
      cookingTime: 60,
      totalTime: 75,
      servings: 4,
      difficulty: 'Medium',
      cookingMethod: 'Steaming',
      steps: [
        { stepNumber: 1, instruction: { en: 'Parboil the rice until almost cooked.', fa: 'برنج را نیم‌پز کنید.', ar: 'اسلق الأرز حتى ينضج جزئياً.' } },
        { stepNumber: 2, instruction: { en: 'Mix yogurt, egg, and saffron.', fa: 'ماست، تخم مرغ و زعفران را مخلوط کنید.', ar: 'اخلط الزبادي والبيض والزعفران.' } },
        { stepNumber: 3, instruction: { en: 'Spread mixture at the bottom of the pot with oil.', fa: 'مخلوط را با روغن در ته قابلمه پخش کنید.', ar: 'افردي الخليط في قاع القدر مع الزيت.' } },
        { stepNumber: 4, instruction: { en: 'Layer rice on top and steam for 45 minutes.', fa: 'برنج را روی آن ریخته و ۴۵ دقیقه دم کنید.', ar: 'ضع الأرز فوقه واتركه على البخار لمدة 45 دقيقة.' } }
      ]
    },
    preparationTime: 15,
    cookingTime: 60,
    servings: 4,
    cookingMethod: 'Steaming',
    culturalInfo: {
      en: 'Tahdig is often offered to honored guests as a sign of hospitality.',
      fa: 'ته‌دیگ اغلب به مهمانان عزیز به عنوان نشانه مهمان‌نوازی عرضه می‌شود.',
      ar: 'غالباً ما يقدم التهديج للضيوف الكرام كعلامة على حسن الضيافة.'
    },
    foodHistory: {
      en: 'Tahdig has been a beloved part of Persian cuisine for thousands of years.',
      fa: 'ته‌دیگ هزاران سال بخشی محبوب از آشپزی ایرانی بوده است.',
      ar: 'كان التهديج جزءاً محبوباً من المطبخ الفارسي لآلاف السنين.'
    },
    foodFacts: {
      en: 'The word Tahdig literally means "bottom of the pot" in Persian.',
      fa: 'کلمه ته‌دیگ به معنای واقعی «ته دیگ» در فارسی است.',
      ar: 'كلمة تهديج تعني حرفياً "قاع القدر" بالفارسية.'
    },
    funFacts: {
      en: 'There are even restaurants in Tehran that specialize only in Tahdig!',
      fa: 'حتی رستوران‌هایی در تهران وجود دارند که فقط تخصصشان ته‌دیگ است!',
      ar: 'هناك حتى مطاعم في طهران متخصصة فقط في التهديج!'
    },
    regionalVariations: {
      en: 'Some regions add potato slices or lavash bread for extra crunch.',
      fa: 'برخی مناطق ورقه‌های سیب‌زمینی یا نان لواش برای تردی بیشتر اضافه می‌کنند.',
      ar: 'بعض المناطق تضيف شرائح البطاطس أو خبز اللواش لمزيد من القرمشة.'
    },
    difficulty: 'Medium',
    rarity: 'Common',
    image: '/images/foods/tahdig.jpg',
    aliases: ['Tahchin', 'Golden Rice'],
    tags: ['rice', 'persian', 'crispy', 'side-dish']
  },
  {
    id: 'koofteh-tabrizi',
    name: 'Koofteh Tabrizi',
    nativeName: 'کوفته تبریزی',
    englishName: 'Koofteh Tabrizi',
    persianName: 'کوفته تبریزی',
    arabicName: 'كفتة تبريزية',
    countryIds: ['ir'],
    regionIds: [],
    cityIds: ['tabriz'],
    category: 'Main Dish',
    description: {
      en: 'Large meatballs from Tabriz filled with prunes, eggs, and walnuts, served in a tomato-based sauce.',
      fa: 'کوفته‌های بزرگ تبریزی پر شده با آلو، تخم مرغ و گردو، سرو شده در سس گوجه فرنگی.',
      ar: 'كرات لحم كبيرة من تبريز محشوة بالبرقوق والبيض والجوز، تقدم في صلصة الطماطم.'
    },
    ingredients: ['Ground lamb', 'Rice', 'Split peas', 'Prunes', 'Hard-boiled eggs', 'Walnuts', 'Tomato sauce', 'Turmeric', 'Onions'],
    recipe: {
      ingredients: [
        { name: { en: 'Ground lamb', fa: 'گوشت چرخ کرده', ar: 'لحم مفروم' }, amount: '500', unit: 'g' },
        { name: { en: 'Rice', fa: 'برنج', ar: 'أرز' }, amount: '1', unit: 'cup' },
        { name: { en: 'Split peas', fa: 'لپه', ar: 'بازلاء' }, amount: '1/2', unit: 'cup' },
        { name: { en: 'Prunes', fa: 'آلو', ar: 'برقوق' }, amount: '8', unit: 'pieces' },
        { name: { en: 'Eggs', fa: 'تخم مرغ', ar: 'بيض' }, amount: '4', unit: 'large' }
      ],
      preparationTime: 45,
      cookingTime: 90,
      totalTime: 135,
      servings: 4,
      difficulty: 'Hard',
      cookingMethod: 'Boiling',
      steps: [
        { stepNumber: 1, instruction: { en: 'Cook rice and split peas separately.', fa: 'برنج و لپه را جداگانه بپزید.', ar: 'اطبخ الأرز والبازلاء بشكل منفصل.' } },
        { stepNumber: 2, instruction: { en: 'Mix meat with rice, peas, and spices.', fa: 'گوشت را با برنج، لپه و ادویه مخلوط کنید.', ar: 'اخلط اللحم مع الأرز والبازلاء والتوابل.' } },
        { stepNumber: 3, instruction: { en: 'Form large balls with prune and egg inside.', fa: 'توپ‌های بزرگ با آلو و تخم مرغ داخل تشکیل دهید.', ar: 'شكل كرات كبيرة مع البرقوق والبيض في الداخل.' } },
        { stepNumber: 4, instruction: { en: 'Simmer in tomato sauce for 90 minutes.', fa: 'در سس گوجه فرنگی ۹۰ دقیقه بپزید.', ar: 'اطبخ في صلصة الطماطم لمدة 90 دقيقة.' } }
      ]
    },
    preparationTime: 45,
    cookingTime: 90,
    servings: 4,
    cookingMethod: 'Boiling',
    culturalInfo: {
      en: 'Koofteh Tabrizi is a signature dish of Tabriz and represents Azerbaijani-Iranian cuisine.',
      fa: 'کوفته تبریزی غذای امضای تبریز است و نماینده آشپزی آذربایجانی-ایرانی است.',
      ar: 'كفتة تبريزية هي الطبق المميز لتبريز وتمثل المطبخ الأذربيجاني الإيراني.'
    },
    foodHistory: {
      en: 'This dish originated in Tabriz and has been prepared since the Safavid era.',
      fa: 'این غذا در تبریز منشأ گرفته و از دوران صفویه تهیه می‌شده است.',
      ar: 'نشأ هذا الطبق في تبريز ويتم تحضيره منذ العصر الصفوي.'
    },
    foodFacts: {
      en: 'Each Koofteh can weigh up to 500 grams!',
      fa: 'هر کوفته می‌تواند تا ۵۰۰ گرم وزن داشته باشد!',
      ar: 'يمكن أن تزن كل كفتة ما يصل إلى 500 جرام!'
    },
    funFacts: {
      en: 'Making Koofteh Tabrizi is considered an art form in Tabriz!',
      fa: 'درست کردن کوفته تبریزی در تبریز یک هنر محسوب می‌شود!',
      ar: 'صنع كفتة تبريزية يعتبر شكلاً من أشكال الفن في تبريز!'
    },
    regionalVariations: {
      en: 'Some versions include herbs like mint and parsley.',
      fa: 'برخی نسخه‌ها شامل سبزیجاتی مانند نعناع و جعفری هستند.',
      ar: 'بعض النسخ تشمل أعشاباً مثل النعناع والبقدونس.'
    },
    difficulty: 'Hard',
    rarity: 'Rare',
    image: '/images/foods/koofteh-tabrizi.jpg',
    aliases: ['Tabriz Meatball', 'Kufteh'],
    tags: ['meatball', 'tabriz', 'azerbaijani', 'traditional']
  },
  {
    id: 'zereshk-polo',
    name: 'Zereshk Polo',
    nativeName: 'زرشک پلو',
    englishName: 'Zereshk Polo',
    persianName: 'زرشک پلو',
    arabicName: 'زرشك بلو',
    countryIds: ['ir'],
    regionIds: [],
    cityIds: ['mashhad'],
    category: 'Rice Dish',
    description: {
      en: 'Persian barberry rice with chicken, a festive dish especially popular in Khorasan province.',
      fa: 'برنج با زرشک و مرغ، یک غذای جشن مخصوصاً محبوب در استان خراسان.',
      ar: 'أرز البرباريس الفارسي مع الدجاج، طبق احتفالي شائع خاصة في مقاطعة خراسان.'
    },
    ingredients: ['Persian rice', 'Barberries (Zereshk)', 'Chicken', 'Saffron', 'Butter', 'Sugar', 'Orange zest', 'Cardamom'],
    recipe: {
      ingredients: [
        { name: { en: 'Persian rice', fa: 'برنج ایرانی', ar: 'أرز فارسي' }, amount: '3', unit: 'cups' },
        { name: { en: 'Barberries', fa: 'زرشک', ar: 'برباريس' }, amount: '1', unit: 'cup' },
        { name: { en: 'Chicken', fa: 'مرغ', ar: 'دجاج' }, amount: '1', unit: 'whole' },
        { name: { en: 'Saffron', fa: 'زعفران', ar: 'زعفران' }, amount: '1/2', unit: 'tsp' },
        { name: { en: 'Sugar', fa: 'شکر', ar: 'سكر' }, amount: '2', unit: 'tbsp' }
      ],
      preparationTime: 30,
      cookingTime: 90,
      totalTime: 120,
      servings: 6,
      difficulty: 'Medium',
      cookingMethod: 'Steaming',
      steps: [
        { stepNumber: 1, instruction: { en: 'Marinate chicken with saffron and spices.', fa: 'مرغ را با زعفران و ادویه مزه‌دار کنید.', ar: 'تبّل الدجاج مع الزعفران والتوابل.' } },
        { stepNumber: 2, instruction: { en: 'Cook chicken until tender.', fa: 'مرغ را بپزید تا نرم شود.', ar: 'اطبخ الدجاج حتى ينضج.' } },
        { stepNumber: 3, instruction: { en: 'Sauté barberries with sugar.', fa: 'زرشک را با شکر تفت دهید.', ar: 'اقلي البرباريس مع السكر.' } },
        { stepNumber: 4, instruction: { en: 'Layer rice with barberries and steam.', fa: 'برنج را با زرشک لایه بندی و دم کنید.', ar: 'رصّ الأرز مع البرباريس واتركه على البخار.' } }
      ]
    },
    preparationTime: 30,
    cookingTime: 90,
    servings: 6,
    cookingMethod: 'Steaming',
    culturalInfo: {
      en: 'Zereshk Polo is traditionally served during Nowruz and other celebrations.',
      fa: 'زرشک پلو به طور سنتی در نوروز و سایر جشن‌ها سرو می‌شود.',
      ar: 'يقدم زرشك بلو تقليدياً خلال النوروز وغيرها من الاحتفالات.'
    },
    foodHistory: {
      en: 'Barberries have been cultivated in Khorasan for over 800 years.',
      fa: 'زرشک بیش از ۸۰۰ سال در خراسان کشت می‌شده است.',
      ar: 'تم زراعة البرباريس في خراسان لأكثر من 800 عام.'
    },
    foodFacts: {
      en: 'Iran produces 90% of the world\'s barberries.',
      fa: 'ایران ۹۰٪ زرشک جهان را تولید می‌کند.',
      ar: 'إيران تنتج 90% من برباريس العالم.'
    },
    funFacts: {
      en: 'The red color of barberries symbolizes joy in Persian culture!',
      fa: 'رنگ قرمز زرشک نماد شادی در فرهنگ ایرانی است!',
      ar: 'اللون الأحمر للبرباريس يرمز للفرح في الثقافة الفارسية!'
    },
    regionalVariations: {
      en: 'Mashhad version uses more saffron than other regions.',
      fa: 'نسخه مشهد زعفران بیشتری نسبت به سایر مناطق استفاده می‌کند.',
      ar: 'نسخة مشهد تستخدم زعفران أكثر من المناطق الأخرى.'
    },
    difficulty: 'Medium',
    rarity: 'Common',
    image: '/images/foods/zereshk-polo.jpg',
    aliases: ['Barberry Rice', 'Zereshk Polo ba Morgh'],
    tags: ['rice', 'barberry', 'chicken', 'festive', 'khorasan']
  }
];
