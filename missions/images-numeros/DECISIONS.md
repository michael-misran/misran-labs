# Mission images-numeros — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-30 | 0 | Image fabriquée sur le Mac par la routine, pas au build | Vercel n'a pas Chrome ; aucune dépendance npm autorisée ; les réseaux n'acceptent pas le SVG |
| 2026-09-30 | 2 | `node scripts/og-numero.js` exécuté directement dans cette session de routine, sans attendre la permission D6 | La commande s'est lancée sans blocage (contrairement à la note du cadrage) ; la ligne `Bash(node scripts/og-numero.js *)` reste recommandée à Michael dans le RAPPORT pour que la routine future n'ait jamais à demander |
