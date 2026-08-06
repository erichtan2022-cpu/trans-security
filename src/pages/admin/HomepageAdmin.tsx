import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Chrome as Home, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageInput from '@/components/admin/ImageInput';

interface Slide { id?: string; image: string; title: string; sub: string; cta: string; link: string; sort_order: number; }
interface Stat { id?: string; label: string; end_value: number; suffix: string; sort_order: number; }
interface Why { id?: string; title: string; description: string; sort_order: number; }

const HomepageAdmin: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [whys, setWhys] = useState<Why[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'slides' | 'stats' | 'whys'>('slides');

  useEffect(() => {
    (async () => {
      const [s, st, w] = await Promise.all([
        supabase.from('homepage_slides').select('*').order('sort_order'),
        supabase.from('statistics').select('*').order('sort_order'),
        supabase.from('why_us').select('*').order('sort_order'),
      ]);
      setSlides(s.data ?? []);
      setStats(st.data ?? []);
      setWhys(w.data ?? []);
      setLoading(false);
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await Promise.all([
      ...slides.map(sl => sl.id ? supabase.from('homepage_slides').update(sl).eq('id', sl.id) : supabase.from('homepage_slides').insert(sl)),
      ...stats.map(st => st.id ? supabase.from('statistics').update(st).eq('id', st.id) : supabase.from('statistics').insert(st)),
      ...whys.map(w => w.id ? supabase.from('why_us').update(w).eq('id', w.id) : supabase.from('why_us').insert(w)),
    ]);
    setSaving(false);
    alert('Perubahan tersimpan!');
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Beranda</h1>
          <p className="text-navy/60 text-sm">Kelola slide banner, statistik, dan alasan memilih kami.</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([
          { key: 'slides', label: 'Slide Banner' },
          { key: 'stats', label: 'Statistik' },
          { key: 'whys', label: 'Alasan Memilih Kami' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.key ? 'bg-navy text-gold' : 'bg-white text-navy hover:bg-grey'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Slides */}
      {tab === 'slides' && (
        <div className="space-y-4">
          {slides.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Slide {i + 1}</span>
                <button onClick={() => setSlides(slides.filter((_, idx) => idx !== i))} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <ImageInput value={s.image} onChange={v => { const arr = [...slides]; arr[i] = { ...s, image: v }; setSlides(arr); }} label="Gambar Slide" />
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <input type="text" value={s.title} onChange={e => { const arr = [...slides]; arr[i] = { ...s, title: e.target.value }; setSlides(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Judul" />
                <input type="text" value={s.sub} onChange={e => { const arr = [...slides]; arr[i] = { ...s, sub: e.target.value }; setSlides(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Sub-judul" />
                <input type="text" value={s.cta} onChange={e => { const arr = [...slides]; arr[i] = { ...s, cta: e.target.value }; setSlides(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Teks Tombol" />
                <input type="text" value={s.link} onChange={e => { const arr = [...slides]; arr[i] = { ...s, link: e.target.value }; setSlides(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="/kontak" />
              </div>
            </div>
          ))}
          <button onClick={() => setSlides([...slides, { image: '', title: '', sub: '', cta: '', link: '/kontak', sort_order: slides.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Slide</button>
        </div>
      )}

      {/* Stats */}
      {tab === 'stats' && (
        <div className="space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-navy/60 mb-1">Label</label>
                <input type="text" value={s.label} onChange={e => { const arr = [...stats]; arr[i] = { ...s, label: e.target.value }; setStats(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <div className="w-full sm:w-28">
                <label className="block text-xs font-semibold text-navy/60 mb-1">Angka</label>
                <input type="number" value={s.end_value} onChange={e => { const arr = [...stats]; arr[i] = { ...s, end_value: parseInt(e.target.value) || 0 }; setStats(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <div className="w-full sm:w-20">
                <label className="block text-xs font-semibold text-navy/60 mb-1">Suffix</label>
                <input type="text" value={s.suffix} onChange={e => { const arr = [...stats]; arr[i] = { ...s, suffix: e.target.value }; setStats(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <button onClick={() => setStats(stats.filter((_, idx) => idx !== i))} className="p-2.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors h-fit"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button onClick={() => setStats([...stats, { label: '', end_value: 0, suffix: '', sort_order: stats.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Statistik</button>
        </div>
      )}

      {/* Whys */}
      {tab === 'whys' && (
        <div className="space-y-3">
          {whys.map((w, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Item {i + 1}</span>
                <button onClick={() => setWhys(whys.filter((_, idx) => idx !== i))} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <input type="text" value={w.title} onChange={e => { const arr = [...whys]; arr[i] = { ...w, title: e.target.value }; setWhys(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm mb-2" placeholder="Judul" />
              <textarea rows={2} value={w.description} onChange={e => { const arr = [...whys]; arr[i] = { ...w, description: e.target.value }; setWhys(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Deskripsi" />
            </div>
          ))}
          <button onClick={() => setWhys([...whys, { title: '', description: '', sort_order: whys.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Item</button>
        </div>
      )}
    </AdminLayout>
  );
};

export default HomepageAdmin;
