import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: GIMNASIO
// Perfil: BOLD_OSCURO
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "IRON ELITE",
    slogan: "Transforma tu cuerpo, domina tu mente",
    descripcion: "Somos el gimnasio de referencia en Santiago. Con equipamiento de clase mundial, entrenadores certificados y programas personalizados, te ayudamos a alcanzar tus objetivos fitness.",
    ciudad: "Santiago, Chile",
    telefono: "+56 9 1234 5678",
    email: "info@ironelite.cl",
    horario: "Lunes-Viernes 6am-11pm | Sábado-Domingo 7am-9pm",
    anos_experiencia: "12",
    clientes_atendidos: "3500+",
    color_primario: "#dc2626",
    color_secundario: "#991b1b",
    font_titulo: "Oswald",
    font_cuerpo: "Inter",
    tema: "dark",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    servicios: [
        { titulo: "MUSCULACIÓN", descripcion: "Entrena con equipamiento profesional y técnica perfecta", icon: "dumbbell" },
        { titulo: "CARDIO", descripcion: "Máquinas de última generación para tu rutina cardiovascular", icon: "heart" },
        { titulo: "ENTRENAMIENTO PERSONAL", descripcion: "Planes customizados con nuestros entrenadores certificados", icon: "zap" },
        { titulo: "CLASES GRUPALES", descripcion: "CrossFit, Spinning, Yoga y más disciplinas", icon: "users" },
    ],
    testimonios: [
        { nombre: "CARLOS MENÉNDEZ", cargo: "Empresario", texto: "Hace 8 meses cambié mi vida aquí. Los entrenadores saben exactamente lo que hacen y los resultados hablan por sí solos." },
        { nombre: "MARÍA ROJAS", cargo: "Diseñadora gráfica", texto: "El ambiente es increíble, la comunidad es motivadora y las clases grupales son lo mejor que me ha pasado." },
        { nombre: "DIEGO TORRES", cargo: "Ingeniero", texto: "Finalmente encontré un lugar donde puedo entrenar como se debe. Equipamiento profesional y atención de excelencia." },
    ],
};

