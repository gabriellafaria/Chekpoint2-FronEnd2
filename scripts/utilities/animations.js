const body = document.querySelector('body');
const form = document.querySelector('form');
const join = document.querySelector('.join');

function showSpinner() {
  const spinnerContainer = document.createElement('div');
  const spinner = document.createElement('div');

  spinnerContainer.setAttribute('id', 'container-load');
  spinner.setAttribute('id', 'load');

  form.classList.add('hidden');
  join.classList.add('hidden');

  spinnerContainer.appendChild(spinner);
  body.appendChild(spinnerContainer);
}

function hideSpinner() {
  const spinnerContainer = document.querySelector('#container-load');

  body.removeChild(spinnerContainer);

  form.classList.remove('hidden');
  join.classList.remove('hidden');
}

function addSkeleton() {
  const skeleton = `
    <li class="task-container skeleton">
      <div class="not-done"></div>
      <div class="description-container">
        <p class="name-element"></p>
        <p class="timestamp"></p>
        <span class="delete"><img src="./assets/delete.png" alt="Deletar task imagem"></span>
        <span class="edit"><img src="./assets/editar.png" alt="Editar task"></span>
      </div>
    </li>
  `;
  pendingTask.innerHTML += skeleton;
  completedTask.innerHTML += skeleton;
}
