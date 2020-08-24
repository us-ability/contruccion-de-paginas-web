try{
    document.querySelector("header button").onclick = function () {
        document.body.classList.toggle("menu-open")
    }
} catch(e){}

// Este es un evento para que, cuando nos desplacemos con el scroll
// se ponga fija la barra de navegación en función de si está por
// debajo del banner o por encima de él.
window.onscroll = function (e) {
    var banner = document.querySelector(".banner") ?
        document.querySelector(".banner") :
        document.querySelector("article header");
    var header = document.querySelector("body > header");

    if (window.scrollY > banner.offsetHeight - 32) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
}

// Evento para ocultar la barra lateral cuando se encuentra visible y se 
// pulsa fuera de la misma.
window.onclick = function (e) {
    if(this.document.body.classList.contains("menu-open")){
        var trg = e.target;
        while(trg && trg.tagName != "BODY"){
            if(trg.classList.contains('menu-toggle') ||
              (trg.tagName == 'UL' && trg.parentElement.tagName == 'NAV')){
                return;
            }
            trg = trg.parentElement 
        }
        this.document.body.classList.remove("menu-open");
    }
}

window.onload = function(){
    setTimeout(function(){
      document.querySelector(".loader-container").style.display = "none";
    },1000);
}

function showingForm(frm){
    // Por defecto lo que se desea es mostrar el formulario
    var act = 'add';

    // Si el elemento BODY tiene está mostrando el formulario, 
    // la acción será cerrar.
    if(document.body.classList.contains('showing-' + frm)){
        act = 'remove';
    }

    // Reestablecemos las clases del elemento BODY y mostramos o 
    // cerramos el formulario solictado.
    document.body.setAttribute('class', 'login');
    if(act == "add"){
        document.body.classList.add('showing-' + frm);
    } else {
        document.body.classList.remove('showing-' + frm);
    }
}
