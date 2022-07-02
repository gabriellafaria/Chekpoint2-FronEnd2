const pendingTask = document.getElementById('pendingTask');
const taskDescription = document.getElementById('novaTarefa');
const taskButton = document.getElementById('addTask');

const token = sessionStorage.getItem('token');

const task = {
  description: '',
  completed: false,
};

taskButton.addEventListener('click', addTask);

function addTask(e) {
  e.preventDefault();
  task.description = taskDescription.value;

  if (!taskDescription.value) {
    alert('Insira uma descrição da tarefa');
  } else if (taskDescription.value.length < 5) {
    alert('A descrição da tarefa tem que ter mais de cinco letras');
  } else {
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
        init();
      });
  }
}

function deleteTask(e) {
  const id = e;
  fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      // 'Authorization': token
    },
  })
    .then((response) => response.json())
    .then((_data) => {
      // alert(data);
      pendingTask.innerHTML = '';
      init();
    });
}

async function init() {
  await fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
    method: 'GET',
    headers: {
      Authorization: token,
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

onload = async function usersData() {
  const requestConfig = {
    headers: {
      Authorization: token,
    },
  };

  try {
    const response = await fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', requestConfig);
    if (response.status == 200) {
      const convert = await response.json();
      displayUserName(convert);
    } else {
      throw 'Problema ao buscar o usuário';
    }
  } catch (error) {
    console.log(error);
  }
};

function displayUserName(object) {
  const userName = document.getElementById('userName');
  userName.innerText = `${object.firstName} ${object.lastName}`;
}
