const registryButton = document.getElementById('registryButton');

// select all required elements
const registryName = document.getElementById('registryName');
const registrySurname = document.getElementById('registrySurname');
const registryEmail = document.getElementById('registryEmail');
const registryPassword = document.getElementById('registryPassword');
const passwordConfirm = document.getElementById('passwordConfirm');

const allFields = [registryName, registrySurname, registryEmail, registryPassword, passwordConfirm];

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
