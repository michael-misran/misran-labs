import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../shell/LanguageContext'
import useIsMobile from '../shell/useIsMobile'
import Logo1977 from '../shell/Logo1977'
import { EDITO_TEXT } from './editoText'

// Page d'édito, calquée sur celle des DoggyBags : une page imprimée (mêmes
// couleurs en thème clair comme sombre), titre « ÉDITO » western entre deux
// logos de l'éditeur, texte et photo dans un grand aplat bleu pâle,
// coupon « J’EN VEUX PLUS ! » à découper et ours en petits caractères.

// Même papier que le fond du site : la page n'a pas de cadre visible
const PAPIER = 'var(--bg)'
const ENCRE = 'var(--primitive-encre)'
const ROUGE = 'var(--titre-gazette)'
const COUPON = 'var(--primitive-creme-pulp)'
const BLEU = 'var(--edito-bleu)'
const BLEU_PALE = 'var(--edito-bleu-pale)'

const etiquette = {
  fontFamily: 'var(--font-etiquette)',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
}

// Gros lettrage pulp rouge cerné d’encre, pour le cri du coupon
const lettragePulp = (taille) => ({
  fontFamily: 'var(--font-pulp)',
  fontSize: taille,
  lineHeight: 1,
  color: ROUGE,
  WebkitTextStroke: '.09em ' + ENCRE,
  paintOrder: 'stroke fill',
  textShadow: `.06em .06em 0 ${ENCRE}`,
  letterSpacing: '0.02em',
})

// Logo de l'éditeur tel que dans la charte (bloc 19/77 et « éditions »), encré en bleu
function LogoBleu({ largeur }) {
  return (
    <span aria-hidden="true" style={{ color: BLEU, flexShrink: 0 }}>
      <Logo1977 largeur={largeur} fond={PAPIER} titre="" />
    </span>
  )
}

// Case à cocher du coupon, cochable pour le plaisir
function Case({ libelle, taille = 13 }) {
  const [coche, setCoche] = useState(false)
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={coche}
      onClick={() => setCoche(!coche)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 6,
        background: 'none',
        border: 'none',
        padding: 0,
        textAlign: 'left',
        cursor: 'pointer',
        color: ENCRE,
        fontFamily: 'var(--font-etiquette)',
        fontWeight: 500,
        fontSize: taille,
        lineHeight: 1.25,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '1.3em', lineHeight: 1, flexShrink: 0 }}>{coche ? '☒' : '☐'}</span>
      {libelle}
    </button>
  )
}

function Colonne({ titre, cases, isNarrow }) {
  return (
    <div>
      <b style={{ ...etiquette, display: 'block', fontFamily: 'var(--font-bandeau)', fontSize: 26, letterSpacing: '0.04em', marginBottom: 8 }}>{titre}</b>
      <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr', gap: '8px 14px' }}>
        {cases.map((c) => <Case key={c} libelle={c} />)}
      </div>
    </div>
  )
}

// Version double page (écran large) : l'édito tient sur une seule planche du
// magazine. Page de gauche : bandeau et texte ; page de droite : photo, fin du
// texte, coupon et ours. Les tailles sont en cqw (largeur de la planche),
// plafonnées par --u-planche (hauteur de l'écran, voir magazine.css) pour que
// tout tienne quel que soit le format de l'écran.
const cq = (n) => `calc(${n} * min(1cqw, var(--u-planche, 1cqw)))`
// Nombre de paragraphes sur la page de gauche, le reste passe à droite près de la photo
const PARAGRAPHES_GAUCHE = 5

