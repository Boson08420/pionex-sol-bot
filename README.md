# pionex-sol-bot
// 最小可跑版，別改動！
const express = require("express");
const crypto  = require("crypto");
const axios   = require("axios");
const app     = express();
app.use(express.json());

const API_KEY    = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

function sign(q) {
  return crypto.createHmac("sha256", API_SECRET).update(q).digest("hex");
}
async function openShort(symbol, price) { /* ...你之前那段 openShort ... */ }
async function openLong (symbol, price) { /* ...你之前那段 openLong  ... */ }

app.post("/webhook", async (req, res) => {
  const { signal, symbol, price } = req.body;
  if (signal === "SHORT_SIGNAL") await openShort(symbol, price);
  if (signal === "LONG_SIGNAL")  await openLong (symbol, price);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot online on port", PORT));

{
  "name": "pionex-sol-bot",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": { "start": "node index.js" },
  "dependencies": {
    "axios": "^1.6.8",
    "express": "^4.19.2"
  }
}
