// Grille d'évaluation à 7 axes, notée de 0 à 3 par des règles fixes (pas d'IA) :
// module pur, sans React ni Vite. Une note est le nombre de critères remplis
// parmi ceux qui sont évaluables, ramené à 0-3. Un axe sans critère évaluable
// n'a pas de note (null) : on n'invente jamais une note.

const bilingue = (fr, en) => ({ fr, en })

export const AXES = [
  { id: 'architecture', titre: bilingue('Architecture des tokens', 'Token architecture') },
  { id: 'couverture', titre: bilingue('Couverture du code', 'Code coverage') },
  { id: 'accessibilite', titre: bilingue('Accessibilité', 'Accessibility') },
  { id: 'composants', titre: bilingue('Composants', 'Components') },
  { id: 'documentation', titre: bilingue('Documentation', 'Documentation') },
  { id: 'gouvernance', titre: bilingue('Gouvernance', 'Governance') },
  { id: 'parite', titre: bilingue('Parité Figma ↔ code', 'Figma ↔ code parity') },
]

const NECESSITE_DEPOT = bilingue('Nécessite un dépôt GitHub.', 'Requires a GitHub repository.')

const pct = (x) => `${Math.round(x * 100)} %`
const critere = (id, ok, fr, en, manque) => ({ id, ok, detail: bilingue(fr, en), ...(manque === undefined ? {} : { manque }) })

// Assemble un axe à partir de ses critères. `raison` : pourquoi il n'est pas noté
// quand aucun critère n'est évaluable.
function assembler(id, criteres, raison) {
  const evaluables = criteres.filter((c) => c.ok !== null)
  const remplis = evaluables.filter((c) => c.ok).length
  if (evaluables.length === 0) {
    return { id, note: null, criteres, resume: raison }
  }
  return {
    id,
    note: Math.round((3 * remplis) / evaluables.length),
    criteres,
    resume: bilingue(
      `${remplis} critère${remplis > 1 ? 's' : ''} sur ${evaluables.length} rempli${remplis > 1 ? 's' : ''}.`,
      `${remplis} of ${evaluables.length} criteria met.`
    ),
  }
}

/* --- Axe 1 : architecture des tokens ------------------------------------- */
function axeArchitecture(resultat) {
  const tokens = resultat?.tokens ?? []
  const raison = bilingue('Aucun token à évaluer.', 'No tokens to evaluate.')
  if (tokens.length === 0) return assembler('architecture', [], raison)
  const constats = resultat.constats ?? []

  const erreurs = constats.filter((c) => c.gravite === 'erreur' && (c.regle === 'R1' || c.regle === 'R2')).length
  const affectes = new Set()
  for (const c of constats) if (c.gravite === 'avertissement') for (const nom of c.tokens ?? []) affectes.add(nom)
  const partAvert = tokens.filter((t) => affectes.has(t.nom)).length / tokens.length
  const alias = tokens.filter((t) => t.references?.length > 0).length / tokens.length
  const json = tokens.filter((t) => t.format !== 'css')
  const partTypes = json.length === 0 ? null : json.filter((t) => t.type).length / json.length

  return assembler(
    'architecture',
    [
      critere(
        'aucune-erreur',
        erreurs === 0,
        erreurs === 0
          ? 'Aucune référence cassée ni circulaire.'
          : `${erreurs} référence${erreurs > 1 ? 's' : ''} cassée${erreurs > 1 ? 's' : ''} ou circulaire${erreurs > 1 ? 's' : ''} (R1, R2).`,
        erreurs === 0
          ? 'No broken or circular references.'
          : `${erreurs} broken or circular reference${erreurs > 1 ? 's' : ''} (R1, R2).`
      ),
      critere(
        'peu-avertissements',
        partAvert <= 0.05,
        `${pct(partAvert)} des tokens portent un avertissement (seuil : 5 % au plus).`,
        `${pct(partAvert)} of tokens carry a warning (threshold: 5% at most).`
      ),
      critere(
        'niveaux-alias',
        alias >= 0.2,
        `${pct(alias)} des tokens sont des alias (seuil : 20 % au moins) — signe de niveaux primitive → semantic.`,
        `${pct(alias)} of tokens are aliases (threshold: 20% at least) — a sign of primitive → semantic levels.`
      ),
      critere(
        'types-json',
        partTypes === null ? null : partTypes >= 0.9,
        partTypes === null
          ? 'Aucun token JSON : critère sans objet.'
          : `${pct(partTypes)} des tokens JSON ont un type (seuil : 90 % au moins).`,
        partTypes === null
          ? 'No JSON tokens: criterion not applicable.'
          : `${pct(partTypes)} of JSON tokens have a type (threshold: 90% at least).`
      ),
    ],
    raison
  )
}

