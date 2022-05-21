$(document).ready(function() {

    $('#txt_nombres').change(function() {
        let value = $(this).val();
        if(value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (!noNumbers(value)){
            setCSSFor($(this)[0], 'error', "El Nombre no debe contener números");
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#txt_apellidos').change(function() {
        let value = $(this).val();
        if(value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (!noNumbers(value)) {
            setCSSFor($(this)[0], 'error', "El Apellido no debe contener números");
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#txt_username').change(function() {
        let value = $(this).val();
        if(value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#dt_fecnac').change(function() {
        let value = $(this).val();
        let sep = value.split('-');
        let fecnac = new Date(sep[0], sep[1] - 1, sep[2]);
        if (!validDate(fecnac)) {
            setCSSFor($(this)[0], 'error', 'No debe ser una fecha próxima');
            setStateFor($(this)[0], 'error');
        }
        else if (isNaN(fecnac)){
            setCSSFor($(this)[0], 'error', 'La fecha no existe');
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#eml_correoe').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (!validEmail(value)) {
            setCSSFor($(this)[0], 'error', "Éste correo no tiene formato válido");
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#psw_password').change(function() {
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
            $("#psw_confpassword").trigger("change");
        }
        checkAllCorrect();
    });

    $('#psw_confpassword').change(function() {
        let value = $(this).val();
        let password = $('#psw_password').val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (value !== password) {
            setCSSFor($(this)[0], 'error', "La contraseña no coincide");
            setStateFor($(this)[0], 'error');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    })

    $('#form').submit(function(e){
        e.preventDefault();
        if (checkInputs()) {
            $.ajax({
                data: $(this).serialize(),
                type: "POST",
                dataType: "json",
                url: "RegistrarUsuario"
            }).done(function(data){
                if (data.resultado === true) {
                    alert(data.razon);
                    emptyFields();
                    window.location.replace("login_proto.html");
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

function checkAllCorrect() {
    let divs = Array.from($('#form').children());
    for (let i = 0; i < divs.length - 1; i++) {
        if (divs[i].getAttribute("estado") === "novalido") {
            let input = divs[i].querySelector('input');
            setCSSFor($('input[type=submit]')[0], 'error', "El campo " + input.getAttribute('name') + " está incorrecto");
            return false;
        }
    }
    setCSSFor($('input[type=submit]')[0], 'normal');
    return true;
}

function checkNoEmpty() {
    let divs = Array.from($('#form').children());
    let all_correct = true;
    for (let i = 0; i < divs.length - 1; i++) {
        if (divs[i].getAttribute("estado") === "vacio") {
            let input = divs[i].querySelector('input');
            setCSSFor(input, 'error', "Llene éste campo.");
            all_correct = false;
        }
    }
    if (!all_correct) setCSSFor($('input[type=submit]')[0], 'error', "Hay campos vacíos, por favor complete la información");
    return all_correct;
}

function checkInputs() {
    if (!checkNoEmpty()) return false;
    if (!checkAllCorrect()) return false;
    return true;
}

function emptyFields() {
    $('#txt_nombres').val("");
    $('#txt_apellidos').val("");
    $('#txt_username').val("");
    $('#nbr_dia').val("");
    $('#slt_mes').val("");
    $('#nbr_año').val("");
    $('#eml_correoe').val("");
    $('#psw_password').val("");
    $('#psw_confpassword').val("");
}

function imagePreview() {
    let frame = $('#frame')[0];
    frame.src=URL.createObjectURL(event.target.files[0]);
}