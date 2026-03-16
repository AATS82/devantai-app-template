import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: ESTETICA PREMIUM
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "Lumière Estética",
    slogan: "Belleza que refleja tu esencia",
    descripcion: "Centro de estética y bienestar especializado en tratamientos faciales, corporales y de rejuvenecimiento con tecnología de punta y profesionales certificados.",
    ciudad: "Santiago, Chile",
    telefono: "+56 9 1234 5678",
    email: "contacto@lumiere.cl",
    horario: "Lunes a Sábado 10:00 - 19:00",
    anos_experiencia: "12",
    clientes_atendidos: "4500+",
    tema: "dark",
    color_primario: "#c9a86c",
    color_secundario: "#9d8659",
    font_titulo: "Playfair Display",
    font_cuerpo: "Lato",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1570172176411-40519603ae5e?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1552852081-8fab4f6e9c6e?w=800&q=80",
    servicios: [
        { titulo: "Tratamientos Faciales", descripcion: "Limpieza profunda, hidratación y rejuvenecimiento con productos premium y técnicas avanzadas.", icon: "sparkles" },
        { titulo: "Masajes Relajantes", descripcion: "Masajes terapéuticos y de relajación para liberar tensión y revitalizar tu cuerpo.", icon: "leaf" },
        { titulo: "Depilación Láser", descripcion: "Depilación permanente segura y eficaz con tecnología IPL de última generación.", icon: "zap" },
        { titulo: "Tratamientos Corporales", descripcion: "Rituales completos de cuidado corporal, exfoliación y hidratación intensiva.", icon: "droplet" },
    ],
    testimonios: [
        { nombre: "Catalina Rodríguez", cargo: "Empresaria", texto: "Los resultados son increíbles. El personal es muy profesional y el ambiente es absolutamente relajante. Recomiendo Lumière a todas mis amigas." },
        { nombre: "Magdalena García", cargo: "Abogada", texto: "Después de los tratamientos faciales mi piel brilla como nunca. Es una inversión en mi bienestar que vale cada peso." },
        { nombre: "Francisca Morales", cargo: "Diseñadora", texto: "El servicio es excepcional. Los detalles y la atención personalizada hacen toda la diferencia. Es mi refugio de belleza favorito." },
    ],
};

