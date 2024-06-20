document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault();
    const postId = localStorage.getItem('postId');

    const imageFile = document.getElementById('image2').files[0];
    const token = localStorage.getItem('token');


    const formData = new FormData();
    formData.append('id', postId);
    formData.append('image', imageFile);

    const options = {
        method: 'POST', 
        mode: 'cors', 
        headers: {
            'Authorization': token
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
                

             // Muestra el postId en consola
            console.log('ID del post en localStorage:', postId);
            Swal.fire('Success', responseJson.message, 'success');

            localStorage.removeItem('postId');

            window.location.href = `/admin?postId=${postId}`;
            });
        } else {
            Swal.fire('Error', responseJson.message, 'error');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
});