const loginButton = document.getElementById('loginButton');

// select all elements obrigatorys
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

// import small elements for validations
const emailValidation = document.getElementById('emailValidation');
const passwordValidation = document.getElementById('passwordValidation');

// initing the button as invalid
loginButton.style.backgroundColor = '#979292A1';
loginButton.innerText = 'Bloqueado';

const loginObject = {
  email: '',
  password: '',
};

function validateLogin(password, email) {
  if (eventsPassword(password) == '' && validateEmail(email) == '') {
    loginButton.removeAttribute('disabled');
    loginButton.style.backgroundColor = '#7898FF';
    loginButton.innerText = 'Acessar';
  } else {
    loginButton.setAttribute('disabled', true);
    loginButton.style.backgroundColor = '#979292A1';
    loginButton.innerText = 'Bloqueado';
  }
}

loginButton.addEventListener('click', (evento) => {
  mostrarSpinner();
  evento.preventDefault();
  loginObject.email = loginEmail.value;
  loginObject.password = loginPassword.value;
  authentication();
});

// validations in the email -- calling function in the validation folder
loginEmail.addEventListener('keyup', () => {
  const call = validateEmail(loginEmail.value);

  emailValidation.innerText = call;
  loginEmail.style.border = call == '' ? '1px solid transparent' : '1px solid #CC000E';

  validateLogin(loginPassword.value, loginEmail.value);
});

// validations in the password
loginPassword.addEventListener('keyup', () => {
  const call = eventsPassword(loginPassword.value);

  passwordValidation.innerText = call;
  loginPassword.style.border = call == '' ? '1px solid transparent' : '1px solid #CC000E';

  validateLogin(loginPassword.value, loginEmail.value);
});

const statusObject = {
  201: 'Login realizado com sucesso!',
  400: 'Senha incorreta!',
  404: 'Usuario não existe',
  500: 'Erro de servidor',
};

function authentication() {
  fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObject),
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
