import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Layout from './components/Layout'

const modules = (import.meta.env.VITE_APP_MODULES || 'Módulo 1,Módulo 2').split(',')
const theme = import.meta.env.VITE_APP_THEME || 'dark'
document.documentElement.setAttribute('data-theme', theme)

function AppContent() {
  const { user } = useAuth()
  const [activePage, setActivePage] = useState('dashboard')

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