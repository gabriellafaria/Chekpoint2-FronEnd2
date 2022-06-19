let obrigatory = "Campo obrigatório";

// validation in the password 
function validatePassword() {
    return (registryPassword.value === passwordConfirm.value) ? true : false;
};

// validation in the email address
function validateEmail() {
    return (registryEmail.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) ? true : false;
};

function validateRegistry(name, surname, email, password) {
    if (name && surname && password && validateEmail(email) && validatePassword(registryPassword.value, passwordConfirm.value) == true) {
        registryButton.removeAttribute('disabled');
        registryButton.style.backgroundColor = '#0AA9FF';
        registryButton.innerText = 'Acessar';
    } else {
        registryButton.setAttribute('disabled', true);
        registryButton.style.backgroundColor = '#79745C';
        registryButton.innerText = 'Bloqueado';
    }
};

// adding events on the fields of the form
registryName.addEventListener("keyup", () => {
    if (registryName.value) {
        nameValidation.innerText = '';
        registryName.style.border = '1px solid transparent';
    } else {
        nameValidation.innerText = obrigatory;
        registryName.style.border = '1px solid #CC000E';
    };
    validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

registrySurname.addEventListener("keyup", () => {
    if (registrySurname.value) {
        surnameValidation.innerText = '';
        registrySurname.style.border = '1px solid transparent';
    } else {
        surnameValidation.innerText = obrigatory;
        registrySurname.style.border = '1px solid #CC000E';
    }
    validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

registryEmail.addEventListener('keyup', () => {
    if (!registryEmail.value) {
        emailValidation.innerText = obrigatory;
        registryEmail.style.border = '1px solid #CC000E';
    } else if (!validateEmail(registryEmail.value == true)) {
        emailValidation.innerText = "E-mail inválido";
        registryEmail.style.border = "1px solid #CC000E";
    } else {
        emailValidation.innerText = '';
        registryEmail.style.border = '1px solid transparent';
    }
    validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

registryPassword.addEventListener('keyup', () => {
    if (!registryPassword.value) {
        passwordValidation.innerText = obrigatory;
        registryPassword.style.border = '1px solid #CC000E';
    } else {
        passwordValidation.innerText = '';
        registryPassword.style.border = '1px solid transparent';
    }
    validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});

passwordConfirm.addEventListener('keyup', () => {
    if (!passwordConfirm.value) {
        confirmValidation.innerText = obrigatory;
        passwordConfirm.style.border = '1px solid #CC000E';
    } else if (validatePassword(registryPassword.value, passwordConfirm.value) == false) {
        confirmValidation.innerText = 'Senhas diferentes';
        passwordValidation.innerText = 'Senhas diferentes';
        passwordConfirm.style.border = '1px solid #CC000E';
        registryPassword.style.border = '1px solid #CC000E';
    }  else if (validatePassword(registryPassword.value, passwordConfirm.value) == true) {
        confirmValidation.innerText = '';
        passwordValidation.innerText = '';
        passwordConfirm.style.border = '1px solid transparent';
        registryPassword.style.border = '1px solid transparent';
    }  else {
        confirmValidation.innerText = '';
        passwordConfirm.style.border = '1px solid transparent';
    }
    validateRegistry(registryName.value, registrySurname.value, registryPassword.value, passwordConfirm.value, registryEmail.value);
});