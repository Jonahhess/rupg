import model from "./model.js";
import getData from "./getData.js";
import parse from "./parser.js";

export default async function init() {
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

  return update([
    ["currentUser", currentUser],
    ["kanyeQuote", kanyeQuote],
    ["pokemon", pokemon],
    ["bacon", bacon],
    ["friends", friends],
  ]);
}

export function update(entries) {
  for (const [key, value] of entries) {
    model.set(key, value);
  }
  return model;
}
