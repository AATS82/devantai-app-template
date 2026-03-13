import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: GASTRONOMÍA MODERNA
// Estilo: blanco/negro, minimalista, foto grande, tipografía bold
// Variantes: hero_variant, servicios_variant, nosotros_variant
// Secciones: Menú destacado, Reservas, Galería
// ============================================================

const DEFAULT_DATA = {
    nombre: "Onyx",
    slogan: "Gastronomía sin distracciones.",
    descripcion: "Ingredientes precisos. Técnica impecable. Sin artificios. Onyx es un restaurante donde cada plato cuenta una historia a través de sus sabores.",
    ciudad: "Santiago, Chile",
    telefono: "56933221100",
    email: "hola@onyxrestaurant.cl",
    horario: "Mar–Sáb 19:00–00:00",
    anos_experiencia: "6+",
    clientes_atendidos: "15.000+",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    color_primario: "#1a1a1a",
    color_secundario: "#444444",
    font_titulo: "DM Serif Display",
    font_cuerpo: "DM Sans",
    industria: "gastronomia",
    servicios: [
        { titulo: "Menú degustación", descripcion: "7 tiempos con maridaje opcional. La experiencia completa de nuestra cocina.", icon: "award" },
        { titulo: "A la carta", descripcion: "Selección de platos según temporada y disponibilidad de ingredientes.", icon: "list" },
        { titulo: "Barra de vinos", descripcion: "Más de 80 etiquetas nacionales e importadas cuidadosamente seleccionadas.", icon: "wine" },
        { titulo: "Eventos exclusivos", descripcion: "Cenas privadas y experiencias gastronómicas a medida para grupos.", icon: "star" },
    ],
    menu_destacado: [
        { nombre: "Tártaro de atún", descripcion: "Aguacate, tobiko, sésamo tostado y emulsión de cítricos.", precio: "$16.400", categoria: "Entradas" },
        { nombre: "Pulpo a la brasa", descripcion: "Pimentón ahumado, aceite de oliva virgen y papas noisette.", precio: "$19.800", categoria: "Fondos" },
        { nombre: "Wagyu MB5+", descripcion: "200g de lomo veteado, puré de tuétano y jus de res.", precio: "$38.500", categoria: "Fondos" },
        { nombre: "Chocolate 72%", descripcion: "Mousse intenso, crumble de avellanas y helado de sal de mar.", precio: "$9.200", categoria: "Postres" },
    ],
    galeria: [
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    ],
    testimonios: [
        { nombre: "Ignacio Herrera", cargo: "Crítico gastronómico", texto: "Onyx representa lo mejor de la nueva cocina chilena. Técnica francesa con identidad propia." },
        { nombre: "Sofía Riquelme", cargo: "Cena de aniversario", texto: "El menú degustación fue una experiencia que no olvidaré. Cada plato superaba al anterior." },
        { nombre: "Carlos Montoya", cargo: "Cliente habitual", texto: "El lugar para impresionar. Servicio discreto, ambiente perfecto y una cocina de primer nivel." },
    ],
};

const Icons = {
    award: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>),
    list: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>),
    wine: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 15v7" /><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z" /></svg>),
    star: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    arrowRight: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>),
    menuIcon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
    x: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
    whatsapp: (<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" /></svg>),
};

function useIntersection(ref, threshold = 0.1) {
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
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        }}>{children}</div>
    );
}

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

// ── HERO VARIANTS ──

function HeroCentered({ d, accent, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.5)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "0 4rem 6rem" }}>
                <div style={{ maxWidth: 900 }}>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem", fontWeight: 500 }}>
                        {d.ciudad} — Restaurante
                    </div>
                    <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(4rem,10vw,8rem)", fontWeight: 400, lineHeight: 0.9, color: "#fff", marginBottom: "2rem", letterSpacing: "-0.02em" }}>
                        {d.nombre}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", maxWidth: 440, lineHeight: 1.7 }}>{d.slogan}</p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <button className="btn-dark" style={{ padding: "1rem 2.5rem" }} onClick={() => scrollTo("reservas")}>Reservar</button>
                            <button className="btn-white-ghost" style={{ padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "0.5rem" }} onClick={() => scrollTo("menu")}>
                                Ver carta <span style={{ width: 16, height: 16 }}>{Icons.arrowRight}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HeroSplit({ d, accent, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }} className="hero-split-m">
            <div style={{ background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "10rem 4rem 4rem 4rem" }}>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", marginBottom: "2rem", fontWeight: 500 }}>
                    Restaurante · {d.ciudad}
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 400, lineHeight: 0.95, color: "#0a0a0a", marginBottom: "1.75rem", letterSpacing: "-0.02em" }}>
                    {d.nombre}
                </h1>
                <p style={{ color: "#777", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 380 }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-dark" style={{ padding: "0.9rem 2rem" }} onClick={() => scrollTo("reservas")}>Reservar</button>
                    <button className="btn-dark-ghost" style={{ padding: "0.9rem 2rem" }} onClick={() => scrollTo("menu")}>Ver carta</button>
                </div>
            </div>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
        </section>
    );
}

