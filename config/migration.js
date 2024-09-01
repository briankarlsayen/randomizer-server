import db from "./db.js";

console.log("Ongoing migration");

// drop all tables
db.exec(`DROP TABLE IF EXISTS cards`);
db.exec(`DROP TABLE IF EXISTS card_items`);

const createCards = `
  CREATE TABLE cards (
  id INTEGER PRIMARY KEY,
  selected_id INTEGER NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at NOT NULL DEFAULT (CURRENT_DATE)
  )`;
const createCardItems = `
  CREATE TABLE card_items (
  id INTEGER PRIMARY KEY,
  card_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at NOT NULL DEFAULT (CURRENT_DATE)
  )`;
db.exec(createCards);
db.exec(createCardItems);

console.log("Done migration");
