const API = new FetchWrapper("https://pokeapi.co/api/v2/pokemon/");

// Pokemon get
API.get("12").then((data) => {
  console.log(data.species.name);
});
