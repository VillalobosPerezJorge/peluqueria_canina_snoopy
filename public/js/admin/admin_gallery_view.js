
window.onload = async () => {
    // obtener pagina actual
    const windowURL = window.location.href;
    const windowURLSplitted = windowURL.split('/');
    const windowPage = Number.parseInt(windowURLSplitted[windowURLSplitted.length - 1]);

    cargarPosts();
}

const cargarPosts = async (windowPage) => {
    const galeria = document.querySelector('#galeria');
    const loader = document.querySelector('#loader');
    const paginationDiv = document.querySelector('#pagination');
  try {
      const response = await fetch(`http://18.231.252.59/api/post/listPosts/${windowPage}`);
      const responseJson = await response.json();
      const data = responseJson.data;
      const posts = data.posts;

      let dataPage = parseInt(data.page);
      const totalPages = parseInt(data.totalPages);

      const elementosHTML = posts.map(post => {
        if(post.selected == true) {
          return `<!-- Galería-->
            <div class="card selected_card d-flex flex-column gap-1 justify-content-center card-responsive">
              <img-comparison-slider style="width: 95%; max-height: 360px; margin-top: 10px; border-radius: 15px;">
                <img slot="first" src="http://18.231.252.59/api/post/showImage/${post._id}/1" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
                <img slot="second" src="http://18.231.252.59/api/post/showImage/${post._id}/2" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
              </img-comparison-slider>
              <div class="card-body text-center">
                <p class="card-text my-1 fst-italic fs-6">(Antes / Después)</p>
                <p class="subtitle card-text fw-bold fs-3 my-3">${post.title}</p>
                <p class="description card-text fs-4 my-3">${post.description}</p>
              </div>

              <div class="buttons w-100 d-flex flex-row justify-content-around mt-2 mb-4">
              <button type="button" value='${post._id}' class="boton_editar btn btn-warning fs-5 fw-bold">Editar</button>
                <button type="button" value='${post._id}' class="boton_seleccionar btn btn-secondary fs-5 fw-bold disabled">Seleccionado como perro del mes</button>
                <button type="button" value='${post._id}' class="boton_eliminar btn btn-danger fs-5 fw-bold">Inhabilitar</button>
              </div>
            </div>`
        }

        return `<!-- Galería-->
          <div class="card d-flex flex-column gap-1 justify-content-center card-responsive">
            <img-comparison-slider style="width: 95%; max-height: 360px; margin-top: 10px; border-radius: 15px;">
              <img slot="first" src="http://18.231.252.59/api/post/showImage/${post._id}/1" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
              <img slot="second" src="http://18.231.252.59/api/post/showImage/${post._id}/2" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
            </img-comparison-slider>
            <div class="card-body text-center">
              <p class="card-text my-1 fst-italic fs-6">(Antes / Después)</p>
              <p class="subtitle card-text fw-bold fs-3 my-3">${post.title}</p>
              <p class="description card-text fs-4 my-3">${post.description}</p>
            </div>

            <div class="buttons w-100 d-flex flex-row justify-content-around mt-2 mb-4">
            <button type="button" value='${post._id}' class="boton_editar btn btn-warning fs-5 fw-bold">Editar</button>
              <button type="button" value='${post._id}' class="boton_seleccionar btn btn-success fs-5 fw-bold">Perro del mes</button>
              <button type="button" value='${post._id}' class="boton_eliminar btn btn-danger fs-5 fw-bold">Inhabilitar</button>
            </div>
          </div>`
      }).join('');

    let pagesArray = [];


    for(let i = dataPage - 1; i <= dataPage + 1; i++){
      if(i !== 0 && i <= totalPages){
        pagesArray.push(`<li class="page-item"><a class="page-link ${dataPage == i ? 'active' : ''}" href="/galeria/${i}">${i}</a></li>`);
      } else if(i == 1) {
        pagesArray = [`<li class="page-item"><a class="page-link ${dataPage == 1 ? 'active' : ''}" href="/galeria/1">1</a></li>`]
      }
    }

    pagesArray.unshift(`
  <li class="page-item">
    <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}"  href="/galeria/1" aria-label="Previous">
      <span aria-hidden="true">Inicio</span>
    </a>
  </li>
  <li class="page-item">
    <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}" href="/galeria/${dataPage - 1}" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>`);

  pagesArray.push(`
  <li class="page-item">
    <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/galeria/${dataPage + 1}" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
  <li class="page-item">
    <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/galeria/${totalPages}" aria-label="Next">
      <span aria-hidden="true">última</span>
    </a>
  </li>`);

    const elementoPages = pagesArray.join('');

    const pagination = `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        
        ${elementoPages}
        
      </ul>
    </nav>`


    
    setTimeout(() => {
        if(loader) loader.setAttribute('style', 'display:none');
        galeria.innerHTML = elementosHTML;
        paginationDiv.innerHTML = pagination;

        const btns_eliminar = document.querySelectorAll('.boton_eliminar');
        const btns_seleccionar = document.querySelectorAll('.boton_seleccionar');
        const btns_editar = document.querySelectorAll('.boton_editar');
    
        console.log(btns_editar);
        btns_eliminar.forEach(btn => {
          // Acción del boton eliminar
          btn.addEventListener('click', async e => {
            const postId = e.target.value;
            const token = localStorage.getItem('token');

            e.preventDefault();

            try {
              const response = await fetch(`http://18.231.252.59/api/post/changeStatus/${postId}`,
                {
                  method: 'Post',
                  mode: 'cors',
                  headers: {
                    'Authorization': token
                  }
                }
              );
              const responseJson = await response.json();

              if(responseJson.status === 'Success'){
                Swal.fire('Success', responseJson.message, 'success');
                cargarPosts();
              }else{
                Swal.fire('Error', responseJson.message, 'error');
              }
            } catch (error) {
              Swal.fire('Error', 'Error al ejecutar la funcion', 'error');
            }

          })
        });

        btns_seleccionar.forEach(btn => {
          // Acción del boton seleccionar perro del mes
          btn.addEventListener('click', async e => {
            const postId = e.target.value;
            const token = localStorage.getItem('token');

            e.preventDefault();

            try {
              const response = await fetch(`http://18.231.252.59/api/post/changeSelected/${postId}`,
                {
                  method: 'PATCH',
                  mode: 'cors',
                  headers: {
                    'Authorization': token
                  }
                }
              );
              const responseJson = await response.json();

              if(responseJson.status === 'Success'){
                Swal.fire('Success', responseJson.message, 'success');
                cargarPosts();
              }else{
                Swal.fire('Error', responseJson.message, 'error');
              }
            } catch (error) {
              Swal.fire('Error', 'Error al ejecutar la funcion', 'error');
            }

          })
        });

        btns_editar.forEach(btn => {
          // Acción del boton editar
          btn.addEventListener('click', async e => {
            const postId = e.target.value;
            const token = localStorage.getItem('token');

            e.preventDefault();
              // Guarda el ID del post en localStorage
            localStorage.setItem('postId', postId);
           try
           {
            
            window.location.href = `/admin_actualizar_galeria?postId=${postId}`; 

            } catch (error) {
              Swal.fire('Error', 'Error al ejecutar la funcion', 'error');
            }

          })
        });



    }, 0);
    
   
      
  } catch (error) {
      console.log(error);
  }
}