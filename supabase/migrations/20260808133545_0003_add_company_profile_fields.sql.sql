/*
# Add company profile section fields to site_settings

1. Modified Tables
- `site_settings` — adds columns for the "Profil Perusahaan" section on the About page:
  - `profile_eyebrow` (text) — small label above the title, default "Profil Perusahaan"
  - `profile_title` (text) — section heading, default "Trans Security Indonesia"
  - `profile_paragraph_1` (text) — first body paragraph
  - `profile_paragraph_2` (text) — second body paragraph
  - `profile_vision` (text) — vision statement text
  - `profile_mission` (text) — mission statement text
  - `profile_image` (text) — URL of the side image
  - `profile_badge_number` (text) — the big number on the gold badge, default "10+"
  - `profile_badge_label` (text) — the label under the badge number, default "Tahun Pengalaman"

2. Security
- No new tables. Existing RLS policies on site_settings already allow public read and admin write.
*/

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_eyebrow') THEN
    ALTER TABLE site_settings ADD COLUMN profile_eyebrow text NOT NULL DEFAULT 'Profil Perusahaan';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_title') THEN
    ALTER TABLE site_settings ADD COLUMN profile_title text NOT NULL DEFAULT 'Trans Security Indonesia';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_paragraph_1') THEN
    ALTER TABLE site_settings ADD COLUMN profile_paragraph_1 text NOT NULL DEFAULT 'Berdiri sejak tahun 2013, Trans Security Indonesia adalah perusahaan jasa keamanan profesional yang berizin resmi dari Mabes Polri. Kami melayani sektor korporat, manufaktur, perbankan, perumahan, dan pusat perbelanjaan dengan standar layanan kelas dunia.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_paragraph_2') THEN
    ALTER TABLE site_settings ADD COLUMN profile_paragraph_2 text NOT NULL DEFAULT 'Dengan lebih dari 1.000 personel terlatih, command center 24/7, dan teknologi keamanan termutakhir, kami menjadi mitra terpercaya untuk melindungi aset, manusia, dan reputasi bisnis Anda.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_vision') THEN
    ALTER TABLE site_settings ADD COLUMN profile_vision text NOT NULL DEFAULT 'Menjadi perusahaan jasa pengamanan terdepan di Indonesia.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_mission') THEN
    ALTER TABLE site_settings ADD COLUMN profile_mission text NOT NULL DEFAULT 'Memberikan layanan profesional dengan SDM berkualitas dan teknologi modern.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_image') THEN
    ALTER TABLE site_settings ADD COLUMN profile_image text NOT NULL DEFAULT '';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_badge_number') THEN
    ALTER TABLE site_settings ADD COLUMN profile_badge_number text NOT NULL DEFAULT '10+';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'site_settings' AND column_name = 'profile_badge_label') THEN
    ALTER TABLE site_settings ADD COLUMN profile_badge_label text NOT NULL DEFAULT 'Tahun Pengalaman';
  END IF;
END $$;