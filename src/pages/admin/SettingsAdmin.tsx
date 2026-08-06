import React, { useEffect, useState } from 'react';
import { Save, Settings, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import ImageInput from '@/components/admin/ImageInput';

interface NavItem { to: string; label: string; }
interface SiteSettings {
  company_name: string;
  brand_name: string;
  logo_header_url: string;
  logo_footer_url: string;
  nav_menu: NavItem[];
}

const empty: SiteSettings = { company_name: '', brand_name: '', logo_header_url: '', logo_footer_url: '', nav_menu: [] };

const SettingsAdmin: React.FC = () => {
  const [data, setData] = useState<SiteSettings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: row } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle();
      if (row) setData({
        company_name: row.company_name ?? '',
        brand_name: row.brand_name ?? '',
        logo_header_url: row.logo_header_url ?? '',
        logo_footer_url: row.logo_footer_url ?? '',
        nav_menu: row.nav_menu ?? [],
      });
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    await supabase.from('site_settings').upsert({
      id: 1,
      company_name: data.company_name,
      brand_name: data.brand_name,
      logo_header_url: data.logo_header_url,
      logo_footer_url: data.logo_footer_url,
      nav_menu: data.nav_menu,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    alert('Perubahan tersimpan!');
  };

  const moveNavItem = (i: number, dir: -1 | 1) => {
    const arr = [...data.nav_menu];
    const target = i + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[i], arr[target]] = [arr[target], arr[i]];
    setData({ ...data, nav_menu: arr });
  };

  if (loading) return <AdminLayout><div className="p-8 text-center text-navy/40">Memuat...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Pengaturan Situs</h1>
          <p className="text-navy/60 text-sm">Ubah logo, nama perusahaan, dan menu navigasi.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide disabled:opacity-50">
          <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      {/* Logo & Brand */}
      <div className="bg-white rounded-xl shadow-sm border border-navy/5 p-6 mb-6">
        <h2 className="font-heading text-lg font-bold text-navy mb-4">Logo & Identitas</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Nama Perusahaan</label>
              <input type="text" value={data.company_name} onChange={e => setData({ ...data, company_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">Nama Brand (Header)</label>
              <input type="text" value={data.brand_name} onChange={e => setData({ ...data, brand_name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" />
            </div>
          </div>
          <ImageInput value={data.logo_header_url} onChange={v => setData({ ...data, logo_header_url: v })} label="Logo Header (biarkan kosong untuk gunakan logo default)" />
          <ImageInput value={data.logo_footer_url} onChange={v => setData({ ...data, logo_footer_url: v })} label="Logo Footer (biarkan kosong untuk gunakan logo default)" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-xl shadow-sm border border-navy/5 p-6">
        <h2 className="font-heading text-lg font-bold text-navy mb-4">Menu Navigasi</h2>
        <p className="text-sm text-navy/60 mb-4">Atur urutan dan label menu yang tampil di header situs.</p>
        <div className="space-y-2">
          {data.nav_menu.map((item, i) => (
            <div key={i} className="flex gap-2 items-center bg-grey rounded-lg p-3">
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveNavItem(i, -1)} disabled={i === 0} className="text-navy/40 hover:text-gold disabled:opacity-20"><ArrowUp className="w-4 h-4" /></button>
                <button onClick={() => moveNavItem(i, 1)} disabled={i === data.nav_menu.length - 1} className="text-navy/40 hover:text-gold disabled:opacity-20"><ArrowDown className="w-4 h-4" /></button>
              </div>
              <input type="text" value={item.label} onChange={e => { const arr = [...data.nav_menu]; arr[i] = { ...item, label: e.target.value }; setData({ ...data, nav_menu: arr }); }} className="flex-1 px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm" placeholder="Label" />
              <input type="text" value={item.to} onChange={e => { const arr = [...data.nav_menu]; arr[i] = { ...item, to: e.target.value }; setData({ ...data, nav_menu: arr }); }} className="w-32 px-3 py-2 rounded-lg border border-navy/10 focus:border-gold focus:outline-none text-sm font-mono" placeholder="/path" />
              <button onClick={() => setData({ ...data, nav_menu: data.nav_menu.filter((_, idx) => idx !== i) })} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <button onClick={() => setData({ ...data, nav_menu: [...data.nav_menu, { to: '/', label: '' }] })} className="mt-3 flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark"><Plus className="w-4 h-4" /> Tambah Menu</button>
      </div>
    </AdminLayout>
  );
};

export default SettingsAdmin;
