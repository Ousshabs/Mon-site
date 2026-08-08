// ============================================================
// PANNEAU ADMIN — logique partagée
// ============================================================

function initAdminNav() {
  const current = window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".admin-nav a[href]").forEach((link) => {
    if (link.getAttribute("href") === current) link.classList.add("active");
  });

  const logoutBtn = document.querySelector("[data-admin-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      DB.adminLogout();
      window.location.href = "login.html";
    });
  }
}

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

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

// ---------------- LOGIN ----------------
function initAdminLogin() {
  const form = document.querySelector("[data-admin-login]");
  if (!form) return;

  if (DB.isAdminLoggedIn()) {
    window.location.href = "dashboard.html";
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("#admin-email").value.trim();
    const password = form.querySelector("#admin-password").value;
    const errorBox = document.querySelector(".admin-error");

    if (DB.adminLogin(email, password)) {
      window.location.href = "dashboard.html";
    } else {
      errorBox.textContent = "Identifiants incorrects. Vérifiez l'e-mail et le mot de passe indiqués ci-dessous.";
      errorBox.classList.add("show");
    }
  });
}

// ---------------- DASHBOARD ----------------
function initDashboard() {
  const grid = document.querySelector("[data-stat-grid]");
  if (!grid) return;

  const stats = DB.getStats();
  grid.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Histoires publiées</div>
      <div class="stat-value">${stats.totalStories}</div>
      <div class="stat-sub">${Object.keys(stats.categoryCounts).length} catégories</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Vues totales</div>
      <div class="stat-value">${stats.totalViews.toLocaleString("fr-FR")}</div>
      <div class="stat-sub">toutes histoires confondues</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Utilisateurs inscrits</div>
      <div class="stat-value">${stats.totalUsers}</div>
      <div class="stat-sub">comptes créés</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Messages</div>
      <div class="stat-value">${stats.totalMessages}</div>
      <div class="stat-sub">${stats.unreadMessages} non lu${stats.unreadMessages > 1 ? "s" : ""}</div>
    </div>
  `;

  const topWrap = document.querySelector("[data-top-stories]");
  if (topWrap) {
    topWrap.innerHTML = stats.topStories.length
      ? stats.topStories.map((s, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${escapeHtml(s.title)}</td>
            <td><span class="pill-tag">${escapeHtml(s.category)}</span></td>
            <td>${(s.views || 0).toLocaleString("fr-FR")}</td>
          </tr>
        `).join("")
      : `<tr><td colspan="4" class="empty-state">Aucune histoire pour le moment.</td></tr>`;
  }

  const catWrap = document.querySelector("[data-category-breakdown]");
  if (catWrap) {
    const entries = Object.entries(stats.categoryCounts);
    catWrap.innerHTML = entries.length
      ? entries.map(([cat, count]) => `
          <tr>
            <td>${escapeHtml(cat)}</td>
            <td>${count}</td>
          </tr>
        `).join("")
      : `<tr><td colspan="2" class="empty-state">Aucune catégorie pour le moment.</td></tr>`;
  }
}

// ---------------- HISTOIRES ----------------
function renderStoriesTable(filter = "") {
  const body = document.querySelector("[data-stories-body]");
  if (!body) return;
  const q = filter.trim().toLowerCase();
  const stories = DB.getStories().filter(
    (s) => !q || s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  );

  body.innerHTML = stories.length
    ? stories.map((s) => `
        <tr>
          <td>${escapeHtml(s.title)}</td>
          <td><span class="pill-tag">${escapeHtml(s.category)}</span></td>
          <td>${escapeHtml(s.author)}</td>
          <td>${(s.views || 0).toLocaleString("fr-FR")}</td>
          <td>${escapeHtml(s.createdAt || "—")}</td>
          <td>
            <div class="row-actions">
              <button class="icon-btn" data-edit-story="${s.id}">Modifier</button>
              <button class="icon-btn danger" data-delete-story="${s.id}">Supprimer</button>
            </div>
          </td>
        </tr>
      `).join("")
    : `<tr><td colspan="6" class="empty-state">Aucune histoire ne correspond à ta recherche.</td></tr>`;
}

