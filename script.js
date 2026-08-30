const moodStates = [
  {
    text: 'this is my web page i added something cool type in my username (sneakygamer7083)',
    badge: 'Current vibe: chill',
    accent: '#7a72ff',
    glow: 'rgba(44, 112, 255, 0.2)',
    bgPrimary: '#000000',
    bgTop: '#000010',
    bgBottom: '#00081a',
    panel: 'rgba(8, 24, 56, 0.95)',
    panelAlt: 'rgba(7, 18, 42, 0.97)',
    card: 'rgba(12, 26, 55, 0.72)',
    border: 'rgba(79, 147, 255, 0.35)',
    textColor: '#d9e7ff',
    heading: '#c7e2ff',
    link: '#88b8ff',
    linkHover: '#d8efff'
  },
  {
    text: 'currently building cool things online',
    badge: 'Current vibe: creative',
    accent: '#4cc9f0',
    glow: 'rgba(76, 201, 240, 0.22)',
    bgPrimary: '#02131a',
    bgTop: '#041d29',
    bgBottom: '#081f2e',
    panel: 'rgba(8, 32, 46, 0.96)',
    panelAlt: 'rgba(7, 20, 30, 0.97)',
    card: 'rgba(11, 31, 40, 0.8)',
    border: 'rgba(76, 201, 240, 0.4)',
    textColor: '#dff9ff',
    heading: '#d0f8ff',
    link: '#8ae3ff',
    linkHover: '#effcff'
  },
  {
    text: 'obsessed with Minecraft and game design',
    badge: 'Current vibe: gaming',
    accent: '#7ae582',
    glow: 'rgba(122, 229, 130, 0.2)',
    bgPrimary: '#07150c',
    bgTop: '#0a1f12',
    bgBottom: '#112419',
    panel: 'rgba(12, 38, 25, 0.95)',
    panelAlt: 'rgba(9, 27, 18, 0.97)',
    card: 'rgba(15, 35, 24, 0.8)',
    border: 'rgba(122, 229, 130, 0.38)',
    textColor: '#e8ffe9',
    heading: '#d6f8d8',
    link: '#90f0a4',
    linkHover: '#f2fff3'
  },
  {
    text: 'ready for the next challenge',
    badge: 'Current vibe: ambitious',
    accent: '#ffb703',
    glow: 'rgba(255, 183, 3, 0.18)',
    bgPrimary: '#170b00',
    bgTop: '#2a1400',
    bgBottom: '#3b1800',
    panel: 'rgba(48, 28, 7, 0.95)',
    panelAlt: 'rgba(32, 19, 4, 0.97)',
    card: 'rgba(46, 29, 11, 0.8)',
    border: 'rgba(255, 183, 3, 0.38)',
    textColor: '#fff2d9',
    heading: '#ffe9b0',
    link: '#ffcf5c',
    linkHover: '#fff6de'
  }
];

const moodText = document.getElementById('mood-text');
const moodButton = document.getElementById('mood-button');
const statusBadge = document.getElementById('status-badge');
const nicknameInput = document.getElementById('nickname-input');
const favoriteInput = document.getElementById('favorite-input');
const addFavoriteButton = document.getElementById('add-favorite-button');
const favoriteList = document.getElementById('favorite-list');

let moodIndex = 0;

const defaultFavorites = ['Minecraft', 'Terraria', 'YouTube', 'Coding', 'BLT'];
const sneakygamer7083Favorites = ['Minecraft', 'Terraria', 'YouTube', 'Coding', 'BLT', 'Pixel art'];

function renderFavorites(items) {
  if (!favoriteList) {
    return;
  }

  favoriteList.innerHTML = '';
  items.forEach((favorite) => addFavoriteItem(favorite));
}

function updateMood() {
  const currentMood = moodStates[moodIndex];
  const root = document.documentElement;

  root.style.setProperty('--bg-primary', currentMood.bgPrimary);
  root.style.setProperty('--bg-top', currentMood.bgTop);
  root.style.setProperty('--bg-bottom', currentMood.bgBottom);
  root.style.setProperty('--panel-bg', currentMood.panel);
  root.style.setProperty('--panel-alt', currentMood.panelAlt);
  root.style.setProperty('--card-bg', currentMood.card);
  root.style.setProperty('--border-color', currentMood.border);
  root.style.setProperty('--text-main', currentMood.textColor);
  root.style.setProperty('--heading-color', currentMood.heading);
  root.style.setProperty('--link-color', currentMood.link);
  root.style.setProperty('--link-hover', currentMood.linkHover);
  root.style.setProperty('--page-glow', currentMood.glow);
  root.style.setProperty('--accent-color', currentMood.accent);

  if (moodText) {
    moodText.textContent = currentMood.text;
    moodText.style.color = currentMood.textColor;
  }

  if (statusBadge) {
    statusBadge.textContent = currentMood.badge;
    statusBadge.style.borderColor = currentMood.accent;
    statusBadge.style.background = `${currentMood.accent}22`;
    statusBadge.style.color = '#f4f9ff';
  }
}

function getNicknameColor(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return '#d3e7ff';
  }

  const colorMap = {
    a: '#c77dff',
    b: '#90e0ef',
    c: '#7ae582',
    d: '#ffd166',
    e: '#ff9f1c',
    f: '#ff6b6b'
  };

  const firstLetter = trimmed.charAt(0).toLowerCase();
  return colorMap[firstLetter] || '#d3e7ff';
}

function updateNicknameStyle() {
  if (!nicknameInput) {
    return;
  }

  const nickname = nicknameInput.value.trim();
  const nextColor = getNicknameColor(nickname);
  nicknameInput.style.borderColor = nextColor;
  nicknameInput.style.boxShadow = `0 0 0 3px ${nextColor}22`;

  if (moodText) {
    moodText.style.color = moodStates[moodIndex].textColor;
  }

  if (nickname.toLowerCase() === 'sneakygamer7083') {
    renderFavorites(sneakygamer7083Favorites);
  } else {
    renderFavorites(defaultFavorites);
  }
}

function addFavoriteItem(text) {
  const itemText = text.trim();
  if (!itemText || !favoriteList) {
    return;
  }

  const listItem = document.createElement('li');
  listItem.className = 'favorite-item';

  const label = document.createElement('span');
  label.textContent = itemText;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Remove';

  deleteButton.addEventListener('click', () => {
    listItem.remove();
  });

  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  favoriteList.appendChild(listItem);
}

if (moodButton) {
  moodButton.addEventListener('click', () => {
    moodIndex = (moodIndex + 1) % moodStates.length;
    updateMood();
    updateNicknameStyle();
  });
}

if (nicknameInput) {
  nicknameInput.addEventListener('input', updateNicknameStyle);
}

if (addFavoriteButton) {
  addFavoriteButton.addEventListener('click', () => {
    addFavoriteItem(favoriteInput.value);
    favoriteInput.value = '';
    favoriteInput.focus();
  });
}

if (favoriteInput) {
  favoriteInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addFavoriteItem(favoriteInput.value);
      favoriteInput.value = '';
      favoriteInput.focus();
    }
  });
}

renderFavorites(defaultFavorites);
updateMood();
updateNicknameStyle();
