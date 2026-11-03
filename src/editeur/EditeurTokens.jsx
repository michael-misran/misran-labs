import { useEffect, useMemo, useState } from 'react'
// Le fichier source des tokens, en texte : il n'est embarqué que dans ce
// morceau chargé à la demande (/?tokens), jamais dans le site normal.
import SOURCE_TOKENS from '../styles/tokens.css?raw'
import './editeur.css'

// Éditeur de tokens en direct (idée P-020). Ouverture : ajouter ?tokens à
// n'importe quelle adresse du site (main.jsx ne télécharge ce fichier que
// dans ce cas). Le panneau liste les tokens SÉMANTIQUES de
// src/styles/tokens.css, les modifie sur la vraie page
// (document.documentElement.style.setProperty), garde les réglages dans le
// navigateur (localStorage) et copie les tokens modifiés en CSS prêt à
// coller dans tokens.css. Ce qu'on voit à l'écran = une variable CSS changée.

const CLE_REGLAGES = 'tokens-reglage'
const CLE_REPLIE = 'tokens-reglage-replie'

// Textes du panneau, en français et en anglais (même langue que le site)
const TEXTES = {
  fr: {
    titre: 'Épreuve des tokens',
    sousTitre: '1977 Éditions · tokens.css · rôles sémantiques',
    replier: 'Replier le panneau',
    deplier: 'Ouvrir l’éditeur de tokens',
    onglet: 'Tokens',
    rechercher: 'Chercher un token…',
    origine: 'Origine',
    reinitialiser: 'Réinitialiser',
    reinitialiserUn: (nom) => `Réinitialiser ${nom}`,
    toutReinitialiser: 'Tout réinitialiser',
    copier: 'Copier les valeurs',
    copie: 'Copié !',
    copieManuelle: 'Copie impossible ici : sélectionnez le texte ci-dessous.',
    enregistrer: 'Écrire dans tokens.css',
    enregistrement: 'Écriture…',
    corrections: (n) => (n ? `${n} correction${n > 1 ? 's' : ''}` : 'Aucune correction'),
    aide: 'Les réglages restent dans ce navigateur. « Copier les valeurs » donne les lignes à coller dans src/styles/tokens.css.',
    palette: 'Palette de la maison…',
    polices: 'Polices de la maison…',
    autre: 'Valeur libre',
    choisirCouleur: 'Choisir une couleur',
    transparence: 'Couleur avec transparence : modifiez le texte',
    aucun: 'Aucun token ne correspond.',
    erreur: (m) => `Erreur : ${m}`,
    groupes: {
      titres: 'Les titres de la maison',
      fonds: 'Fonds et surfaces',
      textes: 'Textes et filets',
      accents: 'Accents et états',
      polices: 'Polices',
      espaces: 'Tailles et espacements',
      formes: 'Arrondis, traits et ombres',
      casse: 'Casse et approche',
    },
  },
  en: {
    titre: 'Token proof sheet',
    sousTitre: '1977 Éditions · tokens.css · semantic roles',
    replier: 'Collapse the panel',
    deplier: 'Open the token editor',
    onglet: 'Tokens',
    rechercher: 'Find a token…',
    origine: 'Original',
    reinitialiser: 'Reset',
    reinitialiserUn: (nom) => `Reset ${nom}`,
    toutReinitialiser: 'Reset all',
    copier: 'Copy values',
    copie: 'Copied!',
    copieManuelle: 'Copying is blocked here: select the text below.',
    enregistrer: 'Write to tokens.css',
    enregistrement: 'Writing…',
    corrections: (n) => (n ? `${n} correction${n > 1 ? 's' : ''}` : 'No corrections'),
    aide: 'Settings stay in this browser. “Copy values” gives the lines to paste into src/styles/tokens.css.',
    palette: 'House palette…',
    polices: 'House fonts…',
    autre: 'Custom value',
    choisirCouleur: 'Pick a color',
    transparence: 'Color with transparency: edit the text',
    aucun: 'No token matches.',
    erreur: (m) => `Error: ${m}`,
    groupes: {
      titres: 'The house mastheads',
      fonds: 'Backgrounds and surfaces',
      textes: 'Text and rules',
      accents: 'Accents and states',
      polices: 'Fonts',
      espaces: 'Sizes and spacing',
      formes: 'Corners, strokes and shadows',
      casse: 'Case and tracking',
    },
  },
}

