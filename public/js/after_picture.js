document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault();
    const postId = localStorage.getItem('postId');

    const imageFile = document.getElementById('image2').files[0];
    const token = localStorage.getItem('token');


    const formData = new FormData();
    formData.append('id', postId);
    formData.append('file', imageFile);

    const options = {
        method: 'PATCH', 
        mode: 'cors', 
        headers: {
            'Authorization': token,
            
        },
        body: formData, 
    };

    console.log(imageFile);
    console.log(token);
    console.log(postId);

    try {
        
        const response = await fetch('http://18.231.252.59/api/post/updateimage2', options);
        const responseJson = await response.json();

        if (response.ok) {
            Swal.fire('Success', responseJson.message, 'success').then(() => {
                 // Guarda el ID del post en localStorage
             localStorage.setItem('postId', responseJson.post._id);

             // Muestra el postId en consola
            console.log('ID del post en localStorage:', responseJson.post._id);
            Swal.fire('Success', responseJson.message, 'success');
            window.location.href = `/admin?postId=${responseJson.post._id}`;
            });
        } else {
            Swal.fire('Error', responseJson.message, 'error');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
});