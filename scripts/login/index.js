let loginButton = document.getElementById("loginButton");

// select all elements obrigatorys
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let small = document.querySelectorAll('small');

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

loginButton.addEventListener("click", (evento) => {
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

// validations in the email -- calling function in the validation folder
loginEmail.addEventListener('keyup', () => {
    let call = validateEmail(loginEmail.value);
    
    emailValidation.innerText = call;
    loginEmail.style.border = call == '' ? '1px solid transparent' : '1px solid #CC000E'

    validateLogin(loginPassword.value, loginEmail.value); 
})

// validations in the password  
loginPassword.addEventListener("keyup", () => {
    let call = eventsPassword(loginPassword.value);

    passwordValidation.innerText = call;
    loginPassword.style.border = call == '' ? '1px solid transparent' : '1px solid #CC000E';

    validateLogin(loginPassword.value, loginEmail.value);
});