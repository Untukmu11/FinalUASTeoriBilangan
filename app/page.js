"use client";

import React, { useEffect } from "react";

export default function CaesarTheoryPage() {
  // Fungsi ini dijalankan setelah halaman dimuat untuk memuat dan memproses MathJax
  useEffect(() => {
    // 1. Konfigurasi MathJax
    window.MathJax = {
      tex: { 
        inlineMath: [['$', '$'], ['\\(', '\\)']] 
      },
      svg: { 
        fontCache: 'global' 
      }
    };

    // 2. Cek apakah script sudah ada untuk menghindari duplikasi
    if (!document.getElementById('mathjax-script')) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      script.id = "mathjax-script";
      
      script.onload = () => {
        if (window.MathJax) {
          window.MathJax.typesetPromise();
        }
      };
      
      document.head.appendChild(script);
    } else {
      // Jika script sudah ada, minta render ulang
      if (window.MathJax) {
        window.MathJax.typesetPromise();
      }
    }
  }, []);

  // Fungsi helper untuk scroll halus
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans leading-relaxed selection:bg-blue-100">
      
      {/* --- HEADER & NAVIGASI --- */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto max-w-5xl px-5 py-4">
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium text-gray-600">
              {["Pendahuluan", "Modular", "Enkripsi", "Dekripsi", "Modifikasi"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all pb-1 cursor-pointer"
                    onClick={(e) => handleScroll(e, item.toLowerCase())}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* --- KONTEN UTAMA --- */}
      <main className="container mx-auto max-w-5xl px-5 py-10 space-y-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-10">
          Caesar Cipher: Kriptografi Klasik dan Matematikanya
        </h1>

        {/* 1. PENDAHULUAN */}
        <section id="pendahuluan" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-4 border-cyan-400 pb-2 flex items-center gap-3">
            <span role="img" aria-label="Kunci">🔑</span> Pendahuluan
          </h2>
          <div className="space-y-4 text-justify text-gray-700">
            <p>
              Dalam berkomunikasi, sering kali ada pesan yang tidak boleh dibaca oleh sembarang orang. 
              Untuk menjaga kerahasiaannya, pengirim membutuhkan cara agar tulisannya tampak biasa saja bagi orang lain, 
              namun tetap dapat dipahami oleh penerima yang tepat.
            </p>
            <p>
              Dalam kasus-kasus seperti inilah teknik <em>Caesar Cipher</em> digunakan. Dengan teknik sederhana ini, 
              pengirim menggeser setiap huruf dalam pesannya beberapa langkah di sepanjang alfabet. 
              Orang lain yang melihatnya tidak akan memahami maknanya, tetapi penerima yang mengetahui kunci pergeseran ini 
              dapat dengan mudah mengubah teks kembali menjadi pesan asli.
            </p>
          </div>
        </section>

        {/* 2. KONGRUENSI MODULAR */}
        <section id="modular" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-4 border-cyan-400 pb-2 flex items-center gap-3">
            <span role="img" aria-label="Matematika">➗</span> Pemahaman Kongruensi Modular
          </h2>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Definisi Kongruensi Modular</h3>
          <p className="mb-4">
            {/* Menggunakan string literal `{`...`}` agar \mathbb{Z} tidak error */}
            Jika {`$a, b \\in \\mathbb{Z}$`} dan {`$n \\in \\mathbb{Z}^+$`}, maka {`$a$`} dikatakan kongruen dengan {`$b$`} modulo {`$n$`}, ditulis {`$a \\equiv b \\pmod{n}$`}, apabila {`$n$`} membagi {`$a-b$`}.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-cyan-500 p-4 my-6 rounded overflow-x-auto text-center font-serif text-lg">
            {`$$a \\equiv b \\pmod{n} \\iff n \\mid (a-b)$$`}
          </div>

          <h4 className="text-lg font-bold text-cyan-600 mb-2">Contoh</h4>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>{`$17 \\equiv 5 \\pmod{6}$`}, karena {`$6 \\mid 12$`}.</li>
            <li>{`$-3 \\equiv 23 \\pmod{26}$`}, karena {`$26 \\mid 26$`}.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Sifat-Sifat Kongruensi</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li><strong>Refleksif:</strong> {`$a \\equiv a \\pmod{n}$`}.</li>
            <li><strong>Simetris:</strong> Jika {`$a \\equiv b \\pmod{n}$`}, maka {`$b \\equiv a \\pmod{n}$`}.</li>
            <li><strong>Transitif:</strong> Jika {`$a \\equiv b \\pmod{n}$`} dan {`$b \\equiv c \\pmod{n}$`}, maka {`$a \\equiv c \\pmod{n}$`}.</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Pentingnya dalam Caesar Cipher</h3>
          <p className="mb-4">
            Karena alfabet hanya ada 26 huruf, operasi dilakukan dengan <em>modulo 26</em> agar hasil pergeseran huruf tetap berada dalam rentang {`$0-25$`} (A-Z).
          </p>
        </section>

        {/* 3. ENKRIPSI */}
        <section id="enkripsi" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-4 border-cyan-400 pb-2 flex items-center gap-3">
            <span role="img" aria-label="Gembok">🔒</span> Langkah Enkripsi
          </h2>
          <p className="mb-6">
            <strong>Enkripsi</strong> mengubah pesan asli (plaintext) menjadi ciphertext dengan menggeser huruf sejauh {`$k$`}.
          </p>

          <div className="bg-blue-50 border-l-4 border-cyan-500 p-4 my-6 rounded overflow-x-auto text-center font-serif text-lg">
            {`$$C \\equiv P + k \\pmod{26}$$`}
          </div>

          <h4 className="text-lg font-bold text-cyan-600 mb-4">Contoh: "MATH" dengan kunci {`$k=3$`}</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 border">Huruf</th>
                  <th className="p-3 border">Angka ({`$P$`})</th>
                  <th className="p-3 border">Rumus ({`$P+3$`})</th>
                  <th className="p-3 border">Ciphertext</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="even:bg-gray-50"><td>M</td><td>12</td><td>15</td><td>P</td></tr>
                <tr className="even:bg-gray-50"><td>A</td><td>0</td><td>3</td><td>D</td></tr>
                <tr className="even:bg-gray-50"><td>T</td><td>19</td><td>22</td><td>W</td></tr>
                <tr className="even:bg-gray-50"><td>H</td><td>7</td><td>10</td><td>K</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. DEKRIPSI */}
        <section id="dekripsi" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-4 border-cyan-400 pb-2 flex items-center gap-3">
            <span role="img" aria-label="Buka Gembok">🔓</span> Langkah Dekripsi
          </h2>
          <p className="mb-6">
            <strong>Dekripsi</strong> mengembalikan pesan asli dengan menggeser mundur (pengurangan modular).
          </p>

          <div className="bg-blue-50 border-l-4 border-cyan-500 p-4 my-6 rounded overflow-x-auto text-center font-serif text-lg">
            {`$$P \\equiv C - k \\pmod{26}$$`}
          </div>

          <h4 className="text-lg font-bold text-cyan-600 mb-4">Contoh: "PDWK" dengan kunci {`$k=3$`}</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 border">Ciphertext</th>
                  <th className="p-3 border">Angka ({`$C$`})</th>
                  <th className="p-3 border">Rumus ({`$C-3$`})</th>
                  <th className="p-3 border">Plaintext</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="even:bg-gray-50"><td>P</td><td>15</td><td>12</td><td>M</td></tr>
                <tr className="even:bg-gray-50"><td>D</td><td>3</td><td>0</td><td>A</td></tr>
                <tr className="even:bg-gray-50"><td>W</td><td>22</td><td>19</td><td>T</td></tr>
                <tr className="even:bg-gray-50"><td>K</td><td>10</td><td>7</td><td>H</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. MODIFIKASI ALGORITMA */}
        <section id="modifikasi" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 border-b-4 border-cyan-400 pb-2 flex items-center gap-3">
            <span role="img" aria-label="Roda Gigi">⚙</span> Modifikasi Algoritma
          </h2>
          <p className="mb-6">
            Modifikasi Caesar Cipher didasarkan pada transformasi linear di ruang modular:
          </p>
          <div className="bg-blue-50 border-l-4 border-cyan-500 p-4 my-6 rounded overflow-x-auto text-center font-serif text-lg">
            {`$$f_k(P)=(P+k) \\pmod{n}$$`}
          </div>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Extended Caesar</h3>
              <p>Mengubah domain dari {`$\\mathbb{Z}_{26}$`} menjadi {`$\\mathbb{Z}_n$`} dengan {`$n > 26$`}. Ini memperbesar ruang kunci.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Vigenère Cipher</h3>
              <p>Menggunakan kunci yang berbeda untuk setiap huruf (periodik), sehingga analisis frekuensi biasa menjadi sulit.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Affine Cipher</h3>
              <p>Perluasan menjadi transformasi linear umum: {`$f(P)=(aP+b) \\pmod{26}$`}, di mana {`$\\gcd(a, 26)=1$`}.</p>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-200 mt-10">
          <p>Dokumentasi Berdasarkan Materi Caesar Cipher Kelompok 2</p>
        </footer>

      </main>
    </div>
  );
}