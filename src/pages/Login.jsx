import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const { signIn, signUp } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const appName = import.meta.env.VITE_APP_NAME || 'Mi Sistema'

    const handleSubmit = async () => {
        setError('')
        setLoading(true)
        try {
            if (isRegister) {
                await signUp(email, password)
            } else {
                await signIn(email, password)
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#070d17] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-black mb-4 shadow-lg shadow-blue-500/30">
                        {appName[0]}
                    </div>
                    <h1 className="text-xl font-bold text-white">{appName}</h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1.5">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-all"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                    >
                        {loading ? 'Cargando...' : isRegister ? 'Crear cuenta' : 'Entrar'}
                    </button>

                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="w-full text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-1"
                    >
                        {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                    </button>
                </div>

                <p className="text-center text-xs text-zinc-700 mt-6">
                    Powered by <span className="text-zinc-500">Devantai</span>
                </p>
            </div>
        </div>
    )
}