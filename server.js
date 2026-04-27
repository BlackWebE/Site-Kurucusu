const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// oyunları getir
app.get("/games", (req, res) => {
    const data = fs.readFileSync("games.json");
    res.json(JSON.parse(data));
});

// oyun ekle
app.post("/add-game", (req, res) => {
    const games = JSON.parse(fs.readFileSync("games.json"));

    games.push(req.body);

    fs.writeFileSync("games.json", JSON.stringify(games, null, 2));

    res.send("Oyun eklendi");
});

app.listen(3000, () => {
    console.log("Server çalışıyor http://localhost:3000");
});