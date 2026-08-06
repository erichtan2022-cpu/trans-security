import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import Logo from './Logo';
import { supabase } from '@/lib/supabase';
import type { ContactInfo, NavItem, SiteSettings } from '@/hooks/useSiteData';

const defaultNav: NavItem[] = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang-kami', label: 'Tentang Kami' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/klien', label: 'Klien & Testimoni' },
  { to: '/blog', label: 'Blog & News' },
  { to: '/karir', label: 'Karir' },
  { to: '/kontak', label: 'Kontak' },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [navLinks, setNavLinks] = useState<NavItem[]>(defaultNav);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    (async () => {
      const [ci, ss] = await Promise.all([
        supabase.from('contact_info').select('*').eq('id', 1).maybeSingle(),
        supabase.from('site_settings').select('nav_menu, logo_footer_url, brand_name, company_name').eq('id', 1).maybeSingle(),
      ]);
      if (ci.data) setContact(ci.data);
      if (ss.data) {
        setSettings(ss.data as SiteSettings);
        if (ss.data.nav_menu && Array.isArray(ss.data.nav_menu) && ss.data.nav_menu.length > 0) {
          setNavLinks(ss.data.nav_menu);
        }
        if (ss.data.logo_footer_url) setLogoUrl(ss.data.logo_footer_url);
      }
    })();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch('https://famous.ai/api/crm/6a01b32adf2cf6860d4ff564/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer-signup', tags: ['newsletter', 'trans-security'] })
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            {logoUrl ? (
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img src={logoUrl} alt="Logo" className="h-11 w-11 object-contain" />
                <span className="font-heading font-extrabold text-xl text-gold">{settings?.brand_name || 'TRANS SECURITY'}</span>
              </Link>
            ) : (
              <Logo variant="light" />
            )}
            <p className="mt-5 text-white/70 text-sm leading-relaxed">
              {settings?.company_name || 'Trans Security Indonesia'} — penyedia jasa keamanan profesional berizin resmi Mabes Polri. Melindungi aset, manusia, dan reputasi sejak 2013.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-gold uppercase tracking-wider text-sm mb-5">Link Cepat</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/70 hover:text-gold transition-colors inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-gold uppercase tracking-wider text-sm mb-5">Layanan Kami</h4>
            <ul className="space-y-3 text-sm">
              {[
                'Security Services',
                'Security Consultant',
                'Security Training',
                'K9 Unit',
                'Electronic Security',
                'Guard Tour System',
              ].map(s => (
                <li key={s}>
                  <Link to="/layanan" className="text-white/70 hover:text-gold transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-gold uppercase tracking-wider text-sm mb-5">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3"><MapPin className="w-5 h-5 text-gold flex-shrink-0" />{contact?.address ?? 'Jl. Raya Serpong KM 7, Tangerang Selatan, Banten 15310'}</li>
              <li className="flex gap-3"><Phone className="w-5 h-5 text-gold flex-shrink-0" />{contact?.phone ?? '021-XXXXXXX (24 Jam)'}</li>
              <li className="flex gap-3"><Mail className="w-5 h-5 text-gold flex-shrink-0" />{contact?.email ?? 'info@trans-security.co.id'}</li>
            </ul>
            <form onSubmit={handleSubscribe} className="mt-5">
              <label className="text-xs uppercase tracking-wider text-gold">Newsletter</label>
              <div className="flex mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Anda"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-md px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                />
                <button type="submit" disabled={status === 'loading'} className="bg-gold hover:bg-gold-dark text-navy px-4 rounded-r-md transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {status === 'success' && <p className="text-green-400 text-xs mt-2">Terima kasih! Anda terdaftar.</p>}
              {status === 'error' && <p className="text-red-400 text-xs mt-2">Gagal mendaftar. Coba lagi.</p>}
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© 2026 {settings?.company_name || 'Trans Security Indonesia'}. All Rights Reserved.</p>
          <p>Berizin Resmi Mabes Polri | SIA | ABUJAPI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
