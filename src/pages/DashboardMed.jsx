/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
    Calendar as CalendarIcon,
    Clock,
    Users,
    CheckCircle2,
    Plus,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Search,
    LayoutDashboard,
    Settings,
    Bell,
    LogOut,
    Mail,
    Phone,
    CalendarDays
} from 'lucide-react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    isToday,
    parseISO
} from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Mock Data
const MOCK_APPOINTMENTS = [
    { id: '1', patientName: 'Juan Pérez', type: 'Consulta General', date: format(new Date(), 'yyyy-MM-dd'), time: '09:00', status: 'confirmed' },
    { id: '2', patientName: 'María García', type: 'Limpieza Dental', date: format(new Date(), 'yyyy-MM-dd'), time: '10:30', status: 'pending' },
    { id: '3', patientName: 'Carlos Ruiz', type: 'Ortodoncia', date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), time: '14:00', status: 'confirmed' },
    { id: '4', patientName: 'Ana López', type: 'Extracción', date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), time: '11:00', status: 'cancelled' },
];

const MOCK_PATIENTS = [
    { id: 'p1', name: 'Juan Pérez', email: 'juan.perez@email.com', phone: '+56 9 1234 5678', lastVisit: '2024-02-15', nextAppointment: '2024-03-20' },
    { id: 'p2', name: 'María García', email: 'maria.g@email.com', phone: '+56 9 8765 4321', lastVisit: '2024-01-10', nextAppointment: '2024-03-18' },
    { id: 'p3', name: 'Carlos Ruiz', email: 'c.ruiz@email.com', phone: '+56 9 5555 4444', lastVisit: '2024-03-05' },
    { id: 'p4', name: 'Ana López', email: 'ana.lopez@email.com', phone: '+56 9 1111 2222', lastVisit: '2023-12-20' },
];

const AVAILABLE_TIMES = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
];

