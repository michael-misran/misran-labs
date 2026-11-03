import { createContext, useContext } from 'react'
import { ENCARTS } from './encarts'

// Les encarts du livre appellent ouvrir(id, bouton) via ce contexte pour
// agrandir une image dans la visionneuse
export const AgrandirContexte = createContext(null)
export const useAgrandir = () => useContext(AgrandirContexte)

// Images d'un même projet : les encarts remplis qui partagent le préfixe de
// l'identifiant (ds-figma, ds-github… → « ds »), dans l'ordre d'encarts.js
export function serieDe(id) {
  const projet = id.split('-')[0]
  return Object.keys(ENCARTS).filter((k) => ENCARTS[k].image && k.split('-')[0] === projet)
}
