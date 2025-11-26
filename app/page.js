'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    BookOpen, Star, Box, Youtube, Hand, Menu, X, 
    CheckCircle2, Cone, Cylinder, Scaling, Move3d, MousePointerClick
} from 'lucide-react';

// --- HELPER: LOAD THREE.JS ---
const useThreeScript = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (window.THREE) {
            setLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);
    }, []);
    return loaded;
};

// --- KOMPONEN 3D BOLA INTERAKTIF (WIREFRAME VERSION) ---
const InteractiveSphere = () => {
    const mountRef = useRef(null);
    const isThreeLoaded = useThreeScript();
    const [activeView, setActiveView] = useState('normal'); 
    const sceneRef = useRef(null);
    
    useEffect(() => {
        if (!isThreeLoaded || !mountRef.current) return;

        // 1. Setup Scene
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        const scene = new window.THREE.Scene();
        scene.background = new window.THREE.Color(0xf8fafc); 

        const camera = new window.THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.z = 6;

        const renderer = new window.THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.innerHTML = ''; 
        mountRef.current.appendChild(renderer.domElement);

        // 2. Objects Group
        const group = new window.THREE.Group();
        scene.add(group);

        // -- BOLA UTAMA (WIREFRAME / JARING-JARING) --
        // Kembali ke SphereGeometry dengan segmen lebih sedikit agar jaring-jaring terlihat jelas
        const geometry = new window.THREE.SphereGeometry(2, 32, 32); 
        const mainMaterial = new window.THREE.MeshBasicMaterial({ 
            color: 0x6366f1, // Indigo
            wireframe: true, // AKTIFKAN JARING-JARING
            transparent: true,
            opacity: 0.3
        });
        const mainSphere = new window.THREE.Mesh(geometry, mainMaterial);
        group.add(mainSphere);

        // -- SURFACE (SELIMUT - untuk highlight) --
        const surfaceMaterial = new window.THREE.MeshPhongMaterial({
            color: 0x3b82f6, 
            transparent: true,
            opacity: 0.0, 
            shininess: 100,
            side: window.THREE.DoubleSide
        });
        const surfaceMesh = new window.THREE.Mesh(geometry, surfaceMaterial);
        group.add(surfaceMesh);

        // -- CENTER POINT (TITIK PUSAT) --
        const centerGeo = new window.THREE.SphereGeometry(0.1, 16, 16);
        const centerMat = new window.THREE.MeshBasicMaterial({ color: 0xef4444 }); // Red
        const centerDot = new window.THREE.Mesh(centerGeo, centerMat);
        centerDot.visible = false;
        group.add(centerDot);

        // -- RADIUS LINE (JARI-JARI) --
        const radiusPoints = [new window.THREE.Vector3(0, 0, 0), new window.THREE.Vector3(2, 0, 0)];
        const radiusGeo = new window.THREE.BufferGeometry().setFromPoints(radiusPoints);
        const radiusLine = new window.THREE.Line(radiusGeo, new window.THREE.LineBasicMaterial({ color: 0xeab308, linewidth: 4 })); // Yellow
        radiusLine.visible = false;
        group.add(radiusLine);

        // -- DIAMETER LINE --
        const diameterPoints = [new window.THREE.Vector3(-2, 0, 0), new window.THREE.Vector3(2, 0, 0)];
        const diameterGeo = new window.THREE.BufferGeometry().setFromPoints(diameterPoints);
        const diameterLine = new window.THREE.Line(diameterGeo, new window.THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 4 })); // Green
        diameterLine.visible = false;
        group.add(diameterLine);

        // -- TALI BUSUR (CHORD) --
        const chordPoints = [
            new window.THREE.Vector3(-1.732, 1, 0), 
            new window.THREE.Vector3(1.732, 1, 0)
        ];
        const chordGeo = new window.THREE.BufferGeometry().setFromPoints(chordPoints);
        const chordLine = new window.THREE.Line(chordGeo, new window.THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 4 })); // Purple
        chordLine.visible = false;
        group.add(chordLine);

        // -- LIGHTING --
        const ambientLight = new window.THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new window.THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // 3. Refs & Animation Loop
        sceneRef.current = { 
            group, surfaceMesh, centerDot, radiusLine, diameterLine, chordLine,
            renderer, scene, camera 
        };

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const animate = () => {
            requestAnimationFrame(animate);
            if (!isDragging) {
                group.rotation.y += 0.002;
                group.rotation.x += 0.001;
            }
            renderer.render(scene, camera);
        };
        animate();

        // Event Handlers
        const onMouseDown = () => { isDragging = true; };
        const onMouseUp = () => { isDragging = false; };
        const onMouseMove = (e) => {
            if (isDragging) {
                const deltaMove = {
                    x: e.offsetX - previousMousePosition.x,
                    y: e.offsetY - previousMousePosition.y
                };
                group.rotation.y += deltaMove.x * 0.01;
                group.rotation.x += deltaMove.y * 0.01;
            }
            previousMousePosition = { x: e.offsetX, y: e.offsetY };
        };
        const onTouchStart = (e) => { 
            isDragging = true; 
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        };
        const onTouchMove = (e) => {
            if (isDragging) {
                const deltaMove = {
                    x: e.touches[0].clientX - previousMousePosition.x,
                    y: e.touches[0].clientY - previousMousePosition.y
                };
                group.rotation.y += deltaMove.x * 0.01;
                group.rotation.x += deltaMove.y * 0.01;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        const canvas = renderer.domElement;
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('touchstart', onTouchStart);
        canvas.addEventListener('touchend', onMouseUp);
        canvas.addEventListener('touchmove', onTouchMove);

        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', onMouseDown);
                canvas.removeEventListener('mouseup', onMouseUp);
                canvas.removeEventListener('mousemove', onMouseMove);
            }
        };
    }, [isThreeLoaded]);

    // Effect: View Logic
    useEffect(() => {
        if (!sceneRef.current) return;
        const { surfaceMesh, centerDot, radiusLine, diameterLine, chordLine } = sceneRef.current;

        // Reset visibility
        surfaceMesh.material.opacity = 0.0;
        centerDot.visible = false;
        radiusLine.visible = false;
        diameterLine.visible = false;
        chordLine.visible = false;

        switch (activeView) {
            case 'surface':
                surfaceMesh.material.opacity = 0.8;
                break;
            case 'center':
                centerDot.visible = true;
                break;
            case 'radius':
                centerDot.visible = true;
                radiusLine.visible = true;
                break;
            case 'diameter':
                diameterLine.visible = true;
                break;
            case 'chord':
                chordLine.visible = true;
                break;
            default:
                break;
        }
    }, [activeView]);

    return (
        <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-200">
            {/* Canvas Area */}
            <div className="relative w-full md:w-2/3 h-96 bg-slate-900 rounded-xl overflow-hidden cursor-move border border-slate-800" ref={mountRef}>
                {!isThreeLoaded && <div className="absolute inset-0 flex items-center justify-center text-slate-400">Memuat Laboratorium 3D...</div>}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm pointer-events-none flex items-center border border-white/20">
                    <Move3d className="w-3 h-3 mr-1"/> Putar Bola
                </div>
            </div>
            
            {/* Controls Area */}
            <div className="md:w-1/3 flex flex-col justify-center space-y-2">
                <h3 className="font-bold text-lg text-slate-800 mb-2 flex items-center"><MousePointerClick className="w-5 h-5 mr-2 text-indigo-500"/> Kontrol Unsur</h3>
                <p className="text-sm text-slate-500 mb-4">Klik tombol di bawah untuk melihat posisi unsur pada bangun ruang bola.</p>
                
                <button 
                    onClick={() => setActiveView('normal')}
                    className={`p-3 rounded-lg text-left transition-all font-medium text-sm border ${activeView === 'normal' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-indigo-50'}`}
                >
                    👁 Normal (Kerangka)
                </button>
                <button 
                    onClick={() => setActiveView('center')}
                    className={`p-3 rounded-lg text-left transition-all font-medium text-sm border ${activeView === 'center' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-red-50'}`}
                >
                    🔴 Titik Pusat
                </button>
                <button 
                    onClick={() => setActiveView('radius')}
                    className={`p-3 rounded-lg text-left transition-all font-medium text-sm border ${activeView === 'radius' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-yellow-50'}`}
                >
                    📏 Jari-jari (Radius)
                </button>
                <button 
                    onClick={() => setActiveView('diameter')}
                    className={`p-3 rounded-lg text-left transition-all font-medium text-sm border ${activeView === 'diameter' ? 'bg-green-500 text-white border-green-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-green-50'}`}
                >
                    📐 Diameter
                </button>
                <button 
                    onClick={() => setActiveView('chord')}
                    className={`p-3 rounded-lg text-left transition-all font-medium text-sm border ${activeView === 'chord' ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-purple-50'}`}
                >
                    ➖ Tali Busur
                </button>
                <button 
                    onClick={() => setActiveView('surface')}
                    className={`p-3 rounded-lg text-left transition-all font-medium text-sm border ${activeView === 'surface' ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-600 border-slate-200 hover:bg-blue-50'}`}
                >
                    🔵 Selimut Bola
                </button>
            </div>
        </div>
    );
};

