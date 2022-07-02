const pendingTask = document.getElementById('pendingTask');
const taskDescription = document.getElementById('novaTarefa');
const taskButton = document.getElementById('addTask');

const task = {
  description: '',
  completed: false,
};

taskButton.addEventListener('click', addTask);

function addTask(e) {
  e.preventDefault();
  task.description = taskDescription.value;
  // console.log(task);
  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
    method: 'POST',
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((_data) => {
      pendingTask.innerHTML = '';
      init();
    });
}

function deleteTask(e) {
  const id = e;
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // alert(data);
      pendingTask.innerHTML = '';
      init();
    });
}

async function init() {
  await fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
    method: 'GET',
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => {
        const tasks = `
                    <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao">
                      <p class="nome">${task.description}</p>
                      <p class="timestamp">Criada em: ${dateFormat(task.createdAt)}</p>
                      <span class="delete" onclick="deleteTask(${task.id})"><img src="./assets/delete.png" alt="Deletar task imagem"></span>
                      <span class="edit" onclick="editTask(${task.id})"><img src="./assets/editar.png" alt="Editar task"></span>
                    </div>
                  </li>`;
        pendingTask.innerHTML += tasks;

        // <span class="edit" onclick="editTask(${task.id})"><img src="./assets/editar.png" alt="Editar task"></span>
      });

      // if(!data.jwt){
      //     alert("Sem permissão de acesso!")
      //     window.location.href = './index.html'
      // } else {

      // }
    });
}

init();
