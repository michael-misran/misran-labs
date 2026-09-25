import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SectionTitle from '../../design-system/SectionTitle'
import { useLanguage } from '../../shell/LanguageContext'

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420 }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                  padding: '0 12px 10px 0',
                  borderBottom: 'var(--border-thin) solid var(--border)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: j === 0 ? 'var(--text)' : 'var(--text2)',
                    fontWeight: j === 0 ? 600 : 400,
                    padding: '12px 12px 12px 0',
                    borderBottom: 'var(--border-thin) solid var(--border)',
                    lineHeight: 1.5,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StakeholderCard({ name, brings, bringsLabel, ritual, ritualLabel, output, outputLabel, pitfall, pitfallLabel }) {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: 'var(--border-thin) solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
        {name}
      </div>
      {[
        [bringsLabel, brings],
        [ritualLabel, ritual],
        [outputLabel, output],
      ].map(([label, value], i) => (
        <div key={i}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: 4 }}>
            {label}
          </div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
            {value}
          </div>
        </div>
      ))}
      <div
        style={{
          borderTop: 'var(--border-thin) solid var(--border)',
          paddingTop: 12,
          marginTop: 2,
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--warning)', letterSpacing: '0.06em', marginBottom: 4 }}>
          {pitfallLabel}
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>
          {pitfall}
        </div>
      </div>
    </div>
  )
}

