const pendingTask = document.getElementById('pendingTask');
const completedTask = document.getElementById('completedTask');
const taskDescription = document.getElementById('novaTarefa');
const taskButton = document.getElementById('addTask');
const validations = document.getElementById('validations');
const token = sessionStorage.getItem('token');


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


function createTaskHtml(taskData, isCompleted) {
  const tasks = `
    <li class="tarefa">
      <div class="not-done" onclick="${isCompleted ? 'uncompleteTask' : 'completeTask'}(${taskData.id})">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="white" d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
      </div>
      <div class="descricao">
        <p class="nome" id="task-${taskData.id}">${taskData.description}</p>
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
    }
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      completedTask.innerHTML = '';
      renderTasks();
    });
}

function editTask(id) {
  const logDescription = document.getElementById(`task-${id}`)

  const edit = `
  <input id="name" placeholder="Insira mais de 5 letras"></input>
  <button id="sendButton" type="submit">
  <img src="./assets/send.png" alt="Editar task imagem">
  <button>
  <button id="cancelButton" type="reset">
  <img src="./assets/cancel.png" alt="Cancelar task imagem">
  <button> 
`

  let oldLogDescription = logDescription.innerHTML;
  logDescription.innerHTML = edit;

  const sendButton = document.getElementById('sendButton');
  const editValidation = document.getElementById('editValidation');
  const editDescription = document.getElementById('name');
  const cancelButton = document.getElementById('cancelButton');

  sendButton.addEventListener('click', () => {
    if (editDescription.value.length > 5) {
      task.description = editDescription.value;

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
    } else {
      const call = eventsTasks(editDescription.value);

      editValidation.innerHTML = call;
      editDescription.style.borderBottom = call !== '' ? '1px solid #CC000E' : '';
    }
  });

  cancelButton.addEventListener('click', () => {
    logDescription.innerHTML = oldLogDescription
  })
};

