"use client";

import React, { useState } from 'react';
import { 
  BookOpen, Calculator, TrendingUp, Info, ChevronRight, CheckCircle, 
  ArrowRight, Star, GraduationCap, Map, Target, Brain, Lightbulb 
} from 'lucide-react';

// === DATA MATERI NARATIF ===
const lessonData = {
  7: {
    title: "Persamaan & Pertidaksamaan Linear Satu Variabel (PLSV)",
    subtitle: "Dasar dari Semua Aljabar",
    pengertian: `
      Bayangkan sebuah timbangan pasar tradisional. Matematika di kelas 7 mengajarkan kita tentang "Keseimbangan". 
      Persamaan Linear Satu Variabel (PLSV) adalah kalimat matematika yang memiliki satu jenis huruf (variabel) dan tanda "sama dengan" (=).
      Intinya sederhana: Ruas Kiri harus seberat Ruas Kanan.
      
      Sedangkan Pertidaksamaan (PtLSV) bukan tentang keseimbangan, melainkan tentang "Syarat". 
      Misalnya, ada tanda < (kurang dari) atau > (lebih dari). Ini bukan mencari satu angka pasti, tapi mencari batasan.
    `,
    fungsi: `
      Fungsi utamanya adalah untuk mencari nilai misterius yang belum diketahui dari sebuah kondisi yang sederhana. 
      Ini melatih logika dasar kita: "Jika saya tahu hasil akhirnya, bagaimana cara saya tahu kondisi awalnya?"
    `,
    contohNyata: `
      1. Uang Saku: "Uangku dikurangi 5 ribu untuk jajan, sisanya tinggal 10 ribu. Berapa uang awalku?" (Persamaan: x - 5.000 = 10.000).
      2. Syarat Wahana: "Tinggi badan minimal untuk naik Roller Coaster adalah 150 cm." (Pertidaksamaan: t ≥ 150).
    `,
    metode: [
      { name: "Metode Timbangan (Pindah Ruas)", desc: "Kumpulkan huruf di kiri, angka di kanan. Ingat! Kalau pindah tempat melewati tanda '=', tandanya berubah (positif jadi negatif, kali jadi bagi)." },
      { name: "Substitusi", desc: "Mengganti huruf dengan angka tebakan untuk mengecek kebenaran." }
    ]
  },
  8: {
    title: "Sistem Persamaan Linear Dua Variabel (SPLDV)",
    subtitle: "Menjadi Detektif Dua Petunjuk",
    pengertian: `
      Di kehidupan nyata, masalah jarang sekali berdiri sendiri. Biasanya ada dua hal yang saling berkaitan.
      SPLDV adalah sistem yang terdiri dari dua persamaan linear dengan dua variabel (biasanya x dan y).
      
      Mengapa disebut "Sistem"? Karena kedua persamaan ini harus diselesaikan secara BERSAMAAN. 
      Satu jawaban harus cocok untuk kedua cerita tersebut. Jika hanya cocok di satu cerita, berarti itu bukan jawabannya.
    `,
    fungsi: `
      Digunakan untuk menentukan harga satuan, tarif dasar, atau titik temu dari dua kejadian berbeda. 
      Ini adalah alat utama dalam membandingkan dua paket penawaran.
    `,
    contohNyata: `
      Kasus Toko Buku:
      - Andi beli 2 Buku dan 1 Pensil harganya Rp 15.000.
      - Budi beli 1 Buku dan 1 Pensil harganya Rp 10.000.
      
      Tanpa label harga, kita bisa tahu harga asli Buku dan Pensil dengan membandingkan belanjaan Andi dan Budi.
    `,
    metode: [
      { name: "Eliminasi (Menghilangkan)", desc: "Menghilangkan salah satu variabel agar variabel lain ketemu. Caranya dengan mengurangi atau menjumlahkan kedua persamaan." },
      { name: "Substitusi (Mengganti)", desc: "Mengambil satu variabel dari persamaan pertama, lalu memasukkannya ke persamaan kedua." },
      { name: "Grafik", desc: "Menggambar dua garis. Titik potong (tabrakan) kedua garis itulah jawabannya." }
    ]
  },
  9: {
    title: "Pertidaksamaan Linear Dua Variabel",
    subtitle: "Menjelajahi Wilayah Arsiran",
    pengertian: `
      Jika persamaan adalah "Garis", maka pertidaksamaan adalah "Wilayah".
      Di kelas 9, kita belajar bahwa jawaban tidak selalu berupa satu titik pas. Terkadang, jawabannya adalah sebuah area yang luas.
      
      Bentuk seperti ax + by ≤ c membagi bidang kartesius menjadi dua dunia: "Dunia yang memenuhi syarat" (Arsiran) dan "Dunia yang melanggar syarat".
    `,
    fungsi: `
      Fungsinya untuk memvisualisasikan batasan sumber daya atau anggaran. 
      Kita bisa melihat secara visual area mana saja yang "aman" untuk dipilih.
    `,
    contohNyata: `
      Anggaran Belanja:
      Kamu punya uang Rp 100.000 (maksimal). Kamu ingin beli Bakso (x) dan Jus (y).
      Kombinasinya bisa macam-macam: 1 bakso 1 jus (Bisa), 5 bakso 5 jus (Mungkin tidak cukup).
      Semua kombinasi yang "Cukup Bayar" adalah daerah penyelesaiannya.
    `,
    metode: [
      { name: "Gambar Garis Batas", desc: "Ubah tanda < atau > menjadi = dulu untuk menggambar garis lurus." },
      { name: "Uji Titik (0,0)", desc: "Ambil titik pusat (0,0). Masukkan ke pertidaksamaan. Jika Benar, arsir daerah yang kena titik itu. Jika Salah, arsir sebaliknya." }
    ]
  },
  10: {
    title: "Program Linear & Optimasi",
    subtitle: "Seni Mengambil Keputusan Terbaik",
    pengertian: `
      Ini adalah puncak dari materi aljabar linear di sekolah. Program Linear adalah metode matematika untuk mengalokasikan sumber daya yang terbatas untuk mencapai tujuan yang OPTIMAL (Maksimum atau Minimum).
      
      Kita menggabungkan banyak pertidaksamaan (disebut "Kendala") untuk membentuk satu daerah tertutup. 
      Di dalam daerah itu, kita mencari satu titik ajaib yang memberikan keuntungan terbesar.
    `,
    fungsi: `
      Sangat vital di dunia bisnis dan industri. Digunakan untuk memaksimumkan keuntungan pabrik, meminimumkan biaya pengiriman, atau mengatur komposisi gizi makanan.
    `,
    contohNyata: `
      Pabrik Sepatu:
      Punya stok karet terbatas dan kulit terbatas. 
      Harus buat Sepatu Sport (untung besar, bahan banyak) atau Sepatu Santai (untung kecil, bahan sedikit)?
      Berapa kombinasi jumlah sepatu yang harus diproduksi agar pabrik untung paling besar tanpa kehabisan bahan?
    `,
    metode: [
      { name: "Model Matematika", desc: "Menerjemahkan cerita panjang menjadi bahasa matematika (x dan y)." },
      { name: "Daerah Himpunan Penyelesaian (DHP)", desc: "Menggambar semua garus kendala dan mencari daerah irisan (yang bersih/terarsir)." },
      { name: "Uji Titik Pojok", desc: "Rahasia Program Linear: Nilai maksimum PASTI ada di salah satu sudut (pojok) daerah penyelesaian. Kita hanya perlu menguji sudut-sudut itu." }
    ]
  }
};

