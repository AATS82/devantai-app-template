import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: ARQUITECTURA
// Perfil: elegante_premium | Tema: light/dark
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
    tema: "light",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    color_primario: "#8b7355",
    color_secundario: "#a0826d",
    font_titulo: "Cormorant Garamond",
    font_cuerpo: "Lato",
    imagen_hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1551632786-de41ec802fcb?w=800&q=80",
    servicios: [
        { titulo: "{{SERVICIO_1}}", descripcion: "{{DESC_1}}", icon: "blueprint" },
        { titulo: "{{SERVICIO_2}}", descripcion: "{{DESC_2}}", icon: "building" },
        { titulo: "{{SERVICIO_3}}", descripcion: "{{DESC_3}}", icon: "palette" },
        { titulo: "{{SERVICIO_4}}", descripcion: "{{DESC_4}}", icon: "hammer" },
    ],
    testimonios: [
        { nombre: "{{TESTIM_1_NOMBRE}}", cargo: "{{TESTIM_1_CARGO}}", texto: "{{TESTIM_1_TEXTO}}" },
        { nombre: "{{TESTIM_2_NOMBRE}}", cargo: "{{TESTIM_2_CARGO}}", texto: "{{TESTIM_2_TEXTO}}" },
        { nombre: "{{TESTIM_3_NOMBRE}}", cargo: "{{TESTIM_3_CARGO}}", texto: "{{TESTIM_3_TEXTO}}" },
    ],
};

// SVG Icons para Arquitectura
const Icons = {
    blueprint: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /><circle cx="6.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="17.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="17.5" r="0.5" fill="currentColor" /></svg>),
    building: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 3 20 7.5 20 19.5 4 19.5 4 7.5 12 3" /><polyline points="9 12 9 19" /><polyline points="15 12 15 19" /><polyline points="9 12 15 12" /><line x1="12" y1="3" x2="12" y2="7.5" /><rect x="7" y="12" width="2" height="2" /><rect x="15" y="12" width="2" height="2" /><rect x="7" y="15" width="2" height="2" /><rect x="15" y="15" width="2" height="2" /></svg>),
    palette: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="8" cy="9" r="1.5" fill="currentColor" /><circle cx="16" cy="9" r="1.5" fill="currentColor" /><circle cx="8" cy="15" r="1.5" fill="currentColor" /><circle cx="16" cy="15" r="1.5" fill="currentColor" /><circle cx="12" cy="6" r="1.5" fill="currentColor" /><path d="M12 18c2.2 0 3-1.8 3-3" /></svg>),
    hammer: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3l4 4m-10.5 6.5l7-7M6 18c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2m12-6l-4 4" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
    arrow: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>),
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
        <div ref={ref} className={className} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        }}>
            {children}
        </div>
    );
}

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `${r},${g},${b}`;
}

// ── HERO VARIANTS ──

