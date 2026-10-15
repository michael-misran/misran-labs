// Numéros de Midnight Snack : un fichier par numéro dans numeros/ (chargement
// natif Vite, import.meta.glob), même principe que src/saviez-vous/parutions.js
// et src/jeux/socle/jour.js pour la date du jour.
//
// Préparer le numéro du mois (ex. décembre → numeros/02.js) :
// 1. Copier numeros/01.js, changer `numero` et `parution` ('AAAA-MM-01', le
//    1er du mois).
// 2. Réécrire sommaire, édito, récits, rubriques (voir SPEC.md D3 pour le ton
//    et la longueur des récits), feuilleton et « Dans la marmite » si Michael
//    a donné son texte, sinon laisser `texte: null` (page « à paraître »).
// 3. Ajouter les nouveaux encarts nécessaires dans encarts.js, avec un prompt
//    Gemini prêt à copier (D5).
// 4. Le volume de l'étagère (src/numero/volumes.js) n'a rien à changer : il
//    pointe toujours vers '/midnight' (dernier numéro paru).

const modules = import.meta.glob('./numeros/*.js', { eager: true })

function loadNumeros() {
  return Object.values(modules)
    .map((mod) => mod.default ?? mod)
    .filter((n) => n && typeof n.numero === 'number' && typeof n.parution === 'string')
    .sort((a, b) => a.numero - b.numero)
}

const NUMEROS = loadNumeros()

// Date locale du lecteur (AAAA-MM-JJ), même mécanisme que les brèves et les
// jeux du jour : une parution datée dans le futur reste cachée jusqu'à son
// jour, sans nouveau déploiement.
function aujourdhui() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function estParu(numero) {
  return !!numero && numero.parution <= aujourdhui()
}

export function getNumeros() {
  return NUMEROS
}

export function getNumero(n) {
  return NUMEROS.find((numero) => numero.numero === n)
}

// Le numéro à ouvrir sur /midnight (sans numéro dans l'adresse) : le dernier
// paru, sinon le plus proche à paraître (pour afficher sa page d'attente).
export function getNumeroParDefaut() {
  const parus = NUMEROS.filter(estParu)
  if (parus.length) return parus[parus.length - 1]
  return NUMEROS[0] ?? null
}
