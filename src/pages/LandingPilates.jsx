import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: PILATES
// Perfil: elegante_premium | Tema: light/dark
// ============================================================

const DEFAULT_DATA = {
    nombre: "Essence Pilates",
    slogan: "Transforma tu cuerpo, equilibra tu mente",
    descripcion: "Studio de pilates y ejercicio funcional con metodología integral. Clases personalizadas en equipos de última tecnología con instructores certificados internacionalmente.",
    ciudad: "Santiago, Chile",
    telefono: "+56 9 1234 5678",
    email: "hola@essencepilates.cl",
    horario: "Lun-Vie: 6:00 - 20:00 | Sáb: 8:00 - 14:00",
    anos_experiencia: "12",
    clientes_atendidos: "2,500+",
    color_primario: "#c9a962",
    color_secundario: "#a68650",
    font_titulo: "Playfair Display",
    font_cuerpo: "Inter",
    tema: "light",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1518611505867-48a0b76cdc4d?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1506435773649-6f3db1b912d7?w=1000&q=80",
    servicios: [
        { titulo: "Pilates Clásico", descripcion: "Trabajo en equipos: reformer, cadillac y barril para máxima precisión.", icon: "pilates" },
        { titulo: "Entrenamiento Funcional", descripcion: "Combinación de pilates con ejercicios dinámicos para resultados integrales.", icon: "strength" },
        { titulo: "Clases Grupales", descripcion: "Sesiones colectivas de pilates mat en ambiente motivador y comunitario.", icon: "group" },
        { titulo: "Rehabilitación y Wellness", descripcion: "Programas personalizados para recuperación de lesiones y prevención.", icon: "wellness" },
    ],
    testimonios: [
        { nombre: "Magdalena Ruiz", cargo: "Ejecutiva", texto: "Después de 6 meses en Essence Pilates cambió mi postura y mi energía. Nunca lo dejaré." },
        { nombre: "Carlos López", cargo: "Abogado", texto: "El mejor invento para mi espalda. Los instructores son excepcionales y muy profesionales." },
        { nombre: "Patricia Gómez", cargo: "Médica", texto: "Como profesional de la salud, recomiendo Essence a todos mis pacientes. Excelente." },
    ],
};

// SVG Icons para Pilates
const Icons = {
    pilates: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2M8 12h8M12 8v8" /></svg>),
    strength: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 5v14M18 5v14M4 9h4v6H4zM16 9h4v6h-4zM10 6v12M14 6v12" /></svg>),
    group: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M12 14a4 4 0 1 1-8 0 4 4 0 0 1 8 0M20 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>),
    wellness: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
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

