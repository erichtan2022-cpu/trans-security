import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/hooks/useSiteData';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('services').select('*').order('sort_order');
      setServices(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Layanan Kami"
        subtitle="Solusi keamanan terintegrasi end-to-end yang dirancang untuk kebutuhan bisnis modern."
        breadcrumb={[{ label: 'Layanan' }]}
      />
      <section className="py-20 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-navy/40">Memuat layanan...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(s => (
                <div key={s.slug} className="service-card bg-white rounded-xl overflow-hidden shadow-md group">
                  <div className="relative h-52 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                      Layanan
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-navy mb-3">{s.title}</h3>
                    <p className="text-navy/70 text-sm leading-relaxed mb-5">{s.short}</p>
                    <Link
                      to={`/layanan/${s.slug}`}
                      className="inline-flex items-center gap-2 bg-navy hover:bg-gold hover:text-navy text-white font-semibold text-sm px-5 py-2.5 rounded uppercase tracking-wider transition-all"
                    >
                      Detail Layanan <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
