import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { MastheadZine, TrameDots, Etoile, Bulle, CouvertureNumero } from './ZineParts'
import { zt } from './zineText'
import { getNumeros } from './numeros'

// Page d'attente (D3) : aucun numéro encore publié. Pas d'image, pas de
// faux contenu — juste la tête de titre, une étoile et une bulle.
function Attente({ lang }) {
  return (
    <>
      <MastheadZine lang={lang} />
      <div
        style={{
          position: 'relative',
          border: '3px solid var(--border)',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-lg)',
          padding: 'var(--space-xl) var(--space-md)',
          overflow: 'hidden',
        }}
      >
        <TrameDots style={{ opacity: 0.5 }} />
        <div style={{ position: 'relative' }}>
          <Etoile texte={zt(lang, 'attenteNumero')} />
        </div>
        <div style={{ position: 'relative' }}>
          <Bulle texte={zt(lang, 'attenteBulle')} />
        </div>
      </div>
    </>
  )
}

export default function ZineHome() {
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const numeros = getNumeros()

  if (numeros.length === 0) {
    return (
      <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 880, margin: '0 auto' }}>
        <Attente lang={lang} />
      </div>
    )
  }

  const [vedette, ...precedents] = numeros

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <MastheadZine lang={lang} encre={vedette.encre} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '340px 1fr',
          gap: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)',
          alignItems: 'start',
          marginBottom: 'var(--space-xl)',
        }}
      >
        <CouvertureNumero numero={vedette} lang={lang} variante="vedette" />
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.65, color: 'var(--prose)', margin: '0 0 14px' }}>
            {vedette.edito[lang] ?? vedette.edito.fr}
          </p>
          <Link
            to={`/zine/${vedette.numero}`}
            style={{ fontFamily: 'var(--font-bd)', fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase', fontSize: 14, color: vedette.encre, textDecoration: 'none', borderBottom: `2px solid ${vedette.encre}`, paddingBottom: 2 }}
          >
            {zt(lang, 'lireLabel')}
          </Link>
        </div>
      </div>

      {precedents.length > 0 && (
        <>
          <h2
            style={{
              fontFamily: 'var(--font-etiquette)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--text)',
              borderBottom: '3px double var(--border)',
              paddingBottom: 8,
              margin: '0 0 var(--space-md-plus)',
            }}
          >
            {zt(lang, 'numerosTitle')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md-plus)' }}>
            {precedents.map((numero) => (
              <Link key={numero.numero} to={`/zine/${numero.numero}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CouvertureNumero numero={numero} lang={lang} variante="grille" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
