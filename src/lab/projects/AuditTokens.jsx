import { useMemo, useRef, useState } from 'react'
import { CaseMasthead, CaseHero, CaseFooter } from '../CaseFile'
import { dossierNo } from '../projects'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'
import { analyse } from '../audit/analyse'
import { extraireUsagesTokens, mesurerCouverture } from '../audit/couverture'
import { GRAVITES } from '../audit/outils'
import { Bouton, Tuile } from './audit/ui'
import { FORMAT_LABEL_MONO } from './audit/styles'
import { TEXTES } from './audit/textes'
import SourceGithub from './audit/SourceGithub'
import Couverture from './audit/Couverture'
import { LIMITE_CARACTERES } from '../audit/lireFichiers'
import exempleCss from '../audit/exemples/exemple.css?raw'
import exempleDtcg from '../audit/exemples/exemple.dtcg.json?raw'
import exempleTokensStudio from '../audit/exemples/exemple.tokens-studio.json?raw'
import tokensDuSite from '../../styles/tokens.css?raw'

/* --- Page d'audit de tokens --------------------------------------------- *
 * Cette page ne fait qu'afficher le résultat du moteur src/lab/audit/
 * (analyse.js). Rien n'est envoyé nulle part : tout se calcule ici, dans
 * le navigateur.
 * ------------------------------------------------------------------- */

const LIEN_LINKEDIN = 'https://www.linkedin.com/in/michael-misran'
const AFFICHAGE_INITIAL = 25 // constats affichés par règle avant « Afficher les autres »

const EXEMPLES = {
  css: { nom: 'exemple.css', contenu: exempleCss },
  dtcg: { nom: 'exemple.dtcg.json', contenu: exempleDtcg },
  'tokens-studio': { nom: 'exemple.tokens-studio.json', contenu: exempleTokensStudio },
}
const FICHIER_SITE = { nom: 'src/styles/tokens.css', contenu: tokensDuSite }

const REGLES_IDS = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8']

