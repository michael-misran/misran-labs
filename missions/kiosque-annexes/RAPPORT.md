# Mission kiosque-annexes — RAPPORT

Exécutée par la tâche programmée `misran-labs-missions`, session Sonnet 5, 2026-10-04.
**Cette PR vise `refonte-kiosque`, pas `main`** (règle commune à toutes les missions de la refonte kiosque).

## Fait

- **D2 — Noms des titres harmonisés.** `FEEDS_BASE` (`src/suivre/suivreText.js`) et les 3 `title` de `writeRssFeeds` (`scripts/rss.js`) : « Le Magazine »/« The Magazine », « La Gazette du Lab »/« The Lab Gazette » (inchangé), « Les idées du Lab »/« The Lab's ideas », « Tout le kiosque »/« The whole kiosk ». URL des flux inchangées. Étendu, pour cohérence (SPEC : « tout ce qui sort du site »), aux titres des pages d'aperçu dans `scripts/share-previews.js` (numéro de Magazine, `MAGAZINE_FIXED`, `PROJETS_FIXED`, `PROJETS_FONCTIONNEMENT_FIXED`) et à l'eyebrow de `og-numero.js`.
- **D3 — `/suivre` en bulletin à découper.** Page refaite : cadre en pointillés, étiquette « ✂ Découper ici », une ligne par flux avec case ☐/☒ au survol, nom du titre dans sa propre typo (Gazette gothique + initiale rouge comme `NavTitres`, Magazine Playfair italique bleu, Les idées du Lab en machine à écrire verte, Tout le kiosque en lettres de bois), rythme, URL copiable, boutons Copier/Ouvrir. Réseaux existants dessous sous « Autres façons de nous lire ». `SuivreBandeau` passé au même style de coupon (cadre pointillé, ✂, étiquette Oswald), API inchangée.
- **D4 — La 404, avis de recherche.** `Page404.jsx` refaite en affiche western : cadre double filet, étiquette « Avis de recherche »/« Wanted », titre « Page disparue »/« Page missing » en Rye, adresse demandée en machine à écrire, « Dernière fois vue : Nulle part »/« Nowhere », « Récompense : Un café »/« One coffee », 5 liens (`/`, `/breves`, `/magazine`, `/jeux`, `/lab`) colorés par titre. `dist/404.html` garde son titre « Page introuvable · Misran Labs », cohérent.
- **D5 — Aperçus et images OG.** `og-numero-template.html` : palette maison (papier `#f6f1e6`, encre `#16120e`), bandeau bleu `#2b3a9b` sur le bord gauche, Playfair Display italique + Oswald (remplace Fraunces/JetBrains Mono/corail), même mécanisme de chargement des polices qu'avant. Les 2 images existantes (`public/og/magazine/2026-09-27.png`, `2026-09-28.png`) régénérées avec Chrome headless local. `index.html` : `theme-color` → `#16120e`, rien d'autre touché (lien Google Fonts intact).

## Pas fait

Rien laissé de côté dans le périmètre de la SPEC.

## Critères d'acceptation

