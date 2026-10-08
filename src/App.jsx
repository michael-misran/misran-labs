import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Shell from './shell/Shell'
import BureauLab from './lab/BureauLab'
import { LanguageProvider } from './shell/LanguageProvider'

const KiosqueHome = lazy(() => import('./kiosque/KiosqueHome'))
const ProjectPage = lazy(() => import('./lab/ProjectPage'))
const ProjectDemoPage = lazy(() => import('./lab/ProjectDemoPage'))
const BrevesHome = lazy(() => import('./breves/BrevesHome'))
const BrevesJour = lazy(() => import('./breves/BrevesJour'))
const ProjetsHome = lazy(() => import('./projets/ProjetsHome'))
const ProjetIdee = lazy(() => import('./projets/ProjetIdee'))
const ProjetsFonctionnement = lazy(() => import('./projets/ProjetsFonctionnement'))
const SuivrePage = lazy(() => import('./suivre/SuivrePage'))
const EditoPage = lazy(() => import('./edito/EditoPage'))
const JeuxHome = lazy(() => import('./jeux/JeuxHome'))
const JeuPage = lazy(() => import('./jeux/JeuPage'))
const ZineHome = lazy(() => import('./zine/ZineHome'))
const ZineNumero = lazy(() => import('./zine/ZineNumero'))
const SaviezVousPage = lazy(() => import('./saviez-vous/SaviezVousPage'))
// Pages du numéro (format A), toutes dans le même module
const numeroPage = (nom) => lazy(() => import('./numero/NumeroPages').then((m) => ({ default: m[nom] })))
const Couverture = numeroPage('Couverture')
const SommairePage = numeroPage('SommairePage')
const Reclames = numeroPage('Reclames')
const LabPresente = numeroPage('LabPresente')
const Dossier = numeroPage('Dossier')
const DossierSuite = numeroPage('DossierSuite')
const Avertissement = numeroPage('Avertissement')
const JeuPresente = numeroPage('JeuPresente')
const DerniereMinute = numeroPage('DerniereMinute')
const QuatriemeCouverture = numeroPage('QuatriemeCouverture')
const Page404 = lazy(() => import('./shell/Page404'))

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Shell />}>
          {/* Le site est un magazine : l'accueil est la couverture, l'édito suit le sommaire */}
          <Route index element={<Couverture />} />
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
          <Route path="numero/:numero" element={<Navigate to="/" replace />} />
          <Route path="kiosque" element={<KiosqueHome />} />
          <Route path="lab" element={<BureauLab />} />
          <Route path="lab/:slug" element={<ProjectPage />} />
          <Route path="lab/:slug/demo/:version?" element={<ProjectDemoPage />} />
          <Route path="breves" element={<BrevesHome />} />
          <Route path="breves/:date" element={<BrevesJour />} />
          <Route path="projets" element={<ProjetsHome />} />
          <Route path="projets/fonctionnement" element={<ProjetsFonctionnement />} />
          <Route path="projets/:id" element={<ProjetIdee />} />
          <Route path="suivre" element={<SuivrePage />} />
          <Route path="jeux" element={<JeuxHome />} />
          <Route path="jeux/:slug" element={<JeuPage />} />
          <Route path="zine" element={<ZineHome />} />
          <Route path="zine/:numero" element={<ZineNumero />} />
          <Route path="saviez-vous/:date?" element={<SaviezVousPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </LanguageProvider>
  )
}
