import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  author_role: string;
  date: string;
  read_time: string;
  category: string;
  tags: string[];
  content: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  short: string;
  image: string;
  icon: string;
  benefits: string[];
  sort_order: number;
}

export interface Slide {
  id: string;
  image: string;
  title: string;
  sub: string;
  cta: string;
  link: string;
  sort_order: number;
}

export interface Stat {
  id: string;
  label: string;
  end_value: number;
  suffix: string;
  sort_order: number;
}

export interface WhyUs {
  id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface Client {
  id: string;
  name: string;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  img: string;
  sort_order: number;
}

export interface Director {
  id: string;
  name: string;
  role: string;
  img: string;
  sort_order: number;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface LegalityItem {
  id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface Job {
  id: string;
  title: string;
  requirements: string[];
  sort_order: number;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
  map_embed: string;
  hotline: string;
}

export interface NavItem {
  to: string;
  label: string;
}

export interface SiteSettings {
  company_name: string;
  brand_name: string;
  logo_header_url: string;
  logo_footer_url: string;
  nav_menu: NavItem[];
}

export function useSiteData() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [whys, setWhys] = useState<WhyUs[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [legality, setLegality] = useState<LegalityItem[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [b, s, sl, st, w, c, t, d, tl, l, j, ci, ss] = await Promise.all([
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('homepage_slides').select('*').order('sort_order'),
        supabase.from('statistics').select('*').order('sort_order'),
        supabase.from('why_us').select('*').order('sort_order'),
        supabase.from('clients').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
        supabase.from('directors').select('*').order('sort_order'),
        supabase.from('timeline').select('*').order('sort_order'),
        supabase.from('legality').select('*').order('sort_order'),
        supabase.from('jobs').select('*').order('sort_order'),
        supabase.from('contact_info').select('*').eq('id', 1).maybeSingle(),
        supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      ]);

      setBlogPosts(b.data ?? []);
      setServices(s.data ?? []);
      setSlides(sl.data ?? []);
      setStats(st.data ?? []);
      setWhys(w.data ?? []);
      setClients(c.data ?? []);
      setTestimonials(t.data ?? []);
      setDirectors(d.data ?? []);
      setTimeline(tl.data ?? []);
      setLegality(l.data ?? []);
      setJobs(j.data ?? []);
      setContactInfo(ci.data ?? null);
      setSiteSettings(ss.data ?? null);
      setLoading(false);
    })();
  }, []);

  return {
    blogPosts, services, slides, stats, whys, clients,
    testimonials, directors, timeline, legality, jobs,
    contactInfo, siteSettings, loading,
  };
}
