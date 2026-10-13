#!/usr/bin/env node
// Rejoue tous les cas de cas-tarot.json contre public/screens/p006/p006-calcul.js (D11).
// Usage : node missions/p006-maquettes/verifier-calcul.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// p006-calcul.js est un module UMD (module.exports côté Node, window.TarotCalcul côté page).
// Le projet est en "type": "module" : on évite le require(ESM) de Node (interop qui ne fournit
// pas `module`) et on exécute le fichier dans un bac à sable CommonJS minimal construit à la main.
const calculPath = path.join(__dirname, '..', '..', 'public', 'screens', 'p006', 'p006-calcul.js');
const source = readFileSync(calculPath, 'utf8');
const sandboxModule = { exports: {} };
const chargerUMD = new Function('module', 'exports', source);
chargerUMD(sandboxModule, sandboxModule.exports);
const Calcul = sandboxModule.exports;

const casPath = path.join(__dirname, 'cas-tarot.json');
const { cas } = JSON.parse(readFileSync(casPath, 'utf8'));

let ok = 0;
const echecs = [];

for (const c of cas) {
  const donne = {
    nbJoueurs: c.donne.nbJoueurs,
    preneur: c.donne.preneur,
    appele: c.donne.appele,
    contrat: c.donne.contrat,
    bouts: c.donne.bouts,
    pointsRealises: c.donne.pointsRealises,
    petitAuBout: c.donne.petitAuBout,
    poignee: c.donne.poignee,
    chelem: c.donne.chelem,
  };
  const resultat = Calcul.calculerDonne(donne);

  const memesScores =
    resultat.scores.length === c.attendu.scores.length &&
    resultat.scores.every((v, i) => Math.abs(v - c.attendu.scores[i]) < 1e-9);
  const reussite =
    resultat.pointsAFaire === c.attendu.pointsAFaire &&
    resultat.ecart === c.attendu.ecart &&
    resultat.attaqueReussie === c.attendu.attaqueReussie &&
    memesScores;

  if (reussite) {
    ok++;
  } else {
    echecs.push({ nom: c.nom, attendu: c.attendu, obtenu: resultat });
  }
}

console.log(`${ok}/${cas.length} cas OK`);

if (echecs.length > 0) {
  console.error('\nÉchecs :');
  for (const e of echecs) {
    console.error(`- ${e.nom}`);
    console.error(`  attendu : ${JSON.stringify(e.attendu)}`);
    console.error(`  obtenu  : ${JSON.stringify({ pointsAFaire: e.obtenu.pointsAFaire, ecart: e.obtenu.ecart, attaqueReussie: e.obtenu.attaqueReussie, scores: e.obtenu.scores })}`);
  }
  process.exit(1);
}
