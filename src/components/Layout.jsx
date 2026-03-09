import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const icons = {
    dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
    table: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18",
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
    menu: "M3 6h18M3 12h18M3 18h18",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    package: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
}

const Icon = ({ path, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
)

const iconForModule = (name) => {
    const n = name.toLowerCase()
    if (n.includes('venta') || n.includes('sale')) return icons.activity
    if (n.includes('inventario') || n.includes('product')) return icons.package
    if (n.includes('cita') || n.includes('agenda')) return icons.calendar
    if (n.includes('cliente') || n.includes('paciente') || n.includes('usuario')) return icons.user
    return icons.table
}

export default function Layout({ modules, activePage, onNavigate, children }) {
    const { user, signOut } = useAuth()
    const [collapsed, setCollapsed] = useState(false)
    const appName = import.meta.env.VITE_APP_NAME || 'Mi Sistema'

    return (
        <div className="min-h-screen bg-[#070d17] flex" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {/* Sidebar */}
            <aside className={`${collapsed ? 'w-16' : 'w-60'} flex-shrink-0 bg-[#0a1120] border-r border-white/6 flex flex-col transition-all duration-300`}>
                {/* Logo */}
                <div className="flex items-center gap-3 px-4 py-5 border-b border-white/6">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-lg shadow-blue-500/30">
                        {appName[0]}
                    </div>
                    {!collapsed && (
                        <div>
                            <p className="text-sm font-bold text-white leading-none">{appName}</p>
                            <p className="text-xs text-zinc-500 mt-0.5">Devantai</p>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav className="flex-1 px-2 py-4 space-y-1">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === 'dashboard'
                            ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                            : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/4'
                            }`}
                    >
                        <Icon path={icons.dashboard} />
                        {!collapsed && <span>Dashboard</span>}
                    </button>

                    {modules.map(mod => (
                        <button
                            key={mod}
                            onClick={() => onNavigate(mod)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activePage === mod
                                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                                : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/4'
                                }`}
                        >
                            <Icon path={iconForModule(mod)} />
                            {!collapsed && <span>{mod}</span>}
                        </button>
                    ))}
                </nav>

                {/* User */}
                <div className="px-2 py-4 border-t border-white/6 space-y-1">
                    {!collapsed && (
                        <div className="px-3 py-2 rounded-xl">
                            <p className="text-xs font-semibold text-zinc-300 truncate">{user?.email}</p>
                        </div>
                    )}
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <Icon path={icons.logout} />
                        {!collapsed && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-14 bg-[#0a1120]/80 backdrop-blur border-b border-white/6 flex items-center px-6 gap-4 flex-shrink-0">
                    <button onClick={() => setCollapsed(!collapsed)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                        <Icon path={icons.menu} size={18} />
                    </button>
                    <div className="flex items-center gap-2 text-xs text-zinc-600">
                        <span>{appName}</span>
                        <span>/</span>
                        <span className="text-zinc-300 font-medium capitalize">{activePage}</span>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
        </div>
    )
}