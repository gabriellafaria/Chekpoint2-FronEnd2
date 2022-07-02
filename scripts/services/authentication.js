function authentication(loginData) {
  const statusObject = {
    201: 'Login realizado com sucesso!',
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
    alert(statusObject[response.status]);

    return response;
  }).then((response) => response.json()).then((data) => {
    if (data.jwt) {
      sessionStorage.setItem('token', data.jwt);

      window.location.href = './tarefas.html';
    }
  })
    .catch((error) => {
      console.log(error);
    });
}
