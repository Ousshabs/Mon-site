// Données des histoires — contenu de démonstration.
// Remplace le tableau ci-dessous par tes propres histoires.
// Chaque histoire a un "id" unique utilisé dans l'URL : histoire.html?id=...

const STORIES = [
  {
    id: "sentier-des-brumes",
    title: "Le Sentier des Brumes",
    category: "Aventure",
    author: "OussHabs",
    readTime: "7 min",
    excerpt:
      "Un guide de montagne disparu depuis dix ans, une carte incomplète et une expédition qui refuse de tourner le dos au mystère.",
    content: [
      "La brume avalait le sentier centimètre par centimètre, comme si la montagne elle-même refusait qu'on la traverse. Amara resserra les lanières de son sac et jeta un dernier regard vers le village, déjà effacé par le blanc.",
      "Dix ans plus tôt, son oncle avait emprunté ce même chemin avec deux compagnons. Aucun des trois n'était redescendu. Les recherches officielles s'étaient arrêtées au bout d'une semaine, faute de traces, faute d'indices, faute d'espoir.",
      "Elle n'avait qu'un carnet à moitié brûlé retrouvé dans une auberge trois vallées plus loin, et une phrase soulignée deux fois : « Le sentier ne mène nulle part tant qu'on ne lui demande pas la permission. »",
      "Au douzième kilomètre, la brume se déchira d'un coup, comme un rideau qu'on tire. Devant elle se dressait une arche de pierre qu'aucune carte ne mentionnait, couverte de symboles qu'elle reconnut du carnet de son oncle.",
      "Elle posa la main sur la pierre froide. Quelque part au loin, une cloche se mit à sonner, alors qu'il n'y avait, à des kilomètres à la ronde, plus rien ni personne.",
    ],
  },
  {
    id: "carnet-de-l-horloger",
    title: "Le Carnet de l'Horloger",
    category: "Mystère",
    author: "OussHabs",
    readTime: "6 min",
    excerpt:
      "Chaque horloge de la ville s'est arrêtée à 3h17. Un seul homme semble savoir pourquoi — et il a disparu la nuit même.",
    content: [
      "À 3h17 précises, toutes les horloges de la ville s'arrêtèrent en même temps. Les pendules, les montres, l'horloge de la gare, même le vieux coucou de madame Renard : toutes figées sur la même minute, comme frappées d'un sortilège collectif.",
      "L'inspecteur Belin n'aimait pas les coïncidences, et encore moins celles qui n'avaient aucune explication mécanique. Il se rendit directement chez le seul horloger de la ville, un certain Adrien Vasseur, réputé pour son silence autant que pour son talent.",
      "L'atelier était vide. Sur l'établi, un carnet relié de cuir attendait, ouvert à la dernière page, comme si on l'avait laissé exprès pour lui. Une seule ligne y était écrite, à l'encre encore fraîche : « Ce n'est pas le temps qui s'est arrêté. C'est moi qui l'ai retenu. »",
      "Belin referma le carnet. Dehors, la nuit tombait plus vite que d'habitude — beaucoup trop vite pour être naturelle.",
    ],
  },
  {
    id: "lettres-jamais-envoyees",
    title: "Les Lettres Jamais Envoyées",
    category: "Romance",
    author: "OussHabs",
    readTime: "8 min",
    excerpt:
      "Vingt ans après leur rupture, elle retrouve une boîte de lettres qu'il n'a jamais eu le courage de lui envoyer.",
    content: [
      "La boîte était rangée tout au fond du grenier, sous une pile de vieux rideaux, comme si quelqu'un avait voulu qu'on l'oublie sans jamais oser la jeter. Sur le couvercle, une seule inscription à la craie : « Pour Salomé, un jour peut-être. »",
      "Elle s'assit à même le plancher poussiéreux et souleva le couvercle. Des dizaines d'enveloppes, toutes non affranchies, toutes adressées à son nom de jeune fille, s'entassaient à l'intérieur, classées par année avec un soin presque maniaque.",
      "La première datait de leur rupture, vingt-deux ans plus tôt. « Je n'ai pas su te dire pourquoi je partais. La vérité, c'est que j'avais peur de rester et de tout gâcher encore plus. »",
      "Elle en ouvrit une autre, puis une autre, remontant le fil d'une vie parallèle qu'il avait vécue seul, à côté de la sienne, sans jamais oser la rejoindre. La dernière lettre portait la date de la veille.",
      "Le cachet de la poste, cette fois, était bien réel.",
    ],
  },
  {
    id: "derniere-transmission",
    title: "Dernière Transmission",
    category: "Science-Fiction",
    author: "OussHabs",
    readTime: "9 min",
    excerpt:
      "À bord d'une station abandonnée en orbite autour de Titan, un signal continue d'émettre. Personne ne devrait plus être là pour l'envoyer.",
    content: [
      "La station Kepler-9 tournait silencieusement autour de Titan depuis onze ans, officiellement vide depuis l'évacuation d'urgence de 2071. Officiellement, parce qu'un signal radio en sortait encore, toutes les six heures, précis comme une horloge suisse.",
      "L'équipage de récupération n'avait aucune raison de s'inquiéter : les protocoles automatisés continuaient parfois de fonctionner des années après le départ des équipages. Ce qui les inquiéta, en revanche, fut le contenu du message.",
      "Ce n'était pas un signal de détresse automatique. C'était une voix. Une voix humaine, fatiguée mais posée, qui répétait inlassablement les mêmes coordonnées et la même phrase : « Ne revenez pas nous chercher. Nous allons bien. »",
      "Le capitaine Oyelaran vérifia trois fois les registres d'équipage. Personne n'était resté à bord lors de l'évacuation. Personne, sur le papier.",
      "La station approchait maintenant à moins de cent mètres. Une lumière s'alluma dans le module central, là où, officiellement, il n'y avait plus d'électricité depuis une décennie.",
    ],
  },
  {
    id: "gardienne-des-contes",
    title: "La Gardienne des Contes",
    category: "Fantastique",
    author: "OussHabs",
    readTime: "6 min",
    excerpt:
      "Dans un village où les histoires ont un pouvoir réel, une jeune conteuse découvre qu'un récit oublié cherche à se réécrire seul.",
    content: [
      "Dans le village de Kal'nora, on ne racontait jamais une histoire à la légère. Chaque conte prononcé à voix haute laissait une empreinte dans le monde, aussi fine soit-elle, et les gardiens veillaient à ce qu'aucun récit dangereux ne soit jamais achevé.",
      "Neema avait hérité de la charge à la mort de sa grand-mère : protéger les contes oubliés, ceux que plus personne n'osait terminer, enfermés dans la grande bibliothèque sous la colline.",
      "Un soir, un livre qu'elle n'avait jamais vu apparut sur son pupitre, ouvert à une page blanche à l'exception d'une phrase qui s'écrivait sous ses yeux, lettre après lettre : « Il était une fois une gardienne qui... »",
      "Le livre attendait la suite. Et pour la première fois depuis des générations, une histoire cherchait elle-même quelqu'un pour la raconter — et non l'inverse.",
    ],
  },
  {
    id: "veilleur-du-phare",
    title: "Le Veilleur du Phare",
    category: "Aventure",
    author: "OussHabs",
    readTime: "5 min",
    excerpt:
      "Sur une île battue par les tempêtes, un jeune gardien de phare tient un journal que personne ne devait jamais lire.",
    content: [
      "Le phare de Pointe-Noire n'avait pas connu de gardien depuis que le système automatique avait pris le relais, quinze ans plus tôt. C'est pourtant là que Jonas passa son premier été, envoyé par son grand-père pour, disait-il, « apprendre à écouter la mer ».",
      "Le journal de bord des anciens gardiens traînait encore dans un tiroir, rempli de notes météo banales jusqu'à une page cornée, datée d'une nuit de tempête particulièrement violente : « Elle est revenue cette nuit. Trois coups sur la vitre, comme toujours. »",
      "Jonas referma le carnet, presque amusé. Puis la tempête se leva, exactement comme prévu par les pages jaunies. Et à minuit précis, trois coups résonnèrent contre la vitre de la lanterne.",
    ],
  },
];

function getStoryById(id) {
  return STORIES.find((s) => s.id === id);
}

function getAllCategories() {
  return [...new Set(STORIES.map((s) => s.category))];
}
