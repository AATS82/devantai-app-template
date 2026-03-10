import { useEffect, useRef } from 'react'

export default function Landing({ appName, onEnter }) {
    const landingHtml = import.meta.env.VITE_APP_LANDING || null
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current || !landingHtml) return

        // 1. Forzar todas las secciones visibles
        containerRef.current.querySelectorAll('.section').forEach(s => {
            s.style.opacity = '1'
            s.style.transform = 'none'
        })

        // 2. Ejecutar scripts del HTML generado
        containerRef.current.querySelectorAll('script').forEach(old => {
            const script = document.createElement('script')
            script.textContent = old.textContent
            document.body.appendChild(script)
            old.remove()
        })

    }, [landingHtml])

    if (landingHtml) {
        return (
            <>
                <div
                    ref={containerRef}
                    dangerouslySetInnerHTML={{ __html: landingHtml }}
                />
                <button
                    onClick={onEnter}
                    style={{
                        position: 'fixed', bottom: '2rem', right: '2rem',
                        background: '#2563eb', color: '#fff',
                        padding: '1rem 2rem', borderRadius: '8px',
                        border: 'none', cursor: 'pointer',
                        fontSize: '1rem', fontWeight: '700', zIndex: 9999,
                        boxShadow: '0 4px 20px rgba(37,99,235,0.4)'
                    }}
                >
                    Entrar al sistema →
                </button>
            </>
        )
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#0a0f1e', color: '#fff', gap: '1rem'
        }}>
            <h1>{appName}</h1>
            <button onClick={onEnter} style={{
                background: '#2563eb', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '8px',
                border: 'none', cursor: 'pointer', fontSize: '1rem'
            }}>
                Entrar →
            </button>
        </div>
    )
}