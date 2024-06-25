window.onload = async () => {
    // Obtener página actual
    const windowURL = window.location.href;
    const windowURLSplitted = windowURL.split('/');
    const windowPage = Number.parseInt(windowURLSplitted[windowURLSplitted.length - 1]);

    cargarBannersActivos(windowPage);
};

const cargarBannersActivos = async (windowPage) => {
    const galeria = document.querySelector('#galeria');
    const loader = document.querySelector('#loader');
    const paginationDiv = document.querySelector('#pagination');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://18.231.252.59/api/banner/list/${windowPage}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': token
            }
        });

        const responseJson = await response.json();
        const data = responseJson.banners;
        const banners = data.banners;

        let dataPage = parseInt(data.page);
        const totalPages = parseInt(data.totalPages);

        const elementosHTML = banners.map(banner => `<!-- Galería-->
            <div class="card d-flex flex-column gap-1 justify-content-center card-responsive">
                <img src="http://18.231.252.59/api/banner/showImage/${banner._id}" style="width: 95%; max-height: 360px; margin-top: 10px; border-radius: 15px; object-fit: cover;" />
                <div class="card-body text-center">
                    <p class="title card-text fw-bold fs-3 my-3">${banner.title}</p>
                    <p class="description card-text fs-4 my-3">${banner.description}</p>
                </div>
                <div class="buttons w-100 d-flex flex-row justify-content-around mt-2 mb-4">
                    <button type="button" value='${banner._id}' class="boton_habilitar btn btn-info fs-5 fw-bold">Deshabilitar</button>
                    <a href="#"><button class="boton_editar btn btn-warning fs-5 fw-bold">Editar</button></a>
                    <button type="button" value='${banner._id}' class="boton_eliminar btn btn-danger fs-5 fw-bold">Eliminar</button>
                </div>
            </div>`).join('');

        let pagesArray = [];

        for(let i = dataPage - 1; i <= dataPage + 1; i++){
            if(i !== 0 && i <= totalPages){
                pagesArray.push(`<li class="page-item"><a class="page-link ${dataPage == i ? 'active' : ''}" href="/galeria-activos/${i}">${i}</a></li>`);
            } else if(i == 1) {
                pagesArray = [`<li class="page-item"><a class="page-link ${dataPage == 1 ? 'active' : ''}" href="/galeria-activos/1">1</a></li>`]
            }
        }

        pagesArray.unshift(`
            <li class="page-item">
                <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}" href="/galeria-activos/1" aria-label="Previous">
                    <span aria-hidden="true">Inicio</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}" href="/galeria-activos/${dataPage - 1}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`);

        pagesArray.push(`
            <li class="page-item">
                <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/galeria-activos/${dataPage + 1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/galeria-activos/${totalPages}" aria-label="Next">
                    <span aria-hidden="true">última</span>
                </a>
            </li>`);

        const elementoPages = pagesArray.join('');

        const pagination = `
        <nav aria-label="Page navigation">
            <ul class="pagination">
                ${elementoPages}
            </ul>
        </nav>`;

        setTimeout(() => {
            if(loader) loader.setAttribute('style', 'display:none');
            galeria.innerHTML = elementosHTML;
            paginationDiv.innerHTML = pagination;

            const btns_eliminar = document.querySelectorAll('.boton_eliminar');
            const btns_habilitar = document.querySelectorAll('.boton_habilitar');

            btns_eliminar.forEach(btn => {
                btn.addEventListener('click', async e => {
                    const bannerId = e.target.value;
                    const token = localStorage.getItem('token');

                    e.preventDefault();

                    try {
                        const response = await fetch(`http://18.231.252.59/api/banner/delete/${bannerId}`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Authorization': token
                            }
                        });
                        const responseJson = await response.json();

                        if(responseJson.status === 'Success'){
                            Swal.fire('Success', responseJson.message, 'success');
                            cargarBannersActivos(windowPage);
                        }else{
                            Swal.fire('Error', responseJson.message, 'error');
                        }
                    } catch (error) {
                        Swal.fire('Error', 'Error al ejecutar la funcion', 'error');
                    }
                });
            });

            btns_habilitar.forEach(btn => {
                btn.addEventListener('click', async e => {
                    const bannerId = e.target.value;
                    const token = localStorage.getItem('token');

                    e.preventDefault();

                    try {
                        const response = await fetch(`http://18.231.252.59/api/banner/changeStatus/${bannerId}`, {
                            method: 'PATCH',
                            mode: 'cors',
                            headers: {
                                'Authorization': token
                            }
                        });
                        const responseJson = await response.json();

                        if(responseJson.status === 'Success'){
                            Swal.fire('Success', responseJson.message, 'success');
                            cargarBannersActivos(windowPage);
                        }else{
                            Swal.fire('Error', responseJson.message, 'error');
                        }
                    } catch (error) {
                        Swal.fire('Error', 'Error al ejecutar la funcion', 'error');
                    }
                });
            });

        }, 0);
    } catch (error) {
        console.error(error);
    }
};
