$.ajax({
    async: false,
    type: "GET",
    dataType: "json",
    url: "RevisarSesion"
}).done(function (data, textEstado, jqXHR) {
    console.log(data);
    if (data.respuesta == true) {
        alert("Ya cuenta con una sesion, si desea salir cierre su Sesion");
        window.location.href = "Inicio.html";

    } else
    {
        //alert("no cuento con una sesion aun");
        //window.location.href = "index.html";
    }
}).fail(function (jqXHR, textEstado) {
    console.log("errorxd fatal" + textEstado);
});

$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        //alert("envio info");
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            dataType: "json",
            url: "Login"
        }).done(function (data, textEstado, jqXHR) {
            console.log(data);
            if (data.respuesta == true) {
                alert("Sea Bienvenido Usuario");
                window.location.href = "Notasxd.html";
            } else
            {
                alert("Usuario o Contraeña Invalidos");
            }
        }).fail(function (jqXHR, textEstado) {
            console.log("me voy a suicidar" + textEstado);
        });
    });
});