import Mocker from "./mocker.js";
import apiKeys from "./apiKeys.js";
document.addEventListener("DOMContentLoaded", () => {
  console.log("hello world");

  const generateUserButton = document.getElementById("generate-user");
  generateUserButton.addEventListener("click", () => {
    console.log("hello world!");
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

    // API 2:

    // API 3:

    // API 4:
  });
});
