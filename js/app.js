/* Shared helpers for the dashboard pages. */
const App = (() => {
  const read = (key, fallback = []) => { try { const value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : fallback; } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" })[char]);
  const money = value => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(Number(value) || 0);
  const toast = message => { let element = document.querySelector(".toast-message"); if (!element) { element = document.createElement("div"); element.className = "toast-message"; element.setAttribute("role", "status"); document.body.append(element); } element.textContent = message; element.classList.add("show"); clearTimeout(element.timer); element.timer = setTimeout(() => element.classList.remove("show"), 2600); };
  const confirmDelete = label => window.confirm(`Delete this ${label}? This action cannot be undone.`);
  const id = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return { read, write, escapeHtml, money, toast, confirmDelete, id };
})();

document.querySelectorAll(".logout-btn").forEach(link => link.addEventListener("click", event => {
  if (!window.confirm("Are you sure you want to log out?")) event.preventDefault();
}));

// Keep the Campaigns destination available across all legacy management pages.
document.querySelectorAll(".sidebar ul").forEach(menu => {
  if (menu.querySelector('a[href="campaigns.html"]')) return;
  const logout = menu.querySelector(".logout-btn")?.closest("li");
  const item = document.createElement("li");
  item.innerHTML = '<a href="campaigns.html"><i class="fa-solid fa-calendar-days"></i><span>Campaigns</span></a>';
  menu.insertBefore(item, logout || null);
});

if (document.querySelector(".wrapper .sidebar")) {
  const fonts = document.createElement("link");
  fonts.rel = "stylesheet";
  fonts.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap";
  document.head.append(fonts);
  const theme = document.createElement("link");
  theme.rel = "stylesheet";
  theme.href = "css/management.css";
  document.head.append(theme);

  document.querySelectorAll(".sidebar").forEach(sidebar => {
    sidebar.classList.add("dashboard-type-sidebar");
    const menu = sidebar.querySelector("ul");
    if (menu && !sidebar.querySelector(".sidebar-caption")) {
      const caption = document.createElement("div");
      caption.className = "sidebar-caption";
      caption.textContent = "Workspace";
      sidebar.insertBefore(caption, menu);
    }
    const logout = sidebar.querySelector(".logout-btn")?.closest("li");
    if (logout && !sidebar.querySelector(".sidebar-help")) {
      const help = document.createElement("div");
      help.className = "sidebar-help";
      help.innerHTML = '<span class="help-icon"><i class="fa-regular fa-circle-question"></i></span><div><strong>Need assistance?</strong><span>Get in touch with our team</span></div>';
      sidebar.insertBefore(help, logout);
    }
  });
}
