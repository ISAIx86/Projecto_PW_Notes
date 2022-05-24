<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.fcfm.models.Notas"%>
<%@page import="com.fcfm.models.Usuario"%>

<%
    Usuario user = (Usuario)session.getAttribute("user");
    List<Notas> listanotas = (List<Notas>)request.getAttribute("notelist");
    int total_paginas = (int)request.getAttribute("maxpages");
%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css">
</head>

<body>

    <div class="menu">

        <div class="izquierdo">
            <div class="izquierdo_1">
                <img src="img/photo.jpg" alt="">
                <h5>Usuario: "Me llamo <%= user.getUsername() %>"</h5>
            </div>

            <div class="izquierdo_2">
                <input class="buscador" type="text" placeholder="¿Que Estas Buscando?"/>
                <input class="btn btn-secondary" id="btn_nueva_nota" type="button" value="Nueva Nota"/>
                <input class="btn btn-secondary" id="btn_editar_prefil" type="button" value="Editar perfil"/>
                <a href="CerrarUsuario" class="btn btn-secondary">Salir</a>
            </div>
        </div>
    


        <div class="derecho">
            <div id="get_my_notes">
                
                <div id="insert_new_note">
                </div>

                <div class="row my-3 mx-5">
                    <div class="col my-3">
                        <%
                            if (!listanotas.isEmpty()) {
                                int i = 0;
                                for (Notas notita : listanotas) {
                        %>
                                    <div class="card" style="width: 18rem;">
                                        <div class="card-body">
                                            <i status="false" index="<%= i %>" class="supreme fa-solid fa-ellipsis" style="position:absolute; top: 20px; right: 20px;"></i>
                                            <h3><%= notita.getTitulo() %></h3>
                                            <div style="padding-top: 0;z-index: 100; position: absolute;margin-left: 50%;" id="cuadrito<%= i %>" notaid="<%= notita.getId_nota().toString() %>"></div>
                                            <textarea style="width: 100%;" rows="5"><%= notita.getContenido() %></textarea>
                                        </div>
                                    </div>
                        <%
                                    i++;
                                }
                            }
                        %>
                    </div>
                </div>

            </div>
                    
            <%
                if (total_paginas > 1) {
            %>
            
            <div id="paginacion" class="row">
                <div class="col text-center">
                    <button id="btn_prevpaga" class="btn btn-secondary"><i class="fa-solid fa-arrow-left"></i></button>
                </div>
                <div class="col text-center"><h4 id="lb_pag" current="1" maxpag="<%= total_paginas %>"> Pagina 1 / <%= total_paginas %> </h4></div>
                <div class="col text-center">
                    <button id="btn_nextpag" class="btn btn-secondary"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
            
            <%
                }    
            %>
            
        </div>
    </div>

        <script src="js/lib/jquery-3.6.0.min.js"></script>
        <script src="https://kit.fontawesome.com/a4552126f3.js" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
        <script src="js/source/main.js"></script>
</body>

</html>