document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const token = localStorage.getItem('token');

    const datos = {
        title: title,
        description: description,
    };

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json; charset=utf-8',
            'Authorization': token
        },
        body: JSON.stringify(datos)
    };

    try {
        const response = await fetch('http://angelespeluditos.cl:3000/api/banner/register', options);
        const responseJson = await response.json();

        console.log('Response JSON:', responseJson); // Depuración de la respuesta

        if (response.ok) {
            // Verifica si responseJson contiene banner y banner._id
            if (responseJson.banner && responseJson.banner._id) {
                // Guarda el ID del banner en localStorage
                localStorage.setItem('bannerId', responseJson.banner._id);

                Swal.fire('Success', responseJson.message, 'success');
                window.location.href = `/admin_banner_imagen?bannerId=${responseJson.banner._id}`;
            } else {
                console.error('La respuesta no contiene banner._id:', responseJson);
                Swal.fire('Error', 'La respuesta no contiene el ID del banner', 'error');
            }
        } else {
            Swal.fire('Error', responseJson.message, 'error');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
});