function HeroCentered({ d, isDark, BG, BG2, TEXT, MUTED, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero}')`, backgroundSize: "cover", backgroundPosition: "center", filter: isDark ? "brightness(0.45)" : "brightness(0.7)" }} />
            <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(${primaryRgb},0.1) 100%)` : `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(${primaryRgb},0.08) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: isDark ? "linear-gradient(to bottom right, transparent 49%, #0f172a 50%)" : "linear-gradient(to bottom right, transparent 49%, #ffffff 50%)" }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 820, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "2rem", borderBottom: `1px solid ${primary}`, paddingBottom: "0.75rem" }}>
                    ✦ {d.anos_experiencia} años de excelencia ✦
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "1.15rem", color: MUTED, maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.8, letterSpacing: "0.01em" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: 0 }} onClick={() => scrollTo("contacto")}>Agendar Clase</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: 0 }} onClick={() => scrollTo("servicios")}>Nuestros Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, isDark, BG, BG2, TEXT, MUTED, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 5rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "2rem", borderBottom: `1px solid ${primary}`, paddingBottom: "0.75rem", width: "fit-content" }}>
                    ✦ {d.anos_experiencia} años ✦
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "1.1rem", color: MUTED, marginBottom: "2.5rem", lineHeight: 1.8, maxWidth: 450 }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "0.95rem 2rem", fontSize: "0.9rem", borderRadius: 0 }} onClick={() => scrollTo("contacto")}>Agendar</button>
                    <button className="btn-outline" style={{ padding: "0.95rem 2rem", fontSize: "0.9rem", borderRadius: 0 }} onClick={() => scrollTo("servicios")}>Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(to right, #0f172a 0%, transparent 40%)` : `linear-gradient(to right, #ffffff 0%, transparent 40%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, isDark, BG, BG2, TEXT, MUTED, primary, primaryRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `1px solid ${primary}`, overflow: "hidden", paddingTop: "60px" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.75rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "2rem", fontWeight: 500, borderBottom: `1px solid ${primary}`, paddingBottom: "0.75rem", display: "inline-block" }}>
                    Bienvenido a {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem, 10vw, 6.5rem)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 1, background: primary, margin: "2rem auto" }} />
                <p style={{ fontSize: "1.1rem", color: MUTED, maxWidth: 580, margin: "0 auto 3rem", lineHeight: 1.8, letterSpacing: "0.01em" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: 0 }} onClick={() => scrollTo("contacto")}>Agendar Ahora</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem", borderRadius: 0 }} onClick={() => scrollTo("servicios")}>Explorar</button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, isDark, BG, BG2, TEXT, MUTED, BORDER, primary, primaryRgb, fontTitulo }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 120}>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem 2.5rem", transition: "all 0.3s", cursor: "pointer" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-8px)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ width: 1, height: 40, background: primary, marginBottom: "1.5rem" }} />
                        <div style={{ color: primary, width: 40, height: 40, marginBottom: "1.5rem" }}>
                            <span style={{ width: 32, height: 32, display: "block" }}>{Icons[s.icon] || Icons.pilates}</span>
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.5rem", fontWeight: 400, marginBottom: "1rem", color: TEXT, letterSpacing: "-0.01em" }}>{s.titulo}</h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7 }}>{s.descripcion}</p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, isDark, BG, BG2, TEXT, MUTED, BORDER, primary, primaryRgb, fontTitulo }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateX(8px)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateX(0)"; }}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "3rem", fontWeight: 300, color: `rgba(${primaryRgb},0.2)`, minWidth: 60, lineHeight: 1 }}>
                            0{i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                                <div style={{ width: 1, height: 30, background: primary }} />
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 400, color: TEXT }}>{s.titulo}</h3>
                            </div>
                            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7 }}>{s.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, isDark, BG, BG2, TEXT, MUTED, BORDER, primary, primaryRgb, fontTitulo }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2.5rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "4rem 3.5rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ color: primary, width: 48, height: 48, marginBottom: "2rem" }}>
                            <span style={{ width: 40, height: 40, display: "block" }}>{Icons[featured.icon] || Icons.pilates}</span>
                        </div>
                        <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 500 }}>Servicio Principal</div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.2rem", fontWeight: 400, lineHeight: 1.2, marginBottom: "1.5rem", color: TEXT }}>{featured.titulo}</h2>
                        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.8 }}>{featured.descripcion}</p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 120}>
                        <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2rem", transition: "all 0.3s" }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                                <div style={{ width: 1, height: 24, background: primary }} />
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.1rem", fontWeight: 400, color: TEXT }}>{s.titulo}</h3>
                            </div>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.6 }}>{s.descripcion}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d, isDark, BORDER }) {
    return (
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", border: `1px solid ${BORDER}` }}>
            <img
                src={d.imagen_nosotros}
                alt="Nuestro estudio"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, isDark, BG2, TEXT, MUTED, BORDER, primary, fontTitulo }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de trayectoria" },
                { n: d.clientes_atendidos, l: "Clientes transformados" },
                { n: "98%", l: "Satisfacción" },
                { n: "6+", l: "Especialidades" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem 2rem", background: BG2, border: `1px solid ${BORDER}`, borderTop: `2px solid ${primary}` }}>
                    <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.8rem", fontWeight: 300, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingPilates({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || "light") === "dark";
    const BG = isDark ? "#0f172a" : "#ffffff";
    const BG2 = isDark ? "#1e293b" : "#f8fafc";
    const TEXT = isDark ? "#f8fafc" : "#0f172a";
    const MUTED = isDark ? "rgba(248,250,252,0.6)" : "rgba(15,23,42,0.6)";
    const BORDER = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.1)";

    const primary = d.color_primario || "#c9a962";
    const secondary = d.color_secundario || "#a68650";
    const fontTitulo = d.font_titulo || "Playfair Display";
    const fontCuerpo = d.font_cuerpo || "Inter";
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, "+")}:wght@300;400;500;600;700&family=${fontCuerpo.replace(/ /g, "+")}:wght@400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "EP").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, isDark, BG, BG2, TEXT, MUTED, BORDER, primary, primaryRgb, fontTitulo, fontCuerpo, scrollTo };

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
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 500; font-size: 0.9rem; transition: color 0.2s; letter-spacing: 0.05em; }
                .nav-link:hover { color: ${TEXT}; }
                .btn-primary { background: var(--primary); color: ${isDark ? "#0f172a" : "#ffffff"}; border: none; cursor: pointer; font-family: '${fontTitulo}', serif; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s; font-size: 0.85rem; }
                .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 1px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', serif; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s; font-size: 0.85rem; }
                .btn-outline:hover { background: ${primary}; color: ${isDark ? "#0f172a" : "#ffffff"}; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .hero-split { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.25rem 2rem",
                background: scrolled ? `rgba(${primaryRgb},0.03)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.95rem", letterSpacing: "0.1em", color: isDark ? "#0f172a" : "#ffffff" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "1rem", letterSpacing: "0.05em", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.8rem" }} onClick={() => scrollTo("contacto")}>Agendar</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none" }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: BG, borderBottom: `1px solid ${BORDER}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.05rem", color: TEXT }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.8rem", fontSize: "0.85rem" }} onClick={() => scrollTo("contacto")}>Agendar Ahora</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── BARRA STATS ── */}
            <section style={{ background: primary, padding: "3.5rem 2rem", color: isDark ? "#0f172a" : "#ffffff" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", maxWidth: 1100, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Clientes transformados" },
                        { n: "98%", l: "Satisfacción" },
                        { n: "24/7", l: "Soporte disponible" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.85, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>✦ Lo que ofrecemos</p>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: TEXT, letterSpacing: "-0.01em", lineHeight: 1.2 }}>Nuestros Servicios</h2>
                            <div style={{ width: 60, height: 1, background: primary, margin: "2rem auto 0" }} />
                        </div>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, isDark, BG, BG2, TEXT, MUTED, BORDER, primary, primaryRgb, fontTitulo };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS ── */}
            <section id="nosotros" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div>
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem", borderBottom: `1px solid ${primary}`, paddingBottom: "1rem", display: "inline-block" }}>✦ Por qué elegirnos</p>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: TEXT, lineHeight: 1.15, marginBottom: "1.5rem", marginTop: "1.5rem" }}>Transformamos vidas a través del movimiento consciente</h2>
                            <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "1rem" }}>{d.descripcion}</p>
                            <button className="btn-primary" style={{ padding: "0.95rem 2.5rem", fontSize: "0.9rem" }} onClick={() => scrollTo("contacto")}>Comienza tu transformación</button>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            const props = { d, isDark, BG2, TEXT, MUTED, BORDER, primary, fontTitulo };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>✦ Historias de transformación</p>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: TEXT, letterSpacing: "-0.01em" }}>Lo que dicen nuestros clientes</h2>
                            <div style={{ width: 60, height: 1, background: primary, margin: "2rem auto 0" }} />
                        </div>
                    </AnimatedSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }} className="grid-2">
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 150}>
                                <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2.5rem", transition: "all 0.3s" }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 14, height: 14 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1.5rem", borderTop: `1px solid ${BORDER}` }}>
                                        <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "1.1rem", color: isDark ? "#0f172a" : "#ffffff" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: "0.95rem", color: TEXT }}>{t.nombre}</div>
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
            <section id="contacto" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <p style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>✦ Ponte en contacto</p>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: TEXT, letterSpacing: "-0.01em" }}>Comienza tu viaje hoy</h2>
                            <div style={{ width: 60, height: 1, background: primary, margin: "2rem auto 0" }} />
                        </div>
                    </AnimatedSection>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }} className="grid-2">
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.5rem", background: BG, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                                        <div style={{ width: 1, height: 40, background: primary }} />
                                        <div>
                                            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: MUTED, marginBottom: "0.5rem", fontWeight: 500 }}>{item.label}</div>
                                            <div style={{ fontWeight: 500, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1.1rem", fontFamily: `'${fontTitulo}', serif`, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.9rem", transition: "all 0.3s", marginTop: "1rem", border: "none", cursor: "pointer" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 20, height: 20 }}>{Icons.whatsapp}</span>
                                    Escribir por WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG, border: `1px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 400, color: TEXT, marginBottom: "2rem", letterSpacing: "-0.01em" }}>Solicita información</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                    <input type="text" placeholder="Tu nombre" style={{ background: BG2, border: `1px solid ${BORDER}`, color: TEXT, fontFamily: `'${fontCuerpo}', sans-serif`, fontSize: "0.95rem", padding: "0.9rem 1rem", outline: "none", transition: "border-color 0.2s" }}
                                        onFocus={e => e.currentTarget.style.borderColor = primary}
                                        onBlur={e => e.currentTarget.style.borderColor = BORDER} />
                                    <input type="tel" placeholder="Tu teléfono" style={{ background: BG2, border: `1px solid ${BORDER}`, color: TEXT, fontFamily: `'${fontCuerpo}', sans-serif`, fontSize: "0.95rem", padding: "0.9rem 1rem", outline: "none", transition: "border-color 0.2s" }}
                                        onFocus={e => e.currentTarget.style.borderColor = primary}
                                        onBlur={e => e.currentTarget.style.borderColor = BORDER} />
                                    <input type="text" placeholder="¿Qué clase te interesa?" style={{ background: BG2, border: `1px solid ${BORDER}`, color: TEXT, fontFamily: `'${fontCuerpo}', sans-serif`, fontSize: "0.95rem", padding: "0.9rem 1rem", outline: "none", transition: "border-color 0.2s" }}
                                        onFocus={e => e.currentTarget.style.borderColor = primary}
                                        onBlur={e => e.currentTarget.style.borderColor = BORDER} />
                                    <textarea placeholder="Cuéntanos sobre ti..." style={{ background: BG2, border: `1px solid ${BORDER}`, color: TEXT, fontFamily: `'${fontCuerpo}', sans-serif`, fontSize: "0.95rem", padding: "0.9rem 1rem", outline: "none", transition: "border-color 0.2s", minHeight: "120px", resize: "vertical" }}
                                        onFocus={e => e.currentTarget.style.borderColor = primary}
                                        onBlur={e => e.currentTarget.style.borderColor = BORDER} />
                                    <button className="btn-primary" style={{ padding: "1rem", fontSize: "0.9rem", width: "100%", marginTop: "0.5rem" }}>Enviar</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: isDark ? "#080814" : "#f0eeeb", borderTop: `1px solid ${BORDER}`, padding: "3.5rem 2rem 2rem", color: TEXT }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "0.95rem", color: isDark ? "#0f172a" : "#ffffff" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 400, fontSize: "1rem", letterSpacing: "0.05em" }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.9rem", textTransform: "capitalize", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = TEXT}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem", color: MUTED }}>
                        <p>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>Diseño premium por Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: isDark ? "#0f172a" : "#ffffff",
                    padding: "0.95rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', serif`, fontWeight: 500,
                    fontSize: "0.9rem", letterSpacing: "0.08em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 8px 32px rgba(${primaryRgb},0.25)`,
                    transition: "all 0.3s",
                }}
                    onMouseOver={e => { e.currentTarget.style.background = secondary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = primary; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Entrar →
                </button>
            )}
        </div>
    );
}