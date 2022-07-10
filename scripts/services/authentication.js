function loginAuthentication(loginData) {
  const statusObject = {
    400: 'Senha incorreta!',
    404: 'Usuario não existe',
    500: 'Erro de servidor',
  };

  fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  }).then((response) => {
    hideSpinner();
    if (response.status !== 201) {
      alert(statusObject[response.status]);
    }
    return response.json();
  }).then((data) => {
    if (data.jwt) {
      sessionStorage.setItem('token', data.jwt);
      window.location.href = './tasks.html';
    }
  })
    .catch((error) => {
      console.log(error);
    });
};

function registerAuthentication(registryData) {
  const statusObject = {
    400: 'Usuário já existe ou Dados incompletos!',
    500: 'Erro de servidor!',
  };

  fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users', {
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
      window.location.href = './signup.html';
    }
  })
    .catch((error) => {
      hideSpinner();
      console.log(error);
    });
};