1. **Diff limité aux fichiers autorisés.** OK — `git diff --stat refonte-kiosque...auto/kiosque-annexes` ne touche que les fichiers de D1 et `missions/kiosque-annexes/` (+ les 2 PNG régénérés dans `public/og/magazine/`, couverts par D5).
2. **`FEEDS` et titres RSS.** OK — vérifié par build : `dist/magazine/rss.xml` → « Le Magazine », `dist/projets/rss.xml` → « Les idées du Lab », `dist/rss.xml` → « Tout le kiosque ». URL inchangées.
3. **`/suivre`.** OK — vérifié par le `verificateur` (Haiku) : 4 flux affichés avec lien vers leur `path`, réseaux présents, aucune erreur console, pas de débordement à 375 px.
4. **404.** OK — vérifié par le `verificateur` : « AVIS DE RECHERCHE »/« WANTED », adresse demandée visible, liens vers `/`, `/breves`, `/magazine`, `/jeux`, `/lab`.
5. **Build régénère les images OG.** OK — `node scripts/og-numero.js <date>` sans erreur pour les 2 numéros existants ; image ouverte avec l'outil Read : palette maison et bandeau bleu visibles (voir PROGRESS.md étape 5).
6. **`index.html`.** Partiel — `theme-color` vaut bien `#16120e`. Le lien Google Fonts n'a pas été touché par cette mission, mais **diffère désormais de `refonte-kiosque`** : une autre mission déjà fusionnée dans `refonte-kiosque` y a ajouté la famille `Chango` pendant que cette mission travaillait sur son propre état de départ. Comme cette mission n'a jamais modifié cette ligne, un merge ou un rebase vers `refonte-kiosque` la reprendra sans conflit — mais au moment de lire ce rapport, un `diff` brut entre les deux branches montre un écart. Voir DECISIONS.md.
7. **Anglais sans résidu français.** OK — vérifié par le `verificateur` dans les deux sens (FR→EN et EN→FR) sur `/suivre` et la 404.
8. **Build et lint.** OK — `npm run build` passe. `npm run lint` (`eslint .`) remonte ~566 erreurs, mais **toutes proviennent d'un worktree orphelin `.worktrees/verif-magazine`**, laissé par une autre session, hors périmètre de cette mission et jamais modifié par elle (voir PROGRESS.md étape 1). Avec `npx eslint . --ignore-pattern '.worktrees/**'` : 0 erreur, 0 nouvelle alerte.
9. **Tout commité sur `auto/kiosque-annexes`.** OK — 6 commits sur la branche, rien sur `main` ni `refonte-kiosque`, rien poussé.

## Comment vérifier

```bash
git checkout auto/kiosque-annexes
npm run build
npx eslint . --ignore-pattern '.worktrees/**'
npx vite preview --port 4173
```
Puis dans le navigateur : `/suivre` (bulletin), une URL inexistante (404 western), bascule FR/EN, 1366 px et 375 px. Arrêter le serveur avant de repasser sur une autre branche.

## Décisions

Voir `DECISIONS.md` — en résumé : retrait de `MagazineMasthead`/`CaseFooter`/`SectionTitle` sur `/suivre` (doublons avec le Shell global) ; textes de la 404 définis localement dans `Page404.jsx` plutôt que dans `src/i18n/ui.js` (hors périmètre) ; pas de génération d'image OG pour la Gazette (aucune n'existe encore) ; formule « Misran Labs, maison d'édition indépendante » placée dans `SUIVRE_FIXED.description` plutôt que dans `index.html` (hors périmètre au-delà de `theme-color`) ; renommages étendus au-delà de D2 strict dans `share-previews.js` et `og-numero.js` pour cohérence des noms de titres « partout ».

## Délégations

Voir `DELEGATIONS.md` — 1 sous-agent Haiku pour le remplacement mécanique des noms (étape 2, diff relu et conforme), 1 sous-agent `verificateur` Haiku pour la vérification finale dans le navigateur (étape 6, tout OK). Le reste (cadrage excepté) a été fait par la session principale Sonnet.

## Recommandations

- **Nettoyer `.worktrees/verif-magazine`** : worktree orphelin qui pollue `npm run lint` pour toute session future tant qu'il traîne. Hors périmètre de cette mission (pas dans les fichiers autorisés), à traiter par Michael ou une prochaine session (`git worktree remove .worktrees/verif-magazine` après vérification qu'il n'y a rien à y récupérer).
- **`src/i18n/ui.js`** : les clés `notFound404Eyebrow`, `notFound404Title`, `notFound404Body`, `notFound404BackLab`, `notFound404Magazine`, `notFound404Breves` ne sont plus utilisées (seule `notFound404Tab` l'est encore, pour l'onglet). Ménage possible dans une mission de finitions qui touche `src/i18n/ui.js`.
- **Lien Google Fonts de `index.html`** : à la fusion de cette PR dans `refonte-kiosque`, vérifier que le merge reprend bien la version actuelle de `refonte-kiosque` (avec `Chango`) plutôt que celle, plus ancienne, de cette branche — ne devrait pas créer de conflit puisque cette mission n'a touché que la ligne `theme-color`.

## Retouches à la clôture (session interactive, 2026-10-04)
- Vérifié dans un essai local combiné avec `refonte-kiosque` à jour : aucun conflit, et le lien Google Fonts garde bien `Chango` (critère 6 confirmé après fusion). `/suivre`, la 404 et `/projets` (coupon `SuivreBandeau`) vus sur ordinateur et à 375 px, sans débordement. Image OG du numéro 1 conforme.
- 404 : « Last seen : » et « Reward : » gardaient l’espace français avant les deux-points en anglais. L’espace n’est plus mis qu’en français.
- Les ~566 erreurs de lint venaient de la copie de vérification `.worktrees/verif-magazine` laissée par la session de clôture. Elle est supprimée après les clôtures.
