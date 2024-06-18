  

    document.querySelector('#btn-upload').addEventListener('click', async (event) => {
        event.preventDefault();

        const imageFile_2 = document.getElementById('image2').files[0];
        const token = localStorage.getItem('token');

        

        const options = {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json; charset=utf-8',
                },
            body: {id: localStorage.getItem('postId')},
            File: imageFile_2
        };
    

        try {
            const response = await fetch('http://18.231.252.59/api/post/updateimage2', options);
            const responseJson = await response.json();

            if (response.ok) {
                Swal.fire('Success', responseJson.message, 'success').then(() => {
                    window.location.href = '/admin_galeria_fotos';
                });
            } else {
                Swal.fire('Error', responseJson.message, 'error');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
        }
    });

