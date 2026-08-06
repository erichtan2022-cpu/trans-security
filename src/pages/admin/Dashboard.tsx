import React, { useEffect, useState } from 'react';
import { FileText, Briefcase, Users, Phone, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

interface Counts {
  blog: number;
  services: number;
  testimonials: number;
  clients: number;
}

const Dashboard: React.FC = () => {
  const [counts, setCounts] = useState<Counts>({ blog: 0, services: 0, testimonials: 0, clients: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [blog, services, testimonials, clients] = await Promise.all([
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
      ]);
      setCounts({
        blog: blog.count ?? 0,
        services: services.count ?? 0,
        testimonials: testimonials.count ?? 0,
        clients: clients.count ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: 'Artikel Blog', value: counts.blog, icon: FileText, to: '/admin/blog', color: 'bg-blue-500' },
    { label: 'Layanan', value: counts.services, icon: Briefcase, to: '/admin/services', color: 'bg-emerald-500' },
    { label: 'Testimoni', value: counts.testimonials, icon: Users, to: '/admin/clients', color: 'bg-purple-500' },
    { label: 'Klien', value: counts.clients, icon: TrendingUp, to: '/admin/clients', color: 'bg-orange-500' },
  ];

  const quickLinks = [
    { label: 'Kelola Artikel Blog', to: '/admin/blog', icon: FileText },
    { label: 'Kelola Layanan', to: '/admin/services', icon: Briefcase },
    { label: 'Edit Logo & Menu', to: '/admin/settings', icon: Phone },
    { label: 'Edit Info Kontak', to: '/admin/contact', icon: Phone },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold text-navy mb-1">Selamat Datang</h1>
        <p className="text-navy/60">Kelola seluruh konten website Trans Security dari satu tempat.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-navy/5">
              <div className={`w-12 h-12 rounded-lg ${c.color} text-white flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-heading font-extrabold text-navy">
                {loading ? '...' : c.value}
              </p>
              <p className="text-sm text-navy/60 mt-1">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-xl shadow-sm border border-navy/5 p-6">
        <h2 className="font-heading text-lg font-bold text-navy mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((q, i) => {
            const Icon = q.icon;
            return (
              <Link
                key={i}
                to={q.to}
                className="flex items-center justify-between p-4 rounded-lg bg-grey hover:bg-navy hover:text-white group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="font-semibold text-sm text-navy group-hover:text-white">{q.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-navy/30 group-hover:text-gold" />
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
