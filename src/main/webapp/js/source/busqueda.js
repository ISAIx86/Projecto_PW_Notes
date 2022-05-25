$(document).ready(function(){

    var currpag = $('#lb_pag').attr('current');
    var maxpages = $('#lb_pag').attr('maxpag');

    var byContent = $('#Palabra').val();
    var initDate = $('#FechaInicial').val();
    var finalDate = $('#FechaFinal').val();

    $(document).on('click', '.supreme', function (e) {
        e.preventDefault();
        let cuadrito = $(this).parent().children('div');
        let status = $(this).attr("status");
        let isediting = $(this).attr("edit");

        if (status === "false") {
            let str;
            if (isediting === "true") {
                str = `
                <div class="cuadrito">
                    <div class="pareja" id="btn_guardarnota">
                        <i class="guardar iconos fa-solid fa-floppy-disk"></i>
                        <h5>Guardar nota</h5>
                    </div>
                    <div class="pareja" id="btn_cerrarnota">
                        <i class="iconos fa-solid fa-arrow-up-right-from-square"></i>
                        <h5>Cerrar nota</h5>
                    </div>
                </div>
                `;
            }
            else {
                str = `
                <div class="cuadrito">
                    <div class="pareja" id="btn_abrirnota">
                        <i class="iconos fa-solid fa-arrow-up-right-from-square"></i>
                        <h5>Abrir nota</h5>
                    </div>
                    <div class="pareja" id="btn_eliminarnota">
                        <i class="Eliminar iconos fa-solid fa-trash-can"></i>
                        <h5>Eliminar nota</h5>
                    </div>
                </div>
                `;
            }
            cuadrito.html(str);
            $(this).attr('status', "true");
        }

        else {
            //remove
            $(this).attr('status', "false");
            cuadrito.html("");
        }
    });

    $(document).on('click', '#btn_abrirnota', function() {
        let card = $(this).parents('.card-body');
        card.children('h3').replaceWith(function() {
            return $('<input/>' , {
                'type': 'text',
                'value': $(this).text()
            })
        });
        card.children('textarea').prop("disabled", false);
        card.children('div').html("");
        card.children('i').attr("status", "false")
        card.children('i').attr("edit", "true");
    });

    $(document).on('click', '#btn_cerrarnota', function() {
        let card = $(this).parents('.card-body');
        card.children('input').replaceWith(function(){
            return $('<h3/>', {html: $(this).val(), 'class':'card-title'});
        });
        card.children('textarea').prop("disabled", true);
        card.children('div').html("");
        card.children('i').attr("status", "false")
        card.children('i').attr("edit", "false");
    });

    $(document).on('click', '#btn_guardarnota', function() {
        let card = $(this).parents('.card-body');
        let notaid = card.children('div').attr("notaid");
        let titulo = card.children('input').val();
        let contenido = card.children('textarea').val();
        $.ajax({
            data: {notaID: notaid, nTitulo: titulo, nContenido: contenido},
            type: "GET",
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: "json",
            url: "GestionNotas"
        }).done(function(data){
            let notitamod = data.nota;
            if (data.resultado === true) {
                card.children('input').replaceWith(function(){
                    return $('<h3/>', {html: notitamod.titulo, 'class':'card-title'});
                });
                card.children('textarea').text(notitamod.contenido);
            }
        }).fail(function(jqXHR, textEstado) {
            console.log("Por qué valio chettos:" + textEstado);
        });
        card.children('textarea').prop("disabled", true);
        card.children('div').html("");
        card.children('i').attr("status", "false");
        card.children('i').attr("edit", "true");
    });

    $(document).on('click', '#btn_eliminarnota', function() {
        let card = $(this).parents('.card-body');
        let notaid = card.children('div').attr('notaid');
        $.ajax({
            data: {notaID: notaid, currentPage: currpag},
            type: "POST",
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: "json",
            url: "GestionNotas"
        }).done(function(data){
            if (data.resultado === true) {
                if (data.pagvacia === true) {
                    currpag = data.currentpag;
                    maxpages = data.maxpags;
                    if (maxpages > 1) {
                        $('#paginacion').html("");
                    }
                    else {
                        $('#lb_pag').attr('current', currpag)
                        $('#lb_pag').text("Pagina " + currpag + " / " + maxpages);
                        get_notas(data.listanotas);
                    }
                }
                else {
                    get_notas(data.listanotas);
                }
            }
            else {

            }
        }).fail(function(jqXHR, textEstado) {
            console.log("Por qué valio chettos:" + textEstado);
        });
        card.children('div').html("");
        card.children('i').attr("status", "false");
    })

    $(document).on('click', '#Btn-Busqueda', function() {
        byContent = $('#Palabra').val();
        initDate = $('#FechaInicial').val();
        finalDate = $('#FechaFinal').val();
        $.ajax({
            data: {contenido: byContent, startDate: initDate, endDate: finalDate},
            type: "GET",
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: "json",
            url: "BusquedaAvanzadaFiltros"
        }).done(function(data){
            if (data.resultado === true) {
                var currpag = 1;
                var maxpages = data.maxpages;
                get_notas(data.notasresult);
                if (maxpages > 1) {
                    $('#lb_pag').attr('current', currpag)
                    $('#lb_pag').text("Pagina " + currpag + " / " + maxpages);
                }
                else {
                    $('#paginacion').html("");
                }
            }
            else {
                alert(data.razon);
            }
        }).fail(function(jqXHR, textEstado) {
            console.log("Por qué valio chettos:" + textEstado);
        });
    })

    $(document).on("click", "#btn_prevpag", function() {
        if (currpag > 1) {
            currpag--;
            $('#lb_pag').attr('current', currpag)
            $('#lb_pag').text("Pagina " + currpag + " / " + maxpages)
            $.ajax({
                data: {currentPage: currpag, contenido: byContent, startDate: initDate, endDate: finalDate},
                type: "GET",
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: "json",
                url: "BusquedaAvanzadaFiltros"
            }).done(function(data){
                if (data.resultado === true) {
                    get_notas(data.notasresult);
                }
                else {
                    alert(data.razon);
                }
            }).fail(function(jqXHR, textEstado) {
                console.log("Por qué valio chettos:" + textEstado);
            });
        }
    })

    $(document).on("click", "#btn_nextpag", function() {
        if (currpag < maxpages) {
            currpag++;
            $('#lb_pag').attr('current', currpag);
            $('#lb_pag').text("Pagina " + currpag + " / " + maxpages);
            $.ajax({
                data: {currentPage: currpag, contenido: byContent, startDate: initDate, endDate: finalDate},
                type: "GET",
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                dataType: "json",
                url: "BusquedaAvanzadaFiltros"
            }).done(function(data){
                if (data.resultado === true) {
                    get_notas(data.notasresult);
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