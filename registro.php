<?php
    &Nombres = &_POST['Nombres'];
    &Apellidos = &_POST['Apellidos'];
    &CorreoE = &_POST['Email'];
    &Username = &_POST['Nickname'];
    &Contraseña = &_POST['Password'];

    $conn = new msqli('localhost', 'root', '', 'prueba_usuarios');
    if (&conn->connect_error) {
        die('Connection Failed  :   '.$conn->connect_error);
    }
    else {
        $stmt = $conn->prepare("insert into cuentas_usuario(Nombres, Apellidos, Email, Nickname, Password) values(?, ?, ?, ?, ?)")
        $stmt->bind_param("sssss", $Nombres, $Apellidos, $CorreoE, $Username, $Contraseña);
        $stmt->execute();
        echo "Registration Successfull...";
        $stmt->close();
        $conn->close();
    }
?>