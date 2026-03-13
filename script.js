(function() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const preferred = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(mode) {
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', mode);
  }

  // initialize
  if (preferred) {
    setTheme(preferred);
  } else if (systemDark) {
    setTheme('dark');
  }

  toggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
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
