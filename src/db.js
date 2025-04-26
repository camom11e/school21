const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
require('dotenv').config();

// Создаем директорию, если ее нет
const dbDir = path.dirname(process.env.DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Инициализация БД
const db = new Database(process.env.DB_PATH);

// Создание таблиц
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    name_login TEXT PRIMARY KEY,
    campus TEXT,
    email TEXT,
    fullname TEXT,
    in_status TEXT,
    phone TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_login TEXT,
    skill_name TEXT,
    skill_level INTEGER,
    FOREIGN KEY (name_login) REFERENCES users(name_login)
  );
`);

module.exports = db;