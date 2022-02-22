var lista_users = [];

$(document).ready(function() {

    loadUsers();

    $('#eml_login').change(function() {
        debugger;
        let value = $(this).val();
        if (value = "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        
    });

    $('#psw_login').change(function() {
        debugger;
        let value = $(this).val();
        if (value == "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
    });
    
    $('input[type=submit]').click(function() {
        checkInputs();
    });

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
    let email = $('#eml_login')[0];
    let pass = $('#psw_login')[0];
    if (email.value.trim() == "") {
        setCSSFor(email, 'error', "Ingrese un correo electrónico")
        return;
    }   
    if (pass.value.trim() == "") {
        setCSSFor(pass, 'error', "Ingrese la contraseña")
        return;
    }
    debugger;
    let found = false;
    lista_users.some(function(user) {
        if (user.email == email.value.trim()) {
            found = true;
            if (user.contra = pass.value.trim()){
                alert("El usuario " + email.nombres + " ha iniciado sesión.");
                
            }
            else {
                setCSSFor(pass, 'error', "La contraseña es incorrecta");
            }
        }
    });
    if (!found) setCSSFor(email, 'error', "El usuario no existe");
}

function emptyFields() {
    $('#eml_login').val("");
    $('#psw_login').val("");
}