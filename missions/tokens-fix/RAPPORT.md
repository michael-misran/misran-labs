# Mission tokens-fix — RAPPORT

Branche `auto/tokens-fix`, 2026-09-26. Rien sur `main`, rien de poussé.

## Fait
- **tokens.css** : 34 primitives ajoutées en section 1 (14 couleurs avec transparence `-aNN`, `--primitive-shadow-none`, 11 dimensions `--primitive-size-*`, 3 polices, 5 réglages de texte). Les 34 semantics en erreur sont devenus des alias ; section STRUCTURE supprimée, ses tokens déplacés en section 2 ; `[data-invert]` passe aussi par les primitives ; commentaires mis à jour. `@media print` inchangé (D6).
- **LabTokens.jsx** : 4 nouvelles catégories (couleurs avec transparence, dimensions, polices, texte) + `--primitive-shadow-none` dans Élévation ; `pointsTo`/`value` renseignés pour les 34 semantics ; colonne Aperçu = `—` pour les lignes non-couleur ; commentaire de `getViolation` mis à jour.

## Critères d'acceptation
| # | Critère | Résultat |
|---|---|---|
| 1 | 0 erreur FR et EN | ✅ 120 tokens, aucun compteur ni badge d'erreur (rendu serveur React) |
| 2 | Non-régression visuelle | ✅ 86 tokens d'origine × `:root` et `[data-invert]` : 0 différence (`snapshot-avant.json` / `snapshot-apres.json`) |
| 3 | Aucune valeur brute hors section 1 | ✅ hors décalages d'ombre (D5) et `@media print` (D6) |
| 4 | Build / lint | ✅ build OK ; lint = 6 erreurs préexistantes, mêmes fichiers, aucune dans les fichiers de la mission |
| 5 | Pas d'erreur console | ⚠️ partiel : aucun `console.error/warn` au rendu serveur de `/` et `/lab/lab-tokens`. **Non vérifié dans un vrai navigateur** |
| 6 | Tout commité sur `auto/tokens-fix` | ✅ un commit par étape |

## Pas fait / limites
- Le preview « dev » est refusé en session planifiée (personne pour approuver) : pas de contrôle dans un vrai navigateur. Remplacé par Chrome headless sur une page statique (snapshots) et par un rendu serveur React (page). Les effets côté client (hydratation, `useEffect`) n'ont pas été exécutés.

## Comment vérifier
```bash
npm run dev
```
Puis ouvrir `/lab/lab-tokens`, basculer FR/EN : pas de ligne « erreur détectée », console vide ; idem sur `/`.
Rejouer les contrôles automatiques :
```bash
missions/tokens-fix/snapshot.sh /tmp/snap.json
```
```bash
node missions/tokens-fix/ssr-tokens-fr-en.mjs
```
```bash
node missions/tokens-fix/ssr-app.mjs
```

## Décisions (détail dans DECISIONS.md)
- Étape 1 : `public/games` ignoré par ESLint (bundles tiers qui bloquaient le lint).
- Snapshots par Chrome headless, vérification de page par SSR (preview indisponible).
- Aperçu `—` harmonisé sur toutes les lignes non-couleur ; `--primitive-shadow-none` rangée dans Élévation ; types réutilisés (`dimension` nouveau).
- Valeurs de la doc en `0.12` (et non `.12`), recopiées de tokens.css.

## Délégations (détail dans DELEGATIONS.md)
Aucun sous-agent lancé pendant l'exécution : chaque étape était plus courte à faire directement, et `verificateur` aurait buté sur le même refus du preview. Cadrage initial fait par Opus.

## Recommandations hors périmètre (D9)
- Générer `TOKEN_GROUPS` automatiquement depuis tokens.css : la doc est aujourd'hui une deuxième source de vérité maintenue à la main (120 lignes).
- Renommer les semantics hérités (`--cyan` pointe vers de l'ocre, `--violet` vers une prune, `--pink` vers du rose-brique).
- Les composants consommateurs n'ont pas été touchés ; certains styles en ligne de LabTokens.jsx (tailles `9`, `11`, `padding: '2px 6px'`…) restent en valeurs brutes hors tokens.
- Valider la mission dans un vrai navigateur (critère 5) avant merge.
