# Mission menu-mobile — PROGRESS

**Statut :** étape 2 terminée
**Prochaine action :** étape 3 (correction D1 : `--mobile-nav-offset`)
**Blocages :** aucun

## État initial (2026-09-30, commit 0993db0 de main)
- `npm run build` : OK (sitemap.xml : 22 URL)
- `npm run lint` : OK, aucune erreur

## Mesure avant correction (2026-09-30, verificateur/Haiku)
À 375×812, sur les 7 pages du critère 1 (`/`, `/magazine`, `/magazine/2026-09-28`, `/breves`, `/breves/2026-09-30`, `/projets`, `/lab/design-system`) :
- Chevauchement vertical confirmé partout entre le bouton ☰ (rect Y ≈ 76-106) et le premier élément de contenu (Y ≈ 32).
- `document.documentElement.scrollWidth` = 375 partout : pas de défilement horizontal (déjà OK, à ne pas casser).

En 1280×900 (desktop), référence avant correction pour le critère d'acceptation 3 :
- `/magazine` : top du premier élément de contenu = 32px
- `/breves` : top du premier élément de contenu = 32px
(à revérifier identique après la correction D1, qui ne doit s'appliquer qu'en mobile)
