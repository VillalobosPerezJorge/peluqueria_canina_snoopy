const btn_cambiar = document.querySelector('#btn-cambiar');

btn_cambiar.addEventListener('click', async (event) => {

    event.preventDefault();

    // obtener valor de los campos pass1 y pass2
    const pass1 = document.querySelector('#pass1').value;
    const pass2 = document.querySelector('#pass2').value;

    // obtener token por url
    const url = location.href;

    const splitUrl = url.split('/');

    const token = splitUrl[splitUrl.length - 1];

    
    // validar pass1
    if (pass1 == '') {
        alert('El campo pass1 es obligatorio');
        return;
    }

    // validar pass2
    if (pass2 == '') {
        alert('El campo pass2 es obligatorio');
        return;
    }

    const options ={
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: pass1,
            password_verification: pass2
        })
    }

    try {
        const response = await fetch(`https://api-pelu-canina-snoopy.onrender.com/api/user/passwordReset/${token}`, options);
        const response_json = await response.json();

        if(response_json.status == 'Success'){
            swal.fire('Success', response_json.message, 'success');
        }else{
            swal.fire('Error', response_json.message, 'error');
        }

    } catch (error) {
        swal.fire('Error', response_json.message, 'error');
    }
});