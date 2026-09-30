import { GRAVITES } from '../../audit/outils'
import { lignesGrille } from './rapportGrille'

export const REGLES_IDS = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8']

export function libelleFormat(format, c) {
  return format ? c.formatNames[format] : c.unknownFormat
}

export function emplacementTexte(constat, c) {
  if (!constat.fichier) return null
  if (constat.emplacement === null || constat.emplacement === undefined) return constat.fichier
  return typeof constat.emplacement === 'number'
    ? `${constat.fichier} · ${c.line} ${constat.emplacement}`
    : `${constat.fichier} · ${constat.emplacement}`
}

// Rapport Markdown, dans la langue de la page.
export function construireRapport(resultat, c, lang, couverture = null, grille = null, priorites = null) {
  const { resume } = resultat
  const lignes = [`# ${c.reportTitle}`, '', `## ${c.reportSummary}`, '']
  lignes.push(`- ${c.summary.files} : ${resume.fichiers}`)
  lignes.push(`- ${c.summary.tokens} : ${resume.tokens}`)
  if (resume.partSaine !== null) lignes.push(`- ${c.summary.healthy} : ${Math.round(resume.partSaine * 100)} % (${resume.tokensSains}/${resume.tokens})`)
  lignes.push(
    `- ${GRAVITES.map((g) => `${c.severities[g]} : ${resume.constatsParGravite[g]}`).join(' · ')}`
  )
  if (grille && priorites) lignes.push(...lignesGrille(grille, priorites, c, lang))
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
