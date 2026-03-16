import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: HELADERÍA
// Perfil: vibrante_colorido | Tema: light
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
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
    color_primario: "#ff6b9d",
    color_secundario: "#c7417b",
    font_titulo: "Poppins",
    font_cuerpo: "Nunito",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    servicios: [
        { titulo: "{{SERVICIO_1}}", descripcion: "{{DESC_1}}", icon: "ice-cream", color: "#ff6b9d" },
        { titulo: "{{SERVICIO_2}}", descripcion: "{{DESC_2}}", icon: "cake", color: "#ffa500" },
        { titulo: "{{SERVICIO_3}}", descripcion: "{{DESC_3}}", icon: "lollipop", color: "#9d4edd" },
        { titulo: "{{SERVICIO_4}}", descripcion: "{{DESC_4}}", icon: "gift", color: "#00d4ff" },
    ],
    testimonios: [
        { nombre: "{{TESTIM_1_NOMBRE}}", cargo: "{{TESTIM_1_CARGO}}", texto: "{{TESTIM_1_TEXTO}}" },
        { nombre: "{{TESTIM_2_NOMBRE}}", cargo: "{{TESTIM_2_CARGO}}", texto: "{{TESTIM_2_TEXTO}}" },
        { nombre: "{{TESTIM_3_NOMBRE}}", cargo: "{{TESTIM_3_CARGO}}", texto: "{{TESTIM_3_TEXTO}}" },
    ],
};

