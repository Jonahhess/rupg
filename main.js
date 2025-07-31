import getData from "./getData.js";
import parse from "./parser.js";
document.addEventListener("DOMContentLoaded", () => {
  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", async () => {
    const [users, kanye, pokedex, baconIpsum] = await Promise.all([
      getData("https://randomuser.me/api/?results=7"),
      getData("https://api.kanye.rest"),
      getData("https://pokeapi.co/api/v2/pokemon/3"),
      getData("https://baconipsum.com/api/?type=meat-and-filler"),
    ]);

    // prepare data for page
    const parser = parse();
    const [currentUser, ...friends] = parser.parseUsers(users);
    const kanyeQuote = `'${kanye.quote}' - Kanye West`;
    const pokemon = parser.parsePokemon(pokedex);
    const bacon = baconIpsum.join("\n");

    // Attach info to page
    const userContainer = document.createElement("div");
    userContainer.setAttribute("id", "user-container");

    const currentUserContainer = document.createElement("div");
    currentUserContainer.setAttribute("id", "current-user-container");

    const pictureContainer = document.createElement("div");
    pictureContainer.setAttribute("id", "picture-container");

    const currentUserPicture = document.createElement("img");
    currentUserPicture.setAttribute("id", "current-user-picture");
    currentUserPicture.setAttribute("src", currentUser.picture.thumbnail);

    pictureContainer.appendChild(currentUserPicture);
    currentUserContainer.appendChild(pictureContainer);

    const currentUserName = document.createElement("p");
    currentUserName.setAttribute("id", "current-user-name");
    currentUserName.innerHTML = currentUser.name;
    currentUserContainer.appendChild(currentUserName);

    const currentUserLocation = document.createElement("p");
    currentUserLocation.setAttribute("id", "current-user-location");
    currentUserLocation.innerHTML = `${currentUser.city}, ${currentUser.state}`;
    currentUserContainer.appendChild(currentUserLocation);
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
    userContainer.appendChild(friendsListContainer);

    const target = document.getElementById("target");
    target.appendChild(userContainer);
  });
});
