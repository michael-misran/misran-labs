// Composants de l'univers Zine (D3, D4) : fanzine brut, noir massif, trame
// de points en CSS pur, étoile « spécial », bulles BD, rendu net (pas de
// grain papier ni de titres « abîmés » — refusés par Michael). Étoile et
// trame inspirées de la couverture Zine du kiosque (KiosqueParts.jsx),
// redéclarées ici sans l'importer (D1).
import { zt, numeroAffiche, formatMoisAnnee } from './zineText'

const bd = { fontFamily: 'var(--font-bd)', fontWeight: 700, fontStyle: 'italic', textTransform: 'uppercase' }

// Forme d'étoile à 20 pointes (même polygone que la couverture Zine du
// kiosque) : CSS pur, aucune image.
const ETOILE_CLIP = 'polygon(100.0% 50.0%, 88.4% 56.8%, 97.0% 67.1%, 83.8% 69.5%, 88.3% 82.1%, 75.1% 79.9%, 75.0% 93.3%, 63.3% 86.6%, 58.7% 99.2%, 50.0% 89.0%, 41.3% 99.2%, 36.7% 86.6%, 25.0% 93.3%, 24.9% 79.9%, 11.7% 82.1%, 16.2% 69.5%, 3.0% 67.1%, 11.6% 56.8%, 0.0% 50.0%, 11.6% 43.2%, 3.0% 32.9%, 16.2% 30.5%, 11.7% 17.9%, 24.9% 20.1%, 25.0% 6.7%, 36.7% 13.4%, 41.3% 0.8%, 50.0% 11.0%, 58.7% 0.8%, 63.3% 13.4%, 75.0% 6.7%, 75.1% 20.1%, 88.3% 17.9%, 83.8% 30.5%, 97.0% 32.9%, 88.4% 43.2%)'

// La tête de titre « MISRAN ZINE » en Anton, sur l'encre du numéro (ou
// --titre-zine par défaut).
export function MastheadZine({ lang, encre = 'var(--titre-zine)' }) {
  return (
    <header
      style={{
        background: encre,
        color: 'var(--bg)',
        border: '3px solid var(--border)',
        boxShadow: '8px 8px 0 var(--primitive-encre-a18)',
        padding: '30px 24px 26px',
        textAlign: 'center',
        marginBottom: 'var(--space-xl)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--primitive-font-anton)',
          textTransform: 'uppercase',
          fontSize: 'clamp(40px, 8vw, 72px)',
          lineHeight: 1,
          margin: 0,
          color: 'var(--text)',
        }}
      >
        {zt(lang, 'mastheadTitre')}
      </h1>
      <p style={{ ...bd, fontSize: 13, letterSpacing: '0.04em', margin: '10px 0 0', color: 'var(--text)' }}>
        {zt(lang, 'mastheadSub')}
      </p>
    </header>
  )
}

// Trame de points en CSS pur (D3, D5) : aucune image.
export function TrameDots({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--border)',
        backgroundImage: 'radial-gradient(var(--bg) 1.4px, transparent 1.6px)',
        backgroundSize: '9px 9px',
        ...style,
      }}
    />
  )
}

// Étoile « spécial » à 20 pointes, texte au centre (D3, D4).
export function Etoile({ texte }) {
  return (
    <div
      style={{
        width: 'clamp(100px, 24vw, 170px)',
        aspectRatio: '1',
        clipPath: ETOILE_CLIP,
        background: 'var(--titre-zine)',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        margin: '0 auto',
        filter: 'drop-shadow(3px 3px 0 var(--border))',
        padding: 12,
      }}
    >
      <span style={{ ...bd, fontSize: 'clamp(13px, 2vw, 18px)', lineHeight: 1.1, color: 'var(--text)' }}>{texte}</span>
    </div>
  )
}

// Bulle de BD (D3, D4) : fond clair, bordure épaisse, petite pointe.
export function Bulle({ texte }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ background: 'var(--bg2)', border: '3px solid var(--border)', borderRadius: 18, padding: '14px 20px' }}>
        <span style={{ ...bd, fontSize: 15, lineHeight: 1.35, color: 'var(--text)' }}>{texte}</span>
      </div>
      <span aria-hidden="true" style={{ position: 'absolute', left: 28, bottom: -13, width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '14px solid var(--border)' }} />
      <span aria-hidden="true" style={{ position: 'absolute', left: 31, bottom: -8, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid var(--bg2)' }} />
    </div>
  )
}

// Une page « carnet » : fond à lignes, note manuscrite en --font-chapo.
export function PageCarnet({ corps, lang }) {
  return (
    <div
      style={{
        background: 'repeating-linear-gradient(var(--bg2) 0px, var(--bg2) 27px, var(--border) 27px, var(--border) 28px, var(--bg2) 28px, var(--bg2) 54px)',
        border: '3px solid var(--border)',
        padding: '20px 24px',
        maxWidth: 560,
        margin: '0 auto',
      }}
    >
      <p style={{ fontFamily: 'var(--font-chapo)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.5, color: 'var(--text)', margin: 0 }}>
        {corps[lang] ?? corps.fr}
      </p>
    </div>
  )
}

// Une page photo : niveaux de gris + calque de points en mix-blend-mode
// si `trame` (D4), jamais une image distante.
export function PagePhoto({ src, legende, trame, lang }) {
  return (
    <figure style={{ margin: '0 auto', maxWidth: 560 }}>
      <div style={{ position: 'relative', border: '3px solid var(--border)', overflow: 'hidden' }}>
        <img
          src={src}
          alt={legende[lang] ?? legende.fr}
          style={{ display: 'block', width: '100%', filter: trame ? 'grayscale(1) contrast(1.15)' : 'none' }}
        />
        {trame && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#000 1.1px, transparent 1.3px)',
              backgroundSize: '5px 5px',
              mixBlendMode: 'multiply',
              opacity: 0.6,
            }}
          />
        )}
      </div>
      <figcaption style={{ ...bd, fontSize: 12, color: 'var(--text2)', marginTop: 8, textAlign: 'center' }}>
        {legende[lang] ?? legende.fr}
      </figcaption>
    </figure>
  )
}

