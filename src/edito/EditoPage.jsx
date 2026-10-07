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
function Case({ libelle }) {
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
        fontSize: 13,
        lineHeight: 1.25,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 17, lineHeight: 1, flexShrink: 0 }}>{coche ? '☒' : '☐'}</span>
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

export default function EditoPage() {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const isNarrow = useIsMobile(600)
  const t = EDITO_TEXT[lang] ?? EDITO_TEXT.fr
  const p = t.paragraphes
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
