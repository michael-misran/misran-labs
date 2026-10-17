import { useEffect, useMemo, useRef, useState } from 'react'
import './editeur.css'

// Éditeur de tokens (dev seulement, chargé par main.jsx) : un panneau qui
// modifie en direct les variables de src/styles/tokens.css sur la vraie
// page, puis les réécrit dans le fichier (scripts/editeur-tokens.js).
// Ouverture : /?tokens (gardé pour la session) ou Ctrl+Alt+T.
// Ce qu'on voit à l'écran = ce que fait le code : une variable CSS changée.

const COUCHES = [
  { id: 'semantic', titre: 'Rôles' },
  { id: 'component', titre: 'Composants' },
  { id: 'primitive', titre: 'Valeurs brutes' },
]
const TYPES = [
  { id: 'tous', titre: 'Tout' },
  { id: 'couleur', titre: 'Couleurs' },
  { id: 'police', titre: 'Polices' },
  { id: 'dimension', titre: 'Dimensions' },
  { id: 'autre', titre: 'Autres' },
]
const CLE_OUVERT = 'editeur-tokens-ouvert'

// Lecture du bloc :root : chaque token avec sa couche et le titre du
// commentaire qui le précède (sa rubrique dans le fichier)
function lireTokens(source) {
  const debut = source.indexOf(':root {')
  const fin = source.indexOf('\n}', debut)
  const lignes = source.slice(debut, fin).split('\n')
  const tokens = []
  let couche = 'primitive'
  let rubrique = ''
  let dansCommentaire = false
  for (const ligne of lignes) {
    const l = ligne.trim()
    if (dansCommentaire || l.startsWith('/*')) {
      if (l.includes('1. PRIMITIVE')) couche = 'primitive'
      if (l.includes('2. SEMANTIC')) couche = 'semantic'
      if (l.includes('3. COMPONENT')) couche = 'component'
      if (!dansCommentaire) {
        // Première ligne du commentaire = titre de la rubrique
        rubrique = l.replace(/^\/\*\s*/, '').replace(/\*\/$/, '').replace(/-{3,}.*$/, '').replace(/^---\s*/, '').trim()
      }
      dansCommentaire = !l.includes('*/')
      continue
    }
    const m = l.match(/^(--[a-z0-9-]+):\s*(.+);$/)
    if (m) tokens.push({ nom: m[1], brut: m[2], couche, rubrique })
  }
  return tokens
}

function valeurCalculee(nom) {
  return getComputedStyle(document.documentElement).getPropertyValue(nom).trim()
}

function typeDe(t, calc) {
  if (/^--(primitive-)?font-/.test(t.nom) && !t.nom.includes('espace')) return 'police'
  if (calc && CSS.supports('color', calc) && !/^-?[\d.]+$/.test(calc)) return 'couleur'
  if (/^-?[\d.]+(px|em|rem|%)$/.test(calc)) return 'dimension'
  return 'autre'
}

// #rgb / #rrggbb / rgb() → #rrggbb pour <input type="color"> ; null si transparence
function versHex(couleur) {
  const c = document.createElement('canvas').getContext('2d')
  c.fillStyle = '#000'
  c.fillStyle = couleur
  const v = c.fillStyle
  return v.startsWith('#') ? v : null
}

// Nom de la première police d'une pile, pour l'aperçu
const premierePolice = (pile) => pile.split(',')[0].replace(/['"]/g, '').trim()

function LigneToken({ t, valeur, calc, type, modifie, options, onChange, onRemettre }) {
  const hex = type === 'couleur' ? versHex(calc) : null
  const reference = valeur.match(/^var\((--[a-z0-9-]+)\)$/)?.[1]
  return (
    <div className={`et-token${modifie ? ' et-modifie' : ''}`}>
      <div className="et-nom">
        <code>{t.nom}</code>
        {modifie && <button type="button" className="et-remettre" onClick={onRemettre} title="Remettre la valeur du fichier">↺</button>}
      </div>
      <div className="et-controles">
        {type === 'couleur' && (
          <input
            type="color"
            className="et-pastille"
            value={hex ?? '#000000'}
            disabled={!hex}
            title={hex ? 'Choisir une couleur' : 'Couleur avec transparence : modifiez le texte'}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {type === 'police' && <span className="et-apercu-police" style={{ fontFamily: calc }}>Ag</span>}
        {type === 'dimension' && <span className="et-apercu-dim" style={{ borderRadius: calc, width: 18, height: 18 }} />}
        {/* Alias vers un autre token : liste des tokens de même nature */}
        {options.length > 0 && (
          <select value={reference ?? ''} onChange={(e) => e.target.value && onChange(`var(${e.target.value})`)}>
            <option value="">{reference ? '' : 'Valeur libre'}</option>
            {options.map((o) => (
              <option key={o.nom} value={o.nom}>{o.nom.replace(/^--primitive-/, '')} · {type === 'police' ? premierePolice(o.calc) : o.calc}</option>
            ))}
          </select>
        )}
        <input
          type="text"
          className="et-texte"
          value={valeur}
          spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {reference && <div className="et-resolu">= {type === 'police' ? premierePolice(calc) : calc}</div>}
    </div>
  )
}

function Panneau({ onFermer }) {
  const [tokens, setTokens] = useState([])
  const [erreur, setErreur] = useState(null)
  const [couche, setCouche] = useState('semantic')
  const [type, setType] = useState('tous')
  const [recherche, setRecherche] = useState('')
  // Modifications en cours : nom → nouvelle valeur (appliquées en direct sur :root)
  const [modifs, setModifs] = useState({})
  const [etat, setEtat] = useState(null)
  // Valeurs calculées, relues après chaque modification (les alias en cascade suivent)
  const [tic, setTic] = useState(0)
  // Fermeture du panneau : les modifications non enregistrées disparaissent de la page
  const modifsRef = useRef(modifs)
  modifsRef.current = modifs
  useEffect(() => () => {
    Object.keys(modifsRef.current).forEach((nom) => document.documentElement.style.removeProperty(nom))
  }, [])

  const charger = () => fetch('/__tokens')
    .then((r) => r.json())
    .then(({ source }) => setTokens(lireTokens(source)))
    .catch(() => setErreur('Serveur de dev injoignable : lancez npm run dev.'))
  useEffect(() => { charger() }, [])
  // tokens.css modifié ailleurs (éditeur de code, Claude, retour en arrière) : on relit le fichier
  useEffect(() => {
    if (!import.meta.hot) return undefined
    const surMaj = ({ updates }) => {
      if (updates.some((u) => u.path.includes('tokens.css'))) charger().then(() => setTic((n) => n + 1))
    }
    import.meta.hot.on('vite:afterUpdate', surMaj)
    return () => import.meta.hot.off?.('vite:afterUpdate', surMaj)
  }, [])

  const calcs = useMemo(() => {
    const m = {}
    tokens.forEach((t) => { m[t.nom] = valeurCalculee(t.nom) })
    return m
    // tic : relire après chaque modification
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, tic])
  const types = useMemo(() => {
    const m = {}
    tokens.forEach((t) => { m[t.nom] = typeDe(t, calcs[t.nom]) })
    return m
  }, [tokens, calcs])

  const modifier = (nom, valeur) => {
    document.documentElement.style.setProperty(nom, valeur)
    setModifs((m) => ({ ...m, [nom]: valeur }))
    setEtat(null)
    requestAnimationFrame(() => setTic((n) => n + 1))
  }
  const remettre = (nom) => {
    document.documentElement.style.removeProperty(nom)
    setModifs((m) => Object.fromEntries(Object.entries(m).filter(([n]) => n !== nom)))
    requestAnimationFrame(() => setTic((n) => n + 1))
  }
  const toutAnnuler = () => Object.keys(modifs).forEach(remettre)

  const enregistrer = async () => {
    setEtat('enregistrement')
    try {
      const r = await fetch('/__tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes: modifs }),
      }).then((x) => x.json())
      if (r.error) throw new Error(r.error)
      // Le fichier porte maintenant ces valeurs (rechargé par Vite) : on retire les surcharges
      r.ecrits.forEach((nom) => document.documentElement.style.removeProperty(nom))
      setModifs((m) => Object.fromEntries(Object.entries(m).filter(([nom]) => !r.ecrits.includes(nom))))
      await charger()
      setEtat(r.inconnus.length ? `Refusés : ${r.inconnus.join(', ')}` : `${r.ecrits.length} token(s) écrit(s) dans tokens.css`)
    } catch (err) {
      setEtat(`Erreur : ${err.message}`)
    }
  }

  const q = recherche.trim().toLowerCase()
  const visibles = tokens.filter((t) =>
    (q ? t.nom.includes(q) || t.rubrique.toLowerCase().includes(q) : t.couche === couche)
    && (type === 'tous' || types[t.nom] === type))
  // Regroupement par rubrique, dans l'ordre du fichier
  const groupes = []
  visibles.forEach((t) => {
    const dernier = groupes[groupes.length - 1]
    if (dernier && dernier.rubrique === t.rubrique) dernier.tokens.push(t)
    else groupes.push({ rubrique: t.rubrique, tokens: [t] })
  })
  const nbModifs = Object.keys(modifs).length

  return (
    <aside className="et-panneau" aria-label="Éditeur de tokens">
      <header className="et-entete">
        <strong>Tokens</strong>
        <span className="et-fichier">src/styles/tokens.css</span>
        <button type="button" className="et-fermer" onClick={onFermer} aria-label="Fermer l'éditeur">×</button>
      </header>
      <div className="et-filtres">
        <input type="search" placeholder="Rechercher (nom ou rubrique)" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
        <div className="et-onglets">
          {COUCHES.map((c) => (
            <button key={c.id} type="button" className={!q && couche === c.id ? 'actif' : ''} onClick={() => { setCouche(c.id); setRecherche('') }}>{c.titre}</button>
          ))}
        </div>
        <div className="et-onglets et-types">
          {TYPES.map((x) => (
            <button key={x.id} type="button" className={type === x.id ? 'actif' : ''} onClick={() => setType(x.id)}>{x.titre}</button>
          ))}
        </div>
      </div>
      <div className="et-liste">
        {erreur && <p className="et-erreur">{erreur}</p>}
        {groupes.map((g, i) => (
          <section key={`${g.rubrique}-${i}`}>
            {g.rubrique && <h3>{g.rubrique}</h3>}
            {g.tokens.map((t) => {
              const typeT = types[t.nom]
              // Choix d'alias : les primitives de même nature (et, pour un composant, les rôles aussi)
              const options = /^var\(/.test(t.brut) || t.couche !== 'primitive'
                ? tokens.filter((o) => o.nom !== t.nom && types[o.nom] === typeT && typeT !== 'autre'
                  && (o.couche === 'primitive' || (t.couche === 'component' && o.couche === 'semantic')))
                  .map((o) => ({ nom: o.nom, calc: calcs[o.nom] }))
                : []
              return (
                <LigneToken
                  key={t.nom}
                  t={t}
                  valeur={modifs[t.nom] ?? t.brut}
                  calc={calcs[t.nom]}
                  type={typeT}
                  modifie={t.nom in modifs}
                  options={options}
                  onChange={(v) => modifier(t.nom, v)}
                  onRemettre={() => remettre(t.nom)}
                />
              )
            })}
          </section>
        ))}
        {!erreur && tokens.length > 0 && groupes.length === 0 && <p className="et-vide">Aucun token.</p>}
      </div>
      <footer className="et-pied">
        <span>{etat ?? (nbModifs ? `${nbModifs} modification(s) non enregistrée(s)` : 'Aucune modification')}</span>
        <div>
          <button type="button" onClick={toutAnnuler} disabled={!nbModifs}>Annuler</button>
          <button type="button" className="et-enregistrer" onClick={enregistrer} disabled={!nbModifs || etat === 'enregistrement'}>Enregistrer</button>
        </div>
      </footer>
    </aside>
  )
}

export default function EditeurTokens() {
  const [ouvert, setOuvert] = useState(() => {
    if (new URLSearchParams(window.location.search).has('tokens')) return true
    try { return sessionStorage.getItem(CLE_OUVERT) === '1' } catch { return false }
  })
  useEffect(() => {
    try { sessionStorage.setItem(CLE_OUVERT, ouvert ? '1' : '0') } catch { /* navigation privée */ }
  }, [ouvert])
  useEffect(() => {
    const surTouche = (e) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyT') setOuvert((o) => !o)
    }
    window.addEventListener('keydown', surTouche)
    return () => window.removeEventListener('keydown', surTouche)
  }, [])
  return ouvert ? <Panneau onFermer={() => setOuvert(false)} /> : null
}
