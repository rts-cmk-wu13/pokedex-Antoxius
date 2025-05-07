let divElm = document.createElement("div");
divElm.id = "root";

divElm.innerHTML = `
    <header>
        <img src="img/placeholder.png" alt="" srcset="">
        <span class="brand">Pokédex</span>
        <form action="detail.html">
            <input type="search-input" name="name" id="name">
        </form>
    </header>
    <main class="wrapper">
        <section class="pokeList"></section> <!-- Grid container for Pokémon -->
    </main>
    <footer>
        Founded 2025
    </footer>
`;

document.querySelector("body").append(divElm);
