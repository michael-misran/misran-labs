import { useState } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyLayout, { Section } from '../CaseStudyLayout'
import SectionTitle from '../../design-system/SectionTitle'
import { STATUS, METHOD_STEP_COLORS } from '../phases'
import { useLanguage } from '../../shell/LanguageContext'
import { useSecondarySidebar } from '../../shell/SecondarySidebarContext'
import useIsMobile from '../../shell/useIsMobile'
import { t } from '../../i18n/ui'

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

function BugCard({ title, symptomLabel, symptom, causeLabel, cause, fixLabel, fix, severity }) {
  const color = severity === 'major' ? 'var(--warning)' : 'var(--primary)'
  return (
    <div
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 12,
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

const CONTENT = {
  fr: {
    title: 'The Lost Cauldron — Le Jeu',
    role: 'Game Designer & Développeur — seul sur le projet (assisté par IA)',
    period: 'Août 2026',
    tools: ['Godot 4.6 (GDScript)', 'Aseprite (pipeline sprites)', 'Claude Code'],
    tabs: [
      { id: 'overview', label: 'Vue d’ensemble' },
      { id: 'architecture', label: 'Architecture technique' },
      { id: 'specs', label: 'Spécifications fonctionnelles' },
      { id: 'bugs', label: 'Bugs & résolutions' },
      { id: 'roadmap', label: 'Roadmap' },
    ],

    contextTitle: 'Contexte',
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
        body: "Secteur pilote choisi : Religion (le démon Bélial), le plus documenté dans le lore existant (Vautrin, l'Église infiltrée). Godot 4 + GDScript, un seul secteur construit intégralement en code procédural pour aller vite, sprites d'un pack acheté (personnage hobbit) intégrés comme joueur pour voir le rendu réel plutôt qu'un prototype en formes géométriques.",
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
      '09_jeu/scripts/ — Player, Enemy, WaveManager, UI, Main, Projectile, EnemyProjectile, XPOrb, SpriteSheetLoader',
      '09_jeu/assets/hobbit_frames/ — 78 frames PNG individuelles du personnage joueur',
    ],
    archAssetTitle: 'Pipeline sprites (Aseprite → Godot)',
    archAsset: "Personnage joueur : pack acheté (hobbit), animé dans Aseprite. Les frames sont chargées individuellement au runtime par un loader dédié (SpriteSheetLoader.gd) qui lit un dossier de fichiers nommés « <préfixe><numéro>.png » (ex: « Hobbit - Idle1.png »), les trie numériquement et construit une SpriteFrames Godot par animation (idle, run, attack, death, hit). Export brut des frames fait en ligne de commande via le binaire Aseprite (`aseprite -b … --sheet … --data … --script …`) plutôt qu'à la main dans l'éditeur — voir l'onglet Bugs pour le script Lua nécessaire.",
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
      'Déplacement : WASD ou flèches directionnelles, 4 directions',
      "Combat entièrement automatique — vise l'ennemi le plus proche à portée",
      'Échap pour quitter',
    ],
    specsEnemiesTitle: 'Ennemis du secteur Religion',
    specsEnemies: [
      'Acolyte — rapide, peu de vie, dégâts de contact',
      'Inquisiteur — lent, très résistant, gros dégâts de contact',
      "Encensier — garde ses distances, tire un projectile (« encens toxique ») plutôt que de foncer",
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
    specsPlayerTitle: 'Personnage joueur',
    specsPlayer: [
      'Animé : idle, course, attaque, mort (issues du pack de sprites)',
      "Retourné automatiquement selon le sens du déplacement (gauche/droite), pas de sprites dos/face — convention standard du genre",
      "Légère inclinaison du personnage dans le sens de la course, pour rendre la direction lisible même quand l'animation de marche est discrète",
      "Priorité systématique donnée à l'animation de course sur la pose d'attaque tant que le joueur se déplace",
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
    ],

    roadmapTitle: 'Roadmap',
    roadmapIntro: "Pas d'engagement de date — l'étape suivante n'est pas encore tranchée, discipline de scope oblige (le facteur n°1 d'échec des jeux solo indie).",
    roadmap: [
      {
        version: 'V0 — secteur pilote',
        statusLabel: 'FAIT',
        statusColor: 'var(--primary)',
        items: [
          "Boucle complète jouable : déplacement, vagues, level-up, mort/victoire",
          "Secteur Religion (Bélial) : 3 archétypes d'ennemis",
          'Personnage joueur animé et correctement orienté',
          'Plein écran',
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
        ],
      },
      {
        version: 'Envisagé',
        statusLabel: 'HYPOTHÈSE',
        statusColor: 'var(--muted)',
        items: [
          "Dessin des sprites par l'auteur lui-même (plaisir personnel assumé) une fois le pipeline Aseprite → Godot validé sur un pack acheté",
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
    tabs: [
      { id: 'overview', label: 'Overview' },
      { id: 'architecture', label: 'Technical architecture' },
      { id: 'specs', label: 'Functional specifications' },
      { id: 'bugs', label: 'Bugs & fixes' },
      { id: 'roadmap', label: 'Roadmap' },
    ],

    contextTitle: 'Context',
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
        body: "Pilot sector chosen: Religion (the demon Bélial), the best-documented one in the existing lore (Vautrin, the infiltrated Church). Godot 4 + GDScript, one sector built entirely in procedural code to move fast, sprites from a purchased pack (a hobbit character) plugged in as the player to see real rendering instead of a geometric-shape prototype.",
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
      '09_jeu/scripts/ — Player, Enemy, WaveManager, UI, Main, Projectile, EnemyProjectile, XPOrb, SpriteSheetLoader',
      '09_jeu/assets/hobbit_frames/ — 78 individual PNG frames for the player character',
    ],
    archAssetTitle: 'Sprite pipeline (Aseprite → Godot)',
    archAsset: "Player character: a purchased pack (hobbit), animated in Aseprite. Frames are loaded individually at runtime by a dedicated loader (SpriteSheetLoader.gd) that reads a folder of files named “<prefix><number>.png” (e.g. “Hobbit - Idle1.png”), sorts them numerically, and builds a Godot SpriteFrames per animation (idle, run, attack, death, hit). Raw frame export done from the command line via the Aseprite binary (`aseprite -b … --sheet … --data … --script …`) rather than by hand in the editor — see the Bugs tab for the required Lua script.",
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
      'Movement: WASD or arrow keys, 4 directions',
      'Combat is fully automatic — targets the nearest enemy in range',
      'Escape to quit',
    ],
    specsEnemiesTitle: 'Religion sector enemies',
    specsEnemies: [
      'Acolyte — fast, low HP, melee contact damage',
      'Inquisitor — slow, very tanky, heavy melee damage',
      'Censer-bearer — keeps its distance, fires a projectile (“toxic incense”) instead of charging in',
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
    specsPlayerTitle: 'Player character',
    specsPlayer: [
      'Animated: idle, run, attack, death (from the sprite pack)',
      "Auto-flipped based on movement direction (left/right), no back/front sprites — standard genre convention",
      'Slight lean in the direction of travel, to keep direction readable even when the walk animation itself is subtle',
      'Run animation always takes priority over the attack pose while the player is moving',
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
    ],

    roadmapTitle: 'Roadmap',
    roadmapIntro: "No date commitments — the next step isn't decided yet, scope discipline being the #1 failure factor for solo indie games.",
    roadmap: [
      {
        version: 'V0 — pilot sector',
        statusLabel: 'DONE',
        statusColor: 'var(--primary)',
        items: [
          'Full playable loop: movement, waves, level-up, death/victory',
          'Religion sector (Bélial): 3 enemy archetypes',
          'Player character animated and correctly oriented',
          'Fullscreen',
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
        ],
      },
      {
        version: 'Considered',
        statusLabel: 'HYPOTHESIS',
        statusColor: 'var(--muted)',
        items: [
          'Sprites hand-drawn by the author himself (an explicit personal pleasure) once the Aseprite → Godot pipeline is validated on a purchased pack',
          'Extend to the 8 other Occasus sectors from the lore (media, politics, agribusiness, education, military…) once the twist is proven on 2 sectors',
        ],
      },
    ],
  },
}

export default function TheLostCauldronGame() {
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
            <p style={{ marginBottom: 16 }}>{c.context}</p>
            <Link
              to="/lab/lost-cauldron-game/demo"
              style={{
                display: 'inline-block',
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: 'var(--primary)',
                textDecoration: 'none',
                border: '1px solid var(--primary)',
                borderRadius: 6,
                padding: '8px 16px',
              }}
            >
              {t(lang, 'seeDemo')}
            </Link>
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