// SVG Icons para gimnasio
const Icons = {
    dumbbell: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4L9.6 9.6M6 6l3 3m9 9l3 3M6 18l3-3m9-9l3-3M3 3l2 2m14 14l2 2M5 5l4 4m6 6l4 4M3 21l4-4m10-10l4-4" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    zap: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    users: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, scrollTo, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${primaryRgb},0.3) 0%, transparent 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom, transparent 49%, ${BG} 50%)` }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 900, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: `2px solid ${primary}`, padding: "0.75rem 1.5rem", borderRadius: 0, marginBottom: "2.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>
                    ⚡ {d.anos_experiencia} AÑOS DE EXCELENCIA ⚡
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(4rem, 14vw, 9rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "1.5rem", textTransform: "uppercase", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: MUTED, maxWidth: 600, margin: "0 auto 3rem", lineHeight: 1.6, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1.2rem 2.5rem", fontSize: "1rem", borderRadius: 0, background: primary }} onClick={() => scrollTo("contacto")}>SOLICITAR PRUEBA GRATIS</button>
                    <button className="btn-outline" style={{ padding: "1.2rem 2.5rem", fontSize: "1rem", borderRadius: 0, borderColor: primary, color: primary }} onClick={() => scrollTo("servicios")}>CONOCER PLANES</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden", background: BG }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 4rem", background: BG, zIndex: 1, borderRight: `2px solid ${primary}` }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: `2px solid ${primary}`, padding: "0.75rem 1.5rem", borderRadius: 0, marginBottom: "2.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, width: "fit-content" }}>
                    ⚡ {d.anos_experiencia} AÑOS ⚡
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "1.5rem", textTransform: "uppercase", color: TEXT }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.1rem", color: MUTED, marginBottom: "3rem", lineHeight: 1.7, maxWidth: 420, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.03em" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: 0, background: primary }} onClick={() => scrollTo("contacto")}>PRUEBA GRATIS</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.95rem", borderRadius: 0, borderColor: primary, color: primary }} onClick={() => scrollTo("servicios")}>PLANES</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to left, ${BG} 0%, transparent 40%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `3px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.85rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2.5rem", fontWeight: 900 }}>
                    {d.anos_experiencia} AÑOS — {d.ciudad.toUpperCase()}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(4rem, 12vw, 8rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "2.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 80, height: 4, background: primary, margin: "0 auto 2.5rem" }} />
                <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: MUTED, maxWidth: 560, margin: "0 auto 3.5rem", lineHeight: 1.7, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1.2rem 2.5rem", fontSize: "1rem", borderRadius: 0, background: primary }} onClick={() => scrollTo("contacto")}>PRUEBA GRATIS</button>
                    <button className="btn-outline" style={{ padding: "1.2rem 2.5rem", fontSize: "1rem", borderRadius: 0, borderColor: primary, color: primary }} onClick={() => scrollTo("servicios")}>PLANES</button>
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
                    <div className="service-card" style={{ background: BG2, border: `2px solid ${BORDER}`, borderRadius: 0, overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-8px)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ height: 4, background: primary, width: "100%" }} />
                        <div style={{ padding: "2.5rem" }}>
                            <div style={{ width: 60, height: 60, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, marginBottom: "1.5rem", borderRadius: 0 }}>
                                <span style={{ width: 28, height: 28 }}>{Icons[s.icon] || Icons.dumbbell}</span>
                            </div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem", color: TEXT }}>{s.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.6 }}>{s.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "2rem 2.5rem", background: BG2, border: `2px solid ${BORDER}`, borderLeft: `6px solid ${primary}`, borderRadius: 0, transition: "all 0.3s", cursor: "pointer" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.background = `rgba(${primaryRgb},0.08)`; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = BG2; }}>
                        <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3.5rem", fontWeight: 900, color: primary, minWidth: 80, lineHeight: 1, opacity: 0.2 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 48, height: 48, minWidth: 48, color: primary, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${primaryRgb},0.1)`, border: `2px solid ${primary}`, borderRadius: 0 }}>
                            <span style={{ width: 28, height: 28, display: "block" }}>{Icons[s.icon] || Icons.dumbbell}</span>
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.2rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem", color: TEXT }}>{s.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.5 }}>{s.descripcion}</p>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "2rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `2px solid ${primary}`, borderRadius: 0, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                        <div style={{ height: 6, background: primary, width: "100%" }} />
                        <div style={{ padding: "3rem", flex: 1 }}>
                            <div style={{ width: 70, height: 70, background: `rgba(${primaryRgb},0.2)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, marginBottom: "2rem", borderRadius: 0 }}>
                                <span style={{ width: 36, height: 36 }}>{Icons[featured.icon] || Icons.dumbbell}</span>
                            </div>
                            <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 900 }}>Programa principal</div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.2rem", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1.25rem", color: TEXT }}>{featured.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{ background: BG2, border: `2px solid ${BORDER}`, borderRadius: 0, overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-4px)"; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                            <div style={{ height: 3, background: primary, width: "100%" }} />
                            <div style={{ padding: "1.75rem" }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                                    <div style={{ width: 44, height: 44, minWidth: 44, background: `rgba(${primaryRgb},0.1)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: 0 }}>
                                        <span style={{ width: 22, height: 22 }}>{Icons[s.icon] || Icons.dumbbell}</span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.05rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.4rem", color: TEXT, letterSpacing: "0.03em" }}>{s.titulo}</h3>
                                        <p style={{ color: MUTED, fontSize: "0.85rem", lineHeight: 1.5 }}>{s.descripcion}</p>
                                    </div>
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

