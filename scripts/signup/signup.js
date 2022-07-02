const registryButton = document.getElementById('registryButton');

// select all required elements
let registryName = document.getElementById('registryName');
let registrySurname = document.getElementById('registrySurname');
let registryEmail = document.getElementById('registryEmail');
let registryPassword = document.getElementById('registryPassword');
let passwordConfirm = document.getElementById('passwordConfirm');

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

    register(registryObject);
  }
});
