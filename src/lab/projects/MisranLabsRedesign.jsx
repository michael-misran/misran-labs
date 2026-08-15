import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import { useLanguage } from '../../shell/LanguageContext'

function MethodStep({ n, title, children }) {
  return (
    <li>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--teal)',
            flexShrink: 0,
          }}
        >
          {n}
        </span>
        <strong style={{ color: 'var(--text)', fontFamily: "'Space Grotesk', sans-serif", fontSize: 14 }}>
          {title}
        </strong>
      </div>
      <div style={{ paddingLeft: 30 }}>{children}</div>
    </li>
  )
}

const CONTENT = {
  fr: {
    title: 'Création du lab',
    role: 'Product Designer & Développeur — seul sur le projet',
    period: 'Août 2026',
    tools: ['React', 'React Router', 'SVG fait main'],
    contextTitle: 'Contexte',
    context: "Misran Labs c'est un laboratoire d'expérimentation. Ce qui compte, c'est ce qui va être construit et comment je vais le construire : un roman, un jeu vidéo, une application, ou autre chose encore. Chaque projet qui passera par ce lab sera documenté avec la même exigence : les étapes suivies, les réflexions, les doutes en cours de route, et les chiffres quand il y en a.",
    methodTitle: 'Méthode',
    methodIntro: "Je vais utiliser une démarche scientifique pour résoudre mes problèmes. Ce qui suit me servira de guide — je ne sais pas encore si toutes les étapes seront pertinentes. Mais bon, c'est un début.",
    steps: [
      { title: "L'Observation et la Problématique", body: "Identifier un phénomène particulier, une anomalie ou un problème non résolu, puis formuler une question précise (« Pourquoi X se produit-il ? »)." },
      { title: "L'Hypothèse", body: "Proposer une explication provisoire ou une solution théorique. Pour être qualifiée de scientifique, une hypothèse doit impérativement être réfutable (falsifiable), c'est-à-dire qu'on doit pouvoir concevoir une expérience capable de prouver qu'elle est fausse." },
      { title: 'L\'Expérimentation (ou Protocole de test)', body: "Concevoir et exécuter un test rigoureux sous conditions contrôlées (avec variables mesurables et groupe témoin) pour confronter l'hypothèse au réel." },
      { title: 'L\'Analyse des résultats', body: 'Collecter, traiter et interpréter les données brutes issues de l\'expérience (mesures, statistiques, observations), de manière neutre et sans biais de confirmation.' },
      {
        title: "La Conclusion et l'Itération",
        branches: [
          { label: "Si l'hypothèse est confirmée : ", text: "Les résultats sont consolidés, soumis à l'évaluation par les pairs (peer review) et intégrés dans un modèle ou une théorie plus vaste." },
          { label: "Si l'hypothèse est réfutée : ", text: "L'expérience montre que l'idée de départ était fausse ou incomplète. On ajuste ou reformule l'hypothèse, puis on recommence la boucle à l'étape 2." },
        ],
      },
    ],
  },
  en: {
    title: 'Building the lab',
    role: 'Product Designer & Developer — solo project',
    period: 'August 2026',
    tools: ['React', 'React Router', 'Hand-made SVG'],
    contextTitle: 'Context',
    context: "Misran Labs is an experimentation lab. What matters is what gets built and how I build it: a novel, a video game, an app, or something else entirely. Every project that goes through this lab will be documented with the same rigor: the steps followed, the reflections, the doubts along the way, and the numbers when there are any.",
    methodTitle: 'Method',
    methodIntro: "I'm going to use a scientific approach to solve my problems. What follows will serve as a guide — I don't know yet if every step will be relevant. But hey, it's a start.",
    steps: [
      { title: 'Observation and the Problem', body: 'Identify a particular phenomenon, an anomaly, or an unsolved problem, then formulate a precise question ("Why does X happen?").' },
      { title: 'The Hypothesis', body: 'Propose a provisional explanation or theoretical solution. To qualify as scientific, a hypothesis must be falsifiable — meaning it must be possible to design an experiment that could prove it wrong.' },
      { title: 'Experimentation (or Test Protocol)', body: 'Design and run a rigorous test under controlled conditions (with measurable variables and a control group) to confront the hypothesis with reality.' },
      { title: 'Analyzing the Results', body: 'Collect, process, and interpret the raw data from the experiment (measurements, statistics, observations), neutrally and without confirmation bias.' },
      {
        title: 'Conclusion and Iteration',
        branches: [
          { label: 'If the hypothesis is confirmed: ', text: 'The results are consolidated, submitted to peer review, and integrated into a broader model or theory.' },
          { label: 'If the hypothesis is refuted: ', text: 'The experiment shows the original idea was wrong or incomplete. The hypothesis is adjusted or reformulated, and the loop restarts at step 2.' },
        ],
      },
    ],
  },
}

export default function MisranLabsRedesign({ project }) {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr

  return (
    <CaseStudyLayout
      title={c.title}
      role={c.role}
      period={c.period}
      tools={c.tools}
      phases={project?.phases}
    >
      <Section title={c.contextTitle}>
        <p>{c.context}</p>
      </Section>

      <Section title={c.methodTitle}>
        <p style={{ marginBottom: 20 }}>{c.methodIntro}</p>

        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {c.steps.map((step, i) => (
            <MethodStep key={i} n={String(i + 1).padStart(2, '0')} title={step.title}>
              {step.branches ? (
                <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {step.branches.map((b, j) => (
                    <li key={j}>
                      <strong style={{ color: 'var(--text)' }}>{b.label}</strong>
                      {b.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0 }}>{step.body}</p>
              )}
            </MethodStep>
          ))}
        </ol>
      </Section>
    </CaseStudyLayout>
  )
}
