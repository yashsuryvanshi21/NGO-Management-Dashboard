(() => {
  const button = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.dash-sidebar');

  if (!button || !sidebar) return;

  button.addEventListener('click', () => {
    const open = sidebar.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
})();
