// ============================================================
// COUCHE DE DONNÉES — localStorage
// Sert à la fois au site public et au panneau admin, pour que
// les modifications faites dans l'admin apparaissent sur le site.
// ============================================================

const DB_KEYS = {
  stories: "ousshabs_stories",
  users: "ousshabs_users",
  messages: "ousshabs_messages",
};

// ---- Histoires par défaut (utilisées uniquement au tout premier chargement) ----
const DEFAULT_STORIES = [
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

const DEFAULT_USERS = [
  { id: "u1", prenom: "Aïcha", nom: "Koffi", email: "aicha.koffi@exemple.com", date: "2026-05-12" },
  { id: "u2", prenom: "Yann", nom: "Dubois", email: "yann.dubois@exemple.com", date: "2026-06-03" },
  { id: "u3", prenom: "Fatou", nom: "Diallo", email: "fatou.diallo@exemple.com", date: "2026-07-19" },
];

const DEFAULT_MESSAGES = [
  {
    id: "m1",
    nom: "Léa Martin",
    email: "lea.martin@exemple.com",
    sujet: "Proposition d'histoire",
    message: "Bonjour, j'aimerais vous soumettre un texte que j'ai écrit cet été. Comment procéder ?",
    date: "2026-08-01",
    lu: false,
  },
  {
    id: "m2",
    nom: "Karim Benali",
    email: "karim.benali@exemple.com",
    sujet: "Problème d'affichage",
    message: "La page des histoires ne s'affiche pas correctement sur mon téléphone, l'écran reste blanc.",
    date: "2026-08-04",
    lu: true,
  },
];

// ---- Utilitaires internes ----
function _load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return JSON.parse(JSON.stringify(fallback));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erreur de lecture localStorage pour", key, e);
    return JSON.parse(JSON.stringify(fallback));
  }
}

function _save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugify(text) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---- HISTOIRES ----
const DB = {
  getStories() {
    return _load(DB_KEYS.stories, DEFAULT_STORIES);
  },
  saveStories(stories) {
    _save(DB_KEYS.stories, stories);
  },
  getStory(id) {
    return this.getStories().find((s) => s.id === id);
  },
  upsertStory(story) {
    const stories = this.getStories();
    if (!story.id) {
      let base = slugify(story.title) || "histoire";
      let id = base;
      let n = 2;
      while (stories.some((s) => s.id === id)) {
        id = `${base}-${n}`;
        n++;
      }
      story.id = id;
    }
    const idx = stories.findIndex((s) => s.id === story.id);
    if (idx === -1) stories.push(story);
    else stories[idx] = story;
    this.saveStories(stories);
    return story;
  },
  deleteStory(id) {
    const stories = this.getStories().filter((s) => s.id !== id);
    this.saveStories(stories);
  },
  getAllCategories() {
    return [...new Set(this.getStories().map((s) => s.category))];
  },
  incrementView(id) {
    const stories = this.getStories();
    const s = stories.find((x) => x.id === id);
    if (s) s.views = (s.views || 0) + 1;
    this.saveStories(stories);
  },

  // ---- UTILISATEURS ----
  getUsers() {
    return _load(DB_KEYS.users, DEFAULT_USERS);
  },
  saveUsers(users) {
    _save(DB_KEYS.users, users);
  },
  addUser(user) {
    const users = this.getUsers();
    user.id = "u" + Date.now();
    user.date = new Date().toISOString().slice(0, 10);
    users.unshift(user);
    this.saveUsers(users);
    return user;
  },
  deleteUser(id) {
    this.saveUsers(this.getUsers().filter((u) => u.id !== id));
  },

  // ---- MESSAGES ----
  getMessages() {
    return _load(DB_KEYS.messages, DEFAULT_MESSAGES);
  },
  saveMessages(messages) {
    _save(DB_KEYS.messages, messages);
  },
  addMessage(msg) {
    const messages = this.getMessages();
    msg.id = "m" + Date.now();
    msg.date = new Date().toISOString().slice(0, 10);
    msg.lu = false;
    messages.unshift(msg);
    this.saveMessages(messages);
    return msg;
  },
  markMessageRead(id, lu = true) {
    const messages = this.getMessages();
    const m = messages.find((x) => x.id === id);
    if (m) m.lu = lu;
    this.saveMessages(messages);
  },
  deleteMessage(id) {
    this.saveMessages(this.getMessages().filter((m) => m.id !== id));
  },

  // ---- STATISTIQUES ----
  getStats() {
    const stories = this.getStories();
    const users = this.getUsers();
    const messages = this.getMessages();
    return {
      totalStories: stories.length,
      totalViews: stories.reduce((sum, s) => sum + (s.views || 0), 0),
      totalUsers: users.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter((m) => !m.lu).length,
      categoryCounts: stories.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
      }, {}),
      topStories: [...stories].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5),
    };
  },

  // ---- SESSION ADMIN (démo uniquement — aucune vraie sécurité) ----
  ADMIN_CREDENTIALS: { email: "admin@chroniques-ousshabs.fr", password: "admin123" },
  isAdminLoggedIn() {
    return sessionStorage.getItem("chroniques_admin_session") === "true";
  },
  adminLogin(email, password) {
    if (email === this.ADMIN_CREDENTIALS.email && password === this.ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem("chroniques_admin_session", "true");
      return true;
    }
    return false;
  },
  adminLogout() {
    sessionStorage.removeItem("chroniques_admin_session");
  },
  guardAdminPage() {
    if (!this.isAdminLoggedIn()) window.location.href = "login.html";
  },
};
