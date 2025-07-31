const parser = () => {
  function parseUsers(users) {
    const [me, ...friends] = users.results;
    const currentUser = {
      name: `${me.name.first} ${me.name.last}`,
      city: me.location.city,
      state: me.location.state,
      picture: me.picture,
    };
    return [
      currentUser,
      ...friends.map((u) => `${u.name.first} ${u.name.last}`),
    ];
  }

  function parsePokemon(pokeInfo) {
    return { name: pokeInfo.name, img: pokeInfo.sprites.front_default };
  }

  return { parseUsers, parsePokemon };
};

export default parser;
