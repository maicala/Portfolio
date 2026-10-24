(() => {
  const dialog = document.querySelector('#admin-dialog');
  if (!dialog) return;
  const loginForm = document.querySelector('#admin-login-form');
  const addForm = document.querySelector('#admin-add-form');
  const loginMessage = document.querySelector('#admin-login-message');
  const addMessage = document.querySelector('#admin-add-message');
  const passwordInput = document.querySelector('#admin-password');
  const text = key => window.siteText ? window.siteText(key) : key;

  function renderAdminText() {
    const english = window.siteLanguage !== 'ar';
    const labels = {
      '#admin-kicker': 'admin-kicker', '#admin-title': 'admin-title', '#admin-password-label': 'admin-password',
      '#admin-login-button': 'admin-login', '#admin-group-label': 'admin-section', '#admin-url-label': 'admin-link',
      '#admin-add-button': 'admin-add', '#admin-logout': 'admin-logout', '#admin-close': 'admin-close'
    };
    Object.entries(labels).forEach(([selector, key]) => { document.querySelector(selector).textContent = text(key); });
    const group = document.querySelector('#admin-group');
    group.options[0].textContent = text('admin-ads');
    group.options[1].textContent = text('admin-short');
    group.options[2].textContent = text('admin-long');
    document.querySelector('#open-admin').setAttribute('aria-label', text('admin-title'));
    document.querySelector('#open-admin').setAttribute('title', text('admin-title'));
    document.querySelector('#admin-close').setAttribute('aria-label', text('admin-close'));
    document.querySelector('#admin-video-url').placeholder = english ? 'https://vimeo.com/…' : 'https://streamable.com/…';
  }

  async function api(url, options = {}) {
    const response = await fetch(url, { credentials: 'same-origin', cache: 'no-store', ...options });
    let body = {};
    try { body = await response.json(); } catch {}
    return { response, body };
  }

  function showLogin(message = '') {
    loginForm.hidden = false;
    addForm.hidden = true;
    loginMessage.textContent = message;
    addMessage.textContent = '';
    passwordInput.value = '';
  }

  async function openManager() {
    dialog.showModal();
    showLogin();
    try {
      const { response, body } = await api('api/admin/session');
      if (response.ok && body.authenticated) {
        loginForm.hidden = true;
        addForm.hidden = false;
        document.querySelector('#admin-video-url').focus();
      } else passwordInput.focus();
    } catch {
      loginMessage.textContent = text('admin-unavailable');
      passwordInput.focus();
    }
  }

  document.querySelector('#open-admin').addEventListener('click', openManager);
  document.querySelector('#admin-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('languagechange', renderAdminText);

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    loginMessage.textContent = '';
    const button = document.querySelector('#admin-login-button');
    button.disabled = true;
    try {
      const { response } = await api('api/admin/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.value })
      });
      if (response.ok) {
        loginForm.hidden = true;
        addForm.hidden = false;
        document.querySelector('#admin-video-url').focus();
      } else if (response.status === 401) loginMessage.textContent = text('admin-incorrect');
      else loginMessage.textContent = response.status === 429 ? text('admin-error') : text('admin-unavailable');
    } catch {
      loginMessage.textContent = text('admin-unavailable');
    } finally {
      button.disabled = false;
    }
  });

  addForm.addEventListener('submit', async event => {
    event.preventDefault();
    addMessage.textContent = '';
    const button = document.querySelector('#admin-add-button');
    button.disabled = true;
    try {
      const { response, body } = await api('api/videos', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group: document.querySelector('#admin-group').value, url: document.querySelector('#admin-video-url').value })
      });
      if (response.ok) {
        addMessage.textContent = text('admin-added');
        window.setTimeout(() => window.location.reload(), 500);
      } else if (response.status === 401) showLogin(text('admin-incorrect'));
      else if (body.error === 'invalid-video') addMessage.textContent = text('admin-invalid');
      else if (body.error === 'duplicate') addMessage.textContent = text('admin-duplicate');
      else addMessage.textContent = text('admin-error');
    } catch {
      addMessage.textContent = text('admin-unavailable');
    } finally {
      button.disabled = false;
    }
  });

  document.querySelector('#admin-logout').addEventListener('click', async () => {
    try { await api('api/admin/logout', { method: 'POST' }); } catch {}
    showLogin();
    passwordInput.focus();
  });

  renderAdminText();
})();