const CONTENT = {
  fr: {
    title: 'Workflow multi-produits — Guideline',
    intro:
      "Deux responsabilités simultanées, jamais séquentielles : répondre aux besoins spécifiques de chaque produit (le run), et maintenir un design system et une cohérence de marque blanche communs à tous les produits (l'unification). Le risque du poste : le run mange 100% du temps et l'unification devient un chantier qu'on ne fait jamais.",
    introRulesLabel: 'Les règles :',
    introRules: [
      "L'unification n'est pas une tâche en plus, c'est un filtre appliqué à chaque tâche de run.",
      'Toujours rester souple.',
    ],

    timeTitle: 'Répartition du temps',
    timeCols: ['Bloc', '%', 'Nature'],
    timeRows: [
      ['Run produit A / B / C', '60%', 'Réactif, cadencé par les sprints des équipes'],
      ['Design system & composants transverses', '25%', 'Proactif, cadencé par soi-même'],
      ['Rituels stakeholders', '15%', 'Fixe, non négociable'],
    ],
    timeNote: "Si le run dépasse 70% sur 2 semaines consécutives → signal d'alerte, à traiter en priorisation.",

    stakeholdersTitle: 'Parties prenantes',
    bringsLabel: 'CE QU\'IL APPORTE',
    ritualLabel: 'RITUEL',
    outputLabel: 'FORMAT DE SORTIE',
    pitfallLabel: 'PIÈGE À ÉVITER',
    stakeholders: [
      {
        name: 'Utilisateur',
        brings: 'Besoin réel, frictions, langage métier.',
        ritual: 'Test utilisateur ou entretien court (15-20 min), à minima 1x/2 semaines par produit actif.',
        output: 'Synthèse en 5 lignes max, insight → implication design, partagée avec produit et tech le jour même.',
        pitfall: 'Ne jamais designer une réponse à une seule voix utilisateur — croiser avec les données produit (analytics, support).',
      },
      {
        name: 'Produit',
        brings: 'Priorité, contrainte business, definition of done.',
        ritual: 'Point hebdo de cadrage (30 min) — ce qui rentre dans le sprint, ce qui sort — et canal direct ouvert en permanence.',
        output: 'Maquette validée + specs fonctionnelles annotées, jamais un lien Figma nu sans contexte écrit.',
        pitfall: "Accepter un scope sans avoir vérifié l'impact sur le design system (nouveau composant = dette si non anticipée).",
      },
      {
        name: 'Tech (dev, devops)',
        brings: "Faisabilité, coût réel, contraintes d'infra et de perf.",
        ritual: 'Handoff structuré + disponibilité async continue — pas de rituel dédié, canal direct ouvert en permanence.',
        output: 'Composants documentés (états, responsive, edge cases), tokens nommés et exportables, jamais une capture isolée.',
        pitfall: "Livrer un design « idéal » sans avoir vérifié en amont avec un dev senior que c'est buildable dans le sprint.",
      },
    ],

    runFlowTitle: 'Flux — Le run (spécifique à un produit)',
    runFlow: [
      { label: '1 · Intake', sublabel: 'Un seul point d\'entrée par produit — pas de demandes orales non tracées' },
      { label: '2 · Triage', sublabel: 'Ça existe déjà dans le système ? Est-ce spécifique ou généralisable ? Impact vs effort sur ce sprint ?' },
      { label: '3 · Design', sublabel: 'Dans les composants existants en priorité — un nouveau composant est une décision explicite' },
      { label: '4 · Handoff dev', sublabel: 'Specs + états + tokens — jamais de retouche visuelle post-dev sans repasser par la spec' },
      { label: '5 · QA visuelle', sublabel: 'Avant mise en prod, sur le produit réel, pas sur la maquette' },
      { label: '6 · Boucle utilisateur', sublabel: "Mesurer l'usage réel sous 2 à 4 semaines, ajuster si besoin" },
    ],

    explorationTitle: 'Piste en cours — maquettes générées par IA depuis le repo produit',
    explorationIntro:
      "Exploration en cours sur l'étape Design du run : plutôt que de repartir de zéro dans Figma, donner à une IA un accès direct au dépôt du produit (composants, tokens, données) pour générer la maquette.",
    explorationGains: [
      'Utilisation directe du JSON et des tokens des devs — plus de retranscription manuelle dans Figma, donc plus de dérive entre design et code.',
      "Maquette toujours alignée sur l'état réel du produit (composants, états, contenus) au lieu d'une photo figée au jour de la conception.",
      'Itération plus rapide sur des variantes, sans fichier Figma à maintenir en parallèle du code.',
      'Un seul design system à faire vivre — plus de double maintenance entre la librairie Figma et la librairie de composants.',
    ],

    unifyFlowTitle: 'Flux — L\'unification (design system & marque blanche)',
    unifyFlow: [
      { label: '1 · Détection', sublabel: 'Repérer ce qui a été redessiné localement pour un besoin en réalité commun à plusieurs produits' },
      { label: '2 · Arbitrage', sublabel: 'Un pattern rejoint le système s\'il sert au moins 2 produits ou s\'il est structurant pour la marque — sinon il reste local' },
      { label: '3 · Spécification', sublabel: 'Tokens, variants, règles d\'usage — documentés une seule fois, consommés partout' },
      { label: '4 · Déploiement progressif', sublabel: 'Jamais de migration big-bang — chaque produit adopte au fil de son propre cycle de run' },
      { label: '5 · Marque blanche', sublabel: 'Séparer strictement le token de marque (surchargeable) du structurel (non négociable)' },
      { label: '6 · Gouvernance', sublabel: 'Un seul point de vérité, changelog à chaque évolution — pas de fork silencieux par produit' },
    ],

    arbitrationTitle: 'Arbitrage des conflits run vs unification',
    arbitrationIntro: "Quand un produit demande une exception au système :",
    arbitrationItems: [
      'Écouter la contrainte réelle (business, technique, utilisateur) — pas de refus de principe.',
      'Chercher si le système peut absorber le cas via une variante plutôt qu\'une dérogation totale.',
      'Si dérogation nécessaire : la documenter comme telle (dette assumée), avec une date de revue.',
      'Ne jamais laisser une dérogation devenir la norme silencieuse d\'un produit.',
    ],

    cadenceTitle: 'Cadence hebdomadaire type',
    cadenceCols: ['Jour', 'Focus'],
    cadenceRows: [
      ['Lundi', 'Cadrage produit (multi-produits), triage des demandes de la semaine'],
      ['Mardi – Mercredi', 'Run — design et handoff dev sur les produits actifs'],
      ['Jeudi', 'Design system — traitement des divergences détectées, documentation, tokens'],
      ['Vendredi', 'Rituels utilisateurs, QA visuelle en prod, synthèse envoyée aux stakeholders'],
    ],

    metricsTitle: 'Indicateurs de succès',
    metrics: [
      { label: 'Run', text: 'Délai moyen entrée → livraison par produit, taux de retouche post-dev.' },
      { label: 'Unification', text: 'Part des composants du run réutilisant le design system (vs redessinés), nombre de divergences actives non résolues.' },
      { label: 'Stakeholders', text: 'Fréquence réelle des rituels tenue, délai de réponse aux demandes tech async.' },
    ],
  },
  en: {
    title: 'Multi-product Workflow — Guideline',
    intro:
      "Two responsibilities running at once, never sequentially: answering each product's specific needs (the run), and keeping a design system and white-label consistency shared across every product (unification). The risk of the role: the run eats 100% of the time and unification becomes a project that never happens.",
    introRulesLabel: 'The rules:',
    introRules: [
      "Unification isn't an extra task, it's a filter applied to every run task.",
      'Always stay flexible.',
    ],

    timeTitle: 'Time allocation',
    timeCols: ['Block', '%', 'Nature'],
    timeRows: [
      ['Run — product A / B / C', '60%', "Reactive, paced by each team's sprints"],
      ['Design system & cross-product components', '25%', 'Proactive, self-paced'],
      ['Stakeholder rituals', '15%', 'Fixed, non-negotiable'],
    ],
    timeNote: 'If the run exceeds 70% over 2 consecutive weeks → warning sign, raise it in prioritization.',

    stakeholdersTitle: 'Stakeholders',
    bringsLabel: 'WHAT THEY BRING',
    ritualLabel: 'RITUAL',
    outputLabel: 'OUTPUT FORMAT',
    pitfallLabel: 'PITFALL TO AVOID',
    stakeholders: [
      {
        name: 'User',
        brings: 'Real need, friction points, domain language.',
        ritual: 'Short user test or interview (15-20 min), at least once every 2 weeks per active product.',
        output: 'A 5-line-max summary — insight → design implication — shared with product and tech the same day.',
        pitfall: "Never design a response to a single user's voice — cross-check against product data (analytics, support).",
      },
      {
        name: 'Product',
        brings: 'Priority, business constraint, definition of done.',
        ritual: 'Weekly 30-min framing session — what enters the sprint, what drops out — and a direct channel always open.',
        output: 'Validated mockup + annotated functional specs — never a bare Figma link with no written context.',
        pitfall: "Accepting scope without checking the design-system impact first (a new component is debt if unplanned).",
      },
      {
        name: 'Tech (dev, devops)',
        brings: 'Feasibility, real cost, infra and performance constraints.',
        ritual: 'Structured handoff + continuous async availability — no dedicated ritual, a direct channel always open.',
        output: 'Documented components (states, responsive, edge cases), named and exportable tokens — never an isolated screenshot.',
        pitfall: 'Shipping an "ideal" design without checking upfront with a senior dev that it\'s buildable within the sprint.',
      },
    ],

    runFlowTitle: 'Flow — The run (product-specific)',
    runFlow: [
      { label: '1 · Intake', sublabel: 'A single entry point per product — no untracked verbal requests' },
      { label: '2 · Triage', sublabel: 'Does it already exist in the system? Product-specific or generalizable? Impact vs. effort this sprint?' },
      { label: '3 · Design', sublabel: 'Within existing components first — a new component is an explicit decision' },
      { label: '4 · Dev handoff', sublabel: 'Specs + states + tokens — no visual tweak post-dev without going back through the spec' },
      { label: '5 · Visual QA', sublabel: 'Before shipping, on the real product, never on the mockup' },
      { label: '6 · User loop', sublabel: 'Measure real usage over 2 to 4 weeks, adjust if needed' },
    ],

    explorationTitle: 'Work in progress — AI-generated mockups from the product repo',
    explorationIntro:
      "Ongoing exploration on the run's Design step: instead of starting from scratch in Figma, giving an AI direct access to the product's repo (components, tokens, data) to generate the mockup.",
    explorationGains: [
      "Direct use of the devs' JSON and tokens — no more manual retranscription into Figma, so no drift between design and code.",
      'The mockup stays aligned with the real state of the product (components, states, content) instead of a snapshot frozen at design time.',
      'Faster iteration on variants, with no Figma file to maintain alongside the code.',
      'One single design system to maintain — no more double maintenance between the Figma library and the component library.',
    ],

    unifyFlowTitle: 'Flow — Unification (design system & white label)',
    unifyFlow: [
      { label: '1 · Detection', sublabel: 'Spot what was redesigned locally for a need that is actually shared across products' },
      { label: '2 · Arbitration', sublabel: 'A pattern joins the system if it serves 2+ products or is structural to the brand — otherwise it stays local' },
      { label: '3 · Specification', sublabel: 'Tokens, variants, usage rules — documented once, consumed everywhere' },
      { label: '4 · Progressive rollout', sublabel: 'Never a big-bang migration — each product adopts it within its own run cycle' },
      { label: '5 · White label', sublabel: 'Strictly separate brand tokens (overridable) from structural ones (non-negotiable)' },
      { label: '6 · Governance', sublabel: 'One single source of truth, a changelog on every change — no silent per-product fork' },
    ],

    arbitrationTitle: 'Arbitrating run vs. unification conflicts',
    arbitrationIntro: 'When a product asks for an exception to the system:',
    arbitrationItems: [
      'Listen to the real constraint (business, technical, user) — no refusal on principle.',
      'Check whether the system can absorb the case as a variant rather than a full exception.',
      'If an exception is necessary: document it as such (deliberate debt), with a review date.',
      "Never let an exception silently become a product's default.",
    ],

    cadenceTitle: 'Typical weekly cadence',
    cadenceCols: ['Day', 'Focus'],
    cadenceRows: [
      ['Monday', "Product framing (multi-product), triage of the week's requests"],
      ['Tuesday – Wednesday', 'Run — design and dev handoff on active products'],
      ['Thursday', 'Design system — handling detected divergences, documentation, tokens'],
      ['Friday', 'User rituals, in-production visual QA, weekly summary sent to stakeholders'],
    ],

    metricsTitle: 'Success metrics',
    metrics: [
      { label: 'Run', text: 'Average intake-to-ship time per product, post-dev rework rate.' },
      { label: 'Unification', text: 'Share of run components reusing the design system (vs. redesigned), number of unresolved active divergences.' },
      { label: 'Stakeholders', text: 'Actual ritual cadence held, response time on async tech requests.' },
    ],
  },
}