function HeroCentered({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: isDark ? "brightness(0.4)" : "brightness(0.9)" }} />
            <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(${primaryRgb},0.1) 100%)` : `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(${primaryRgb},0.05) 100%)` }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 2rem", maxWidth: 780, zIndex: 1 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 400, fontStyle: "italic" }}>
                    {d.anos_experiencia} años creando espacios únicos
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 1, background: primary, margin: "2rem auto" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", color: MUTED, maxWidth: 580, margin: "0 auto 3rem", lineHeight: 1.8, fontWeight: 300 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", borderRadius: "0", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("contacto")}>Solicitar Consulta</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", borderRadius: "0", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("servicios")}>Explorar Proyectos</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, isDark, BG, TEXT, MUTED, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 5rem 4rem", background: BG, zIndex: 1 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 400, fontStyle: "italic" }}>
                    Estudio de arquitectura
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 40, height: 1, background: primary, marginBottom: "2rem" }} />
                <p style={{ fontSize: "1.1rem", color: MUTED, marginBottom: "3rem", lineHeight: 1.8, maxWidth: 420, fontWeight: 300 }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("contacto")}>Solicitar Consulta</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 30%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, isDark, BG, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `1px solid ${BORDER}`, overflow: "hidden", padding: "0 2rem" }}>
            <div style={{ textAlign: "center", maxWidth: 900 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 400 }}>
                    {d.ciudad} — {d.anos_experiencia} años
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem, 10vw, 6rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 1, background: primary, margin: "0 auto 2rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: MUTED, maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.8, fontWeight: 300 }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("contacto")}>Solicitar Consulta</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("servicios")}>Explorar</button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div className="service-card" style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem 2.5rem", transition: "all 0.4s ease", cursor: "pointer" }}>
                        <div style={{ fontSize: "3rem", color: primary, marginBottom: "1.5rem", opacity: 0.3, fontFamily: `'${fontTitulo}', serif`, fontWeight: 300 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 40, height: 40, color: primary, marginBottom: "1.5rem", opacity: 0.7 }}>
                            <span style={{ width: "100%", height: "100%", display: "block" }}>{Icons[s.icon] || Icons.blueprint}</span>
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.75rem", color: TEXT, letterSpacing: "0.01em" }}>
                            {s.titulo}
                        </h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 300 }}>
                            {s.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2.5rem", padding: "2.5rem 0", borderBottom: `1px solid ${BORDER}`, alignItems: "start" }}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 300, color: primary, opacity: 0.4, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", fontWeight: 400, marginBottom: "0.75rem", color: TEXT, letterSpacing: "0.01em" }}>
                                {s.titulo}
                            </h3>
                            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 300 }}>
                                {s.descripcion}
                            </p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "3rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "4rem 3rem", height: "100%" }}>
                        <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400, fontStyle: "italic" }}>
                            Servicio destacado
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2rem", fontWeight: 400, marginBottom: "1.5rem", color: TEXT, lineHeight: 1.2 }}>
                            {featured.titulo}
                        </h3>
                        <div style={{ width: 40, height: 1, background: primary, marginBottom: "1.5rem" }} />
                        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>
                            {featured.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 120}>
                        <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2rem" }}>
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.5rem", color: TEXT }}>
                                {s.titulo}
                            </h3>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 300 }}>
                                {s.descripcion}
                            </p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d }) {
    return (
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1551632786-de41ec802fcb?w=800&q=80'}
                alt="Nuestro equipo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Proyectos completados" },
                { n: "98%", l: "Satisfacción de clientes" },
                { n: "24h", l: "Tiempo de respuesta" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2rem", background: BG2, border: `1px solid ${BORDER}`, borderTop: `1px solid ${primary}` }}>
                    <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 300, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>
                        {s.n}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 400 }}>
                        {s.l}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingArquitectura({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'light') === 'dark';
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';

    const primary = d.color_primario || '#8b7355';
    const secondary = d.color_secundario || '#a0826d';
    const fontTitulo = d.font_titulo || 'Cormorant Garamond';
    const fontCuerpo = d.font_cuerpo || 'Lato';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@300;400;500;600&family=${fontCuerpo.replace(/ /g, '+')}:wght@300;400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "AR").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    // Props compartidos para variantes
    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo };

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: BG, color: TEXT, overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                :root {
                    --primary: ${primary};
                    --primary-dark: ${secondary};
                    --primary-rgb: ${primaryRgb};
                    --bg: ${BG};
                    --bg2: ${BG2};
                    --text: ${TEXT};
                    --muted: ${MUTED};
                    --border: ${BORDER};
                }
                .titulo { font-family: '${fontTitulo}', serif; }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight:400; font-size:0.9rem; transition: color 0.3s; letter-spacing:0.05em; }
                .nav-link:hover { color: ${primary}; }
                .btn-primary { background: ${primary}; color: ${BG}; border: none; cursor: pointer; font-family: '${fontTitulo}', serif; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.3s; }
                .btn-primary:hover { background: ${secondary}; transform: translateY(-2px); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 1px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', serif; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.3s; }
                .btn-outline:hover { background: ${primary}; color: ${BG}; }
                .service-card:hover { border-color: ${primary}; transform: translateY(-8px); }
                .testim-card { background: ${BG2}; border: 1px solid ${BORDER}; padding: 2.5rem; transition: border-color 0.3s; }
                .testim-card:hover { border-color: ${primary}; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: ${BG}; border: 1px solid ${BORDER}; color: ${TEXT}; font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.9rem 1rem; width: 100%; outline: none; transition: border-color 0.3s; }
                input:focus, textarea:focus { border-color: ${primary}; }
                textarea { resize: vertical; min-height: 120px; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .hero-split { grid-template-columns: 1fr !important; }
                    .hero-split > div:last-child { min-height: 300px; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.25rem 2rem",
                background: scrolled ? `${BG}dd` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.08em", color: BG }}>
                        {iniciales}
                    </div>
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "1rem", letterSpacing: "0.08em", color: TEXT }}>
                        {d.nombre}
                    </span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>
                            {s}
                        </span>
                    ))}
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 70, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `1px solid ${BORDER}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.05rem" }}>
                            {s}
                        </span>
                    ))}
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400, fontStyle: "italic" }}>
                                Nuestro trabajo
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400, textTransform: "none", letterSpacing: "-0.01em", color: TEXT }}>
                                Servicios Especializados
                            </h2>
                        </div>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS — elige variante ── */}
            <section id="nosotros" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div style={{ marginBottom: "1rem" }}>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400, fontStyle: "italic" }}>
                                Por qué elegirnos
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: "2rem", color: TEXT }}>
                                Diseño que trasciende
                            </h2>
                        </div>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300, fontSize: "0.95rem" }}>
                            {d.descripcion}
                        </p>
                        <button className="btn-primary" style={{ padding: "0.95rem 2.5rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif` }} onClick={() => scrollTo("contacto")}>
                            Solicitar Consulta
                        </button>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        {(() => {
                            const props = { d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400, fontStyle: "italic" }}>
                                Testimonios
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400, color: TEXT }}>
                                Lo que dicen nuestros clientes
                            </h2>
                        </div>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 150}>
                                <div className="testim-card">
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", color: primary, opacity: 0.6 }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 14, height: 14 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontWeight: 300, fontStyle: "italic" }}>
                                        "{t.texto}"
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
                                        <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "1rem", color: BG }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: "0.95rem", color: TEXT }}>
                                                {t.nombre}
                                            </div>
                                            <div style={{ color: MUTED, fontSize: "0.8rem", fontWeight: 300 }}>
                                                {t.cargo}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ── */}
            <section id="contacto" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400, fontStyle: "italic" }}>
                                Contacto
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400, color: TEXT }}>
                                Iniciemos tu proyecto
                            </h2>
                        </div>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                                        <div style={{ width: 44, height: 44, minWidth: 44, background: BG2, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, opacity: 0.7 }}>
                                            <span style={{ width: 20, height: 20 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED, marginBottom: "0.4rem", fontWeight: 400 }}>
                                                {item.label}
                                            </div>
                                            <div style={{ fontWeight: 400, color: TEXT }}>
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem 1.5rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.85rem", transition: "background 0.3s", marginTop: "1rem" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 20, height: 20 }}>{Icons.whatsapp}</span>
                                    WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 400, marginBottom: "2rem", color: TEXT, letterSpacing: "0.02em" }}>
                                    Envíanos un mensaje
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    <input type="text" placeholder="Tu nombre" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="Tipo de proyecto" />
                                    <textarea placeholder="Cuéntanos sobre tu visión..." />
                                    <button className="btn-primary" style={{ padding: "0.95rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif`, width: "100%", marginTop: "0.5rem" }}>
                                        Enviar consulta
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: isDark ? '#0a0e1a' : '#f0f2f5', borderTop: `1px solid ${BORDER}`, padding: "4rem 2rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, color: BG }}>
                                {iniciales}
                            </div>
                            <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "1rem", color: TEXT, letterSpacing: "0.05em" }}>
                                {d.nombre}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.85rem", textTransform: "capitalize", transition: "color 0.3s", fontWeight: 300 }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = primary}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.8rem", fontWeight: 300 }}>
                            © {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.
                        </p>
                        <p style={{ color: 'rgba(0,0,0,0.2)', fontSize: "0.75rem", letterSpacing: "0.05em", fontWeight: 300 }}>
                            Powered by Devantai
                        </p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: BG,
                    padding: "1rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', serif`, fontWeight: 400,
                    fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 4px 20px rgba(${primaryRgb},0.25)`,
                    transition: "all 0.3s"
                }}
                onMouseOver={e => {
                    e.currentTarget.style.background = secondary;
                    e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={e => {
                    e.currentTarget.style.background = primary;
                    e.currentTarget.style.transform = "translateY(0)";
                }}>
                    Acceso Sistema →
                </button>
            )}
        </div>
    );
}