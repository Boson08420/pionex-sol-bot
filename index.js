// === index.js ===========================================
// 1) 必要套件
const express = require("express");
const crypto  = require("crypto");
const axios   = require("axios");

// 2) Express 基礎設定
const app = express();
app.use(express.json());                     // 讓我們能收 JSON

// 3) 從 Render 環境變數讀 Pionex API Key / Secret
const API_KEY    = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// 4) Pionex 簽名小工具：官方要求 query string 用 sha256 HMAC
function sign(queryString) {
  return crypto.createHmac("sha256", API_SECRET)
               .update(queryString)
               .digest("hex");
}

// 5) 實作「開空」與「開多」——現在 Demo 版本只 console.log
//    之後你再把 axios.post 打到真正 endpoint
async function openShort(symbol, priceUsd) {
  console.log("=== SHORT SIGNAL ===");
  console.log("symbol:", symbol);
  console.log("price :", priceUsd);
  // TODO：在這裡組 params → call /contract/order
}

async function openLong(symbol, priceUsd) {
  console.log("=== LONG SIGNAL ===");
  console.log("symbol:", symbol);
  console.log("price :", priceUsd);
  // TODO：在這裡組 params → call /contract/order
}

// 6) 給 TradingView Webhook 用的路由
app.post("/webhook", async (req, res) => {
  try {
    const { signal, symbol, price } = req.body;

    if (signal === "SHORT_SIGNAL") await openShort(symbol, Number(price));
    if (signal === "LONG_SIGNAL")  await openLong (symbol, Number(price));

    res.sendStatus(200);                    // 讓 TradingView 收到 200 OK
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
});

// 7) Render 會自動塞一個 PORT 環境變數進來
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot online on port", PORT));
