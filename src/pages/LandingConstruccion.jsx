import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: CONSTRUCCIÓN
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "BuildForce Construcciones",
    slogan: "Proyectos de obra que transforman ciudades",
    descripcion: "Somos una constructora con más de 15 años de experiencia en grandes proyectos residenciales, comerciales e industriales. Contamos con certificaciones de calidad y garantía en cada una de nuestras obras.",
    ciudad: "Santiago, Chile",
    telefono: "+56 2 2431 8900",
    email: "contacto@buildforce.cl",
    horario: "Lun - Vie: 08:00 - 18:00",
    anos_experiencia: "15+",
    clientes_atendidos: "250+",
    color_primario: "#f59e0b",
    color_secundario: "#d97706",
    font_titulo: "Oswald",
    font_cuerpo: "Roboto",
    tema: "dark",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1504917595217-3404ee19ce97?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    servicios: [
        { titulo: "Obras Residenciales", descripcion: "Proyectos de viviendas, departamentos y complejos habitacionales con estándares de calidad internacionales.", icon: "building" },
        { titulo: "Proyectos Comerciales", descripcion: "Centros comerciales, oficinas y locales diseñados para maximizar valor y funcionalidad.", icon: "factory" },
        { titulo: "Infraestructura Vial", descripcion: "Carreteras, puentes y obras de infraestructura crítica con máxima precisión técnica.", icon: "hard_hat" },
        { titulo: "Reparación y Mantención", descripcion: "Servicios de reparación, restauración y mantención de estructuras existentes.", icon: "wrench" },
    ],
    testimonios: [
        { nombre: "Rodrigo Martínez", cargo: "Gerente General - Empresa Inmobiliaria", texto: "BuildForce entregó nuestro proyecto residencial en tiempo y forma. Su profesionalismo y atención al detalle fueron excepcionales. Los recomendamos ampliamente." },
        { nombre: "Patricia González", cargo: "Directora de Operaciones - Mall Centro", texto: "Trabajar con BuildForce fue una excelente experiencia. Cumplieron con todos los plazos, el equipo fue muy coordinado y la calidad de la obra es impecable." },
        { nombre: "Carlos Hernández", cargo: "Alcalde - Municipalidad de La Florida", texto: "El proyecto de infraestructura vial fue ejecutado con la máxima profesionalidad. BuildForce demostró ser un socio confiable y competente para proyectos públicos." },
    ],
};

