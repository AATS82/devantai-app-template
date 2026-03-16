import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: MANICURE
// Tema: Light | Perfil: Vibrante y Colorido
// ============================================================

const DEFAULT_DATA = {
    nombre: "Nail Studio Elegancia",
    slogan: "Diseños únicos que expresan tu personalidad",
    descripcion: "En Nail Studio Elegancia nos especializamos en crear diseños de uñas personalizados que reflejan tu estilo. Desde técnicas clásicas hasta nail art de vanguardia, ofrecemos un servicio de calidad en un ambiente relajante y amigable.",
    ciudad: "Santiago, Chile",
    telefono: "+56 9 1234 5678",
    email: "hola@nailstudio.cl",
    horario: "Lun-Sab 10:00 - 19:00 | Dom 11:00 - 17:00",
    anos_experiencia: "8",
    clientes_atendidos: "2500+",
    tema: "light",
    color_primario: "#ec4899",
    color_secundario: "#db2777",
    font_titulo: "Poppins",
    font_cuerpo: "Nunito",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
    servicios: [
        { titulo: "Manicure Clásica", descripcion: "Limpieza, corte, lima y esmaltado perfecto para lucir unas manos impecables", icon: "sparkles" },
        { titulo: "Nail Art Personalizado", descripcion: "Diseños únicos y creativos adaptados a tu gusto y personalidad", icon: "palette" },
        { titulo: "Extensión de Uñas", descripcion: "Técnicas de acrílico y gel para lograr unas más largas y resistentes", icon: "star" },
        { titulo: "Tratamiento y Cuidado", descripcion: "Hidratación profunda y fortalecimiento para unas saludables", icon: "heart" },
    ],
    testimonios: [
        { nombre: "María González", cargo: "Diseñadora Gráfica", texto: "Cada vez que voy me sorprenden con nuevas ideas. Las chicas son muy talentosas y atentas. ¡Vuelvo siempre!" },
        { nombre: "Catalina Rodríguez", cargo: "Ejecutiva", texto: "El ambiente es hermoso, las chicas profesionales y los diseños quedan perfectos. Mi lugar favorito para consentirme." },
        { nombre: "Daniela López", cargo: "Influencer", texto: "Confío mis uñas solo en Nail Studio. Los diseños son increíbles y duran mucho más que en otros lugares." },
    ],
};

// ============================================================
// SVG ICONS - Manicure themed
// ============================================================

const Icons = {
    sparkles: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>),
    palette: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6m0 0v6M8 12h4m0 0h4"/><circle cx="7" cy="9" r="1" fill="currentColor"/><circle cx="17" cy="9" r="1" fill="currentColor"/><circle cx="7" cy="15" r="1" fill="currentColor"/><circle cx="17" cy="15" r="1" fill="currentColor"/></svg>),
    star: (<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>),
};

// ============================================================
// INTERSECTION OBSERVER HOOK
// ============================================================

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
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
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

// ============================================================
// HERO VARIANTS
// ============================================================

