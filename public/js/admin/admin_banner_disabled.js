const cargarBanners = async () => {
  const galeria = document.querySelector('#galeria');
  const loader = document.querySelector('#loader');
  const paginationDiv = document.querySelector('#pagination');
  const token = localStorage.getItem('token');

  try {
      const response = await fetch('http://18.231.252.59/api/banner/listDisabled', {
          method: 'GET',
          mode: 'cors',
          headers: {
              'Authorization': token
          }
      });

      const responseJson = await response.json();
      if (responseJson.status !== "Success") {
          throw new Error("Error al obtener la lista de banners inactivos");
      }

      const data = responseJson.banners;
      const banners = data.banners; // Lista de banners inactivos

      let elementosHTML = banners.map(banner => `
          <div class="card d-flex flex-column gap-1 justify-content-center card-responsive">
              <img src="http://18.231.252.59/api/banner/showimage/${banner._id}" style="width: 100%; aspect-ratio: 3/2; object-fit: cover; border-radius: 15px;">
              <div class="card-body text-center">
                  <p class="title card-text fw-bold fs-3 my-3">${banner.title}</p>
                  <p class="description card-text fs-4 my-3">${banner.description}</p>
              </div>
              <div class="buttons w-100 d-flex flex-row justify-content-around mt-2 mb-4">
                  <button type="button" value="${banner._id}" class="boton_habilitar btn btn-info fs-5 fw-bold">Habilitar</button>
                  <a href="#"><button class="boton_editar btn btn-warning fs-5 fw-bold">Editar</button></a>
                  <button type="button" value="${banner._id}" class="boton_eliminar btn btn-danger fs-5 fw-bold">Eliminar</button>
              </div>
          </div>`).join('');

      let pagesArray = [];

      for(let i = 1; i <= data.totalPages; i++){
          pagesArray.push(`<li class="page-item"><a class="page-link ${data.page === i ? 'active' : ''}" href="#">${i}</a></li>`);
      }

      const pagination = `
          <nav aria-label="Page navigation">
              <ul class="pagination">
                  <li class="page-item">
                      <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                      </a>
                  </li>
                  ${pagesArray.join('')}
                  <li class="page-item">
                      <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                      </a>
                  </li>
              </ul>
          </nav>`;

      setTimeout(() => {
          if (loader) loader.setAttribute('style', 'display:none');
          galeria.innerHTML = elementosHTML;
          paginationDiv.innerHTML = pagination;

          const btns_eliminar = document.querySelectorAll('.boton_eliminar');
          const btns_habilitar = document.querySelectorAll('.boton_habilitar');

          btns_eliminar.forEach(btn => {
              btn.addEventListener('click', async e => {
                  const bannerId = e.target.value;
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

                      if (responseJson.status === 'Success') {
                          Swal.fire('Success', responseJson.message, 'success');
                          cargarBanners(); // Actualiza la galería después de eliminar
                      } else {
                          Swal.fire('Error', responseJson.message, 'error');
                      }
                  } catch (error) {
                      Swal.fire('Error', 'Error al ejecutar la función', 'error');
                  }
              });
          });

          btns_habilitar.forEach(btn => {
              btn.addEventListener('click', async e => {
                  const bannerId = e.target.value;
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

                      if (responseJson.status === 'Success') {
                          Swal.fire('Success', responseJson.message, 'success');
                          cargarBanners(); // Actualiza la galería después de habilitar/deshabilitar
                      } else {
                          Swal.fire('Error', responseJson.message, 'error');
                      }
                  } catch (error) {
                      Swal.fire('Error', 'Error al ejecutar la función', 'error');
                  }
              });
          });
      }, 0);

  } catch (error) {
      console.error(error);
  }
};

window.onload = () => {
  cargarBanners();
};