// Rangement des tokens sémantiques, dans cet ordre, d'après leur nom
const GROUPES = [
  { id: 'titres', test: (n) => n.startsWith('--titre-') },
  { id: 'polices', test: (n) => n.startsWith('--font-') && n !== '--font-gothique-espace' },
  { id: 'fonds', test: (n) => /^--(bg\d?|surface-.*|hover-surface|selected-surface|primary-surface)$/.test(n) },
  { id: 'textes', test: (n) => /^--(text\d?|muted|prose|border|on-.*|grid-line)$/.test(n) },
  { id: 'accents', test: (n) => /^--(primary|cyan|error|warning|violet|pink|mandarine|active-tint|hover-tint)$/.test(n) },
  { id: 'espaces', test: (n) => /^--(space-|icon-(sm|md|lg)|chrome-height|font-gothique-espace)/.test(n) },
  { id: 'formes', test: (n) => /^--(radius-|border-(thin|regular|thick)|elev-|icon-stroke)/.test(n) },
  { id: 'casse', test: (n) => /^--(label|heading)-/.test(n) },
]

// --- Lecture de tokens.css -------------------------------------------------

// Les lignes « --nom: valeur; » d'une couche du bloc :root, entre deux marques
// « --- N. » (pas celles de l'en-tête du fichier, qui citent aussi les couches)
function lireCouche(source, debutMarque, finMarque) {
  const debut = source.indexOf(debutMarque)
  const fin = source.indexOf(finMarque, debut)
  if (debut === -1 || fin === -1) return []
  return [...source.slice(debut, fin).matchAll(/^\s*(--[a-z0-9-]+):\s*([^;]+);/gm)]
    .map(([, nom, brut]) => ({ nom, brut: brut.trim() }))
}

const SEMANTIQUES = lireCouche(SOURCE_TOKENS, '--- 2. SEMANTIC', '--- 3. COMPONENT')
const PRIMITIVES = lireCouche(SOURCE_TOKENS, '--- 1. PRIMITIVE', '--- 2. SEMANTIC')

const lireCalcule = (nom) => getComputedStyle(document.documentElement).getPropertyValue(nom).trim()

function typeDe(nom, calc) {
  if (nom.startsWith('--font-') && nom !== '--font-gothique-espace') return 'police'
  if (/-transform$/.test(nom)) return 'casse'
  if (calc && !/^-?[\d.]+[a-z%]*$/.test(calc) && CSS.supports('color', calc)) return 'couleur'
  if (/^-?[\d.]+(px|em|rem|%)?$/.test(calc)) return 'nombre'
  return 'texte'
}

// Toute couleur CSS → #rrggbb pour <input type="color"> ; null si transparence
function versHex(couleur) {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = '#000'
  ctx.fillStyle = couleur
  return ctx.fillStyle.startsWith('#') ? ctx.fillStyle : null
}

// Nom de la première police d'une pile (« 'Oswald', system-ui » → Oswald)
const premierePolice = (pile) => pile.split(',')[0].replace(/['"]/g, '').trim()

// Bornes du curseur selon l'unité de la valeur d'origine
function bornes(unite, origine) {
  if (unite === 'em' || unite === 'rem') return { min: -0.5, max: Math.max(0.5, Math.abs(origine) * 2), pas: 0.005 }
  if (unite === '') return { min: 0, max: Math.max(4, origine * 2), pas: 0.1 }
  return { min: 0, max: Math.max(64, origine * 2), pas: 1 }
}

// --- Mémoire du navigateur (chaque accès protégé : navigation privée, stockage bloqué) ---

function lireReglages() {
  try {
    const brut = JSON.parse(localStorage.getItem(CLE_REGLAGES) ?? '{}')
    if (!brut || typeof brut !== 'object') return {}
    // On ne garde que des tokens sémantiques connus, avec une valeur texte
    return Object.fromEntries(Object.entries(brut).filter(([nom, v]) =>
      typeof v === 'string' && v.trim() && SEMANTIQUES.some((t) => t.nom === nom)))
  } catch {
    return {}
  }
}
function ecrireReglages(modifs) {
  try { localStorage.setItem(CLE_REGLAGES, JSON.stringify(modifs)) } catch { /* stockage indisponible */ }
}
function lireReplie() {
  try { return localStorage.getItem(CLE_REPLIE) === '1' } catch { return false }
}
function ecrireReplie(replie) {
  try { localStorage.setItem(CLE_REPLIE, replie ? '1' : '0') } catch { /* stockage indisponible */ }
}

// Langue du site : LanguageProvider la pose sur <html lang>, on la suit en direct
function useLangueSite() {
  const lire = () => (document.documentElement.lang?.startsWith('en') ? 'en' : 'fr')
  const [lang, setLang] = useState(lire)
  useEffect(() => {
    const obs = new MutationObserver(() => setLang(lire()))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] })
    return () => obs.disconnect()
  }, [])
  return lang
}

