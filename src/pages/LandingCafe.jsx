import { useState, useEffect, useRef } from "react";

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
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    color_primario: "#d4a574",
    color_secundario: "#8b7355",
    font_titulo: "Playfair Display",
    font_cuerpo: "Cormorant Garamond",
    imagen_hero: "https://images.unsplash.com/photo-1495474472645-4c71bcdd2fa3?w=1800&q=80",
    imagen_nosotros: "https://images.unsplash.com/photo-1511537190424-eea2b6bd0e31?w=800&q=80",
    servicios: [
        { titulo: "{{SERVICIO_1}}", descripcion: "{{DESC_1}}", icon: "coffee" },
        { titulo: "{{SERVICIO_2}}", descripcion: "{{DESC_2}}", icon: "leaf" },
        { titulo: "{{SERVICIO_3}}", descripcion: "{{DESC_3}}", icon: "cup" },
        { titulo: "{{SERVICIO_4}}", descripcion: "{{DESC_4}}", icon: "wheat" },
    ],
    testimonios: [
        { nombre: "{{TESTIM_1_NOMBRE}}", cargo: "{{TESTIM_1_CARGO}}", texto: "{{TESTIM_1_TEXTO}}" },
        { nombre: "{{TESTIM_2_NOMBRE}}", cargo: "{{TESTIM_2_CARGO}}", texto: "{{TESTIM_2_TEXTO}}" },
        { nombre: "{{TESTIM_3_NOMBRE}}", cargo: "{{TESTIM_3_CARGO}}", texto: "{{TESTIM_3_TEXTO}}" },
    ],
};

const Icons = {
    coffee: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="3"/><line x1="10" y1="1" x2="10" y2="3"/><line x1="14" y1="1" x2="14" y2="3"/></svg>),
    leaf: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z"/></svg>),
    cup: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
    wheat: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8"/></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
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

function HeroCentered({ d, primary, primaryRgb, fontTitulo, scrollTo, BG, BG2, TEXT, MUTED, BORDER, isDark }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: BG }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero}')`, backgroundSize: "cover", backgroundPosition: "center", filter: isDark ? "brightness(0.4) saturate(0.9)" : "brightness(0.9)" }} />
            <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(${primaryRgb},0.1) 100%)` : `linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(${primaryRgb},0.05) 100%)` }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: `linear-gradient(to bottom right, transparent 49%, ${BG} 50%)` }} />
            <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem", maxWidth: 820, zIndex: 1 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "3rem", fontWeight: 500 }}>
                    ✦ {d.anos_experiencia} años de tradición ✦
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 400, lineHeight: 1.0, letterSpacing: "0.02em", marginBottom: "2rem", color: TEXT, textTransform: "capitalize" }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", color: MUTED, maxWidth: 580, margin: "0 auto 3rem", lineHeight: 1.8, letterSpacing: "0.01em" }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "0.95rem 2.8rem", fontSize: "0.85rem", borderRadius: "0px", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.15em" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                    <button className="btn-outline" style={{ padding: "0.95rem 2.8rem", fontSize: "0.85rem", borderRadius: "0px", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.15em" }} onClick={() => scrollTo("servicios")}>Catálogo</button>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, primary, primaryRgb, fontTitulo, scrollTo, BG, BG2, TEXT, MUTED, BORDER, isDark }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem", background: BG, zIndex: 1 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "2.5rem", fontWeight: 500 }}>
                    ✦ {d.anos_experiencia} años de tradición
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "0.02em", marginBottom: "1.5rem", color: TEXT, textTransform: "capitalize" }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.05rem", color: MUTED, marginBottom: "2.5rem", lineHeight: 1.8, maxWidth: 420, letterSpacing: "0.01em" }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "0.9rem 2.2rem", fontSize: "0.85rem", borderRadius: "0px", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.15em" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                    <button className="btn-outline" style={{ padding: "0.9rem 2.2rem", fontSize: "0.85rem", borderRadius: "0px", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.15em" }} onClick={() => scrollTo("servicios")}>Catálogo</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(to right, ${BG} 0%, transparent 35%, rgba(${primaryRgb},0.15) 100%)` : `linear-gradient(to right, ${BG} 0%, transparent 35%, rgba(${primaryRgb},0.08) 100%)` }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, primary, primaryRgb, fontTitulo, scrollTo, BG, BG2, TEXT, MUTED, BORDER, isDark }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: BG, borderBottom: `1px solid ${BORDER}`, overflow: "hidden" }}>
            <div style={{ textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
                <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "3rem", fontWeight: 500 }}>
                    {d.anos_experiencia} años — {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(3.5rem, 10vw, 6.5rem)", fontWeight: 400, lineHeight: 0.95, letterSpacing: "0.01em", textTransform: "capitalize", marginBottom: "2rem", color: TEXT }}>
                    {d.nombre}
                </h1>
                <div style={{ width: 60, height: 1, background: primary, margin: "0 auto 2.5rem" }} />
                <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: MUTED, maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.8, letterSpacing: "0.01em" }}>{d.slogan || d.descripcion}</p>
                <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ padding: "0.95rem 2.8rem", fontSize: "0.85rem", borderRadius: "0px", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.15em" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                    <button className="btn-outline" style={{ padding: "0.95rem 2.8rem", fontSize: "0.85rem", borderRadius: "0px", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.15em" }} onClick={() => scrollTo("servicios")}>Catálogo</button>
                </div>
            </div>
        </section>
    );
}

