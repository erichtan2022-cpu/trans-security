import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageInput from '@/components/admin/ImageInput';

interface Client { id?: string; name: string; sort_order: number; }
interface Testimonial { id?: string; name: string; role: string; quote: string; img: string; sort_order: number; }

const ClientsAdmin: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<'clients' | 'testimonials'>('clients');

  useEffect(() => {
    (async () => {
      const [c, t] = await Promise.all([
        supabase.from('clients').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
      ]);
      setClients(c.data ?? []);
      setTestimonials(t.data ?? []);
      setLoading(false);
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await Promise.all([
      ...clients.map(c => c.id ? supabase.from('clients').update(c).eq('id', c.id) : supabase.from('clients').insert(c)),
      ...testimonials.map(t => t.id ? supabase.from('testimonials').update(t).eq('id', t.id) : supabase.from('testimonials').insert(t)),
    ]);
    setSaving(false);
    alert('Perubahan tersimpan!');
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Klien & Testimoni</h1>
          <p className="text-navy/60 text-sm">Kelola daftar klien dan testimoni.</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {([
          { key: 'clients', label: 'Daftar Klien' },
          { key: 'testimonials', label: 'Testimoni' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.key ? 'bg-navy text-gold' : 'bg-white text-navy hover:bg-grey'}`}>{t.label}</button>
        ))}
      </div>

      {/* Clients */}
      {tab === 'clients' && (
        <div className="bg-white rounded-xl shadow-sm border border-navy/5 p-5">
          <div className="space-y-2">
            {clients.map((c, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="text" value={c.name} onChange={e => { const arr = [...clients]; arr[i] = { ...c, name: e.target.value }; setClients(arr); }} className="flex-1 px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Nama Klien" />
                <button onClick={() => setClients(clients.filter((_, idx) => idx !== i))} className="p-2.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <button onClick={() => setClients([...clients, { name: '', sort_order: clients.length }])} className="mt-3 flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Klien</button>
        </div>
      )}

      {/* Testimonials */}
      {tab === 'testimonials' && (
        <div className="space-y-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-navy">Testimoni {i + 1}</span>
                <button onClick={() => setTestimonials(testimonials.filter((_, idx) => idx !== i))} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
              <ImageInput value={t.img} onChange={v => { const arr = [...testimonials]; arr[i] = { ...t, img: v }; setTestimonials(arr); }} label="Foto" />
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <input type="text" value={t.name} onChange={e => { const arr = [...testimonials]; arr[i] = { ...t, name: e.target.value }; setTestimonials(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Nama" />
                <input type="text" value={t.role} onChange={e => { const arr = [...testimonials]; arr[i] = { ...t, role: e.target.value }; setTestimonials(arr); }} className="px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Peran/Jabatan" />
              </div>
              <textarea rows={3} value={t.quote} onChange={e => { const arr = [...testimonials]; arr[i] = { ...t, quote: e.target.value }; setTestimonials(arr); }} className="w-full mt-3 px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Kutipan testimoni..." />
            </div>
          ))}
          <button onClick={() => setTestimonials([...testimonials, { name: '', role: '', quote: '', img: '', sort_order: testimonials.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Testimoni</button>
        </div>
      )}
    </AdminLayout>
  );
};

export default ClientsAdmin;