const FR = {
  title: 'Audit de design system',
  role: 'Outil — colle ou dépose tes tokens, obtiens un rapport chiffré',
  mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
  mastheadRight: 'MISRAN LABS',
  mastheadRightSub: 'ARCHIVE VISUEL',
  stampLabel: 'MISRAN · LABS · ARCHIVE ·',
  clearance: 'NIVEAU DE LECTURE — PUBLIC',
  tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
  intro:
    "Cet outil lit les fichiers de tokens d'un design system et signale ce qui ne tient pas : références cassées ou circulaires, valeurs codées en dur, doublons, couleurs quasi identiques, tokens inutilisés. L'analyse suit des règles fixes, sans IA : deux passages sur le même fichier donnent le même rapport.",
  formats: 'Formats acceptés : CSS (propriétés personnalisées --nom), JSON W3C DTCG, JSON Tokens Studio. Le format est détecté automatiquement.',
  inputTitle: 'ENTRÉE',
  pasteLabel: 'COLLER UN FICHIER',
  pastePlaceholder: ':root {\n  --couleur-marque: #e26a50;\n  --bouton-fond: var(--couleur-marque);\n}',
  pickLabel: 'OU CHARGER DES FICHIERS (.css, .scss, .json)',
  pickButton: 'Choisir des fichiers',
  dropHint: 'Tu peux aussi déposer des fichiers ici.',
  filesTitle: 'FICHIERS CHARGÉS',
  remove: 'Retirer',
  unknownFormat: 'format non reconnu',
  formatNames: { css: 'CSS', dtcg: 'JSON DTCG', 'tokens-studio': 'JSON Tokens Studio' },
  tokensCount: (n) => `${n} token${n > 1 ? 's' : ''}`,
  analyze: 'Analyser',
  examplesLabel: 'EXEMPLES',
  examples: { css: 'CSS', dtcg: 'DTCG', 'tokens-studio': 'Tokens Studio' },
  auditSite: 'Auditer les tokens de ce site',
  pastedName: 'texte-colle.txt',
  resultsTitle: 'RÉSULTAT',
  warningsTitle: 'MESSAGES DE LECTURE',
  noTokens: "Aucun token trouvé : il n'y a rien à auditer. Vérifie le format du fichier.",
  allClear: 'Aucun constat : ces tokens sont cohérents selon les huit règles de l’outil.',
  summary: {
    files: 'FICHIERS',
    tokens: 'TOKENS',
    healthy: 'TOKENS SAINS',
    healthyNote: 'sans erreur ni avertissement',
    byType: 'PAR TYPE',
    byFormat: 'PAR FORMAT',
    unknownType: 'sans type',
  },
  filterLabel: 'FILTRER PAR GRAVITÉ',
  severities: { erreur: 'Erreur', avertissement: 'Avertissement', info: 'Info' },
  severityCount: (n) => `${n}`,
  ruleWord: 'Règle',
  findingsCount: (n) => `${n} constat${n > 1 ? 's' : ''}`,
  showMore: (n) => `Afficher les ${n} autres`,
  moreTokens: (n) => `+${n}`,
  line: 'ligne',
  noMatch: 'Aucun constat pour ce filtre.',
  copyReport: 'Copier le rapport',
  copied: 'Rapport copié',
  reportTitle: "Rapport d'audit des tokens",
  reportSummary: 'Résumé',
  reportWarnings: 'Messages de lecture',
  rules: {
    R1: { titre: 'Référence cassée', explication: "Un token en référence un autre qui n'est défini nulle part : sa valeur ne peut pas être résolue. En CSS, une valeur de secours ramène la gravité à un avertissement." },
    R2: { titre: 'Référence circulaire', explication: 'Des tokens se réfèrent les uns aux autres en boucle : aucun ne peut recevoir de valeur finale.' },
    R3: { titre: 'Valeur codée en dur', explication: "Une déclaration CSS porte une couleur ou une longueur en px littérale au lieu de passer par un token. Le style échappe au design system." },
    R4: { titre: 'Doublon de valeur', explication: 'Plusieurs tokens de même contexte portent exactement la même valeur brute. Souvent, l’un devrait être l’alias de l’autre.' },
    R5: { titre: 'Couleurs quasi identiques', explication: 'Deux couleurs opaques diffèrent de trois niveaux ou moins par composante : une différence invisible, souvent un oubli d’harmonisation.' },
    R6: { titre: 'Token inutilisé', explication: "Un token n'est référencé nulle part dans les fichiers fournis. Il peut être utilisé ailleurs (code, autres fichiers) : à vérifier avant de le supprimer." },
    R7: { titre: "Chaîne d'alias trop longue", explication: 'Plus de trois références successives avant la valeur finale : retrouver la valeur réelle devient pénible.' },
    R8: { titre: 'Type manquant', explication: "Un token JSON n'a pas de type, ni propre ni hérité de son groupe : les outils ne savent pas ce qu'il représente." },
  },
  ctaTitle: 'Besoin d’un audit complet de votre design system ?',
  ctaText: "Cet outil relève les incohérences des tokens. Un audit complet regarde aussi la couverture dans le code, l’accessibilité, les composants, la documentation et la gouvernance.",
  ctaLink: 'Me contacter sur LinkedIn',
}