function HeroCentered({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: isDark ? "brightness(0.35)" : "brightness(0.8)" }} />
            <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(${primaryRgb},0.15) 100%)` : `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(${primaryRgb},0.1) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: isDark ? "linear-gradient(to bottom right, transparent 49%, #0f172a 50%)" : "linear-gradient(to bottom right, transparent 49%, #ffffff 50%)" }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 780, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.3)`, padding: "0.4rem 1rem", borderRadius: "50px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary }}>
                    ✨ {d.anos_experiencia} años creando belleza ✨
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem", textTransform: "uppercase", color: TEXT }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: MUTED, maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "50px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "50px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 3rem 4rem 4rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.3)`, padding: "0.4rem 1rem", borderRadius: "50px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ✨ {d.anos_experiencia} años de experiencia ✨
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem", textTransform: "uppercase", color: TEXT }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.1rem", color: MUTED, marginBottom: "2.5rem", lineHeight: 1.7, maxWidth: 420 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "50px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "50px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 30%, rgba(${primaryRgb},0.2) 100%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `3px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 600 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 3, background: primary, margin: "0 auto 2rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: MUTED, maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.7 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "50px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "50px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

// ============================================================
// SERVICIOS VARIANTS
// ============================================================

const serviceColors = ["#fce7f3", "#fef3c7", "#e0f2fe", "#d1fae5"];
const serviceColorsBorder = ["#f472b6", "#fcd34d", "#38bdf8", "#10b981"];

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div className="service-card" style={{
                        background: isDark ? `rgba(${primaryRgb},0.08)` : serviceColors[i % serviceColors.length],
                        border: `2px solid ${isDark ? `rgba(${primaryRgb},0.2)` : serviceColorsBorder[i % serviceColorsBorder.length]}`,
                        borderRadius: "16px",
                        overflow: "hidden",
                        padding: "2rem",
                        transition: "all 0.3s",
                        cursor: "pointer",
                    }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.boxShadow = `0 16px 40px rgba(${primaryRgb},0.15)`;
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}>
                        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                            <div style={{ width: 60, height: 60, minWidth: 60, background: isDark ? `rgba(${primaryRgb},0.2)` : serviceColorsBorder[i % serviceColorsBorder.length], display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "12px" }}>
                                <span style={{ width: 28, height: 28 }}>{Icons[s.icon] || Icons.sparkles}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: TEXT }}>{s.titulo}</h3>
                                <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.6 }}>{s.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "1.75rem 2rem", background: isDark ? BG2 : serviceColors[i % serviceColors.length], border: `2px solid ${isDark ? BORDER : serviceColorsBorder[i % serviceColorsBorder.length]}`, borderLeft: `4px solid ${primary}`, transition: "all 0.3s", borderRadius: "12px" }}
                        onMouseOver={e => e.currentTarget.style.transform = "translateX(8px)"}
                        onMouseOut={e => e.currentTarget.style.transform = "translateX(0)"}>
                        <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3rem", fontWeight: 800, color: primary, minWidth: 60, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 40, height: 40, minWidth: 40, color: primary }}>
                            <span style={{ width: 28, height: 28, display: "block" }}>{Icons[s.icon] || Icons.sparkles}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.3rem", color: TEXT }}>{s.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.5 }}>{s.descripcion}</p>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{
                        background: isDark ? `rgba(${primaryRgb},0.1)` : "#fce7f3",
                        border: `2px solid ${isDark ? `rgba(${primaryRgb},0.3)` : "#f472b6"}`,
                        borderRadius: "16px",
                        padding: "3rem 2.5rem",
                        height: "100%",
                        transition: "all 0.3s"
                    }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.boxShadow = `0 16px 40px rgba(${primaryRgb},0.2)`;
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}>
                        <div style={{ width: 80, height: 80, background: primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: "1.5rem", borderRadius: "12px" }}>
                            <span style={{ width: 40, height: 40 }}>{Icons[featured.icon] || Icons.sparkles}</span>
                        </div>
                        <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem", fontWeight: 600 }}>Servicio destacado</div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2rem", fontWeight: 800, marginBottom: "1rem", color: TEXT }}>{featured.titulo}</h3>
                        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{
                            background: isDark ? BG2 : serviceColors[(i + 1) % serviceColors.length],
                            border: `2px solid ${isDark ? BORDER : serviceColorsBorder[(i + 1) % serviceColorsBorder.length]}`,
                            borderRadius: "12px",
                            padding: "1.5rem",
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-start",
                            transition: "all 0.3s"
                        }}
                            onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"}
                            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                            <div style={{ width: 44, height: 44, minWidth: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", borderRadius: "10px" }}>
                                <span style={{ width: 20, height: 20 }}>{Icons[s.icon] || Icons.sparkles}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem", color: TEXT }}>{s.titulo}</h3>
                                <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.5 }}>{s.descripcion}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}

// ============================================================
// NOSOTROS VARIANTS
// ============================================================

function NosotrosImage({ d, isDark, BG }) {
    return (
        <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", border: `2px solid rgba(0,0,0,0.1)` }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80'}
                alt="Nuestro estudio"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    const statsData = [
        { n: d.anos_experiencia, l: "Años de experiencia" },
        { n: d.clientes_atendidos, l: "Clientes felices" },
        { n: "500+", l: "Diseños únicos" },
        { n: "4.9⭐", l: "Calificación" },
    ];
    
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {statsData.map((s, i) => (
                <div key={i} style={{ padding: "2rem", background: isDark ? BG2 : serviceColors[i % serviceColors.length], border: `2px solid ${isDark ? BORDER : serviceColorsBorder[i % serviceColorsBorder.length]}`, borderRadius: "12px", transition: "all 0.3s" }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = `0 12px 32px rgba(236,72,153,0.15)`;
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                    }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.8rem", fontWeight: 800, color: primary, lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.85rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function LandingManicure({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const isDark = (d.tema || 'light') === 'dark';
    
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const primary = d.color_primario || '#ec4899';
    const secondary = d.color_secundario || '#db2777';
    const fontTitulo = d.font_titulo || 'Poppins';
    const fontCuerpo = d.font_cuerpo || 'Nunito';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@600;700;800&family=${fontCuerpo.replace(/ /g, '+')}:wght@400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "NM").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

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
                .titulo { font-family: '${fontTitulo}', sans-serif; }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 500; font-size: 0.95rem; transition: color 0.2s; letter-spacing: 0.03em; }
                .nav-link:hover { color: ${TEXT}; }
                .btn-primary { background: var(--primary); color: #fff; border: none; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
                .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(${primaryRgb},0.35); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 1.5px solid ${BORDER}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
                .btn-outline:hover { border-color: var(--primary); background: rgba(${primaryRgb},0.05); }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; justify-content: center; }
                .divider-line { flex: 1; height: 1px; background: var(--border); max-width: 100px; }
                .divider-dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.85rem 1rem; width: 100%; outline: none; border-radius: 8px; transition: border-color 0.2s; }
                input:focus, textarea:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(${primaryRgb},0.1); }
                textarea { resize: vertical; min-height: 120px; }
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

            {/* NAVBAR */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1rem 2rem",
                background: scrolled ? `rgba(${isDark ? '15,23,42' : '255,255,255'},${isDark ? '0.97' : '0.95'})` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "1rem", letterSpacing: "0.05em", color: "#fff", borderRadius: "10px" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em", textTransform: "uppercase", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem", borderRadius: "50px" }} onClick={() => scrollTo("contacto")}>Agendar</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `1px solid ${BORDER}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.1rem", color: TEXT }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.8rem", fontSize: "0.9rem", borderRadius: "50px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                </div>
            )}

            {/* HERO */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* STATS BAR */}
            <section style={{ background: primary, padding: "2rem" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto", textAlign: "center", gap: "1rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Clientes felices" },
                        { n: "500+", l: "Diseños únicos" },
                        { n: "4.9⭐", l: "Calificación" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.9, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SERVICIOS */}
            <section id="servicios" style={{ background: BG2, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Lo que ofrecemos</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "3.5rem", color: TEXT }}>Nuestros Servicios</h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* NOSOTROS */}
            <section id="nosotros" style={{ background: BG, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Por qué elegirnos</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1.5rem", color: TEXT }}>Belleza con pasión y profesionalismo</h2>
                        <p style={{ color: MUTED, lineHeight: 1.7, marginBottom: "2rem" }}>{d.descripcion}</p>
                        <button className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "0.9rem", borderRadius: "50px" }} onClick={() => scrollTo("contacto")}>Agendar Ahora</button>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            const props = { d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* TESTIMONIOS */}
            <section id="testimonios" style={{ background: BG2, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Testimonios</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "3.5rem", color: TEXT }}>Lo que dicen nuestras clientes</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div style={{
                                    background: isDark ? BG : serviceColors[i % serviceColors.length],
                                    border: `2px solid ${isDark ? BORDER : serviceColorsBorder[i % serviceColorsBorder.length]}`,
                                    borderRadius: "12px",
                                    padding: "2rem",
                                    transition: "all 0.3s",
                                }}
                                    onMouseOver={e => {
                                        e.currentTarget.style.transform = "translateY(-8px)";
                                        e.currentTarget.style.boxShadow = `0 16px 40px rgba(${primaryRgb},0.15)`;
                                    }}
                                    onMouseOut={e => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}>
                                    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem", color: "#fbbf24" }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "1rem", color: "#fff", borderRadius: "50%" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: TEXT }}>{t.nombre}</div>
                                            <div style={{ color: MUTED, fontSize: "0.8rem" }}>{t.cargo}</div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" style={{ background: BG, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Contacto</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "3.5rem", color: TEXT }}>Agendar tu cita</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", transition: "all 0.3s" }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.borderColor = primary;
                                            e.currentTarget.style.background = isDark ? 'rgba(236,72,153,0.08)' : 'rgba(236,72,153,0.05)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.borderColor = BORDER;
                                            e.currentTarget.style.background = BG2;
                                        }}>
                                        <div style={{ width: 42, height: 42, minWidth: 42, background: `rgba(${primaryRgb},0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "8px" }}>
                                            <span style={{ width: 20, height: 20 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED, marginBottom: "0.25rem" }}>{item.label}</div>
                                            <div style={{ fontWeight: 500, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "1rem", transition: "background 0.2s", borderRadius: "50px" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2.5rem", borderRadius: "12px" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.4rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1.5rem", color: TEXT }}>Envíanos un mensaje</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Tu nombre" style={{ borderRadius: "8px" }} />
                                    <input type="tel" placeholder="Tu teléfono" style={{ borderRadius: "8px" }} />
                                    <input type="text" placeholder="¿Qué servicio te interesa?" style={{ borderRadius: "8px" }} />
                                    <textarea placeholder="Cuéntanos qué diseño tienes en mente..." style={{ borderRadius: "8px" }} />
                                    <button className="btn-primary" style={{ padding: "1rem", fontSize: "1rem", borderRadius: "8px", width: "100%" }}>Enviar Mensaje</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ background: isDark ? "#0a0e27" : "#f0f4f8", borderTop: `1px solid ${BORDER}`, padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, color: "#fff", borderRadius: "8px" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: TEXT }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.9rem", textTransform: "capitalize", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = TEXT}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.85rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: `rgba(${isDark ? '248,250,252' : '15,23,42'},0.3)`, fontSize: "0.75rem", letterSpacing: "0.05em" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: "#fff",
                    padding: "0.9rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700,
                    fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase",