<%-- 
    Document   : Perfil_Usuario
    Created on : 25 may. 2022, 18:47:10
    Author     : alexi
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="com.fcfm.models.Usuario"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.text.SimpleDateFormat"%>
<%
    Usuario user = (Usuario)session.getAttribute("user");
    Usuario data = (Usuario)request.getAttribute("userdata");
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    String fechastring = df.format(data.getFecha_nac());
    
%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil de Usario</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/Perfil-Usuario.css">
</head>

<body>

    <div class="menu">

        <div class="izquierdo">
            <div class="izquierdo_1">
                <a href="MainPage" style="text-align: center;"><img src="img/NotasParaTodos.png" alt=""></a>
                <br>
                <h5>Usuario: "Me llamo <%= user.getUsername() %>"</h5>
            </div>
            <div class="izquierdo_2">
                <a href="MainPage" class="btn btn-secondary">Menú principal</a>
                <a href="CerrarUsuario" class="btn btn-secondary">Salir</a>
            </div>
        </div>


        <div class="derecho">

            <section class="Perfil-Usario">
                <div class="Contenido-Formulario">
                    <ul class="Lista-de-datos"></ul>
                        <form class="DatosUsario" id="Formulario-Usuario">
                            <div class="form-label-group" state="sc">
                                <h6>Nombre:</h6>
                                <input type="text" placeholder="Nombres" id="txt_nombres" name="Nombres" maxlength="64" class="form-control mt-3" value="<%= data.getNombres() %>" disabled>
                                <small></small>
                            </div>
                            <div class="form-label-group" state="sc">
                                <h6>Apellido:</h6>
                                <input type="text" placeholder="Apellidos" id="txt_apellidos" name="Apellidos" maxlength="64" class="form-control mt-3" value="<%= data.getApellidos() %>" disabled>
                                <small></small>
                            </div>
                            <div class="form-label-group" state="sc">
                                <h6>Correo electrónico:</h6>
                                <input type="email" placeholder="Email" id="eml_correoe" name="Correo_electronico" maxlength="64" class="form-control mt-3" value="<%= data.getCorreo_e() %>" disabled>
                                <small></small>
                            </div>
                            <div class="form-label-group" state="sc">
                                <h6>Fecha de nacimiento:</h6>
                                <input type="date" placeholder="Cumpleaños" id="dt_fecnac" name="Fecha_nacimiento" class="form-control mt-3" value="<%= fechastring %>" disabled>
                                <small></small>
                            </div>
                            <div class="form-label-group" state="sc">
                                <h6>Contraseña:</h6>
                                <input type="password" placeholder="Contraseña" id="psw_password" name="Contrasena" maxlength="64" class="form-control mt-3" value="<%= data.getPassword() %>" disabled>
                                <small></small>
                            </div>
                            <div class="form-label-group" state="sc">
                                <h6>Confirmar Contraseña:</h6>
                                <input type="password" placeholder="Confirmar Contraseña" id="psw_confpassword" name="Confirmar_contra" maxlength="64" class="form-control mt-3" value="<%= data.getPassword() %>" disabled>
                                <small></small>
                            </div>
                            
                            <button type="button" id="BUTTOM-Editar">Editar</button>
                            <div class="form-label-group">
                                <button type="submit" id="BUTTOM-Guardar">Guardar</button>
                                <small></small>
                            </div>

                        </form>
                    </ul>
                </div>
            </section>
        </div>

    </div>

     <!--Footer-->
     <div class="container-footer">
        <footer>
            <div class="redes-footer">
                <a href="#"><i class="fab fa-facebook ico-redes-footer"></i></a>
                <a href="#"><i class="fab fa-instagram ico-redes-footer"></i></a>
                <a href="#"><i class="fab fa-youtube ico-redes-footer"></i></a>
            </div>
            <hr>
            <h4>NOTAS PARA TODOS</h4>
            <h4>Todos los derechos reservados.</h4>
        </footer>
    </div>

        <script src="js/lib/jquery-3.6.0.min.js"></script>
        <script src="https://kit.fontawesome.com/a4552126f3.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
        <script src="js/models/Validaciones.js"></script>
        <script src="js/source/perfil.js"></script>
</body>

</html>