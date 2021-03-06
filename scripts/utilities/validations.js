// function to normalize the informations received
function normalizeTextBetweenSpaces(text) {
  return text.trim();
}

// validation in the email address
function validateEmail(email) {
  return (!email) ? 'Campo obrigatório'
    : (!email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) ? 'Email inválido' : '';
}

// validations for strong passwords
function validatePassword(password) {
  return (!password) ? 'Campo obrigatório'
    : (!password.match(/^[0-9a-zA-Z$*&@#]{8,}$/)) ? 'A senha deve possuir ao menos 8 caracteres'
      : (!password.match(/[A-Z]+/)) ? 'A senha deve possuir ao menos uma letra maiúscula'
        : (!password.match(/[a-z]+/)) ? 'A senha deve possuir ao menos uma letra minúscula'
          : (!password.match(/\d+/)) ? 'A senha deve possuir ao menos um dígito numérico' : '';
}

// validations for confirmation of the passwords
function confirmPassword(password, passwordConfirm) {
  return (password !== passwordConfirm) ? 'Senhas incompatíveis' : '';
}

function required(received) {
  return (!received) ? 'Campo obrigatório' : '';
}

// normalize date to brazilian format
function dateFormat(date) {
  const data = new Date(date);
  const formated = (new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })).format(data);

  return formated;
}

// validations for inclusion of tasks
function eventsTasks(task) {
  return (!task) ? 'Insira descrição da tarefa'
    : (task.length < 5) ? 'A descrição da tarefa tem que ter mais de cinco caracteres' : '';
}

function validateTasks(tasks) {
  (eventsTasks(tasks) === '') ? taskButton.removeAttribute('disabled') : taskButton.setAttribute('disabled', true);
}
