var num = 0;

$(document).ready(function() {

    num = localStorage.getItem('cant');
    if (num == null) num = 0;

    $('#fl_photoholder').change(function() {
        setCSSFor($(this)[0], 'success');
        setStateFor($(this)[0], 'success');
        imagePreview();
        checkAllCorrect();
    });

    $('#btn_loadphoto').click(function() {
        document.getElementById('fl_photoholder').click();
    });

    $('#txt_nombres').change(function() {
        let value = $(this).val();
        if(value == "") {
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
        if(value == "") {
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
        if(value == "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#nbr_dia').change(function() {
        let value = $(this).val();
        if (value == "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else if (value < 1){
            $(this).val("1")
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        else if (value > 31) {
            $(this).val("31");
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    })

    $('#slt_mes').change(function() {
        let value = $(this).val()
        if (value == 0) {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#nbr_año').change(function() {
        let value = $(this).val();
        if (value == "") {
            setCSSFor($(this)[0], 'normal');
            setStateFor($(this)[0], 'normal');
        }
        else {
            setCSSFor($(this)[0], 'success');
            setStateFor($(this)[0], 'success');
        }
        checkAllCorrect();
    });

    $('#eml_correoe').change(function() {
        let value = $(this).val();
        if (value == "") {
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
        if (value == "") {
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
        checkAllCorrect();
    });

    $('#psw_confpassword').change(function() {
        let value = $(this).val();
        let password = $('#psw_password').val()
        if (value == "") {
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

    $('[type=submit]').click(function(e){
        e.preventDefault();
        if (checkInputs()) {
            addUser();
            emptyFields();
        }
    })

});

function checkAllCorrect() {
    let divs = Array.from($('#form').children());
    for (let i = 0; i < divs.length - 1; i++) {
        if (divs[i].getAttribute("estado") == "novalido") {
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
        if (divs[i].getAttribute("estado") == "vacio") {
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
    let in_day = $('#nbr_dia')[0];
    let in_mon = $('#slt_mes')[0];
    let in_yea = $('#nbr_año')[0];
    let fn_day = in_day.value.trim();
    let fn_mon = in_mon.value.trim();
    let fn_yea = in_yea.value.trim();
    if (!validDate(fn_day, fn_mon, fn_yea)) {
        setCSSFor(in_day, 'error', "");
        setStateFor(in_day, 'error');
        setCSSFor(in_mon, 'error', "");
        setStateFor(in_mon, 'error');
        setCSSFor(in_yea, 'error', "La fecha "+fn_day+'/'+fn_mon+'/'+fn_yea+" no es válida");
        setStateFor(in_yea, 'error');
        setCSSFor($('input[type=submit]')[0], 'error',"La fecha que ingrseó no es válida");
        in_day.value = "";
        in_mon.value = "";
        in_yea.value = "";
        return false;
    }
    return true;
}

function addUser() {
    let in_nombres = $('#txt_nombres').val();
    let in_apellidos = $('#txt_apellidos').val();
    let in_username = $('#txt_username').val();
    let in_date = $('#nbr_dia').val() + '/' + $('#slt_mes').val() + '/' + $('#nbr_año').val();
    let in_email = $('#eml_correoe').val();
    let in_pass = $('#psw_password').val();
    let new_user = new Usuario(
        in_nombres,
        in_apellidos,
        in_username,
        in_date,
        in_email,
        in_pass
    );
    let index = 'usr' + num;
    localStorage.setItem(index, new_user.stringify());
    num++;
    localStorage.setItem("cant", num);
}

function emptyFields() {
    let frame = $('#frame')[0];
    frame.src="";
    $('#fl_photoholder').val("");
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