// class FetchWrapper {
//   constructor(baseURL) {
//     this.baseURL = baseURL;
//   }

//   get(endpoint) {
//     return fetch(this.baseURL + endpoint).then((response) => response.json());
//   }

//   put(endpoint, body) {
//     return this._send("put", endpoint, body);
//   }

//   post(endpoint, body) {
//     return this._send("post", endpoint, body);
//   }

//   patch(endpoint, body) {
//     return this._send("patch", endpoint, body);
//   }

//   delete(endpoint, body) {
//     return this._send("delete", endpoint, body);
//   }

//   _send(method, endpoint, body) {
//     return fetch(this.baseURL + endpoint, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }).then((response) => response.json());
//   }
// }

// const API = new FetchWrapper("https://pokeapi.co/api/v2/pokemon/");

// console.log(API.count);

// // // Pokemon get
// API.get("1").then((pokemon) => {
//   console.log(pokemon.species.name);
// });

// function fetchKantoPokemon() {
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
//     .then((response) => response.json())
//     .then((allpokemon) => console.log(allpokemon));
// }

// fetchKantoPokemon();

const pokedex = document.querySelector("#pokedex");

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
    .then((res) => res.json())
    .then((data) => {
      //   console.log("Sucesss fetch", data);
      //results make array into readable format
      //   pokeCards(data.results);

      const fetches = data.results.map((p) => {
        return fetch(p.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => pokeCards(res));
    });
};
//[0].types[1].type.name
//data moves into data in parenthess in pokecards

const pokeCards = (data) => {
  console.log(data);
  //   pokedex.innerHTML = "something awesome";

  const cards = data
    .map((card) => {
      return `<div id="card"><img src="${card.sprites.other.dream_world.front_default}" alt=""/>
        <div class="pokemonName">${card.name}</div>
        <div>
            <div class="type1">${card.types[0].type.name}</div>
        </div>
      </div>`;
    })
    .join("");
  pokedex.innerHTML = cards;
};

fetchData();
