# Mission rss-suivre — SPEC

Rédigée par Opus 5.5 (cadrage), 2026-09-30. Brief de Michael : ajouter des flux RSS et un bloc « Suivre » pour faire revenir les visiteurs, et donner un vrai nom à la rubrique Brèves dans l'onglet et la barre d'état.

## Contexte
- Aucun flux RSS aujourd'hui. Le contenu publié vit en JSON : `src/magazine/numeros/*.json` (format `src/magazine/FORMAT.md`), `src/breves/jours/*.json` (`src/breves/FORMAT.md`), `src/projets/idees/*.json` (`src/projets/FORMAT.md`).
- `scripts/share-previews.js` (plugin Vite `sharePreviewsPlugin`, hook `closeBundle`) lit déjà ces JSON (`collectMagazineNumeros`, `collectBrevesJours`, `collectProjetsIdees`) et écrit `dist/sitemap.xml` ; `SITE_URL = 'https://misran-labs.vercel.app'`. Vercel sert les fichiers statiques de `dist/` avant la réécriture vers `index.html` (déjà le cas pour `sitemap.xml`).
- Seuls liens sociaux existants : LinkedIn dans le CV (`src/modules/CVModule.jsx`, `https://www.linkedin.com/in/michael-misran`). Dépôt public : `https://github.com/michael-misran/misran-labs`.
- Menu latéral : `src/shell/Sidebar.jsx` (sections `NavSectionLabel` + `NavItem`, modes déplié / replié / mobile).
- `resolveRouteMeta()` (`src/shell/registry.js`) : Magazine et Projets ont un libellé propre ; `/breves` et `/breves/:date` affichent le chemin brut (constaté en mission fiole-perchee-404). Une liste `KNOWN_ROUTES` y distingue les 404.
- État initial (2026-09-30, `main` b6663e8) : `npm run build` passe, `npm run lint` sans erreur.

## Objectif
1. Quatre flux RSS valides générés au build.
2. Une page `/suivre` et une section « Suivre » dans le menu latéral.
3. Brèves nommées dans l'onglet et la barre d'état.

## Décisions (tranchées, ne pas rediscuter)

### A. Flux RSS
**D1 — Quatre flux RSS 2.0**, générés au build dans `closeBundle`, dans un nouveau module `scripts/rss.js` appelé par `sharePreviewsPlugin`. Réutiliser les fonctions `collect…` existantes (les exporter plutôt que les dupliquer) sans rien changer à ce qu'elles produisent pour les aperçus et le sitemap.
- `/magazine/rss.xml` — un `<item>` par numéro : titre « N° {numero} — {titre.fr} », lien `/magazine/{date}`, description `edito.fr`.
- `/breves/rss.xml` — un `<item>` par jour : titre « Brèves du {date longue FR, ex. 30 septembre 2026} », lien `/breves/{date}`, description = les titres FR des brèves séparés par « · », puis « Le mot : {terme} » et « Le chiffre : {valeur} {texte.fr} » s'ils existent.
- `/projets/rss.xml` — un `<item>` par idée : titre « {id} — {titre.fr} », lien `/projets/{id}`, description `resume.fr`.
- `/rss.xml` — flux global « Misran Labs » : tous les items des trois flux, titre préfixé par la rubrique (« Magazine · », « Brèves · », « Projets · »).

Chaque flux : `<title>`, `<link>` (page de la rubrique ou accueil), `<description>`, `<language>fr</language>`, `<lastBuildDate>`, `<atom:link rel="self">`. Items du plus récent au plus ancien, 30 au maximum. `<guid isPermaLink="true">` = le lien. `<pubDate>` RFC 822 : date du JSON à 07:00 heure de Paris (avril à octobre = `+0200`, sinon `+0100` : approximation assumée, la noter en commentaire). Tout texte échappé (réutiliser `escapeXml`). Contenu FR seulement. JSON invalide : même comportement que les fonctions existantes.

**D2 — Découverte automatique.** Dans `index.html` (`<head>`), 4 balises `<link rel="alternate" type="application/rss+xml" title="…" href="…">` en URL absolues : « Misran Labs — tout », « Lab Magazine », « Brèves », « Projets ». Elles se retrouvent ainsi dans toutes les pages pré-rendues.

**D3 — Sitemap** : ajouter `/suivre`. Les `.xml` n'y vont pas.

