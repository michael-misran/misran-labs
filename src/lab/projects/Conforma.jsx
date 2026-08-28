import { useState } from 'react'
import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import FlowDiagram from '../../components/diagrams/FlowDiagram'
import SectionTitle from '../../design-system/SectionTitle'
import { STATUS, METHOD_STEP_COLORS } from '../phases'
import { useLanguage } from '../../shell/LanguageContext'
import { useSecondarySidebar } from '../../shell/SecondarySidebarContext'
import useIsMobile from '../../shell/useIsMobile'

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 32, overflowX: 'auto' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: active === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
            color: active === tab.id ? 'var(--text)' : 'var(--text2)',
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: active === tab.id ? 600 : 400,
            padding: '10px 16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'color 0.15s ease, border-color 0.15s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

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
      {title && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color, letterSpacing: '0.08em', marginBottom: 8 }}>
          {title}
        </div>
      )}
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}

function RoadmapCard({ version, statusLabel, statusColor, items }) {
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
          {version}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: statusColor,
            border: `1px solid ${statusColor}`,
            borderRadius: 4,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
          }}
        >
          {statusLabel}
        </span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  )
}

function KpiStat({ value, label }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 600, color: 'var(--text)' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function KpiDetailTable({ columns, rows }) {
  const cellKeys = ['label', 'temps', 'appels', 'sortie', 'cacheEcriture', 'cacheLecture', 'total', 'coutActuel', 'coutStandard']
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 720 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              {cellKeys.map((key, i) => (
                <td
                  key={key}
                  style={{
                    padding: '10px 12px',
                    fontSize: 13,
                    fontFamily: i === 0 ? "var(--font-body)" : "var(--font-mono)",
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? 'var(--text)' : 'var(--text2)',
                    borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SimpleTable({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 560 }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: '10px 12px',
                    fontSize: 13,
                    fontFamily: i === 0 ? "var(--font-body)" : "var(--font-mono)",
                    fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? 'var(--text)' : 'var(--text2)',
                    borderBottom: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
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

const CONTENT = {
  fr: {
    title: 'Conforma',
    role: 'Product Designer & Développeur — seul sur le projet',
    period: 'Août 2026',
    tools: ['React', 'Middleware Vite (local, dev-only)', 'Claude Code (V0)', 'API Claude (V0.1+)'],
    tabs: [
      { id: 'overview', label: 'Vue d’ensemble' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'specs', label: 'Spécifications fonctionnelles' },
      { id: 'kpi', label: 'KPI' },
      { id: 'business', label: 'Business' },
      { id: 'roadmap', label: 'Roadmap' },
    ],

    contextTitle: 'Contexte',
    context: "Je reçois régulièrement, de la part d'une société, un mode opératoire (document texte + schémas) que je dois vérifier point par point contre une trame interne de critères. Pour chaque ligne de la trame, je marque Oui (l'élément est présent), Partiellement (présent mais incomplet ou ambigu) ou Non (absent). Aujourd'hui ce contrôle se fait entièrement à la main, sans jamais garder de trace de où dans le document j'ai trouvé — ou pas trouvé — chaque info. Donc si quelqu'un doit vérifier mon travail après coup, il faut tout relire depuis le début.",

    methodTitle: 'Méthode',
    methodIntro: "Même grille d'analyse que pour le reste du Lab — les 5 étapes de la démarche scientifique.",
    coverageLabel: 'APPLICATION DE LA MÉTHODE',
    steps: [
      {
        title: "L'Observation et la Problématique",
        status: 'done',
        body: "Vérifier un mode opératoire externe contre une trame de critères internes est répétitif et sans traçabilité : une fois la ligne cochée, plus aucune trace de où dans le document l'info a été trouvée. Question précise : peut-on garder le jugement humain (Oui/Partiellement/Non reste une décision de lecture) tout en éliminant la partie fastidieuse — retrouver et documenter la source — et en produisant une preuve vérifiable après coup ?",
      },
      {
        title: "L'Hypothèse",
        status: 'done',
        body: "Une appli qui centralise l'upload du mode opératoire, affiche la trame, et indique pour chaque ligne où l'information a été trouvée (page, passage, schéma) réduit le temps de vérification et la rend contrôlable a posteriori. Hypothèse réfutable : si sur un cas réel, remplir la trame prend nettement moins de temps qu'à la main ET que chaque référence citée est correcte quand je vais vérifier, l'hypothèse tient. Si les références sont fausses ou introuvables, elle ne tient pas.",
      },
      {
        title: 'L\'Expérimentation (ou Protocole de test)',
        status: 'partial',
        body: "Architecture retenue pour la V0 : une page privée locale (jamais buildée en production, même principe que MAIA), upload du mode opératoire dans un dossier gitignoré, trame affichée en tableau. Particularité de cette V0 : pas d'appel API — c'est moi (l'assistant Claude Code) qui lis le mode opératoire uploadé et remplis les résultats à la demande, pour valider la qualité du repérage avant d'automatiser quoi que ce soit. Détail complet dans l'onglet Architecture.",
      },
      {
        title: "L'Analyse des résultats",
        status: 'skipped',
        body: "Pas encore testé sur un cas réel — en attente du format exact de la trame de l'entreprise et d'un premier mode opératoire à traiter.",
      },
      {
        title: "La Conclusion et l'Itération",
        status: 'skipped',
        branches: [
          { label: 'Si le repérage manuel donne des références fiables sur plusieurs cas réels : ', text: "bascule vers l'API Claude en V0.1, sans changer le reste de l'appli — voir Roadmap." },
          { label: "Si les références ne sont pas fiables (notamment sur les schémas) : ", text: "retravailler la façon de découper ou présenter le document avant d'automatiser quoi que ce soit." },
        ],
      },
    ],

    archTitle: 'Architecture',
    archIntro: "Deux versions de l'appli, une seule pièce qui change entre elles : l'étape d'analyse. Le contrat de données (le format des résultats) reste identique, donc le passage de l'une à l'autre ne touche pas le reste de l'appli.",
    archV0Title: 'V0 — analyse manuelle',
    archV0Flow: [
      { label: 'Upload', sublabel: "Le mode opératoire (PDF) est déposé via l'appli dans un dossier local gitignoré — rien ne sort de la machine" },
      { label: 'Analyse manuelle', sublabel: "Claude Code lit le fichier sur demande et compare chaque ligne de la trame au contenu du document" },
      { label: 'Résultats', sublabel: "Un fichier JSON local (statut + référence par ligne) est écrit dans le même dossier gitignoré" },
      { label: 'Affichage + export', sublabel: "L'appli lit ce JSON, affiche la trame remplie, et propose l'export PDF" },
    ],
    archV01Title: 'V0.1+ — analyse automatisée',
    archV01Flow: [
      { label: 'Upload', sublabel: 'Identique à la V0 — dossier local gitignoré' },
      { label: 'Appel API Claude', sublabel: "Un petit serveur local (middleware Vite, même principe que pour MAIA) envoie le document et la trame à l'API Claude et reçoit le même format de résultat" },
      { label: 'Résultats', sublabel: "Même fichier JSON qu'en V0 — aucun autre composant de l'appli ne change" },
      { label: 'Affichage + export', sublabel: 'Identique à la V0' },
    ],
    archPrivacyTitle: 'Confidentialité',
    archPrivacy: "En V0, le document ne quitte jamais la machine : le PDF uploadé est stocké dans src/private/data/conforma/studies/<id>/uploads/, un dossier gitignoré qui n'est jamais commité ni buildé en production. En V0.1, il transite par l'API Claude — par défaut, Anthropic n'utilise pas les données envoyées via l'API pour entraîner ses modèles. Pour des documents vraiment critiques (secret professionnel, clause de confidentialité stricte), un accord Zero Data Retention est possible auprès d'Anthropic, mais se négocie séparément — ce n'est pas activé par défaut sur une clé API standard.",

    specsTitle: 'Spécifications fonctionnelles',
    specsIntro: "Ce que fait l'appli, ligne par ligne. La structure ci-dessous est calée sur la trame réelle d'un service de santé au travail (Mode Opératoire SS4).",
    specsUploadTitle: 'Upload',
    specsUpload: [
      'Un mode opératoire à la fois, au format PDF',
      "Dépôt dans un dossier local gitignoré, jamais commité ni buildé en production",
      "Formats Word/Excel envisageables plus tard si le besoin se confirme",
    ],
    specsHeaderTitle: 'En-tête du document',
    specsHeader: [
      'Entreprise — la société dont le mode opératoire est contrôlé',
      'Référence du mode opératoire',
      'Date du mode opératoire',
    ],
    specsSectionsTitle: 'Les 9 sections de contrôle',
    specsSectionsIntro: "Trame réelle utilisée : celle d'un service de santé au travail, pour un Mode Opératoire SS4 (art. R.4412-146 du Code du travail — travaux exposant à l'amiante, sous-section 4). 32 questions Oui/Partiellement/Non réparties en 9 sections. Les intitulés doivent être repris mot pour mot dans l'appli — ils renvoient à des articles réglementaires précis.",
    specsSections: [
      '1. Localisation et nature des travaux — 1 question',
      '2. Matériaux concernés — 1 question',
      "3. Niveau d'empoussièrement — 4 questions (dont R4412-98)",
      '4. Organisation du travail, moyens techniques, prévention collective — 4 questions (dont R4412-108, 109)',
      '5. Les équipements de protection — 4 questions',
      '6. Les procédures de décontamination — 2 questions',
      '7. Les notices de postes — 9 questions (Art R4412-145, 39)',
      '8. Gestion des déchets — 2 questions',
      '9. Durées des phases habillage/décontamination et temps de travail — 5 questions',
    ],
    specsFooterTitle: 'Pied de page',
    specsFooter: [
      'Commentaires — champ libre',
      'Lecteur — nom du médecin du travail',
      'Date de lecture',
      'Signature',
    ],
    specsStatusTitle: 'Statuts possibles',
    specsStatus: [
      'Oui — l\'élément est présent et formulé clairement dans le mode opératoire',
      'Partiellement — présent mais incomplet, implicite ou ambigu',
      'Non — absent du document',
    ],
    specsEditTitle: 'Correction manuelle',
    specsEdit: "Le statut et la référence proposés (par moi en V0, par l'API en V0.1+) restent modifiables à la main dans le tableau. L'IA propose, l'utilisateur tranche en cas de doute — en particulier sur les schémas, plus difficiles à interpréter de façon fiable.",
    specsExportTitle: 'Export PDF',
    specsExport: "Un bouton reproduit la trame remplie (critère, statut, référence) dans un PDF prêt à être partagé ou archivé, avec la mise en page de la trame de l'entreprise.",
    specsPrivacyTitle: 'Confidentialité',
    specsPrivacy: "Mode opératoire uploadé et résultats restent en local, gitignorés, jamais commités. La route de l'appli n'existe même pas en dehors du mode développement (import.meta.env.DEV) — elle ne fait pas partie du site buildé pour la production.",

    kpiTitle: 'KPI',
    kpiIntro: "Des métriques pour objectiver ce que l'appli apporte, pas juste l'affirmer. Les chiffres agrégés ci-dessous sont réels, calculés à partir des études effectivement traitées — sans aucune donnée par entreprise, pour rester cohérent avec la confidentialité du reste de l'appli.",
    kpiSnapshotTitle: 'Instantané actuel',
    kpiSnapshotAsOf: 'Au 25/08/2026 — 2 études analysées',
    kpiSnapshotStats: [
      { value: '2', label: 'Études chronométrées' },
      { value: '14 min', label: 'Temps total' },
      { value: '7 min', label: 'Temps moyen / étude' },
      { value: '0,2 min', label: 'Temps moyen / critère' },
    ],
    kpiSnapshotNote: "Mis à jour manuellement à chaque nouvelle étude (page statique) — pas un flux en direct depuis l'appli privée. Chiffres corrigés le 25/08/2026 : les 25-40 min initiales étaient une estimation d'effort équivalent, pas un temps réel observé — les 7 min reflètent le temps effectivement chronométré entre l'upload et le résultat livré.",
    kpiTrackedTitle: 'Suivies par étude',
    kpiTracked: [
      "Date de l'analyse",
      "Durée de l'analyse (minutes) — estimée a posteriori en V0 (analyse manuelle), pas un chronométrage automatique",
      'Répartition Oui / Partiellement / Non sur les 32 critères',
    ],
    kpiAggregateTitle: "Agrégées sur l'ensemble des études",
    kpiAggregate: [
      "Nombre d'études chronométrées",
      'Temps total cumulé',
      'Temps moyen par étude',
      'Temps moyen par critère (32 par étude)',
    ],
    kpiDetailTitle: 'Détail par étude',
    kpiDetailIntro: "Deux études réelles, mesurées précisément dans les logs de session — bornage : de la demande d'analyse à l'écriture complète des résultats, donc le travail d'analyse propre, hors vérifications d'appli. Anonymisées : aucun nom d'entreprise n'apparaît ici, conformément à l'engagement de confidentialité ci-dessous.",
    kpiDetailColumns: ['Étude', 'Temps réel', 'Appels API', 'Tokens sortie', 'Cache écriture', 'Cache lecture', 'Total tokens', 'Coût (tarif actuel)', 'Coût (tarif standard)'],
    kpiDetailRows: [
      { label: 'Étude 1', temps: '3 min 17 s', appels: '12', sortie: '31 500', cacheEcriture: '162 798', cacheLecture: '3 225 766', total: '≈ 3,42 M', coutActuel: '≈ 1,37 €', coutStandard: '≈ 2,05 €' },
      { label: 'Étude 2', temps: '4 min 54 s', appels: '13', sortie: '86 558', cacheEcriture: '141 990', cacheLecture: '6 410 222', total: '≈ 6,64 M', coutActuel: '≈ 2,50 €', coutStandard: '≈ 3,75 €' },
    ],
    kpiModelNote: "Coûts calculés avec les tarifs de l'API Claude, modèle Claude Sonnet 5 — celui utilisé pour l'ensemble de ces analyses. \"Tarif actuel\" = 2 $ / 10 $ par million de tokens (entrée / sortie), tarif de lancement en vigueur jusqu'au 31/08/2026. \"Tarif standard\" = 3 $ / 15 $, applicable ensuite. Les tokens de cache sont facturés à des taux réduits (environ 125 % du tarif d'entrée à l'écriture, 10 % à la lecture).",
    kpiWhyTitle: 'Pourquoi',
    kpiWhy: "Ces chiffres n'ont de sens que comparés à la V0.1 (API) une fois qu'elle existera : le temps manuel donné ici deviendra le point de référence pour juger si l'automatisation fait vraiment gagner du temps, et de combien. Sans cette base V0, la comparaison serait une estimation en l'air plutôt qu'un avant/après réel.",

    businessMethodIntro: "Même démarche que pour le reste du Lab — les 5 étapes de la méthode scientifique, appliquées ici à la question économique plutôt que technique.",
    businessCoverageLabel: 'APPLICATION DE LA MÉTHODE',
    businessSteps: [
      {
        title: "L'Observation et la Problématique",
        status: 'done',
        body: "Une analyse manuelle prend 25 à 40 minutes de temps médecin (mesuré sur les deux premières études, détail dans l'onglet KPI). Valorisé au coût horaire réel d'un médecin du travail en France, secteur privé, chaque analyse manuelle coûte donc à l'employeur environ 27 à 63 € de temps médecin. Question précise : une IA peut-elle réaliser cette même analyse pour un coût nettement inférieur, tout en restant fiable ?",
      },
      {
        title: "L'Hypothèse",
        status: 'done',
        body: "Faire réaliser cette analyse par une IA (Claude, ou une alternative européenne comme Mistral) plutôt que manuellement par le médecin. Hypothèse réfutable : si le coût de l'IA reste très inférieur à ce coût de temps médecin (27 à 63 €), avec une marge suffisante pour construire une offre viable, l'hypothèse tient. Si le coût de l'IA se rapproche de ce montant, ou si la fiabilité de l'analyse n'est pas au rendez-vous, elle ne tient pas.",
      },
      {
        title: "L'Expérimentation",
        status: 'done',
        body: "Deux analyses réelles menées avec Claude Sonnet 5 (un mode opératoire de chantier réel, un dossier de réponse à un appel d'offre), avec mesure précise dans les logs de session : temps écoulé, nombre d'appels API, tokens consommés. Le coût mesuré a ensuite été reprojeté aux tarifs de Mistral Large 3, alternative européenne, pour comparer deux fournisseurs plutôt qu'un seul.",
      },
      {
        title: "L'Analyse des résultats",
        status: 'done',
        body: "Le coût mesuré (≈ 0,40 à 2,90 € par analyse selon le fournisseur) reste très inférieur au coût du temps médecin établi à l'étape 1 (27 à 63 €) — l'écart va de 10 à plus de 150 fois selon la combinaison retenue.",
      },
      {
        title: "La Conclusion et l'Itération",
        status: 'partial',
        body: "L'hypothèse tient : l'écart entre coût API et coût de temps médecin est large et stable sur les deux profils de volume testés (bas et haut), assez pour construire un modèle économique viable.",
      },
    ],

    businessCostBasisTitle: 'Coût horaire du temps médecin',
    businessCostBasisColumns: ['Base', 'Calcul', 'Coût horaire'],
    businessCostBasisRows: [
      ['Salaire brut seul', '104 600 € / 1 607 h (durée légale annuelle)', '≈ 65 €/h'],
      ['Coût chargé employeur (+ ~45 % de charges patronales)', '104 600 € × 1,45 / 1 607 h', '≈ 94 €/h'],
    ],
    businessCostBasisNote: "Le coût chargé (~94 €/h) est la base pertinente du point de vue de l'employeur — un service de santé au travail — puisque c'est ce que lui coûte réellement ce temps médecin, charges comprises. Source : salaire médian médecin du travail secteur privé France.",

    businessProviderTitle: 'Claude vs Mistral — projection de coût',
    businessProviderIntro: "Deux profils de volume réels et anonymisés servent de bornes basse et haute : un profil bas (~4 analyses/an) et un profil haut (~106 analyses/an), observés dans la pratique. Le coût par analyse est repris du volume de tokens mesuré avec Claude (page KPI), reprojeté au tarif de chaque fournisseur.",
    businessProviderColumns: ['Fournisseur', 'Coût / analyse', 'Coût / an (profil bas, ~4/an)', 'Coût / an (profil haut, ~106/an)'],
    businessProviderRows: [
      ['Claude Sonnet 5 (tarif actuel)', '≈ 1,94 €', '≈ 8 €', '≈ 206 €'],
      ['Claude Sonnet 5 (tarif standard, dès 01/09/2026)', '≈ 2,90 €', '≈ 12 €', '≈ 307 €'],
      ['Mistral Large 3', '≈ 0,41 €', '≈ 2 €', '≈ 43 €'],
    ],
    businessProviderCaveat: "Réserves : le tokenizer de Mistral diffère de celui de Claude (même texte, nombre de tokens légèrement différent) — c'est une reprojection, pas une exécution réelle sur Mistral. La capacité de Mistral Large sur ce type de lecture nuancée et croisée n'a pas été testée dans ce projet, à vérifier avant de trancher.",
    businessClaudeTitle: 'Claude (Anthropic, États-Unis)',
    businessClaudePros: [
      "Modèle utilisé pour construire et valider l'appli — qualité d'analyse déjà éprouvée sur les études réelles",
      "Fenêtre de contexte large (jusqu'à 1M tokens), utile pour des dossiers à plusieurs documents",
    ],
    businessClaudeCons: [
      'Société américaine — question de souveraineté des données à vérifier selon les exigences du secteur santé au travail',
      'Le plus cher des deux au token',
    ],
    businessMistralTitle: 'Mistral (France / UE)',
    businessMistralPros: [
      'Société française — hébergement et traitement plus naturellement européens, argument pertinent pour un secteur santé/médecine du travail',
      'Nettement moins cher (jusqu\'à ~5x sur cette charge de travail estimée)',
    ],
    businessMistralCons: [
      "Jamais testé sur cette tâche précise — coût projeté, pas mesuré",
      'Capacité généralement perçue en retrait sur des tâches de lecture/croisement nuancées par rapport à Claude — à vérifier concrètement',
    ],
    businessValueTitle: 'Valeur créée par analyse',
    businessValueText: "Ramené en valeur économique : 20 à 30 minutes de temps médecin économisées par analyse valent, au coût horaire chargé (94 €/h), environ 31 à 47 € — et 22 à 33 € sur la base du salaire brut seul (65 €/h). Dans les deux cas, très supérieur au coût mesuré de l'IA (≈ 0,40 à 2,90 € selon le fournisseur).",

    businessPricingTitle: 'Grille de prix proposée',
    businessPricingColumns: ['Formule', 'Prix', 'Coût réel correspondant', 'Marge estimée'],
    businessPricingRows: [
      ["À l'usage", '15 à 25 €/analyse', '≈ 0,40 à 2 €/analyse', '≈ 85-90 %'],
      ['Solo (jusqu\'à ~20 analyses/an)', '29 à 39 €/mois', '≈ 50-60 €/an', '≈ 85-90 %'],
      ['Équipe (jusqu\'à ~150 analyses/an)', '99 à 149 €/mois', '≈ 300-450 €/an', '≈ 75-80 %'],
      ['Multi-sites / volume', 'Sur devis', '—', '—'],
    ],
    businessPricingCaveat: "Marges cohérentes avec les standards SaaS (70-90 %), prix nettement sous la valeur réelle calculée (22-47 €/analyse) — défendables face à un service de santé au travail qui compare au coût de son propre temps médecin. Réserve importante : ce raisonnement part du coût et de la valeur, pas d'une étude de marché — aucune donnée sur ce qu'un service de santé au travail paie déjà pour des outils comparables, ni sur la volonté réelle de payer. À valider avec de vrais prospects avant de figer un prix.",
    businessPrivacyTitle: 'Confidentialité',
    businessPrivacy: "Volumes et prix restent génériques — aucune donnée par entreprise ou par médecin n'est publiée ici. Le détail technique mesuré par étude (temps, tokens, coût) est dans l'onglet KPI.",

    kpiPrivacyTitle: 'Confidentialité',
    kpiPrivacy: "Seuls les chiffres agrégés et le détail technique anonymisé (temps, tokens, coût par étude) sont publiés ici. Le nom des entreprises, les statuts de conformité et les profils de volume réels restent uniquement dans l'appli privée.",

    roadmapTitle: 'Roadmap',
    roadmapIntro: "Pas d'engagement de date — chaque étape ne démarre qu'une fois la précédente validée sur un cas réel.",
    roadmap: [
      {
        version: 'V0',
        statusLabel: 'EN COURS',
        statusColor: 'var(--primary)',
        items: [
          'Page privée locale + upload du mode opératoire',
          'Trame intégrée : service de santé au travail — Mode Opératoire SS4 (32 questions, 9 sections)',
          'Analyse manuelle via Claude Code (pas d\'API)',
          'Vérification croisée avec l\'INRS (inrs.fr) pendant l\'analyse — sources citées dans la justification de chaque critère',
          'Export PDF de la trame remplie',
        ],
      },
      {
        version: 'V0.1',
        statusLabel: 'PROCHAINE ÉTAPE',
        statusColor: 'var(--warning)',
        items: [
          "Remplacement de l'analyse manuelle par un appel à l'API Claude",
          'Même format de résultat que la V0 — pas de refonte du reste de l\'appli',
          'Outil de recherche web restreint à inrs.fr (allowed_domains) pour vérifier les points réglementaires en direct plutôt que sur la mémoire du modèle',
          'Calibrage du prompt sur la cohérence méthodologique d\'ensemble plutôt que la présence littérale de chaque terme technique — un premier comparatif avec un avis réel de médecin du travail sur une étude a montré la V0 systématiquement plus stricte que lui (65 % d\'accord sur 32 critères, écart à sens quasi unique)',
          'Contrôle de cohérence documentaire (dates, références croisées entre documents cités) — le même comparatif a révélé une incohérence de dates que la trame de 32 critères ne peut pas voir, car hors de son périmètre',
          'Coût estimé : quelques centimes à ~1-2 € par analyse selon la taille du document',
        ],
      },
      {
        version: 'V1',
        statusLabel: 'ENVISAGÉ',
        statusColor: 'var(--muted)',
        items: [
          'Édition inline plus confortable dans le tableau',
          'Historique des analyses passées',
          'Gestion de plusieurs mode opératoires',
        ],
      },
      {
        version: 'V1.5',
        statusLabel: 'HYPOTHÈSE',
        statusColor: 'var(--muted)',
        items: [
          "Changement de nature du projet : d'un outil local mono-utilisateur à un produit hébergé multi-utilisateurs — nécessaire pour que les tiers Solo/Équipe de l'onglet Business existent réellement",
          "Authentification avec un fournisseur établi (2FA) — pas d'auth maison, sur un produit qui touche à des données de conformité sensibles",
          'Passage des fichiers JSON locaux à une vraie base de données hébergée, avec cloisonnement des données par organisation (un médecin ne voit que les études de son propre service)',
          "Non engagé — à ne pas démarrer avant validation du modèle économique auprès de vrais prospects (voir onglet Business)",
        ],
      },
      {
        version: 'V2',
        statusLabel: 'HYPOTHÈSE',
        statusColor: 'var(--muted)',
        items: [
          "Viewer PDF avec surlignage visuel direct du passage cité, plutôt qu'une simple référence textuelle",
          'Non engagé — dépend de la faisabilité technique et du besoin réel après usage en V1',
        ],
      },
    ],
  },
  en: {
    title: 'Conforma',
    role: 'Product Designer & Developer — solo project',
    period: 'August 2026',
    tools: ['React', 'Vite middleware (local, dev-only)', 'Claude Code (V0)', 'Claude API (V0.1+)'],
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'specs', label: 'Functional specifications' },
      { id: 'kpi', label: 'KPI' },
      { id: 'business', label: 'Business' },
      { id: 'roadmap', label: 'Roadmap' },
    ],

    contextTitle: 'Context',
    context: "I regularly receive a mode opératoire (procedure document — text and diagrams) from a company that I need to check point by point against an internal checklist. For each line of the checklist, I mark Yes (present), Partially (present but incomplete or ambiguous), or No (absent). Today this check is entirely manual, with no record of where in the document I found — or didn't find — each piece of information. So if anyone needs to double-check my work later, they have to reread everything from scratch.",

    methodTitle: 'Method',
    methodIntro: "Same framework as the rest of the Lab — the 5 steps of the scientific approach.",
    coverageLabel: 'METHOD COVERAGE',
    steps: [
      {
        title: 'Observation and the Problem',
        status: 'done',
        body: "Checking an external procedure document against an internal checklist is repetitive and leaves no trail: once a line is checked off, there's no record of where in the document the info came from. Precise question: can the human judgment call (Yes/Partially/No is still a reading decision) stay, while removing the tedious part — finding and documenting the source — and producing evidence that can be verified afterward?",
      },
      {
        title: 'The Hypothesis',
        status: 'done',
        body: "An app that centralizes the upload of the procedure document, displays the checklist, and shows for each line where the info was found (page, passage, diagram) cuts verification time and makes it checkable after the fact. Falsifiable: if on a real case, filling the checklist takes noticeably less time than by hand AND every cited reference is correct when I go check it, the hypothesis holds. If references are wrong or unfindable, it doesn't.",
      },
      {
        title: 'Experimentation (or Test Protocol)',
        status: 'partial',
        body: "Chosen architecture for V0: a private local page (never built into production, same principle as MAIA), the procedure document uploaded into a gitignored folder, checklist shown as a table. What's specific to this V0: no API call — I (the Claude Code assistant) read the uploaded document myself and fill in the results on request, to validate the quality of the sourcing before automating anything. Full detail in the Architecture tab.",
      },
      {
        title: 'Analyzing the Results',
        status: 'skipped',
        body: "Not yet tested on a real case — waiting on the exact structure of the company's checklist and a first procedure document to process.",
      },
      {
        title: 'Conclusion and Iteration',
        status: 'skipped',
        branches: [
          { label: 'If manual sourcing gives reliable references across several real cases: ', text: 'switch to the Claude API in V0.1, without changing the rest of the app — see Roadmap.' },
          { label: "If references aren't reliable (especially on diagrams): ", text: 'rework how the document is split or presented before automating anything.' },
        ],
      },
    ],

    archTitle: 'Architecture',
    archIntro: "Two versions of the app, one piece changes between them: the analysis step. The data contract (the result format) stays identical, so moving from one to the other doesn't touch the rest of the app.",
    archV0Title: 'V0 — manual analysis',
    archV0Flow: [
      { label: 'Upload', sublabel: "The procedure document (PDF) is dropped via the app into a local gitignored folder — nothing leaves the machine" },
      { label: 'Manual analysis', sublabel: 'Claude Code reads the file on request and compares each checklist line against the document content' },
      { label: 'Results', sublabel: 'A local JSON file (status + reference per line) is written into the same gitignored folder' },
      { label: 'Display + export', sublabel: 'The app reads that JSON, shows the filled checklist, and offers PDF export' },
    ],
    archV01Title: 'V0.1+ — automated analysis',
    archV01Flow: [
      { label: 'Upload', sublabel: 'Same as V0 — local gitignored folder' },
      { label: 'Claude API call', sublabel: 'A small local server (Vite middleware, same principle as MAIA) sends the document and checklist to the Claude API and gets back the same result format' },
      { label: 'Results', sublabel: 'Same JSON file as V0 — no other app component changes' },
      { label: 'Display + export', sublabel: 'Identical to V0' },
    ],
    archPrivacyTitle: 'Privacy',
    archPrivacy: "In V0, the document never leaves the machine: the uploaded PDF is stored in src/private/data/conforma/studies/<id>/uploads/, a gitignored folder that's never committed or built into production. In V0.1 it passes through the Claude API — by default, Anthropic does not use data sent via the API to train its models. For truly sensitive documents (professional confidentiality, strict NDA), a Zero Data Retention agreement is possible with Anthropic, but it's negotiated separately — it isn't on by default with a standard API key.",

    specsTitle: 'Functional specifications',
    specsIntro: "What the app does, line by line. The structure below matches an occupational health service's real checklist (SS4 Procedure Document).",
    specsUploadTitle: 'Upload',
    specsUpload: [
      'One procedure document at a time, PDF format',
      'Dropped into a local gitignored folder, never committed or built into production',
      'Word/Excel formats considered later if the need shows up',
    ],
    specsHeaderTitle: 'Document header',
    specsHeader: [
      'Company — the business whose procedure document is being checked',
      'Procedure document reference',
      'Procedure document date',
    ],
    specsSectionsTitle: 'The 9 control sections',
    specsSectionsIntro: "Real checklist in use: one from an occupational health service, for an SS4 Procedure Document (Art. R.4412-146 of the French Labor Code — asbestos-exposing work, sub-section 4). 32 Yes/Partially/No questions across 9 sections. Wording must be reproduced verbatim in the app — it maps to specific regulatory articles.",
    specsSections: [
      '1. Work location and nature — 1 question',
      '2. Materials involved — 1 question',
      '3. Dust exposure level — 4 questions (incl. R4412-98)',
      '4. Work organization, technical means, collective prevention — 4 questions (incl. R4412-108, 109)',
      '5. Protective equipment — 4 questions',
      '6. Decontamination procedures — 2 questions',
      '7. Job/task notices — 9 questions (Art R4412-145, 39)',
      '8. Waste management — 2 questions',
      '9. Suiting-up/decontamination phase durations and work time — 5 questions',
    ],
    specsFooterTitle: 'Footer',
    specsFooter: [
      'Comments — free text',
      'Reviewer — occupational physician name',
      'Review date',
      'Signature',
    ],
    specsStatusTitle: 'Possible statuses',
    specsStatus: [
      'Yes — the item is present and clearly stated in the procedure document',
      'Partially — present but incomplete, implicit, or ambiguous',
      'No — absent from the document',
    ],
    specsEditTitle: 'Manual correction',
    specsEdit: "The proposed status and reference (from me in V0, from the API in V0.1+) stay editable by hand in the table. The AI proposes, the user decides in case of doubt — especially on diagrams, which are harder to interpret reliably.",
    specsExportTitle: 'PDF export',
    specsExport: "A button reproduces the filled checklist (criterion, status, reference) as a PDF ready to share or archive, matching the company's checklist layout.",
    specsPrivacyTitle: 'Privacy',
    specsPrivacy: "The uploaded procedure document and results stay local, gitignored, never committed. The app's route doesn't even exist outside dev mode (import.meta.env.DEV) — it isn't part of the site built for production.",

    kpiTitle: 'KPI',
    kpiIntro: "Metrics to show what the app delivers, not just claim it. The aggregate figures below are real, computed from studies actually processed — with no per-company data, to stay consistent with the rest of the app's privacy stance.",
    kpiSnapshotTitle: 'Current snapshot',
    kpiSnapshotAsOf: 'As of Aug 25, 2026 — 2 studies analyzed',
    kpiSnapshotStats: [
      { value: '2', label: 'Timed studies' },
      { value: '14 min', label: 'Total time' },
      { value: '7 min', label: 'Average / study' },
      { value: '0.2 min', label: 'Average / criterion' },
    ],
    kpiSnapshotNote: "Updated by hand with each new study (static page) — not a live feed from the private app. Figures corrected on Aug 25, 2026: the initial 25-40 min were an equivalent-effort guess, not an observed time — the 7 min reflect the actual timed duration between upload and delivered result.",
    kpiTrackedTitle: 'Tracked per study',
    kpiTracked: [
      'Analysis date',
      'Analysis duration (minutes) — estimated after the fact in V0 (manual analysis), not an automatic timer',
      'Yes / Partially / No breakdown across the 32 criteria',
    ],
    kpiAggregateTitle: 'Aggregated across all studies',
    kpiAggregate: [
      'Number of timed studies',
      'Total cumulative time',
      'Average time per study',
      'Average time per criterion (32 per study)',
    ],
    kpiDetailTitle: 'Detail per study',
    kpiDetailIntro: "Two real studies, precisely measured from the session logs — scoped from the analysis request to the results being fully written, i.e. the actual analysis work, excluding app-verification steps. Anonymized: no company name appears here, consistent with the privacy commitment below.",
    kpiDetailColumns: ['Study', 'Real time', 'API calls', 'Output tokens', 'Cache write', 'Cache read', 'Total tokens', 'Cost (current rate)', 'Cost (standard rate)'],
    kpiDetailRows: [
      { label: 'Study 1', temps: '3 min 17 s', appels: '12', sortie: '31,500', cacheEcriture: '162,798', cacheLecture: '3,225,766', total: '≈ 3.42M', coutActuel: '≈ $1.37', coutStandard: '≈ $2.05' },
      { label: 'Study 2', temps: '4 min 54 s', appels: '13', sortie: '86,558', cacheEcriture: '141,990', cacheLecture: '6,410,222', total: '≈ 6.64M', coutActuel: '≈ $2.50', coutStandard: '≈ $3.75' },
    ],
    kpiModelNote: "Costs computed with Claude API pricing, Claude Sonnet 5 model — the one used for all these analyses. \"Current rate\" = $2/$10 per million tokens (input/output), the launch pricing in effect through 08/31/2026. \"Standard rate\" = $3/$15, applying afterward. Cache tokens are billed at reduced rates (roughly 125% of the input rate on write, 10% on read).",
    kpiWhyTitle: 'Why',
    kpiWhy: "These numbers only mean something once compared against V0.1 (API): the manual time captured here becomes the baseline for judging whether automation actually saves time, and how much. Without this V0 baseline, the comparison would be a guess rather than a real before/after.",

    businessMethodIntro: "Same approach as the rest of the Lab — the 5 steps of the scientific method, applied here to the economic question rather than the technical one.",
    businessCoverageLabel: 'METHOD COVERAGE',
    businessSteps: [
      {
        title: 'Observation and the Problem',
        status: 'done',
        body: "A manual analysis takes 25 to 40 minutes of physician time (measured on the first two studies, detail in the KPI tab). Valued at the real hourly cost of an occupational physician in France, private sector, each manual analysis therefore costs the employer roughly €27 to €63 of physician time. Precise question: can an AI perform this same analysis for a substantially lower cost, while staying reliable?",
      },
      {
        title: 'The Hypothesis',
        status: 'done',
        body: "Have an AI (Claude, or a European alternative like Mistral) perform this analysis instead of the physician doing it manually. Falsifiable: if the AI's cost stays well below this physician-time cost (€27-63), with enough margin to build a viable offering, the hypothesis holds. If the AI's cost gets close to that amount, or if analysis reliability isn't there, it doesn't.",
      },
      {
        title: 'Experimentation',
        status: 'done',
        body: "Two real analyses run with Claude Sonnet 5 (a real-site procedure document, a tender-response dossier), precisely measured from the session logs: elapsed time, number of API calls, tokens consumed. The measured cost was then reprojected at Mistral Large 3 rates, a European alternative, to compare two providers rather than one.",
      },
      {
        title: 'Analyzing the Results',
        status: 'done',
        body: "The measured cost (≈ $0.40 to $2.90 per analysis depending on provider) stays well below the physician-time cost established in step 1 (€27-63) — a gap ranging from 10x to over 150x depending on the combination chosen.",
      },
      {
        title: 'Conclusion and Iteration',
        status: 'partial',
        body: "The hypothesis holds: the gap between API cost and physician-time cost is wide and stable across both volume profiles tested (low and high) — wide enough to build a viable economic model on.",
      },
    ],

    businessCostBasisTitle: 'Hourly cost of physician time',
    businessCostBasisColumns: ['Basis', 'Calculation', 'Hourly cost'],
    businessCostBasisRows: [
      ['Gross salary only', '€104,600 / 1,607h (statutory annual hours)', '≈ €65/h'],
      ['Fully-loaded employer cost (+ ~45% payroll charges)', '€104,600 × 1.45 / 1,607h', '≈ €94/h'],
    ],
    businessCostBasisNote: "The loaded cost (~€94/h) is the relevant basis from the employer's point of view — an occupational health service — since that's what this physician time actually costs it, charges included. Source: median private-sector occupational physician salary in France.",

    businessProviderTitle: 'Claude vs Mistral — cost projection',
    businessProviderIntro: "Two real, anonymized volume profiles serve as low and high bounds: a low profile (~4 analyses/year) and a high profile (~106 analyses/year), both observed in practice. Cost per analysis is taken from the token volume measured with Claude (KPI tab), reprojected at each provider's rate.",
    businessProviderColumns: ['Provider', 'Cost / analysis', 'Cost / year (low, ~4/yr)', 'Cost / year (high, ~106/yr)'],
    businessProviderRows: [
      ['Claude Sonnet 5 (current rate)', '≈ $1.94', '≈ $8', '≈ $206'],
      ['Claude Sonnet 5 (standard rate, from 09/01/2026)', '≈ $2.90', '≈ $12', '≈ $307'],
      ['Mistral Large 3', '≈ $0.41', '≈ $2', '≈ $43'],
    ],
    businessProviderCaveat: "Caveats: Mistral's tokenizer differs from Claude's (same text, slightly different token count) — this is a reprojection, not an actual run on Mistral. Mistral Large's capability on this kind of nuanced, cross-referenced reading hasn't been tested in this project — worth verifying before deciding.",
    businessClaudeTitle: 'Claude (Anthropic, United States)',
    businessClaudePros: [
      'Model used to build and validate the app — analysis quality already proven on real studies',
      'Large context window (up to 1M tokens), useful for multi-document dossiers',
    ],
    businessClaudeCons: [
      'US-based company — data sovereignty question worth checking against occupational health sector requirements',
      'The more expensive of the two per token',
    ],
    businessMistralTitle: 'Mistral (France / EU)',
    businessMistralPros: [
      'French company — hosting and processing more naturally European, a relevant argument for the occupational health sector',
      'Significantly cheaper (up to ~5x on this estimated workload)',
    ],
    businessMistralCons: [
      'Never tested on this exact task — cost is projected, not measured',
      'Generally perceived as a notch behind Claude on nuanced, cross-referencing reading tasks — worth verifying concretely',
    ],
    businessValueTitle: 'Value created per analysis',
    businessValueText: "Put in economic terms: 20 to 30 minutes of physician time saved per analysis are worth, at the loaded hourly cost (€94/h), roughly €31 to €47 — and €22 to €33 on the gross-only basis (€65/h). Either way, well above the AI's measured cost (≈ $0.40 to $2.90 depending on provider).",

    businessPricingTitle: 'Proposed pricing',
    businessPricingColumns: ['Plan', 'Price', 'Matching real cost', 'Estimated margin'],
    businessPricingRows: [
      ['Pay-per-use', '$15-25/analysis', '≈ $0.40-2/analysis', '≈ 85-90%'],
      ['Solo (up to ~20 analyses/yr)', '$29-39/month', '≈ $50-60/yr', '≈ 85-90%'],
      ['Team (up to ~150 analyses/yr)', '$99-149/month', '≈ $300-450/yr', '≈ 75-80%'],
      ['Multi-site / volume', 'Custom quote', '—', '—'],
    ],
    businessPricingCaveat: "Margins consistent with SaaS norms (70-90%), pricing well below the calculated real value (€22-47/analysis) — defensible against an occupational health service comparing it to its own physician time cost. Important caveat: this reasoning starts from cost and value, not a market study — no data on what an occupational health service already pays for comparable tools, or real willingness to pay. Needs validating with real prospects before locking in a price.",
    businessPrivacyTitle: 'Privacy',
    businessPrivacy: "Volumes and pricing stay generic — no per-company or per-physician data is published here. Measured technical detail per study (time, tokens, cost) is in the KPI tab.",

    kpiPrivacyTitle: 'Privacy',
    kpiPrivacy: "Only aggregate figures and anonymized technical detail (time, tokens, cost per study) are published here. Company names, compliance statuses, and real volume profiles stay in the private app only.",

    roadmapTitle: 'Roadmap',
    roadmapIntro: "No date commitments — each stage only starts once the previous one is validated on a real case.",
    roadmap: [
      {
        version: 'V0',
        statusLabel: 'IN PROGRESS',
        statusColor: 'var(--primary)',
        items: [
          'Private local page + procedure document upload',
          'Checklist integrated: occupational health service — SS4 Procedure Document (32 questions, 9 sections)',
          'Manual analysis via Claude Code (no API)',
          'Cross-checking against INRS (inrs.fr) during analysis — sources cited in each criterion\'s justification',
          'PDF export of the filled checklist',
        ],
      },
      {
        version: 'V0.1',
        statusLabel: 'NEXT STEP',
        statusColor: 'var(--warning)',
        items: [
          'Replace manual analysis with a Claude API call',
          "Same result format as V0 — no rework of the rest of the app",
          'Web search tool restricted to inrs.fr (allowed_domains) to verify regulatory points live rather than relying on the model\'s training memory',
          'Prompt calibration toward overall methodological coherence rather than the literal presence of every technical term — a first comparison against a real occupational physician\'s opinion on one study showed V0 was consistently stricter than the physician (65% agreement across 32 criteria, near one-sided gap)',
          'Document-consistency check (dates, cross-referenced documents) — the same comparison surfaced a date inconsistency the 32-criteria checklist can\'t catch, since it falls outside its scope',
          'Estimated cost: a few cents to ~$1-2 per analysis depending on document size',
        ],
      },
      {
        version: 'V1',
        statusLabel: 'CONSIDERED',
        statusColor: 'var(--muted)',
        items: [
          'More comfortable inline editing in the table',
          'History of past analyses',
          'Handling multiple procedure documents',
        ],
      },
      {
        version: 'V1.5',
        statusLabel: 'HYPOTHESIS',
        statusColor: 'var(--muted)',
        items: [
          "A change in the nature of the project: from a local, single-user tool to a hosted, multi-user product — needed for the Solo/Team tiers in the Business tab to actually exist",
          "Authentication with an established provider (2FA) — no homegrown auth, on a product touching sensitive compliance data",
          'Move from local JSON files to a real hosted database, with data scoped per organization (a physician only sees their own service\'s studies)',
          'Not committed — should not start before validating the economic model with real prospects (see Business tab)',
        ],
      },
      {
        version: 'V2',
        statusLabel: 'HYPOTHESIS',
        statusColor: 'var(--muted)',
        items: [
          'PDF viewer with direct visual highlighting of the cited passage, instead of a plain text reference',
          'Not committed — depends on technical feasibility and actual need after using V1',
        ],
      },
    ],
  },
}

export default function Conforma() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('overview')

  useSecondarySidebar(c.tabs, activeTab, setActiveTab)

  return (
    <CaseStudyLayout title={c.title} role={c.role} period={c.period} tools={c.tools}>
      {isMobile && <TabBar tabs={c.tabs} active={activeTab} onChange={setActiveTab} />}

      {activeTab === 'overview' && (
        <>
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
        </>
      )}

      {activeTab === 'architecture' && (
        <>
          <Section title={c.archTitle}>
            <p style={{ marginBottom: 28 }}>{c.archIntro}</p>

            <SectionTitle>{c.archV0Title}</SectionTitle>
            <div style={{ marginBottom: 28, marginTop: 12, overflowX: 'auto' }}>
              <FlowDiagram steps={c.archV0Flow} direction="vertical" />
            </div>

            <SectionTitle>{c.archV01Title}</SectionTitle>
            <div style={{ marginBottom: 28, marginTop: 12, overflowX: 'auto' }}>
              <FlowDiagram steps={c.archV01Flow} direction="vertical" />
            </div>
          </Section>

          <Section title={c.archPrivacyTitle}>
            <p>{c.archPrivacy}</p>
          </Section>
        </>
      )}

      {activeTab === 'specs' && (
        <>
          <Section title={c.specsTitle}>
            <p style={{ marginBottom: 8 }}>{c.specsIntro}</p>
          </Section>

          <Section title={c.specsUploadTitle}>
            <StatusList title="" items={c.specsUpload} color="var(--primary)" />
          </Section>

          <Section title={c.specsHeaderTitle}>
            <StatusList title="" items={c.specsHeader} color="var(--primary)" />
          </Section>

          <Section title={c.specsSectionsTitle}>
            <p style={{ marginBottom: 16 }}>{c.specsSectionsIntro}</p>
            <StatusList title="" items={c.specsSections} color="var(--primary)" />
          </Section>

          <Section title={c.specsFooterTitle}>
            <StatusList title="" items={c.specsFooter} color="var(--primary)" />
          </Section>

          <Section title={c.specsStatusTitle}>
            <StatusList title="" items={c.specsStatus} color="var(--primary)" />
          </Section>

          <Section title={c.specsEditTitle}>
            <p>{c.specsEdit}</p>
          </Section>

          <Section title={c.specsExportTitle}>
            <p>{c.specsExport}</p>
          </Section>

          <Section title={c.specsPrivacyTitle}>
            <p>{c.specsPrivacy}</p>
          </Section>
        </>
      )}

      {activeTab === 'kpi' && (
        <>
          <Section title={c.kpiTitle}>
            <p style={{ marginBottom: 8 }}>{c.kpiIntro}</p>
          </Section>

          <Section title={c.kpiSnapshotTitle}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: 'var(--muted)', marginBottom: 20 }}>
              {c.kpiSnapshotAsOf}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 20, marginBottom: 12 }}>
              {c.kpiSnapshotStats.map((s) => (
                <KpiStat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>{c.kpiSnapshotNote}</p>
          </Section>

          <Section title={c.kpiTrackedTitle}>
            <StatusList title="" items={c.kpiTracked} color="var(--primary)" />
          </Section>

          <Section title={c.kpiAggregateTitle}>
            <StatusList title="" items={c.kpiAggregate} color="var(--primary)" />
          </Section>

          <Section title={c.kpiDetailTitle}>
            <p style={{ marginBottom: 16 }}>{c.kpiDetailIntro}</p>
            <div style={{ marginBottom: 16 }}>
              <KpiDetailTable columns={c.kpiDetailColumns} rows={c.kpiDetailRows} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>{c.kpiModelNote}</p>
          </Section>

          <Section title={c.kpiWhyTitle}>
            <p>{c.kpiWhy}</p>
          </Section>

          <Section title={c.kpiPrivacyTitle}>
            <p>{c.kpiPrivacy}</p>
          </Section>
        </>
      )}

      {activeTab === 'business' && (
        <>
          <Section title={c.businessMethodTitle ?? 'Méthode'}>
            <p style={{ marginBottom: 20 }}>{c.businessMethodIntro}</p>

            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 28 }}>
              {c.businessSteps.map((step, i) => (
                <MethodStep key={i} n={String(i + 1).padStart(2, '0')} title={step.title}>
                  <p style={{ margin: i === 4 ? '0 0 16px' : i === 0 || i === 3 ? '0 0 16px' : 0 }}>{step.body}</p>

                  {i === 0 && (
                    <>
                      <SimpleTable columns={c.businessCostBasisColumns} rows={c.businessCostBasisRows} />
                      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>{c.businessCostBasisNote}</p>
                    </>
                  )}

                  {i === 3 && (
                    <>
                      <SimpleTable columns={c.businessProviderColumns} rows={c.businessProviderRows} />
                      <p style={{ fontSize: 12, color: 'var(--muted)', margin: '8px 0 20px' }}>{c.businessProviderCaveat}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 20 }}>
                        <div>
                          <SectionTitle>{c.businessClaudeTitle}</SectionTitle>
                          <StatusList title="POUR" items={c.businessClaudePros} color="var(--primary)" />
                          <StatusList title="CONTRE" items={c.businessClaudeCons} color="var(--warning)" />
                        </div>
                        <div>
                          <SectionTitle>{c.businessMistralTitle}</SectionTitle>
                          <StatusList title="POUR" items={c.businessMistralPros} color="var(--primary)" />
                          <StatusList title="CONTRE" items={c.businessMistralCons} color="var(--warning)" />
                        </div>
                      </div>
                      <p style={{ margin: 0 }}>{c.businessValueText}</p>
                    </>
                  )}

                  {i === 4 && (
                    <>
                      <SimpleTable columns={c.businessPricingColumns} rows={c.businessPricingRows} />
                      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>{c.businessPricingCaveat}</p>
                    </>
                  )}
                </MethodStep>
              ))}
            </ol>
          </Section>

          <MethodCoverage steps={c.businessSteps} lang={lang} coverageLabel={c.businessCoverageLabel} />

          <Section title={c.businessPrivacyTitle}>
            <p>{c.businessPrivacy}</p>
          </Section>
        </>
      )}

      {activeTab === 'roadmap' && (
        <Section title={c.roadmapTitle}>
          <p style={{ marginBottom: 20 }}>{c.roadmapIntro}</p>
          {c.roadmap.map((r) => (
            <RoadmapCard key={r.version} version={r.version} statusLabel={r.statusLabel} statusColor={r.statusColor} items={r.items} />
          ))}
        </Section>
      )}
    </CaseStudyLayout>
  )
}
