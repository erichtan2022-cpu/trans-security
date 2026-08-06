import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Slide } from '@/hooks/useSiteData';

const defaultSlides = [
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496413549_f435fb5c.jpg',
    title: 'Solusi Keamanan Terintegrasi untuk Bisnis Anda',
    sub: 'PT Trans Kontinental Indonesia — Berizin Resmi Mabes Polri',
    cta: 'Konsultasi Gratis',
    link: '/kontak',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496433125_fee58a0b.jpg',
    title: 'Tenaga Security Profesional & Bersertifikat',
    sub: 'Dilatih, Disiplin, Siap 24/7 Menjaga Aset Anda',
    cta: 'Lihat Layanan',
    link: '/layanan',
  },
  {
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496450891_3f72151f.jpg',
    title: 'Teknologi Keamanan Modern',
    sub: 'CCTV, Access Control, Guard Tour System Terintegrasi',
    cta: 'Hubungi Kami',
    link: '/kontak',
  },
];

const HeroSlider: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('homepage_slides').select('*').order('sort_order');
      if (data && data.length > 0) {
        setSlides(data.map((s: Slide) => ({
          image: s.image, title: s.title, sub: s.sub, cta: s.cta, link: s.link,
        })));
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div
            className="absolute inset-0 ken-burns-slide bg-center bg-cover"
            style={{ backgroundImage: `url(${s.img ?? s.image})`, animationPlayState: i === idx ? 'running' : 'paused' }}
            key={`${i}-${idx}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {slides.map((s, i) => (
              <div key={i} className={`${i === idx ? 'block animate-fade-in' : 'hidden'}`}>
                <span className="inline-block px-4 py-1.5 bg-gold/20 border border-gold/40 text-gold uppercase text-xs tracking-[0.3em] font-semibold mb-6">
                  Trans Security
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                  {s.title}
                </h1>
                <div className="w-20 h-1 bg-gold mb-6"></div>
                <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl leading-relaxed">
                  {s.sub}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={s.link}
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-7 py-4 rounded-md uppercase tracking-wide text-sm transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    {s.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/tentang-kami"
                    className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-gold hover:text-gold text-white px-7 py-4 rounded-md uppercase tracking-wide text-sm font-semibold transition-all"
                  >
                    Tentang Kami
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button onClick={() => setIdx((idx - 1 + slides.length) % slides.length)} className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-gold hover:border-gold hover:text-navy flex items-center justify-center transition-all" aria-label="Previous slide">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-10 bg-gold' : 'w-5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
        <button onClick={() => setIdx((idx + 1) % slides.length)} className="w-10 h-10 rounded-full border border-white/30 text-white hover:bg-gold hover:border-gold hover:text-navy flex items-center justify-center transition-all" aria-label="Next slide">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
