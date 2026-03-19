/**
 * INCLIY — Dashboard de Agendamiento
 * Conectado a Supabase usando tablas: professionals, services, bookings
 * Usa VITE_APP_NAME y color_primario del landingData
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import {
    Calendar as CalendarIcon, Clock, Users, CheckCircle2, Plus,
    ChevronLeft, ChevronRight, MoreVertical, Search, LayoutDashboard,
    Settings, Bell, LogOut, Mail, Phone, CalendarDays, X, Loader2
} from 'lucide-react';
import {
    format, addMonths, subMonths, startOfMonth, endOfMonth,
    startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays,
    eachDayOfInterval, isToday, parseISO
} from 'date-fns';
import { es } from 'date-fns/locale';

// ── Config desde env vars ─────────────────────────────────────
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Mi Sistema';

// ── Utilidad de clases ────────────────────────────────────────
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

// ── Horarios disponibles ──────────────────────────────────────
const AVAILABLE_TIMES = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
];

// ── Hook: datos de Supabase ───────────────────────────────────
function useSupabaseData() {
    const [bookings, setBookings] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [bRes, pRes, sRes] = await Promise.all([
                supabase.from('bookings').select('*, professionals(nombre, color), services(nombre, duracion_minutos)').order('fecha', { ascending: true }).order('hora_inicio', { ascending: true }),
                supabase.from('professionals').select('*').eq('activo', true),
                supabase.from('services').select('*').eq('activo', true),
            ]);
            if (bRes.error) throw bRes.error;
            if (pRes.error) throw pRes.error;
            if (sRes.error) throw sRes.error;
            setBookings(bRes.data || []);
            setProfessionals(pRes.data || []);
            setServices(sRes.data || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const createBooking = async (data) => {
        const { error } = await supabase.from('bookings').insert([data]);
        if (error) throw error;
        await fetchAll();
    };

    const updateBookingStatus = async (id, estado) => {
        const { error } = await supabase.from('bookings').update({ estado }).eq('id', id);
        if (error) throw error;
        await fetchAll();
    };

    return { bookings, professionals, services, loading, error, createBooking, updateBookingStatus, refetch: fetchAll };
}

// ── Componente principal ──────────────────────────────────────
export default function AgendaDashboard() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [newBooking, setNewBooking] = useState({});
    const [savingBooking, setSavingBooking] = useState(false);
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);

    const { bookings, professionals, services, loading, error, createBooking, updateBookingStatus } = useSupabaseData();

    // Obtener usuario actual
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data?.user));
    }, []);

    // Calendario
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarDays = useMemo(() => eachDayOfInterval({
        start: startOfWeek(monthStart),
        end: endOfWeek(monthEnd)
    }), [monthStart, monthEnd]);

    // Bookings de hoy
    const todayBookings = bookings.filter(b =>
        isSameDay(parseISO(b.fecha), new Date())
    );

    // Bookings del día seleccionado
    const selectedDayBookings = bookings.filter(b =>
        isSameDay(parseISO(b.fecha), selectedDate)
    ).sort((a, b) => a.hora_inicio.localeCompare(b.hora_inicio));

    // Stats
    const confirmados = bookings.filter(b => b.estado === 'confirmado').length;
    const pendientes = bookings.filter(b => b.estado === 'pendiente').length;
    const tasaAsistencia = bookings.length > 0
        ? Math.round((confirmados / bookings.length) * 100)
        : 0;

    // Crear booking
    const handleCreateBooking = async () => {
        if (!newBooking.cliente_nombre || !newBooking.hora_inicio || !newBooking.professional_id) return;
        setSavingBooking(true);
        try {
            const service = services.find(s => s.id === newBooking.service_id);
            const duracion = service?.duracion_minutos || 30;
            const [h, m] = newBooking.hora_inicio.split(':').map(Number);
            const totalMin = h * 60 + m + duracion;
            const horaFin = `${String(Math.floor(totalMin / 60)).padStart(2, '0')}:${String(totalMin % 60).padStart(2, '0')}`;

            await createBooking({
                professional_id: newBooking.professional_id,
                service_id: newBooking.service_id || null,
                cliente_nombre: newBooking.cliente_nombre,
                cliente_telefono: newBooking.cliente_telefono || '',
                fecha: format(selectedDate, 'yyyy-MM-dd'),
                hora_inicio: newBooking.hora_inicio,
                hora_fin: horaFin,
                estado: 'pendiente',
                notas: newBooking.notas || '',
            });

            setShowModal(false);
            setBookingStep(1);
            setNewBooking({});
        } catch (e) {
            alert('Error al crear la cita: ' + e.message);
        } finally {
            setSavingBooking(false);
        }
    };

    const initials = (name = '') => name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    const statusColor = (estado) => ({
        confirmado: 'bg-emerald-100 text-emerald-700',
        pendiente: 'bg-amber-100 text-amber-700',
        cancelado: 'bg-red-100 text-red-700',
        completado: 'bg-blue-100 text-blue-700',
    }[estado] || 'bg-gray-100 text-gray-600');
    const statusLabel = (estado) => ({
        confirmado: 'Confirmada', pendiente: 'Pendiente',
        cancelado: 'Cancelada', completado: 'Completada',
    }[estado] || estado);

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
                <p className="text-gray-500 text-sm">Cargando agenda...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
            <div className="text-center">
                <p className="text-red-500 font-semibold mb-2">Error al cargar datos</p>
                <p className="text-gray-400 text-sm">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">

            {/* ── Sidebar ── */}
            <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <CalendarIcon size={20} />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight truncate">{APP_NAME}</h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
                        { id: 'calendar', icon: <CalendarIcon size={18} />, label: 'Calendario' },
                        { id: 'professionals', icon: <Users size={18} />, label: 'Profesionales' },
                    ].map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={cn('flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-sm',
                                activeTab === item.id
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            )}>
                            {item.icon}
                            <span>{item.label}</span>
                            {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-[#E5E7EB]">
                    {user && (
                        <div className="px-4 py-3 mb-2">
                            <p className="text-xs font-semibold text-gray-700 truncate">{user.email}</p>
                            <p className="text-xs text-gray-400">Administrador</p>
                        </div>
                    )}
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm"
                    >
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 overflow-y-auto">

                {/* Header */}
                <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Buscar citas, pacientes..."
                            className="w-full pl-9 pr-4 py-2 bg-[#F3F4F6] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                            <Bell size={18} />
                            {pendientes > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                            )}
                        </button>
                        <button
                            onClick={() => { setShowModal(true); setBookingStep(1); setNewBooking({}); }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                        >
                            <Plus size={16} />
                            Nueva Cita
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">

                    {/* ── DASHBOARD ── */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    {format(new Date(), "EEEE d 'de' MMMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())}
                                </h2>
                                <p className="text-gray-500 mt-1 text-sm">Resumen de tu agenda de hoy</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard icon={<CalendarIcon className="text-indigo-600" size={20} />}
                                    label="Citas hoy" value={todayBookings.length.toString()} trend={`${pendientes} pendientes`} />
                                <StatCard icon={<Users className="text-emerald-600" size={20} />}
                                    label="Profesionales activos" value={professionals.length.toString()} trend="en el sistema" />
                                <StatCard icon={<CheckCircle2 className="text-amber-600" size={20} />}
                                    label="Tasa confirmación" value={`${tasaAsistencia}%`} trend={`${confirmados} confirmadas`} />
                            </div>

                            {/* Citas de hoy */}
                            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                                <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                                    <h3 className="font-bold text-lg">Citas de hoy</h3>
                                    <button onClick={() => setActiveTab('calendar')} className="text-indigo-600 text-sm font-semibold hover:underline">
                                        Ver calendario
                                    </button>
                                </div>
                                {todayBookings.length === 0 ? (
                                    <div className="py-16 text-center">
                                        <CalendarIcon className="mx-auto text-gray-300 mb-3" size={32} />
                                        <p className="text-gray-400 text-sm">No hay citas para hoy</p>
                                        <button onClick={() => setShowModal(true)} className="text-indigo-600 text-sm font-semibold mt-2 hover:underline">
                                            Agendar ahora
                                        </button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="bg-[#F9FAFB] text-gray-400 text-xs uppercase tracking-wider">
                                                    {['Paciente', 'Profesional', 'Servicio', 'Hora', 'Estado', ''].map(h => (
                                                        <th key={h} className="px-6 py-3 font-semibold">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {todayBookings.map(b => (
                                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                                    {initials(b.cliente_nombre)}
                                                                </div>
                                                                <span className="font-medium">{b.cliente_nombre}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {b.professionals?.nombre || '—'}
                                                        </td>
                                                        <td className="px-6 py-4 text-gray-600">
                                                            {b.services?.nombre || '—'}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="font-semibold">{b.hora_inicio}</span>
                                                            <span className="text-gray-400 text-xs ml-1">→ {b.hora_fin}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={cn('px-3 py-1 rounded-full text-xs font-semibold', statusColor(b.estado))}>
                                                                {statusLabel(b.estado)}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <select
                                                                value={b.estado}
                                                                onChange={e => updateBookingStatus(b.id, e.target.value)}
                                                                className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                                            >
                                                                <option value="pendiente">Pendiente</option>
                                                                <option value="confirmado">Confirmado</option>
                                                                <option value="completado">Completado</option>
                                                                <option value="cancelado">Cancelado</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            {/* Próximas citas (no hoy) */}
                            {bookings.filter(b => !isSameDay(parseISO(b.fecha), new Date()) && new Date(b.fecha) > new Date()).length > 0 && (
                                <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                                    <div className="p-6 border-b border-[#E5E7EB]">
                                        <h3 className="font-bold text-lg">Próximas citas</h3>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="bg-[#F9FAFB] text-gray-400 text-xs uppercase tracking-wider">
                                                    {['Paciente', 'Profesional', 'Fecha', 'Hora', 'Estado'].map(h => (
                                                        <th key={h} className="px-6 py-3 font-semibold">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {bookings
                                                    .filter(b => !isSameDay(parseISO(b.fecha), new Date()) && new Date(b.fecha) > new Date())
                                                    .slice(0, 5)
                                                    .map(b => (
                                                        <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                                        {initials(b.cliente_nombre)}
                                                                    </div>
                                                                    <span className="font-medium">{b.cliente_nombre}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-600">{b.professionals?.nombre || '—'}</td>
                                                            <td className="px-6 py-4 font-medium">
                                                                {format(parseISO(b.fecha), "d MMM", { locale: es })}
                                                            </td>
                                                            <td className="px-6 py-4 font-semibold">{b.hora_inicio}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={cn('px-3 py-1 rounded-full text-xs font-semibold', statusColor(b.estado))}>
                                                                    {statusLabel(b.estado)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── CALENDARIO ── */}
                    {activeTab === 'calendar' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold capitalize">
                                            {format(currentDate, 'MMMM yyyy', { locale: es })}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                                            <div key={d} className="text-center text-xs font-bold text-gray-400 py-2 uppercase tracking-widest">{d}</div>
                                        ))}
                                        {calendarDays.map((day, idx) => {
                                            const isSelected = isSameDay(day, selectedDate);
                                            const isCurrentMonth = isSameMonth(day, monthStart);
                                            const dayBookings = bookings.filter(b => isSameDay(parseISO(b.fecha), day));

                                            return (
                                                <button key={idx} onClick={() => setSelectedDate(day)}
                                                    className={cn(
                                                        'h-20 p-1.5 border border-gray-50 flex flex-col items-end transition-all text-sm',
                                                        !isCurrentMonth && 'bg-gray-50/50 text-gray-300',
                                                        isSelected && 'ring-2 ring-indigo-500 z-10 bg-indigo-50/30',
                                                        isToday(day) && 'text-indigo-600 font-bold'
                                                    )}>
                                                    <span className="text-xs">{format(day, 'd')}</span>
                                                    {dayBookings.length > 0 && isCurrentMonth && (
                                                        <div className="mt-auto w-full space-y-0.5">
                                                            {dayBookings.slice(0, 2).map(b => (
                                                                <div key={b.id} className="text-[9px] bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded truncate">
                                                                    {b.hora_inicio} {b.cliente_nombre}
                                                                </div>
                                                            ))}
                                                            {dayBookings.length > 2 && (
                                                                <div className="text-[9px] text-gray-400 pl-1">+{dayBookings.length - 2} más</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Panel lateral del día */}
                            <div className="space-y-4">
                                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                                    <h4 className="font-bold mb-4 text-sm">
                                        {format(selectedDate, "EEEE d 'de' MMMM", { locale: es }).replace(/^\w/, c => c.toUpperCase())}
                                    </h4>
                                    <div className="space-y-3">
                                        {selectedDayBookings.length === 0 ? (
                                            <div className="text-center py-10">
                                                <CalendarIcon className="mx-auto text-gray-300 mb-3" size={28} />
                                                <p className="text-gray-400 text-sm">Sin citas este día</p>
                                                <button onClick={() => setShowModal(true)}
                                                    className="text-indigo-600 text-sm font-bold mt-2 hover:underline">
                                                    Agendar ahora
                                                </button>
                                            </div>
                                        ) : (
                                            selectedDayBookings.map(b => (
                                                <div key={b.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                    <div className="text-indigo-600 font-bold text-xs bg-white w-12 h-10 rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                                        {b.hora_inicio}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-sm truncate">{b.cliente_nombre}</p>
                                                        <p className="text-xs text-gray-500 truncate">{b.services?.nombre || '—'} · {b.professionals?.nombre || '—'}</p>
                                                    </div>
                                                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold shrink-0', statusColor(b.estado))}>
                                                        {statusLabel(b.estado)}
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="bg-indigo-600 rounded-2xl p-6 text-white">
                                    <h4 className="font-bold mb-1">Agendar cita</h4>
                                    <p className="text-indigo-100 text-xs mb-4">
                                        {format(selectedDate, "d 'de' MMMM", { locale: es })}
                                    </p>
                                    <button onClick={() => setShowModal(true)}
                                        className="w-full bg-white text-indigo-600 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors">
                                        + Nueva Cita
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PROFESIONALES ── */}
                    {activeTab === 'professionals' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Profesionales</h2>
                                <p className="text-gray-500 mt-1 text-sm">Equipo activo en el sistema</p>
                            </div>

                            {professionals.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-[#E5E7EB] py-20 text-center">
                                    <Users className="mx-auto text-gray-300 mb-3" size={32} />
                                    <p className="text-gray-400">No hay profesionales registrados</p>
                                    <p className="text-gray-300 text-sm mt-1">Agrega profesionales desde Supabase</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {professionals.map(prof => {
                                        const profBookings = bookings.filter(b => b.professional_id === prof.id);
                                        const hoy = profBookings.filter(b => isSameDay(parseISO(b.fecha), new Date())).length;
                                        return (
                                            <div key={prof.id} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-4 mb-5">
                                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white"
                                                        style={{ backgroundColor: prof.color || '#6366f1' }}>
                                                        {initials(prof.nombre)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold">{prof.nombre}</h4>
                                                        <p className="text-xs text-gray-400">{prof.especialidad || 'Profesional'}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                                        <p className="text-2xl font-bold text-indigo-600">{hoy}</p>
                                                        <p className="text-xs text-gray-500">Citas hoy</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                                                        <p className="text-2xl font-bold text-indigo-600">{profBookings.length}</p>
                                                        <p className="text-xs text-gray-500">Total citas</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </main>

            {/* ── MODAL NUEVA CITA ── */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-7">
                            <div className="flex items-center justify-between mb-7">
                                <div>
                                    <h3 className="text-xl font-bold">Nueva Cita</h3>
                                    <p className="text-gray-400 text-sm mt-0.5">
                                        {format(selectedDate, "d 'de' MMMM, yyyy", { locale: es })}
                                    </p>
                                </div>
                                <button onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Paso 1: Hora y profesional */}
                            {bookingStep === 1 && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Profesional
                                        </label>
                                        <div className="grid grid-cols-1 gap-2">
                                            {professionals.map(p => (
                                                <button key={p.id}
                                                    onClick={() => setNewBooking({ ...newBooking, professional_id: p.id })}
                                                    className={cn(
                                                        'flex items-center gap-3 p-3 rounded-xl border transition-all text-sm text-left',
                                                        newBooking.professional_id === p.id
                                                            ? 'border-indigo-500 bg-indigo-50'
                                                            : 'border-gray-200 hover:border-indigo-300'
                                                    )}>
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                                                        style={{ backgroundColor: p.color || '#6366f1' }}>
                                                        {initials(p.nombre)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">{p.nombre}</p>
                                                        <p className="text-xs text-gray-400">{p.especialidad}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Horario
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {AVAILABLE_TIMES.map(time => (
                                                <button key={time}
                                                    onClick={() => setNewBooking({ ...newBooking, hora_inicio: time })}
                                                    className={cn(
                                                        'py-2.5 rounded-xl text-xs font-bold border transition-all',
                                                        newBooking.hora_inicio === time
                                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                                                            : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
                                                    )}>
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        disabled={!newBooking.hora_inicio || !newBooking.professional_id}
                                        onClick={() => setBookingStep(2)}
                                        className="w-full bg-indigo-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-40 disabled:shadow-none transition-all">
                                        Siguiente →
                                    </button>
                                </div>
                            )}

                            {/* Paso 2: Datos del paciente */}
                            {bookingStep === 2 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Nombre del paciente *
                                        </label>
                                        <input type="text" placeholder="Ej. Juan Pérez"
                                            className="w-full p-3.5 bg-gray-50 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={newBooking.cliente_nombre || ''}
                                            onChange={e => setNewBooking({ ...newBooking, cliente_nombre: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Teléfono
                                        </label>
                                        <input type="tel" placeholder="+56 9 1234 5678"
                                            className="w-full p-3.5 bg-gray-50 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            value={newBooking.cliente_telefono || ''}
                                            onChange={e => setNewBooking({ ...newBooking, cliente_telefono: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Servicio
                                        </label>
                                        <select
                                            className="w-full p-3.5 bg-gray-50 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                                            value={newBooking.service_id || ''}
                                            onChange={e => setNewBooking({ ...newBooking, service_id: e.target.value })}>
                                            <option value="">Sin especificar</option>
                                            {services.map(s => (
                                                <option key={s.id} value={s.id}>
                                                    {s.nombre} ({s.duracion_minutos} min — ${s.precio?.toLocaleString('es-CL')})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            Notas
                                        </label>
                                        <textarea placeholder="Indicaciones, motivo de consulta..."
                                            rows={2}
                                            className="w-full p-3.5 bg-gray-50 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                            value={newBooking.notas || ''}
                                            onChange={e => setNewBooking({ ...newBooking, notas: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button onClick={() => setBookingStep(1)}
                                            className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm">
                                            ← Atrás
                                        </button>
                                        <button
                                            disabled={!newBooking.cliente_nombre || savingBooking}
                                            onClick={handleCreateBooking}
                                            className="flex-[2] bg-indigo-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-40 disabled:shadow-none transition-all text-sm flex items-center justify-center gap-2">
                                            {savingBooking ? <><Loader2 className="animate-spin" size={16} /> Guardando...</> : 'Confirmar Cita'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Sub-componentes ───────────────────────────────────────────
function StatCard({ icon, label, value, trend }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-gray-50 rounded-xl">{icon}</div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{trend}</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <h4 className="text-3xl font-bold mt-1">{value}</h4>
        </div>
    );
}