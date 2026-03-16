import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: FARMACIA
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "FarmaVida Plus",
    slogan: "Tu salud es nuestra prioridad",
    descripcion: "Farmacia integral con más de 15 años brindando soluciones en salud a la comunidad. Contamos con productos de calidad, atención profesional y servicios especializados.",
    ciudad: "Santiago, Chile",
    telefono: "+56 2 2456 7890",
    email: "contacto@farmavida.cl",
    horario: "Lunes a Domingo: 9:00 - 21:00",
    anos_experiencia: "15",
    clientes_atendidos: "12.500+",
    color_primario: "#0d7d5a",
    color_secundario: "#0a5f47",
    font_titulo: "Poppins",
    font_cuerpo: "Inter",
    imagen_hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0e?w=800&q=80",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    servicios: [
        { titulo: "Dispensación de Medicamentos", descripcion: "Asesoramiento profesional en medicamentos prescritos y de venta libre con garantía de calidad.", icon: "capsule" },
        { titulo: "Consultorio Farmacéutico", descripcion: "Consultas especializadas con nuestro equipo de farmacéuticos titulados para orientarte en tu salud.", icon: "stethoscope" },
        { titulo: "Vacunación", descripcion: "Servicio de inmunización con vacunas certificadas en ambiente higiénico y controlado.", icon: "syringe" },
        { titulo: "Dermocosmética", descripcion: "Productos premium para cuidado de la piel recomendados por profesionales de la salud.", icon: "heart" },
    ],
    testimonios: [
        { nombre: "María González", cargo: "Cliente habitual", texto: "Excelente servicio y atención. El equipo farmacéutico siempre me asesora de manera clara y confiable. Muy recomendado." },
        { nombre: "Roberto Silva", cargo: "Paciente crónico", texto: "Llevo 8 años siendo cliente de FarmaVida. Confianza, puntualidad y profesionalismo en cada visita. Son de lo mejor." },
        { nombre: "Daniela López", cargo: "Madre de familia", texto: "Me encanta que puedan consultar sobre medicinas para mis hijos. El trato es cálido y siempre encuentro lo que necesito." },
    ],
};

