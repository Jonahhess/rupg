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
    const div = document.createElement("div");
    div.setAttribute("id", "");
  });
});
