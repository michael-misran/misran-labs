import { Section } from '../CaseStudyLayout'
import { CaseMasthead, CaseHero, CaseFooter } from '../CaseFile'
import SectionTitle from '../../design-system/SectionTitle'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'

// Dossier de référence : qui appelle qui dans le système (sessions, routines, agents, mods).
// Contrairement au dossier « Utilisation de l'IA » (le récit), celui-ci est la carte.

// Couleur d'accent par famille d'acteur
const TEINTES = {
  michael: 'var(--text)',
  session: 'var(--titre-lab)',
  oracle: 'var(--titre-gazette)',
  idees: 'var(--titre-jeux)',
  carnet: 'var(--titre-zine)',
  agent: 'var(--text2)',
  mod: 'var(--titre-lab)',
  sortie: 'var(--muted)',
}

// Une étiquette « acteur » : nom + précision (modèle, horaire…)
function Acteur({ nom, detail, teinte = 'agent', pointille }) {
  return (
    <div
      style={{
        border: `var(--border-regular) ${pointille ? 'dashed' : 'solid'} var(--border)`,
        borderLeft: `4px solid ${TEINTES[teinte]}`,
        background: 'var(--bg)',
        padding: '8px 10px',
        minWidth: 0,
      }}
    >
      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13, lineHeight: 1.3, color: 'var(--text)' }}>{nom}</div>
      {detail && (
        <div style={{ fontFamily: 'var(--font-machine)', fontSize: 11, lineHeight: 1.4, color: 'var(--text2)', marginTop: 2 }}>{detail}</div>
      )}
    </div>
  )
}

