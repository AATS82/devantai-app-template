import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: DENTISTA
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "Clínica Dental Sonrisa",
    slogan: "Tu sonrisa es nuestra prioridad",
    descripcion: "Ofrecemos servicios odontológicos integrales con tecnología de punta y un equipo de profesionales dedicados a brindarte la mejor atención.",
    ciudad: "Santiago, Chile",
    telefono: "+56 2 2345 6789",
    email: "contacto@sonrisadentalcl.com",
    horario: "Lunes a Viernes: 09:00 - 19:00 | Sábado: 10:00 - 14:00",
    anos_experiencia: "18",
    clientes_atendidos: "5,000+",
    color_primario: "#0066cc",
    color_secundario: "#004499",
    font_titulo: "Montserrat",
    font_cuerpo: "Inter",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1606811841689-23db3c6bdf32?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&q=80",
    servicios: [
        { titulo: "Limpieza Dental", descripcion: "Limpieza profesional y eliminación de sarro para mantener una dentadura saludable y radiante.", icon: "sparkles" },
        { titulo: "Ortodoncia", descripcion: "Tratamientos correctivos con brackets tradicionales y alineadores transparentes Invisalign.", icon: "teeth" },
        { titulo: "Implantes Dentales", descripcion: "Reemplazo de dientes faltantes con implantes de titanio de última generación.", icon: "crown" },
        { titulo: "Blanqueamiento", descripcion: "Blanqueamiento profesional con tecnología LED para una sonrisa más blanca y brillante.", icon: "smile" },
    ],
    testimonios: [
        { nombre: "Marcela González", cargo: "Ejecutiva", texto: "Excelente atención y profesionalismo. El doctor escucha tus preocupaciones y explica todos los procedimientos con claridad." },
        { nombre: "Roberto Martínez", cargo: "Empresario", texto: "Después de 20 años sin visitar al dentista, me atrevía a volver con esta clínica. La experiencia fue transformadora." },
        { nombre: "Andrea Rojas", cargo: "Diseñadora Gráfica", texto: "Los resultados del blanqueamiento son increíbles. Me siento mucho más confiada mostrando mi sonrisa en fotos." },
    ],
};

// SVG Icons para Dentista
const Icons = {
    sparkles: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="5" r="1" /><circle cx="5" cy="19" r="1" /><circle cx="5" cy="5" r="1" /><circle cx="19" cy="19" r="1" /><path d="M12 13v8M13 12h8M11 12H3M12 11V3" /></svg>),
    teeth: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0-1 1-2 2-2s1 1 1 2-1 2-1 2-2 0-2-2zm4 0c0-1 1-2 2-2s1 1 1 2-1 2-1 2-2 0-2-2zm4 0c0-1 1-2 2-2s1 1 1 2-1 2-1 2-2 0-2-2zm4 0c0-1 1-2 2-2s1 1 1 2-1 2-1 2-2 0-2-2zm4 0c0-1 1-2 2-2s1 1 1 2-1 2-1 2-2 0-2-2zm4 0c0-1 1-2 2-2s1 1 1 2-1 2-1 2-2 0-2-2z" /><path d="M2 14v4c0 2 1 3 3 3h14c2 0 3-1 3-3v-4" /></svg>),
    crown: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1l3 6 6 1-4.5 4.5L18 23l-6-3-6 3 1.5-10.5L3 8l6-1 3-6z" /></svg>),
    smile: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
    alert: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.04h16.94a2 2 0 0 0 1.71-3.04l-8.47-14.14a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>),
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

// ── HERO VARIANTS ──

function HeroCentered({ d, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1606811841689-23db3c6bdf32?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.40)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(15,25,50,0.85) 0%, rgba(${primaryRgb},0.15) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom right, transparent 49%, #0f1932 50%)" }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 780, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.4)`, padding: "0.4rem 1rem", borderRadius: "6px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary }}>
                    ★ {d.anos_experiencia} años de experiencia ★
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem", textTransform: "uppercase" }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.8)", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "6px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "6px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 3rem 4rem 4rem", background: "#0f1932", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.4)`, padding: "0.4rem 1rem", borderRadius: "6px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ★ {d.anos_experiencia} años de experiencia ★
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem", textTransform: "uppercase" }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", marginBottom: "2.5rem", lineHeight: 1.7, maxWidth: 420 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "6px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "6px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1606811841689-23db3c6bdf32?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, #0f1932 0%, transparent 30%, rgba(${primaryRgb},0.2) 100%)` }} />
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #0f1932, transparent)" }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f1932", borderBottom: `3px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 600 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2rem" }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 3, background: primary, margin: "0 auto 2rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.7 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "6px" }} onClick={() => scrollTo("contacto")}>Agendar Cita</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "6px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div className="service-card">
                        <div className="card-accent" />
                        <div style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                            <div style={{ width: 52, height: 52, minWidth: 52, background: `rgba(${primaryRgb},0.12)`, border: `1px solid rgba(${primaryRgb},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "8px" }}>
                                <span style={{ width: 24, height: 24 }}>{Icons[s.icon] || Icons.sparkles}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.3rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.5rem" }}>{s.titulo}</h3>
                                <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "1.75rem 2rem", background: "var(--bg3)", border: "1px solid var(--border)", borderLeft: `4px solid ${primary}`, transition: "all 0.3s", borderRadius: "6px" }}
                        onMouseOver={e => e.currentTarget.style.background = `rgba(${primaryRgb},0.05)`}
                        onMouseOut={e => e.currentTarget.style.background = "var(--bg3)"}>
                        <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3rem", fontWeight: 800, color: `rgba(${primaryRgb},0.25)`, minWidth: 60, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 40, height: 40, minWidth: 40, color: primary }}>
                            <span style={{ width: 28, height: 28, display: "block" }}>{Icons[s.icon] || Icons.sparkles}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.3rem" }}>{s.titulo}</h3>
                            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>{s.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, primary, primaryRgb, fontTitulo }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "1.5rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div className="service-card" style={{ height: "100%" }}>
                        <div className="card-accent" style={{ width: "100%" }} />
                        <div style={{ padding: "3rem 2.5rem" }}>
                            <div style={{ width: 64, height: 64, background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.4)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, marginBottom: "1.5rem", borderRadius: "8px" }}>
                                <span style={{ width: 32, height: 32 }}>{Icons[featured.icon] || Icons.sparkles}</span>
                            </div>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem", fontWeight: 600 }}>Servicio principal</div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1rem" }}>{featured.titulo}</h3>
                            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div className="service-card">
                            <div className="card-accent" />
                            <div style={{ padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                <div style={{ width: 40, height: 40, minWidth: 40, background: `rgba(${primaryRgb},0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "6px" }}>
                                    <span style={{ width: 20, height: 20 }}>{Icons[s.icon] || Icons.sparkles}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem" }}>{s.titulo}</h3>
                                    <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{s.descripcion}</p>
                                </div>
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
        <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/