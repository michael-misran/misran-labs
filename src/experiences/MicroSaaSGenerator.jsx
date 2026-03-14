import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAGES_DATA = {
  'Un outil de gestion de tâches pour équipes remote': {
    meta: { name: 'TaskFlow', tokens: '2 847', time: '3.2s', accent: '#7c3aed' },
    code: `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TaskFlow — Gestion de tâches pour équipes remote</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#111827;line-height:1}
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:64px;border-bottom:1px solid #f3f4f6;background:#fff;position:sticky;top:0;z-index:10}
.logo{font-weight:800;font-size:18px;color:#7c3aed;letter-spacing:-.02em}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:14px;color:#6b7280;text-decoration:none;font-weight:500}
.nav-links a:hover{color:#111827}
.nav-btn{background:#7c3aed;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:600;cursor:pointer}
.hero{padding:88px 48px 72px;max-width:880px;margin:0 auto;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:20px;padding:6px 16px;font-size:13px;color:#7c3aed;font-weight:500;margin-bottom:36px}
.badge .dot{width:6px;height:6px;border-radius:50%;background:#7c3aed;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
h1{font-size:clamp(36px,5vw,58px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:20px;color:#111827}
h1 span{color:#7c3aed}
.subtitle{font-size:18px;color:#6b7280;max-width:500px;margin:0 auto 40px;line-height:1.7}
.cta-group{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{background:#7c3aed;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.btn-secondary{background:#fff;color:#374151;border:2px solid #e5e7eb;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.features{padding:88px 48px;background:#fafafa}
.features-inner{max-width:920px;margin:0 auto}
.features-header{text-align:center;margin-bottom:56px}
.features-header h2{font-size:34px;font-weight:700;letter-spacing:-.02em;margin-bottom:12px;color:#111827}
.features-header p{font-size:16px;color:#6b7280}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;transition:border-color .2s,box-shadow .2s}
.card:hover{border-color:#7c3aed;box-shadow:0 4px 20px rgba(124,58,237,.08)}
.icon{font-size:28px;margin-bottom:16px}
.card h3{font-size:16px;font-weight:700;margin-bottom:8px;color:#111827}
.card p{font-size:14px;color:#6b7280;line-height:1.7}
.cta-section{background:linear-gradient(135deg,#4c1d95,#7c3aed);color:#fff;padding:88px 48px;text-align:center}
.cta-section h2{font-size:36px;font-weight:800;margin-bottom:16px;letter-spacing:-.02em}
.cta-section p{font-size:17px;opacity:.8;margin-bottom:40px;line-height:1.6}
.btn-white{background:#fff;color:#7c3aed;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer}
footer{padding:24px 48px;background:#fff;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#9ca3af}
footer a{color:#7c3aed;text-decoration:none}
@media(max-width:640px){.grid{grid-template-columns:1fr}.hero,.features{padding:60px 24px}.nav{padding:0 24px}}
</style>
</head>
<body>
<nav class="nav">
  <span class="logo">TaskFlow</span>
  <div class="nav-links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">Docs</a></div>
  <button class="nav-btn">Get started free</button>
</nav>
<section class="hero">
  <div class="badge"><span class="dot"></span>Nouveau — Synchronisation en temps réel</div>
  <h1>Vos équipes remote,<br><span>enfin synchronisées</span></h1>
  <p class="subtitle">TaskFlow centralise vos tâches, vos sprints et vos blockers en un seul endroit. Conçu pour les équipes distribuées qui veulent aller vite.</p>
  <div class="cta-group">
    <button class="btn-primary">Démarrer gratuitement →</button>
    <button class="btn-secondary">Voir la démo</button>
  </div>
</section>
<section class="features">
  <div class="features-inner">
    <div class="features-header">
      <h2>Tout ce dont votre équipe a besoin</h2>
      <p>Pas de fonctionnalités superflues. Juste l'essentiel, parfaitement exécuté.</p>
    </div>
    <div class="grid">
      <div class="card"><div class="icon">✅</div><h3>Kanban adaptatif</h3><p>Visualisez l'avancement en temps réel. Colonnes personnalisables selon votre workflow exact.</p></div>
      <div class="card"><div class="icon">🔄</div><h3>Synchro instantanée</h3><p>Chaque update visible par toute l'équipe en moins de 100ms. Zéro rafraîchissement manuel.</p></div>
      <div class="card"><div class="icon">📊</div><h3>Rapports automatiques</h3><p>Velocity, burndown, cycle time — tous vos KPIs générés automatiquement chaque fin de sprint.</p></div>
    </div>
  </div>
</section>
<section class="cta-section">
  <h2>Prêt à débloquer votre équipe ?</h2>
  <p>Rejoignez plus de 4 000 équipes qui utilisent TaskFlow au quotidien.</p>
  <button class="btn-white">Commencer — c'est gratuit</button>
</section>
<footer><p>© 2025 TaskFlow · Fait pour les équipes remote · <a href="#">Confidentialité</a></p></footer>
</body>
</html>`,
  },

  'Une app de suivi de budget personnel': {
    meta: { name: 'BudgetAI', tokens: '2 634', time: '2.9s', accent: '#059669' },
    code: `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>BudgetAI — Maîtrisez votre argent sans effort</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#111827;line-height:1}
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:64px;border-bottom:1px solid #f3f4f6;background:#fff;position:sticky;top:0;z-index:10}
.logo{font-weight:800;font-size:18px;color:#059669;letter-spacing:-.02em}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:14px;color:#6b7280;text-decoration:none;font-weight:500}
.nav-btn{background:#059669;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:600;cursor:pointer}
.hero{padding:88px 48px 72px;max-width:880px;margin:0 auto;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:20px;padding:6px 16px;font-size:13px;color:#059669;font-weight:500;margin-bottom:36px}
.badge .dot{width:6px;height:6px;border-radius:50%;background:#059669;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
h1{font-size:clamp(36px,5vw,58px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:20px;color:#111827}
h1 span{color:#059669}
.subtitle{font-size:18px;color:#6b7280;max-width:500px;margin:0 auto 40px;line-height:1.7}
.cta-group{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{background:#059669;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.btn-secondary{background:#fff;color:#374151;border:2px solid #e5e7eb;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.features{padding:88px 48px;background:#f0fdf4}
.features-inner{max-width:920px;margin:0 auto}
.features-header{text-align:center;margin-bottom:56px}
.features-header h2{font-size:34px;font-weight:700;letter-spacing:-.02em;margin-bottom:12px;color:#111827}
.features-header p{font-size:16px;color:#6b7280}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border:1px solid #d1fae5;border-radius:12px;padding:28px;transition:border-color .2s,box-shadow .2s}
.card:hover{border-color:#059669;box-shadow:0 4px 20px rgba(5,150,105,.08)}
.icon{font-size:28px;margin-bottom:16px}
.card h3{font-size:16px;font-weight:700;margin-bottom:8px;color:#111827}
.card p{font-size:14px;color:#6b7280;line-height:1.7}
.cta-section{background:linear-gradient(135deg,#064e3b,#059669);color:#fff;padding:88px 48px;text-align:center}
.cta-section h2{font-size:36px;font-weight:800;margin-bottom:16px;letter-spacing:-.02em}
.cta-section p{font-size:17px;opacity:.8;margin-bottom:40px;line-height:1.6}
.btn-white{background:#fff;color:#059669;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer}
footer{padding:24px 48px;background:#fff;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#9ca3af}
footer a{color:#059669;text-decoration:none}
@media(max-width:640px){.grid{grid-template-columns:1fr}.hero,.features{padding:60px 24px}.nav{padding:0 24px}}
</style>
</head>
<body>
<nav class="nav">
  <span class="logo">BudgetAI</span>
  <div class="nav-links"><a href="#">Fonctionnalités</a><a href="#">Tarifs</a><a href="#">Blog</a></div>
  <button class="nav-btn">Essayer gratuitement</button>
</nav>
<section class="hero">
  <div class="badge"><span class="dot"></span>IA intégrée — Catégorisation automatique</div>
  <h1>Votre argent,<br><span>enfin sous contrôle</span></h1>
  <p class="subtitle">BudgetAI analyse vos dépenses, prédit vos tendances et vous alerte avant que vous ne dépassiez votre budget. Zéro feuille Excel.</p>
  <div class="cta-group">
    <button class="btn-primary">Commencer gratuitement →</button>
    <button class="btn-secondary">Voir une démo</button>
  </div>
</section>
<section class="features">
  <div class="features-inner">
    <div class="features-header">
      <h2>L'IA qui comprend vos finances</h2>
      <p>Connectez vos comptes bancaires et laissez BudgetAI faire le travail.</p>
    </div>
    <div class="grid">
      <div class="card"><div class="icon">💰</div><h3>Suivi automatique</h3><p>Toutes vos dépenses catégorisées automatiquement. Alimentation, loyer, loisirs — tout est classé sans effort.</p></div>
      <div class="card"><div class="icon">📈</div><h3>Prédictions IA</h3><p>BudgetAI analyse vos habitudes et prédit vos dépenses futures avec 94% de précision sur les 30 derniers jours.</p></div>
      <div class="card"><div class="icon">🎯</div><h3>Objectifs d'épargne</h3><p>Définissez un objectif, BudgetAI calcule votre plan d'épargne optimal et vous envoie des rappels personnalisés.</p></div>
    </div>
  </div>
</section>
<section class="cta-section">
  <h2>Reprenez le contrôle de vos finances</h2>
  <p>Rejoignez 12 000 utilisateurs qui économisent en moyenne 340€ par mois.</p>
  <button class="btn-white">Commencer — c'est gratuit</button>
</section>
<footer><p>© 2025 BudgetAI · Vos données restent les vôtres · <a href="#">Politique de confidentialité</a></p></footer>
</body>
</html>`,
  },

  'Un SaaS de feedback client automatisé': {
    meta: { name: 'FeedbackLoop', tokens: '2 991', time: '3.5s', accent: '#ea580c' },
    code: `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>FeedbackLoop — Le feedback client qui se collecte tout seul</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#111827;line-height:1}
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:64px;border-bottom:1px solid #f3f4f6;background:#fff;position:sticky;top:0;z-index:10}
.logo{font-weight:800;font-size:18px;color:#ea580c;letter-spacing:-.02em}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:14px;color:#6b7280;text-decoration:none;font-weight:500}
.nav-btn{background:#ea580c;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:600;cursor:pointer}
.hero{padding:88px 48px 72px;max-width:880px;margin:0 auto;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff7ed;border:1px solid #fed7aa;border-radius:20px;padding:6px 16px;font-size:13px;color:#ea580c;font-weight:500;margin-bottom:36px}
.badge .dot{width:6px;height:6px;border-radius:50%;background:#ea580c;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
h1{font-size:clamp(36px,5vw,58px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:20px;color:#111827}
h1 span{color:#ea580c}
.subtitle{font-size:18px;color:#6b7280;max-width:520px;margin:0 auto 40px;line-height:1.7}
.cta-group{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{background:#ea580c;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.btn-secondary{background:#fff;color:#374151;border:2px solid #e5e7eb;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.features{padding:88px 48px;background:#fafafa}
.features-inner{max-width:920px;margin:0 auto}
.features-header{text-align:center;margin-bottom:56px}
.features-header h2{font-size:34px;font-weight:700;letter-spacing:-.02em;margin-bottom:12px;color:#111827}
.features-header p{font-size:16px;color:#6b7280}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;transition:border-color .2s,box-shadow .2s}
.card:hover{border-color:#ea580c;box-shadow:0 4px 20px rgba(234,88,12,.08)}
.icon{font-size:28px;margin-bottom:16px}
.card h3{font-size:16px;font-weight:700;margin-bottom:8px;color:#111827}
.card p{font-size:14px;color:#6b7280;line-height:1.7}
.cta-section{background:linear-gradient(135deg,#7c2d12,#ea580c);color:#fff;padding:88px 48px;text-align:center}
.cta-section h2{font-size:36px;font-weight:800;margin-bottom:16px;letter-spacing:-.02em}
.cta-section p{font-size:17px;opacity:.8;margin-bottom:40px;line-height:1.6}
.btn-white{background:#fff;color:#ea580c;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer}
footer{padding:24px 48px;background:#fff;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#9ca3af}
footer a{color:#ea580c;text-decoration:none}
@media(max-width:640px){.grid{grid-template-columns:1fr}.hero,.features{padding:60px 24px}.nav{padding:0 24px}}
</style>
</head>
<body>
<nav class="nav">
  <span class="logo">FeedbackLoop</span>
  <div class="nav-links"><a href="#">Intégrations</a><a href="#">Tarifs</a><a href="#">Cas clients</a></div>
  <button class="nav-btn">Démo gratuite</button>
</nav>
<section class="hero">
  <div class="badge"><span class="dot"></span>Setup en 5 minutes — Aucun code requis</div>
  <h1>Le feedback client qui<br><span>se collecte tout seul</span></h1>
  <p class="subtitle">FeedbackLoop déclenche les bons questionnaires au bon moment, analyse les réponses avec l'IA et livre les insights directement dans votre Slack.</p>
  <div class="cta-group">
    <button class="btn-primary">Essayer 14 jours gratuits →</button>
    <button class="btn-secondary">Voir une démo live</button>
  </div>
</section>
<section class="features">
  <div class="features-inner">
    <div class="features-header">
      <h2>Du feedback à l'action en quelques minutes</h2>
      <p>Plus besoin de Google Forms. FeedbackLoop gère tout le cycle, de la collecte à l'insight.</p>
    </div>
    <div class="grid">
      <div class="card"><div class="icon">💬</div><h3>Déclencheurs intelligents</h3><p>Envoyez des surveys au bon moment : après un achat, après 30 jours d'utilisation, après une résolution support.</p></div>
      <div class="card"><div class="icon">📊</div><h3>Analyse NPS automatique</h3><p>Score NPS calculé en temps réel avec segmentation automatique des verbatims par thématique et sentiment.</p></div>
      <div class="card"><div class="icon">🤖</div><h3>Résumés IA hebdomadaires</h3><p>Chaque lundi, un résumé des feedbacks de la semaine avec les 3 actions prioritaires recommandées par l'IA.</p></div>
    </div>
  </div>
</section>
<section class="cta-section">
  <h2>Arrêtez de deviner ce que veulent vos clients</h2>
  <p>Plus de 800 équipes product utilisent FeedbackLoop pour piloter leur roadmap.</p>
  <button class="btn-white">Commencer gratuitement</button>
</section>
<footer><p>© 2025 FeedbackLoop · RGPD compliant · <a href="#">Politique de confidentialité</a></p></footer>
</body>
</html>`,
  },

  __fallback__: {
    meta: { name: 'LaunchKit', tokens: '2 512', time: '2.8s', accent: '#2563eb' },
    code: `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>LaunchKit — Lancez votre SaaS en quelques jours</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#111827;line-height:1}
.nav{display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:64px;border-bottom:1px solid #f3f4f6;background:#fff;position:sticky;top:0;z-index:10}
.logo{font-weight:800;font-size:18px;color:#2563eb;letter-spacing:-.02em}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:14px;color:#6b7280;text-decoration:none;font-weight:500}
.nav-btn{background:#2563eb;color:#fff;border:none;border-radius:8px;padding:9px 20px;font-size:14px;font-weight:600;cursor:pointer}
.hero{padding:88px 48px 72px;max-width:880px;margin:0 auto;text-align:center}
.badge{display:inline-flex;align-items:center;gap:8px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:6px 16px;font-size:13px;color:#2563eb;font-weight:500;margin-bottom:36px}
.badge .dot{width:6px;height:6px;border-radius:50%;background:#2563eb;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
h1{font-size:clamp(36px,5vw,58px);font-weight:800;line-height:1.1;letter-spacing:-.03em;margin-bottom:20px;color:#111827}
h1 span{color:#2563eb}
.subtitle{font-size:18px;color:#6b7280;max-width:500px;margin:0 auto 40px;line-height:1.7}
.cta-group{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-primary{background:#2563eb;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.btn-secondary{background:#fff;color:#374151;border:2px solid #e5e7eb;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer}
.features{padding:88px 48px;background:#f8faff}
.features-inner{max-width:920px;margin:0 auto}
.features-header{text-align:center;margin-bottom:56px}
.features-header h2{font-size:34px;font-weight:700;letter-spacing:-.02em;margin-bottom:12px;color:#111827}
.features-header p{font-size:16px;color:#6b7280}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:28px;transition:border-color .2s,box-shadow .2s}
.card:hover{border-color:#2563eb;box-shadow:0 4px 20px rgba(37,99,235,.08)}
.icon{font-size:28px;margin-bottom:16px}
.card h3{font-size:16px;font-weight:700;margin-bottom:8px;color:#111827}
.card p{font-size:14px;color:#6b7280;line-height:1.7}
.cta-section{background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;padding:88px 48px;text-align:center}
.cta-section h2{font-size:36px;font-weight:800;margin-bottom:16px;letter-spacing:-.02em}
.cta-section p{font-size:17px;opacity:.8;margin-bottom:40px;line-height:1.6}
.btn-white{background:#fff;color:#2563eb;border:none;border-radius:10px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer}
footer{padding:24px 48px;background:#fff;border-top:1px solid #f3f4f6;text-align:center;font-size:13px;color:#9ca3af}
footer a{color:#2563eb;text-decoration:none}
@media(max-width:640px){.grid{grid-template-columns:1fr}.hero,.features{padding:60px 24px}.nav{padding:0 24px}}
</style>
</head>
<body>
<nav class="nav">
  <span class="logo">LaunchKit</span>
  <div class="nav-links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">Docs</a></div>
  <button class="nav-btn">Get started free</button>
</nav>
<section class="hero">
  <div class="badge"><span class="dot"></span>Nouveau — Généré par IA en 3 secondes</div>
  <h1>De l'idée au produit,<br><span>sans friction</span></h1>
  <p class="subtitle">LaunchKit vous donne les briques essentielles pour valider, construire et lancer votre SaaS en quelques jours, pas en quelques mois.</p>
  <div class="cta-group">
    <button class="btn-primary">Démarrer gratuitement →</button>
    <button class="btn-secondary">Voir la démo</button>
  </div>
</section>
<section class="features">
  <div class="features-inner">
    <div class="features-header">
      <h2>Tout pour aller de zéro à production</h2>
      <p>Les fondations techniques, le design system et la structure produit — déjà faits.</p>
    </div>
    <div class="grid">
      <div class="card"><div class="icon">🚀</div><h3>Boilerplate production-ready</h3><p>Auth, paiements, emails, dashboard admin — tout est pré-configuré. Concentrez-vous sur votre valeur ajoutée.</p></div>
      <div class="card"><div class="icon">⚡</div><h3>Deploy en un clic</h3><p>CI/CD intégré, preview deployments, variables d'environnement gérées. En ligne en moins de 10 minutes.</p></div>
      <div class="card"><div class="icon">🎯</div><h3>Analytics intégrés</h3><p>Acquisition, activation, rétention — tous vos KPIs SaaS mesurés dès le premier utilisateur.</p></div>
    </div>
  </div>
</section>
<section class="cta-section">
  <h2>Votre prochain SaaS commence ici</h2>
  <p>Rejoignez 2 000 founders qui ont lancé leur produit avec LaunchKit.</p>
  <button class="btn-white">Commencer gratuitement</button>
</section>
<footer><p>© 2025 LaunchKit · Fait pour les builders · <a href="#">Confidentialité</a></p></footer>
</body>
</html>`,
  },
}

const CHIPS = [
  'Un outil de gestion de tâches pour équipes remote',
  'Une app de suivi de budget personnel',
  'Un SaaS de feedback client automatisé',
]

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const { pathname } = useLocation()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 64,
        background: 'rgba(10,14,23,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,42,58,0.8)',
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: '#25e2cc',
          letterSpacing: '0.06em',
          textDecoration: 'none',
        }}
      >
        MISRAN LABS
      </Link>

      <div style={{ display: 'flex', gap: 36 }}>
        {[
          { label: 'Lab', to: '/lab' },
          { label: 'Process', to: '/process' },
          { label: 'DS', to: '/design-system' },
          { label: 'Contact', to: '/contact' },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: pathname === to ? '#e8f4f8' : '#7a9bb5',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
              borderBottom: pathname === to ? '1px solid #25e2cc' : '1px solid transparent',
              paddingBottom: 2,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

// ─── Micro-SaaS Generator ─────────────────────────────────────────────────────

export default function MicroSaaSGenerator() {
  const [input, setInput] = useState('')
  const [phase, setPhase] = useState('idle')
  const [view, setView] = useState('code')
  const [streamIndex, setStreamIndex] = useState(0)
  const [currentData, setCurrentData] = useState(null)
  const intervalRef = useRef(null)
  const codeEndRef = useRef(null)

  function handleGenerate() {
    if (!input.trim() || phase === 'streaming') return
    clearInterval(intervalRef.current)

    const data = PAGES_DATA[input.trim()] ?? PAGES_DATA.__fallback__
    setCurrentData(data)
    setStreamIndex(0)
    setPhase('streaming')
    setView('code')

    let idx = 0
    intervalRef.current = setInterval(() => {
      idx += 8
      if (idx >= data.code.length) {
        setStreamIndex(data.code.length)
        setPhase('done')
        clearInterval(intervalRef.current)
      } else {
        setStreamIndex(idx)
      }
    }, 15)
  }

  function handleReset() {
    clearInterval(intervalRef.current)
    setInput('')
    setPhase('idle')
    setView('code')
    setStreamIndex(0)
    setCurrentData(null)
  }

  function handleChip(chip) {
    setInput(chip)
    setPhase('idle')
    setStreamIndex(0)
    setCurrentData(null)
  }

  useEffect(() => {
    if (codeEndRef.current && phase === 'streaming') {
      codeEndRef.current.scrollIntoView({ block: 'end' })
    }
  }, [streamIndex, phase])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const displayedCode = currentData ? currentData.code.slice(0, streamIndex) : ''
  const canToggle = phase !== 'idle' && currentData

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0e17; }
        a { text-decoration: none; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .chip:hover { border-color: #25e2cc !important; color: #25e2cc !important; }
        .generate-btn:hover:not(:disabled) { background: rgba(37,226,204,0.22) !important; }
        .reset-btn:hover { background: rgba(37,226,204,0.22) !important; }
        textarea::placeholder { color: #4a7a94; }
        textarea:focus { outline: none; }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: '#0a0e17',
          backgroundImage:
            'linear-gradient(rgba(26,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,42,58,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: '#e8f4f8',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <Nav />

        <main style={{ maxWidth: 1080, margin: '0 auto', padding: '96px 40px 80px' }}>

          {/* ── Back link ── */}
          <Link
            to="/lab"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#7a9bb5',
              letterSpacing: '0.06em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 40,
              transition: 'color 0.15s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e8f4f8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#7a9bb5')}
          >
            ← Lab
          </Link>

          {/* ── 2 columns ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 32,
              alignItems: 'start',
            }}
          >

            {/* ── Left: Control panel ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#7a9bb5',
                    border: '1px solid #243545',
                    borderRadius: 3,
                    padding: '2px 8px',
                    letterSpacing: '0.08em',
                  }}
                >
                  EXP-005
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#25e2cc',
                    border: '1px solid #25e2cc',
                    borderRadius: 3,
                    padding: '2px 8px',
                    letterSpacing: '0.1em',
                  }}
                >
                  READY
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#f59e0b',
                    border: '1px solid rgba(245,158,11,0.4)',
                    borderRadius: 3,
                    padding: '2px 8px',
                    letterSpacing: '0.1em',
                    background: 'rgba(245,158,11,0.06)',
                  }}
                >
                  SIMULATION
                </span>
              </div>

              {/* Title + description */}
              <div>
                <h1
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(24px, 3.5vw, 36px)',
                    fontWeight: 700,
                    color: '#e8f4f8',
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  Micro-SaaS Generator
                </h1>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7a9bb5', lineHeight: 1.6 }}>
                  Une phrase → landing page complète générée en streaming
                </p>
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['React', 'Streaming simulé', 'HTML'].map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: '#4a7a94',
                      background: 'rgba(26,42,58,0.6)',
                      border: '1px solid #1a2a3a',
                      borderRadius: 3,
                      padding: '2px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ height: 1, background: '#1a2a3a' }} />

              {/* Chips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CHIPS.map(chip => (
                  <button
                    key={chip}
                    className="chip"
                    onClick={() => handleChip(chip)}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: input === chip ? '#25e2cc' : '#7a9bb5',
                      background: 'transparent',
                      border: `1px solid ${input === chip ? '#25e2cc' : '#243545'}`,
                      borderRadius: 6,
                      padding: '8px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      letterSpacing: '0.02em',
                      lineHeight: 1.5,
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleGenerate() } }}
                placeholder="Décris ton produit en une phrase..."
                rows={2}
                style={{
                  background: '#060a10',
                  border: '1px solid #1a2a3a',
                  borderRadius: 8,
                  padding: '14px 16px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: '#e8f4f8',
                  lineHeight: 1.6,
                  resize: 'none',
                  width: '100%',
                  transition: 'border-color 0.15s ease',
                }}
              />

              {/* Generate button */}
              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={!input.trim() || phase === 'streaming'}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: !input.trim() ? '#4a7a94' : '#25e2cc',
                  background: !input.trim() ? 'rgba(26,42,58,0.3)' : 'rgba(37,226,204,0.12)',
                  border: `1px solid ${!input.trim() ? '#243545' : '#25e2cc'}`,
                  borderRadius: 6,
                  padding: '13px 24px',
                  cursor: !input.trim() || phase === 'streaming' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em',
                  opacity: phase === 'streaming' ? 0.6 : 1,
                }}
              >
                {phase === 'streaming' ? 'GÉNÉRATION EN COURS...' : 'GÉNÉRER →'}
              </button>

              {/* Meta info box */}
              {phase === 'done' && currentData && (
                <div
                  style={{
                    background: '#0d1220',
                    border: '1px solid #1a2a3a',
                    borderRadius: 6,
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ color: currentData.meta.accent, fontSize: 14 }}>✦</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#c4d8e8',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {currentData.meta.name}
                  </span>
                  <span style={{ color: '#1a2a3a', fontSize: 12 }}>·</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#7a9bb5',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {currentData.meta.tokens} tokens
                  </span>
                  <span style={{ color: '#1a2a3a', fontSize: 12 }}>·</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: '#7a9bb5',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {currentData.meta.time}
                  </span>
                </div>
              )}

              {/* Reset button */}
              {phase === 'done' && (
                <button
                  className="reset-btn"
                  onClick={handleReset}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#25e2cc',
                    background: 'rgba(37,226,204,0.12)',
                    border: '1px solid #25e2cc',
                    borderRadius: 6,
                    padding: '13px 24px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    letterSpacing: '0.02em',
                  }}
                >
                  NOUVELLE GÉNÉRATION →
                </button>
              )}

              {/* Footer note */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#4a7a94',
                  letterSpacing: '0.04em',
                }}
              >
                {'// Simulation — voir le vrai appel API sur GitHub'}
              </span>
            </div>

            {/* ── Right: Output ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* Header + toggle */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#0d1220',
                  border: '1px solid #1a2a3a',
                  borderBottom: 'none',
                  borderRadius: '8px 8px 0 0',
                  padding: '12px 20px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: '#25e2cc',
                    letterSpacing: '0.1em',
                  }}
                >
                  {'// OUTPUT'}
                </span>

                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { id: 'code', label: '< CODE' },
                    { id: 'preview', label: 'PREVIEW >' },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => canToggle && setView(id)}
                      disabled={!canToggle}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        padding: '4px 12px',
                        borderRadius: 3,
                        border: `1px solid ${view === id && canToggle ? '#25e2cc' : '#243545'}`,
                        background: view === id && canToggle ? 'rgba(37,226,204,0.12)' : 'transparent',
                        color: view === id && canToggle ? '#25e2cc' : '#4a7a94',
                        cursor: canToggle ? 'pointer' : 'not-allowed',
                        transition: 'all 0.15s ease',
                        opacity: !canToggle ? 0.5 : 1,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output body */}
              <div
                style={{
                  background: '#060a10',
                  border: '1px solid #1a2a3a',
                  borderRadius: '0 0 8px 8px',
                  minHeight: 520,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Idle */}
                {phase === 'idle' && (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      color: '#4a7a94',
                      letterSpacing: '0.04em',
                      minHeight: 520,
                    }}
                  >
                    En attente d'une description...
                  </div>
                )}

                {/* Code view */}
                {phase !== 'idle' && view === 'code' && (
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: '20px 24px',
                      maxHeight: 520,
                    }}
                  >
                    <pre
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: '#7a9bb5',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                      }}
                    >
                      {displayedCode}
                      {phase === 'streaming' && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: 8,
                            height: '1em',
                            background: '#25e2cc',
                            marginLeft: 1,
                            verticalAlign: 'text-bottom',
                            animation: 'blink 0.8s step-end infinite',
                          }}
                        />
                      )}
                    </pre>
                    <div ref={codeEndRef} />
                  </div>
                )}

                {/* Preview iframe */}
                {phase !== 'idle' && view === 'preview' && currentData && (
                  <iframe
                    srcDoc={phase === 'done' ? currentData.code : displayedCode}
                    style={{
                      flex: 1,
                      border: 'none',
                      width: '100%',
                      height: 520,
                      display: 'block',
                    }}
                    title="Landing page preview"
                    sandbox="allow-scripts"
                  />
                )}
              </div>
            </div>

          </div>

        </main>
      </div>
    </>
  )
}
