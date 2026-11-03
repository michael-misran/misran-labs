import { useEffect, useRef } from 'react'
import { ENCARTS } from './encarts'
import { LT, lt } from './livreTexte'

// Visionneuse plein écran des images du portfolio : un clic sur une image
// l'ouvre en grand sur fond sombre. On la ferme avec ×, Échap ou un clic hors
// de l'image ; ← → (ou un glissé du doigt) passent d'une image à l'autre du
// même projet.

// Meilleure résolution disponible : `imageHD` si renseignée, sinon `image`
const source = (e) => e.imageHD ?? e.image

export default function Visionneuse({ serie, index, lang, retour, onChange, onClose }) {
  const boite = useRef(null)
  const x0 = useRef(null)
  const id = serie[index]
  const e = ENCARTS[id]
  const plusieurs = serie.length > 1
  const aller = (pas) => onChange((index + pas + serie.length) % serie.length)

  // Focus sur la visionneuse, page figée dessous ; à la fermeture, le focus
  // revient sur l'image qui l'a ouverte
  useEffect(() => {
    boite.current?.focus()
    const avant = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = avant
      retour?.focus?.()
    }
  }, [retour])

  const surTouche = (ev) => {
    if (ev.key === 'Escape') { ev.preventDefault(); onClose() }
    else if (ev.key === 'ArrowRight' && plusieurs) { ev.preventDefault(); aller(1) }
    else if (ev.key === 'ArrowLeft' && plusieurs) { ev.preventDefault(); aller(-1) }
    else if (ev.key === 'Tab') {
      // Le focus reste piégé dans la visionneuse
      const boutons = [...boite.current.querySelectorAll('button')]
      if (!boutons.length) return
      const premier = boutons[0]
      const dernier = boutons[boutons.length - 1]
      const actif = document.activeElement
      if (ev.shiftKey && (actif === premier || actif === boite.current)) { ev.preventDefault(); dernier.focus() }
      else if (!ev.shiftKey && actif === dernier) { ev.preventDefault(); premier.focus() }
    }
    // Les touches ne vont pas jusqu'au livre (qui tournerait ses pages)
    ev.stopPropagation()
  }

  // Clic hors de l'image (fond ou scène) : on ferme
  const surClic = (ev) => {
    if (ev.target === ev.currentTarget || ev.target.classList.contains('pf-vis-scene')) onClose()
  }

  const glisser = {
    onTouchStart: (ev) => { x0.current = ev.touches[0].clientX },
    onTouchEnd: (ev) => {
      if (x0.current === null) return
      const dx = ev.changedTouches[0].clientX - x0.current
      if (plusieurs && Math.abs(dx) > 50) aller(dx < 0 ? 1 : -1)
      x0.current = null
    },
  }

  const legende = lt(e.legende, lang)

  return (
    <div
      ref={boite}
      className="pf-vis"
      role="dialog"
      aria-modal="true"
      aria-label={legende}
      tabIndex={-1}
      onKeyDown={surTouche}
      onClick={surClic}
      {...glisser}
    >
      <button type="button" className="pf-vis-fermer" onClick={onClose} aria-label={lt(LT.fermer, lang)}>×</button>

      <figure className="pf-vis-scene">
        <img key={id} className="pf-vis-image" src={source(e)} alt={legende} />
        <figcaption className="pf-vis-legende">
          {plusieurs && <span className="pf-vis-compteur">{index + 1} / {serie.length}</span>}
          {legende}
        </figcaption>
      </figure>

      {plusieurs && (
        <>
          <button type="button" className="pf-vis-fleche pf-vis-precedente" onClick={() => aller(-1)} aria-label={lt(LT.imagePrecedente, lang)}>‹</button>
          <button type="button" className="pf-vis-fleche pf-vis-suivante" onClick={() => aller(1)} aria-label={lt(LT.imageSuivante, lang)}>›</button>
        </>
      )}
    </div>
  )
}
