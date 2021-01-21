
/* Validar formulario */
var reNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
var reApellidos = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
var reDNI = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
var reDireccion = /^[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-Z1-9À-ÖØ-öø-ÿ]+\.?)* (((#|[nN][oO]\.?) ?)?\d{1,4}(( ?[a-zA-Z0-9\-]+)+)?)$/;
var reCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
var reTelefono = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

$(document).ready(function(){
    $(".btnEnviar").click(function(){
        let nombre = $("#itNombre").val();
        let apellidos = $("#itApellidos").val();
        let DNI = $("#itDNI").val();
        let direccion = $("#itDireccion").val();
        let telefono = $("#itTelefono").val();
        let correo = $("#itCorreo").val();

        if (nombre == "" || !reNombre.test(nombre)){
            $("#itNombre").css("border-color", "red");
            return false;
        } else{
            $("#itNombre").css("border-color", "green");
            $("#itApellidos").removeAttr("disabled");
            $("#itApellidos").focus();

            if (apellidos == "" || !reApellidos.test(apellidos)){
                $("#itApellidos").css("border-color", "red");
                return false;
            } else{
                $("#itApellidos").css("border-color", "green");
                $("#itDNI").removeAttr("disabled");
                $("#itDNI").focus();
                if (DNI == "" || !reDNI.test(DNI)){
                    $("#itDNI").css("border-color", "red");
                    return false;
                } else{
                    $("#itDNI").css("border-color", "green");
                    $("#itDireccion").removeAttr("disabled");
                    $("#itDireccion").focus();

                    if(direccion == "" || reDireccion.test(direccion)){
                        $("#itDireccion").css("border-color", "red");
                        return false;
                    } else{
                        $("#itDireccion").css("border-color", "green");
                        $("#itTelefono").removeAttr("disabled");
                        $("#itTelefono").focus();

                        if(telefono == "" || reTelefono.test(telefono)){
                            $("#itTelefono").css("border-color", "red");
                            return false;
                        } else{
                            $("#itTelefono").css("border-color", "green");
                            $("#itCorreo").removeAttr("disabled");
                            $("#itCorreo").focus();

                            if(correo == "" || reCorreo.test(correo)){
                                $("#itCorreo").css("border-color", "red");
                                return false;
                            } else{
                                $("#itCorreo").css("border-color", "green");
                            }
                        }
                    }
                }
            }
        }
    });
});


/*** MOSTRAR SERVICIOS ***/

var respuesta;
let servicios=
    $.ajax({
        url: 'data.json',
        success: function(respuesta) {
            var idServicio = $("#servicio");
            $.each(respuesta.Servicios, function(index, elemento){
                idServicio.append(
                    '<div class="servicio">' +
                        '<img src=' +elemento.ImgServicio+ '>'+
                        '<h3>' +elemento.Servicio + '</h3>' +
                        '<p>' +elemento.Descripcion + '</p>' +
                    '</div>'
                );
            });
        },
        error: function() {
            console.log("No se ha podido obtener la información");
        },
        timeout: '5000'
    });


$(function () {
    //Animacion div Servicios
    $(window).scroll(function () {
        if($(window).scrollTop() >= 750 || $(window).scrollTop() <= 900){
            $(".servicios").slideDown("slow");
        }
    });

    //Boton ScrollTop
    $("#subir").click( function(){
        $("html").animate( {scrollTop: 0}, 3000)
    });
});



/*** Mostrar Testimonios ***/
let arrTestimonios=[]
let fTestimonios=$.ajax({
    url: "data.json",
    timeout: '5000',
    success: function (response) {
        $.each(response.Reseñas, function (index, el) {
            const article=$('<div>').attr("class", "testimonio");
            const img=$('<img>').attr('src',el.ImgCliente);
            const name=$('<h2>').text(el.NomCliente);
            const text=$('<p>').text(el.Comentario);
            const date=$('<p>').text(el.Fecha).attr('style','text-align:center');
            let art= $(article)
            .append(img)
            .append(name)
            .append(date)
            .append(text);
            arrTestimonios.push(article);
        });
        
        function testimonioAleatorio(){
            let randomTestimonios=[];

            while (randomTestimonios.length < 3){
                var numeroAleatorio = Math.floor( Math.random() * (arrTestimonios.length));
                var existe = false;

                for (var i=0; i<randomTestimonios.length; i++){
                    if (randomTestimonios[i] == numeroAleatorio){
                        existe = true;
                        break;
                    }
                }
                if (!existe){
                    randomTestimonios[randomTestimonios.length] = numeroAleatorio;
                }
            }

            for (let i = 0; i < randomTestimonios.length; i++) {
                $('#testimonio').append(arrTestimonios[randomTestimonios[i]]);
            }
        }
        testimonioAleatorio();
        window.setInterval(
            function(){
                $(".testimonio").remove();
                testimonioAleatorio();                
            }, 5000);
        
    },
    error: function() {
        console.error("No se ha podido obtener la información");
    }
});