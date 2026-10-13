// La Marque (P-006) — calcul du score d'une donne de Tarot (D8/D4). Fonctions pures, sans accès au DOM.
// Utilisées par les pages (window.TarotCalcul) et par missions/p006-maquettes/verifier-calcul.mjs (module.exports).
// Règles détaillées : missions/p006-maquettes/REGLES.md.
/* global module */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TarotCalcul = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var POINTS_A_FAIRE = { 0: 56, 1: 51, 2: 41, 3: 36 };
  var MULT_CONTRAT = { petite: 1, garde: 2, 'garde-sans': 4, 'garde-contre': 6 };
  var VAL_POIGNEE = { simple: 20, double: 30, triple: 40 };
  var VAL_CHELEM = { 'annonce-reussi': 400, 'non-annonce-reussi': 200, 'annonce-rate': -200 };
  var POINTS_DU_JEU = 91;

  function pointsAFaire(bouts) {
    return POINTS_A_FAIRE[bouts];
  }

  // écart arrondi à l'entier supérieur dans les deux sens (D8, point à valider par Michael)
  function calculerEcart(pointsRealises, aFaire) {
    return Math.ceil(Math.abs(pointsRealises - aFaire));
  }

  function calculerDonne(donne) {
    var aFaire = pointsAFaire(donne.bouts);
    var multContrat = MULT_CONTRAT[donne.contrat];
    var ecart = calculerEcart(donne.pointsRealises, aFaire);
    var attaqueReussie = donne.pointsRealises >= aFaire;

    var base = (25 + ecart) * multContrat;
    var baseSignee = attaqueReussie ? base : -base;

    var petitVal = 0;
    if (donne.petitAuBout === 'attaque') petitVal = 10 * multContrat;
    else if (donne.petitAuBout === 'defense') petitVal = -10 * multContrat;

    var poigneeVal = 0;
    if (donne.poignee && donne.poignee.type) {
      var valBrute = VAL_POIGNEE[donne.poignee.type];
      poigneeVal = attaqueReussie ? valBrute : -valBrute;
    }

    var chelemVal = 0;
    if (donne.chelem && donne.chelem !== 'aucun') {
      chelemVal = VAL_CHELEM[donne.chelem];
    }

    var scoreUnit = baseSignee + petitVal + poigneeVal + chelemVal;
    var scores = repartirScores(donne, scoreUnit);

    var resultatLabel = attaqueReussie
      ? 'Contrat réussi de ' + ecart
      : 'Chuté de ' + ecart;

    return {
      pointsAFaire: aFaire,
      ecart: ecart,
      attaqueReussie: attaqueReussie,
      scoreUnit: scoreUnit,
      scores: scores,
      resultatLabel: resultatLabel,
    };
  }

  // Répartition entre les joueurs (D8 §5) : la somme des scores d'une donne vaut toujours 0.
  function repartirScores(donne, scoreUnit) {
    var n = donne.nbJoueurs;
    var scores = new Array(n).fill(0);
    var preneurAppeleLuiMeme = n === 5 && donne.appele === donne.preneur;

    if (n === 3 || n === 4) {
      var multPreneur = n === 3 ? 2 : 3;
      scores[donne.preneur] = multPreneur * scoreUnit;
      for (var i = 0; i < n; i++) {
        if (i !== donne.preneur) scores[i] = -scoreUnit;
      }
    } else if (n === 5) {
      if (preneurAppeleLuiMeme) {
        scores[donne.preneur] = 4 * scoreUnit;
        for (var j = 0; j < 5; j++) {
          if (j !== donne.preneur) scores[j] = -scoreUnit;
        }
      } else {
        scores[donne.preneur] = 2 * scoreUnit;
        scores[donne.appele] = 1 * scoreUnit;
        for (var k = 0; k < 5; k++) {
          if (k !== donne.preneur && k !== donne.appele) scores[k] = -scoreUnit;
        }
      }
    }
    return scores;
  }

  return {
    POINTS_A_FAIRE: POINTS_A_FAIRE,
    MULT_CONTRAT: MULT_CONTRAT,
    VAL_POIGNEE: VAL_POIGNEE,
    VAL_CHELEM: VAL_CHELEM,
    POINTS_DU_JEU: POINTS_DU_JEU,
    pointsAFaire: pointsAFaire,
    calculerEcart: calculerEcart,
    calculerDonne: calculerDonne,
  };
});
