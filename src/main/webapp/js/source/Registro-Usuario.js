const Datos = document.getElementById('Formulario-Usuario'); 
let BTNEditar = document.querySelector('#BUTTOM-Editar'); //ACCEDEMOS AL BOTÓN SUBMIT

const BTNSubmit = document.getElementById('BUTTOM-Guardar'); 
const inputs = document.querySelectorAll('#Formulario-Usuario input'); 

//PARA EDITAR Y MOSTRAR LOS DEMAS CAMPOS
BTNEditar.addEventListener('click',() => { //CUANDO DE CLICK AL BOTÓN DE EDITAR

    //Habilita los botones para poder editar
    document.getElementById("Nombres").disabled = false;
    document.getElementById("Apelldios").disabled = false;
    document.getElementById("Email").disabled = false;
    document.getElementById("Cumpleaños").disabled = false;
    document.getElementById("Contrasena").disabled = false;
    document.getElementById("Contrasena2").disabled = false;

    //Oculta el boton de editar
    document.getElementById("BUTTOM-Editar").style.display = "none";

    //Muestra el boton de guardar
    document.getElementById("BUTTOM-Guardar").style.display = "block";
    
});

