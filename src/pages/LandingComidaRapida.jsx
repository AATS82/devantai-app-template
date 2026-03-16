import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: COMIDA RÁPIDA
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "BURGER KING",
    slogan: "Sabor que desata pasiones",
    descripcion: "Somos especialistas en hamburguesas artesanales, alitas picantes y delivery express en toda la ciudad. Más de 10 años sirviendo los mejores sabores.",
    ciudad: "Santiago, Chile",
    telefono: "+56 9 8765 4321",
    email: "info@burgerking.cl",
    horario: "11:00 - 23:00 | Todos los días",
    anos_experiencia: "10+",
    clientes_atendidos: "50K+",
    color_primario: "#dc2626",
    color_secundario: "#991b1b",
    font_titulo: "Oswald",
    font_cuerpo: "Inter",
    tema: "dark",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1555939594-58d7cb561611?w=800&q=80",
    servicios: [
        { titulo: "HAMBURGUESAS PREMIUM", descripcion: "Carnes 100% angus, pan artesanal tostado y ingredientes frescos seleccionados", icon: "burger" },
        { titulo: "ALITAS PICANTES", descripcion: "Crispy wings con salsas exclusivas: BBQ, buffalo y sriracha casera", icon: "flame" },
        { titulo: "DELIVERY EXPRESS", descripcion: "Pedidos por app o teléfono. Llega caliente en máximo 30 minutos", icon: "truck" },
        { titulo: "COMBOS XL", descripcion: "Hamburguesa + papas + bebida + postre. ¡El mejor valor del mercado!", icon: "box" },
    ],
    testimonios: [
        { nombre: "JUAN PÉREZ", cargo: "Cliente frecuente", texto: "Las hamburguesas son increíbles, el pan está perfecto y el delivery siempre llega rápido. ¡Vuelvo cada semana!" },
        { nombre: "MARÍA GARCÍA", cargo: "Empresaria", texto: "Ideal para comer con colegas. Las alitas son adictivas y el ambiente es excelente para trabajar." },
        { nombre: "CARLOS RODRÍGUEZ", cargo: "Estudiante", texto: "El mejor sitio para comer con amigos. Combos buenos, precio justo y atención rápida. Recomendado 100%." },
    ],
};