// SVG Icons para Heladería
const Icons = {
    iceCream: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 2v8m-6-4h12M7 10h10l-1 8H8l-1-8z" /></svg>),
    cake: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><path d="M7 10h10v8H7z" /><path d="M12 10v6" /></svg>),
    lollipop: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M12 14v4" /><path d="M10 18h4" /></svg>),
    gift: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 2 4 2 4 12" /><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M12 7v10M7 12h10" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    star: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, fontCuerpo, BG, BG2, TEXT, MUTED, scrollTo }) {
    return (
        <section id="inicio" style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${primary}20 0%, ${primary}10 50%, ${BG} 100%)`,
        }}>
            <div style={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 400,
                height: 400,
                background: `rgba(${primaryRgb},0.1)`,
                borderRadius: "50%",
                filter: "blur(60px)",
            }} />
            <div style={{
                position: "absolute",
                bottom: -150,
                left: -100,
                width: 300,
                height: 300,
                background: "rgba(157,78,221,0.1)",
                borderRadius: "50%",
                filter: "blur(60px)",
            }} />
            <div style={{
                position: "relative",
                textAlign: "center",
                padding: "0 1.5rem",
                maxWidth: 800,
                zIndex: 1,
            }}>
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: `rgba(${primaryRgb},0.15)`,
                    border: `1px solid rgba(${primaryRgb},0.3)`,
                    padding: "0.5rem 1.2rem",
                    borderRadius: "50px",
                    marginBottom: "1.5rem",
                    fontFamily: `'${fontTitulo}', sans-serif`,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: primary,
                }}>
                    🍦 {d.anos_experiencia} años de amor por el helado 🍦
                </div>
                <h1 style={{
                    fontFamily: `'${fontTitulo}', sans-serif`,
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "1rem",
                    color: TEXT,
                    textTransform: "uppercase",
                }}>
                    {d.nombre}
                </h1>
                <p style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    color: MUTED,
                    maxWidth: 600,
                    margin: "0 auto 2rem",
                    lineHeight: 1.6,
                    fontFamily: `'${fontCuerpo}', sans-serif`,
                }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{
                        padding: "1rem 2.5rem",
                        fontSize: "1rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("contacto")}>
                        Hacer un pedido
                    </button>
                    <button className="btn-outline" style={{
                        padding: "1rem 2.5rem",
                        fontSize: "1rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("servicios")}>
                        Ver sabores
                    </button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, fontCuerpo, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{
            position: "relative",
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "6rem 3rem 4rem 4rem",
                background: BG,
                zIndex: 1,
            }}>
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: `rgba(${primaryRgb},0.15)`,
                    border: `1px solid rgba(${primaryRgb},0.3)`,
                    padding: "0.5rem 1.2rem",
                    borderRadius: "50px",
                    marginBottom: "1.5rem",
                    fontFamily: `'${fontTitulo}', sans-serif`,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: primary,
                    width: "fit-content",
                }}>
                    🍦 {d.anos_experiencia} años de pasión 🍦
                </div>
                <h1 style={{
                    fontFamily: `'${fontTitulo}', sans-serif`,
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "1.25rem",
                    color: TEXT,
                    textTransform: "uppercase",
                }}>
                    {d.nombre}
                </h1>
                <p style={{
                    fontSize: "1.1rem",
                    color: MUTED,
                    marginBottom: "2.5rem",
                    lineHeight: 1.7,
                    maxWidth: 450,
                    fontFamily: `'${fontCuerpo}', sans-serif`,
                }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{
                        padding: "1rem 2rem",
                        fontSize: "0.95rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("contacto")}>
                        Hacer un pedido
                    </button>
                    <button className="btn-outline" style={{
                        padding: "1rem 2rem",
                        fontSize: "0.95rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("servicios")}>
                        Ver sabores
                    </button>
                </div>
            </div>
            <div style={{
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${d.imagen_hero}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }} />
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to left, ${BG} 0%, transparent 30%, rgba(${primaryRgb},0.1) 100%)`,
                }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, fontCuerpo, BG, BG2, TEXT, MUTED, scrollTo }) {
    return (
        <section id="inicio" style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: BG,
            borderBottom: `3px solid ${primary}`,
            overflow: "hidden",
        }}>
            <div style={{
                position: "absolute",
                top: 50,
                right: 50,
                width: 200,
                height: 200,
                background: `rgba(${primaryRgb},0.08)`,
                borderRadius: "50%",
                filter: "blur(40px)",
            }} />
            <div style={{
                textAlign: "center",
                padding: "0 1.5rem",
                maxWidth: 900,
                position: "relative",
                zIndex: 1,
            }}>
                <div style={{
                    fontSize: "0.75rem",
                    fontFamily: `'${fontTitulo}', sans-serif`,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: primary,
                    marginBottom: "1.5rem",
                    fontWeight: 700,
                }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{
                    fontFamily: `'${fontTitulo}', sans-serif`,
                    fontSize: "clamp(3rem, 10vw, 6rem)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                    color: TEXT,
                }}>
                    {d.nombre}
                </h1>
                <div style={{
                    width: 80,
                    height: 4,
                    background: `linear-gradient(90deg, ${primary}, rgba(${primaryRgb},0.3))`,
                    margin: "0 auto 2rem",
                    borderRadius: "2px",
                }} />
                <p style={{
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    color: MUTED,
                    maxWidth: 560,
                    margin: "0 auto 3rem",
                    lineHeight: 1.7,
                    fontFamily: `'${fontCuerpo}', sans-serif`,
                }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{
                        padding: "1rem 2.5rem",
                        fontSize: "1rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("contacto")}>
                        Hacer un pedido
                    </button>
                    <button className="btn-outline" style={{
                        padding: "1rem 2.5rem",
                        fontSize: "1rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("servicios")}>
                        Ver sabores
                    </button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, fontCuerpo, BG2, TEXT, MUTED, BORDER }) {
    const colors = ["#ff6b9d", "#ffa500", "#9d4edd", "#00d4ff"];
    return (
        <div className="grid-2" style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "2rem",
        }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div style={{
                        background: BG2,
                        border: `2px solid ${colors[i]}`,
                        borderRadius: "20px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        padding: "2rem",
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.boxShadow = `0 12px 40px rgba(${hexToRgb(colors[i])},0.2)`;
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}>
                        <div style={{
                            width: 60,
                            height: 60,
                            background: `rgba(${hexToRgb(colors[i])},0.15)`,
                            border: `2px solid ${colors[i]}`,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: colors[i],
                            fontSize: "1.8rem",
                            marginBottom: "1rem",
                        }}>
                            {s.icon === "ice-cream" && "🍦"}
                            {s.icon === "cake" && "🎂"}
                            {s.icon === "lollipop" && "🍭"}
                            {s.icon === "gift" && "🎁"}
                        </div>
                        <h3 style={{
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                            marginBottom: "0.75rem",
                            color: TEXT,
                        }}>
                            {s.titulo}
                        </h3>
                        <p style={{
                            color: MUTED,
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            fontFamily: `'${fontCuerpo}', sans-serif`,
                        }}>
                            {s.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo, fontCuerpo, BG2, TEXT, MUTED, BORDER }) {
    const colors = ["#ff6b9d", "#ffa500", "#9d4edd", "#00d4ff"];
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 80}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                        padding: "2rem",
                        background: BG2,
                        border: `2px solid ${colors[i]}`,
                        borderRadius: "15px",
                        transition: "all 0.3s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = `rgba(${hexToRgb(colors[i])},0.05)`}
                        onMouseLeave={e => e.currentTarget.style.background = BG2}>
                        <div style={{
                            fontSize: "3rem",
                            minWidth: 60,
                            lineHeight: 1,
                            color: colors[i],
                        }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{
                            width: 50,
                            height: 50,
                            minWidth: 50,
                            background: `rgba(${hexToRgb(colors[i])},0.15)`,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.8rem",
                            color: colors[i],
                        }}>
                            {s.icon === "ice-cream" && "🍦"}
                            {s.icon === "cake" && "🎂"}
                            {s.icon === "lollipop" && "🍭"}
                            {s.icon === "gift" && "🎁"}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{
                                fontFamily: `'${fontTitulo}', sans-serif`,
                                fontSize: "1.2rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.02em",
                                marginBottom: "0.3rem",
                                color: TEXT,
                            }}>
                                {s.titulo}
                            </h3>
                            <p style={{
                                color: MUTED,
                                fontSize: "0.9rem",
                                lineHeight: 1.5,
                                fontFamily: `'${fontCuerpo}', sans-serif`,
                            }}>
                                {s.descripcion}
                            </p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, primary, primaryRgb, fontTitulo, fontCuerpo, BG2, TEXT, MUTED }) {
    const colors = ["#ff6b9d", "#ffa500", "#9d4edd", "#00d4ff"];
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "2rem",
        }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{
                        background: `linear-gradient(135deg, rgba(${hexToRgb(colors[0])},0.15) 0%, rgba(${hexToRgb(colors[0])},0.05) 100%)`,
                        border: `2px solid ${colors[0]}`,
                        borderRadius: "20px",
                        overflow: "hidden",
                        padding: "3rem 2.5rem",
                        height: "100%",
                    }}>
                        <div style={{
                            width: 80,
                            height: 80,
                            background: `rgba(${hexToRgb(colors[0])},0.2)`,
                            border: `2px solid ${colors[0]}`,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "2.5rem",
                            marginBottom: "1.5rem",
                        }}>
                            🍦
                        </div>
                        <div style={{
                            fontSize: "0.7rem",
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: colors[0],
                            marginBottom: "0.75rem",
                            fontWeight: 700,
                        }}>
                            Nuestro favorito
                        </div>
                        <h3 style={{
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            fontSize: "2rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            lineHeight: 1.1,
                            marginBottom: "1rem",
                            color: TEXT,
                        }}>
                            {featured.titulo}
                        </h3>
                        <p style={{
                            color: MUTED,
                            fontSize: "1rem",
                            lineHeight: 1.7,
                            fontFamily: `'${fontCuerpo}', sans-serif`,
                        }}>
                            {featured.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{
                            background: BG2,
                            border: `2px solid ${colors[i + 1]}`,
                            borderRadius: "15px",
                            padding: "1.75rem",
                            display: "flex",
                            gap: "1rem",
                            alignItems: "flex-start",
                        }}>
                            <div style={{
                                width: 50,
                                height: 50,
                                minWidth: 50,
                                background: `rgba(${hexToRgb(colors[i + 1])},0.15)`,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.5rem",
                            }}>
                                {s.icon === "cake" && "🎂"}
                                {s.icon === "lollipop" && "🍭"}
                                {s.icon === "gift" && "🎁"}
                            </div>
                            <div>
                                <h3 style={{
                                    fontFamily: `'${fontTitulo}', sans-serif`,
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    marginBottom: "0.3rem",
                                    color: TEXT,
                                }}>
                                    {s.titulo}
                                </h3>
                                <p style={{
                                    color: MUTED,
                                    fontSize: "0.85rem",
                                    lineHeight: 1.5,
                                    fontFamily: `'${fontCuerpo}', sans-serif`,
                                }}>
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

