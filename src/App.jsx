import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './shell/Shell'
import BureauLab from './lab/BureauLab'
import { LanguageProvider } from './shell/LanguageProvider'
import { PAGES } from './numero/pages'

const KiosqueHome = lazy(() => import('./kiosque/KiosqueHome'))
const ProjectPage = lazy(() => import('./lab/ProjectPage'))
const ProjectDemoPage = lazy(() => import('./lab/ProjectDemoPage'))
const ProjetsHome = lazy(() => import('./projets/ProjetsHome'))
const ProjetIdee = lazy(() => import('./projets/ProjetIdee'))
const ProjetsFonctionnement = lazy(() => import('./projets/ProjetsFonctionnement'))
const SuivrePage = lazy(() => import('./suivre/SuivrePage'))
const EditoPage = lazy(() => import('./edito/EditoPage'))
const JeuxHome = lazy(() => import('./jeux/JeuxHome'))
const JeuPage = lazy(() => import('./jeux/JeuPage'))
const SaviezVousPage = lazy(() => import('./saviez-vous/SaviezVousPage'))
// Pages du numéro (format A)
const { '/magazine': Couverture, '/sommaire': SommairePage, '/reclames': Reclames, '/lab/presente': LabPresente, '/dossier': Dossier,
  '/dossier/suite': DossierSuite, '/avertissement': Avertissement, '/jeux/presente': JeuPresente,
  '/derniere-minute': DerniereMinute, '/a-suivre': QuatriemeCouverture } = PAGES
const Page404 = lazy(() => import('./shell/Page404'))
// Livre portfolio pour les recruteurs : hors du magazine, sur sa propre table de lecture
const PortfolioLivre = lazy(() => import('./portfolio/PortfolioLivre'))
// Accueil : la bibliothèque ; la Gazette a son propre format (journal plié)
const Bibliotheque = lazy(() => import('./bibliotheque/Bibliotheque'))
const GazetteJournal = lazy(() => import('./breves/GazetteJournal'))
// Un livre de l'étagère, hors du magazine, sur sa propre table
const livre = (el) => <Suspense fallback={null}>{el}</Suspense>

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        {/* L'accueil est la bibliothèque : on y choisit un livre à ouvrir */}
        <Route index element={livre(<Bibliotheque />)} />
        <Route path="/portfolio" element={livre(<PortfolioLivre />)} />
        <Route path="/oracle" element={livre(<GazetteJournal />)} />
        <Route path="/oracle/:date" element={livre(<GazetteJournal />)} />
        {/* Le magazine Misran Labs : couverture sur /magazine, puis ses pages */}
        <Route path="/" element={<Shell />}>
          <Route path="magazine" element={<Couverture />} />
          <Route path="sommaire" element={<SommairePage />} />
          <Route path="edito" element={<EditoPage />} />
          <Route path="reclames" element={<Reclames />} />
          <Route path="lab/presente" element={<LabPresente />} />
          <Route path="dossier" element={<Dossier />} />
          <Route path="dossier/suite" element={<DossierSuite />} />
          <Route path="avertissement" element={<Avertissement />} />
          <Route path="jeux/presente" element={<JeuPresente />} />
          <Route path="derniere-minute" element={<DerniereMinute />} />
          <Route path="a-suivre" element={<QuatriemeCouverture />} />
          <Route path="ours" element={<Navigate to="/a-suivre" replace />} />
          <Route path="numero/:numero" element={<Navigate to="/magazine" replace />} />
          <Route path="kiosque" element={<KiosqueHome />} />
          <Route path="lab" element={<BureauLab />} />
          <Route path="lab/:slug" element={<ProjectPage />} />
          <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
          <Route path="projets" element={<ProjetsHome />} />
          <Route path="projets/fonctionnement" element={<ProjetsFonctionnement />} />
          <Route path="projets/:id" element={<ProjetIdee />} />
          <Route path="suivre" element={<SuivrePage />} />
          <Route path="jeux" element={<JeuxHome />} />
          <Route path="jeux/:slug" element={<JeuPage />} />
          {/* Le Zine est arrêté : ses anciennes adresses ramènent à la bibliothèque */}
          <Route path="zine/*" element={<Navigate to="/" replace />} />
          <Route path="saviez-vous/:date?" element={<SaviezVousPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
