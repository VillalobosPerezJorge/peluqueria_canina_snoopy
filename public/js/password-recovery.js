const btn_recuperar = document.querySelector('#btn-recuperar');

btn_recuperar.addEventListener('click', async (event) => {

    event.preventDefault();

    // obtener valor del campo email
    const email = document.querySelector('#email').value;
    
    // validar email
    if (email == '') {
        alert('El campo email es obligatorio');
        return;
    }

    const options ={
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    }

    try {
        const response = await fetch('https://api-pelu-canina-snoopy.onrender.com/api/user/passwordChange', options);
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