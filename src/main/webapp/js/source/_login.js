$(document).ready(function() {

    $('#eml_login').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (!validEmail(value)){
            setCSSFor($(this)[0], 'error', 'Formato de correo electróncio no válido.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
    });

    $('#psw_login').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (value.length < 8) {
            setCSSFor($(this)[0], 'error', 'La contraseña debe ser de 8 a 16 caracteres.');
        }
        else if (!validPassword(value)) {
            setCSSFor($(this)[0], 'error', 'Formato de contraseña no valido.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
    });
    
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        if(checkInputs()) {
            $.ajax({
                data: $(this).serialize(),
                type: "POST",
                dataType: "json",
                url: "IniciarUsuario"
            }).done(function(data){
                if (data.resultado === true) {
                    alert(data.razon);
                    emptyFields();
                    window.location.replace("mainpage_proto.html");
                }
                else {
                    alert(data.razon);
                }
            }).fail(function(jqXHR, textEstado) {
                console.log("Por qué valio chettos:" + textEstado);
            });
        }
    });

});

function checkInputs() {
    let all_correct = true;
    let email = $('#eml_login')[0];
    let pass = $('#psw_login')[0];
    if (email.value.trim() === "") {
        setCSSFor(email, 'error', "Ingrese un correo electrónico");
        all_correct = false;
    }
    if (pass.value.trim() === "") {
        setCSSFor(pass, 'error', "Ingrese la contraseña");
        all_correct = false;
    }
    return all_correct;
}

function emptyFields() {
    $('#eml_login').val("");
    $('#psw_login').val("");
}