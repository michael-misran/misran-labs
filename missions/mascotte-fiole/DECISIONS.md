# Mission mascotte-fiole — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 0 | Maquette déplacée de `screens/perso-pixel.html` vers `missions/mascotte-fiole/maquette.html` | Garder l'arbre de travail de `main` propre (sinon la tâche programmée refuse de démarrer) et versionner la référence visuelle avec la mission |
| 2026-09-30 | 4 | D4 appliqué littéralement : seul `overflow: visible` sur le `<footer>` de Statusbar.jsx, sans toucher à `overflow: hidden` sur `shell-grid`/`html`/`body`/`#root` dans Shell.jsx (hors périmètre de l'étape, fichier non listé) | La pirouette (rotation 360°) peut mathématiquement dépasser de quelques px la boîte 32×32 de la Fiole aux angles à 45° ; comme le footer est la dernière ligne de la grille, collée au bas de la fenêtre, ces quelques px pourraient être rognés par les ancêtres malgré le footer en overflow: visible. Le risque est mineur (animation de 0,8 s, quelques px, au ras du bord bas) et la SPEC ne demande que le footer. À vérifier à l'étape 5 ; si un rognage réel est visible, corriger à l'étape 6 (option : agrandir légèrement le padding-bottom du footer ou desserrer overflow sur shell-grid). |