// --- DATA SOAL (FLASHCARDS) ---
const flashcardsData = [
    { id: 1, tag: 'Soal 1', question: 'Diketahui sebuah bola memiliki jari-jari r = 7 cm. Tentukan luas permukaannya.', answer: 'L = 4πr² → L = 4 × (22/7) × 7² → L = 616 cm²', isHots: false },
    { id: 2, tag: 'Soal 2', question: 'Diketahui bola memiliki jari-jari r = 6 cm. Hitung volumenya (dalam π).', answer: 'V = (4/3)πr³ → V = (4/3)π(6)³ → V = 288π cm³', isHots: false },
    { id: 3, tag: 'Soal 3', question: 'Sebuah lampu berbentuk bola kaca memiliki luas permukaan 452.16 cm². Tentukan jari-jari lampu tersebut (Gunakan π = 3.14).', answer: 'r² = L/(4π) → r² = 452.16/(4 × 3.14) = 36 → r = √36 = 6 cm', isHots: false },
    { id: 4, tag: 'Soal 4', question: 'Jari-jari sebuah bola dinaikkan 20%. Berapa persentase kenaikan volume bola?', answer: 'Rasio jari-jari baru adalah 1.2. Karena volume sebanding dengan r³: (1.2)³ = 1.728. Kenaikan = 1.728 - 1 = 0.728. Jadi kenaikannya adalah 72.8%.', isHots: true },
    { id: 5, tag: 'Soal 5', question: 'Dua bola memiliki jari-jari 8 cm dan 12 cm. Tentukan perbandingan luas permukaan dan volumenya.', answer: 'Rasio r = 8:12 = 2:3. Rasio Luas (r²) = 2² : 3² = 4:9. Rasio Volume (r³) = 2³ : 3³ = 8:27.', isHots: false },
    { id: 6, tag: 'Soal 6', question: 'Sebuah bola logam besar (radius 15 cm) dilebur untuk dibuat bola-bola kecil dengan jari-jari 3 cm. Berapa banyak bola kecil yang dapat dibuat?', answer: 'N = (R/r)³ → N = (15/3)³ = 5³ = 125 bola', isHots: false },
];

