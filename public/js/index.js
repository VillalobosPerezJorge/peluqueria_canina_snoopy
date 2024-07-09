document.addEventListener('DOMContentLoaded', async () => {
    const carouselInner = document.querySelector('.carousel-inner');
    // const carouselItems = document.querySelectorAll('.carousel-item');
    const hidden_btns = document.getElementsByClassName('hidden_btn')
    const carouselIndicators = document.querySelector('.carousel-indicators');
    const carouselPrevButton = document.querySelector('.carousel-control-prev');
    const carouselNextButton = document.querySelector('.carousel-control-next');
    const apiUrl = 'http://angelespeluditos.cl:3000/api/banner/list';
    const defaultImageUrl = '/public/images/perro1.jpg'; // Ruta de la imagen por defecto

    

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        let banners = [];
        let indicators = [];

        if (data.status === 'Success' && data.banners && data.banners.banners.length > 0) {
            data.banners.banners.forEach((banner, index) => {

                // limitar la cantidad de post del banner a 5
                if(index >= 0 && index < 5){

                    let bannerString = index == 0 ? `<div class="carousel-item active">
                        <img src="http://angelespeluditos.cl:3000/api/banner/showimage/${banner._id}" class="d-block w-100" alt="${banner.title}" id="carousel_${index + 1}">
                    </div>` : `<div class="carousel-item">
                        <img src="http://angelespeluditos.cl:3000/api/banner/showimage/${banner._id}" class="d-block w-100" alt="${banner.title}" id="carousel_${index + 1}">
                    </div>`
    
                    let indicatorString = index == 0 ? `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}"
                    aria-current="true" aria-label="Slide ${index + 1}" class="active"></button>` : `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}"
                    aria-current="true" aria-label="Slide ${index + 1}"></button>`
    
                    banners.push(bannerString);
                    indicators.push(indicatorString);

                }
                
            });

            carouselInner.innerHTML = banners.join('');
            carouselIndicators.innerHTML = indicators.join('');


            // mostrar los botones de anterior y siguiente del banner
            for(let i = 0; i < hidden_btns.length; i++ ){
                if(hidden_btns[i].name == 'prev'){
                    hidden_btns[i].setAttribute('class', 'carousel-control-prev');
                }
                
                if(hidden_btns[i].name == 'next'){
                    hidden_btns[i].setAttribute('class', 'carousel-control-next');
                }
            }
            

       
            const carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'), {
                interval: 5000, 
                wrap: data.banners.banners.length > 1, 
            });

          
            if (data.banners.banners.length === 1) {
                carouselPrevButton.style.display = 'none';
                carouselNextButton.style.display = 'none';
            }

        } else {
     
            console.error('No se encontraron banners activos o la estructura de datos es incorrecta.');
        }
    } catch (error) {
        console.error('Error al obtener los banners:', error);
    }

    insertarPerroDelMes();
});

const insertarPerroDelMes = async () => {
    const perroDelMesDiv = document.querySelector('#perro-del-mes');
    const perroDelMesNombre = document.querySelector('#nombre-perro');
    const perroDelMesDatos = document.querySelector('#datos-perro');

    try {
        const response = await fetch('http://angelespeluditos.cl:3000/api/post/findSelected');
        const responseJson = await response.json();

        const postId = responseJson.post._id;
        const postTitle = responseJson.post.title;
        const postDescription = responseJson.post.description;
        perroDelMesDiv.innerHTML = `<img class="img-fluid w-100" src="http://angelespeluditos.cl:3000/api/post/showImage/${postId}/2" alt="imagen del perro del mes" style="border-radius: 15px 50px; box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.5)">`
        perroDelMesNombre.innerHTML = `<h2 class="subtitle">¡Felicidades, ${postTitle}!</h2>`
        perroDelMesDatos.innerHTML = `<h4>¿Qué sabemos del Ángel Peludito de este mes?</h4><br><p>${postDescription}</p>`
    } catch (error) {
        console.error('Error al intentar buscar el perro del mes: ', error);
    }
}
