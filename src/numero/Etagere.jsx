import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import { VOLUMES } from './volumes'
import { NT, nt } from './numeroText'
import Logo1977 from '../shell/Logo1977'
import './etagere.css'

// Étagère des numéros et autres publications du Lab, rangés par la tranche.
// cote : 'plein' pour la bibliothèque de la page d'accueil (taille donnée par
// son conteneur), 'gauche' / 'droite' pour un côté de planche du magazine. Un clic
// sur une tranche sort le volume : sa couverture s'affiche avec « Lire ».

// Couverture miniature d'un volume, selon son modèle (reprise par la bibliothèque de l'accueil)
export function Couverture({ v, lang }) {
  const titre = nt(v.titre, lang)
  const sous = nt(v.sous, lang)
  if (v.couverture === 'numero') {
    return (
      <div className="etg-couv etg-couv-numero">
        <div className="etg-couv-tete">
          <b>{titre}</b>
          <span>{sous}</span>
        </div>
        <img src={v.image} alt="" />
      </div>
    )
  }
  if (v.couverture === 'midnight') {
    // Illustration (bandeau jaune laissé libre en haut) + titre pulp en police
    return (
      <div className="etg-couv etg-couv-midnight" style={{ backgroundImage: `url(${v.image})` }}>
        <span className="etg-ms-bandeau"><span>{sous}</span></span>
        {/* Logo de la maison d'édition, en bas à droite comme un label */}
        <span className="etg-ms-logo"><Logo1977 largeur="100%" fond="#f7c86a" /></span>
        <b>Midnight<span>Snack!</span></b>
      </div>
    )
  }
  if (v.couverture === 'gazette') {
    return (
      <div className="etg-couv etg-couv-gazette">
        <span className="etg-gaz-sur">{nt(NT.etagereQuotidien, lang)}</span>
        {/* Initiales en rouge (O et M), comme la tête du journal : toute capitale sauf la première lettre */}
        <b>{[...titre].map((c, i) => (i > 0 && c !== c.toLowerCase() ? <span key={i} className="etg-gaz-initiale">{c}</span> : c))}</b>
        <span className="etg-gaz-filet" />
        <span className="etg-gaz-sous">{sous}</span>
        <span className="etg-gaz-colonnes" aria-hidden="true"><i /><i /><i /></span>
      </div>
    )
  }
  if (v.couverture === 'zine') {
    return (
      <div className="etg-couv etg-couv-zine">
        <b>{titre}</b>
        <span className="etg-zine-num">#1</span>
        <span className="etg-zine-sous">{sous}</span>
      </div>
    )
  }
  if (v.couverture === 'portfolio') {
    return (
      <div className="etg-couv etg-couv-portfolio">
        <div className="etg-pf-cadre">
          <span className="etg-pf-sur">{titre}</span>
          <span className="etg-pf-fleuron" aria-hidden="true">❦</span>
          <b>Michael Misran</b>
          <span className="etg-pf-filet" />
          <em>Product Designer</em>
        </div>
      </div>
    )
  }
  // Prochain numéro : couverture en attente, au crayon
  return (
    <div className="etg-couv etg-couv-prochain">
      <b>{titre}</b>
      <span>{sous}</span>
      <em>{nt(NT.etagereAParaitre, lang)}</em>
    </div>
  )
}

export default function Etagere({ cote }) {
  const { lang } = useLanguage()
  const [sorti, setSorti] = useState(null)
  const volume = VOLUMES.find((v) => v.id === sorti)
  const rayons = [0, 1].map((r) => VOLUMES.filter((v) => v.rayon === r))

  return (
    <div className={`${cote === 'plein' ? '' : 'cote cote-vide '}etagere etagere-${cote}${volume ? ' etagere-ouverte' : ''}`}>
      <div className="etg-mur">
        <div className="etg-enseigne">{nt(NT.etagereTitre, lang)}</div>
        {rayons.map((vols, r) => (
          <div key={r} className="etg-rayon">
            <div className="etg-livres">
              {vols.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`etg-tranche${v.id === sorti ? ' sortie' : ''}${v.tranche.pointille ? ' pointille' : ''}`}
                  style={{
                    height: `${v.hauteur}%`,
                    width: `${v.epaisseur}cqw`,
                    '--fond': v.tranche.fond,
                    '--encre': v.tranche.encre,
                    '--police': v.tranche.police,
                  }}
                  aria-label={`${nt(v.titre, lang)} · ${nt(v.sous, lang)}`}
                  aria-pressed={v.id === sorti}
                  onClick={() => setSorti(v.id === sorti ? null : v.id)}
                >
                  <span className="etg-tranche-titre">{nt(v.titre, lang)}</span>
                  <span className="etg-tranche-sous">{nt(v.sousTranche ?? v.sous, lang)}</span>
                </button>
              ))}
              {/* Place libre au bout du rayon du haut, pour les numéros à venir */}
              {r === 0 && <span className="etg-reserve">{nt(NT.etagereReserve, lang)}</span>}
              {r === 1 && <span className="etg-serre-livre" aria-hidden="true" />}
            </div>
            <div className="etg-planche" />
          </div>
        ))}
      </div>

      {/* Volume sorti : sa couverture, et de quoi l'ouvrir */}
      {volume && (
        <div className="etg-sorti" role="dialog" aria-label={nt(volume.titre, lang)}>
          <button type="button" className="etg-fond" aria-label={nt(NT.etagereRanger, lang)} onClick={() => setSorti(null)} />
          <div className="etg-presentoir">
            <Couverture v={volume} lang={lang} />
            <div className="etg-actions">
              {volume.to ? (
                <Link to={volume.to} className="etg-lire">
                  {volume.enCours ? nt(NT.etagereReprendre, lang) : nt(NT.etagereLire, lang)} →
                </Link>
              ) : (
                <span className="etg-lire etg-lire-off">{nt(NT.etagereAParaitre, lang)}</span>
              )}
              <button type="button" className="etg-ranger" onClick={() => setSorti(null)}>
                {nt(NT.etagereRanger, lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
