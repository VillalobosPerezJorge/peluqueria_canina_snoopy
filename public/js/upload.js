document.querySelector('#btn-upload').addEventListener('click', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
   


    const token = localStorage.getItem('token');
    const owner = ""; // El campo `owner` es opcional

   const datos = {
    title: title,
    description: description,
    owner: owner,
   }

    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-type': 'application/json; charset=utf-8',
        'Authorization': token
        },
        body: JSON.stringify(datos)
    }
    

    try {
        const response = await fetch('http://18.231.252.59/api/post/register', options)
        const responseJson = await response.json();

        if (response.ok) {
             // Guarda el ID del post en localStorage
             localStorage.setItem('postId', responseJson.post._id);

             // Muestra el postId en consola
            console.log('ID del post en localStorage:', responseJson.post._id);
            Swal.fire('Success', responseJson.message, 'success');
            window.location.href = `/admin_antes?postId=${responseJson.post._id}`;
        } else {
            Swal.fire('Error', responseJson.message, 'error');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
});



