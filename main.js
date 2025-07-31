import Mocker from "./mocker.js";
import apiKeys from "./apiKeys.js";
import parser from "./parser.js";
document.addEventListener("DOMContentLoaded", () => {
  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", async () => {
    const mocker = new Mocker();

    // add api_name: key pairs to mocker
    const randomUserGenerator = "random_user_generator";
    mocker.add(randomUserGenerator, apiKeys.randomUserGenerator);

    const randomKanyeQuote = "random_kanye_quote";
    mocker.add(randomKanyeQuote, apiKeys.randomKanyeQuote);

    const pokeAPI = "poke_api";
    mocker.add(pokeAPI.apiKeys.pokeAPI);

    const baconIpsum = "bacon_ipsum";
    mocker.add(baconIpsum, apiKeys.baconIpsum);

    const userPromise = mocker.getData(
      randomUserGenerator,
      "www.random.com",
      "limit=7"
    );

    const kanyePromise = mocker.getData(
      randomKanyeQuote,
      "www.yeezy.com",
      "limit=1"
    );

    const pokePromise = mocker.getData(pokeAPI, "www.pokedex.org", "limit=1");
    const baconPromise = mocker.getData(baconIpsum, "www.bacon.com");

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
