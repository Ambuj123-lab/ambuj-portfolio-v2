import { useEffect, useRef } from 'react';

const CLUSTERS = [
    {
        id: 'ai', name: 'AI Orchestration', tag: '7 SKILLS',
        color: '#c87941', rgb: '200,121,65',
        coord: 'α·312°·R2',
        skills: [
            { name: 'LangGraph', proj: 'Legal AI · Citizen Safety AI' },
            { name: 'LangChain', proj: 'Both RAG Systems' },
            { name: 'LangFuse', proj: 'Production Observability' },
            { name: 'Parent-Child Chunking', proj: 'Legal AI · 10,833 chunks' },
            { name: 'RAG Pipelines', proj: 'Legal AI · Citizen Safety AI' },
            { name: 'Prompt Engineering', proj: 'Hogarth · All Projects' },
            { name: 'OpenRouter', proj: 'Qwen3 235B · DeepSeek R1' },
        ]
    },
    {
        id: 'vec', name: 'Vector DB', tag: '6 SKILLS',
        color: '#a78bfa', rgb: '167,139,250',
        coord: 'β·048°·R3',
        skills: [
            { name: 'Qdrant Cloud', proj: 'Legal AI · 768-dim vectors' },
            { name: 'Pinecone', proj: 'Citizen Safety AI' },
            { name: 'ChromaDB', proj: 'Free-tier RAG · 512MB RAM' },
            { name: 'SHA-256 Sync', proj: 'Zero orphaned vectors' },
            { name: 'Semantic Search', proj: 'Cosine similarity · top-15' },
            { name: 'Jina AI Embeddings', proj: 'Both RAG Systems' },
        ]
    },
    {
        id: 'sec', name: 'Security & Privacy', tag: '6 SKILLS',
        color: '#6fbf8e', rgb: '111,191,142',
        coord: 'γ·220°·R2',
        skills: [
            { name: 'MS Presidio', proj: 'PII Masking · GDPR' },
            { name: 'Google OAuth 2.0', proj: 'Legal AI Authentication' },
            { name: 'JWT Auth', proj: 'HS256 · 7-day expiry' },
            { name: 'spaCy NLP', proj: 'Aadhaar · Phone detection' },
            { name: 'Circuit Breaker', proj: 'pybreaker · fail_max=10' },
            { name: 'Rate Limiting', proj: 'SlowAPI · 5–20 req/min' },
        ]
    },
    {
        id: 'dep', name: 'Deployment & Ops', tag: '7 SKILLS',
        color: '#e8956a', rgb: '232,149,106',
        coord: 'δ·135°·R3',
        skills: [
            { name: 'FastAPI', proj: 'Both RAG Backends' },
            { name: 'Docker', proj: 'Multi-stage · Koyeb' },
            { name: 'Supabase', proj: 'Storage · Postgres Registry' },
            { name: 'MongoDB Atlas', proj: 'Chat history · GDPR TTL' },
            { name: 'Upstash Redis', proj: 'Caching · Session analytics' },
            { name: 'LLMOps', proj: 'Langfuse · Health endpoints' },
            { name: 'React + Vite', proj: 'Both Frontends' },
        ]
    }
];

const CONN_PAIRS: [string, string][] = [
    ['ai', 'vec'], ['ai', 'sec'], ['ai', 'dep'],
    ['vec', 'dep'], ['sec', 'dep'], ['vec', 'sec']
];

