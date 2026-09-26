import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../CaseStudyLayout'
import { CaseMasthead, CaseHero, CaseMetaRow, CaseTabs, CaseFooter } from '../CaseFile'
import { LinkButton } from '../../design-system/kit'
import SectionTitle from '../../design-system/SectionTitle'
import { STATUS, METHOD_STEP_COLORS } from '../phases'
import { useLanguage } from '../../shell/LanguageContext'
import useIsMobile from '../../shell/useIsMobile'

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
                borderRadius: 'var(--radius-xs)',
                border: `var(--border-thin) solid ${color}`,
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
        border: 'var(--border-thin) solid var(--border)',
        borderRadius: 'var(--radius-xl)',
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
            border: `var(--border-thin) solid ${statusColor}`,
            borderRadius: 'var(--radius-xs)',
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

function BugCard({ title, symptomLabel, symptom, causeLabel, cause, fixLabel, fix, severity }) {
  const color = severity === 'major' ? 'var(--warning)' : 'var(--primary)'
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: 'var(--border-thin) solid var(--border)',
        borderLeft: `var(--border-thick) solid ${color}`,
        borderRadius: 'var(--radius-md)',
        padding: 20,
        marginBottom: 16,
      }}
    >
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{symptomLabel}</span>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{symptom}</p>
        </div>
        <div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{causeLabel}</span>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{cause}</p>
        </div>
        <div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color, letterSpacing: '0.08em' }}>{fixLabel}</span>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{fix}</p>
        </div>
      </div>
    </div>
  )
}

