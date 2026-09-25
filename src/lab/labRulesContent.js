// Contenu des règles du Lab, partagé par HomeModule (grille de cards) et
// ArchiveHome (planche de protocole). Vit ici et non dans l'un des deux
// modules pour éviter un import circulaire entre eux.
export const RULES_CONTENT = {
  fr: {
    title: 'Les règles du Lab',
    intro: "Chaque projet de ce Lab est documenté avec la même grille — les 5 étapes de la démarche scientifique. Le but : pouvoir raconter honnêtement où en est un projet, plutôt qu'une histoire plus belle que la réalité après coup.",
    steps: [
      { title: "L'Observation et la Problématique", desc: 'Un problème réel, observé, reformulé en question précise et vérifiable.' },
      { title: "L'Hypothèse", desc: 'Une réponse provisoire, formulée de façon réfutable — on doit pouvoir dire à l\'avance ce qui la contredirait.' },
      { title: "L'Expérimentation", desc: "Ce qui a été construit ou testé pour vérifier l'hypothèse." },
      { title: "L'Analyse des résultats", desc: 'Ce qui a été vérifié, honnêtement — y compris ce qui ne fonctionne pas encore.' },
      { title: "La Conclusion et l'Itération", desc: "Ce qu'on en tire, et la suite : itérer, arrêter, ou changer de piste." },
    ],
    statusLabel: 'STATUTS UTILISÉS',
  },
  en: {
    title: 'The Lab’s rules',
    intro: "Every project in this Lab is documented with the same framework — the 5 steps of the scientific method. The point: being able to honestly say where a project actually stands, rather than a nicer story told after the fact.",
    steps: [
      { title: 'Observation and the Problem', desc: 'A real problem, observed, reframed into a precise, checkable question.' },
      { title: 'The Hypothesis', desc: "A provisional answer, stated so it's falsifiable — you should be able to say in advance what would prove it wrong." },
      { title: 'Experimentation', desc: 'What was built or tested to check the hypothesis.' },
      { title: 'Analyzing the Results', desc: "What was actually verified, honestly — including what doesn't work yet." },
      { title: 'Conclusion and Iteration', desc: 'What comes out of it, and what’s next: iterate, stop, or change direction.' },
    ],
    statusLabel: 'STATUSES USED',
  },
}
