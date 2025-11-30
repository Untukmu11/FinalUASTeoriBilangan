'use client';

import { useState } from 'react';
import { Shield, Lock, Unlock, AlertTriangle, ChevronRight, ChevronDown, BookOpen, Code, Eye, EyeOff } from 'lucide-react';

export default function CaesarCipherLearning() {
  const [activeSection, setActiveSection] = useState(null);
  const [brokenText, setBrokenText] = useState('');
  const [encryptedDemo, setEncryptedDemo] = useState('');
  const [shift, setShift] = useState(3);
  const [demoText, setDemoText] = useState('HELLO WORLD');
  const [bruteForceResults, setBruteForceResults] = useState([]);
  const [showFrequency, setShowFrequency] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [practiceText, setPracticeText] = useState('KHOOR ZRUOG');
  const [practiceKey, setPracticeKey] = useState(3);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  const sections = [
    {
      id: 1,
      title: 'I. Kerentanan Utama: Ruang Kunci Kecil',
      icon: Lock,
      color: 'bg-red-500',
      content: {
        intro: 'Caesar Cipher memiliki kelemahan fundamental karena ruang kunci yang sangat terbatas.',
        points: [
          'Hanya ada 25 kemungkinan kunci (k=1 sampai k=25)',
          'Entropi kunci hanya ≈4.64 bit (sangat rendah)',
          'Serangan Brute Force sangat efisien',
          'Semua kunci dapat dicoba dalam hitungan detik'
        ]
      }
    },
    {
      id: 2,
      title: 'II. Substitusi Monoalfabetik',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      content: {
        intro: 'Setiap huruf plaintext selalu dipetakan ke huruf ciphertext yang sama.',
        points: [
          'Pola frekuensi huruf tetap terjaga',
          'Analisis frekuensi sangat efektif',
          'Huruf yang sering muncul mudah diidentifikasi',
          'Ciphertext-only attack dapat dilakukan'
        ]
      }
    },
    {
      id: 3,
      title: 'III. Kegagalan Skalabilitas',
      icon: Shield,
      color: 'bg-yellow-500',
      content: {
        intro: 'Caesar Cipher gagal memenuhi standar keamanan modern.',
        points: [
          'Tidak mencapai Perfect Secrecy',
          'Tidak ada integritas pesan',
          'Tidak ada mekanisme otentikasi',
          'Tidak mendukung non-repudiation'
        ]
      }
    },
    {
      id: 4,
      title: 'IV. Modifikasi yang Gagal',
      icon: Code,
      color: 'bg-blue-500',
      content: {
        intro: 'Upaya memperbaiki Caesar Cipher sering menghasilkan keamanan semu.',
        points: [
          'Double shift tetap setara dengan single shift',
          'Ruang kunci tidak bertambah secara signifikan',
          'Vigenère Cipher rentan terhadap Kasiski attack',
          'Perlu algoritma modern seperti AES atau RSA'
        ]
      }
    }
  ];

  const caesarEncrypt = (text, shift) => {
    return text.toUpperCase().split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const caesarDecrypt = (text, shift) => {
    return caesarEncrypt(text, 26 - shift);
  };

  const performBruteForce = (ciphertext) => {
    const results = [];
    for (let k = 1; k <= 25; k++) {
      results.push({
        key: k,
        plaintext: caesarDecrypt(ciphertext, k)
      });
    }
    setBruteForceResults(results);
  };

  const getFrequencyAnalysis = (text) => {
    const freq = {};
    const cleaned = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let char of cleaned) {
      freq[char] = (freq[char] || 0) + 1;
    }
    
    const total = cleaned.length;
    return Object.entries(freq)
      .map(([char, count]) => ({
        char,
        count,
        percentage: ((count / total) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count);
  };

  const tutorials = [
    {
      title: "Metode 1: Brute Force Attack",
      description: "Mencoba semua 25 kemungkinan kunci",
      steps: [
        "Ambil ciphertext yang ingin dipecahkan",
        "Coba dekripsi dengan k=1, k=2, k=3, ... sampai k=25",
        "Periksa hasil mana yang menghasilkan teks yang masuk akal",
        "Itu adalah plaintext asli!"
      ],
      difficulty: "Mudah",
      time: "< 1 menit"
    },
    {
      title: "Metode 2: Analisis Frekuensi",
      description: "Menggunakan statistik huruf bahasa alami",
      steps: [
        "Hitung frekuensi setiap huruf dalam ciphertext",
        "Identifikasi huruf yang paling sering muncul",
        "Asumsikan itu adalah 'E' (Inggris) atau 'A' (Indonesia)",
        "Hitung nilai k dari selisih posisi huruf",
        "Dekripsi seluruh pesan dengan k yang ditemukan"
      ],
      difficulty: "Menengah",
      time: "2-3 menit"
    },
    {
      title: "Metode 3: Pattern Recognition",
      description: "Mengenali pola kata umum",
      steps: [
        "Cari pola kata pendek (1-3 huruf) dalam ciphertext",
        "Bandingkan dengan kata umum: THE, AND, FOR, dll",
        "Cocokkan pola huruf berulang",
        "Tentukan nilai k dari kata yang cocok",
        "Verifikasi dengan mendekripsi seluruh pesan"
      ],
      difficulty: "Lanjutan",
      time: "3-5 menit"
    }
  ];

  const generateRandomPractice = () => {
    const messages = [
      "CRYPTOGRAPHY IS FUN",
      "LEARN SECURITY NOW",
      "BREAK THE CODE TODAY",
      "CIPHER CRACKING TIME",
      "DECODE THIS MESSAGE"
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const k = Math.floor(Math.random() * 25) + 1;
    setPracticeText(caesarEncrypt(msg, k));
    setPracticeKey(k);
    setUserAnswer('');
  };

  // Update encrypted demo when text or shift changes
  useState(() => {
    setEncryptedDemo(caesarEncrypt(demoText, shift));
  }, [demoText, shift]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-16 h-16 text-red-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Kerentanan Caesar Cipher
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Analisis komprehensif kelemahan algoritma kriptografi klasik yang mudah dipecahkan
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
            <h2 className="text-2xl font-bold">Demo Interaktif</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Plaintext:</label>
              <input
                type="text"
                value={demoText}
                onChange={(e) => {
                  const newText = e.target.value.toUpperCase();
                  setDemoText(newText);
                  setEncryptedDemo(caesarEncrypt(newText, shift));
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Masukkan teks..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Shift (k): {shift}</label>
              <input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => {
                  const newShift = parseInt(e.target.value);
                  setShift(newShift);
                  setEncryptedDemo(caesarEncrypt(demoText, newShift));
                }}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">Ciphertext:</span>
              <Lock className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-mono text-green-400">{encryptedDemo}</p>
          </div>

          <button
            onClick={() => {
              setBrokenText(encryptedDemo);
              performBruteForce(encryptedDemo);
            }}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center"
          >
            <Unlock className="w-5 h-5 mr-2" />
            Pecahkan dengan Brute Force
          </button>
        </div>

        {/* Tutorial Sections */}
        <div className="mb-8 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-500">
          <h2 className="text-3xl font-bold mb-6 text-center">
            🎯 Tutorial Memecahkan Caesar Cipher
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {tutorials.map((tutorial, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-purple-500 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-purple-400">{tutorial.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tutorial.difficulty === 'Mudah' ? 'bg-green-600' :
                    tutorial.difficulty === 'Menengah' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {tutorial.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-slate-400 mb-3">{tutorial.description}</p>
                
                <div className="space-y-2 mb-3">
                  {tutorial.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex items-start text-sm">
                      <span className="text-purple-400 mr-2 font-bold">{stepIdx + 1}.</span>
                      <span className="text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-xs text-slate-500 flex items-center">
                  <span className="mr-2">⏱️</span>
                  <span>Waktu: {tutorial.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Practice */}
        <div className="mb-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-green-400" />
            Latihan Interaktif: Pecahkan Sendiri!
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-yellow-400">Ciphertext Challenge:</h3>
              <button
                onClick={generateRandomPractice}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-all"
              >
                Tantangan Baru
              </button>
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg mb-4">
              <p className="text-3xl font-mono text-center text-green-400 tracking-wider">
                {practiceText}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Masukkan Jawaban Anda (Plaintext):</label>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                placeholder="Ketik jawabanmu disini..."
              />
            </div>

            {userAnswer && (
              <div className={`p-4 rounded-lg ${
                caesarDecrypt(practiceText, practiceKey) === userAnswer
                  ? 'bg-green-600 border-2 border-green-400'
                  : 'bg-red-600 border-2 border-red-400'
              }`}>
                {caesarDecrypt(practiceText, practiceKey) === userAnswer ? (
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">✅</span>
                    <div>
                      <p className="font-bold">Benar! Kunci yang digunakan: k={practiceKey}</p>
                      <p className="text-sm">Kamu berhasil memecahkan cipher!</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">❌</span>
                    <div>
                      <p className="font-bold">Belum tepat, coba lagi!</p>
                      <p className="text-sm">Gunakan metode yang sudah dipelajari</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
              >
                {showHint ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showHint ? 'Sembunyikan' : 'Tampilkan'} Analisis Pembantu
              </button>
              
              {showHint && (
                <div className="mt-3 space-y-3">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-400 mb-2">💡 Analisis Frekuensi:</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {getFrequencyAnalysis(practiceText).slice(0, 4).map((item) => (
                        <div key={item.char} className="bg-slate-800 p-2 rounded text-center">
                          <div className="text-xl font-bold text-purple-400">{item.char}</div>
                          <div className="text-xs text-slate-400">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Huruf teratas kemungkinan adalah 'E' atau 'T' dalam bahasa Inggris
                    </p>
                  </div>

                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-yellow-400 mb-2">🔍 Coba Beberapa Kunci:</h4>
                    <div className="space-y-1 text-sm max-h-40 overflow-y-auto">
                      {[1, 3, 5, 7, 13, 19, 25].map(k => (
                        <div key={k} className="bg-slate-800 p-2 rounded font-mono">
                          <span className="text-blue-400">k={k}:</span> {caesarDecrypt(practiceText, k)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="mb-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-orange-400" />
            Panduan Langkah demi Langkah
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-700 rounded-lg p-5">
              <h3 className="font-bold text-lg text-blue-400 mb-3">📝 Langkah 1: Identifikasi Ciphertext</h3>
              <p className="text-slate-300 mb-2">Perhatikan ciphertext yang akan dipecahkan. Contoh:</p>
              <div className="bg-slate-900 p-3 rounded font-mono text-green-400">
                KHOOR ZRUOG
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-5">
              <h3 className="font-bold text-lg text-purple-400 mb-3">🔢 Langkah 2: Hitung Frekuensi Huruf</h3>
              <p className="text-slate-300 mb-2">Hitung berapa kali setiap huruf muncul:</p>
              <div className="bg-slate-900 p-3 rounded">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>K: 1x, H: 1x, O: 3x</div>
                  <div>R: 2x, Z: 1x, U: 1x</div>
                  <div>L: 1x, G: 1x</div>
                </div>
              </div>
              <p className="text-sm text-yellow-400 mt-2">💡 Huruf 'O' paling sering (3x) - mungkin ini adalah 'L' yang digeser</p>
            </div>

            <div className="bg-slate-700 rounded-lg p-5">
              <h3 className="font-bold text-lg text-green-400 mb-3">🧮 Langkah 3: Hitung Pergeseran (k)</h3>
              <p className="text-slate-300 mb-2">Jika O adalah L yang digeser:</p>
              <div className="bg-slate-900 p-3 rounded font-mono">
                <div className="text-yellow-400">O = huruf ke-15 (dari A=1)</div>
                <div className="text-blue-400">L = huruf ke-12</div>
                <div className="text-green-400">k = 15 - 12 = 3 ✓</div>
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-5">
              <h3 className="font-bold text-lg text-red-400 mb-3">🔓 Langkah 4: Dekripsi dengan k=3</h3>
              <p className="text-slate-300 mb-2">Geser mundur setiap huruf sebanyak 3 posisi:</p>
              <div className="bg-slate-900 p-3 rounded space-y-2">
                <div className="font-mono">
                  <span className="text-red-400">K → H</span>, 
                  <span className="text-red-400"> H → E</span>, 
                  <span className="text-red-400"> O → L</span>...
                </div>
                <div className="text-2xl font-bold text-green-400 font-mono">
                  HELLO WORLD ✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brute Force Results */}
        {bruteForceResults.length > 0 && (
          <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
              Hasil Serangan Brute Force (25 Kemungkinan)
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {bruteForceResults.map((result) => (
                <div 
                  key={result.key}
                  className={`p-3 rounded-lg ${
                    result.plaintext === demoText 
                      ? 'bg-green-600 border-2 border-green-400' 
                      : 'bg-slate-700'
                  }`}
                >
                  <span className="font-bold text-blue-400">k={result.key}:</span>
                  <span className="ml-3 font-mono">{result.plaintext}</span>
                  {result.plaintext === demoText && (
                    <span className="ml-3 text-green-300 font-bold">✓ TERPECAHKAN!</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Frequency Analysis */}
        {encryptedDemo && (
          <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center">
                <Eye className="w-6 h-6 mr-2 text-purple-400" />
                Analisis Frekuensi
              </h3>
              <button
                onClick={() => setShowFrequency(!showFrequency)}
                className="text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-all"
              >
                {showFrequency ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
            
            {showFrequency && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {getFrequencyAnalysis(encryptedDemo).slice(0, 8).map((item) => (
                  <div key={item.char} className="bg-slate-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-center text-purple-400">{item.char}</div>
                    <div className="text-center text-sm text-slate-400">
                      {item.count}x ({item.percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 text-sm text-slate-400">
              💡 Huruf dengan frekuensi tertinggi kemungkinan adalah enkripsi dari 'E' (bahasa Inggris) atau 'A' (bahasa Indonesia)
            </p>
          </div>
        )}

        {/* Main Content Sections */}
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div key={section.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <button
                  onClick={() => setActiveSection(isActive ? null : section.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-750 transition-all"
                >
                  <div className="flex items-center">
                    <div className={`${section.color} p-3 rounded-lg mr-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-left">{section.title}</h3>
                  </div>
                  {isActive ? (
                    <ChevronDown className="w-6 h-6 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  )}
                </button>
                
                {isActive && (
                  <div className="p-6 pt-0 border-t border-slate-700">
                    <p className="text-slate-300 mb-4">{section.content.intro}</p>
                    <ul className="space-y-2">
                      {section.content.points.map((point, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-400 mr-2">▸</span>
                          <span className="text-slate-300">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key Formulas */}
        <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Code className="w-6 h-6 mr-2 text-green-400" />
            Rumus Matematika
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="bg-slate-900 p-3 rounded">
              <span className="text-blue-400">Enkripsi:</span> C ≡ (P + k) mod 26
            </div>
            <div className="bg-slate-900 p-3 rounded">
              <span className="text-green-400">Dekripsi:</span> P ≡ (C - k) mod 26
            </div>
            <div className="bg-slate-900 p-3 rounded">
              <span className="text-purple-400">Entropi:</span> H = log₂(|K|) ≈ 4.64 bit
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-8 bg-red-900/30 border border-red-700 rounded-xl p-6">
          <h3 className="text-2xl font-bold mb-3 text-red-400">⚠️ Kesimpulan</h3>
          <p className="text-slate-300 leading-relaxed">
            Caesar Cipher <strong>bukan lagi pilihan yang aman</strong> untuk mengamankan informasi. 
            Kerentanan fundamental terhadap serangan Brute Force dan analisis frekuensi membuatnya 
            mudah ditembus bahkan oleh pemula. Gunakan algoritma modern seperti <strong>AES</strong> atau <strong>RSA</strong> 
            untuk keamanan yang sesungguhnya.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Web Pembelajaran Kriptografi - Caesar Cipher Analysis</p>
        </div>
      </div>
    </div>
  );
}