'use client';

import React from 'react';

export default function Page() {
  return (
    <>
      {/* Bagian Head manual untuk memuat resource eksternal */}
      <title>Detail Kelompok 2 | Modifikasi Caesar Cipher</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      
      <style dangerouslySetInnerHTML={{__html: `
        body {
            font-family: 'Inter', sans-serif;
            background-image: linear-gradient(to bottom right, #0F172A, #1E3A8A, #4C1D95);
        }
        .content-card {
            background-color: rgba(30, 41, 59, 0.9); /* slate-800/90 */
            border: 1px solid rgba(59, 130, 246, 0.3); /* blue-500/30 */
        }
        .math-box {
            background-color: rgba(71, 85, 105, 0.3); /* slate-600/30 */
            padding: 1.5rem;
            border-left: 4px solid #3B82F6; /* blue-500 */
        }
        /* Styling untuk tabel yang lebih jelas dan responsif */
        .table-custom {
            width: 100%;
            border-collapse: collapse;
            overflow-x: auto;
            display: block;
        }
        .table-custom th, .table-custom td {
            padding: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            text-align: left;
            white-space: nowrap; /* Mencegah pemisahan baris dalam sel */
        }
        .table-custom th {
            background-color: rgba(55, 65, 81, 0.5); /* gray-700/50 */
            color: #93C5FD; /* blue-300 */
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
        }
        .table-custom tr:last-child td {
            border-bottom: none;
        }
        /* Custom scrollbar for tables */
        .table-custom::-webkit-scrollbar {
            height: 8px;
        }
        .table-custom::-webkit-scrollbar-track {
            background: rgba(30, 41, 59, 0.5);
        }
        .table-custom::-webkit-scrollbar-thumb {
            background: #4B5563;
            border-radius: 4px;
        }
        .table-custom::-webkit-scrollbar-thumb:hover {
            background: #6B7280;
        }
      `}} />

      {/* Mengganti tag body menjadi div wrapper karena di Next.js body sudah ada di layout.js */}
      <div className="min-h-screen text-white">

        {/* Header / Navbar */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-blue-800/50 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-white">Kelompok 2: Implementasi Chiper 1</h1>
                <a 
                  href="#" 
                  onClick={() => alert('Ini adalah tombol kembali ke index.html (simulasi)')} 
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-300 cursor-pointer"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Kembali ke Portofolio</span>
                </a>
            </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                
                {/* Hero Section */}
                <div className="text-center mb-16 p-8 rounded-xl bg-gradient-to-r from-purple-800/70 to-pink-800/70 shadow-2xl">
                    <h2 className="text-4xl font-extrabold mb-3">Modifikasi Caesar Cipher</h2>
                    <p className="text-lg text-pink-200">
                        Algoritma yang digunakan adalah fungsi linear modular: C = (11P + 10) mod 26
                    </p>
                </div>

                {/* Content Cards */}
                <div className="space-y-12">
                    
                    {/* 1. Rumus Umum Caesar Cipher */}
                    <div className="content-card rounded-xl p-8 shadow-xl">
                        <h3 className="text-3xl font-bold text-blue-400 mb-6 border-b border-blue-400/30 pb-2">RUMUS UMUM CAESAR CHIPER</h3>
                        <p className="mb-4 text-gray-300">
                            Proses enkripsi Caesar Cipher standar dapat dituliskan dalam bentuk persamaan kongruensi linear:
                        </p>
                        <div className="math-box rounded-lg mb-6">
                            <p className="text-2xl font-mono text-white text-center">
                                C = (P + k) mod 26
                            </p>
                        </div>
                        <ul className="list-disc ml-6 text-gray-400">
                            <li>C adalah huruf hasil enkripsi (ciphertext)</li>
                            <li>P adalah huruf asli (plaintext)</li>
                            <li>k adalah kunci atau jumlah pergeseran</li>
                            <li>26 mewakili jumlah huruf dalam alfabet</li>
                        </ul>
                    </div>

                    {/* 2. Implementasi ENKRIPSI */}
                    <div className="content-card rounded-xl p-8 shadow-xl">
                        <h3 className="text-3xl font-bold text-purple-400 mb-6 border-b border-purple-400/30 pb-2">1. ENKRIPSI</h3>
                        <p className="mb-4 text-gray-300">
                            Menggunakan rumus modifikasi: C = (11P + 10) mod 26
                        </p>

                        <h4 className="text-xl font-semibold text-gray-200 mb-4">Tabel Nilai Plaintext (P) [A-Z &rarr; 21-20]</h4>
                        <div className="overflow-x-auto mb-8">
                            <table className="table-custom text-sm">
                                <thead>
                                    <tr>
                                        <th>Huruf</th><th>Nilai (P)</th>
                                        <th>Huruf</th><th>Nilai (P)</th>
                                        <th>Huruf</th><th>Nilai (P)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>A</td><td>21</td><td>J</td><td>4</td><td>S</td><td>13</td></tr>
                                    <tr><td>B</td><td>22</td><td>K</td><td>5</td><td>T</td><td>14</td></tr>
                                    <tr><td>C</td><td>23</td><td>L</td><td>6</td><td>U</td><td>15</td></tr>
                                    <tr><td>D</td><td>24</td><td>M</td><td>7</td><td>V</td><td>16</td></tr>
                                    <tr><td>E</td><td>25</td><td>N</td><td>8</td><td>W</td><td>17</td></tr>
                                    <tr><td>F</td><td>0</td><td>O</td><td>9</td><td>X</td><td>18</td></tr>
                                    <tr><td>G</td><td>1</td><td>P</td><td>10</td><td>Y</td><td>19</td></tr>
                                    <tr><td>H</td><td>2</td><td>Q</td><td>11</td><td>Z</td><td>20</td></tr>
                                    <tr><td>I</td><td>3</td><td>R</td><td>12</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <h4 className="text-xl font-semibold text-gray-200 mb-4">Contoh Enkripsi: AKU SUKA MATEMATIKA</h4>
                        <div className="overflow-x-auto mb-4">
                            <table className="table-custom text-sm">
                                <thead>
                                    <tr>
                                        <th>Huruf Asli (P)</th>
                                        <th>Nilai P</th>
                                        <th>Rumus (11P + 10)</th>
                                        <th>Hasil C mod 26</th>
                                        <th>Huruf Hasil (C)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* AKU */}
                                    <tr><td>A</td><td>21</td><td>11 &middot; 21 + 10 = 241</td><td>241 mod 26 = 7</td><td>M</td></tr>
                                    <tr><td>K</td><td>5</td><td>11 &middot; 5 + 10 = 65</td><td>65 mod 26 = 13</td><td>S</td></tr>
                                    <tr><td>U</td><td>15</td><td>11 &middot; 15 + 10 = 175</td><td>175 mod 26 = 19</td><td>Y</td></tr>
                                    {/* SUKA */}
                                    <tr className="border-t-2 border-slate-600"><td colSpan="5" className="bg-slate-800/50 text-xs text-center text-gray-400 py-1">Kata: SUKA</td></tr>
                                    <tr><td>S</td><td>13</td><td>11 &middot; 13 + 10 = 153</td><td>153 mod 26 = 23</td><td>C</td></tr>
                                    <tr><td>U</td><td>15</td><td>11 &middot; 15 + 10 = 175</td><td>175 mod 26 = 19</td><td>Y</td></tr>
                                    <tr><td>K</td><td>5</td><td>11 &middot; 5 + 10 = 65</td><td>65 mod 26 = 13</td><td>S</td></tr>
                                    <tr><td>A</td><td>21</td><td>11 &middot; 21 + 10 = 241</td><td>241 mod 26 = 7</td><td>M</td></tr>
                                    {/* MATEMATIKA */}
                                    <tr className="border-t-2 border-slate-600"><td colSpan="5" className="bg-slate-800/50 text-xs text-center text-gray-400 py-1">Kata: MATEMATIKA</td></tr>
                                    <tr><td>M</td><td>7</td><td>11 &middot; 7 + 10 = 87</td><td>87 mod 26 = 9</td><td>O</td></tr>
                                    <tr><td>A</td><td>21</td><td>11 &middot; 21 + 10 = 241</td><td>241 mod 26 = 7</td><td>M</td></tr>
                                    <tr><td>T</td><td>14</td><td>11 &middot; 14 + 10 = 164</td><td>164 mod 26 = 8</td><td>N</td></tr>
                                    <tr><td>E</td><td>25</td><td>11 &middot; 25 + 10 = 285</td><td>285 mod 26 = 25</td><td>E</td></tr>
                                    <tr><td>M</td><td>7</td><td>11 &middot; 7 + 10 = 87</td><td>87 mod 26 = 9</td><td>O</td></tr>
                                    <tr><td>A</td><td>21</td><td>11 &middot; 21 + 10 = 241</td><td>241 mod 26 = 7</td><td>M</td></tr>
                                    <tr><td>T</td><td>14</td><td>11 &middot; 14 + 10 = 164</td><td>164 mod 26 = 8</td><td>N</td></tr>
                                    <tr><td>I</td><td>3</td><td>11 &middot; 3 + 10 = 43</td><td>43 mod 26 = 17</td><td>W</td></tr>
                                    <tr><td>K</td><td>5</td><td>11 &middot; 5 + 10 = 65</td><td>65 mod 26 = 13</td><td>S</td></tr>
                                    <tr><td>A</td><td>21</td><td>11 &middot; 21 + 10 = 241</td><td>241 mod 26 = 7</td><td>M</td></tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <p className="mt-4 text-lg font-semibold text-green-400">
                            Hasil Ciphertext: MSY CYSM OMNEOMNWSM
                        </p>
                    </div>

                    {/* 3. Dekripsi */}
                    <div className="content-card rounded-xl p-8 shadow-xl">
                        <h3 className="text-3xl font-bold text-teal-400 mb-6 border-b border-teal-400/30 pb-2">2. DEKRIPSI</h3>
                        <h4 className="text-xl font-semibold text-gray-200 mb-4">Langkah 1: Mencari Invers Modulo</h4>
                        <div className="mb-2 text-gray-300">
                            Dari rumus enkripsi C &equiv; 11P + 10 (mod 26), kita dapatkan:
                            <div className="math-box rounded-lg my-4 text-sm text-gray-200">
                                <p className="text-center font-bold">11P &equiv; C - 10 (mod 26)</p>
                            </div>
                            Kita perlu mencari invers dari 11 pada modulo 26, yaitu x sehingga 11x &equiv; 1 (mod 26).
                            Berikut adalah proses pencarian nilai x secara berurutan:
                        </div>

                        <div className="math-box rounded-lg my-4 text-sm text-gray-200 overflow-y-auto max-h-64 border border-blue-500/30 custom-scrollbar">
                            <p className="font-bold mb-2 sticky top-0 bg-slate-700/90 p-1">Iterasi Pencarian (x = 1 s.d. 19):</p>
                            <ul className="font-mono space-y-1 pl-2">
                                <li>11 &times; 1  = 11  &equiv; 11 (mod 26)</li>
                                <li>11 &times; 2  = 22  &equiv; 22 (mod 26)</li>
                                <li>11 &times; 3  = 33  &equiv; 7  (mod 26)</li>
                                <li>11 &times; 4  = 44  &equiv; 18 (mod 26)</li>
                                <li>11 &times; 5  = 55  &equiv; 3  (mod 26)</li>
                                <li>11 &times; 6  = 66  &equiv; 14 (mod 26)</li>
                                <li>11 &times; 7  = 77  &equiv; 25 (mod 26)</li>
                                <li>11 &times; 8  = 88  &equiv; 10 (mod 26)</li>
                                <li>11 &times; 9  = 99  &equiv; 21 (mod 26)</li>
                                <li>11 &times; 10 = 110 &equiv; 6  (mod 26)</li>
                                <li>11 &times; 11 = 121 &equiv; 17 (mod 26)</li>
                                <li>11 &times; 12 = 132 &equiv; 2  (mod 26)</li>
                                <li>11 &times; 13 = 143 &equiv; 13 (mod 26)</li>
                                <li>11 &times; 14 = 154 &equiv; 24 (mod 26)</li>
                                <li>11 &times; 15 = 165 &equiv; 9  (mod 26)</li>
                                <li>11 &times; 16 = 176 &equiv; 20 (mod 26)</li>
                                <li>11 &times; 17 = 187 &equiv; 5  (mod 26)</li>
                                <li>11 &times; 18 = 198 &equiv; 16 (mod 26)</li>
                                <li className="text-green-400 font-bold border-l-2 border-green-400 pl-2 mt-2 bg-green-900/20 py-1">11 &times; 19 = 209 &equiv; 1  (mod 26) &check; KETEMU!</li>
                            </ul>
                            <p className="mt-4 pt-2 border-t border-gray-600">Karena <span className="text-green-300">11 &times; 19 mod 26 = 1</span>, maka invers dari 11 adalah <span className="font-bold text-white text-lg">19</span>.</p>
                        </div>

                        <h4 className="text-xl font-semibold text-gray-200 mt-6 mb-4">Langkah 2: Rumus Dekripsi</h4>
                        <p className="mb-4 text-gray-300">
                            Dengan mengalikan kedua sisi dengan invers (19), rumus dekripsi menjadi:
                        </p>
                        <div className="math-box rounded-lg mb-6">
                            <p className="text-2xl font-mono text-white text-center">
                                P &equiv; 19(C - 10) mod 26
                            </p>
                        </div>

                        <h4 className="text-xl font-semibold text-gray-200 mb-4">Tabel Dekripsi: MSY CYSM OMNEOMNWSM</h4>
                        <div className="overflow-x-auto mb-8">
                            <table className="table-custom text-sm">
                                <thead>
                                    <tr>
                                        <th>Cipher (C)</th>
                                        <th>Nilai C</th>
                                        <th>C-10 mod 26</th>
                                        <th>19(C-10) mod 26</th>
                                        <th>Nilai P</th>
                                        <th>Huruf P</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* AKU */}
                                    <tr><td>M</td><td>7</td><td>7-10 = -3 &equiv; 23</td><td>19 &middot; 23 = 437 &equiv; 21</td><td>21</td><td>A</td></tr>
                                    <tr><td>S</td><td>13</td><td>13-10 = 3</td><td>19 &middot; 3 = 57 &equiv; 5</td><td>5</td><td>K</td></tr>
                                    <tr><td>Y</td><td>19</td><td>19-10 = 9</td><td>19 &middot; 9 = 171 &equiv; 15</td><td>15</td><td>U</td></tr>
                                    {/* SUKA */}
                                    <tr className="border-t-2 border-slate-600"><td colSpan="6" className="bg-slate-800/50 text-xs text-center text-gray-400 py-1">Spasi / Kata Baru</td></tr>
                                    <tr><td>C</td><td>23</td><td>23-10 = 13</td><td>19 &middot; 13 = 247 &equiv; 13</td><td>13</td><td>S</td></tr>
                                    <tr><td>Y</td><td>19</td><td>19-10 = 9</td><td>19 &middot; 9 = 171 &equiv; 15</td><td>15</td><td>U</td></tr>
                                    <tr><td>S</td><td>13</td><td>13-10 = 3</td><td>19 &middot; 3 = 57 &equiv; 5</td><td>5</td><td>K</td></tr>
                                    <tr><td>M</td><td>7</td><td>7-10 = -3 &equiv; 23</td><td>19 &middot; 23 = 437 &equiv; 21</td><td>21</td><td>A</td></tr>
                                    {/* MATEMATIKA (OMNEOMNWSM) */}
                                    <tr className="border-t-2 border-slate-600"><td colSpan="6" className="bg-slate-800/50 text-xs text-center text-gray-400 py-1">Kata: MATEMATIKA</td></tr>
                                    <tr><td>O</td><td>9</td><td>9-10 = -1 &equiv; 25</td><td>19 &middot; 25 = 475 &equiv; 7</td><td>7</td><td>M</td></tr>
                                    <tr><td>M</td><td>7</td><td>7-10 = -3 &equiv; 23</td><td>19 &middot; 23 = 437 &equiv; 21</td><td>21</td><td>A</td></tr>
                                    <tr><td>N</td><td>8</td><td>8-10 = -2 &equiv; 24</td><td>19 &middot; 24 = 456 &equiv; 14</td><td>14</td><td>T</td></tr>
                                    <tr><td>E</td><td>25</td><td>25-10 = 15</td><td>19 &middot; 15 = 285 &equiv; 25</td><td>25</td><td>E</td></tr>
                                    <tr><td>O</td><td>9</td><td>9-10 = -1 &equiv; 25</td><td>19 &middot; 25 = 475 &equiv; 7</td><td>7</td><td>M</td></tr>
                                    <tr><td>M</td><td>7</td><td>7-10 = -3 &equiv; 23</td><td>19 &middot; 23 = 437 &equiv; 21</td><td>21</td><td>A</td></tr>
                                    <tr><td>N</td><td>8</td><td>8-10 = -2 &equiv; 24</td><td>19 &middot; 24 = 456 &equiv; 14</td><td>14</td><td>T</td></tr>
                                    <tr><td>W</td><td>17</td><td>17-10 = 7</td><td>19 &middot; 7 = 133 &equiv; 3</td><td>3</td><td>I</td></tr>
                                    <tr><td>S</td><td>13</td><td>13-10 = 3</td><td>19 &middot; 3 = 57 &equiv; 5</td><td>5</td><td>K</td></tr>
                                    <tr><td>M</td><td>7</td><td>7-10 = -3 &equiv; 23</td><td>19 &middot; 23 = 437 &equiv; 21</td><td>21</td><td>A</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-6 text-lg font-bold text-green-400">
                            Hasil Akhir Dekripsi adalah: AKU SUKA MATEMATIKA
                        </p>
                    </div>

                </div>
            </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-20 text-center text-blue-300/70 text-sm py-6">
            <p>© 2024 Portofolio Pembelajaran Teori Bilangan</p>
        </footer>
      </div>
    </>
  );
}