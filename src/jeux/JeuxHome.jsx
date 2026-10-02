import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { listeJeux } from './registre'
import { jt } from './jeuxText'
import { dateLocaleAujourdhui } from './socle/jour'
import { lireResultat } from './socle/serie'

// Nombre de cartes fantômes « Bientôt » quand la grille n'a pas encore 3
// jeux (D10). Chaque mission suivante la décrémente d'une unité.
const A_VENIR = 0

function CarteJeu({ jeu, lang, joue }) {
  return (
    <Link to={`/jeux/${jeu.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          height: '100%',
          padding: 'var(--space-lg)',
          borderRadius: 'var(--radius-lg)',
          border: 'var(--border-thin) solid var(--border)',
          background: `color-mix(in srgb, var(--${jeu.couleur}) 10%, var(--bg2))`,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = 'var(--elev-2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ fontSize: 40, lineHeight: 1 }}>{jeu.icone}</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, margin: 0, color: 'var(--text)' }}>
          {jeu.titre[lang]}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: 0, flex: 1 }}>
          {jeu.accroche[lang]}
        </p>
        <span
          style={{
            alignSelf: 'flex-start',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: joue ? 'var(--primary)' : 'var(--muted)',
            border: 'var(--border-thin) solid var(--border)',
            borderRadius: 'var(--radius-pill)',
            padding: '4px 10px',
          }}
        >
          {joue ? jt(lang, 'joueAujourdhui') : jt(lang, 'nouveauDefi')}
        </span>
      </div>
    </Link>
  )
}

function CarteBientot({ lang }) {
  return (
    <div
      style={{
        height: '100%',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border-thin) dashed var(--border)',
        opacity: 0.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-sm)',
      }}
    >
      <div style={{ fontSize: 40, lineHeight: 1 }}>?</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 19, margin: 0, color: 'var(--text)' }}>
        {jt(lang, 'bientot')}
      </h2>
    </div>
  )
}

export default function JeuxHome() {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const jeux = listeJeux()
  const aujourdhui = dateLocaleAujourdhui()

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 4vw, 36px)', margin: '0 0 var(--space-xs)', color: 'var(--text)' }}>
        {jt(lang, 'jeuxTitre')}
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', maxWidth: 560, margin: '0 0 var(--space-xl)' }}>
        {jt(lang, 'intro')}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'var(--space-md)',
        }}
      >
        {jeux.map((jeu) => (
          <CarteJeu key={jeu.slug} jeu={jeu} lang={lang} joue={Boolean(lireResultat(jeu.slug, aujourdhui))} />
        ))}
        {Array.from({ length: A_VENIR }).map((_, i) => (
          <CarteBientot key={`bientot-${i}`} lang={lang} />
        ))}
      </div>
    </div>
  )
}