// --- DATA VIDEO ---
const videoData = {
    unsurBola: { id: 'E2ko4Q5WMQU', title: 'Video: Penjelasan Unsur-unsur Bola' },
    luasPermukaan: { id: 'ZRo4r1Bu37E', title: 'Pembuktian Rumus Luas Permukaan Bola' },
    volumeBola: { id: 'Kivy-OnzSXo', title: 'Pembuktian Rumus Volume Bola' },
};

// --- KOMPONEN FLASHCARD ---
const Flashcard = React.memo(({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flipCard = useCallback(() => setIsFlipped(prev => !prev), []);
    return (
        <div className="h-80 cursor-pointer select-none group perspective-1000" onClick={flipCard}>
            <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-lg border border-indigo-50 p-8 flex flex-col justify-between bg-white group-hover:shadow-xl group-hover:border-indigo-200 transition-all">
                    <div><span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${card.isHots ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>{card.tag}</span><div className="font-medium text-slate-800 text-lg leading-relaxed">{card.question}</div></div>
                    <div className="flex items-center text-indigo-600 font-semibold text-sm bg-indigo-50 w-max px-4 py-2 rounded-full"><Hand className="w-4 h-4 mr-2" /> Ketuk untuk Jawaban</div>
                </div>
                <div className="absolute w-full h-full backface-hidden rounded-2xl shadow-xl border border-blue-200 p-6 flex flex-col items-center text-center bg-blue-50 rotate-y-180 overflow-y-auto">
                    <p className="font-bold text-lg mb-4 text-blue-700 border-b border-blue-200 pb-2 w-full">Penyelesaian</p>
                    <div className="text-sm text-slate-700 leading-loose w-full text-left font-mono bg-white/50 p-4 rounded-lg">{card.answer}</div>
                </div>
            </div>
        </div>
    );
});

// --- KOMPONEN VIDEO ---
const VideoEmbed = ({ videoId, title, isCompact = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return (
        <div className={`flex flex-col ${isCompact ? 'w-full' : 'justify-center items-center'} bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 w-full`}>
            <div className={`w-full relative pt-[56.25%] bg-slate-900 ${isLoaded ? '' : 'cursor-pointer group'}`} onClick={!isLoaded ? () => setIsLoaded(true) : null}>
                {isLoaded ? <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <><img src={thumbnailUrl} className="absolute top-0 left-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-300" alt="Thumbnail" /><div className="absolute top-0 left-0 w-full h-full bg-black/20 group-hover:bg-black/10 transition-all"></div><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl transition duration-300 group-hover:scale-110"><Youtube className="text-white w-8 h-8 ml-1" /></div></div></>}
            </div>
            {!isCompact && <div className="p-4 text-center bg-slate-50 w-full"><p className="text-sm font-semibold text-slate-700">{title}</p></div>}
        </div>
    );
};

// --- MAIN COMPONENT ---
const Page = () => { 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) { const y = el.getBoundingClientRect().top + window.pageYOffset - 80; window.scrollTo({top: y, behavior: 'smooth'}); }
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="bg-slate-50 text-slate-800 font-sans min-h-screen">
            <style>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .sphere-3d { width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #6366f1, #3b82f6, #1e3a8a); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), inset -10px -10px 20px rgba(0,0,0,0.2); animation: float 6s ease-in-out infinite; position: relative; }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                .sphere-wireframe { width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); position: absolute; top: 0; left: 0; }
                .sphere-wireframe::before { content: ''; position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: rgba(255,255,255,0.3); transform: translateY(-50%); }
                .sphere-wireframe::after { content: ''; position: absolute; left: 50%; top: 0; height: 100%; width: 1px; background: rgba(255,255,255,0.3); transform: translateX(-50%); }
                .equator { position: absolute; top: 50%; left: 5%; width: 90%; height: 20%; border: 1px dashed rgba(255,255,255,0.4); border-radius: 50%; transform: translateY(-50%); }
            `}</style>

            <nav className="bg-white/80 backdrop-blur-md text-indigo-900 sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3 font-black text-2xl tracking-tight"><div className="bg-indigo-600 text-white p-1.5 rounded-lg"><Box className="w-6 h-6" /></div><span>MathBola</span></div>
                        <div className="hidden lg:flex space-x-8">{['Home', 'Pengertian', 'Ciri Khusus', 'Simulasi', 'Hubungan', 'Rumus', 'Latihan'].map((item, idx) => (<button key={idx} onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, '-'))} className="text-sm font-bold uppercase tracking-wide hover:text-indigo-600 transition-colors">{item}</button>))}</div>
                        <div className="lg:hidden"><button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-indigo-900">{isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}</button></div>
                    </div>
                </div>
                {isMobileMenuOpen && <div className="lg:hidden bg-white border-t p-4 shadow-xl absolute w-full">{['Home', 'Pengertian', 'Ciri Khusus', 'Simulasi', 'Hubungan', 'Rumus', 'Latihan'].map(item => (<button key={item} onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, '-'))} className="block w-full text-left py-3 px-4 font-semibold hover:bg-indigo-50 rounded-lg text-indigo-900">{item}</button>))}</div>}
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-12 space-y-32">
                <section id="home" className="relative bg-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-400 to-purple-600"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 text-white space-y-8">
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"><span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span><span className="text-xs font-bold uppercase tracking-widest">Materi Matematika Kelas 9</span></div>
                            <h1 className="text-6xl md:text-7xl font-black leading-tight">Bangun Ruang <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">BOLA</span></h1>
                            <p className="text-indigo-100 text-lg leading-relaxed max-w-lg">Pelajari konsep, unsur, rumus volume & luas permukaan, serta hubungannya dengan bangun ruang lain secara interaktif.</p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button onClick={() => scrollToSection('pengertian')} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg">Mulai Belajar</button>
                                <button onClick={() => scrollToSection('simulasi')} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all backdrop-blur-sm">Simulasi 3D</button>
                            </div>
                        </div>
                        <div className="md:w-1/2 flex justify-center"><div className="sphere-3d"><div className="sphere-wireframe"></div><div className="equator"></div></div></div>
                    </div>
                </section>

                <section id="pengertian">
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/3">
                            <div className="sticky top-32">
                                <h2 className="text-4xl font-black text-slate-900 mb-6">Pengertian & <br/><span className="text-indigo-600">Unsur Bola</span></h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">Bola adalah bangun ruang sisi lengkung yang dibatasi oleh satu bidang lengkung, di mana setiap titik pada permukaannya berjarak sama dari titik pusat.</p>
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100"><VideoEmbed videoId={videoData.unsurBola.id} title="Video: Unsur-unsur Bola" /></div>
                            </div>
                        </div>
                        <div className="md:w-2/3 grid gap-4">{['Titik Pusat (P)', 'Jari-jari (r)', 'Diameter (d = 2r)', 'Sisi Lengkung (Selimut)', 'Tali Busur'].map((item, idx) => (<div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all flex items-center gap-4"><div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">{idx + 1}</div><h3 className="text-lg font-bold text-slate-800">{item}</h3></div>))}</div>
                    </div>
                </section>

                <section id="ciri-khusus" className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8"><div className="p-3 bg-yellow-100 rounded-xl text-yellow-600"><Star className="w-8 h-8" /></div><h2 className="text-3xl font-black text-slate-900">Ciri Khusus Bola</h2></div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="text-slate-700 space-y-6 text-lg leading-relaxed">
                                <p>Bola berbeda dengan tabung atau kerucut, sebab <span className="font-bold text-slate-900">bola tidak memiliki rusuk maupun titik sudut</span>.</p>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Setiap titik pada bidang lengkung bola memiliki jarak yang sama dari satu titik pusat, jarak tersebut disebut <span className="font-semibold text-indigo-600">jari-jari (r)</span>.</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Bidang lengkung yang terdiri atas titik-titik dengan jarak sama dari pusat dinamakan <span className="font-semibold text-indigo-600">selimut atau kulit bola</span>.</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Diameter (d) adalah ruas garis yang menghubungkan dua titik permukaan melalui pusat. Panjangnya selalu <span className="font-semibold text-indigo-600">dua kali jari-jari (d = 2r)</span>.</span></li>
                                </ul>
                            </div>
                            <div className="bg-yellow-50/50 p-8 rounded-2xl border border-yellow-100"><h3 className="font-bold text-yellow-800 mb-4 flex items-center"><Box className="w-5 h-5 mr-2"/> Contoh Benda Konkret</h3><div className="grid grid-cols-2 gap-4">{['Bumi', 'Kelereng', 'Bola Voli', 'Bola Basket'].map((benda, i) => (<div key={i} className="bg-white p-4 rounded-lg shadow-sm text-center font-medium text-slate-600 border border-yellow-100">{benda}</div>))}</div></div>
                        </div>
                    </div>
                </section>

                <section id="simulasi" className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto mb-6">
                        <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Interaktif</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Laboratorium Virtual 3D</h2>
                        <p className="text-slate-600 mt-4">Putar bola di bawah ini dan gunakan tombol untuk melihat unsur-unsurnya.</p>
                    </div>
                    <InteractiveSphere />
                </section>
    
                <section id="hubungan" className="space-y-8">
                    <div className="text-center max-w-2xl mx-auto mb-12"><span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Koneksi Geometri</span><h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Hubungan Bola dengan Bangun Ruang Lain</h2></div>
                    <div className="grid gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-orange-400 flex flex-col md:flex-row gap-8"><div className="md:w-1/3 flex flex-col items-center justify-center bg-orange-50 rounded-xl p-6"><Cone className="w-16 h-16 text-orange-500 mb-4" /><h3 className="text-xl font-bold text-orange-800">Volume vs Kerucut</h3></div><div className="md:w-2/3"><h4 className="text-lg font-bold text-slate-900 mb-3">Perbandingan Khusus</h4><p className="text-slate-600 mb-4 leading-relaxed">Setengah bola dengan jari-jari <em>r</em> memiliki volume yang sama dengan kerucut berjari-jari <em>r</em> dan tinggi <em>2r</em>.</p><div className="bg-orange-50 p-4 rounded-lg border border-orange-100 text-sm text-slate-700 space-y-2"><p>Jika jari-jari alas kerucut = r bola, dan tinggi kerucut = r bola:</p><p className="font-bold text-orange-700">Volume 1 Bola = 4 × Volume Kerucut</p></div></div></div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-blue-400 flex flex-col md:flex-row gap-8"><div className="md:w-1/3 flex flex-col items-center justify-center bg-blue-50 rounded-xl p-6"><Cylinder className="w-16 h-16 text-blue-500 mb-4" /><h3 className="text-xl font-bold text-blue-800">Volume vs Tabung</h3></div><div className="md:w-2/3"><h4 className="text-lg font-bold text-slate-900 mb-3">Rasio Volume 3 : 2</h4><p className="text-slate-600 mb-4 leading-relaxed">Jika bola dimasukkan pas ke dalam tabung (jari-jari tabung = r, tinggi tabung = diameter bola = 2r), maka:</p><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="bg-blue-50 p-4 rounded-lg border border-blue-100"><p className="font-semibold text-blue-900 mb-2">Rumus Dasar</p><p className="font-mono text-sm">V.Tabung = πr²(2r) = 2πr³</p><p className="font-mono text-sm">V.Bola = (4/3)πr³</p></div><div className="bg-blue-50 p-4 rounded-lg border border-blue-100"><p className="font-semibold text-blue-900 mb-2">Kesimpulan</p><p className="text-sm">Rasio Tabung : Bola = <span className="font-bold">3 : 2</span></p></div></div></div></div>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-l-8 border-green-400 flex flex-col md:flex-row gap-8"><div className="md:w-1/3 flex flex-col items-center justify-center bg-green-50 rounded-xl p-6"><Scaling className="w-16 h-16 text-green-500 mb-4" /><h3 className="text-xl font-bold text-green-800">Luas vs Tabung</h3></div><div className="md:w-2/3"><h4 className="text-lg font-bold text-slate-900 mb-3">Teorema Archimedes</h4><p className="text-slate-600 mb-4 leading-relaxed">Luas permukaan bola sama dengan luas selimut tabung, asalkan jari-jari sama (r) dan tinggi tabung sama dengan diameter bola (t = 2r).</p><div className="bg-green-50 p-4 rounded-lg border border-green-100 text-sm"><div className="flex justify-between items-center mb-2 pb-2 border-b border-green-200"><span>Luas Bola:</span><span className="font-mono font-bold">L = 4πr²</span></div><div className="flex justify-between items-center"><span>Luas Selimut Tabung (t=2r):</span><span className="font-mono font-bold">L = 2πrt = 2πr(2r) = 4πr²</span></div><div className="mt-3 p-2 bg-white/50 rounded text-center text-green-800 font-semibold">Terbukti: Luas Permukaan Bola = Luas Selimut Tabung</div></div></div></div>
                    </div>
                </section>
    
                <section id="rumus" className="bg-[#483d8b] rounded-3xl p-10 shadow-xl border border-indigo-800 text-white">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">Rumus</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative p-6 bg-[#5c54a0] rounded-2xl border border-indigo-500/30 flex flex-col items-center"><h3 className="text-lg font-medium text-indigo-100 mb-2">Luas permukaan bola</h3><p className="text-5xl font-serif font-medium mb-6 tracking-wide">L = 4πr²</p><div className="w-full rounded-xl overflow-hidden shadow-lg border border-indigo-400/20"><VideoEmbed videoId={videoData.luasPermukaan.id} title="Video: Penjelasan Luas Permukaan" isCompact={true} /></div></div>
                        <div className="relative p-6 bg-[#5c54a0] rounded-2xl border border-indigo-500/30 flex flex-col items-center"><h3 className="text-lg font-medium text-indigo-100 mb-2">Volume bola</h3><p className="text-5xl font-serif font-medium mb-6 tracking-wide">V = <span className="inline-flex flex-col text-3xl align-middle mr-1"><span className="border-b border-white">4</span><span>3</span></span>πr³</p><div className="w-full rounded-xl overflow-hidden shadow-lg border border-indigo-400/20"><VideoEmbed videoId={videoData.volumeBola.id} title="Video: Penjelasan Volume" isCompact={true} /></div></div>
                    </div>
                </section>
    
                <section id="latihan" className="space-y-8">
                    <div className="flex items-center gap-4"><div className="p-3 bg-red-100 rounded-xl text-red-600"><BookOpen className="w-8 h-8" /></div><h2 className="text-3xl font-black text-slate-900">Latihan Soal</h2></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{flashcardsData.map(card => (<Flashcard key={card.id} card={card} />))}</div>
                </section>
            </main>
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800"><div className="max-w-6xl mx-auto px-4 text-center"><p className="mb-4 text-white font-bold text-lg">MathBola Learning</p><p>&copy; 2024 Media Pembelajaran Interaktif. Dibuat dengan React & Tailwind.</p></div></footer>
        </div>
    );
};

export default Page;