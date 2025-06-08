export function createUserCard(user, isFavorite, toggleFavorite) {
    const myDiv = document.createElement('div');
    myDiv.className = 'col-md-4';
    myDiv.id = user.login.uuid;
    myDiv.innerHTML = `
    <div class="user-card">
      <img src="${user.picture.large}" alt="user" />
      <p>${user.name.first} ${user.name.last}</p>
      <p>${user.email}</p>
      <p>${user.gender}</p>
      <p>${user.dob.age} years old</p>
      <button class="btn btn-${isFavorite ? 'danger' : 'primary'} btn-sm">
        ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  `;
    myDiv.querySelector('button').addEventListener('click', () => toggleFavorite(user));
    return myDiv;
}
