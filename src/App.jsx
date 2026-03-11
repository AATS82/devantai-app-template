import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Layout from './components/Layout'

const modules = (import.meta.env.VITE_APP_MODULES || 'Módulo 1,Módulo 2').split(',')
const theme = import.meta.env.VITE_APP_THEME || 'dark'
const appName = import.meta.env.VITE_APP_NAME || 'Mi Sistema'
const landingDataRaw = import.meta.env.VITE_APP_LANDING_DATA || null
const landingData = landingDataRaw ? JSON.parse(landingDataRaw) : null
document.documentElement.setAttribute('data-theme', theme)

function AppContent() {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')
  const [showLanding, setShowLanding] = useState(true)

  if (showLanding) return <Landing
    appName={appName}
    modules={modules}
    theme={theme}
    onEnter={() => setShowLanding(false)}
  />

  if (!user) return <Login />

  return (
    <Layout modules={modules} activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'dashboard'
        ? <Dashboard modules={modules} />
        : <ModulePage moduleName={activePage} />
      }
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
if (showLanding) return (
  <LandingAutomotriz
    data={landingData}
    onEnter={() => setShowLanding(false)}
  />
)