const db = require('../src/db');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path')

db.pragma('journal_mode = WAL');

// Чтение CSV
fs.createReadStream(path.join(__dirname, '../users2.csv'))
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    try {
      db.prepare(`
        INSERT INTO users (
          name_login, 
          campus, 
          email, 
          fullname, 
          in_status, 
          phone
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        row.name_login,
        row.campus,
        row.email,
        row.fullname,
        row['Статус'],    // Особенность CSV-заголовка
        row['Телефон']
      );
    } catch (e) {
      console.error(`Ошибка импорта ${row.name_login}:`, e.message);
    }
  })
  .on('end', () => {
    console.log('Импорт пользователей завершен!');
    db.close();
  });