const pokedex = document.querySelector("#pokedex");
let searchPokemon = document.querySelector("#input");

// const fetchData = () => {
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
//     .then((res) => res.json())
//     .then((data) => {
//       //   console.log("Sucesss fetch", data);
//       //results make array into readable format
//       //   pokeCards(data.results);

//       //   const fetches = data.results.map((p) => {
//       //     return fetch(p.url).then((res) => res.json());
//       //   });
//       //   Promise.all(fetches).then((res) => pokeCards(res));
//     });
// };

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      type: result.types.map((type) => type.type.name).join(" "),
      id: result.id,
      image: result.sprites.other.dream_world["front_default"],
      //   type: result.types.map((type) => type.type.name).join(" "),
    }));

    pokeCards(pokemon);
  });
};

//data moves into data in parenthess in pokecards
const pokeCards = (data) => {
  console.log(data);
  const cards = data
    .map((card) => {
      return `<div id="card"><img src="${card.image}" alt=""/>
        <div class="pokemonName">${card.name}</div>
        <div>
            <div class="type1">${card.type}</div>
        </div>
      </div>`;
    })
    .join("");

  pokedex.innerHTML = cards;
};

fetchPokemon();
