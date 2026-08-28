import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Shell from './shell/Shell'
import HomeModule from './modules/HomeModule'
import ProjectPage from './lab/ProjectPage'
import ProjectDemoPage from './lab/ProjectDemoPage'
import { LanguageProvider } from './shell/LanguageContext'
import { AuthProvider } from './shell/AuthContext'
import RequireAuth from './shell/RequireAuth'

const PrivateBacklogPage = lazy(() => import('./lab/PrivateBacklogPage'))
const CommunicationPage = lazy(() => import('./lab/CommunicationPage'))
const MAIADashboard = import.meta.env.DEV ? lazy(() => import('./lab/MAIADashboard')) : null
const MAIAContrats = import.meta.env.DEV ? lazy(() => import('./lab/MAIAContrats')) : null
const MAIAFactures = import.meta.env.DEV ? lazy(() => import('./lab/MAIAFactures')) : null
const MAIACandidatures = import.meta.env.DEV ? lazy(() => import('./lab/MAIACandidatures')) : null
const ConformaApp = import.meta.env.DEV ? lazy(() => import('./lab/ConformaApp')) : null

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<HomeModule />} />
            <Route path="lab/:slug" element={<ProjectPage />} />
            <Route path="lab/:slug/demo" element={<ProjectDemoPage />} />
            <Route
              path="prive"
              element={
                <Suspense fallback={null}>
                  <RequireAuth><PrivateBacklogPage /></RequireAuth>
                </Suspense>
              }
            />
            <Route
              path="communication"
              element={
                <Suspense fallback={null}>
                  <RequireAuth><CommunicationPage /></RequireAuth>
                </Suspense>
              }
            />
            {import.meta.env.DEV && (
              <Route
                path="maia"
                element={
                  <Suspense fallback={null}>
                    <MAIADashboard />
                  </Suspense>
                }
              />
            )}
            {import.meta.env.DEV && (
              <Route
                path="maia/contrats"
                element={
                  <Suspense fallback={null}>
                    <MAIAContrats />
                  </Suspense>
                }
              />
            )}
            {import.meta.env.DEV && (
              <Route
                path="maia/factures"
                element={
                  <Suspense fallback={null}>
                    <MAIAFactures />
                  </Suspense>
                }
              />
            )}
            {import.meta.env.DEV && (
              <Route
                path="maia/candidatures"
                element={
                  <Suspense fallback={null}>
                    <MAIACandidatures />
                  </Suspense>
                }
              />
            )}
            {import.meta.env.DEV && (
              <Route
                path="conforma"
                element={
                  <Suspense fallback={null}>
                    <ConformaApp />
                  </Suspense>
                }
              />
            )}
          </Route>
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  )
}
