import { Link } from 'react-router-dom'
import useIsMobile from '../shell/useIsMobile'
import { rubriqueLabel } from '../breves/brevesText'
import { formatDateLong } from './kiosqueText'
import { getNumeros } from '../zine/numeros'

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
}

// Titre de section façon kiosque (D3) : grand titre --font-bois-2,
// sous-titre italique --font-chapo, double filet jusqu'au bord droit.
// Le filet est un simple div flexible, pas un ::after — pas besoin de
// <style> pour ça.
export function SectionTitreKiosque({ title, subtitle }) {
  const narrow960 = useIsMobile(960)
  // Un deuxième seuil, plus étroit, pour les titres longs ("Sur les
  // présentoirs") : à 28px ils débordent encore en dessous de ~420px de
  // large, même sous-titre déjà masqué par narrow960 (D9, mission
  // kiosque-finitions — pas de débordement horizontal à 375 px).
  const narrow480 = useIsMobile(480)
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, margin: '46px 0 18px' }}>
      <h2
        style={{
          fontFamily: 'var(--font-bois-2)',
          fontWeight: 400,
          fontSize: narrow480 ? 26 : narrow960 ? 28 : 40,
          textTransform: 'uppercase',
          lineHeight: 1,
          color: 'var(--text)',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </h2>
      {!narrow960 && (
        <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 20, color: 'var(--text2)', margin: 0, whiteSpace: 'nowrap' }}>
          {subtitle}
        </p>
      )}
      <div style={{ flex: 1, borderTop: '3px double var(--border)', transform: 'translateY(-8px)' }} />
    </div>
  )
}

