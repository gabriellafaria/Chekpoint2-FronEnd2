function mostrarSpinner() {
    // Selecionamos o corpo. Isso nos ajudará a incorporar nosso spinner
    // dentro de nosso HTML.
    const body = document.querySelector("body");
    
    // Selecionamos o formulário de registro para poder ocultá-lo durante o carregamento
    const form = document.querySelector("form");
    // selecionando a div ingressar para oculta-lo durante o carregamento
    const ingressar = document.querySelector(".ingressar");
    
    // Criamos nosso spinner
    const spinnerContainer = document.createElement("div");
    const spinner = document.createElement("div");
    
    // Atribuímos os IDs a cada novo elemento, para poder manipular
    // seus estilos
    spinnerContainer.setAttribute("id", "container-load");
    spinner.setAttribute("id", "load");
    
    // Ocultamos o formulário de registro
    form.classList.add("hidden");
    ingressar.classList.add("hidden");

    // Adicionamos o Spinner ao nosso HTML.
    spinnerContainer.appendChild(spinner);
    body.appendChild(spinnerContainer);
    
    return;
   }

   function ocultarSpinner() {
    // Selecionamos o corpo para poder remover o spinner do HTML.
    const body = document.querySelector("body");
    
    // Selecionamos o formulário de registro para poder mostrar-lo novamente
    const form = document.querySelector("form");
    const ingressar = document.querySelector(".ingressar");
    // Selecionamos o spinner
    const spinnerContainer = document.querySelector("#container-load");
    
    // Removemos o spinner do HTML
    body.removeChild(spinnerContainer);
    
    // Removemos a classe que oculta o formulário
    form.classList.remove("hidden");
    ingressar.classList.remove("hidden");
    return;
   }