// SVG Icons para comida_rapida
const Icons = {
    burger: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path d="M7 12c0 .55.45 1 1 1h8c.55 0 1-.45 1-1" /></svg>),
    flame: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 12 15.9V4M7 14C5.5 12.5 5 10.16 5 7.3V5c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2.3c0 2.86-.5 5.32-2 6.7" /><path d="M8 19c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" /><path d="M12 19c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" /><path d="M16 19c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" /></svg>),
    truck: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
    box: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${isDark ? '15,23,42' : '255,255,255'},0.9) 0%, rgba(${primaryRgb},0.2) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom right, transparent 49%, ${BG} 50%)` }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 900, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: `2px solid ${primary}`, padding: "0.6rem 1.5rem", marginBottom: "2rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>
                    ⚡ {d.anos_experiencia} años de puro sabor ⚡
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "1.5rem", textTransform: "uppercase", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: MUTED, maxWidth: 650, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1.1rem 2.8rem", fontSize: "1.05rem", borderRadius: "0" }} onClick={() => scrollTo("contacto")}>PEDIR AHORA</button>
                    <button className="btn-outline" style={{ padding: "1.1rem 2.8rem", fontSize: "1.05rem", borderRadius: "0" }} onClick={() => scrollTo("servicios")}>VER MENÚ</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", background: BG }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 4rem 4rem 5rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: `2px solid ${primary}`, padding: "0.6rem 1.5rem", marginBottom: "2rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ⚡ {d.anos_experiencia} AÑOS ⚡
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.5rem", textTransform: "uppercase", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "1.15rem", color: MUTED, marginBottom: "2.5rem", lineHeight: 1.7, maxWidth: 450 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.2rem", fontSize: "0.95rem", borderRadius: "0" }} onClick={() => scrollTo("contacto")}>PEDIR AHORA</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.2rem", fontSize: "0.95rem", borderRadius: "0" }} onClick={() => scrollTo("servicios")}>VER MENÚ</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 30%, rgba(${primaryRgb},0.3) 100%)` }} />
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(to right, ${BG}, transparent)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `4px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 1000 }}>
                <div style={{ fontSize: "0.9rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2.5rem", fontWeight: 700 }}>
                    {d.anos_experiencia} AÑOS — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "2.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 80, height: 4, background: primary, margin: "0 auto 2.5rem" }} />
                <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: MUTED, maxWidth: 700, margin: "0 auto 3.5rem", lineHeight: 1.8 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1.2rem 3rem", fontSize: "1.05rem", borderRadius: "0" }} onClick={() => scrollTo("contacto")}>PEDIR AHORA</button>
                    <button className="btn-outline" style={{ padding: "1.2rem 3rem", fontSize: "1.05rem", borderRadius: "0" }} onClick={() => scrollTo("servicios")}>VER MENÚ</button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div className="service-card" style={{ background: BG2, border: `2px solid ${BORDER}`, overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}>
                        <div style={{ height: 4, background: primary, width: 0, transition: "width 0.4s ease" }} className="card-accent" />
                        <div style={{ padding: "2.5rem 2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                            <div style={{ width: 60, height: 60, minWidth: 60, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary }}>
                                <span style={{ width: 28, height: 28 }}>{Icons[s.icon] || Icons.burger}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.35rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem", color: TEXT }}>{s.titulo}</h3>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", padding: "2rem 2.5rem", background: BG2, border: `2px solid ${BORDER}`, borderLeft: `5px solid ${primary}`, transition: "all 0.3s", cursor: "pointer" }}
                        onMouseOver={e => e.currentTarget.style.background = `rgba(${primaryRgb},0.08)`}
                        onMouseOut={e => e.currentTarget.style.background = BG2}>
                        <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3.5rem", fontWeight: 900, color: `rgba(${primaryRgb},0.3)`, minWidth: 70, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 48, height: 48, minWidth: 48, color: primary }}>
                            <span style={{ width: 32, height: 32, display: "block" }}>{Icons[s.icon] || Icons.burger}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.25rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "0.3rem", color: TEXT }}>{s.titulo}</h3>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `2px solid ${primary}`, overflow: "hidden", height: "100%" }}>
                        <div style={{ width: "100%", height: 4, background: primary }} />
                        <div style={{ padding: "3.5rem 3rem" }}>
                            <div style={{ width: 72, height: 72, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, marginBottom: "1.5rem" }}>
                                <span style={{ width: 36, height: 36 }}>{Icons[featured.icon] || Icons.burger}</span>
                            </div>
                            <div style={{ fontSize: "0.85rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 800 }}>★ ESTRELLA DEL MENÚ ★</div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.2rem", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.0, marginBottom: "1.2rem", color: TEXT }}>{featured.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "1.05rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{ background: BG2, border: `2px solid ${BORDER}`, overflow: "hidden", transition: "all 0.3s" }}>
                            <div style={{ width: 0, height: 4, background: primary, transition: "width 0.4s ease" }} className="card-accent" />
                            <div style={{ padding: "1.75rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                                <div style={{ width: 44, height: 44, minWidth: 44, background: `rgba(${primaryRgb},0.12)`, border: `1px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary }}>
                                    <span style={{ width: 22, height: 22 }}>{Icons[s.icon] || Icons.burger}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.05rem", fontWeight: 800, textTransform: "uppercase", marginBottom: "0.4rem", color: TEXT }}>{s.titulo}</h3>
                                    <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.5 }}>{s.descripcion}</p>
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

