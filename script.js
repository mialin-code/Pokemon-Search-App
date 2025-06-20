    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
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

    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // 🚫 prevent form reload

      const searchValue = searchInput.value.trim().toLowerCase();
      if (!searchValue) {
        alert("Please enter a Pokémon name or ID");
        return;
      }

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
        if (!res.ok) throw new Error("Pokémon not found");

        const data = await res.json();

        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;

        hp.textContent = data.stats.find(stat => stat.stat.name === "hp").base_stat;
        attack.textContent = data.stats.find(stat => stat.stat.name === "attack").base_stat;
        defense.textContent = data.stats.find(stat => stat.stat.name === "defense").base_stat;
        specialAttack.textContent = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
        specialDefense.textContent = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
        speed.textContent = data.stats.find(stat => stat.stat.name === "speed").base_stat;

        typesContainer.innerHTML = "";
        data.types.forEach(typeInfo => {
          const typeElement = document.createElement("span");
          typeElement.classList.add("type", typeInfo.type.name);
          typeElement.textContent = typeInfo.type.name.toUpperCase();
          typesContainer.appendChild(typeElement);
        });

        const sprite = document.createElement("img");
        sprite.id = "sprite";
        sprite.src = data.sprites.front_default;
        sprite.alt = data.name;
        spriteContainer.innerHTML = "";
        spriteContainer.appendChild(sprite);

      } catch (error) {
        resetDisplay();
        alert(error.message);
      }
    });