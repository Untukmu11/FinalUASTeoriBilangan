'use client';

import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Konfigurasi MathJax
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
      },
      svg: {
        fontCache: 'global'
      },
      startup: {
        typeset: false // Kita akan memanggil typeset secara manual setelah load
      }
    };

    // Fungsi untuk memuat script MathJax
    const loadMathJax = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      script.onload = () => {
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise();
        }
      };
      document.head.appendChild(script);
    };

    // Cek jika MathJax sudah ada, jika belum load scriptnya
    if (!window.MathJax || !window.MathJax.typesetPromise) {
      loadMathJax();
    } else {
      window.MathJax.typesetPromise();
    }
  }, []);

  return (
    <div className="app-container">
      {/* CSS Internal */}
      <style>{`
        :root {
          --color-primary: #007bff;
          --color-secondary: #495057;
          --color-light: #f8f9fa;
          --color-text: #212529;
          --color-accent: #17a2b8;
          --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
          font-family: var(--font-main);
          line-height: 1.7;
          color: var(--color-text);
          background-color: var(--color-light);
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 900px;
          margin: 20px auto;
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: var(--color-primary);
          margin-bottom: 30px;
          font-size: 2.2em;
        }

        h2 {
          color: var(--color-primary);
          margin-top: 30px;
          margin-bottom: 15px;
          border-bottom: 2px solid var(--color-accent);
          padding-bottom: 5px;
          font-size: 1.6em;
        }

        h3 {
          color: var(--color-secondary);
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 1.3em;
        }

        h4 {
          color: var(--color-accent);
          margin-top: 15px;
          margin-bottom: 8px;
          font-size: 1.1em;
          font-weight: 600;
        }

        p, ul, ol, table {
          margin-bottom: 15px;
          text-align: justify;
        }

        ul, ol {
          padding-left: 30px;
        }

        ul li {
          list-style: disc;
          margin-bottom: 5px;
        }
        
        ol li {
          list-style: decimal;
          margin-bottom: 5px;
        }

        /* --- Rumus Formatting --- */
        .formula-block {
          margin: 20px 0 !important;
          padding: 15px;
          background-color: #e6f7ff; 
          border: 1px dashed var(--color-accent);
          border-radius: 4px;
          overflow-x: auto;
          text-align: center;
          font-size: 1.1em;
        }
        
        /* --- Tabel Styling --- */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        table th, table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        table th {
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
        }
        table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        
        .catatan {
          background-color: #fff3cd;
          border-left: 5px solid #ffc107;
          padding: 15px;
          margin-top: 20px;
          border-radius: 4px;
        }

        /* Responsif untuk Mobile */
        @media (max-width: 600px) {
          .container {
            padding: 20px;
            margin: 10px;
          }
          h1 { font-size: 1.8em; }
          h2 { font-size: 1.4em; }
          table { font-size: 0.9em; }
        }
      `}</style>

      <div className="container">
        <h1>Inti Materi: Caesar Cipher dan Modular Aritmetik</h1>
        
        {/* ===================================== */}
        {/* 1. PENDAHULUAN */}
        {/* ===================================== */}
        <section id="pendahuluan">
          <h2>Pendahuluan</h2>
          <p>
            Dalam berkomunikasi, sering kali ada pesan yang tidak boleh dibaca oleh sembarang orang, 
            apalagi jika pesan tersebut harus melewati banyak tangan sebelum sampai kepada penerima. 
            Bayangkan seseorang ingin mengirimkan teks penting, tetapi ia tahu bahwa pengantar pesan, 
            kurir, atau siapa pun yang membawanya bisa saja membuka dan membaca isi pesan tersebut. 
            Oleh karena itu, untuk menjaga kerahasiaannya, pengirim membutuhkan cara agar tulisannya 
            tampak biasa saja bagi orang lain, namun tetap dapat dipahami oleh penerima yang tepat.
          </p>
          <p>
            Dalam kasus-kasus seperti inilah teknik <em>Caesar Cipher</em> digunakan. Dengan teknik sederhana ini, 
            pengirim menggeser setiap huruf dalam pesannya beberapa langkah di sepanjang alfabet, sehingga 
            teks berubah menjadi rangkaian huruf baru yang tampak acak. Orang lain yang melihatnya tidak 
            akan memahami maknanya, tetapi penerima yang mengetahui kunci pergeseran ini dapat dengan mudah 
            mengubah teks kembali menjadi pesan asli. Teknik inilah yang membuat pesan aman meskipun harus 
            melewati banyak tangan.
          </p>
                    <p>
            Untuk dapat memahami cara kerja Caesar Cipher secara lebih mendalam, kita perlu mempelajari 
            beberapa konsep penting. Konsep-konsep tersebut yaitu, kongruensi modular, langkah enkripsi, 
            langkah dekripsi, dan modifikasi algoritma Caesar Chiper.
          </p>
        </section>

        {/* ===================================== */}
        {/* 2. KONGRUENSI MODULAR */}
        {/* ===================================== */}
        <section id="modular">
          <h2>Pemahaman Kongruensi Modular</h2>
          
          <h3>Definisi Kongruensi Modular</h3>
          <p>
            Jika {'$a, b \\in \\mathbb{Z}$'} dan {'$n \\in \\mathbb{Z}^+$'}, maka $a$ dikatakan kongruen dengan $b$ modulo $n$, 
            ditulis {'$a \\equiv b \\pmod{n}$'}, apabila $n$ membagi $a-b$ (Burton, 2011).
          </p>
          <p>Secara formal, kongruensi antara bilangan bulat dinyatakan sebagai:</p>
          <div className="formula-block">
            {'$$a \\equiv b \\pmod{n} \\iff n \\mid (a-b)$$'}
          </div>
          <p>Artinya:</p>
          <ul>
            <li>$a$ dan $b$ memiliki sisa yang sama ketika dibagi $n$.</li>
            <li>$a-b$ habis dibagi $n$.</li>
          </ul>
                    
          <h3>Teorema</h3>
          <p>
            Jika $a$ dan $b$ adalah bilangan bulat, maka kita mengatakan bahwa {'$a \\equiv b \\pmod{n}$'} jika dan hanya jika, 
            terdapat suatu bilangan bulat $k$ sehingga berlaku persamaan $a = b + kn$ (Nurhadiani et al., 2018).
          </p>
          <div className="catatan">
            Teorema di atas berarti selisih $a-b$ merupakan kelipatan dari $n$. Jika {'$a \\equiv b \\pmod{n}$'}, 
            maka $n$ membagi selisih $a-b$, sehingga terdapat bilangan bulat $k$ dengan $a-b=kn$ dan persamaan 
            ini dapat ditulis menjadi $a=b+kn$. Dengan kata lain, kongruensi modular menunjukan bahwa dua bilangan 
            memiliki sisa yang sama jika dibagi dengan $n$.
          </div>
          
          <h3>Sifat-Sifat Kongruensi</h3>
          <ol>
            <li>
              <strong>Refleksif:</strong> Jika $a$ suatu bilangan bulat, maka {'$a \\equiv a \\pmod{n}$'}. (Bukti: $n \mid (a-a)=0$).
            </li>
            <li>
              <strong>Simetris:</strong> Jika {'$a \\equiv b \\pmod{n}$'}, maka {'$b \\equiv a \\pmod{n}$'}. (Bukti: Jika {'$a \\equiv b \\pmod{n}$'}, maka $a-b=kn$, sehingga $b-a=(-k)n$, yang berarti $n \mid (b-a)$).
            </li>
            <li>
              <strong>Transitif:</strong> Jika terdapat {'$a \\equiv b \\pmod{n}$'} dan {'$b \\equiv c \\pmod{n}$'}, maka {'$a \\equiv c \\pmod{n}$'}. (Bukti: $a-b=kn$ dan $b-c=ln$. $(a-b)+(b-c)=n(k+l)$, sehingga $a-c=n(k+l)$, yang berarti {'$a \\equiv c \\pmod{n}$'}).
            </li>
          </ol>

          <h3>Pentingnya Kongruensi Modular dalam Caesar Cipher</h3>
          <p>
            Caesar Cipher bekerja dengan menggeser huruf alfabet menggunakan bilangan bulat dan karena hanya ada 26 huruf, 
            maka semua operasi dilakukan dengan <em>modulo 26</em>. Tanpa modulus, pergeseran huruf bisa keluar dari rentang $0-25$. Modular bertugas untuk mengembalikan hasil ke rentang alfabet A-Z.
          </p>
          <h4>Contoh Peran Modular</h4>
          <p>
            Huruf Z = 25. Jika digeser $k=3$ langkah, hasilnya $25+3=28$. Dengan menggunakan modular:
          </p>
          <div className="formula-block">
             {'$$28 \\pmod{26} = 2 \\quad (\\text{yaitu huruf C})$$'}
          </div>
          <p>
            Inilah fungsi utama kongruensi modular dalam Caesar Cipher, yaitu untuk menjamin pergeseran huruf tetap berada dalam alfabet.
          </p>
        </section>

        {/* ===================================== */}
        {/* 3. ENKRIPSI */}
        {/* ===================================== */}
        <section id="enkripsi">
          <h2>Langkah Enkripsi </h2>
          <p>
            Enkripsi adalah proses mengubah pesan asli (plaintext) menjadi bentuk yang tidak dapat dibaca (ciphertext) 
            dengan menggunakan aturan atau kunci tertentu. Dalam Caesar Cipher, enkripsi dilakukan dengan menggeser 
            setiap huruf plaintext sejumlah $k$ posisi pada alfabet.
          </p>

          <h3>Rumus Enkripsi</h3>
          <p>Secara matematis, rumus enkripsi dirumuskan sebagai:</p>
          <div className="formula-block">
            {'$$C \\equiv P + k \\pmod{26}$$'}
          </div>
          <ul>
            <li>$P$: Posisi huruf plaintext</li>
            <li>$k$: Kunci (jumlah pergeseran)</li>
            <li>$C$: Posisi huruf ciphertext</li>
          </ul>

          <h3>Tahapan Proses Enkripsi</h3>
          <ol>
            <li>
              <strong>Konversi Huruf ke Angka:</strong> Ubah setiap huruf dalam plaintext menjadi nilai numerik sesuai posisi alfabet ($A=0, \dots, Z=25$).
            </li>
            <li>
              <strong>Tentukan Kunci ($k$):</strong> Pilih nilai kunci $k$, yaitu banyaknya posisi alfabet yang akan digeser (contohnya $k=3$).
            </li>
            <li>
              <strong>Lakukan Operasi Enkripsi:</strong> Hitung {'$C = (P + k) \\pmod{26}$'}. Langkah ini menjaga agar hasil penjumlahan tetap dalam rentang $0-25$ dengan melakukan operasi modulus 26.
            </li>
            <li>
              <strong>Konversi Angka Kembali ke Huruf:</strong> Ubah hasil angka setelah {'$\\pmod{26}$'} menjadi huruf kembali ($0=A, \dots, 25=Z$). Huruf inilah yang menjadi huruf sandi (ciphertext).
            </li>
            <li>
              <strong>Ulangi untuk Semua Huruf:</strong> Terapkan proses yang sama untuk setiap huruf dalam plaintext sehingga seluruh pesan menjadi ciphertext.
            </li>
          </ol>
          
          <h4>Contoh Enkripsi kata “MATH” dengan kunci $k=3$</h4>
          <table>
            <thead>
              <tr>
                <th>Huruf</th>
                <th>Angka ($P$)</th>
                <th>$P+k$ ($k=3$)</th>
                <th>Mod 26</th>
                <th>Ciphertext ($C$)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>M</td><td>12</td><td>$12+3=15$</td><td>15</td><td>P</td></tr>
              <tr><td>A</td><td>0</td><td>$0+3=3$</td><td>3</td><td>D</td></tr>
              <tr><td>T</td><td>19</td><td>$19+3=22$</td><td>22</td><td>W</td></tr>
              <tr><td>H</td><td>7</td><td>$7+3=10$</td><td>10</td><td>K</td></tr>
            </tbody>
          </table>
          <p>Setelah proses enkripsi, kata <em>MATH</em> menjadi <em>PDWK</em>.</p>
        </section>

        {/* ===================================== */}
        {/* 4. DEKRIPSI */}
        {/* ===================================== */}
        <section id="dekripsi">
          <h2>Langkah Dekripsi </h2>
          <p>
            Dekripsi adalah proses untuk mengembalikan pesan yang sudah terenkripsi (ciphertext) kembali menjadi pesan asli (plaintext) yang dapat dibaca. Proses ini merupakan operasi invers, yaitu <em>pengurangan modular</em>.
          </p>

          <h3>Rumus Dekripsi</h3>
          <p>Rumus dekripsi dirumuskan sebagai:</p>
          <div className="formula-block">
            {'$$P \\equiv C - k \\pmod{26}$$'}
          </div>
          <ul>
            <li>$P$: Posisi huruf plaintext</li>
            <li>$C$: Posisi huruf ciphertext</li>
            <li>$k$: Kunci (jumlah pergeseran)</li>
          </ul>

          <h3>Langkah-Langkah Proses Dekripsi</h3>
          <ol>
            <li>
              <strong>Siapkan Ciphertext dan Kunci:</strong> Ambil pesan yang sudah terenkripsi serta nilai kunci $k$ yang sama yang digunakan saat enkripsi.
            </li>
            <li>
              <strong>Konversi Huruf Ciphertext menjadi Angka:</strong> Setiap huruf diubah ke bentuk angka ($A=0, \dots, Z=25$). Contoh: P = 15, D = 3, W = 22, K = 10.
            </li>
            <li>
              <strong>Lakukan Operasi Dekripsi:</strong> Kurangkan angka ciphertext dengan kunci $k$ dan ambil {'$\\pmod{26}$'}. Contoh untuk huruf P: {'$P = (15-3) \\pmod{26} = 12$'}.
            </li>
            <li>
              <strong>Ubah Angka Kembali menjadi Plaintext:</strong> Konversikan angka hasil dekripsi ($0-25$) kembali ke huruf alfabet. Contoh: $12 = M, 0 = A, 19 = T, 7 = H$.
            </li>
            <li>
              <strong>Ulangi untuk Semua Huruf dalam Ciphertext:</strong> Proses dilakukan secara berurutan untuk seluruh huruf dalam ciphertext hingga terbentuk kembali pesan asli (plaintext).
            </li>
          </ol>
          
          <h4>Contoh Dekripsi kata “PDWK” dengan kunci $k=3$</h4>
          <table>
            <thead>
              <tr>
                <th>Ciphertext ($C$)</th>
                <th>Angka ($C$)</th>
                <th>$C-k$ ($k=3$)</th>
                <th>Mod 26</th>
                <th>Plaintext ($P$)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>P</td><td>15</td><td>$15-3=12$</td><td>12</td><td>M</td></tr>
              <tr><td>D</td><td>3</td><td>$3-3=0$</td><td>0</td><td>A</td></tr>
              <tr><td>W</td><td>22</td><td>$22-3=19$</td><td>19</td><td>T</td></tr>
              <tr><td>K</td><td>10</td><td>$10-3=7$</td><td>7</td><td>H</td></tr>
            </tbody>
          </table>
        </section>

        {/* ===================================== */}
        {/* 5. MODIFIKASI ALGORITMA */}
        {/* ===================================== */}
        <section id="modifikasi">
          <h2>Modifikasi Algoritma</h2>
          <p>
            Seluruh modifikasi Caesar Cipher pada dasarnya berangkat dari fakta bahwa Caesar adalah sebuah transformasi linear di ruang modular:
          </p>
          <div className="formula-block">
            {'$$f_k(P)=(P+k) \\pmod{n}$$'}
          </div>
          <p>
            yang merupakan fungsi bijektif pada himpunan {'$\\mathbb{Z}_n$'}. Modifikasi yang dibahas berikut memperbesar atau mengubah struktur aljabar dari fungsi tersebut.
          </p>

          <h3>Perluasan Modulus (Extended Caesar)</h3>
          <p>
            Perubahan pada struktur domain aljabar dari {'$\\mathbb{Z}_{26}$'} menjadi {'$\\mathbb{Z}_n$'} dengan $n &gt; 26$. Perubahan pada $n$ tidak mengubah tipe fungsi, tetapi mengubah ruang aljabarnya.
          </p>
          <ul>
            <li><strong>Rumus:</strong> {'$C \\equiv P+k \\pmod{n}$'}.</li>
            <li><strong>Implikasi:</strong> Ketika $n$ membesar, jumlah kemungkinan cipher meningkat drastis, dan analisis frekuensi menjadi kurang efektif.</li>
          </ul>
          
          <h3>Multiple Shift (Komposisi Fungsi Linear dalam Modulo)</h3>
          <p>
            Multiple shift memperkenalkan komposisi fungsi linear dalam modulo. Jika Caesar adalah satu fungsi $f_k$, maka multiple shift adalah rangkaian fungsi {'$f_{k_1}, f_{k_2}, \\dots, f_{k_n}$'} yang masing-masing merupakan automorfisme translasi di {'$\\mathbb{Z}_{26}$'}.
          </p>
          <ul>
            <li><strong>Implikasi:</strong> Cipher tidak lagi memiliki satu distribusi frekuensi tunggal, dan pola transformasinya lebih kompleks.</li>
          </ul>

          <h3>Vigenère Cipher (Konsep Periodisitas dalam Transformasi Modular)</h3>
          <p>
            Vigenère adalah multiple shift dengan struktur periodik, di mana nilai $k$ berasal dari fungsi periodik {'$K: \\mathbb{N} \\to \\mathbb{Z}_{26}$'} yang didefinisikan oleh keyword.
          </p>
          <ul>
            <li><strong>Implikasi:</strong> Memperkenalkan gagasan fungsi periodik dalam kriptografi; secara matematis, Vigenère adalah Caesar dengan parameter $k$ yang diatur oleh cyclic subgroup.</li>
          </ul>
          
          <h3>Dynamic Shift (Index-Dependent Transformations)</h3>
          <p>
            Dynamic shift memperkenalkan ketergantungan indeks ke dalam fungsi Caesar, di mana nilai $k$ bergantung pada posisi $i$ secara linear: $k_i = k_0 + i$. Pendekatan ini disebut progressive substitution.
          </p>
          <ul>
            <li><strong>Implikasi:</strong> Nilai $k$ tumbuh secara deterministik, dan pola frekuensi plaintext mengalami distorsi progresif, membuat struktur ciphertext sangat dinamis.</li>
          </ul>
          
          <h3>Affine Cipher (Transformasi Linear Umum - Automorphism of {'$\\mathbb{Z}_n$'})</h3>
          <p>
            Affine Cipher adalah perluasan Caesar menjadi transformasi linear umum di {'$\\mathbb{Z}_{26}$'}: {'$f(P)=(aP+b) \\pmod{26}$'}. Caesar adalah kasus khusus ketika $a=1$.
          </p>
          <p>
            Kahn (1996) menekankan bahwa syarat {'$\\gcd(a, 26)=1$'} menjamin keberadaan invers modulo, menjadikannya <em>bijektif</em>, syarat mendasar agar enkripsi dapat dibalik.
          </p>
          <ul>
            <li><strong>Implikasi:</strong> Cipher menjadi transformasi linear yang lebih kaya strukturnya, dan memperbesar ruang kunci secara signifikan.</li>
          </ul>
        </section>

        <footer>
          <p style={{ textAlign: 'center', padding: '20px', color: 'var(--color-secondary)', fontSize: '0.9em' }}>
            Dokumentasi Inti Materi Caesar Cipher
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;