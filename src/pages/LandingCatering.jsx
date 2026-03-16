import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: CATERING
// Elegante Premium - Perfil Luxury
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
    tema: "dark",
    color_primario: "#d4af37",
    color_secundario: "#b8941f",
    font_titulo: "Playfair Display",
    font_cuerpo: "Inter",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    imagen_hero: "https://images.unsplash.com/photo-1555939594-58d7cb561231?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1504674900152-b8b528627cb0?w=1000&q=80",
    servicios: [
        { titulo: "Eventos Corporativos", descripcion: "Caterigns ejecutivos con menús personalizados para conferencias, lanzamientos y reuniones de negocios.", icon: "briefcase" },
        { titulo: "Bodas y Matrimonios", descripcion: "Servicios completos de catering nupcial con diseño de menú, presentación gourmet y atención impecable.", icon: "heart" },
        { titulo: "Cócteles y Recepciones", descripcion: "Aperitivos, bebidas de firma y estaciones de comida para eventos sociales exclusivos.", icon: "wine" },
        { titulo: "Catering Privado", descripcion: "Experiencias gastronómicas personalizadas para cenas privadas, aniversarios y celebraciones especiales.", icon: "utensils" },
    ],
    testimonios: [
        { nombre: "{{TESTIM_1_NOMBRE}}", cargo: "{{TESTIM_1_CARGO}}", texto: "{{TESTIM_1_TEXTO}}" },
        { nombre: "{{TESTIM_2_NOMBRE}}", cargo: "{{TESTIM_2_CARGO}}", texto: "{{TESTIM_2_TEXTO}}" },
        { nombre: "{{TESTIM_3_NOMBRE}}", cargo: "{{TESTIM_3_CARGO}}", texto: "{{TESTIM_3_TEXTO}}" },
    ],
};

