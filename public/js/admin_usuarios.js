 // Función para actualizar un usuario específico
 const actualizarUsuario = async (userId) => {
    const token = localStorage.getItem('token');
    const card = document.querySelector(`#user-card-${userId}`);
    const fields = ['name', 'surname', 'username', 'email', 'address', 'phone', 'subscribed'];


    fields.forEach(field => {
        const fieldElement = card.querySelector(`.user-${field}`);
        if (fieldElement) {
            const valueText = fieldElement.textContent.split(': ')[1];
            const value = valueText ? valueText.trim() : '';
            fieldElement.innerHTML = `<input type="text" name="${field}" value="${value}" class="form-control">`;
        }
    });

    const actualizarBtn = card.querySelector('.btn-actualizar');
    actualizarBtn.textContent = 'Guardar';

    actualizarBtn.onclick = async () => {
        const inputs = card.querySelectorAll('input');
        const updatedData = {};

    
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                if(input.name == 'phone'){
                    updatedData[input.name] = parseInt(input.value.trim());
                }else if(input.name == 'subscribed'){
                    updatedData[input.name] = input.value.trim() == 'Si' ? true : false;
                }else{
                    updatedData[input.name] = input.value.trim();
                }
            }
        });

        // console.log('Datos actualizados:', updatedData); 
        // console.log('User ID:', userId); 
        // console.log('Token:', token); 

        try {
            const response = await fetch(`http://18.231.252.59/api/user/update/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Authorization': token
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                const errorText = await response.json();
                console.error('Respuesta del servidor:', errorText); // Depuración
                Swal.fire('Error', errorText.message, 'error');
            }

            const data = await response.json();
            console.log('Usuario actualizado:', data);

          
            fields.forEach(field => {
                const fieldElement = card.querySelector(`.user-${field}`);
                if (fieldElement) {
                    if(field == 'subscribed'){
                        updatedData[field] = data.user[field] == true? 'Si' : 'No'
                        fieldElement.innerHTML = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${updatedData[field] || ''}`;
                    }
                    fieldElement.innerHTML = `${field.charAt(0).toUpperCase() + field.slice(1)}: ${updatedData[field] || ''}`;
                }
            });

      
            actualizarBtn.textContent = 'Actualizar';
            actualizarBtn.onclick = () => actualizarUsuario(userId);

            if(data.status === 'Success'){
                Swal.fire('Success', data.message, 'success');
            }else{
                Swal.fire('Error', data.message, 'error');
            }

        } catch (error) {
            console.log('Error al intentar actualizar al usuario', error);
        }
    };
};

// Función para obtener la lista de usuarios desde el servidor
const obtenerListaUsuarios = async () => {
    const token = localStorage.getItem('token');

    // obtener pagina actual
    const windowURL = window.location.href;
    const windowURLSplitted = windowURL.split('/');
    const windowPage = Number.parseInt(windowURLSplitted[windowURLSplitted.length - 1]);

    try {
        const response = await fetch(`http://18.231.252.59/api/user/listUsers/${windowPage}`, {
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
        return data.data;

    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        throw error;
    }
};


// Función para eliminar un usuario específico
const eliminarUsuario = async (userId) => {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(`http://18.231.252.59/api/user/delete/${userId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                'Authorization': token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            Swal.fire('Error', data.message, 'error');
        }

        Swal.fire('Success', data.message, 'success')
            .then(result => result.json())
            .then(res => {
                if(res.isConfirmed) window.location.reload();
            })
            .finally(res => window.location.reload());


    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
};


const cargarLista = async () => {
    const galeria = document.querySelector('#galeria');
    const loader = document.querySelector('#loader');
    const paginationDiv = document.querySelector('#pagination');

    try {
        // Llamar a la función para obtener la lista de usuarios
        const usuariosData = await obtenerListaUsuarios();
        let usuarios = usuariosData?.users || []; 

        // Mapear roles y campos booleanos según la necesidad
        usuarios = usuarios.map(usuario => {
            if (usuario.role === 'role-admin') {
                usuario.role = 'Administrador';
            } else if (usuario.role === 'role-user') {
                usuario.role = 'Cliente';
            }

            if (usuario.subscribed === true) {
                usuario.subscribed = 'Si';
            } else if (usuario.subscribed === false) {
                usuario.subscribed = 'No';
            }

            return usuario;
        });

        // Crear elementos HTML para cada usuario
        const elementosHTML = usuarios.map(usuario => {
            // Botones para actualizar y eliminar cada usuario
            const actualizarBtn = `<button type='button' class='btn btn-warning btn-actualizar' onclick="actualizarUsuario('${usuario._id}')">Actualizar</button>`;
            const eliminarBtn = `<button type='button' class='btn btn-danger' onclick="eliminarUsuario('${usuario._id}')">Eliminar</button>`;

            return `
            <div id="user-card-${usuario._id}" class="card d-flex flex-column gap-1 justify-content-center card-responsive">
                <div class="card-body text-center">
                    <p class="subtitle card-text fw-bold fs-3 my-3">Tipo de usuario: ${usuario.role}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-name">Nombre: ${usuario.name}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-surname">Apellido: ${usuario.surname}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-username">Nombre de usuario: ${usuario.username}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-email">Email: ${usuario.email}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-address">Dirección: ${usuario.address}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-phone">Teléfono: ${usuario.phone}</p>
                    <p class="card-text my-1 fst-italic fs-6 user-subscribed">¿Está suscrito?: ${usuario.subscribed}</p>
                    ${actualizarBtn} <!-- Botón de actualizar -->
                    ${eliminarBtn} <!-- Botón de eliminar -->
                </div>
            </div>`;
        }).join('');


        // Datos de paginación
        const data = usuariosData;
        let dataPage = parseInt(data.page) || 1; 
        const totalPages = parseInt(data.totalPages) || 1; 

        // Crear elementos de paginación
        let pagesArray = [];
        for (let i = dataPage - 1; i <= dataPage + 1; i++) {
            if (i !== 0 && i <= totalPages) {
                pagesArray.push(`<li class="page-item"><a class="page-link ${dataPage === i ? 'active' : ''}" href="/admin_usuarios/${i}">${i}</a></li>`);
            } else if (i === 1) {
                pagesArray = [`<li class="page-item"><a class="page-link ${dataPage === 1 ? 'active' : ''}" href="/admin_usuarios/1">1</a></li>`];
            }
        }

        // Añadir navegación de página anterior y siguiente
        pagesArray.unshift(`
            <li class="page-item">
                <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}"  href="/admin_usuarios/1" aria-label="Previous">
                    <span aria-hidden="true">Inicio</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link ${data.hasPrevPage ? '' : 'disabled'}" href="/admin_usuarios/${dataPage - 1}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`);

        pagesArray.push(`
            <li class="page-item">
                <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/admin_usuarios/${dataPage + 1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link ${data.hasNextPage ? '' : 'disabled'}" href="/admin_usuarios/${totalPages}" aria-label="Next">
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
            galeria.innerHTML = elementosHTML; 
            paginationDiv.innerHTML = pagination; 
        }, 2000); 
    } catch (error) {
        console.error('Error al cargar la lista de usuarios:', error);
    }
}


window.onload = () => {
    cargarLista();
};
