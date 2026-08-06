import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag, User } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/hooks/useSiteData';

const Blog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    })();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(['Semua']);
    posts.forEach(p => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchCat = activeCategory === 'Semua' || p.category === activeCategory;
      const q = query.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [query, activeCategory, posts]);

  const featured = posts[0];

  return (
    <PageLayout>
      <PageHero
        title="Blog & News"
        subtitle="Insight, tips, dan kabar terbaru dari dunia keamanan profesional bersama tim ahli Trans Security."
        breadcrumb={[{ label: 'Blog' }]}
      />

      {loading ? (
        <div className="py-20 text-center text-navy/40">Memuat artikel...</div>
      ) : (
        <>
          {/* Featured Post */}
          {featured && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-grey rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                      Artikel Unggulan
                    </span>
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 text-xs text-navy/60 mb-4">
                      <span className="bg-navy text-gold px-3 py-1 rounded uppercase tracking-wider font-bold">{featured.category}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.read_time}</span>
                    </div>
                    <h2 className="font-heading text-2xl lg:text-3xl xl:text-4xl font-extrabold text-navy mb-4 leading-tight group-hover:text-gold transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-navy/70 leading-relaxed mb-6">{featured.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Search & Categories */}
          <section className="py-8 bg-grey border-y border-navy/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                      activeCategory === c ? 'bg-navy text-gold' : 'bg-white text-navy hover:bg-navy hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="relative lg:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy/40" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-navy/10 focus:border-gold focus:outline-none text-sm"
                />
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-navy/60 text-lg">Tidak ada artikel yang cocok. Coba kata kunci lain.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map(post => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="service-card bg-white rounded-xl overflow-hidden shadow-md group flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[11px] text-navy/60 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time}</span>
                        </div>
                        <h3 className="font-heading text-lg font-bold text-navy mb-3 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-navy/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-navy/10 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-navy text-gold flex items-center justify-center">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-semibold text-navy/80">{post.author}</span>
                          </div>
                          <span className="text-gold text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
                            Baca <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Tag Cloud */}
          <section className="py-12 bg-grey">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="font-heading text-2xl font-bold text-navy mb-2 flex items-center justify-center gap-2">
                <Tag className="w-5 h-5 text-gold" /> Topik Populer
              </h3>
              <div className="w-12 h-1 bg-gold mx-auto mb-6"></div>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from(new Set(posts.flatMap(p => p.tags))).map(t => (
                  <button
                    key={t}
                    onClick={() => { setQuery(t); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                    className="bg-white border border-navy/10 hover:border-gold hover:bg-gold hover:text-navy text-navy/70 text-xs px-4 py-1.5 rounded-full uppercase tracking-wider font-semibold transition-all"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
};

export default Blog;
