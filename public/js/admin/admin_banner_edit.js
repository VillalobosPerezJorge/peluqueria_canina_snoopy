window.onload = async () => {
    const bannerId = localStorage.getItem('bannerId');
    const token = localStorage.getItem('token');
    console.log(token);
    console.log(bannerId);

    try {
        const response = await fetch(`http://localhost:3000/api/banner/find/${bannerId}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }

        const postData = await response.json();
        
        
        const bannerData = postData.banner;
        document.getElementById('titulo').value = bannerData.title || '';
        document.getElementById('descripcion').value = bannerData.description || '';
        

    } catch (error) {
        console.error('Error al obtener los datos del post:', error);
    }
};

document.getElementById('editarBannerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const bannerId = localStorage.getItem('bannerId');
    const token = localStorage.getItem('token');
    const formData = new FormData(document.getElementById('editarBannerForm'));

    const updatedData = {
        title: formData.get('titulo'),
        description: formData.get('descripcion'),
    };


    const options = {
        method: 'PATCH', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(updatedData), 
    };

    try {
        const response = await fetch(`http://localhost:3000/api/banner/update/${bannerId}`, options);
        const responseJson = await response.json();

        if (responseJson.status === 'Success') {
            Swal.fire('Success', responseJson.message, 'success').then(() => {
                localStorage.setItem('bannerId', bannerId);
                window.location.href = `/admin_banner_imagen?postId=${bannerId}`;
            });
        } else {
            console.error('Error en la respuesta de la API:', responseJson.message);
            Swal.fire('Error', responseJson.message, 'error');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
});
