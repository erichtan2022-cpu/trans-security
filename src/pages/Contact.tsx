import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Check, Send } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { supabase } from '@/lib/supabase';
import type { ContactInfo } from '@/hooks/useSiteData';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [contact, setContact] = useState<ContactInfo | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('contact_info').select('*').eq('id', 1).maybeSingle();
      if (data) setContact(data);
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await fetch('https://famous.ai/api/crm/6a01b32adf2cf6860d4ff564/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          source: 'contact-form',
          tags: ['contact', 'inquiry'],
        })
      });
      setStatus('sent');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('idle');
    }
  };

  const infoCards = [
    { icon: MapPin, title: 'Alamat', desc: contact?.address ?? 'Jl. Raya Serpong KM 7, Tangerang Selatan, Banten 15310' },
    { icon: Phone, title: 'Telepon', desc: contact?.phone ?? '021-XXXXXXX (24 Jam)' },
    { icon: Mail, title: 'Email', desc: contact?.email ?? 'info@trans-security.co.id' },
    { icon: Clock, title: 'Operasional', desc: contact?.hours ?? '24 Jam Command Center' },
  ];

  return (
    <PageLayout>
      <PageHero
        title="Hubungi Kami"
        subtitle="Konsultasikan kebutuhan keamanan Anda dengan tim ahli kami. Respons dalam 1×24 jam."
        breadcrumb={[{ label: 'Kontak' }]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="service-card bg-grey p-6 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-gold/15 text-gold flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-navy mb-1">{c.title}</h3>
                <p className="text-sm text-navy/70 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-gold">Kirim Pesan</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-navy mt-3 mb-4">
              Mari Diskusikan Kebutuhan Anda
            </h2>
            <div className="w-16 h-1 bg-gold mb-5"></div>
            <p className="text-navy/70 mb-6">Isi formulir di bawah ini dan tim konsultan kami akan menghubungi Anda untuk diskusi awal yang sepenuhnya gratis.</p>
            <form onSubmit={submit} className="space-y-4 bg-white p-7 rounded-xl shadow-md border-t-4 border-gold">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Nama Lengkap" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none text-sm" />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none text-sm" />
                <input required placeholder="No. Telepon" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none text-sm" />
                <input placeholder="Subjek" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              </div>
              <textarea required rows={5} placeholder="Pesan Anda..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-md border border-navy/10 focus:border-gold focus:outline-none text-sm" />
              <button type="submit" disabled={status === 'sending'} className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3.5 rounded-md uppercase tracking-wide text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {status === 'sending' ? 'Mengirim...' : status === 'sent' ? <><Check className="w-4 h-4" /> Pesan Terkirim</> : <><Send className="w-4 h-4" /> Kirim Pesan</>}
              </button>
            </form>
          </div>
          <div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold text-gold">Lokasi Kami</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-navy mt-3 mb-4">Kantor Pusat</h2>
            <div className="w-16 h-1 bg-gold mb-5"></div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-md border-4 border-white">
              <iframe
                src={contact?.map_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6!2d106.6755!3d-6.3175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTknMDMuMCJTIDEwNsKwNDAnMzEuOCJF!5e0!3m2!1sen!2sid!4v1700000000000"}
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Trans Security Office Location"
              />
            </div>
            <div className="bg-navy text-white p-6 rounded-xl mt-5">
              <h4 className="font-heading font-bold mb-2 text-gold uppercase tracking-wider text-sm">Emergency Hotline</h4>
              <p className="text-2xl font-heading font-extrabold">{contact?.hotline ?? '021-XXXXXXX'}</p>
              <p className="text-white/70 text-sm mt-1">Tersedia 24 jam untuk klien aktif kami</p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
