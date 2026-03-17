import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// ── Datos de demo (reemplazar con fetch a Supabase) ──────────────────────────
const KPIS = [
    {
        label: "Ventas hoy",
        value: "$128.400",
        delta: "↑ 12% vs ayer",
        trend: "up",
        icon: (
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
    },
    {
        label: "Clientes activos",
        value: "847",
        delta: "↑ 8 nuevos esta semana",
        trend: "up",
        icon: (
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
    },
    {
        label: "Citas hoy",
        value: "12",
        delta: "3 por confirmar",
        trend: "neutral",
        icon: (
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    {
        label: "Ingresos del mes",
        value: "$4,2M",
        delta: "↑ 23% vs mes anterior",
        trend: "up",
        icon: (
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
    },
];

const CITAS = [
    { hora: "09:00", nombre: "María González", servicio: "Consulta general" },
    { hora: "10:30", nombre: "Carlos Pérez", servicio: "Pack mensual" },
    { hora: "11:00", nombre: "Ana Rodríguez", servicio: "Seguimiento" },
    { hora: "14:30", nombre: "Luis Morales", servicio: "Primera visita" },
    { hora: "16:00", nombre: "Paola Vera", servicio: "Consulta general" },
];

const VENTAS = [
    { cliente: "M. González", servicio: "Consulta premium", monto: "$45.000", estado: "Pagado" },
    { cliente: "C. Pérez", servicio: "Pack mensual", monto: "$89.000", estado: "Pagado" },
    { cliente: "A. Rodríguez", servicio: "Sesión individual", monto: "$32.000", estado: "Pendiente" },
    { cliente: "L. Morales", servicio: "Consulta inicial", monto: "$28.000", estado: "Pagado" },
    { cliente: "P. Vera", servicio: "Servicio básico", monto: "$18.000", estado: "Cancelado" },
];

const MODULOS = [
    { nombre: "Inventario", ruta: "/inventario", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg> },
    { nombre: "Ventas", ruta: "/ventas", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg> },
    { nombre: "Clientes", ruta: "/clientes", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
    { nombre: "Agenda", ruta: "/agenda", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
    { nombre: "Reportes", ruta: "/reportes", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg> },
    { nombre: "Config", ruta: "/configuracion", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg> },
];

const CHART_DATA = [78000, 92000, 65000, 110000, 88000, 43000, 128400];
const CHART_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Hoy"];

// ── Badge de estado ──────────────────────────────────────────────────────────
function Badge({ estado, dark }) {
    const map = {
        Pagado: { bg: dark ? "#042F2A" : "#E1F5EE", color: dark ? "#8EDCCE" : "#065548" },
        Pendiente: { bg: dark ? "#3A1F00" : "#FFF0DC", color: dark ? "#FAC875" : "#7A4400" },
        Cancelado: { bg: dark ? "#3A1010" : "#FDEAEA", color: dark ? "#F7C4C4" : "#8A2020" },
    };
    return map[estado]
        ? <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 600, background: map[estado].bg, color: map[estado].color }}>{estado}</span>
        : null;
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function Dashboard({ modules: moduleNames = [] }) {
    // Leer tema guardado en localStorage; default "light"
    const [dark, setDark] = useState(() => {
        try { return localStorage.getItem("dvt_tema") === "dark"; } catch { }
        // Fallback: leer el tema que App.jsx ya seteó
        const envTheme = import.meta.env.VITE_APP_THEME || "dark";
        return envTheme === "dark";
    });

    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    // Guardar preferencia de tema
    useEffect(() => {
        try { localStorage.setItem("dvt_tema", dark ? "dark" : "light"); } catch { }
    }, [dark]);

    // Construir / reconstruir chart cuando cambia el tema
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gridColor = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
        const labelColor = dark ? "#6F8BA8" : "#707070";
        const fillColor = dark ? "rgba(10,155,142,0.1)" : "rgba(10,155,142,0.07)";

        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(canvas, {
            type: "line",
            data: {
                labels: CHART_LABELS,
                datasets: [{
                    data: CHART_DATA,
                    borderColor: "#0A9B8E",
                    backgroundColor: fillColor,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "#0A9B8E",
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    borderWidth: 2,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (v) => "$" + Math.round(v.raw / 1000) + "K" } },
                },
                scales: {
                    x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 10 } } },
                    y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 10 }, callback: (v) => "$" + Math.round(v / 1000) + "K" } },
                },
            },
        });

        return () => { if (chartRef.current) { chartRef.current.destroy(); chartRef.current = null; } };
    }, [dark]);

    // ── CSS variables como objeto de estilo (inyectado en el root del componente)
    const t = dark
        ? { bg: "#0B1120", sf: "#121D2F", sf2: "#182337", tx: "#DCE8F4", tx2: "#6F8BA8", br: "rgba(255,255,255,0.07)", acb: "#042F2A", acf: "#8EDCCE" }
        : { bg: "#F5F3EE", sf: "#FFFFFF", sf2: "#ECEAE3", tx: "#0E1116", tx2: "#707070", br: "rgba(0,0,0,0.07)", acb: "#DFF3EE", acf: "#065548" };

    const AC = "#0A9B8E";

    const styles = {
        root: { background: t.bg, color: t.tx, transition: "background .2s, color .2s" },
        header: { background: t.sf, borderBottom: `1px solid ${t.br}`, padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 },
        navA: { fontSize: 12, color: t.tx2, padding: "5px 10px", borderRadius: 7, cursor: "pointer", textDecoration: "none" },
        navOn: { background: t.acb, color: t.acf },
        tog: { width: 38, height: 21, background: t.sf2, border: `1px solid ${t.br}`, borderRadius: 11, cursor: "pointer", position: "relative" },
        togKnob: { width: 15, height: 15, background: AC, borderRadius: "50%", position: "absolute", top: 2, left: dark ? 21 : 2, transition: "left .18s" },
        avatar: { width: 28, height: 28, borderRadius: "50%", background: AC, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
        body: { padding: 20 },
        kpis: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 9, marginBottom: 14 },
        kpi: { background: t.sf, border: `1px solid ${t.br}`, borderRadius: 11, padding: 13 },
        kpiIcon: { width: 26, height: 26, borderRadius: 7, background: t.acb, color: AC, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 9 },
        mid: { display: "grid", gridTemplateColumns: "1fr 285px", gap: 12, marginBottom: 12 },
        bot: { display: "grid", gridTemplateColumns: "1fr 244px", gap: 12 },
        card: { background: t.sf, border: `1px solid ${t.br}`, borderRadius: 11, padding: 16 },
        ctitle: { fontSize: 12, fontWeight: 700, marginBottom: 12, letterSpacing: ".2px" },
        cita: { display: "flex", alignItems: "center", gap: 9, padding: "8px 0", borderBottom: `1px solid ${t.br}` },
        trow: { borderBottom: `1px solid ${t.br}` },
        mod: { background: t.sf2, border: `1px solid ${t.br}`, borderRadius: 9, padding: 10, cursor: "pointer" },
    };

    return (
        <div style={styles.root}>
            {/* ── Header ── */}
            <header style={styles.header}>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-.4px" }}>
                        Devant<span style={{ color: AC }}>ai</span>
                    </span>
                    <nav style={{ display: "flex", gap: 2 }}>
                        {["Dashboard", "Ventas", "Clientes", "Reportes"].map((n) => (
                            <a key={n} style={{ ...styles.navA, ...(n === "Dashboard" ? styles.navOn : {}) }}>{n}</a>
                        ))}
                    </nav>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={styles.tog} onClick={() => setDark(!dark)}>
                        <div style={styles.togKnob} />
                    </div>
                    <div style={styles.avatar}>JM</div>
                </div>
            </header>

            {/* ── Body ── */}
            <div style={styles.body}>
                <div style={{ marginBottom: 18 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Buenos días, Juan</h2>
                    <p style={{ fontSize: 11, color: t.tx2 }}>Lunes 17 de marzo · Resumen de hoy</p>
                </div>

                {/* KPIs */}
                <div style={styles.kpis}>
                    {KPIS.map((k) => (
                        <div key={k.label} style={styles.kpi}>
                            <div style={styles.kpiIcon}>{k.icon}</div>
                            <div style={{ fontSize: 11, color: t.tx2, marginBottom: 3 }}>{k.label}</div>
                            <div style={{ fontSize: 18, fontWeight: 700, whiteSpace: "nowrap" }}>{k.value}</div>
                            <div style={{ fontSize: 10, marginTop: 2, color: k.trend === "up" ? AC : k.trend === "dn" ? "#E24B4A" : t.tx2 }}>
                                {k.delta}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mid: gráfico + citas */}
                <div style={styles.mid}>
                    <div style={styles.card}>
                        <div style={styles.ctitle}>Actividad últimos 7 días</div>
                        <div style={{ position: "relative", width: "100%", height: 148 }}>
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                    <div style={styles.card}>
                        <div style={styles.ctitle}>Próximas citas</div>
                        {CITAS.map((c, i) => (
                            <div key={i} style={{ ...styles.cita, ...(i === CITAS.length - 1 ? { borderBottom: "none" } : {}) }}>
                                <span style={{ fontSize: 10, color: t.tx2, width: 36, flexShrink: 0 }}>{c.hora}</span>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: AC, flexShrink: 0 }} />
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 600 }}>{c.nombre}</div>
                                    <div style={{ fontSize: 10, color: t.tx2 }}>{c.servicio}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom: ventas + módulos */}
                <div style={styles.bot}>
                    <div style={styles.card}>
                        <div style={styles.ctitle}>Últimas ventas</div>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                            <thead>
                                <tr>
                                    {["Cliente", "Servicio", "Monto", "Estado"].map((h) => (
                                        <th key={h} style={{ color: t.tx2, fontWeight: 500, textAlign: "left", padding: "0 5px 7px 0", borderBottom: `1px solid ${t.br}` }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {VENTAS.map((v, i) => (
                                    <tr key={i} style={i < VENTAS.length - 1 ? styles.trow : {}}>
                                        <td style={{ padding: "8px 5px 8px 0" }}>{v.cliente}</td>
                                        <td style={{ padding: "8px 5px 8px 0" }}>{v.servicio}</td>
                                        <td style={{ padding: "8px 5px 8px 0" }}>{v.monto}</td>
                                        <td style={{ padding: "8px 0 8px 0" }}><Badge estado={v.estado} dark={dark} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={styles.card}>
                        <div style={styles.ctitle}>Acceso rápido</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                            {MODULOS.map((m) => (
                                <div key={m.nombre} style={styles.mod}
                                    onClick={() => onNavigate && onNavigate(m.nombre)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = AC}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = t.br}
                                >
                                    <div style={{ color: AC, marginBottom: 4 }}>{m.icon}</div>
                                    <div style={{ fontSize: 11, fontWeight: 600 }}>{m.nombre}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}