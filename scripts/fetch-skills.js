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
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }
      );

      // Логируем полный ответ API
      console.log('Получены навыки:', JSON.stringify(response.data, null, 2));

      // Проверка структуры ответа
      if (!response.data?.skills) {
        console.log(`Нет навыков для ${user.name_login}`);
        continue;
      }

      // Удаляем предыдущие записи
      db.prepare('DELETE FROM skills WHERE name_login = ?')
        .run(user.name_login);

      // Вставляем новые навыки
      response.data.skills.forEach(skill => {
        db.prepare(`
          INSERT INTO skills (name_login, skill_name, skill_level)
          VALUES (?, ?, ?)
        `).run(
          user.name_login,
          skill.name,
          skill.points // Используем points из API
        );
      });
      
      console.log(`Успешно обновлено: ${user.name_login}`);
      
    } catch (e) {
      console.error(`Ошибка для ${user.name_login}:`, e.response?.data || e.message);
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  return response.data.access_token;
}


fetchSkills()
  .catch(console.error)
  .finally(() => db.close());