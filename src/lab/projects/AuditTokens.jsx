import { useMemo, useRef, useState } from 'react'
import { CaseMasthead, CaseHero, CaseFooter } from '../CaseFile'
import { dossierNo } from '../projects'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'
import { analyse } from '../audit/analyse'
import { extraireUsagesTokens, mesurerCouverture } from '../audit/couverture'
import { evaluerContrastes } from '../audit/contrastes'
import { evaluerGrille, appliquerAjustements } from '../audit/grille'
import { prioriser } from '../audit/priorites'
import { GRAVITES } from '../audit/outils'
import { Bouton, Tuile } from './audit/ui'
import { FORMAT_LABEL_MONO } from './audit/styles'
import { CONTENT } from './audit/contenu'
import { FiltreGravite, GroupeRegle } from './audit/Constats'
import { libelleFormat, construireRapport, REGLES_IDS } from './audit/rapportTexte'
import SourceGithub from './audit/SourceGithub'
import Couverture from './audit/Couverture'
import Grille from './audit/Grille'
import Matrice from './audit/Matrice'
import RapportImprimable from './audit/RapportImprimable'
import Cta from './audit/Cta'
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

const EXEMPLES = {
  css: { nom: 'exemple.css', contenu: exempleCss },
  dtcg: { nom: 'exemple.dtcg.json', contenu: exempleDtcg },
  'tokens-studio': { nom: 'exemple.tokens-studio.json', contenu: exempleTokensStudio },
}
const FICHIER_SITE = { nom: 'src/styles/tokens.css', contenu: tokensDuSite }

