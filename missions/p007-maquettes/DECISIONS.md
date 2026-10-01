# Mission p007-maquettes — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-10-01 | 2 | Le chiffre des jours (calendaire, D8) ne change qu'à minuit local ; les heures/minutes/secondes du compte à rebours décomptent jusqu'à ce minuit prochain, pas jusqu'à l'instant exact de l'événement. | La SPEC impose des jours calendaires « pas par tranches de 24 h » ; diviser la durée totale par 24 h pour les heures/minutes aurait fait afficher un jour de moins que le widget au même instant. Ce découpage garde les deux affichages cohérents. |
| 2026-10-01 | 2 | Dates de création des événements d'exemple fixées arbitrairement (ex. Lisbonne créé il y a 30 jours) pour alimenter la barre de progression. | La SPEC fixe les dates cibles relatives à aujourd'hui mais pas les dates de création ; nécessaires pour D7 (barre de progression « du jour de création au jour J »). |
| 2026-10-01 | 2 | Couleurs Pop par événement (`--pop-1..4`) neutralisées en `var(--surface)` sur les thèmes Papier et Nuit. | D7 : les aplats saturés sont une caractéristique du thème Pop seulement ; les widgets doivent rester cohérents avec les 2 autres thèmes. |
