import React, { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, Briefcase, X, Save, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageInput from '@/components/admin/ImageInput';

interface Service {
  id?: string;
  slug: string;
  title: string;
  short: string;
  image: string;
  icon: string;
  benefits: string[];
  sort_order: number;
}

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const iconOptions = ['shield', 'briefcase', 'graduation', 'dog', 'camera', 'map'];

const ServicesAdmin: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('services').select('*').order('sort_order', { ascending: true });
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => setEditing({ slug: '', title: '', short: '', image: '', icon: 'shield', benefits: [], sort_order: services.length });
  const startEdit = (s: Service) => setEditing({ ...s });

  const handleSave = async () => {
    if (!editing) return;
    const slug = editing.slug || slugify(editing.title);
    const payload = { ...editing, slug };
    if (editing.id) {
      await supabase.from('services').update(payload).eq('id', editing.id);
    } else {
      const { error } = await supabase.from('services').insert(payload);
      if (error?.code === '23505') {
        payload.slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
        await supabase.from('services').insert(payload);
      }
    }
    setEditing(null);
    load();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('services').delete().eq('id', deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Layanan</h1>
          <p className="text-navy/60 text-sm">Kelola daftar layanan yang tampil di halaman Layanan.</p>
        </div>
        <button onClick={startNew} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-4 py-2.5 rounded-lg text-sm uppercase tracking-wide transition-colors">
          <Plus className="w-4 h-4" /> Tambah Layanan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full p-8 text-center text-navy/40">Memuat...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full p-12 text-center">
            <Briefcase className="w-12 h-12 text-navy/20 mx-auto mb-3" />
            <p className="text-navy/60">Belum ada layanan.</p>
          </div>
        ) : services.map(s => (
          <div key={s.id} className="bg-white rounded-xl shadow-sm border border-navy/5 overflow-hidden">
            <div className="relative h-40 overflow-hidden">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-gold text-navy text-xs font-bold px-2.5 py-1 rounded uppercase">{s.icon}</span>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-bold text-navy mb-1">{s.title}</h3>
              <p className="text-xs text-navy/60 line-clamp-2 mb-3">{s.short}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(s)} className="flex items-center gap-1.5 bg-navy/5 hover:bg-navy hover:text-gold text-navy px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteId(s.id!)} className="flex items-center gap-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-xl font-bold text-navy">{editing.id ? 'Edit Layanan' : 'Tambah Layanan'}</h2>
              <button onClick={() => setEditing(null)} className="text-navy/40 hover:text-navy"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Judul</label>
                <input type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value, slug: editing.id ? editing.slug : slugify(e.target.value) })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Slug</label>
                <input type="text" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm font-mono" />
              </div>
              <ImageInput value={editing.image} onChange={v => setEditing({ ...editing, image: v })} label="Gambar Layanan" />
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Deskripsi Singkat</label>
                <textarea rows={2} value={editing.short} onChange={e => setEditing({ ...editing, short: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Ikon</label>
                <select value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm">
                  {iconOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Keunggulan (Benefits)</label>
                <div className="space-y-2">
                  {editing.benefits.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" value={b} onChange={e => { const arr = [...editing.benefits]; arr[i] = e.target.value; setEditing({ ...editing, benefits: arr }); }} className="flex-1 px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
                      <button onClick={() => setEditing({ ...editing, benefits: editing.benefits.filter((_, idx) => idx !== i) })} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button onClick={() => setEditing({ ...editing, benefits: [...editing.benefits, ''] })} className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Keunggulan</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">Urutan Tampil</label>
                <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-navy/10">
              <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-grey text-navy font-semibold text-sm hover:bg-navy/10 transition-colors">Batal</button>
              <button onClick={handleSave} disabled={!editing.title} className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-4 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50"><Save className="w-4 h-4" /> Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-heading font-bold text-navy mb-2">Hapus Layanan?</h3>
            <p className="text-sm text-navy/60 mb-4">Layanan akan dihapus permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-grey text-navy font-semibold text-sm hover:bg-navy/10">Batal</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ServicesAdmin;
