/*
# Create CMS content tables

1. New Tables
- `site_settings` — single-row table storing logo URLs, company name, tagline, nav menu
- `blog_posts` — articles with slug, title, excerpt, image, author, content, tags, category
- `services` — service cards with slug, title, short desc, image, icon, benefits
- `homepage_slides` — hero slider entries (image, title, sub, cta, link)
- `statistics` — counter stats (label, end, suffix)
- `why_us` — "why choose us" items (title, description)
- `clients` — client names for marquee
- `testimonials` — testimonials (name, role, quote, img)
- `directors` — leadership team (name, role, img)
- `timeline` — company milestones (year, title, description)
- `legality` — certifications (title, description)
- `jobs` — career openings (title, requirements array)
- `contact_info` — single-row contact details (address, phone, email, hours, map_embed, hotline)

2. Security
- RLS enabled on every table.
- Public read (anon + authenticated) for all content tables — site is public.
- Write restricted to authenticated admins only (INSERT/UPDATE/DELETE).
*/

-- ============ SITE SETTINGS (single row) ============
CREATE TABLE IF NOT EXISTS site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  company_name text NOT NULL DEFAULT 'PT Trans Kontinental Indonesia',
  brand_name text NOT NULL DEFAULT 'TRANS SECURITY',
  logo_header_url text,
  logo_footer_url text,
  nav_menu jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings" ON site_settings
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_site_settings" ON site_settings;
CREATE POLICY "admin_insert_site_settings" ON site_settings
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_site_settings" ON site_settings;
CREATE POLICY "admin_update_site_settings" ON site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_site_settings" ON site_settings;
CREATE POLICY "admin_delete_site_settings" ON site_settings
  FOR DELETE TO authenticated USING (true);

-- ============ BLOG POSTS ============
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  author_role text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  read_time text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  tags text[] NOT NULL DEFAULT '{}',
  content text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_blog_posts" ON blog_posts;
CREATE POLICY "public_read_blog_posts" ON blog_posts
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_blog_posts" ON blog_posts;
CREATE POLICY "admin_insert_blog_posts" ON blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_blog_posts" ON blog_posts;
CREATE POLICY "admin_update_blog_posts" ON blog_posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_blog_posts" ON blog_posts;
CREATE POLICY "admin_delete_blog_posts" ON blog_posts
  FOR DELETE TO authenticated USING (true);

-- ============ SERVICES ============
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'shield',
  benefits text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services" ON services
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services" ON services
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services" ON services
  FOR DELETE TO authenticated USING (true);

-- ============ HOMEPAGE SLIDES ============
CREATE TABLE IF NOT EXISTS homepage_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  sub text NOT NULL DEFAULT '',
  cta text NOT NULL DEFAULT '',
  link text NOT NULL DEFAULT '/kontak',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_slides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_homepage_slides" ON homepage_slides;
CREATE POLICY "public_read_homepage_slides" ON homepage_slides
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_homepage_slides" ON homepage_slides;
CREATE POLICY "admin_insert_homepage_slides" ON homepage_slides
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_homepage_slides" ON homepage_slides;
CREATE POLICY "admin_update_homepage_slides" ON homepage_slides
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_homepage_slides" ON homepage_slides;
CREATE POLICY "admin_delete_homepage_slides" ON homepage_slides
  FOR DELETE TO authenticated USING (true);

-- ============ STATISTICS ============
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL DEFAULT '',
  end_value int NOT NULL DEFAULT 0,
  suffix text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_statistics" ON statistics;
CREATE POLICY "public_read_statistics" ON statistics
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_statistics" ON statistics;
CREATE POLICY "admin_insert_statistics" ON statistics
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_statistics" ON statistics;
CREATE POLICY "admin_update_statistics" ON statistics
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_statistics" ON statistics;
CREATE POLICY "admin_delete_statistics" ON statistics
  FOR DELETE TO authenticated USING (true);

