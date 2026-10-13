// La Marque (P-006) — utilitaires partagés : stockage de la partie, partie d'exemple, rendu commun.
// Dépend de p006-calcul.js (window.TarotCalcul), chargé avant ce fichier.
(function () {
  'use strict';

  var STOCKAGE_CLE = 'p006-partie';
  var NOMS_CONTRAT = {
    petite: 'Petite',
    garde: 'Garde',
    'garde-sans': 'Garde sans',
    'garde-contre': 'Garde contre',
  };

  // ---------- Stockage (D10) ----------

  function chargerPartie() {
    try {
      var brut = localStorage.getItem(STOCKAGE_CLE);
      return brut ? JSON.parse(brut) : null;
    } catch {
      return null;
    }
  }

  function sauvegarderPartie(partie) {
    try {
      localStorage.setItem(STOCKAGE_CLE, JSON.stringify(partie));
    } catch {
      /* localStorage indisponible : la partie reste active pour cette page seulement */
    }
  }

  function effacerPartie() {
    try {
      localStorage.removeItem(STOCKAGE_CLE);
    } catch {
      /* rien à faire si localStorage est indisponible */
    }
  }

  // Partie réelle si elle existe, sinon la partie d'exemple (D10 : chaque écran doit être présentable seul).
  function obtenirPartieCourante() {
    var partie = chargerPartie();
    return partie || buildSampleGame();
  }

  function nouvellePartieVide(joueurs) {
    return {
      nbJoueurs: joueurs.length,
      joueurs: joueurs,
      donnes: [],
      creeLe: Date.now(),
    };
  }

  function calculerEtAjouterDonne(partie, saisie) {
    var resultat = window.TarotCalcul.calculerDonne(saisie);
    var donne = {
      preneur: saisie.preneur,
      appele: saisie.appele === undefined ? null : saisie.appele,
      contrat: saisie.contrat,
      bouts: saisie.bouts,
      pointsRealises: saisie.pointsRealises,
      petitAuBout: saisie.petitAuBout,
      poignee: saisie.poignee,
      chelem: saisie.chelem,
      pointsAFaire: resultat.pointsAFaire,
      ecart: resultat.ecart,
      attaqueReussie: resultat.attaqueReussie,
      resultatLabel: resultat.resultatLabel,
      scores: resultat.scores,
    };
    partie.donnes.push(donne);
    sauvegarderPartie(partie);
    return donne;
  }

  function remplacerDonne(partie, index, saisie) {
    var resultat = window.TarotCalcul.calculerDonne(saisie);
    partie.donnes[index] = {
      preneur: saisie.preneur,
      appele: saisie.appele === undefined ? null : saisie.appele,
      contrat: saisie.contrat,
      bouts: saisie.bouts,
      pointsRealises: saisie.pointsRealises,
      petitAuBout: saisie.petitAuBout,
      poignee: saisie.poignee,
      chelem: saisie.chelem,
      pointsAFaire: resultat.pointsAFaire,
      ecart: resultat.ecart,
      attaqueReussie: resultat.attaqueReussie,
      resultatLabel: resultat.resultatLabel,
      scores: resultat.scores,
    };
    sauvegarderPartie(partie);
  }

  function supprimerDonne(partie, index) {
    partie.donnes.splice(index, 1);
    sauvegarderPartie(partie);
  }

  // ---------- Totaux ----------

  function totauxParJoueur(partie) {
    var totaux = new Array(partie.nbJoueurs).fill(0);
    partie.donnes.forEach(function (d) {
      d.scores.forEach(function (v, i) {
        totaux[i] += v;
      });
    });
    return totaux;
  }

  // Index du ou des joueurs en tête (plusieurs en cas d'égalité) ; [] si aucune donne jouée.
  function quiMene(partie) {
    if (partie.donnes.length === 0) return [];
    var totaux = totauxParJoueur(partie);
    var max = Math.max.apply(null, totaux);
    var meneurs = [];
    totaux.forEach(function (v, i) {
      if (v === max) meneurs.push(i);
    });
    return meneurs;
  }

  // ---------- Libellés ----------

  function libelleContrat(contrat) {
    return NOMS_CONTRAT[contrat] || contrat;
  }

  function libellePetitAuBout(petitAuBout) {
    if (petitAuBout === 'attaque') return 'Petit au bout (attaque)';
    if (petitAuBout === 'defense') return 'Petit au bout (défense)';
    return '';
  }

  function libellePoignee(poignee) {
    if (!poignee || !poignee.type) return '';
    var noms = { simple: 'Poignée simple', double: 'Poignée double', triple: 'Poignée triple' };
    return noms[poignee.type] || '';
  }

  function libelleChelem(chelem) {
    if (chelem === 'annonce-reussi') return 'Chelem annoncé réussi';
    if (chelem === 'non-annonce-reussi') return 'Chelem non annoncé';
    if (chelem === 'annonce-rate') return 'Chelem annoncé raté';
    return '';
  }

  function resumeDonneCourte(donne, joueurs) {
    var morceaux = [joueurs[donne.preneur] + ' · ' + libelleContrat(donne.contrat)];
    if (donne.petitAuBout && donne.petitAuBout !== 'aucun') morceaux.push(libellePetitAuBout(donne.petitAuBout));
    if (donne.poignee && donne.poignee.type) morceaux.push(libellePoignee(donne.poignee));
    if (donne.chelem && donne.chelem !== 'aucun') morceaux.push(libelleChelem(donne.chelem));
    return morceaux.join(' · ');
  }

  // ---------- Formatage des scores ----------

  function classeScore(valeur) {
    if (valeur > 0) return 'positif';
    if (valeur < 0) return 'negatif';
    return '';
  }

  function texteScore(valeur) {
    return valeur > 0 ? '+' + valeur : String(valeur);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ---------- Partie d'exemple (D10) : 4 joueurs, 6 donnes variées ----------

  function buildSampleGame() {
    var joueurs = ['Léa', 'Hugo', 'Inès', 'Malik'];
    var partie = nouvellePartieVide(joueurs);
    var saisies = [
      { preneur: 0, contrat: 'petite', bouts: 1, pointsRealises: 56, petitAuBout: 'aucun', poignee: null, chelem: 'aucun', nbJoueurs: 4 },
      { preneur: 1, contrat: 'garde', bouts: 0, pointsRealises: 40, petitAuBout: 'aucun', poignee: null, chelem: 'aucun', nbJoueurs: 4 },
      { preneur: 2, contrat: 'petite', bouts: 2, pointsRealises: 50, petitAuBout: 'attaque', poignee: null, chelem: 'aucun', nbJoueurs: 4 },
      { preneur: 3, contrat: 'garde', bouts: 1, pointsRealises: 60, petitAuBout: 'aucun', poignee: { camp: 'attaque', type: 'simple' }, chelem: 'aucun', nbJoueurs: 4 },
      { preneur: 0, contrat: 'garde-sans', bouts: 0, pointsRealises: 60, petitAuBout: 'defense', poignee: null, chelem: 'aucun', nbJoueurs: 4 },
      { preneur: 3, contrat: 'petite', bouts: 0, pointsRealises: 56, petitAuBout: 'aucun', poignee: null, chelem: 'aucun', nbJoueurs: 4 },
    ];
    saisies.forEach(function (s) {
      calculerEtAjouterDonne(partie, s);
    });
    // Partie d'exemple : ne pas écraser une vraie partie en cours.
    partie.estExemple = true;
    return partie;
  }

  // ---------- Barre de statut (identique sur tous les écrans) ----------

  function statusBarHTML() {
    return (
      '<span>9:41</span>' +
      '<span class="status-icons">' +
      '<svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true"><rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor"/><rect x="5" y="5" width="3" height="7" rx="0.5" fill="currentColor"/><rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor"/></svg>' +
      '<svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M8 10.5a1 1 0 100-2 1 1 0 000 2zM4.5 7.2a5 5 0 017 0M2 4.6a8.5 8.5 0 0112 0" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>' +
      '<svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true"><rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor"/><rect x="22.5" y="4" width="2" height="4" rx="1" fill="currentColor"/></svg>' +
      '</span>'
    );
  }

  function renderStatusBars() {
    document.querySelectorAll('[data-status-bar]').forEach(function (el) {
      el.innerHTML = statusBarHTML();
    });
  }

  window.P006 = {
    STOCKAGE_CLE: STOCKAGE_CLE,
    chargerPartie: chargerPartie,
    sauvegarderPartie: sauvegarderPartie,
    effacerPartie: effacerPartie,
    obtenirPartieCourante: obtenirPartieCourante,
    nouvellePartieVide: nouvellePartieVide,
    calculerEtAjouterDonne: calculerEtAjouterDonne,
    remplacerDonne: remplacerDonne,
    supprimerDonne: supprimerDonne,
    totauxParJoueur: totauxParJoueur,
    quiMene: quiMene,
    libelleContrat: libelleContrat,
    libellePetitAuBout: libellePetitAuBout,
    libellePoignee: libellePoignee,
    libelleChelem: libelleChelem,
    resumeDonneCourte: resumeDonneCourte,
    classeScore: classeScore,
    texteScore: texteScore,
    escapeHtml: escapeHtml,
    buildSampleGame: buildSampleGame,
    renderStatusBars: renderStatusBars,
  };

  document.addEventListener('DOMContentLoaded', renderStatusBars);
})();
