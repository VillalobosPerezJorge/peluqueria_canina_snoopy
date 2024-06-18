document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault(); 
    const postId = localStorage.getItem('postId');
    const imageFile = document.getElementById('image1').files[0]; 
    const token = localStorage.getItem('token'); 



    const formData = new FormData();
    formData.append('id', postId);
    formData.append('image', imageFile);

    const options = {
        method: 'PATCH', 
        mode: 'cors', 
        body: formData, 
    };

    try {
        
        const response = await fetch('http://18.231.252.59/api/post/updateimage1', options);
        const responseJson = await response.json(); 

        if (responseJson.status === 'Success') {
            console.log('Respuesta exitosa:', responseJson); 
            Swal.fire('Success', responseJson.message, 'success').then(() => {
                
                console.log('ID del post en localStorage:', postId); 
                window.location.href = `/admin_despues?postId=${postId}`; 
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
