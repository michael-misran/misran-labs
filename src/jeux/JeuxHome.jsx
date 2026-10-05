import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { listeJeux } from './registre'
import { jt } from './jeuxText'
import { dateLocaleAujourdhui } from './socle/jour'
import { lireResultat } from './socle/serie'
import SalleArcade from './SalleArcade'

export default function JeuxHome() {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const jeux = listeJeux()
  const aujourdhui = dateLocaleAujourdhui()
  const estJoue = (slug) => Boolean(lireResultat(slug, aujourdhui))

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <SalleArcade jeux={jeux} lang={lang} estJoue={estJoue} />

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', maxWidth: 560, margin: 'var(--space-lg) auto 0', textAlign: 'center' }}>
        {jt(lang, 'intro')}
      </p>
    </div>
  )
}
