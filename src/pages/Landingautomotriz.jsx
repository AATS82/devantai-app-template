import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: AUTOMOTRIZ
// Personalización via props: negocio, servicios, contacto, tema
// ============================================================

const DEFAULT_DATA = {
    nombre: "{{NOMBRE_NEGOCIO}}",
    slogan: "{{SLOGAN}}",
    descripcion: "{{DESCRIPCION}}",
    ciudad: "{{CIUDAD}}",
    telefono: "{{TELEFONO}}",
    email: "{{EMAIL}}",
    horario: "{{HORARIO}}",
    anos_experiencia: "{{ANOS}}",
    clientes_atendidos: "{{CLIENTES}}",
    servicios: [
        { titulo: "{{SERVICIO_1}}", descripcion: "{{DESC_1}}", icon: "wrench" },
        { titulo: "{{SERVICIO_2}}", descripcion: "{{DESC_2}}", icon: "car" },
        { titulo: "{{SERVICIO_3}}", descripcion: "{{DESC_3}}", icon: "shield" },
        { titulo: "{{SERVICIO_4}}", descripcion: "{{DESC_4}}", icon: "zap" },
    ],
    testimonios: [
        { nombre: "{{TESTIM_1_NOMBRE}}", cargo: "{{TESTIM_1_CARGO}}", texto: "{{TESTIM_1_TEXTO}}" },
        { nombre: "{{TESTIM_2_NOMBRE}}", cargo: "{{TESTIM_2_CARGO}}", texto: "{{TESTIM_2_TEXTO}}" },
        { nombre: "{{TESTIM_3_NOMBRE}}", cargo: "{{TESTIM_3_CARGO}}", texto: "{{TESTIM_3_TEXTO}}" },
    ],
};

// SVG Icons
const Icons = {
    wrench: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    car: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 16H9m10 0h3v-3.15a2 2 0 0 0-1.588-1.948l-2.074-.414a2 2 0 0 1-1.494-1.304L15 6H9L7.156 10.184a2 2 0 0 1-1.494 1.304l-2.074.414A2 2 0 0 0 2 13.85V16h3" />
            <circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
    ),
    shield: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    zap: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    phone: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    map: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    ),
    clock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    star: (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
    menu: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
    x: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    whatsapp: (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
    ),
};

function useIntersection(ref, threshold = 0.15) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return visible;
}

function AnimatedSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const visible = useIntersection(ref);
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function LandingAutomotriz({ data = DEFAULT_DATA, onEnter }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = data.nombre.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${data.telefono?.replace(/\D/g, "")}`;

    return (
        <div style={{ fontFamily: "'Barlow', sans-serif", background: "#0c0c0e", color: "#f0f0f0", overflowX: "hidden" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        :root {
          --red: #e63329;
          --red-dark: #b52820;
          --gold: #f5a623;
          --bg: #0c0c0e;
          --bg2: #111114;
          --bg3: #18181c;
          --border: rgba(255,255,255,0.07);
          --text: #f0f0f0;
          --muted: #888;
        }
        .condensed { font-family: 'Barlow Condensed', sans-serif; }
        .nav-link { cursor: pointer; color: rgba(255,255,255,0.75); font-weight:500; font-size:0.95rem; transition: color 0.2s; letter-spacing:0.03em; }
        .nav-link:hover { color: #fff; }
        .btn-red { background: var(--red); color: #fff; border: none; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
        .btn-red:hover { background: var(--red-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(230,51,41,0.35); }
        .btn-outline { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4); cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
        .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
        .service-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 2px; overflow: hidden; transition: all 0.3s; }
        .service-card:hover { border-color: var(--red); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
        .service-card:hover .card-accent { width: 100%; }
        .card-accent { height: 3px; background: var(--red); width: 0; transition: width 0.4s ease; }
        .testim-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 2px; padding: 2rem; transition: border-color 0.3s; }
        .testim-card:hover { border-color: rgba(245,166,35,0.4); }
        .why-item { display: flex; gap: 1.25rem; align-items: flex-start; padding: 1.5rem; border-left: 3px solid transparent; transition: border-color 0.3s, background 0.3s; }
        .why-item:hover { border-color: var(--red); background: rgba(230,51,41,0.05); }
        .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .divider-line { flex: 1; height: 1px; background: var(--border); }
        .divider-dot { width: 6px; height: 6px; background: var(--red); transform: rotate(45deg); }
        a { text-decoration: none; color: inherit; }
        input, textarea { background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: 'Barlow', sans-serif; font-size: 0.95rem; padding: 0.85rem 1rem; width: 100%; outline: none; border-radius: 2px; transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: var(--red); }
        textarea { resize: vertical; min-height: 120px; }
        @media (max-width: 768px) {
          .mobile-menu { display: flex !important; }
          .desktop-nav { display: none !important; }
          .hero-title { font-size: 3.2rem !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1rem 2rem",
                background: scrolled ? "rgba(12,12,14,0.97)" : "transparent",
                borderBottom: scrolled ? "1px solid var(--border)" : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{
                        width: 40, height: 40, background: "var(--red)", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1rem",
                        letterSpacing: "0.05em", color: "#fff",
                    }}>{iniciales}</div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {data.nombre}
                    </span>
                </div>

                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-red" style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem", borderRadius: "2px" }} onClick={() => scrollTo("contacto")}>
                        Cotizar Ahora
                    </button>
                </div>

                <button style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }}
                    className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div style={{
                    position: "fixed", top: 65, left: 0, right: 0, zIndex: 999,
                    background: "rgba(12,12,14,0.98)", borderBottom: "1px solid var(--border)",
                    padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem"
                }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.1rem" }}>{s}</span>
                    ))}
                    <button className="btn-red" style={{ padding: "0.8rem", fontSize: "0.9rem", borderRadius: "2px" }} onClick={() => scrollTo("contacto")}>
                        Cotizar Ahora
                    </button>
                </div>
            )}

            {/* ── HERO ── */}
            <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* Background */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "url('https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=1800&q=80')",
                    backgroundSize: "cover", backgroundPosition: "center",
                    filter: "brightness(0.35)",
                }} />
                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,12,14,0.85) 0%, rgba(230,51,41,0.15) 100%)" }} />
                {/* Diagonal accent */}
                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
                    background: "linear-gradient(to bottom right, transparent 49%, #0c0c0e 50%)",
                }} />

                <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 780, zIndex: 1 }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        background: "rgba(230,51,41,0.15)", border: "1px solid rgba(230,51,41,0.4)",
                        padding: "0.4rem 1rem", borderRadius: "2px", marginBottom: "1.5rem",
                        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                        fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#f5a623",
                    }}>
                        ★ {data.anos_experiencia} años de experiencia ★
                    </div>

                    <h1 className="condensed hero-title" style={{
                        fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800,
                        lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem",
                        textTransform: "uppercase",
                    }}>
                        {data.nombre}
                    </h1>

                    <p style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.8)",
                        marginBottom: "2.5rem", fontWeight: 400, maxWidth: 580, margin: "0 auto 2.5rem",
                        lineHeight: 1.6,
                    }}>
                        {data.slogan || data.descripcion}
                    </p>

                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-red" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "2px" }} onClick={() => scrollTo("contacto")}>
                            Solicitar Cotización
                        </button>
                        <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "2px" }} onClick={() => scrollTo("servicios")}>
                            Ver Servicios
                        </button>
                    </div>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <section style={{ background: "var(--red)", padding: "2rem" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto", textAlign: "center", gap: "1rem" }}>
                    {[
                        { n: data.anos_experiencia, l: "Años de experiencia" },
                        { n: data.clientes_atendidos, l: "Clientes atendidos" },
                        { n: "98%", l: "Satisfacción" },
                        { n: "24h", l: "Respuesta garantizada" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="condensed" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.85, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: "'Barlow Condensed'", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.5rem" }}>Lo que hacemos</p>
                        <h2 className="condensed" style={{ textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "3.5rem" }}>
                            Nuestros Servicios
                        </h2>
                    </AnimatedSection>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
                        {data.servicios.map((s, i) => (
                            <AnimatedSection key={i} delay={i * 100}>
                                <div className="service-card">
                                    <div className="card-accent" />
                                    <div style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                                        <div style={{
                                            width: 52, height: 52, minWidth: 52, background: "rgba(230,51,41,0.12)",
                                            border: "1px solid rgba(230,51,41,0.3)", display: "flex",
                                            alignItems: "center", justifyContent: "center", color: "var(--red)",
                                        }}>
                                            <span style={{ width: 24, height: 24 }}>{Icons[s.icon] || Icons.wrench}</span>
                                        </div>
                                        <div>
                                            <h3 className="condensed" style={{ fontSize: "1.3rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.5rem" }}>{s.titulo}</h3>
                                            <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS ── */}
            <section id="nosotros" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ fontFamily: "'Barlow Condensed'", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.5rem" }}>Por qué elegirnos</p>
                        <h2 className="condensed" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                            Calidad y confianza en cada trabajo
                        </h2>
                        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
                            {data.descripcion}
                        </p>
                        <button className="btn-red" style={{ padding: "0.9rem 2rem", fontSize: "0.9rem", borderRadius: "2px" }} onClick={() => scrollTo("contacto")}>
                            Contáctanos hoy
                        </button>
                    </AnimatedSection>

                    <AnimatedSection delay={150}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {[
                                { t: "Garantía en todos los servicios", d: "Respaldamos cada trabajo con garantía escrita." },
                                { t: "Técnicos certificados", d: "Personal con formación y certificación actualizada." },
                                { t: "Repuestos originales", d: "Solo usamos piezas de calidad comprobada." },
                                { t: "Presupuesto sin costo", d: "Diagnóstico y cotización completamente gratuita." },
                            ].map((item, i) => (
                                <div key={i} className="why-item">
                                    <div style={{ width: 28, height: 28, minWidth: 28, color: "var(--red)", marginTop: 2 }}>{Icons.check}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{item.t}</div>
                                        <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{item.d}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: "'Barlow Condensed'", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.5rem" }}>Clientes</p>
                        <h2 className="condensed" style={{ textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "3.5rem" }}>
                            Lo que dicen de nosotros
                        </h2>
                    </AnimatedSection>

                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                        {data.testimonios.map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div className="testim-card">
                                    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem", color: "var(--gold)" }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16 }}>{Icons.star}</span>)}
                                    </div>
                                    <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem", fontStyle: "italic" }}>
                                        "{t.texto}"
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <div style={{
                                            width: 40, height: 40, background: "var(--red)", display: "flex",
                                            alignItems: "center", justifyContent: "center",
                                            fontFamily: "'Barlow Condensed'", fontWeight: 800, fontSize: "1rem",
                                        }}>
                                            {t.nombre.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{t.nombre}</div>
                                            <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{t.cargo}</div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ── */}
            <section id="contacto" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: "'Barlow Condensed'", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--red)", marginBottom: "0.5rem" }}>Contacto</p>
                        <h2 className="condensed" style={{ textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "3.5rem" }}>
                            Hablemos de tu vehículo
                        </h2>
                    </AnimatedSection>

                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: data.telefono },
                                    { icon: "map", label: "Dirección", value: data.ciudad },
                                    { icon: "clock", label: "Horario", value: data.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", background: "var(--bg3)", border: "1px solid var(--border)" }}>
                                        <div style={{ width: 42, height: 42, minWidth: 42, background: "rgba(230,51,41,0.12)", border: "1px solid rgba(230,51,41,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red)" }}>
                                            <span style={{ width: 20, height: 20 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.25rem" }}>{item.label}</div>
                                            <div style={{ fontWeight: 500 }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}

                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontFamily: "'Barlow Condensed'", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "1rem", transition: "background 0.2s", borderRadius: "2px" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    Escribir por WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={150}>
                            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "2.5rem" }}>
                                <h3 className="condensed" style={{ fontSize: "1.4rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1.5rem" }}>Envíanos un mensaje</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Tu nombre" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="Marca y modelo del vehículo" />
                                    <textarea placeholder="Describe el problema o servicio que necesitas..." />
                                    <button className="btn-red" style={{ padding: "1rem", fontSize: "1rem", borderRadius: "2px", width: "100%" }}>
                                        Enviar Mensaje
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#080809", borderTop: "1px solid var(--border)", padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)", marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 36, height: 36, background: "var(--red)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed'", fontWeight: 800 }}>{iniciales}</div>
                            <span className="condensed" style={{ fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{data.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: "var(--muted)", fontSize: "0.9rem", textTransform: "capitalize", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = "#fff"}
                                    onMouseOut={e => e.currentTarget.style.color = "var(--muted)"}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>© {new Date().getFullYear()} {data.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {/* ── BOTÓN ENTRAR ── */}
            {onEnter && (
                <button
                    onClick={onEnter}
                    style={{
                        position: "fixed", bottom: "2rem", right: "2rem",
                        background: "var(--red)", color: "#fff",
                        padding: "0.9rem 1.75rem", border: "none", cursor: "pointer",
                        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                        fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase",
                        zIndex: 9999, boxShadow: "0 4px 20px rgba(230,51,41,0.4)",
                        borderRadius: "2px",
                    }}
                >
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}