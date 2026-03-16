import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: SPA
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// Perfil: elegante_premium con tema dark
// ============================================================

const DEFAULT_DATA = {
    nombre: "Serenity Spa",
    slogan: "Encuentra tu paz interior",
    descripcion: "Un santuario de relajación y bienestar donde el lujo y la tranquilidad se encuentran. Nuestros tratamientos holísticos están diseñados para renovar cuerpo, mente y espíritu.",
    ciudad: "Santiago, Chile",
    telefono: "+56 9 1234 5678",
    email: "contacto@serenityspa.cl",
    horario: "Lun-Dom: 10:00 - 20:00",
    anos_experiencia: "15",
    clientes_atendidos: "5000+",
    tema: "dark",
    color_primario: "#d4af37",
    color_secundario: "#b8960a",
    font_titulo: "Playfair Display",
    font_cuerpo: "Lato",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1544161515-81aae3ff8b47?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=900&q=80",
    servicios: [
        { titulo: "Masaje Relajante", descripcion: "Masaje terapéutico con aceites esenciales para liberar tensiones y restaurar el equilibrio energético.", icon: "leaf" },
        { titulo: "Faciales Rejuvenecedores", descripcion: "Tratamientos faciales de lujo con productos naturales para una piel radiante y renovada.", icon: "sparkles" },
        { titulo: "Terapia de Vapor", descripcion: "Sesiones de sauna y vapor que purifican el cuerpo y promueven la desintoxicación natural.", icon: "waves" },
        { titulo: "Reflexología Podal", descripcion: "Terapia ancestral que equilibra los meridianos del cuerpo estimulando puntos clave en los pies.", icon: "circle" },
    ],
    testimonios: [
        { nombre: "Catalina Rodríguez", cargo: "Ejecutiva", texto: "Una experiencia transformadora. Después de cada sesión me siento completamente renovada. El equipo es profesional y atentísimo." },
        { nombre: "Marcelo González", cargo: "Empresario", texto: "Finalmente encontré el lugar perfecto para desconectarme del estrés diario. La atmósfera es puro lujo y tranquilidad." },
        { nombre: "Valentina Soto", cargo: "Artista", texto: "Serenity Spa no es solo un spa, es un templo del bienestar. Me ayudó a reconectar conmigo misma de manera profunda." },
    ],
};