/* --- Axe 2 : couverture du code ------------------------------------------ */
function axeCouverture(couverture) {
  if (!couverture) return assembler('couverture', [], NECESSITE_DEPOT)
  const taux = couverture.taux
  const doublons = (couverture.dejaTokenisees ?? []).reduce((s, v) => s + (v.occurrences ?? 0), 0)
  const sansTaux = bilingue('Aucune valeur ni usage de token repéré dans le code.', 'No value or token usage found in the code.')
  return assembler(
    'couverture',
    [
      critere(
        'taux-50',
        taux === null ? null : taux >= 0.5,
        taux === null ? sansTaux.fr : `Taux de couverture de ${pct(taux)} (seuil : 50 % au moins).`,
        taux === null ? sansTaux.en : `Coverage rate of ${pct(taux)} (threshold: 50% at least).`
      ),
      critere(
        'taux-80',
        taux === null ? null : taux >= 0.8,
        taux === null ? sansTaux.fr : `Taux de couverture de ${pct(taux)} (seuil : 80 % au moins).`,
        taux === null ? sansTaux.en : `Coverage rate of ${pct(taux)} (threshold: 80% at least).`
      ),
      critere(
        'deja-tokenisees',
        doublons < 10,
        `${doublons} valeur${doublons > 1 ? 's' : ''} en dur ont déjà un token (seuil : moins de 10).`,
        `${doublons} hard-coded value${doublons > 1 ? 's' : ''} already have a token (threshold: fewer than 10).`
      ),
    ],
    sansTaux
  )
}

