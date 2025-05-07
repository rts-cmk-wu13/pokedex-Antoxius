// Skift navnet på 'search' for at undgå konflikt
let search = window.location.search;
let params = new URLSearchParams(search);
let pokeName = params.get("name");

let sectionElm = document.createElement("section");
sectionElm.className = "pokelist";

fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (pokemon) {
    sectionElm.innerHTML = `
            <p class="pokemon__name">${pokemon.name}</p>
            <p>#${pokemon.id.toString().padStart(4, "0")}</p>
            <img class="poke__img" src="${
              pokemon.sprites.other["official-artwork"].front_default
            }" alt="${pokemon.name}">

            <section>
              <div class="size">
                <p>${pokemon.weight} Kg</p>
                <p>${pokemon.height} m</p>
              </div>
                ${pokemon.abilities
                  .slice(0, 2)
                  .map(function (singleMove) {
                    return `<p>${singleMove.ability.name}</p>`;
                  })
                  .join("")}
            </section>
            
            <section class="poke__stats">
                ${pokemon.stats
                  .map(function (singleStat) {
                    return `
                        <p>${singleStat.stat.name}</p>
                        <meter id="file" max="250" value="${singleStat.base_stat}"></meter>
                    `;
                  })
                  .join("")}
            </section>
      `;
    document.querySelector("main").append(sectionElm);
  })
  .catch(
    (sectionElm.innerHTML = `
    <h2>no Pokémon was found with that name!</h2>
    <p>Go back to <a href="index.html">front page</a></p>
    
    `)
  );
