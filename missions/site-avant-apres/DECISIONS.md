# Mission site-avant-apres — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Paire dédiée `--primary-surface` / `--on-primary-surface`, `--on-primary` supprimé | `--primary` sert surtout d'accent (135 usages) : le foncer changerait toute l'identité ; une paire dédiée ne touche que le texte sur corail, et l'audit l'apparie correctement |
| 2026-09-28 | 0 | Blocs `[data-invert]` inchangés | Choix de Michael : corail vif sur les grands blocs |
| 2026-09-28 | 1 | Snapshot envoyé par la page vers un petit récepteur local (`recevoir-snapshot.mjs`, port 4174) plutôt que recopié à la main | Évite de retranscrire ~9 Ko de JSON ; le même outil sert à l'étape 7 |
| 2026-09-28 | 1 | Le snapshot liste les 120 noms de propriétés personnalisées trouvés dans les feuilles de style construites (build de `main` + cadrage), lus sur `:root` et sur un `<div data-invert>` temporaire | Couvre tous les tokens réellement déclarés, sans dépendre d'une liste écrite à la main |
| 2026-09-28 | 1 | `mesurer-audit.mjs` rejoue le mode GitHub avec les fichiers suivis par Git ; l'état « avant » = HEAD de la branche (main + cadrage) | Résultat identique à l'audit public : 0,8 / 3 (Arch. 2, Couv. 2, Access. 0, Comp. 0, Doc. 1, Gouv. 0) |
