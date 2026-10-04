# Mission lab-dossiers — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-04 | 3 | Lien « ← Lab » de `CaseMasthead` et `CaseStudyLayout` changé de `to="/"` vers `to="/lab"` | Bug pré-existant : ce lien visait encore l'ancienne home (avant la refonte kiosque, où `/` était l'archive) ; `/` est maintenant le kiosque, `/lab` est la nouvelle maison du Lab |
| 2026-10-04 | 3 | `CaseHero` garde le titre de projet en `--font-heading`, pas en Special Elite | D5 : les textes longs/importants restent lisibles en police normale ; seuls les étiquettes, champs et notes courtes passent en Special Elite. Un titre de projet peut être long |
