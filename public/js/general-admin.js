if(!localStorage.role || localStorage.role !== 'role-admin'){
  window.location.href = '/'
}


document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const nameAdmin = localStorage.getItem('name');
    const surnameAdmin = localStorage.getItem('surname');
      
      const welcomeMessage = `¡Bienvenido, ${nameAdmin} ${surnameAdmin}! Aquí podrás gestionar los contenidos del sitio web. ¡Que tengas un buen día!`;
      document.getElementById('welcome-text').textContent = welcomeMessage;
    if (isLoggedIn) {
        document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        window.location.href = '/';
      });
    }
});