// === KOMPONEN UI PENDUKUNG ===

const CoordinateSystem = ({ children, width = 350, height = 350, scale = 25 }) => {
  const originX = 40;
  const originY = height - 40;

  const renderGrid = () => {
    const lines = [];
    const maxX = Math.floor((width - originX) / scale);
    const maxY = Math.floor(originY / scale);
    for (let i = 0; i <= maxX; i++) {
      lines.push(<line key={`v${i}`} x1={originX + i * scale} y1={0} x2={originX + i * scale} y2={height} stroke="#f1f5f9" strokeWidth="1" />);
    }
    for (let i = 0; i <= maxY; i++) {
      lines.push(<line key={`h${i}`} x1={0} y1={originY - i * scale} x2={width} y2={originY - i * scale} stroke="#f1f5f9" strokeWidth="1" />);
    }
    return lines;
  };

  return (
    <svg width="100%" height={height} className="border bg-white rounded-lg shadow-sm overflow-hidden select-none">
      {renderGrid()}
      <line x1={originX} y1={0} x2={originX} y2={height} stroke="#94a3b8" strokeWidth="2" />
      <line x1={0} y1={originY} x2={width} y2={originY} stroke="#94a3b8" strokeWidth="2" />
      <g transform={`translate(${originX}, ${originY}) scale(1, -1)`}>{children}</g>
    </svg>
  );
};

// === APP UTAMA ===

