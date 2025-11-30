"use client"; // Wajib ada karena kita menggunakan interaksi (useState)

import React, { useState, useEffect } from "react";

export default function CipherPage() {
  // --- STATE (Pengganti variabel global) ---
  const [inputText, setInputText] = useState("AKU SUKA MATEMATIKA");
  const [cipherResult, setCipherResult] = useState("");
  const [plainResult, setPlainResult] = useState("");
  const [encryptData, setEncryptData] = useState([]);
  const [decryptData, setDecryptData] = useState([]);

  // --- LOGIKA (Sama seperti script asli Anda) ---
  const mapStr = "FGHIJKLMNOPQRSTUVWXYZABCDE";
  // Index 0 = 'F', Index 21 = 'A'

  // Buat mapping object agar pencarian cepat
  const charToVal = {};
  for (let i = 0; i < mapStr.length; i++) {
    charToVal[mapStr[i]] = i;
  }

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  // Fungsi kalkulasi yang berjalan otomatis saat inputText berubah
  useEffect(() => {
    const input = inputText.toUpperCase();
    let fullCipher = "";
    let fullPlain = "";
    let encRows = [];
    let decRows = [];

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      // Jika karakter tidak ada di map (misal spasi), lewati kalkulasi
      if (!charToVal.hasOwnProperty(char)) {
        fullCipher += char;
        fullPlain += char;
        continue;
      }

      // 1. ENKRIPSI
      const P = charToVal[char];
      const rawC = 11 * P + 10;
      const C_val = mod(rawC, 26);
      const C_char = mapStr[C_val];

      fullCipher += C_char;

      encRows.push({
        char: char,
        pVal: P,
        formula: `11(${P}) + 10 = ${rawC}`,
        modRes: `${rawC} mod 26 = ${C_val}`,
        result: C_char,
      });

      // 2. DEKRIPSI (Dari hasil cipher tadi)
      const rawP = 19 * (C_val - 10);
      const P_recov_val = mod(rawP, 26);
      const P_recov_char = mapStr[P_recov_val];

      fullPlain += P_recov_char;

      decRows.push({
        cChar: C_char,
        cVal: C_val,
        formula: `19(${C_val}-10) = ${rawP}`,
        modRes: `${rawP} mod 26 = ${P_recov_val}`,
        result: P_recov_char,
      });
    }

    setCipherResult(fullCipher);
    setPlainResult(fullPlain);
    setEncryptData(encRows);
    setDecryptData(decRows);
  }, [inputText]); // Akan dijalankan ulang setiap inputText berubah

  const handleReset = () => {
    setInputText("AKU SUKA MATEMATIKA");
  };

  // --- RENDER JSX (Pengganti HTML body) ---
  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #0F172A, #1E3A8A, #4C1D95)",
      }}
    >
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-blue-800/50 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            Kelompok 2: Implementasi Chiper 1
          </h1>
          <span className="text-xs bg-blue-600 px-2 py-1 rounded">
            Mode Interaktif
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16 p-8 rounded-xl bg-gradient-to-r from-purple-800/70 to-pink-800/70 shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-3">
            Modifikasi Caesar Cipher
          </h2>
          <p className="text-lg text-pink-200">
            Algoritma: C = (11P + 10) mod 26
          </p>
        </div>

        <div className="space-y-12">
          {/* 1. Rumus Umum */}
          <div className="bg-slate-800/95 border border-blue-500/30 rounded-xl p-8 shadow-xl">
            <h3 className="text-3xl font-bold text-blue-400 mb-6 border-b border-blue-400/30 pb-2">
              RUMUS UMUM
            </h3>
            <div className="bg-slate-700/30 p-6 border-l-4 border-blue-500 rounded-lg mb-6 text-center">
              <p className="text-2xl font-mono text-white">
                C = (P + k) mod 26
              </p>
            </div>
          </div>

          {/* 2. Enkripsi Interaktif */}
          <div className="bg-slate-800/95 border border-blue-500/30 rounded-xl p-8 shadow-xl border-l-4 border-l-green-500">
            <div className="flex justify-between items-center mb-6 border-b border-purple-400/30 pb-2">
              <h3 className="text-3xl font-bold text-purple-400">
                1. ENKRIPSI
              </h3>
              <button
                onClick={handleReset}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                Reset ke Contoh Awal
              </button>
            </div>

            {/* Input User */}
            <div className="bg-slate-800 p-4 rounded-lg mb-6 border border-slate-600">
              <label className="block text-sm text-gray-400 mb-2">
                Masukkan Plaintext (Silakan ubah teks ini):
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-transparent border-none border-b-2 border-green-400 text-green-400 font-bold text-lg w-full outline-none font-mono focus:border-green-600"
              />
            </div>

            {/* Tabel Mapping Referensi */}
            <h4 className="text-xl font-semibold text-gray-200 mb-4">
              Tabel Mapping (A=21, F=0)
            </h4>
            <div className="overflow-x-auto mb-8 bg-slate-800/50 rounded p-2">
              <table className="w-full text-center border-collapse text-sm">
                <thead>
                  <tr>
                    {["A", "B", "C", "D", "E", "F", "...", "Z"].map((char) => (
                      <th
                        key={char}
                        className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300 font-bold"
                      >
                        {char}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-mono text-gray-300">
                    {[21, 22, 23, 24, 25, 0, "...", 20].map((val, idx) => (
                      <td key={idx} className="p-3 border-b border-white/10">
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tabel Hasil Dinamis */}
            <h4 className="text-xl font-semibold text-gray-200 mb-4">
              Tabel Perhitungan
            </h4>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Huruf (P)</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Nilai P</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Rumus (11P + 10)</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Hasil Mod 26</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Cipher (C)</th>
                  </tr>
                </thead>
                <tbody>
                  {encryptData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-3 border-b border-white/10 font-bold text-blue-300">{row.char}</td>
                      <td className="p-3 border-b border-white/10">{row.pVal}</td>
                      <td className="p-3 border-b border-white/10">{row.formula}</td>
                      <td className="p-3 border-b border-white/10 text-yellow-300 font-bold">{row.modRes}</td>
                      <td className="p-3 border-b border-white/10 font-bold text-green-400">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-lg font-semibold text-green-400 bg-slate-900/50 p-3 rounded border border-green-500/30">
              Hasil Ciphertext: <span className="text-white font-mono">{cipherResult}</span>
            </p>
          </div>

          {/* 3. Dekripsi Otomatis */}
          <div className="bg-slate-800/95 border border-blue-500/30 rounded-xl p-8 shadow-xl border-l-4 border-l-teal-500">
            <h3 className="text-3xl font-bold text-teal-400 mb-6 border-b border-teal-400/30 pb-2">
              2. DEKRIPSI (Otomatis)
            </h3>
            <p className="mb-4 text-gray-300">
              Mendekripsi kembali hasil ciphertext di atas menggunakan rumus $P = 19(C - 10) \mod 26$.
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Cipher (C)</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Nilai C</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Rumus 19(C-10)</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Hasil Mod 26</th>
                    <th className="p-3 border-b border-white/10 bg-slate-700/50 text-blue-300">Plain (P)</th>
                  </tr>
                </thead>
                <tbody>
                  {decryptData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-3 border-b border-white/10 font-bold text-green-400">{row.cChar}</td>
                      <td className="p-3 border-b border-white/10">{row.cVal}</td>
                      <td className="p-3 border-b border-white/10">{row.formula}</td>
                      <td className="p-3 border-b border-white/10 text-yellow-300 font-bold">{row.modRes}</td>
                      <td className="p-3 border-b border-white/10 font-bold text-blue-300">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-lg font-semibold text-green-400 bg-slate-900/50 p-3 rounded border border-green-500/30">
              Hasil Kembali: <span className="text-white font-mono">{plainResult}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}