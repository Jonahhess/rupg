import * as update from "./update.js";

document.addEventListener("DOMContentLoaded", () => {
  const generateUserButton = document.getElementById("generate-user-button");

  const saveUserButton = document.getElementById("save-user-button");
  saveUserButton.style.display = "none";

  const loadUserButton = document.getElementById("load-user-button");
  loadUserButton.style.display = "none";

  generateUserButton.addEventListener("click", async () => {
    update
      .init()
      .then((model) => {
        render(model);
        saveUserButton.style.display = "initial";
        loadUserButton.style.display = "initial";
      })
      .catch((error) => {
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = error;
      });
  });

  saveUserButton.addEventListener("click", () => update.saveUser());

  loadUserButton.addEventListener("click", () => {
    const savedUsersList = document.getElementById("saved-users-list");

    // hide list if user clicks away
    document.addEventListener("mouseup", function (e) {
      if (savedUsersList && !savedUsersList.contains(e.target)) {
        savedUsersList.style.display = "none"; // Hide the container.
      }
    });

    renderSavedUsers();
    const users = document.getElementsByClassName("saved-user");
    if (users.length) savedUsersList.style.display = "initial";
    Array.from(users).forEach((user) => {
      user.addEventListener("click", () => {
        render(update.loadUser(user.textContent));
        savedUsersList.style.display = "none";
      });
    });
  });
});

function render(model) {
  const currentUser = model["currentUser"];
  const kanyeQuote = model["kanyeQuote"];
  const pokemon = model["pokemon"];
  const bacon = model["bacon"];
  const friends = model["friends"];

  const userContainer = document.createElement("div");
  userContainer.setAttribute("id", "user-container");

  const currentUserContainer = document.createElement("div");
  currentUserContainer.setAttribute("id", "current-user-container");

  const pictureContainer = document.createElement("div");
  pictureContainer.setAttribute("id", "picture-container");

  const currentUserPicture = document.createElement("img");
  currentUserPicture.setAttribute("id", "current-user-picture");
  currentUserPicture.setAttribute("src", currentUser.picture.large);

  pictureContainer.appendChild(currentUserPicture);
  currentUserContainer.appendChild(pictureContainer);

  const currentUserDetails = document.createElement("div");
  currentUserDetails.setAttribute("id", "current-user-details");

  const currentUserName = document.createElement("p");
  currentUserName.setAttribute("id", "current-user-name");
  currentUserName.innerHTML = currentUser.name;
  currentUserDetails.appendChild(currentUserName);

  const currentUserLocation = document.createElement("p");
  currentUserLocation.setAttribute("id", "current-user-location");
  currentUserLocation.innerHTML = `${currentUser.city}, ${currentUser.state}`;
  currentUserDetails.appendChild(currentUserLocation);
  currentUserContainer.appendChild(currentUserDetails);
  userContainer.appendChild(currentUserContainer);

  const quoteContainer = document.createElement("div");
  quoteContainer.setAttribute("id", "quote-container");

  const quoteTitle = document.createElement("p");
  quoteTitle.setAttribute("id", "quote-title");
  quoteTitle.innerHTML = "Favorite quote:";
  quoteContainer.appendChild(quoteTitle);

  const quoteContent = document.createElement("p");
  quoteContent.setAttribute("id", "quote-content");
  quoteContent.innerHTML = kanyeQuote;
  quoteContainer.appendChild(quoteContent);
  userContainer.appendChild(quoteContainer);

  const pokemonContainer = document.createElement("div");
  pokemonContainer.setAttribute("id", "pokemon-container");

  const pokemonSpriteContainer = document.createElement("div");
  pokemonSpriteContainer.setAttribute("id", "pokemon-sprite-container");

  const pokemonSprite = document.createElement("img");
  pokemonSprite.setAttribute("id", "pokemon-sprite");
  pokemonSprite.setAttribute("src", pokemon.sprite);

  pokemonSpriteContainer.appendChild(pokemonSprite);
  pokemonContainer.appendChild(pokemonSpriteContainer);

  const favoritePokemon = document.createElement("p");
  favoritePokemon.setAttribute("id", "favorite-pokemon");
  favoritePokemon.innerHTML = `Favorite Pokémon: ${pokemon.name}`;
  pokemonContainer.appendChild(favoritePokemon);
  userContainer.appendChild(pokemonContainer);

  const aboutMeContainer = document.createElement("div");
  aboutMeContainer.setAttribute("id", "about-me-container");

  const aboutMeTitle = document.createElement("p");
  aboutMeTitle.setAttribute("id", "about-me-title");
  aboutMeTitle.innerHTML = "About me";
  aboutMeContainer.appendChild(aboutMeTitle);

  const aboutMeContent = document.createElement("p");
  aboutMeContent.setAttribute("id", "about-me-content");
  aboutMeContent.innerHTML = bacon;
  aboutMeContainer.appendChild(aboutMeContent);
  userContainer.appendChild(aboutMeContainer);

  const friendsListContainer = document.createElement("div");
  friendsListContainer.setAttribute("id", "friends-list-container");

  const friendsListTitle = document.createElement("p");
  friendsListTitle.setAttribute("id", "friends-list-title");
  friendsListTitle.innerHTML = "Friends";
  friendsListContainer.appendChild(friendsListTitle);

  const friendsList = document.createElement("ul");
  friendsList.setAttribute("id", "friends-list");

  friends.forEach((name) => {
    const friendName = document.createElement("li");
    friendName.setAttribute("class", `friend`);
    friendName.innerHTML = name;
    friendsList.appendChild(friendName);
  });
  friendsListContainer.appendChild(friendsList);

  const target = document.getElementById("target");
  target.innerHTML = "";
  target.appendChild(userContainer);
  target.appendChild(friendsListContainer);
}

function renderSavedUsers() {
  const saveUsersList = document.getElementById("saved-users-list");
  saveUsersList.innerHTML = "";
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.forEach((user) => {
    if (Object.keys(user).length !== 1) {
      console.error("fatal error: some user saved incorrectly ");
      console.error(`Bad User: ${user}`);
      localStorage.clear();
    }

    const [name] = Object.keys(user);
    const savedUser = document.createElement("li");
    savedUser.setAttribute("class", "saved-user");
    savedUser.innerHTML = name;
    saveUsersList.appendChild(savedUser);
  });
}
