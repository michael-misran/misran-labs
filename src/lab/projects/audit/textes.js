// Textes ajoutés par la mission audit-github : bloc « Depuis GitHub », section
// « Couverture du code », rapport copié. Fusionnés dans le dictionnaire de la
// page (AuditTokens.jsx). `privacy` remplace l'ancienne phrase de confidentialité.
const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`

const FR = {
  privacy:
    "Les fichiers collés ou déposés ne quittent jamais ton navigateur. Le mode GitHub lit des fichiers publics directement depuis GitHub, sans compte, et n'envoie rien d'autre que l'adresse du dépôt. Aucune autre requête n'est faite.",

  gh: {
    title: 'DEPUIS GITHUB',
    help: 'Dépôt public seulement. Formes acceptées : https://github.com/proprietaire/depot, proprietaire/depot, ou une adresse /tree/branche/dossier (une branche dont le nom contient « / » n’est pas gérée).',
    addressLabel: 'ADRESSE DU DÉPÔT PUBLIC',
    placeholder: 'https://github.com/proprietaire/depot',
    explore: 'Explorer',
    exploring: 'Exploration…',
    trySite: 'Essayer avec ce site',
    repo: 'DÉPÔT',
    branch: 'BRANCHE',
    folder: 'DOSSIER',
    size: (ko) => `${ko} Ko`,
    tokensTitle: 'FICHIERS DE TOKENS TROUVÉS',
    tokensFound: (n, total) =>
      total > n ? `${pluriel(n, 'fichier')} affichés sur ${total} : les 20 premiers, par ordre alphabétique.` : pluriel(n, 'fichier') + ' à analyser.',
    noTokens:
      'Aucun fichier de tokens repéré (fichiers .json dont le chemin contient « token », ou .css / .scss nommés token, variables, theme ou vars). Tu peux quand même mesurer la couverture du code.',
    sample: (n, total) => `Échantillon de code : ${pluriel(n, 'fichier')} sur ${total} éligible${total > 1 ? 's' : ''}.`,
    noCode: 'Aucun fichier de code trouvé : la couverture ne pourra pas être mesurée.',
    analyze: 'Analyser ce dépôt',
    progress: (faits, total) => `${faits} / ${total} fichiers`,
    // Texte d'un avertissement rattaché au fichier (la page affiche déjà son nom devant).
    unreadable: (detail) => `fichier non lu (${detail.replace(/\.$/, '')}).`,
    nothingToRead: 'Rien à analyser : coche au moins un fichier de tokens, ou choisis un dépôt qui contient du code.',
    noTokensRepo:
      "Aucun fichier de tokens n'a été lu dans ce dépôt : il n'y a pas de tokens à auditer. La couverture du code est mesurée ci-dessous.",
  },

  cov: {
    title: 'COUVERTURE DU CODE',
    source: (depot, branche, n, total) =>
      `${depot} · ${branche} · ${pluriel(n, 'fichier')} de code analysé${n > 1 ? 's' : ''} sur ${total} éligible${total > 1 ? 's' : ''}`,
    rate: 'COUVERTURE',
    rateNote: 'des valeurs de style passent par un token',
    usages: 'USAGES DE TOKENS',
    usagesNote: 'var(--nom)',
    hard: 'VALEURS EN DUR',
    hardNote: 'couleurs et px littéraux',
    noValues: "Aucune valeur de style repérée dans l'échantillon : la couverture ne peut pas être calculée.",
    methodTitle: "COMMENT C'EST MESURÉ",
    method:
      "Un usage de token est un var(--nom). Une valeur en dur est une couleur littérale (#hex, rgb(), hsl()) ou une longueur en px autre que 0 et 1px, hors d'un var(…) et hors commentaires. Dans les fichiers JavaScript, TypeScript, Vue et Svelte, seules les chaînes de caractères et les blocs <style> sont lus ; dans les fichiers CSS, seules les valeurs de déclarations. C'est une estimation sur un échantillon d'au plus 60 fichiers, pas une mesure exacte : elle ne voit pas les tokens utilisés sous une autre forme (classes utilitaires, thèmes JavaScript, unités rem ou em).",
    byFileTitle: 'FICHIERS AVEC LE PLUS DE VALEURS EN DUR',
    repeatedTitle: 'VALEURS EN DUR LES PLUS RÉPÉTÉES',
    alreadyTitle: 'VALEURS QUI ONT DÉJÀ UN TOKEN',
    alreadyHint: "Ces valeurs en dur sont identiques à la valeur d'un token existant : elles pourraient l'utiliser.",
    empty: 'Aucune.',
    times: (n) => `× ${n}`,
    inFiles: (n) => pluriel(n, 'fichier'),
    others: (n) => `et ${n} autre${n > 1 ? 's' : ''}`,
    hardShort: (n) => `${n} en dur`,
    tokensShort: (n) => pluriel(n, 'token'),
    reportTitle: 'Couverture du code',
    reportRate: 'Couverture',
    reportUsages: 'Usages de tokens',
    reportHard: 'Valeurs en dur',
  },
}

const EN = {
  privacy:
    "Files pasted or uploaded never leave your browser. GitHub mode reads public files directly from GitHub without authentication and only sends the repository address. No other requests are made.",

  gh: {
    title: 'FROM GITHUB',
    help: 'Public repositories only. Accepted formats: https://github.com/owner/repo, owner/repo, or an address with /tree/branch/folder (branches with "/" in the name are not supported).',
    addressLabel: 'PUBLIC REPOSITORY ADDRESS',
    placeholder: 'https://github.com/owner/repo',
    explore: 'Explore',
    exploring: 'Exploring…',
    trySite: 'Try with this site',
    repo: 'REPOSITORY',
    branch: 'BRANCH',
    folder: 'FOLDER',
    size: (ko) => `${ko} KB`,
    tokensTitle: 'TOKEN FILES FOUND',
    tokensFound: (n, total) =>
      total > n ? `${pluriel(n, 'file')} displayed out of ${total}: the first 20, alphabetically.` : pluriel(n, 'file') + ' to analyze.',
    noTokens:
      'No token files detected (.json files with "token" in the path, or .css / .scss files named token, variables, theme or vars). You can still measure code coverage.',
    sample: (n, total) => `Code sample: ${pluriel(n, 'file')} out of ${total} eligible.`,
    noCode: 'No code files found: coverage cannot be measured.',
    analyze: 'Analyze this repository',
    progress: (faits, total) => `${faits} / ${total} files`,
    // Text for a warning attached to the file (the page already displays its name before it).
    unreadable: (detail) => `file not read (${detail.replace(/\.$/, '')}).`,
    nothingToRead: 'Nothing to analyze: check at least one token file, or choose a repository with code.',
    noTokensRepo:
      "No token files were read in this repository: there are no tokens to audit. Code coverage is measured below.",
  },

  cov: {
    title: 'CODE COVERAGE',
    source: (depot, branche, n, total) =>
      `${depot} · ${branche} · ${pluriel(n, 'code file')} analyzed out of ${total} eligible`,
    rate: 'COVERAGE',
    rateNote: 'style values passed through a token',
    usages: 'TOKEN USAGES',
    usagesNote: 'var(--name)',
    hard: 'HARD-CODED VALUES',
    hardNote: 'literal colors and px',
    noValues: "No style values detected in the sample: coverage cannot be calculated.",
    methodTitle: "HOW IT'S MEASURED",
    method:
      "A token usage is a var(--name). A hard-coded value is a literal color (#hex, rgb(), hsl()) or a px length other than 0 and 1px, outside of a var(…) and outside comments. In JavaScript, TypeScript, Vue and Svelte files, only character strings and <style> blocks are read; in CSS files, only declaration values. This is an estimate on a sample of up to 60 files, not an exact measurement: it does not see tokens used in another form (utility classes, JavaScript themes, rem or em units).",
    byFileTitle: 'FILES WITH THE MOST HARD-CODED VALUES',
    repeatedTitle: 'MOST REPEATED HARD-CODED VALUES',
    alreadyTitle: 'VALUES THAT ALREADY HAVE A TOKEN',
    alreadyHint: "These hard-coded values are identical to an existing token's value: they could use it.",
    empty: 'None.',
    times: (n) => `× ${n}`,
    inFiles: (n) => pluriel(n, 'file'),
    others: (n) => `and ${n} other${n > 1 ? 's' : ''}`,
    hardShort: (n) => `${n} hard-coded`,
    tokensShort: (n) => pluriel(n, 'token'),
    reportTitle: 'Code coverage',
    reportRate: 'Coverage',
    reportUsages: 'Token usages',
    reportHard: 'Hard-coded values',
  },
}

export const TEXTES = { fr: FR, en: EN }
