import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { listeJeux } from './registre'
import { jt } from './jeuxText'
import { dateLocaleAujourdhui } from './socle/jour'
import { lireResultat } from './socle/serie'
import { EcranCathodique, MenuSelectGame, BoiteJeu } from './ArcadeParts'

export default function JeuxHome() {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const jeux = listeJeux()
  const aujourdhui = dateLocaleAujourdhui()

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 960, margin: '0 auto' }}>
      <style>{`
        @keyframes arcade-clignote { 50% { opacity: 0; } }
        .arcade-blink, .arcade-cursor { animation: arcade-clignote 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .arcade-blink, .arcade-cursor { animation: none; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .arcade-boite:hover { transform: translateY(-4px); transition: transform .15s ease; }
        }
      `}</style>

      <EcranCathodique lang={lang} />

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', maxWidth: 560, margin: '0 0 var(--space-xl)', textAlign: 'center' }}>
        {jt(lang, 'intro')}
      </p>

      <MenuSelectGame jeux={jeux} lang={lang} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'var(--space-md)',
        }}
      >
        {jeux.map((jeu) => (
          <BoiteJeu key={jeu.slug} jeu={jeu} lang={lang} joue={Boolean(lireResultat(jeu.slug, aujourdhui))} />
        ))}
      </div>
    </div>
  )
}
