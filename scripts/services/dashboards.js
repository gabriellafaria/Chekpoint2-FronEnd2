const logout = document.getElementById('closeApp');

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
  });
});

function completeTask(id) {
  fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, {
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
  fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, {
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

function displayUserName(object) {
  const userName = document.getElementById('userName');
  userName.innerText = `${object.firstName} ${object.lastName}`;
}