function NosotrosImage({ d, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1555939594-58d7cb561611?w=800&q=80'}
                alt="Nuestro equipo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Clientes satisfechos" },
                { n: "98%", l: "Tasa de satisfacción" },
                { n: "30min", l: "Tiempo de entrega" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.2rem", background: BG2, border: `2px solid ${BORDER}`, borderTop: `4px solid ${primary}` }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3rem", fontWeight: 900, color: primary, lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingComidaRapida({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#0a0a0a' : '#ffffff';
    const BG2 = isDark ? '#151515' : '#f5f5f5';
    const TEXT = isDark ? '#ffffff' : '#000000';
    const MUTED = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const primary = d.color_primario || '#dc2626';
    const secondary = d.color_secundario || '#991b1b';
    const fontTitulo = d.font_titulo || 'Oswald';
    const fontCuerpo = d.font_cuerpo || 'Inter';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@700;800;900&family=${fontCuerpo.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "BR").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER };

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
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 600; font-size: 0.95rem; transition: color 0.2s; letter-spacing: 0.05em; text-transform: uppercase; }
                .nav-link:hover { color: ${TEXT}; }
                .btn-primary { background: var(--primary); color: #fff; border: none; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; }
                .btn-primary:hover { background: var(--primary-dark); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(${primaryRgb},0.4); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 2px solid ${TEXT}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; }
                .btn-outline:hover { border-color: var(--primary); color: var(--primary); }
                .service-card:hover { border-color: var(--primary); transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.3); }
                .service-card:hover .card-accent { width: 100%; }
                .card-accent { height: 4px; background: var(--primary); width: 0; transition: width 0.4s ease; }
                .testim-card { background: var(--bg2); border: 2px solid var(--border); padding: 2.2rem; transition: border-color 0.3s; }
                .testim-card:hover { border-color: var(--primary); }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
                .divider-line { flex: 1; height: 2px; background: var(--border); }
                .divider-dot { width: 8px; height: 8px; background: var(--primary); }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: var(--bg); border: 2px solid var(--border); color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.95rem 1.2rem; width: 100%; outline: none; transition: border-color 0.2s; }
                input:focus, textarea:focus { border-color: var(--primary); }
                textarea { resize: vertical; min-height: 130px; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .stats-grid { grid-template-columns: 1fr 1fr !important; }
                    .contact-grid { grid-template-columns: 1fr !important; }
                    .hero-split { grid-template-columns: 1fr !important; }
                    .hero-split > div:last-child { min-height: 350px; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.2rem 2rem",
                background: scrolled ? `rgba(${isDark ? '10,10,10' : '255,255,255'},0.97)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.05em", color: "#fff" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.15rem", letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.7rem 1.6rem", fontSize: "0.85rem" }} onClick={() => scrollTo("contacto")}>PEDIR</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 70, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `2px solid ${BORDER}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ fontSize: "1rem" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.9rem", fontSize: "0.9rem", width: "100%" }} onClick={() => scrollTo("contacto")}>PEDIR AHORA</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "2.5rem 2rem", color: "#fff" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "1rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Clientes satisfechos" },
                        { n: "98%", l: "Satisfacción" },
                        { n: "24h", l: "Disponibilidad" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.4rem", fontWeight: 900, letterSpacing: "-0.02em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.9, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: BG2, padding: "7rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem" }}>Nuestro menú</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem", color: TEXT }}>Especialidades de la casa</h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS ── */}
            <section id="nosotros" style={{ background: BG, padding: "7rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem" }}>Nuestra esencia</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.0, marginBottom: "1.5rem", color: TEXT }}>Sabor que marca diferencia</h2>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1.05rem" }}>{d.descripcion}</p>
                        <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.95rem" }} onClick={() => scrollTo("contacto")}>PEDIR AHORA</button>
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

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: BG2, padding: "7rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem" }}>Opiniones</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 900, textTransform: "uppercase", marginBottom: "4rem", color: TEXT }}>Qué dicen nuestros clientes</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div className="testim-card">
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.2rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 18, height: 18 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "1.75rem", fontSize: "1rem" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.1rem", color: "#fff" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: TEXT, textTransform: "uppercase" }}>{t.nombre}</div>
                                            <div style={{ color: MUTED, fontSize: "0.8rem" }}>{t.cargo}</div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ── */}
            <section id="contacto" style={{ background: BG, padding: "7rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem" }}>Contacto</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 900, textTransform: "uppercase", marginBottom: "4rem", color: TEXT }}>Hablemos sobre tu orden</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "4.5rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Dirección", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start", padding: "1.5rem", background: BG2, border: `2px solid ${BORDER}` }}>
                                        <div style={{ width: 48, height: 48, minWidth: 48, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary }}>
                                            <span style={{ width: 22, height: 22 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: MUTED, marginBottom: "0.3rem", fontWeight: 700 }}>{item.label}</div>
                                            <div style={{ fontWeight: 600, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem", background: "#25d366", color: "#fff", padding: "1.2rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "1rem", transition: "background 0.2s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 24, height: 24 }}>{Icons.whatsapp}</span>
                                    WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `2px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "2rem", color: TEXT }}>Envía tu pedido</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                                    <input type="text" placeholder="Tu nombre" style={{ color: TEXT }} />
                                    <input type="tel" placeholder="Tu teléfono" style={{ color: TEXT }} />
                                    <input type="text" placeholder="Tu dirección" style={{ color: TEXT }} />
                                    <textarea placeholder="Cuéntanos qué deseas pedir..." style={{ color: TEXT }} />
                                    <button className="btn-primary" style={{ padding: "1.1rem", fontSize: "1rem", width: "100%", fontWeight: 900 }}>ENVIAR PEDIDO</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: BG2, borderTop: `2px solid ${BORDER}`, padding: "3.5rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2.5rem", borderBottom: `2px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, color: "#fff" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.05rem", textTransform: "uppercase", letterSpacing: "0.08em", color: TEXT }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.85rem", textTransform: "uppercase", transition: "color 0.2s", fontWeight: 600, letterSpacing: "0.05em" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = TEXT}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.85rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: `rgba(${primaryRgb},0.5)`, fontSize: "0.75rem", letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: "#fff",
                    padding: "1rem 2rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900,
                    fontSize: "0.95rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 8px 32px rgba(${primaryRgb},0.5)`,
                    transition: "all 0.2s",
                }}
                    onMouseOver={e => { e.currentTarget.style.background = secondary; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = primary; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}