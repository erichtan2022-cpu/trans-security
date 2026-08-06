import React, { useEffect, useState } from 'react';
import { Save, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface ContactData {
  address: string;
  phone: string;
  email: string;
  hours: string;
  map_embed: string;
  hotline: string;
}

const empty: ContactData = { address: '', phone: '', email: '', hours: '', map_embed: '', hotline: '' };

const ContactAdmin: React.FC = () => {
  const [data, setData] = useState<ContactData>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase.from('contact_info').select('*').eq('id', 1).maybeSingle();
      if (row) setData(row);
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('contact_info').upsert({ id: 1, ...data, updated_at: new Date().toISOString() });
    setSaving(false);
    alert('Perubahan tersimpan!');
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Kontak</h1>
          <p className="text-navy/60 text-sm">Ubah informasi kontak yang tampil di halaman Kontak.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-navy/5 p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Alamat</label>
          <textarea rows={2} value={data.address} onChange={e => setData({ ...data, address: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Telepon</label>
            <input type="text" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy mb-2">Email</label>
            <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Jam Operasional</label>
          <input type="text" value={data.hours} onChange={e => setData({ ...data, hours: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Hotline Darurat</label>
          <input type="text" value={data.hotline} onChange={e => setData({ ...data, hotline: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">Embed URL Google Maps</label>
          <textarea rows={3} value={data.map_embed} onChange={e => setData({ ...data, map_embed: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm font-mono" />
          <p className="text-xs text-navy/50 mt-1">Tempelkan URL src dari embed Google Maps.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactAdmin;
