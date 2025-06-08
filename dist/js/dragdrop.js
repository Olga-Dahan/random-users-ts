import { getFavorites, setFavorites } from './favorites.js';
import { getUsers, renderFavorites, renderUsers, setUsers } from './main.js';
export function setupDragDrop() {
    $(function () {
        $('#favorites').sortable({
            update: function () {
                const newOrderIds = $('#favorites').sortable('toArray'); // ["uuid3", "uuid1", "uuid2"]
                const currentFavorites = getFavorites();
                const favorites = newOrderIds
                    .map(uuid => currentFavorites.find(user => user.login.uuid === uuid)) // find User per uuid
                    .filter(Boolean); // delete null/undefined 
                setFavorites(favorites);
                renderFavorites();
            }
        });
        $('#users').sortable({
            update: function () {
                const newOrderIds = $('#users').sortable('toArray'); // ["uuid1", "uuid2"]
                const users = getUsers();
                const newUsers = newOrderIds
                    .map(uuid => users.find(user => user.login.uuid === uuid))
                    .filter(Boolean);
                setUsers(newUsers);
                renderUsers();
            }
        });
    });
}
