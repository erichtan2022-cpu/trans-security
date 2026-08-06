import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface Job { id?: string; title: string; requirements: string[]; sort_order: number; }

const CareersAdmin: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('jobs').select('*').order('sort_order');
      setJobs(data ?? []);
      setLoading(false);
    })();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(jobs.map(j => j.id ? supabase.from('jobs').update(j).eq('id', j.id) : supabase.from('jobs').insert(j)));
    setSaving(false);
    alert('Perubahan tersimpan!');
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Karir</h1>
          <p className="text-navy/60 text-sm">Kelola lowongan pekerjaan yang tampil di halaman Karir.</p>
        </div>
        <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((j, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-navy/5 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-navy">Lowongan {i + 1}</span>
              <button onClick={() => setJobs(jobs.filter((_, idx) => idx !== i))} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
            <input type="text" value={j.title} onChange={e => { const arr = [...jobs]; arr[i] = { ...j, title: e.target.value }; setJobs(arr); }} className="w-full px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm mb-3" placeholder="Judul Posisi" />
            <label className="block text-xs font-semibold text-navy/60 mb-2">Syarat & Ketentuan</label>
            <div className="space-y-2">
              {j.requirements.map((r, ri) => (
                <div key={ri} className="flex gap-2">
                  <input type="text" value={r} onChange={e => { const arr = [...jobs]; const reqs = [...j.requirements]; reqs[ri] = e.target.value; arr[i] = { ...j, requirements: reqs }; setJobs(arr); }} className="flex-1 px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder={`Syarat ${ri + 1}`} />
                  <button onClick={() => { const arr = [...jobs]; arr[i] = { ...j, requirements: j.requirements.filter((_, idx) => idx !== ri) }; setJobs(arr); }} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><X className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => { const arr = [...jobs]; arr[i] = { ...j, requirements: [...j.requirements, ''] }; setJobs(arr); }} className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Syarat</button>
            </div>
          </div>
        ))}
        <button onClick={() => setJobs([...jobs, { title: '', requirements: [], sort_order: jobs.length }])} className="flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Lowongan</button>
      </div>
    </AdminLayout>
  );
};

export default CareersAdmin;
