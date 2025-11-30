'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Calculator, PlayCircle } from 'lucide-react';

export default function App() {
  // State untuk input teks
  const [inputText, setInputText] = useState("AKU SUKA TIDUR");
  // State untuk animasi pencarian invers
  const [showInverseSteps, setShowInverseSteps] = useState(false);
  const [highlightRow, setHighlightRow] = useState(null);

  // --- LOGIC AREA ---

  // 1. Fungsi Mapping Huruf ke Angka (Custom: A=21, F=0)
  // Logic: Standard ASCII A=0, F=5. Kita geser -5.
  // Rumus: (ASCII - 65 - 5) mod 26
  const getCustomValue = (char) => {
    const code = char.toUpperCase().charCodeAt(0);
    if (code < 65 || code > 90) return null; // Bukan huruf
    let val = (code - 65 - 5) % 26;
    if (val < 0) val += 26;
    return val;
  };

  // 2. Fungsi Mapping Angka ke Huruf
  const getCharFromValue = (val) => {
    let code = (val + 5) % 26;
    return String.fromCharCode(code + 65);
  };

  // 3. Proses Enkripsi Text
  const encryptText = (text) => {
    return text.split('').map((char, index) => {
      const pVal = getCustomValue(char);
      if (pVal === null) return { char, isSpace: true };
      
      const raw = 11 * pVal + 10;
      const cVal = raw % 26;
      const cChar = getCharFromValue(cVal);
      
      return {
        original: char.toUpperCase(),
        pVal,
        calc: `11(${pVal}) + 10 = ${raw}`,
        mod: `${raw} mod 26 = ${cVal}`,
        cVal,
        result: cChar,
        isSpace: false
      };
    });
  };

  // 4. Proses Dekripsi Text
  // Rumus: P = 19(C - 10) mod 26
  const decryptText = (cipherData) => {
    return cipherData.map((item) => {
      if (item.isSpace) return item;

      const cVal = item.cVal;
      const step1 = cVal - 10;
      // Handle negative modulo correctly in JS
      let step1Mod = step1 % 26;
      if (step1Mod < 0) step1Mod += 26;

      const raw = 19 * step1Mod;
      const pVal = raw % 26;
      const pChar = getCharFromValue(pVal);

      return {
        ...item,
        decStep1: `${cVal} - 10 = ${step1} ≡ ${step1Mod}`,
        decStep2: `19(${step1Mod}) = ${raw}`,
        decRes: `${raw} mod 26 = ${pVal}`,
        finalChar: pChar
      };
    });
  };

  const encryptedData = encryptText(inputText);
  const decryptedData = decryptText(encryptedData);
  
  // Mengambil string hasil akhir
  const finalCipherString = encryptedData.map(d => d.isSpace ? ' ' : d.result).join('');
  const finalDecryptedString = decryptedData.map(d => d.isSpace ? ' ' : d.finalChar).join('');

  // Simulasi Invers Loop
  const runInverseSimulation = () => {
    setShowInverseSteps(true);
    let i = 1;
    const interval = setInterval(() => {
      setHighlightRow(i);
      if (i >= 19) clearInterval(interval);
      i++;
    }, 150); // Kecepatan animasi
  };

  // Gunakan useEffect untuk membersihkan interval jika komponen unmount
  useEffect(() => {
    return () => {
        // Cleanup function (optional but good practice)
    }
  }, []);

  return (
    <div className="min-h-screen text-white font-inter relative bg-slate-900">
      {/* Styles Injection */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        .bg-gradient-custom {
          background-image: linear-gradient(to bottom right, #0F172A, #172554, #312E81);
        }

        .content-card {
          background-color: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .input-glow:focus {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          border-color: #60A5FA;
        }

        /* Table Styling */
        .table-container {
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        table { width: 100%; border-collapse: collapse; }
        th { background: rgba(15, 23, 42, 0.8); color: #93C5FD; padding: 12px; text-align: left; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
        td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; }
        tr:hover td { background-color: rgba(255,255,255,0.05); }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>

      <div className="bg-gradient-custom min-h-screen pb-20">
        
        {/* Navbar */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Kelompok 2: Modifikasi Cipher
            </h1>
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          
          {/* Header Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Interactive Caesar Lab</h2>
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-mono">
              Fungsi: C = (11P + 10) mod 26
            </div>
          </div>

          {/* SECTION 1: ENKRIPSI INTERAKTIF */}
          <div className="content-card rounded-2xl p-6 md:p-8 mb-8 shadow-2xl ring-1 ring-white/10">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                1. ENKRIPSI
              </h3>
              <button 
                onClick={() => setInputText("AKU SUKA TIDUR")}
                className="text-xs text-gray-400 hover:text-white underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset Contoh
              </button>
            </div>

            {/* Input Box */}
            <div className="mb-8">
              <label className="block text-gray-400 text-sm mb-2">Masukkan Plaintext (Silakan ketik di sini):</label>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-xl md:text-2xl text-green-400 font-mono focus:outline-none input-glow transition-all placeholder-gray-600"
                placeholder="Ketik pesan rahasia..."
              />
            </div>

            {/* Live Result Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-white/5">
                <p className="text-xs text-gray-500 uppercase mb-1">Plaintext (P)</p>
                <p className="font-mono text-lg text-gray-300 break-all">{inputText.toUpperCase() || "..."}</p>
              </div>
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <p className="text-xs text-green-500 uppercase mb-1">Ciphertext (C)</p>
                <p className="font-mono text-lg text-green-400 break-all">{finalCipherString || "..."}</p>
              </div>
            </div>

            {/* Detailed Table */}
            <h4 className="text-lg font-semibold text-white mb-4">Rincian Perhitungan Baris per Baris</h4>
            <div className="table-container max-h-[400px] overflow-y-auto custom-scrollbar">
              <table>
                <thead>
                  <tr>
                    <th>Huruf</th>
                    <th>Nilai P (Custom)</th>
                    <th>Rumus (11P + 10)</th>
                    <th>Mod 26</th>
                    <th>Hasil (C)</th>
                  </tr>
                </thead>
                <tbody>
                  {encryptedData.map((item, idx) => (
                    !item.isSpace ? (
                      <tr key={idx}>
                        <td className="text-white font-bold">{item.original}</td>
                        <td className="text-blue-300">{item.pVal}</td>
                        <td className="text-gray-400">{item.calc}</td>
                        <td className="text-yellow-200">{item.mod}</td>
                        <td className="text-green-400 font-bold text-lg">{item.result}</td>
                      </tr>
                    ) : (
                      <tr key={idx} className="bg-slate-800/30">
                        <td colSpan="5" className="text-center text-gray-600 italic text-xs py-2">
                          (Spasi diabaikan)
                        </td>
                      </tr>
                    )
                  ))}
                  {inputText.length === 0 && (
                    <tr><td colSpan="5" className="text-center text-gray-500 py-8">Ketik sesuatu di atas untuk melihat tabel.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>


          {/* SECTION 2: MENCARI INVERS (REQUESTED FEATURE) */}
          <div className="content-card rounded-2xl p-6 md:p-8 mb-8 shadow-2xl ring-1 ring-white/10">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6" /> CARA MENCARI INVERS
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Untuk melakukan dekripsi, kita membutuhkan invers dari <strong>11</strong> dalam modulo 26.
                  <br/>
                  Artinya, kita mencari angka <strong>x</strong> dimana:
                </p>
                <div className="bg-slate-800 p-4 rounded-lg text-center font-mono text-xl border border-yellow-500/30 mb-6">
                  11 &middot; x &equiv; 1 (mod 26)
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Kita bisa mencarinya dengan algoritma Euclidean, atau karena modulo 26 kecil, kita bisa coba satu per satu (Brute Force) dengan simulasi di bawah ini.
                </p>
                
                {!showInverseSteps ? (
                  <button 
                    onClick={runInverseSimulation}
                    className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <PlayCircle className="w-5 h-5" /> Mulai Simulasi Pencarian
                  </button>
                ) : (
                   <button 
                    onClick={() => {setShowInverseSteps(false); setHighlightRow(null);}}
                    className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
                  >
                    Reset Simulasi
                  </button>
                )}
              </div>

              {/* Simulation Box */}
              <div className="bg-slate-900/80 rounded-lg border border-white/10 p-0 overflow-hidden flex flex-col h-[300px]">
                <div className="bg-slate-800 px-4 py-2 border-b border-white/10 flex justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">Log Perhitungan</span>
                  <span className="text-xs text-gray-500">Mencari sisa bagi 1...</span>
                </div>
                <div className="overflow-y-auto p-4 custom-scrollbar font-mono text-sm space-y-1 flex-1">
                  {showInverseSteps ? (
                    Array.from({length: 20}, (_, i) => i + 1).map(x => {
                      const res = (11 * x) % 26;
                      const isFound = res === 1;
                      // Logic highlight animasi
                      const isCurrent = highlightRow === x;
                      const isPast = highlightRow > x;
                      
                      if (!isPast && !isCurrent && highlightRow !== null) return null; // Belum muncul

                      return (
                        <div 
                          key={x} 
                          className={`flex justify-between p-2 rounded ${
                            isFound ? 'bg-green-500/20 border border-green-500 text-green-300 font-bold' : 
                            isCurrent ? 'bg-yellow-500/20 border-l-2 border-yellow-500' : 'text-gray-500'
                          }`}
                        >
                          <span>11 &times; {x} = {11*x}</span>
                          <span>mod 26 = {res} {isFound ? '✅' : ''}</span>
                        </div>
                      )
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-600 italic text-center px-6">
                      Klik "Mulai Simulasi" untuk melihat komputer mencari nilai invers satu per satu.
                    </div>
                  )}
                  {highlightRow >= 19 && (
                    <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-200 text-center text-xs">
                      Ditemukan! Invers dari 11 adalah <strong>19</strong>.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: DEKRIPSI OTOMATIS */}
          <div className="content-card rounded-2xl p-6 md:p-8 shadow-2xl ring-1 ring-white/10">
            <h3 className="text-2xl font-bold text-teal-400 mb-6 border-b border-white/10 pb-4">
              3. DEKRIPSI (Pembuktian)
            </h3>
            <p className="text-gray-300 mb-4">
              Menggunakan invers yang ditemukan (19), rumus dekripsinya adalah: <br/>
              <code className="text-teal-300 font-mono bg-slate-800 px-2 py-1 rounded">P = 19(C - 10) mod 26</code>
            </p>
            
            <div className="table-container max-h-[400px] overflow-y-auto custom-scrollbar">
              <table>
                <thead>
                  <tr>
                    <th>Cipher (C)</th>
                    <th>Langkah 1 (C-10)</th>
                    <th>Kali Invers (x19)</th>
                    <th>Mod 26</th>
                    <th>Huruf Asli</th>
                  </tr>
                </thead>
                <tbody>
                  {decryptedData.map((item, idx) => (
                    !item.isSpace ? (
                      <tr key={idx}>
                        <td className="text-green-400 font-bold">{item.original} ({item.cVal})</td>
                        <td className="text-gray-400">{item.decStep1}</td>
                        <td className="text-gray-400">{item.decStep2}</td>
                        <td className="text-yellow-200">{item.decRes}</td>
                        <td className="text-white font-bold text-lg border-l border-white/10 pl-4">{item.finalChar}</td>
                      </tr>
                    ) : null
                  ))}
                  {inputText.length === 0 && (
                      <tr><td colSpan="5" className="text-center text-gray-500 py-8">Menunggu input...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
             <div className="mt-6 p-4 bg-teal-900/20 border border-teal-500/30 rounded-lg flex justify-between items-center">
                <span className="text-gray-400 text-sm">Hasil Akhir Dekripsi:</span>
                <span className="text-xl font-bold text-white tracking-widest">{finalDecryptedString}</span>
              </div>
          </div>

        </main>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© 2024 Portofolio Teori Bilangan - Interactive React App</p>
        </footer>
      </div>
    </div>
  );
}