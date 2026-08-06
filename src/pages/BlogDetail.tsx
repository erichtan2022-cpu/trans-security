import React, { useMemo, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag, Facebook, Twitter, Linkedin, Link as LinkIcon, Share2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/hooks/useSiteData';
import { useToast } from '@/hooks/use-toast';

const renderParagraph = (text: string, i: number) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p key={i} className="text-navy/80 leading-relaxed mb-5 text-[15px] lg:text-base">
      {parts.map((p, j) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={j} className="font-heading font-bold text-navy">{p.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={j}>{p}</React.Fragment>
        )
      )}
    </p>
  );
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [p, all] = await Promise.all([
        supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle(),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      ]);
      setPost(p.data);
      setAllPosts(all.data ?? []);
      setLoading(false);
    })();
  }, [slug]);

  const related = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
      .slice(0, 3);
  }, [post, allPosts]);

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 text-center text-navy/40">Memuat artikel...</div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <PageHero title="Artikel Tidak Ditemukan" breadcrumb={[{ label: 'Blog', to: '/blog' }, { label: 'Not Found' }]} />
        <div className="py-20 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded uppercase text-sm tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
          </Link>
        </div>
      </PageLayout>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(post.title);
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    if (links[platform]) window.open(links[platform], '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Link berhasil disalin!', description: 'Bagikan link artikel ini ke tim Anda.' });
    } catch {
      toast({ title: 'Gagal menyalin link', variant: 'destructive' });
    }
  };

  return (
    <PageLayout>
      <PageHero
        title={post.title}
        bgImage={post.image}
        breadcrumb={[{ label: 'Blog', to: '/blog' }, { label: post.category }]}
      />

      <article className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-navy/70 mb-6 pb-6 border-b border-navy/10">
              <span className="inline-flex items-center gap-2 bg-gold/15 text-gold px-3 py-1.5 rounded font-bold text-xs uppercase tracking-wider">
                <Tag className="w-3 h-3" />{post.category}
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gold" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gold" />{post.read_time}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-gold" />{post.author}</span>
            </div>

            {/* Hero image */}
            <img src={post.image} alt={post.title} className="w-full aspect-video object-cover rounded-xl shadow-md mb-8" />

            {/* Excerpt */}
            <p className="text-lg lg:text-xl text-navy font-medium leading-relaxed mb-8 border-l-4 border-gold pl-5 italic">
              {post.excerpt}
            </p>

            {/* Body */}
            <div>
              {post.content.map((p, i) => renderParagraph(p, i))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-navy/10">
              <h4 className="font-heading text-sm uppercase tracking-wider text-navy/60 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(t => (
                  <Link
                    key={t}
                    to={`/blog?tag=${encodeURIComponent(t)}`}
                    className="bg-grey hover:bg-gold hover:text-navy text-navy/70 text-xs px-4 py-1.5 rounded-full uppercase tracking-wider font-semibold transition-all"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-navy/10">
              <h4 className="font-heading text-sm uppercase tracking-wider text-navy/60 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Bagikan Artikel
              </h4>
              <div className="flex gap-2">
                <button onClick={() => handleShare('facebook')} aria-label="Share Facebook" className="w-11 h-11 rounded-full bg-navy text-white hover:bg-gold hover:text-navy flex items-center justify-center transition-all">
                  <Facebook className="w-5 h-5" />
                </button>
                <button onClick={() => handleShare('twitter')} aria-label="Share Twitter" className="w-11 h-11 rounded-full bg-navy text-white hover:bg-gold hover:text-navy flex items-center justify-center transition-all">
                  <Twitter className="w-5 h-5" />
                </button>
                <button onClick={() => handleShare('linkedin')} aria-label="Share LinkedIn" className="w-11 h-11 rounded-full bg-navy text-white hover:bg-gold hover:text-navy flex items-center justify-center transition-all">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button onClick={handleCopy} aria-label="Copy link" className="w-11 h-11 rounded-full bg-navy text-white hover:bg-gold hover:text-navy flex items-center justify-center transition-all">
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link to="/blog" className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" /> Semua Artikel
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Author card */}
            <div className="bg-grey p-6 rounded-xl border-t-4 border-gold">
              <h4 className="font-heading text-sm uppercase tracking-wider text-navy/60 mb-4">Tentang Penulis</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center font-heading font-extrabold text-lg">
                  {post.author.split(' ').map(s => s[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-heading font-bold text-navy">{post.author}</p>
                  <p className="text-xs text-navy/60 uppercase tracking-wider">{post.author_role}</p>
                </div>
              </div>
              <p className="text-sm text-navy/70 leading-relaxed">
                Praktisi keamanan profesional di Trans Security Indonesia, berpengalaman lebih dari satu dekade melayani klien korporat di Indonesia.
              </p>
            </div>

            {/* CTA card */}
            <div className="bg-navy text-white p-6 rounded-xl">
              <h4 className="font-heading text-lg font-bold mb-2">Butuh Konsultasi?</h4>
              <p className="text-white/80 text-sm mb-4">Tim ahli kami siap menganalisis kebutuhan keamanan bisnis Anda secara gratis.</p>
              <Link to="/kontak" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-5 py-2.5 rounded text-sm uppercase tracking-wide transition-all">
                Hubungi Kami <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Recent posts */}
            <div className="bg-grey p-6 rounded-xl">
              <h4 className="font-heading text-sm uppercase tracking-wider text-navy/60 mb-4">Artikel Terbaru</h4>
              <ul className="space-y-4">
                {allPosts.filter(p => p.slug !== post.slug).slice(0, 4).map(p => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`} className="flex gap-3 group">
                      <img src={p.image} alt={p.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors line-clamp-2 leading-snug">{p.title}</p>
                        <p className="text-xs text-navy/50 mt-1">{p.date}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="uppercase tracking-[0.3em] text-xs font-bold text-gold">Baca Juga</span>
                <h2 className="font-heading text-3xl font-extrabold text-navy mt-2">Artikel Terkait</h2>
                <div className="w-16 h-1 bg-gold mt-3"></div>
              </div>
              <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-navy hover:text-gold font-bold uppercase text-sm tracking-wider transition-colors">
                Semua Artikel <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="service-card bg-white rounded-xl overflow-hidden shadow-md group">
                  <img src={p.image} alt={p.title} className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="p-5">
                    <span className="inline-block bg-gold/15 text-gold text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider mb-3">
                      {p.category}
                    </span>
                    <h4 className="font-heading font-bold text-navy mb-2 leading-snug group-hover:text-gold transition-colors line-clamp-2">{p.title}</h4>
                    <p className="text-xs text-navy/60 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.read_time}</span>
                    </p>
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

export default BlogDetail;
