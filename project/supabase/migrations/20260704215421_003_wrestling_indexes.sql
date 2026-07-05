/*
# Wrestling Association Database Schema - Part 3: Indexes

Performance indexes for frequently queried columns.
*/

CREATE INDEX IF NOT EXISTS idx_wrestlers_membership ON wrestlers(membership_number);
CREATE INDEX IF NOT EXISTS idx_wrestlers_category ON wrestlers(age_category);
CREATE INDEX IF NOT EXISTS idx_wrestlers_coach ON wrestlers(coach_id);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(is_featured);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_certificates_wrestler ON certificates(wrestler_id);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery_photos(sort_order);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active);