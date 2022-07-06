const pendingTask = document.getElementById('pendingTask');
const completedTask = document.getElementById('completedTask');
const taskDescription = document.getElementById('novaTarefa');
const taskButton = document.getElementById('addTask');
const validations = document.getElementById('validations');
const token = sessionStorage.getItem('token');
const logout = document.getElementById('closeApp');

const task = {
  description: '',
  completed: false,
};

taskDescription.addEventListener('keyup', () => {
  const call = eventsTasks(taskDescription.value);

  validations.innerHTML = call;
  taskDescription.style.borderBottom = call !== '' ? '1px solid #CC000E' : '';

  validateTasks(taskDescription.value);
});

<<<<<<< HEAD
logout.addEventListener('click', () => {
  Swal.fire({
    title: 'Você realmente quer sair?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.removeItem('token');
      window.location.href = './index.html';
    }
  })
});
=======
function createTaskHtml(taskData, isCompleted) {
  const tasks = `
    <li class="tarefa">
      <div class="not-done" onclick="${isCompleted ? 'uncompleteTask' : 'completeTask'}(${taskData.id})">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="white" d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
      </div>
      <div class="descricao">
        <p class="nome">${taskData.description}</p>
        <p class="timestamp">Criada em: ${dateFormat(taskData.createdAt)}</p>
        <span class="delete" onclick="deleteTask(${taskData.id})"><img src="./assets/delete.png" alt="Deletar task imagem"></span>
        <span class="edit" onclick="editTask(${taskData.id})"><img src="./assets/editar.png" alt="Editar task"></span>
      </div>
    </li>`;
  return tasks;
}

async function renderTasks() {
  await fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => b.id - a.id).forEach((taskData) => {
        if (!taskData.completed) {
          const tasks = createTaskHtml(taskData, false);
          pendingTask.innerHTML += tasks;
        } else {
          const tasks = createTaskHtml(taskData, true);
          completedTask.innerHTML += tasks;
        }
      });

      const allSkeletons = document.getElementsByClassName('skeleton');
      Array.from(allSkeletons).forEach((skeleton) => {
        skeleton.remove();
      });
    });
}

function displayUserName(object) {
  const userName = document.getElementById('userName');
  userName.innerText = `${object.firstName} ${object.lastName}`;
}

function addSkeleton() {
  const skeleton = `
    <li class="tarefa skeleton">
      <div class="not-done"></div>
      <div class="descricao">
        <p class="nome"></p>
        <p class="timestamp"></p>
        <span class="delete"><img src="./assets/delete.png" alt="Deletar task imagem"></span>
        <span class="edit"><img src="./assets/editar.png" alt="Editar task"></span>
      </div>
    </li>
  `;
  pendingTask.innerHTML += skeleton;
  completedTask.innerHTML += skeleton;
}

window.onload = async function usersData() {
  for (let i = 0; i < 3; i += 1) {
    addSkeleton();
  }
  const requestConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfig);
    if (response.status === 200) {
      const convert = await response.json();
      displayUserName(convert);
    } else {
      throw new Error('Problema ao buscar o usuário');
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    renderTasks();
  }
};
>>>>>>> main

function addTask(e) {
  e.preventDefault();
  task.description = taskDescription.value;

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      completedTask.innerHTML = '';
      renderTasks();
    });
}

taskButton.addEventListener('click', addTask);

function deleteTask(e) {
  const id = e;
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      completedTask.innerHTML = '';
      renderTasks();
    });
}

function editTask(id) {
  // const logDescription = document.querySelector('.nome').textContent;
  const newDescription = prompt('Qual a nova decrição?');

  task.description = newDescription;
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      completedTask.innerHTML = '';
      renderTasks();
    });
}

function completeTask(id) {
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: true }),
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      completedTask.innerHTML = '';
      renderTasks();
    });
}

function uncompleteTask(id) {
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: false }),
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      completedTask.innerHTML = '';
      renderTasks();
    });
}
