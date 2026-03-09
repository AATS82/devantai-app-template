import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Icon = ({ path, size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
    </svg>
)

const icons = {
    plus: "M12 5v14M5 12h14",
    search: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    close: "M18 6L6 18M6 6l12 12",
    alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01",
}

const toTableName = (name) =>
    name.toLowerCase()
        .replace(/ /g, '_')
        .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
        .replace(/ó/g, 'o').replace(/ú/g, 'u')
        .replace(/ñ/g, 'n')

export default function ModulePage({ moduleName }) {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [modal, setModal] = useState(null) // null | 'new' | 'edit' | 'delete'
    const [selected, setSelected] = useState(null)
    const [form, setForm] = useState({ nombre: '', descripcion: '' })
    const [error, setError] = useState('')

    const tableName = toTableName(moduleName)

    useEffect(() => {
        fetchRows()
    }, [moduleName])

    const fetchRows = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .order('created_at', { ascending: false })
        if (!error) setRows(data || [])
        setLoading(false)
    }

    const handleCreate = async () => {
        setError('')
        const { error } = await supabase.from(tableName).insert([form])
        if (error) { setError(error.message); return }
        setModal(null)
        setForm({ nombre: '', descripcion: '' })
        fetchRows()
    }

    const handleUpdate = async () => {
        setError('')
        const { error } = await supabase.from(tableName).update(form).eq('id', selected.id)
        if (error) { setError(error.message); return }
        setModal(null)
        fetchRows()
    }

    const handleDelete = async () => {
        await supabase.from(tableName).delete().eq('id', selected.id)
        setModal(null)
        fetchRows()
    }

    const openEdit = (row) => {
        setSelected(row)
        setForm({ nombre: row.nombre || '', descripcion: row.descripcion || '' })
        setModal('edit')
    }

    const openNew = () => {
        setForm({ nombre: '', descripcion: '' })
        setError('')
        setModal('new')
    }

    const filtered = rows.filter(r =>
        (r.nombre || '').toLowerCase().includes(search.toLowerCase())
    )

    const columns = rows.length > 0
        ? Object.keys(rows[0]).filter(k => !['id', 'created_at', 'updated_at', 'activo'].includes(k))
        : ['nombre', 'descripcion']

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-white">{moduleName}</h1>
                <p className="text-xs text-zinc-500 mt-0.5">{rows.length} registros</p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                        <Icon path={icons.search} size={15} />
                    </span>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder={`Buscar en ${moduleName}...`}
                        className="w-full bg-white/4 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
                <button
                    onClick={openNew}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                    <Icon path={icons.plus} size={15} />
                    Nuevo
                </button>
            </div>

            {/* Table */}
            <div className="bg-white/3 border border-white/6 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="px-6 py-12 text-center text-zinc-600 text-sm">Cargando...</div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/6">
                                {columns.map(col => (
                                    <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                        {col.replace(/_/g, ' ')}
                                    </th>
                                ))}
                                <th className="px-5 py-3.5 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/4">
                            {filtered.map((row, i) => (
                                <tr key={i} className="hover:bg-white/2 transition-colors group">
                                    {columns.map(col => (
                                        <td key={col} className="px-5 py-4 text-sm text-zinc-300 max-w-xs truncate">
                                            {String(row[col] ?? '-')}
                                        </td>
                                    ))}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openEdit(row)} className="p-1.5 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                                                <Icon path={icons.edit} size={14} />
                                            </button>
                                            <button onClick={() => { setSelected(row); setModal('delete') }} className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                                <Icon path={icons.trash} size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!loading && filtered.length === 0 && (
                    <div className="px-6 py-12 text-center text-zinc-600 text-sm">
                        No hay registros en {moduleName}
                    </div>
                )}
            </div>

            {/* Modal crear/editar */}
            {(modal === 'new' || modal === 'edit') && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModal(null)} />
                    <div className="relative w-full max-w-md bg-[#0f1623] border border-white/8 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                            <h3 className="text-sm font-semibold text-white">
                                {modal === 'new' ? `Nuevo registro — ${moduleName}` : `Editar registro`}
                            </h3>
                            <button onClick={() => setModal(null)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                                <Icon path={icons.close} size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">{error}</div>
                            )}
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Nombre</label>
                                <input
                                    value={form.nombre}
                                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                                    placeholder="Nombre del registro"
                                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Descripción</label>
                                <textarea
                                    value={form.descripcion}
                                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                                    placeholder="Descripción opcional"
                                    rows={3}
                                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-all resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-zinc-400 bg-white/4 border border-white/8 rounded-xl hover:bg-white/6 transition-all">
                                    Cancelar
                                </button>
                                <button
                                    onClick={modal === 'new' ? handleCreate : handleUpdate}
                                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                                >
                                    {modal === 'new' ? 'Crear' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal eliminar */}
            {modal === 'delete' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setModal(null)} />
                    <div className="relative w-full max-w-sm bg-[#0f1623] border border-white/8 rounded-2xl shadow-2xl p-6">
                        <div className="flex items-start gap-3 p-4 bg-red-500/6 border border-red-500/15 rounded-xl mb-5">
                            <Icon path={icons.alert} size={18} />
                            <div>
                                <p className="text-sm text-zinc-200 font-medium mb-1">¿Eliminar este registro?</p>
                                <p className="text-xs text-zinc-500">Esta acción no se puede deshacer.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setModal(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-zinc-400 bg-white/4 border border-white/8 rounded-xl hover:bg-white/6 transition-all">
                                Cancelar
                            </button>
                            <button onClick={handleDelete} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}