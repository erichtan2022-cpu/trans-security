/*
# Create storage bucket for CMS image uploads

1. Storage
- Public bucket `cms-images` for uploaded logos, blog images, service images, etc.
- Public read so site visitors can see images; writes require authentication.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read
DROP POLICY IF EXISTS "public_read_cms_images" ON storage.objects;
CREATE POLICY "public_read_cms_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'cms-images');

-- Allow authenticated uploads
DROP POLICY IF EXISTS "admin_upload_cms_images" ON storage.objects;
CREATE POLICY "admin_upload_cms_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-images');

-- Allow authenticated updates (re-upload/replace)
DROP POLICY IF EXISTS "admin_update_cms_images" ON storage.objects;
CREATE POLICY "admin_update_cms_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-images') WITH CHECK (bucket_id = 'cms-images');

-- Allow authenticated deletes
DROP POLICY IF EXISTS "admin_delete_cms_images" ON storage.objects;
CREATE POLICY "admin_delete_cms_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'cms-images');
