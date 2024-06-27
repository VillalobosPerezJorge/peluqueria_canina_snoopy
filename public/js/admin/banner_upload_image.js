document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault(); 
    const bannerId = localStorage.getItem('bannerId');
    const imageFile = document.getElementById('banner_image').files[0]; 
    const token = localStorage.getItem('token'); 

    const formData = new FormData();
    formData.append('id', bannerId)
    formData.append('image', imageFile);

    const options = {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Authorization': token
        },
        body: formData,
    };

    console.log(imageFile)
    console.log(bannerId)
    console.log(formData)
    try {
        // Incluye el postId en la URL
        const response = await fetch('http://18.231.252.59/api/banner/updateimage', options);
        const responseJson = await response.json();

        if (responseJson.status === 'Success') {
            console.log('Respuesta exitosa:', responseJson); 
            Swal.fire('Success', responseJson.message, 'success').then(() => {
                localStorage.removeItem('bannerId');
                window.location.href = `/admin?bannerId=${bannerId}`;
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
