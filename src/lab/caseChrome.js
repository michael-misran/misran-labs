// Palette kraft de l'armoire à dossiers (refonte kiosque, D3/D4) : chemise,
// onglet plus sombre, étiquette papier. Mêmes teintes que la couverture Lab
// du kiosque (KiosqueParts.CouvertureLab), en dur comme là-bas — aucun token
// dédié, et les tokens --case-tabs-tint-N de tokens.css restent intacts
// (simplement plus utilisés par les onglets, qui prennent ces teintes-ci).
export const KRAFT = {
  chemise: '#d8c094',
  onglet: '#c9ae7c',
  papier: '#fbf6ea',
}

// Textes de bandeau/pied de page communs à toute fiche — seul le numéro,
// le titre et le tampon changent d'une page à l'autre. Un projet fusionne
// ceci avec son propre contenu (title, role, stampLabel, docId...).
// Séparé de CaseFile.jsx : un fichier de composants n'exporte pas de constantes.
export const CASE_CHROME = {
  fr: {
    mastheadCenter: 'ARCHIVE DU LAB //// DOSSIER PROJET',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'ARCHIVE VISUEL',
    tagline: 'LE DESIGN EST UNE INTENTION. LES DÉTAILS SONT TOUT.',
    clearance: 'NIVEAU DE LECTURE — PUBLIC',
    periodLabel: 'PÉRIODE',
    toolsLabel: 'OUTILS',
    roleLabel: 'RÔLE',
    tamponBarre: 'CONFIDENTIEL',
    tamponBas: 'DÉCLASSIFIÉ',
  },
  en: {
    mastheadCenter: 'LAB ARCHIVE //// PROJECT FILE',
    mastheadRight: 'MISRAN LABS',
    mastheadRightSub: 'VISUAL ARCHIVE',
    tagline: 'DESIGN IS INTENT. DETAILS ARE EVERYTHING.',
    clearance: 'CLEARANCE LEVEL — PUBLIC',
    periodLabel: 'PERIOD',
    toolsLabel: 'TOOLS',
    roleLabel: 'ROLE',
    tamponBarre: 'CLASSIFIED',
    tamponBas: 'DECLASSIFIED',
  },
}
