import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [brandName, setBrandName] = useState<string>('TRANS SECURITY');
  const [companyName, setCompanyName] = useState<string>('Trans Security Indonesia');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('site_settings').select('logo_header_url, brand_name, company_name').eq('id', 1).maybeSingle();
      if (data) {
        if (data.logo_header_url) setLogoUrl(data.logo_header_url);
        if (data.brand_name) setBrandName(data.brand_name);
        if (data.company_name) setCompanyName(data.company_name);
      }
    })();
  }, []);

  const textColor = variant === 'light' ? 'text-white' : 'text-navy';
  const sizeClass = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14' : 'h-11 w-11';
  const titleSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';

  if (logoUrl) {
    return (
      <Link to="/" className="flex items-center gap-3 group">
        <img src={logoUrl} alt={brandName} className={`${sizeClass} object-contain`} />
        <span className={`font-heading font-extrabold ${titleSize} text-gold tracking-tight`}>{brandName}</span>
      </Link>
    );
  }

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className={`${sizeClass} relative flex-shrink-0`}>
        <svg viewBox="0 0 64 64" className="w-full h-full transition-transform duration-300 group-hover:scale-110">
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#9A7B14" />
            </linearGradient>
          </defs>
          <path d="M32 4 L56 14 L56 32 C56 46 45 56 32 60 C19 56 8 46 8 32 L8 14 Z"
            fill="#0A2342" stroke="url(#shieldGrad)" strokeWidth="2.5" />
          <path d="M32 14 L46 20 L46 32 C46 41 39 48 32 50 C25 48 18 41 18 32 L18 20 Z"
            fill="none" stroke="#C9A227" strokeWidth="1.5" opacity="0.6" />
          <text x="32" y="38" textAnchor="middle" fontFamily="Montserrat, sans-serif"
            fontWeight="900" fontSize="20" fill="#C9A227">TS</text>
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`font-heading font-extrabold ${titleSize} text-gold tracking-tight`}>
          {brandName}
        </span>
        <span className={`text-[10px] uppercase tracking-[0.2em] ${variant === 'light' ? 'text-white/70' : 'text-navy/60'} hidden sm:block`}>
          {companyName}
        </span>
      </div>
    </Link>
  );
};

export default Logo;
