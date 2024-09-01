import Database from "better-sqlite3";
const db = new Database("randomizer.db", { verbose: console.log });

export default db;