// À la une : la Gazette du jour (D4), construite avec les vraies données
// de getDays()[0]. Rien n'est affiché si aucun jour n'existe.
export function GazetteALaUne({ day, lang, t }) {
  const narrow960 = useIsMobile(960)
  const g = t.gazette
  const ia = day.breves.find((b) => b.rubrique === 'ia') ?? day.breves[0]
  const autres = day.breves.filter((b) => b !== ia)
  const dateLongue = formatDateLong(day.date, lang)

  return (
    <section
      style={{
        background: 'var(--bg2)',
        border: '3px double var(--border)',
        padding: narrow960 ? 16 : '22px 28px 26px',
        boxShadow: narrow960 ? '5px 5px 0 var(--border)' : '8px 8px 0 var(--border)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: narrow960 ? '1fr' : '1fr auto 1fr',
          alignItems: 'end',
          gap: 16,
          borderBottom: '3px double var(--border)',
          paddingBottom: 8,
          textAlign: narrow960 ? 'center' : 'left',
        }}
      >
        <span style={{ ...etiquette, fontWeight: 700, fontSize: 12 }}>{g.editionLabel}</span>
        <h3
          style={{
            fontFamily: 'var(--font-gothique)',
            wordSpacing: 'var(--font-gothique-espace)',
            fontWeight: 400,
            fontSize: narrow960 ? 40 : 62,
            lineHeight: 1,
            textAlign: 'center',
            color: 'var(--text)',
          }}
        >
          {g.titre.map((segment, i) => (
            <span key={i} style={i % 2 === 1 ? { color: 'var(--titre-gazette)' } : undefined}>
              {segment}
            </span>
          ))}
        </h3>
        <span style={{ ...etiquette, fontWeight: 700, fontSize: 12, textAlign: narrow960 ? 'center' : 'right' }}>
          {dateLongue} · {g.prixLabel}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: narrow960 ? '1fr' : '1fr 300px', gap: 30, marginTop: 18 }}>
        <div>
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
            {g.kickerPrefix} · {rubriqueLabel(ia.rubrique, lang)}
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-bois)',
              fontWeight: 400,
              fontSize: 'clamp(24px, 3.6vw, 46px)',
              lineHeight: 1,
              textTransform: 'uppercase',
              margin: '12px 0',
              color: 'var(--text)',
            }}
            dangerouslySetInnerHTML={{ __html: ia.titre[lang] ?? ia.titre.fr }}
          />
          <p
            className="kiq-dropcap"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15.5,
              lineHeight: 1.65,
              textAlign: 'justify',
              hyphens: 'auto',
              columnCount: narrow960 ? 1 : 2,
              columnGap: 28,
              columnRule: '1px solid var(--muted)',
              color: 'var(--prose)',
            }}
            dangerouslySetInnerHTML={{ __html: ia.resume[lang] ?? ia.resume.fr }}
          />
          <Link
            to={`/breves/${day.date}`}
            style={{ display: 'inline-block', marginTop: 18, marginRight: 22, ...etiquette, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', borderBottom: '3px solid var(--titre-gazette)', paddingBottom: 2 }}
          >
            {g.lireLabel}
          </Link>
          <Link
            to="/breves"
            style={{ display: 'inline-block', marginTop: 18, ...etiquette, fontWeight: 700, fontSize: 15, color: 'var(--text)', textDecoration: 'none', borderBottom: '3px solid var(--border)', paddingBottom: 2 }}
          >
            {g.toutesLabel}
          </Link>
          {day.mot && (
            <div style={{ border: '3px double var(--border)', padding: '12px 14px', marginTop: 22 }}>
              <div style={{ ...etiquette, fontWeight: 700, fontSize: 13, textAlign: 'center', borderTop: '3px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '3px 0', marginBottom: 8 }}>
                {g.motDuJourLabel}
              </div>
              <h4 style={{ fontFamily: 'var(--font-bois-3)', fontWeight: 400, fontSize: 24, lineHeight: 1.05, marginBottom: 4, color: 'var(--text)' }}>{day.mot.terme}</h4>
              <p style={{ fontSize: 15.5, lineHeight: 1.4, color: 'var(--prose)', margin: 0 }}
                dangerouslySetInnerHTML={{ __html: day.mot.definition[lang] ?? day.mot.definition.fr }}
              />
            </div>
          )}
        </div>

        <aside
          style={{
            borderLeft: narrow960 ? 'none' : '1px solid var(--border)',
            borderTop: narrow960 ? '3px double var(--border)' : 'none',
            paddingLeft: narrow960 ? 0 : 26,
            paddingTop: narrow960 ? 16 : 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {autres.length > 0 && (
            <div>
              <div style={{ ...etiquette, fontWeight: 700, fontSize: 13, textAlign: 'center', borderTop: '3px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '3px 0', marginBottom: 10 }}>
                {g.autresBrevesLabel}
              </div>
              {autres.map((breve, i) => (
                <div key={i} style={{ paddingBottom: 12, borderBottom: i < autres.length - 1 ? '1px dotted var(--muted)' : 'none', marginBottom: i < autres.length - 1 ? 12 : 0 }}>
                  <div style={{ ...etiquette, fontWeight: 700, fontSize: 12, color: 'var(--titre-gazette)' }}>{rubriqueLabel(breve.rubrique, lang)}</div>
                  <h4 style={{ fontFamily: 'var(--font-bois-2)', fontWeight: 400, fontSize: 19, lineHeight: 1.1, margin: '2px 0 4px', color: 'var(--text)' }}
                    dangerouslySetInnerHTML={{ __html: breve.titre[lang] ?? breve.titre.fr }}
                  />
                  <p style={{ fontSize: 15.5, lineHeight: 1.4, color: 'var(--prose)', margin: 0 }}
                    dangerouslySetInnerHTML={{ __html: breve.resume[lang] ?? breve.resume.fr }}
                  />
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

// Carte de couverture commune aux 4 présentoirs (D5) : le lien (ou span
// aria-disabled pour le Zine), la couverture, la légende dessous. Le
// survol (translateY + ombre) est en CSS (classe .kiq-couv), désactivé
// sous prefers-reduced-motion — voir le <style> de KiosqueHome.
function CarteCouverture({ to, children, legendeNom, legendeRythme }) {
  const contenu = (
    <>
      <div className="kiq-couv" style={{ aspectRatio: '3 / 4.1', border: '3px solid var(--border)', position: 'relative', overflow: 'hidden', boxShadow: '6px 6px 0 var(--primitive-encre-a18)' }}>
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 10, borderTop: '12px solid var(--border)', paddingTop: 8 }}>
        <b style={{ ...etiquette, fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{legendeNom}</b>
        <span style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 16, color: 'var(--text2)' }}>{legendeRythme}</span>
      </div>
    </>
  )

  const commonStyle = { display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }

  if (!to) {
    return <span className="kiq-couv-link" aria-disabled="true" style={{ ...commonStyle, cursor: 'not-allowed' }}>{contenu}</span>
  }
  return <Link className="kiq-couv-link" to={to} style={commonStyle}>{contenu}</Link>
}

// Sans numéro, la couverture garde son étoile « Bientôt ! » ; dès que
// getNumeros() renvoie un numéro, elle affiche son "#NN" et son titre à la
// place, et la légende perd son "bientôt" (D6, mission kiosque-finitions).
function CouvertureZine({ t, lang }) {
  const p = t.presentoirs.zine
  const dernier = getNumeros()[0]
  const numeroAffiche = dernier ? `#${String(dernier.numero).padStart(2, '0')}` : p.tetiereNumero
  const legendeRythme = dernier ? p.legendeRythmeAvecNumero : p.legendeRythme
  return (
    <CarteCouverture to={dernier ? `/zine/${dernier.numero}` : null} legendeNom={p.legendeNom} legendeRythme={legendeRythme}>
      <div style={{ background: 'var(--titre-zine)', height: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '22%', borderBottom: '3px solid var(--border)', padding: '10px 12px', zIndex: 3, background: 'var(--titre-zine)' }}>
          <b style={{ fontFamily: 'var(--primitive-font-anton)', fontSize: 40, lineHeight: 0.85, textTransform: 'uppercase', display: 'block', color: 'var(--text)' }}>{p.tetiereNom[0]}<br />{p.tetiereNom[1]}</b>
          <span style={{ position: 'absolute', right: 12, top: 10, fontFamily: 'var(--font-bd)', fontWeight: 700, fontStyle: 'italic', fontSize: 16, textTransform: 'uppercase', color: 'var(--text)' }}>{numeroAffiche}</span>
        </div>
        {/* Trame de points en CSS pur, sans aucune image (D7). */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, top: '22%',
            backgroundColor: 'var(--border)',
            backgroundImage: 'radial-gradient(var(--titre-zine) 1.4px, transparent 1.6px)',
            backgroundSize: '9px 9px',
          }}
        />
        {dernier ? (
          <div style={{ position: 'absolute', left: 12, right: 12, bottom: 14, background: 'var(--bg2)', border: '3px solid var(--border)', boxShadow: '3px 3px 0 var(--border)', padding: '10px 12px', transform: 'rotate(-2deg)' }}>
            <span style={{ fontFamily: 'var(--font-bd)', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(13px, 1.5vw, 17px)', lineHeight: 1.15, textTransform: 'uppercase', color: 'var(--text)', display: 'block', overflowWrap: 'anywhere' }}>
              {dernier.titre[lang] ?? dernier.titre.fr}
            </span>
          </div>
        ) : (
          <div aria-hidden="true" style={{ position: 'absolute', left: 12, bottom: 14, transform: 'rotate(-10deg)', filter: 'drop-shadow(2px 2px 0 var(--border)) drop-shadow(-1.5px -1.5px 0 var(--border))' }}>
            <div
              style={{
                width: 'clamp(84px, 42%, 124px)', aspectRatio: '1',
                clipPath: 'polygon(100.0% 50.0%, 88.4% 56.8%, 97.0% 67.1%, 83.8% 69.5%, 88.3% 82.1%, 75.1% 79.9%, 75.0% 93.3%, 63.3% 86.6%, 58.7% 99.2%, 50.0% 89.0%, 41.3% 99.2%, 36.7% 86.6%, 25.0% 93.3%, 24.9% 79.9%, 11.7% 82.1%, 16.2% 69.5%, 3.0% 67.1%, 11.6% 56.8%, 0.0% 50.0%, 11.6% 43.2%, 3.0% 32.9%, 16.2% 30.5%, 11.7% 17.9%, 24.9% 20.1%, 25.0% 6.7%, 36.7% 13.4%, 41.3% 0.8%, 50.0% 11.0%, 58.7% 0.8%, 63.3% 13.4%, 75.0% 6.7%, 75.1% 20.1%, 88.3% 17.9%, 83.8% 30.5%, 97.0% 32.9%, 88.4% 43.2%)',
                background: 'var(--bg2)',
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-bd)', fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(11px, 1.05vw, 15px)', lineHeight: 1, textTransform: 'uppercase', color: 'var(--text)' }}>{p.bientot}</span>
            </div>
          </div>
        )}
      </div>
    </CarteCouverture>
  )
}

function CouvertureJeux({ lang, t, jeux }) {
  const p = t.presentoirs.jeux
  return (
    <CarteCouverture to="/jeux" legendeNom={p.legendeNom} legendeRythme={p.legendeRythme}>
      <div
        style={{
          background: '#111',
          color: '#f4f0e6',
          padding: 12,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid var(--titre-jeux)', paddingBottom: 8 }}>
          <b style={{ fontFamily: 'var(--font-pixel)', fontWeight: 400, fontSize: 15, lineHeight: 1.3, color: 'var(--titre-jeux)' }}>{p.titre}</b>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 7, lineHeight: 1.5, textAlign: 'right' }}>{p.sousTitre[0]}<br />{p.sousTitre[1]}</span>
        </div>
        <div style={{ margin: '10px 0 8px', background: '#0b1a10', border: '4px solid #2a2a2a', borderRadius: '14px / 18px', aspectRatio: '4 / 3', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 22px rgba(0,0,0,.9)', display: 'grid', placeItems: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(rgba(0,0,0,.35) 0 1px, transparent 1px 3px)' }} />
          <div style={{ position: 'absolute', top: 6, left: 8, right: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: 7, color: '#7dff9a' }}>
            <span>1UP 000300</span><span>HI 999990</span>
          </div>
          <div
            aria-hidden="true"
            style={{
              width: 4, height: 4, color: 'var(--titre-jeux)', transform: 'translate(-20px, -16px) scale(1.6)',
              boxShadow: `8px 0, 32px 0, 12px 4px, 28px 4px, 8px 8px, 12px 8px, 16px 8px, 20px 8px, 24px 8px, 28px 8px, 32px 8px,
                4px 12px, 8px 12px, 16px 12px, 20px 12px, 24px 12px, 32px 12px, 36px 12px,
                0 16px, 4px 16px, 8px 16px, 12px 16px, 16px 16px, 20px 16px, 24px 16px, 28px 16px, 32px 16px, 36px 16px, 40px 16px,
                0 20px, 8px 20px, 12px 20px, 16px 20px, 20px 20px, 24px 20px, 28px 20px, 32px 20px, 40px 20px,
                0 24px, 8px 24px, 32px 24px, 40px 24px, 12px 28px, 16px 28px, 24px 28px, 28px 28px`,
            }}
          />
          <div className="kiq-insert" style={{ position: 'absolute', bottom: 8, fontFamily: 'var(--font-pixel)', fontSize: 8, color: '#ffd84a' }}>INSERT COIN</div>
        </div>
        <ul style={{ listStyle: 'none', fontFamily: 'var(--font-ecran)', fontWeight: 400, fontSize: 21, lineHeight: 1.05, marginTop: 'auto', padding: 0 }}>
          {jeux.map((jeu, i) => (
            <li key={jeu.slug} style={{ padding: '2px 0 2px 18px', textTransform: 'uppercase' }}>
              {i === 0 && <span aria-hidden="true" style={{ marginLeft: -18, marginRight: 4, color: 'var(--titre-jeux)' }}>▶</span>}
              {jeu.titre[lang] ?? jeu.titre.fr}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-pixel)', fontSize: 7, color: '#aaa', marginTop: 6 }}>
          <span>{p.joueurs}</span>
        </div>
      </div>
    </CarteCouverture>
  )
}

function CouvertureLab({ t, nbProjets }) {
  const p = t.presentoirs.lab
  return (
    <CarteCouverture to="/lab" legendeNom={p.legendeNom} legendeRythme={p.legendeRythme}>
      <div style={{ background: '#d8c094', fontFamily: 'var(--font-machine)', height: '100%', position: 'relative', color: 'var(--text)' }}>
        <div style={{ position: 'absolute', top: 0, right: 16, background: '#c9ae7c', border: '3px solid var(--border)', borderTop: 0, padding: '5px 12px', fontSize: 12, letterSpacing: '0.08em' }}>
          {p.onglet}
        </div>
        <div style={{ position: 'absolute', top: 38, left: 14, right: 14, background: '#fbf6ea', border: '2px solid var(--border)', padding: '10px 12px 8px' }}>
          <h5 style={{ fontFamily: 'var(--font-machine)', fontWeight: 400, fontSize: 22, lineHeight: 1, letterSpacing: '0.04em', margin: 0 }}>{p.etiquetteTitre}</h5>
          <p style={{ fontSize: 11.5, lineHeight: 1.5, marginTop: 4, borderTop: '1px solid var(--border)', paddingTop: 4 }}>
            {p.agent}<br />{p.classement}<br />{p.piecesLabel}{nbProjets}
          </p>
        </div>
        <div style={{ position: 'absolute', right: 6, bottom: 24, zIndex: 2, background: 'rgba(216,192,148,.55)', border: '3px solid var(--titre-lab)', color: 'var(--titre-lab)', fontFamily: 'var(--font-machine)', fontSize: 17, lineHeight: 1, letterSpacing: '0.08em', padding: '6px 10px 4px', transform: 'rotate(-14deg)', textAlign: 'center', opacity: 0.9 }}>
          <s>{p.tamponBarre}</s><br />{p.tamponBas}
        </div>
      </div>
    </CarteCouverture>
  )
}

// Sur les présentoirs : les 3 couvertures (D5), grille 3 / 2 / 1 colonnes.
export function Presentoirs({ lang, t, jeux, nbProjets }) {
  const narrow960 = useIsMobile(960)
  const narrow520 = useIsMobile(520)
  const columns = narrow520 ? 1 : narrow960 ? 2 : 3

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: narrow960 ? '26px 16px' : 30 }}>
      <CouvertureZine t={t} lang={lang} />
      <CouvertureJeux lang={lang} t={t} jeux={jeux} />
      <CouvertureLab t={t} nbProjets={nbProjets} />
    </div>
  )
}

// Bulletin d'abonnement (D6) : une case par entrée de FEEDS.
export function Bulletin({ lang, t, feeds }) {
  const narrow960 = useIsMobile(960)
  return (
    <section
      style={{
        margin: '60px 0 0',
        border: '3px dashed var(--border)',
        padding: narrow960 ? '22px 18px' : '26px 30px',
        position: 'relative',
        background: 'var(--bg2)',
        display: 'grid',
        gridTemplateColumns: narrow960 ? '1fr' : '1fr 1.4fr',
        gap: 30,
        alignItems: 'center',
      }}
    >
      <span aria-hidden="true" style={{ position: 'absolute', top: -17, left: 30, background: 'var(--bg)', padding: '0 8px', fontSize: 24 }}>✂</span>
      <div>
        <h3 style={{ fontFamily: 'var(--font-bois)', fontWeight: 400, fontSize: 32, lineHeight: 0.95, textTransform: 'uppercase', color: 'var(--text)' }}>{t.bulletin.titre}</h3>
        <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 18, marginTop: 8, color: 'var(--text2)' }}>{t.bulletin.phrase}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: narrow960 ? '1fr' : '1fr 1fr', gap: '10px 22px' }}>
        {feeds.map((feed) => (
          <Link key={feed.key} to={feed.path} className="kiq-case" style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 18, color: 'var(--text)', textDecoration: 'none', borderBottom: '1px dotted var(--muted)', paddingBottom: 6 }}>
            <span>{feed.name[lang] ?? feed.name.fr}</span>
            <small style={{ marginLeft: 'auto', ...etiquette, fontWeight: 600, fontSize: 11, color: 'var(--text2)' }}>{feed.rythme[lang] ?? feed.rythme.fr}</small>
          </Link>
        ))}
        <Link to="/suivre" style={{ display: 'flex', alignItems: 'baseline', fontSize: 18, fontWeight: 700, color: 'var(--text)', textDecoration: 'none', gridColumn: narrow960 ? 'auto' : '1 / -1', marginTop: 4 }}>
          {t.bulletin.tousLesFlux}
        </Link>
      </div>
    </section>
  )
}
