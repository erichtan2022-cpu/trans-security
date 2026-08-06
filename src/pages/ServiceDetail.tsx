import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Shield, Briefcase, GraduationCap, Dog, Camera, Map, ShieldCheck } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/lib/supabase';
import type { Service } from '@/hooks/useSiteData';

const iconMap: Record<string, React.FC<any>> = {
  shield: Shield,
  briefcase: Briefcase,
  graduation: GraduationCap,
  dog: Dog,
  camera: Camera,
  map: Map,
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [others, setOthers] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('services').select('*').eq('slug', slug).maybeSingle();
      setService(data);
      const { data: all } = await supabase.from('services').select('*').neq('slug', slug).order('sort_order').limit(3);
      setOthers(all ?? []);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 text-center text-navy/40">Memuat layanan...</div>
      </PageLayout>
    );
  }

  if (!service) {
    return (
      <PageLayout>
        <PageHero title="Layanan Tidak Ditemukan" breadcrumb={[{ label: 'Layanan', to: '/layanan' }, { label: 'Not Found' }]} />
        <div className="py-20 text-center">
          <Link to="/layanan" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded uppercase text-sm tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Layanan
          </Link>
        </div>
      </PageLayout>
    );
  }

  const Icon = iconMap[service.icon] ?? ShieldCheck;

  return (
    <PageLayout>
      <PageHero
        title={service.title}
        bgImage={service.image}
        breadcrumb={[{ label: 'Layanan', to: '/layanan' }, { label: service.title }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <img src={service.image} alt={service.title} className="w-full aspect-video object-cover rounded-xl shadow-md mb-8" />
            <p className="text-lg text-navy font-medium leading-relaxed mb-8 border-l-4 border-gold pl-5 italic">
              {service.short}
            </p>
            <h3 className="font-heading text-2xl font-bold text-navy mb-5">Keunggulan Layanan</h3>
            <div className="space-y-3">
              {service.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <p className="text-navy/80 text-sm leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-grey p-6 rounded-xl border-t-4 border-gold">
              <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center mb-4">
                <Icon className="w-7 h-7" />
              </div>
              <h4 className="font-heading font-bold text-navy mb-2">{service.title}</h4>
              <p className="text-sm text-navy/70">{service.short}</p>
            </div>
            <div className="bg-navy text-white p-6 rounded-xl">
              <h4 className="font-heading text-lg font-bold mb-2">Butuh Konsultasi?</h4>
              <p className="text-white/80 text-sm mb-4">Tim ahli kami siap menganalisis kebutuhan keamanan bisnis Anda secara gratis.</p>
              <Link to="/kontak" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-5 py-2.5 rounded text-sm uppercase tracking-wide transition-all">
                Hubungi Kami <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-16 bg-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-heading text-2xl font-bold text-navy mb-6">Layanan Lainnya</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map(o => (
                <Link key={o.slug} to={`/layanan/${o.slug}`} className="service-card bg-white rounded-xl overflow-hidden shadow-md group">
                  <img src={o.image} alt={o.title} className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="p-5">
                    <h4 className="font-heading font-bold text-navy mb-2 group-hover:text-gold transition-colors">{o.title}</h4>
                    <p className="text-xs text-navy/60 line-clamp-2">{o.short}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ServiceDetail;
