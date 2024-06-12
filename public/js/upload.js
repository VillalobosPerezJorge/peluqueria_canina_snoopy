document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imagesInput = document.getElementById('images');
    const images = imagesInput.files; // Obtener los archivos del input múltiple


    const token = localStorage.getItem('token');
    const owner = ""; // El campo `owner` es opcional


    console.log(images)
    try {
        const response = await fetch('http://18.231.252.59/api/post/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': token
            },
            body: {title, description, owner, images}
        });

        const responseJson = await response.json();

        if (response.ok) {
            Swal.fire('Success', responseJson.message, 'success');
        } else {
            Swal.fire('Error', responseJson.message, 'error');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
});



