// Composants de la Gazette du Lab en page web (refonte kiosque, D3-D4) :
// une vraie tête de journal, cohérente avec la une du kiosque
// (KiosqueParts.GazetteALaUne) et le gabarit papier — inspirée des deux
// sans en importer quoi que ce soit (D2).
import useIsMobile from '../shell/useIsMobile'
import { BREVES_TEXT, rubriqueLabel, formatDateLong } from './brevesText'

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
}

// Espacement des mots du titre gothique : var() avec repli, pour que le
// passage futur d'UnifrakturMaguntia à Germanica (PR #44 vers
// refonte-kiosque) resserre l'espacement sans retoucher ce fichier.
const gothique = {
  fontFamily: 'var(--font-gothique)',
  wordSpacing: 'var(--font-gothique-espace, normal)',
}

// La tête de journal (D3), commune à /breves et /breves/:date. `date` et
// `count` sont facultatifs — absents sur la page « pas d'édition ce
// jour-là », qui réutilise la même tête sans ligne de date exploitable.
export function GazetteTete({ date, count, lang }) {
  const narrow = useIsMobile(680)
  const t = BREVES_TEXT[lang].tete

  return (
    <header style={{ border: '3px double var(--border)', background: 'var(--bg)', marginBottom: 'var(--space-xl)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : '1fr auto 1fr',
          alignItems: 'center',
          gap: narrow ? 6 : 16,
          padding: narrow ? '18px 16px 14px' : '22px 28px 16px',
          textAlign: narrow ? 'center' : undefined,
        }}
      >
        {!narrow && <span style={{ ...etiquette, fontSize: 12, fontWeight: 700, color: 'var(--text2)' }}>{t.oreilleGauche}</span>}
        <h1
          style={{
            ...gothique,
            fontWeight: 400,
            fontSize: narrow ? 'clamp(34px, 11vw, 50px)' : 'clamp(44px, 6vw, 72px)',
            lineHeight: 1,
            textAlign: 'center',
            margin: 0,
            color: 'var(--text)',
            overflowWrap: 'break-word',
          }}
        >
          {t.titre.map((segment, i) => (
            <span key={i} style={i % 2 === 1 ? { color: 'var(--titre-gazette)' } : undefined}>
              {segment}
            </span>
          ))}
        </h1>
        {!narrow && <span style={{ ...etiquette, fontSize: 12, fontWeight: 700, color: 'var(--text2)', textAlign: 'right' }}>{t.oreilleDroite}</span>}
      </div>

      <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: narrow ? 14 : 16, color: 'var(--text2)', textAlign: 'center', margin: '0 0 14px' }}>
        {t.devise}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 8,
          borderTop: '3px double var(--border)',
          padding: narrow ? '8px 14px' : '8px 24px',
          ...etiquette,
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--text)',
        }}
      >
        <span>{date ? formatDateLong(date, lang) : '—'}</span>
        <span style={{ color: 'var(--text2)' }}>{t.paraitChaque}</span>
        <span>{count != null ? t.brevesCount(count) : ''}</span>
      </div>
    </header>
  )
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

// « Source : <titre ↗> », une ligne par source (D4).
function SourcesGazette({ sources, lang }) {
  const t = BREVES_TEXT[lang].edition
  return (
    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {sources.map((source, i) => {
        const hostname = hostnameOf(source.url)
        return (
          <div key={i} style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 12.5, color: 'var(--text2)' }}>
            {lang === 'fr' ? `${t.sourceLabel} : ` : `${t.sourceLabel}: `}
            <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--titre-gazette)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
              {source.titre} ↗
            </a>
            {hostname && <span style={{ fontStyle: 'normal' }}> · {hostname}</span>}
          </div>
        )
      })}
    </div>
  )
}

// Ornement ❧ centré entre deux filets, séparateur de section (D4).
function Ornement() {
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0' }}>
      <div style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
      <span style={{ fontSize: 18, color: 'var(--titre-gazette)' }}>❧</span>
      <div style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
    </div>
  )
}

// Les polices « bois » alternées des titres des autres brèves (D4).
const BOIS_FONTS = [
  { fontFamily: 'var(--font-bois-2)', fontWeight: 400 },
  { fontFamily: 'var(--font-bois-3)', fontWeight: 400 },
  { fontFamily: 'var(--font-etiquette)', fontWeight: 700 },
]

function EncadreMot({ mot, lang }) {
  const t = BREVES_TEXT[lang].home
  return (
    <div style={{ flex: 1, border: '3px double var(--border)', padding: '14px 16px' }}>
      <div style={{ ...etiquette, fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6 }}>{t.wordLabel}</div>
      <div style={{ fontFamily: 'var(--font-bois-3)', fontWeight: 400, fontSize: 28, lineHeight: 1.05, color: 'var(--text)', marginBottom: 4 }}>{mot.terme}</div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--prose)', margin: 0 }} dangerouslySetInnerHTML={{ __html: mot.definition[lang] ?? mot.definition.fr }} />
    </div>
  )
}