function NosotrosImage({ d, primary }) {
    return (
        <div style={{ position: "relative", borderRadius: 0, overflow: "hidden", aspectRatio: "4/3", border: `3px solid ${primary}` }}>
            <img
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80'}
                alt="Nuestro equipo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años" },
                { n: d.clientes_atendidos, l: "Miembros activos" },
                { n: "98%", l: "Satisfacción" },
                { n: "24/7", l: "Disponibilidad" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem 2rem", background: BG2, border: `2px solid ${BORDER}`, borderTop: `4px solid ${primary}`, borderRadius: 0 }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "3.2rem", fontWeight: 900, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingGimnasio({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#000000' : '#ffffff';
    const BG2 = isDark ? '#0f0f0f' : '#f8fafc';
    const TEXT = isDark ? '#ffffff' : '#000000';
    const MUTED = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    const BORDER = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

    const primary = d.color_primario || '#dc2626';
    const secondary = d.color_secundario || '#991b1b';
    const fontTitulo = d.font_titulo || 'Oswald';
    const fontCuerpo = d.font_cuerpo || 'Inter';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@700;800;900&family=${fontCuerpo.replace(/ /g, '+')}:wght@400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "GI").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, scrollTo, BG, BG2, TEXT, MUTED, BORDER };

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
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 700; font-size: 0.95rem; transition: color 0.2s; letter-spacing: 0.05em; text-transform: uppercase; }
                .nav-link:hover { color: ${TEXT}; }
                .btn-primary { background: var(--primary); color: #fff; border: none; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; }
                .btn-primary:hover { background: var(--primary-dark); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(${primaryRgb},0.4); }
                .btn-outline { background: transparent; color: ${primary}; border: 2px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.2s; }
                .btn-outline:hover { background: rgba(${primaryRgb},0.1); transform: translateY(-3px); }
                input, textarea { background: var(--bg2); border: 2px solid var(--border); color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 1rem; width: 100%; outline: none; border-radius: 0; transition: border-color 0.2s; }
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
                    .hero-split > div:last-child { min-height: 350px; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.2rem 2rem",
                background: scrolled ? `rgba(${isDark ? '0,0,0' : '255,255,255'}, 0.95)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.05em", color: "#fff", borderRadius: 0 }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.08em", textTransform: "uppercase", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.85rem", borderRadius: 0 }} onClick={() => scrollTo("contacto")}>PRUEBA GRATIS</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 70, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `2px solid ${primary}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ fontSize: "1.1rem" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.9rem", fontSize: "0.95rem", borderRadius: 0 }} onClick={() => scrollTo("contacto")}>PRUEBA GRATIS</button>
                </div>
            )}

            {/* ── HERO ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "3rem 2rem" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Miembros satisfechos" },
                        { n: "50+", l: "Clases semanales" },
                        { n: "24h", l: "Acceso total" },
                    ].map((s, i) => (
                        <div key={i} style={{ color: "#fff" }}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.02em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.9, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.5rem" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: BG2, padding: "6.5rem 2rem" }}>
                <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <div style={{ flex: 1, height: 2, background: primary }} />
                            <div style={{ width: 8, height: 8, background: primary, borderRadius: 0 }} />
                            <div style={{ flex: 1, height: 2, background: primary }} />
                        </div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Nuestras disciplinas</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem", color: TEXT }}>Planes de entrenamiento</h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── NOSOTROS ── */}
            <section id="nosotros" style={{ background: BG, padding: "6.5rem 2rem" }}>
                <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{ flex: 0, width: 60, height: 2, background: primary }} />
                            <div style={{ width: 6, height: 6, background: primary, borderRadius: 0 }} />
                        </div>
                        <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Quiénes somos</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, marginBottom: "2rem", color: TEXT }}>Tu transformación comienza aquí</h2>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "1rem" }}>{d.descripcion}</p>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>Más de una década en la industria fitness nos ha enseñado que el éxito no es solo sobre levantar pesas. Se trata de mentalidad, consistencia y tener al equipo correcto apoyándote cada paso del camino.</p>
                        <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: 0, background: primary }} onClick={() => scrollTo("contacto")}>COMIENZA TU VIAJE</button>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            const props = { d, primary, primaryRgb, fontTitulo, BG2, TEXT, MUTED, BORDER };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: BG2, padding: "6.5rem 2rem" }}>
                <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <div style={{ flex: 1, height: 2, background: primary }} />
                            <div style={{ width: 8, height: 8, background: primary, borderRadius: 0 }} />
                            <div style={{ flex: 1, height: 2, background: primary }} />
                        </div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Testimonios</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem", color: TEXT }}>Historias de transformación</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div style={{ background: BG, border: `2px solid ${BORDER}`, borderRadius: 0, padding: "2.5rem", transition: "border-color 0.3s" }}
                                    onMouseOver={e => e.currentTarget.style.borderColor = primary}
                                    onMouseOut={e => e.currentTarget.style.borderColor = BORDER}>
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 18, height: 18 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
                                        <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1.1rem", color: "#fff", borderRadius: 0 }}>
                                            {(t.nombre || "U").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: TEXT, textTransform: "uppercase", letterSpacing: "0.03em" }}>{t.nombre}</div>
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
            <section id="contacto" style={{ background: BG, padding: "6.5rem 2rem" }}>
                <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <div style={{ flex: 1, height: 2, background: primary }} />
                            <div style={{ width: 8, height: 8, background: primary, borderRadius: 0 }} />
                            <div style={{ flex: 1, height: 2, background: primary }} />
                        </div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Contacto</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.5rem, 6vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem", color: TEXT }}>¿Listo para empezar?</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.5rem", background: BG2, border: `2px solid ${BORDER}`, borderRadius: 0 }}>
                                        <div style={{ width: 48, height: 48, minWidth: 48, background: `rgba(${primaryRgb},0.15)`, border: `2px solid ${primary}`, display: "flex", alignItems: "center", justifyContent: "center", color: primary, borderRadius: 0 }}>
                                            <span style={{ width: 22, height: 22 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED, marginBottom: "0.35rem", fontWeight: 700 }}>{item.label}</div>
                                            <div style={{ fontWeight: 600, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1.2rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.95rem", transition: "background 0.2s", borderRadius: 0, border: "none", cursor: "pointer" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    Contactar por WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `2px solid ${BORDER}`, borderRadius: 0, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "2rem", color: TEXT, letterSpacing: "0.05em" }}>Envíanos un mensaje</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    <input type="text" placeholder="Tu nombre" style={{ background: BG, borderColor: BORDER }} />
                                    <input type="tel" placeholder="Tu teléfono" style={{ background: BG, borderColor: BORDER }} />
                                    <input type="email" placeholder="Tu email" style={{ background: BG, borderColor: BORDER }} />
                                    <textarea placeholder="¿En qué te podemos ayudar?" style={{ background: BG, borderColor: BORDER }} />
                                    <button className="btn-primary" style={{ padding: "1.1rem", fontSize: "0.95rem", borderRadius: 0, width: "100%", background: primary }}>ENVIAR MENSAJE</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: BG2, borderTop: `2px solid ${primary}`, padding: "3.5rem 2rem 2rem" }}>
                <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2.5rem", paddingBottom: "2.5rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                            <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "0.95rem", color: "#fff", borderRadius: 0 }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: TEXT }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.85rem", textTransform: "uppercase", transition: "color 0.2s", fontWeight: 600, letterSpacing: "0.03em" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = TEXT}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.8rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: `rgba(${primaryRgb},0.4)`, fontSize: "0.75rem", letterSpacing: "0.08em", fontWeight: 700 }}>POWERED BY DEVANTAI</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2.5rem", right: "2.5rem",
                    background: primary, color: "#fff",
                    padding: "1rem 2rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 900,
                    fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 8px 32px rgba(${primaryRgb},0.5)`,
                    borderRadius: 0,
                    transition: "all 0.2s",
                }}
                    onMouseOver={e => { e.currentTarget.style.background = secondary; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = primary; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Entrar →
                </button>
            )}
        </div>
    );
}