function initStoriesPage() {
  const body = document.querySelector("[data-stories-body]");
  if (!body) return;

  renderStoriesTable();

  document.querySelector("[data-story-search]")?.addEventListener("input", (e) => {
    renderStoriesTable(e.target.value);
  });

  body.addEventListener("click", (e) => {
    const editId = e.target.closest("[data-edit-story]")?.getAttribute("data-edit-story");
    const delId = e.target.closest("[data-delete-story]")?.getAttribute("data-delete-story");

    if (editId) {
      window.location.href = `story-form.html?id=${editId}`;
    }
    if (delId) {
      const story = DB.getStory(delId);
      if (confirm(`Supprimer « ${story?.title} » ? Cette action est irréversible.`)) {
        DB.deleteStory(delId);
        renderStoriesTable(document.querySelector("[data-story-search]")?.value || "");
        showToast("Histoire supprimée.");
      }
    }
  });
}

function initStoryForm() {
  const form = document.querySelector("[data-story-form]");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const existing = id ? DB.getStory(id) : null;

  if (existing) {
    document.querySelector(".admin-topbar h1").textContent = "Modifier l'histoire";
    form.querySelector("#s-title").value = existing.title;
    form.querySelector("#s-category").value = existing.category;
    form.querySelector("#s-author").value = existing.author;
    form.querySelector("#s-readtime").value = existing.readTime;
    form.querySelector("#s-excerpt").value = existing.excerpt;
    form.querySelector("#s-content").value = existing.content.join("\n\n");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const story = {
      title: form.querySelector("#s-title").value.trim(),
      category: form.querySelector("#s-category").value.trim(),
      author: form.querySelector("#s-author").value.trim() || "OussHabs",
      readTime: form.querySelector("#s-readtime").value.trim() || "5 min",
      excerpt: form.querySelector("#s-excerpt").value.trim(),
      content: form.querySelector("#s-content").value
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    };

    if (existing) {
      DB.upsertStory({ ...story, id: existing.id, views: existing.views, createdAt: existing.createdAt });
      showToast("Histoire mise à jour.");
    } else {
      DB.upsertStory(story);
      showToast("Histoire publiée.");
    }
    window.location.href = "stories.html";
  });
}

// ---------------- UTILISATEURS ----------------
function renderUsersTable(filter = "") {
  const body = document.querySelector("[data-users-body]");
  if (!body) return;
  const q = filter.trim().toLowerCase();
  const users = DB.getUsers().filter(
    (u) => !q || `${u.prenom} ${u.nom}`.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );

  body.innerHTML = users.length
    ? users.map((u) => `
        <tr>
          <td>${escapeHtml(u.prenom)} ${escapeHtml(u.nom)}</td>
          <td>${escapeHtml(u.email)}</td>
          <td>${escapeHtml(u.date || u.joinedAt || "—")}</td>
          <td><span class="pill-tag">${escapeHtml(u.status || "Actif")}</span></td>
          <td>
            <div class="row-actions">
              <button class="icon-btn danger" data-delete-user="${u.id}">Supprimer</button>
            </div>
          </td>
        </tr>
      `).join("")
    : `<tr><td colspan="5" class="empty-state">Aucun utilisateur ne correspond à ta recherche.</td></tr>`;
}

