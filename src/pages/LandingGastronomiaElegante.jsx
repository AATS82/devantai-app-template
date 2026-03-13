import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: GASTRONOMÍA ELEGANTE
// Estilo: oscuro, serif, ambiente de restaurante fino
// Variantes: hero_variant, menu_variant, nosotros_variant
// Secciones: Menú destacado, Reservas, Galería
// ============================================================

const DEFAULT_DATA = {
    nombre: "La Tabla",
    slogan: "Una experiencia que va más allá del sabor",
    descripcion: "Cocina de autor con ingredientes de temporada, en un ambiente que celebra cada momento.",
    ciudad: "Santiago, Chile",
    telefono: "56912345678",
    email: "reservas@latabla.cl",
    horario: "Mar–Dom 13:00–16:00 | 20:00–00:00",
    anos_experiencia: "8+",
    clientes_atendidos: "20.000+",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    color_primario: "#b5843a",
    color_secundario: "#8a6228",
    font_titulo: "Cormorant Garamond",
    font_cuerpo: "Lato",
    industria: "gastronomia",
    servicios: [
        { titulo: "Carta de temporada", descripcion: "Ingredientes frescos seleccionados según la estación.", icon: "leaf" },
        { titulo: "Maridaje de vinos", descripcion: "Selección de vinos nacionales e importados para cada plato.", icon: "wine" },
        { titulo: "Chef's table", descripcion: "Mesa privada con menú degustación exclusivo.", icon: "star" },
        { titulo: "Eventos privados", descripcion: "Salones para celebraciones, cenas de empresa y más.", icon: "users" },
    ],
    menu_destacado: [
        { nombre: "Lomo de res al carbón", descripcion: "Con reducción de malbec y papas rústicas.", precio: "$18.900", categoria: "Carnes" },
        { nombre: "Ceviche de reineta", descripcion: "Con leche de tigre, canchita y maíz morado.", precio: "$12.500", categoria: "Entradas" },
        { nombre: "Risotto de hongos", descripcion: "Hongos silvestres, parmesano añejo y aceite de trufa.", precio: "$15.200", categoria: "Pastas" },
        { nombre: "Tarta tatin de manzana", descripcion: "Caramelizada, con helado de vainilla artesanal.", precio: "$7.800", categoria: "Postres" },
    ],
    galeria: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
    ],
    testimonios: [
        { nombre: "Valentina Rojas", cargo: "Cliente frecuente", texto: "Cada visita es una experiencia memorable. La atención y los sabores son impecables." },
        { nombre: "Sebastián Morales", cargo: "Celebración de aniversario", texto: "Reservamos el chef's table y fue perfecto. Los detalles hacen la diferencia." },
        { nombre: "Camila Fernández", cargo: "Cena de empresa", texto: "Organizaron nuestro evento con profesionalismo total. Todos quedaron encantados." },
    ],
};

const Icons = {
    leaf: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>),
    wine: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 15v7" /><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z" /></svg>),
    star: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    starFill: (<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    users: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
    calendar: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
    check: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
    menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>),
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
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        }}>{children}</div>
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

