var num = 0;
const form = document.getElementById('form');
const names = document.getElementById('txt_nombres');
const last_names = document.getElementById('txt_apellidos');
const fn_day = document.getElementById('nbr_dia');
const fn_month = document.getElementById('slt_mes');
const fn_year = document.getElementById('nbr_año');
const email = document.getElementById('eml_correoe');
const profimg = document.getElementById('fle_fotoperfil');
const username = document.getElementById('txt_username');
const password = document.getElementById('psw_password');
const confpassword = document.getElementById('psw_confpassword');

document.addEventListener("DOMContentLoaded", function() { 
    num = localStorage.getItem("cant");
    if (num == null) num = 0;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
});

function checkInputs() {
    const uNombres = names.value.trim();
    const uApellidos = last_names.value.trim();
    const ufnDia = fn_day.value.trim();
    const ufnMes = fn_month.value.trim();
    const ufnAnio = fn_year.value.trim();
    const uCorreo = email.value.trim();
    const uUsuario = username.value.trim();
    const uContra = password.value.trim();
    const uConfContra = confpassword.value.trim();

    if (uNombres === '') {
        setErrorFor(names, 'Llene el campo de nombre.');
    }
    else {
        setSuccessFor(names);
    }

    if (uApellidos === '') {
        setErrorFor(last_names, 'Llene el campo de apellidos.');
    }
    else {
        setSuccessFor(last_names);
    }

    if (ufnDia === '') {
        setErrorFor(fn_day, 'Ingrese un día.');
    }
    else if (ufnDia < 1 | ufnDia > 31) {
        setErrorFor(fn_day, 'El valor es inválido.');
    }
    else {
        setSuccessFor(fn_day);
    }

    if (ufnMes == 0) {
        setErrorFor(fn_month, 'Seleccione un mes, boludo.');
    }
    else {
        setSuccessFor(fn_month);
    }

    if (ufnAnio === ''){
        setErrorFor(fn_year, 'Ingrese un año.')
    }
    else {
        setSuccessFor(fn_year);
    }

    if (uCorreo === ''){
        setErrorFor(email, 'Ingrese su correo, torombolo.');
    }
    else if (!isEmail(uCorreo)) {
        setErrorFor(email, 'El correo no es válido.');
    }
    else {
        setSuccessFor(email);
    }

    if (uUsuario === '') {
        setErrorFor(username, 'Ingrese un nombre de usuario, conio!');
    }
    else {
        setSuccessFor(username);
    }

    if (uContra === '') {
        setErrorFor(password, 'Ingrese una contraseña!!!');
    }
    else if (uContra.length < 8){
        setErrorFor(password, 'Su contraseña debe ser de 8 caracteres o más.');
    }
    else if (!validPassword(uContra)){
        setErrorFor(password, 'Debe contener al menos una: mayuscula, minuscula, número y caracter especial');
    }
    else {
        setSuccessFor(password);
    }

    if (uConfContra === '') {
        setErrorFor(confpassword, 'Confirme su contraseña, no sea boludo!!');
    }
    else if (uConfContra !== uContra) {
        setErrorFor(confpassword, 'La contraseña no coincide.');
    }
    else {
        setSuccessFor(confpassword);
        let nuevo_Usuario = new Usuario(
            uNombres,
            uApellidos,
            ufnDia + '/' + ufnMes + '/' + ufnAnio,
            uCorreo,
            uUsuario,
            uContra
        );
        addUser(nuevo_Usuario);
        emptyFields();
        alert('Usuario registrado con éxito.');
    }
}

function addUser(user) {
    let index = 'usr' + num;
    localStorage.setItem(index, user.stringify());
    num++;
    localStorage.setItem("cant", num);
}

function emptyFields() {
    names.value = "";
    last_names.value = "";
    fn_day.value = "";
    fn_month.value = '0';
    fn_year.value = "";
    email.value = "";
    username.value = "";
    password.value = "";
    confpassword.value = "";
}