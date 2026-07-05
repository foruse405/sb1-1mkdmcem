import type { Wrestler, Coach, News, Competition, Certificate, GalleryPhoto, Announcement, Achievement } from '../types';

const generateMembershipNumber = (index: number): string => {
  return `AZG-${String(index).padStart(4, '0')}`;
};

const weightClasses = {
  'بزرگسالان': ['۵۷ کیلوگرم', '۶۱ کیلوگرم', '۶۵ کیلوگرم', '۷۰ کیلوگرم', '۷۴ کیلوگرم', '۷۹ کیلوگرم', '۸۶ کیلوگرم', '۹۲ کیلوگرم', '۹۷ کیلوگرم', '۱۲۵ کیلوگرم'],
  'جوانان': ['۵۵ کیلوگرم', '۶۰ کیلوگرم', '۶۳ کیلوگرم', '۶۷ کیلوگرم', '۷۲ کیلوگرم', '۷۷ کیلوگرم', '۸۲ کیلوگرم', '۸۷ کیلوگرم', '۹۷ کیلوگرم', '۱۳۰ کیلوگرم'],
  'نوجوانان': ['۴۵ کیلوگرم', '۴۸ کیلوگرم', '۵۱ کیلوگرم', '۵۵ کیلوگرم', '۶۰ کیلوگرم', '۶۵ کیلوگرم', '۷۱ کیلوگرم', '۷۷ کیلوگرم', '۸۳ کیلوگرم', '۱۱۰ کیلوگرم'],
};

const teams = [
  'باشگاه شهدا، ارومیه',
  'باشگاه پاس، ارومیه',
  'باشگاه پرسپولیس، سلماس',
  'باشگاه تراکتور، تبریز',
  'باشگاه شهید بهشتی، مهاباد',
  'باشگاه استقلال، میاندوآب',
  'باشگاه سپاهان، خوی',
  'باشگاه فولاد، بوکان',
  'باشگاه آلومین، مراغه',
  'باشگاه پتروشیمی، ارومیه',
];

const maleFirstNames = [
  'علی', 'محمد', 'حسین', 'احمد', 'رضا', 'مهدی', 'امیر', 'علیرضا', 'م حمدرضا', 'سعید',
  'مجید', 'فرهاد', 'کاوه', 'آرش', 'بهنام', 'امیرحسین', 'محسن', 'مصطفی', 'حمید', 'جواد',
  'مسعود', 'هادی', 'فرشاد', 'پیام', 'آیدین', 'رامین', 'بهزاد', 'شهاب', 'حامد', 'وحدت',
  'نوید', 'امین', 'سامان', 'افشین', 'داریوش', 'کیارش', 'بنیامین', 'نیما', 'آرمان', 'رامتین',
  'تینما', 'آرشام', 'آرتین', 'آرشین', 'پویا', 'پیمان', 'کامران', 'کامرانیا', 'امیررضا', 'سینا',
];

const lastNames = [
  'محمدی', 'احمدی', 'حسینی', 'رضایی', 'کریمی', 'موسوی', 'نجفی', 'علیزاده', 'حسن‌زاده', 'جعفری',
  'اکبری', 'مهدوی', 'صادقی', 'کاظمی', 'هاشمی', 'عباسی', 'قاسمی', 'خانی', 'زرعی', 'مردانی',
  'اکبرنژاد', 'عزیزی', 'رحیمی', 'سلیمانی', 'یوسفی', 'شریفی', 'عباس‌زاده', 'محمدزاده', 'تبریزی', 'اهری',
  'برهان', 'میرزایی', 'کریم‌زاده', 'قربانی', 'عسگری', 'کرمی', 'شفیعی', 'میرزادگی', 'علی‌پور', 'حیدری',
  'غلامی', 'دلاور', 'فتحی', 'سلیمانیا', 'خلیل‌زاده', 'نوروزی', 'زارعی', 'نادری', 'بهنام', 'پناهی',
];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

// Wrestling-specific profile images for wrestlers
const wrestlerImages = [
  'https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/30180713/pexels-photo-30180713.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/38163415/pexels-photo-38163415.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/38178268/pexels-photo-38178268.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/12417828/pexels-photo-12417828.jpeg?auto=compress&cs=tinysrgb&w=400',
];

