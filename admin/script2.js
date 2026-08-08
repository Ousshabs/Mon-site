// ============================
// MENU MOBILE
// ============================
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("open"));
  });
}

// Marque le lien de navigation actif selon la page courante
function markActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
}

// ============================
// TOAST
// ============================
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

// ============================
// FORMULAIRES VISUELS (pas de backend)
// ============================
function initFakeForms() {
  document.querySelectorAll("form[data-fake-submit]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast(form.getAttribute("data-fake-submit"));
      form.reset();
    });
  });
}

// ============================
// INSCRIPTION -> enregistre l'utilisateur (visible dans l'admin)
// ============================
function initRegisterForm() {
  const form = document.querySelector("[data-register-form]");
  if (!form || typeof DB === "undefined") return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prenom = form.querySelector("#prenom").value.trim();
    const nom = form.querySelector("#nom").value.trim();
    const email = form.querySelector("#email2").value.trim();
    DB.addUser({ prenom, nom, email });
    showToast("Compte créé (démo) — bienvenue " + prenom + " !");
    form.reset();
  });
}

// ============================
// CONTACT -> enregistre le message (visible dans l'admin)
// ============================
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form || typeof DB === "undefined") return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = form.querySelector("#cname").value.trim();
    const email = form.querySelector("#cemail").value.trim();
    const sujet = form.querySelector("#csubject").value.trim();
    const message = form.querySelector("#cmessage").value.trim();
    DB.addMessage({ nom, email, sujet, message });
    showToast("Message envoyé — nous vous répondrons rapidement.");
    form.reset();
  });
}

// ============================
// RENDU DES HISTOIRES
// ============================
function renderStoryCard(story) {
  return `
    <a class="story-card" href="histoire.html?id=${story.id}" data-category="${story.category}">
      <div class="story-cover">
        <span>${story.title.charAt(0)}</span>
        <div class="story-ribbon">${story.category}</div>
      </div>
      <div class="story-body">
        <span class="story-meta">${story.author} · ${story.readTime} de lecture</span>
        <h3>${story.title}</h3>
        <p class="story-excerpt">${story.excerpt}</p>
        <span class="story-read">Lire l'histoire →</span>
      </div>
    </a>
  `;
}

function initStoryGrid() {
  const grid = document.querySelector("[data-story-grid]");
  if (!grid || typeof DB === "undefined") return;

  const allStories = DB.getStories();
  const limit = grid.getAttribute("data-limit");
  const list = limit ? allStories.slice(0, Number(limit)) : allStories;
  grid.innerHTML = list.length
    ? list.map(renderStoryCard).join("")
    : `<p style="color: var(--ink-soft); grid-column: 1 / -1; text-align:center;">Aucune histoire pour le moment.</p>`;

  const pillWrap = document.querySelector("[data-category-filter]");
  if (pillWrap) {
    const cats = DB.getAllCategories();
    pillWrap.innerHTML =
      `<button class="cat-pill active" data-cat="all">Toutes</button>` +
      cats.map((c) => `<button class="cat-pill" data-cat="${c}">${c}</button>`).join("");

    pillWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-pill");
      if (!btn) return;
      pillWrap.querySelectorAll(".cat-pill").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-cat");
      grid.querySelectorAll(".story-card").forEach((card) => {
        const show = cat === "all" || card.getAttribute("data-category") === cat;
        card.style.display = show ? "" : "none";
      });
    });
  }
}

function initStoryReader() {
  const container = document.querySelector("[data-story-reader]");
  if (!container || typeof DB === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const stories = DB.getStories();
  const story = DB.getStory(id) || stories[0];

  if (!story) {
    container.innerHTML = `<div class="story-hero"><h1>Histoire introuvable</h1></div>`;
    return;
  }

  document.title = `${story.title} — Chroniques d'OussHabs`;
  DB.incrementView(story.id);

  container.innerHTML = `
    <div class="story-hero">
      <span class="story-meta">${story.category} · ${story.readTime} de lecture</span>
      <h1>${story.title}</h1>
      <p class="author-line">Par ${story.author}</p>
    </div>
    <div class="story-content">
      ${story.content.map((p) => `<p>${p}</p>`).join("")}
      <div class="divider">❦</div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  markActiveNav();
  initFakeForms();
  initRegisterForm();
  initContactForm();
  initStoryGrid();
  initStoryReader();
});
