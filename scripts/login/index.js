let registryButton = document.getElementById("loginButton");

// select all elements obrigatorys
let registryEmail = document.getElementById("loginEmail");
let registryPassword = document.getElementById("loginPassword");

// import small elements for validations
let emailValidation = document.getElementById("emailValidation");
let passwordValidation = document.getElementById("passwordValidation");

// initing the button as invalid
loginButton.style.backgroundColor = "#979292A1";
loginButton.innerText = "Bloqueado";

let loginObject = {
    email: "",
    password: ""
};

function validateLogin(password, email) {
    if (eventsPassword(password) == '' && validateEmail(email) == '') {
        loginButton.removeAttribute("disabled");
        loginButton.style.backgroundColor = "#7898FF";
        loginButton.innerText = "Acessar";
    } else {
        loginButton.setAttribute("disabled", true);
        loginButton.style.backgroundColor = "#979292A1";
        loginButton.innerText = "Bloqueado";
    }


};


registryButton.addEventListener("click", (evento) => {
    evento.preventDefault();
    loginObject.email = registryEmail.value;
    loginObject.password = registryPassword.value;
    authentication();

});

// validations in the email -- calling function in the validation folder
registryEmail.addEventListener('keyup', () => {
    let call = validateEmail(loginEmail.value);

    emailValidation.innerText = call;
    loginEmail.style.border = call == '' ? '1px solid transparent' : '1px solid #CC000E'

    validateLogin(loginPassword.value, loginEmail.value);
})

// validations in the password  
registryPassword.addEventListener("keyup", () => {
    let call = eventsPassword(loginPassword.value);

    passwordValidation.innerText = call;
    loginPassword.style.border = call == '' ? '1px solid transparent' : '1px solid #CC000E';

    validateLogin(loginPassword.value, loginEmail.value);
});

let statusObject = {
    201: 'Login realizado com sucesso!',
    400: 'Senha incorreta!',
    404: 'Usuario não existe',
    500: 'Erro de servidor'
}

function authentication() {
    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginObject)
    }
    ).then(response => {
        alert(statusObject[response.status])

        return response
    }
    ).then(response => response.json()
    ).then(data => {
        if (data.jwt) {
            sessionStorage.setItem('token', data.jwt);
            window.location.href = "./tarefas.html";
        }
    }
    ).catch(error => {
        console.log(error)
    })
}