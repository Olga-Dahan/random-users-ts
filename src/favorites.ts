import { User } from './interfaces.js';

let favorites: User[] = [];

export function getFavorites(): User[] {
  return favorites;
}

export function isFavorite(user: User): boolean {
  return favorites.some(f => f.login.uuid === user.login.uuid);
}

export function toggleFavorite(user: User): void {
  if (isFavorite(user)) {
    favorites = favorites.filter(f => f.login.uuid !== user.login.uuid);  //delete user from favorites
  } else {
    favorites.push(user);  // add user to favorites
  }
}

export function setFavorites(newList: User[]) {
  favorites = newList;
}