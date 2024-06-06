//AL INICIAR GATILLARA Esto
$(document).ready(function () {
    obtenerDatos()
});

// Función para validar los datos del formulario
function validarDatos() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let username = document.getElementById("username").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;
    let pass1 = document.getElementById("pass1").value;
    let pass2 = document.getElementById("pass2").value;

    let expresion = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (nombre === "" || apellido === "" || username === "" || email === "" || pass1 === "" || pass2 === "") {
        alert("Los campos que contengan asterisco son obligatorios");
        return false;
    }
    if (nombre.length < 3) {
        alert("El nombre debe contener al menos 3 caracteres");
        return false;
    }
    if (nombre.length > 30) {
        alert("El nombre debe contener máximo 30 caracteres");
        return false;
    }
    if (apellido.length > 30) {
        alert("El apellido debe contener máximo 30 caracteres");
        return false;
    }
    if (username.length > 30) {
        alert("El nombre de usuario debe contener máximo 30 caracteres");
        return false;
    }
    if (direccion.length > 50) {
        alert("La dirección debe contener máximo 50 caracteres");
        return false;
    }
    if (telefono.length < 8 || telefono.length > 10 || isNaN(telefono)) {
        alert("El teléfono debe contener entre 8 y 10 dígitos y ser numérico");
        return false;
    }
    if (email.length > 100) {
        alert("El correo debe contener máximo 100 caracteres");
        return false;
    }
    if (!expresion.test(email)) {
        alert("El correo no es válido");
        return false;
    }
    if (pass1.length < 8) {
        alert("La contraseña debe contener mínimo 8 caracteres");
        return false;
    }

    return true;
}

function verificarPassword() {
    const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/;

    // 
    if (pass1.value.match(decimal)){
        console.log("La contraseña es correcta")
    }else{
        alert ("La contraseña debe contener una mayúscula, una minúscula, un número y un caracter especial")
    }
    // Verificamos si las constraseñas coinciden 
    if (pass1.value == pass2.value) {
        console.log("Las contraseñas coinciden")
    } else {
        alert("Las contraseñas no coinciden")
        return false;
    }
}