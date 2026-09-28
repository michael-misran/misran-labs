// Mise en forme de la grille et de la matrice, partagée par l'écran, le rapport
// Markdown copié et le rapport imprimable (une seule source des libellés).
import { QUADRANTS } from '../../audit/priorites'

const MAX_ECHECS_CONTRASTE = 20

// Nombre à décimale : virgule en français, point en anglais.
// Unité d'un sujet accordée au compte : « 1 constat », « 3 constats ».
export function uniteSujet(sujet, lang) {
  const u = sujet.unite[lang]
  return sujet.compte === 1 ? u.replace(/^(\S+)s\b/, '$1') : u
}

export function formaterNombre(n, lang) {
  const t = String(n)
  return lang === 'en' ? t : t.replace('.', ',')
}

// « 2 / 3 » ou « non évalué ».
export function texteNote(note, c) {
  return note === null || note === undefined ? c.grille.notRated : c.grille.scoreOf(note)
}

// Note finale d'un axe avec la mention de l'ajustement : « 2 / 3 — ajustée (calculée : non évalué) ».
export function texteNoteAxe(axe, c) {
  if (!axe.ajustee) return texteNote(axe.noteFinale, c)
  const calculee = axe.note === null ? c.grille.notRated : c.grille.scoreOf(axe.note)
  return `${texteNote(axe.noteFinale, c)} — ${c.grille.adjustedTag} (${c.grille.computedNote(calculee)})`
}

export function texteMoyenne(grille, c, lang) {
  if (grille.moyenne === null) return c.grille.noAverage
  return c.grille.average(formaterNombre(grille.moyenne, lang), grille.axesEvalues)
}

// Paires sous 4,5:1, les plus faibles d'abord (au plus 20) ; `reste` = celles qu'on n'affiche pas.
export function echecsContraste(contrastes) {
  const echecs = (contrastes?.paires ?? []).filter((p) => !p.ok).sort((a, b) => a.ratio - b.ratio)
  return { affiches: echecs.slice(0, MAX_ECHECS_CONTRASTE), reste: Math.max(0, echecs.length - MAX_ECHECS_CONTRASTE) }
}

const nettoyerCellule = (texte) => String(texte).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ')

// Lignes Markdown de la grille (avec ses critères) et de la matrice.
export function lignesGrille(grille, priorites, c, lang) {
  const g = c.grille
  const lignes = ['', `## ${g.reportGrid}`, '', `**${texteMoyenne(grille, c, lang)}**`, '']
  lignes.push(`| ${g.colAxis} | ${g.colScore} | ${g.colComment} |`, '| --- | --- | --- |')
  for (const axe of grille.axes) {
    lignes.push(`| ${axe.titre?.[lang] ?? ''} | ${nettoyerCellule(texteNoteAxe(axe, c))} | ${nettoyerCellule(axe.commentaire || '')} |`)
  }
  lignes.push('', `### ${g.reportCriteria}`, '')
  for (const axe of grille.axes) {
    lignes.push(`- **${axe.titre[lang]}** — ${axe.resume[lang]}`)
    for (const cr of axe.criteres) {
      lignes.push(`  - ${cr.ok === null ? g.marks.na : cr.ok ? g.marks.ok : g.marks.ko} ${cr.detail[lang]}`)
    }
  }
  lignes.push('', `## ${g.matrixTitle}`, '')
  if (priorites.sujets.length === 0) {
    lignes.push(g.noSubjects)
  } else {
    for (const q of QUADRANTS) {
      const sujets = priorites.quadrants[q.id]
      if (sujets.length === 0) continue
      lignes.push(`### ${q.titre[lang]}`, '')
      for (const s of sujets) {
        lignes.push(`- ${s.titre[lang]} — ${s.compte} ${uniteSujet(s, lang)} (${g.impact} ${g.levels[s.impact]}, ${g.effort} ${g.levels[s.effort]})`)
      }
      lignes.push('')
    }
    lignes.pop()
  }
  return lignes
}