// SVG Icons para Spa
const Icons = {
    leaf: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-3.314 0-6 2.686-6 6 0 3.314 2.686 6 6 6s6-2.686 6-6c0-3.314-2.686-6-6-6m0 0c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4" /><path d="M12 2v16m0 4a8 8 0 0 1-6-3 8 8 0 0 1 12 0 8 8 0 0 1-6 3" /></svg>),
    sparkles: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="5" r="1" /><circle cx="5" cy="19" r="1" /><circle cx="9" cy="9" r="1" /><circle cx="15" cy="15" r="1" /><line x1="12" y1="12" x2="19" y2="5" /><line x1="12" y1="12" x2="5" y2="19" /><line x1="12" y1="12" x2="9" y2="9" /><line x1="12" y1="12" x2="15" y2="15" /></svg>),
    waves: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1 3-1 4.5-1" /><path d="M3 14c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1 3-1 4.5-1" /><path d="M3 20c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1 3-1 4.5-1" /></svg>),
    circle: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1544161515-81aae3ff8b47?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: `brightness(${isDark ? '0.35' : '0.85'})` }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${isDark ? '15,23,42' : '255,255,255'},0.92) 0%, rgba(${primaryRgb},0.08) 100%)` }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: primary }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 2rem", maxWidth: 900, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <div style={{ flex: 1, height: 1, background: primary }} />
                    <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.9rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>Bienvenido</p>
                    <div style={{ flex: 1, height: 1, background: primary }} />
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: TEXT }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: MUTED, maxWidth: 700, margin: "0 auto 2.5rem", lineHeight: 1.8, fontWeight: 300 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1.1rem 3rem", fontSize: "0.95rem", borderRadius: "0", background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }} onClick={() => scrollTo("contacto")}>Reservar Ahora</button>
                    <button className="btn-outline" style={{ padding: "1.1rem 3rem", fontSize: "0.95rem", borderRadius: "0", background: "transparent", border: `1.5px solid ${primary}`, color: TEXT, fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }} onClick={() => scrollTo("servicios")}>Nuestros Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 4rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", width: "fit-content" }}>
                    <div style={{ width: 20, height: 1, background: primary }} />
                    <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>Bienestar Supremo</p>
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: TEXT }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.15rem", color: MUTED, marginBottom: "3rem", lineHeight: 1.8, maxWidth: 500, fontWeight: 300 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: "0", background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }} onClick={() => scrollTo("contacto")}>Reservar Ahora</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: "0", background: "transparent", border: `1.5px solid ${primary}`, color: TEXT, fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }} onClick={() => scrollTo("servicios")}>Descubre Más</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1544161515-81aae3ff8b47?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to left, ${BG} 0%, transparent 40%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 2rem", maxWidth: 1000 }}>
                <p style={{ fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "2.5rem", fontWeight: 400 }}>
                    {d.anos_experiencia} años de excelencia • {d.ciudad}
                </p>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 50, height: 1, background: primary, margin: "2rem auto 2.5rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: MUTED, maxWidth: 600, margin: "0 auto 3rem", lineHeight: 1.8, fontWeight: 300 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1.1rem 3rem", fontSize: "0.95rem", borderRadius: "0", background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                    <button className="btn-outline" style={{ padding: "1.1rem 3rem", fontSize: "0.95rem", borderRadius: "0", background: "transparent", border: `1.5px solid ${primary}`, color: TEXT, fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }} onClick={() => scrollTo("servicios")}>Servicios</button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem 2.5rem", position: "relative", transition: "all 0.3s" }} 
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-4px)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: primary, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s ease" }} 
                            ref={el => { if (el?.parentElement?.matches(':hover')) el.style.transform = "scaleX(1)"; }} />
                        <div style={{ width: 50, height: 50, marginBottom: "1.5rem", color: primary }}>
                            <span style={{ width: "100%", height: "100%", display: "block" }}>{Icons[s.icon] || Icons.leaf}</span>
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem", color: TEXT, letterSpacing: "0.02em" }}>{s.titulo}</h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 300 }}>{s.descripcion}</p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "2.5rem", padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${primary}`, transition: "all 0.3s" }}
                        onMouseOver={e => e.currentTarget.style.background = isDark ? "rgba(212,175,55,0.05)" : "rgba(212,175,55,0.02)"}
                        onMouseOut={e => e.currentTarget.style.background = BG2}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 400, color: `rgba(${primaryRgb},0.2)`, minWidth: 50, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 45, height: 45, minWidth: 45, color: primary, marginTop: "0.2rem" }}>
                            <span style={{ width: "100%", height: "100%", display: "block" }}>{Icons[s.icon] || Icons.leaf}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.5rem", color: TEXT }}>{s.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 300 }}>{s.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2.5rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3.5rem", height: "100%", position: "relative" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: primary }} />
                        <div style={{ width: 60, height: 60, marginBottom: "2rem", color: primary }}>
                            <span style={{ width: "100%", height: "100%", display: "block" }}>{Icons[featured.icon] || Icons.leaf}</span>
                        </div>
                        <p style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400 }}>Tratamiento Estrella</p>
                        <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.2rem", fontWeight: 400, lineHeight: 1.1, marginBottom: "1.5rem", color: TEXT }}>{featured.titulo}</h3>
                        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>{featured.descripcion}</p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start", position: "relative", transition: "all 0.3s" }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: primary, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s ease" }} 
                                ref={el => { if (el?.parentElement?.matches(':hover')) el.style.transform = "scaleX(1)"; }} />
                            <div style={{ width: 35, height: 35, minWidth: 35, color: primary, marginTop: "0.1rem" }}>
                                <span style={{ width: "100%", height: "100%", display: "block" }}>{Icons[s.icon] || Icons.leaf}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.3rem", color: TEXT }}>{s.titulo}</h3>
                                <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 300 }}>{s.descripcion}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ position: "relative", borderRadius: "0", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=900&q=80'}
                alt="Nuestro spa"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${isDark ? '15,23,42' : '255,255,255'},0.2) 0%, transparent 60%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2.5rem", background: `linear-gradient(to top, ${BG} 0%, transparent 100%)` }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: primary }}>
                    <div style={{ width: 30, height: 1, background: primary }} />
                    <p style={{ fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 400 }}>Certificado Internacionalmente</p>
                </div>
            </div>
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Clientes satisfechos" },
                { n: "100%", l: "Productos naturales" },
                { n: "5★", l: "Calificación promedio" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, borderTop: `3px solid ${primary}`, transition: "all 0.3s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.8rem", fontWeight: 400, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.85rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 300 }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingSpa({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const BG3 = isDark ? '#334155' : '#f1f5f9';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';
    const MUTED_BORDER = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.05)';

    const primary = d.color_primario || '#d4af37';
    const secondary = d.color_secundario || '#b8960a';
    const fontTitulo = d.font_titulo || 'Playfair Display';
    const fontCuerpo = d.font_cuerpo || 'Lato';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@400;500;600;700&family=${fontCuerpo.replace(/ /g, '+')}:wght@300;400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "SS").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER };

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: BG, color: TEXT, overflowX: "hidden", fontWeight: 300 }}>
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
                    --bg3: ${BG3};
                    --border: ${BORDER};
                    --text: ${TEXT};
                    --muted: ${MUTED};
                }
                .titulo { font-family: '${fontTitulo}', serif; font-weight: 400; }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 400; font-size: 0.95rem; transition: color 0.3s; letter-spacing: 0.05em; }
                .nav-link:hover { color: ${primary}; }
                .btn-primary { background: ${primary}; color: ${isDark ? '#0f172a' : '#faf9f7'}; border: none; cursor: pointer; font-family: '${fontTitulo}', serif; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.3s; }
                .btn-primary:hover { background: ${secondary}; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(${primaryRgb},0.25); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 1.5px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', serif; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.3s; }
                .btn-outline:hover { background: rgba(${primaryRgb},0.08); transform: translateY(-2px); }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; justify-content: center; }
                .divider-line { flex: 1; height: 1px; background: ${BORDER}; max-width: 80px; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: ${BG2}; border: 1px solid ${BORDER}; color: ${TEXT}; font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 1rem; width: 100%; outline: none; border-radius: 0; transition: border-color 0.3s; font-weight: 300; }
                input:focus, textarea:focus { border-color: ${primary}; }
                textarea { resize: vertical; min-height: 140px; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .stats-grid { grid-template-columns: 1fr 1fr !important; }
                    .contact-grid { grid-template-columns: 1fr !important; }
                    .hero-split { grid-template-columns: 1fr !important; }
                    .hero-split > div:last-child { min-height: 300px; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.25rem 2rem",
                background: scrolled ? `rgba(${isDark ? '15,23,42' : '255,255,255'},0.95)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(8px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 38, height: 38, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.1em", color: isDark ? "#0f172a" : "#faf9f7" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 500, fontSize: "1rem", letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button style={{ background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", padding: "0.7rem 1.6rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", borderRadius: "0" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `1px solid ${BORDER}`, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.05rem" }}>{s}</span>
                    ))}
                    <button style={{ background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", padding: "0.9rem", fontSize: "0.9rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: "0" }} onClick={() => scrollTo("contacto")}>Reservar Ahora</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "3rem 2rem", color: isDark ? "#0f172a" : "#faf9f7" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Clientes satisfechos" },
                        { n: "15+", l: "Terapeutas especializados" },
                        { n: "100%", l: "Productos naturales" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.2rem", fontWeight: 500, letterSpacing: "-0.02em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.8, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 400, marginTop: "0.5rem" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, whiteSpace: "nowrap" }}>Lo que ofrecemos</p>
                            <div className="divider-line" />
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, textAlign: "center", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem", color: TEXT }}>Nuestros Tratamientos</h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS — elige variante ── */}
            <section id="nosotros" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider" style={{ justifyContent: "flex-start" }}>
                            <div className="divider-line" style={{ maxWidth: "60px" }} />
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, whiteSpace: "nowrap" }}>Por qué elegirnos</p>
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, textTransform: "uppercase", lineHeight: 1.15, marginBottom: "2rem", color: TEXT, letterSpacing: "-0.02em" }}>Experiencia en bienestar integral</h2>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1rem", fontWeight: 300 }}>{d.descripcion}</p>
                        <button style={{ background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", padding: "1.1rem 2.5rem", fontSize: "0.9rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", borderRadius: "0" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            const props = { d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, whiteSpace: "nowrap" }}>Testimonios</p>
                            <div className="divider-line" />
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, textAlign: "center", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, textTransform: "uppercase", marginBottom: "4rem", color: TEXT }}>Lo que nuestros clientes dicen</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div style={{ background: BG, border: `1px solid ${BORDER}`, padding: "2.5rem", transition: "all 0.3s" }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.boxShadow = `0 8px 24px rgba(${primaryRgb},0.12)`; }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}>
                                    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontStyle: "italic", fontWeight: 300 }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
                                        <div style={{ width: 42, height: 42, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "0.95rem", color: isDark ? "#0f172a" : "#faf9f7", borderRadius: "0" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: "0.95rem", color: TEXT }}>{t.nombre}</div>
                                            <div style={{ color: MUTED, fontSize: "0.8rem", fontWeight: 300 }}>{t.cargo}</div>
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
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, whiteSpace: "nowrap" }}>Contacto</p>
                            <div className="divider-line" />
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, textAlign: "center", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, textTransform: "uppercase", marginBottom: "4rem", color: TEXT }}>Agenda tu sesión hoy</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                                        <div style={{ width: 50, height: 50, minWidth: 50, background: BG2, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, transition: "all 0.3s" }} 
                                            onMouseOver={e => { e.currentTarget.style.background = `rgba(${primaryRgb},0.1)`; }}
                                            onMouseOut={e => { e.currentTarget.style.background = BG2; }}>
                                            <span style={{ width: 22, height: 22 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: MUTED, marginBottom: "0.4rem", fontWeight: 400 }}>{item.label}</div>
                                            <div style={{ fontWeight: 500, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1.1rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.9rem", transition: "background 0.3s", borderRadius: "0" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 20, height: 20 }}>{Icons.whatsapp}</span>
                                    Escribir por WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.4rem", fontWeight: 400, textTransform: "uppercase", marginBottom: "2rem", color: TEXT, letterSpacing: "0.02em" }}>Déjanos un mensaje</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    <input type="text" placeholder="Tu nombre" style={{ fontWeight: 300 }} />
                                    <input type="tel" placeholder="Tu teléfono" style={{ fontWeight: 300 }} />
                                    <input type="text" placeholder="Servicio de interés" style={{ fontWeight: 300 }} />
                                    <textarea placeholder="Cuéntanos más sobre lo que buscas..." style={{ fontWeight: 300 }} />
                                    <button style={{ background: primary, color: isDark ? "#0f172a" : "#faf9f7", border: "none", padding: "1.1rem", fontSize: "0.95rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s", borderRadius: "0" }}>Enviar Solicitud</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: BG2, borderTop: `1px solid ${BORDER}`, padding: "4rem 2rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: