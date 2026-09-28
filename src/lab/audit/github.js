// Lecture d'un dépôt GitHub PUBLIC, sans compte ni jeton : module pur (ni React
// ni Vite), importable par Node. Toutes les fonctions réseau reçoivent `fetch`
// en paramètre pour pouvoir être vérifiées sans réseau. Aucune ne lève
// d'exception : les erreurs sont renvoyées sous forme { ok: false, erreur }.
// Seuls appels autorisés : api.github.com (dépôt, arborescence) et
// raw.githubusercontent.com (contenu des fichiers). Aucun en-tête d'authentification.
import { avertissement } from './outils.js'

const MAX_CANDIDATS = 20
const MAX_ECHANTILLON = 60
const TAILLE_MAX_TOKENS = 300 * 1024
const TAILLE_MAX_CODE = 200 * 1024
const PARALLELE = 6

const DOSSIERS_EXCLUS = ['node_modules', 'dist', 'build', '.next', 'vendor', 'coverage', '.git', 'exemples', 'examples', 'fixtures', 'mocks', '__mocks__']
const DOSSIERS_PRIORITAIRES = ['src', 'app', 'components', 'packages']
const EXTENSIONS_CODE = ['.css', '.scss', '.less', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte']

const bilingue = (fr, en) => ({ fr, en })

/* --- D2 Adresse ---------------------------------------------------------- */

const RE_PROPRIETAIRE = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/
const RE_DEPOT = /^[A-Za-z0-9._-]+$/

function decoder(segment) {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

// `https://github.com/<o>/<r>` (avec ou sans .git, /, /tree/<branche>[/<dossier>])
// ou `<o>/<r>`. Renvoie { proprietaire, depot, branche|null, dossier|null } ou null.
export function lireAdresse(texte) {
  if (typeof texte !== 'string') return null
  let t = texte.trim().replace(/[?#].*$/, '')
  t = t.replace(/^https?:\/\/(?:www\.)?github\.com\//i, '').replace(/^(?:www\.)?github\.com\//i, '')
  if (/^[a-z][a-z0-9+.-]*:/i.test(t)) return null // autre schéma ou autre site
  const segments = t.split('/').filter(Boolean) // ignore les segments vides (/ final, //)
  if (segments.length < 2) return null

  const proprietaire = segments[0]
  const depot = segments[1].replace(/\.git$/i, '')
  if (!RE_PROPRIETAIRE.test(proprietaire) || !RE_DEPOT.test(depot) || depot === '.' || depot === '..') return null

  let branche = null
  let dossier = null
  if (segments.length > 2) {
    if (segments[2] !== 'tree' || segments.length < 4) return null
    branche = decoder(segments[3])
    if (segments.length > 4) dossier = segments.slice(4).map(decoder).join('/')
  }
  return { proprietaire, depot, branche, dossier }
}

/* --- D4, D5 Repérage ------------------------------------------------------ */

const nomDe = (chemin) => chemin.slice(chemin.lastIndexOf('/') + 1)
const extensionDe = (chemin) => {
  const nom = nomDe(chemin)
  const i = nom.lastIndexOf('.')
  return i <= 0 ? '' : nom.slice(i).toLowerCase()
}
const segmentsDe = (chemin) => chemin.split('/').slice(0, -1) // dossiers seulement

function estExclu(chemin, taille, tailleMax) {
  const dossiers = segmentsDe(chemin)
  if (dossiers.some((d) => DOSSIERS_EXCLUS.includes(d))) return true
  const nom = nomDe(chemin).toLowerCase()
  if (nom.endsWith('.min.css') || nom === 'package.json' || nom === 'package-lock.json') return true
  if (/^tsconfig.*\.json$/.test(nom) || nom.endsWith('.lock')) return true
  return (taille ?? 0) > tailleMax
}

function estCandidatTokens(chemin) {
  const ext = extensionDe(chemin)
  const nom = nomDe(chemin).toLowerCase()
  if (ext === '.json') {
    const dossiers = segmentsDe(chemin)
    return chemin.toLowerCase().includes('token') || dossiers.some((d) => d === 'tokens' || d === 'design-tokens')
  }
  if (ext === '.css' || ext === '.scss') return /token|variables|theme|vars/.test(nom)
  return false
}

// Tri par chemin, sur les codes des caractères : même ordre partout (pas de locale).
const parChemin = (a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0)

const estTest = (chemin) =>
  /\.(test|spec)\./i.test(nomDe(chemin)) || segmentsDe(chemin).includes('__tests__')

// À partir des entrées de `git/trees` ([{ path, type, size }]), et d'un
// sous-dossier éventuel : candidats tokens (≤ 20) et échantillon de code (≤ 60).
export function reperer(arbre, dossier = null) {
  const racine = dossier ? dossier.replace(/^\/+|\/+$/g, '') : ''
  const fichiers = (Array.isArray(arbre) ? arbre : []).filter(
    (e) =>
      e && e.type === 'blob' && typeof e.path === 'string' && (racine === '' || e.path.startsWith(racine + '/'))
  )

  const tousCandidats = fichiers
    .filter((e) => !estExclu(e.path, e.size, TAILLE_MAX_TOKENS) && estCandidatTokens(e.path))
    .sort(parChemin)

  const eligibles = fichiers
    .filter(
      (e) =>
        EXTENSIONS_CODE.includes(extensionDe(e.path)) &&
        !estExclu(e.path, e.size, TAILLE_MAX_CODE) &&
        !estCandidatTokens(e.path) &&
        !estTest(e.path)
    )
    .map((e) => ({ ...e, prioritaire: segmentsDe(e.path).some((d) => DOSSIERS_PRIORITAIRES.includes(d)) }))
    .sort((a, b) => Number(b.prioritaire) - Number(a.prioritaire) || parChemin(a, b))

  const simple = ({ path, size }) => ({ chemin: path, taille: size ?? 0 })
  return {
    candidats: tousCandidats.slice(0, MAX_CANDIDATS).map(simple),
    candidatsTotal: tousCandidats.length,
    echantillon: eligibles.slice(0, MAX_ECHANTILLON).map(simple),
    eligibles: eligibles.length,
  }
}

// Un .css/.scss sans aucune propriété personnalisée n'est pas un fichier de tokens.
export function filtrerCandidatsLus(fichiers) {
  const gardes = []
  const avertissements = []
  for (const f of fichiers) {
    if (/\.s?css$/i.test(f.nom) && !/--[\w-]+\s*:/.test(f.contenu)) {
      avertissements.push(
        avertissement(
          f.nom,
          `« ${f.nom} » ne contient aucune propriété personnalisée (--nom) : écarté.`,
          `"${f.nom}" contains no custom property (--name): skipped.`
        )
      )
    } else {
      gardes.push(f)
    }
  }
  return { gardes, avertissements }
}

/* --- D3 Réseau ------------------------------------------------------------ */

export function formaterHeure(secondesEpoch) {
  const d = new Date(Number(secondesEpoch) * 1000)
  if (Number.isNaN(d.getTime())) return null
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function entete(reponse, nom) {
  try {
    return reponse.headers?.get?.(nom) ?? null
  } catch {
    return null
  }
}

// Message adapté à un statut HTTP inattendu. `contexte` : 'depot' | 'arbre' | 'fichier'.
function erreurHttp(reponse, contexte) {
  const statut = reponse.status
  if ((statut === 403 || statut === 429) && entete(reponse, 'x-ratelimit-remaining') === '0') {
    const heure = formaterHeure(entete(reponse, 'x-ratelimit-reset'))
    return bilingue(
      `Limite de GitHub atteinte (60 requêtes/heure sans connexion)${heure ? `, réessaie après ${heure}` : ', réessaie plus tard'}.`,
      `GitHub rate limit reached (60 requests/hour without signing in)${heure ? `, try again after ${heure}` : ', try again later'}.`
    )
  }
  if (statut === 404) {
    return contexte === 'arbre'
      ? bilingue('Branche introuvable dans ce dépôt.', 'Branch not found in this repository.')
      : bilingue('Dépôt introuvable ou privé.', 'Repository not found or private.')
  }
  return bilingue(`GitHub a refusé la requête (code ${statut}).`, `GitHub refused the request (status ${statut}).`)
}

const ERREUR_RESEAU = bilingue(
  'Impossible de joindre GitHub. Vérifie ta connexion et réessaie.',
  'Could not reach GitHub. Check your connection and try again.'
)

// GET + JSON, jamais d'exception : { ok: true, donnees } ou { ok: false, erreur }.
async function lireJson(fetchFn, url, contexte) {
  let reponse
  try {
    reponse = await fetchFn(url)
  } catch {
    return { ok: false, erreur: ERREUR_RESEAU }
  }
  if (!reponse || !reponse.ok) {
    return { ok: false, erreur: reponse ? erreurHttp(reponse, contexte) : ERREUR_RESEAU }
  }
  try {
    return { ok: true, donnees: await reponse.json() }
  } catch {
    return {
      ok: false,
      erreur: bilingue('Réponse de GitHub illisible.', 'Unreadable response from GitHub.'),
    }
  }
}

const encoderChemin = (chemin) => chemin.split('/').map(encodeURIComponent).join('/')

// Appels 1 et 2 de D3, puis repérage. Renvoie { ok: true, proprietaire, depot,
// branche, taille, avertissements, chemins, candidats, candidatsTotal, echantillon,
// eligibles, dossier } ou { ok: false, erreur: { fr, en } }.
export async function explorerDepot(adresse, fetchFn) {
  if (!adresse) {
    return {
      ok: false,
      erreur: bilingue(
        'Adresse non reconnue. Exemple : https://github.com/proprietaire/depot',
        'Address not recognised. Example: https://github.com/owner/repo'
      ),
    }
  }
  const { proprietaire, depot, dossier } = adresse
  const base = `https://api.github.com/repos/${encodeURIComponent(proprietaire)}/${encodeURIComponent(depot)}`

  const infos = await lireJson(fetchFn, base, 'depot')
  if (!infos.ok) return infos
  if (infos.donnees?.private === true) {
    return {
      ok: false,
      erreur: bilingue('Dépôt introuvable ou privé.', 'Repository not found or private.'),
    }
  }
  const branche = adresse.branche ?? infos.donnees?.default_branch
  if (!branche) {
    return {
      ok: false,
      erreur: bilingue('Branche par défaut introuvable.', 'Default branch not found.'),
    }
  }

  const arbre = await lireJson(fetchFn, `${base}/git/trees/${encodeURIComponent(branche)}?recursive=1`, 'arbre')
  if (!arbre.ok) return arbre
  if (!Array.isArray(arbre.donnees?.tree)) {
    return {
      ok: false,
      erreur: bilingue('Arborescence illisible.', 'Unreadable file tree.'),
    }
  }

  const avertissements = []
  if (arbre.donnees.truncated) {
    avertissements.push(
      avertissement(
        null,
        'Dépôt très volumineux : GitHub a tronqué la liste des fichiers. L’analyse porte sur ce qui a été reçu.',
        'Very large repository: GitHub truncated the file list. The analysis covers what was received.'
      )
    )
  }
  if (dossier && !arbre.donnees.tree.some((e) => e?.path?.startsWith(dossier.replace(/\/+$/, '') + '/'))) {
    avertissements.push(
      avertissement(
        null,
        `Aucun fichier trouvé dans le dossier « ${dossier} ».`,
        `No file found in the "${dossier}" folder.`
      )
    )
  }

  return {
    ok: true,
    proprietaire,
    depot,
    branche,
    dossier: dossier ?? null,
    taille: infos.donnees?.size ?? null,
    avertissements,
    // Tous les fichiers reçus, sans filtre : sert aux axes composants, documentation et gouvernance.
    chemins: arbre.donnees.tree.filter((e) => e?.type === 'blob' && typeof e.path === 'string').map((e) => e.path),
    ...reperer(arbre.donnees.tree, dossier),
  }
}

// Appel 3 de D3 : contenu brut, au plus PARALLELE requêtes en même temps.
// `onProgression(faits, total)` est appelé après chaque fichier. Un fichier qui
// échoue est signalé dans `echecs`, sans interrompre les autres.
// → { fichiers: [{ nom, contenu }], echecs: [{ chemin, erreur }] } (ordre des chemins conservé)
export async function lireContenus(depot, chemins, fetchFn, onProgression = null) {
  const { proprietaire, depot: nomDepot, branche } = depot
  const racine = `https://raw.githubusercontent.com/${encodeURIComponent(proprietaire)}/${encodeURIComponent(nomDepot)}/${encodeURIComponent(branche)}/`
  const resultats = new Array(chemins.length).fill(null)
  let suivant = 0
  let faits = 0

  const travailleur = async () => {
    while (suivant < chemins.length) {
      const i = suivant++
      const chemin = chemins[i]
      try {
        const reponse = await fetchFn(racine + encoderChemin(chemin))
        if (!reponse || !reponse.ok) {
          resultats[i] = { chemin, erreur: reponse ? erreurHttp(reponse, 'fichier') : ERREUR_RESEAU }
        } else {
          resultats[i] = { nom: chemin, contenu: await reponse.text() }
        }
      } catch {
        resultats[i] = { chemin, erreur: ERREUR_RESEAU }
      }
      faits++
      try {
        onProgression?.(faits, chemins.length)
      } catch {
        // Une erreur d'affichage ne doit pas interrompre la lecture.
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(PARALLELE, chemins.length) }, travailleur))

  return {
    fichiers: resultats.filter((r) => r && 'contenu' in r),
    echecs: resultats.filter((r) => r && 'erreur' in r),
  }
}
