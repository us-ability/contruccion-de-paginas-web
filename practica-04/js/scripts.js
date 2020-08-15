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