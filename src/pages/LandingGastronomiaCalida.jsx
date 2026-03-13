import { useState, useEffect, useRef } from "react";

// ============================================================
// DEVANTAI — LANDING TEMPLATE: GASTRONOMÍA CÁLIDA
// Estilo: fondo crema, colores tierra, acogedor y familiar
// Variantes: hero_variant, servicios_variant, nosotros_variant
// Secciones: Menú destacado, Reservas, Galería
// ============================================================

const DEFAULT_DATA = {
    nombre: "Casa Macarena",
    slogan: "Cocina de casa, sabores de siempre",
    descripcion: "Más de una década cocinando con amor para familias y amigos. Ingredientes locales, recetas de abuela y el calor de un hogar de verdad.",
    ciudad: "Santiago, Chile",
    telefono: "56987654321",
    email: "hola@casamacarena.cl",
    horario: "Lun–Vie 12:00–16:00 | Sáb–Dom 12:00–22:00",
    anos_experiencia: "12+",
    clientes_atendidos: "30.000+",
    hero_variant: "centered",
    servicios_variant: "grid",
    nosotros_variant: "image",
    color_primario: "#c4622d",
    color_secundario: "#a04d22",
    font_titulo: "Playfair Display",
    font_cuerpo: "Source Sans Pro",
    industria: "gastronomia",
    servicios: [
        { titulo: "Menú del día", descripcion: "Almuerzo completo con entrada, plato de fondo y postre casero.", icon: "utensils" },
        { titulo: "Cocina de mercado", descripcion: "Usamos los mejores productos de temporada que llegan cada mañana.", icon: "leaf" },
        { titulo: "Celebraciones", descripcion: "Cumpleaños, aniversarios y reuniones familiares en ambiente íntimo.", icon: "heart" },
        { titulo: "Delivery local", descripcion: "Llevamos nuestros platos caseros directamente a tu puerta.", icon: "truck" },
    ],
    menu_destacado: [
        { nombre: "Pastel de choclo", descripcion: "Receta tradicional con pino de carne y huevo duro.", precio: "$9.800", categoria: "Tradicional" },
        { nombre: "Cazuela de vacuno", descripcion: "Con papas, choclo, zapallo y mucho cariño.", precio: "$8.500", categoria: "Sopas" },
        { nombre: "Pollo arvejado", descripcion: "Muslos de pollo en salsa de arvejas y zanahoria.", precio: "$8.900", categoria: "Carnes" },
        { nombre: "Leche nevada", descripcion: "Postre clásico chileno con merengue y canela.", precio: "$3.200", categoria: "Postres" },
    ],
    galeria: [
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
        "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    ],
    testimonios: [
        { nombre: "Patricia González", cargo: "Cliente de siempre", texto: "Vengo hace 8 años y sigue siendo como comer en casa de mi mamá. La cazuela es única." },
        { nombre: "Rodrigo Valdés", cargo: "Almuerzo de trabajo", texto: "El mejor menú del día del sector. El trato es cálido y la comida siempre deliciosa." },
        { nombre: "Ana Muñoz", cargo: "Celebración familiar", texto: "Celebramos el cumpleaños de mi abuela aquí y fue perfecto. Se sintió como en familia." },
    ],
};

const Icons = {
    utensils: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg>),
    leaf: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>),
    heart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>),
    truck: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
    star: (<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
    phone: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>),
    map: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
    clock: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
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
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        }}>{children}</div>
    );
}

function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return `${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)}`;
}

// ── HERO VARIANTS ──

