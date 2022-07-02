// import small elements for validations
const nameValidation = document.getElementById('nameValidation');
const surnameValidation = document.getElementById('surnameValidation');
const emailValidation = document.getElementById('emailValidation');
const passwordValidation = document.getElementById('passwordValidation');
const confirmValidation = document.getElementById('confirmValidation');

// function for all the validations and enable the button
function validateRegistry(name, surname, password, passwordConfirm, email) {
  if (required(name) === '' && required(surname) === '' && validatePassword(password) === '' && confirmPassword(password, passwordConfirm) === '' && validateEmail(email) === '') {
    registryButton.removeAttribute('disabled');
    registryButton.style.backgroundColor = '#0AA9FF';
    registryButton.innerText = 'Acessar';
  } else {
    registryButton.setAttribute('disabled', true);
    registryButton.style.backgroundColor = '#79745C';
    registryButton.innerText = 'Bloqueado';
  }
}

// adding events on the fields of the form
registryName.addEventListener('keyup', () => {
  const call = required(registryName.value);

  nameValidation.innerHTML = call;
  registryName.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

registrySurname.addEventListener('keyup', () => {
  const call = required(registrySurname.value);

  surnameValidation.innerHTML = call;
  registrySurname.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

registryEmail.addEventListener('keyup', () => {
  const call = validateEmail(registryEmail.value);

  emailValidation.innerText = call;
  registryEmail.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

registryPassword.addEventListener('keyup', () => {
  const call = validatePassword(registryPassword.value);

  passwordValidation.innerText = call;
  registryPassword.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

passwordConfirm.addEventListener('keyup', () => {
  const call = confirmPassword(registryPassword.value, passwordConfirm.value);

  confirmValidation.innerText = call;
  passwordConfirm.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

  validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});
