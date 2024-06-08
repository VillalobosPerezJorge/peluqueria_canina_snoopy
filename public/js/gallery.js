
window.onload = async () => {
    const galeria = document.querySelector('#galeria');
    const loader = document.querySelector('#loader');

    try {
        const response = await fetch('http://18.231.252.59/api/post/list');
        const data = await response.json();
        const posts = data.posts;

        const elementosHTML = posts.map(post => `<!-- Galería-->
      <div class="card d-flex flex-column gap-1 justify-content-center card-responsive" style="width: 45%; background-color: #d9119349; border-radius: 15px;">
        <img-comparison-slider style="width: 95%; max-height: 360px; margin-top: 10px; border-radius: 15px;">
          <img slot="first" src="http://18.231.252.59/api/post/showImage/${post._id}/1" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
          <img slot="second" src="http://18.231.252.59/api/post/showImage/${post._id}/2" style="width: 100%; aspect-ratio: 3/2; object-fit: cover" />
        </img-comparison-slider>
        <div class="card-body text-center">
          <p class="card-text fs-5 my-1">(Antes / Después)</p>
          <p class="card-text fw-bold fs-4 my-3">${post.title}</p>
        </div>
      </div>`);

      const elementoHTMLEntero = elementosHTML.join('');

      
      setTimeout(() => {
          loader.setAttribute('style', 'display:none');
          galeria.innerHTML = elementoHTMLEntero;
      }, 2000);
        
    } catch (error) {
        console.log(error);
    }
}