export default function SkillUniverse({ isDarkMode = true }: { isDarkMode?: boolean }) {
    const starsRef = useRef<HTMLCanvasElement>(null);
    const connectRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Stars + Meteors ──────────────────────────────────────────────────────
    useEffect(() => {
        const sc = starsRef.current;
        if (!sc) return;
        const sctx = sc.getContext('2d')!;
        type Star = { x: number; y: number; r: number; a: number; tw: number; spd: number };
        type Meteor = { x: number; y: number; vx: number; vy: number; len: number; alpha: number; w: number };
        let stars: Star[] = [];
        let meteors: Meteor[] = [];
        let stTime = 0;
        let raf = 0;

        function buildStars() {
            sc!.width = sc!.offsetWidth;
            sc!.height = sc!.offsetHeight;
            stars = [];
            for (let i = 0; i < 260; i++) {
                stars.push({
                    x: Math.random() * sc!.width, y: Math.random() * sc!.height,
                    r: Math.random() * 0.9 + 0.1, a: Math.random() * 0.45 + 0.08,
                    tw: Math.random() * Math.PI * 2, spd: Math.random() * 0.7 + 0.2
                });
            }
        }

        function spawnMeteor() {
            meteors.push({
                x: Math.random() * sc!.width * 1.3, y: Math.random() * sc!.height * 0.25 - 30,
                vx: -(Math.random() * 5 + 3), vy: Math.random() * 4 + 2,
                len: Math.random() * 120 + 50, alpha: 0.9, w: Math.random() * 1.2 + 0.3
            });
        }
        const t1 = setTimeout(spawnMeteor, 700);
        const t2 = setTimeout(spawnMeteor, 1900);
        const ti = setInterval(spawnMeteor, 2700);

        function animate() {
            stTime += 0.009;
            sctx.clearRect(0, 0, sc!.width, sc!.height);
            // Background adapts to dark/light mode
            sctx.fillStyle = isDarkMode ? '#0e0d0c' : '#f4f2ee';
            sctx.fillRect(0, 0, sc!.width, sc!.height);

            // Nebulas
            ([
                { x: sc!.width * 0.25, y: sc!.height * 0.55, rgb: '200,121,65', a: 0.045, r: sc!.width * 0.26 },
                { x: sc!.width * 0.75, y: sc!.height * 0.55, rgb: '167,139,250', a: 0.045, r: sc!.width * 0.26 },
                { x: sc!.width * 0.25, y: sc!.height * 0.82, rgb: '111,191,142', a: 0.038, r: sc!.width * 0.23 },
                { x: sc!.width * 0.75, y: sc!.height * 0.82, rgb: '232,149,106', a: 0.038, r: sc!.width * 0.23 },
            ] as { x: number; y: number; rgb: string; a: number; r: number }[]).forEach(n => {
                const g = sctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
                g.addColorStop(0, `rgba(${n.rgb},${n.a})`);
                g.addColorStop(0.5, `rgba(${n.rgb},${n.a * 0.22})`);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                sctx.fillStyle = g; sctx.fillRect(0, 0, sc!.width, sc!.height);
            });

            // Stars
            stars.forEach(s => {
                const tw = 0.45 + 0.55 * Math.sin(stTime * s.spd + s.tw);
                sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                // In light mode stars are darker dots
                const starColor = isDarkMode ? `rgba(245,240,235,${s.a * tw})` : `rgba(28,28,28,${s.a * tw * 0.6})`;
                sctx.fillStyle = starColor; sctx.fill();
            });

            // Meteors
            meteors = meteors.filter(m => m.alpha > 0.03);
            meteors.forEach(m => {
                const ang = Math.atan2(m.vy, m.vx);
                const tx = m.x - Math.cos(ang) * m.len, ty = m.y - Math.sin(ang) * m.len;
                const mg = sctx.createLinearGradient(tx, ty, m.x, m.y);
                mg.addColorStop(0, 'rgba(245,240,235,0)');
                mg.addColorStop(0.6, `rgba(245,240,235,${m.alpha * 0.3})`);
                mg.addColorStop(1, `rgba(245,240,235,${m.alpha})`);
                sctx.beginPath(); sctx.moveTo(tx, ty); sctx.lineTo(m.x, m.y);
                sctx.strokeStyle = mg; sctx.lineWidth = m.w; sctx.stroke();
                sctx.beginPath(); sctx.arc(m.x, m.y, m.w * 1.5, 0, Math.PI * 2);
                const meteorColor = isDarkMode ? `rgba(245,240,235,${m.alpha * 0.85})` : `rgba(28,28,28,${m.alpha * 0.5})`;
                sctx.fillStyle = meteorColor; sctx.fill();
                m.x += m.vx; m.y += m.vy; m.alpha -= 0.011;
                if (m.x < -200 || m.y > sc!.height + 100) m.alpha = 0;
            });
            raf = requestAnimationFrame(animate);
        }

        buildStars();
        animate();

        const ro = new ResizeObserver(() => buildStars());
        if (sc.parentElement) ro.observe(sc.parentElement);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(t1); clearTimeout(t2); clearInterval(ti);
            ro.disconnect();
        };
    }, []);

    // ── Connection lines ─────────────────────────────────────────────────────
    useEffect(() => {
        const cc = connectRef.current;
        if (!cc) return;
        const cctx = cc.getContext('2d')!;
        let raf2 = 0;

        const parts = CONN_PAIRS.map(([a, b]) => ({
            a, b, t: Math.random(), speed: 0.0015 + Math.random() * 0.001,
            alpha: 0.5 + Math.random() * 0.4
        }));

        function getCenter(id: string) {
            const el = containerRef.current?.querySelector(`[data-c="${id}"]`);
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const cr = cc!.getBoundingClientRect();
            return { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height / 2 };
        }

        function animateConnect() {
            cc!.width = cc!.offsetWidth; cc!.height = cc!.offsetHeight;
            cctx.clearRect(0, 0, cc!.width, cc!.height);

            CONN_PAIRS.forEach(([a, b]) => {
                const ca = getCenter(a), cb = getCenter(b);
                if (!ca || !cb) return;
                cctx.beginPath(); cctx.moveTo(ca.x, ca.y); cctx.lineTo(cb.x, cb.y);
                cctx.strokeStyle = 'rgba(245,240,235,0.04)'; cctx.lineWidth = 0.6; cctx.stroke();
            });

            parts.forEach(p => {
                const ca = getCenter(p.a), cb = getCenter(p.b);
                if (!ca || !cb) return;
                p.t = (p.t + p.speed) % 1;
                const x = ca.x + (cb.x - ca.x) * p.t;
                const y = ca.y + (cb.y - ca.y) * p.t;
                const clA = CLUSTERS.find(c => c.id === p.a)!;
                const dg = cctx.createRadialGradient(x, y, 0, x, y, 6);
                dg.addColorStop(0, `rgba(${clA.rgb},${p.alpha})`);
                dg.addColorStop(1, 'rgba(0,0,0,0)');
                cctx.fillStyle = dg; cctx.beginPath(); cctx.arc(x, y, 6, 0, Math.PI * 2); cctx.fill();
                cctx.beginPath(); cctx.arc(x, y, 2, 0, Math.PI * 2);
                cctx.fillStyle = clA.color; cctx.fill();
            });
            raf2 = requestAnimationFrame(animateConnect);
        }

        const tid = setTimeout(animateConnect, 900);
        return () => { cancelAnimationFrame(raf2); clearTimeout(tid); };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-2xl"
            style={{
                background: isDarkMode ? '#0e0d0c' : '#f4f2ee',
                minHeight: 'clamp(500px, 45vw, 680px)',
                fontFamily: "'Inter', sans-serif",
                border: isDarkMode ? 'none' : '1px solid rgba(28,28,28,0.08)',
            }}
        >
            {/* ── Canvas layers ── */}
            <canvas ref={starsRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
            <canvas ref={connectRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 2, pointerEvents: 'none' }} />

            {/* ── Header ── */}
            <div className="relative z-20 flex flex-wrap justify-between items-start px-4 sm:px-6 pt-5 pb-2 gap-3">
                <div>
                    <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(18px,3vw,26px)', letterSpacing: '4px', color: isDarkMode ? '#f5f0eb' : '#1C1C1C', lineHeight: 1 }}>
                        Ambuj Kumar Tripathi
                    </h2>
                    <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: isDarkMode ? 'rgba(245,240,235,0.35)' : 'rgba(28,28,28,0.45)', letterSpacing: '2px', marginTop: '4px' }}>
                        skill universe · 4 clusters · 26 skills
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    {[
                        { n: '8,896', l: 'CHILD VECTORS', c: '#c87941' },
                        { n: '768', l: 'DIMENSIONS', c: '#a78bfa' },
                        { n: '300K', l: 'TOKENS SAVED', c: '#6fbf8e' },
                    ].map(s => (
                        <div key={s.l} className="text-right">
                            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(14px,2vw,20px)', lineHeight: 1, color: s.c }}>{s.n}</div>
                            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', color: isDarkMode ? 'rgba(245,240,235,0.4)' : 'rgba(28,28,28,0.45)', letterSpacing: '1.5px', marginTop: '2px' }}>{s.l}</div>
                        </div>
                    ))}
                    {/* Live pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(111,191,142,0.35)', background: 'rgba(111,191,142,0.07)', padding: '5px 12px', borderRadius: '100px', fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', color: '#6fbf8e', letterSpacing: '1.5px' }}>
                        <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0 }}>
                            <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6fbf8e', opacity: 0.6 }} />
                            <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#6fbf8e' }} />
                        </span>
                        LIVE
                    </div>
                </div>
            </div>

            {/* ── Grid of 4 quads: 1 col mobile, 2 col sm+ ── */}
            <div
                className="relative z-10 grid grid-cols-1 sm:grid-cols-2"
            >
                {CLUSTERS.map((cl, idx) => (
                    <Quad key={cl.id} cl={cl} animDelay={[0.2, 0.35, 0.5, 0.65][idx]} isDarkMode={isDarkMode} />
                ))}
            </div>
        </div>
    );
}


