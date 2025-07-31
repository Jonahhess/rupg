import getData from "./getData.js";
import apiKeys from "./apiKeys.js";
import parser from "./parser.js";
document.addEventListener("DOMContentLoaded", () => {
  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", async () => {
    const userPromise = getData(
      "www.random.com",
      apiKeys.randomUserGenerator,
      "limit=7"
    );

    const kanyePromise = mocker.getData(
      "www.yeezy.com",
      apiKeys.randomKanyeQuote,
      "limit=1"
    );

    const pokePromise = mocker.getData(
      "www.pokedex.org",
      apiKeys.pokeAPI,
      "limit=1"
    );
    const baconPromise = mocker.getData("www.bacon.com", apiKeys.baconIpsum);

    const [users, kanyeText, pokeInfo, baconText] = await Promise.all([
      userPromise,
      kanyePromise,
      pokePromise,
      baconPromise,
    ]);

    const [currentUser, ...friends] = parser.parseUsers(users);
    const kanyeQuote = `'${kanyeText}' - Kanye West`;
    const pokemon = parser.parsePokemon(pokeInfo);

    // Attach info to page
    const div = document.createElement("div");
    div.setAttribute("id", "");
  });
});
