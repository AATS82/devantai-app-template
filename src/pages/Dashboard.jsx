const stats = [
    { label: 'Registros hoy', value: '0', color: 'text-blue-400' },
    { label: 'Total registros', value: '0', color: 'text-cyan-400' },
    { label: 'Usuarios activos', value: '1', color: 'text-emerald-400' },
    { label: 'Módulos', value: '0', color: 'text-amber-400' },
]

export default function Dashboard({ modules = [] }) {
    stats[3].value = String(modules.length)

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                    {new Date().toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white/3 border border-white/6 rounded-2xl p-5 hover:bg-white/5 transition-colors">
                        <p className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wider">{s.label}</p>
                        <p className={`text-3xl font-bold font-mono ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Módulos */}
            <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Módulos disponibles</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {modules.map((mod, i) => (
                        <div key={i} className="bg-white/3 border border-white/6 rounded-xl p-4 hover:bg-white/5 transition-colors">
                            <p className="text-sm font-semibold text-zinc-200">{mod}</p>
                            <p className="text-xs text-zinc-600 mt-1">Módulo activo</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bienvenida */}
            <div className="bg-gradient-to-r from-blue-500/8 to-cyan-500/8 border border-blue-500/15 rounded-2xl p-6">
                <p className="text-sm font-semibold text-zinc-200 mb-1">¡Bienvenido a tu sistema!</p>
                <p className="text-xs text-zinc-500">Este sistema fue generado automáticamente por Devantai. Puedes empezar a registrar datos en cada módulo.</p>
            </div>
        </div>
    )
}