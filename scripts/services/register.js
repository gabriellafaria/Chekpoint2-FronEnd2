function register(registryData) {
  const statusObject = {
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
    if(response.status !== 201){
    alert(statusObject[response.status])
    }
    return response.json();
  }).then((data) => {
    if (data.jwt) {
      sessionStorage.setItem('token', data.jwt);
      hideSpinner();
      window.location.href = './tasks.html';
    } else {
      // Verificar uma forma de limpar o formulário sem recarregar a pagina
      window.location.href = './signup.html';
    }
  })
    .catch((error) => {
      hideSpinner();
      console.log(error);
    });
}
