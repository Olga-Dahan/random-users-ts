let favorites = [];
export function getFavorites() {
    return favorites;
}
export function isFavorite(user) {
    return favorites.some(f => f.login.uuid === user.login.uuid);
}
export function toggleFavorite(user) {
    if (isFavorite(user)) {
        favorites = favorites.filter(f => f.login.uuid !== user.login.uuid); //delete user from favorites
    }
    else {
        favorites.push(user); // add user to favorites
    }
}
export function setFavorites(newList) {
    favorites = newList;
}
