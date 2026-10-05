// Habillage de /jeux/:slug : on joue sur la télé cathodique de la chambre
// (même style BD que l'illustration de l'accueil : encrage noir épais,
// aplats, ombre nette). Couleurs en dur, propres à cette scène.
import { Link } from 'react-router-dom'

const ENCRE = '#1a1109'
const pixel = { fontFamily: 'var(--font-pixel)', fontWeight: 400 }
const ecran = { fontFamily: 'var(--font-ecran)', fontWeight: 400 }

// Barre au-dessus de la télé : retour à la chambre, titre, accroche
export function BarreJeu({ jeu, lang }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px 16px', flexWrap: 'wrap', marginBottom: 'var(--space-md-plus)' }}>
      <Link to="/jeux" style={{ ...pixel, fontSize: 10, color: '#ffd84a', textDecoration: 'none' }}>
        {lang === 'en' ? '◀ ROOM' : '◀ CHAMBRE'}
      </Link>
      <h1 style={{ ...pixel, fontSize: 'clamp(14px, 2.4vw, 18px)', color: '#fff4d6', margin: 0 }}>{jeu.titre[lang]}</h1>
      <span style={{ ...ecran, fontSize: 18, color: '#e9d9b8', opacity: 0.8 }}>{jeu.accroche[lang]}</span>
    </div>
  )
}

// Le fond : la chambre floutée et assombrie, comme vue du lit, les yeux sur la télé
export function FondChambre({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: ENCRE,
        minHeight: 'calc(100vh - 320px)',
        // Annule la marge haute du pied de page : la chambre va jusqu'à lui
        marginBottom: -60,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -24,
          background: 'url(/arcade/chambre-80s.jpg) center 45% / cover',
          filter: 'blur(7px) brightness(.32) saturate(1.1)',
        }}
      />
      {/* Lueur bleutée de la télé sur la pièce */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 55%, rgba(127,224,255,.16) 0%, transparent 60%)',
        }}
      />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  )
}