function HeroCentered({ d, terracota, terracotaRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.45)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(60,35,15,0.5) 0%, rgba(60,35,15,0.82) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem", maxWidth: 760 }}>
                <div style={{ display: "inline-block", background: terracota, padding: "0.35rem 1.2rem", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff", fontWeight: 700, marginBottom: "1.75rem" }}>
                    {d.ciudad} · Desde hace {d.anos_experiencia} años
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 700, lineHeight: 1.05, color: "#fdf8f2", marginBottom: "1.25rem" }}>{d.nombre}</h1>
                <p style={{ fontSize: "clamp(1rem,2vw,1.25rem)", color: "rgba(253,248,242,0.75)", maxWidth: 500, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-terra" style={{ padding: "1rem 2.5rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                    <button className="btn-cream-ghost" style={{ padding: "1rem 2.5rem" }} onClick={() => scrollTo("menu")}>Ver el Menú</button>
                </div>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, #fdf8f2)" }} />
        </section>
    );
}

function HeroSplit({ d, terracota, terracotaRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1.2fr 1fr", overflow: "hidden" }} className="hero-split-c">
            <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
            <div style={{ background: "#fdf8f2", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8rem 3.5rem 4rem" }}>
                <div style={{ display: "inline-block", background: terracota, padding: "0.3rem 1rem", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#fff", fontWeight: 700, marginBottom: "2rem", alignSelf: "flex-start" }}>
                    Restaurante familiar
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 700, lineHeight: 1.05, color: "#2d1a0a", marginBottom: "1.25rem" }}>{d.nombre}</h1>
                <p style={{ fontSize: "1.05rem", color: "#8a6040", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 360 }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <button className="btn-terra" style={{ padding: "0.9rem 2rem" }} onClick={() => scrollTo("reservas")}>Reservar</button>
                    <button className="btn-terra-ghost" style={{ padding: "0.9rem 2rem" }} onClick={() => scrollTo("menu")}>Ver Menú</button>
                </div>
            </div>
        </section>
    );
}

function HeroMinimal({ d, terracota, terracotaRgb, fontTitulo, scrollTo }) {
    return (
        <section id="inicio" style={{ minHeight: "100vh", background: "#fdf8f2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative", textAlign: "center", padding: "6rem 2rem 4rem" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${d.imagen_hero || "https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <div style={{ height: 2, width: 32, background: terracota, borderRadius: 2 }} />
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "0.85rem", color: terracota, fontStyle: "italic", letterSpacing: "0.05em" }}>Cocina casera desde {new Date().getFullYear() - parseInt(d.anos_experiencia) || "hace años"}</span>
                    <div style={{ height: 2, width: 32, background: terracota, borderRadius: 2 }} />
                </div>
                <h1 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(3.5rem,10vw,7.5rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.02em", color: "#2d1a0a", marginBottom: "1.75rem" }}>
                    {d.nombre}
                </h1>
                <p style={{ fontSize: "1.15rem", color: "#8a6040", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 520, margin: "0 auto 3rem" }}>{d.slogan}</p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button className="btn-terra" style={{ padding: "1rem 2.5rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                    <button className="btn-terra-ghost" style={{ padding: "1rem 2.5rem" }} onClick={() => scrollTo("menu")}>Ver el Menú</button>
                </div>
            </div>
        </section>
    );
}

// ── MENÚ VARIANTS ──

function MenuGrid({ d, terracota, terracotaRgb, fontTitulo }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }} className="grid-2">
            {(d.menu_destacado || []).map((item, i) => (
                <FadeIn key={i} delay={i * 80}>
                    <div className="menu-card-c">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                            <div>
                                <span style={{ display: "inline-block", background: `rgba(${terracotaRgb},0.12)`, color: terracota, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.2rem 0.6rem", fontWeight: 700, marginBottom: "0.5rem" }}>{item.categoria}</span>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", fontWeight: 700, color: "#2d1a0a" }}>{item.nombre}</h3>
                            </div>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", color: terracota, fontWeight: 700, whiteSpace: "nowrap", marginLeft: "1rem" }}>{item.precio}</div>
                        </div>
                        <p style={{ color: "#8a6040", fontSize: "0.88rem", lineHeight: 1.6 }}>{item.descripcion}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    );
}

function MenuFeatured({ d, terracota, terracotaRgb, fontTitulo }) {
    const [main, ...rest] = d.menu_destacado || [];
    return (
        <div>
            {main && (
                <FadeIn>
                    <div style={{ background: terracota, padding: "2.5rem", marginBottom: "1.25rem", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem" }} className="grid-feat">
                        <div>
                            <span style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.2rem 0.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>Plato estrella</span>
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{main.nombre}</h3>
                            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.92rem", lineHeight: 1.6 }}>{main.descripcion}</p>
                        </div>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2rem", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{main.precio}</div>
                    </div>
                </FadeIn>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }} className="grid-3">
                {rest.map((item, i) => (
                    <FadeIn key={i} delay={i * 80}>
                        <div className="menu-card-c">
                            <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.05rem", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.4rem" }}>{item.nombre}</h3>
                            <p style={{ color: "#8a6040", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>{item.descripcion}</p>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1rem", color: terracota, fontWeight: 700 }}>{item.precio}</div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}

// ── NOSOTROS VARIANTS ──

function NosotrosImage({ d, terracota, terracotaRgb, fontTitulo }) {
    return (
        <FadeIn>
            <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
                <img src={d.imagen_nosotros || "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80"} alt="Nuestro restaurante" style={{ width: "100%", display: "block", borderRadius: "12px" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(45,26,10,0.85), transparent)", padding: "2rem 1.5rem 1.5rem", borderRadius: "0 0 12px 12px" }}>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        {[{ n: d.anos_experiencia, l: "años" }, { n: d.clientes_atendidos, l: "comensales" }].map((s, i) => (
                            <div key={i} style={{ color: "#fff" }}>
                                <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2rem", fontWeight: 700, color: "#ffd4b0", lineHeight: 1 }}>{s.n}</div>
                                <div style={{ fontSize: "0.78rem", opacity: 0.8 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

function NosotrosStats({ d, terracota, terracotaRgb, fontTitulo }) {
    return (
        <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {[
                    { n: d.anos_experiencia, l: "Años cocinando", color: terracota },
                    { n: d.clientes_atendidos, l: "Comensales felices", color: "#8b5a2b" },
                    { n: "100%", l: "Ingredientes frescos", color: "#6b8f3e" },
                    { n: "4.8★", l: "Valoración Google", color: "#c4862d" },
                ].map((s, i) => (
                    <div key={i} style={{ background: "#fff", border: `2px solid ${i === 0 ? s.color : "transparent"}`, borderRadius: "12px", padding: "1.75rem", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                        <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "2.5rem", fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: "0.4rem" }}>{s.n}</div>
                        <div style={{ fontSize: "0.82rem", color: "#8a6040", fontWeight: 500 }}>{s.l}</div>
                    </div>
                ))}
            </div>
        </FadeIn>
    );
}

// ── COMPONENTE PRINCIPAL ──

export default function LandingGastronomiaCalida({ data, onEnter }) {
    const d = data || DEFAULT_DATA;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [personas, setPersonas] = useState("2");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    const terracota = d.color_primario || "#c4622d";
    const terracotaDark = d.color_secundario || "#a04d22";
    const terracotaRgb = hexToRgb(terracota);
    const fontTitulo = d.font_titulo || "Playfair Display";
    const fontCuerpo = d.font_cuerpo || "Source Sans Pro";
    const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${fontTitulo.replace(/ /g, "+")}:ital,wght@0,400;0,600;0,700;1,400&family=${fontCuerpo.replace(/ /g, "+")}:wght@300;400;600;700&display=swap`;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
    const iniciales = (d.nombre || "CM").split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

    return (
        <div style={{ fontFamily: `'${fontCuerpo}', sans-serif`, background: "#fdf8f2", color: "#2d1a0a", overflowX: "hidden" }}>
            <style>{`
                @import url('${googleFontsUrl}');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                :root {
                    --terra: ${terracota};
                    --terra-dark: ${terracotaDark};
                    --terra-rgb: ${terracotaRgb};
                    --bg: #fdf8f2;
                    --bg2: #f5ede0;
                    --bg3: #efe3d0;
                    --text: #2d1a0a;
                    --muted: #8a6040;
                    --border: rgba(139,90,60,0.15);
                }
                .btn-terra { background: var(--terra); color: #fff; border: none; cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 700; letter-spacing: 0.06em; font-size: 0.88rem; transition: all 0.2s; border-radius: 6px; }
                .btn-terra:hover { background: var(--terra-dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(${terracotaRgb},0.35); }
                .btn-terra-ghost { background: transparent; color: var(--terra); border: 2px solid var(--terra); cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 700; letter-spacing: 0.06em; font-size: 0.88rem; transition: all 0.2s; border-radius: 6px; }
                .btn-terra-ghost:hover { background: var(--terra); color: #fff; }
                .btn-cream-ghost { background: transparent; color: #fdf8f2; border: 2px solid rgba(253,248,242,0.5); cursor: pointer; font-family: '${fontCuerpo}', sans-serif; font-weight: 700; letter-spacing: 0.06em; font-size: 0.88rem; transition: all 0.2s; border-radius: 6px; }
                .btn-cream-ghost:hover { border-color: #fdf8f2; background: rgba(253,248,242,0.1); }
                .menu-card-c { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: all 0.3s; border: 1px solid var(--border); }
                .menu-card-c:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.1); transform: translateY(-3px); }
                .service-card-c { background: #fff; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.06); transition: all 0.3s; border: 1px solid var(--border); }
                .service-card-c:hover { box-shadow: 0 8px 28px rgba(${terracotaRgb},0.15); transform: translateY(-4px); }
                .nav-link-c { cursor: pointer; color: #8a6040; font-size: 0.88rem; font-weight: 500; transition: color 0.2s; }
                .nav-link-c:hover { color: var(--terra); }
                a { text-decoration: none; color: inherit; }
                input, select, textarea { background: #fff; border: 2px solid var(--border); border-radius: 8px; color: var(--text); font-family: '${fontCuerpo}', sans-serif; font-size: 0.9rem; padding: 0.85rem 1rem; width: 100%; outline: none; transition: border-color 0.2s; }
                input:focus, select:focus, textarea:focus { border-color: var(--terra); }
                textarea { resize: vertical; min-height: 100px; }
                @media (max-width: 768px) {
                    .desktop-nav-c { display: none !important; }
                    .mobile-btn-c { display: flex !important; }
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .grid-3 { grid-template-columns: 1fr !important; }
                    .hero-split-c { grid-template-columns: 1fr !important; }
                    .hero-split-c > div:first-child { min-height: 50vh; }
                    .contact-grid-c { grid-template-columns: 1fr !important; }
                    .galeria-grid-c { grid-template-columns: 1fr 1fr !important; }
                    .grid-feat { grid-template-columns: 1fr !important; }
                }
            `}</style>

            {/* ── NAVBAR ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                padding: "1rem 2.5rem",
                background: scrolled ? "rgba(253,248,242,0.97)" : "transparent",
                borderBottom: scrolled ? "1px solid rgba(139,90,60,0.12)" : "none",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                transition: "all 0.4s",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollTo("inicio")}>
                    <div style={{ width: 38, height: 38, background: terracota, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{iniciales}</div>
                    <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, fontSize: "1.1rem", color: scrolled ? "#2d1a0a" : "#fdf8f2" }}>{d.nombre}</span>
                </div>
                <div className="desktop-nav-c" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                    {[["inicio", "Inicio"], ["menu", "Menú"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                        <span key={id} className="nav-link-c" style={{ color: scrolled ? "#8a6040" : "rgba(253,248,242,0.85)" }} onClick={() => scrollTo(id)}>{label}</span>
                    ))}
                    <button className="btn-terra" style={{ padding: "0.6rem 1.4rem", fontSize: "0.82rem" }} onClick={() => scrollTo("reservas")}>Reservar</button>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: scrolled ? "#2d1a0a" : "#fdf8f2" }} className="mobile-btn-c" onClick={() => setMenuOpen(!menuOpen)}>
                    <span style={{ width: 24, height: 24, display: "block" }}>{menuOpen ? Icons.x : Icons.menu}</span>
                </button>
            </nav>

            {menuOpen && (
                <div style={{ position: "fixed", top: 65, left: 0, right: 0, zIndex: 999, background: "rgba(253,248,242,0.98)", borderBottom: "1px solid rgba(139,90,60,0.12)", padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
                    {[["inicio", "Inicio"], ["menu", "Menú"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                        <span key={id} className="nav-link-c" onClick={() => scrollTo(id)} style={{ fontSize: "1.1rem" }}>{label}</span>
                    ))}
                    <button className="btn-terra" style={{ padding: "0.8rem" }} onClick={() => scrollTo("reservas")}>Reservar Mesa</button>
                </div>
            )}

            {/* ── HERO ── */}
            {(() => {
                const props = { d, terracota, terracotaRgb, fontTitulo, scrollTo };
                if (d.hero_variant === "split") return <HeroSplit {...props} />;
                if (d.hero_variant === "minimal") return <HeroMinimal {...props} />;
                return <HeroCentered {...props} />;
            })()}

            {/* ── STATS BAR ── */}
            <section style={{ background: terracota, padding: "1.75rem 2rem" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", textAlign: "center" }} className="grid-4">
                    {[
                        { n: d.anos_experiencia, l: "Años de experiencia" },
                        { n: d.clientes_atendidos, l: "Comensales" },
                        { n: "100%", l: "Cocina casera" },
                        { n: "★ 4.8", l: "Valoración clientes" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.7rem", fontWeight: 700, color: "#fff" }}>{s.n}</div>
                            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── MENÚ DESTACADO ── */}
            <section id="menu" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.75rem" }}>Nuestros platos</h2>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                                <div style={{ height: 2, width: 40, background: terracota, borderRadius: 2 }} />
                                <p style={{ color: "#8a6040", fontSize: "1.05rem", fontStyle: "italic" }}>Recetas caseras con el sabor de siempre</p>
                                <div style={{ height: 2, width: 40, background: terracota, borderRadius: 2 }} />
                            </div>
                        </div>
                    </FadeIn>
                    {(() => {
                        const props = { d, terracota, terracotaRgb, fontTitulo };
                        if (d.servicios_variant === "featured") return <MenuFeatured {...props} />;
                        return <MenuGrid {...props} />;
                    })()}
                    <FadeIn delay={200}>
                        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                            <button className="btn-terra-ghost" style={{ padding: "0.9rem 2.5rem" }} onClick={() => scrollTo("reservas")}>
                                Consultar menú completo
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── NOSOTROS ── */}
            <section id="nosotros" style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2">
                    {(() => {
                        const props = { d, terracota, terracotaRgb, fontTitulo };
                        if (d.nosotros_variant === "stats") return <NosotrosStats {...props} />;
                        return <NosotrosImage {...props} />;
                    })()}
                    <FadeIn delay={150}>
                        <div>
                            <div style={{ display: "inline-block", background: `rgba(${terracotaRgb},0.1)`, color: terracota, padding: "0.35rem 1rem", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1.5rem", borderRadius: 4 }}>
                                Nuestra historia
                            </div>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#2d1a0a", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                                Cocinando con amor desde el primer día
                            </h2>
                            <p style={{ color: "#8a6040", lineHeight: 1.9, fontSize: "1rem", marginBottom: "2rem" }}>{d.descripcion}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {["Recetas tradicionales transmitidas por generaciones", "Ingredientes frescos del mercado cada mañana", "Un ambiente acogedor para toda la familia", "Sabores auténticos sin artificios"].map((item, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#6b4426", fontSize: "0.92rem" }}>
                                        <div style={{ width: 22, height: 22, minWidth: 22, background: `rgba(${terracotaRgb},0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: terracota }}>
                                            <span style={{ width: 12, height: 12 }}>{Icons.check}</span>
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SERVICIOS ── */}
            <section id="servicios" style={{ background: "var(--bg2)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.75rem" }}>Lo que ofrecemos</h2>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                                <div style={{ height: 2, width: 40, background: terracota, borderRadius: 2 }} />
                                <p style={{ color: "#8a6040", fontSize: "1rem", fontStyle: "italic" }}>Más que un restaurante, una experiencia</p>
                                <div style={{ height: 2, width: 40, background: terracota, borderRadius: 2 }} />
                            </div>
                        </div>
                    </FadeIn>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.5rem" }} className="grid-2">
                        {(d.servicios || []).map((s, i) => (
                            <FadeIn key={i} delay={i * 80}>
                                <div className="service-card-c">
                                    <div style={{ width: 52, height: 52, background: `rgba(${terracotaRgb},0.12)`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: terracota, margin: "0 auto 1.25rem" }}>
                                        <span style={{ width: 24, height: 24 }}>{Icons[s.icon] || Icons.utensils}</span>
                                    </div>
                                    <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.2rem", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.6rem" }}>{s.titulo}</h3>
                                    <p style={{ color: "#8a6040", fontSize: "0.9rem", lineHeight: 1.7 }}>{s.descripcion}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALERÍA ── */}
            <section id="galeria" style={{ background: "var(--bg3)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.5rem" }}>Galería</h2>
                            <p style={{ color: "#8a6040", fontStyle: "italic" }}>Momentos en nuestra cocina y salón</p>
                        </div>
                    </FadeIn>
                    <div className="galeria-grid-c" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
                        {(d.galeria || DEFAULT_DATA.galeria).map((src, i) => (
                            <FadeIn key={i} delay={i * 60}>
                                <div style={{ overflow: "hidden", borderRadius: "12px", aspectRatio: i === 0 ? "16/9" : "1/1", gridColumn: i === 0 ? "span 2" : "span 1", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
                                    <img src={src} alt={`Galería ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                                        onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
                                        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIOS ── */}
            <section style={{ background: "var(--bg)", padding: "6rem 2rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <FadeIn>
                        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.5rem" }}>Lo que dicen nuestros clientes</h2>
                            <p style={{ color: "#8a6040", fontStyle: "italic" }}>La mejor receta es la satisfacción de quien prueba</p>
                        </div>
                    </FadeIn>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }} className="grid-3">
                        {(d.testimonios || []).map((t, i) => (
                            <FadeIn key={i} delay={i * 100}>
                                <div style={{ background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: `1px solid rgba(${terracotaRgb},0.1)` }}>
                                    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem", color: terracota }}>
                                        {[...Array(5)].map((_, j) => <span key={j} style={{ width: 16, height: 16 }}>{Icons.star}</span>)}
                                    </div>
                                    <p style={{ color: "#6b4426", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "0.92rem", fontStyle: "italic" }}>"{t.texto}"</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1rem", borderTop: `1px solid rgba(${terracotaRgb},0.1)` }}>
                                        <div style={{ width: 38, height: 38, background: `rgba(${terracotaRgb},0.15)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, color: terracota, fontSize: "1rem" }}>
                                            {(t.nombre || "C").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2d1a0a" }}>{t.nombre}</div>
                                            <div style={{ color: "#8a6040", fontSize: "0.78rem" }}>{t.cargo}</div>
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
                            <h2 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#2d1a0a", marginBottom: "0.5rem" }}>Reserva tu mesa</h2>
                            <p style={{ color: "#8a6040", fontStyle: "italic" }}>Confirmamos en menos de 2 horas</p>
                        </div>
                    </FadeIn>
                    <div className="contact-grid-c" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>
                        <FadeIn>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {[
                                    { icon: "phone", label: "Teléfono", value: d.telefono },
                                    { icon: "map", label: "Dirección", value: d.ciudad },
                                    { icon: "clock", label: "Horario", value: d.horario },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem", background: "#fff", borderRadius: "10px", border: `1px solid rgba(${terracotaRgb},0.12)`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                        <div style={{ width: 42, height: 42, minWidth: 42, background: `rgba(${terracotaRgb},0.12)`, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: terracota }}>
                                            <span style={{ width: 20, height: 20 }}>{Icons[item.icon]}</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#b89070", marginBottom: "0.2rem", fontWeight: 600 }}>{item.label}</div>
                                            <div style={{ fontSize: "0.9rem", color: "#2d1a0a", fontWeight: 500 }}>{item.value}</div>
                                        </div>
                                    </div>
                                ))}
                                <a href={`https://wa.me/${(d.telefono || "").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", background: "#25d366", color: "#fff", padding: "1rem", fontWeight: 700, fontSize: "0.88rem", borderRadius: "10px", transition: "background 0.2s" }}
                                    onMouseOver={e => e.currentTarget.style.background = "#1ebe5d"}
                                    onMouseOut={e => e.currentTarget.style.background = "#25d366"}>
                                    <span style={{ width: 22, height: 22 }}>{Icons.whatsapp}</span>
                                    Reservar por WhatsApp
                                </a>
                            </div>
                        </FadeIn>
                        <FadeIn delay={150}>
                            <div style={{ background: "#fff", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1px solid rgba(${terracotaRgb},0.1)` }}>
                                <h3 style={{ fontFamily: `'${fontTitulo}', serif`, fontSize: "1.5rem", fontWeight: 700, color: "#2d1a0a", marginBottom: "1.75rem" }}>Formulario de reserva</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <input type="text" placeholder="Nombre completo" />
                                    <input type="tel" placeholder="Teléfono de contacto" />
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} style={{ colorScheme: "light" }} />
                                        <select value={hora} onChange={e => setHora(e.target.value)}>
                                            <option value="">Hora</option>
                                            {["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "20:00", "20:30", "21:00", "21:30"].map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <select value={personas} onChange={e => setPersonas(e.target.value)}>
                                        {["1", "2", "3", "4", "5", "6", "7", "8+"].map(n => (
                                            <option key={n} value={n}>{n} persona{n !== "1" ? "s" : ""}</option>
                                        ))}
                                    </select>
                                    <textarea placeholder="¿Alguna solicitud especial? (cumpleaños, alergias, silla para bebé...)" />
                                    <button className="btn-terra" style={{ padding: "1rem", fontSize: "0.9rem", width: "100%", borderRadius: "10px" }}>
                                        Confirmar Reserva
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#2d1a0a", padding: "3rem 2rem 1.5rem" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <div style={{ width: 36, height: 36, background: terracota, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>{iniciales}</div>
                            <span style={{ fontFamily: `'${fontTitulo}', serif`, fontWeight: 700, fontSize: "1rem", color: "#fdf8f2" }}>{d.nombre}</span>
                        </div>
                        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                            {[["inicio", "Inicio"], ["menu", "Menú"], ["nosotros", "Nosotros"], ["galeria", "Galería"], ["reservas", "Reservas"]].map(([id, label]) => (
                                <span key={id} style={{ cursor: "pointer", color: "rgba(253,248,242,0.5)", fontSize: "0.85rem", transition: "color 0.2s" }}
                                    onClick={() => scrollTo(id)}
                                    onMouseOver={e => e.currentTarget.style.color = "#ffd4b0"}
                                    onMouseOut={e => e.currentTarget.style.color = "rgba(253,248,242,0.5)"}
                                >{label}</span>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                        <p style={{ color: "rgba(253,248,242,0.3)", fontSize: "0.8rem" }}>© {new Date().getFullYear()} {d.nombre}. Todos los derechos reservados.</p>
                        <p style={{ color: "rgba(253,248,242,0.15)", fontSize: "0.72rem" }}>Powered by Devantai</p>
                    </div>
                </div>
            </footer>

            {onEnter && (
                <button onClick={onEnter} style={{
                    position: "fixed", bottom: "2rem", right: "2rem",
                    background: terracota, color: "#fff",
                    padding: "0.9rem 1.75rem", border: "none", cursor: "pointer",
                    fontFamily: `'${fontCuerpo}', sans-serif`, fontWeight: 700,
                    fontSize: "0.85rem", borderRadius: "8px", zIndex: 9999,
                    boxShadow: `0 4px 20px rgba(${terracotaRgb},0.4)`,
                }}>
                    Entrar al sistema →
                </button>
            )}
        </div>
    );
}