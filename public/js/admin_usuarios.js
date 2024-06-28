window.onload = async () => {
    const galeria = document.querySelector('#galeria');
    const loader = document.querySelector('#loader');
    const paginationDiv = document.querySelector('#pagination');

    // Función para obtener la lista de usuarios desde el servidor
    const obtenerListaUsuarios = async () => {
        const token = localStorage.getItem('token'); // Obtener el token del admin desde el almacenamiento local
        try {
            const response = await fetch('http://18.231.252.59/api/user/list', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            throw error; // Propaga el error para manejarlo más adelante si es necesario
        }
    };

    // Función para actualizar un usuario específico
    const actualizarUsuario = async (userId) => {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

        try {
            const response = await fetch(`http://18.231.252.59/api/user/update/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': token
                },
                body: JSON.stringify({
                    // Aquí puedes incluir los campos que deseas actualizar
                    // Ejemplo: name, surname, email, password, address, phone, subscribed, etc.
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Usuario actualizado:', data);

            // Aquí puedes implementar lógica adicional después de actualizar el usuario, como mostrar un mensaje de éxito o actualizar la lista de usuarios en la interfaz.

        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario o registrar el error en algún lugar.
        }
    };

    // Función para eliminar un usuario específico
    const eliminarUsuario = async (userId) => {
        const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local

        try {
            const response = await fetch(`http://18.231.252.59/api/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Usuario eliminado:', data);

            // Aquí puedes implementar lógica adicional después de eliminar el usuario, como actualizar la lista de usuarios en la interfaz.

        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario o registrar el error en algún lugar.
        }
    };

    try {
        // Llamar a la función para obtener la lista de usuarios
        const usuariosData = await obtenerListaUsuarios();
        let usuarios = usuariosData?.users || []; // Asegurarse de que existe la lista de usuarios

        // Mapear roles y campos booleanos según la necesidad
        usuarios = usuarios.map(usuario => {
            if (usuario.role === 'role-admin') {
                usuario.role = 'Administrador';
            } else if (usuario.role === 'role-user') {
                usuario.role = 'Cliente';
            }

            if (usuario.subscribed === 'true') {
                usuario.subscribed = 'Está suscrito';
            } else if (usuario.subscribed === 'false') {
                usuario.subscribed = 'No está suscrito';
            }

            return usuario;
        });

        // Crear elementos HTML para cada usuario
        const elementosHTML = usuarios.map(usuario => {
            // Botones para actualizar y eliminar cada usuario
            const actualizarBtn = `<button onclick="actualizarUsuario('${usuario._id}')">Actualizar</button>`;
            const eliminarBtn = `<button onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>`;

            return `<!-- Galería-->
            <div class="card d-flex flex-column gap-1 justify-content-center card-responsive">
                <div class="card-body text-center">
                    <p class="subtitle card-text fw-bold fs-3 my-3">Tipo de usuario: ${usuario.role}</p>
                    <p class="card-text my-1 fst-italic fs-6">Nombre: ${usuario.name} ${usuario.surname}</p>
                    <p class="card-text my-1 fst-italic fs-6">Nombre de usuario: ${usuario.username}</p>
                    <p class="card-text my-1 fst-italic fs-6">Email: ${usuario.email}</p>
                    <p class="card-text my-1 fst-italic fs-6">Dirección: ${usuario.address}</p>
                    <p class="card-text my-1 fst-italic fs-6">Teléfono: ${usuario.phone}</p>
                    <p class="card-text my-1 fst-italic fs-6">¿Está suscrito?: ${usuario.subscribed}</p>
                    ${actualizarBtn} <!-- Botón de actualizar -->
                    ${eliminarBtn} <!-- Botón de eliminar -->
                </div>
            </div>`;
        }).join('');

        // Datos de paginación
        const data = usuariosData; // Renombrar para claridad, asumiendo que data contiene también información de paginación
        let dataPage = parseInt(data.page) || 1; // Página actual, default a 1 si no está definido
        const totalPages = parseInt(data.totalPages) || 1; // Total de páginas, default a 1 si no está definido

        // Crear elementos de paginación
        let pagesArray = [];
        for (let i = dataPage - 1; i <= dataPage + 1; i++) {
            if (i !== 0 && i <= totalPages) {
                pagesArray.push(`<li class="page-item"><a class="page-link ${dataPage === i ? 'active' : ''}" href="/galeria/${i}">${i}</a></li>`);
            } else if (i === 1) {
                pagesArray = [`<li class="page-item"><a class="page-link ${dataPage === 1 ? 'active' : ''}" href="/galeria/1">1</a></li>`];
            }
        }

        // Añadir navegación de página anterior y siguiente
        pagesArray.unshift(`
            <li class="page-item">
                <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}"  href="/galeria/1" aria-label="Previous">
                    <span aria-hidden="true">Inicio</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}" href="/galeria/${dataPage - 1}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`);

        pagesArray.push(`
            <li class="page-item">
                <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/galeria/${dataPage + 1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/galeria/${totalPages}" aria-label="Next">
                    <span aria-hidden="true">última</span>
                </a>
            </li>`);

        const elementoPages = pagesArray.join('');

        // Construir el HTML de la paginación
        const pagination = `
            <nav aria-label="Page navigation">
                <ul class="pagination">
                    ${elementoPages}
                </ul>
            </nav>`;

        // Mostrar la galería después de cargar los datos
        setTimeout(() => {
            loader.setAttribute('style', 'display:none');
            galeria.innerHTML = elementosHTML; // Mostrar usuarios
            paginationDiv.innerHTML = pagination; // Mostrar paginación
        }, 2000); // Timeout para simular carga

    } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario o registrar el error en algún lugar.
    }
};
