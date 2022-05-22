$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "RevisarSesion"
}).done(function (data, textEstado, jqXHR) {
    console.log(data);
    if (data.respuesta == true) {
        alert("Udsted ya cuenta con una sesion");
        window.location.href = "Inicio.html";

    } else
    {
        //alert("no cuento con una sesion aun");
        //window.location.href = "index.html";
    }
}).fail(function (jqXHR, textEstado) {
    console.log("errorxd fatal" + textEstado);
});

$("#RegistroUsuario").submit(function (event) {
    event.preventDefault();
    alert("envio info");
    $.ajax({
        data: new FormData(this),
        type: "POST",
        dataType: "json",
        url: "RegistroUsuario",
        cache: false,
        contentType: false,
        processData: false
    }).done(function (data, textEstado, jqXHR) {
        console.log(data);
        if (data.respuesta == true) {
            alert("Se Registro Correctamente");
            window.location.href = "index.html";
        } else
        {
            alert("Formato de Correo/Contraseña Invalido");
        }
    }).fail(function (jqXHR, textEstado) {
        console.log("errorxd fatal" + textEstado);
    });
});