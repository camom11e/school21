document.addEventListener('DOMContentLoaded', () => {
	const filterBtn = document.getElementById('filter-btn');
	const searchInput = document.getElementById('search');
	const skillSelect = document.getElementById('skill');
	const levelRange = document.getElementById('level');
	const studentsContainer = document.getElementById('students-container');
  
	// Mock function - replace with actual API call
	async function fetchStudents(filters = {}) {
	  try {
		const response = await fetch('/api/students', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(filters)
		});
		return await response.json();
	  } catch (error) {
		console.error('Error:', error);
		return [];
	  }
	}
  
	function renderStudents(students) {
	  studentsContainer.innerHTML = students
		.map(student => `
		  <div class="student-card">
			<h3>${student.fullname}</h3>
			<p>${student.campus}</p>
			<div class="skills">
			  ${student.skills.map(skill => `
				<div class="skill">
				  <span>${skill.name}</span>
				  <div class="progress-bar">
					<div class="progress" style="width: ${skill.level}%">${skill.level}%</div>
				  </div>
				</div>
			  `).join('')}
			</div>
			<button class="details-btn">View Details</button>
		  </div>
		`)
		.join('');
	}
  
	// Event listeners
	filterBtn.addEventListener('click', () => {
	  document.querySelector('.filter-content').classList.toggle('active');
	});
  
	[searchInput, skillSelect, levelRange].forEach(element => {
	  element.addEventListener('input', async () => {
		const filters = {
		  search: searchInput.value,
		  skill: skillSelect.value,
		  level: levelRange.value
		};
		const students = await fetchStudents(filters);
		renderStudents(students);
	  });
	});
  
	// Initial load
	fetchStudents().then(renderStudents);
  });