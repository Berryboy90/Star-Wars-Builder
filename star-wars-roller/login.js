const USERS_KEY = 'swb_users';
const AUTH_KEY = 'swb_user';

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const authMessage = document.getElementById('authMessage');

function setMessage(text, isError = false) {
  authMessage.textContent = text;
  authMessage.classList.toggle('error', isError);
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function login(username, password) {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) {
    setMessage('Invalid username or password.', true);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
  window.location.href = 'builder.html';
}

function signup(username, password) {
  const users = getUsers();
  if (users.some((u) => u.username === username)) {
    setMessage('That username is already taken.', true);
    return;
  }
  users.push({ username, password });
  saveUsers(users);
  localStorage.setItem(AUTH_KEY, JSON.stringify({ username }));
  window.location.href = 'builder.html';
}

if (localStorage.getItem(AUTH_KEY)) {
  window.location.href = 'builder.html';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!username || !password) {
    setMessage('Enter both username and password.', true);
    return;
  }
  login(username, password);
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  if (!username || !password) {
    setMessage('Choose a username and password.', true);
    return;
  }
  signup(username, password);
});
