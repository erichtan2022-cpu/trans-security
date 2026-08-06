import { supabase, CMS_BUCKET } from '@/lib/supabase';

export async function uploadImage(file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(CMS_BUCKET).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) return null;
  const { data } = supabase.storage.from(CMS_BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}