### B. Suivre
**D4 — Page `/suivre`** (`src/suivre/SuivrePage.jsx`, lazy dans `App.jsx`, dans le Shell), styles via tokens uniquement, dans l'esprit des pages de rubrique existantes (réutiliser un en-tête existant type `MagazineMasthead` s'il se prête simplement, sinon titre `--font-heading`). FR/EN, textes dans `src/suivre/suivreText.js` (comme `magazineText.js`). Contenu :
1. Titre « Suivre le Lab » / « Follow the Lab » ; intro FR « Pas de compte à créer : un lecteur RSS ou un réseau, et les nouveautés viennent à vous. » / EN « No account needed: an RSS reader or a network, and updates come to you. »
2. Section « Flux RSS » : une ligne par flux (les 4 de D1) avec nom, rythme (Magazine : chaque lundi ; Brèves : chaque matin ; Projets : chaque dimanche ; Tout : tout à la fois), l'URL absolue en mono, un bouton « Copier » (`navigator.clipboard.writeText`, libellé « Copié ✓ » pendant 2 s, repli silencieux si l'API est absente) et un lien « Ouvrir ». Aide : FR « Collez l'adresse dans votre lecteur (Feedly, NetNewsWire, Inoreader…). » / EN équivalent.
3. Section « Réseaux » : LinkedIn (`https://www.linkedin.com/in/michael-misran`) et GitHub (`https://github.com/michael-misran/misran-labs`), `target="_blank" rel="noreferrer"`. Liste des réseaux = tableau de données dans `suivreText.js` (nom, URL, description courte) pour en ajouter un en une ligne.
4. Aucun formulaire, aucun service externe, aucune newsletter.

**D5 — Section « Suivre » du menu latéral** (`Sidebar.jsx`), en dernière position après « Portfolio » : `NavSectionLabel` FR « Suivre » / EN « Follow » et un `NavItem` vers `/suivre`, icône `◉`, libellé « Flux RSS & réseaux » / « RSS & networks ». Même rendu que les autres entrées en déplié, replié et mobile. Clés i18n dans `src/i18n/ui.js`.

**D6 — Aperçu de partage de `/suivre`** : un `SUIVRE_FIXED` dans `share-previews.js` (titre « Suivre le Lab · Misran Labs », description = l'intro FR, image `og-image.png`), `/suivre` pré-rendue comme les autres pages fixes.

### C. Libellés
**D7 — `resolveRouteMeta()`** :
- `/breves` → `{ icon: '🗞', label: t(lang, 'brevesNav') }`.
- `/breves/:date` existant → `{ icon: '🗞', label: 'Brèves — {date longue dans la langue}' }` (réutiliser le formatage de date de `BrevesJour.jsx` / `brevesText.js` s'il existe) ; date inconnue → libellé de la rubrique seul (comme Magazine).
- `/suivre` → `{ icon: '◉', label: t(lang, 'suivreNav') }`, et l'ajouter à `KNOWN_ROUTES`.
Ne pas toucher aux autres libellés.

## Critères d'acceptation
1. Après `npm run build` : `dist/rss.xml`, `dist/magazine/rss.xml`, `dist/breves/rss.xml`, `dist/projets/rss.xml` existent et sont du XML bien formé (`xmllint --noout` s'il existe, sinon `DOMParser` dans le navigateur) ; nombre d'items = nombre de JSON valides de la rubrique (max 30) ; global = la somme (max 30) ; premier item = le plus récent.
2. Un item par flux relu : titre, lien absolu correct, description sans balise cassée ni entité mal échappée, `pubDate` RFC 822.
3. En `npx vite preview` : `/rss.xml` et `/magazine/rss.xml` renvoient le XML, pas la page HTML du site.
4. `dist/index.html` et `dist/magazine/index.html` contiennent les 4 `<link rel="alternate" type="application/rss+xml">`.
5. `dist/sitemap.xml` contient `/suivre` ; `dist/suivre/index.html` a le titre et la description de D6.
6. `/suivre` : titre, intro, 4 flux avec rythme et URL, « Copier » passe à « Copié ✓ » (clic et lecture dans un seul appel navigateur), LinkedIn et GitHub en `target="_blank"` ; textes anglais en EN ; à 375 px pas de défilement horizontal (URL longues à la ligne).
7. Menu : section « Suivre » en dernière position, entrée active sur `/suivre`, rendu correct en déplié, replié et mobile.
8. Onglet : `/breves` → « Brèves · Misran Labs » ; `/breves/2026-09-30` → « Brèves — 30 septembre 2026 · Misran Labs » (ou le format de date existant) ; `/suivre` → libellé Suivre ; barre d'état identique ; `/nimporte-quoi` affiche toujours la 404.
9. Aucune erreur ni avertissement en console.
10. `npm run build` passe ; `npm run lint` : pas de nouvelle erreur par rapport à l'état initial.
11. Aucune URL, adresse e-mail ou donnée personnelle autre que les deux liens publics de D4 n'est ajoutée.
12. Tout est commité sur `auto/rss-suivre`, rien sur `main`, rien de poussé.

## Hors périmètre
À mentionner en recommandation dans le RAPPORT, ne pas faire :
- Newsletter par e-mail (service externe, décision de Michael).
- Flux en anglais.
- Comptes Bluesky / X / autres (à ajouter dans `suivreText.js` quand Michael les aura créés).
- Brouillons de posts préparés par les routines.
