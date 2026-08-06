import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, CreditCard as Edit, Trash2, FileText, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('blog_posts').select('id, slug, title, excerpt, category, date, author').order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('blog_posts').delete().eq('id', deleteId);
    setDeleteId(null);
    load();
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-navy mb-1">Artikel Blog</h1>
          <p className="text-navy/60 text-sm">Kelola semua artikel blog di website.</p>
        </div>
        <Link
          to="/admin/blog/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-4 py-2.5 rounded-lg text-sm uppercase tracking-wide transition-colors"
        >
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Link>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
        <input
          type="text"
          placeholder="Cari artikel..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-navy/10 focus:border-gold focus:outline-none text-sm"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-navy/5 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-navy/40">Memuat...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-navy/20 mx-auto mb-3" />
            <p className="text-navy/60">Belum ada artikel. Klik "Tambah Artikel" untuk membuat.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-grey text-left text-xs uppercase tracking-wider text-navy/60">
              <tr>
                <th className="px-4 py-3 font-semibold">Judul</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Kategori</th>
                <th className="px-4 py-3 font-semibold hidden lg:table-cell">Penulis</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Tanggal</th>
                <th className="px-4 py-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-grey/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy text-sm line-clamp-1">{p.title}</p>
                    <p className="text-xs text-navy/50 line-clamp-1 mt-0.5">{p.excerpt}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="bg-navy/10 text-navy text-xs font-semibold px-2.5 py-1 rounded">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm text-navy/70">{p.author}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-sm text-navy/60">{p.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/blog/edit/${p.id}`} className="p-2 rounded-lg bg-navy/5 hover:bg-navy hover:text-gold text-navy transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)} className="p-2 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-navy">Hapus Artikel?</h3>
                <p className="text-sm text-navy/60">Artikel akan dihapus permanen dan tidak bisa dikembalikan.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2.5 rounded-lg bg-grey text-navy font-semibold text-sm hover:bg-navy/10 transition-colors">Batal</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BlogList;
