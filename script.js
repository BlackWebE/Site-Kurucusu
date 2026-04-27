fetch("games.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("gameList");

    data.forEach(game => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${game.name}</h3>
        <a href="${game.url}" target="_blank">
          <button>Oyna</button>
        </a>
      `;

      container.appendChild(card);
    });
  });