function EditoDouble({ t, lang }) {
  const p = t.paragraphes
  const paragraphe = {
    fontFamily: 'var(--font-edito)',
    fontSize: cq(1.5),
    lineHeight: 1.5,
    textAlign: 'justify',
    hyphens: 'auto',
    marginBottom: cq(0.9),
  }
  const logo = (largeur) => (
    <span className="edito-logo" style={{ width: cq(largeur) }}><LogoBleu largeur={100} /></span>
  )
  return (
    <article lang={lang} style={{ containerType: 'inline-size', background: PAPIER, color: ENCRE }}>
      {/* Le logo SVG suit la largeur de son conteneur (en cqw) */}
      <style>{'.edito-logo { display: block; flex-shrink: 0; } .edito-logo svg { display: block; width: 100%; height: auto; }'}</style>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: cq(6), padding: `${cq(2)} ${cq(3)} ${cq(1.2)}` }}>
        {/* ---------- Page de gauche ---------- */}
        <div>
          <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: cq(1.4) }}>
            {logo(6)}
            <h1 style={{ fontFamily: 'var(--font-edito-titre)', fontWeight: 400, fontSize: cq(6.4), lineHeight: 0.85, letterSpacing: '0.04em', textTransform: 'uppercase', color: BLEU }}>
              {t.titre}
            </h1>
            {logo(6)}
          </header>
          <div style={{ background: BLEU_PALE, padding: `${cq(1.6)} ${cq(1.8)}`, columnCount: 2, columnGap: cq(1.8) }}>
            {p.slice(0, PARAGRAPHES_GAUCHE).map((texte) => <p key={texte} style={paragraphe}>{texte}</p>)}
          </div>
        </div>

        {/* ---------- Page de droite ---------- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: cq(1.6) }}>
          <div style={{ display: 'grid', gridTemplateColumns: `${cq(17)} 1fr`, gap: cq(1.6), alignItems: 'start' }}>
            <figure>
              <img
                src="/edito/michael-masque.jpg"
                alt={lang === 'fr' ? 'Michael Misran, portant un masque de hockey' : 'Michael Misran, wearing a hockey mask'}
                width="675"
                height="900"
                style={{ display: 'block', width: '100%', height: 'auto', border: `${cq(0.45)} solid ${ENCRE}`, boxSizing: 'border-box', filter: 'grayscale(1) contrast(1.15)' }}
              />
              <figcaption style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: cq(0.95), lineHeight: 1.3, marginTop: cq(0.4) }}>
                {t.legende}
              </figcaption>
            </figure>
            <div style={{ background: BLEU_PALE, padding: `${cq(1.6)} ${cq(1.8)}`, alignSelf: 'stretch' }}>
              {p.slice(PARAGRAPHES_GAUCHE).map((texte) => <p key={texte} style={paragraphe}>{texte}</p>)}
            </div>
          </div>

          {/* Coupon à découper */}
          <section aria-label={t.coupon.cri} style={{ position: 'relative', border: `2px dashed ${ENCRE}`, background: COUPON, padding: `${cq(1.4)} ${cq(1.8)} ${cq(1.1)}` }}>
            <span aria-hidden="true" style={{ position: 'absolute', top: cq(-1.1), left: cq(1.4), fontSize: cq(1.6), background: PAPIER, padding: '0 4px', lineHeight: 1 }}>✂</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: cq(1.2) }}>
              {logo(2.6)}
              <p style={{ ...lettragePulp(cq(3)), textTransform: 'uppercase', textAlign: 'center' }}>{t.coupon.cri}</p>
              {logo(2.6)}
            </div>
            <p style={{ ...etiquette, fontWeight: 700, fontSize: cq(1.2), letterSpacing: '0.06em', textAlign: 'center', margin: `${cq(0.6)} 0 ${cq(1)}` }}>
              {t.coupon.accroche[0]}
              <span style={{ fontFamily: 'var(--font-pulp)', color: ROUGE, letterSpacing: '0.02em', WebkitTextStroke: `1px ${ENCRE}` }}>Misran Labs</span>
              {t.coupon.accroche[1]}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cq(1.8) }}>
              {[[t.coupon.moi, t.coupon.casesMoi], [t.coupon.ami, t.coupon.casesAmi]].map(([titre, cases]) => (
                <div key={titre}>
                  <b style={{ ...etiquette, display: 'block', fontFamily: 'var(--font-bandeau)', fontSize: cq(1.7), letterSpacing: '0.04em', marginBottom: cq(0.5) }}>{titre}</b>
                  <div style={{ display: 'grid', gap: cq(0.45), fontSize: cq(1) }}>
                    {cases.map((c) => <Case key={c} libelle={c} taille={cq(1)} />)}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: cq(1), paddingTop: cq(0.7), borderTop: `1px solid ${ENCRE}`, display: 'flex', flexWrap: 'wrap', gap: `${cq(0.4)} ${cq(1)}`, alignItems: 'baseline', fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: cq(1.1) }}>
              {t.coupon.renvoi}
              <Link to="/suivre" style={{ ...etiquette, fontStyle: 'normal', fontWeight: 700, fontSize: cq(1), color: ROUGE }}>{t.coupon.lien}</Link>
            </p>
          </section>

          {/* Ours, en petits caractères */}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: cq(0.85), lineHeight: 1.4, textAlign: 'justify', hyphens: 'auto' }}>
            {t.ours}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function EditoPage() {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const isNarrow = useIsMobile(600)
  const t = EDITO_TEXT[lang] ?? EDITO_TEXT.fr
  const p = t.paragraphes
  // Écran large : l'édito tient sur une double page du magazine
  if (!isMobile) return <EditoDouble t={t} lang={lang} />
  // Le texte coule sur deux colonnes équilibrées ; la photo flotte à droite à
  // partir de ce paragraphe, et le texte l'habille à gauche (comme le modèle DoggyBags)
  const ANCRE_PHOTO = 5

  // Bandeau : les capitales de « ÉDITO » font la moitié de la hauteur du logo
  // et reposent sur le bas du logo. Mesures d'Alfa Slab One : capitales = 0,792 em,
  // et avec line-height 1 la ligne de base est à 0,145 em au-dessus du bas de la boîte.
  // Le logo (viewBox 240 × 280) est encré de y = 20 à y = 270, soit 250 unités de haut.
  const tailleTitre = isNarrow ? 40 : 80
  const capitales = 0.792 * tailleTitre
  const largeurLogo = Math.round(((2 * capitales) / 250) * 240)
  // Écart entre le bas du « ÉDITIONS » du logo et le bas de son SVG (10 unités sur 280)
  const margeLogo = (10 / 240) * largeurLogo
  const decalageTitre = margeLogo - 0.145 * tailleTitre

  const paragraphe = {
    fontFamily: 'var(--font-edito)',
    fontSize: isNarrow ? 16 : 17,
    lineHeight: 1.55,
    textAlign: 'justify',
    hyphens: 'auto',
    marginBottom: 12,
  }

  return (
    <article
      lang={lang}
      style={{
        maxWidth: 920,
        margin: isNarrow ? '24px 12px 0' : '40px auto 0',
        background: PAPIER,
        color: ENCRE,
        padding: isNarrow ? '18px 14px 18px' : '28px 34px 24px',
      }}
    >
      {/* Bandeau : logo, titre western, logo */}
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: isNarrow ? 14 : 20 }}>
        <LogoBleu largeur={largeurLogo} />
        <h1
          style={{
            fontFamily: 'var(--font-edito-titre)',
            fontWeight: 400,
            fontSize: tailleTitre,
            lineHeight: 1,
            marginBottom: decalageTitre,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: BLEU,
            textAlign: 'center',
          }}
        >
          {t.titre}
        </h1>
        <LogoBleu largeur={largeurLogo} />
      </header>

      {/* Aplat bleu : texte sur deux colonnes, photo à droite habillée par le texte */}
      <div
        style={{
          background: BLEU_PALE,
          padding: isNarrow ? '18px 16px' : '26px 30px',
          columnCount: isMobile ? 1 : 2,
          columnGap: 34,
        }}
      >
        {p.map((texte, i) => (
          <Fragment key={texte}>
            {i === ANCRE_PHOTO && (
              <figure
                style={{
                  float: isNarrow ? 'none' : 'right',
                  width: isNarrow ? '78%' : '50%',
                  margin: isNarrow ? '4px 0 14px auto' : '4px 0 10px 16px',
                  breakInside: 'avoid',
                }}
              >
                <img
                  src="/edito/michael-masque.jpg"
                  alt={lang === 'fr' ? 'Michael Misran, portant un masque de hockey' : 'Michael Misran, wearing a hockey mask'}
                  width="675"
                  height="900"
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: 'auto', border: `6px solid ${ENCRE}`, boxSizing: 'border-box', filter: 'grayscale(1) contrast(1.15)' }}
                />
                <figcaption style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 13, lineHeight: 1.3, marginTop: 6, textAlign: 'right' }}>
                  {t.legende}
                </figcaption>
              </figure>
            )}
            <p style={paragraphe}>{texte}</p>
          </Fragment>
        ))}
      </div>

      {/* Coupon à découper */}
      <section
        aria-label={t.coupon.cri}
        style={{
          position: 'relative',
          marginTop: isNarrow ? 22 : 30,
          border: `2px dashed ${ENCRE}`,
          background: COUPON,
          padding: isNarrow ? '18px 14px 14px' : '20px 26px 18px',
        }}
      >
        <span aria-hidden="true" style={{ position: 'absolute', top: -15, left: 18, fontSize: 22, background: PAPIER, padding: '0 6px', lineHeight: 1 }}>✂</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isNarrow ? 10 : 18 }}>
          {!isNarrow && <LogoBleu largeur={40} />}
          <p style={{ ...lettragePulp(isNarrow ? 30 : 54), textTransform: 'uppercase', textAlign: 'center' }}>{t.coupon.cri}</p>
          {!isNarrow && <LogoBleu largeur={40} />}
        </div>
        <p style={{ ...etiquette, fontWeight: 700, fontSize: isNarrow ? 14 : 18, letterSpacing: '0.06em', textAlign: 'center', margin: '10px 0 16px' }}>
          {t.coupon.accroche[0]}
          <span style={{ fontFamily: 'var(--font-pulp)', color: ROUGE, letterSpacing: '0.02em', WebkitTextStroke: `1px ${ENCRE}` }}>Misran Labs</span>
          {t.coupon.accroche[1]}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 18 : 28 }}>
          <Colonne titre={t.coupon.moi} cases={t.coupon.casesMoi} isNarrow={isNarrow} />
          <Colonne titre={t.coupon.ami} cases={t.coupon.casesAmi} isNarrow={isNarrow} />
        </div>
        <p style={{ marginTop: 16, paddingTop: 10, borderTop: `1px solid ${ENCRE}`, display: 'flex', flexWrap: 'wrap', gap: '6px 12px', alignItems: 'baseline', fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 15 }}>
          {t.coupon.renvoi}
          <Link to="/suivre" style={{ ...etiquette, fontStyle: 'normal', fontWeight: 700, fontSize: 13, color: ROUGE }}>{t.coupon.lien}</Link>
        </p>
      </section>

      {/* Ours, en petits caractères */}
      <p style={{ marginTop: 16, fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.4, textAlign: 'justify', hyphens: 'auto', color: ENCRE }}>
        {t.ours}
      </p>
    </article>
  )
}
