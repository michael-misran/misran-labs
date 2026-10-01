# Mission jeux-estimation — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-01 | 2 | Couleur de carte `violet` (parmi cyan/violet/pink/mandarine disponibles dans tokens.css) | geste-parfait a déjà pris `mandarine` ; aucune contrainte de la SPEC sur la couleur exacte |
| 2026-10-01 | 2 | Ajout d'un champ `nom{fr,en}` à l'interface de type (D2 ne liste que `id, question, unite, generer`) | nécessaire pour le nom court affiché dans le texte de partage D6 (« Bocal : … ») ; décision réversible, n'affecte pas generer() |
| 2026-10-01 | 2 | Texte de partage construit localement dans `Jeu.jsx` (`construireTexte`), sans réutiliser `socle/partage.js#construireTextePartage` | le format D6 fixé par la SPEC n'inclut pas la barre 10 cases ni le score chiffré que la fonction commune ajoute toujours ; réutilisée en revanche : `ResultatPartage` (affichage) et `partager()` (mécanique de partage, via ResultatPartage) |
| 2026-10-01 | 2 | `types/bocal.jsx` : fonction de dessin SVG nommée en minuscule (`dessinerBonbons`), appelée comme fonction et non comme balise JSX | `react-refresh/only-export-components` interdit un composant capitalisé non exporté dans un fichier qui exporte un objet de données (meta) ; même rendu, juste pas détecté comme « composant » par la règle |
