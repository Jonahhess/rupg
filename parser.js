const parser = () => {
  function parseUsers(users) {
    const [first, ...others] = users.results;
    const currentUser = {
      fname: first.name.first,
      lname: first.name.last,
      city: first.location.city,
      state: first.location.state,
    };
    return [
      currentUser,
      ...others.map((u) => {
        return { fname: u.name.first, lname: u.name.last };
      }),
    ];
  }

  function parsePokemon(pokeInfo) {
    return { name: pokeInfo.name, img: pokeInfo.sprites.front_default };
  }

  return { parseUsers, parsePokemon };
};

export default parser;
