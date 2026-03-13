import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import LandingAutomotriz from './pages/Landingautomotriz'
import LandingMedica from './pages/Landingmedica'
import LandingGastronomiaElegante from './pages/LandingGastronomiaElegante'
import LandingGastronomiaCálida from './pages/LandingGastronomiaCálida'
import LandingGastronomiaModerna from './pages/LandingGastronomiaModerna'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Layout from './components/Layout'

const modules = (import.meta.env.VITE_APP_MODULES || 'Módulo 1,Módulo 2').split(',')
const theme = import.meta.env.VITE_APP_THEME || 'dark'
const appName = import.meta.env.VITE_APP_NAME || 'Mi Sistema'
const landingDataRaw = import.meta.env.VITE_APP_LANDING_DATA || null

let landingData = null
try {
  if (landingDataRaw) {
    const decoded = atob(landingDataRaw)  // decodifica Base64
    landingData = JSON.parse(decoded)
  }
} catch (e) {
  console.error('Error parsing landingData:', e)
}

document.documentElement.setAttribute('data-theme', theme)

const LANDING_TEMPLATES = {
  // Automotriz
  'automotriz': LandingAutomotriz,
  'taller': LandingAutomotriz,
  'vehiculos': LandingAutomotriz,
  'mecanica': LandingAutomotriz,
  // Médica
  'salud': LandingMedica,
  'medico': LandingMedica,
  'medica': LandingMedica,
  'clinica': LandingMedica,
  'dental': LandingMedica,
  'veterinaria': LandingMedica,
  // Gastronomía — Haiku elige el subtipo via gastronomia_estilo
  'gastronomia': null, // resuelto dinámicamente abajo
  'restaurante': null,
  'cocina': null,
  'cafe': null,
  'bar': null,
  'pasteleria': null,
  'comida': null,
}

const GASTRONOMIA_ESTILOS = {
  'elegante': LandingGastronomiaElegante,
  'fino': LandingGastronomiaElegante,
  'gourmet': LandingGastronomiaElegante,
  'calida': LandingGastronomiaCálida,
  'familiar': LandingGastronomiaCálida,
  'casual': LandingGastronomiaCálida,
  'tradicional': LandingGastronomiaCálida,
  'moderna': LandingGastronomiaModerna,
  'moderno': LandingGastronomiaModerna,
  'minimalista': LandingGastronomiaModerna,
  'contemporanea': LandingGastronomiaModerna,
}

function normalize(str) {
  return (str || '').toLowerCase()
    .replace(/á/g, 'a').replace(/é/g, 'e')
    .replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
}

function getLandingTemplate(industria, gastronomiaEstilo) {
  console.log('industria recibida:', industria, '| estilo:', gastronomiaEstilo)
  if (!industria) return LandingAutomotriz

  const key = normalize(industria)
  console.log('key normalizada:', key)

  // ¿Es gastronomía?
  const gastroKeys = ['gastronomia', 'restaurante', 'cocina', 'cafe', 'bar', 'pasteleria', 'comida']
  const isGastro = gastroKeys.some(k => key.includes(k))

  if (isGastro) {
    const estiloKey = normalize(gastronomiaEstilo)
    for (const [k, v] of Object.entries(GASTRONOMIA_ESTILOS)) {
      if (estiloKey.includes(k)) return v
    }
    // fallback gastronomía sin estilo definido → Cálida (la más universal)
    return LandingGastronomiaCálida
  }

  // Resto de industrias
  for (const [k, v] of Object.entries(LANDING_TEMPLATES)) {
    if (v && key.includes(k)) return v
  }

  return LandingAutomotriz
}

function AppContent() {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')
  const [showLanding, setShowLanding] = useState(true)

  const LandingTemplate = getLandingTemplate(
    landingData?.industria,
    landingData?.gastronomia_estilo
  )

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