function HeroCentered({ d, gold, goldRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(10,8,6,0.6) 0%, rgba(10,8,6,0.85) 100%)` }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem", maxWidth: 780 }}>
                <div style={{ display: "inline-block", width: 40, height: 1, background: gold, marginBottom: "1.5rem" }} />
                <div style={{ display: "block", fontFamily: `'${fontTitulo}', serif`, fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", color: gold, marginBottom: "1.5rem", fontWeight: 400 }}>
                    {d.ciudad} · {d.anos_experiencia} años
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem, 8vw, 6.5rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.01em", marginBottom: "1.5rem", color: "#f5f0e8" }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(245,240,232,0.65)", maxWidth: 520, margin: "0 auto 3rem", lineHeight: 1.8, fontStyle: "italic" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-gold" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                    <button className="btn-ghost" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }} onClick={() => scrollTo("menu")}>Ver Carta</button>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #0a0806)" }} />
        </section>
    );
}

function HeroSplit({ d, gold, goldRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #0a0806)" }} />
            </div>
            <div style={{ background: "#0a0806", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 4rem 4rem 3rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                    <div style={{ width: 30, height: 1, background: gold }} />
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Restaurante</span>
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.8rem, 5vw, 5rem)", fontWeight: 700, lineHeight: 1.0, color: "#f5f0e8", marginBottom: "1.5rem" }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.05rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.8, marginBottom: "2.5rem", fontStyle: "italic", maxWidth: 400 }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-gold" style={{ padding: "0.95rem 2rem", fontSize: "0.9rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                    <button className="btn-ghost" style={{ padding: "0.95rem 2rem", fontSize: "0.9rem" }} onClick={() => scrollTo("menu")}>Ver Carta</button>
                </div>
            </div>
        </section>
    );
}

function HeroMinimal({ d, gold, goldRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", background: "#0a0806", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem", maxWidth: 900 }}>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.02em", color: "#f5f0e8", marginBottom: "2rem" }}>
                    {d.nombre}
                </h1>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginBottom: "2.5rem" }}>
                    <div style={{ height: 1, width: 60, background: `rgba(${goldRgb},0.4)` }} />
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1rem", color: gold, fontStyle: "italic", letterSpacing: "0.05em" }}>{d.slogan}</span>
                    <div style={{ height: 1, width: 60, background: `rgba(${goldRgb},0.4)` }} />
                </div>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-gold" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                    <button className="btn-ghost" style={{ padding: "1rem 2.5rem", fontSize: "0.9rem" }} onClick={() => scrollTo("menu")}>Ver Carta</button>
                </div>
            </div>
        </section>
    );
}

// ── MENÚ VARIANTS ──

function MenuGrid({ d, gold, goldRgb, fontTitulo }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }} className="grid-2">
            {(d.menu_destacado || []).map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                    <div className="menu-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <div>
                                <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: gold, fontWeight: 600, marginBottom: "0.4rem" }}>{item.categoria}</div>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.25rem", fontWeight: 600, color: "#f5f0e8", lineHeight: 1.2 }}>{item.nombre}</h3>
                            </div>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", color: gold, fontWeight: 700, whiteSpace: "nowrap", marginLeft: "1rem" }}>{item.precio}</div>
                        </div>
                        <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.88rem", lineHeight: 1.6, fontStyle: "italic" }}>{item.descripcion}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

function MenuList({ d, gold, goldRgb, fontTitulo }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {(d.menu_destacado || []).map((item, i) => (
                <FadeIn key={i} delay={i * 60}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "1.5rem 0", borderBottom: "1px solid rgba(245,240,232,0.08)", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.4rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", fontWeight: 600, color: "#f5f0e8" }}>{item.nombre}</h3>
                                <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: gold, border: `1px solid rgba(${goldRgb},0.4)`, padding: "0.15rem 0.5rem" }}>{item.categoria}</span>
                            </div>
                            <p style={{ color: "rgba(245,240,232,0.45)", fontSize: "0.88rem", fontStyle: "italic" }}>{item.descripcion}</p>
                        </div>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", color: gold, fontWeight: 700, whiteSpace: "nowrap" }}>{item.precio}</div>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d, gold, fontTitulo }) {
    return (
        <FadeIn>
            <div style={{ position: "relative", borderRadius: "2px", overflow: "hidden", aspectRatio: "4/3" }}>
                <img src={d.imagen_nosotros || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"} alt="Nuestro restaurante" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: "linear-gradient(to top, rgba(10,8,6,0.9), transparent)" }}>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        {[{ n: d.anos_experiencia, l: "Años" }, { n: d.clientes_atendidos, l: "Comensales" }].map((s, i) => (
                            <div key={i} style={{ color: "#f5f0e8" }}>
                                <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.8rem", fontWeight: 700, color: gold, lineHeight: 1 }}>{s.n}</div>
                                <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

function NosotrosStats({ d, gold, goldRgb, fontTitulo }) {
    return (
        <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: `rgba(${goldRgb},0.2)` }}>
                {[
                    { n: d.anos_experiencia, l: "Años de cocina" },
                    { n: d.clientes_atendidos, l: "Comensales felices" },
                    { n: "100%", l: "Ingredientes frescos" },
                    { n: "4.9★", l: "Valoración promedio" },
                ].map((s, i) => (
                    <div key={i} style={{ padding: "2rem", background: "#0a0806", textAlign: "center" }}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.8rem", fontWeight: 700, color: gold, lineHeight: 1, marginBottom: "0.5rem" }}>{s.n}</div>
                        <div style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingGastronomiaElegante({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [personas, setPersonas] = useState("2");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    const gold = d.color_primario || "#b5843a";
    const goldDark = d.color_secundario || "#8a6228";
    const goldRgb = hexToRgb(gold);
    const fontTitulo = d.font_titulo || "Cormorant Garamond";
    const fontCuerpo = d.font_cuerpo || "Lato";
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, "+")}:ital,wght@0,400;0,600;0,700;1,400;1,600&family=${fontCuerpo.replace(/ /g, "+")}:wght@300;400;500;700&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const iniciales = (d.nombre || "LT").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: "#0a0806", color: "#f5f0e8", overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                :root {
                    --gold: ${gold};
                    --gold-dark: ${goldDark};
                    --gold-rgb: ${goldRgb};
                    --bg: #0a0806;
                    --bg2: #100e0a;
                    --bg3: #161310;
                    --border: rgba(245,240,232,0.08);
                    --text: #f5f0e8;
                    --muted: rgba(245,240,232,0.5);
                }
                .nav-link-g { cursor: pointer; color: rgba(245,240,232,0.6); font-size: 0.88rem; letter-spacing: 0.08em; transition: color 0.2s; font-weight: 400; }
                .nav-link-g:hover { color: var(--gold); }
                .btn-gold { background: var(--gold); color: #0a0806; border: none; cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.82rem; transition: all 0.2s; }
                .btn-gold:hover { background: var(--gold-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(${goldRgb},0.3); }
                .btn-ghost { background: transparent; color: var(--text); border: 1px solid rgba(245,240,232,0.3); cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.82rem; transition: all 0.2s; }
                .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
                .menu-card { background: var(--bg3); border: 1px solid var(--border); padding: 1.75rem; transition: all 0.3s; border-left: 2px solid var(--gold); }
                .menu-card:hover { border-color: rgba(${goldRgb},0.4); background: var(--bg2); }
                .service-card-g { background: var(--bg3); border: 1px solid var(--border); padding: 2rem; transition: all 0.3s; text-align: center; }
                .service-card-g:hover { border-color: rgba(${goldRgb},0.3); transform: translateY(-4px); }
                .testim-card-g { background: var(--bg3); border: 1px solid var(--border); padding: 2rem; }
                a { text-decoration: none; color: inherit; }
                input, select, textarea { background: var(--bg2); border: 1px solid var(--border); color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.9rem; padding: 0.85rem 1rem; width: 100%; outline: none; transition: border-color 0.2s; }
                input:focus, select:focus, textarea:focus { border-color: var(--gold); }
                select option { background: #161310; }
                textarea { resize: vertical; min-height: 100px; }
                @media (max-width: 768px) {
                    .desktop-nav-g { display: none !important; }
                    .mobile-btn-g { display: flex !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .grid-4 { grid-template-columns: 1fr 1fr !important; }
                    .hero-split-g { grid-template-columns: 1fr !important; }
                    .hero-split-g > div:first-child { min-height: 50vh; }
                    .contact-grid-g { grid-template-columns: 1fr !important; }
                    .galeria-grid { grid-template-columns: 1fr 1fr !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1.25rem 2.5rem",
                background: scrolled ? "rgba(10,8,6,0.97)" : "transparent",
                borderBottom: scrolled ? `1px solid ${gold}22` : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.4s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 36, height: 36, border: `1px solid ${gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, fontSize: "0.9rem", color: gold }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.05em", color: "#f5f0e8" }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav-g" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
                    {[["inicio", "Inicio"], ["menu", "Carta"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                        <span key={id} className="nav-link-g" onClick={() => scrollTo(id)}>{label}</span>
                    ))}
                    <button className="btn-gold" style={{ padding: "0.6rem 1.5rem", fontSize: "0.78rem" }} onClick={() => scrollTo("reservas")}>Reservar</button>
                </div>
                <button style={{ background: "none", border: "none", color: "#f5f0e8", cursor: "pointer", display: "none" }} className="mobile-btn-g" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: "rgba(10,8,6,0.98)", borderBottom: `1px solid ${gold}22`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {[["inicio", "Inicio"], ["menu", "Carta"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                        <span key={id} className="nav-link-g" onClick={() => scrollTo(id)} style={{ fontSize: "1.1rem" }}>{label}</span>
                    ))}
                    <button className="btn-gold" style={{ padding: "0.8rem", fontSize: "0.85rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                </div>
            )}

            {/* ── HERO — elige variante ── */}
            {(() => {
                const props = { d, gold, goldRgb, fontTitulo, scrollTo };
                if (d.hero_variant === "split") return <HeroSplit {...props} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...props} />;
                return <HeroCentered {...props} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: "#100e0a", borderTop: `1px solid rgba(${goldRgb},0.15)`, borderBottom: `1px solid rgba(${goldRgb},0.15)`, padding: "2rem" }}>
                <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto", textAlign: "center", gap: "1rem" }}>
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Comensales" },
                        { n: "100%", l: "Ingredientes frescos" },
                        { n: d.horario?.split("|")[0]?.trim() || "13:00–00:00", l: "Horario" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.8rem", fontWeight: 700, color: gold, letterSpacing: "-0.01em" }}>{s.n}</div>
                            <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MENÚ DESTACADO — elige variante ── */}
            <section id="menu" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                                <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Nuestra carta</span>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#f5f0e8" }}>Platos destacados</h2>
                        </div>
                    </FadeIn>
                    {(() => {
                        const props = { d, gold, goldRgb, fontTitulo };
                        if (d.servicios_variant === "list") return <MenuList {...props} />;
                        return <MenuGrid {...props} />;
                    })()}
                    <FadeIn delay={200}>
                        <div style={{ textAlign: "center", marginTop: "3rem" }}>
                            <button className="btn-ghost" style={{ padding: "0.9rem 2.5rem", fontSize: "0.82rem" }} onClick={() => scrollTo("reservas")}>
                                Ver carta completa al reservar
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── NOSOTROS — elige variante ── */}
            <section id="nosotros" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    {(() => {
                        const props = { d, gold, goldRgb, fontTitulo };
                        if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                        return <NosotrosImage {...props} />;
                    })()}
                    <FadeIn delay={150}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{ width: 30, height: 1, background: gold }} />
                            <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Nuestra historia</span>
                        </div>
                        <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                            Cocina con alma, servicio con pasión
                        </h2>
                        <p style={{ color: "rgba(245,240,232,0.6)", lineHeight: 1.9, marginBottom: "2rem", fontStyle: "italic", fontSize: "1.05rem" }}>{d.descripcion}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {["Ingredientes de productores locales", "Carta que cambia con las estaciones", "Chef con formación internacional", "Maridaje cuidadosamente seleccionado"].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(245,240,232,0.7)", fontSize: "0.92rem" }}>
                                    <span style={{ width: 16, height: 16, color: gold, minWidth: 16 }}>{Icons.check}</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                                <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Experiencias</span>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#f5f0e8" }}>Lo que ofrecemos</h2>
                        </div>
                    </FadeIn>
                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }}>
                        {(d.servicios || []).map((s, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className="service-card-g">
                                    <div style={{ width: 48, height: 48, border: `1px solid rgba(${goldRgb},0.4)`, display: "flex", alignItems: "center", justifyContent: "center", color: gold, margin: "0 auto 1.25rem" }}>
                                        <span style={{ width: 22, height: 22 }}>{Icons[s.icon] || Icons.leaf}</span>
                                    </div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.3rem", fontWeight: 600, color: "#f5f0e8", marginBottom: "0.6rem" }}>{s.titulo}</h3>
                                    <p style={{ color: "rgba(245,240,232,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.descripcion}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALERÍA ── */}
            <section id="galeria" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                                <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Galería</span>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#f5f0e8" }}>Una mirada a nuestra cocina</h2>
                        </div>
                    </FadeIn>
                    <div className="galeria-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" }}>
                        {(d.galeria || DEFAULT_DATA.galeria).map((src, i) => (
                            <FadeIn key={i} delay={i * 60}>
                                <div style={{ overflow: "hidden", aspectRatio: i === 0 ? "16/9" : "1/1", gridColumn: i === 0 ? "span 2" : "span 1" }}>
                                    <img src={src} alt={`Galería ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", filter: "brightness(0.85)" }}
                                        onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.filter = "brightness(1)"; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.85)"; }}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section id="testimonios" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                                <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Opiniones</span>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#f5f0e8" }}>Lo que dicen nuestros comensales</h2>
                        </div>
                    </FadeIn>
                    <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
                        {(d.testimonios || []).map((t, i) => (
                            <FadeIn key={i} delay={i * 100}>
                                <div className="testim-card-g">
                                    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem", color: gold }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 14, height: 14 }}>{Icons.starFill}</span>)}
                                    </div>
                                    <p style={{ color: "rgba(245,240,232,0.6)", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.92rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                                        <div style={{ width: 36, height: 36, border: `1px solid rgba(${goldRgb},0.4)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, color: gold }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#f5f0e8" }}>{t.nombre}</div>
                                            <div style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.78rem" }}>{t.cargo}</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RESERVAS ── */}
            <section id="reservas" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                                <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>Reservas</span>
                                <div style={{ width: 40, height: 1, background: `rgba(${goldRgb},0.4)` }} />
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, color: "#f5f0e8" }}>Reserva tu mesa</h2>
                            <p style={{ color: "rgba(245,240,232,0.5)", marginTop: "1rem", fontStyle: "italic" }}>Confirmamos tu reserva en menos de 2 horas</p>
                        </div>
                    </FadeIn>
                    <div className="contact-grid-g" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>
                        <FadeIn>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Dirección", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", background: "var(--bg)", border: "1px solid var(--border)" }}>
                                        <div style={{ width: 40, height: 40, minWidth: 40, border: `1px solid rgba(${goldRgb},0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: gold }}>
                                            <span style={{ width: 18, height: 18 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(245,240,232,0.35)", marginBottom: "0.25rem" }}>{item.label}</div>
                                            <div style={{ fontWeight: 400, fontSize: "0.9rem", color: "rgba(245,240,232,0.8)" }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={`https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 20, height: 20 }}>{Icons.whatsapp}</span>
                                    Reservar por WhatsApp
                                </a>
                            </div>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <div style={{ background: "var(--bg)", border: `1px solid rgba(${goldRgb},0.2)`, padding: "2.5rem" }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.5rem", fontWeight: 600, color: "#f5f0e8", marginBottom: "1.75rem" }}>Formulario de reserva</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Nombre completo" />
                                    <input type="tel" placeholder="Teléfono de contacto" />
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ colorScheme: "dark" }} />
                                        <select value={hora} onChange={e => setHora(e.target.value)}>
                                            <option value="">Hora</option>
                                            {["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"].map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <select value={personas} onChange={e => setPersonas(e.target.value)}>
                                        {["1", "2", "3", "4", "5", "6", "7", "8+"].map(n => (
                                            <option key={n} value={n}>{n} persona{n !== "1" ? "s" : ""}</option>
                                        ))}
                                    </select>
                                    <textarea placeholder="Alguna solicitud especial (alergias, ocasión especial, etc.)" />
                                    <button className="btn-gold" style={{ padding: "1rem", fontSize: "0.88rem", width: "100%", letterSpacing: "0.15em" }}>
                                        Confirmar Reserva
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#060504", borderTop: `1px solid rgba(${goldRgb},0.12)`, padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: `1px solid rgba(${goldRgb},0.1)`, marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 34, height: 34, border: `1px solid ${gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, color: gold, fontSize: "0.85rem" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 600, fontSize: "1rem", color: "#f5f0e8" }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2.5rem" }}>
                            {[["inicio", "Inicio"], ["menu", "Carta"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                                <span key={id} style={{ cursor: "pointer", color: "rgba(245,240,232,0.4)", fontSize: "0.82rem", transition: "color 0.2s", letterSpacing: "0.05em" }}
                                    onClick={() => scrollTo(id)}
                                    onMouseOver={e => e.currentTarget.style.color = gold}
                                    onMouseOut={e => e.currentTarget.style.color = "rgba(245,240,232,0.4)"}
                                >{label}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: "rgba(245,240,232,0.25)", fontSize: "0.8rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: "rgba(245,240,232,0.1)", fontSize: "0.72rem" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: gold, color: "#0a0806",
                    padding: "0.9rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontCuerpo}', sans-serif`, fontWeight: 700,
                    fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    zIndex: 9999, boxShadow: `0 4px 20px rgba(${goldRgb},0.35)`,
                }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}