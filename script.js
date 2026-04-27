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

let allGames = [];

fetch("games.json")
  .then(res => res.json())
  .then(data => {
    allGames = data;
    renderGames(allGames);
  });

function renderGames(games) {
  const container = document.getElementById("gameList");
  container.innerHTML = "";

  games.forEach(game => {
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
}

function filterGames(category) {
  if (category === "all") {
    renderGames(allGames);
  } else {
    const filtered = allGames.filter(g => g.category === category);
    renderGames(filtered);
  }
}