export default function App() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('dashboard');
    const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
    const [patients] = useState(MOCK_PATIENTS);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [newAppointment, setNewAppointment] = useState({});

    // Calendar Logic
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = useMemo(() => {
        return eachDayOfInterval({ start: startDate, end: endDate });
    }, [startDate, endDate]);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const handleBookAppointment = () => {
        if (newAppointment.patientName && newAppointment.time) {
            const appointment = {
                id: Math.random().toString(36).substr(2, 9),
                patientName: newAppointment.patientName,
                type: newAppointment.type || 'Consulta General',
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: newAppointment.time,
                status: 'pending'
            };
            setAppointments([...appointments, appointment]);
            setShowBookingModal(false);
            setBookingStep(1);
            setNewAppointment({});
        }
    };

    return (
        <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <CalendarIcon size={24} />
                    </div>
                    <h1 className="font-bold text-xl tracking-tight">MediPlan</h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <SidebarItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => setActiveTab('dashboard')}
                    />
                    <SidebarItem
                        icon={<CalendarIcon size={20} />}
                        label="Calendario"
                        active={activeTab === 'calendar'}
                        onClick={() => setActiveTab('calendar')}
                    />
                    <SidebarItem
                        icon={<Users size={20} />}
                        label="Pacientes"
                        active={activeTab === 'patients'}
                        onClick={() => setActiveTab('patients')}
                    />
                    <SidebarItem
                        icon={<Settings size={20} />}
                        label="Configuración"
                        active={false}
                        onClick={() => { }}
                    />
                </nav>

                <div className="p-4 border-t border-[#E5E7EB]">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 bg-white border-bottom border-[#E5E7EB] flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar pacientes, citas..."
                            className="w-full pl-10 pr-4 py-2 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold">Dr. Alejandro Silva</p>
                                <p className="text-xs text-gray-500">Odontólogo</p>
                            </div>
                            <img
                                src="https://picsum.photos/seed/doctor/100/100"
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h2>
                                    <p className="text-gray-500 mt-1">Aquí tienes un resumen de tus citas para hoy.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedDate(new Date());
                                        setShowBookingModal(true);
                                    }}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                >
                                    <Plus size={20} />
                                    Nueva Cita
                                </button>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard
                                    icon={<CalendarIcon className="text-indigo-600" />}
                                    label="Citas Hoy"
                                    value={appointments.filter(a => isSameDay(parseISO(a.date), new Date())).length.toString()}
                                    trend="+12% vs ayer"
                                />
                                <StatCard
                                    icon={<Users className="text-emerald-600" />}
                                    label="Pacientes Nuevos"
                                    value="24"
                                    trend="+5% este mes"
                                />
                                <StatCard
                                    icon={<CheckCircle2 className="text-amber-600" />}
                                    label="Tasa de Asistencia"
                                    value="92%"
                                    trend="+2% vs mes pasado"
                                />
                            </div>

                            {/* Appointments List */}
                            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
                                <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                                    <h3 className="font-bold text-lg">Próximas Citas</h3>
                                    <button className="text-indigo-600 text-sm font-semibold hover:underline">Ver todas</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-[#F9FAFB] text-gray-500 text-xs uppercase tracking-wider">
                                                <th className="px-6 py-4 font-semibold">Paciente</th>
                                                <th className="px-6 py-4 font-semibold">Tipo de Cita</th>
                                                <th className="px-6 py-4 font-semibold">Fecha y Hora</th>
                                                <th className="px-6 py-4 font-semibold">Estado</th>
                                                <th className="px-6 py-4 font-semibold"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {appointments.slice(0, 5).map((apt) => (
                                                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                                {apt.patientName.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <span className="font-medium">{apt.patientName}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600">{apt.type}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{format(parseISO(apt.date), 'dd MMM, yyyy', { locale: es })}</span>
                                                            <span className="text-xs text-gray-400">{apt.time}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-xs font-semibold",
                                                            apt.status === 'confirmed' && "bg-emerald-100 text-emerald-700",
                                                            apt.status === 'pending' && "bg-amber-100 text-amber-700",
                                                            apt.status === 'cancelled' && "bg-red-100 text-red-700"
                                                        )}>
                                                            {apt.status === 'confirmed' ? 'Confirmada' : apt.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            <MoreVertical size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'calendar' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Calendar Component */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold capitalize">
                                            {format(currentDate, 'MMMM yyyy', { locale: es })}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-7 gap-1">
                                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                                            <div key={day} className="text-center text-xs font-bold text-gray-400 py-2 uppercase tracking-widest">
                                                {day}
                                            </div>
                                        ))}
                                        {calendarDays.map((day, idx) => {
                                            const isSelected = isSameDay(day, selectedDate);
                                            const isCurrentMonth = isSameMonth(day, monthStart);
                                            const hasAppointments = appointments.some(a => isSameDay(parseISO(a.date), day));

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedDate(day)}
                                                    className={cn(
                                                        "h-24 p-2 border border-gray-50 flex flex-col items-end transition-all relative group",
                                                        !isCurrentMonth && "bg-gray-50/50 text-gray-300",
                                                        isSelected && "ring-2 ring-indigo-500 z-10 bg-indigo-50/30",
                                                        isToday(day) && "text-indigo-600 font-bold"
                                                    )}
                                                >
                                                    <span className={cn(
                                                        "text-sm",
                                                        isSelected && "font-bold"
                                                    )}>{format(day, 'd')}</span>

                                                    {hasAppointments && isCurrentMonth && (
                                                        <div className="mt-auto w-full flex flex-col gap-1">
                                                            {appointments
                                                                .filter(a => isSameDay(parseISO(a.date), day))
                                                                .slice(0, 2)
                                                                .map(a => (
                                                                    <div key={a.id} className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded truncate">
                                                                        {a.time} {a.patientName}
                                                                    </div>
                                                                ))}
                                                            {appointments.filter(a => isSameDay(parseISO(a.date), day)).length > 2 && (
                                                                <div className="text-[9px] text-gray-400 pl-1">
                                                                    +{appointments.filter(a => isSameDay(parseISO(a.date), day)).length - 2} más
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Day Detail Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                                    <h4 className="font-bold text-lg mb-4">
                                        Citas para el {format(selectedDate, "d 'de' MMMM", { locale: es })}
                                    </h4>
                                    <div className="space-y-4">
                                        {appointments.filter(a => isSameDay(parseISO(a.date), selectedDate)).length > 0 ? (
                                            appointments
                                                .filter(a => isSameDay(parseISO(a.date), selectedDate))
                                                .sort((a, b) => a.time.localeCompare(b.time))
                                                .map(apt => (
                                                    <div key={apt.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                        <div className="text-indigo-600 font-bold text-sm bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm">
                                                            {apt.time}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-bold text-sm">{apt.patientName}</p>
                                                            <p className="text-xs text-gray-500">{apt.type}</p>
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                                    <CalendarIcon size={24} />
                                                </div>
                                                <p className="text-gray-500 text-sm">No hay citas agendadas</p>
                                                <button
                                                    onClick={() => setShowBookingModal(true)}
                                                    className="text-indigo-600 text-sm font-bold mt-2 hover:underline"
                                                >
                                                    Agendar ahora
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200">
                                    <h4 className="font-bold text-lg mb-2">Disponibilidad</h4>
                                    <p className="text-indigo-100 text-sm mb-4">Tienes 8 espacios disponibles para este día.</p>
                                    <button
                                        onClick={() => setShowBookingModal(true)}
                                        className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors"
                                    >
                                        Abrir Agenda
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'patients' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight">Directorio de Pacientes</h2>
                                    <p className="text-gray-500 mt-1">Gestiona la información y el historial de tus pacientes.</p>
                                </div>
                                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                                    <Plus size={20} />
                                    Nuevo Paciente
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {patients.map(patient => (
                                    <motion.div
                                        key={patient.id}
                                        whileHover={{ y: -4 }}
                                        className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl">
                                                {patient.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{patient.name}</h4>
                                                <p className="text-xs text-gray-400">ID: {patient.id}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                                <Mail size={16} />
                                                <span>{patient.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                                <Phone size={16} />
                                                <span>{patient.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                                <CalendarDays size={16} />
                                                <span>Última visita: {format(parseISO(patient.lastVisit), 'dd MMM, yyyy', { locale: es })}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <button className="text-indigo-600 text-sm font-bold hover:underline">Ver Historial</button>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Booking Modal */}
            <AnimatePresence>
                {showBookingModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold">Agendar Cita</h3>
                                    <button
                                        onClick={() => setShowBookingModal(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                                    >
                                        <Plus className="rotate-45" size={24} />
                                    </button>
                                </div>

                                {bookingStep === 1 ? (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Fecha Seleccionada</label>
                                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <CalendarIcon size={20} className="text-indigo-600" />
                                                <span className="font-bold">{format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Horarios Disponibles</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {AVAILABLE_TIMES.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setNewAppointment({ ...newAppointment, time })}
                                                        className={cn(
                                                            "py-3 rounded-xl text-sm font-bold border transition-all",
                                                            newAppointment.time === time
                                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                                                                : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300"
                                                        )}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            disabled={!newAppointment.time}
                                            onClick={() => setBookingStep(2)}
                                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transition-all mt-4"
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre del Paciente</label>
                                            <input
                                                type="text"
                                                placeholder="Ej. Juan Pérez"
                                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                                value={newAppointment.patientName || ''}
                                                onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tipo de Consulta</label>
                                            <select
                                                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none"
                                                value={newAppointment.type || 'Consulta General'}
                                                onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                                            >
                                                <option>Consulta General</option>
                                                <option>Limpieza Dental</option>
                                                <option>Ortodoncia</option>
                                                <option>Extracción</option>
                                                <option>Urgencia</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-4 mt-4">
                                            <button
                                                onClick={() => setBookingStep(1)}
                                                className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                                            >
                                                Atrás
                                            </button>
                                            <button
                                                disabled={!newAppointment.patientName}
                                                onClick={handleBookAppointment}
                                                className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transition-all"
                                            >
                                                Confirmar Cita
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-components
function SidebarItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200",
                active
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
        >
            {icon}
            <span>{label}</span>
            {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
        </button>
    );
}

function StatCard({ icon, label, value, trend }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                    {icon}
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{trend}</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <h4 className="text-3xl font-bold mt-1">{value}</h4>
        </div>
    );
}