function ServiciosGrid({ d, primary, primaryRgb, fontTitulo, BG, BG2, TEXT, MUTED, BORDER, isDark }) {
    return (
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2.5rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 120}>
                    <div style={{ padding: "3rem 2.5rem", background: BG2, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.background = isDark ? `rgba(${primaryRgb},0.05)` : `rgba(${primaryRgb},0.02)`; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = BG2; }}>
                        <div style={{ width: 40, height: 40, color: primary, marginBottom: "1.5rem" }}>
                            {Icons[s.icon] || Icons.coffee}
                        </div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.4rem", fontWeight: 400, textTransform: "capitalize", letterSpacing: "0.02em", marginBottom: "1rem", color: TEXT }}>{s.titulo}</h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, letterSpacing: "0.01em" }}>{s.descripcion}</p>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosList({ d, primary, primaryRgb, fontTitulo, BG, BG2, TEXT, MUTED, BORDER, isDark }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {(d.servicios || []).map((s, i) => (
                <AnimatedSection key={i} delay={i * 120}>
                    <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "2rem", padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                        onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                        onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                        <div style={{ color: primary, width: 40, height: 40 }}>
                            {Icons[s.icon] || Icons.coffee}
                        </div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.25rem", fontWeight: 400, textTransform: "capitalize", letterSpacing: "0.02em", marginBottom: "0.75rem", color: TEXT }}>{s.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.7, letterSpacing: "0.01em" }}>{s.descripcion}</p>
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}