// La télé cathodique : caisse en bois, écran bombé dans son cadre, panneau
// de boutons à droite (en dessous sur mobile), antennes, pieds. L'écran
// grandit avec le jeu. Fond clair à l'intérieur, car les jeux supposent un
// fond clair : un écran allumé, légèrement verdâtre.
export function TeleCathodique({ chaine, children }) {
  return (
    <div style={{ position: 'relative', paddingTop: 46 }}>
      <style>{`
        .tele-caisse { display: grid; grid-template-columns: 1fr 74px; gap: 14px; }
        .tele-panneau { flex-direction: column; }
        @media (max-width: 640px) {
          .tele-caisse { grid-template-columns: 1fr; gap: 10px; }
          .tele-panneau { flex-direction: row; justify-content: space-between; }
          .tele-grille { display: none !important; }
          /* Marges resserrées : l'écran garde la place pour le jeu */
          .tele-caisse { padding: 8px !important; border-radius: 18px !important; }
          .tele-cadre { padding: 5px !important; border-radius: 22px !important; }
          .tele-contenu { padding: 14px 10px !important; }
        }
        .tele-ecran::after {
          content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
          background: repeating-linear-gradient(0deg, rgba(0,20,10,.05) 0 1px, transparent 1px 3px);
          box-shadow: inset 0 0 50px rgba(0,30,20,.35), inset 0 0 8px rgba(0,0,0,.4);
        }
        @keyframes tele-allumage {
          0% { transform: scale(1, .006); filter: brightness(4); opacity: 1; }
          45% { transform: scale(1, .006); filter: brightness(4); }
          100% { transform: scale(1, 1); filter: brightness(1); }
        }
        .tele-contenu { animation: tele-allumage .45s ease-out both; transform-origin: 50% 50%; }
        @media (prefers-reduced-motion: reduce) { .tele-contenu { animation: none; } }
      `}</style>

      {/* Antennes « oreilles de lapin » */}
      <svg aria-hidden="true" viewBox="0 0 200 60" width="200" height="60" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', overflow: 'visible' }}>
        <path d="M100 56 L52 6 M100 56 L156 12" stroke={ENCRE} strokeWidth="4" strokeLinecap="round" />
        <path d="M100 56 L52 6 M100 56 L156 12" stroke="#b9b4aa" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="52" cy="6" r="5" fill="#d6d1c8" stroke={ENCRE} strokeWidth="2.5" />
        <circle cx="156" cy="12" r="5" fill="#d6d1c8" stroke={ENCRE} strokeWidth="2.5" />
        <rect x="80" y="48" width="40" height="14" rx="5" fill="#3a3634" stroke={ENCRE} strokeWidth="3" />
      </svg>

      {/* Caisse en bois */}
      <div
        className="tele-caisse"
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #7a4e2c 0%, #6b4426 70%, #563519 100%)',
          border: `4px solid ${ENCRE}`,
          borderRadius: 24,
          boxShadow: `10px 10px 0 rgba(0,0,0,.55), inset 0 -10px 0 rgba(0,0,0,.18), inset 6px 6px 0 rgba(255,220,160,.12)`,
          padding: 'clamp(12px, 2.4vw, 20px)',
        }}
      >
        {/* Cadre de l'écran */}
        <div
          className="tele-cadre"
          style={{
            background: '#2b2420',
            border: `3px solid ${ENCRE}`,
            borderRadius: 30,
            padding: 'clamp(8px, 1.6vw, 14px)',
            boxShadow: 'inset 0 0 0 3px #3d342e',
            minWidth: 0,
          }}
        >
          {/* Écran bombé */}
          <div
            className="tele-ecran"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '26px / 32px',
              border: `3px solid ${ENCRE}`,
              background: 'radial-gradient(ellipse at 45% 40%, #f4f8f1 0%, #e6ede2 60%, #cfd8cb 100%)',
            }}
          >
            <div className="tele-contenu" style={{ padding: 'clamp(14px, 3vw, 28px)' }}>
              {children}
            </div>
            {/* Reflet du verre, comme sur le dessin */}
            <svg aria-hidden="true" viewBox="0 0 40 40" width="40" height="40" style={{ position: 'absolute', top: 10, right: 12, pointerEvents: 'none' }}>
              <path d="M8 6 Q30 8 33 30" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".75" />
            </svg>
          </div>
        </div>

        {/* Panneau de boutons */}
        <div
          className="tele-panneau"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: '#3a3330',
            border: `3px solid ${ENCRE}`,
            borderRadius: 10,
            padding: '12px 8px',
          }}
        >
          <div
            style={{
              ...ecran,
              fontSize: 18,
              color: '#4dff6a',
              background: '#0d120d',
              border: `2px solid ${ENCRE}`,
              padding: '0 6px',
              textShadow: '0 0 4px #4dff6a',
              whiteSpace: 'nowrap',
            }}
          >
            CH {String(chaine).padStart(2, '0')}
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexDirection: 'inherit' }}>
            {[0, 1].map((k) => (
              <span
                key={k}
                aria-hidden="true"
                style={{
                  position: 'relative',
                  width: k === 0 ? 34 : 28,
                  height: k === 0 ? 34 : 28,
                  borderRadius: '50%',
                  background: '#d6d1c8',
                  border: `3px solid ${ENCRE}`,
                  boxShadow: 'inset -4px -4px 0 #a9a39a',
                }}
              >
                <span style={{ position: 'absolute', left: '50%', top: 3, width: 3, height: '40%', background: ENCRE, transform: `translateX(-50%) rotate(${k ? 40 : -25}deg)`, transformOrigin: '50% 100%' }} />
              </span>
            ))}
          </div>
          {/* Grille du haut-parleur */}
          <div className="tele-grille" aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%', padding: '0 4px' }}>
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} style={{ height: 3, background: ENCRE, borderRadius: 2 }} />
            ))}
          </div>
          {/* Voyant marche */}
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff4a3a', border: `2px solid ${ENCRE}`, boxShadow: '0 0 6px #ff4a3a' }} />
        </div>
      </div>

      {/* Pieds */}
      <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12%' }}>
        {[0, 1].map((k) => (
          <span key={k} style={{ width: 46, height: 14, background: '#2b1d12', border: `3px solid ${ENCRE}`, borderTop: 'none', borderRadius: '0 0 6px 6px' }} />
        ))}
      </div>
    </div>
  )
}
