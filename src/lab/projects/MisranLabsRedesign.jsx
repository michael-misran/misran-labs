import CaseStudyLayout, { Section } from '../CaseStudyLayout'

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

export default function MisranLabsRedesign({ project }) {
  return (
    <CaseStudyLayout
      title="Création du lab"
      role="Product Designer & Développeur — seul sur le projet"
      period="Août 2026"
      tools={['React', 'React Router', 'SVG fait main']}
      phases={project?.phases}
    >
      <Section title="Contexte">
        <p>
          Misran Labs c'est un laboratoire d'expérimentation. Ce qui compte, c'est ce qui va être
          construit et comment je vais le construire : un roman, un jeu vidéo, une application, ou
          autre chose encore. Chaque projet qui passera par ce lab sera documenté avec la même
          exigence : les étapes suivies, les réflexions, les doutes en cours de route, et les
          chiffres quand il y en a.
        </p>
      </Section>

      <Section title="Méthode">
        <p style={{ marginBottom: 20 }}>
          Je vais utiliser une démarche scientifique pour résoudre mes problèmes. Ce qui suit me
          servira de guide — je ne sais pas encore si toutes les étapes seront pertinentes. Mais bon,
          c'est un début.
        </p>

        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <MethodStep n="01" title="L'Observation et la Problématique">
            <p style={{ margin: 0 }}>
              Identifier un phénomène particulier, une anomalie ou un problème non résolu, puis
              formuler une question précise (« Pourquoi X se produit-il ? »).
            </p>
          </MethodStep>

          <MethodStep n="02" title="L'Hypothèse">
            <p style={{ margin: 0 }}>
              Proposer une explication provisoire ou une solution théorique. Pour être qualifiée de
              scientifique, une hypothèse doit impérativement être réfutable (falsifiable), c'est-à-dire
              qu'on doit pouvoir concevoir une expérience capable de prouver qu'elle est fausse.
            </p>
          </MethodStep>

          <MethodStep n="03" title="L'Expérimentation (ou Protocole de test)">
            <p style={{ margin: 0 }}>
              Concevoir et exécuter un test rigoureux sous conditions contrôlées (avec variables
              mesurables et groupe témoin) pour confronter l'hypothèse au réel.
            </p>
          </MethodStep>

          <MethodStep n="04" title="L'Analyse des résultats">
            <p style={{ margin: 0 }}>
              Collecter, traiter et interpréter les données brutes issues de l'expérience (mesures,
              statistiques, observations), de manière neutre et sans biais de confirmation.
            </p>
          </MethodStep>

          <MethodStep n="05" title="La Conclusion et l'Itération">
            <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <strong style={{ color: 'var(--text)' }}>Si l'hypothèse est confirmée : </strong>
                Les résultats sont consolidés, soumis à l'évaluation par les pairs (peer review) et
                intégrés dans un modèle ou une théorie plus vaste.
              </li>
              <li>
                <strong style={{ color: 'var(--text)' }}>Si l'hypothèse est réfutée : </strong>
                L'expérience montre que l'idée de départ était fausse ou incomplète. On ajuste ou
                reformule l'hypothèse, puis on recommence la boucle à l'étape 2.
              </li>
            </ul>
          </MethodStep>
        </ol>
      </Section>
    </CaseStudyLayout>
  )
}