function EncadreChiffre({ chiffre, lang }) {
  const t = BREVES_TEXT[lang].home
  return (
    <div style={{ flex: 1, border: '3px double var(--border)', padding: '14px 16px' }}>
      <div style={{ ...etiquette, fontSize: 11, fontWeight: 700, color: 'var(--text2)', marginBottom: 6 }}>{t.figureLabel}</div>
      <div style={{ fontFamily: 'var(--font-bois)', fontWeight: 400, fontSize: 40, lineHeight: 1, color: 'var(--titre-gazette)', marginBottom: 4 }}>{chiffre.valeur}</div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--prose)', margin: 0 }} dangerouslySetInnerHTML={{ __html: chiffre.texte[lang] ?? chiffre.texte.fr }} />
    </div>
  )
}

// L'édition d'un jour (D4) : la une (brève "ia", à défaut la première),
// les autres brèves en colonnes, le mot et le chiffre. Utilisée par
// /breves et /breves/:date.
export function GazetteEdition({ day, lang }) {
  const narrow = useIsMobile(760)
  const t = BREVES_TEXT[lang].edition
  const ia = day.breves.find((b) => b.rubrique === 'ia') ?? day.breves[0]
  const autres = day.breves.filter((b) => b !== ia)

  return (
    <div>
      <style>{`
        .gaz-dropcap p:first-child::first-letter {
          float: left;
          font-family: var(--font-bois-3);
          font-size: 54px;
          line-height: 0.85;
          border: 2px solid var(--border);
          padding: 4px 8px 0;
          margin: 3px 10px 0 0;
        }
      `}</style>

      <div
        style={{
          display: 'inline-flex',
          gap: 8,
          alignItems: 'center',
          background: 'var(--text)',
          color: 'var(--bg2)',
          padding: '3px 12px 2px 8px',
          ...etiquette,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        <span aria-hidden="true" style={{ fontFamily: 'var(--font-body)', fontSize: 22, lineHeight: 1, textTransform: 'none', letterSpacing: 0 }}>☞</span>
        {t.kickerPrefix} · {rubriqueLabel(ia.rubrique, lang)}
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-bois)',
          fontWeight: 400,
          fontSize: 'clamp(24px, 4vw, 52px)',
          lineHeight: 1,
          textTransform: 'uppercase',
          margin: '14px 0',
          color: 'var(--text)',
        }}
        dangerouslySetInnerHTML={{ __html: ia.titre[lang] ?? ia.titre.fr }}
      />

      <div
        className="gaz-dropcap"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15.5,
          lineHeight: 1.65,
          textAlign: 'justify',
          hyphens: 'auto',
          columnCount: narrow ? 1 : 2,
          columnGap: 28,
          columnRule: '1px solid var(--muted)',
          color: 'var(--prose)',
        }}
      >
        <p dangerouslySetInnerHTML={{ __html: ia.resume[lang] ?? ia.resume.fr }} />
      </div>

      <SourcesGazette sources={ia.sources} lang={lang} />

      {autres.length > 0 && (
        <>
          <Ornement />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: narrow ? '1fr' : `repeat(auto-fit, minmax(220px, 1fr))`,
              gap: 0,
            }}
          >
            {autres.map((breve, i) => (
              <div key={i} style={{ padding: '0 20px', borderLeft: !narrow && i > 0 ? '1px solid var(--border)' : 'none', borderTop: narrow && i > 0 ? '1px solid var(--border)' : 'none', paddingTop: narrow && i > 0 ? 18 : 0, paddingLeft: narrow || i === 0 ? 0 : 20 }}>
                <div style={{ ...etiquette, fontSize: 11, fontWeight: 700, color: 'var(--titre-gazette)', marginBottom: 4 }}>
                  {rubriqueLabel(breve.rubrique, lang)}
                </div>
                <h3
                  style={{ ...BOIS_FONTS[i % BOIS_FONTS.length], fontSize: 21, lineHeight: 1.1, textTransform: BOIS_FONTS[i % BOIS_FONTS.length].fontFamily === 'var(--font-etiquette)' ? 'uppercase' : 'none', margin: '0 0 6px', color: 'var(--text)' }}
                  dangerouslySetInnerHTML={{ __html: breve.titre[lang] ?? breve.titre.fr }}
                />
                <p
                  style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, textAlign: 'justify', hyphens: 'auto', color: 'var(--prose)', margin: 0 }}
                  dangerouslySetInnerHTML={{ __html: breve.resume[lang] ?? breve.resume.fr }}
                />
                <SourcesGazette sources={breve.sources} lang={lang} />
              </div>
            ))}
          </div>
        </>
      )}

      {(day.mot || day.chiffre) && (
        <>
          <div style={{ borderTop: '3px double var(--border)', margin: '28px 0 0' }} />
          <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 'var(--space-md)', marginTop: 18 }}>
            {day.mot && <EncadreMot mot={day.mot} lang={lang} />}
            {day.chiffre && <EncadreChiffre chiffre={day.chiffre} lang={lang} />}
          </div>
        </>
      )}
    </div>
  )
}
