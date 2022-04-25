$(document).ready(function() {

    $('#eml_login').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (!validEmail(value)){
            setCSSFor($(this)[0], 'error', "Éste correo no tiene formato válido");
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
    });

    $('#psw_login').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (value.length < 8) {
            setCSSFor($(this)[0], 'error', "La contraseña ser de mínimo 8 caracteres");
            setStateFor($(this)[0], 'error');
        }
        else if (!validPassword(value)) {
            setCSSFor($(this)[0], 'error', "Debe contener al menos: una mayús, una minús, un número y un caractér especial");
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
    });
    
    $('#form').submit(function(e) {
        e.preventDefault();
        if(checkInputs()) {
            $.ajax({
                data: $(this).serialize(),
                type: "GET",
                dataType: "json",
                url: "RegistrarUsuario"
            }).done(function(data){
                if (data.resultado === true) {
                    
                }
                else {
                    alert("Algo salió mal.");
                }
            }).fail(function(jqXHR, textEstado) {
                console.log("Por qué valio chettos:" + textEstado);
            });
        }
    });

});

function checkInputs() {
    let email = $('#eml_login')[0];
    let pass = $('#psw_login')[0];
    if (email.value.trim() === "") {
        setCSSFor(email, 'error', "Ingrese un correo electrónico");
        return false;
    }
    if (pass.value.trim() === "") {
        setCSSFor(pass, 'error', "Ingrese la contraseña");
        return false;
    }
    return true;
}

function emptyFields() {
    $('#eml_login').val("");
    $('#psw_login').val("");
}