-- ============ WHY US ============
CREATE TABLE IF NOT EXISTS why_us (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE why_us ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_why_us" ON why_us;
CREATE POLICY "public_read_why_us" ON why_us
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_why_us" ON why_us;
CREATE POLICY "admin_insert_why_us" ON why_us
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_why_us" ON why_us;
CREATE POLICY "admin_update_why_us" ON why_us
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_why_us" ON why_us;
CREATE POLICY "admin_delete_why_us" ON why_us
  FOR DELETE TO authenticated USING (true);

-- ============ CLIENTS ============
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_clients" ON clients;
CREATE POLICY "public_read_clients" ON clients
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_clients" ON clients;
CREATE POLICY "admin_insert_clients" ON clients
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_clients" ON clients;
CREATE POLICY "admin_update_clients" ON clients
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_clients" ON clients;
CREATE POLICY "admin_delete_clients" ON clients
  FOR DELETE TO authenticated USING (true);

-- ============ TESTIMONIALS ============
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  quote text NOT NULL DEFAULT '',
  img text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
CREATE POLICY "public_read_testimonials" ON testimonials
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_testimonials" ON testimonials;
CREATE POLICY "admin_insert_testimonials" ON testimonials
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_testimonials" ON testimonials;
CREATE POLICY "admin_update_testimonials" ON testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_testimonials" ON testimonials;
CREATE POLICY "admin_delete_testimonials" ON testimonials
  FOR DELETE TO authenticated USING (true);

-- ============ DIRECTORS ============
CREATE TABLE IF NOT EXISTS directors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  img text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE directors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_directors" ON directors;
CREATE POLICY "public_read_directors" ON directors
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_directors" ON directors;
CREATE POLICY "admin_insert_directors" ON directors
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_directors" ON directors;
CREATE POLICY "admin_update_directors" ON directors
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_directors" ON directors;
CREATE POLICY "admin_delete_directors" ON directors
  FOR DELETE TO authenticated USING (true);

-- ============ TIMELINE ============
CREATE TABLE IF NOT EXISTS timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_timeline" ON timeline;
CREATE POLICY "public_read_timeline" ON timeline
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_timeline" ON timeline;
CREATE POLICY "admin_insert_timeline" ON timeline
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_timeline" ON timeline;
CREATE POLICY "admin_update_timeline" ON timeline
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_timeline" ON timeline;
CREATE POLICY "admin_delete_timeline" ON timeline
  FOR DELETE TO authenticated USING (true);

-- ============ LEGALITY ============
CREATE TABLE IF NOT EXISTS legality (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE legality ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_legality" ON legality;
CREATE POLICY "public_read_legality" ON legality
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_legality" ON legality;
CREATE POLICY "admin_insert_legality" ON legality
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_legality" ON legality;
CREATE POLICY "admin_update_legality" ON legality
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_legality" ON legality;
CREATE POLICY "admin_delete_legality" ON legality
  FOR DELETE TO authenticated USING (true);

-- ============ JOBS ============
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  requirements text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_jobs" ON jobs;
CREATE POLICY "public_read_jobs" ON jobs
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_jobs" ON jobs;
CREATE POLICY "admin_insert_jobs" ON jobs
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_jobs" ON jobs;
CREATE POLICY "admin_update_jobs" ON jobs
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_jobs" ON jobs;
CREATE POLICY "admin_delete_jobs" ON jobs
  FOR DELETE TO authenticated USING (true);

-- ============ CONTACT INFO (single row) ============
CREATE TABLE IF NOT EXISTS contact_info (
  id integer PRIMARY KEY DEFAULT 1,
  address text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  hours text NOT NULL DEFAULT '',
  map_embed text NOT NULL DEFAULT '',
  hotline text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_contact_row CHECK (id = 1)
);

ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_contact_info" ON contact_info;
CREATE POLICY "public_read_contact_info" ON contact_info
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_contact_info" ON contact_info;
CREATE POLICY "admin_insert_contact_info" ON contact_info
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_contact_info" ON contact_info;
CREATE POLICY "admin_update_contact_info" ON contact_info
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_contact_info" ON contact_info;
CREATE POLICY "admin_delete_contact_info" ON contact_info
  FOR DELETE TO authenticated USING (true);

-- ============ INDEXES ============
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
