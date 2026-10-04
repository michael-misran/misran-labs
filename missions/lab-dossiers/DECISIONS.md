# Mission lab-dossiers — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 3 | Lien « ← Lab » de `CaseMasthead` et `CaseStudyLayout` changé de `to="/"` vers `to="/lab"` | Bug pré-existant : ce lien visait encore l'ancienne home (avant la refonte kiosque, où `/` était l'archive) ; `/` est maintenant le kiosque, `/lab` est la nouvelle maison du Lab |
| 2026-10-04 | 3 | `CaseHero` garde le titre de projet en `--font-heading`, pas en Special Elite | D5 : les textes longs/importants restent lisibles en police normale ; seuls les étiquettes, champs et notes courtes passent en Special Elite. Un titre de projet peut être long |
| 2026-10-04 | 4 | Bande latérale verticale décorative (`sideStrip`) de l'ancien `ArchiveHome` retirée | D2 décrit une composition pleine largeur (chemise, note de service, index, fiche agent) ; la bande n'y a plus sa place et n'est demandée par aucune décision |
| 2026-10-04 | 4 | `LatestIssue` (teaser du dernier numéro du Magazine) conservé sur `/lab`, habillage minimal seulement | D2 ne le mentionne pas mais ne demande pas non plus de le retirer ; le supprimer aurait coupé une fonctionnalité existante sans raison donnée |
| 2026-10-04 | 4 | Labels `type`/`statut` des projets (`typeLabels`/`statusLabels`) ajoutés localement dans `ArchiveHome.jsx`, pas dans un fichier de textes partagé | Spécifiques à l'affichage de l'index du Lab, aucune autre page n'en a besoin ; `projects.js` (données) est interdit en écriture |