function ServiciosFeatured({ d, primary, primaryRgb, fontTitulo, BG, BG2, TEXT, MUTED, BORDER, isDark }) {
    const [featured, ...rest] = d.servicios || [];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "2.5rem" }} className="grid-2">
            {featured && (
                <AnimatedSection>
                    <div style={{ padding: "4rem 3.5rem", background: BG2, border: `1px solid ${BORDER}`, height: "100%" }}>
                        <div style={{ width: 48, height: 48, color: primary, marginBottom: "2rem" }}>
                            {Icons[featured.icon] || Icons.coffee}
                        </div>
                        <div style={{ fontSize: "0.7rem", fontFamily: `'${fontTitulo}', sans-serif`, letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem", fontWeight: 500 }}>Especialidad</div>
                        <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.2rem", fontWeight: 400, textTransform: "capitalize", lineHeight: 1.2, marginBottom: "1.5rem", color: TEXT }}>{featured.titulo}</h3>
                        <p style={{ color: MUTED, fontSize: "0.95rem", lineHeight: 1.8, letterSpacing: "0.01em" }}>{featured.descripcion}</p>
                    </div>
                </AnimatedSection>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {rest.map((s, i) => (
                    <AnimatedSection key={i} delay={i * 120}>
                        <div style={{ padding: "2rem", background: BG2, border: `1px solid ${BORDER}`, transition: "all 0.3s" }}
                            onMouseOver={e => { e.currentTarget.style.borderColor = primary; }}
                            onMouseOut={e => { e.currentTarget.style.borderColor = BORDER; }}>
                            <div style={{ width: 32, height: 32, color: primary, marginBottom: "1rem" }}>
                                {Icons[s.icon] || Icons.coffee}
                            </div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.15rem", fontWeight: 400, textTransform: "capitalize", marginBottom: "0.5rem", color: TEXT }}>{s.titulo}</h3>
                            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.6, letterSpacing: "0.01em" }}>{s.descripcion}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
}

function NosotrosImage({ d, isDark }) {
    return (
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
            <img
                src={d.imagen_nosotros}
                alt="Nuestro café"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, transparent 60%)" : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
        </div>
    );
}

function NosotrosStats({ d, primary, fontTitulo, BG2, TEXT, MUTED, BORDER }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {[
                { n: d.anos_experiencia, l: "Años de historia" },
                { n: d.clientes_atendidos, l: "Clientes satisfechos" },
                { n: "100%", l: "Café arábica" },
                { n: "24/7", l: "Disponibles" },
            ].map((s, i) => (
                <div key={i} style={{ padding: "2.5rem", background: BG2, border: `1px solid ${BORDER}`, borderTop: `2px solid ${primary}` }}>
                    <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2.8rem", fontWeight: 400, color: primary, lineHeight: 1, marginBottom: "0.75rem" }}>{s.n}</div>
                    <div style={{ fontSize: "0.8rem", color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                </div>
            ))}
        </div>
    );
}

export default function LandingCafe({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = (d.tema || 'dark') === 'dark';
    const BG = isDark ? '#0f172a' : '#ffffff';
    const BG2 = isDark ? '#1e293b' : '#f8fafc';
    const TEXT = isDark ? '#f8fafc' : '#0f172a';
    const MUTED = isDark ? 'rgba(248,250,252,0.6)' : 'rgba(15,23,42,0.6)';
    const BORDER = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.1)';

    const primary = d.color_primario || '#d4a574';
    const secondary = d.color_secundario || '#8b7355';
    const fontTitulo = d.font_titulo || 'Playfair Display';
    const fontCuerpo = d.font_cuerpo || 'Cormorant Garamond';
    const primaryRgb = hexToRgb(primary);
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, '+')}:wght@400;500;600;700&family=${fontCuerpo.replace(/ /g, '+')}:wght@400;500;600&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "CF").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
    const waLink = `https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`;

    const variantProps = { d, primary, primaryRgb, fontTitulo, fontCuerpo, scrollTo, BG, BG2, TEXT, MUTED, BORDER, isDark };

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
                    --border: ${BORDER};
                    --text: ${TEXT};
                    --muted: ${MUTED};
                }
                .titulo { font-family: '${fontTitulo}', sans-serif; }
                .nav-link { cursor: pointer; color: ${MUTED}; font-weight: 400; font-size: 0.95rem; transition: color 0.3s; letter-spacing: 0.02em; }
                .nav-link:hover { color: ${TEXT}; }
                .btn-primary { background: var(--primary); color: #fff; border: none; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; transition: all 0.3s; }
                .btn-primary:hover { background: ${secondary}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(${primaryRgb},0.2); }
                .btn-outline { background: transparent; color: ${primary}; border: 1px solid ${primary}; cursor: pointer; font-family: '${fontTitulo}', sans-serif; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; transition: all 0.3s; }
                .btn-outline:hover { background: rgba(${primaryRgb},0.1); }
                .divider { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
                .divider-line { flex: 1; height: 1px; background: ${BORDER}; }
                .divider-dot { width: 6px; height: 6px; background: ${primary}; transform: rotate(45deg); }
                a { text-decoration: none; color: inherit; }
                input, textarea { background: ${BG}; border: 1px solid ${BORDER}; color: ${TEXT}; font-family: '${fontCuerpo}', sans-serif; font-size: 0.95rem; padding: 1rem; width: 100%; outline: none; transition: border-color 0.3s; }
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
                padding: "1.25rem 2rem",
                background: scrolled ? `rgba(${isDark ? '15,23,42' : '255,255,255'},0.95)` : "transparent",
                borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 36, height: 36, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.1em", color: "#fff" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "1rem", letterSpacing: "0.03em", textTransform: "capitalize", color: TEXT }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize" }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.8rem", letterSpacing: "0.12em" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                </div>
                <button style={{ background: "none", border: "none", color: TEXT, cursor: "pointer", display: "none", width: 28, height: 28 }} className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <span style={{ width: 24, height: 24, display: "block", color: TEXT }}>{Icons.x}</span> : <span style={{ width: 24, height: 24, display: "block", color: TEXT }}>{Icons.menu}</span>}
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 70, left: 0, right: 0, zIndex: 999, background: `${BG}ee`, borderBottom: `1px solid ${BORDER}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                        <span key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ textTransform: "capitalize", fontSize: "1.05rem", color: TEXT }}>{s}</span>
                    ))}
                    <button className="btn-primary" style={{ padding: "0.8rem", fontSize: "0.85rem", letterSpacing: "0.12em" }} onClick={() => scrollTo("contacto")}>Reservar</button>
                </div>
            )}

            {/* ── HERO ── */}
            {(() => {
                if (d.hero_variant === "split") return <HeroSplit {...variantProps} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...variantProps} />;
                return <HeroCentered {...variantProps} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: primary, padding: "3rem 2rem", color: "#fff" }}>
                <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 1000, margin: "0 auto", textAlign: "center", gap: "2rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años sirviendo café" },
                        { n: d.clientes_atendidos, l: "Clientes felices" },
                        { n: "50+", l: "Variedades" },
                        { n: "Artesanal", l: "Tostión propia" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "2rem", fontWeight: 400, letterSpacing: "-0.01em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.8rem", opacity: 0.9, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "0.5rem" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Nuestra oferta</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 400, textTransform: "capitalize", letterSpacing: "0.01em", marginBottom: "4rem", color: TEXT }}>Experiencias que causan impresión</h2>
                    </AnimatedSection>
                    {(() => {
                        const props = { d, primary, primaryRgb, fontTitulo, BG, BG2, TEXT, MUTED, BORDER, isDark };
                        if (d.servicios_variant === "list") return <ServiciosList {...props} />;
                        if (d.servicios_variant === "featured") return <ServiciosFeatured {...props} />;
                        return <ServiciosGrid {...props} />;
                    })()}
                </div>
            </section>

            {/* ── NOSOTROS ── */}
            <section id="nosotros" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-2">
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Sobre nosotros</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, textTransform: "capitalize", lineHeight: 1.2, marginBottom: "2rem", color: TEXT }}>Pasión por el café desde el primer grano</h2>
                        <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "1rem", letterSpacing: "0.01em" }}>{d.descripcion}</p>
                        <button className="btn-primary" style={{ padding: "0.9rem 2.2rem", fontSize: "0.85rem", letterSpacing: "0.12em" }} onClick={() => scrollTo("contacto")}>Contáctanos</button>
                    </AnimatedSection>
                    <AnimatedSection delay={150}>
                        {(() => {
                            if (d.nosotros_variant === "stats") return <NosotrosStats d={d} primary={primary} fontTitulo={fontTitulo} BG2={BG2} TEXT={TEXT} MUTED={MUTED} BORDER={BORDER} />;
                            return <NosotrosImage d={d} isDark={isDark} />;
                        })()}
                    </AnimatedSection>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: BG2, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Voces</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 400, textTransform: "capitalize", marginBottom: "4rem", color: TEXT }}>Lo que nuestros clientes dicen</h2>
                    </AnimatedSection>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <AnimatedSection key={i} delay={i * 150}>
                                <div style={{ background: BG, border: `1px solid ${BORDER}`, padding: "2.5rem", transition: "border-color 0.3s" }}
                                    onMouseOver={e => e.currentTarget.style.borderColor = primary}
                                    onMouseOut={e => e.currentTarget.style.borderColor = BORDER}>
                                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", color: primary }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 18, height: 18 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem", fontStyle: "italic", letterSpacing: "0.01em" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ width: 44, height: 44, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.9rem", color: "#fff" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, fontSize: "0.95rem", color: TEXT }}>{t.nombre}</div>
                                            <div style={{ color: MUTED, fontSize: "0.8rem", letterSpacing: "0.01em" }}>{t.cargo}</div>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACTO ── */}
            <section id="contacto" style={{ background: BG, padding: "8rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <AnimatedSection>
                        <div className="divider"><div className="divider-line" /><div className="divider-dot" /><div className="divider-line" /></div>
                        <p style={{ textAlign: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: primary, marginBottom: "1rem" }}>Ponte en contacto</p>
                        <h2 style={{ fontFamily: `'${fontTitulo}', sans-serif`, textAlign: "center", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 400, textTransform: "capitalize", marginBottom: "4rem", color: TEXT }}>Te esperamos en nuestro café</h2>
                    </AnimatedSection>
                    <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>
                        <AnimatedSection>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Ubicación", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}` }}>
                                        <div style={{ width: 44, height: 44, minWidth: 44, color: primary, marginTop: "0.25rem" }}>
                                            {Icons[item.icon]}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: MUTED, marginBottom: "0.5rem", fontWeight: 500 }}>{item.label}</div>
                                            <div style={{ fontWeight: 400, fontSize: "1rem", color: TEXT }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={waLink} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.85rem", background: "#25d366", color: "#fff", padding: "1.1rem", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.9rem", transition: "background 0.3s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    WhatsApp
                                </a>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={200}>
                            <div style={{ background: BG2, border: `1px solid ${BORDER}`, padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontSize: "1.5rem", fontWeight: 400, textTransform: "capitalize", marginBottom: "2rem", color: TEXT }}>Cuéntanos</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    <input type="text" placeholder="Tu nombre" />
                                    <input type="tel" placeholder="Tu teléfono" />
                                    <input type="text" placeholder="Asunto" />
                                    <textarea placeholder="Tu mensaje..." />
                                    <button className="btn-primary" style={{ padding: "1rem", fontSize: "0.9rem", letterSpacing: "0.12em", width: "100%" }}>Enviar</button>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: BG2, borderTop: `1px solid ${BORDER}`, padding: "3.5rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${BORDER}`, marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 40, height: 40, background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500, fontSize: "0.85rem", color: "#fff" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 400, fontSize: "1.05rem", textTransform: "capitalize", letterSpacing: "0.02em", color: TEXT }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
                            {["inicio", "servicios", "nosotros", "testimonios", "contacto"].map(s => (
                                <span key={s} style={{ cursor: "pointer", color: MUTED, fontSize: "0.9rem", textTransform: "capitalize", transition: "color 0.3s" }}
                                    onClick={() => scrollTo(s)}
                                    onMouseOver={e => e.currentTarget.style.color = TEXT}
                                    onMouseOut={e => e.currentTarget.style.color = MUTED}
                                >{s}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: MUTED, fontSize: "0.85rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: `rgba(${primaryRgb},0.4)`, fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Hecho con café por Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: primary, color: "#fff",
                    padding: "1rem 1.8rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontTitulo}', sans-serif`, fontWeight: 500,
                    fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 8px 24px rgba(${primaryRgb},0.25)`,
                    transition: "all 0.3s",
                }} onMouseOver={e => { e.currentTarget.style.background = secondary; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = primary; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Ingresar →
                </button>
            )}
        </div>
    );
}