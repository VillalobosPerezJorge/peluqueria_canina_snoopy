document.querySelector('#btn-login').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
    const remember = document.getElementById('remember').checked;

    const datos = { username, password };

    try {
      const response = await fetch('https://angelespeluditos.cl/api//api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });


      const responseJson = await response.json();
      const user = responseJson.user;
      const role = user.role;
      const name = user.name;
      const surname = user.surname;
      const email = user.email;
      const address = user.address;
      const phone = user.phone;
      const username = user.username;

      if (response.ok) {
        localStorage.setItem('token', responseJson.token);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('name', name);
        localStorage.setItem('surname', surname);
        localStorage.setItem('email', email);
        localStorage.setItem('address', address);
        localStorage.setItem('phone', phone);

        if(remember) {
            localStorage.setItem('stored-user', username);
        }else if(!remember && localStorage['stored-user']){
            localStorage.removeItem('stored-user');
        }

        Swal.fire('Success', responseJson.message, 'success').then(() => {
          if (role === 'role-admin') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/';
          }
        });
      } else {
        Swal.fire('Error', responseJson.message, 'error');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
    }
  });

if(localStorage['stored-user']) {
    const input = document.getElementById('login_email');
    const checkbox = document.getElementById('remember');

    checkbox.checked = true;
    input.value = localStorage['stored-user'];
}