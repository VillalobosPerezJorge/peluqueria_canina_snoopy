const marcarPaginaActual = () => {
    const links = document.getElementsByClassName('nav-link');
    const paginaActual = window.location.href;
    const paginaSplted = paginaActual.split('/');
    const pagina = paginaSplted[3];


    const attr = document.createAttribute("class");
    attr.value = "nav-link active";

    for(let i = 0; i < links.length; i++ ){
        if(links[i].name == pagina){
            links[i].setAttributeNode(attr);
        }
    }

    
}

marcarPaginaActual();