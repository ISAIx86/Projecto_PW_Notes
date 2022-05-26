$(document).ready(function (){

    var form_disabled = true;

    $(document).on('click', '#BUTTOM-Editar', function() {
        
        if (form_disabled) {
            validateEntry();
            $('#txt_nombres').prop("disabled", false);
            $('#txt_apellidos').prop("disabled", false);
            $('#eml_correoe').prop("disabled", false);
            $('#dt_fecnac').prop("disabled", false);
            $('#psw_password').prop("disabled", false);
            $('#psw_confpassword').prop("disabled", false);
            $('#BUTTOM-Editar').text("Cerrar");
            $('#BUTTOM-Guardar').show();
            form_disabled = false;
        }
        else {
            $('#txt_nombres').prop("disabled", true);
            $('#txt_apellidos').prop("disabled", true);
            $('#eml_correoe').prop("disabled", true);
            $('#dt_fecnac').prop("disabled", true);
            $('#psw_password').prop("disabled", true);
            $('#psw_confpassword').prop("disabled", true);
            $('#BUTTOM-Editar').text("Editar");
            $('#BUTTOM-Guardar').hide();
            form_disabled = true;
        }
        
    });

    $('#txt_nombres').change(function() {
        let value = $(this).val();
        if(value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (!noNumbers(value)){
            setCSSFor($(this)[0], 'error', 'El nombre no puede contener números.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#txt_apellidos').change(function() {
        let value = $(this).val();
        if(value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (!noNumbers(value)) {
            setCSSFor($(this)[0], 'error', 'Los apellidos no pueden contener números.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#dt_fecnac').change(function() {
        let value = $(this).val();
        let sep = value.split('-');
        let fecnac = new Date(sep[0], sep[1] - 1, sep[2]);
        if (!validDate(fecnac)) {
            setCSSFor($(this)[0], 'error', 'La fecha no debe pasar de la actual.');
        }
        else if (isNaN(fecnac)){
            setCSSFor($(this)[0], 'error', 'La fecha ingresada no existe.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#eml_correoe').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (!validEmail(value)) {
            setCSSFor($(this)[0], 'error', 'Formato de correo electrónico no válido.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#psw_password').change(function() {
        let value = $(this).val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (value.length < 8) {
            setCSSFor($(this)[0], 'error', 'La contraseña debe ser de 8 a 16 caracteres.');
            
        }
        else if (!validPassword(value)) {
            setCSSFor($(this)[0], 'error', 'El formato debe contener mayúsculas, minúsculas, números y caracteres especiales.');
        }
        else {
            setCSSFor($(this)[0], 'success');
            $("#psw_confpassword").trigger("change");
        }
        checkAllCorrect();
    });

    $('#psw_confpassword').change(function() {
        let value = $(this).val();
        let password = $('#psw_password').val();
        if (value === "") {
            setCSSFor($(this)[0], 'normal');
        }
        else if (value !== password) {
            setCSSFor($(this)[0], 'error', 'La contraseña no coincide.');
        }
        else {
            setCSSFor($(this)[0], 'success');
        }
        checkAllCorrect();
    })

    $('#Formulario-Usuario').submit(function(e){
        e.preventDefault();
        if (checkInputs()) {
            $.ajax({
                data: $(this).serialize(),
                type: "POST",
                dataType: "json",
                url: "EditarPerfil"
            }).done(function(data){
                if (data.resultado === true) {
                    alert(data.razon);
                    window.location.replace("EditarPerfil");
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

function validateEntry() {
    $('#txt_nombres').trigger("change");
    $('#txt_apellidos').trigger("change");
    $('#eml_correoe').trigger("change");
    $('#dt_fecnac').trigger("change");
    $('#psw_password').trigger("change");
    $('#psw_confpassword').trigger("change");
}

function checkAllCorrect() {
    let divs = Array.from($('#Formulario-Usuario').children('div'));
    for (let i = 0; i < divs.length - 1; i++) {
        if (divs[i].getAttribute("state") === "nv") {
            let input = divs[i].querySelector('input');
            setCSSFor($('#BUTTOM-Guardar')[0], 'error', "El campo " + input.getAttribute('name') + " está incorrecto");
            return false;
        }
    }
    setCSSFor($('#BUTTOM-Guardar')[0], 'normal');
    return true;
}

function checkNoEmpty() {
    let divs = Array.from($('#Formulario-Usuario').children('div'));
    let all_correct = true;
    for (let i = 0; i < divs.length - 1; i++) {
        if (divs[i].getAttribute('state') === "mt") {
            let input = divs[i].querySelector('input');
            setCSSFor(input, 'error', "Llene éste campo.");
            all_correct = false;
        }
    }
    if (!all_correct) setCSSFor($('#BUTTOM-Guardar')[0], 'error', "Hay campos vacíos, por favor complete la información");
    return all_correct;
}

function checkInputs() {
    if (!checkNoEmpty()) return false;
    if (!checkAllCorrect()) return false;
    return true;
}