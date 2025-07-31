export function parseUsers(users) {
  const [me, ...friends] = users.results;
  const currentUser = {
    name: `${me.name.first} ${me.name.last}`,
    city: me.location.city,
    state: me.location.state,
    picture: me.picture,
  };
  return [currentUser, ...friends.map((u) => `${u.name.first} ${u.name.last}`)];
}

export function parsePokemon(pokeInfo) {
  return { name: pokeInfo.name, sprite: pokeInfo.sprites.front_default };
}
