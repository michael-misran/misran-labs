import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SectionTitle from '../../design-system/SectionTitle'
import { STATUS, METHOD_STEP_COLORS } from '../phases'
import { useLanguage } from '../../shell/LanguageContext'

function MethodCoverage({ steps, lang, coverageLabel }) {
  const statusMap = STATUS[lang] ?? STATUS.fr

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle>{coverageLabel}</SectionTitle>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {steps.map((step, i) => {
          const s = statusMap[step.status] ?? statusMap.skipped
          const color = step.status === 'skipped' ? statusMap.skipped.color : METHOD_STEP_COLORS[i]
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
                border: `1px solid ${color}`,
                background: `color-mix(in srgb, ${color} 12%, transparent)`,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: color,
                  flexShrink: 0,
                  opacity: step.status === 'skipped' ? 0.5 : 1,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
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
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--primary)', flexShrink: 0 }}>
          {n}
        </span>
        <strong style={{ color: 'var(--text)', fontFamily: "var(--font-heading)", fontSize: 14 }}>
          {title}
        </strong>
      </div>
      <div style={{ paddingLeft: 30 }}>{children}</div>
    </li>
  )
}

function StatusList({ title, items, color }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color, letterSpacing: '0.08em', marginBottom: 8 }}>
        {title}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}

