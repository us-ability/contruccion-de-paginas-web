function whenKeydown(e){
    var trg = e.target
    if(e.keyCode == 13 ){
        var next = null;

        // Si el valor del campo no es válido mostramos mensaje y no 
        // continuamos
        if(!trg.validity.valid){
            trg.nextElementSibling.style.display="block";

            return false
        } else {
            trg.nextElementSibling.style.display="";
        }

        try{
            next = trg.parentElement.nextElementSibling;
            next.classList.remove("next");
            next.querySelector("input").focus(); 
        } catch(e) {}

        // Si quién pulsó aceptar es el campo email actualizamos el patrón
        // @name por el valor escrito en el campo "name"
        if(trg.id == "email"){
            var lbl = next.children[0];
            lbl.innerHTML = lbl.innerHTML.replace(
                 "@name", document.getElementById("name").value
            );

            saveData();
        }

        return false;
    }
}

function send(trg){
    // Al pulsar en enviar se crea una nueva sentencia y se oculta el
    // actual botón de enviar para evitar confusiones
    trg = trg.previousElementSibling;
    var ev = trg.value.substr(0,1).toUpperCase() + 
            trg.value.substr(1).toLowerCase();

    // Añadimos mensaje de confirmación
    var p = document.createElement("p");
    p.innerHTML = 'Mensaje enviado. Se te responderá al email adjunto';
    trg.parentElement.append(p);

    appendNewSentence(trg);
    trg.nextElementSibling.style.display = "none";
}

function appendNewSentence(trg){
    var messages = document.querySelectorAll("[name*='message-']");
    var sentences = document.querySelectorAll(".sentence");

    // Definimos el contenedor de sentencias
    var sentence = document.createElement("div")
    sentence.classList.add("sentence", "next");
    
    var aux = sentences[3].innerHTML;
    aux = aux.replace(/message-1/ig, 'message-'+(messages.length+1));
        
    sentence.innerHTML = aux;

    var item = sentences[sentences.length-1];

    var nAux = item.parentNode.insertBefore(sentence, item.nextSibling);
    nAux.querySelector("label").innerHTML = "¿Qué más deseas saber?"
    nAux.querySelector("input").removeAttribute("readonly");

    // Eliminamos el elemento porque se toma como plantilla el elemento 
    // anterior y, éste, a partir del segundo mensaje, ya contiene 
    // "mensaje enviado" 
    try{ nAux.querySelector("p").remove(); } catch(e){}

    // Lo mismo pasa con otros elementos como los DIV de respuesta
    try{ nAux.querySelector("div").remove(); } catch(e){}

    // Actualizamos el valor de next porque ahora se ha añadido un nuevo
    // elemento
    var next = trg.parentElement.nextElementSibling;
    next.classList.remove("next");
    
    // Si el ancho de la pantalla es menor a 640 píxeles, suponemos que
    // estamos en un dispositivo móvil y no aplicamos el foco para evitar
    // que aparezca el teclado virtual de manera innecesaria.
    if(window.innerWidth > 640) next.querySelector("input").focus();
    trg.setAttribute("readonly", "readonly");
}

function saveData(){
    var json = {}
    json.agree = document.getElementById("tyc").value;
    json.name = document.getElementById("name").value;
    json.email = document.getElementById("email").value;

    localStorage.setItem("universES-contact", JSON.stringify(json));
}

function toggleMaximize(){
    document.body.classList.toggle('maximized');
    
    if(document.body.classList.contains('maximized')){
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

window.onresize = function(){
    var maximized = document.body.classList.contains("maximized");
    if(!document.fullscreen && maximized){
        document.body.classList.remove('maximized');
    }
}

// Si ha contactado antes, no le pedidmos los datos.
// Se recuperan de la Local Storage
var aux = JSON.parse(localStorage.getItem("universES-contact"));
if(aux){
    // Ocultamos todos los campos ya almacenados
    var items = document.querySelectorAll(".sentence");
    for(var i = 0; i < items.length; i++){
        items[i].classList.add("next")
    }

    // Mostramos el último elemento y reemplazamos
    // el @name por el nombre del usuario
    var item = items[items.length-1];
    item.classList.remove("next");
    item.querySelector("label").innerHTML = item.querySelector("label").innerHTML.replace("@name", aux.name);

    // Ocultamos el mensaje de aviso del principio
    document.querySelector(".warning").style.display = "none"

    setTimeout(function(){
        document.getElementById("message-1").focus();
    }, 50);
}


