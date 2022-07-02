function register(registryData) {
  const statusObject = {
    201: 'Cadastro realizado com sucesso!',
    400: 'Usuário já existe ou Dados incompletos!',
    500: 'Erro de servidor!',
  };

  fetch('https://ctd-todo-api.herokuapp.com/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registryData),
  }).then((response) => {
    alert(statusObject[response.status]);
    return response.json();
  }).then((data) => {
    if (data.jwt) {
      localStorage.setItem('token', data.jwt);
      ocultarSpinner();
      window.location.href = './tarefas.html';
    } else {
      // Verificar uma forma de limpar o formulário sem recarregar a pagina
      window.location.href = './signup.html';
    }
  })
    .catch((error) => {
      ocultarSpinner();
      console.log(error);
    });
}
