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

function addGame() {
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;
    const category = document.getElementById("category").value;

    fetch("/add-game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, url, category })
    })
    .then(res => res.text())
    .then(msg => alert(msg));
}

const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// oyunları getir
app.get("/games", (req, res) => {
    const data = fs.readFileSync("games.json");
    res.json(JSON.parse(data));
});

// oyun ekle (admin panel)
app.post("/add-game", (req, res) => {
    let games = JSON.parse(fs.readFileSync("games.json"));

    games.push(req.body);

    fs.writeFileSync("games.json", JSON.stringify(games, null, 2));

    res.json({ message: "Oyun eklendi" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server çalışıyor"));

fetch("https://SENIN-SERVER-URL/games")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("gameList");
    container.innerHTML = "";

    data.forEach(game => {
      container.innerHTML += `
        <div class="card">
          <h3>${game.name}</h3>
          <a href="${game.url}" target="_blank">
            <button>Oyna</button>
          </a>
        </div>
      `;
    });
  });

function addGame() {
    fetch("https://SENIN-SERVER-URL/add-game", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            url: document.getElementById("url").value,
            category: document.getElementById("category").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}