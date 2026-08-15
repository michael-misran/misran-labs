import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import { STATUS } from '../phases'
import { useLanguage } from '../../shell/LanguageContext'

function MethodCoverage({ steps, lang, coverageLabel }) {
  const statusMap = STATUS[lang] ?? STATUS.fr

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: 'var(--muted)',
          letterSpacing: '0.1em',
          marginBottom: 10,
        }}
      >
        {coverageLabel}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {steps.map((step, i) => {
          const s = statusMap[step.status] ?? statusMap.skipped
          return (
            <div
              key={i}
              title={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 4,
                border: `1px solid ${s.color}`,
                background: step.status === 'done' ? 'var(--active-tint)' : 'transparent',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: s.color,
                  flexShrink: 0,
                  opacity: step.status === 'skipped' ? 0.5 : 1,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: step.status === 'skipped' ? 'var(--muted)' : 'var(--text)',
                }}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

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
    coverageLabel: '// APPLICATION DE LA MÉTHODE',
    steps: [
      { title: "L'Observation et la Problématique", status: 'done', body: "Identifier un phénomène particulier, une anomalie ou un problème non résolu, puis formuler une question précise (« Pourquoi X se produit-il ? »)." },
      { title: "L'Hypothèse", status: 'partial', body: "Proposer une explication provisoire ou une solution théorique. Pour être qualifiée de scientifique, une hypothèse doit impérativement être réfutable (falsifiable), c'est-à-dire qu'on doit pouvoir concevoir une expérience capable de prouver qu'elle est fausse." },
      { title: 'L\'Expérimentation (ou Protocole de test)', status: 'skipped', body: "Concevoir et exécuter un test rigoureux sous conditions contrôlées (avec variables mesurables et groupe témoin) pour confronter l'hypothèse au réel." },
      { title: 'L\'Analyse des résultats', status: 'partial', body: 'Collecter, traiter et interpréter les données brutes issues de l\'expérience (mesures, statistiques, observations), de manière neutre et sans biais de confirmation.' },
      {
        title: "La Conclusion et l'Itération",
        status: 'done',
        branches: [
          { label: "Si l'hypothèse est confirmée : ", text: "Les résultats sont consolidés, soumis à l'évaluation par les pairs (peer review) et intégrés dans un modèle ou une théorie plus vaste." },
          { label: "Si l'hypothèse est réfutée : ", text: "L'expérience montre que l'idée de départ était fausse ou incomplète. On ajuste ou reformule l'hypothèse, puis on recommence la boucle à l'étape 2." },
        ],
      },
    ],
    planningTitle: 'Itération — anticiper trop tôt',
    planningIntro: "Une réflexion sur une architecture pluridisciplinaire (roman, jeu vidéo, application, outil système) avec filtres par statut et par domaine, badges système en direct, et une nouvelle trame de fiche projet en 6 étapes. Après relecture : la structure est dimensionnée pour 8+ projets alors qu'il y en a 3 aujourd'hui, elle introduit une troisième trame concurrente alors que la Méthode ci-dessus en propose déjà une, et les badges système en direct réintroduisent exactement la décoration retirée plus tôt (horloge, météo, uptime).",
    planningFlow: [
      { label: 'Constat', sublabel: 'Besoin d\'une architecture capable d\'accueillir des projets de nature très différente (roman, jeu vidéo, appli, outil), avec filtres par statut et par domaine' },
      { label: 'Risque identifié', sublabel: 'Dimensionnée pour 8+ projets alors qu\'il y en a 3 ; une troisième trame de fiche projet concurrence la Méthode déjà publiée ; les badges système réintroduisent la décoration déjà retirée' },
      { label: 'Décision', sublabel: 'Pas de filtres ni de dashboard pour l\'instant — la sidebar reste plate jusqu\'à avoir assez de projets réels. Une seule trame de référence : les 5 étapes de Méthode déjà publiées' },
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
    coverageLabel: '// METHOD COVERAGE',
    steps: [
      { title: 'Observation and the Problem', status: 'done', body: 'Identify a particular phenomenon, an anomaly, or an unsolved problem, then formulate a precise question ("Why does X happen?").' },
      { title: 'The Hypothesis', status: 'partial', body: 'Propose a provisional explanation or theoretical solution. To qualify as scientific, a hypothesis must be falsifiable — meaning it must be possible to design an experiment that could prove it wrong.' },
      { title: 'Experimentation (or Test Protocol)', status: 'skipped', body: 'Design and run a rigorous test under controlled conditions (with measurable variables and a control group) to confront the hypothesis with reality.' },
      { title: 'Analyzing the Results', status: 'partial', body: 'Collect, process, and interpret the raw data from the experiment (measurements, statistics, observations), neutrally and without confirmation bias.' },
      {
        title: 'Conclusion and Iteration',
        status: 'done',
        branches: [
          { label: 'If the hypothesis is confirmed: ', text: 'The results are consolidated, submitted to peer review, and integrated into a broader model or theory.' },
          { label: 'If the hypothesis is refuted: ', text: 'The experiment shows the original idea was wrong or incomplete. The hypothesis is adjusted or reformulated, and the loop restarts at step 2.' },
        ],
      },
    ],
    planningTitle: 'Iteration — planning too far ahead',
    planningIntro: "A reflection on a multi-disciplinary architecture (novel, video game, web app, system tool) with status and domain filters, live system badges, and a new 6-step project template. On review: the structure is sized for 8+ projects when there are only 3 today, it introduces a third, competing template when the Method above already provides one, and the live system badges bring back exactly the kind of decoration removed earlier (clock, weather, uptime).",
    planningFlow: [
      { label: 'Observation', sublabel: 'Need for an architecture able to hold very different kinds of projects (novel, video game, app, tool), with filters by status and by domain' },
      { label: 'Risk identified', sublabel: 'Sized for 8+ projects when there are only 3; a third project template competes with the Method already published; system badges bring back decoration already removed' },
      { label: 'Decision', sublabel: 'No filters or dashboard for now — the sidebar stays flat until there are enough real projects. One reference template: the 5 Method steps already published' },
    ],
  },
}

export default function MisranLabsRedesign() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr

  return (
    <CaseStudyLayout
      title={c.title}
      role={c.role}
      period={c.period}
      tools={c.tools}
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

      <MethodCoverage steps={c.steps} lang={lang} coverageLabel={c.coverageLabel} />

      <Section title={c.planningTitle}>
        <p style={{ marginBottom: 16 }}>{c.planningIntro}</p>
        <FlowDiagram steps={c.planningFlow} direction="vertical" />
      </Section>
    </CaseStudyLayout>
  )
}
