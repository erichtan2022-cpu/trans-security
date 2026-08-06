import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Briefcase, MapPin } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/hooks/useSiteData';

const Career: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('jobs').select('*').order('sort_order');
      setJobs(data ?? []);
    })();
  }, []);

  return (
    <PageLayout>
      <PageHero
        title="Bergabung dengan Tim Kami"
        subtitle="Jadilah bagian dari perusahaan jasa keamanan terdepan. Kesempatan berkembang bersama Trans Security."
        breadcrumb={[{ label: 'Karir' }]}
      />

      {/* Jobs */}
      <section className="py-20 bg-grey">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {jobs.map(j => (
              <div key={j.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-navy text-gold flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-navy">{j.title}</h3>
                      <p className="text-sm text-navy/60 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> Jabodetabek
                      </p>
                    </div>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-navy uppercase tracking-wider mb-3">Syarat & Ketentuan:</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {j.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-navy/10">
                    <Link
                      to="/kontak"
                      className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-lg text-sm uppercase tracking-wide transition-colors"
                    >
                      Lamar Sekarang <ArrowRight className="w-4 h-4" />
                    </Link>
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

export default Career;
