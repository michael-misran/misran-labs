# Mission midnight-snack-1 — PROGRESS

**Statut :** étape 1 faite
**Prochaine action :** étape 2 (squelette du livre)
**Blocages :** aucun

## État initial (cadrage, 2026-10-15, `main` = 1440f8e)
- `npm run build` : OK.
- `npm run lint` : OK, 0 erreur.

## Étape 1 — lecture du portfolio (ce qui sera copié/adapté)
- **`PortfolioLivre.jsx`** : moteur de livre réutilisable tel quel dans l'esprit — à copier/adapter dans `MidnightLivre.jsx` :
  - `modeAtelier(search)` : `import.meta.env.DEV || ?atelier` → à garder identique.
  - `Encart({id, lang, atelier, grand})` lit `ENCARTS[id]` (image ou cadre + consigne en atelier) → copier dans `src/midnight/`, adapter la classe CSS (`pf-` → `ms-`) et ajouter le **prompt Gemini** (D5, absent du portfolio) affiché aussi en atelier.
  - `Page({folio, tete, classe, children})`, `Chapitre`/`Intertitre` : pas de chapitres façon CV pour Midnight ; remplacer par des composants propres au magazine (titre de récit + chapô, cf. sommaire).
  - `pagesDuLivre(lang, atelier)` : tableau de fonctions-page, dans l'ordre → même structure, mais 20 pages fixes (pas de données CV).
  - `enPlanches(pages)` : couverture seule à droite, puis paires, 4ᵉ seule à gauche → identique.
  - État `planche`/`tour` (tourne-page), clavier (flèches), glissé tactile (`onTouchStart/End`), `pf-pile` (pages empilées à l'impression et <768px) → identiques, juste renommer le préfixe.
  - Bandeau avec lien retour `/`, bouton imprimer, bascule FR/EN → identique ; **ajouter** le bandeau ÉPREUVE (D2) et la page d'attente (D2) comme deux rendus alternatifs avant le livre.
  - Le hash d'URL (`#planche`) sert à partager une page précise → garder.
- **`encarts.js`** : format `{image, ratio?, entier?, legende:{fr,en}, consigne}` → même format, + champ `promptGemini` (texte prêt à copier dans Gemini) exigé par D5. Sert aussi de liste à recopier dans RAPPORT.md.
- **`livreTexte.js`** : objets `{fr, en}` + `lt(v, lang)` → le même mécanisme `lt()` sera réutilisé ; `midnightTexte.js` ne portera que l'interface (bandeau, boutons, bandeau épreuve, page d'attente), pas les textes des récits (ceux-ci vivent dans `numeros/01.js`, par numéro, pas partagés FR/EN comme un lexique d'UI).
- **`portfolio.css`** (327 lignes) : variables locales préfixées `--pf-` sur `.pf-table`, mise en page `.pf-livre`/`.pf-cote`/`.pf-feuillet` (perspective 3D, `rotateY`, `backface-visibility`), zones cliquables `.pf-zone-*`, pagination par points, `.pf-pile` (téléphone/impression) → copier la mécanique de mise en page (livre/feuillet/zones/pile/impression) dans `midnight.css` en remplaçant les variables par les couleurs D6 (`--ms-jaune #f7c86a`, `--ms-rouge #e8352b`, `--ms-creme #f6ecd8`, `--ms-encre #16110c`) et les polices D6 (`--font-affiche` titres, `--font-chapo`/`--font-machine` récits, `--font-bd` bulles).
- **Route `/portfolio`** dans `App.jsx` (lazy import, `livre()` = `<Suspense fallback={null}>`, hors du `<Shell/>`) → même schéma pour `/midnight/:numero?` (D1).
- Pas touché à `src/portfolio/` (lecture seule, conforme à D1).