function Quad({ cl, animDelay, isDarkMode = true }: { cl: typeof CLUSTERS[0]; animDelay: number; isDarkMode?: boolean }) {
    const [hoveredSkill, setHoveredSkill] = React.useState<{ name: string; proj: string } | null>(null);

    return (
        <div
            data-c={cl.id}
            className="relative flex flex-col items-center justify-start overflow-hidden group"
            style={{
                border: isDarkMode ? '1px solid rgba(245,240,235,0.03)' : '1px solid rgba(28,28,28,0.05)',
                padding: 'clamp(6px,1.5vw,16px) clamp(6px,1.5vw,18px)',
                minHeight: 'clamp(160px,22vw,280px)',
                transition: 'border-color 0.4s',
            }}
        >
            {/* Scan line */}
            <div style={{
                position: 'absolute', left: 0, right: 0, height: '1px', pointerEvents: 'none',
                background: `linear-gradient(to right,transparent,rgba(${cl.rgb},0.3),transparent)`,
                animation: `scan-sweep-${cl.id} 6s ease-in-out ${animDelay * 3}s infinite`,
                opacity: 0,
            }} />

            {/* Corner tags */}
            <span style={{ position: 'absolute', top: 10, left: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', letterSpacing: '1px', color: `rgba(${cl.rgb},0.4)` }}>{cl.coord}</span>
            <span style={{ position: 'absolute', top: 10, right: 10, fontFamily: "'JetBrains Mono',monospace", fontSize: '7px', letterSpacing: '1px', color: `rgba(${cl.rgb},0.4)`, textAlign: 'right' }}>{cl.skills.length}×NODES</span>

            {/* Orb */}
            <div style={{ position: 'relative', width: 'clamp(44px,6vw,68px)', height: 'clamp(44px,6vw,68px)', margin: '8px auto 10px', animation: `float 4.5s ease-in-out ${animDelay}s infinite` }}>
                <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `radial-gradient(circle at 35% 35%,rgba(255,255,255,0.1),rgba(${cl.rgb},0.05))`,
                    boxShadow: `0 0 40px rgba(${cl.rgb},0.15)`,
                    transition: 'transform 0.35s',
                }}>
                    <div style={{
                        width: '60%', height: '60%', borderRadius: '50%',
                        background: `radial-gradient(circle at 35% 35%,rgba(255,255,255,0.88),${cl.color})`,
                        boxShadow: `0 0 16px rgba(${cl.rgb},0.65),0 0 32px rgba(${cl.rgb},0.3)`,
                        animation: 'glow-breathe 3s ease-in-out infinite',
                    }} />
                </div>
            </div>

            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(13px,1.6vw,18px)', letterSpacing: '3px', color: cl.color, textAlign: 'center', lineHeight: 1, marginBottom: '3px' }}>{cl.name.toUpperCase()}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '8px', color: 'rgba(245,240,235,0.35)', letterSpacing: '1.5px', marginBottom: '10px' }}>{cl.tag}</div>

            {/* Skills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center', maxWidth: '100%' }}>
                {cl.skills.map(sk => (
                    <span
                        key={sk.name}
                        onMouseEnter={() => setHoveredSkill(sk)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                            padding: '3px 10px', borderRadius: '100px',
                            fontSize: 'clamp(8px,1vw,10px)', fontWeight: 500, letterSpacing: '0.2px',
                            border: `1px solid rgba(${cl.rgb},0.28)`,
                            color: `rgba(${cl.rgb},0.85)`,
                            background: 'transparent', cursor: 'default', whiteSpace: 'nowrap',
                            transition: 'background 0.2s,border-color 0.2s,transform 0.2s',
                        }}
                        onPointerOver={e => {
                            (e.currentTarget as HTMLElement).style.background = `rgba(${cl.rgb},0.12)`;
                            (e.currentTarget as HTMLElement).style.borderColor = `rgba(${cl.rgb},0.75)`;
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.07)';
                        }}
                        onPointerOut={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.borderColor = `rgba(${cl.rgb},0.28)`;
                            (e.currentTarget as HTMLElement).style.transform = 'none';
                        }}
                    >
                        {sk.name}
                    </span>
                ))}
            </div>

            {/* Detail tooltip */}
            {hoveredSkill && (
                <div style={{
                    position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(14,13,12,0.97)', border: `1px solid rgba(${cl.rgb},0.25)`,
                    borderRadius: '8px', padding: '8px 14px', backdropFilter: 'blur(24px)',
                    textAlign: 'center', whiteSpace: 'nowrap', zIndex: 30, pointerEvents: 'none',
                    boxShadow: `0 0 20px rgba(${cl.rgb},0.1)`,
                }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: cl.color, marginBottom: '3px' }}>{hoveredSkill.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: 'rgba(245,240,235,0.45)', letterSpacing: '0.3px' }}>Used in: <b style={{ color: 'rgba(245,240,235,0.75)', fontWeight: 400 }}>{hoveredSkill.proj}</b></div>
                </div>
            )}
        </div>
    );
}

// Need React for useState in Quad
import React from 'react';