// SVG Icons para estetica
const Icons = {
    sparkles: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 5.41 8.59M9.59 4.59L5.41 8.59M9.59 4.59l4.18-4.18m0 0A2 2 0 1 1 18.59 9.59M13.77.41L18.59 5.23m0 0A2 2 0 1 1 22.77 9.41M18.59 5.23L22.77 9.41" /></svg>),
    leaf: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 3-1 11-8 5-8-5-1-11 9-3z" /></svg>),
    zap: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    droplet: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${primaryRgb},0.08) 0%, transparent 60%)` }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 2rem", maxWidth: 820, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1.2rem", borderTop: `1px solid ${primary}`, borderBottom: `1px solid ${primary}`, marginBottom: "2rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary }}>
                    ✦ {d.anos_experiencia} años de experiencia ✦
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 80, height: 1, background: primary, margin: "0 auto 1.5rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: MUTED, maxWidth: 620, margin: "0 auto 3rem", lineHeight: 1.8, letterSpacing: "0.01em" }}>
                    {d.slogan}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button style={{ padding: "0.95rem 2.8rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: primary, color: "#fff", border: "none", cursor: "pointer", transition: "all 0.3s" }}
                        onClick={() => scrollTo("contacto")}
                        onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                        Agendar cita
                    </button>
                    <button style={{ padding: "0.95rem 2.8rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: TEXT, border: `1px solid ${primary}`, cursor: "pointer", transition: "all 0.3s" }}
                        onClick={() => scrollTo("servicios")}
                        onMouseOver={e => { e.currentTarget.style.background = primary; e.currentTarget.style.color = "#fff"; }}
                        onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TEXT; }}>
                        Ver servicios
                    </button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, BG, TEXT, MUTED, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 5rem 4rem 5rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1.2rem", borderTop: `1px solid ${primary}`, borderBottom: `1px solid ${primary}`, marginBottom: "2rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ✦ {d.anos_experiencia} años ✦
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "1.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 1, background: primary, marginBottom: "2rem" }} />
                <p style={{ fontSize: "1.05rem", color: MUTED, marginBottom: "3rem", lineHeight: 1.8, maxWidth: 500 }}>
                    {d.slogan}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <button style={{ padding: "0.95rem 2.5rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: primary, color: "#fff", border: "none", cursor: "pointer", transition: "all 0.3s" }}
                        onClick={() => scrollTo("contacto")}>
                        Agendar cita
                    </button>
                    <button style={{ padding: "0.95rem 2.5rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: TEXT, border: `1px solid ${primary}`, cursor: "pointer" }}
                        onClick={() => scrollTo("servicios")}>
                        Ver servicios
                    </button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 40%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, BG, TEXT, MUTED, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 2rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "3rem", fontWeight: 600 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(4rem, 10vw, 7.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "2.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 100, height: 1, background: primary, margin: "0 auto 2.5rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: MUTED, maxWidth: 600, margin: "0 auto 4rem", lineHeight: 1.8, letterSpacing: "0.02em" }}>
                    {d.slogan}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button style={{ padding: "1rem 3rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: primary, color: "#fff", border: "none", cursor: "pointer", transition: "all 0.3s" }}
                        onClick={() => scrollTo("contacto")}>
                        Agendar cita
                    </button>
                    <button style={{ padding: "1rem 3rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "transparent", color: TEXT, border: `1px solid ${primary}`, cursor: "pointer" }}
                        onClick={() => scrollTo("servicios")}>
                        Ver servicios
                    </button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem 2.5rem", transition: "all 0.3s", cursor: "pointer", minHeight: "100%" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-4px)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ width: 48, height: 48, color: primary, marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ width: 32, height: 32 }}>{Icons[s.icon] || Icons.sparkles}</span>
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.4rem", fontWeight: 600, color: TEXT, marginBottom: "0.75rem", letterSpacing: "0.01em" }}>
                            {s.titulo}
                        </h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7 }}>
                            {s.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "2.5rem", padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, borderLeft: `2px solid ${primary}`, transition: "all 0.3s", cursor: "pointer" }}
                        onMouseOver={e => e.currentTarget.style.transform = "translateX(8px)"}
                        onMouseOut={e => e.currentTarget.style.transform = "translateX(0)"}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 700, color: primary, opacity: 0.3, minWidth: 50, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                                <div style={{ width: 32, height: 32, color: primary }}>
                                    <span style={{ width: 24, height: 24, display: "block" }}>{Icons[s.icon] || Icons.sparkles}</span>
                                </div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 600, color: TEXT, margin: 0 }}>
                                    {s.titulo}
                                </h3>
                            </div>
                            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                                {s.descripcion}
                            </p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2.5rem" }}>
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "4rem", height: "100%" }}>
                        <div style={{ width: 64, height: 64, color: primary, marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ width: 40, height: 40 }}>{Icons[featured.icon] || Icons.sparkles}</span>
                        </div>
                        <div style={{ fontSize: "0.65rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 600 }}>
                            Servicio destacado
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.2rem", fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                            {featured.titulo}
                        </h2>
                        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.8 }}>
                            {featured.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start", transition: "all 0.3s", cursor: "pointer" }}
                            onMouseOver={e => e.currentTarget.style.borderColor = primary}
                            onMouseOut={e => e.currentTarget.style.borderColor = BORDER}>
                            <div style={{ width: 40, height: 40, minWidth: 40, color: primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ width: 24, height: 24 }}>{Icons[s.icon] || Icons.sparkles}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.1rem", fontWeight: 600, color: TEXT, marginBottom: "0.4rem" }}>
                                    {s.titulo}
                                </h3>
                                <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                                    {s.descripcion}
                                </p>
                            </div>
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
                src={d.imagen_nosotros}
                alt="Centro estética"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Clientes satisfechos" },
                { n: "98%", l: "Tasa de satisfacción" },
                { n: "24h", l: "Atención personalizada" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, borderTop: `2px solid ${primary}`, transition: "all 0.3s", cursor: "pointer" }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                    <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "3rem", fontWeight: 700, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>
                        {s.n}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {s.l}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingEstetica({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#0f0f0f' : '#faf9f7';
    const BG2 = isDark ? '#1a1a1a' : '#f5f3f0';
    const TEXT = isDark ? '#f8f8f8' : '#2a2a2a';
    const MUTED = isDark ? 'rgba(248,248,248,0.6)' : 'rgba(42,42,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(42,42,42,0.12)';

    const primary = d.color_primario || '#c9a86c';
    const secondary = d.color_secundario || '#9d8659';
    const fontTitulo = d.font_titulo || 'Playfair Display';
    const fontCuerpo = d.font_cuerpo || 'Lato';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@400;500;600;700&family=${fontCuerpo.replace(/ /g, '+')}:wght@400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "LE").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, BG, BG2, TEXT, MUTED, BORDER, scrollTo };

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: BG, color: TEXT, overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body { font-family: '${fontCuerpo}', sans-serif; }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 500; font-size: 0.9rem; transition: color 0.3s; letter-spacing: 0.03em; }
                .nav-link:hover { color: ${TEXT}; }
                input, textarea { background: ${BG2}; border: 1px solid ${BORDER}; color: ${TEXT}; font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.85rem 1rem; width: 100%; outline: none; transition: border-color 0.2s; }
                input:focus, textarea:focus { border-color: ${primary}; }
                textarea { resize: vertical; min-height: 120px; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .stats-grid { grid-template-columns: 1fr 1fr !important; }
                    .contact-grid { grid-template-columns: 1fr !important; }
                    .hero-split { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.2rem 3rem",
                background: scrolled ? `rgba(${isDark ? '15,15,15' : '250,249,247'},0.95)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "0.9rem", color: "#fff" }}>
                        {iniciales}
                    </div>
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "1rem", letterSpacing: "0.05em" }}>
                        {d.nombre}
                    </span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>
                            {s}
                        </span>
                    ))}
                    <button style={{ padding: "0.7rem 1.6rem", fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: primary, color: "#fff", border: "none", cursor: "pointer", transition: "all 0.3s" }}
                        onClick={() => scrollTo("contacto")}>
                        Agendar cita
                    </button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block", color: TEXT }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `1px solid ${BORDER}`, padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1rem" }}>
                            {s}
                        </span>
                    ))}
                    <button style={{ padding: "0.85rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, background: primary, color: "#fff", border: "none", cursor: "pointer" }}
                        onClick={() => scrollTo("contacto")}>
                        Agendar cita
                    </button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "3.5rem 2rem", color: "#fff" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Clientes atendidos" },
                        { n: "98%", l: "Satisfacción" },
                        { n: "24h", l: "Atención garantizada" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                                {s.n}
                            </div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.9, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                {s.l}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 600 }}>
                                Nuestros tratamientos
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: TEXT, letterSpacing: "-0.01em" }}>
                                Servicios Premium
                            </h2>
                            <div style={{ width: 80, height: 1, background: primary, margin: "1.5rem auto 0" }} />
                        </div>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── NOSOTROS ── */}
            <section id="nosotros" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div>
                            <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 600 }}>
                                Por qué elegirnos
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, color: TEXT, lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
                                Calidad y elegancia en cada tratamiento
                            </h2>
                            <div style={{ width: 60, height: 1, background: primary, marginBottom: "2rem" }} />
                            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1rem" }}>
                                {d.descripcion}
                            </p>
                            <button style={{ padding: "0.95rem 2.5rem", fontSize: "0.8rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: primary, color: "#fff", border: "none", cursor: "pointer", transition: "all 0.3s" }}
                                onClick={() => scrollTo("contacto")}>
                                Contáctanos
                            </button>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
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
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 600 }}>
                                Testimonios
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: TEXT, letterSpacing: "-0.01em" }}>
                                Lo que dicen nuestras clientes
                            </h2>
                            <div style={{ width: 80, height: 1, background: primary, margin: "1.5rem auto 0" }} />
                        </div>
                    </AnimatedSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div style={{ background: BG, border: `1px solid ${BORDER}`, padding: "2.5rem", transition: "all 0.3s", cursor: "pointer" }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16, display: "flex" }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontStyle: "italic" }}>
                                        "{t.texto}"
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: TEXT }}>
                                                {t.nombre}
                                            </div>
                                            <div style={{ color: MUTED, fontSize: "0.8rem" }}>
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
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 600 }}>
                                Contacto
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, color: TEXT, letterSpacing: "-0.01em" }}>
                                Agendar tu cita
                            </h2>
                            <div style={{ width: 80, height: 1, background: primary, margin: "1.5rem auto 0" }} />
                        </div>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.5rem", background: BG2, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                                        onMouseOver={e => e.currentTarget.style.borderColor = primary}
                                        onMouseOut={e => e.currentTarget.style.borderColor = BORDER}>
                                        <div style={{ width: 48, height: 48, minWidth: 48, color: primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <span style={{ width: 24, height: 24 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: MUTED, marginBottom: "0.4rem", fontWeight: 600 }}>
                                                {item.label}
                                            </div>
                                            <div style={{ fontWeight: 500, color: TEXT }}>
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1.2rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.9rem", transition: "all 0.3s", border: "none", cursor: "pointer" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 20, height: 20 }}>{Icons.whatsapp}</span>
                                    Escribir por WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 600, color: TEXT, marginBottom: "2rem", letterSpacing: "0.01em" }}>
                                    Envíanos un mensaje
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                                    <input type="text" placeholder="Tu nombre" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="¿Qué tratamiento te interesa?" />
                                    <textarea placeholder="Cuéntanos más sobre lo que buscas..." />
                                    <button style={{ padding: "1rem", fontSize: "0.85rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: primary, color: "#fff", border: "none", cursor: "pointer", transition: "all 0.3s" }}
                                        onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
                                        onMouseOut={e => e.currentTarget.style.opacity = "1"}>
                                        Enviar mensaje
                                    </button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: isDark ? '#0a0a0a' : '#f0ebe5', borderTop: `1px solid ${BORDER}`, padding: "4rem 2rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, color: "#fff" }}>
                                {iniciales}
                            </div>
                            <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "1rem", letterSpacing: "0.05em", color: TEXT }}>
                                {d.nombre}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.9rem", textTransform: "capitalize", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = primary}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.85rem" }}>
                            © {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.
                        </p>
                        <p style={{ color: `${MUTED}`, fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                            Powered by Devantai
                        </p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: "#fff",
                    padding: "0.95rem 1.8rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', serif`, fontWeight: 600,
                    fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 8px 32px rgba(${primaryRgb},0.3)`,
                    transition: "all 0.3s"
                }}
                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 40px rgba(${primaryRgb},0.4)`; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px rgba(${primaryRgb},0.3)`; }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}