function SessionCard({ date, title, summary, what, decision, whatLabel, decisionLabel, demoTo, demoLabel }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        background: 'var(--bg2)',
        border: `var(--border-thin) solid ${open ? 'var(--primary)' : 'var(--border)'}`,
        borderLeft: `var(--border-thick) solid ${open ? 'var(--primary)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        padding: 20,
        marginBottom: 12,
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.06em' }}>
              {date}
            </span>
          </div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
            {title}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{summary}</p>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: 'var(--muted)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }}>
          ▼
        </span>
      </div>

      <div style={{ maxHeight: open ? 500 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ borderTop: 'var(--border-thin) solid var(--border)', marginTop: 16, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{whatLabel}</span>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{what}</p>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.08em' }}>{decisionLabel}</span>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{decision}</p>
          </div>
          {demoTo && (
            <LinkButton
              to={demoTo}
              size="sm"
              trailing="→"
              onClick={(e) => e.stopPropagation()}
              style={{ alignSelf: 'flex-start' }}
            >
              {demoLabel}
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}

const CONTENT = {
  fr: {
    title: 'The Lost Cauldron — Le Jeu',
    role: 'Game Designer & Développeur — seul sur le projet (assisté par IA)',
    period: 'Août 2026',
    tools: ['Godot 4.6 (GDScript)', 'Aseprite (pipeline sprites)', 'Claude Code'],
    fileNo: 'DOSSIER Nº 002',
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    periodLabel: 'PÉRIODE',
    toolsLabel: 'OUTILS',
    docId: 'ID DOSSIER — ML-ARCHIVE-002',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    tabs: [
      { id: 'overview', label: 'Vue d’ensemble' },
      { id: 'architecture', label: 'Architecture technique' },
      { id: 'specs', label: 'Spécifications fonctionnelles' },
      { id: 'bugs', label: 'Bugs & résolutions' },
      { id: 'journal', label: 'Journal de session' },
      { id: 'roadmap', label: 'Roadmap' },
    ],

    contextTitle: 'Contexte',
    demoV1Label: 'Voir la démo V0.1 →',
    demoV2Label: 'Voir la démo V0.2 →',
    context: "The Lost Cauldron est d'abord un roman fantasy que j'écris (démons infiltrant discrètement les hautes sphères de la société — finance, religion, médias, justice — sous couvert d'une fondation, Occasus). J'en tire un jeu vidéo : un survivor-like (type Vampire Survivors), genre le plus rapide à produire seul avec assistance IA, mais aussi le plus saturé de clones. L'objectif n'est pas un projet de plusieurs années : un jeu rapide à produire et rentable, en réutilisant l'univers déjà écrit plutôt qu'en partant de zéro.",

    methodTitle: 'Méthode',
    methodIntro: "Même grille d'analyse que pour le reste du Lab — les 5 étapes de la démarche scientifique.",
    coverageLabel: 'APPLICATION DE LA MÉTHODE',
    steps: [
      {
        title: "L'Observation et la Problématique",
        status: 'done',
        body: "Le genre survivor-like est saturé (vague de clones depuis 2022, toujours active en 2025-2026), mais reste le plus rapide à prototyper en solo. Question précise : peut-on s'y différencier sans exploser le temps de dev, en s'appuyant sur un univers déjà écrit plutôt que sur une nouvelle mécanique complexe ?",
      },
      {
        title: "L'Hypothèse",
        status: 'done',
        body: "Un twist thématique simple — chaque vague/run correspond à un secteur de la société infiltré par un démon (finance, religion, médias…), avec des ennemis stylisés en archétypes humains plutôt qu'en monstres génériques — suffit à différencier le jeu sans ajouter de complexité mécanique. Hypothèse réfutable : si un secteur pilote complet (déplacement, vagues, level-up, mort/victoire) est jouable en quelques sessions sans dérive de scope, l'hypothèse tient.",
      },
      {
        title: 'L’Expérimentation',
        status: 'done',
        body: "Secteur pilote choisi : Religion (le démon Bélial), le plus documenté dans le lore existant (Vautrin, l'Église infiltrée). Godot 4 + GDScript, un seul secteur construit intégralement en code procédural pour aller vite. Premier sprite intégré comme joueur : un personnage acheté (le temps de valider le pipeline), depuis remplacé par le vrai sprite de Marcus.",
      },
      {
        title: "L'Analyse des résultats",
        status: 'partial',
        body: "Boucle de jeu complète validée (mouvement, vagues d'ennemis, XP, level-up, mort/victoire) via des tests headless automatisés. Plusieurs bugs de rendu et d'orientation du personnage trouvés et corrigés en cours de route — détail dans l'onglet Bugs. Le twist « un secteur = une identité » n'est validé que sur un seul secteur ; pas encore prouvé qu'il tient sur plusieurs.",
      },
      {
        title: "La Conclusion et l'Itération",
        status: 'skipped',
        branches: [
          { label: "Si le secteur pilote reste fun et lisible en jeu réel : ", text: "ajouter soit un boss de fin de run, soit un deuxième secteur pour prouver que le twist scale, soit le hub meta-progression (le pub) — décision pas encore tranchée." },
          { label: "Si le scope commence à déraper : ", text: "revenir au secteur unique et le polir avant d'étendre quoi que ce soit." },
        ],
      },
    ],

    archTitle: 'Architecture technique',
    archIntro: "Choix pensés pour de l'itération rapide en solo avec un assistant IA, pas pour une architecture « propre » au sens classique.",
    archEngineTitle: 'Moteur et rendu',
    archEngine: [
      'Godot 4.6.3, en GDScript',
      "Rendu gl_compatibility (compatibilité large plutôt que Forward+) pour limiter les surprises entre machines",
      "Plein écran avec mise à l'échelle canvas_items + conservation du ratio (canvas logique 1280×720)",
      "Échap pour quitter — nécessaire en plein écran, pas de barre de fenêtre",
    ],
    archPatternTitle: 'Entités 100% en code, pas de scènes .tscn par objet',
    archPattern: "Une seule scène réelle (Main.tscn, un nœud vide avec script). Le joueur, les ennemis, les projectiles, les orbes d'XP, le spawner de vagues et l'UI sont tous instanciés au runtime via `MonScript.new()` — cette astuce GDScript crée un objet du type que le script étend (ex: CharacterBody2D), script attaché, sans jamais passer par l'éditeur de scène. Visuels construits en code (Polygon2D, cercles générés) puis, une fois le pack de sprites intégré, par AnimatedSprite2D. Choix délibéré : ça évite d'avoir à faire écrire ou relire des fichiers .tscn à la main par l'assistant IA, une source d'erreurs de syntaxe silencieuses.",
    archStructureTitle: 'Structure de dossiers',
    archStructure: [
      '09_jeu/scenes/ — uniquement Main.tscn',
      '09_jeu/scripts/ — Player, Enemy, WaveManager, UI, Main, Projectile, EnemyProjectile, XPOrb, SpriteSheetLoader, Ground',
      '09_jeu/assets/marcus/ — sprite + JSON du joueur (Marcus)',
      '09_jeu/assets/blood_monster_a/, demon_a/, black_knight_a/ — sprites des 3 ennemis du secteur Religion',
    ],
    archAssetTitle: 'Pipeline sprites (Aseprite → Godot)',
    archAsset: "Statut : Marcus (le joueur) est le premier vrai sprite du roman intégré, au format JSON d'export Aseprite (feuille + tags). Les 3 ennemis restent pour l'instant des packs achetés (Tiny RPG Character Asset Pack), le temps que d'autres sprites soient fournis — ils seront remplacés secteur par secteur au même rythme que Marcus. Deux mécanismes de chargement coexistent dans SpriteSheetLoader.gd selon le format livré : lecture directe d'un JSON Aseprite (cas de Marcus, régions découpées dynamiquement) ou découpage d'une feuille en bandes horizontales de largeur fixe (cas des ennemis, un fichier par animation). Export brut fait en ligne de commande via le binaire Aseprite plutôt qu'à la main dans l'éditeur — voir l'onglet Bugs pour le script Lua nécessaire au cas du calque Background.",
    archVerifTitle: 'Méthode de vérification',
    archVerif: "Pas d'accès à un enregistreur d'écran système dans cet environnement (permissions manquantes). Vérification faite en lançant Godot en mode fenêtré/headless piloté par script, en forçant des états de jeu précis (ex: direction de déplacement figée), et en sauvegardant une image directement depuis la texture du viewport (`get_viewport().get_texture().get_image().save_png()`) — donc un vrai rendu du moteur, pas une capture d'écran système. Complété par des runs headless de plusieurs centaines de frames pour détecter les erreurs de script sans interface.",

    specsTitle: 'Spécifications fonctionnelles',
    specsIntro: "Secteur pilote : Religion (Bélial). Ce qui est jouable aujourd'hui.",
    specsLoopTitle: 'Boucle de run',
    specsLoop: [
      "Durée réduite pour les tests (180 s) — cible finale 600-900 s (10-15 min) une fois le secteur pilote validé",
      'Victoire si le minuteur arrive à zéro, défaite si les points de vie tombent à zéro',
      "Écran de fin avec bouton « Recommencer »",
    ],
    specsControlsTitle: 'Contrôles',
    specsControls: [
      'Déplacement : WASD, flèches directionnelles, ou manette (stick gauche analogique + croix directionnelle en repli)',
      "Combat entièrement automatique — vise l'ennemi le plus proche à portée",
      "Navigation manette (croix + bouton A) sur les écrans de choix de niveau et de fin de run",
      'Échap ou bouton Start (manette) pour quitter',
    ],
    specsEnemiesTitle: 'Ennemis du secteur Religion',
    specsEnemies: [
      'Acolyte (sprite Blood Monster_A) — rapide, peu de vie, dégâts de contact',
      'Inquisiteur (sprite Black Knight_A, chevalier à la lance) — lent, très résistant, gros dégâts de contact',
      "Encensier (sprite Demon_A) — garde ses distances, tire un projectile (« encens toxique ») plutôt que de foncer",
      "Les deux types au corps-à-corps jouent leur pose d'attaque à chaque coup porté, pas seulement en se déplaçant",
    ],
    specsProgressionTitle: 'Vagues et progression',
    specsProgression: [
      "Ennemis apparaissent en cercle autour du joueur, hors champ visuel immédiat",
      'Fréquence et taille des vagues augmentent avec le temps écoulé',
      "Orbes d'XP lâchées à la mort d'un ennemi, attirées automatiquement quand le joueur s'approche",
      "Montée de niveau : pause du jeu, choix d'une amélioration parmi 3 tirées d'un pool de 6 (dégâts, cadence de tir, vitesse de déplacement, portée, tir multiple, vie maximum) — présentées comme des reliques de Veilleurs plutôt que des bonus génériques",
    ],
    specsHudTitle: 'Interface',
    specsHud: [
      'Niveau, minuteur, barre de vie, barre de progression XP en permanence à l’écran',
      "Écran de choix d'amélioration au level-up, jeu mis en pause pendant le choix",
      "Écran de fin (victoire ou défaite) avec bouton pour relancer une partie",
    ],
    specsPlayerTitle: 'Personnage joueur — Marcus',
    specsPlayer: [
      "Le protagoniste du roman (plus un sprite hobbit générique) : idle, course, attaque (fronde), mort",
      "Retourné automatiquement selon le sens du déplacement (gauche/droite), pas de sprites dos/face — convention standard du genre",
      "Légère inclinaison du personnage dans le sens de la course, pour rendre la direction lisible même quand l'animation de marche est discrète",
      "Priorité systématique donnée à l'animation de course sur la pose d'attaque tant que le joueur se déplace",
    ],
    specsLevelTitle: 'Décor de niveau (premier passage)',
    specsLevel: [
      "Tracé de rues inspiré du plan réel de la ville haute de Provins (relevé sur OpenStreetMap) : un réseau qui rayonne depuis le centre-ville plutôt qu'une grille — le centre de la carte est le centre-ville, point d'apparition du joueur",
      "Deux mécanismes distincts : un TileMap peint (sol, rues, jardin) et des objets indépendants posés le long des rues (maisons) ou dispersés (rochers, buissons)",
      "Tuiles et bâtiments encore en placeholders générés en code (formes et couleurs simples) — en attente d'un vrai set de tuiles",
    ],

    bugsTitle: 'Bugs & résolutions',
    bugsIntro: "Journal des problèmes réellement rencontrés pendant cette session de développement, dans l'ordre où ils sont apparus. Pas un historique nettoyé après coup — y compris les fausses pistes.",
    bugs: [
      {
        title: "Fond opaque au lieu de transparent sur le sprite du joueur",
        symptomLabel: 'SYMPTÔME',
        symptom: "Le personnage s'affichait dans un rectangle gris uni avec des lignes pointillées vertes visibles — un calque de repère visuel utilisé par l'artiste pour animer, qui n'aurait jamais dû être exporté.",
        causeLabel: 'CAUSE',
        cause: "Ce calque de repère (« bg fake ») était configuré en calque « Background » natif d'Aseprite — un type de calque toujours opaque par définition, que les options standard d'export en ligne de commande (--layer, --ignore-layer) ne suffisent pas à exclure de la composition finale.",
        fixLabel: 'RÉSOLUTION',
        fix: "Script Lua exécuté via `aseprite -b … --script` qui convertit d'abord ce calque en calque normal (`LayerFromBackground`) puis le supprime avant l'export. Transparence vérifiée pixel par pixel après coup (alpha = 0 sur les zones vides).",
        severity: 'major',
      },
      {
        title: 'Frames mal cadrées, trop de marge morte autour du personnage',
        symptomLabel: 'SYMPTÔME',
        symptom: "Le personnage semblait minuscule et mal centré dans sa zone de collision visuelle une fois affiché en jeu.",
        causeLabel: 'CAUSE',
        cause: "Le premier export utilisait le fichier source « ANIM » du pack, avec un canevas de 144×112 px par frame — beaucoup de marge prévue pour les mouvements d'arme, pas adaptée à un rendu net à la petite échelle du jeu.",
        fixLabel: 'RÉSOLUTION',
        fix: "Bascule vers les 78 PNG individuels déjà recadrés à 64×64 px, fournis séparément dans le pack. Le loader de sprites a été réécrit pour charger un dossier de frames nommées individuellement plutôt qu'une sprite sheet + JSON.",
        severity: 'minor',
      },
      {
        title: 'Effet « moonwalk » pendant le combat en mouvement',
        symptomLabel: 'SYMPTÔME',
        symptom: "En combattant tout en se déplaçant (le cas le plus fréquent), le personnage semblait glisser vers l'arrière au lieu de courir.",
        causeLabel: 'CAUSE',
        cause: "La pose d'attaque (bras armé en arrière pour tirer à la fronde) remplaçait l'animation de course à chaque déclenchement de l'auto-attaque — très fréquent puisque le combat est automatique.",
        fixLabel: 'RÉSOLUTION',
        fix: "L'animation de course garde désormais toujours la priorité tant que le joueur se déplace ; la pose d'attaque ne s'affiche que si le personnage est à l'arrêt.",
        severity: 'minor',
      },
      {
        title: 'Orientation gauche/droite inversée — le vrai bug de fond',
        symptomLabel: 'SYMPTÔME',
        symptom: "Après le correctif sur la pose d'attaque, le problème persistait à l'identique dans les deux sens de déplacement : le personnage semblait « de dos » et glisser en arrière, aussi bien vers la gauche que vers la droite.",
        causeLabel: 'CAUSE',
        cause: "Mauvais repère utilisé pour déterminer l'orientation « naturelle » du sprite : je me fiais à la direction de l'arme (la fronde) pour savoir de quel côté le personnage « regarde ». Or le personnage est dessiné en train de courir en armant sa fronde, qui traîne à l'opposé du sens de course — le visage regarde en réalité le côté inverse de l'arme. Le sens du flip horizontal était donc inversé depuis le début, deux corrections successives basées sur le mauvais critère n'ont rien changé.",
        fixLabel: 'RÉSOLUTION',
        fix: "Ré-identification de l'orientation via le visage (œil, oreille pointue) plutôt que l'arme, en zoomant sur les frames sources. Vérification faite avec deux protections contre l'erreur de lecture : des repères visuels fixes posés au sol pour confirmer le sens réel de défilement de la caméra, et un indicateur texte affichant en direct flip_h et l'angle d'inclinaison, capturé par screenshot programmatique — pour ne plus juger « à l'œil » sur une simple image figée. Correctif appliqué et reconfirmé dans les deux sens avant validation par l'utilisateur.",
        severity: 'major',
      },
      {
        title: "Lisibilité de la direction de course renforcée",
        symptomLabel: 'CONTEXTE',
        symptom: "Même une fois l'orientation corrigée, l'animation de course du pack est assez subtile — combinée à une caméra qui suit le joueur (le personnage reste fixe au centre de l'écran, c'est le décor qui défile), la direction de déplacement restait difficile à lire d'un coup d'œil.",
        causeLabel: 'AMÉLIORATION',
        cause: "Pas un bug à proprement parler, mais un ajustement de lisibilité fait dans la foulée du diagnostic ci-dessus.",
        fixLabel: 'RÉSOLUTION',
        fix: "Légère inclinaison du personnage (~10°) dans le sens du déplacement, interpolée en douceur — rend la direction de course sans ambiguïté même quand l'animation de jambes reste discrète.",
        severity: 'minor',
      },
      {
        title: "Erreurs de compilation GDScript sur le pattern 100% procédural",
        symptomLabel: 'SYMPTÔME',
        symptom: "Erreurs de compilation type « type inferred from Variant » et « function not found » au premier lancement du projet, bloquant l'exécution.",
        causeLabel: 'CAUSE',
        cause: "Le vérificateur de types statique de Godot 4 ne peut pas résoudre les méthodes personnalisées sur un objet créé dynamiquement via `Script.new()` sans class_name — et le registre global des class_name ne s'était pas construit de façon fiable au tout premier lancement du projet (avant toute ouverture dans l'éditeur).",
        fixLabel: 'RÉSOLUTION',
        fix: "Typage explicite `Variant` pour toute variable portant un script personnalisé nécessitant un appel de méthode dynamique, et `const MonScript := preload(\"res://...\")` pour accéder aux enums/constantes d'un script sans dépendre du registre de classes global.",
        severity: 'minor',
      },
      {
        title: "Les animations du joueur disparaissent uniquement dans le build web exporté",
        symptomLabel: 'SYMPTÔME',
        symptom: "« Animation 'idle' doesn't exist » — le personnage ne s'affichait plus du tout une fois le jeu exporté en HTML5 et ouvert dans le navigateur, alors que tout fonctionnait sans erreur en mode développement (édition et tests headless).",
        causeLabel: 'CAUSE',
        cause: "Le chargeur de sprites scannait un dossier de fichiers au runtime via DirAccess.list_dir_begin() pour trouver les frames individuelles. Cette énumération de dossier ne fonctionne pas de façon fiable une fois le projet empaqueté dans un .pck exporté — même avec le filtre d'export réglé pour inclure toutes les ressources —, alors qu'elle marche parfaitement sur le système de fichiers réel en développement. Un bug invisible en local, qui ne se révèle qu'à l'export.",
        fixLabel: 'RÉSOLUTION',
        fix: "Remplacement du scan de dossier par un chargement direct : le nombre de frames par animation est connu à l'avance et codé en dur, chaque frame est chargée par son chemin exact (`load(\"res://...Idle1.png\")`) plutôt que découverte dynamiquement. Un chemin connu se charge toujours correctement dans un .pck, contrairement à une énumération de répertoire. Revérifié après export : plus d'erreur, animations chargées.",
        severity: 'major',
      },
    ],

    journalTitle: 'Journal de session',
    journalIntro: "Chronologie de ce qui a été fait, séance par séance — pour suivre la construction du jeu au fur et à mesure plutôt que de ne voir que le résultat final. Cliquer une entrée pour le détail.",
    journalWhatLabel: 'CE QUI A ÉTÉ FAIT',
    journalDecisionLabel: 'DÉCISION',
    journal: [
      {
        date: '27/08/2026',
        title: 'Choix du genre et du twist',
        summary: "Recherche de marché sur les genres solo rentables, puis choix du twist central du gameplay.",
        what: "Comparaison de plusieurs genres solo/IA-friendly (survivor-like, roguelike deckbuilder) sur des données réelles de succès solo (Brotato, Balatro, Halls of Torment). Le survivor-like retenu pour sa vitesse de prototypage. Trois pistes de twist proposées puis réduites à une seule par discipline de scope.",
        decision: "Vagues thématisées par secteur Occasus (un secteur = un domaine du monde infiltré par un démon) plutôt qu'une combinaison de plusieurs mécaniques — le twist le plus simple à exécuter et le plus fidèle au thème du roman.",
      },
      {
        date: '27/08/2026',
        title: 'V0 — secteur pilote jouable',
        summary: 'Architecture Godot 100% code, boucle de jeu complète sur le secteur Religion.',
        what: "Godot 4 + GDScript choisi comme moteur. Toutes les entités (joueur, ennemis, projectiles, orbes d'XP, vagues, interface) construites en code plutôt qu'en scènes éditées à la main — pour rester rapide à faire évoluer avec l'assistant IA. Secteur Religion (Bélial) choisi comme pilote car le mieux documenté dans le lore.",
        decision: "Pas de fichiers .tscn par entité : tout instancié dynamiquement via `Script.new()`. Ce choix a permis d'itérer vite mais a aussi causé le bug d'export le plus sérieux de la session (voir onglet Bugs) — un compromis assumé.",
      },
      {
        date: '27/08/2026',
        title: 'Premier sprite joueur + bugs de transparence',
        summary: "Intégration d'un personnage acheté pour valider le pipeline sprite, deux bugs de rendu résolus.",
        what: "Un personnage acheté animé (idle/course/attaque/mort) intégré comme joueur pour voir un vrai rendu plutôt que des formes géométriques. Deux problèmes trouvés et corrigés : un calque de repère exporté par erreur (fond opaque au lieu de transparent), puis un cadrage trop large des frames.",
        decision: "Script Lua pour nettoyer l'export Aseprite avant intégration, plutôt que de retoucher les images à la main à chaque fois — réutilisable pour tous les futurs sprites.",
      },
      {
        date: '27/08/2026',
        title: "Le vrai bug d'orientation",
        summary: "Trois tentatives avant de trouver la vraie cause d'un personnage qui semblait glisser en arrière.",
        what: "Effet « moonwalk » corrigé une première fois (pose d'attaque prioritaire sur la course), le symptôme persistait. Deuxième diagnostic basé sur la direction de l'arme du personnage — toujours faux. Troisième diagnostic en se fiant au visage plutôt qu'à l'arme, avec vérification par repères visuels fixes et capture d'écran programmatique plutôt qu'un jugement à l'œil sur une image figée.",
        decision: "Ne plus se fier à un seul indice visuel pour un diagnostic d'orientation — croiser plusieurs vérifications avant de conclure. Ajout d'une légère inclinaison du personnage dans le sens de la course pour renforcer la lisibilité, indépendamment du bug.",
      },
      {
        date: '27/08/2026',
        title: 'Premiers ennemis et publication V0.1',
        summary: "Manette ajoutée, export web réalisé, première publication sur ce site.",
        what: "Support manette complet (stick analogique + croix, navigation des menus). Premier export HTML5/WebAssembly du secteur pilote, révélant un bug invisible en développement : le chargement de sprites par scan de dossier ne fonctionne pas dans un build empaqueté. Corrigé, puis publication comme démo jouable sur ce site (V0.1).",
        decision: "Chargement des sprites par chemin de fichier connu plutôt que par scan de dossier — plus robuste, fonctionne aussi bien en développement qu'à l'export, retenu comme pattern par défaut pour la suite.",
        demoTo: '/lab/lost-cauldron-game/demo',
        demoLabel: 'Voir la démo V0.1 →',
      },
      {
        date: '28/08/2026',
        title: 'Les 3 ennemis du secteur Religion animés',
        summary: "Cercles de couleur remplacés par de vrais sprites de monstres pour les 3 types d'ennemis.",
        what: "Acolyte, Encensier et Inquisiteur reçoivent chacun un sprite animé (Blood Monster_A, Demon_A, puis Black Knight_A pour l'Inquisiteur — un chevalier à la lance, plutôt approprié pour ce rôle). Échelle ajustée après un premier retour (« trop petits »). Pose d'attaque ajoutée au corps-à-corps, déclenchée à chaque coup porté plutôt qu'en continu.",
        decision: "Garder le cercle de couleur en attendant pour tout type d'ennemi sans sprite disponible plutôt que d'attendre d'avoir les trois avant d'avancer — le jeu reste jouable et testable à chaque étape.",
      },
      {
        date: '28/08/2026',
        title: 'Marcus remplace le personnage placeholder',
        summary: "Le vrai protagoniste du roman intègre le jeu, plus fidèle au pipeline déjà construit.",
        what: "Sprite de Marcus (même structure d'animation que le personnage acheté : idle, course, attaque, mort) intégré à la place du placeholder. Orientation revérifiée avec la même méthode que le bug précédent — correcte dès la première tentative cette fois. Mise à jour ultérieure des couleurs de l'animation de course suite à une itération graphique.",
        decision: "Conserver exactement la même structure de tags d'animation que le personnage précédent, pour que le changement de sprite ne demande aucune modification de logique de jeu — seulement un nouveau fichier.",
      },
      {
        date: '28/08/2026',
        title: 'Premier décor de niveau',
        summary: "D'un pack de tuiles écarté pour incohérence de ton à un tracé de rues basé sur le vrai plan de Provins.",
        what: "Un pack de tuiles/décor exploré puis écarté (palette trop lumineuse, hors ton du secteur). Système TileMap générique construit en placeholder pour expliquer le mécanisme. Puis, sur demande, tracé de rues réel de la ville haute de Provins consulté sur OpenStreetMap et transposé en code : réseau de rues qui rayonne depuis le centre-ville plutôt qu'une grille, maisons et jardin placés en conséquence.",
        decision: "Le centre de la carte de jeu correspond au centre-ville réel de Provins — le joueur apparaît littéralement au centre du réseau de rues, pas à un point arbitraire.",
      },
      {
        date: '29/08/2026',
        title: 'Export V0.2 et mise à jour du site',
        summary: "Nouvelle version jouable publiée, documentation du projet mise à jour en conséquence.",
        what: "Export web de l'état courant (Marcus, 3 ennemis animés, manette, décor de Provins) publié comme deuxième démo jouable, sans écraser la V0.1. Onglets Architecture, Spécifications, Bugs et Roadmap de cette page mis à jour pour refléter ce qui a réellement changé.",
        decision: "Garder les deux démos en ligne plutôt que remplacer la V0.1 — permet de comparer visuellement la progression plutôt que de ne voir que le dernier état.",
        demoTo: '/lab/lost-cauldron-game/demo/v2',
        demoLabel: 'Voir la démo V0.2 →',
      },
    ],

    roadmapTitle: 'Roadmap',
    roadmapIntro: "Pas d'engagement de date — l'étape suivante n'est pas encore tranchée, discipline de scope oblige (le facteur n°1 d'échec des jeux solo indie).",
    roadmap: [
      {
        version: 'V0.1 — secteur pilote jouable',
        statusLabel: 'FAIT',
        statusColor: 'var(--primary)',
        items: [
          "Boucle complète jouable : déplacement, vagues, level-up, mort/victoire",
          "Secteur Religion (Bélial) : 3 archétypes d'ennemis",
          'Personnage joueur (sprite hobbit générique) animé et correctement orienté',
          'Plein écran',
          'Export HTML5/WebAssembly et publication comme démo jouable sur ce site',
        ],
      },
      {
        version: 'V0.2 — Marcus, ennemis animés, manette',
        statusLabel: 'FAIT',
        statusColor: 'var(--primary)',
        items: [
          "Marcus (le protagoniste du roman) remplace le sprite hobbit générique",
          "Les 3 ennemis du secteur Religion ont chacun leur sprite animé (plus de cercles de couleur)",
          "Pose d'attaque au corps-à-corps déclenchée à chaque coup porté, pas seulement en déplacement",
          "Support manette complet (déplacement + navigation des menus)",
          "Premier décor de niveau : tracé de rues inspiré de la ville haute de Provins, maisons et jardin en placeholders",
        ],
      },
      {
        version: 'Prochaine étape',
        statusLabel: 'À TRANCHER',
        statusColor: 'var(--warning)',
        items: [
          "Option A — boss de fin de run (Vautrin) : donne un vrai climax à la victoire, actuellement juste un minuteur qui tombe à zéro",
          "Option B — deuxième secteur (ex: Finance/Mammon) : prouve que le twist « un secteur = une identité » tient sur plusieurs déclinaisons",
          "Option C — hub meta-progression (le pub The Lost Cauldron, déjà modélisé en 3D) : entre les runs, avant d'avoir plusieurs secteurs à débloquer",
          "Option D — vrai set de tuiles/décor (en attente que l'auteur en trouve un sur itch.io) pour remplacer les placeholders du décor de niveau",
        ],
      },
      {
        version: 'Envisagé',
        statusLabel: 'HYPOTHÈSE',
        statusColor: 'var(--muted)',
        items: [
          "Dessin des sprites par l'auteur lui-même (plaisir personnel assumé) une fois le pipeline Aseprite → Godot validé sur des packs achetés",
          "Extension aux 8 autres secteurs Occasus du lore (médias, politique, agro-industrie, éducation, armée…) une fois le twist prouvé sur 2 secteurs",
        ],
      },
    ],
  },
  en: {
    title: 'The Lost Cauldron — The Game',
    role: 'Game Designer & Developer — solo project (AI-assisted)',
    period: 'August 2026',
    tools: ['Godot 4.6 (GDScript)', 'Aseprite (sprite pipeline)', 'Claude Code'],
    fileNo: 'FILE Nº 002',
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    stampLabel: 'MISRAN · LABS · ARCHIVE ·',
    periodLabel: 'PERIOD',
    toolsLabel: 'TOOLS',
    docId: 'DOCUMENT ID — ML-ARCHIVE-002',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Technical architecture' },
      { id: 'specs', label: 'Functional specifications' },
      { id: 'bugs', label: 'Bugs & fixes' },
      { id: 'journal', label: 'Session log' },
      { id: 'roadmap', label: 'Roadmap' },
    ],

    contextTitle: 'Context',
    demoV1Label: 'See demo V0.1 →',
    demoV2Label: 'See demo V0.2 →',
    context: "The Lost Cauldron started as a fantasy novel I'm writing (demons quietly infiltrating the upper tiers of society — finance, religion, media, justice — under the cover of a foundation, Occasus). I'm turning it into a game: a survivor-like (Vampire Survivors-style), the fastest genre to ship solo with AI assistance, but also the most saturated with clones. The goal isn't a multi-year project: a game that's fast to build and profitable, reusing a universe I've already written instead of starting from a blank page.",

    methodTitle: 'Method',
    methodIntro: 'Same framework as the rest of the Lab — the 5 steps of the scientific approach.',
    coverageLabel: 'METHOD COVERAGE',
    steps: [
      {
        title: 'Observation and the Problem',
        status: 'done',
        body: "The survivor-like genre is saturated (a wave of clones since 2022, still active in 2025-2026), but remains the fastest to prototype solo. Precise question: can it be differentiated without blowing up dev time, by leaning on an already-written universe instead of a complex new mechanic?",
      },
      {
        title: 'The Hypothesis',
        status: 'done',
        body: "A simple thematic twist — each run/wave maps to a sector of society infiltrated by a demon (finance, religion, media…), with enemies styled as human archetypes instead of generic monsters — is enough to differentiate the game without adding mechanical complexity. Falsifiable: if a complete pilot sector (movement, waves, level-up, death/victory) is playable within a few sessions without scope creep, the hypothesis holds.",
      },
      {
        title: 'Experimentation',
        status: 'done',
        body: "Pilot sector chosen: Religion (the demon Bélial), the best-documented one in the existing lore (Vautrin, the infiltrated Church). Godot 4 + GDScript, one sector built entirely in procedural code to move fast. First sprite plugged in as the player: a purchased character (while the pipeline was being validated), since replaced by Marcus's real sprite.",
      },
      {
        title: 'Analyzing the Results',
        status: 'partial',
        body: "Full game loop validated (movement, enemy waves, XP, level-up, death/victory) via automated headless tests. Several rendering and character-orientation bugs found and fixed along the way — detail in the Bugs tab. The “one sector = one identity” twist is only validated on a single sector; not yet proven to hold across several.",
      },
      {
        title: 'Conclusion and Iteration',
        status: 'skipped',
        branches: [
          { label: 'If the pilot sector stays fun and readable in real play: ', text: "add either an end-of-run boss, a second sector to prove the twist scales, or the meta-progression hub (the pub) — not yet decided." },
          { label: 'If scope starts creeping: ', text: 'go back to the single sector and polish it before extending anything.' },
        ],
      },
    ],

    archTitle: 'Technical architecture',
    archIntro: "Choices made for fast solo iteration with an AI assistant, not for a “clean” architecture in the classic sense.",
    archEngineTitle: 'Engine and rendering',
    archEngine: [
      'Godot 4.6.3, GDScript',
      'gl_compatibility rendering (broad compatibility over Forward+) to limit cross-machine surprises',
      'Fullscreen with canvas_items stretch mode + aspect kept (1280×720 logical canvas)',
      'Escape to quit — necessary in fullscreen, no window chrome',
    ],
    archPatternTitle: 'Entities are 100% code, no .tscn scene per object',
    archPattern: "Only one real scene (Main.tscn, an empty node with a script). The player, enemies, projectiles, XP orbs, wave spawner, and UI are all instantiated at runtime via `MyScript.new()` — this GDScript trick creates an object of the type the script extends (e.g. CharacterBody2D) with the script attached, never touching the scene editor. Visuals built in code (Polygon2D, generated circles) then, once the sprite pack was wired in, via AnimatedSprite2D. Deliberate choice: it avoids having the AI assistant write or review hand-authored .tscn files, a source of silent syntax errors.",
    archStructureTitle: 'Folder structure',
    archStructure: [
      '09_jeu/scenes/ — only Main.tscn',
      '09_jeu/scripts/ — Player, Enemy, WaveManager, UI, Main, Projectile, EnemyProjectile, XPOrb, SpriteSheetLoader, Ground',
      '09_jeu/assets/marcus/ — player (Marcus) sprite + JSON',
      '09_jeu/assets/blood_monster_a/, demon_a/, black_knight_a/ — the 3 Religion sector enemy sprites',
    ],
    archAssetTitle: 'Sprite pipeline (Aseprite → Godot)',
    archAsset: "Status: Marcus (the player) is the first real novel sprite plugged in, using Aseprite's JSON export format (sheet + tags). The 3 enemies are still purchased packs (Tiny RPG Character Asset Pack) for now, until more custom sprites are supplied — they'll be swapped sector by sector at the same pace as Marcus. Two loading mechanisms coexist in SpriteSheetLoader.gd depending on the delivered format: direct JSON parsing (Marcus's case, regions sliced dynamically) or slicing a sheet into fixed-width horizontal strips (the enemies' case, one file per animation). Raw export done from the command line via the Aseprite binary rather than by hand in the editor — see the Bugs tab for the Lua script needed for the Background-layer case.",
    archVerifTitle: 'Verification method',
    archVerif: "No access to a system screen recorder in this environment (missing permissions). Verification done by launching Godot in windowed/headless mode driven by script, forcing specific game states (e.g. a fixed movement direction), and saving an image straight from the viewport's texture (`get_viewport().get_texture().get_image().save_png()`) — a real engine render, not a system screenshot. Complemented by headless runs of several hundred frames to catch script errors with no UI at all.",

    specsTitle: 'Functional specifications',
    specsIntro: "Pilot sector: Religion (Bélial). What's playable today.",
    specsLoopTitle: 'Run loop',
    specsLoop: [
      'Duration shortened for testing (180s) — final target 600-900s (10-15 min) once the pilot sector is validated',
      'Victory once the timer hits zero, defeat once HP hits zero',
      "End screen with a “Restart” button",
    ],
    specsControlsTitle: 'Controls',
    specsControls: [
      'Movement: WASD, arrow keys, or gamepad (analog left stick + D-pad fallback)',
      'Combat is fully automatic — targets the nearest enemy in range',
      'Gamepad navigation (D-pad + A button) on the level-up and end-of-run screens',
      'Escape or gamepad Start to quit',
    ],
    specsEnemiesTitle: 'Religion sector enemies',
    specsEnemies: [
      'Acolyte (Blood Monster_A sprite) — fast, low HP, melee contact damage',
      'Inquisitor (Black Knight_A sprite, spear-wielding knight) — slow, very tanky, heavy melee damage',
      'Censer-bearer (Demon_A sprite) — keeps its distance, fires a projectile (“toxic incense”) instead of charging in',
      'Both melee types now play their attack pose on every hit landed, not just while moving',
    ],
    specsProgressionTitle: 'Waves and progression',
    specsProgression: [
      'Enemies spawn in a ring around the player, just outside immediate view',
      'Wave frequency and size increase with elapsed time',
      "XP orbs drop on enemy death, auto-attracted once the player gets close",
      "Level-up: game pauses, choice of one upgrade out of 3 drawn from a pool of 6 (damage, attack speed, move speed, range, multishot, max HP) — framed as Veilleur relics rather than generic bonuses",
    ],
    specsHudTitle: 'Interface',
    specsHud: [
      'Level, timer, HP bar, and XP progress bar always on screen',
      'Upgrade-choice screen on level-up, game paused during the choice',
      'End screen (victory or defeat) with a button to start a new run',
    ],
    specsPlayerTitle: 'Player character — Marcus',
    specsPlayer: [
      "The novel's protagonist (no longer a generic hobbit sprite): idle, run, attack (sling), death",
      "Auto-flipped based on movement direction (left/right), no back/front sprites — standard genre convention",
      'Slight lean in the direction of travel, to keep direction readable even when the walk animation itself is subtle',
      'Run animation always takes priority over the attack pose while the player is moving',
    ],
    specsLevelTitle: 'Level decor (first pass)',
    specsLevel: [
      "Street layout inspired by the real street plan of Provins' upper town (pulled from OpenStreetMap): a network radiating from the town center rather than a grid — the map center is the town center, where the player spawns",
      'Two distinct mechanisms: a painted TileMap (ground, streets, park) plus independent objects placed along streets (houses) or scattered (rocks, bushes)',
      'Tiles and buildings are still code-generated placeholders (simple shapes and colors) — waiting on a real tileset',
    ],

    bugsTitle: 'Bugs & fixes',
    bugsIntro: "Log of problems actually hit during this dev session, in the order they showed up. Not a cleaned-up after-the-fact history — dead ends included.",
    bugs: [
      {
        title: 'Opaque background instead of transparent on the player sprite',
        symptomLabel: 'SYMPTOM',
        symptom: "The character rendered inside a flat grey rectangle with visible green dashed lines — an artist reference layer that should never have been exported.",
        causeLabel: 'CAUSE',
        cause: "That reference layer (“bg fake”) was configured as Aseprite's native “Background” layer type — always opaque by definition, which standard command-line export flags (--layer, --ignore-layer) don't fully exclude from the final composite.",
        fixLabel: 'FIX',
        fix: "A Lua script run via `aseprite -b … --script` that first converts that layer to a regular layer (`LayerFromBackground`) then deletes it before exporting. Transparency verified pixel by pixel afterward (alpha = 0 in empty areas).",
        severity: 'major',
      },
      {
        title: 'Badly cropped frames, too much dead space around the character',
        symptomLabel: 'SYMPTOM',
        symptom: 'The character looked tiny and off-center within its visual hitbox once rendered in-game.',
        causeLabel: 'CAUSE',
        cause: "The first export used the pack's “ANIM” source file, with a 144×112px canvas per frame — plenty of margin for weapon-swing animations, not suited to crisp rendering at the game's small on-screen scale.",
        fixLabel: 'FIX',
        fix: "Switched to the 78 individual PNGs already cropped to 64×64px, shipped separately in the pack. The sprite loader was rewritten to load a folder of individually-named frames instead of a sprite sheet + JSON.",
        severity: 'minor',
      },
      {
        title: "“Moonwalk” effect while fighting on the move",
        symptomLabel: 'SYMPTOM',
        symptom: 'While fighting and moving at the same time (the most common case), the character appeared to slide backward instead of running.',
        causeLabel: 'CAUSE',
        cause: "The attack pose (arm cocked back to sling) replaced the run animation every time auto-attack fired — very often, since combat is fully automatic.",
        fixLabel: 'FIX',
        fix: 'The run animation now always takes priority while the player is moving; the attack pose only shows when the character is standing still.',
        severity: 'minor',
      },
      {
        title: 'Left/right orientation reversed — the real underlying bug',
        symptomLabel: 'SYMPTOM',
        symptom: "After the attack-pose fix, the exact same complaint persisted in both movement directions: the character looked “turned away” and slid backward, moving left just as much as moving right.",
        causeLabel: 'CAUSE',
        cause: "Wrong visual cue used to determine the sprite's “natural” facing: I was reading the weapon's (the sling's) direction to infer which way the character “faces.” But the character is drawn mid-run while winding up the sling, which trails opposite the running direction — the face actually points the opposite way from the weapon. The horizontal flip was inverted from the very start; two prior fixes based on the wrong cue changed nothing.",
        fixLabel: 'FIX',
        fix: "Re-identified orientation using the face (eye, pointed ear) instead of the weapon, by zooming into the source frames. Verified with two safeguards against misreading it again: fixed visual markers placed on the ground to confirm the camera's real scroll direction, and an on-screen text readout of flip_h and the lean angle, captured via a programmatic screenshot — no more judging by eye off a single still frame. Fix applied and reconfirmed in both directions before the user validated it.",
        severity: 'major',
      },
      {
        title: 'Run-direction readability reinforced',
        symptomLabel: 'CONTEXT',
        symptom: "Even once orientation was fixed, the pack's run animation is fairly subtle — combined with a camera that follows the player (the character stays fixed at screen center, the world scrolls instead), travel direction stayed hard to read at a glance.",
        causeLabel: 'IMPROVEMENT',
        cause: 'Not strictly a bug, but a readability tweak made right alongside the diagnosis above.',
        fixLabel: 'FIX',
        fix: 'A slight lean (~10°) in the direction of travel, smoothly interpolated — makes the run direction unambiguous even when the leg animation itself stays subtle.',
        severity: 'minor',
      },
      {
        title: 'GDScript compile errors from the fully-procedural pattern',
        symptomLabel: 'SYMPTOM',
        symptom: 'Compile errors like “type inferred from Variant” and “function not found” on the project’s very first run, blocking execution entirely.',
        causeLabel: 'CAUSE',
        cause: "Godot 4's static type checker can't resolve custom methods on an object created dynamically via `Script.new()` without a class_name — and the global class_name registry hadn't reliably built yet on the project's very first launch (before ever opening it in the editor).",
        fixLabel: 'FIX',
        fix: 'Explicit `Variant` typing for any variable holding a custom script that needs dynamic method calls, and `const MyScript := preload("res://...")` to reach a script’s enums/constants without depending on the global class registry.',
        severity: 'minor',
      },
      {
        title: 'Player animations disappear only in the exported web build',
        symptomLabel: 'SYMPTOM',
        symptom: "“Animation 'idle' doesn't exist” — the character stopped rendering entirely once the game was exported to HTML5 and opened in a browser, while everything worked without error in development mode (editor and headless tests).",
        causeLabel: 'CAUSE',
        cause: "The sprite loader scanned a folder of files at runtime via DirAccess.list_dir_begin() to find individual frames. That folder enumeration doesn't work reliably once the project is packed into an exported .pck — even with the export filter set to include all resources — while it works perfectly on the real filesystem in development. A bug invisible locally that only shows up on export.",
        fixLabel: 'FIX',
        fix: 'Replaced the folder scan with direct loading: the frame count per animation is known ahead of time and hardcoded, each frame is loaded by its exact path (`load("res://...Idle1.png")`) instead of being discovered dynamically. A known path always loads correctly inside a .pck, unlike a directory listing. Re-verified after export: no more error, animations load correctly.',
        severity: 'major',
      },
    ],

    journalTitle: 'Session log',
    journalIntro: 'Chronology of what got done, session by session — so the build can be followed as it happens rather than only seeing the final result. Click an entry for detail.',
    journalWhatLabel: 'WHAT GOT DONE',
    journalDecisionLabel: 'DECISION',
    journal: [
      {
        date: '08/27/2026',
        title: 'Genre and twist chosen',
        summary: 'Market research on profitable solo genres, then the core gameplay twist.',
        what: 'Compared several solo/AI-friendly genres (survivor-like, roguelike deckbuilder) against real solo-success data (Brotato, Balatro, Halls of Torment). Survivor-like chosen for prototyping speed. Three twist directions proposed, narrowed to one for scope discipline.',
        decision: 'Waves themed around Occasus sectors (one sector = one domain of the world infiltrated by a demon) rather than combining several mechanics — the simplest twist to execute and the most faithful to the novel’s theme.',
      },
      {
        date: '08/27/2026',
        title: 'V0 — playable pilot sector',
        summary: 'Fully code-driven Godot architecture, complete game loop on the Religion sector.',
        what: "Godot 4 + GDScript chosen as the engine. Every entity (player, enemies, projectiles, XP orbs, waves, UI) built in code rather than hand-edited scenes — to stay fast to iterate with the AI assistant. Religion sector (Bélial) chosen as the pilot as the best-documented one in the lore.",
        decision: "No .tscn file per entity: everything instantiated dynamically via `Script.new()`. This kept iteration fast but also caused the most serious export bug of the session (see Bugs tab) — a deliberate trade-off.",
      },
      {
        date: '08/27/2026',
        title: 'First player sprite + transparency bugs',
        summary: 'A purchased character plugged in to validate the sprite pipeline, two rendering bugs fixed.',
        what: 'A purchased animated character (idle/run/attack/death) plugged in as the player to see real rendering instead of geometric shapes. Two problems found and fixed: a reference layer mistakenly exported (opaque background instead of transparent), then frames cropped too loosely.',
        decision: 'A Lua script to clean the Aseprite export before integration, instead of manually retouching images every time — reusable for every future sprite.',
      },
      {
        date: '08/27/2026',
        title: 'The real orientation bug',
        summary: 'Three attempts before finding the actual cause of a character that looked like it was sliding backward.',
        what: "The “moonwalk” effect fixed once (attack pose taking priority over running), but the symptom persisted. Second diagnosis based on the character's weapon direction — still wrong. Third diagnosis based on the face instead of the weapon, verified with fixed visual markers and a programmatic screenshot instead of judging a single still frame by eye.",
        decision: "Never trust a single visual cue for an orientation diagnosis — cross-check before concluding. Added a slight lean in the running direction to reinforce readability, independent of the bug itself.",
      },
      {
        date: '08/27/2026',
        title: 'First enemies and V0.1 published',
        summary: 'Gamepad support added, web export achieved, first publish on this site.',
        what: 'Full gamepad support (analog stick + D-pad, menu navigation). First HTML5/WebAssembly export of the pilot sector, which surfaced a bug invisible in development: loading sprites via folder scan doesn’t work inside a packed build. Fixed, then published as a playable demo on this site (V0.1).',
        decision: 'Load sprites by known file path rather than folder scan — more robust, works the same in development and in export, kept as the default pattern going forward.',
        demoTo: '/lab/lost-cauldron-game/demo',
        demoLabel: 'See demo V0.1 →',
      },
      {
        date: '08/28/2026',
        title: 'All 3 Religion sector enemies animated',
        summary: 'Colored circles replaced with real monster sprites for all three enemy types.',
        what: 'Acolyte, Censer-bearer, and Inquisitor each get an animated sprite (Blood Monster_A, Demon_A, then Black Knight_A for the Inquisitor — a spear-wielding knight, fitting for that role). Scale adjusted after early feedback (“too small”). Attack pose added for melee enemies, triggered on every hit rather than continuously.',
        decision: 'Keep the colored circle as a fallback for any enemy type without a sprite yet, rather than waiting to have all three — the game stays playable and testable at every step.',
      },
      {
        date: '08/28/2026',
        title: 'Marcus replaces the placeholder character',
        summary: "The novel's real protagonist joins the game, matching the pipeline already built.",
        what: 'Marcus sprite (same animation structure as the purchased character: idle, run, attack, death) plugged in to replace the placeholder. Orientation re-verified with the same method as the earlier bug — correct on the first try this time. Later update to the run-animation colors following an art iteration.',
        decision: 'Keep the exact same animation tag structure as the previous character, so swapping sprites needs zero game-logic changes — just a new file.',
      },
      {
        date: '08/28/2026',
        title: 'First level decor pass',
        summary: 'From a discarded tileset pack to a street layout based on the real map of Provins.',
        what: "A tileset/decor pack explored then discarded (palette too bright, off-tone for the sector). A generic TileMap system built as a placeholder to explain the mechanism. Then, on request, the real street layout of Provins' upper town pulled from OpenStreetMap and translated into code: a street network radiating from the town center rather than a grid, houses and a park placed accordingly.",
        decision: "The game map's center matches Provins' real town center — the player spawns literally at the center of the street network, not an arbitrary point.",
      },
      {
        date: '08/29/2026',
        title: 'V0.2 export and site update',
        summary: 'New playable version published, project documentation updated to match.',
        what: 'Web export of the current state (Marcus, 3 animated enemies, gamepad, Provins decor) published as a second playable demo, without overwriting V0.1. This page’s Architecture, Specs, Bugs, and Roadmap tabs updated to reflect what actually changed.',
        decision: 'Keep both demos live rather than replace V0.1 — lets readers visually compare progress instead of only seeing the latest state.',
        demoTo: '/lab/lost-cauldron-game/demo/v2',
        demoLabel: 'See demo V0.2 →',
      },
    ],

    roadmapTitle: 'Roadmap',
    roadmapIntro: "No date commitments — the next step isn't decided yet, scope discipline being the #1 failure factor for solo indie games.",
    roadmap: [
      {
        version: 'V0.1 — playable pilot sector',
        statusLabel: 'DONE',
        statusColor: 'var(--primary)',
        items: [
          'Full playable loop: movement, waves, level-up, death/victory',
          'Religion sector (Bélial): 3 enemy archetypes',
          'Player character (generic hobbit sprite) animated and correctly oriented',
          'Fullscreen',
          'HTML5/WebAssembly export, published as a playable demo on this site',
        ],
      },
      {
        version: 'V0.2 — Marcus, animated enemies, gamepad',
        statusLabel: 'DONE',
        statusColor: 'var(--primary)',
        items: [
          "Marcus (the novel's protagonist) replaces the generic hobbit sprite",
          'All 3 Religion sector enemies now have their own animated sprite (no more colored circles)',
          'Melee attack pose now triggers on every hit landed, not just while moving',
          'Full gamepad support (movement + menu navigation)',
          "First level-decor pass: street layout inspired by Provins' upper town, placeholder houses and park",
        ],
      },
      {
        version: 'Next step',
        statusLabel: 'UNDECIDED',
        statusColor: 'var(--warning)',
        items: [
          "Option A — end-of-run boss (Vautrin): gives victory a real climax, currently just a timer hitting zero",
          "Option B — a second sector (e.g. Finance/Mammon): proves the “one sector = one identity” twist holds across variations",
          "Option C — meta-progression hub (The Lost Cauldron pub, already modeled in 3D): between runs, before there are several sectors to unlock",
          'Option D — a real tileset/decor pack (waiting on the author to find one on itch.io) to replace the level-decor placeholders',
        ],
      },
      {
        version: 'Considered',
        statusLabel: 'HYPOTHESIS',
        statusColor: 'var(--muted)',
        items: [
          'Sprites hand-drawn by the author himself (an explicit personal pleasure) once the Aseprite → Godot pipeline is validated on purchased packs',
          'Extend to the 8 other Occasus sectors from the lore (media, politics, agribusiness, education, military…) once the twist is proven on 2 sectors',
        ],
      },
    ],
  },
}

