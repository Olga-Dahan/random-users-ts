import { fetchUsers } from './api.js';
import { createUserCard } from './dom.js';
import { setupDragDrop } from './dragdrop.js';
import { getFavorites, toggleFavorite, isFavorite, setFavorites } from './favorites.js';
// import { enableDragDrop } from './dragdrop.js';
import { User } from './interfaces.js';

const usersContainer = document.getElementById('users')!;
const favoritesContainer = document.getElementById('favorites')!;
const favoritesCount = document.getElementById('favorites-count')!;

let users: User[] = [];

export function getUsers(): User[] {
  return users;
}

export function setUsers(newList: User[]) {
  users = newList;
}

export function renderUsers() {
  usersContainer.innerHTML = '';
  users.forEach(user => {
    const card = createUserCard(user, isFavorite(user), handleToggleFavorite);
    usersContainer.appendChild(card);
  });
}

export function renderFavorites() {
  favoritesContainer.innerHTML = '';
  const favorites = getFavorites();
  favorites.forEach(user => {
    const card = createUserCard(user, true, handleToggleFavorite);
    favoritesContainer.appendChild(card);
  });
  favoritesCount.textContent = favorites.length.toString();
}

function handleToggleFavorite(user: User) {
  toggleFavorite(user);
  renderUsers();
  renderFavorites();
}


async function loadMoreUsers(num: number) {
  const newUsers = await fetchUsers(num);
  users.push(...newUsers);
  renderUsers();
}

// Infinite scroll
let isLoading = false;

window.addEventListener('scroll', async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isLoading
  ) {
    isLoading = true;
    try {
      await loadMoreUsers(10);
    } finally {
      isLoading = false;
    }
  }
});

loadMoreUsers(40);

setupDragDrop();







