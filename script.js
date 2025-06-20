const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const typesContainer = document.getElementById("types");
const spriteContainer = document.getElementById("sprite-container");

const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  pokemonName.textContent = '';
  pokemonId.textContent = '';
  typesContainer.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

searchButton.addEventListener("click", async () => {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (!searchValue) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchValue}`);
    if (!res.ok) throw new Error("Pokémon not found");

    const data = await res.json();

    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    typesContainer.innerHTML = "";
    data.types.forEach(typeInfo => {
      const typeElement = document.createElement("span");
      typeElement.classList.add("type", typeInfo.type.name);
      typeElement.textContent = typeInfo.type.name.toUpperCase();
      typesContainer.appendChild(typeElement);
    });

    const sprite = document.createElement("img");
    sprite.id = "sprite";
    sprite.src = `${data.sprites.front_default}`;
    spriteContainer.innerHTML = ""; 
    spriteContainer.appendChild(sprite);

  } catch (error) {
    resetDisplay();
    alert(error.message);
  }
});