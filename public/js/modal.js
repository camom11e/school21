function openModal(skills) {
  const modal = document.getElementById('modal');
  const skillsList = document.getElementById('skills-list');

  // Очистить список навыков
  skillsList.innerHTML = '';

  // Добавить навыки в список
  skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = `${skill.name} - ${skill.level}%`;
    skillsList.appendChild(li);
  });

  // Показать модальное окно
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
}