import { lazy } from 'react'

// Pages du numéro (format A), toutes dans le même module : utilisées par les
// routes (App) et par le Shell, qui pose deux pages côte à côte sur une planche
const numeroPage = (nom) => lazy(() => import('./NumeroPages').then((m) => ({ default: m[nom] })))

export const PAGES = {
  '/magazine': numeroPage('Couverture'),
  '/sommaire': numeroPage('SommairePage'),
  '/reclames': numeroPage('Reclames'),
  '/lab/presente': numeroPage('LabPresente'),
  '/dossier': numeroPage('Dossier'),
  '/dossier/suite': numeroPage('DossierSuite'),
  '/avertissement': numeroPage('Avertissement'),
  '/jeux/presente': numeroPage('JeuPresente'),
  '/derniere-minute': numeroPage('DerniereMinute'),
  '/a-suivre': numeroPage('QuatriemeCouverture'),
}
