export interface Wrestler {
  id: string;
  membership_number: string;
  full_name: string;
  profile_image_url: string | null;
  age_category: 'بزرگسالان' | 'جوانان' | 'نوجوانان';
  weight_class: string;
  team_club: string;
  coach_id: string | null;
  achievements: Achievement[];
  biography: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Coach {
  id: string;
  full_name: string;
  profile_image_url: string | null;
  coaching_level: string;
  specialty: string;
  biography: string | null;
  phone: string | null;
  email: string | null;
  experience_years: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'اخبار' | 'رویدادها' | 'مسابقات' | 'مقالات' | 'اعلامیه‌ها';
  author: string;
  published_date: string;
  image_url: string | null;
  is_featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Competition {
  id: string;
  title: string;
  description: string | null;
  location: string;
  start_date: string;
  end_date: string;
  competition_type: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  wrestler_id: string;
  title: string;
  description: string | null;
  file_url: string;
  upload_date: string;
  certificate_type: string;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: number;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string;
  updated_at: string;
}

export interface Achievement {
  title: string;
  year: string;
  competition: string;
  medal_type: 'gold' | 'silver' | 'bronze';
}

export interface SearchResult {
  type: 'wrestler' | 'coach' | 'news';
  id: string;
  title: string;
  subtitle: string;
  image_url: string | null;
}
