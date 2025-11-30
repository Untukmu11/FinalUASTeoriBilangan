"use client";

import { useState, useEffect } from 'react';

// --- MATHJAX CONFIGURATION (Untuk Rumus Matematika) ---
const MathJaxConfig = () => {
  useEffect(() => {
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
      },
      svg: { fontCache: 'global' },
      startup: { typeset: false }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.onload = () => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
      }
    };
    document.head.appendChild(script);
  }, []);
  return null;
};

// --- ICON COMPONENTS ---
const BookOpen = () => (
  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ExternalLink = ({ className }) => (
  <svg className={className || "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GraduationCap = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const ArrowLeft = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// --- COMPONENT: INTERACTIVE CIPHER DEMO (CAESAR) ---
const CaesarDemo = () => {
  const [input, setInput] = useState('MATEMATIKA');
  const [shift, setShift] = useState(3);

  const encrypt = (text, s) => {
    return text.toUpperCase().replace(/[A-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      return String.fromCharCode(((code - 65 + s) % 26) + 65);
    });
  };

  return (
    <div className="bg-slate-700/50 p-6 rounded-xl border border-blue-500/30 my-4">
      <h5 className="text-white font-bold mb-3">Simulasi Interaktif: Caesar Cipher</h5>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-blue-200 text-sm">Plaintext:</label>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="text-blue-200 text-sm">Shift (k): {shift}</label>
          <input 
            type="range" min="1" max="25" 
            value={shift} 
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="p-3 bg-slate-900 rounded border border-green-500/30">
          <label className="text-green-400 text-xs uppercase tracking-wider">Ciphertext Result:</label>
          <p className="text-xl font-mono text-green-300 font-bold tracking-widest break-all">
            {encrypt(input, shift)}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: INTERACTIVE CIPHER DEMO (AFFINE) ---
const AffineDemo = () => {
  const [input, setInput] = useState('TEORI');
  const [a, setA] = useState(5); // a must be coprime to 26
  const [b, setB] = useState(8);

  // Coprime check helper
  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  const isValidA = gcd(a, 26) === 1;

  const encrypt = (text, a_val, b_val) => {
    if (!isValidA) return "Error: a harus relatif prima dengan 26";
    return text.toUpperCase().replace(/[A-Z]/g, (char) => {
      const p = char.charCodeAt(0) - 65;
      const c = (a_val * p + b_val) % 26;
      return String.fromCharCode(c + 65);
    });
  };

  return (
    <div className="bg-slate-700/50 p-6 rounded-xl border border-purple-500/30 my-4">
      <h5 className="text-white font-bold mb-3">Simulasi Interaktif: Affine Cipher</h5>
      <div className="text-xs text-purple-200 mb-2 font-mono">Rumus: C = (aP + b) mod 26</div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-purple-200 text-sm">Plaintext:</label>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 focus:border-purple-500 outline-none"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-purple-200 text-sm">Slope (a) - ganjil bukan 13:</label>
            <select 
              value={a} onChange={(e) => setA(parseInt(e.target.value))}
              className="w-full bg-slate-800 text-white px-3 py-2 rounded border border-slate-600"
            >
              {[1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="text-purple-200 text-sm">Intercept (b):</label>
            <input 
              type="number" value={b} onChange={(e) => setB(parseInt(e.target.value))}
              className="w-full bg-slate-800 text-white px-3 py-2 rounded border border-slate-600"
            />
          </div>
        </div>
        <div className="p-3 bg-slate-900 rounded border border-purple-500/30">
          <label className="text-purple-400 text-xs uppercase tracking-wider">Ciphertext Result:</label>
          <p className="text-xl font-mono text-purple-300 font-bold tracking-widest break-all">
            {encrypt(input, a, b)}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT (EXPORT DEFAULT HARUS ADA DI SINI) ---
export default function Page() {
  const [activeGroup, setActiveGroup] = useState(null);

  // Trigger MathJax re-render when view changes
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [activeGroup]);

  // Data Groups
  const groups = [
    {
      id: 1,
      name: "Kelompok 1",
      topic: "Penjelasan Teoretis",
      description: "Mendalami konsep dasar Aritmatika Modular dan Teori Kongruensi yang menjadi jantung keamanan data dan pondasi algoritma kriptografi klasik.",
      color: "from-blue-500 via-blue-600 to-indigo-600",
      link: "https://ua-skesya.vercel.app/",
      icon: "https://drive.google.com/file/d/1Ym7QdSrZKCCCePbDwMiecYifcs6MAXOI/view?usp=drivesdk"
    },
    {
      id: 2,
      name: "Kelompok 2",
      topic: "Implementasi Caesar Cipher",
      description: "Eksplorasi teknik enkripsi legendaris dengan pergeseran huruf. Membedah logika substitusi sederhana yang digunakan sejak zaman Romawi.",
      color: "from-purple-500 via-purple-600 to-pink-600",
      link: "https://kelompokvalensepti.vercel.app/",
      icon: "🔢"
    },
    {
      id: 3,
      name: "Kelompok 3",
      topic: "Implementasi Affine Cipher",
      description: "Tingkatan lanjut kriptografi klasik menggunakan fungsi linear (ax + b). Mempelajari pentingnya konsep 'invers modulo' dalam dekripsi pesan.",
      color: "from-green-500 via-emerald-600 to-teal-600",
      link: "https://docs.google.com/document/d/1tX1ACymeleEA4dmWzcirH6du9o7ZxOOJ/edit?usp=sharing&ouid=109711859806703115147&rtpof=true&sd=true",
      icon: "⚙"
    },
    {
      id: 4,
      name: "Kelompok 4",
      topic: "Analisis Kelebihan",
      description: "Mengapa algoritma klasik tetap relevan? Menganalisis kecepatan komputasi, kemudahan implementasi, dan perannya sebagai alat edukasi.",
      color: "from-orange-500 via-amber-600 to-yellow-600",
      link: "#",
      icon: "φ"
    },
    {
      id: 5,
      name: "Kelompok 5",
      topic: "Analisis Kelemahan",
      description: "Membongkar celah keamanan fatal pada cipher klasik. Simulasi serangan Brute Force dan Analisis Frekuensi untuk memecahkan kode.",
      color: "from-rose-500 via-pink-600 to-fuchsia-600",
      link: "https://kelompoksaya.vercel.app/",
      icon: "∞"
    },
    {
      id: 6,
      name: "Kelompok 6",
      topic: "Penerapan Pendidikan",
      description: "Mengubah teori bilangan yang abstrak menjadi permainan logika yang seru. Strategi mengajarkan matematika melalui pemecahan kode rahasia.",
      color: "from-red-500 via-rose-600 to-pink-600",
      // Pastikan file ini ada di folder public
      link: "/materi-kelompok6.pdf.pdf", 
      icon: "🔐"
    }
  ];

  // --- CONTENT VIEW ---
  const renderContent = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setActiveGroup(null)}
        className="mb-6 flex items-center gap-2 text-blue-300 hover:text-white transition-colors group"
      >
        <div className="bg-slate-800 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
          <ArrowLeft />
        </div>
        <span className="font-semibold">Kembali ke Portofolio</span>
      </button>

      <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-500/20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Kriptografi & Aplikasi Teori Bilangan
        </h1>
        <p className="text-xl text-blue-200 mb-10 border-b border-slate-700 pb-8">
          Materi Lengkap: Penerapan Konsep Modular dalam Keamanan Pesan
        </p>

        {/* 1. PENJELASAN TEORETIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <h2 className="text-3xl font-bold text-white">Penjelasan teoretis</h2>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300">
            <p className="leading-relaxed mt-4">
              Kriptografi klasik sangat bergantung pada konsep <strong>Aritmatika Modular</strong> (Teori Kongruensi). 
              Dalam teori bilangan, dua bilangan bulat $a$ dan $b$ dikatakan kongruen modulo $n$ jika mereka memiliki sisa yang sama saat dibagi $n$, 
              ditulis sebagai:
            </p>
            <div className="bg-slate-900 p-4 rounded-lg border-l-4 border-blue-500 my-4 text-center">
              {'$$ a \\equiv b \\pmod{n} $$'}
            </div>
            <p>
              {/* PERBAIKAN Z IS NOT DEFINED */}
              Dalam konteks alfabet, kita memetakan huruf A-Z ke angka 0-25. Dengan demikian, operasi pergeseran huruf hanyalah operasi penjumlahan 
              atau perkalian dalam himpunan bilangan bulat modulo 26 {'($\\mathbb{Z}_{26}$)'}. Keamanan algoritma ini bergantung pada kesulitan membalikkan operasi tersebut tanpa mengetahui "kunci" rahasia.
            </p>
          </div>
        </section>

        {/* 2. IMPLEMENTASI ALGORITMA CHIPER 1 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <h2 className="text-3xl font-bold text-white">Implementasi Algoritma Chiper 1</h2>
          </div>
          <div className="text-slate-300">
            <p className="mb-4 mt-4">
              Algoritma pertama adalah <strong>Caesar Cipher</strong>. Ini adalah teknik substitusi paling sederhana dimana setiap huruf digeser sebanyak $k$ langkah. 
              Secara matematis, proses enkripsi ($E$) dan dekripsi ($D$) dirumuskan sebagai:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
              <li><strong>Enkripsi:</strong> {'$ C \\equiv (P + k) \\pmod{26} $'}</li>
              <li><strong>Dekripsi:</strong> {'$ P \\equiv (C - k) \\pmod{26} $'}</li>
            </ul>
            <CaesarDemo />
          </div>
        </section>

        {/* 3. IMPLEMENTASI ALGORITMA CHIPER 2 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <h2 className="text-3xl font-bold text-white">Implementasi Algoritma Chiper 2</h2>
          </div>
          <div className="text-slate-300">
            <p className="mb-4 mt-4">
              Algoritma kedua adalah <strong>Affine Cipher</strong>, pengembangan dari Caesar yang menggunakan fungsi linear. Ini melibatkan perkalian dan penjumlahan modulo.
              Syarat utamanya adalah kunci $a$ harus relatif prima dengan 26 ($\gcd(a, 26) = 1$) agar memiliki invers, sehingga pesan bisa didekripsi.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 ml-4">
              <li><strong>Enkripsi:</strong> {'$ C \\equiv (aP + b) \\pmod{26} $'}</li>
              <li><strong>Dekripsi:</strong> {'$ P \\equiv a^{-1}(C - b) \\pmod{26} $'}</li>
            </ul>
            <AffineDemo />
          </div>
        </section>

        {/* 4 & 5. ANALISIS KELEBIHAN & KELEMAHAN */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 4. Analisis kelebihan */}
          <div className="bg-slate-700/30 p-8 rounded-2xl border border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">4</div>
              <h2 className="text-2xl font-bold text-white">Analisis kelebihan</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                Kesederhanaan implementasi: Sangat mudah diprogram dan dihitung secara manual untuk tujuan edukasi.
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                Kecepatan: Operasi aritmatika dasar (tambah/kali) sangat cepat dikomputasi komputer.
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">✓</span>
                Pondasi Kriptografi Modern: Memperkenalkan konsep kunci simetris dan transformasi domain.
              </li>
            </ul>
          </div>

          {/* 5. Analisis kelemahan */}
          <div className="bg-slate-700/30 p-8 rounded-2xl border border-red-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">5</div>
              <h2 className="text-2xl font-bold text-white">Analisis kelemahan</h2>
            </div>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-2">
                <span className="text-red-400">⚠</span>
                Rentang Kunci Kecil: Caesar hanya punya 25 kunci, Affine hanya punya 312 kunci. Sangat mudah diserang dengan Brute Force.
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">⚠</span>
                Analisis Frekuensi: Struktur bahasa (huruf 'A', 'E' sering muncul) tidak disembunyikan, sehingga pola plaintext mudah ditebak.
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">⚠</span>
                Linearitas: Hubungan antara plaintext dan ciphertext bersifat linear, mudah dipecahkan secara aljabar.
              </li>
            </ul>
          </div>
        </div>

        {/* 6. PENERAPAN DALAM DUNIA PENDIDIKAN MATEMATIKA */}
        <section className="bg-gradient-to-br from-indigo-900 to-blue-900 p-8 rounded-2xl border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">6</div>
            <h2 className="text-3xl font-bold text-white">Penerapan dalam dunia Pendidikan Matematika</h2>
          </div>
          <div className="text-blue-100 space-y-4 text-lg">
            <p>
              Penggunaan Chiper klasik adalah alat pedagogis yang sangat efektif untuk mengajarkan <strong>Teori Bilangan</strong> secara kontekstual.
            </p>

            {/* TOMBOL DOWNLOAD DENGAN PERBAIKAN NULL CHECK (?.) */}
            <div className="my-6">
              <a 
                href={activeGroup?.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download Materi Lengkap (PDF)
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Latihan Operasi Modulo</h4>
                <p className="text-sm">Siswa belajar sisa pembagian bukan dengan angka abstrak, tapi dengan memecahkan kode rahasia.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Konsep Invers</h4>
                <p className="text-sm">Affine cipher memaksa siswa memahami invers modular (misal: mengapa kita butuh gcd(a,26)=1?).</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">Pemecahan Masalah</h4>
                <p className="text-sm">Cryptoanalysis (memecahkan kode) melatih logika deduktif dan pengenalan pola.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <MathJaxConfig />
       
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-blue-800/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="text-blue-400">
              <GraduationCap />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Portofolio Pembelajaran</h1>
              <p className="text-blue-300 text-base mt-1">Mata Kuliah: Teori Bilangan</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {activeGroup ? (
          renderContent()
        ) : (
          /* --- PORTFOLIO GRID VIEW --- */
          <>
            <section className="mb-16 animate-in fade-in duration-700">
              <div className="max-w-6xl mx-auto">
                <div className="bg-slate-800/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-blue-700/30 shadow-2xl relative">
                  
                  {/* BAGIAN ATAS: GAMBAR FULL WIDTH */}
                  <div className="relative w-full h-[400px] md:h-[500px]">
                     {/* Pastikan file foto-bersama.jpg ada di folder public */}
                     <img 
                       src="/foto-bersama.jpg"
                       alt="Foto Bersama Angkatan Teori Bilangan"
                       className="w-full h-full object-cover object-center"
                     />
                     {/* Gradient halus di bawah gambar agar menyatu */}
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>

                  {/* BAGIAN BAWAH: TULISAN (TERPISAH DARI GAMBAR) */}
                  <div className="p-8 md:p-12 text-center bg-slate-900/50">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                      Selamat Datang di Pembelajaran <br/>
                      <span className="text-blue-400">Teori Bilangan</span>
                    </h2>
                    <p className="text-blue-100 text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
                      Eksplorasi keindahan matematika melalui kriptografi dan aplikasinya dalam keamanan digital.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-4 mb-10 justify-center md:justify-start">
                <div className="text-blue-400">
                  <BookOpen />
                </div>
                <h2 className="text-4xl font-bold text-white">Materi Pembelajaran per Kelompok</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    onClick={() => {
                      if (group.id === 6) {
                        setActiveGroup(group);
                      } else {
                        if (group.link !== "#") window.open(group.link, '_blank');
                        else alert("Materi untuk kelompok ini belum tersedia dalam demo ini. Silakan buka Kelompok 6.");
                      }
                    }}
                    className="cursor-pointer block group h-full"
                  >
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${group.color} p-8 h-full shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between`}>
                      {/* Icon Background */}
                      <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                        {group.icon.startsWith('http') ? (
                           <img src={group.icon} alt="" className="w-16 h-16 object-contain grayscale opacity-50"/>
                        ) : (
                           <span>{group.icon}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                            {group.name}
                          </span>
                          <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink className="w-5 h-5" />
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                          {group.topic}
                        </h3>
                        
                        <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">
                          {group.description}
                        </p>
                      </div>

                      {/* Footer Card */}
                      <div className="mt-auto pt-4 border-t border-white/20 flex items-center gap-2 text-white font-semibold text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                         <span>Pelajari Materi</span>
                         <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
        
        <footer className="mt-24 text-center text-blue-300/50 text-sm py-8 border-t border-blue-900/50">
          <p>© 2024 Portofolio Pembelajaran Teori Bilangan. Created with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}