const CONTENT = {
  fr: {
    title: 'MAIA',
    role: 'Product Designer & Développeur — seul sur le projet',
    period: 'Août 2026',
    tools: ['React', 'Middleware Vite (local, dev-only)', 'JSON'],
    contextTitle: 'Contexte',
    context: "MAIA — Mon Assistant Intelligent Autonome. Des infos personnelles éparpillées un peu partout (date de fin d'abonnement Navigo, factures traitées et en attente, comparatifs d'assurance, quand planter les glycines, suivi de candidatures) et l'envie d'un seul endroit où les stocker et se faire rappeler ce qui compte, plutôt que de tout garder en tête ou de fouiller mails et papiers à chaque fois.",
    methodTitle: 'Méthode',
    methodIntro: "Même grille d'analyse que pour le reste du Lab — les 5 étapes de la démarche scientifique.",
    coverageLabel: 'APPLICATION DE LA MÉTHODE',
    steps: [
      { title: "L'Observation et la Problématique", status: 'done', body: "Informations personnelles dispersées sur plusieurs canaux (mémoire, mails, papier), sans rappel proactif nulle part. Question précise : comment centraliser ces infos et se faire notifier avant une échéance, sans devoir tout re-suivre manuellement ?" },
      { title: "L'Hypothèse", status: 'done', body: "Une appli privée avec stockage structuré et rappels programmés peut résoudre ça. Hypothèse réfutable : si j'ajoute un abonnement ou une facture et que je suis notifié avant l'échéance sans y repenser moi-même, l'hypothèse tient. Sinon, non." },
      { title: 'L\'Expérimentation (ou Protocole de test)', status: 'partial', body: "Architecture retenue : un petit serveur local (middleware Vite, actif seulement en dev, jamais en prod) qui lit/écrit des fichiers JSON privés et gitignorés dans src/private/data/. Formulaires React pour ajouter/modifier/supprimer. Le déclenchement des rappels proactifs reste à trancher — voir la section dédiée plus bas." },
      { title: 'L\'Analyse des résultats', status: 'partial', body: "Vérifié : l'ajout d'un abonnement ou d'une facture écrit bien sur disque, persiste après rechargement de la page, et le build de production ne contient aucune trace de cette partie privée (vérifié en cherchant dans le bundle final). Pas encore vérifié : le déclenchement effectif d'un rappel." },
      {
        title: "La Conclusion et l'Itération",
        status: 'skipped',
        branches: [
          { label: "Si le mécanisme de rappel choisi fonctionne : ", text: "extension aux autres domaines (assurances, jardin, candidatures, gestion de projets)." },
          { label: "Si aucune des deux options ne convient : ", text: "réévaluer une troisième approche (ex : notification par email programmée) avant d'itérer." },
        ],
      },
    ],
    reminderTitle: 'Le mécanisme de rappel — décision en attente',
    reminderIntro: "Deux options testées, deux limites trouvées. Le choix final n'est pas encore fait — évalué entre une routine cloud et une tâche planifiée locale.",
    reminderFlow: [
      { label: 'Constat', sublabel: "Les fichiers de données sont volontairement gitignorés (confidentialité) — le mécanisme de rappel doit pouvoir les lire sans jamais les exposer" },
      { label: 'Option écartée : routine cloud', sublabel: "Un agent cloud tourne avec son propre clone git isolé — aucun accès aux fichiers privés jamais commités. Committer les données pour contourner casserait la confidentialité voulue dès le départ" },
      { label: 'Option écartée : tâche programmée en session', sublabel: "Existe mais liée à la session Claude en cours — meurt à sa fermeture, et expire de toute façon au bout de 7 jours maximum" },
      { label: 'Piste retenue, à confirmer', sublabel: "Tâche planifiée native macOS (launchd) : tourne en local indépendamment de Claude Code, lit les fichiers directement, notifie via macOS — aucune donnée ne sort de la machine" },
    ],
    statusTitle: 'État d\'avancement',
    doneItems: [
      'Architecture de stockage : middleware Vite dev-only + fichiers JSON privés dans src/private/data/',
      'Page privée /maia avec Contrats (abonnements et assurances, typés), Factures et Candidatures',
      'Rappels optionnels par entrée (switch) plutôt qu\'imposés partout',
      'Persistance vérifiée (écriture disque, survit au rechargement)',
      'Build de production vérifié sans fuite de données ni de code privé',
    ],
    todoItems: [
      'Trancher le mécanisme de rappel proactif (launchd local vs autre option)',
      'Mettre en place le rappel choisi et le tester sur un vrai cas (ex : fin Navigo)',
      'Étendre aux domaines restants : jardin, gestion de projets',
    ],
  },
  en: {
    title: 'MAIA',
    role: 'Product Designer & Developer — solo project',
    period: 'August 2026',
    tools: ['React', 'Vite middleware (local, dev-only)', 'JSON'],
    contextTitle: 'Context',
    context: "MAIA — my own autonomous assistant. Personal info scattered everywhere (when a transit pass expires, which bills are paid or pending, insurance comparisons, when to plant wisteria, job application tracking) and the wish for one place to store it and get reminded of what matters, instead of keeping it all in my head or digging through emails and paperwork every time.",
    methodTitle: 'Method',
    methodIntro: "Same framework as the rest of the Lab — the 5 steps of the scientific approach.",
    coverageLabel: 'METHOD COVERAGE',
    steps: [
      { title: 'Observation and the Problem', status: 'done', body: "Personal information scattered across memory, email, and paper, with no proactive reminder anywhere. Precise question: how do I centralize this info and get notified ahead of a deadline, without manually tracking it myself?" },
      { title: 'The Hypothesis', status: 'done', body: "A private app with structured storage and scheduled reminders can solve this. Falsifiable: if I add a subscription or bill and get notified before the deadline without thinking about it again, the hypothesis holds. Otherwise it doesn't." },
      { title: 'Experimentation (or Test Protocol)', status: 'partial', body: "Chosen architecture: a small local server (Vite middleware, dev-only, never in production) that reads/writes private, gitignored JSON files under src/private/data/. React forms for add/edit/delete. How reminders actually fire is still undecided — see the dedicated section below." },
      { title: 'Analyzing the Results', status: 'partial', body: "Verified: adding a subscription or bill writes to disk, survives a page reload, and the production build contains no trace of this private layer (checked by grepping the final bundle). Not yet verified: an actual reminder firing." },
      {
        title: 'Conclusion and Iteration',
        status: 'skipped',
        branches: [
          { label: "If the chosen reminder mechanism works: ", text: "extend to the other domains (insurance, garden, job applications, project tracking)." },
          { label: "If neither option fits: ", text: "reconsider a third approach (e.g. scheduled email) before iterating again." },
        ],
      },
    ],
    reminderTitle: 'The reminder mechanism — decision pending',
    reminderIntro: "Two options tried, two limits found. The final choice isn't made yet — weighing a cloud routine against a local scheduled task.",
    reminderFlow: [
      { label: 'Observation', sublabel: "Data files are deliberately gitignored for privacy — the reminder mechanism needs to read them without ever exposing them" },
      { label: 'Ruled out: cloud routine', sublabel: "A cloud agent runs with its own isolated git clone — no access to files that were never committed. Committing the data to work around it would break the privacy this was built for" },
      { label: 'Ruled out: in-session scheduled task', sublabel: "Exists, but tied to the current Claude session — dies when it closes, and expires after 7 days maximum anyway" },
      { label: 'Leaning toward, to confirm', sublabel: "Native macOS scheduled task (launchd): runs locally independent of Claude Code, reads the files directly, notifies via macOS — no data ever leaves the machine" },
    ],
    statusTitle: 'Progress',
    doneItems: [
      'Storage architecture: dev-only Vite middleware + private JSON files under src/private/data/',
      'Private /maia page with Contracts (subscriptions and insurance, typed), Bills, and Job Applications',
      'Per-entry optional reminders (switch) instead of forced on everything',
      'Persistence verified (writes to disk, survives reload)',
      'Production build verified — no leaked data or private code',
    ],
    todoItems: [
      'Decide the proactive reminder mechanism (local launchd vs. another option)',
      'Wire up the chosen reminder and test it on a real case (e.g. transit pass expiry)',
      'Extend to the remaining domains: garden, project tracking',
    ],
  },
}

export default function MAIA() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr

  return (
    <CaseStudyLayout title={c.title} role={c.role} period={c.period} tools={c.tools}>
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

      <Section title={c.reminderTitle}>
        <p style={{ marginBottom: 16 }}>{c.reminderIntro}</p>
        <FlowDiagram steps={c.reminderFlow} direction="vertical" />
      </Section>

      <Section title={c.statusTitle}>
        <StatusList title={lang === 'en' ? 'DONE' : 'FAIT'} items={c.doneItems} color="var(--primary)" />
        <StatusList title={lang === 'en' ? 'TO DO' : 'RESTE À FAIRE'} items={c.todoItems} color="var(--warning)" />
      </Section>
    </CaseStudyLayout>
  )
}
