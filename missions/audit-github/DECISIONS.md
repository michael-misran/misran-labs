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
| 2026-09-28 | 3 | Dans les fichiers JS/TS/Vue/Svelte, couleurs **et** px ne sont comptés que dans les chaînes de caractères et les blocs `<style>` (D6 ne limitait que les `#hex`) | Évite le texte courant JSX (« 20px ») et les faux positifs ; même mécanisme pour les trois types de valeurs |
| 2026-09-28 | 3 | Fichiers CSS/SCSS/LESS : valeurs lues via `lireCss` (déclarations seulement, y compris propriétés personnalisées locales) | Un sélecteur `#dead { }` n'est jamais une couleur ; les `@media (min-width: 768px)` ne sont pas comptés comme valeurs en dur |
| 2026-09-28 | 3 | Commentaires `//` retirés en début de ligne **et** après un espace (fin de ligne) dans le code JS/TS | Les commentaires de fin de ligne contiennent souvent des valeurs ; `http://` n'est pas touché (pas d'espace avant `//`) |
| 2026-09-28 | 3 | Une couleur qui contient un `var(…)` (ex. `rgb(var(--r) 0 0)`) n'est pas comptée en dur | Elle est déjà en partie tokenisée ; la compter fausserait le taux |
| 2026-09-28 | 3 | `valeursRepetees` : seulement les valeurs vues au moins 2 fois ; `dejaTokenisees` plafonnée à 10 avec `nombreDejaTokenisees` (total) | Une liste de valeurs uniques n'est pas « répétée » ; le total permet à la page de dire « et N autres » |
| 2026-09-28 | 3 | R6 avec `usagesExternes` : en plus de `--a-b-c` et `a.b.c` (D6), un token JSON `a.b.c` est aussi reconnu utilisé si `--a-b-c` figure dans les usages | Deux directions de correspondance : robuste si l'ensemble fourni ne contient que des noms CSS |
| 2026-09-28 | 3 | `extraireUsagesTokens(fichiersCode)` exporté par `couverture.js` (usages sans avoir besoin des tokens) | `analyse` a besoin des usages, `mesurerCouverture` a besoin des tokens produits par `analyse` : il faut pouvoir lire les usages en premier |
| 2026-09-28 | 2 | Un dépôt renvoyé avec `private: true` est refusé comme « introuvable ou privé » | Sans authentification cela ne devrait pas arriver ; garde-fou sans coût |
