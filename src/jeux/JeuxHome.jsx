import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { listeJeux } from './registre'
import { jt } from './jeuxText'
import { dateLocaleAujourdhui } from './socle/jour'
import { lireResultat } from './socle/serie'
import ChambreArcade from './ChambreArcade'

export default function JeuxHome() {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const jeux = listeJeux()
  const aujourdhui = dateLocaleAujourdhui()
  const estJoue = (slug) => Boolean(lireResultat(slug, aujourdhui))

  return (
    // Toute la zone entre le menu et le pied de page devient la chambre :
    // fond brun très sombre, raccord avec les bords de l'illustration
    <div
      style={{
        minHeight: 'calc(100vh - 320px)',
        // Annule la marge haute du pied de page : la salle va jusqu'à lui
        marginBottom: -60,
        background: '#1a1109',
        padding: isMobile ? '0 0 var(--space-lg)' : '0 0 48px',
      }}
    >
      <div style={{ maxWidth: 1376, margin: '0 auto' }}>
        <ChambreArcade jeux={jeux} lang={lang} estJoue={estJoue} />

        <p style={{ fontFamily: 'var(--font-ecran)', fontSize: 20, lineHeight: 1.2, color: '#fff4d6', opacity: 0.7, maxWidth: 560, margin: 'var(--space-lg) auto 0', padding: '0 16px', textAlign: 'center' }}>
          {jt(lang, 'intro')}
        </p>
      </div>
    </div>
  )
}