export default function WorkflowSolo() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr

  return (
    <CaseStudyLayout title={c.title}>
      <div style={{ maxWidth: 720, marginBottom: 40 }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--prose)', lineHeight: 1.7, margin: '0 0 20px' }}>
          {c.intro}
        </p>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--prose)', fontWeight: 600, marginBottom: 8 }}>
          {c.introRulesLabel}
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "var(--font-body)", fontSize: 15, color: 'var(--prose)', lineHeight: 1.7 }}>
          {c.introRules.map((rule, i) => <li key={i}>{rule}</li>)}
        </ul>
      </div>

      <Section title={c.timeTitle}>
        <Table columns={c.timeCols} rows={c.timeRows} />
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: 'var(--muted)', margin: 0 }}>{c.timeNote}</p>
      </Section>

      <div style={{ marginBottom: 40 }}>
        <SectionTitle>{c.stakeholdersTitle}</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {c.stakeholders.map((s, i) => (
            <StakeholderCard
              key={i}
              name={s.name}
              brings={s.brings}
              bringsLabel={c.bringsLabel}
              ritual={s.ritual}
              ritualLabel={c.ritualLabel}
              output={s.output}
              outputLabel={c.outputLabel}
              pitfall={s.pitfall}
              pitfallLabel={c.pitfallLabel}
            />
          ))}
        </div>
      </div>

      <Section title={c.runFlowTitle}>
        <FlowDiagram steps={c.runFlow} direction="vertical" />
      </Section>

      <Section title={c.explorationTitle}>
        <p style={{ marginBottom: 12 }}>{c.explorationIntro}</p>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {c.explorationGains.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </Section>

      <Section title={c.unifyFlowTitle}>
        <FlowDiagram steps={c.unifyFlow} direction="vertical" />
      </Section>

      <Section title={c.arbitrationTitle}>
        <p style={{ marginBottom: 12 }}>{c.arbitrationIntro}</p>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {c.arbitrationItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </Section>

      <Section title={c.cadenceTitle}>
        <Table columns={c.cadenceCols} rows={c.cadenceRows} />
      </Section>

      <Section title={c.metricsTitle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {c.metrics.map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.06em', marginBottom: 4 }}>
                {m.label.toUpperCase()}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </CaseStudyLayout>
  )
}
