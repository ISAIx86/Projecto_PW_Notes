$(document).ready(function () {

    var currpag = $('#lb_pag').attr('current');
    var maxpages = $('#lb_pag').attr('maxpag');

    let validador1 = false;
    let validador2 = false;
    let validador3 = false;

    $(document).on('click', '#btn_nueva_nota', function (e) {
        e.preventDefault();

        if (validador2 == false) {
            validador2 = true;

            let container = document.querySelector("#insert_new_note");
            container.classList.add("container");

            let str = `
                <div class="row my-3 mx-5">
                    <div class="col my-3">
                        <div class="card" style="width: 30rem;">
                            <div class="card-body">
                                <form id="form-nota">
                                    <input class="card-title" type="text" id="txt_titulo" name="titulo" placeholder="Título" style="width:100%;">
                                    <textarea placeholder="Tu Nueva Nota" id="txt_contenido" name="contenido" cols="30" rows="3" style="width:100%;"></textarea>
                                    <input class="btn btn-primary" type="submit" value="Guardar" style="width:100%;"></a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $("#insert_new_note").html(str);
        } else if (validador2 === true) {

            $("#insert_new_note").html("");
            validador2 = false;
            $("#insert_new_note").removeClass("container");
        }

    });

    $(document).on('click', '.guardar', function (e) {
        e.preventDefault();
        alert("xd");
        //aqui ya mandas la info y lo guardas xd
    });

    $(document).on('click', '.eliminar', function (e) {
        e.preventDefault();
        alert("xd");
        //aqui lo eliminas xd
    });

    $(document).on('click', '.supreme', function (e) {
        e.preventDefault();

        let Id = $(this).attr('index');
        let status = $(this).attr('status');

        if (status === "false") {
            //add
            //console.log("agrega");
            let str = `
                <div class="cuadrito">
                    <div class="pareja">
                        <i  class="guardar iconos fa-solid fa-floppy-disk"></i>
                        <h5>guardar nota</h5>
                    </div>
                    <div class="pareja">
                        <i class="iconos fa-solid fa-arrow-up-right-from-square"></i>
                        <h5>abrir nota</h5>
                    </div>
                    <div class="pareja">
                        <i class="eliminar iconos fa-solid fa-trash-can"></i>
                        <h5>eliminar nota</h5>
                    </div>
                </div>
            `;

            $("#cuadrito" + Id).html(str);

            $(this).attr('status', "true");
        }

        else {
            //remove
            $(this).attr('status', "false");
            $("#cuadrito" + Id).html("");
        }
    });
    
    $(document).on("submit", '#form-nota', function (e) {
        e.preventDefault();
        $.ajax({
            data: $(this).serialize(),
            type: "POST",
            dataType: "json",
            url: "MainPage"
        }).done(function(data){
            if (data.resultado === true) {
                alert(data.razon);
                window.location.replace("MainPage");
            }
            else {
                alert(data.razon);
            }
        }).fail(function(jqXHR, textEstado) {
            console.log("Por qué valio chettos:" + textEstado);
        });
    });

    $(document).on("click", "#btn_prevpaga", function(e) {
        if (currpag > 1) {
            currpag--;
            $('#lb_pag').attr('current', currpag)
            $('#lb_pag').text("Pagina " + currpag + " / " + maxpages)
            $.ajax({
                data: {currentPage: currpag, maxPage: maxpages},
                type: "GET",
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: "json",
                url: "PaginarNotas"
            }).done(function(data){
                if (data.resultado === true) {
                    get_notas(data.notas);
                }
                else {
                    alert(data.razon);
                }
            }).fail(function(jqXHR, textEstado) {
                console.log("Por qué valio chettos:" + textEstado);
            });
        }
    })

    $(document).on("click", "#btn_nextpag", function(e) {
        if (currpag < maxpages) {
            currpag++;
            $('#lb_pag').attr('current', currpag)
            $('#lb_pag').text("Pagina " + currpag + " / " + maxpages)
            $.ajax({
                data: {currentPage: currpag, maxPage: maxpages},
                type: "GET",
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: "json",
                url: "PaginarNotas"
            }).done(function(data){
                if (data.resultado === true) {
                    get_notas(data.notas);
                }
                else {
                    alert(data.razon);
                }
            }).fail(function(jqXHR, textEstado) {
                console.log("Por qué valio chettos:" + textEstado);
            });
        }
    })
    
});

function get_notas(notaarray) {
    
    $("#notas_container").html("");
    let str = "";
    
    if (notaarray != null) {
        let count = 0;
        const size = notaarray.length;
        const rows = Math.ceil(size / 3.0);
        for (let i = 0; i < rows; i++) {
            str += `
                <div class="row">
            `;
            for (let j = 0; j < 3; j++) {
                if (count >= size) break;
                str += `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card" style="">
                            <div class="card-body">
                                <i status="false" index="`+count+`" class="supreme fa-solid fa-ellipsis" style="position:absolute; top: 20px; right: 20px;"></i>
                                <h3 class="card-title">`+notaarray[count].titulo+`</h3>
                                <div style="padding-top: 0;z-index: 100; position: absolute;margin-left: 50%;" id="cuadrito`+count+`" notaid="`+notaarray[count].id_nota+`"></div>
                                <textarea style="width: 100%;" rows="5" disabled>`+notaarray[count].contenido+`</textarea>
                            </div>
                        </div>
                    </div>
                `;
                count++;
            }
            str += `
                </div>
            `;
        }
    }
    $("#notas_container").html(str);
}