import { Link, useParams } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import useIsMobile from '../shell/useIsMobile'
import { formatDateLongNoWeekday } from '../shell/dates'
import Fiole from '../shell/mascotte/Fiole'
import { getParutions, getParution } from './parutions'
import { st } from './saviezText'

// « Le saviez-vous ? » : une page de magazine calquée sur celles des DoggyBags.
// Un sujet par parution : bandeau titre cerné d'encre avec un portrait qui
// déborde, texte en lettrage BD capitales, fiche technique et légende du
// démontage encadrées autour d'une grande planche illustrée, puis une bande
// de réclames de la maison en pied de page.
// /saviez-vous = la dernière parution, /saviez-vous/AAAA-MM-JJ = les archives.

const ENCRE = 'var(--primitive-encre)'
const PAGE = 'var(--saviez-page)'
const FICHE = 'var(--saviez-fiche)'
const ROUGE = 'var(--masthead-bandeau)'

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
}

// Lettrage de bulle de BD, en capitales justifiées
const lettrage = (taille) => ({
  fontFamily: 'var(--font-bd)',
  textTransform: 'uppercase',
  fontSize: taille,
  lineHeight: 1.35,
  textAlign: 'justify',
  hyphens: 'auto',
  margin: 0,
})

const tr = (v, lang) => v[lang] ?? v.fr