const EN = {
  title: 'Design system audit',
  role: 'Tool — paste or drop your tokens, get a detailed report',
  mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
  mastheadRight: 'MISRAN LABS',
  mastheadRightSub: 'VISUAL ARCHIVE',
  stampLabel: 'MISRAN · LABS · ARCHIVE ·',
  clearance: 'CLEARANCE LEVEL — PUBLIC',
  tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
  intro:
    'This tool reads a design system token file and reports what does not work: broken or circular references, hard-coded values, duplicates, near-identical colors, unused tokens. Analysis follows fixed rules, no AI: two passes on the same file yield the same report.',
  formats: 'Accepted formats: CSS (custom properties --name), W3C JSON DTCG, JSON Tokens Studio. Format is auto-detected.',
  inputTitle: 'INPUT',
  pasteLabel: 'PASTE A FILE',
  pastePlaceholder: ':root {\n  --brand-color: #e26a50;\n  --button-background: var(--brand-color);\n}',
  pickLabel: 'OR LOAD FILES (.css, .scss, .json)',
  pickButton: 'Choose files',
  dropHint: 'You can also drop files here.',
  filesTitle: 'LOADED FILES',
  remove: 'Remove',
  unknownFormat: 'unrecognized format',
  formatNames: { css: 'CSS', dtcg: 'JSON DTCG', 'tokens-studio': 'JSON Tokens Studio' },
  tokensCount: (n) => `${n} token${n > 1 ? 's' : ''}`,
  analyze: 'Analyze',
  examplesLabel: 'EXAMPLES',
  examples: { css: 'CSS', dtcg: 'DTCG', 'tokens-studio': 'Tokens Studio' },
  auditSite: "Audit this site's tokens",
  pastedName: 'pasted-text.txt',
  resultsTitle: 'RESULT',
  warningsTitle: 'READING MESSAGES',
  noTokens: 'No tokens found: there is nothing to audit. Check your file format.',
  allClear: 'All clear: these tokens are consistent across the eight rules.',
  summary: {
    files: 'FILES',
    tokens: 'TOKENS',
    healthy: 'HEALTHY TOKENS',
    healthyNote: 'no errors or warnings',
    byType: 'BY TYPE',
    byFormat: 'BY FORMAT',
    unknownType: 'no type',
  },
  filterLabel: 'FILTER BY SEVERITY',
  severities: { erreur: 'Error', avertissement: 'Warning', info: 'Info' },
  severityCount: (n) => `${n}`,
  ruleWord: 'Rule',
  findingsCount: (n) => `${n} finding${n > 1 ? 's' : ''}`,
  showMore: (n) => `Show ${n} more`,
  moreTokens: (n) => `+${n}`,
  line: 'line',
  noMatch: 'No findings for this filter.',
  copyReport: 'Copy report',
  copied: 'Report copied',
  reportTitle: 'Token audit report',
  reportSummary: 'Summary',
  reportWarnings: 'Reading messages',
  rules: {
    R1: { titre: 'Broken reference', explication: 'A token references another token that is not defined anywhere: its value cannot be resolved. In CSS, a fallback value drops the severity to a warning.' },
    R2: { titre: 'Circular reference', explication: 'Tokens reference each other in a loop: none can receive a final value.' },
    R3: { titre: 'Hard-coded value', explication: 'A CSS declaration uses a literal color or px length instead of a token. The style escapes the design system.' },
    R4: { titre: 'Duplicate value', explication: 'Multiple tokens in the same context have exactly the same raw value. Often, one should be an alias of the other.' },
    R5: { titre: 'Near-identical colors', explication: 'Two opaque colors differ by three levels or less per component: a difference invisible to the eye, often a missed harmonization.' },
    R6: { titre: 'Unused token', explication: 'A token is not referenced anywhere in the supplied files. It may be used elsewhere (code, other files): verify before deleting.' },
    R7: { titre: 'Alias chain too long', explication: 'More than three successive references before the final value: finding the real value becomes tedious.' },
    R8: { titre: 'Missing type', explication: 'A JSON token lacks a type, neither its own nor inherited from its group: tools cannot tell what it represents.' },
  },
  ctaTitle: 'Need a full audit of your design system?',
  ctaText: 'This tool flags token inconsistencies. A full audit also examines code coverage, accessibility, components, documentation, and governance.',
  ctaLink: 'Contact me on LinkedIn',
}

// Textes de la page + textes ajoutés par le mode GitHub (src/lab/projects/audit/textes.js).
const CONTENT = { fr: { ...FR, ...TEXTES.fr }, en: { ...EN, ...TEXTES.en } }

