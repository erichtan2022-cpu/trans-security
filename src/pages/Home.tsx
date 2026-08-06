import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, BadgeCheck, Zap, ArrowRight, ShieldCheck, Briefcase, Cpu } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import HeroSlider from '@/components/HeroSlider';
import Counter from '@/components/Counter';
import SectionTitle from '@/components/SectionTitle';
import { supabase } from '@/lib/supabase';
import type { Service, Stat, WhyUs, Client, Testimonial } from '@/hooks/useSiteData';

const featuredIcons = [ShieldCheck, Briefcase, Cpu];
const whyIcons = [BadgeCheck, Users, Shield, Zap];

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [whys, setWhys] = useState<WhyUs[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [s, st, w, c, t] = await Promise.all([
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('statistics').select('*').order('sort_order'),
        supabase.from('why_us').select('*').order('sort_order'),
        supabase.from('clients').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
      ]);
      setServices(s.data ?? []);
      setStats(st.data ?? []);
      setWhys(w.data ?? []);
      setClients(c.data ?? []);
      setTestimonials(t.data ?? []);
      setLoading(false);
    })();
  }, []);

  const featured = services.slice(0, 3);

  return (
    <PageLayout>
      <HeroSlider />

      {/* Statistics */}
      <section className="relative -mt-20 z-30 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-8 lg:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t-4 border-gold">
          {stats.map((s, i) => (
            <div key={s.id} className={`text-center ${i < 3 ? 'lg:border-r lg:border-navy/10' : ''}`}>
              <div className="font-heading text-4xl lg:text-5xl font-extrabold text-navy mb-1">
                <Counter end={s.end_value} suffix={s.suffix} />
              </div>
              <p className="text-navy/70 text-sm uppercase tracking-wider font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 lg:py-28 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Layanan Unggulan"
            title="Solusi Keamanan End-to-End"
            subtitle="Tiga pilar utama Trans Security yang melindungi ribuan aset perusahaan terkemuka di Indonesia."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((s, i) => {
              const Icon = featuredIcons[i] ?? ShieldCheck;
              return (
                <Link
                  to={`/layanan/${s.slug}`}
                  key={s.slug}
                  className="service-card bg-white rounded-xl p-8 shadow-md group block"
                >
                  <div className="w-16 h-16 rounded-full bg-navy text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-navy transition-all duration-300 group-hover:rotate-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy mb-3">{s.title}</h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-5">{s.short}</p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                    Selengkapnya <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/layanan" className="inline-flex items-center gap-2 bg-navy hover:bg-navy-900 text-white px-7 py-3.5 rounded-md font-bold uppercase tracking-wide text-sm transition-all">
              Lihat Semua Layanan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Parallax */}
      <section
        className="relative py-24 lg:py-32 parallax-bg"
        style={{ backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496477417_7deced03.png)' }}
      >
        <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Mengapa Trans Security"
            title="Kepercayaan Dibangun dari Bukti"
            subtitle="Selama lebih dari satu dekade, kami menjadi pilihan utama korporat besar di Indonesia karena alasan-alasan ini."
            center
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {whys.map((w, i) => {
              const Icon = whyIcons[i] ?? BadgeCheck;
              return (
                <div key={w.id} className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-gold p-7 rounded-xl transition-all hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-full bg-gold/20 text-gold flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-navy transition-all">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{w.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{w.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clients Marquee */}
      <section className="py-16 bg-white border-y border-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Klien Kami"
            title="Dipercaya oleh 100+ Perusahaan Terkemuka"
            center
          />
        </div>
        <div className="overflow-hidden mt-8">
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <div key={i} className="flex-shrink-0 w-44 mx-4 h-20 bg-grey rounded-lg flex items-center justify-center border border-navy/5 hover:border-gold transition-all">
                <span className="font-heading font-bold text-navy/60 text-lg tracking-wider">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial preview */}
      <section className="py-20 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Testimoni" title="Apa Kata Klien Kami" center />
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {testimonials.map((t) => (
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

      {/* CTA Parallax */}
      <section
        className="relative py-24 lg:py-32 parallax-bg"
        style={{ backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496450891_3f72151f.jpg)' }}
      >
        <div className="absolute inset-0 bg-navy/85" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-gold/20 border border-gold/40 text-gold uppercase text-xs tracking-[0.3em] font-semibold mb-6">
            Saatnya Bertindak
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Amankan Bisnis Anda Sekarang
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            Diskusikan kebutuhan keamanan Anda dengan konsultan kami. Konsultasi awal gratis, tanpa komitmen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/kontak" className="bg-gold hover:bg-gold-dark text-navy font-bold px-8 py-4 rounded-md uppercase tracking-wide text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2">
              Hubungi Kami <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/layanan" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold px-8 py-4 rounded-md uppercase tracking-wide text-sm transition-all">
              Jelajahi Layanan
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
