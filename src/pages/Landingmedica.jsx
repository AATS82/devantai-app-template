import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: SALUD / CENTRO MÉDICO
// Variantes dinámicas: hero_variant, servicios_variant, nosotros_variant
// ============================================================

const DEFAULT_DATA = {
    nombre: "Centro Médico",
    slogan: "Tu salud, nuestra prioridad",
    descripcion: "Atención médica de calidad con profesionales certificados.",
    ciudad: "Santiago, Chile",
    telefono: "56912345678",
    email: "contacto@centromedico.cl",
    horario: "Lunes a Viernes 8:00 - 20:00 | Sábado 9:00 - 14:00",
    anos_experiencia: "10+",
    clientes_atendidos: "5.000+",
    hero_variant: "split",
    servicios_variant: "grid",
    nosotros_variant: "image",
    industria: "salud",
    servicios: [
        { titulo: "Medicina General", descripcion: "Consultas médicas integrales para toda la familia.", icon: "stethoscope" },
        { titulo: "Especialidades", descripcion: "Acceso a especialistas en diversas áreas de la salud.", icon: "heart" },
        { titulo: "Exámenes", descripcion: "Laboratorio clínico con resultados en 24 horas.", icon: "flask" },
        { titulo: "Urgencias", descripcion: "Atención de urgencias y emergencias médicas.", icon: "plus" },
    ],
    testimonios: [
        { nombre: "María González", cargo: "Paciente frecuente", texto: "Excelente atención, los médicos son muy profesionales y el trato es cálido." },
        { nombre: "Carlos Herrera", cargo: "Paciente", texto: "Me atendieron rápido y con mucha dedicación. Totalmente recomendado." },
        { nombre: "Ana Martínez", cargo: "Madre de familia", texto: "Llevamos a toda la familia aquí. La mejor clínica del sector sin duda." },
    ],
};

const Icons = {
    stethoscope: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    flask: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6m-6 0v6l-4 9a1 1 0 0 0 .9 1.5h12.2a1 1 0 0 0 .9-1.5L15 9V3" /><path d="M6.5 14.5h11" /></svg>),
    plus: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    star: (<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    calendar: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
};

function useIntersection(ref, threshold = 0.12) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return visible;
}

function FadeIn({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const visible = useIntersection(ref);
    return (
        <div ref={ref} className={className} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        }}>
            {children}
        </div>
    );
}

// ── HERO VARIANTS ──