// Copie dans le presse-papiers, avec l'ancienne méthode en secours
async function copierTexte(texte) {
  try {
    await navigator.clipboard.writeText(texte)
    return true
  } catch {
    try {
      const zone = document.createElement('textarea')
      zone.value = texte
      zone.setAttribute('readonly', '')
      zone.style.cssText = 'position:fixed;opacity:0;top:0;left:0'
      document.body.appendChild(zone)
      zone.select()
      const ok = document.execCommand('copy')
      zone.remove()
      return ok
    } catch {
      return false
    }
  }
}

// --- Une ligne du panneau ----------------------------------------------------

function LigneToken({ t, txt, valeur, calc, origine, type, modifie, options, onChange, onReinit }) {
  const hex = type === 'couleur' ? versHex(calc) : null
  const nombre = type === 'nombre' ? calc.match(/^(-?[\d.]+)([a-z%]*)$/) : null
  const nombreOrigine = type === 'nombre' ? parseFloat(origine.calc) || 0 : 0
  const b = nombre ? bornes(nombre[2], nombreOrigine) : null
  const choixListe = options.find((o) => valeur === `var(${o.nom})`)?.nom ?? ''
  return (
    <div className={`et-token${modifie ? ' et-modifie' : ''}`}>
      <div className="et-nom">
        <code>{t.nom}</code>
        {type === 'couleur' && <span className="et-pastille-apercu" style={{ background: calc }} aria-hidden="true" />}
        {type === 'police' && <span className="et-apercu-police" style={{ fontFamily: calc }} aria-hidden="true">Ag</span>}
        {modifie && (
          <button type="button" className="et-reinit" onClick={onReinit} title={txt.reinitialiserUn(t.nom)} aria-label={txt.reinitialiserUn(t.nom)}>
            ↺ <span>{txt.reinitialiser}</span>
          </button>
        )}
      </div>

      <div className="et-controles">
        {type === 'couleur' && (
          <input
            type="color"
            className="et-couleur"
            value={hex ?? '#000000'}
            disabled={!hex}
            title={hex ? txt.choisirCouleur : txt.transparence}
            aria-label={`${txt.choisirCouleur} — ${t.nom}`}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {nombre && (
          <input
            type="range"
            className="et-curseur"
            min={Math.min(b.min, parseFloat(nombre[1]))}
            max={Math.max(b.max, parseFloat(nombre[1]))}
            step={b.pas}
            value={parseFloat(nombre[1])}
            aria-label={t.nom}
            onChange={(e) => onChange(`${Math.round(parseFloat(e.target.value) * 1000) / 1000}${nombre[2]}`)}
          />
        )}
        {type === 'casse' && (
          <select value={['uppercase', 'none', 'lowercase', 'capitalize'].includes(valeur) ? valeur : ''} onChange={(e) => e.target.value && onChange(e.target.value)} aria-label={t.nom}>
            <option value="">{valeur}</option>
            {['uppercase', 'none', 'lowercase', 'capitalize'].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        )}
        {options.length > 0 && (
          <select
            className={type === 'police' ? 'et-liste-polices' : ''}
            value={choixListe}
            onChange={(e) => e.target.value && onChange(`var(${e.target.value})`)}
            aria-label={`${type === 'police' ? txt.polices : txt.palette} — ${t.nom}`}
          >
            <option value="">{choixListe ? txt.autre : (type === 'police' ? txt.polices : txt.palette)}</option>
            {options.map((o) => (
              <option key={o.nom} value={o.nom}>
                {type === 'police' ? premierePolice(o.calc) : `${o.nom.replace(/^--primitive-/, '')} · ${o.calc}`}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          className="et-texte"
          value={valeur}
          spellCheck={false}
          aria-label={t.nom}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {/* Valeur d'origine, telle qu'écrite dans tokens.css et telle que calculée */}
      <div className="et-origine">
        <span>{txt.origine} :</span>{' '}
        <span className={modifie ? 'et-barre' : ''}>{t.brut}</span>
        {origine.calc && origine.calc !== t.brut && (
          <span className="et-calc"> = {type === 'police' ? premierePolice(origine.calc) : origine.calc}</span>
        )}
      </div>
    </div>
  )
}

// --- Le panneau --------------------------------------------------------------

export default function EditeurTokens() {
  const lang = useLangueSite()
  const txt = TEXTES[lang]
  const racine = document.documentElement

  // Valeurs d'origine : lues AVANT d'appliquer les réglages gardés (surcharges retirées)
  const [origines] = useState(() => {
    const m = {}
    SEMANTIQUES.forEach((t) => { racine.style.removeProperty(t.nom) })
    SEMANTIQUES.forEach((t) => { m[t.nom] = { calc: lireCalcule(t.nom) } })
    PRIMITIVES.forEach((t) => { m[t.nom] = { calc: lireCalcule(t.nom) } })
    return m
  })
  // Réglages en cours (nom → valeur), repris du navigateur et appliqués tout de suite
  const [modifs, setModifs] = useState(() => {
    const gardes = lireReglages()
    Object.entries(gardes).forEach(([nom, v]) => racine.style.setProperty(nom, v))
    return gardes
  })
  const [replie, setReplie] = useState(lireReplie)
  const [recherche, setRecherche] = useState('')
  const [etat, setEtat] = useState(null) // 'copie' | 'manuel' | 'ecriture' | message d'erreur
  const [texteCopie, setTexteCopie] = useState('')

  useEffect(() => { ecrireReglages(modifs) }, [modifs])
  useEffect(() => { ecrireReplie(replie) }, [replie])

  // Valeurs calculées actuelles (relues à chaque réglage : les alias en cascade suivent).
  // Les surcharges sont posées sur :root dans les gestionnaires, avant ce rendu.
  const calcs = useMemo(() => {
    const m = {}
    SEMANTIQUES.forEach((t) => { m[t.nom] = t.nom in modifs ? lireCalcule(t.nom) : origines[t.nom].calc })
    return m
  }, [modifs, origines])

  const types = useMemo(() => Object.fromEntries(
    SEMANTIQUES.map((t) => [t.nom, typeDe(t.nom, origines[t.nom].calc)]),
  ), [origines])

  // Listes de choix : la palette et les polices des primitives
  const palette = useMemo(() => PRIMITIVES
    .filter((p) => typeDe(p.nom, origines[p.nom].calc) === 'couleur' && !p.nom.startsWith('--primitive-font-'))
    .map((p) => ({ nom: p.nom, calc: origines[p.nom].calc })), [origines])
  const polices = useMemo(() => PRIMITIVES
    .filter((p) => p.nom.startsWith('--primitive-font-'))
    .map((p) => ({ nom: p.nom, calc: origines[p.nom].calc })), [origines])

  const modifier = (nom, valeur) => {
    racine.style.setProperty(nom, valeur)
    setModifs((m) => ({ ...m, [nom]: valeur }))
    setEtat(null)
  }
  const reinitialiser = (nom) => {
    racine.style.removeProperty(nom)
    setModifs((m) => Object.fromEntries(Object.entries(m).filter(([n]) => n !== nom)))
    setEtat(null)
  }
  const toutReinitialiser = () => {
    Object.keys(modifs).forEach((nom) => racine.style.removeProperty(nom))
    setModifs({})
    setEtat(null)
  }

  // Seulement les tokens modifiés, dans l'ordre du fichier, prêts à coller
  const css = SEMANTIQUES.filter((t) => t.nom in modifs).map((t) => `  ${t.nom}: ${modifs[t.nom].trim()};`).join('\n')
  const copier = async () => {
    const ok = await copierTexte(css)
    setTexteCopie(css)
    setEtat(ok ? 'copie' : 'manuel')
    if (ok) setTimeout(() => setEtat((e) => (e === 'copie' ? null : e)), 1600)
  }

  // En local seulement (npm run dev) : écrire les valeurs dans tokens.css
  // (scripts/editeur-tokens.js), puis recharger la page sur le fichier à jour.
  const enregistrer = async () => {
    setEtat('ecriture')
    try {
      const r = await fetch('/__tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes: modifs }),
      }).then((x) => x.json())
      if (r.error) throw new Error(r.error)
      const restants = Object.fromEntries(Object.entries(modifs).filter(([nom]) => !r.ecrits.includes(nom)))
      ecrireReglages(restants)
      window.location.reload()
    } catch (err) {
      setEtat(txt.erreur(err.message))
    }
  }

  const nb = Object.keys(modifs).length

  if (replie) {
    return (
      <button type="button" className="et-onglet" onClick={() => setReplie(false)} aria-label={txt.deplier}>
        <span className="et-onglet-titre">{txt.onglet}</span>
        {nb > 0 && <span className="et-onglet-nb">{nb}</span>}
      </button>
    )
  }

  // Chaque token dans le premier groupe qui le reconnaît ; les tokens ajoutés
  // plus tard dans tokens.css sans groupe connu vont dans « Autres », à la fin
  const q = recherche.trim().toLowerCase()
  const groupeDe = (nom) => GROUPES.find((g) => g.test(nom))?.id ?? 'autres'
  const groupes = [...GROUPES.map((g) => g.id), 'autres']
    .map((id) => ({ id, tokens: SEMANTIQUES.filter((t) => groupeDe(t.nom) === id && (!q || t.nom.includes(q))) }))
    .filter((g) => g.tokens.length > 0)

  return (
    <aside className="et-panneau" aria-label={txt.titre} lang={lang}>
      <header className="et-entete">
        <div>
          <h2 className="et-titre">{txt.titre}</h2>
          <p className="et-sous-titre">{txt.sousTitre}</p>
        </div>
        <button type="button" className="et-replier" onClick={() => setReplie(true)} aria-label={txt.replier} title={txt.replier}>–</button>
      </header>

      <div className="et-recherche">
        <input type="search" placeholder={txt.rechercher} value={recherche} onChange={(e) => setRecherche(e.target.value)} aria-label={txt.rechercher} />
      </div>

      <div className="et-liste">
        {groupes.length === 0 && <p className="et-vide">{txt.aucun}</p>}
        {groupes.map((g, i) => {
          const nbGroupe = g.tokens.filter((t) => t.nom in modifs).length
          return (
            <details key={g.id} className="et-groupe" open={i === 0 || Boolean(q)}>
              <summary>
                <span>{txt.groupes[g.id] ?? (lang === 'fr' ? 'Autres' : 'Others')}</span>
                <span className="et-groupe-nb">{nbGroupe ? `✎ ${nbGroupe}` : g.tokens.length}</span>
              </summary>
              {g.tokens.map((t) => {
                const type = types[t.nom]
                const options = type === 'couleur' ? palette : type === 'police' ? polices : []
                return (
                  <LigneToken
                    key={t.nom}
                    t={t}
                    txt={txt}
                    valeur={modifs[t.nom] ?? t.brut}
                    calc={calcs[t.nom]}
                    origine={origines[t.nom]}
                    type={type}
                    modifie={t.nom in modifs}
                    options={options}
                    onChange={(v) => modifier(t.nom, v)}
                    onReinit={() => reinitialiser(t.nom)}
                  />
                )
              })}
            </details>
          )
        })}
      </div>

      <footer className="et-pied">
        <p className="et-etat" role="status">
          {etat === 'copie' ? txt.copie
            : etat === 'manuel' ? txt.copieManuelle
              : etat === 'ecriture' ? txt.enregistrement
                : etat ?? txt.corrections(nb)}
        </p>
        {etat === 'manuel' && <textarea className="et-copie-manuelle" readOnly value={texteCopie} rows={Math.min(6, nb + 1)} onFocus={(e) => e.target.select()} />}
        <div className="et-boutons">
          <button type="button" className="et-bouton et-principal" onClick={copier} disabled={!nb}>
            {etat === 'copie' ? txt.copie : txt.copier}
          </button>
          <button type="button" className="et-bouton" onClick={toutReinitialiser} disabled={!nb}>{txt.toutReinitialiser}</button>
          {import.meta.env.DEV && (
            <button type="button" className="et-bouton" onClick={enregistrer} disabled={!nb || etat === 'ecriture'}>{txt.enregistrer}</button>
          )}
        </div>
        <p className="et-aide">{txt.aide}</p>
      </footer>
    </aside>
  )
}
