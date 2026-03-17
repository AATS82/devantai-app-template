import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import LandingAutomotriz from './pages/Landingautomotriz'
import LandingMedica from './pages/Landingmedica'
import LandingGastronomiaElegante from './pages/LandingGastronomiaElegante'
import LandingGastronomiaCalida from './pages/LandingGastronomiaCalida'
import LandingGastronomiaModerna from './pages/LandingGastronomiaModerna'
import LandingFarmacia from './pages/LandingFarmacia'
import LandingDentista from './pages/LandingDentista'
import LandingOptica from './pages/LandingOptica'
import LandingYoga from './pages/LandingYoga'
import LandingPeluqueriaMascotas from './pages/LandingPeluqueriaMascotas'
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
    const decoded = decodeURIComponent(
      atob(landingDataRaw)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    landingData = JSON.parse(decoded)
  }
} catch (e) {
  console.error('Error parsing landingData:', e)
}

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
  'farmacia': LandingFarmacia,
  'dentista': LandingDentista,
  'optica': LandingOptica,
  'yoga': LandingYoga,
  'peluqueria_mascotas': LandingPeluqueriaMascotas,
  'gastronomia': null,
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
  'calida': LandingGastronomiaCalida,
  'familiar': LandingGastronomiaCalida,
  'casual': LandingGastronomiaCalida,
  'tradicional': LandingGastronomiaCalida,
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
  if (!industria) return LandingYoga

  const key = normalize(industria)

  const gastroKeys = ['gastronomia', 'restaurante', 'cocina', 'cafe', 'bar', 'pasteleria', 'comida']
  const isGastro = gastroKeys.some(k => key.includes(k))

  if (isGastro) {
    const estiloKey = normalize(gastronomiaEstilo)
    for (const [k, v] of Object.entries(GASTRONOMIA_ESTILOS)) {
      if (estiloKey.includes(k)) return v
    }
    return LandingGastronomiaCalida
  }

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

  if (showLanding) {
    document.documentElement.removeAttribute('data-theme')
    return (
      <LandingTemplate
        data={landingData}
        onEnter={() => {
          document.documentElement.removeAttribute('data-theme')
          setShowLanding(false)
        }}
      />
    )
  }

  if (!user) return <Login />

  // Dashboard maneja su propio layout completo — sin wrapper oscuro
  if (activePage === 'dashboard') {
    return (
      <Dashboard
        modules={modules}
        onNavigate={setActivePage}
      />
    )
  }

  // Módulos usan el Layout oscuro
  return (
    <Layout modules={modules} activePage={activePage} onNavigate={setActivePage}>
      <ModulePage moduleName={activePage} />
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