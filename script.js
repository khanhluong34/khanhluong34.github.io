(function() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const label = document.getElementById('themeLabel');
  const preferred = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const modes = ['light', 'dark', 'anime'];

  function applyTheme(mode) {
    if (mode === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', mode);
    }
    localStorage.setItem('theme', mode);
    if (label) label.textContent = mode === 'light' ? 'Default' : mode.charAt(0).toUpperCase() + mode.slice(1);
  }

  function initTheme() {
    if (preferred && modes.includes(preferred)) {
      applyTheme(preferred);
    } else if (systemDark) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  initTheme();

  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'light';
    const idx = modes.indexOf(current);
    const next = modes[(idx + 1) % modes.length];
    applyTheme(next);
  });

  // warn if CV missing (only when served over http/https to avoid file:// CORS issues)
  const cvButton = document.getElementById('cvButton');
  const canCheck = /^https?:/.test(window.location.protocol);
  if (cvButton && canCheck) {
    fetch(cvButton.getAttribute('href'), { method: 'HEAD' })
      .then(resp => { if (!resp.ok) cvButton.textContent = 'CV coming soon'; })
      .catch(() => { /* ignore; keep label */ });
  }
})();