/* --- Axe 3 : accessibilité ----------------------------------------------- */
const RE_OUTLINE_NUL = /outline\s*:\s*['"]?(?:none|0(?:px)?)(?![\w-])/i

// Fichiers du code qui retirent l'outline sans prévoir de :focus-visible.
export function outlinesSansFocus(fichiersCode) {
  return (Array.isArray(fichiersCode) ? fichiersCode : [])
    .filter((f) => typeof f?.contenu === 'string' && RE_OUTLINE_NUL.test(f.contenu) && !f.contenu.includes(':focus-visible'))
    .map((f) => f.nom)
}

function axeAccessibilite(contrastes, fichiersCode) {
  const detectees = contrastes?.detectees ?? 0
  const reussies = detectees - (contrastes?.echecs ?? 0)
  const sansPaire = bilingue('Aucune paire texte/fond détectée dans les noms de tokens.', 'No text/background pair detected in token names.')
  const code = Array.isArray(fichiersCode) && fichiersCode.length > 0
  const fautifs = code ? outlinesSansFocus(fichiersCode) : []
  return assembler(
    'accessibilite',
    [
      critere(
        'contrastes-tous',
        detectees === 0 ? null : reussies === detectees,
        detectees === 0 ? sansPaire.fr : `${reussies} paire${reussies > 1 ? 's' : ''} sur ${detectees} atteignent 4,5:1 (toutes attendues).`,
        detectees === 0 ? sansPaire.en : `${reussies} of ${detectees} pair${detectees > 1 ? 's' : ''} reach 4.5:1 (all expected).`
      ),
      critere(
        'contrastes-90',
        detectees === 0 ? null : reussies / detectees >= 0.9,
        detectees === 0 ? sansPaire.fr : `${pct(reussies / detectees)} des paires atteignent 4,5:1 (seuil : 90 % au moins).`,
        detectees === 0 ? sansPaire.en : `${pct(reussies / detectees)} of pairs reach 4.5:1 (threshold: 90% at least).`
      ),
      critere(
        'focus-visible',
        code ? fautifs.length === 0 : null,
        !code
          ? 'Nécessite un dépôt GitHub (code à examiner).'
          : fautifs.length === 0
            ? 'Aucun outline retiré sans :focus-visible dans l’échantillon de code.'
            : `${fautifs.length} fichier${fautifs.length > 1 ? 's' : ''} retire${fautifs.length > 1 ? 'nt' : ''} l’outline sans :focus-visible : ${fautifs.slice(0, 3).join(', ')}.`,
        !code
          ? 'Requires a GitHub repository (code to examine).'
          : fautifs.length === 0
            ? 'No outline removed without :focus-visible in the code sample.'
            : `${fautifs.length} file${fautifs.length > 1 ? 's' : ''} remove${fautifs.length > 1 ? '' : 's'} the outline without :focus-visible: ${fautifs.slice(0, 3).join(', ')}.`
      ),
    ],
    sansPaire
  )
}

/* --- Axes 4 à 6 : à partir des chemins de l'arborescence ------------------ */
const nomDe = (chemin) => chemin.slice(chemin.lastIndexOf('/') + 1)
const dossiersDe = (chemin) => chemin.split('/').slice(0, -1)
const DOSSIERS_IGNORES = ['node_modules', 'dist', 'build', '.next', 'vendor']

// Composants : .jsx .tsx .vue .svelte à majuscule, dans components/ ou ui/, hors tests et stories.
export function reperComposants(chemins) {
  return chemins.filter((c) => {
    const nom = nomDe(c)
    const dossiers = dossiersDe(c)
    return (
      /\.(jsx|tsx|vue|svelte)$/i.test(nom) &&
      /^[A-Z]/.test(nom) &&
      dossiers.some((d) => d === 'components' || d === 'ui') &&
      !dossiers.some((d) => DOSSIERS_IGNORES.includes(d) || d === '__tests__') &&
      !/\.(test|spec|stories)\./i.test(nom)
    )
  })
}

const sansExtension = (nom) => nom.slice(0, nom.indexOf('.'))

function axeComposants(chemins) {
  if (!chemins) return assembler('composants', [], NECESSITE_DEPOT)
  const composants = reperComposants(chemins)
  const nomsStories = new Set()
  const nomsTests = new Set()
  for (const c of chemins) {
    const nom = nomDe(c)
    if (/^[^.]+\.stories\./i.test(nom)) nomsStories.add(sansExtension(nom))
    if (/^[^.]+\.(test|spec)\./i.test(nom)) nomsTests.add(sansExtension(nom))
  }
  const n = composants.length
  const avecStory = composants.filter((c) => nomsStories.has(sansExtension(nomDe(c)))).length
  const avecTest = composants.filter((c) => nomsTests.has(sansExtension(nomDe(c)))).length
  const aucun = bilingue('Aucun composant repéré.', 'No component found.')
  return assembler(
    'composants',
    [
      critere(
        'au-moins-5',
        n >= 5,
        `${n} composant${n > 1 ? 's' : ''} repéré${n > 1 ? 's' : ''} (seuil : 5 au moins).`,
        `${n} component${n > 1 ? 's' : ''} found (threshold: at least 5).`
      ),
      critere(
        'stories',
        n === 0 ? null : avecStory / n >= 0.5,
        n === 0 ? aucun.fr : `${avecStory} composant${n > 1 ? 's' : ''} sur ${n} ${avecStory > 1 ? 'ont' : 'a'} une story (seuil : la moitié au moins).`,
        n === 0 ? aucun.en : `${avecStory} of ${n} component${n > 1 ? 's' : ''} ${avecStory > 1 ? 'have' : 'has'} a story (threshold: half at least).`,
        n - avecStory
      ),
      critere(
        'tests',
        n === 0 ? null : avecTest / n >= 0.5,
        n === 0 ? aucun.fr : `${avecTest} composant${n > 1 ? 's' : ''} sur ${n} ${avecTest > 1 ? 'ont' : 'a'} un test (seuil : la moitié au moins).`,
        n === 0 ? aucun.en : `${avecTest} of ${n} component${n > 1 ? 's' : ''} ${avecTest > 1 ? 'have' : 'has'} a test (threshold: half at least).`,
        n - avecTest
      ),
    ],
    aucun
  )
}

const present = (ok, frOui, frNon, enOui, enNon) => ({ ok, fr: ok ? frOui : frNon, en: ok ? enOui : enNon })
const critereFichier = (id, p) => critere(id, p.ok, p.fr, p.en)

function axeDocumentation(chemins) {
  if (!chemins) return assembler('documentation', [], NECESSITE_DEPOT)
  const minuscules = chemins.map((c) => c.toLowerCase())
  return assembler(
    'documentation',
    [
      critereFichier('readme', present(minuscules.includes('readme.md'), 'README.md à la racine.', 'Pas de README.md à la racine.', 'README.md at the root.', 'No README.md at the root.')),
      critereFichier(
        'docs',
        present(
          minuscules.some((c) => c.startsWith('docs/') || c.endsWith('.mdx')),
          'Dossier docs/ ou fichiers .mdx présents.',
          'Ni dossier docs/ ni fichier .mdx.',
          'docs/ folder or .mdx files present.',
          'Neither a docs/ folder nor .mdx files.'
        )
      ),
      critereFichier(
        'storybook',
        present(chemins.some((c) => dossiersDe(c).includes('.storybook')), 'Configuration Storybook (.storybook/).', 'Pas de configuration Storybook.', 'Storybook configuration (.storybook/).', 'No Storybook configuration.')
      ),
      critereFichier(
        'contributing',
        present(minuscules.some((c) => nomDe(c) === 'contributing.md'), 'CONTRIBUTING.md présent.', 'Pas de CONTRIBUTING.md.', 'CONTRIBUTING.md present.', 'No CONTRIBUTING.md.')
      ),
    ],
    NECESSITE_DEPOT
  )
}

function axeGouvernance(chemins) {
  if (!chemins) return assembler('gouvernance', [], NECESSITE_DEPOT)
  const minuscules = chemins.map((c) => c.toLowerCase())
  return assembler(
    'gouvernance',
    [
      critereFichier(
        'changelog',
        present(
          minuscules.some((c) => nomDe(c).startsWith('changelog') || c.startsWith('.changeset/')),
          'CHANGELOG ou dossier .changeset/ présent.',
          'Ni CHANGELOG ni dossier .changeset/.',
          'CHANGELOG or .changeset/ folder present.',
          'Neither a CHANGELOG nor a .changeset/ folder.'
        )
      ),
      critereFichier(
        'codeowners',
        present(
          ['codeowners', '.github/codeowners', 'docs/codeowners'].some((c) => minuscules.includes(c)),
          'CODEOWNERS présent.',
          'Pas de CODEOWNERS (racine, .github/ ou docs/).',
          'CODEOWNERS present.',
          'No CODEOWNERS (root, .github/ or docs/).'
        )
      ),
      critereFichier(
        'workflows',
        present(minuscules.some((c) => c.startsWith('.github/workflows/')), 'Au moins un workflow dans .github/workflows/.', 'Aucun workflow dans .github/workflows/.', 'At least one workflow in .github/workflows/.', 'No workflow in .github/workflows/.')
      ),
      critereFichier(
        'licence',
        present(
          minuscules.some((c) => !c.includes('/') && /^licen[cs]e/.test(c)),
          'Fichier de licence à la racine.',
          'Pas de fichier de licence à la racine.',
          'License file at the root.',
          'No license file at the root.'
        )
      ),
    ],
    NECESSITE_DEPOT
  )
}

/* --- Axe 7 : parité Figma ↔ code (jamais automatique) --------------------- */
const AXE_PARITE = {
  id: 'parite',
  note: null,
  criteres: [],
  resume: bilingue('À évaluer par l’auditeur (pas de lecture de Figma pour l’instant).', 'To be evaluated by the auditor (Figma is not read yet).'),
}

// entrees = { resultat, couverture | null, chemins | null, contrastes | null, fichiersCode | null }
// → { axes, moyenne, axesEvalues }
export function evaluerGrille({ resultat, couverture = null, chemins = null, contrastes = null, fichiersCode = null } = {}) {
  const axes = [
    axeArchitecture(resultat),
    axeCouverture(couverture),
    axeAccessibilite(contrastes, fichiersCode),
    axeComposants(chemins),
    axeDocumentation(chemins),
    axeGouvernance(chemins),
    AXE_PARITE,
  ].map((axe) => ({ ...axe, titre: AXES.find((a) => a.id === axe.id).titre }))
  return { axes, ...synthese(axes.map((a) => a.note)) }
}

// Moyenne des notes présentes, à une décimale ; null s'il n'y en a aucune.
function synthese(notes) {
  const evaluees = notes.filter((n) => n !== null && n !== undefined)
  return {
    moyenne: evaluees.length === 0 ? null : Math.round((evaluees.reduce((s, n) => s + n, 0) / evaluees.length) * 10) / 10,
    axesEvalues: evaluees.length,
  }
}

// ajustements = { [idAxe]: { note: 0..3 | null, commentaire } }. Renvoie la grille avec,
// pour chaque axe : noteFinale, ajustee (note modifiée par l'auditeur) et commentaire ;
// la note calculée reste dans `note`. La moyenne porte sur les notes finales.
export function appliquerAjustements(grille, ajustements = {}) {
  const axes = grille.axes.map((axe) => {
    const a = ajustements?.[axe.id]
    const noteChoisie = a && a.note !== undefined ? a.note : axe.note
    const commentaire = typeof a?.commentaire === 'string' ? a.commentaire.trim() : ''
    return { ...axe, noteFinale: noteChoisie, ajustee: noteChoisie !== axe.note, commentaire }
  })
  return { axes, ...synthese(axes.map((a) => a.noteFinale)) }
}