// Une page dessin : rendu net, pas de trame (Michael l'a refusée).
export function PageDessin({ src, legende, lang }) {
  return (
    <figure style={{ margin: '0 auto', maxWidth: 560 }}>
      <div style={{ border: '3px solid var(--border)', overflow: 'hidden' }}>
        <img src={src} alt={legende[lang] ?? legende.fr} style={{ display: 'block', width: '100%' }} />
      </div>
      <figcaption style={{ ...bd, fontSize: 12, color: 'var(--text2)', marginTop: 8, textAlign: 'center' }}>
        {legende[lang] ?? legende.fr}
      </figcaption>
    </figure>
  )
}

// Une page texte : titre facultatif en Anton, corps en --font-body.
export function PageTexte({ titre, corps, lang }) {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      {titre && (
        <h2 style={{ fontFamily: 'var(--primitive-font-anton)', textTransform: 'uppercase', fontSize: 'clamp(20px, 3vw, 28px)', color: 'var(--text)', margin: '0 0 10px' }}>
          {titre[lang] ?? titre.fr}
        </h2>
      )}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65, color: 'var(--prose)', margin: 0 }}>
        {corps[lang] ?? corps.fr}
      </p>
    </div>
  )
}

// Une page jeu à imprimer : consigne + image facultative.
export function PageJeu({ titre, consigne, src, lang }) {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', border: '3px double var(--border)', padding: '18px 20px' }}>
      <h2 style={{ fontFamily: 'var(--primitive-font-anton)', textTransform: 'uppercase', fontSize: 'clamp(18px, 2.6vw, 24px)', color: 'var(--titre-zine)', margin: '0 0 8px' }}>
        {titre[lang] ?? titre.fr}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--prose)', margin: src ? '0 0 var(--space-sm)' : 0 }}>
        {consigne[lang] ?? consigne.fr}
      </p>
      {src && (
        <>
          <img src={src} alt="" style={{ display: 'block', width: '100%', border: '1px solid var(--border)' }} />
          <div style={{ ...bd, fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{zt(lang, 'imprimerLabel')}</div>
        </>
      )}
    </div>
  )
}

// Couverture d'un numéro, réutilisable (D3) : bandeau à l'encre du
// numéro, numéro + date, titre en Anton. Variante "vedette" (plus grande,
// avec édito) ou "grille" (petite tuile).
export function CouvertureNumero({ numero, lang, variante = 'vedette' }) {
  const vedette = variante === 'vedette'
  return (
    <div style={{ border: '3px solid var(--border)', boxShadow: vedette ? '8px 8px 0 var(--primitive-encre-a18)' : '5px 5px 0 var(--primitive-encre-a18)', background: 'var(--bg2)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: numero.encre, color: 'var(--bg)', padding: vedette ? '14px 18px 12px' : '8px 12px 7px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ ...bd, fontSize: vedette ? 13 : 10 }}>Nº {numeroAffiche(numero.numero)}</span>
        <span style={{ ...bd, fontSize: vedette ? 11 : 9 }}>{formatMoisAnnee(numero.date, lang)}</span>
      </div>
      <div style={{ padding: vedette ? '18px 20px' : '10px 12px' }}>
        <h3 style={{ fontFamily: 'var(--primitive-font-anton)', textTransform: 'uppercase', fontSize: vedette ? 'clamp(24px, 3.6vw, 36px)' : 'clamp(15px, 2.2vw, 18px)', lineHeight: 1.05, color: 'var(--text)', margin: 0 }}>
          {numero.titre[lang] ?? numero.titre.fr}
        </h3>
      </div>
    </div>
  )
}

// Dispatcheur : un bloc de `pages` → le bon composant (D4).
export function BlocZine({ bloc, lang }) {
  switch (bloc.type) {
    case 'photo':
      return <PagePhoto src={bloc.src} legende={bloc.legende} trame={bloc.trame} lang={lang} />
    case 'dessin':
      return <PageDessin src={bloc.src} legende={bloc.legende} lang={lang} />
    case 'texte':
      return <PageTexte titre={bloc.titre} corps={bloc.corps} lang={lang} />
    case 'carnet':
      return <PageCarnet corps={bloc.corps} lang={lang} />
    case 'jeu':
      return <PageJeu titre={bloc.titre} consigne={bloc.consigne} src={bloc.src} lang={lang} />
    case 'bulle':
      return <Bulle texte={bloc.texte[lang] ?? bloc.texte.fr} />
    case 'etoile':
      return <Etoile texte={bloc.texte[lang] ?? bloc.texte.fr} />
    default:
      return null
  }
}
