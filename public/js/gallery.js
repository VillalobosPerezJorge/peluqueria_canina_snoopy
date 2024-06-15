
window.onload = async () => {
    const galeria = document.querySelector('#galeria');
    const loader = document.querySelector('#loader');
    const paginationDiv = document.querySelector('#pagination');

    // obtener pagina actual
    const windowURL = window.location.href;
    const windowURLSplitted = windowURL.split('/');
    const windowPage = Number.parseInt(windowURLSplitted[windowURLSplitted.length - 1]);


    try {
        const response = await fetch(`http://18.231.252.59/api/post/listPosts/${windowPage}`);
        const responseJson = await response.json();
        const data = responseJson.data;
        const posts = data.posts;

        let dataPage = parseInt(data.page);
        const totalPages = parseInt(data.totalPages);

        const elementosHTML = posts.map(post => `<!-- Galería-->
      <div class="card d-flex flex-column gap-1 justify-content-center card-responsive">
        <img-comparison-slider style="width: 95%; max-height: 360px; margin-top: 10px; border-radius: 15px;">
          <img slot="first" src="http://18.231.252.59/api/post/showImage/${post._id}/1" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
          <img slot="second" src="http://18.231.252.59/api/post/showImage/${post._id}/2" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
        </img-comparison-slider>
        <div class="card-body text-center">
          <p class="card-text fs-5 my-1">(Antes / Después)</p>
          <p class="title card-text fw-bold fs-4 my-3">${post.title}</p>
        </div>
      </div>`).join('');

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
          loader.setAttribute('style', 'display:none');
          galeria.innerHTML = elementosHTML;
          paginationDiv.innerHTML = pagination;
      }, 2000);
        
    } catch (error) {
        console.log(error);
    }
}