var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchUsers } from './api.js';
import { createUserCard } from './dom.js';
import { setupDragDrop } from './dragdrop.js';
import { getFavorites, toggleFavorite, isFavorite } from './favorites.js';
const usersContainer = document.getElementById('users');
const favoritesContainer = document.getElementById('favorites');
const favoritesCount = document.getElementById('favorites-count');
let users = [];
export function getUsers() {
    return users;
}
export function setUsers(newList) {
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
function handleToggleFavorite(user) {
    toggleFavorite(user);
    renderUsers();
    renderFavorites();
}
function loadMoreUsers(num) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUsers = yield fetchUsers(num);
        users.push(...newUsers);
        renderUsers();
    });
}
// Infinite scroll
let isLoading = false;
window.addEventListener('scroll', () => __awaiter(void 0, void 0, void 0, function* () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading) {
        isLoading = true;
        try {
            yield loadMoreUsers(10);
        }
        finally {
            isLoading = false;
        }
    }
}));
loadMoreUsers(40);
setupDragDrop();