// Bandeau titre : cadre épais, titre en caractères de bois, portrait rond
// qui déborde en haut à droite (dessin du sujet, ou la Fiole par défaut)
function Bandeau({ parution, lang, isNarrow }) {
  const tailleRond = isNarrow ? 84 : 128
  return (
    <div style={{ position: 'relative', marginTop: isNarrow ? 30 : 46 }}>
      <div
        style={{
          border: `4px solid ${ENCRE}`,
          background: FICHE,
          padding: isNarrow ? '10px 12px' : '12px 20px',
          paddingRight: tailleRond + (isNarrow ? 10 : 24),
          boxShadow: `5px 5px 0 ${ENCRE}`,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-bois)',
            fontWeight: 400,
            textTransform: 'uppercase',
            fontSize: isNarrow ? 30 : 56,
            lineHeight: 1,
            letterSpacing: '0.01em',
            color: ENCRE,
            margin: 0,
          }}
        >
          {tr(parution.sujet, lang)}
        </h1>
      </div>
      <div
        style={{
          position: 'absolute',
          right: isNarrow ? 6 : 14,
          top: isNarrow ? -30 : -46,
          width: tailleRond,
          height: tailleRond,
          borderRadius: '50%',
          border: `4px solid ${ENCRE}`,
          background: FICHE,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {parution.portrait ? (
          <img src={parution.portrait} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Fiole scale={isNarrow ? 4 : 6} sleeps={false} />
        )}
      </div>
    </div>
  )
}

// Encadré façon fiche technique : bandeau noir titré, liste en lettrage BD
function Encadre({ titre, items, lettres, lang }) {
  return (
    <section style={{ border: `3px solid ${ENCRE}`, background: FICHE }}>
      <h2 style={{ ...lettrage(13), textAlign: 'left', fontWeight: 700, background: ENCRE, color: FICHE, padding: '5px 10px' }}>
        {tr(titre, lang)}
      </h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <li key={i} style={{ ...lettrage(12.5), textAlign: 'left', display: 'flex', gap: 6 }}>
            {lettres && <b style={{ flexShrink: 0 }}>{String.fromCharCode(65 + i)}.</b>}
            <span>{tr(item, lang)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

// Grande planche : l'illustration du sujet, ou un cadre hachuré en attendant
function Planche({ parution, lang }) {
  if (parution.illustration) {
    return (
      <img
        src={parution.illustration}
        alt={tr(parution.sujet, lang)}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
    )
  }
  return (
    <div
      style={{
        minHeight: 280,
        height: '100%',
        border: `2px dashed ${ENCRE}`,
        background: `repeating-linear-gradient(45deg, transparent 0 9px, var(--primitive-encre-a12) 9px 10px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <span style={{ ...lettrage(13), textAlign: 'center', background: PAGE, padding: '6px 10px', border: `2px solid ${ENCRE}` }}>
        {st(lang, 'illustrationAttente')}
      </span>
    </div>
  )
}

// Bande de réclames de la maison, façon petites annonces de pied de page
function Reclames({ lang, isNarrow }) {
  return (
    <aside style={{ marginTop: 22, border: `4px solid ${ENCRE}`, background: ENCRE, display: 'grid', gridTemplateColumns: isNarrow ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 4 }}>
      {st(lang, 'reclames').map((r) => (
        <Link
          key={r.to}
          to={r.to}
          style={{ background: PAGE, color: ENCRE, textDecoration: 'none', padding: '10px 10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 6 }}
        >
          <span style={{ fontFamily: r.police, fontSize: isNarrow ? 20 : 24, lineHeight: 1, fontStyle: r.to === '/jeux' ? 'italic' : 'normal', fontWeight: r.to === '/jeux' ? 900 : 400, wordSpacing: r.to === '/breves' ? 'var(--font-gothique-espace)' : 'normal' }}>
            {r.titre}
          </span>
          <span style={{ ...etiquette, fontSize: 11, background: ROUGE, color: FICHE, padding: '2px 6px' }}>{r.accroche}</span>
          <span style={{ ...lettrage(11), textAlign: 'center' }}>{r.texte}</span>
          {r.note && <span style={{ fontFamily: 'var(--font-bd)', fontSize: 9 }}>{r.note}</span>}
        </Link>
      ))}
    </aside>
  )
}

function Archives({ parutions, courante, lang }) {
  const autres = parutions.filter((p) => p.date !== courante)
  if (autres.length === 0) return null
  return (
    <section style={{ marginTop: 36 }}>
      <h2 style={{ ...etiquette, fontSize: 14, color: ENCRE, margin: '0 0 10px' }}>{st(lang, 'archives')}</h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {autres.map((p) => (
          <li key={p.date} style={{ borderTop: `1px solid ${ENCRE}` }}>
            <Link to={`/saviez-vous/${p.date}`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, padding: '10px 4px', color: ENCRE, textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-bois)', textTransform: 'uppercase', fontSize: 18 }}>{tr(p.sujet, lang)}</span>
              <span style={{ ...etiquette, fontSize: 11, alignSelf: 'center' }}>{formatDateLongNoWeekday(p.date, lang)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function SaviezVousPage() {
  const { date } = useParams()
  const { lang } = useLanguage()
  const isNarrow = useIsMobile(700)
  const parutions = getParutions()
  const parution = date ? getParution(date) : parutions[0]

  const conteneur = { maxWidth: 900, margin: isNarrow ? '24px 16px 40px' : '40px auto 56px', padding: isNarrow ? 0 : '0 24px', color: ENCRE }

  if (!parution) {
    return (
      <div lang={lang} style={{ ...conteneur, textAlign: 'center' }}>
        <p style={{ ...lettrage(18), textAlign: 'center', marginBottom: 10 }}>{date ? st(lang, 'introuvableTitre') : st(lang, 'vide')}</p>
        {date && (
          <>
            <p style={{ fontFamily: 'var(--font-edito)', fontSize: 16, color: 'var(--text2)', margin: '0 0 16px' }}>{st(lang, 'introuvableTexte')}</p>
            <Link to="/saviez-vous" style={{ ...etiquette, fontSize: 11, color: ENCRE }}>{st(lang, 'retour')}</Link>
          </>
        )}
      </div>
    )
  }

  return (
    <div lang={lang} style={conteneur}>
      {date && date !== parutions[0]?.date && (
        <Link to="/saviez-vous" style={{ ...etiquette, display: 'inline-block', fontSize: 11, color: ENCRE, marginBottom: 12 }}>
          {st(lang, 'retour')}
        </Link>
      )}

      {/* La page imprimée */}
      <article style={{ background: PAGE, border: `1px solid ${ENCRE}`, boxShadow: 'var(--elev-5)', padding: isNarrow ? '14px 12px 16px' : '22px 28px 26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, ...etiquette, fontSize: 10 }}>
          <span>{st(lang, 'presente')}</span>
          <span>{st(lang, 'parution')} {formatDateLongNoWeekday(parution.date, lang)}</span>
        </div>

        <Bandeau parution={parution} lang={lang} isNarrow={isNarrow} />

        <p style={{ ...lettrage(isNarrow ? 13 : 14.5), marginTop: 18 }}>{tr(parution.intro, lang)}</p>

        {/* Planche centrale : encadrés à gauche, illustration à droite */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isNarrow ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.5fr)',
            gap: 16,
            marginTop: 18,
            alignItems: 'stretch',
          }}
        >
          {(parution.fiche || parution.legende) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, order: isNarrow ? 2 : 0 }}>
              {parution.fiche && <Encadre titre={parution.fiche.titre} items={parution.fiche.lignes} lang={lang} />}
              {parution.legende && <Encadre titre={parution.legende.titre} items={parution.legende.items} lettres lang={lang} />}
            </div>
          )}
          <div style={{ gridColumn: parution.fiche || parution.legende || isNarrow ? 'auto' : '1 / -1' }}>
            <Planche parution={parution} lang={lang} />
          </div>
        </div>

        {parution.conclusion && <p style={{ ...lettrage(isNarrow ? 13 : 14.5), marginTop: 18 }}>{tr(parution.conclusion, lang)}</p>}

        {parution.sources && (
          <p style={{ ...etiquette, fontSize: 9, letterSpacing: '0.08em', marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: '4px 10px' }}>
            <span>{st(lang, 'sources')} :</span>
            {parution.sources.map((s) => (
              <a key={s} href={s} target="_blank" rel="noopener noreferrer" style={{ color: ENCRE }}>
                {new URL(s).hostname.replace(/^www\./, '')}
              </a>
            ))}
          </p>
        )}

        <Reclames lang={lang} isNarrow={isNarrow} />
      </article>

      <Archives parutions={parutions} courante={parution.date} lang={lang} />
    </div>
  )
}
