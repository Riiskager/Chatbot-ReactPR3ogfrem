import express from "express";
const app = express();
import db from "./db.js"

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Chatbot API Server 🤖",
    version: "1.0.0",
  });
});

app.listen(PORT, () => console.log(`server running at  http://localhost:${PORT}`));