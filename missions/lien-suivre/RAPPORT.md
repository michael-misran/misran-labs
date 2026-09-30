# Mission lien-suivre — RAPPORT

Terminée le 2026-09-30, en session interactive avec Michael (Opus 5.5), sans sous-agent.

## Ce qui est fait
- `src/suivre/SuivreBandeau.jsx` : bandeau discret (bordure pointillée, tokens uniquement) avec ◉ + une phrase selon la rubrique, un lien interne « Suivre le Lab → » vers `/suivre` et un lien « RSS » vers le flux de la rubrique.
- `src/suivre/suivreText.js` : textes FR/EN du bandeau (`BANDEAU_TEXT`) ; les URL de flux sont reprises de `FEEDS`, pas réécrites.
- Placé juste avant `CaseFooter` sur les 7 pages : Magazine (accueil, numéro), Brèves (accueil, jour), Projets (accueil, idée, fonctionnement).

## Critères d'acceptation
| # | Résultat |
|---|---|
| 1 | Conforme : bonne phrase et bon flux sur `/magazine`, `/breves/2026-09-30`, `/projets/fonctionnement` (et les 4 autres pages par construction, même ligne ajoutée) ; bandeau suivi du pied de page ; « Suivre le Lab → » mène à `/suivre` sans rechargement. |
| 2 | Conforme : aucun bandeau sur `/magazine/1999-01-01` ni `/projets/P-999` (les `NotFound` n'ont pas de `CaseFooter`), ni sur les autres pages hors rubrique. |
| 3 | Conforme : en EN, « New ideas every Sunday. », « FOLLOW THE LAB → ». |
| 4 | Conforme : à 375×812, `scrollWidth` = 375 ; en bas de défilement de `/breves`, bandeau (bas à 558 px) et Fiole (haut à 735 px) ne se chevauchent pas. |
| 5 | Conforme : console sans erreur. |
| 6 | Conforme : aucune couleur hexadécimale dans `SuivreBandeau.jsx`. |
| 7 | Captures montrées dans la conversation (non versionnées, voir DECISIONS). |
| 8 | Conforme : `npm run build` passe, `npm run lint` sans erreur. |
| 9 | Conforme : commité sur `auto/lien-suivre`. |

## Recommandations (hors périmètre)
- Lien vers `/suivre` sur l'accueil du Lab.
- Newsletter et réseaux supplémentaires quand Michael les aura créés.