export default function AuditTokens({ project }) {
  const { lang } = useLanguage()
  const isMobile = useIsMobile()
  const c = CONTENT[lang] ?? CONTENT.fr

  const [fichiers, setFichiers] = useState([]) // [{ id, nom, contenu, info: { format, tokens } }]
  const [texte, setTexte] = useState('')
  const [resultat, setResultat] = useState(null)
  const [couverture, setCouverture] = useState(null) // résultat de mesurerCouverture + source, mode GitHub seulement
  const [contexteCode, setContexteCode] = useState(null) // { fichiersCode, chemins, source, avertissements } d'un dépôt analysé
  const [contexteAudit, setContexteAudit] = useState(null) // ce qui a servi à la dernière analyse : { chemins, fichiersCode, source, noms }
  const [ajustements, setAjustements] = useState({}) // ajustements de l'auditeur par axe, remis à zéro à chaque analyse
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
      setContexteAudit({
        chemins: contexte?.chemins ?? null,
        fichiersCode: contexte?.fichiersCode ?? null,
        source: contexte?.source ?? null,
        noms: entrees.map((e) => e.nom),
        date: new Date().toLocaleDateString('sv-SE'), // AAAA-MM-JJ, pour le rapport imprimable
      })
    } catch {
      setResultat(analyse([]))
      setCouverture(null)
      setContexteAudit(null)
    }
    setAjustements({})
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
  function analyserDepot({ fichiersTokens, fichiersCode, chemins, avertissements, source }) {
    const entrees = fichiersTokens.map(({ nom, contenu }) => entreeFichier(nom, contenu))
    const contexte = { fichiersCode, chemins, source, avertissements }
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

  function ajuster(idAxe, ajustement) {
    setAjustements((prev) => {
      const suivant = { ...prev }
      if (ajustement === null) delete suivant[idAxe]
      else suivant[idAxe] = ajustement
      return suivant
    })
    setCopie(false)
  }

  // Grille et matrice : calculées sur l'analyse, puis la grille reçoit les ajustements de l'auditeur.
  const audit = useMemo(() => {
    if (!resultat) return null
    const contrastes = evaluerContrastes(resultat.tokens)
    const brute = evaluerGrille({
      resultat,
      couverture,
      chemins: contexteAudit?.chemins ?? null,
      contrastes,
      fichiersCode: contexteAudit?.fichiersCode ?? null,
    })
    return { contrastes, brute, priorites: prioriser({ resultat, couverture, grille: brute, contrastes }) }
  }, [resultat, couverture, contexteAudit])
  const grille = useMemo(() => (audit ? appliquerAjustements(audit.brute, ajustements) : null), [audit, ajustements])

  async function copierRapport() {
    if (!resultat) return
    try {
      await navigator.clipboard.writeText(construireRapport(resultat, c, lang, couverture, grille, audit?.priorites ?? null))
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

  const rapportDisponible = Boolean(grille && (!lieuVide || couverture))

  return (
    <>
    <div className="no-print" style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: 'var(--font-body)', color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={page} lang={lang} />
      <CaseHero project={project} c={page} />

      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--prose)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 var(--space-xs)' }}>{c.intro}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 var(--space-xs)' }}>{c.formats}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.6, maxWidth: '70ch', margin: '0 0 var(--space-lg)' }}>{c.privacy}</p>

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
          padding: 'var(--space-md)',
          marginBottom: 'var(--space-md)',
        }}
      >
        <SourceGithub c={c} lang={lang} onAnalyser={analyserDepot} />

        <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 'var(--space-xs)' }}>{c.inputTitle} — {c.pasteLabel}</div>
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
            padding: 'var(--space-xs-plus)',
            resize: 'vertical',
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}
        />

        <div style={{ ...FORMAT_LABEL_MONO, margin: '14px 0 var(--space-xs)' }}>{c.pickLabel}</div>
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
              padding: 'var(--space-xs) 14px',
              cursor: 'pointer',
            }}
          >
            {c.pickButton}
          </span>
        </label>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted)', marginLeft: 'var(--space-sm)' }}>{c.dropHint}</span>

        {fichiers.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 6 }}>{c.filesTitle}</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, border: 'var(--border-thin) solid var(--border)' }}>
              {fichiers.map((f) => (
                <li
                  key={f.id}
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-2xs) var(--space-sm)', padding: '6px var(--space-xs-plus)', borderBottom: 'var(--border-thin) solid var(--grid-line)', background: 'var(--bg)' }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)', flex: '1 1 160px', overflowWrap: 'anywhere' }}>{f.nom}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: f.info.format ? 'var(--text2)' : 'var(--error)' }}>
                    {libelleFormat(f.info.format, c)} · {c.tokensCount(f.info.tokens)}
                  </span>
                  <button
                    type="button"
                    onClick={() => retirer(f.id)}
                    aria-label={`${c.remove} ${f.nom}`}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', color: 'var(--text2)', background: 'transparent', border: 'var(--border-thin) solid var(--border)', padding: 'var(--space-3xs) var(--space-xs)', cursor: 'pointer' }}
                  >
                    {c.remove} ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-xs-plus)', marginBottom: 'var(--space-xl)' }}>
        <Bouton principal onClick={() => lancerAnalyse(fichiers, texte)}>{c.analyze}</Bouton>
        <span style={{ ...FORMAT_LABEL_MONO, marginLeft: 'var(--space-xs)' }}>{c.examplesLabel}</span>
        {Object.keys(EXEMPLES).map((cle) => (
          <Bouton key={cle} onClick={() => chargerModele(EXEMPLES[cle])}>{c.examples[cle]}</Bouton>
        ))}
        <Bouton onClick={() => chargerModele(FICHIER_SITE)}>{c.auditSite}</Bouton>
      </div>

      {/* --- Résultat ---------------------------------------------------- */}
      {resultat && (
        <div aria-live="polite">
          <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 'var(--space-xs-plus)' }}>{c.resultsTitle}</div>

          {resultat.avertissements.length > 0 && (
            <div style={{ border: 'var(--border-thin) solid var(--border)', background: 'var(--bg2)', padding: 'var(--space-xs-plus) 14px', marginBottom: 'var(--space-md)' }}>
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

          {rapportDisponible && (
            <>
              <Grille grille={grille} contrastes={audit.contrastes} c={c} lang={lang} onAjuster={ajuster} />
              <Matrice priorites={audit.priorites} c={c} lang={lang} />
            </>
          )}

          {lieuVide ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', margin: '0 0 var(--space-sm)' }}>{couverture ? c.gh.noTokensRepo : c.noTokens}</p>
          ) : (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs-plus)', marginBottom: 'var(--space-sm)' }}>
                <Tuile label={c.summary.files} valeur={resume.fichiers} />
                <Tuile label={c.summary.tokens} valeur={resume.tokens} note={Object.entries(resume.tokensParFormat).map(([f, n]) => `${c.formatNames[f]} ${n}`).join(' · ')} />
                <Tuile label={c.summary.healthy} valeur={`${Math.round(resume.partSaine * 100)} %`} note={c.summary.healthyNote} />
                {GRAVITES.map((g) => (
                  <Tuile key={g} label={c.severities[g].toUpperCase()} valeur={resume.constatsParGravite[g]} />
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginBottom: 'var(--space-md-plus)', overflowWrap: 'anywhere' }}>
                {c.summary.byType} : {Object.entries(resume.tokensParType).map(([t, n]) => `${t === 'inconnu' ? c.summary.unknownType : t} ${n}`).join(' · ')}
              </div>

              {resultat.constats.length === 0 ? (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--text)', border: 'var(--border-thin) solid var(--border)', borderLeft: 'var(--border-thick) solid var(--primary)', background: 'var(--bg2)', padding: '14px var(--space-md)', margin: '0 0 var(--space-lg)' }}>
                  {c.allClear}
                </p>
              ) : (
                <>
                  <div style={{ marginBottom: 'var(--space-sm)' }}>
                    <div style={{ ...FORMAT_LABEL_MONO, marginBottom: 'var(--space-xs)' }}>{c.filterLabel}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
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

          {rapportDisponible && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs-plus)', marginTop: 'var(--space-xs)' }}>
              <Bouton onClick={copierRapport}>{copie ? c.copied : c.copyReport}</Bouton>
              <Bouton principal onClick={() => window.print()}>{c.grille.exportPdf}</Bouton>
            </div>
          )}
        </div>
      )}

      <Cta c={c} />

      <CaseFooter c={page} />
    </div>

    {/* Rapport d'audit : invisible à l'écran, seul visible à l'impression (Exporter en PDF). */}
    {rapportDisponible && (
      <RapportImprimable c={c} lang={lang} grille={grille} priorites={audit.priorites} resultat={resultat} couverture={couverture} contexte={contexteAudit} />
    )}
    </>
  )
}