function HeroSplit({ d, teal, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 70, background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f8fafc 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: `rgba(${teal},0.06)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: `rgba(${teal},0.05)`, pointerEvents: "none" }} />
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
                <div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#e0f2fe", color: "var(--accent)", padding: "0.4rem 1rem", borderRadius: "50px", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                        <span style={{ width: 14, height: 14 }}>{Icons.plus}</span>
                        {d.anos_experiencia} años cuidando tu salud
                    </div>
                    <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.25rem", color: "var(--text)" }}>
                        {d.slogan || "Tu salud merece la "}<em style={{ color: "var(--accent)", fontStyle: "italic" }}>mejor atención</em>
                    </h1>
                    <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "2.5rem", lineHeight: 1.7, maxWidth: 480 }}>{d.descripcion}</p>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <button className="btn-accent" style={{ padding: "0.95rem 2rem", fontSize: "1rem" }} onClick={() => scrollTo("contacto")}>Agendar Consulta</button>
                        <button className="btn-outline-accent" style={{ padding: "0.95rem 2rem", fontSize: "1rem" }} onClick={() => scrollTo("servicios")}>Nuestros Servicios</button>
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 60px rgba(8,145,178,0.2)" }}>
                        <img src={d.imagen_hero || "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"} alt={d.nombre} style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
                    </div>
                    <div style={{ position: "absolute", bottom: -20, left: -20, background: "#fff", borderRadius: "16px", padding: "1.25rem 1.5rem", boxShadow: "0 12px 32px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: 44, height: 44, background: "#e0f2fe", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                            <span style={{ width: 22, height: 22 }}>{Icons.calendar}</span>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>Agenda en línea</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Disponible las 24 horas</div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", top: 20, right: -10, background: "var(--accent)", color: "#fff", borderRadius: "12px", padding: "0.75rem 1.25rem", boxShadow: "0 8px 24px rgba(8,145,178,0.35)", textAlign: "center" }}>
                        <div style={{ fontWeight: 800, fontSize: "1.5rem", lineHeight: 1 }}>{d.clientes_atendidos}</div>
                        <div style={{ fontSize: "0.72rem", opacity: 0.9 }}>Pacientes atendidos</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroCentered({ d, teal, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 70, background: "linear-gradient(180deg, #f0f9ff 0%, #f8fafc 100%)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: -150, left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "rgba(8,145,178,0.05)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 720, padding: "4rem 2rem", position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#e0f2fe", color: "var(--accent)", padding: "0.4rem 1.25rem", borderRadius: "50px", marginBottom: "1.75rem", fontWeight: 700, fontSize: "0.8rem" }}>
                    <span style={{ width: 14, height: 14 }}>{Icons.plus}</span>
                    {d.anos_experiencia} años cuidando tu salud
                </div>
                <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--text)" }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "1.15rem", color: "var(--muted)", marginBottom: "2.5rem", lineHeight: 1.7 }}>{d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-accent" style={{ padding: "1rem 2.5rem", fontSize: "1rem" }} onClick={() => scrollTo("contacto")}>Agendar Consulta</button>
                    <button className="btn-outline-accent" style={{ padding: "1rem 2.5rem", fontSize: "1rem" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
                <div style={{ marginTop: "3rem", display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap" }}>
                    {[{ n: d.anos_experiencia, l: "Años" }, { n: d.clientes_atendidos, l: "Pacientes" }, { n: "98%", l: "Satisfacción" }].map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <div style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 700, color: "var(--accent)" }}>{s.n}</div>
                            <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HeroMinimal({ d, teal, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 70, background: "#fff", borderBottom: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="hero-grid">
                <div>
                    <div style={{ width: 48, height: 4, background: "var(--accent)", marginBottom: "2rem", borderRadius: "2px" }} />
                    <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", color: "var(--text)" }}>{d.nombre}</h1>
                    <p style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "2.5rem", lineHeight: 1.8, maxWidth: 460 }}>{d.descripcion}</p>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                        <button className="btn-accent" style={{ padding: "1rem 2rem", fontSize: "0.95rem" }} onClick={() => scrollTo("contacto")}>Agendar Consulta</button>
                        <button className="btn-outline-accent" style={{ padding: "1rem 2rem", fontSize: "0.95rem" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia", icon: "calendar" },
                        { n: d.clientes_atendidos, l: "Pacientes atendidos", icon: "heart" },
                        { n: "98%", l: "Índice de satisfacción", icon: "star" },
                    ].map((s, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem", background: i === 0 ? "var(--accent)" : "var(--bg2)", borderRadius: "16px", color: i === 0 ? "#fff" : "var(--text)" }}>
                            <div style={{ width: 48, height: 48, background: i === 0 ? "rgba(255,255,255,0.2)" : "#e0f2fe", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? "#fff" : "var(--accent)", minWidth: 48 }}>
                                <span style={{ width: 24, height: 24 }}>{Icons[s.icon]}</span>
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Lora', serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
                                <div style={{ fontSize: "0.85rem", opacity: i === 0 ? 0.85 : 1, color: i === 0 ? "#fff" : "var(--muted)" }}>{s.l}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d }) {
    return (
        <div className="services-grid-m" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                    <div className="service-card-m">
                        <div style={{ width: 52, height: 52, borderRadius: "14px", background: "#e0f2fe", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                            <span style={{ width: 26, height: 26 }}>{Icons[s.icon] || Icons.plus}</span>
                        </div>
                        <h3 style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.5rem", color: "var(--text)" }}>{s.titulo}</h3>
                        <p style={{ color: "var(--muted)", fontSize: "0.93rem", lineHeight: 1.65 }}>{s.descripcion}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

function ServiciosList({ d }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(d.servicios || []).map((s, i) => (
                <FadeIn key={i} delay={i * 80}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem 2rem", background: "#fff", border: "1px solid var(--border)", borderLeft: "4px solid var(--accent)", borderRadius: "0 12px 12px 0", transition: "box-shadow 0.2s" }}
                        onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(8,145,178,0.1)"}
                        onMouseOut={e => e.currentTarget.style.boxShadow = "none"}>
                        <div style={{ fontFamily: "'Lora', serif", fontSize: "2.5rem", fontWeight: 700, color: "rgba(8,145,178,0.2)", minWidth: 52, lineHeight: 1 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ width: 44, height: 44, minWidth: 44, background: "#e0f2fe", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                            <span style={{ width: 22, height: 22 }}>{Icons[s.icon] || Icons.plus}</span>
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: "0.25rem", color: "var(--text)" }}>{s.titulo}</h3>
                            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.5 }}>{s.descripcion}</p>
                        </div>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.5rem" }} className="services-grid-m">
            {featured && (
                <FadeIn>
                    <div className="service-card-m" style={{ height: "100%", background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)", border: "1px solid var(--accent)" }}>
                        <div style={{ width: 64, height: 64, borderRadius: "18px", background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                            <span style={{ width: 32, height: 32 }}>{Icons[featured.icon] || Icons.plus}</span>
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Servicio principal</div>
                        <h3 style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: "1.8rem", marginBottom: "1rem", color: "var(--text)", lineHeight: 1.2 }}>{featured.titulo}</h3>
                        <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7 }}>{featured.descripcion}</p>
                    </div>
                </FadeIn>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {rest.map((s, i) => (
                    <FadeIn key={i} delay={i * 100}>
                        <div className="service-card-m" style={{ padding: "1.25rem 1.5rem" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                <div style={{ width: 40, height: 40, minWidth: 40, background: "#e0f2fe", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                                    <span style={{ width: 20, height: 20 }}>{Icons[s.icon] || Icons.plus}</span>
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem", color: "var(--text)" }}>{s.titulo}</h3>
                                    <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.5 }}>{s.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d }) {
    return (
        <FadeIn>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden" }}>
                <img
                    src={d.imagen_nosotros || "https://images.unsplash.com/photo-1551076805-e1869033e561?w=700&q=80"}
                    alt="Equipo médico"
                    style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(8,145,178,0.92)", backdropFilter: "blur(8px)", borderRadius: "12px", padding: "1.25rem", display: "flex", gap: "2rem", justifyContent: "center" }}>
                    {[{ n: "100%", l: "Confidencial" }, { n: "24h", l: "Resultados" }, { n: "∞", l: "Dedicación" }].map((item, i) => (
                        <div key={i} style={{ textAlign: "center", color: "#fff" }}>
                            <div style={{ fontFamily: "'Lora'", fontWeight: 700, fontSize: "1.4rem" }}>{item.n}</div>
                            <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>{item.l}</div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeIn>
    );
}

function NosotrosStats({ d }) {
    return (
        <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                    { n: d.anos_experiencia, l: "Años de experiencia", icon: "calendar" },
                    { n: d.clientes_atendidos, l: "Pacientes atendidos", icon: "heart" },
                    { n: "98%", l: "Satisfacción", icon: "star" },
                    { n: "24h", l: "Resultados exámenes", icon: "flask" },
                ].map((s, i) => (
                    <div key={i} style={{ padding: "1.75rem", background: i === 0 ? "var(--accent)" : "#f0f9ff", borderRadius: "16px", border: i === 0 ? "none" : "1px solid #bae6fd" }}>
                        <div style={{ width: 36, height: 36, background: i === 0 ? "rgba(255,255,255,0.2)" : "#e0f2fe", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? "#fff" : "var(--accent)", marginBottom: "1rem" }}>
                            <span style={{ width: 18, height: 18 }}>{Icons[s.icon]}</span>
                        </div>
                        <div style={{ fontFamily: "'Lora', serif", fontSize: "2.2rem", fontWeight: 700, color: i === 0 ? "#fff" : "var(--accent)", lineHeight: 1, marginBottom: "0.4rem" }}>{s.n}</div>
                        <div style={{ fontSize: "0.82rem", color: i === 0 ? "rgba(255,255,255,0.85)" : "var(--muted)" }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingMedica({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Soporte para colores dinámicos — si el cliente tiene color_primario lo usamos, sino teal por defecto
    const accentHex = d.color_primario || "#0891b2";
    const accentDark = d.color_secundario || "#0e7490";
    const fontTitulo = d.font_titulo || "Lora";
    const fontCuerpo = d.font_cuerpo || "Plus Jakarta Sans";
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, "+")}:ital,wght@0,600;0,700;1,600&family=${fontCuerpo.replace(/ /g, "+")}:wght@400;500;600;700;800&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "CM").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const teal = accentHex; // alias para legibilidad en variantes

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: "#f8fafc", color: "#1e293b", overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                :root {
                    --accent: ${accentHex};
                    --accent-dark: ${accentDark};
                    --bg: #f8fafc;
                    --bg2: #f1f5f9;
                    --white: #ffffff;
                    --text: #1e293b;
                    --muted: #64748b;
                    --border: #e2e8f0;
                }
                .nav-link-m { cursor: pointer; color: var(--muted); font-weight: 500; font-size: 0.9rem; transition: color 0.2s; }
                .nav-link-m:hover { color: var(--accent); }
                .btn-accent { background: var(--accent); color: #fff; border: none; cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 700; transition: all 0.2s; border-radius: 8px; }
                .btn-accent:hover { background: var(--accent-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(8,145,178,0.3); }
                .btn-outline-accent { background: transparent; color: var(--accent); border: 2px solid var(--accent); cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 700; transition: all 0.2s; border-radius: 8px; }
                .btn-outline-accent:hover { background: var(--accent); color: #fff; }
                .service-card-m { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; transition: all 0.3s; }
                .service-card-m:hover { border-color: var(--accent); box-shadow: 0 12px 32px rgba(8,145,178,0.12); transform: translateY(-4px); }
                .testim-card-m { background: var(--white); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; transition: box-shadow 0.3s; }
                .testim-card-m:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
                .feature-item { display: flex; gap: 1rem; align-items: flex-start; padding: 1.25rem; border-radius: 12px; transition: background 0.2s; }
                .feature-item:hover { background: #e0f2fe; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: var(--bg2); border: 1.5px solid var(--border); color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 0.85rem 1rem; width: 100%; outline: none; border-radius: 8px; transition: border-color 0.2s; }
                input:focus, textarea:focus { border-color: var(--accent); background: #fff; }
                textarea { resize: vertical; min-height: 110px; }
                @media (max-width: 768px) {
                    .desktop-nav-m { display: none !important; }
                    .mobile-btn-m { display: flex !important; }
                    .hero-grid { grid-template-columns: 1fr !important; }
                    .services-grid-m { grid-template-columns: 1fr !important; }
                    .testim-grid-m { grid-template-columns: 1fr !important; }
                    .contact-grid-m { grid-template-columns: 1fr !important; }
                    .stats-grid-m { grid-template-columns: 1fr 1fr !important; }
                    .footer-grid-m { grid-template-columns: 1fr !important; text-align: center; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "0.85rem 2rem",
                background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
                borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
                backdropFilter: "blur(16px)",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 38, height: 38, borderRadius: "10px", background: accentHex, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>{iniciales}</div>
                    <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text)" }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav-m" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link-m" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-accent" style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }} onClick={() => scrollTo("contacto")}>Agendar Hora</button>
                </div>
                <button style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer", display: "none" }} className="mobile-btn-m" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: "rgba(255,255,255,0.98)", borderBottom: "1px solid var(--border)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link-m" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.1rem" }}>{s}</span>
                    ))}
                    <button className="btn-accent" style={{ padding: "0.8rem", fontSize: "0.9rem" }} onClick={() => scrollTo("contacto")}>Agendar Hora</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                const props = { d, teal, scrollTo };
                if (d.hero_variant === "centered") return <HeroCentered {...props} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...props} />;
                return <HeroSplit {...props} />;
            })()}

            {/* ── STATS ── */}
            <section style={{ background: "var(--white)", padding: "3rem 2rem", borderBottom: "1px solid var(--border)" }}>
                <div className="stats-grid-m" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto", gap: "2rem", textAlign: "center" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Pacientes atendidos" },
                        { n: "98%", l: "Satisfacción" },
                        { n: "15+", l: "Especialidades" },
                    ].map((s, i) => (
                        <FadeIn key={i} delay={i * 80}>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2rem", fontWeight: 700, color: accentHex, marginBottom: "0.3rem" }}>{s.n}</div>
                            <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{s.l}</div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS — elige variante ── */}
            <section id="servicios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <p style={{ textAlign: "center", color: accentHex, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Servicios</p>
                        <h2 style={{ textAlign: "center", fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem" }}>Atención integral para tu salud</h2>
                        <p style={{ textAlign: "center", color: "var(--muted)", maxWidth: 520, margin: "0 auto 3.5rem", lineHeight: 1.6 }}>
                            Contamos con un equipo de profesionales capacitados para cuidar cada aspecto de tu bienestar.
                        </p>
                    </FadeIn>
                    {(() => {
                        if (d.servicios_variant === "list") return <ServiciosList d={d} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured d={d} />;
                        return <ServiciosGrid d={d} />;
                    })()}
                </div>
            </section>

            {/* ── POR QUÉ NOSOTROS — elige variante ── */}
            <section id="nosotros" style={{ background: "var(--white)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="hero-grid">
                    {(() => {
                        if (d.nosotros_variant === "stats") return <NosotrosStats d={d} />;
                        return <NosotrosImage d={d} />;
                    })()}
                    <FadeIn delay={150}>
                        <p style={{ color: accentHex, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>¿Por qué elegirnos?</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 700, marginBottom: "1.25rem", lineHeight: 1.2, color: "var(--text)" }}>
                            Comprometidos con tu bienestar
                        </h2>
                        <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "2rem" }}>{d.descripcion}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {[
                                { t: "Médicos certificados y especializados", d: "Todo nuestro equipo tiene certificación actualizada." },
                                { t: "Atención personalizada", d: "Cada paciente recibe un trato único y dedicado." },
                                { t: "Tecnología de última generación", d: "Equipos modernos para diagnósticos precisos." },
                                { t: "Confidencialidad garantizada", d: "Tu información médica siempre protegida." },
                            ].map((item, i) => (
                                <div key={i} className="feature-item">
                                    <div style={{ width: 24, height: 24, minWidth: 24, color: accentHex, marginTop: 2 }}>{Icons.check}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{item.t}</div>
                                        <div style={{ color: "var(--muted)", fontSize: "0.87rem" }}>{item.d}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <p style={{ textAlign: "center", color: accentHex, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Testimonios</p>
                        <h2 style={{ textAlign: "center", fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "var(--text)", marginBottom: "3.5rem" }}>Lo que dicen nuestros pacientes</h2>
                    </FadeIn>
                    <div className="testim-grid-m" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <FadeIn key={i} delay={i * 100}>
                                <div className="testim-card-m">
                                    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem", color: "#f59e0b" }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16 }}>{Icons.star}</span>)}
                                    </div>
                                    <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.93rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: accentHex, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                                            {(t.nombre || "P").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.93rem", color: "var(--text)" }}>{t.nombre}</div>
                                            <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{t.cargo}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ── */}
            <section id="contacto" style={{ background: "var(--white)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <p style={{ textAlign: "center", color: accentHex, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Contacto</p>
                        <h2 style={{ textAlign: "center", fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "var(--text)", marginBottom: "3.5rem" }}>Agenda tu consulta hoy</h2>
                    </FadeIn>
                    <div className="contact-grid-m" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "4rem", alignItems: "start" }}>
                        <FadeIn>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Dirección", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "1.25rem", background: "var(--bg2)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                                        <div style={{ width: 44, height: 44, minWidth: 44, background: "#e0f2fe", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: accentHex }}>
                                            <span style={{ width: 20, height: 20 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "0.2rem" }}>{item.label}</div>
                                            <div style={{ fontWeight: 600, fontSize: "0.93rem", color: "var(--text)" }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={`https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontWeight: 700, fontSize: "0.95rem", borderRadius: "10px", transition: "background 0.2s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    Escribir por WhatsApp
                                </a>
                            </div>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <div style={{ background: "var(--bg2)", borderRadius: "20px", padding: "2.5rem", border: "1px solid var(--border)" }}>
                                <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "1.5rem", color: "var(--text)" }}>Solicitar hora</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Tu nombre completo" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="Especialidad o motivo de consulta" />
                                    <textarea placeholder="Cuéntanos más sobre tu consulta..." />
                                    <button className="btn-accent" style={{ padding: "1rem", fontSize: "1rem", width: "100%" }}>Solicitar Hora</button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#0f172a", color: "#fff", padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div className="footer-grid-m" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                                <div style={{ width: 36, height: 36, borderRadius: "10px", background: accentHex, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>{iniciales}</div>
                                <span style={{ fontWeight: 700, fontSize: "1rem" }}>{d.nombre}</span>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 280 }}>{d.descripcion}</p>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>Navegación</div>
                            {["Inicio", "Servicios", "Nosotros", "Testimonios", "Contacto"].map(s => (
                                <div key={s} style={{ cursor: "pointer", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginBottom: "0.5rem", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(s.toLowerCase())}
                                    onMouseOver={e => e.currentTarget.style.color = "#fff"}
                                    onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                                >{s}</div>
                            ))}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>Contacto</div>
                            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", lineHeight: 1.8 }}>
                                <div>{d.telefono}</div>
                                <div>{d.ciudad}</div>
                                <div style={{ fontSize: "0.82rem", marginTop: "0.5rem" }}>{d.horario}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.75rem" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: accentHex, color: "#fff",
                    padding: "0.9rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontCuerpo}', sans-serif`, fontWeight: 700,
                    fontSize: "0.9rem", zIndex: 9999, borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(8,145,178,0.4)",
                }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}