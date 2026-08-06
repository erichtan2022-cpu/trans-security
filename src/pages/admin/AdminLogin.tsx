import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, Lock, Mail, CircleAlert as AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

const AdminLogin: React.FC = () => {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@trans-security.co.id');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-gold animate-pulse">Memuat...</div>
      </div>
    );
  }

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      setError('Email atau password salah. Silakan coba lagi.');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border border-gold/40 mb-4">
            <Shield className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white mb-1">Panel Admin</h1>
          <p className="text-white/60 text-sm">Masuk untuk mengelola konten website</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 text-sm rounded-lg px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-semibold text-white/80 mb-2">Username / Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:outline-none text-sm"
                placeholder="admin@trans-security.co.id"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-white/80 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-gold focus:outline-none text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors"
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3 rounded-lg uppercase tracking-wide text-sm transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {submitting ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-gold text-sm transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;


export default AdminLogin