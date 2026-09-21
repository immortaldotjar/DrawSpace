import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import db from "./config/db.js";
import dotenv from "dotenv"


dotenv.config()
db()
const app = express();
const PORT = process.env.PORT

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})