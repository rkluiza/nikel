const myModal = new bootstrap.Modal("#register-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

checkLogged();

//logar

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("senha-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account){
        alert("Opps! Verifique seu e-mail ou a senha.");
        return"";
    }

    if(account){
        if(account.password !== password){
            alert("Opps! Verifique seu e-mail ou a senha.");
        } else {

        saveSession(email,checkSession);
        window.location.href = "home.html" 
        }
    }

    
})


//criar conta

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;


    if(email.length<5){
        alert("Preencha o campo com um e-mail válido");
        return;
    }

    if(password.length<4){
        alert("Preencha a senha com no minímo 4 digítos")
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide()
    alert("Conta criada com sucesso!");
});

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }
    return "";
}

function saveSession(data, saveSession){
    if(saveSession) {
        localStorage.setItem("session", data);
    } else {
        sessionStorage.setItem("logged", data)
    }

}

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);
        window.location.href="home.html"
    }
}