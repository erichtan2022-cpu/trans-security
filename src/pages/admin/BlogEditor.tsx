import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageInput from '@/components/admin/ImageInput';

interface FormData {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  author_role: string;
  date: string;
  read_time: string;
  category: string;
  tags: string[];
  content: string[];
}

const empty: FormData = {
  title: '', slug: '', excerpt: '', image: '', author: '', author_role: '',
  date: '', read_time: '', category: '', tags: [], content: [],
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const BlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>(empty);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle();
      if (data) {
        setForm({
          title: data.title ?? '',
          slug: data.slug ?? '',
          excerpt: data.excerpt ?? '',
          image: data.image ?? '',
          author: data.author ?? '',
          author_role: data.author_role ?? '',
          date: data.date ?? '',
          read_time: data.read_time ?? '',
          category: data.category ?? '',
          tags: data.tags ?? [],
          content: data.content ?? [],
        });
      }
      setLoading(false);
    })();
  }, [id]);

  const set = (key: keyof FormData, val: any) => setForm(prev => ({ ...prev, [key]: val }));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set('tags', [...form.tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (t: string) => set('tags', form.tags.filter(x => x !== t));

  const addParagraph = () => set('content', [...form.content, '']);
  const updateParagraph = (i: number, val: string) => {
    const arr = [...form.content];
    arr[i] = val;
    set('content', arr);
  };
  const removeParagraph = (i: number) => set('content', form.content.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    const slug = form.slug || slugify(form.title);
    const payload = { ...form, slug, updated_at: new Date().toISOString() };

    if (isEdit) {
      await supabase.from('blog_posts').update(payload).eq('id', id);
    } else {
      const { error } = await supabase.from('blog_posts').insert(payload);
      if (error?.code === '23505') {
        // unique violation — slug exists, append suffix
        payload.slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
        await supabase.from('blog_posts').insert(payload);
      }
    }
    setSaving(false);
    navigate('/admin/blog');
  };

  if (loading) {
    return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/blog" className="p-2 rounded-lg bg-white border border-navy/10 hover:bg-grey text-navy transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy">
            {isEdit ? 'Edit Artikel' : 'Tambah Artikel'}
          </h1>
          <p className="text-navy/60 text-sm">Isi detail artikel blog di bawah ini.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-navy/5 p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Judul Artikel</label>
          <input
            type="text"
            value={form.title}
            onChange={e => { set('title', e.target.value); if (!isEdit) set('slug', slugify(e.target.value)); }}
            className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm"
            placeholder="10 Tips Keamanan Kantor Modern..."
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Slug (URL)</label>
          <input
            type="text"
            value={form.slug}
            onChange={e => set('slug', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm font-mono"
            placeholder="10-tips-keamanan-kantor"
          />
          <p className="text-xs text-navy/50 mt-1">URL artikel: /blog/{form.slug || '...'}</p>
        </div>

        {/* Image */}
        <ImageInput value={form.image} onChange={v => set('image', v)} label="Gambar Utama" />

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Ringkasan (Excerpt)</label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm"
            placeholder="Ringkasan singkat artikel..."
          />
        </div>

        {/* Author info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Penulis</label>
            <input type="text" value={form.author} onChange={e => set('author', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Iwan Setiawan" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Peran Penulis</label>
            <input type="text" value={form.author_role} onChange={e => set('author_role', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Direktur Utama" />
          </div>
        </div>

        {/* Date & read time & category */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Tanggal</label>
            <input type="text" value={form.date} onChange={e => set('date', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="8 Mei 2026" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Waktu Baca</label>
            <input type="text" value={form.read_time} onChange={e => set('read_time', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="6 menit" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Kategori</label>
            <input type="text" value={form.category} onChange={e => set('category', e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Tips Keamanan" />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Tag</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
              className="flex-1 px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm"
              placeholder="Ketik tag lalu Enter"
            />
            <button type="button" onClick={addTag} className="bg-navy text-gold px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-900 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map(t => (
              <span key={t} className="flex items-center gap-1.5 bg-grey text-navy text-xs font-semibold px-3 py-1.5 rounded-full">
                #{t}
                <button onClick={() => removeTag(t)} className="text-navy/40 hover:text-red-600"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Content paragraphs */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Isi Artikel</label>
          <p className="text-xs text-navy/50 mb-3">Gunakan **teks tebal** untuk menebalkan kata. Setiap kotak adalah satu paragraf.</p>
          <div className="space-y-3">
            {form.content.map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  rows={3}
                  value={p}
                  onChange={e => updateParagraph(i, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm"
                  placeholder={`Paragraf ${i + 1}...`}
                />
                <button type="button" onClick={() => removeParagraph(i)} className="p-2.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors h-fit">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addParagraph} className="mt-3 flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
            <Plus className="w-4 h-4" /> Tambah Paragraf
          </button>
        </div>

        {/* Save */}
        <div className="flex gap-3 pt-4 border-t border-navy/10">
          <Link to="/admin/blog" className="px-5 py-2.5 rounded-lg bg-grey text-navy font-semibold text-sm hover:bg-navy/10 transition-colors">
            Batal
          </Link>
          <button
            onClick={handleSave}
            disabled={saving || !form.title}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-6 py-2.5 rounded-lg text-sm uppercase tracking-wide transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogEditor;
