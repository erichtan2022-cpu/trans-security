export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: '10-tips-keamanan-kantor-modern',
    title: '10 Tips Keamanan Kantor Modern yang Wajib Diterapkan di 2026',
    excerpt: 'Panduan praktis untuk facility manager dalam mengamankan gedung perkantoran dari ancaman fisik dan digital di era hybrid working.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778497227861_ea1547bc.png',
    author: 'Iwan Setiawan',
    authorRole: 'Direktur Utama',
    date: '8 Mei 2026',
    readTime: '6 menit',
    category: 'Tips Keamanan',
    tags: ['Office Security', 'Tips', 'Best Practice'],
    content: [
      'Era hybrid working membawa kompleksitas baru dalam dunia keamanan perkantoran. Akses karyawan yang tidak menentu, kunjungan tamu yang lebih sering, hingga adopsi perangkat IoT memerlukan pendekatan keamanan yang lebih holistik.',
      '**1. Audit Akses Berkala** — Lakukan review pengguna access card minimal setiap kuartal. Banyak insiden bermula dari kartu mantan karyawan yang masih aktif.',
      '**2. Visitor Management System Digital** — Tinggalkan buku tamu kertas. Gunakan sistem digital dengan foto, ID, dan pre-registration untuk traceability penuh.',
      '**3. CCTV dengan AI Analytics** — Investasi pada kamera dengan kemampuan face recognition dan license plate recognition akan menghemat ratusan jam review rekaman.',
      '**4. SOP Emergency yang Diuji Berkala** — Drill kebakaran dan evakuasi minimal 2x setahun. SOP yang tidak pernah diuji = SOP yang tidak akan bekerja.',
      '**5. Training Awareness Karyawan** — Personel security saja tidak cukup. Setiap karyawan harus paham social engineering, tailgating, dan procedur emergency.',
      '**6. Integrasi Sistem** — Hubungkan CCTV, access control, alarm, dan fire system dalam satu command center. Single pane of glass = response yang lebih cepat.',
      '**7. Perimeter Defense in Depth** — Lapis pertahanan dari pagar luar hingga ruang server. Setiap lapis memberi waktu reaksi tambahan.',
      '**8. Background Check Vendor** — Cleaning service, delivery, dan kontraktor sering luput dari screening padahal mereka memiliki akses fisik luas.',
      '**9. Cybersecurity Awareness** — Keamanan fisik dan siber kini tidak bisa dipisahkan. Kamera IP yang tidak di-patch adalah pintu masuk hacker.',
      '**10. Pilih Partner Profesional** — Vendor keamanan harus berizin resmi, bersertifikat Gada Pratama/Madya/Utama, dan memiliki SLA respon yang terukur.',
      'Implementasi 10 tips ini akan meningkatkan postur keamanan kantor Anda secara signifikan. Trans Security siap membantu audit dan implementasi sesuai standar Mabes Polri.',
    ],
  },
  {
    slug: 'ai-cctv-mengubah-industri-keamanan',
    title: 'AI CCTV: Bagaimana Teknologi Mengubah Wajah Industri Keamanan',
    excerpt: 'Dari face recognition hingga behavior analytics — kamera modern kini bisa berpikir. Inilah dampaknya bagi bisnis Anda.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778497244470_12c154a1.jpg',
    author: 'Adi Pratama',
    authorRole: 'Direktur Operasional',
    date: '2 Mei 2026',
    readTime: '8 menit',
    category: 'Industry Insights',
    tags: ['AI', 'CCTV', 'Teknologi'],
    content: [
      'Dalam lima tahun terakhir, industri CCTV telah mengalami transformasi yang lebih besar dibanding 30 tahun sebelumnya. Penyebab utamanya: kecerdasan buatan.',
      '**Dari Reaktif ke Proaktif** — CCTV tradisional bersifat reaktif: kita baru melihat rekaman setelah ada insiden. CCTV berbasis AI mampu mendeteksi anomali dan memberikan peringatan real-time sebelum eskalasi terjadi.',
      '**Use Case Utama:** Face recognition untuk VIP & blacklist, License Plate Recognition (LPR) untuk parking management, People counting untuk retail analytics, Behavior analysis untuk loitering, fighting, dan fall detection.',
      '**ROI Nyata** — Salah satu klien retail kami melaporkan penurunan shoplifting 64% dalam 4 bulan setelah implementasi behavior analytics. Investasi terbayar dalam 11 bulan.',
      '**Privasi dan Regulasi** — Implementasi AI CCTV harus tunduk pada UU PDP. Trans Security membantu klien menyusun policy retention, masking, dan consent yang compliant.',
      '**Kesimpulan** — AI bukan pengganti personel security, tapi force multiplier yang memungkinkan tim kecil mengelola area besar dengan akurasi tinggi.',
    ],
  },
  {
    slug: 'keamanan-pabrik-kawasan-industri',
    title: 'Tantangan Keamanan Pabrik & Kawasan Industri di Indonesia',
    excerpt: 'Pabrik adalah target empuk pencurian aset, sabotase, dan unrest. Pelajari kerangka keamanan industrial yang teruji.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778497262464_f05da775.jpg',
    author: 'Yusuf Halim',
    authorRole: 'Direktur Keuangan',
    date: '24 April 2026',
    readTime: '7 menit',
    category: 'Industry Insights',
    tags: ['Industri', 'Pabrik', 'Risk Management'],
    content: [
      'Pabrik dengan area puluhan hektar, ribuan karyawan shift, dan aset bernilai miliaran rupiah memiliki profil risiko unik yang tidak bisa disamakan dengan office building.',
      '**Risiko Utama:** Pencurian raw material dan finished goods, sabotase peralatan produksi, gangguan dari demonstrasi atau labor unrest, kecelakaan kerja yang melibatkan keamanan.',
      '**Pendekatan Trans Security** — Kami menerapkan model 4-layer: Outer perimeter (pagar, patroli kendaraan), Middle perimeter (gate control, screening), Inner zone (CCTV, access card), Critical asset (biometric, vault).',
      '**Personel Khusus Industri** — Satpam pabrik kami dilatih khusus K3, penanganan B3, evakuasi massal, dan basic firefighting — kompetensi yang tidak dimiliki satpam office biasa.',
      '**K9 Unit untuk Sweeping** — Untuk pabrik yang produksi obat-obatan, elektronik bernilai tinggi, atau di area rawan, unit K9 kami melakukan sweeping rutin sebelum shift change.',
      'Konsultasikan kebutuhan keamanan kawasan industri Anda dengan tim kami untuk mendapatkan risk assessment gratis.',
    ],
  },
  {
    slug: 'sertifikasi-gada-pratama-madya-utama',
    title: 'Mengenal Sertifikasi Gada: Pratama, Madya, dan Utama',
    excerpt: 'Apa bedanya satpam bersertifikat dan tidak? Inilah penjelasan lengkap sistem sertifikasi keamanan resmi Polri.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778497289220_cdea6e32.png',
    author: 'Iwan Setiawan',
    authorRole: 'Direktur Utama',
    date: '18 April 2026',
    readTime: '5 menit',
    category: 'Edukasi',
    tags: ['Sertifikasi', 'Polri', 'Training'],
    content: [
      'Tidak semua satpam diciptakan sama. Di Indonesia, kompetensi tenaga security distandarisasi melalui sertifikasi Gada yang dikeluarkan oleh Mabes Polri.',
      '**Gada Pratama (232 jam)** — Pelatihan dasar bagi anggota security. Mencakup tugas pokok satpam, hukum, pengetahuan kepolisian terbatas, beladiri, P3K, dan penggunaan alat keamanan.',
      '**Gada Madya (160 jam)** — Pelatihan lanjutan untuk Danru/Chief Security. Materi termasuk manajemen, supervisi, pelaporan, investigasi awal, dan koordinasi dengan aparat.',
      '**Gada Utama (100 jam)** — Pelatihan tertinggi untuk Manager Security/Security Officer korporat. Materi strategis: risk management, BCP, security audit, dan vendor management.',
      '**Mengapa Penting?** — Personel bersertifikat memiliki dasar hukum, prosedur, dan teknis yang terstandar. Bagi perusahaan, ini juga compliance terhadap regulasi BUJP.',
      'Seluruh personel Trans Security minimum bersertifikat Gada Pratama, dengan supervisor Gada Madya, dan manager bersertifikat Gada Utama.',
    ],
  },
  {
    slug: 'access-control-biometrik-vs-kartu',
    title: 'Access Control: Biometrik vs Kartu, Mana yang Tepat untuk Bisnis Anda?',
    excerpt: 'Perbandingan komprehensif teknologi access control modern beserta rekomendasi penggunaan per industri.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778497307544_b5f0e338.jpg',
    author: 'Adi Pratama',
    authorRole: 'Direktur Operasional',
    date: '10 April 2026',
    readTime: '6 menit',
    category: 'Teknologi',
    tags: ['Access Control', 'Biometrik', 'Teknologi'],
    content: [
      'Memilih teknologi access control yang tepat adalah investasi jangka panjang. Pilihan yang salah bisa membuat sistem ditinggal pengguna atau justru menjadi celah keamanan.',
      '**Kartu RFID/Mifare** — Murah, mudah diganti, support large user base. Kelemahan: bisa dipinjam, hilang, dan dikloning jika tidak encrypted.',
      '**Fingerprint** — Unik per individu, tidak bisa dipinjam. Kelemahan: tidak akurat untuk pekerja manual (tangan kotor/lecet) dan ada concern higienis pasca-pandemi.',
      '**Face Recognition** — Touchless, cepat, dan modern. Kelemahan: butuh pencahayaan baik dan ada concern privasi yang harus di-manage.',
      '**Iris/Retina Scan** — Akurasi tertinggi, sangat aman. Kelemahan: mahal, lambat, dan terkesan intimidatif. Cocok hanya untuk area critical seperti data center atau vault.',
      '**Mobile Credential (QR/BLE)** — Trend terbaru. Pengguna gunakan smartphone sebagai kunci. Mudah di-revoke remotely.',
      '**Rekomendasi:** Office umum → Kartu encrypted + Face. Pabrik → Kartu + Fingerprint. Bank vault → Multi-factor (Kartu + Biometrik + PIN).',
    ],
  },
  {
    slug: 'trans-security-luncurkan-command-center-ai',
    title: 'Trans Security Luncurkan Command Center AI Generasi Baru',
    excerpt: 'Investasi senilai miliaran rupiah pada teknologi monitoring real-time terintegrasi melayani 100+ klien korporat 24/7.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a01b32adf2cf6860d4ff564_1778497339196_06f1c6cb.jpg',
    author: 'Iwan Setiawan',
    authorRole: 'Direktur Utama',
    date: '1 April 2026',
    readTime: '4 menit',
    category: 'Company News',
    tags: ['News', 'Command Center', 'Inovasi'],
    content: [
      'Trans Security Indonesia dengan bangga mengumumkan peluncuran Command Center generasi baru yang dilengkapi teknologi AI dan integrasi multi-platform.',
      '**Kapasitas Baru** — Fasilitas seluas 350m² mampu monitoring simultan lebih dari 5.000 kamera CCTV dari 100+ lokasi klien di seluruh Indonesia.',
      '**Teknologi Inti** — Video Management System dengan AI Analytics, GPS tracking real-time untuk patroli mobile, Two-way radio integration, dan dashboard analytics untuk klien.',
      '**Operasional 24/7** — Command center beroperasi dengan 4 shift rotasi, dipimpin Supervisor bersertifikat Gada Utama dengan minimum 10 tahun pengalaman.',
      '**SLA Response** — Komitmen respons emergency < 30 menit untuk klien Jabodetabek, dengan eskalasi otomatis ke Polri, Damkar, dan PMI sesuai jenis insiden.',
      '**Kunjungan Klien** — Klien aktif dapat melakukan visit ke command center dengan appointment untuk melihat langsung bagaimana aset mereka dimonitor. Hubungi account manager Anda.',
    ],
  },
];
