# Inventaire — site-avant-apres (étape 2)

Établi à partir de `mesure-avant.json`, de `grep` sur `src/` et de `lister-en-dur.mjs` (rejoue le repérage de l'audit, avec numéros de ligne). Fait par la session principale : le sous-agent `explorateur` ne s'est pas lancé (deux essais, classifieur sans verdict), voir DECISIONS.

## A. Contraste (D2, D3, D4)

Paire : `--on-primary` sur `--primary` (3,36:1) → `--on-primary-surface` sur `--primary-surface` (corail 700, 4,80:1). Paire sélection : `--on-selected` sur `--selected-surface` → `--selected-surface` passe à corail 700 (tokens seulement).

| Fichier:ligne (avant) | Élément | Action |
|---|---|---|
| `src/styles/tokens.css:113-114, 138` | `:root` | `--primary-surface`, `--on-primary-surface` ajoutés ; `--on-primary` supprimé ; `--selected-surface` → coral-700 |
| `src/styles/tokens.css:215-216, 225-226` | `[data-invert]` | `--primary-surface` (crème 50), `--on-primary-surface` (coral-700), `--on-selected` (coral-700) ; `--on-primary` supprimé |
| `src/design-system/kit/buttonStyles.js:7` | bouton `primary` (fond + hover via `t.bg`) | `bg` → `--primary-surface`, `fg` → `--on-primary-surface` |
| `src/design-system/kit/buttonStyles.js:8` | bouton `danger` (fond `--error`) | `fg` → `--on-primary-surface` (fond inchangé) |
| `src/design-system/kit/Badge.jsx:6` | Badge `solid` | fond + texte |
| `src/design-system/kit/AlertBanner.jsx:15-16` | bandeau d'alerte | fond + texte |
| `src/design-system/kit/Checkbox.jsx:42-43` | case cochée | fond (coché) + texte (coche) |
| `src/design-system/kit/Stepper.jsx:45-46` | pastille d'étape remplie | fond + texte (`:75` : trait sans texte, inchangé) |
| `src/design-system/kit/Radio.jsx:57, 63` | bouton radio sélectionné | fond du rond + point central |
| `src/design-system/kit/Pagination.jsx:41-42` | page courante | fond + texte |
| `src/lab/ThemeSwatch.jsx:78-79` | pastille « Action » | fond + texte |
| `src/lab/projects/AuditTokens.jsx:786-788` | lien d'appel (CTA) | texte, fond, bordure (suivait le fond) |
| `src/lab/projects/audit/ui.jsx:16-18` | bouton `principal` | texte, fond, bordure |
| `src/lab/projects/LabTokens.jsx:333` | pastille d'avertissement (fond `--error`) | texte → `--on-primary-surface` (fond inchangé) |
| `src/lab/projects/LabTokens.jsx:122, 147` | tableau `GROUPS` | D4 : `--primary-surface` et `--on-primary-surface` ajoutés, `--on-primary` retiré, `--selected-surface` → coral-700 / `#b8452e` |
| `src/shell/Sidebar.jsx:85-87, 104` | entrée active du menu | rien à changer : passe par `--selected-surface` / `--on-selected` (tokens) |

Fonds `--primary` **sans texte dessus**, laissés tels quels : `Switch`, `Progress`, `Slider`, `Stepper:75`, `Grille.jsx:19`, `ArchiveHome.jsx:134`, `SessionReplay.jsx` (pastille, lignes, fond teinté du CTA), `Badge` `soft` (texte corail sur fond teinté). `DesignSystemMultimarques.jsx:257, 455` : `--ds-…-primary-…`, sans rapport.

Aucun usage dans un fichier `.css` autre que `tokens.css`. `@media print` ne cite pas `--on-primary`.

## B. Valeurs en dur déjà tokenisées (D5)

Point important : l'audit n'analyse que **60 fichiers** (les premiers de `src/`, par ordre alphabétique) ; les 78 occurrences de `dejaTokenisees` sont toutes dans ces fichiers. On ne touche que ceux-là (les autres fichiers ne changent pas la mesure et allongeraient le diff sans gain pour l'audit).

Rôles : espacement (`padding`, `margin`, décalages) → `--space-*` ; épaisseur de bordure → `--border-*` ; rayon → `--radius-*`. Une valeur d'un rôle sans token (pas de `--space` à 2, 3, 4, 5, 6, 7, 9, 10, 14, 18, 20, 28, 36 px) reste en dur.

| Fichier:ligne | Valeur | Contexte | Cible |
|---|---|---|---|
| `design-system/SecondarySidebar.jsx:28` | 2px ×2 | `borderLeft` | `--border-thick` |
| `design-system/SecondarySidebar.jsx:30` | 16px | `width: calc(100% - 16px)` (= 2 × marge) | `calc(100% - 2 * var(--space-xs))` |
| `design-system/SecondarySidebar.jsx:31` | 8px | `margin: 0 8px` | `--space-xs` |
| `design-system/SecondarySidebar.jsx:37` | 12px ×2, 24px, 10px | `padding` | `--space-sm`, `--space-lg` ; 10px : aucun (pas de `--space` à 10) |
| `design-system/SecondarySidebar.jsx:63` | 16px | `padding: 16px 0` | `--space-md` |
| `design-system/Tag.jsx:14` | 2px, 8px | `padding` | 8px → `--space-xs` ; 2px : aucun |
| `design-system/kit/AlertBanner.jsx:19` | 16px | `padding` | `--space-md` |
| `design-system/kit/Badge.jsx:28` | 10px | `padding` | aucun |
| `design-system/kit/Breadcrumbs.jsx:16` | 10px, 16px | `padding` | 16px → `--space-md` ; 10px : aucun |
| `design-system/kit/Button.jsx:54` | 2px | `border` (focus) | `--border-thick` |
| `design-system/kit/ListItem.jsx:23` | 10px, 12px | `padding` | 12px → `--space-sm` ; 10px : aucun |
| `design-system/kit/Modal.jsx:74` | 8px | `padding` | `--space-xs` |
| `design-system/kit/Pagination.jsx:21` | 4px | `padding` | aucun (pas de `--space` à 4) |
| `design-system/kit/Select.jsx:37` | 10px ×2, 12px | `padding` | 12px → `--space-sm` ; 10px : aucun |
| `design-system/kit/Slider.jsx:35` | 20px | `left: calc(% − 20px)` (taille de la poignée) | aucun (pas un rôle d'espacement) |
| `design-system/kit/Stepper.jsx:18` | 8px, 12px | `padding` | `--space-xs`, `--space-sm` |
| `design-system/kit/TableHeader.jsx:42` | 8px | `padding` | `--space-xs` |
| `design-system/kit/Tabs.jsx:36` | 8px, 16px | `padding` | `--space-xs`, `--space-md` |
| `design-system/kit/TextField.jsx:56`, `Textarea.jsx:42` | 10px, 12px | `padding` | 12px → `--space-sm` ; 10px : aucun |
| `design-system/kit/Toast.jsx:25` | 12px, 16px | `padding` | `--space-sm`, `--space-md` |
| `design-system/kit/Tooltip.jsx:27` | 8px | `calc(100% + 8px)` (écart) | `--space-xs` |
| `design-system/kit/Tooltip.jsx:35` | 10px | `padding` | aucun |
| `design-system/kit/buttonStyles.js:13` | 10px, 20px | `padding` | aucun |
| `experiences/SessionReplay.jsx:53, 116, 121` | 24px, 4px, 32px | texte affiché (contenu éditorial, pas un style) | aucun |
| `experiences/SessionReplay.jsx:142, 420` | 12px, 4px | `backdropFilter: blur()` | aucun (pas de token de flou) |
| `experiences/SessionReplay.jsx:185` | 24px (+20px) | `padding` | 24px → `--space-lg` ; 20px : aucun |
| `experiences/SessionReplay.jsx:224, 345, 348, 361, 459` | 2px, 8px | `padding` | 8px → `--space-xs` ; 2px : aucun |
| `experiences/SessionReplay.jsx:265` | 12px, 16px, 4px ×2 | `padding`, `borderRadius: 0 4px 4px 0` | `--space-sm`, `--space-md`, `--radius-xs` |
| `experiences/SessionReplay.jsx:371` | 16px | `padding` | `--space-md` |
| `experiences/SessionReplay.jsx:404` | 12px | `padding` | `--space-sm` |
| `experiences/SessionReplay.jsx:478` | 12px | `padding` | `--space-sm` |
| `lab/CaseFile.jsx:45, 81` | 12px, 24px | `padding` | `--space-sm`, `--space-lg` |
| `lab/CaseFile.jsx:62` | 8px | `padding` | `--space-xs` |
| `lab/CaseFile.jsx:96` | 24px | `fontSize: clamp(24px, …)` | aucun (taille de police) |
| `lab/CaseStudyLayout.jsx:43` | 10px, 16px | `padding` | 16px → `--space-md` |
| `lab/CaseStudyLayout.jsx:103` | 8px | `padding` | `--space-xs` |
| `lab/CaseStudyLayout.jsx:149` | 16px | `margin: 0 0 16px` | `--space-md` |
| `lab/GameDemo.jsx:39`, `GameDemoV2.jsx:38` | 12px, 20px | `padding` | 12px → `--space-sm` ; 20px : aucun |
| `lab/PhaseCoverage.jsx:28`, `lab/ThemeSwatch.jsx:100` | 10px | `padding` | aucun |

Reste en dur après D5 (à mettre dans le RAPPORT) : paddings à 2, 3, 4, 5, 6, 7, 9, 10, 14, 18, 20, 28, 36 px (pas d'échelle d'espacement intermédiaire), `blur()`, tailles de police, décalage de poignée du curseur, textes éditoriaux qui mentionnent des px. Le critère « déjà tokenisées » (< 10 occurrences) ne sera donc probablement pas atteint : il faudrait des tokens `--space-*` supplémentaires (hors périmètre, à décider).
