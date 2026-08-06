import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { supabase } from '@/lib/supabase';
import type { NavItem } from '@/hooks/useSiteData';

const defaultNav: NavItem[] = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang-kami', label: 'Tentang' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/klien', label: 'Klien' },
  { to: '/blog', label: 'Blog' },
  { to: '/karir', label: 'Karir' },
  { to: '/kontak', label: 'Kontak' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavItem[]>(defaultNav);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('site_settings').select('nav_menu').eq('id', 1).maybeSingle();
      if (data?.nav_menu && Array.isArray(data.nav_menu) && data.nav_menu.length > 0) {
        setNavLinks(data.nav_menu);
      }
    })();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-lg shadow-lg py-2' : 'bg-navy/40 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo variant="light" size={scrolled ? 'sm' : 'md'} />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium uppercase tracking-wide transition-colors relative py-2
                  ${isActive ? 'text-gold' : 'text-white hover:text-gold'}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300
                  ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/kontak"
              className="bg-gold hover:bg-gold-dark text-navy font-bold px-5 py-2.5 rounded-md text-sm uppercase tracking-wide transition-all shadow-md hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Minta Penawaran
            </Link>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-white p-2"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <aside className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-navy shadow-2xl transition-transform duration-400 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <Logo variant="light" size="sm" />
            <button onClick={() => setOpen(false)} className="text-white p-2" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col p-5 gap-1">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={{ animationDelay: `${i * 60}ms` }}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-md font-medium animate-slide-in
                  ${isActive ? 'bg-gold/20 text-gold border-l-4 border-gold' : 'text-white hover:bg-white/5'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/kontak"
              className="mt-4 bg-gold text-navy font-bold py-3 rounded-md text-center uppercase tracking-wide"
            >
              Minta Penawaran
            </Link>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
