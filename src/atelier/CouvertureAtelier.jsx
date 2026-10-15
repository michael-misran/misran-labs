import { TEXTE_COUV, lt } from './couvertureTexte'
import { SchemaEclateAtelier } from './schemas'
import './couverture.css'

// Couverture de « L’Atelier automatique », partagée entre le livre (page 1)
// et la librairie (miniature du rayon et du présentoir) : une seule source,
// pour que l’aperçu soit toujours la vraie couverture. Toutes les tailles sont
// en cqw : elle s’adapte à la largeur de son cadre.
export function CouvertureAtelier({ lang }) {
  return (
    <section className="at-page at-plan at-couv">
      <div className="at-bandeau">
        <span>1977 Éditions</span>
        <span>{lt(TEXTE_COUV.bandeauCentre, lang)}</span>
        <span>{lang.toUpperCase()}</span>
      </div>
      <div className="at-titre">
        <span className="at-l1">{lt(TEXTE_COUV.titreL1, lang)}</span>
        <span className="at-l2">{lt(TEXTE_COUV.titreL2, lang)}</span>
        <div className="at-sous">
          <span>{lt(TEXTE_COUV.sousL1, lang)}<br />{lt(TEXTE_COUV.sousL2, lang)}</span>
          <span>{lt(TEXTE_COUV.editionCouv, lang)}</span>
        </div>
      </div>
      <SchemaEclateAtelier lang={lang} />
      <div className="at-fig">{lt(TEXTE_COUV.figCouverture, lang)}</div>
      <div className="at-avis">{lt(TEXTE_COUV.avisL1, lang)}<br />{lt(TEXTE_COUV.avisL2, lang)}</div>
      <div className="at-legende">
        {TEXTE_COUV.legendeAgents.map((nom, i) => (
          <div key={nom}><b>{i + 1}</b>{nom}</div>
        ))}
      </div>
      <div className="at-plaque">
        <span className="at-k">{lt(TEXTE_COUV.plaqueModeleK, lang)}</span><span className="at-v">{lt(TEXTE_COUV.plaqueModeleV, lang)}</span>
        <span className="at-k">{lt(TEXTE_COUV.plaqueAlimK, lang)}</span><span className="at-v">{lt(TEXTE_COUV.plaqueAlimV, lang)}</span>
        <span className="at-k">{lt(TEXTE_COUV.plaqueFabK, lang)}</span><span className="at-v">{lt(TEXTE_COUV.plaqueFabV, lang)}</span>
      </div>
    </section>
  )
}
