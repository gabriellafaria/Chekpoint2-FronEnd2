function authentication(loginData) {
  const statusObject = {
    400: 'Senha incorreta!',
    404: 'Usuario não existe',
    500: 'Erro de servidor',
  };

  fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  }).then((response) => {
    ocultarSpinner();
    if (response.status !== 201) {
      alert(statusObject[response.status]);
    }
    return response.json();
  }).then((data) => {
    if (data.jwt) {
      sessionStorage.setItem('token', data.jwt);
      window.location.href = './tarefas.html';
    }
  })
    .catch((error) => {
      console.log(error);
    });
}
