/*
# Wrestling Association Database Schema - Part 2: RLS Policies

Security policies for all tables allowing public read/write access
for the wrestling association public website.
*/

-- Wrestlers policies
DROP POLICY IF EXISTS "anon_wrestlers_select" ON wrestlers;
CREATE POLICY "anon_wrestlers_select" ON wrestlers FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_wrestlers_insert" ON wrestlers;
CREATE POLICY "anon_wrestlers_insert" ON wrestlers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_wrestlers_update" ON wrestlers;
CREATE POLICY "anon_wrestlers_update" ON wrestlers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_wrestlers_delete" ON wrestlers;
CREATE POLICY "anon_wrestlers_delete" ON wrestlers FOR DELETE TO anon, authenticated USING (true);

-- Coaches policies
DROP POLICY IF EXISTS "anon_coaches_select" ON coaches;
CREATE POLICY "anon_coaches_select" ON coaches FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_coaches_insert" ON coaches;
CREATE POLICY "anon_coaches_insert" ON coaches FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_coaches_update" ON coaches;
CREATE POLICY "anon_coaches_update" ON coaches FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_coaches_delete" ON coaches;
CREATE POLICY "anon_coaches_delete" ON coaches FOR DELETE TO anon, authenticated USING (true);

-- News policies
DROP POLICY IF EXISTS "anon_news_select" ON news;
CREATE POLICY "anon_news_select" ON news FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_news_insert" ON news;
CREATE POLICY "anon_news_insert" ON news FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_news_update" ON news;
CREATE POLICY "anon_news_update" ON news FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_news_delete" ON news;
CREATE POLICY "anon_news_delete" ON news FOR DELETE TO anon, authenticated USING (true);

-- Competitions policies
DROP POLICY IF EXISTS "anon_competitions_select" ON competitions;
CREATE POLICY "anon_competitions_select" ON competitions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_competitions_insert" ON competitions;
CREATE POLICY "anon_competitions_insert" ON competitions FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_competitions_update" ON competitions;
CREATE POLICY "anon_competitions_update" ON competitions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_competitions_delete" ON competitions;
CREATE POLICY "anon_competitions_delete" ON competitions FOR DELETE TO anon, authenticated USING (true);

-- Certificates policies
DROP POLICY IF EXISTS "anon_certificates_select" ON certificates;
CREATE POLICY "anon_certificates_select" ON certificates FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_certificates_insert" ON certificates;
CREATE POLICY "anon_certificates_insert" ON certificates FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_certificates_update" ON certificates;
CREATE POLICY "anon_certificates_update" ON certificates FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_certificates_delete" ON certificates;
CREATE POLICY "anon_certificates_delete" ON certificates FOR DELETE TO anon, authenticated USING (true);

-- Gallery photos policies
DROP POLICY IF EXISTS "anon_gallery_select" ON gallery_photos;
CREATE POLICY "anon_gallery_select" ON gallery_photos FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_gallery_insert" ON gallery_photos;
CREATE POLICY "anon_gallery_insert" ON gallery_photos FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_gallery_update" ON gallery_photos;
CREATE POLICY "anon_gallery_update" ON gallery_photos FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_gallery_delete" ON gallery_photos;
CREATE POLICY "anon_gallery_delete" ON gallery_photos FOR DELETE TO anon, authenticated USING (true);

-- Announcements policies
DROP POLICY IF EXISTS "anon_announcements_select" ON announcements;
CREATE POLICY "anon_announcements_select" ON announcements FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_announcements_insert" ON announcements;
CREATE POLICY "anon_announcements_insert" ON announcements FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_announcements_update" ON announcements;
CREATE POLICY "anon_announcements_update" ON announcements FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_announcements_delete" ON announcements;
CREATE POLICY "anon_announcements_delete" ON announcements FOR DELETE TO anon, authenticated USING (true);

-- Site settings policies
DROP POLICY IF EXISTS "anon_settings_select" ON site_settings;
CREATE POLICY "anon_settings_select" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_settings_insert" ON site_settings;
CREATE POLICY "anon_settings_insert" ON site_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_settings_update" ON site_settings;
CREATE POLICY "anon_settings_update" ON site_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_settings_delete" ON site_settings;
CREATE POLICY "anon_settings_delete" ON site_settings FOR DELETE TO anon, authenticated USING (true);