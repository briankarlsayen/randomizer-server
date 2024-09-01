import express from "express";
import "dotenv/config";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import db from "./config/db.js";
import cardRoutes from "./routes/card.router.js";
import cardItemRoutes from "./routes/cardItem.router.js";

const PORT = process.env.PORT || 5250;
const app = express();

app.use(cors());
app.use(express.json());

// initialize databse

app.get("/", (req, res) => {
  return res.status(200).json("Alive alive");
});

app.get("/api", (req, res) => {
  const query = `SELECT * FROM cards`;
  const cards = db.prepare(query).all();
  return res.status(200).json(cards);
});

app.use("/cards", cardRoutes);
app.use("/card-items", cardItemRoutes);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Listening to port ${PORT}`);
});