// SVG Icons for construction
const Icons = {
    building: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 3 20 7.5 20 19.5 12 24 4 19.5 4 7.5 12 3" /><polyline points="12 12 20 7.5" /><polyline points="12 12 12 24" /><polyline points="12 12 4 7.5" /><line x1="8" y1="5.5" x2="8" y2="19.5" /><line x1="16" y1="5.5" x2="16" y2="19.5" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="8" y1="19" x2="16" y2="19" /></svg>),
    factory: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M4 20V10h3V4h2v6h2V4h2v6h2V4h2v6h3v10M6 8v12M12 8v12M18 8v12" /><rect x="2" y="16" width="20" height="4" /></svg>),
    hard_hat: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12v2h20v-2c0-5.52-4.48-10-10-10z" /><path d="M7 20h10a2 2 0 0 1 2 2v1H5v-1a2 2 0 0 1 2-2z" /></svg>),
    wrench: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>),
    shield: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
    medal: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>),
    hammer: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 1h-8a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h8" /><path d="M16  9v6" /><path d="M9 21h6v-4a3 3 0 0 0-3-3 3 3 0 0 0-3 3v4z" /></svg>),
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
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: isDark ? "#0a0a0a" : "#ffffff" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1504917595217-340c-4ee19ce97?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${isDark ? 'rgba(10,10,10,0.9)' : 'rgba(255,255,255,0.95)'} 0%, rgba(${primaryRgb},0.15) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom right, transparent 49%, ${isDark ? '#0a0a0a' : '#ffffff'} 50%)` }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 780, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, padding: "0.6rem 1.2rem", borderRadius: "4px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary }}>
                    ✓ {d.anos_experiencia} años de trayectoria
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "1.25rem", color: TEXT, textTransform: "uppercase" }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: MUTED, maxWidth: 580, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "4px" }} onClick={() => scrollTo("contacto")}>Solicitar Presupuesto</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "4px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", background: isDark ? "#0a0a0a" : "#ffffff" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 3rem 4rem 4rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, padding: "0.6rem 1.2rem", borderRadius: "4px", marginBottom: "1.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ✓ {d.anos_experiencia} años de trayectoria
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.02em", marginBottom: "1.25rem", color: TEXT, textTransform: "uppercase" }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.1rem", color: MUTED, marginBottom: "2.5rem", lineHeight: 1.7, maxWidth: 420 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "4px" }} onClick={() => scrollTo("contacto")}>Solicitar Presupuesto</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: "4px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1504917595217-340c-4ee19ce97?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 30%, rgba(${primaryRgb},0.2) 100%)` }} />
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${BG}, transparent)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `4px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.8rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 700 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 4, background: primary, margin: "0 auto 2rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: MUTED, maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.7 }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "4px" }} onClick={() => scrollTo("contacto")}>Solicitar Presupuesto</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "1rem", borderRadius: "4px" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
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
                    <div className="service-card" style={{ background: BG2, border: `2px solid ${BORDER}`, borderRadius: "4px", overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}>
                        <div className="card-accent" style={{ height: "4px", background: primary, width: "0", transition: "width 0.4s ease" }} />
                        <div style={{ padding: "2.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                            <div style={{ width: 60, height: 60, minWidth: 60, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "4px" }}>
                                <span style={{ width: 28, height: 28 }}>{Icons[s.icon] || Icons.wrench}</span>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.3rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.75rem", color: TEXT }}>{s.titulo}</h3>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "2rem", background: BG2, border: `2px solid ${BORDER}`, borderLeft: `4px solid ${primary}`, transition: "all 0.3s", borderRadius: "4px" }}
                        onMouseOver={e => e.currentTarget.style.borderColor = primary}
                        onMouseOut={e => e.currentTarget.style.borderColor = BORDER}>
                        <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3.5rem", fontWeight: 800, color: primary, minWidth: 70, lineHeight: 1, opacity: 0.3 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 48, height: 48, minWidth: 48, color: primary, background: `rgba(${primaryRgb},0.1)`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ width: 28, height: 28, display: "block" }}>{Icons[s.icon] || Icons.wrench}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "0.3rem", color: TEXT }}>{s.titulo}</h3>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div className="service-card" style={{ height: "100%", background: BG2, border: `2px solid ${primary}`, borderRadius: "4px", overflow: "hidden" }}>
                        <div className="card-accent" style={{ width: "100%", height: "4px", background: primary }} />
                        <div style={{ padding: "3rem 2.5rem" }}>
                            <div style={{ width: 70, height: 70, background: `rgba(${primaryRgb},0.2)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, marginBottom: "1.5rem", borderRadius: "4px" }}>
                                <span style={{ width: 36, height: 36 }}>{Icons[featured.icon] || Icons.wrench}</span>
                            </div>
                            <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.75rem", fontWeight: 700 }}>★ Servicio principal</div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2rem", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1rem", color: TEXT }}>{featured.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div className="service-card" style={{ background: BG2, border: `2px solid ${BORDER}`, borderRadius: "4px", overflow: "hidden" }}>
                            <div className="card-accent" style={{ height: "3px", background: primary, width: "0", transition: "width 0.4s ease" }} />
                            <div style={{ padding: "1.75rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                <div style={{ width: 45, height: 45, minWidth: 45, background: `rgba(${primaryRgb},0.1)`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "4px", border: `1px solid ${primary}` }}>
                                    <span style={{ width: 22, height: 22 }}>{Icons[s.icon] || Icons.wrench}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.3rem", color: TEXT }}>{s.titulo}</h3>
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
        <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden", aspectRatio: "4/3", border: `2px solid ${BORDER}` }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80'}
                alt="Nuestro equipo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)` }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Proyectos ejecutados" },
                { n: "100%", l: "Cumplimiento de plazos" },
                { n: "ISO 9001", l: "Certificación calidad" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem", background: BG2, border: `2px solid ${BORDER}`, borderTop: `4px solid ${primary}`, borderRadius: "4px" }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3rem", fontWeight: 800, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.85rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingConstruccion({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';

    const primary = d.color_primario || '#f59e0b';
    const secondary = d.color_secundario || '#d97706';
    const fontTitulo = d.font_titulo || 'Oswald';
    const fontCuerpo = d.font_cuerpo || 'Roboto';
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

    const iniciales = (d.nombre || "BC").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    // Props compartidos para variantes
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
                    --border: ${BORDER};
                    --text: ${TEXT};
                    --muted: ${MUTED};
                }
                .titulo { font-family: '${fontTitulo}', sans-serif; }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight:600; font-size:0.95rem; transition: color 0.2s; letter-spacing:0.03em; text-transform: uppercase; }
                .nav-link:hover { color: ${TEXT}; }
                .btn-primary { background: ${primary}; color: #fff; border: none; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
                .btn-primary:hover { background: ${secondary}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(${primaryRgb},0.35); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 2px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
                .btn-outline:hover { background: rgba(${primaryRgb},0.1); border-color: ${secondary}; }
                .service-card:hover { border-color: ${primary}; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
                .service-card:hover .card-accent { width: 100%; }
                .testim-card { background: ${BG2}; border: 2px solid ${BORDER}; border-radius: 4px; padding: 2rem; transition: border-color 0.3s; }
                .testim-card:hover { border-color: ${primary}; }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
                .divider-line { flex: 1; height: 2px; background: ${BORDER}; }
                .divider-dot { width: 8px; height: 8px; background: ${primary}; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: ${BG}; border: 2px solid ${BORDER}; color: ${TEXT}; font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.85rem 1rem; width: 100%; outline: none; border-radius: 4px; transition: border-color 0.2s; }
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
                    .hero-split > div:last-child { min-height: 300px; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1rem 2rem",
                background: scrolled ? `rgba(${isDark ? '15,23,42' : '255,255,255'},0.97)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.05em", color: "#fff", borderRadius: "4px" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.05em", textTransform: "uppercase", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.85rem", borderRadius: "4px" }} onClick={() => scrollTo("contacto")}>Presupuesto</button>
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
                    <button className="btn-primary" style={{ padding: "0.8rem", fontSize: "0.9rem", borderRadius: "4px" }} onClick={() => scrollTo("contacto")}>Presupuesto</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "2.5rem 2rem" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Proyectos realizados" },
                        { n: "100%", l: "Cumplimiento" },
                        { n: "ISO 9001", l: "Certificado" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.9, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, color: "#fff" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: BG2, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Lo que hacemos</p>
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

            {/* ── POR QUÉ NOSOTROS — elige variante ── */}
            <section id="nosotros" style={{ background: BG, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Por qué elegirnos</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1.5rem", color: TEXT }}>Construcción con excelencia</h2>
                        <p style={{ color: MUTED, lineHeight: 1.7, marginBottom: "2rem", fontSize: "1rem" }}>{d.descripcion}</p>
                        <button className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "0.9rem", borderRadius: "4px" }} onClick={() => scrollTo("contacto")}>Contáctanos</button>
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
            <section id="testimonios" style={{ background: BG2, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Clientes</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "3.5rem", color: TEXT }}>Lo que dicen de nosotros</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div className="testim-card">
                                    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 18, height: 18 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, fontSize: "1.1rem", color: "#fff", borderRadius: "4px" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: TEXT }}>{t.nombre}</div>
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
            <section id="contacto" style={{ background: BG, padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "0.5rem" }}>Contacto</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, textTransform: "uppercase", marginBottom: "3.5rem", color: TEXT }}>Solicitá tu presupuesto</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.5rem", background: BG2, border: `2px solid ${BORDER}`, borderRadius: "4px" }}>
                                        <div style={{ width: 48, height: 48, minWidth: 48, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: "4px" }}>
                                            <span style={{ width: 22, height: 22 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED, marginBottom: "0.25rem", fontWeight: 700 }}>{item.label}</div>
                                            <div style={{ fontWeight: 600, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.95rem", transition: "background 0.2s", borderRadius: "4px" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `2px solid ${BORDER}`, padding: "2.5rem", borderRadius: "4px" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.4rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1.5rem", color: TEXT }}>Mensaje directo</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Tu nombre" style={{ color: TEXT, background: BG }} />
                                    <input type="tel" placeholder="Tu teléfono" style={{ color: TEXT, background: BG }} />
                                    <input type="text" placeholder="Tipo de proyecto" style={{ color: TEXT, background: BG }} />
                                    <textarea placeholder="Cuéntanos más..." style={{ color: TEXT, background: BG }} />
                                    <button className="btn-primary" style={{ padding: "1rem", fontSize: "1rem", borderRadius: "4px", width: "100%" }}>Enviar</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: isDark ? '#050505' : '#f0f0f0', borderTop: `2px solid ${BORDER}`, padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 800, color: "#fff", borderRadius: "4px" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: TEXT }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.9rem", textTransform: "capitalize", transition: "color 0.2s", fontWeight: 600 }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = TEXT}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.85rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: MUTED, fontSize: "0.75rem", letterSpacing: "0.05em" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: "#fff",
                    padding: "1rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 700,
                    fontSize: "0.95rem", letterSpacing: "0.08em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 4px 20px rgba(${primaryRgb},0.4)`,
                    borderRadius: "4px", transition: "all 0.2s",
                }}
                    onMouseOver={e => { e.currentTarget.style.background = secondary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = primary; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                    Entrar al Sistema →
                </button>
            )}
        </div>
    );
}