export default function Landing({ appName, modules, theme, onEnter }) {
    const landingHtml = import.meta.env.VITE_APP_LANDING || null

    if (landingHtml) {
        return (
            <>
                <div dangerouslySetInnerHTML={{ __html: landingHtml }} />
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

    // Fallback si no hay landing generada
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