import model from "./model.js";
import getData from "./getData.js";
import * as parser from "./parser.js";

export async function init() {
  const [users, kanye, pokedex, baconIpsum] = await Promise.all([
    getData("https://randomuser.me/api/?results=7"),
    getData("https://api.kanye.rest"),
    getData(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1025)}`
    ),
    getData("https://baconipsum.com/api/?type=meat-and-filler"),
  ]);

  // prepare data for page
  const [currentUser, ...friends] = parser.parseUsers(users);
  const kanyeQuote = `'${kanye.quote}' - Kanye West`;
  const pokemon = parser.parsePokemon(pokedex);
  const bacon = baconIpsum.join("\n");

  const user = {
    currentUser,
    kanyeQuote,
    pokemon,
    bacon,
    friends,
  };

  for (const key in user) {
    model[key] = user[key];
  }

  return model;
}

function assignUser(from, to = model) {
  for (const key in model) {
    to[key] = from[key];
  }

  return to;
}

function validateShape(newObj, oldObj) {
  for (const key in oldObj) {
    const oldValue = oldObj[key];
    const newValue = newObj[key];

    // case 1: new obj missing value
    if (!newValue) throw new Error(`missing value for: ${key}`);

    // case 2: value is different type than original value
    if (typeof oldValue !== typeof newValue) throw new Error("type mismatch");

    // case 3: value is object - note:
    if (typeof newValue === "object") {
      validateShape(newValue, oldValue);
    }
  }
}

export function saveUser(user = model) {
  if (typeof user !== "object") throw new Error("cannot save user");

  const name = user.currentUser?.name;
  if (!name || typeof name !== "string") throw new Error("invalid name");

  const cache = localStorage.getItem(name);
  if (cache) return;

  const userToSave = assignUser(user, {});
  validateShape(userToSave, model);
  localStorage.setItem(
    JSON.stringify(userToSave.currentUser.name), // note: names cannot collide
    JSON.stringify(userToSave)
  );
}

export function loadUser(name) {
  if (typeof name !== "string") throw new Error("invalid name");
  const cache = localStorage.getItem(name);
  if (!cache) throw new Error(`User '${name}' not found`);
  return JSON.parse(cache);
}

export function update(user) {
  validateShape(user);
  return assignUser(user);
}
