const db = require('../src/db');
const axios = require('axios');
require('dotenv').config();

async function fetchSkills() {
  const users = db.prepare('SELECT name_login FROM users').all();
  const token = await getAuthToken();

  for (const user of users) {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}v1/participants/${user.name_login}/skills`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Сохранение навыков
      response.data.skills.forEach(skill => {
        db.prepare(`
          INSERT INTO skills (name_login, skill_name, skill_level)
          VALUES (?, ?, ?)
        `).run(user.name_login, skill.name, skill.level);
      });
      
      console.log(`Обновлены навыки для ${user.name_login}`);
    } catch (e) {
      console.error(`Ошибка для ${user.name_login}:`, e.message);
    }
  }
}

async function getAuthToken() {
  const response = await axios.post(
    'https://auth.sberclass.ru/auth/realms/EduPowerKeycloak/protocol/openid-connect/token',
    new URLSearchParams({
      client_id: 's21-open-api',
      username: process.env.SCHOOL_LOGIN,
      password: process.env.SCHOOL_PASSWORD,
      grant_type: 'password'
    })
  );
  return response.data.access_token;
}

fetchSkills().finally(() => db.close());