export default function Home() {
  const [level, setLevel] = useState(7);
  const [activeTab, setActiveTab] = useState('materi'); // materi, alat, kuis

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
              <Calculator size={24} className="text-yellow-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none tracking-tight">LinearMastery</h1>
              <p className="text-xs text-blue-200 opacity-90">Jenjang SMP - SMA</p>
            </div>
          </div>
          
          <div className="flex bg-black/20 rounded-full p-1 overflow-x-auto max-w-full backdrop-blur-sm">
            {[7, 8, 9, 10].map((l) => (
              <button
                key={l}
                onClick={() => { setLevel(l); setActiveTab('materi'); }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition whitespace-nowrap flex items-center gap-2 ${level === l ? 'bg-white text-indigo-800 shadow-lg' : 'text-blue-100 hover:bg-white/10'}`}
              >
                Kelas {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Konten Container */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-xl shadow-sm px-4">
          <button onClick={() => setActiveTab('materi')} className={`px-6 py-4 font-bold text-sm flex items-center gap-2 border-b-2 transition ${activeTab === 'materi' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-500'}`}>
            <BookOpen size={18} /> Materi Lengkap
          </button>
          <button onClick={() => setActiveTab('alat')} className={`px-6 py-4 font-bold text-sm flex items-center gap-2 border-b-2 transition ${activeTab === 'alat' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-500'}`}>
            <Brain size={18} /> Alat Interaktif
          </button>
          <button onClick={() => setActiveTab('kuis')} className={`px-6 py-4 font-bold text-sm flex items-center gap-2 border-b-2 transition ${activeTab === 'kuis' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-indigo-500'}`}>
            <Target size={18} /> Tantangan
          </button>
        </div>

        {/* Isi Halaman */}
        <main className="animate-fade-in pb-20">
          {activeTab === 'materi' && <MateriView level={level} onChangeTab={setActiveTab} />}
          {activeTab === 'alat' && <LabView level={level} />}
          {activeTab === 'kuis' && <QuizView level={level} />}
        </main>
      </div>
    </div>
  );
}

// === KOMPONEN VIEW MATERI (Narrative) ===
const MateriView = ({ level, onChangeTab }) => {
  const data = lessonData[level];

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Kolom Kiri: Navigasi Materi / Header */}
      <div className="lg:col-span-3">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Calculator size={120} />
          </div>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 uppercase tracking-wider backdrop-blur-md">
            Modul Kelas {level}
          </span>
          <h2 className="text-4xl font-extrabold mb-2">{data.title}</h2>
          <p className="text-xl text-indigo-100 font-light">{data.subtitle}</p>
        </div>
      </div>

      {/* Kolom Utama: Isi Materi */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Section 1: Pengertian */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-4 pb-2 border-b">
            <Lightbulb className="text-yellow-500" />
            Pengertian Dasar
          </h3>
          <div className="prose prose-slate text-slate-600 leading-relaxed whitespace-pre-line">
            {data.pengertian}
          </div>
        </section>

        {/* Section 2: Fungsi & Contoh */}
        <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="flex items-center gap-3 text-xl font-bold text-indigo-800 mb-4">
            <TrendingUp className="text-indigo-600" />
            Fungsi & Contoh Nyata
          </h3>
          <p className="text-indigo-900/80 mb-6 italic border-l-4 border-indigo-400 pl-4 py-2 bg-white/50 rounded-r-lg">
            "{data.fungsi}"
          </p>
          
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-700 mb-2 uppercase text-xs tracking-wider">Skenario Kehidupan:</h4>
            <div className="text-slate-700 whitespace-pre-line leading-relaxed">
              {data.contohNyata}
            </div>
          </div>
        </section>

        {/* Section 3: Metode Penyelesaian */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="flex items-center gap-3 text-xl font-bold text-slate-800 mb-6 pb-2 border-b">
            <Brain className="text-pink-500" />
            Cara Menyelesaikan (Metode)
          </h3>
          <div className="grid gap-4">
            {data.metode.map((m, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200">
                <div className="bg-pink-100 text-pink-600 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{m.name}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Kolom Kanan: Sidebar Aksi */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white text-center">
          <GraduationCap size={48} className="mx-auto mb-4 text-emerald-400" />
          <h3 className="text-lg font-bold mb-2">Sudah Paham Teori?</h3>
          <p className="text-slate-300 text-sm mb-6">
            Teori tanpa praktik itu membosankan. Mari kita coba visualisasikan materi ini di Laboratorium Interaktif.
          </p>
          <button 
            onClick={() => onChangeTab('alat')}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            Buka Laboratorium <ArrowRight size={18} />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" size={16} /> Kata Kunci Penting
          </h4>
          <div className="flex flex-wrap gap-2">
            {level === 7 && ["Variabel", "Konstanta", "Koefisien", "Ruas Kiri", "Ruas Kanan"].map(t => <Tag key={t}>{t}</Tag>)}
            {level === 8 && ["Eliminasi", "Substitusi", "Titik Potong", "Himpunan Penyelesaian"].map(t => <Tag key={t}>{t}</Tag>)}
            {level === 9 && ["Garis Batas", "Arsiran", "Titik Uji", "Daerah Layak"].map(t => <Tag key={t}>{t}</Tag>)}
            {level === 10 && ["Fungsi Objektif", "Kendala", "Titik Pojok", "Nilai Optimum"].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ children }) => (
  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
    #{children}
  </span>
);

// === KOMPONEN VIEW LAB (ALAT INTERAKTIF) ===
const LabView = ({ level }) => {
  // State for Lvl 8
  const [l8m1, setL8m1] = useState(1); const [l8c1, setL8c1] = useState(0);
  const [l8m2, setL8m2] = useState(-1); const [l8c2, setL8c2] = useState(6);
  // State for Lvl 10
  const [rotiA, setRotiA] = useState(2);
  const [rotiB, setRotiB] = useState(2);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Laboratorium Visual</h3>
        <p className="text-slate-500 mb-6">Eksperimen langsung untuk melihat bagaimana matematika bekerja.</p>

        {level === 7 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-xl font-bold text-slate-400">⚖️ Simulator Timbangan</p>
            <p className="text-slate-500 mt-2">Bayangkan: 2x + 3 = 9. Jika kita ambil 3 dari kedua sisi...</p>
            <div className="mt-6 flex justify-center items-center gap-8">
              <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600 border-2 border-blue-200">2 Kotak Misteri + 3kg</div>
              <div className="text-2xl font-bold text-slate-300">=</div>
              <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center font-bold text-green-600 border-2 border-green-200">9kg</div>
            </div>
            <p className="mt-4 text-sm text-slate-500">Maka 2 Kotak Misteri = 6kg. Jadi 1 Kotak = 3kg!</p>
          </div>
        )}

        {level === 8 && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                <p className="font-bold text-pink-700 mb-2">Persamaan 1 (Merah): y = mx + c</p>
                <div className="flex items-center gap-4 text-sm">
                   <span>Miring (m): {l8m1}</span>
                   <input type="range" min="-3" max="3" value={l8m1} onChange={(e)=>setL8m1(Number(e.target.value))} className="accent-pink-500 w-full"/>
                </div>
                <div className="flex items-center gap-4 text-sm mt-2">
                   <span>Geser (c): {l8c1}</span>
                   <input type="range" min="0" max="8" value={l8c1} onChange={(e)=>setL8c1(Number(e.target.value))} className="accent-pink-500 w-full"/>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="font-bold text-blue-700 mb-2">Persamaan 2 (Biru): y = mx + c</p>
                <div className="flex items-center gap-4 text-sm">
                   <span>Miring (m): {l8m2}</span>
                   <input type="range" min="-3" max="3" value={l8m2} onChange={(e)=>setL8m2(Number(e.target.value))} className="accent-blue-500 w-full"/>
                </div>
                <div className="flex items-center gap-4 text-sm mt-2">
                   <span>Geser (c): {l8c2}</span>
                   <input type="range" min="0" max="8" value={l8c2} onChange={(e)=>setL8c2(Number(e.target.value))} className="accent-blue-500 w-full"/>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <CoordinateSystem width={300} height={300}>
                <line x1={0} y1={l8c1*25} x2={300} y2={(l8m1*12 + l8c1)*25} stroke="#ec4899" strokeWidth="3" />
                <line x1={0} y1={l8c2*25} x2={300} y2={(l8m2*12 + l8c2)*25} stroke="#3b82f6" strokeWidth="3" />
                {/* Visual Intersect */}
                <circle cx={((l8c2-l8c1)/(l8m1-l8m2))*25} cy={(l8m1*((l8c2-l8c1)/(l8m1-l8m2)) + l8c1)*25} r="6" fill="black" />
              </CoordinateSystem>
            </div>
          </div>
        )}

        {level === 9 && (
           <div className="text-center">
             <div className="inline-block p-4 bg-yellow-50 text-yellow-800 rounded-lg mb-4 text-sm">
               💡 Untuk Level 9, coba ubah konsep garis di Level 8 menjadi daerah. <br/>
               Semua yang ada DI BAWAH garis y ≤ ... adalah daerah aman.
             </div>
             <div className="flex justify-center">
               <CoordinateSystem width={300} height={300}>
                 <polygon points="0,0 300,0 300,300 0,150" fill="rgba(34, 197, 94, 0.2)" />
                 <line x1={0} y1={150} x2={300} y2={300} stroke="green" strokeWidth="2" strokeDasharray="5,5" />
                 <text x={100} y={50} fill="green" fontWeight="bold">Daerah Penyelesaian</text>
               </CoordinateSystem>
             </div>
           </div>
        )}

        {level === 10 && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-slate-50 p-6 rounded-xl border">
              <h4 className="font-bold mb-4">Simulasi Keuntungan Pabrik</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Produksi Barang A (Untung 4rb):</span>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>setRotiA(Math.max(0,rotiA-1))} className="w-8 h-8 bg-white border rounded hover:bg-slate-100">-</button>
                    <span className="font-bold w-6 text-center">{rotiA}</span>
                    <button onClick={()=>setRotiA(rotiA+1)} className="w-8 h-8 bg-white border rounded hover:bg-slate-100">+</button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Produksi Barang B (Untung 5rb):</span>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>setRotiB(Math.max(0,rotiB-1))} className="w-8 h-8 bg-white border rounded hover:bg-slate-100">-</button>
                    <span className="font-bold w-6 text-center">{rotiB}</span>
                    <button onClick={()=>setRotiB(rotiB+1)} className="w-8 h-8 bg-white border rounded hover:bg-slate-100">+</button>
                  </div>
                </div>
                <hr/>
                <div className="flex justify-between font-bold text-lg text-indigo-700">
                  <span>Total Keuntungan:</span>
                  <span>Rp {((rotiA*4000)+(rotiB*5000)).toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">*Pastikan titik (A,B) berada di area hijau agar bahan cukup.</p>
              </div>
            </div>
            <div className="flex justify-center">
               <CoordinateSystem width={300} height={300} scale={20}>
                 <polygon points={`0,0 ${6*20},0 ${4.6*20},${2.6*20} 0,${5*20}`} fill="rgba(34, 197, 94, 0.3)" />
                 <circle cx={rotiA*20} cy={rotiB*20} r="5" fill="red" stroke="white" strokeWidth="2"/>
               </CoordinateSystem>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// === KOMPONEN VIEW KUIS (TANTANGAN) ===
const QuizView = ({ level }) => {
  const quizzes = {
    7: { q: "Aku memikirkan sebuah angka. Jika dikali 2 lalu ditambah 5, hasilnya 15. Angka berapakah aku?", a: "5" },
    8: { q: "Harga 1 Ayam + 1 Nasi = 15rb. Harga 2 Ayam + 1 Nasi = 25rb. Berapa harga 1 Ayam?", a: "10000" },
    9: { q: "Parkiran hanya muat 10 mobil. Mana yang TIDAK boleh? (Tulis: A/B/C)\nA. 5 Mobil\nB. 10 Mobil\nC. 11 Mobil", a: "C" },
    10: { q: "Agar untung maksimal, kita harus menguji titik-titik di bagian mana dari daerah penyelesaian?", a: "Pojok" }
  };
  
  const [ans, setAns] = useState("");
  const [status, setStatus] = useState(null);

  const check = () => {
    if(ans.toLowerCase().includes(quizzes[level].a.toLowerCase())) setStatus("benar");
    else setStatus("salah");
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white text-center">
          <Target size={40} className="mx-auto mb-2 opacity-80" />
          <h3 className="text-xl font-bold">Tantangan Cepat Level {level}</h3>
        </div>
        <div className="p-8">
          <p className="text-lg font-medium text-slate-700 mb-6 text-center whitespace-pre-line">{quizzes[level].q}</p>
          <input 
            type="text" 
            placeholder="Ketik jawabanmu..." 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4 text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={ans}
            onChange={(e)=>setAns(e.target.value)}
          />
          <button 
            onClick={check}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition"
          >
            Cek Jawaban
          </button>
          
          {status === "benar" && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl text-center font-bold animate-bounce">
              🎉 Luar Biasa! Jawabanmu Tepat!
            </div>
          )}
          {status === "salah" && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl text-center font-bold">
              ❌ Masih kurang tepat, coba pikirkan lagi ya.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};