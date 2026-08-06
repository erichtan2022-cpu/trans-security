import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageInput from '@/components/admin/ImageInput';

interface Director { id?: string; name: string; role: string; img: string; sort_order: number; }
interface TimelineItem { id?: string; year: string; title: string; description: string; sort_order: number; }
interface LegalityItem { id?: string; title: string; description: string; sort_order: number; }

const AboutAdmin: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [legality, setLegality] = useState<LegalityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'directors' | 'timeline' | 'legality'>('directors');

  useEffect(() => {
    (async () => {
      const [d, t, l] = await Promise.all([
        supabase.from('directors').select('*').order('sort_order'),
        supabase.from('timeline').select('*').order('sort_order'),
        supabase.from('legality').select('*').order('sort_order'),
      ]);
      setDirectors(d.data ?? []);
      setTimeline(t.data ?? []);
      setLegality(l.data ?? []);
      setLoading(false);
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await Promise.all([
      ...directors.map(d => d.id ? supabase.from('directors').update(d).eq('id', d.id) : supabase.from('directors').insert(d)),
      ...timeline.map(t => t.id ? supabase.from('timeline').update(t).eq('id', t.id) : supabase.from('timeline').insert(t)),
      ...legality.map(l => l.id ? supabase.from('legality').update(l).eq('id', l.id) : supabase.from('legality').insert(l)),
    ]);
    setSaving(false);
    alert('Perubahan tersimpan!');
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Tentang Kami</h1>
          <p className="text-navy/60 text-sm">Kelola tim direktur, linimasa, dan legalitas.</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {([
          { key: 'directors', label: 'Tim Direktur' },
          { key: 'timeline', label: 'Linimasa' },
          { key: 'legality', label: 'Legalitas' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.key ? 'bg-navy text-gold' : 'bg-white text-navy hover:bg-grey'}`}>{t.label}</button>
        ))}
      </div>

      {/* Directors */}
      {tab === 'directors' && (
        <div className="space-y-4">
          {directors.map((d, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Direktur {i + 1}</span>
                <button onClick={() => setDirectors(directors.filter((_, idx) => idx !== i))} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <ImageInput value={d.img} onChange={v => { const arr = [...directors]; arr[i] = { ...d, img: v }; setDirectors(arr); }} label="Foto" />
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <input type="text" value={d.name} onChange={e => { const arr = [...directors]; arr[i] = { ...d, name: e.target.value }; setDirectors(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Nama" />
                <input type="text" value={d.role} onChange={e => { const arr = [...directors]; arr[i] = { ...d, role: e.target.value }; setDirectors(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Jabatan" />
              </div>
            </div>
          ))}
          <button onClick={() => setDirectors([...directors, { name: '', role: '', img: '', sort_order: directors.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Direktur</button>
        </div>
      )}

      {/* Timeline */}
      {tab === 'timeline' && (
        <div className="space-y-3">
          {timeline.map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-4 flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-24">
                <label className="block text-xs font-semibold text-navy/60 mb-1">Tahun</label>
                <input type="text" value={t.year} onChange={e => { const arr = [...timeline]; arr[i] = { ...t, year: e.target.value }; setTimeline(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-navy/60 mb-1">Judul</label>
                <input type="text" value={t.title} onChange={e => { const arr = [...timeline]; arr[i] = { ...t, title: e.target.value }; setTimeline(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-navy/60 mb-1">Deskripsi</label>
                <input type="text" value={t.description} onChange={e => { const arr = [...timeline]; arr[i] = { ...t, description: e.target.value }; setTimeline(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <button onClick={() => setTimeline(timeline.filter((_, idx) => idx !== i))} className="p-2.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors h-fit"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <button onClick={() => setTimeline([...timeline, { year: '', title: '', description: '', sort_order: timeline.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Milestone</button>
        </div>
      )}

      {/* Legality */}
      {tab === 'legality' && (
        <div className="space-y-3">
          {legality.map((l, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Item {i + 1}</span>
                <button onClick={() => setLegality(legality.filter((_, idx) => idx !== i))} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <input type="text" value={l.title} onChange={e => { const arr = [...legality]; arr[i] = { ...l, title: e.target.value }; setLegality(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm mb-2" placeholder="Judul" />
              <textarea rows={2} value={l.description} onChange={e => { const arr = [...legality]; arr[i] = { ...l, description: e.target.value }; setLegality(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Deskripsi" />
            </div>
          ))}
          <button onClick={() => setLegality([...legality, { title: '', description: '', sort_order: legality.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Legalitas</button>
        </div>
      )}
    </AdminLayout>
  );
};

export default AboutAdmin;
