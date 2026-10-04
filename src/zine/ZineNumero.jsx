import { useParams, Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { useLanguage } from '../shell/LanguageContext'
import { MastheadZine, BlocZine } from './ZineParts'
import { zt, numeroAffiche, formatMoisAnnee } from './zineText'
import { getNumero } from './numeros'
import Fiole from '../shell/mascotte/Fiole'

function NotFound({ lang }) {
  const isMobile = useIsMobile()

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 880, margin: '0 auto' }}>
      <MastheadZine lang={lang} />
      <div style={{ border: '3px solid var(--border)', padding: isMobile ? 'var(--space-md-plus)' : 'var(--space-xl)', textAlign: 'center' }}>
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          <Fiole scale={4} variant="toxique" sleeps={false} />
        </div>
        <h2 style={{ fontFamily: 'var(--primitive-font-anton)', textTransform: 'uppercase', fontSize: 'clamp(22px, 3.4vw, 32px)', color: 'var(--text)', margin: 'var(--space-xs-plus) 0 var(--space-xs)' }}>
          {zt(lang, 'notFoundTitle')}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text2)', margin: '0 0 var(--space-md-plus)' }}>
          {zt(lang, 'notFoundBody')}
        </p>
        <Link to="/zine" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary)', textDecoration: 'none' }}>
          {zt(lang, 'backToList')}
        </Link>
      </div>
    </div>
  )
}

export default function ZineNumero() {
  const { numero: numeroParam } = useParams()
  const isMobile = useIsMobile()
  const { lang } = useLanguage()
  const numero = getNumero(Number(numeroParam))

  if (!numero) return <NotFound lang={lang} />

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, maxWidth: 880, margin: '0 auto' }}>
      <MastheadZine lang={lang} encre={numero.encre} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
        <h2
          style={{
            fontFamily: 'var(--primitive-font-anton)',
            textTransform: 'uppercase',
            fontSize: 'clamp(26px, 4vw, 40px)',
            color: numero.encre,
            margin: 0,
          }}
        >
          {numero.titre[lang] ?? numero.titre.fr}
        </h2>
        <span style={{ fontFamily: 'var(--font-bd)', fontWeight: 700, fontStyle: 'italic', fontSize: 13, color: 'var(--text2)' }}>
          #{numeroAffiche(numero.numero)} · {formatMoisAnnee(numero.date, lang)}
        </span>
      </div>

      <div style={{ borderLeft: `4px solid ${numero.encre}`, paddingLeft: isMobile ? 14 : 'var(--space-md-plus)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ fontFamily: 'var(--font-etiquette)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 11, fontWeight: 700, color: numero.encre, marginBottom: 6 }}>
          {zt(lang, 'editoTitle')}
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.65, color: 'var(--prose)', margin: 0 }}>
          {numero.edito[lang] ?? numero.edito.fr}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        {numero.pages.map((bloc, i) => (
          <BlocZine key={i} bloc={bloc} lang={lang} />
        ))}
      </div>

      <Link to="/zine" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)', textDecoration: 'none', display: 'inline-block', marginBottom: 40 }}>
        {zt(lang, 'backToList')}
      </Link>
    </div>
  )
}