export default function TheLostCauldronGame({ project }) {
  const { lang } = useLanguage()
  const c = CONTENT[lang] ?? CONTENT.fr
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div style={{ padding: isMobile ? 20 : 40, fontFamily: "var(--font-body)", color: 'var(--text)', maxWidth: 880, margin: '0 auto' }}>
      <CaseMasthead c={c} lang={lang} />
      <CaseHero project={project} c={c}>
        <CaseMetaRow columns={[
          { label: c.periodLabel, value: c.period, grow: false },
          { label: c.toolsLabel, chips: c.tools },
        ]} />
      </CaseHero>
      <CaseTabs tabs={c.tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <>
          <Section title={c.contextTitle}>
            <p style={{ marginBottom: 16 }}>{c.context}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <LinkButton to="/lab/lost-cauldron-game/demo/v2" trailing="→">
                {c.demoV2Label}
              </LinkButton>
              <LinkButton to="/lab/lost-cauldron-game/demo" variant="ghost" trailing="→">
                {c.demoV1Label}
              </LinkButton>
            </div>
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
            <p style={{ marginBottom: 8 }}>{c.archIntro}</p>
          </Section>

          <Section title={c.archEngineTitle}>
            <StatusList title="" items={c.archEngine} color="var(--primary)" />
          </Section>

          <Section title={c.archPatternTitle}>
            <p>{c.archPattern}</p>
          </Section>

          <Section title={c.archStructureTitle}>
            <StatusList title="" items={c.archStructure} color="var(--primary)" />
          </Section>

          <Section title={c.archAssetTitle}>
            <p>{c.archAsset}</p>
          </Section>

          <Section title={c.archVerifTitle}>
            <p>{c.archVerif}</p>
          </Section>
        </>
      )}

      {activeTab === 'specs' && (
        <>
          <Section title={c.specsTitle}>
            <p style={{ marginBottom: 8 }}>{c.specsIntro}</p>
          </Section>

          <Section title={c.specsLoopTitle}>
            <StatusList title="" items={c.specsLoop} color="var(--primary)" />
          </Section>

          <Section title={c.specsControlsTitle}>
            <StatusList title="" items={c.specsControls} color="var(--primary)" />
          </Section>

          <Section title={c.specsEnemiesTitle}>
            <StatusList title="" items={c.specsEnemies} color="var(--primary)" />
          </Section>

          <Section title={c.specsProgressionTitle}>
            <StatusList title="" items={c.specsProgression} color="var(--primary)" />
          </Section>

          <Section title={c.specsHudTitle}>
            <StatusList title="" items={c.specsHud} color="var(--primary)" />
          </Section>

          <Section title={c.specsPlayerTitle}>
            <StatusList title="" items={c.specsPlayer} color="var(--primary)" />
          </Section>

          <Section title={c.specsLevelTitle}>
            <StatusList title="" items={c.specsLevel} color="var(--primary)" />
          </Section>
        </>
      )}

      {activeTab === 'bugs' && (
        <>
          <Section title={c.bugsTitle}>
            <p style={{ marginBottom: 20 }}>{c.bugsIntro}</p>
          </Section>
          {c.bugs.map((bug, i) => (
            <BugCard key={i} {...bug} />
          ))}
        </>
      )}

      {activeTab === 'journal' && (
        <>
          <Section title={c.journalTitle}>
            <p style={{ marginBottom: 20 }}>{c.journalIntro}</p>
          </Section>
          {c.journal.map((entry, i) => (
            <SessionCard
              key={i}
              {...entry}
              whatLabel={c.journalWhatLabel}
              decisionLabel={c.journalDecisionLabel}
            />
          ))}
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

      <CaseFooter c={c} />
    </div>
  )
}
