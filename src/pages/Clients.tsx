import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { supabase } from '@/lib/supabase';
import type { Client, Testimonial } from '@/hooks/useSiteData';

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    (async () => {
      const [c, t] = await Promise.all([
        supabase.from('clients').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
      ]);
      setClients(c.data ?? []);
      setTestimonials(t.data ?? []);
    })();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Klien & Testimoni"
        subtitle="Dipercaya oleh 100+ perusahaan terkemuka di Indonesia dari berbagai sektor industri."
        breadcrumb={[{ label: 'Klien' }]}
      />

      {/* Clients grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Portofolio" title="Klien Korporat Kami" center />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
            {clients.map(c => (
              <div key={c.id} className="bg-grey h-24 rounded-lg flex items-center justify-center border border-navy/5 hover:border-gold transition-all">
                <span className="font-heading font-bold text-navy/60 text-lg tracking-wider">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Testimoni" title="Apa Kata Klien Kami" center />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {testimonials.map(t => (
              <div key={t.id} className="bg-white p-7 rounded-xl shadow-md border-t-4 border-gold">
                <div className="text-gold text-4xl font-heading leading-none mb-3">"</div>
                <p className="text-navy/80 text-sm leading-relaxed mb-5 italic">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-navy text-sm">{t.name}</p>
                    <p className="text-navy/60 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Clients;