// SVG Icons
const Icons = {
    capsule: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" /></svg>),
    stethoscope: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.05C4.9 17.5 4 15.5 4 12c0-1.5.5-3 1-4m8 0c.5 1 1 2.5 1 4 0 3.5-1 5.5-1 7.05" /><path d="M19.1 19.05C19.1 17.5 20 15.5 20 12c0-1.5-.5-3-1-4m-8 0c-.5 1-1 2.5-1 4 0 3.5 1 5.5 1 7.05" /><path d="M9 12a3 3 0 0 0 6 0" /><path d="M12 19a7 7 0 0 0 7-7" /><path d="M5 12a7 7 0 0 1 7-7" /></svg>),
    syringe: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l12-4 4 12-12 4-4-12z" /><path d="M14 8l-4 12" /><circle cx="19" cy="3" r="2" /><circle cx="5" cy="21" r="2" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
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
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(13,22,20,0.85) 0%, rgba(${primaryRgb},0.15) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom right, transparent 49%, #0d1614 50%)" }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 780, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.4)`, padding: "0.4rem 1rem", borderRadius: "8px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary }}>
                    ★ {d.anos_experiencia} años de experiencia ★
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem", textTransform: "uppercase" }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.8)", maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "8px" }} onClick={() => scrollTo("contacto")}>Solicitar Consulta</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "8px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 3rem 4rem 4rem", background: "#0d1614", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.4)`, padding: "0.4rem 1rem", borderRadius: "8px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ★ {d.anos_experiencia} años sirviendo tu salud ★
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.25rem", textTransform: "uppercase" }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", marginBottom: "2.5rem", lineHeight: 1.7, maxWidth: 420 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "8px" }} onClick={() => scrollTo("contacto")}>Solicitar Consulta</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "8px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, #0d1614 0%, transparent 30%, rgba(${primaryRgb},0.2) 100%)` }} />
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, #0d1614, transparent)" }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d1614", borderBottom: `3px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 600 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2rem" }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 3, background: primary, margin: "0 auto 2rem", borderRadius: "2px" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.7 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "8px" }} onClick={() => scrollTo("contacto")}>Solicitar Consulta</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "8px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
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
                                <span style={{ width: 24, height: 24 }}>{Icons[s.icon] || Icons.heart}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.3rem", fontWeight: 700, letterSpacing: "0.02em", marginBottom: "0.5rem" }}>{s.titulo}</h3>
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
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "1.75rem 2rem", background: "var(--bg3)", border: "1px solid var(--border)", borderLeft: `4px solid ${primary}`, transition: "all 0.3s", borderRadius: "8px" }}
                        onMouseOver={e => e.currentTarget.style.background = `rgba(${primaryRgb},0.05)`}
                        onMouseOut={e => e.currentTarget.style.background = "var(--bg3)"}>
                        <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3rem", fontWeight: 800, color: `rgba(${primaryRgb},0.25)`, minWidth: 60, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 40, height: 40, minWidth: 40, color: primary }}>
                            <span style={{ width: 28, height: 28, display: "block" }}>{Icons[s.icon] || Icons.heart}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.02em", marginBottom: "0.3rem" }}>{s.titulo}</h3>
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
                    <div className="service-card" style={{ height: "100%", borderRadius: "12px" }}>
                        <div className="card-accent" style={{ width: "100%" }} />
                        <div style={{ padding: "3rem 2.5rem" }}>
                            <div style={{ width: 64, height: 64, background: `rgba(${primaryRgb},0.15)`, border: `1px solid rgba(${primaryRgb},0.4)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, marginBottom: "1.5rem", borderRadius: "8px" }}>
                                <span style={{ width: 32, height: 32 }}>{Icons[featured.icon] || Icons.heart}</span>
                            </div>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem", fontWeight: 600 }}>Servicio destacado</div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "1rem" }}>{featured.titulo}</h3>
                            <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div className="service-card" style={{ borderRadius: "12px" }}>
                            <div className="card-accent" />
                            <div style={{ padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                <div style={{ width: 40, height: 40, minWidth: 40, background: `rgba(${primaryRgb},0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "6px" }}>
                                    <span style={{ width: 20, height: 20 }}>{Icons[s.icon] || Icons.heart}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1rem", fontWeight: 700, marginBottom: "0.3rem" }}>{s.titulo}</h3>
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
        <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0e?w=800&q=80'}
                alt="Nuestro equipo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Clientes atendidos" },
                { n: "99%", l: "Satisfacción garantizada" },
                { n: "24h", l: "Disponibilidad" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2rem", background: "var(--bg3)", border: "1px solid var(--border)", borderTop: `3px solid ${primary}`, borderRadius: "8px" }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.8rem", fontWeight: 800, color: primary, lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingFarmacia({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const primary = d.color_primario || '#0d7d5a';
    const secondary = d.color_secundario || '#0a5f47';
    const fontTitulo = d.font_titulo || 'Poppins';
    const fontCuerpo = d.font_cuerpo || 'Inter';
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

    const iniciales = (d.nombre || "FM").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, scrollTo };

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: "#0d1614", color: "#f0f0f0", overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                :root {
                    --primary: ${primary};
                    --primary-dark: ${secondary};
                    --primary-rgb: ${primaryRgb};
                    --accent: #10b981;
                    --bg: #0d1614;
                    --bg2: #111816;
                    --bg3: #18201d;
                    --border: rgba(255,255,255,0.07);
                    --text: #f0f0f0;
                    --muted: #888;
                }
                .titulo { font-family: '${fontTitulo}', sans-serif; }
                .nav-link { cursor: pointer; color: rgba(255,255,255,0.75); font-weight:500; font-size:0.95rem; transition: color 0.2s; letter-spacing:0.03em; }
                .nav-link:hover { color: #fff; }
                .btn-primary { background: var(--primary); color: #fff; border: none; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
                .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(${primaryRgb},0.35); }
                .btn-outline { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4); cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
                .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
                .service-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; transition: all 0.3s; }
                .service-card:hover { border-color: var(--primary); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(${primaryRgb},0.15); }
                .service-card:hover .card-accent { width: 100%; }
                .card-accent { height: 3px; background: var(--primary); width: 0; transition: width 0.4s ease; }
                .testim-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; transition: border-color 0.3s; }
                .testim-card:hover { border-color: rgba(13,125,90,0.5); }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
                .divider-line { flex: 1; height: 1px; background: var(--border); }
                .divider-dot { width: 6px; height: 6px; background: var(--primary); border-radius: 50%; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: var(--bg); border: 1px solid var(--border); color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.85rem 1rem; width: 100%; outline: none; border-radius: 8px; transition: border-color 0.2s; }
                input:focus, textarea:focus { border-color: var(--primary); }
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

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1rem 2rem",
                background: scrolled ? "rgba(13,22,20,0.97)" : "transparent",
                borderBottom: scrolled ? "1px solid var(--border)" : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "1rem", letterSpacing: "0.05em", color: "#fff", borderRadius: "8px" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem", borderRadius: "8px" }} onClick={() => scrollTo("contacto")}>Consultar Ahora</button>
                </div>
                <button style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: "rgba(13,22,20,0.98)", borderBottom: "1px solid var(--border)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.1rem" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.8rem", fontSize: "0.9rem", borderRadius: "8px" }} onClick={() => scrollTo("contacto")}>Consultar Ahora</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "2rem" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto", textAlign: "center", gap: "1rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años sirviendo" },
                        { n: d.clientes_atendidos, l: "Clientes confiados" },
                        { n: "99%", l: "Satisfacción" },
                        { n: "24/7", l: "Disponibles" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.85, letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Nuestros servicios</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, letterSpacing: "-0.01em", marginBottom: "3.5rem" }}>Cuidamos tu salud integral</h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS ── */}
            <section id="nosotros" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Por qué confiar en nosotros</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>Tu bienestar es nuestra misión</h2>
                        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>{d.descripcion}</p>
                        <button className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "0.9rem", borderRadius: "8px" }} onClick={() => scrollTo("contacto")}>Agendar Consulta</button>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            const props = { d, primary, fontTitulo };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Testimonio de clientes</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginBottom: "3.5rem" }}>Lo que dicen nuestros pacientes</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div className="testim-card">
                                    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "1rem", borderRadius: "6px", color: "#fff" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
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
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Contacta con nosotros</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginBottom: "3.5rem" }}>Estamos aquí para ayudarte</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                                        <div style={{ width: 42, height: 42, minWidth: 42, background: `rgba(${primaryRgb},0.12)`, border: `1px solid rgba(${primaryRgb},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "6px" }}>
                                            <span style={{ width: 20, height: 20 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "0.25rem" }}>{item.label}</div>
                                            <div style={{ fontWeight: 500 }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "1rem", transition: "background 0.2s", borderRadius: "8px" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    Escribir WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", padding: "2.5rem", borderRadius: "12px" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.5rem" }}>Envíanos tu consulta</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Tu nombre completo" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="Asunto de consulta" />
                                    <textarea placeholder="Cuéntanos sobre tu consulta o necesidad..." />
                                    <button className="btn-primary" style={{ padding: "1rem", fontSize: "1rem", borderRadius: "8px", width: "100%" }}>Enviar Consulta</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#0a0f0d", borderTop: "1px solid var(--border)", padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)", marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, borderRadius: "6px" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em" }}>{d.nombre}</span>
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
                        <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Powered by Devantai</p>
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
                    zIndex: 9999, boxShadow: `0 4px 20px rgba(${primaryRgb},0.4)`,
                    borderRadius: "8px",
                    transition: "all 0.2s"
                }}
                onMouseOver={e => {
                    e.currentTarget.style.background = secondary;
                    e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={e => {
                    e.currentTarget.style.background = primary;
                    e.currentTarget.style.transform = "translateY(0)";
                }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}