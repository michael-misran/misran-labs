# Mission site-avant-apres — DECISIONS

Décisions prises sans Michael. Les décisions d'architecture sont dans SPEC.md.

| Date | Étape | Décision | Raison |
|---|---|---|---|
| 2026-09-28 | 0 | Paire dédiée `--primary-surface` / `--on-primary-surface`, `--on-primary` supprimé | `--primary` sert surtout d'accent (135 usages) : le foncer changerait toute l'identité ; une paire dédiée ne touche que le texte sur corail, et l'audit l'apparie correctement |
| 2026-09-28 | 0 | Blocs `[data-invert]` inchangés | Choix de Michael : corail vif sur les grands blocs |
| 2026-09-28 | 1 | Snapshot envoyé par la page vers un petit récepteur local (`recevoir-snapshot.mjs`, port 4174) plutôt que recopié à la main | Évite de retranscrire ~9 Ko de JSON ; le même outil sert à l'étape 7 |
| 2026-09-28 | 1 | Le snapshot liste les 120 noms de propriétés personnalisées trouvés dans les feuilles de style construites (build de `main` + cadrage), lus sur `:root` et sur un `<div data-invert>` temporaire | Couvre tous les tokens réellement déclarés, sans dépendre d'une liste écrite à la main |
| 2026-09-28 | 2 | Étape 2 faite par la session principale (Sonnet) au lieu de l'explorateur (Haiku) | Deux lancements du sous-agent refusés (« classifieur sans verdict ») ; règle README : une nouvelle tentative puis faire soi-même |
| 2026-09-28 | 2 | D5 limité aux 60 fichiers de l'échantillon lu par l'audit (l'audit ne lit que les 60 premiers fichiers de `src/` par ordre alphabétique) ; les 78 occurrences en dur y sont toutes | Les autres fichiers ne changent pas la mesure ; réduit le risque visuel et la taille du diff. À signaler dans le RAPPORT |
| 2026-09-28 | 2 | Espacement seulement pour `--space-*` (8, 12, 16, 24, 32) ; 10 px n'a aucun token semantic d'espacement (seulement `--radius-md`), donc reste en dur | Règle D5 : jamais un token d'un autre rôle |
| 2026-09-28 | 2 | Le critère « déjà tokenisées < 10 » ne sera vraisemblablement pas atteint (≈ 45 occurrences restent : paddings 2/10/20 px, blur, textes) | Il faudrait de nouveaux tokens d'espacement, hors périmètre ; recommandation pour le RAPPORT |
| 2026-09-28 | 3 | Bouton `danger` et pastille d'avertissement de LabTokens (fond `--error`) : texte → `--on-primary-surface` (crème en `:root`, comme avant) | `--on-primary` est supprimé ; seule différence : dans un bloc `[data-invert]`, ce texte passe de corail 500 à corail 700 (déjà illisible sur `--error` avant) |
| 2026-09-28 | 3 | Mesure intermédiaire : Accessibilité restait à 0 (paires primary/selected corrigées, mais 4 paires `[data-invert]` < 4,5 par choix de Michael → « toutes » et « 90 % » faux ; `focus-visible` faux : `TextField` et `Textarea` posaient `outline: none`). Retrait de `outline: 'none'` dans ces deux fichiers : l'anneau global `:focus-visible` de `tokens.css` (1 px, `--primary`, décalage 2 px) s'applique désormais en plus de l'anneau de bordure existant | Seule voie pour faire monter l'axe (critère d'acceptation 2) sans toucher aux blocs `[data-invert]`. Écart visuel volontaire, limité à l'état focus de ces deux champs ; à signaler dans le RAPPORT. Accessibilité : 0 → 1 |
| 2026-09-28 | 1 | `mesurer-audit.mjs` rejoue le mode GitHub avec les fichiers suivis par Git ; l'état « avant » = HEAD de la branche (main + cadrage) | Résultat identique à l'audit public : 0,8 / 3 (Arch. 2, Couv. 2, Access. 0, Comp. 0, Doc. 1, Gouv. 0) |
