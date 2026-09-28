# Mission audit-github — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Vérification réseau limitée au dépôt public misran-labs | Seul moyen de tester la fonctionnalité ; lecture seule, dépôt de Michael |
| 2026-09-28 | 2 | Exclusions D4/D5 (`node_modules/`, `dist/`…) comparées par **segment de dossier** entier, pas par sous-chaîne | Évite d'écarter à tort `redist/` ou `rebuild/` ; même résultat sur les cas visés |
| 2026-09-28 | 2 | Tri « par chemin » = ordre des codes de caractères (pas `localeCompare`) | Résultat identique quel que soit l'environnement (Node, navigateur, langue) |
| 2026-09-28 | 2 | 404 sur l'arborescence (2ᵉ appel) → « Branche introuvable » ; 404 sur le dépôt (1er appel) → « Dépôt introuvable ou privé » | D3 ne prévoit qu'un message 404 ; distinguer les deux est plus utile quand la branche vient de l'adresse |
| 2026-09-28 | 2 | Seuils de taille : 300 Ko = 300 × 1024 octets, 200 Ko = 200 × 1024 | Convention informatique usuelle ; aucun cas limite dans les fixtures |
| 2026-09-28 | 2 | « Priorité » de D5 : un dossier `src`, `app`, `components` ou `packages` à n'importe quel niveau du chemin | Couvre les monorepos (`packages/x/src/…`) ; D5 ne précise pas la profondeur |
| 2026-09-28 | 2 | Un dépôt renvoyé avec `private: true` est refusé comme « introuvable ou privé » | Sans authentification cela ne devrait pas arriver ; garde-fou sans coût |
