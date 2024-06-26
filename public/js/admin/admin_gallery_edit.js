window.onload = async () => {
    const postId = localStorage.getItem('postId');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://18.231.252.59/api/post/find/${postId}`, {
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

        
        document.getElementById('nombre').value = postData.post.title || '';
        document.getElementById('descripcion').value = postData.post.description || '';
        document.getElementById('dueno').value = postData.post.owner || '';

    } catch (error) {
        console.error('Error al obtener los datos del post:', error);
    }
};

document.getElementById('editarPostForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const postId = localStorage.getItem('postId');
    const token = localStorage.getItem('token');
    const formData = new FormData(document.getElementById('editarPostForm'));

    const updatedData = {
        title: formData.get('nombre'),
        description: formData.get('descripcion'),
        owner: formData.get('dueno')
    };


    console.log(updatedData);
    const options = {
        method: 'POST', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(updatedData), 
    };

    try {
        const response = await fetch(`http://18.231.252.59/api/post/update/${postId}`, options);
        const responseJson = await response.json();

        if (responseJson.status === 'Success') {
            Swal.fire('Success', responseJson.message, 'success').then(() => {
                localStorage.setItem('postId', postId);
                window.location.href = `/admin_antes?postId=${postId}`;
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
