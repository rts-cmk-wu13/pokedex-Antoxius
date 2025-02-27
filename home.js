let search = window.location.search;
let SearchParams = new URLSearchParams(search);
let pokeNameParams = SearchParams.get("name");
const artworkUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

function getIdFromPokemon(pokemonUrl) {
  return pokemonUrl.slice(0, -1).split("/").pop();
}

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      currentOffset = currentOffset + 50;
      fetchPokemon(currentOffset);
    }
  });
});
let attackElm = document.createElement("section");

attackElm.className = "poke-details";

let pokeList = document.querySelector(".pokeList");

let currentOffset = 0;
// Funktion til at hente Pokémon og tilføje dem til grid'et
function fetchPokemon(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      pokeList.innerHTML += pokemon.results
        .map(
          (pokemon) => `
        <article class="single__pokemon">
        <p>#${getIdFromPokemon(pokemon.url)}</p>
        <img loading="lazy" class="poke__img" src="/img/placeholder.png" data-imagesrc="${artworkUrl}/${getIdFromPokemon(
            pokemon.url
          )}.png" alt="${pokemon.name}">
        <p>${pokemon.name}</p>
              <a class="poke__link" href="detail.html?name=${pokemon.name}"></a>
        </article>
        
        `
        )
        .join("");

      let observedPokemon = pokeList.querySelector("article:nth-last-child(5)");
      observer.observe(observedPokemon);

      // let observedImgs = divElm.querySelectorAll(".poke__img")
      // observedImgs.forEach(function (observedImg) {
      //   imgObserver.observe(observedImg)

      // })
    });
}

// Hent de første 20 Pokémon
let currentPokeId = 1;
for (let i = currentPokeId; i < currentPokeId; i++) {
  fetchPokemon(i);
}

fetchPokemon(currentOffset);

const imgObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.imagesrc;
      imgObserver.unobserve(entry.target);
    }
  });
});
