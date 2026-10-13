# Mission p006-maquettes — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-13 | 0 | Maquette web interactive avant toute application native (D1) | Pas de dépendance ni de compte développeur sans l'accord de Michael ; le point de contrôle « maquette avant de coder » demandé par Michael |
| 2026-10-13 | 0 | Tarot seul (D3), nom provisoire « La Marque » (D5), direction « carnet de marque » (D6) | Jeu le plus difficile à compter et seul jeu avec concurrence identifiée (note privée P-006) ; à faire valider par Michael dans le RAPPORT |
| 2026-10-13 | 0 | Écart arrondi à l'entier supérieur pour les demi-points (D8) | Règle courante, non vérifiable sans source externe pendant la mission ; signalée comme point à valider |
| 2026-10-13 | 2 | Algorithme de calcul fixé : unité de score signée (base + petit + poignée + chelem) puis répartition par rôle (REGLES.md §4-5) | D8 donne les composantes et la contrainte « somme = 0 » mais pas la formule de combinaison exacte ; interprétation standard des règles FFT retenue, cohérente avec tous les cas générés (somme vérifiée = 0 sur les 33 cas) |
| 2026-10-13 | 2 | Le champ `camp` de la poignée est informatif seulement (affichage/historique), le calcul ne dépend que de la réussite du contrat (D8 : « acquise au camp gagnant de la donne, quel que soit le camp qui l'a montrée ») | Lecture directe de D8 |
| 2026-10-13 | 2 | 33 cas de test générés (au lieu de 24 minimum) pour couvrir chaque combinaison de D11 sans en forcer plusieurs dans un seul cas | Lisibilité de la vérification indépendante (étape 3) : un cas = un mécanisme à la fois, sauf les cas « chelem » qui combinent nécessairement bouts élevés et points réalisés élevés |
