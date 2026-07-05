/*
# Wrestling Association Database Schema - Part 1

1. New Tables
- `coaches` - Coach profiles with credentials and specialties
- `wrestlers` - Athlete profiles with full details
- `news` - News articles with categories, authors, Persian dates
- `competitions` - Upcoming events and calendar items
- `certificates` - PDF certificates linked to wrestlers
- `gallery_photos` - Photo gallery for homepage
- `announcements` - Official announcement banners
- `site_settings` - Homepage text configurations

2. Security
- Enable RLS on all tables
- Allow anon + authenticated full access (public website)
*/

-- Coaches table (create first as wrestlers references it)
CREATE TABLE IF NOT EXISTS coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  profile_image_url text,
  coaching_level text NOT NULL,
  specialty text NOT NULL,
  biography text,
  phone text,
  email text,
  experience_years integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Wrestlers table
CREATE TABLE IF NOT EXISTS wrestlers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_number text UNIQUE NOT NULL,
  full_name text NOT NULL,
  profile_image_url text,
  age_category text NOT NULL CHECK (age_category IN ('بزرگسالان', 'جوانان', 'نوجوانان')),
  weight_class text NOT NULL,
  team_club text NOT NULL,
  coach_id uuid REFERENCES coaches(id) ON DELETE SET NULL,
  achievements jsonb DEFAULT '[]'::jsonb,
  biography text,
  phone text,
  email text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('اخبار', 'رویدادها', 'مسابقات', 'مقالات', 'اعلامیه‌ها')),
  author text NOT NULL,
  published_date text NOT NULL,
  image_url text,
  is_featured boolean DEFAULT false,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  competition_type text NOT NULL,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wrestler_id uuid NOT NULL REFERENCES wrestlers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  upload_date text NOT NULL,
  certificate_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Gallery photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text DEFAULT 'general',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  priority integer DEFAULT 1,
  is_active boolean DEFAULT true,
  start_date text,
  end_date text,
  created_at timestamptz DEFAULT now()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE wrestlers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;