// SVG Icons — Elegante y minimalista
const Icons = {
    briefcase: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
    wine: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12v5c0 1-1 3-3 4v5h2v2H7v-2h2v-5c-2-1-3-3-3-4V4z"/></svg>),
    utensils: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V2"/><path d="M17 2v7c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V2"/><path d="M12 4v13"/><path d="M4 15v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4"/></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1555939594-58d7cb561231?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center", filter: isDark ? "brightness(0.25)" : "brightness(0.9)" }} />
            <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(${primaryRgb},0.1) 100%)` : `linear-gradient(135deg, rgba(248,250,252,0.95) 0%, rgba(${primaryRgb},0.05) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: isDark ? "linear-gradient(to bottom right, transparent 49%, #0f172a 50%)" : "linear-gradient(to bottom right, transparent 49%, #ffffff 50%)" }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 900, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
                    <div style={{ width: 40, height: 0.5, background: primary }} />
                    <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, fontWeight: 400 }}>Experiencia en Gastronomía</div>
                    <div style={{ width: 40, height: 0.5, background: primary }} />
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 8vw, 6rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: MUTED, maxWidth: 700, margin: "0 auto 3rem", lineHeight: 1.8, fontWeight: 300, letterSpacing: "0.02em" }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", borderRadius: "0", letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={() => scrollTo("contacto")}>Solicitar Cotización</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", borderRadius: "0", letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 5rem 4rem 5rem", background: BG, zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "3rem", width: "fit-content" }}>
                    <div style={{ width: 30, height: 0.5, background: primary }} />
                    <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, fontWeight: 400 }}>Premium Catering</div>
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.8rem, 5vw, 5rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "1.1rem", color: MUTED, marginBottom: "3rem", lineHeight: 1.8, maxWidth: 500, fontWeight: 300 }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2rem", fontSize: "0.85rem", borderRadius: "0", letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={() => scrollTo("contacto")}>Solicitar Cotización</button>
                    <button className="btn-outline" style={{ padding: "1rem 2rem", fontSize: "0.85rem", borderRadius: "0", letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || 'https://images.unsplash.com/photo-1555939594-58d7cb561231?w=1800&q=80'}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${BG} 0%, transparent 40%, rgba(${primaryRgb},0.15) 100%)` }} />
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: `linear-gradient(to right, ${BG}, transparent)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `1px solid ${primary}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.3em", textTransform: "uppercase", color: primary, marginBottom: "3rem", fontWeight: 400 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", textTransform: "capitalize", marginBottom: "3rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 1, background: primary, margin: "0 auto 3rem" }} />
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: MUTED, maxWidth: 600, margin: "0 auto 3.5rem", lineHeight: 1.8, fontWeight: 300 }}>
                    {d.slogan || d.descripcion}
                </p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", borderRadius: "0", letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={() => scrollTo("contacto")}>Solicitar Cotización</button>
                    <button className="btn-outline" style={{ padding: "1rem 2.5rem", fontSize: "0.85rem", borderRadius: "0", letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={() => scrollTo("servicios")}>Ver Servicios</button>
                </div>
            </div>
        </section>
    );
}

// ── SERVICIOS VARIANTS ──

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem 2.5rem", transition: "all 0.3s ease" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}>
                        <div style={{ width: 1, height: 40, background: primary, marginBottom: "2rem" }} />
                        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                            <div style={{ width: 24, height: 24, color: primary, minWidth: 24, marginTop: "0.25rem" }}>
                                <span>{Icons[s.icon] || Icons.utensils}</span>
                            </div>
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.35rem", fontWeight: 400, letterSpacing: "0.01em", marginBottom: "1rem", color: TEXT }}>
                            {s.titulo}
                        </h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 300 }}>
                            {s.descripcion}
                        </p>
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
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                        <div style={{ fontSize: "3.5rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 300, color: primary, opacity: 0.3, lineHeight: 1, minWidth: 70 }}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                                <div style={{ width: 20, height: 20, color: primary }}>
                                    {Icons[s.icon] || Icons.utensils}
                                </div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.3rem", fontWeight: 400, color: TEXT }}>
                                    {s.titulo}
                                </h3>
                            </div>
                            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, fontWeight: 300 }}>
                                {s.descripcion}
                            </p>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "4rem 3.5rem", height: "100%" }}>
                        <div style={{ width: 1, height: 50, background: primary, marginBottom: "2.5rem" }} />
                        <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.2em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 400 }}>
                            Servicio Destacado
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.2rem", fontWeight: 400, color: TEXT, marginBottom: "1.5rem", lineHeight: 1.2 }}>
                            {featured.titulo}
                        </h3>
                        <p style={{ color: MUTED, fontSize: "1rem", lineHeight: 1.8, fontWeight: 300 }}>
                            {featured.descripcion}
                        </p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 100}>
                        <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "2rem", transition: "all 0.3s" }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
                                <div style={{ width: 20, height: 20, color: primary }}>
                                    {Icons[s.icon] || Icons.utensils}
                                </div>
                            </div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.1rem", fontWeight: 400, color: TEXT, marginBottom: "0.5rem" }}>
                                {s.titulo}
                            </h3>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 300 }}>
                                {s.descripcion}
                            </p>
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
                src={d.imagen_nosotros || 'https://images.unsplash.com/photo-1504674900152-b8b528627cb0?w=1000&q=80'}
                alt="Nuestro equipo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de experiencia" },
                { n: d.clientes_atendidos, l: "Eventos realizados" },
                { n: "100%", l: "Satisfacción garantizada" },
                { n: "24/7", l: "Soporte personalizado" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.8rem", fontWeight: 300, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>
                        {s.n}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 400 }}>
                        {s.l}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingCatering({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';

    const primary = d.color_primario || '#d4af37';
    const secondary = d.color_secundario || '#b8941f';
    const fontTitulo = d.font_titulo || 'Playfair Display';
    const fontCuerpo = d.font_cuerpo || 'Inter';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@300;400;500;700&family=${fontCuerpo.replace(/ /g, '+')}:wght@300;400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "CT").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
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
                    --primary-rgb: ${primaryRgb};
                    --bg: ${BG};
                    --bg2: ${BG2};
                    --text: ${TEXT};
                    --muted: ${MUTED};
                    --border: ${BORDER};
                }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 400; font-size: 0.9rem; transition: color 0.2s; letter-spacing: 0.02em; }
                .nav-link:hover { color: ${primary}; }
                .btn-primary { background: ${primary}; color: ${isDark ? '#0f172a' : '#f8fafc'}; border: 1px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.3s; font-size: 0.8rem; }
                .btn-primary:hover { background: transparent; color: ${primary}; transform: translateY(-2px); }
                .btn-outline { background: transparent; color: ${TEXT}; border: 1px solid ${BORDER}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; transition: all 0.3s; font-size: 0.8rem; }
                .btn-outline:hover { border-color: ${primary}; color: ${primary}; }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: ${BG2}; border: 1px solid ${BORDER}; color: ${TEXT}; font-family: '${fontCuerpo}', sans-serif; font-size: 0.9rem; padding: 0.9rem 1rem; width: 100%; outline: none; transition: border-color 0.2s; }
                input:focus, textarea:focus { border-color: ${primary}; }
                textarea { resize: vertical; min-height: 120px; }
                @media (max-width: 768px) {
                    .mobile-menu { display: flex !important; }
                    .desktop-nav { display: none !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .contact-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.5rem 2.5rem",
                background: scrolled ? `rgba(15, 23, 42, ${isDark ? 0.95 : 0.7})` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.9rem", letterSpacing: "0.05em", color: isDark ? '#0f172a' : '#f8fafc' }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "1rem", letterSpacing: "0.03em" }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.75rem" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none", width: 24, height: 24 }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? Icons.x : Icons.menu}
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 70, left: 0, right: 0, zIndex: 999, background: BG2, borderBottom: `1px solid ${BORDER}`, padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1rem" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.8rem", fontSize: "0.8rem", width: "100%" }} onClick={() => scrollTo("contacto")}>Reservar Ahora</button>
                </div>
            )}

            {/* ── HERO ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "3rem 2.5rem" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Eventos realizados" },
                        { n: "100%", l: "Satisfacción" },
                        { n: "24h", l: "Respuesta" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2rem", fontWeight: 300, color: isDark ? '#0f172a' : '#f8fafc', letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>{s.n}</div>
                            <div style={{ fontSize: "0.75rem", opacity: 0.85, letterSpacing: "0.1em", textTransform: "uppercase", color: isDark ? 'rgba(15,23,42,0.75)' : 'rgba(255,255,255,0.75)', fontWeight: 400 }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: BG2, padding: "8rem 2.5rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                            <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>Nuestros Servicios</p>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, textTransform: "capitalize", letterSpacing: "-0.01em", marginBottom: "4rem", color: TEXT }}>
                            Lo que ofrecemos
                        </h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, isDark, BG, BG2, TEXT, MUTED, BORDER };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── NOSOTROS ── */}
            <section id="nosotros" style={{ background: BG, padding: "8rem 2.5rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                            <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>Quiénes Somos</p>
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textTransform: "capitalize", lineHeight: 1.2, marginBottom: "2rem", color: TEXT }}>
                            Catering de excelencia
                        </h2>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300, fontSize: "1rem" }}>
                            {d.descripcion}
                        </p>
                        <button className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "0.8rem" }} onClick={() => scrollTo("contacto")}>Contáctanos</button>
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
            <section id="testimonios" style={{ background: BG2, padding: "8rem 2.5rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                            <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>Testimonios</p>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, textTransform: "capitalize", marginBottom: "4rem", color: TEXT }}>
                            Lo que dicen nuestros clientes
                        </h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 120}>
                                <div style={{ background: BG, border: `1px solid ${BORDER}`, padding: "2.5rem", transition: "all 0.3s" }}
                                    onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                                    onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => (
                                            <span key={j} style={{ width: 14, height: 14 }}>
                                                {Icons.starFill}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontWeight: 300, fontStyle: "italic" }}>
                                        "{t.texto}"
                                    </p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.9rem", color: isDark ? '#0f172a' : '#f8fafc' }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>{t.nombre}</div>
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
            <section id="contacto" style={{ background: BG, padding: "8rem 2.5rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                            <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: primary }}>Contacto</p>
                            <div style={{ width: 40, height: 0.5, background: primary }} />
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, textTransform: "capitalize", marginBottom: "4rem", color: TEXT }}>
                            Hablemos de tu evento
                        </h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Dirección", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                                        <div style={{ width: 24, height: 24, minWidth: 24, color: primary, marginTop: "0.25rem" }}>
                                            {Icons[item.icon]}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: MUTED, marginBottom: "0.5rem", fontWeight: 400 }}>{item.label}</div>
                                            <div style={{ fontWeight: 400, color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1.1rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.85rem", transition: "background 0.2s", marginTop: "1rem" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 18, height: 18 }}>{Icons.whatsapp}</span>
                                    WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={150}>
                            <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.3rem", fontWeight: 400, textTransform: "capitalize", marginBottom: "2rem", color: TEXT }}>Solicita tu cotización</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}>
                                    <input type="text" placeholder="Tu nombre" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="Tipo de evento" />
                                    <textarea placeholder="Cuéntanos sobre tu evento..." />
                                    <button className="btn-primary" style={{ padding: "1rem", fontSize: "0.85rem", width: "100%" }}>Enviar Cotización</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: BG2, borderTop: `1px solid ${BORDER}`, padding: "4rem 2.5rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.85rem", color: isDark ? '#0f172a' : '#f8fafc' }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "0.95rem", textTransform: "capitalize", letterSpacing: "0.02em" }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.85rem", textTransform: "capitalize", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = primary}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.8rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: `rgba(${primaryRgb},0.4)`, fontSize: "0.7rem", letterSpacing: "0.05em" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: isDark ? '#0f172a' : '#f8fafc',
                    padding: "0.9rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400,
                    fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 8px 24px rgba(${primaryRgb},0.35)`,
                    transition: "all 0.2s",
                }}
                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                    Entrar →
                </button>
            )}
        </div>
    );
}