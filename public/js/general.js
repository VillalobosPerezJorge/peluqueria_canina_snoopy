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

const accion_botones_navbar = () => {

    const btn_iniciar = document.querySelector('#btn_iniciar');
    const btn_registrarse = document.querySelector('#btn_registrarse');

    if(btn_iniciar && btn_registrarse){
        btn_iniciar.addEventListener('click', () => {
            window.location.href = '/iniciar_sesion';
        });

        btn_registrarse.addEventListener('click', () => {
            window.location.href = '/registrarse';
        });
    }

}

const accion_botones_navbar_logged = () => {
    const btn_perfil = document.getElementById('btn-perfil');
        const btn_panel = document.getElementById('btn-panel');
        const btn_logout = document.getElementById('btn-logout');

        btn_logout.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/';
        })

        btn_perfil.addEventListener('click', () => {
            window.location.href = '/mi_perfil';
        })
    
        if(btn_panel) {
            btn_panel.addEventListener('click', () => {
              window.location.href = '/admin';
            });
        }
}

marcarPaginaActual();

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.isLoggedIn){
        setTimeout(accion_botones_navbar_logged, 200);
    }else{
        setTimeout(accion_botones_navbar, 200);
    }
});