function NosotrosImage({ d, primary, primaryRgb, BG2, BORDER }) {
    return (
        <div style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            aspectRatio: "4/3",
            border: `2px solid ${primary}`,
        }}>
            <img
                src={d.imagen_nosotros}
                alt="Nuestro equipo"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <div style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, rgba(${hexToRgb(primary)},0.2) 0%, transparent 60%)`,
            }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, fontCuerpo, BG2, TEXT, MUTED }) {
    const stats = [
        { n: d.anos_experiencia, l: "Años de experiencia", emoji: "🏆" },
        { n: d.clientes_atendidos, l: "Clientes atendidos", emoji: "😋" },
        { n: "98%", l: "Tasa de satisfacción", emoji: "⭐" },
        { n: "24h", l: "Tiempo de respuesta", emoji: "⚡" },
    ];
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
        }}>
            {stats.map((s, i) => (
                <div key={i} style={{
                    padding: "2rem",
                    background: BG2,
                    border: `2px solid rgba(${hexToRgb(primary)},0.3)`,
                    borderRadius: "15px",
                    borderTop: `4px solid ${primary}`,
                }}>
                    <div style={{
                        fontSize: "2rem",
                        marginBottom: "0.5rem",
                    }}>
                        {s.emoji}
                    </div>
                    <div style={{
                        fontFamily: `'${fontTitulo}', sans-serif`,
                        fontSize: "2.8rem",
                        fontWeight: 800,
                        color: primary,
                        lineHeight: 1,
                        marginBottom: "0.5rem",
                    }}>
                        {s.n}
                    </div>
                    <div style={{
                        fontSize: "0.85rem",
                        color: MUTED,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontFamily: `'${fontCuerpo}', sans-serif`,
                        fontWeight: 600,
                    }}>
                        {s.l}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingHeladeria({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'light') === 'dark';
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const BG3 = isDark ? '#334155' : '#f1f5f9';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';

    const primary = d.color_primario || '#ff6b9d';
    const secondary = d.color_secundario || '#c7417b';
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

    const iniciales = (d.nombre || "HE").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, BG, BG2, BG3, TEXT, MUTED, BORDER, scrollTo };

    return (
        <div style={{
            fontFamily: `'${fontCuerpo}', sans-serif`,
            background: BG,
            color: TEXT,
            overflowX: "hidden",
        }}>
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
                .nav-link {
                    cursor: pointer;
                    color: ${TEXT};
                    font-weight: 600;
                    font-size: 0.95rem;
                    transition: color 0.2s;
                    letter-spacing: 0.02em;
                    opacity: 0.8;
                }
                .nav-link:hover { color: ${primary}; opacity: 1; }
                .btn-primary {
                    background: linear-gradient(135deg, ${primary}, ${secondary});
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    font-family: '${fontTitulo}', sans-serif;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    transition: all 0.3s;
                }
                .btn-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 32px rgba(${primaryRgb},0.4);
                }
                .btn-outline {
                    background: transparent;
                    color: ${primary};
                    border: 2px solid ${primary};
                    cursor: pointer;
                    font-family: '${fontTitulo}', sans-serif;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    transition: all 0.3s;
                }
                .btn-outline:hover {
                    background: rgba(${primaryRgb},0.1);
                    transform: translateY(-3px);
                }
                .testim-card {
                    background: ${BG2};
                    border: 2px solid rgba(${primaryRgb},0.2);
                    border-radius: 15px;
                    padding: 2rem;
                    transition: all 0.3s;
                }
                .testim-card:hover {
                    border-color: ${primary};
                    transform: translateY(-6px);
                    box-shadow: 0 12px 32px rgba(${primaryRgb},0.15);
                }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
                .divider-line { flex: 1; height: 2px; background: ${BORDER}; }
                .divider-dot { width: 8px; height: 8px; background: ${primary}; border-radius: 50%; }
                input, textarea {
                    background: ${BG2};
                    border: 2px solid ${BORDER};
                    color: ${TEXT};
                    font-family: '${fontCuerpo}', sans-serif;
                    font-size: 0.95rem;
                    padding: 1rem;
                    width: 100%;
                    outline: none;
                    border-radius: 12px;
                    transition: all 0.2s;
                }
                input:focus, textarea:focus {
                    border-color: ${primary};
                    box-shadow: 0 0 0 3px rgba(${primaryRgb},0.1);
                }
                textarea { resize: vertical; min-height: 120px; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .stats-grid { grid-template-columns: 1fr 1fr !important; }
                    .contact-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: "1.25rem 2rem",
                background: scrolled ? `${BG}dd` : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    cursor: "pointer",
                }} onClick={() => scrollTo("inicio")}>
                    <div style={{
                        width: 40,
                        height: 40,
                        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: `'${fontTitulo}', sans-serif`,
                        fontWeight: 800,
                        fontSize: "1rem",
                        letterSpacing: "0.05em",
                        color: "#fff",
                        borderRadius: "12px",
                    }}>
                        🍦
                    </div>
                    <span style={{
                        fontFamily: `'${fontTitulo}', sans-serif`,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        letterSpacing: "0.02em",
                        textTransform: "uppercase",
                        color: TEXT,
                    }}>
                        {d.nombre}
                    </span>
                </div>
                <div className="desktop-nav" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2.5rem",
                }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{
                            textTransform: "capitalize",
                        }}>
                            {s}
                        </span>
                    ))}
                    <button className="btn-primary" style={{
                        padding: "0.6rem 1.4rem",
                        fontSize: "0.85rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("contacto")}>
                        Pedir ahora
                    </button>
                </div>
                <button style={{
                    background: "none",
                    border: "none",
                    color: TEXT,
                    cursor: "pointer",
                    display: "none",
                }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>
                        {menuOpen ? Icons.x : Icons.menu}
                    </span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{
                    position: "fixed",
                    top: 65,
                    left: 0,
                    right: 0,
                    zIndex: 999,
                    background: BG,
                    borderBottom: `1px solid ${BORDER}`,
                    padding: "1.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{
                            textTransform: "capitalize",
                            fontSize: "1.1rem",
                        }}>
                            {s}
                        </span>
                    ))}
                    <button className="btn-primary" style={{
                        padding: "0.8rem",
                        fontSize: "0.9rem",
                        borderRadius: "50px",
                    }} onClick={() => scrollTo("contacto")}>
                        Pedir ahora
                    </button>
                </div>
            )}

            {/* ── HERO ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                padding: "3rem 2rem",
                color: "#fff",
            }}>
                <div className="stats-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    maxWidth: 1000,
                    margin: "0 auto",
                    textAlign: "center",
                    gap: "2rem",
                }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de pasión", emoji: "🎉" },
                        { n: d.clientes_atendidos, l: "Clientes felices", emoji: "😋" },
                        { n: "98%", l: "Satisfacción", emoji: "⭐" },
                        { n: "24h", l: "Respuesta", emoji: "⚡" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                                {s.emoji}
                            </div>
                            <div style={{
                                fontFamily: `'${fontTitulo}', sans-serif`,
                                fontSize: "2.2rem",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                            }}>
                                {s.n}
                            </div>
                            <div style={{
                                fontSize: "0.85rem",
                                opacity: 0.9,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                fontFamily: `'${fontCuerpo}', sans-serif`,
                                fontWeight: 600,
                            }}>
                                {s.l}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{
                background: BG2,
                padding: "6rem 2rem",
            }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <div className="divider-dot" />
                            <div className="divider-line" />
                        </div>
                        <p style={{
                            textAlign: "center",
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: primary,
                            marginBottom: "0.75rem",
                        }}>
                            Nuestras especialidades
                        </p>
                        <h2 style={{
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            textAlign: "center",
                            fontSize: "clamp(2rem,5vw,3rem)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            marginBottom: "3.5rem",
                            color: TEXT,
                        }}>
                            Sabores que enamoran
                        </h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, fontCuerpo, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS ── */}
            <section id="nosotros" style={{
                background: BG,
                padding: "6rem 2rem",
            }}>
                <div style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5rem",
                    alignItems: "center",
                }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <div className="divider-dot" />
                            <div className="divider-line" />
                        </div>
                        <p style={{
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: primary,
                            marginBottom: "0.75rem",
                        }}>
                            Por qué elegirnos
                        </p>
                        <h2 style={{
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            fontSize: "clamp(2rem,4vw,2.8rem)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            lineHeight: 1.1,
                            marginBottom: "1.5rem",
                            color: TEXT,
                        }}>
                            Hecho con amor y calidad
                        </h2>
                        <p style={{
                            color: MUTED,
                            lineHeight: 1.8,
                            marginBottom: "2rem",
                            fontSize: "1rem",
                            fontFamily: `'${fontCuerpo}', sans-serif`,
                        }}>
                            {d.descripcion}
                        </p>
                        <button className="btn-primary" style={{
                            padding: "1rem 2rem",
                            fontSize: "0.9rem",
                            borderRadius: "50px",
                        }} onClick={() => scrollTo("contacto")}>
                            Contáctanos hoy
                        </button>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            const props = { d, primary, primaryRgb, fontTitulo, BG2, BORDER };
                            if (d.nosotros_variant === "stats") return <NosotrosStats {...props} fontCuerpo={fontCuerpo} TEXT={TEXT} MUTED={MUTED} />;
                            return <NosotrosImage {...props} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{
                background: BG2,
                padding: "6rem 2rem",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <div className="divider-dot" />
                            <div className="divider-line" />
                        </div>
                        <p style={{
                            textAlign: "center",
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            fontWeight: 700,
                            fontSize: "0.8rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: primary,
                            marginBottom: "0.75rem",
                        }}>
                            Clientes
                        </p>
                        <h2 style={{
                            fontFamily: `'${fontTitulo}', sans-serif`,
                            textAlign: "center",
                            fontSize: "clamp(2rem,5vw,3rem)",
                            fontWeight: 800,
                            textTransform: "uppercase",
                            marginBottom: "3.5rem",
                            color: TEXT,
                        }}>
                            Lo que dicen de nosotros
                        </h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: "2rem",
                    }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div className="testim-card">
                                    <div style={{
                                        display: "flex",
                                        gap: "0.25rem",
                                        marginBottom: "1rem",
                                        color: primary,
                                    }}>
                                        {[...Array(5)].map((_, j) => (
                                            <span key={j} style={{ width: 18, height: 18 }}>
                                                {Icons.starFill}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{
                                        color: MUTED,
                                        lineHeight: 1.8,
                                        marginBottom: "1.5rem",
                                        fontSize: "0.95rem",
                                        fontStyle: "italic",
                                        fontFamily: `'${fontCuerpo}', sans-serif`,
                                    }}>
                                        "{t.texto}"
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.75rem",
                                    }}>
                                        <div style={{
                                            width: 40,
                                            height: 40,
                                            background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: `'${fontTitulo}', sans-serif`,
                                            fontWeight: 800,
                                            fontSize: "1rem",
                                            color: "#fff",
                                            borderRadius: "10px",
                                        }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{
                                                fontWeight: 700,
                                                fontSize: "0.95rem",
                                                color: TEXT,
                                                fontFamily: `'${fontTitulo}', sans-serif`,
                                            }}>
                                                {t.nombre}
                                            </div>
                                            <div style={{
                                                color: MUTED,
                                                fontSize: "0.8rem",
                                                fontFamily: `'${fontCuerpo}', sans-serif`,
                                            }}>
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
            <section id="contacto" style={{
                background: BG,
                padding: "6rem 2rem",
            }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider">
                            <div className="divider-line" />
                            <div className="divider-dot" />
                            <div className="divider-line" />
                        </div>
                        <p style={{
                            textAlign: "center",
                            fontFamily: `'${fontTit