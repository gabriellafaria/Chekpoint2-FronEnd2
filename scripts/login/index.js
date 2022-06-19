let loginButton = document.getElementById("loginButton");

// select all elements obrigatorys
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let small = document.querySelectorAll('small');

// import small elements for validations
let emailValidation = document.getElementById("emailValidation");
let passwordValidation = document.getElementById("passwordValidation");

loginButton.style.backgroundColor = "#979292A1";
loginButton.innerText = "Bloqueado";

let loginObject = {
    email: "",
    password: ""
};

function validateEmail() {
    return (loginEmail.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)) ? true : false;
}

function validateLogin(password, email) {
    if (password && validateEmail(email)) {
        loginButton.removeAttribute("disabled");
        loginButton.style.backgroundColor = "#7898FF";
        loginButton.innerText = "Acessar";
    } else {
        loginButton.setAttribute("disabled", true);
        loginButton.style.backgroundColor = "#979292A1";
        loginButton.innerText = "Bloqueado";
    }
};

loginButton.addEventListener("click", function (evento) {
    if (validateLogin(loginEmail.value, loginPassword.value)) {
        evento.preventDefault();
        loginEmail = normalizeTextBetweenSpaces(loginEmail.value);
        loginPassword = normalizeTextBetweenSpaces(loginPassword.value);

        loginObject.email = loginEmail;
        loginObject.password = loginPassword;
        
        let loginObjectJSON = JSON.stringify(loginObject);
        console.log(loginObjectJSON);
    }
});

loginEmail.addEventListener("keyup", () => {
    if (!loginEmail.value) {
        emailValidation.innerText = "Campo obrigatório"
        loginEmail.style.border = "1px solid #E9554EBB"
    } else if (!validateEmail(loginEmail.value == true)) {
        emailValidation.innerText = "E-mail inválido";
        loginEmail.style.border = "1px solid #E9554EBB";
       } else {
        emailValidation.innerText = ""
        loginEmail.style.border = "1px solid transparent "
    };
    validateLogin(loginPassword.value, loginEmail.value);
});

loginPassword.addEventListener("keyup", () => {
    if (loginPassword.value) {
        passwordValidation.innerText = ""
        loginPassword.style.border = "1px solid transparent"
    } else {
        passwordValidation.innerText = "Campo obrigatório"
        loginPassword.style.border = "1px solid #E9554EBB"
    }
    validateLogin(loginPassword.value, loginEmail.value);
});