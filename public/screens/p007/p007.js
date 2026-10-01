// Soon (P-007) — utilitaires partagés : thème, dates, compte à rebours, données d'exemple.
(function () {
  'use strict';

  const THEME_KEY = 'p007-theme';
  const DEFAULT_THEME = 'papier';

  function getTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-tab]').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-theme-tab') === theme ? 'true' : 'false');
    });
    const select = document.querySelector('[data-theme-select]');
    if (select) select.value = theme;
  }

  function setTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* localStorage indisponible : le thème reste actif pour cette page seulement */
    }
    applyTheme(theme);
  }

  function initTheme() {
    applyTheme(getTheme());
    document.querySelectorAll('[data-theme-tab]').forEach((btn) => {
      btn.addEventListener('click', () => setTheme(btn.getAttribute('data-theme-tab')));
    });
    const select = document.querySelector('[data-theme-select]');
    if (select) {
      select.value = getTheme();
      select.addEventListener('change', () => setTheme(select.value));
    }
  }

  // ---------- Dates ----------

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  // Différence en jours calendaires (minuit à minuit), jamais par tranches de 24 h.
  function daysBetween(from, to) {
    const a = startOfDay(from).getTime();
    const b = startOfDay(to).getTime();
    return Math.round((b - a) / 86400000);
  }

  function nextAnnualDate(month, day) {
    const now = new Date();
    let candidate = new Date(now.getFullYear(), month - 1, day);
    if (startOfDay(candidate) < startOfDay(now)) {
      candidate = new Date(now.getFullYear() + 1, month - 1, day);
    }
    return candidate;
  }

  function dayLabel(days) {
    if (days === 0) return "Aujourd'hui !";
    if (days === 1) return 'Demain';
    if (days > 1) return `dans ${days} jours`;
    if (days === -1) return 'il y a 1 jour';
    return `il y a ${-days} jours`;
  }

  function formatFullDate(date) {
    const s = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Jours en calendaire (D8) + heures/minutes/secondes qui décomptent jusqu'à minuit prochain
  // (le chiffre des jours ne change qu'à minuit, jamais par division de la durée totale par 24h).
  function getCountdown(target, now) {
    now = now || new Date();
    const days = daysBetween(now, target);
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const msLeft = Math.max(0, nextMidnight.getTime() - now.getTime());
    const totalSeconds = Math.floor(msLeft / 1000);
    return {
      days,
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }

  function progressRatio(created, target, now) {
    now = now || new Date();
    const total = daysBetween(created, target);
    if (total <= 0) return 1;
    const elapsed = daysBetween(created, now);
    return Math.min(1, Math.max(0, elapsed / total));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---------- Données d'exemple (relatives à aujourd'hui : la maquette ne vieillit jamais) ----------

  function buildSampleEvents() {
    const now = new Date();
    return [
      {
        id: 'lisbonne',
        emoji: '🌴',
        name: 'Vacances à Lisbonne',
        date: addDays(now, 12),
        created: addDays(now, -30),
        pop: 'pop-1',
      },
      {
        id: 'lea',
        emoji: '🎂',
        name: 'Anniversaire de Léa',
        date: addDays(now, 3),
        created: addDays(now, -60),
        pop: 'pop-2',
      },
      {
        id: 'concert',
        emoji: '🎸',
        name: 'Concert',
        date: addDays(now, 47),
        created: addDays(now, -20),
        pop: 'pop-3',
      },
      {
        id: 'demenagement',
        emoji: '📦',
        name: 'Déménagement',
        date: addDays(now, 90),
        created: addDays(now, -10),
        pop: 'pop-4',
      },
      {
        id: 'noel',
        emoji: '🎄',
        name: 'Noël',
        date: nextAnnualDate(12, 25),
        created: new Date(now.getFullYear(), 0, 1),
        pop: 'pop-1',
      },
    ].sort((a, b) => a.date - b.date);
  }

  // ---------- Rendu des widgets (réutilisé par widgets.html et l'aperçu de creation.html) ----------

  function widgetPetitHTML(ev) {
    const c = getCountdown(ev.date);
    return `
      <div class="widget widget--petit ${ev.pop || ''}">
        <div class="widget-emoji">${ev.emoji}</div>
        <div class="widget-days">${c.days}</div>
        <div class="widget-name">${escapeHtml(ev.name)}</div>
      </div>`;
  }

  function widgetMoyenHTML(events) {
    const [main, ...rest] = events;
    const c = getCountdown(main.date);
    const nextItems = rest
      .slice(0, 2)
      .map((ev) => {
        const cc = getCountdown(ev.date);
        return `<div class="widget-next-item"><span class="n">${cc.days} j</span><span class="name">${escapeHtml(ev.emoji)} ${escapeHtml(ev.name)}</span></div>`;
      })
      .join('');
    return `
      <div class="widget widget--moyen ${main.pop || ''}">
        <div class="widget-main">
          <div class="widget-emoji">${main.emoji}</div>
          <div class="widget-days">${c.days}</div>
          <div class="widget-name">${escapeHtml(main.name)}</div>
        </div>
        <div class="widget-next-list">${nextItems}</div>
      </div>`;
  }

  function widgetGrandHTML(events) {
    const [main, ...rest] = events;
    const c = getCountdown(main.date);
    const ratio = progressRatio(main.created, main.date);
    const nextItems = rest
      .slice(0, 3)
      .map((ev) => {
        const cc = getCountdown(ev.date);
        return `<div class="widget-next-item"><span class="n">${cc.days} j</span><span class="name">${escapeHtml(ev.emoji)} ${escapeHtml(ev.name)}</span></div>`;
      })
      .join('');
    return `
      <div class="widget widget--grand ${main.pop || ''}">
        <div>
          <div class="widget-emoji">${main.emoji}</div>
          <div class="widget-days">${c.days}</div>
          <div class="widget-name">${escapeHtml(main.name)}</div>
          <div class="widget-hms">
            <span><b>${c.hours}</b> h</span>
            <span><b>${c.minutes}</b> min</span>
          </div>
        </div>
        <div class="widget-progress"><span style="width:${Math.round(ratio * 100)}%"></span></div>
        <div class="widget-next-list">${nextItems}</div>
      </div>`;
  }

  function widgetLockRectHTML(ev) {
    const c = getCountdown(ev.date);
    return `<div class="widget--lock">${ev.emoji} ${c.days} j · ${escapeHtml(ev.name.split(' ').slice(-1)[0])}</div>`;
  }

  function widgetLockCircleHTML(ev) {
    const c = getCountdown(ev.date);
    return `<div class="widget--lock-circle"><span>${ev.emoji}</span><span>${c.days} j</span></div>`;
  }

  // ---------- Barre de statut (heure, réseau, batterie), identique sur tous les écrans ----------

  function statusBarHTML() {
    return `
      <span>9:41</span>
      <span class="status-icons">
        <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor"/><rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M8 10.5a1 1 0 100-2 1 1 0 000 2zM4.5 7.2a5 5 0 017 0M2 4.6a8.5 8.5 0 0112 0" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor"/><rect x="22.5" y="4" width="2" height="4" rx="1" fill="currentColor"/></svg>
      </span>`;
  }

  function renderStatusBars() {
    document.querySelectorAll('[data-status-bar]').forEach((el) => {
      el.innerHTML = statusBarHTML();
    });
  }

  window.P007 = {
    THEME_KEY,
    getTheme,
    setTheme,
    applyTheme,
    initTheme,
    renderStatusBars,
    startOfDay,
    addDays,
    daysBetween,
    nextAnnualDate,
    dayLabel,
    formatFullDate,
    getCountdown,
    progressRatio,
    escapeHtml,
    buildSampleEvents,
    widgetPetitHTML,
    widgetMoyenHTML,
    widgetGrandHTML,
    widgetLockRectHTML,
    widgetLockCircleHTML,
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderStatusBars();
  });
})();
