const registryButton = document.getElementById('registryButton');

// import small elements for validations
const nameValidation = document.getElementById('nameValidation');
const surnameValidation = document.getElementById('surnameValidation');
const emailValidation = document.getElementById('emailValidation');
const passwordValidation = document.getElementById('passwordValidation');
const confirmValidation = document.getElementById('confirmValidation');

const allSmalls = [nameValidation, surnameValidation, emailValidation,
  passwordValidation, confirmValidation];

// select all required elements
const registryName = document.getElementById('registryName');
const registrySurname = document.getElementById('registrySurname');
const registryEmail = document.getElementById('registryEmail');
const registryPassword = document.getElementById('registryPassword');
const passwordConfirm = document.getElementById('passwordConfirm');

const allFields = [registryName, registrySurname, registryEmail, registryPassword, passwordConfirm];

// initiating the button as invalid
registryButton.innerText = 'Bloqueado';
registryButton.style.backgroundColor = '#79745C';

// declaring the model object
const registryObject = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

// function for all the validations and enable the button
function validateRegistry(name, surname, email, password, confirmedPassword) {
  if (required(name) + required(surname) + validateEmail(email) + validatePassword(password)
  + confirmPassword(password, confirmedPassword) === '') {
    registryButton.removeAttribute('disabled');
    registryButton.style.backgroundColor = '#0AA9FF';
    registryButton.innerText = 'Criar conta';
  } else {
    registryButton.setAttribute('disabled', true);
    registryButton.style.backgroundColor = '#79745C';
    registryButton.innerText = 'Bloqueado';
  }
}

// adding events on the fields of the form
allFields.forEach((field, index) => {
  field.addEventListener('keyup', () => {
    let call;

    if (field.id.toLowerCase().includes('name')) {
      call = required(field.value);
    } else if (field.id === 'registryEmail') {
      call = validateEmail(field.value);
    } else if (field.id === 'registryPassword') {
      call = validatePassword(field.value);
    } else {
      call = confirmPassword(registryPassword.value, field.value);
    }

    const fieldSmall = allSmalls[index];
    fieldSmall.innerHTML = call;
    field.style.border = call === '' ? '1px solid transparent' : '1px solid #CC000E';

    validateRegistry(...allFields.map((eachField) => eachField.value));
  });
});

// creating the event for the button
registryButton.addEventListener('click', (event) => {
  event.preventDefault();
  mostrarSpinner();
  if (allFields.every((field) => field.value)) {
    allFields.forEach((field) => {
      if (field.id !== 'passwordConfirm') {
        // normalization all the fields
        registryObject[field.name] = normalizeTextBetweenSpaces(field.value);
      }
    });

    register(registryObject);
  }
});