// Wrestling-specific coach images
const coachImages = [
  'https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/38163415/pexels-photo-38163415.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/30180713/pexels-photo-30180713.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const generateAchievements = (count: number): Achievement[] => {
  const competitions = [
    'مسابقات کشتی آزاد کشور', 'لیگ برتر کشتی ایران', 'جام جهانی کشتی',
    'مسابقات آسیایی کشتی', 'المپیک جوانان', 'جام فینا کشتی',
    'مسابقات قهرمانی باشگاه‌ها', 'جام تختی', 'جام شهید بهشتی',
    'پیکارهای بین‌المللی کشتی', 'جام دنیای کشتی', 'مسابقات کشتی نروژ',
    'جام رئیس فدراسیون', 'قهرمانی استان', 'بازی‌های آسیایی',
  ];

  const achievements: Achievement[] = [];
  for (let i = 0; i < count; i++) {
    achievements.push({
      title: `${getRandomItem(competitions)}`,
      year: String(getRandomNumber(1398, 1403)),
      competition: getRandomItem(competitions),
      medal_type: getRandomItem(['gold', 'silver', 'bronze'] as const),
    });
  }
  return achievements;
};

export const mockCoaches: Coach[] = [
  {
    id: 'coach-001',
    full_name: 'استاد محمد رضا کریمی',
    profile_image_url: coachImages[0],
    coaching_level: 'مربی درجه یک ملی',
    specialty: 'کشتی آزاد -Weights سبک',
    biography: 'مربی با تجربه بیش از ۲۵ سال در سطح ملی و بین‌المللی. مربی تیم ملی کشتی آزاد در چندین المپیک و مسابقات جهانی.',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'm.karimi@wrestling-az.ir',
    experience_years: 25,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'coach-002',
    full_name: 'استاد حسین مرادی',
    profile_image_url: coachImages[1],
    coaching_level: 'مربی درجه دو ملی',
    specialty: 'کشتی فرنگی -Weights سنگین',
    biography: 'قهرمان پیشین کشتی فرنگی ایران با مدال آسیایی. ۱۵ سال سابقه مربیگری در تیم‌های باشگاهی استان.',
    phone: '۰۹۱۲۳۴۵۶۷۸۸',
    email: 'h.moradi@wrestling-az.ir',
    experience_years: 15,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'coach-003',
    full_name: 'استاد علی اکبری',
    profile_image_url: coachImages[2],
    coaching_level: 'مربی درجه یک ملی',
    specialty: 'کشتی آزاد -Weights متوسط',
    biography: 'مربی شناخته شده با تحصیلات در رشته تربیت بدنی. مربی چندین قهرمان کشوری و ملی.',
    phone: '۰۹۱۲۳۴۵۶۷۸۷',
    email: 'a.akbari@wrestling-az.ir',
    experience_years: 18,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'coach-004',
    full_name: 'استاد رضا رحیمی',
    profile_image_url: coachImages[0],
    coaching_level: 'مربی درجه سه ملی',
    specialty: 'کشتی نوجوانان',
    biography: 'مربی جوان و پرانگیزه با تمرکز بر پایه نوجوانان و توسعه استعدادهای جوان.',
    phone: '۰۹۱۲۳۴۵۶۷۸۶',
    email: 'r.rahimi@wrestling-az.ir',
    experience_years: 8,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'coach-005',
    full_name: 'استاد امیر حسینی',
    profile_image_url: coachImages[1],
    coaching_level: 'مربی درجه دو ملی',
    specialty: 'کشتی آزاد - همه دسته‌ها',
    biography: 'مربی با تجربه در پایه‌های مختلف سنی. تمرکز بر تکنیک و آمادگی جسمانی.',
    phone: '۰۹۱۲۳۴۵۶۷۸۵',
    email: 'a.hosseini@wrestling-az.ir',
    experience_years: 12,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const generateWrestlers = (): Wrestler[] => {
  const wrestlers: Wrestler[] = [];
  const categories: ('بزرگسالان' | 'جوانان' | 'نوجوانان')[] = ['بزرگسالان', 'جوانان', 'نوجوانان'];

  for (let i = 1; i <= 50; i++) {
    const category = categories[i % 3];
    const weights = weightClasses[category];

    wrestlers.push({
      id: `wrestler-${i}`,
      membership_number: generateMembershipNumber(i),
      full_name: `${getRandomItem(maleFirstNames)} ${getRandomItem(lastNames)}`,
      profile_image_url: getRandomItem(wrestlerImages),
      age_category: category,
      weight_class: getRandomItem(weights),
      team_club: getRandomItem(teams),
      coach_id: getRandomItem(mockCoaches).id,
      achievements: generateAchievements(getRandomNumber(0, 6)),
      biography: `کشتی‌گیر با انگیزه و پرتلاش از ${getRandomItem(teams)}. دارای سابقه حضور در مسابقات کشوری و استان. با جدیت از تمرین می‌کند و هدف دارد به تیم ملی برسد.`,
      phone: `۰۹۱۲${String(getRandomNumber(1000000, 9999999)).padStart(7, '0')}`,
      email: `wrestler${i}@wrestling-az.ir`,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return wrestlers;
};

let _mockWrestlers: Wrestler[] | null = null;

export const getMockWrestlers = (): Wrestler[] => {
  if (!_mockWrestlers) {
    _mockWrestlers = generateWrestlers();
  }
  return _mockWrestlers;
};

// Wrestling-specific news images
export const mockNews: News[] = [
  {
    id: 'news-001',
    title: 'آغاز لیگ برتر کشتی آزاد استان آذربایجان غربی',
    summary: 'لیگ برتر کشتی آزاد استان با حضور تیم‌های باشگاهی از سراسر استان آغاز شد.',
    content: 'با حضور مدیرکل ورزش و جوانان، رئیس هیئت کشتی استان و مربیان برجسته، لیگ برتر کشتی آزاد استان آذربایجان غربی افتتاح شد. این مسابقات در سال ورزشی شهر ارومیه برگزار می‌شود و تیم‌های متعددی از سراسر استان در آن شرکت می‌کنند.\n\nرئیس هیئت کشتی استان در این مراسم از تلاش‌های مربیان و کشتی‌گیران تقدیر کرد و امیدوار است که استعدادهای جدید در این مسابقات شناسایی شوند.',
    category: 'مسابقات',
    author: 'محمدی',
    published_date: '۱۴۰۳/۰۱/۱۵',
    image_url: 'https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: true,
    views: 1250,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-002',
    title: 'کمپ تمرینی تیم ملی کشتی آزاد در ارومیه',
    summary: 'تیم ملی کشتی آزاد ایران کمپ تمرینی خود را در ارومیه برگزار کرد.',
    content: 'کمپ تمرینی تیم ملی کشتی آزاد ایران با حضور قهرمانان المپیکی و جهانی در ارومیه برگزار شد. این کمپ با هدف آماده‌سازی تیم ملی برای مسابقات بین‌المللی برگزار شد.\n\nمربیان تیم ملی از امکانات موجود در استان ابراز رضایت کردند.',
    category: 'رویدادها',
    author: 'رضایی',
    published_date: '۱۴۰۳/۰۲/۱۰',
    image_url: 'https://images.pexels.com/photos/30180713/pexels-photo-30180713.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: true,
    views: 980,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-003',
    title: 'پیروزی کشتی‌گیران استان در مسابقات کشوری',
    summary: 'تیم کشتی استان آذربایجان غربی مقام سوم رقابت‌های کشوری را کسب کرد.',
    content: 'در رقابت‌های کشوری کشتی آزاد که در تهران برگزار شد، تیم استان آذربایجان غربی با کسب ۳ مدال طلا، ۲ مدال نقره و ۴ مدال برنز در رتبه سوم ایستاده.\n\nکشتی‌گیران استان با تلاش و جدیت زیاد توانستند افتخارآفرینی کنند.',
    category: 'اخبار',
    author: 'مرادی',
    published_date: '۱۴۰۳/۰۲/۲۵',
    image_url: 'https://images.pexels.com/photos/38178268/pexels-photo-38178268.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 750,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-004',
    title: 'برگزاری دوره آموزشی مربیگری درجه سه',
    summary: 'دوره آموزشی مربیگری درجه سه کشتی آزاد در ارومیه برگزار شد.',
    content: 'دوره آموزشی مربیگری درجه سه کشتی آزاد با حضور ۵۰ نفر از علاقه‌مندان به مربیگری کشتی در ارومیه برگزار شد.\n\nاین دوره شامل آموزش فنی، تئوری و عملی بود و در پایان از شرکت‌کنندگان آزمون گرفته شد.',
    category: 'مقالات',
    author: 'حسینی',
    published_date: '۱۴۰۳/۰۳/۱۲',
    image_url: 'https://images.pexels.com/photos/12417828/pexels-photo-12417828.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 420,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-005',
    title: 'به مناسبت میلاد حضرت امام حسین (ع) مسابقات جام عاشورا',
    summary: 'مسابقات جام عاشورا به مناسبت ایام محرم در استان برگزار می‌شود.',
    content: 'به مناسبت ایام محرم و ارادت به سیدالشهدا، مسابقات جام عاشورا در پایه نوجوانان و جوانان برگزار خواهد شد.\n\nعلاقه‌مندان می‌توانند تا پایان هفته اول محرم ثبت‌نام نمایند.',
    category: 'اعلامیه‌ها',
    author: 'اکبری',
    published_date: '۱۴۰۳/۰۳/۲۸',
    image_url: 'https://images.pexels.com/photos/38163415/pexels-photo-38163415.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 580,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-006',
    title: 'گزارش مسابقات بین‌المللی جام دنیای کشتی',
    summary: 'تیم استان در جام بین‌المللی کشتی شرکت کرد.',
    content: 'تعدادی از کشتی‌گیران استان در مسابقات بین‌المللی جام دنیای کشتی که در بلاروس برگزار شد شرکت کردند و عملکرد درخشانی داشتند.',
    category: 'رویدادها',
    author: 'نجفی',
    published_date: '۱۴۰۳/۰۴/۱۰',
    image_url: 'https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 620,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-007',
    title: 'معرفی سیستم جدید ثبت‌نام الکترونیک کشتی‌گیران',
    summary: 'هیئت کشتی استان سیستم جدید ثبت‌نام الکترونیک را راه‌اندازی کرد.',
    content: 'با هدف تسهیل فرایند ثبت‌نام کشتی‌گیران، هیئت کشتی استان سیستم جامع الکترونیک را راه‌اندازی کرد.\n\nکشتی‌گیران از این پس می‌توانند به صورت آنلاین ثبت‌نام کنند و کارت عضویت خود را دریافت کنند.',
    category: 'اعلامیه‌ها',
    author: 'دفتر هیئت',
    published_date: '۱۴۰۳/۰۴/۱۵',
    image_url: 'https://images.pexels.com/photos/30180713/pexels-photo-30180713.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 390,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-008',
    title: 'افتتاح سالن تمرینی جدید در شهرستان خوی',
    summary: 'سالن تمرینی جدید کشتی در شهرستان خوی افتتاح شد.',
    content: 'با حضور مسئولین استانی و شهرستانی، سالن تمرینی جدید کشتی در خوی افتتاح شد. این سالن امکانات پیشرفته‌ای برای کشتی‌گیران دارد.',
    category: 'اخبار',
    author: 'زارعی',
    published_date: '۱۴۰۳/۰۵/۰۲',
    image_url: 'https://images.pexels.com/photos/12417828/pexels-photo-12417828.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 530,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-009',
    title: 'ضوابط جدید صلاحیت کشتی‌گیران اعلام شد',
    summary: 'فدراسیون کشتی ضوابط جدید صلاحیت کشتی‌گیران را اعلام کرد.',
    content: 'فدراسیون کشتی جمهوری اسلامی ایران ضوابط جدیدی برای صلاحیت کشتی‌گیران در مسابقات رسمی اعلام کرد.\n\nکشتی‌گیران باید شرایط جدید را مطالعه کنند.',
    category: 'اعلامیه‌ها',
    author: 'فدراسیون',
    published_date: '۱۴۰۳/۰۵/۱۸',
    image_url: 'https://images.pexels.com/photos/38163415/pexels-photo-38163415.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 450,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'news-010',
    title: 'شناخت توانایی‌های فنی کشتی آزاد',
    summary: 'مقاله‌ای جامع درباره تکنیک‌های کشتی آزاد.',
    content: 'در این مقاله به بررسی توانایی‌های فنی و تکنیک‌های پایه‌ای کشتی آزاد می‌پردازیم.\n\nکشتی آزاد یکی از رشته‌های ورزشی است که نیاز به تکنیک و قدرت بدنی بالایی دارد.',
    category: 'مقالات',
    author: 'دکتر محمدی',
    published_date: '۱۴۰۳/۰۶/۰۵',
    image_url: 'https://images.pexels.com/photos/38178268/pexels-photo-38178268.jpeg?auto=compress&cs=tinysrgb&w=800',
    is_featured: false,
    views: 280,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockCompetitions: Competition[] = [
  {
    id: 'comp-001',
    title: 'لیگ برتر کشتی آزاد استان',
    description: 'مسابقات لیگ برتر با حضور تیم‌های باشگاهی استان',
    location: 'سالن ورزشی آزادی، ارومیه',
    start_date: '۱۴۰۳/۰۱/۱۵',
    end_date: '۱۴۰۳/۰۱/۲۵',
    competition_type: 'لیگ باشگاهی',
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'comp-002',
    title: 'مسابقات انتخابی تیم ملی',
    description: 'انتخابی تیم ملی کشتی آزاد',
    location: 'سالن آزادی، تهران',
    start_date: '۱۴۰۳/۰۲/۱۰',
    end_date: '۱۴۰۳/۰۲/۱۵',
    competition_type: 'انتخابی',
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'comp-003',
    title: 'جام عاشورا',
    description: 'به مناسبت ایام محرم',
    location: 'سالن ورزشی تختی، ارومیه',
    start_date: '۱۴۰۳/۰۳/۰۱',
    end_date: '۱۴۰۳/۰۳/۰۵',
    competition_type: 'جام',
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'comp-004',
    title: 'جام تختی',
    description: 'مسابقات بین‌المللی جام تختی',
    location: 'تهران',
    start_date: '۱۴۰۳/۰۴/۲۰',
    end_date: '۱۴۰۳/۰۴/۲۵',
    competition_type: 'بین‌المللی',
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'comp-005',
    title: 'مسابقات قهرمانی نوجوانان',
    description: 'قهرمانی استان پایه نوجوانان',
    location: 'سالن ورزشی میاندوآب',
    start_date: '۱۴۰۳/۰۵/۱۰',
    end_date: '۱۴۰۳/۰۵/۱۴',
    competition_type: 'قهرمانی',
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'comp-006',
    title: 'جام فجر',
    description: 'مسابقات جام فجر به مناسبت دهه فجر',
    location: 'سالن ورزشی شهدا، ارومیه',
    start_date: '۱۴۰۳/۱۰/۲۰',
    end_date: '۱۴۰۳/۱۰/۲۵',
    competition_type: 'جام',
    status: 'upcoming',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'تمدید مهلت ثبت‌نام لیگ برتر',
    content: 'مهلت ثبت‌نام لیگ برتر کشتی آزاد استان تا تاریخ ۱۴۰۳/۰۱/۲۰ تمدید شد.',
    priority: 1,
    is_active: true,
    start_date: '۱۴۰۳/۰۱/۱۰',
    end_date: '۱۴۰۳/۰۱/۲۰',
    created_at: new Date().toISOString(),
  },
  {
    id: 'ann-002',
    title: 'فراخوان مربیان به جلسه',
    content: 'تمامی مربیان استان فراخوانده به جلسه هیئت در تاریخ ۱۴۰۳/۰۲/۰۱ می‌شوند.',
    priority: 2,
    is_active: true,
    start_date: '۱۴۰۳/۰۱/۲۵',
    end_date: '۱۴۰۳/۰۲/۰۱',
    created_at: new Date().toISOString(),
  },
];

// Wrestling-specific gallery images
export const mockGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-001',
    title: 'افتتاحیه لیگ برتر',
    description: 'مراسم افتتاحیه لیگ برتر کشتی استان',
    image_url: 'https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'مسابقات',
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'photo-002',
    title: 'تیم ملی در ارومیه',
    description: 'کمپ تمرینی تیم ملی',
    image_url: 'https://images.pexels.com/photos/30180713/pexels-photo-30180713.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'تیم ملی',
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'photo-003',
    title: 'تقدیر از قهرمانان',
    description: 'مراسم تقدیر از کشتی‌گیران برتر',
    image_url: 'https://images.pexels.com/photos/38178268/pexels-photo-38178268.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'تقدیر',
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'photo-004',
    title: 'تمرینات روزانه',
    description: 'کشتی‌گیران در حال تمرین',
    image_url: 'https://images.pexels.com/photos/38163415/pexels-photo-38163415.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'تمرین',
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'photo-005',
    title: 'مسابقه نهایی',
    description: 'پیکار نهایی مسابقات استانی',
    image_url: 'https://images.pexels.com/photos/12417828/pexels-photo-12417828.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'مسابقات',
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'photo-006',
    title: 'سالن ورزشی آزادی',
    description: 'نمای سالن ورزشی آزادی ارومیه',
    image_url: 'https://images.pexels.com/photos/29768757/pexels-photo-29768757.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'امکانات',
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-001',
    wrestler_id: 'wrestler-001',
    title: 'گواهی صلاحیت کشوری',
    description: 'تاییدیه صلاحیت شرکت در مسابقات کشوری',
    file_url: '/certificates/sample-certificate.pdf',
    upload_date: '۱۴۰۳/۰۱/۱۵',
    certificate_type: 'صلاحیت',
    created_at: new Date().toISOString(),
  },
  {
    id: 'cert-002',
    wrestler_id: 'wrestler-001',
    title: 'مدرک قهرمانی استان',
    description: 'مقام اول مسابقات قهرمانی استان',
    file_url: '/certificates/champion-certificate.pdf',
    upload_date: '۱۴۰۳/۰۲/۲۰',
    certificate_type: 'قهرمانی',
    created_at: new Date().toISOString(),
  },
];