function HeroMinimal({ d, accent, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <img src={d.imagen_hero || "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1800&q=80"} alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%) brightness(0.35)" }} />
            </div>
            <div style={{ position: "relative", zIndex: 1, padding: "0 4rem 5rem", maxWidth: 1200 }}>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(5rem,14vw,11rem)", fontWeight: 400, lineHeight: 0.85, letterSpacing: "-0.03em", color: "#fff", marginBottom: "2.5rem" }}>
                    {d.nombre}
                </h1>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: 340, lineHeight: 1.7 }}>{d.slogan}</p>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button className="btn-white" style={{ padding: "1rem 2.5rem" }} onClick={() => scrollTo("reservas")}>Reservar</button>
                        <button className="btn-white-ghost" style={{ padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "0.5rem" }} onClick={() => scrollTo("menu")}>
                            Ver carta <span style={{ width: 16, height: 16 }}>{Icons.arrowRight}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ── MENÚ VARIANTS ──

function MenuGrid({ d, fontTitulo }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "#e5e5e5" }} className="grid-2-m">
            {(d.menu_destacado || []).map((item, i) => (
                <FadeIn key={i} delay={i * 60}>
                    <div className="menu-card-m">
                        <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#999", marginBottom: "0.75rem", fontWeight: 600 }}>{item.categoria}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.4rem", fontWeight: 400, color: "#0a0a0a", lineHeight: 1.2 }}>{item.nombre}</h3>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.1rem", color: "#0a0a0a", fontWeight: 400, whiteSpace: "nowrap" }}>{item.precio}</div>
                        </div>
                        <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.6, marginTop: "0.6rem" }}>{item.descripcion}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

function MenuList({ d, fontTitulo }) {
    return (
        <div>
            {(d.menu_destacado || []).map((item, i) => (
                <FadeIn key={i} delay={i * 50}>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "2rem", alignItems: "baseline", padding: "2rem 0", borderBottom: "1px solid #e5e5e5" }}>
                        <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#bbb", fontWeight: 600, width: 80 }}>{item.categoria}</div>
                        <div>
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.35rem", fontWeight: 400, color: "#0a0a0a", marginBottom: "0.3rem" }}>{item.nombre}</h3>
                            <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.5 }}>{item.descripcion}</p>
                        </div>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.1rem", color: "#0a0a0a", whiteSpace: "nowrap" }}>{item.precio}</div>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d, fontTitulo }) {
    return (
        <FadeIn>
            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                <img src={d.imagen_nosotros || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"} alt="Nuestro restaurante" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                    <div style={{ display: "flex", gap: "2.5rem" }}>
                        {[{ n: d.anos_experiencia, l: "Años" }, { n: d.clientes_atendidos, l: "Comensales" }].map((s, i) => (
                            <div key={i}>
                                <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2rem", fontWeight: 400, color: "#fff" }}>{s.n}</div>
                                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textTransform: "uppercase" }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

function NosotrosStats({ d, fontTitulo }) {
    return (
        <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#e5e5e5" }}>
                {[
                    { n: d.anos_experiencia, l: "Años" },
                    { n: d.clientes_atendidos, l: "Comensales" },
                    { n: "100%", l: "Producto fresco" },
                    { n: "4.9★", l: "Valoración" },
                ].map((s, i) => (
                    <div key={i} style={{ padding: "2.5rem 2rem", background: i === 0 ? "#0a0a0a" : "#fff", textAlign: "center" }}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "3rem", fontWeight: 400, color: i === 0 ? "#fff" : "#0a0a0a", lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</div>
                        <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: i === 0 ? "rgba(255,255,255,0.5)" : "#aaa" }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingGastronomiaModerna({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [personas, setPersonas] = useState("2");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [isLight, setIsLight] = useState(false);

    const accent = d.color_primario || "#1a1a1a";
    const fontTitulo = d.font_titulo || "DM Serif Display";
    const fontCuerpo = d.font_cuerpo || "DM Sans";
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, "+")}:ital@0;1&family=${fontCuerpo.replace(/ /g, "+")},ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap`;

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 60);
            // Detecta si estamos sobre sección clara
            const lightSections = ["menu", "nosotros", "servicios"];
            let light = false;
            for (const id of lightSections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 65 && rect.bottom >= 65) { light = true; break; }
                }
            }
            setIsLight(light);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: "#fff", color: "#0a0a0a", overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                .btn-dark { background: #0a0a0a; color: #fff; border: none; cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 500; letter-spacing: 0.08em; font-size: 0.85rem; transition: all 0.2s; }
                .btn-dark:hover { background: #333; }
                .btn-dark-ghost { background: transparent; color: #0a0a0a; border: 1.5px solid #0a0a0a; cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 500; letter-spacing: 0.08em; font-size: 0.85rem; transition: all 0.2s; }
                .btn-dark-ghost:hover { background: #0a0a0a; color: #fff; }
                .btn-white { background: #fff; color: #0a0a0a; border: none; cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 500; letter-spacing: 0.08em; font-size: 0.85rem; transition: all 0.2s; }
                .btn-white:hover { background: #f0f0f0; }
                .btn-white-ghost { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.4); cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 500; letter-spacing: 0.08em; font-size: 0.85rem; transition: all 0.2s; }
                .btn-white-ghost:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
                .menu-card-m { background: #fff; padding: 2rem; transition: background 0.2s; }
                .menu-card-m:hover { background: #f8f8f8; }
                .service-card-m { padding: 2.5rem; border-bottom: 1px solid #e5e5e5; transition: background 0.2s; }
                .service-card-m:hover { background: #fafafa; }
                .nav-link-m { cursor: pointer; font-size: 0.85rem; font-weight: 400; transition: color 0.2s; letter-spacing: 0.03em; }
                a { text-decoration: none; color: inherit; }
                input, select, textarea { background: #f8f8f8; border: 1.5px solid #e5e5e5; color: #0a0a0a; font-family: '${fontCuerpo}', sans-serif; font-size: 0.9rem; padding: 0.9rem 1rem; width: 100%; outline: none; transition: border-color 0.2s; }
                input:focus, select:focus, textarea:focus { border-color: #0a0a0a; }
                textarea { resize: vertical; min-height: 100px; }
                @media (max-width: 768px) {
                    .desktop-nav-m { display: none !important; }
                    .mobile-btn-m { display: flex !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-2-m { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .hero-split-m { grid-template-columns: 1fr !important; }
                    .hero-split-m > div:last-child { min-height: 50vh; }
                    .contact-grid-m { grid-template-columns: 1fr !important; }
                    .galeria-grid-m { grid-template-columns: 1fr 1fr !important; }
                    .menu-list-row { grid-template-columns: 1fr !important; }
                    .hero-bottom-pad { padding: 0 1.5rem 4rem !important; }
                    .hero-minimal-h1 { font-size: clamp(3.5rem,18vw,7rem) !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.25rem 3rem",
                background: scrolled ? (isLight ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0.92)") : "transparent",
                borderBottom: scrolled ? `1px solid ${isLight ? "#e5e5e5" : "rgba(255,255,255,0.08)"}` : "none",
                backdropFilter: scrolled ? "blur(16px)" : "none",
                transition: "all 0.4s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ cursor: "pointer", fontFamily: `'${fontTitulo}', serif`, fontSize: "1.35rem", fontWeight: 400, color: scrolled && isLight ? "#0a0a0a" : "#fff", letterSpacing: "-0.01em" }}
                    onClick={() => scrollTo("inicio")}>{d.nombre}</div>
                <div className="desktop-nav-m" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {[["inicio", "Inicio"], ["menu", "Carta"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                        <span key={id} className="nav-link-m"
                            style={{ color: scrolled && isLight ? "#555" : "rgba(255,255,255,0.65)" }}
                            onMouseOver={e => e.currentTarget.style.color = scrolled && isLight ? "#0a0a0a" : "#fff"}
                            onMouseOut={e => e.currentTarget.style.color = scrolled && isLight ? "#555" : "rgba(255,255,255,0.65)"}
                            onClick={() => scrollTo(id)}>{label}</span>
                    ))}
                    <button className="btn-dark" style={{ padding: "0.6rem 1.5rem", fontSize: "0.8rem" }}
                        onClick={() => scrollTo("reservas")}>Reservar</button>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: scrolled && isLight ? "#0a0a0a" : "#fff" }} className="mobile-btn-m" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menuIcon}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: "rgba(255,255,255,0.98)", borderBottom: "1px solid #e5e5e5", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[["inicio", "Inicio"], ["menu", "Carta"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                        <span key={id} className="nav-link-m" onClick={() => scrollTo(id)} style={{ fontSize: "1.1rem", color: "#555" }}>{label}</span>
                    ))}
                    <button className="btn-dark" style={{ padding: "0.8rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                </div>
            )}

            {/* ── HERO ── */}
            {(() => {
                const props = { d, accent, fontTitulo, scrollTo };
                if (d.hero_variant === "split") return <HeroSplit {...props} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...props} />;
                return <HeroCentered {...props} />;
            })()}

            {/* ── TICKER / STATS BAR ── */}
            <div style={{ background: "#0a0a0a", padding: "1.25rem 2rem", display: "flex", gap: "4rem", justifyContent: "center", flexWrap: "wrap" }}>
                {[
                    { n: d.anos_experiencia, l: "Años" },
                    { n: d.clientes_atendidos, l: "Comensales" },
                    { n: "100%", l: "Producto fresco" },
                    { n: d.horario?.split("|")[0]?.trim() || "19:00–00:00", l: "Horario" },
                ].map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                        <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.5rem", fontWeight: 400, color: "#fff" }}>{s.n}</span>
                        <span style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{s.l}</span>
                    </div>
                ))}
            </div>

            {/* ── MENÚ / CARTA ── */}
            <section id="menu" style={{ background: "#fff", padding: "7rem 4rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem", borderBottom: "1px solid #0a0a0a", paddingBottom: "2rem" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 400, color: "#0a0a0a", lineHeight: 0.9, letterSpacing: "-0.01em" }}>La carta</h2>
                            <p style={{ color: "#888", fontSize: "0.92rem", maxWidth: 320, lineHeight: 1.7 }}>Una selección que cambia según la temporada y los mejores ingredientes disponibles.</p>
                        </div>
                    </FadeIn>
                    {(() => {
                        const props = { d, fontTitulo };
                        if (d.servicios_variant === "list") return <MenuList {...props} />;
                        return <MenuGrid {...props} />;
                    })()}
                    <FadeIn delay={200}>
                        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid #e5e5e5" }}>
                            <button className="btn-dark-ghost" style={{ padding: "0.85rem 2.5rem" }} onClick={() => scrollTo("reservas")}>
                                Solicitar carta completa
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── NOSOTROS ── */}
            <section id="nosotros" style={{ background: "#f8f8f8", padding: "7rem 4rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="grid-2">
                    {(() => {
                        const props = { d, fontTitulo };
                        if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                        return <NosotrosImage {...props} />;
                    })()}
                    <FadeIn delay={150}>
                        <div>
                            <div style={{ fontSize: "0.68rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#aaa", marginBottom: "2rem", fontWeight: 500 }}>
                                Nuestra filosofía
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 400, color: "#0a0a0a", lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
                                Cocina sin concesiones
                            </h2>
                            <p style={{ color: "#666", lineHeight: 1.9, fontSize: "1rem", marginBottom: "2.5rem" }}>{d.descripcion}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {["Ingredientes de temporada y origen trazable", "Técnica contemporánea con raíces locales", "Servicio atento sin ser intrusivo", "Carta de vinos seleccionada con criterio"].map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "#555", fontSize: "0.9rem", paddingBottom: "1rem", borderBottom: i < 3 ? "1px solid #e5e5e5" : "none" }}>
                                        <div style={{ width: 6, height: 6, background: "#0a0a0a", borderRadius: "50%", minWidth: 6 }} />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: "#fff", padding: "7rem 4rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ borderBottom: "1px solid #0a0a0a", paddingBottom: "2rem", marginBottom: "0" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 400, color: "#0a0a0a", letterSpacing: "-0.01em", lineHeight: 0.9 }}>Experiencias</h2>
                        </div>
                    </FadeIn>
                    {(d.servicios || []).map((s, i) => (
                        <FadeIn key={i} delay={i * 60}>
                            <div className="service-card-m" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "3rem", alignItems: "center" }}>
                                <div style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#bbb", width: 60 }}>0{i + 1}</div>
                                <div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.6rem", fontWeight: 400, color: "#0a0a0a", marginBottom: "0.4rem" }}>{s.titulo}</h3>
                                    <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6 }}>{s.descripcion}</p>
                                </div>
                                <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc" }}>
                                    <span style={{ width: 22, height: 22 }}>{Icons[s.icon] || Icons.star}</span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── GALERÍA ── */}
            <section id="galeria" style={{ background: "#f8f8f8", padding: "7rem 4rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 400, color: "#0a0a0a", letterSpacing: "-0.01em", lineHeight: 0.9 }}>Galería</h2>
                            <p style={{ color: "#aaa", fontSize: "0.85rem" }}>Imágenes de nuestra cocina y salón</p>
                        </div>
                    </FadeIn>
                    <div className="galeria-grid-m" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" }}>
                        {(d.galeria || DEFAULT_DATA.galeria).map((src, i) => (
                            <FadeIn key={i} delay={i * 50}>
                                <div style={{ overflow: "hidden", aspectRatio: i === 0 ? "16/9" : "1/1", gridColumn: i === 0 ? "span 2" : "span 1" }}>
                                    <img src={src} alt={`Galería ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(15%)", transition: "transform 0.6s ease, filter 0.4s" }}
                                        onMouseOver={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.filter = "grayscale(0%)"; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "grayscale(15%)"; }}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section style={{ background: "#0a0a0a", padding: "7rem 4rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "2rem", marginBottom: "0" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 400, color: "#fff", letterSpacing: "-0.01em", lineHeight: 0.9 }}>Opiniones</h2>
                        </div>
                    </FadeIn>
                    {(d.testimonios || []).map((t, i) => (
                        <FadeIn key={i} delay={i * 80}>
                            <div style={{ padding: "2.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }} className="grid-2">
                                <div>
                                    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem", color: "#fff", opacity: 0.5 }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 14, height: 14 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", fontWeight: 400, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, fontStyle: "italic" }}>"{t.texto}"</p>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontWeight: 500, fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", marginBottom: "0.25rem" }}>{t.nombre}</div>
                                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem" }}>{t.cargo}</div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── RESERVAS ── */}
            <section id="reservas" style={{ background: "#fff", padding: "7rem 4rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ borderBottom: "1px solid #0a0a0a", paddingBottom: "2rem", marginBottom: "4rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                                <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 400, color: "#0a0a0a", letterSpacing: "-0.01em", lineHeight: 0.9 }}>Reserva</h2>
                                <p style={{ color: "#aaa", fontSize: "0.85rem" }}>Confirmamos en menos de 2 horas</p>
                            </div>
                        </div>
                    </FadeIn>
                    <div className="contact-grid-m" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start" }}>
                        <FadeIn>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Dirección", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ padding: "1.5rem 0", borderBottom: "1px solid #e5e5e5" }}>
                                        <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.5rem", fontWeight: 600 }}>{item.label}</div>
                                        <div style={{ fontSize: "0.92rem", color: "#0a0a0a" }}>{item.value}</div>
                                    </div>
                                ))}
                                <div style={{ paddingTop: "2rem" }}>
                                    <a href={`https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.06em", transition: "background 0.2s" }}
                                        onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                        onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                        <span style={{ width: 20, height: 20 }}>{Icons.whatsapp}</span>
                                        Reservar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <div style={{ border: "1.5px solid #e5e5e5", padding: "3rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.5rem", fontWeight: 400, color: "#0a0a0a", marginBottom: "2rem" }}>Formulario de reserva</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Nombre completo" />
                                    <input type="tel" placeholder="Teléfono" />
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                                        <select value={hora} onChange={e => setHora(e.target.value)}>
                                            <option value="">Hora</option>
                                            {["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"].map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <select value={personas} onChange={e => setPersonas(e.target.value)}>
                                        {["1", "2", "3", "4", "5", "6", "7", "8+"].map(n => (
                                            <option key={n} value={n}>{n} persona{n !== "1" ? "s" : ""}</option>
                                        ))}
                                    </select>
                                    <textarea placeholder="Ocasión especial, alergias u otras notas..." />
                                    <button className="btn-dark" style={{ padding: "1rem", fontSize: "0.9rem", width: "100%" }}>
                                        Confirmar Reserva
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#0a0a0a", padding: "3rem 4rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem" }}>
                        <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 400, color: "#fff", cursor: "pointer", letterSpacing: "-0.01em" }} onClick={() => scrollTo("inicio")}>{d.nombre}</span>
                        <div style={{ display: "flex", gap: "2.5rem" }}>
                            {[["inicio", "Inicio"], ["menu", "Carta"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                                <span key={id} style={{ cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(id)}
                                    onMouseOver={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                                    onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                                >{label}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: "rgba(255,255,255,0.1)", fontSize: "0.72rem" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: "#0a0a0a", color: "#fff",
                    padding: "0.9rem 1.75rem", border: "1.5px solid rgba(255,255,255,0.2)",
                    cursor: "pointer", fontFamily: `'${fontCuerpo}', sans-serif`,
                    fontWeight: 500, fontSize: "0.85rem", zIndex: 9999,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}