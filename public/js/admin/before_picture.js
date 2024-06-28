// Definir la función para manejar el evento de click
const handleUpload = async (event) => {
    event.preventDefault(); 
    const postId = localStorage.getItem('postId');
    const imageFile = document.getElementById('image1').files[0]; 
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

    try {
        const response = await fetch('http://18.231.252.59/api/post/updateimage1', options);
        const responseJson = await response.json();

        if (responseJson.status === 'Success') {
            console.log('Respuesta exitosa:', responseJson); 
            Swal.fire('Success', responseJson.message, 'success').then(() => {
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
};


document.querySelector('#btn-upload').addEventListener('click', handleUpload);
document.querySelector('#btn_guardar_cambios').addEventListener('click', handleUpload);
const btnsEditar = document.querySelectorAll('.boton_editar');
btnsEditar.forEach(btn => {
    btn.addEventListener('click', handleUpload);
});
