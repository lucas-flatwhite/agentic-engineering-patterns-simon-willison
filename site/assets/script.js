// ── Sidebar toggle (mobile) ──────────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

if (menuToggle && sidebar && overlay) {
  menuToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
}

// ── Sidebar section collapse/expand ─────────────────────────────────────
document.querySelectorAll('.sidebar-section-title').forEach(button => {
  button.addEventListener('click', () => {
    const section = button.parentElement;
    const isActive = section.classList.toggle('active');
    button.setAttribute('aria-expanded', isActive);
  });
});

// ── Scroll active sidebar item into view ────────────────────────────────
const activeItem = document.querySelector('.sidebar-section-items a.active');
if (activeItem) {
  requestAnimationFrame(() => {
    activeItem.scrollIntoView({ block: 'center', behavior: 'instant' });
  });
}