function initUsersPage() {
  const body = document.querySelector("[data-users-body]");
  if (!body) return;

  renderUsersTable();

  document.querySelector("[data-user-search]")?.addEventListener("input", (e) => {
    renderUsersTable(e.target.value);
  });

  body.addEventListener("click", (e) => {
    const delId = e.target.closest("[data-delete-user]")?.getAttribute("data-delete-user");
    if (delId) {
      const user = DB.getUsers().find((u) => u.id === delId);
      if (confirm(`Supprimer le compte de ${user?.prenom} ${user?.nom} ?`)) {
        DB.deleteUser(delId);
        renderUsersTable(document.querySelector("[data-user-search]")?.value || "");
        showToast("Utilisateur supprimé.");
      }
    }
  });

  const addForm = document.querySelector("[data-add-user-form]");
  addForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const prenom = addForm.querySelector("#u-prenom").value.trim();
    const nom = addForm.querySelector("#u-nom").value.trim();
    const email = addForm.querySelector("#u-email").value.trim();
    if (!prenom || !email) return;
    DB.addUser({ prenom, nom, email });
    addForm.reset();
    renderUsersTable();
    showToast("Utilisateur ajouté.");
  });
}

// ---------------- MESSAGES ----------------
function renderMessagesList(filter = "all") {
  const wrap = document.querySelector("[data-messages-list]");
  if (!wrap) return;
  let messages = DB.getMessages();
  if (filter === "unread") messages = messages.filter((m) => !m.lu);

  wrap.innerHTML = messages.length
    ? messages.map((m) => `
        <div class="admin-panel" style="margin-bottom:16px;">
          <div class="admin-panel-head" style="margin-bottom:10px;">
            <div>
              <strong>${escapeHtml(m.nom)}</strong>
              <span style="color:var(--ink-soft); font-size:13px;"> — ${escapeHtml(m.email)}</span>
              ${!m.lu ? '<span class="pill-tag unread" style="margin-left:8px;">Non lu</span>' : ""}
            </div>
            <span style="color:var(--ink-soft); font-size:13px;">${escapeHtml(m.date)}</span>
          </div>
          <p style="font-weight:600; margin-bottom:6px;">${escapeHtml(m.sujet)}</p>
          <p style="color:var(--ink-soft); font-size:14.5px; line-height:1.7; margin-bottom:16px;">${escapeHtml(m.message)}</p>
          <div class="row-actions">
            ${m.lu
              ? `<button class="icon-btn" data-mark-unread="${m.id}">Marquer non lu</button>`
              : `<button class="icon-btn" data-mark-read="${m.id}">Marquer lu</button>`}
            <button class="icon-btn danger" data-delete-message="${m.id}">Supprimer</button>
          </div>
        </div>
      `).join("")
    : `<div class="empty-state">Aucun message pour le moment.</div>`;
}

function initMessagesPage() {
  const wrap = document.querySelector("[data-messages-list]");
  if (!wrap) return;

  renderMessagesList();

  document.querySelectorAll("[data-message-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-message-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMessagesList(btn.getAttribute("data-message-filter"));
    });
  });

  wrap.addEventListener("click", (e) => {
    const readId = e.target.closest("[data-mark-read]")?.getAttribute("data-mark-read");
    const unreadId = e.target.closest("[data-mark-unread]")?.getAttribute("data-mark-unread");
    const delId = e.target.closest("[data-delete-message]")?.getAttribute("data-delete-message");
    const activeFilter = document.querySelector("[data-message-filter].active")?.getAttribute("data-message-filter") || "all";

    if (readId) { DB.markMessageRead(readId, true); renderMessagesList(activeFilter); }
    if (unreadId) { DB.markMessageRead(unreadId, false); renderMessagesList(activeFilter); }
    if (delId) {
      if (confirm("Supprimer ce message ?")) {
        DB.deleteMessage(delId);
        renderMessagesList(activeFilter);
        showToast("Message supprimé.");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // La page de login gère elle-même son propre accès.
  if (!document.querySelector("[data-admin-login]")) {
    DB.guardAdminPage();
  }
  initAdminLogin();
  initAdminNav();
  initDashboard();
  initStoriesPage();
  initStoryForm();
  initUsersPage();
  initMessagesPage();
});
