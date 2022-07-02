const registryButton = document.getElementById('registryButton');

// select all required elements
let registryName = document.getElementById('registryName');
let registrySurname = document.getElementById('registrySurname');
let registryEmail = document.getElementById('registryEmail');
let registryPassword = document.getElementById('registryPassword');
let passwordConfirm = document.getElementById('passwordConfirm');

// import small elements for validations
const nameValidation = document.getElementById('nameValidation');
const surnameValidation = document.getElementById('surnameValidation');
const emailValidation = document.getElementById('emailValidation');
const passwordValidation = document.getElementById('passwordValidation');
const confirmValidation = document.getElementById('confirmValidation');

// initing the button as invalid
registryButton.innerText = 'Bloqueado';
registryButton.style.backgroundColor = '#79745C';

// declaring the model object
const registryObject = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

// creating the event for the button
registryButton.addEventListener('click', (event) => {
  mostrarSpinner();
  if (registryName.value, registrySurname.value, registryEmail.value, registryPassword.value, passwordConfirm.value) {
    event.preventDefault();

    // normalization all the fields
    registryName = normalizeTextBetweenSpaces(registryName.value);
    registrySurname = normalizeTextBetweenSpaces(registrySurname.value);
    registryEmail = normalizeTextBetweenSpaces(registryEmail.value);
    registryPassword = normalizeTextBetweenSpaces(registryPassword.value);
    passwordConfirm = normalizeTextBetweenSpaces(passwordConfirm.value);

    // attributing the objects
    registryObject.firstName = registryName;
    registryObject.lastName = registrySurname;
    registryObject.email = registryEmail;
    registryObject.password = registryPassword;

    register();
  }
});

const statusObject = {
  200: 'Cadastro realizado com sucesso!',
  400: 'Usuario já existe ou Dados imcompletos!',
  500: 'Erro de servidor!',
};

function register() {
  fetch('https://ctd-todo-api.herokuapp.com/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registryObject),
  }).then((response) => {
    alert(statusObject[response.status]);
    return response;
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        ocultarSpinner();
        window.location.href = './tarefas.html';
      } else {
        // Verificar uma forma de limpar o formulario sem recarregar a pagina
        window.location.href = './signup.html';
      }
    })
    .catch((error) => {
      ocultarSpinner();
      console.log(error);
    });
}
