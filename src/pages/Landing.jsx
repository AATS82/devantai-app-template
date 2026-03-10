import { useEffect, useRef } from 'react'

export default function Landing({ appName, modules, theme, onEnter }) {
    const landingHtml = import.meta.env.VITE_APP_LANDING || null
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        // ✅ Ejecutar scripts del HTML generado
        const scripts = containerRef.current.querySelectorAll('script')
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script')
            newScript.textContent = oldScript.textContent
            document.body.appendChild(newScript)
            oldScript.remove()
        })

        // ✅ Forzar visibilidad de secciones como fallback
        const sections = containerRef.current.querySelectorAll('.section')
        sections.forEach(s => s.classList.add('visible'))

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
                        background: 'var(--primary)', color: '#fff',
                        padding: '1rem 2rem', borderRadius: '8px',
                        border: 'none', cursor: 'pointer', fontSize: '1rem',
                        fontWeight: '700', zIndex: 9999
                    }}
                >
                    Entrar al sistema →
                </button>
            </>
        )
    }

    // Fallback
    return (
        <div style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg)', color: 'var(--text)', gap: '1rem'
        }}>
            <h1>{appName}</h1>
            <p>Sistema generado por Devantai</p>
            <button onClick={onEnter} style={{
                background: 'var(--primary)', color: '#fff',
                padding: '0.75rem 2rem', borderRadius: '8px',
                border: 'none', cursor: 'pointer', fontSize: '1rem'
            }}>
                Entrar →
            </button>
        </div>
    )
}