// Une chaîne « qui appelle qui » : des étapes reliées par des flèches, chaque étape pouvant regrouper plusieurs acteurs
function Chaine({ chaine, isMobile }) {
  return (
    <div style={{ marginBottom: 'var(--space-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-xs)', marginBottom: 'var(--space-xs)', flexWrap: 'wrap' }}>
        <span style={{ width: 10, height: 10, background: TEINTES[chaine.teinte], display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{chaine.titre}</span>
        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 12, color: 'var(--text2)' }}>{chaine.quand}</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'stretch',
          gap: 6,
          background: 'var(--bg2)',
          border: 'var(--border-thin) solid var(--border)',
          padding: 'var(--space-sm)',
        }}
      >
        {chaine.etapes.map((etape, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: 6, flex: isMobile ? 'none' : '1 1 0', minWidth: 0 }}>
            {i > 0 && (
              <div aria-hidden style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--muted)', textAlign: 'center', flexShrink: 0 }}>
                {isMobile ? '↓' : '→'}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
              {etape.verbe && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase' }}>{etape.verbe}</div>
              )}
              {etape.acteurs.map((a, j) => (
                <Acteur key={j} {...a} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {chaine.note && <p style={{ fontSize: 13, color: 'var(--text2)', margin: 'var(--space-xs) 0 0', lineHeight: 1.6 }}>{chaine.note}</p>}
    </div>
  )
}

// Plan d'ensemble : les quatre étages du système, de Michael au site public
function PlanEnsemble({ c }) {
  const etages = c.planEtages
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {etages.map((etage, i) => (
        <div key={i}>
          {i > 0 && (
            <div aria-hidden style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-sm)', alignItems: 'center', padding: '4px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--muted)' }}>↕</span>
              <span style={{ fontFamily: 'var(--font-machine)', fontSize: 11, color: 'var(--text2)' }}>{etage.lien}</span>
            </div>
          )}
          <div style={{ border: 'var(--border-regular) solid var(--border)', background: i % 2 ? 'var(--bg2)' : 'var(--bg)', padding: 'var(--space-sm) var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-xs)' }}>
              <span style={{ fontFamily: 'var(--font-etiquette)', fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text)' }}>{etage.nom}</span>
              <span style={{ fontFamily: 'var(--font-machine)', fontSize: 11, color: 'var(--text2)' }}>{etage.role}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 6 }}>
              {etage.acteurs.map((a, j) => (
                <Acteur key={j} {...a} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 'var(--space-xs)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                  padding: '0 var(--space-sm) var(--space-xs-plus) 0',
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
                    fontSize: 13,
                    color: j === 0 ? 'var(--text)' : 'var(--text2)',
                    fontWeight: j === 0 ? 600 : 400,
                    padding: 'var(--space-sm) var(--space-sm) var(--space-sm) 0',
                    borderBottom: 'var(--border-thin) solid var(--border)',
                    lineHeight: 1.5,
                    verticalAlign: 'top',
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

// Carte d'un mod : où il vit, ce qui le déclenche, ce qu'il fait
function CarteMod({ mod, c }) {
  return (
    <div style={{ border: 'var(--border-regular) solid var(--border)', borderTop: '4px solid var(--titre-lab)', background: 'var(--bg)', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{mod.nom}</span>
        <span style={{ fontFamily: 'var(--font-machine)', fontSize: 11, color: 'var(--text2)' }}>{mod.commande}</span>
      </div>
      {[
        [c.modOuLabel, mod.ou],
        [c.modQuandLabel, mod.quand],
        [c.modFaitLabel, mod.fait],
      ].map(([label, texte], i) => (
        <div key={i}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--muted)', textTransform: 'uppercase' }}>{label}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--prose)' }}>{texte}</div>
        </div>
      ))}
    </div>
  )
}

// Raccourcis pour écrire les chaînes
const A = (nom, detail, teinte, pointille) => ({ nom, detail, teinte, pointille })

const CONTENT = {
  fr: {
    title: 'La salle des machines',
    role: 'Carte du système : qui appelle qui',
    fileNo: 'DOSSIER Nº 010',
    mastheadCenter: 'ARCHIVE DU LAB //// PLAN TECHNIQUE',
    mastheadRight: '1977 ÉDITIONS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'ID DOSSIER — ML-ARCHIVE-010',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'TOUT TOURNE SANS MOI. RIEN NE PART SANS MOI.',
    intro:
      "Ce site est écrit, relu et publié en grande partie par Claude, pendant que je fais autre chose. Le système a grandi par couches : des sessions où je travaille avec Claude, des routines qui tournent seules à heure fixe, des agents spécialisés qu'elles appellent, et depuis le 14 octobre 2026, des mods qui s'accrochent à Claude Code lui-même. Ce dossier est la carte : qui déclenche quoi, avec quel modèle, et où ça s'arrête.",
    introRegleLabel: 'La règle qui tient tout :',
    introRegle:
      "Tout peut tourner sans moi, mais rien n'arrive sur le site sans que je fusionne une pull request. Le site part en production dès que la branche main change : c'est la seule porte, et c'est moi qui ai la clé.",

    planTitle: "Plan d'ensemble",
    planIntro: 'Quatre étages. Chacun ne parle qu’à ses voisins.',
    planEtages: [
      {
        nom: 'Moi',
        role: 'décide, cadre, fusionne',
        acteurs: [A('Mac', 'app Claude, onglet Code', 'michael'), A('iPhone', 'Remote Control, notifications', 'michael'), A('Carnet papier', 'idées, croquis', 'michael')],
      },
      {
        nom: 'Sessions Claude',
        role: 'là où le travail se fait',
        lien: 'je tape, ou une horloge déclenche',
        acteurs: [
          A('Session interactive', 'Opus · avec moi', 'session'),
          A('Tour de contrôle', 'la session qui reçoit les retours', 'session'),
          A('Routine Oracle', 'Sonnet · chaque jour 5 h 30', 'oracle'),
          A('Routine missions', 'Sonnet · toutes les 2 h', 'session'),
          A('Routine idées', 'Sonnet · dimanche 19 h', 'idees'),
        ],
      },
      {
        nom: 'Agents spécialisés',
        role: 'appelés par une session, ne commitent jamais',
        lien: 'une session délègue une tâche précise',
        acteurs: [
          A('veilleur', 'Haiku · collecte l’actualité', 'agent'),
          A('relecteur', 'Sonnet · vérifie les faits', 'agent'),
          A('secretaire', 'Sonnet · relit la forme', 'agent'),
          A('explorateur', 'Haiku · cherche dans le code', 'agent'),
          A('verificateur', 'Haiku · contrôle dans le navigateur', 'agent'),
          A('controleur', 'Haiku · contrôle avant push', 'agent'),
          A('expert', 'Opus · en cas de blocage', 'agent'),
        ],
      },
      {
        nom: 'Sorties',
        role: 'ce qui quitte la machine',
        lien: 'push d’une branche auto/*, pull request',
        acteurs: [
          A('GitHub', 'pull requests à valider', 'sortie'),
          A('Vercel', 'publie main sur le site', 'sortie'),
          A('Dépôt privé', 'notes, PDF, carnet', 'sortie'),
          A('Notification', 'sur l’iPhone', 'sortie'),
        ],
      },
    ],

    chainesTitle: 'Qui appelle qui, flux par flux',
    chainesIntro: 'Chaque ligne se lit de gauche à droite (de haut en bas sur téléphone). Les cadres en pointillés sont les étapes où j’interviens.',
    chaines: [
      {
        titre: 'L’Oracle du Matin',
        quand: 'chaque jour, 5 h 30',
        teinte: 'oracle',
        etapes: [
          { verbe: 'déclenche', acteurs: [A('Horloge', 'tâche programmée', 'sortie')] },
          { verbe: 'rédige', acteurs: [A('Routine Oracle', 'Sonnet', 'oracle')] },
          { verbe: 'appelle', acteurs: [A('veilleur', 'Haiku · actu IA 72 h, tech 7 j', 'agent'), A('relecteur', 'Sonnet · rouvre chaque source', 'agent')] },
          { verbe: 'produit', acteurs: [A('PDF FR + EN', 'A4 recto verso', 'sortie'), A('PR auto/breves-<date>', 'numéro complet + brèves', 'sortie'), A('Notification', '« Oracle n° … prêt »', 'sortie')] },
          { verbe: 'valide', acteurs: [A('Je fusionne', 'depuis l’iPhone le plus souvent', 'michael', true)] },
          { verbe: 'publie', acteurs: [A('Vercel', 'page /oracle', 'sortie')] },
        ],
        note: 'La routine prépare tout dans un dossier à part (un « worktree »), jamais dans mon dossier de travail, pour ne pas changer de branche sous mes pieds. Elle sauvegarde aussi le numéro dans le dépôt privé.',
      },
      {
        titre: 'Les missions autonomes',
        quand: 'cadrées avec moi, exécutées toutes les 2 h',
        teinte: 'session',
        etapes: [
          { verbe: 'cadre', acteurs: [A('Moi + session interactive', '/mission : SPEC et PLAN', 'michael', true)] },
          { verbe: 'range', acteurs: [A('Branche auto/<nom>', 'un dossier missions/<nom>', 'sortie')] },
          { verbe: 'exécute', acteurs: [A('Routine missions', 'Sonnet · étape par étape', 'session')] },
          { verbe: 'délègue selon le PLAN', acteurs: [A('explorateur · verificateur', 'Haiku', 'agent'), A('sous-agent Haiku', 'étapes mécaniques', 'agent'), A('expert', 'Opus · après 2 échecs', 'agent')] },
          { verbe: 'livre', acteurs: [A('Commits + RAPPORT.md', 'sur la branche, jamais sur main', 'sortie')] },
          { verbe: 'clôture', acteurs: [A('controleur', 'Haiku · lint, build, secrets', 'agent'), A('Push + PR, je fusionne', 'avec moi seulement', 'michael', true)] },
        ],
        note: 'Le PLAN indique, pour chaque étape, quel agent et quel modèle la font. La routine suit l’indication, peut appeler l’expert en plus, jamais en moins. Quand la file est vide, la tâche se désactive pour ne rien consommer.',
      },
      {
        titre: 'Les idées du dimanche',
        quand: 'dimanche, 19 h',
        teinte: 'idees',
        etapes: [
          { verbe: 'déclenche', acteurs: [A('Horloge', 'tâche programmée', 'sortie')] },
          { verbe: 'trie puis cherche', acteurs: [A('Routine idées', 'Sonnet · trie d’abord le carnet', 'idees')] },
          { verbe: 'appelle', acteurs: [A('veilleur', 'Haiku · signaux du marché', 'agent'), A('relecteur', 'Sonnet · chiffres sourcés', 'agent')] },
          { verbe: 'produit', acteurs: [A('Fiches P-NNN', 'publiques, par PR', 'sortie'), A('Notes économiques', 'dépôt privé', 'sortie')] },
          { verbe: 'décide', acteurs: [A('Je garde ou j’arrête', 'dans la tour de contrôle', 'michael', true)] },
          { verbe: 'suite', acteurs: [A('« On développe P-NNN »', 'devient une mission', 'session')] },
        ],
      },
      {
        titre: 'Le carnet',
        quand: 'à tout moment',
        teinte: 'carnet',
        etapes: [
          { verbe: 'j’écris', acteurs: [A('« note : … »', 'dans n’importe quelle session', 'michael', true)] },
          { verbe: 'range', acteurs: [A('Session en cours', 'répond « Noté. » et reprend', 'session')] },
          { verbe: 'stocke', acteurs: [A('Boîte du carnet', 'dépôt privé, jamais publié', 'sortie')] },
          { verbe: 'trie', acteurs: [A('Routine idées', 'le dimanche', 'idees')] },
          { verbe: 'oriente', acteurs: [A('→ idée P-NNN', '', 'idees'), A('→ sujet du journal', '', 'oracle'), A('→ mission', '', 'session')] },
        ],
      },
      {
        titre: 'Le retour de routine',
        quand: 'à la fin de chaque routine',
        teinte: 'mod',
        etapes: [
          { verbe: 'termine', acteurs: [A('Une routine', 'Oracle, missions, idées', 'session')] },
          { verbe: 'intercepte', acteurs: [A('mod retour-routine', 'aucun token', 'mod')] },
          { verbe: 'dépose', acteurs: [A('Boîte aux lettres', 'un fichier partagé', 'sortie')] },
          { verbe: 'relève chaque minute', acteurs: [A('Tour de contrôle', 'tant qu’elle est ouverte', 'session')] },
          { verbe: 'me résume', acteurs: [A('Claude, dans la tour', 'ce qui est fait, ce qui attend', 'session')] },
          { verbe: 'je regarde', acteurs: [A('/kiosque', 'missions, PR, Oracle du jour', 'michael', true)] },
        ],
        note: 'Avant ce mod, une session ne savait rien de la fin d’une routine tant que je ne demandais pas. Première idée : que la routine écrive directement à la tour. Refusé : par sécurité, une session lancée par un horaire n’a pas le droit d’écrire à une autre session. D’où la boîte aux lettres, que la tour vient relever elle-même.',
      },
    ],

    modsTitle: 'Les mods : des programmes dans Claude Code',
    modsIntro:
      'Un mod est un petit programme TypeScript qui s’accroche à Claude Code : il voit passer chaque commande, chaque fin de tour, et peut afficher un panneau. Il ne consomme aucun token : c’est du code, pas un modèle. Les quatre mods sont chargés par toutes les sessions de la machine, y compris les routines.',
    modOuLabel: 'Où il agit',
    modQuandLabel: 'Quand',
    modFaitLabel: 'Ce qu’il fait',
    mods: [
      {
        nom: 'garde-git',
        commande: '/garde-git',
        ou: 'Dans chaque session, avant chaque commande du terminal.',
        quand: 'Dès qu’une commande touche git, gh ou vercel.',
        fait:
          'Bloque le push forcé partout. Dans une routine, bloque aussi : commit hors d’une branche auto/*, push d’autre chose que les branches de l’Oracle et des idées, merge, rebase, fusion de PR, déploiement. Les interdits n’étaient que des consignes écrites ; ils sont maintenant appliqués.',
      },
      {
        nom: 'retour-routine',
        commande: '/tour-de-controle',
        ou: 'Dans les routines (dépôt) et la tour de contrôle (relève).',
        quand: 'À la fin de chaque tour d’une routine.',
        fait: 'Dépose le résumé de la routine dans une boîte aux lettres. La session désignée comme tour de contrôle la relève chaque minute et transmet les résumés à Claude, qui me les résume.',
      },
      {
        nom: 'kiosque',
        commande: '/kiosque',
        ou: 'Un panneau à côté de la conversation.',
        quand: 'À l’ouverture, puis toutes les 10 minutes.',
        fait: 'Affiche l’état de l’Oracle du jour, les missions en cours avec leurs étapes cochées, les missions à clôturer et les pull requests ouvertes. Lu directement dans git et GitHub.',
      },
      {
        nom: 'garde-controleur',
        commande: '/garde-controleur',
        ou: 'Dans chaque session, avant l’ouverture d’une pull request sur misran-labs.',
        quand: 'Dès qu’une session veut ouvrir une PR (sauf les routines de l’Oracle et des idées, auto/breves-* et auto/projets-*).',
        fait: 'Refuse la PR tant que l’agent controleur n’a pas posé son tampon, OK ou ATTENTION, sur la version exacte de la branche. Seul le controleur peut tamponner : un commit de plus après son passage, et il faut repasser. /garde-controleur liste les derniers tampons.',
      },
    ],
    modsNote: 'Une session reconnaît qu’elle est une routine au premier message envoyé par une tâche programmée, et non par moi.',

    tablesTitle: 'Qui fait quoi',
    agentsSousTitre: 'Les agents',
    agentsCols: ['AGENT', 'MODÈLE', 'RÔLE', 'APPELÉ PAR'],
    agentsRows: [
      ['veilleur', 'Haiku', 'Collecte les nouveautés d’une fenêtre de dates sur des sources officielles. Ne rédige rien.', 'Oracle, idées'],
      ['relecteur', 'Sonnet', 'Rouvre chaque source et vérifie chaque chiffre, date et nom. Ne modifie rien.', 'Oracle, idées'],
      ['secretaire', 'Sonnet', 'Orthographe, typographie, traductions anglaises, renvois de pages.', 'Session interactive'],
      ['explorateur', 'Haiku', 'Recherche en lecture seule dans le code, inventaires.', 'Missions, session interactive'],
      ['verificateur', 'Haiku', 'Rendu des pages, erreurs console, valeurs CSS dans le navigateur.', 'Missions'],
      ['controleur', 'Haiku', 'Lint, build, secrets et données personnelles avant chaque pull request. Rend un verdict et pose son tampon.', 'Toute session avant une PR'],
      ['expert', 'Opus', 'Débloque un problème après deux échecs, ou tranche une question d’architecture.', 'Missions (rare)'],
    ],
    routinesSousTitre: 'Les routines',
    routinesCols: ['ROUTINE', 'QUAND', 'MODÈLE', 'SORTIE', 'CE QUE JE FAIS'],
    routinesRows: [
      ['Oracle du Matin', 'Chaque jour, 5 h 30', 'Sonnet', 'PDF FR/EN, PR du numéro, notification', 'Je fusionne la PR'],
      ['Missions', 'Toutes les 2 h', 'Sonnet', 'Commits sur auto/<nom>, RAPPORT.md', 'Je clôture avec Claude'],
      ['Idées du dimanche', 'Dimanche, 19 h', 'Sonnet', 'Fiches P-NNN par PR, notes privées', 'Je garde ou j’arrête'],
    ],
    modelesNote:
      'Pourquoi trois modèles : Haiku pour ce qui est mécanique et répétitif (le moins cher), Sonnet pour exécuter et rédiger, Opus pour travailler avec moi et pour les rares blocages. Le coût suit la difficulté.',

    gardeFousTitle: 'Les garde-fous, en couches',
    gardeFousIntro: 'Le dépôt est public et main part en production : chaque couche rattrape ce que la précédente laisserait passer.',
    gardeFous: [
      ['1. Les consignes', 'CLAUDE.md liste les interdits absolus : jamais de commit sur main par une routine, jamais de --force, rien de personnel dans un commit.'],
      ['2. Le mode automatique', 'Un classifieur juge chaque action risquée avant qu’elle parte, avec mes règles en contexte.'],
      ['3. Le mod garde-git', 'Bloque techniquement les commandes interdites, même si les deux couches précédentes les laissent passer.'],
      ['4. Le controleur et son mod', 'Relit la branche (build, lint, secrets) avant chaque pull request et la tamponne ; le mod garde-controleur refuse la PR sans ce tampon.'],
      ['5. Moi', 'Je fusionne chaque pull request moi-même. Rien n’arrive sur le site autrement.'],
    ],

    limitesTitle: 'Ce qui reste fragile',
    limites: [
      'Les quatre mods datent du 14 octobre 2026 : les trois premiers ont passé leur premier essai sur une vraie routine, garde-controleur fait ses premières pull requests ; pas encore des semaines d’usage.',
      'La tour ne relève la boîte que si elle est ouverte sur le Mac ; sinon les résumés attendent dans la boîte.',
      'Une routine qui demande une autorisation que personne ne donne peut rester bloquée : c’est arrivé, et c’est pour ça que les consignes lui interdisent de poser des questions.',
    ],
  },

  en: {
    title: 'The engine room',
    role: 'System map: who calls whom',
    fileNo: 'FILE Nº 010',
    mastheadCenter: 'LAB ARCHIVE //// TECHNICAL MAP',
    mastheadRight: '1977 ÉDITIONS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    docId: 'FILE ID — ML-ARCHIVE-010',
    clearance: 'CLEARANCE — PUBLIC',
    tagline: 'EVERYTHING RUNS WITHOUT ME. NOTHING SHIPS WITHOUT ME.',
    intro:
      'This site is largely written, checked and published by Claude while I do something else. The system grew in layers: sessions where I work with Claude, routines that run on their own on a schedule, specialised agents they call, and since 14 October 2026, mods that plug into Claude Code itself. This file is the map: who triggers what, with which model, and where it stops.',
    introRegleLabel: 'The rule that holds it together:',
    introRegle:
      'Everything can run without me, but nothing reaches the site unless I merge a pull request. The site goes live as soon as the main branch changes: that is the only door, and I hold the key.',

    planTitle: 'Overview',
    planIntro: 'Four floors. Each one only talks to its neighbours.',
    planEtages: [
      {
        nom: 'Me',
        role: 'decide, scope, merge',
        acteurs: [A('Mac', 'Claude app, Code tab', 'michael'), A('iPhone', 'Remote Control, notifications', 'michael'), A('Paper notebook', 'ideas, sketches', 'michael')],
      },
      {
        nom: 'Claude sessions',
        role: 'where the work happens',
        lien: 'I type, or a clock fires',
        acteurs: [
          A('Interactive session', 'Opus · with me', 'session'),
          A('Control tower', 'the session that gets the reports', 'session'),
          A('Oracle routine', 'Sonnet · daily 5:30 am', 'oracle'),
          A('Missions routine', 'Sonnet · every 2 h', 'session'),
          A('Ideas routine', 'Sonnet · Sunday 7 pm', 'idees'),
        ],
      },
      {
        nom: 'Specialised agents',
        role: 'called by a session, never commit',
        lien: 'a session hands off a precise task',
        acteurs: [
          A('veilleur', 'Haiku · gathers the news', 'agent'),
          A('relecteur', 'Sonnet · fact-checks', 'agent'),
          A('secretaire', 'Sonnet · copy-edits', 'agent'),
          A('explorateur', 'Haiku · searches the code', 'agent'),
          A('verificateur', 'Haiku · checks in the browser', 'agent'),
          A('controleur', 'Haiku · checks before a push', 'agent'),
          A('expert', 'Opus · when stuck', 'agent'),
        ],
      },
      {
        nom: 'Outputs',
        role: 'what leaves the machine',
        lien: 'push of an auto/* branch, pull request',
        acteurs: [
          A('GitHub', 'pull requests to review', 'sortie'),
          A('Vercel', 'publishes main to the site', 'sortie'),
          A('Private repo', 'notes, PDFs, notebook', 'sortie'),
          A('Notification', 'on the iPhone', 'sortie'),
        ],
      },
    ],

    chainesTitle: 'Who calls whom, flow by flow',
    chainesIntro: 'Each row reads left to right (top to bottom on a phone). Dashed boxes are the steps where I step in.',
    chaines: [
      {
        titre: 'The Morning Oracle',
        quand: 'every day, 5:30 am',
        teinte: 'oracle',
        etapes: [
          { verbe: 'triggers', acteurs: [A('Clock', 'scheduled task', 'sortie')] },
          { verbe: 'writes', acteurs: [A('Oracle routine', 'Sonnet', 'oracle')] },
          { verbe: 'calls', acteurs: [A('veilleur', 'Haiku · AI news 72 h, tech 7 d', 'agent'), A('relecteur', 'Sonnet · reopens every source', 'agent')] },
          { verbe: 'produces', acteurs: [A('PDF FR + EN', 'A4, both sides', 'sortie'), A('PR auto/breves-<date>', 'full issue + briefs', 'sortie'), A('Notification', '“Oracle no. … ready”', 'sortie')] },
          { verbe: 'approves', acteurs: [A('I merge', 'usually from the iPhone', 'michael', true)] },
          { verbe: 'publishes', acteurs: [A('Vercel', '/oracle page', 'sortie')] },
        ],
        note: 'The routine prepares everything in a separate folder (a “worktree”), never in my working folder, so it never switches branches under my feet. It also backs the issue up in the private repo.',
      },
      {
        titre: 'Autonomous missions',
        quand: 'scoped with me, run every 2 h',
        teinte: 'session',
        etapes: [
          { verbe: 'scope', acteurs: [A('Me + interactive session', '/mission: SPEC and PLAN', 'michael', true)] },
          { verbe: 'stores', acteurs: [A('auto/<name> branch', 'a missions/<name> folder', 'sortie')] },
          { verbe: 'runs', acteurs: [A('Missions routine', 'Sonnet · step by step', 'session')] },
          { verbe: 'delegates per PLAN', acteurs: [A('explorateur · verificateur', 'Haiku', 'agent'), A('Haiku sub-agent', 'mechanical steps', 'agent'), A('expert', 'Opus · after 2 failures', 'agent')] },
          { verbe: 'delivers', acteurs: [A('Commits + RAPPORT.md', 'on the branch, never on main', 'sortie')] },
          { verbe: 'wraps up', acteurs: [A('controleur', 'Haiku · lint, build, secrets', 'agent'), A('Push + PR, I merge', 'with me only', 'michael', true)] },
        ],
        note: 'For each step the PLAN names the agent and model that does it. The routine follows it, may add the expert, never drop it. When the queue is empty, the task switches itself off so it costs nothing.',
      },
      {
        titre: 'Sunday ideas',
        quand: 'Sunday, 7 pm',
        teinte: 'idees',
        etapes: [
          { verbe: 'triggers', acteurs: [A('Clock', 'scheduled task', 'sortie')] },
          { verbe: 'sorts then searches', acteurs: [A('Ideas routine', 'Sonnet · sorts the notebook first', 'idees')] },
          { verbe: 'calls', acteurs: [A('veilleur', 'Haiku · market signals', 'agent'), A('relecteur', 'Sonnet · sourced figures', 'agent')] },
          { verbe: 'produces', acteurs: [A('P-NNN cards', 'public, by PR', 'sortie'), A('Business notes', 'private repo', 'sortie')] },
          { verbe: 'decides', acteurs: [A('I keep or drop', 'in the control tower', 'michael', true)] },
          { verbe: 'next', acteurs: [A('“Let’s build P-NNN”', 'becomes a mission', 'session')] },
        ],
      },
      {
        titre: 'The notebook',
        quand: 'any time',
        teinte: 'carnet',
        etapes: [
          { verbe: 'I write', acteurs: [A('“note: …”', 'in any session', 'michael', true)] },
          { verbe: 'files', acteurs: [A('Current session', 'answers “Noted.” and carries on', 'session')] },
          { verbe: 'stores', acteurs: [A('Notebook inbox', 'private repo, never published', 'sortie')] },
          { verbe: 'sorts', acteurs: [A('Ideas routine', 'on Sunday', 'idees')] },
          { verbe: 'routes', acteurs: [A('→ idea P-NNN', '', 'idees'), A('→ newspaper topic', '', 'oracle'), A('→ mission', '', 'session')] },
        ],
      },
      {
        titre: 'Routine report',
        quand: 'at the end of every routine',
        teinte: 'mod',
        etapes: [
          { verbe: 'finishes', acteurs: [A('A routine', 'Oracle, missions, ideas', 'session')] },
          { verbe: 'catches', acteurs: [A('retour-routine mod', 'no tokens', 'mod')] },
          { verbe: 'drops', acteurs: [A('Mailbox', 'a shared file', 'sortie')] },
          { verbe: 'checks every minute', acteurs: [A('Control tower', 'while it is open', 'session')] },
          { verbe: 'sums up', acteurs: [A('Claude, in the tower', 'what is done, what waits', 'session')] },
          { verbe: 'I look', acteurs: [A('/kiosque', 'missions, PRs, today’s Oracle', 'michael', true)] },
        ],
        note: 'Before this mod, a session knew nothing about a routine finishing until I asked. First idea: have the routine write straight to the tower. Refused: for safety, a session started by a schedule may not write to another session. Hence the mailbox, which the tower comes to check itself.',
      },
    ],

    modsTitle: 'Mods: programs inside Claude Code',
    modsIntro:
      'A mod is a small TypeScript program that plugs into Claude Code: it sees every command and every end of turn go by, and can draw a panel. It uses no tokens: it is code, not a model. All four mods load in every session on the machine, routines included.',
    modOuLabel: 'Where it acts',
    modQuandLabel: 'When',
    modFaitLabel: 'What it does',
    mods: [
      {
        nom: 'garde-git',
        commande: '/garde-git',
        ou: 'In every session, before every terminal command.',
        quand: 'Whenever a command touches git, gh or vercel.',
        fait:
          'Blocks force-pushes everywhere. In a routine it also blocks: commits outside an auto/* branch, pushing anything but the Oracle and ideas branches, merge, rebase, merging a PR, deploying. The rules used to be written instructions only; now they are enforced.',
      },
      {
        nom: 'retour-routine',
        commande: '/tour-de-controle',
        ou: 'In routines (drop-off) and in the control tower (pick-up).',
        quand: 'At the end of every routine turn.',
        fait: 'Drops the routine’s summary in a mailbox. The session set as control tower checks it every minute and hands the summaries to Claude, who sums them up for me.',
      },
      {
        nom: 'kiosque',
        commande: '/kiosque',
        ou: 'A panel next to the conversation.',
        quand: 'When opened, then every 10 minutes.',
        fait: 'Shows today’s Oracle status, running missions with their ticked steps, missions to wrap up and open pull requests. Read straight from git and GitHub.',
      },
      {
        nom: 'garde-controleur',
        commande: '/garde-controleur',
        ou: 'In every session, before a pull request is opened on misran-labs.',
        quand: 'Whenever a session wants to open a PR (except the Oracle and ideas routines, auto/breves-* and auto/projets-*).',
        fait: 'Refuses the PR until the controleur agent has stamped the exact version of the branch, OK or ATTENTION. Only the controleur can stamp: one more commit after it ran, and it has to run again. /garde-controleur lists the latest stamps.',
      },
    ],
    modsNote: 'A session knows it is a routine from its first message, sent by a scheduled task rather than by me.',

    tablesTitle: 'Who does what',
    agentsSousTitre: 'Agents',
    agentsCols: ['AGENT', 'MODEL', 'ROLE', 'CALLED BY'],
    agentsRows: [
      ['veilleur', 'Haiku', 'Gathers what is new over a date window from official sources. Writes nothing.', 'Oracle, ideas'],
      ['relecteur', 'Sonnet', 'Reopens every source and checks every figure, date and name. Changes nothing.', 'Oracle, ideas'],
      ['secretaire', 'Sonnet', 'Spelling, typography, English translations, page references.', 'Interactive session'],
      ['explorateur', 'Haiku', 'Read-only code search, inventories.', 'Missions, interactive session'],
      ['verificateur', 'Haiku', 'Page rendering, console errors, CSS values in the browser.', 'Missions'],
      ['controleur', 'Haiku', 'Lint, build, secrets and personal data before every pull request. Returns a verdict and stamps the branch.', 'Any session before a PR'],
      ['expert', 'Opus', 'Unblocks a problem after two failures, or settles an architecture question.', 'Missions (rare)'],
    ],
    routinesSousTitre: 'Routines',
    routinesCols: ['ROUTINE', 'WHEN', 'MODEL', 'OUTPUT', 'WHAT I DO'],
    routinesRows: [
      ['Morning Oracle', 'Daily, 5:30 am', 'Sonnet', 'FR/EN PDFs, issue PR, notification', 'I merge the PR'],
      ['Missions', 'Every 2 h', 'Sonnet', 'Commits on auto/<name>, RAPPORT.md', 'I wrap up with Claude'],
      ['Sunday ideas', 'Sunday, 7 pm', 'Sonnet', 'P-NNN cards by PR, private notes', 'I keep or drop'],
    ],
    modelesNote:
      'Why three models: Haiku for mechanical, repetitive work (the cheapest), Sonnet to execute and write, Opus to work with me and for the rare dead ends. Cost follows difficulty.',

    gardeFousTitle: 'Safeguards, in layers',
    gardeFousIntro: 'The repo is public and main goes live: each layer catches what the previous one would let through.',
    gardeFous: [
      ['1. Instructions', 'CLAUDE.md lists the absolute rules: no routine ever commits to main, never --force, nothing personal in a commit.'],
      ['2. Auto mode', 'A classifier judges every risky action before it runs, with my rules as context.'],
      ['3. The garde-git mod', 'Technically blocks forbidden commands, even if the two layers above let them through.'],
      ['4. The controleur and its mod', 'Checks the branch (build, lint, secrets) before every pull request and stamps it; the garde-controleur mod refuses the PR without that stamp.'],
      ['5. Me', 'I merge every pull request myself. Nothing reaches the site any other way.'],
    ],

    limitesTitle: 'What is still fragile',
    limites: [
      'All four mods date from 14 October 2026: the first three passed their first test on a real routine, garde-controleur is on its first pull requests; not yet weeks of use.',
      'The tower only checks the mailbox while it is open on the Mac; otherwise summaries wait in the box.',
      'A routine that asks for a permission nobody gives can get stuck: it happened, which is why its instructions forbid it from asking questions.',
    ],
  },
}

export default function SalleDesMachines({ project }) {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const isMobile = useIsMobile()

  return (
    <div style={{ padding: isMobile ? 'var(--space-md-plus)' : 40, fontFamily: 'var(--font-body)', color: 'var(--text)', maxWidth: 1040, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c} />

      <div style={{ maxWidth: 720, marginBottom: 40 }}>
        <p style={{ fontSize: 15, color: 'var(--prose)', lineHeight: 1.7, margin: '0 0 var(--space-md-plus)' }}>{c.intro}</p>
        <div style={{ fontSize: 15, color: 'var(--prose)', fontWeight: 600, marginBottom: 'var(--space-2xs)' }}>{c.introRegleLabel}</div>
        <p style={{ fontSize: 15, color: 'var(--prose)', lineHeight: 1.7, margin: 0 }}>{c.introRegle}</p>
      </div>

      <Section title={c.planTitle}>
        <p style={{ marginTop: 0 }}>{c.planIntro}</p>
        <PlanEnsemble c={c} />
      </Section>

      <Section title={c.chainesTitle}>
        <p style={{ marginTop: 0 }}>{c.chainesIntro}</p>
        {c.chaines.map((chaine, i) => (
          <Chaine key={i} chaine={chaine} isMobile={isMobile} />
        ))}
      </Section>

      <Section title={c.modsTitle}>
        <p style={{ marginTop: 0 }}>{c.modsIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
          {c.mods.map((mod, i) => (
            <CarteMod key={i} mod={mod} c={c} />
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text2)', margin: 0 }}>{c.modsNote}</p>
      </Section>

      {/* Titres et tableaux restent ensemble sur la même page (coulée en colonnes du magazine) */}
      <div style={{ breakInside: 'avoid' }}>
      <Section title={c.tablesTitle}>
        <div style={{ breakInside: 'avoid' }}>
          <SectionTitle>{c.routinesSousTitre}</SectionTitle>
          <Table columns={c.routinesCols} rows={c.routinesRows} />
        </div>
        <div style={{ height: 'var(--space-md)' }} />
        <div style={{ breakInside: 'avoid' }}>
          <SectionTitle>{c.agentsSousTitre}</SectionTitle>
          <Table columns={c.agentsCols} rows={c.agentsRows} />
          <p style={{ fontSize: 13, color: 'var(--text2)', margin: 'var(--space-sm) 0 0' }}>{c.modelesNote}</p>
        </div>
      </Section>
      </div>

      <Section title={c.gardeFousTitle}>
        <p style={{ marginTop: 0 }}>{c.gardeFousIntro}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {c.gardeFous.map(([titre, texte], i) => (
            <div
              key={i}
              style={{
                border: 'var(--border-thin) solid var(--border)',
                background: i === c.gardeFous.length - 1 ? 'var(--bg2)' : 'var(--bg)',
                padding: 'var(--space-sm) var(--space-md)',
                marginLeft: isMobile ? 0 : i * 16,
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{titre}</div>
              <div style={{ fontSize: 13, color: 'var(--prose)', lineHeight: 1.6 }}>{texte}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={c.limitesTitle}>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          {c.limites.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <CaseFooter c={c} />
    </div>
  )
}