const ACCENT_GRAVITE = {
  erreur: 'var(--error)',
  avertissement: 'var(--warning)',
  info: 'var(--text2)',
}

function PastilleGravite({ gravite, label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        border: `var(--border-thin) solid ${ACCENT_GRAVITE[gravite]}`,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT_GRAVITE[gravite], flexShrink: 0 }} />
      {label}
    </span>
  )
}

function FiltreGravite({ gravite, label, nombre, actif, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: actif ? 'var(--text)' : 'var(--muted)',
        background: actif ? 'var(--bg2)' : 'var(--bg3)',
        border: `var(--border-thin) solid ${actif ? ACCENT_GRAVITE[gravite] : 'var(--border)'}`,
        padding: '7px 12px',
        cursor: 'pointer',
        fontWeight: actif ? 700 : 400,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: actif ? ACCENT_GRAVITE[gravite] : 'transparent',
          border: `1px solid ${ACCENT_GRAVITE[gravite]}`,
          flexShrink: 0,
        }}
      />
      {label} · {nombre}
    </button>
  )
}

function libelleFormat(format, c) {
  return format ? c.formatNames[format] : c.unknownFormat
}

function emplacementTexte(constat, c) {
  if (!constat.fichier) return null
  if (constat.emplacement === null || constat.emplacement === undefined) return constat.fichier
  return typeof constat.emplacement === 'number'
    ? `${constat.fichier} · ${c.line} ${constat.emplacement}`
    : `${constat.fichier} · ${constat.emplacement}`
}

