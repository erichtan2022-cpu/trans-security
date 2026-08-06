import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Check } from 'lucide-react';
import { uploadImage } from '@/lib/upload';

interface ImageInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ value, onChange, label = 'Gambar' }) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) onChange(url);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">{label}</label>

      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            mode === 'upload' ? 'bg-navy text-gold' : 'bg-grey text-navy hover:bg-navy/10'
          }`}
        >
          <Upload className="w-3.5 h-3.5" /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            mode === 'url' ? 'bg-navy text-gold' : 'bg-grey text-navy hover:bg-navy/10'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" /> Masukkan URL
        </button>
      </div>

      {mode === 'upload' ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-navy/20 rounded-lg p-6 cursor-pointer hover:border-gold transition-colors">
          {uploading ? (
            <span className="text-sm text-navy/60">Mengunggah...</span>
          ) : (
            <>
              <Upload className="w-8 h-8 text-navy/30 mb-2" />
              <span className="text-sm text-navy/60">Klik untuk memilih file gambar</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-3 py-2 rounded-md border border-navy/10 focus:border-gold focus:outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => { if (urlInput) onChange(urlInput); }}
            className="bg-navy text-gold px-3 py-2 rounded-md text-sm font-semibold hover:bg-navy-900 transition-colors flex items-center gap-1"
          >
            <Check className="w-4 h-4" /> Set
          </button>
        </div>
      )}

      {value && (
        <div className="mt-3 flex items-center gap-3">
          <img src={value} alt="Preview" className="w-20 h-20 rounded-lg object-cover border border-navy/10" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            Hapus gambar
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
