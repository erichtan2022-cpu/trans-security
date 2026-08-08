import React, { useEffect, useState } from 'react';
import { CircleCheck as CheckCircle2, Target, Eye, Award } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { supabase } from '@/lib/supabase';
import type { TimelineItem, LegalityItem, Director } from '@/hooks/useSiteData';

const About: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [legality, setLegality] = useState<LegalityItem[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [profile, setProfile] = useState<{
    eyebrow: string;
    title: string;
    paragraph_1: string;
    paragraph_2: string;
    vision: string;
    mission: string;
    image: string;
    badge_number: string;
    badge_label: string;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const [t, l, d, s] = await Promise.all([
        supabase.from('timeline').select('*').order('sort_order'),
        supabase.from('legality').select('*').order('sort_order'),
        supabase.from('directors').select('*').order('sort_order'),
        supabase.from('site_settings').select('profile_eyebrow, profile_title, profile_paragraph_1, profile_paragraph_2, profile_vision, profile_mission, profile_image, profile_badge_number, profile_badge_label').eq('id', 1).maybeSingle(),
      ]);
      setTimeline(t.data ?? []);
      setLegality(l.data ?? []);
      setDirectors(d.data ?? []);
      if (s.data) {
        setProfile({
          eyebrow: s.data.profile_eyebrow,
          title: s.data.profile_title,
          paragraph_1: s.data.profile_paragraph_1,
          paragraph_2: s.data.profile_paragraph_2,
          vision: s.data.profile_vision,
          mission: s.data.profile_mission,
          image: s.data.profile_image,
          badge_number: s.data.profile_badge_number,
          badge_label: s.data.profile_badge_label,
        });
      }
    })();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Tentang Trans Security"
        subtitle="Lebih dari satu dekade melindungi aset, manusia, dan reputasi perusahaan-perusahaan terkemuka di Indonesia."
        breadcrumb={[{ label: 'Tentang Kami' }]}
      />

      {/* Profil */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-gold">{profile?.eyebrow || 'Profil Perusahaan'}</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-navy mt-3 mb-4">
              {profile?.title || 'Trans Security Indonesia'}
            </h2>
            <div className="w-16 h-1 bg-gold mb-5"></div>
            <p className="text-navy/80 leading-relaxed mb-4">
              {profile?.paragraph_1 || 'Berdiri sejak tahun 2013, Trans Security Indonesia adalah perusahaan jasa keamanan profesional yang berizin resmi dari Mabes Polri. Kami melayani sektor korporat, manufaktur, perbankan, perumahan, dan pusat perbelanjaan dengan standar layanan kelas dunia.'}
            </p>
            <p className="text-navy/80 leading-relaxed mb-6">
              {profile?.paragraph_2 || 'Dengan lebih dari 1.000 personel terlatih, command center 24/7, dan teknologi keamanan termutakhir, kami menjadi mitra terpercaya untuk melindungi aset, manusia, dan reputasi bisnis Anda.'}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-grey p-5 rounded-lg border-l-4 border-gold">
                <Eye className="w-6 h-6 text-gold mb-2" />
                <h4 className="font-heading font-bold text-navy mb-1">Visi</h4>
                <p className="text-sm text-navy/70">{profile?.vision || 'Menjadi perusahaan jasa pengamanan terdepan di Indonesia.'}</p>
              </div>
              <div className="bg-grey p-5 rounded-lg border-l-4 border-gold">
                <Target className="w-6 h-6 text-gold mb-2" />
                <h4 className="font-heading font-bold text-navy mb-1">Misi</h4>
                <p className="text-sm text-navy/70">{profile?.mission || 'Memberikan layanan profesional dengan SDM berkualitas dan teknologi modern.'}</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={profile?.image || "https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778496450891_3f72151f.jpg"}
              alt="Command Center"
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-gold text-navy p-6 rounded-xl shadow-xl hidden sm:block">
              <p className="font-heading text-3xl font-extrabold">{profile?.badge_number || '10+'}</p>
              <p className="text-sm font-semibold uppercase tracking-wider">{profile?.badge_label || 'Tahun Pengalaman'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-grey">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Perjalanan Kami" title="Milestone Trans Security" center />
          <div className="relative mt-12">
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gold/40"></div>
            {timeline.map((t, i) => (
              <div key={t.id} className={`relative flex flex-col lg:flex-row gap-6 mb-10 lg:mb-14 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-white ring-2 ring-gold/40 z-10 mt-1.5"></div>
                <div className="lg:w-1/2 pl-12 lg:pl-0 lg:px-8">
                  <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 border-gold ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                    <span className="font-heading text-2xl font-extrabold text-gold">{t.year}</span>
                    <h3 className="font-heading font-bold text-navy mt-1 mb-2 text-lg">{t.title}</h3>
                    <p className="text-sm text-navy/70 leading-relaxed">{t.description}</p>
                  </div>
                </div>
                <div className="lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legality */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Legalitas" title="Resmi, Terpercaya, Bersertifikat" center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {legality.map((l) => (
              <div key={l.id} className="service-card bg-grey p-7 rounded-xl text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/15 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-9 h-9 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-2">{l.title}</h3>
                <p className="text-sm text-navy/70">{l.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Tim Kami" title="Pemimpin di Balik Trans Security" center />
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {directors.map((d) => (
              <div key={d.id} className="group relative overflow-hidden rounded-xl shadow-lg">
                <img src={d.img} alt={d.name} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Award className="w-6 h-6 text-gold mb-2" />
                  <h3 className="font-heading text-xl font-bold">{d.name}</h3>
                  <p className="text-gold text-sm uppercase tracking-wider">{d.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
