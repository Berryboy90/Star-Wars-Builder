const AUTH_KEY = 'swb_user';

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
}

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = 'index.html';
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}
