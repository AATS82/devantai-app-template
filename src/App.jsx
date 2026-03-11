import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import LandingAutomotriz from './pages/Landingautomotriz'
import LandingMedica from './pages/Landingmedica'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Layout from './components/Layout'

const modules = (import.meta.env.VITE_APP_MODULES || 'Módulo 1,Módulo 2').split(',')
const theme = import.meta.env.VITE_APP_THEME || 'dark'
const appName = import.meta.env.VITE_APP_NAME || 'Mi Sistema'
const landingDataRaw = import.meta.env.VITE_APP_LANDING_DATA || null

let landingData = null
try {
  landingData = landingDataRaw ? JSON.parse(landingDataRaw) : null
} catch (e) {
  console.error('Error parsing landingData:', e)
}

document.documentElement.setAttribute('data-theme', theme)

const LANDING_TEMPLATES = {
  'automotriz': LandingAutomotriz,
  'taller': LandingAutomotriz,
  'vehiculos': LandingAutomotriz,
  'mecanica': LandingAutomotriz,
  'salud': LandingMedica,
  'medico': LandingMedica,
  'medica': LandingMedica,
  'clinica': LandingMedica,
  'dental': LandingMedica,
  'veterinaria': LandingMedica,
}

function getLandingTemplate(industria) {
  console.log('industria recibida:', industria)
  if (!industria) return LandingAutomotriz
  const key = industria.toLowerCase()
    .replace(/á/g, 'a').replace(/é/g, 'e')
    .replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
  console.log('key normalizada:', key)
  for (const [k, v] of Object.entries(LANDING_TEMPLATES)) {
    if (key.includes(k)) return v
  }
  return LandingAutomotriz
}

function AppContent() {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')
  const [showLanding, setShowLanding] = useState(true)

  const LandingTemplate = getLandingTemplate(landingData?.industria)

  if (showLanding) return (
    <LandingTemplate
      data={landingData}
      onEnter={() => setShowLanding(false)}
    />
  )

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