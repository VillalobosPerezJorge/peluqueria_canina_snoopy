document.addEventListener('DOMContentLoaded', async () => {
    const userName = localStorage.getItem('name');
    const userSurname = localStorage.getItem('surname');
    const userEmail = localStorage.getItem('email');
    const userPhone = localStorage.getItem('phone');
    const userAddress = localStorage.getItem('address');
    let userRole = localStorage.getItem('role');

    if (userRole === 'role-admin') {
        userRole = 'Administrador';
    } else {
        userRole = 'Cliente';
    }

    try {
        // Actualiza los campos en el formulario
        document.getElementById('username').value = `${userName} ${userSurname}`;
        document.getElementById('email').value = userEmail;
        document.getElementById('telephone').value = userPhone;
        document.getElementById('address').value = userAddress;
        document.getElementById('role').value = userRole;

        // Crear el botón de administrador si el usuario es administrador
        if (userRole === 'Administrador') {
            const btn_admin = document.getElementById('btn_admin');
            btn_admin.innerHTML = `<a href='/admin'><button type="button" class="btn btn-success btn-lg">Volver al Panel de Administrador</button></a>`;
        }
    } catch (error) {
        console.error('Error al actualizar los datos del usuario o crear el botón:', error);
    }
});
