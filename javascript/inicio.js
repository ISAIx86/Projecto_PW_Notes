var lista_users = [];
const form = document.getElementById('login_form');
var email = document.getElementById('eml_login');
var password = document.getElementById('psw_login');

document.addEventListener("DOMContentLoaded", function() { 
    loadUsers();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function loadUsers() {
    let tot = localStorage.getItem("cant");
    for (let i = 0; i < tot; i++) {
        let index = "usr" + i;
        let attrarr = localStorage.getItem(index).split(',');
        let user = new Usuario(
            attrarr[0],
            attrarr[1],
            attrarr[2],
            attrarr[3],
            attrarr[4],
            attrarr[5]
        );
        lista_users.push(user);
    }
}

function checkInputs() {
    var uEmail = email.value.trim();
    var uPassword = password.value.trim();

    if (!isEmail(uEmail)) {
        setErrorFor(email, 'El correo no es válido.');
    }
    else {
        setSuccessFor(email);
        let login_user = null;
        lista_users.some(element => {
            if (element.email === uEmail){
                login_user = element;
                return element;
            }
        });
        if (login_user == null) {
            setErrorFor(email, 'El usuario no existe.');
        }
        else {
            if (uPassword !== login_user.contra) {
                setErrorFor(password, 'Contraseña incorrecta.');
            }
            else {
                alert('Usuario ' + login_user.nombres + ' ha ingresado.')
                emptyFields();
            }
        }
    }

}

function emptyFields() {
    email.value = "";
    password.value = "";
}