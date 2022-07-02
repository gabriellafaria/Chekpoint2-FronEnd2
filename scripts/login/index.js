const loginButton = document.getElementById('loginButton');

// select all required elements
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

// validations in the email -- calling function in the validation folder
loginEmail.addEventListener('keyup', () => {
  const call = validateEmail(loginEmail.value);

  emailValidation.innerText = call;
  loginEmail.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateLogin(loginPassword.value, loginEmail.value);
});

// validations in the password
loginPassword.addEventListener('keyup', () => {
  const call = eventsPassword(loginPassword.value);

  passwordValidation.innerText = call;
  loginPassword.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateLogin(loginPassword.value, loginEmail.value);
});

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  mostrarSpinner();
  loginObject.email = loginEmail.value;
  loginObject.password = loginPassword.value;
  authentication(loginObject);
});
