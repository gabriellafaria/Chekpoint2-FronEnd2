// function to normalize the informations received 
function normalizeTextBetweenSpaces(text) {
    return text.trim();
};

// validation in the email address
function validateEmail(email) {
    return (!email) ? 'Campo obrigatório' : 
    (!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) ? 'Email inválido' : '';
}; 

// validations for strong passwords
function eventsPassword(password) {
    return (!password) ? 'Campo obrigatório' :
    (!password.match(/^[0-9a-zA-Z$*&@#]{8,}$/)) ? 'A senha deve possuir ao menos 8 caracteres' :
    (!password.match(/[A-Z]+/)) ? 'A senha deve possuir ao menos uma letra maiúscula' :
    (!password.match(/[a-z]+/)) ? 'A senha deve possuir ao menos uma letra minúscula' :
    (!password.match(/\d+/)) ? 'A senha deve possuir ao menos um dígito numérico' : '';
};

// validations for confirmation of the passwords 
function validatePassword(password, passwordConfirm) {
    return (password !== passwordConfirm) ? 'Senhas incompatíveis' : ''
};

function obrigatory(received) {
    return (!received) ? 'Campo obrigatório' : '';
};