// Textes fr/en de la page /edito, calquée sur l'édito des DoggyBags (Label 619) :
// bandeau « ÉDITO », texte sur deux colonnes, photo signée en bas à droite,
// coupon « J’EN VEUX PLUS ! » à découper et ours en petits caractères.
// Séparé du composant pour éviter l'avertissement react-refresh/only-export-components.

export const EDITO_TEXT = {
  fr: {
    titre: 'Édito',
    paragraphes: [
      'Depuis le temps que je remplis des carnets d’idées, il fallait bien qu’elles finissent quelque part. Ce quelque part, c’est Misran Labs : mon laboratoire d’expérimentation. Ici, j’essaie des choses. Certaines marchent, d’autres explosent, la plupart finissent à moitié démontées sur l’établi en attendant une meilleure idée.',
      'Le jour, je suis développeur fullstack depuis douze ans et designer UX/UI depuis huit. La nuit (et un peu le matin, avec le café), je bricole. Des interfaces, des jeux, des outils, des petits journaux. Tout ce qui me passe par la tête et qui mérite d’être tenté au moins une fois.',
      'Mon assistant de labo s’appelle Claude. C’est une intelligence artificielle, et on travaille à deux : je dessine, il code, je corrige, il propose, on recommence. Une bonne partie de ce que vous lisez ici a été fabriquée de cette façon, et c’est assumé. C’est même un peu le sujet de l’expérience : voir jusqu’où un seul auteur peut aller avec un tel binôme.',
      'Le Lab a pris la forme d’un kiosque, parce que j’ai toujours aimé les kiosques, le papier, les fanzines photocopiés et les revues qu’on rapporte chez soi comme des trésors. Au présentoir : La Gazette, qui sort chaque matin avec l’actualité de l’IA ; Le Zine, fait main, pas en série ; Ma salle de jeu, pour les cartouches et les parties rapides ; et Le Lab, avec ses dossiers, ses expériences et ses idées du dimanche.',
      'Le tout est publié sous l’étiquette 1977 Éditions. 1977, c’est l’année du punk et des fanzines, l’année où n’importe qui pouvait prendre des ciseaux, de la colle et une photocopieuse pour dire ce qu’il avait à dire. C’est exactement l’esprit : on fait avec ce qu’on a, on publie, on verra bien.',
      'Ne cherchez donc pas ici un site fini. C’est un atelier ouvert, un vide-poche, un brouillon permanent. Si quelque chose vous plaît, vous intrigue ou vous donne envie de bricoler à votre tour, c’est gagné. Et si rien ne vous plaît, revenez demain : le kiosque ouvre dès 5 h 30, et il y aura forcément du nouveau.',
      'Bonne lecture !',
    ],
    legende: 'L’auteur, photographié sans son consentement… ou presque.',
    coupon: {
      cri: 'J’en veux plus !',
      accroche: ['Moi aussi je veux que ', ' continue !'],
      moi: 'Moi :',
      ami: 'Mon ami :',
      casesMoi: [
        'Je lis la Gazette au petit déjeuner',
        'Je veux le Zine #1 en vrai papier',
        'Je joue au lieu de travailler',
        'J’ai une idée pour le Lab',
        'Je suis un robot (soyons honnêtes)',
        'Je passais juste par là',
      ],
      casesAmi: [
        'Doit absolument lire ce site',
        'Mérite une partie à la salle de jeu',
        'A besoin d’un bon café',
        'Code mieux que moi (le traître)',
        'Ne sait pas encore ce qu’il rate',
        'C’est peut-être un robot aussi',
      ],
      renvoi: 'Bulletin à renvoyer à… personne. Abonnez-vous plutôt :',
      lien: 'Suivre le kiosque →',
    },
    ours: 'MISRAN LABS est un titre de 1977 Éditions, maison d’édition indépendante d’un seul auteur. Directeur de la publication, rédacteur en chef, maquettiste, développeur et garçon de courses : Michael Misran. Assistant de laboratoire : Claude (Anthropic). Imprimé à la maison, servi en ligne. Polices libres, code source ouvert. Toute ressemblance avec un fanzine des années 70 serait parfaitement volontaire. Aucun animal n’a été maltraité pendant la fabrication de ce site, à part peut-être l’Alambic.',
  },
  en: {
    titre: 'Editorial',
    paragraphes: [
      'I’ve been filling notebooks with ideas for so long that they had to end up somewhere. That somewhere is Misran Labs: my experimentation lab. Here I try things out. Some work, some blow up, most end up half-dismantled on the workbench, waiting for a better idea.',
      'By day, I’ve been a fullstack developer for twelve years and a UX/UI designer for eight. By night (and a little in the morning, over coffee), I tinker. Interfaces, games, tools, little newspapers. Whatever crosses my mind and deserves to be tried at least once.',
      'My lab assistant is called Claude. It’s an artificial intelligence, and we work as a pair: I draw, it codes, I fix, it suggests, we start over. A good part of what you read here was made that way, and I own it. That’s actually part of the experiment: seeing how far a single author can go with a partner like that.',
      'The Lab took the shape of a newsstand, because I’ve always loved newsstands, paper, photocopied fanzines and magazines you bring home like treasures. On the rack: The Gazette, out every morning with the AI news; The Zine, handmade, not mass-produced; My game room, for cartridges and quick games; and The Lab, with its case files, experiments and Sunday ideas.',
      'It’s all published under the 1977 Éditions imprint. 1977 is the year of punk and fanzines, the year anyone could grab scissors, glue and a photocopier to say what they had to say. That’s exactly the spirit: make do with what you have, publish, and see what happens.',
      'So don’t look for a finished website here. It’s an open workshop, a catch-all tray, a permanent draft. If something pleases you, intrigues you or makes you want to tinker in turn, mission accomplished. And if nothing does, come back tomorrow: the newsstand opens at 5:30 am, and there’s bound to be something new.',
      'Enjoy the read!',
    ],
    legende: 'The author, photographed without consent… almost.',
    coupon: {
      cri: 'I want more!',
      accroche: ['I want ', ' to keep going too!'],
      moi: 'Me:',
      ami: 'My friend:',
      casesMoi: [
        'I read the Gazette at breakfast',
        'I want Zine #1 on real paper',
        'I play instead of working',
        'I have an idea for the Lab',
        'I am a robot (let’s be honest)',
        'I was just passing by',
      ],
      casesAmi: [
        'Absolutely must read this site',
        'Deserves a game in the game room',
        'Needs a good coffee',
        'Codes better than me (the traitor)',
        'Doesn’t know what they’re missing yet',
        'Might be a robot too',
      ],
      renvoi: 'Coupon to be returned to… nobody. Subscribe instead:',
      lien: 'Follow the newsstand →',
    },
    ours: 'MISRAN LABS is a 1977 Éditions title, a one-person independent publishing house. Publisher, editor-in-chief, layout artist, developer and errand runner: Michael Misran. Lab assistant: Claude (Anthropic). Printed at home, served online. Free fonts, open source code. Any resemblance to a 70s fanzine is entirely intentional. No animal was harmed in the making of this site, except maybe the Alembic.',
  },
}