// Rapport Markdown, dans la langue de la page.
function construireRapport(resultat, c, lang, couverture = null) {
  const { resume } = resultat
  const lignes = [`# ${c.reportTitle}`, '', `## ${c.reportSummary}`, '']
  lignes.push(`- ${c.summary.files} : ${resume.fichiers}`)
  lignes.push(`- ${c.summary.tokens} : ${resume.tokens}`)
  if (resume.partSaine !== null) lignes.push(`- ${c.summary.healthy} : ${Math.round(resume.partSaine * 100)} % (${resume.tokensSains}/${resume.tokens})`)
  lignes.push(
    `- ${GRAVITES.map((g) => `${c.severities[g]} : ${resume.constatsParGravite[g]}`).join(' · ')}`
  )
  if (couverture) {
    const t = c.cov
    lignes.push('', `## ${t.reportTitle}`, '')
    if (couverture.source) lignes.push(`- ${t.source(couverture.source.depot, couverture.source.branche, couverture.fichiersAnalyses, couverture.source.eligibles)}`)
    lignes.push(`- ${t.reportRate} : ${couverture.taux === null ? '—' : `${Math.round(couverture.taux * 100)} %`}`)
    lignes.push(`- ${t.reportUsages} : ${couverture.usagesTokens}`)
    lignes.push(`- ${t.reportHard} : ${couverture.valeursEnDur}`)
    const liste = (titre, elements) => {
      if (elements.length === 0) return
      lignes.push('', `### ${titre}`, '')
      lignes.push(...elements.map((e) => `- ${e}`))
    }
    liste(t.byFileTitle, couverture.parFichier.map((f) => `\`${f.fichier}\` — ${t.hardShort(f.valeursEnDur)}, ${t.tokensShort(f.usagesTokens)}`))
    liste(t.repeatedTitle, couverture.valeursRepetees.map((v) => `\`${v.valeur}\` — ${t.times(v.occurrences)}, ${t.inFiles(v.fichiers.length)}`))
    liste(t.alreadyTitle, couverture.dejaTokenisees.map((v) => `\`${v.valeur}\` → \`${v.token}\` — ${t.times(v.occurrences)}`))
  }
  if (resultat.avertissements.length > 0) {
    lignes.push('', `## ${c.reportWarnings}`, '')
    for (const a of resultat.avertissements) {
      lignes.push(`- ${a.fichier ? `\`${a.fichier}\` — ` : ''}${a.detail[lang] ?? a.detail.fr}`)
    }
  }
  for (const id of REGLES_IDS) {
    const constats = resultat.constats.filter((k) => k.regle === id)
    if (constats.length === 0) continue
    lignes.push('', `## ${id} — ${c.rules[id].titre} (${c.findingsCount(constats.length)})`, '')
    for (const k of constats) {
      const noms = k.tokens.length > 0 ? `${k.tokens.map((n) => `\`${n}\``).join(', ')} — ` : ''
      const lieu = emplacementTexte(k, c)
      lignes.push(`- **${c.severities[k.gravite]}** — ${noms}${lieu ? `${lieu} — ` : ''}${k.detail[lang] ?? k.detail.fr}`)
    }
  }
  return lignes.join('\n') + '\n'
}

function GroupeRegle({ groupe, c, lang }) {
  const [tout, setTout] = useState(false)
  const visibles = tout ? groupe.constats : groupe.constats.slice(0, AFFICHAGE_INITIAL)
  const reste = groupe.constats.length - visibles.length
  const regle = c.rules[groupe.id]

  return (
    <section style={{ border: 'var(--border-thin) solid var(--border)', marginBottom: 16, background: 'var(--bg2)' }}>
      <header style={{ padding: '10px 14px', borderBottom: 'var(--border-thin) solid var(--border)', background: 'var(--bg3)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>{groupe.id}</span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, margin: 0, color: 'var(--text)' }}>{regle.titre}</h3>
          {groupe.gravites.map((g) => (
            <PastilleGravite key={g} gravite={g} label={c.severities[g]} />
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{c.findingsCount(groupe.constats.length)}</span>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.5, margin: '6px 0 0', maxWidth: '75ch' }}>
          {regle.explication}
        </p>
      </header>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {visibles.map((k, i) => {
          const lieu = emplacementTexte(k, c)
          const noms = k.tokens.slice(0, 6)
          return (
            <li
              key={i}
              style={{
                padding: '10px 14px',
                borderBottom: 'var(--border-thin) solid var(--grid-line)',
                borderLeft: `var(--border-thick) solid ${ACCENT_GRAVITE[k.gravite]}`,
              }}
            >
              {noms.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
                  {noms.map((n, j) => (
                    <code
                      key={j}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text)',
                        background: 'var(--bg3)',
                        border: 'var(--border-thin) solid var(--border)',
                        padding: '1px 6px',
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {n}
                    </code>
                  ))}
                  {k.tokens.length > noms.length && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{c.moreTokens(k.tokens.length - noms.length)}</span>
                  )}
                </div>
              )}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--prose)', lineHeight: 1.5, margin: 0, overflowWrap: 'anywhere' }}>
                {k.detail[lang] ?? k.detail.fr}
              </p>
              {lieu && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginTop: 4, overflowWrap: 'anywhere' }}>{lieu}</div>
              )}
            </li>
          )
        })}
      </ul>
      {reste > 0 && (
        <div style={{ padding: '10px 14px' }}>
          <Bouton onClick={() => setTout(true)}>{c.showMore(reste)}</Bouton>
        </div>
      )}
    </section>
  )
}

export default function AuditTokens({ project }) {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const c = CONTENT[lang] ?? CONTENT.fr

  const [fichiers, setFichiers] = useState([]) // [{ id, nom, contenu, info: { format, tokens } }]
  const [texte, setTexte] = useState('')
  const [resultat, setResultat] = useState(null)
  const [couverture, setCouverture] = useState(null) // résultat de mesurerCouverture + source, mode GitHub seulement
  const [contexteCode, setContexteCode] = useState(null) // { fichiersCode, source, avertissements } d'un dépôt analysé
  const [gravitesActives, setGravitesActives] = useState(() => new Set(GRAVITES))
  const [copie, setCopie] = useState(false)
  const [survol, setSurvol] = useState(false)
  const compteur = useRef(0)

  const no = dossierNo(project?.slug) ?? '—'
  const page = {
    ...c,
    fileNo: `${lang === 'en' ? 'FILE' : 'DOSSIER'} Nº ${no}`,
    docId: `${lang === 'en' ? 'DOCUMENT ID' : 'ID DOSSIER'} — ML-ARCHIVE-${no}`,
  }

  function entreeFichier(nom, contenu) {
    compteur.current += 1
    let info = { format: null, tokens: 0 }
    try {
      const lu = analyse([{ nom, contenu }]).fichiers[0]
      if (lu) info = { format: lu.format, tokens: lu.tokens }
    } catch {
      // analyse() n'exclut aucune erreur imprévue : on affiche « format non reconnu ».
    }
    return { id: compteur.current, nom, contenu, info }
  }

  async function chargerFichiers(liste) {
    const lus = []
    for (const fichier of Array.from(liste ?? [])) {
      try {
        // Un fichier énorme n'est lu que sur ses premiers octets : la limite du moteur fait le reste.
        const contenu = await fichier.slice(0, LIMITE_CARACTERES + 100000).text()
        lus.push(entreeFichier(fichier.name, contenu))
      } catch {
        lus.push(entreeFichier(fichier.name, ''))
      }
    }
    if (lus.length > 0) {
      setFichiers((prev) => [...prev, ...lus])
      setContexteCode(null) // des fichiers ajoutés à la main : le code du dépôt ne s'applique plus
    }
  }

  // Analyse des tokens ; avec un code de dépôt (mode GitHub) : les usages du code
  // alimentent R6, puis la couverture est mesurée sur les tokens lus.
  function calculer(entrees, contexte) {
    try {
      if (contexte) {
        const usages = extraireUsagesTokens(contexte.fichiersCode)
        const lu = analyse(entrees, { usagesExternes: usages })
        setResultat({ ...lu, avertissements: [...lu.avertissements, ...contexte.avertissements] })
        setCouverture({ ...mesurerCouverture(contexte.fichiersCode, lu.tokens), source: contexte.source })
      } else {
        setResultat(analyse(entrees))
        setCouverture(null)
      }
    } catch {
      setResultat(analyse([]))
      setCouverture(null)
    }
    setCopie(false)
  }

  function lancerAnalyse(liste, texteCourant) {
    const entrees = liste.map(({ nom, contenu }) => ({ nom, contenu }))
    const texteColle = texteCourant.trim() !== ''
    if (texteColle) entrees.push({ nom: c.pastedName, contenu: texteCourant })
    // Du texte collé n'a rien à voir avec le code du dépôt : pas de couverture ni d'usages dans ce cas.
    if (texteColle) setContexteCode(null)
    calculer(entrees, texteColle ? null : contexteCode)
  }

  function chargerModele(modele) {
    const entree = entreeFichier(modele.nom, modele.contenu)
    setFichiers([entree])
    setTexte('')
    setContexteCode(null)
    calculer([entree], null)
  }

  // Résultat de « Analyser ce dépôt » : les fichiers de tokens remplissent la liste, le code reste en mémoire.
  function analyserDepot({ fichiersTokens, fichiersCode, avertissements, source }) {
    const entrees = fichiersTokens.map(({ nom, contenu }) => entreeFichier(nom, contenu))
    const contexte = { fichiersCode, source, avertissements }
    setFichiers(entrees)
    setTexte('')
    setContexteCode(contexte)
    calculer(fichiersTokens, contexte)
  }

  function retirer(id) {
    setFichiers((prev) => prev.filter((f) => f.id !== id))
  }

  function basculerGravite(gravite) {
    setGravitesActives((prev) => {
      const suivant = new Set(prev)
      if (suivant.has(gravite)) suivant.delete(gravite)
      else suivant.add(gravite)
      return suivant
    })
  }

  async function copierRapport() {
    if (!resultat) return
    try {
      await navigator.clipboard.writeText(construireRapport(resultat, c, lang, couverture))
      setCopie(true)
    } catch {
      // Repli silencieux : pas de presse-papiers disponible.
    }
  }

  const groupes = useMemo(() => {
    if (!resultat) return []
    return REGLES_IDS.map((id) => {
      const constats = resultat.constats.filter((k) => k.regle === id && gravitesActives.has(k.gravite))
      const gravites = GRAVITES.filter((g) => constats.some((k) => k.gravite === g))
      return { id, constats, gravites }
    })
      .filter((g) => g.constats.length > 0)
      .sort((a, b) => GRAVITES.indexOf(a.gravites[0]) - GRAVITES.indexOf(b.gravites[0]) || a.id.localeCompare(b.id))
  }, [resultat, gravitesActives])

  const resume = resultat?.resume
  const lieuVide = !resultat || resultat.tokens.length === 0

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: 'var(--font-body)', color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={page} lang={lang} />
      <CaseHero project={project} c={page} />

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 8px' }}>{c.intro}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 8px' }}>{c.formats}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 24px' }}>{c.privacy}</p>

      {/* --- Entrée ------------------------------------------------------ */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setSurvol(true)
        }}
        onDragLeave={() => setSurvol(false)}
        onDrop={(e) => {
          e.preventDefault()
          setSurvol(false)
          chargerFichiers(e.dataTransfer?.files)
        }}
        style={{
          border: `var(--border-thin) ${survol ? 'dashed' : 'solid'} ${survol ? 'var(--primary)' : 'var(--border)'}`,
          background: survol ? 'var(--active-tint)' : 'var(--bg2)',
          padding: 16,
          marginBottom: 16,
        }}
      >
        <SourceGithub c={c} lang={lang} onAnalyser={analyserDepot} />

        <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 8 }}>{c.inputTitle} — {c.pasteLabel}</div>
        <textarea
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          placeholder={c.pastePlaceholder}
          spellCheck={false}
          aria-label={c.pasteLabel}
          rows={8}
          style={{
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 1.5,
            color: 'var(--text)',
            background: 'var(--bg)',
            border: 'var(--border-thin) solid var(--border)',
            padding: 10,
            resize: 'vertical',
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        />

        <div style={{ ...FORMAT_LABEL_MONO, margin: '14px 0 8px' }}>{c.pickLabel}</div>
        <label style={{ display: 'inline-block', position: 'relative' }}>
          <input
            type="file"
            multiple
            accept=".css,.scss,.json"
            onChange={(e) => {
              chargerFichiers(e.target.files)
              e.target.value = ''
            }}
            style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden' }}
          />
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text)',
              background: 'var(--bg3)',
              border: 'var(--border-thin) solid var(--border)',
              padding: '8px 14px',
              cursor: 'pointer',
            }}
          >
            {c.pickButton}
          </span>
        </label>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', marginLeft: 12 }}>{c.dropHint}</span>

        {fichiers.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 6 }}>{c.filesTitle}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: 'var(--border-thin) solid var(--border)' }}>
              {fichiers.map((f) => (
                <li
                  key={f.id}
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 12px', padding: '6px 10px', borderBottom: 'var(--border-thin) solid var(--grid-line)', background: 'var(--bg)' }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', flex: '1 1 160px', overflowWrap: 'anywhere' }}>{f.nom}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: f.info.format ? 'var(--text2)' : 'var(--error)' }}>
                    {libelleFormat(f.info.format, c)} · {c.tokensCount(f.info.tokens)}
                  </span>
                  <button
                    type="button"
                    onClick={() => retirer(f.id)}
                    aria-label={`${c.remove} ${f.nom}`}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', color: 'var(--text2)', background: 'transparent', border: 'var(--border-thin) solid var(--border)', padding: '2px 8px', cursor: 'pointer' }}
                  >
                    {c.remove} ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        <Bouton principal onClick={() => lancerAnalyse(fichiers, texte)}>{c.analyze}</Bouton>
        <span style={{ ...FORMAT_LABEL_MONO, marginLeft: 8 }}>{c.examplesLabel}</span>
        {Object.keys(EXEMPLES).map((cle) => (
          <Bouton key={cle} onClick={() => chargerModele(EXEMPLES[cle])}>{c.examples[cle]}</Bouton>
        ))}
        <Bouton onClick={() => chargerModele(FICHIER_SITE)}>{c.auditSite}</Bouton>
      </div>

      {/* --- Résultat ---------------------------------------------------- */}
      {resultat && (
        <div aria-live="polite">
          <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 10 }}>{c.resultsTitle}</div>

          {resultat.avertissements.length > 0 && (
            <div style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', padding: '10px 14px', marginBottom: 16 }}>
              <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 6 }}>{c.warningsTitle}</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {resultat.avertissements.map((a, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--prose)', lineHeight: 1.5, overflowWrap: 'anywhere' }}>
                    {a.fichier && <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{a.fichier}</code>}
                    {a.fichier ? ' — ' : ''}
                    {a.detail[lang] ?? a.detail.fr}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lieuVide ? (
            <>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: '0 0 12px' }}>{couverture ? c.gh.noTokensRepo : c.noTokens}</p>
              {couverture && (
                <div style={{ marginBottom: 12 }}>
                  <Bouton onClick={copierRapport}>{copie ? c.copied : c.copyReport}</Bouton>
                </div>
              )}
            </>
          ) : (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                <Tuile label={c.summary.files} valeur={resume.fichiers} />
                <Tuile label={c.summary.tokens} valeur={resume.tokens} note={Object.entries(resume.tokensParFormat).map(([f, n]) => `${c.formatNames[f]} ${n}`).join(' · ')} />
                <Tuile label={c.summary.healthy} valeur={`${Math.round(resume.partSaine * 100)} %`} note={c.summary.healthyNote} />
                {GRAVITES.map((g) => (
                  <Tuile key={g} label={c.severities[g].toUpperCase()} valeur={resume.constatsParGravite[g]} />
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 20, overflowWrap: 'anywhere' }}>
                {c.summary.byType} : {Object.entries(resume.tokensParType).map(([t, n]) => `${t === 'inconnu' ? c.summary.unknownType : t} ${n}`).join(' · ')}
              </div>

              {resultat.constats.length === 0 ? (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--text)', border: 'var(--border-thin) solid var(--border)', borderLeft: 'var(--border-thick) solid var(--primary)', background: 'var(--bg2)', padding: '14px 16px', margin: '0 0 24px' }}>
                  {c.allClear}
                </p>
              ) : (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 8 }}>{c.filterLabel}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {GRAVITES.map((g) => (
                        <FiltreGravite
                          key={g}
                          gravite={g}
                          label={c.severities[g]}
                          nombre={resume.constatsParGravite[g]}
                          actif={gravitesActives.has(g)}
                          onClick={() => basculerGravite(g)}
                        />
                      ))}
                      <Bouton onClick={copierRapport} style={{ marginLeft: 'auto' }}>
                        {copie ? c.copied : c.copyReport}
                      </Bouton>
                    </div>
                  </div>

                  {groupes.length === 0 && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)' }}>{c.noMatch}</p>
                  )}
                  {groupes.map((g) => (
                    <GroupeRegle key={g.id} groupe={g} c={c} lang={lang} />
                  ))}
                </>
              )}
            </>
          )}

          {couverture && <Couverture couverture={couverture} c={c} />}
        </div>
      )}

      {/* --- Appel à l'action ---------------------------------------------- */}
      <section style={{ border: 'var(--border-regular) solid var(--border)', background: 'var(--bg2)', padding: '20px 24px', marginTop: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, margin: '0 0 8px', color: 'var(--text)' }}>{c.ctaTitle}</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 14px' }}>{c.ctaText}</p>
        <a
          href={LIEN_LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--on-primary)',
            background: 'var(--primary)',
            border: 'var(--border-thin) solid var(--primary)',
            padding: '8px 14px',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          {c.ctaLink} ↗
        </a>
      </section>

      <CaseFooter c={page} />
    </div>
  )
}
